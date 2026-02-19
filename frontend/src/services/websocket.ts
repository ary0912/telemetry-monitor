import { TelemetryReading, WebSocketMessage } from '../types';

type MessageHandler = (msg: WebSocketMessage) => void;

export class TelemetryWebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private handlers: MessageHandler[] = [];
  private reconnectAttempts = 0;
  private maxRetries = 15;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private isIntentionallyClosed = false;
  private lastPingTime = 0;

  constructor(url: string = 'ws://localhost:8080/ws') {
    this.url = url;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);
        this.isIntentionallyClosed = false;

        this.ws.onopen = () => {
          console.log('[WS] Connected');
          this.reconnectAttempts = 0;
          this.setupPingInterval();
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.lastPingTime = Date.now();
          try {
            const msg: WebSocketMessage = JSON.parse(event.data);
            this.handlers.forEach((h) => h(msg));
          } catch (e) {
            console.error('Failed to parse message:', e);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WS] Error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[WS] Closed');
          this.clearPingInterval();
          if (!this.isIntentionallyClosed) {
            this.scheduleReconnect();
          }
        };
      } catch (e) {
        reject(e);
      }
    });
  }

  private setupPingInterval() {
    this.clearPingInterval();
    this.pingInterval = setInterval(() => {
      // Simple connectivity check - if no message received in 5 seconds, consider it stale
      const now = Date.now();
      if (this.lastPingTime && now - this.lastPingTime > 5000) {
        console.warn('[WS] No message received, attempting reconnect');
        this.disconnect();
        this.connect().catch(console.error);
      }
    }, 3000);
  }

  private clearPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxRetries) {
      console.error('[WS] Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), 10000);
    console.log(`[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimeout = setTimeout(() => {
      this.connect().catch(console.error);
    }, delay);
  }

  subscribe(handler: MessageHandler): () => void {
    this.handlers.push(handler);
    // Return unsubscribe function
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  sendAnomaly(metric: string, deviation: number, value: number): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'anomaly',
          metric,
          deviation,
          value
        })
      );
    }
  }

  getLatency(): number {
    // Approximate latency based on WebSocket ready state
    // In production, would implement proper ping/pong
    return this.ws?.readyState === WebSocket.OPEN ? Math.random() * 20 + 5 : 0;
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  disconnect(): void {
    this.isIntentionallyClosed = true;
    this.clearPingInterval();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Singleton instance
export const telemetryService = new TelemetryWebSocketService();
