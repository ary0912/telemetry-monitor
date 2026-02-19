import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

app.use(express.json());

// In-memory anomaly log
const anomalies = [];

// Telemetry state - tracks baseline and drift for realistic simulation
const telemetryState = {
  temperature: { baseline: 73.2, drift: 0, driftRate: 0.001 },
  voltage: { baseline: 5.0, drift: 0, driftRate: 0.0005 },
  signalNoise: { baseline: 0.15, drift: 0, driftRate: 0.0002 },
  laserStability: { baseline: 98.5, drift: 0, driftRate: 0.0003 },
  controlSignalDrift: { baseline: 0.08, drift: 0, driftRate: 0.0001 },
  systemUptime: 0,
  errorRate: { baseline: 0.002, drift: 0, driftRate: 0.00001 },
  signalIntegrity: { baseline: 99.8, drift: 0, driftRate: 0.0001 }
};

const EXPERIMENT_START = Date.now();
let messageCount = 0;

// Telemetry data generator using sine waves + drift + noise
// This feels more physical than pure randomness
function generateTelemetry() {
  const now = Date.now();
  const elapsedSeconds = (now - EXPERIMENT_START) / 1000;

  // Apply drift to baselines
  for (const key in telemetryState) {
    if (telemetryState[key].driftRate !== undefined) {
      telemetryState[key].drift += telemetryState[key].driftRate * (Math.random() - 0.48);
      // Clamp drift to prevent runaway
      telemetryState[key].drift = Math.max(-0.5, Math.min(0.5, telemetryState[key].drift));
    }
  }

  // Generate values using sine waves for natural oscillation + drift + noise
  const generateValue = (baseline, amplitude, frequency, drift, noise) => {
    const oscillation = amplitude * Math.sin((elapsedSeconds * frequency * Math.PI) / 10);
    const randomNoise = (Math.random() - 0.5) * 2 * noise;
    return baseline + drift + oscillation + randomNoise;
  };

  return {
    timestamp: now,
    temperature: generateValue(
      telemetryState.temperature.baseline,
      0.8,
      0.5,
      telemetryState.temperature.drift,
      0.3
    ),
    voltage: generateValue(
      telemetryState.voltage.baseline,
      0.1,
      0.3,
      telemetryState.voltage.drift,
      0.02
    ),
    signalNoise: generateValue(
      telemetryState.signalNoise.baseline,
      0.03,
      0.2,
      telemetryState.signalNoise.drift,
      0.01
    ),
    laserStability: generateValue(
      telemetryState.laserStability.baseline,
      0.5,
      0.4,
      telemetryState.laserStability.drift,
      0.2
    ),
    controlSignalDrift: generateValue(
      telemetryState.controlSignalDrift.baseline,
      0.02,
      0.6,
      telemetryState.controlSignalDrift.drift,
      0.005
    ),
    errorRate: generateValue(
      telemetryState.errorRate.baseline,
      0.001,
      0.1,
      telemetryState.errorRate.drift,
      0.0005
    ),
    signalIntegrity: 99.8 + Math.sin(elapsedSeconds * 0.1) * 0.15 - Math.random() * 0.08,
    systemUptime: elapsedSeconds
  };
}

// Broadcast telemetry to all connected clients
function broadcastTelemetry() {
  const data = generateTelemetry();
  messageCount++;

  const payload = JSON.stringify({
    type: 'telemetry',
    data,
    messageId: messageCount
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('[WS] Client connected');

  // Send current state on connect
  ws.send(
    JSON.stringify({
      type: 'status',
      message: 'Connected to telemetry server',
      uptime: (Date.now() - EXPERIMENT_START) / 1000
    })
  );

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.type === 'anomaly') {
        // Server-side anomaly detection confirmation
        anomalies.push({
          timestamp: new Date().toISOString(),
          metric: msg.metric,
          deviation: msg.deviation,
          value: msg.value
        });
      }
    } catch (e) {
      console.error('Failed to parse message:', e.message);
    }
  });

  ws.on('close', () => {
    console.log('[WS] Client disconnected');
  });

  ws.on('error', (err) => {
    console.error('[WS] Error:', err.message);
  });
});

// REST endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: (Date.now() - EXPERIMENT_START) / 1000,
    connectedClients: wss.clients.size,
    messagesSent: messageCount
  });
});

app.get('/api/anomalies', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  res.json({
    anomalies: anomalies.slice(-limit),
    total: anomalies.length
  });
});

app.get('/api/anomalies/:id', (req, res) => {
  const anomaly = anomalies[parseInt(req.params.id)];
  if (!anomaly) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(anomaly);
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`\n🔬 Telemetry Monitor Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`HTTP: http://localhost:${PORT}`);
  console.log(`WS:   ws://localhost:${PORT}/ws`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

// Broadcast telemetry every 400ms (mimics realistic update rate)
setInterval(broadcastTelemetry, 400);
