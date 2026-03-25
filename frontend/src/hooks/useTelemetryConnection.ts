import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  addReading, 
  addAnomaly, 
  setConnected, 
  setWsLatency 
} from '../store/telemetrySlice';
import { telemetryService } from '../services/websocket';
import { detectAnomaly } from '../utils/anomalyDetection';
import { TelemetryReading, WebSocketMessage } from '../types';

export function useTelemetryConnection() {
  const dispatch = useAppDispatch();
  const { isPaused, anomalySensitivity, readings } = useAppSelector((state) => state.telemetry);
  const latencyIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Connect to WebSocket
    telemetryService.connect().then(
      () => {
        console.log('Connected');
        dispatch(setConnected(true));
      },
      (err) => {
        console.error('Connection failed:', err);
      }
    );

    // Subscribe to telemetry updates
    const unsubscribe = telemetryService.subscribe((msg: WebSocketMessage) => {
      if (msg.type === 'telemetry' && msg.data) {
        const reading = msg.data as TelemetryReading;
        dispatch(addReading(reading));

        // Check for anomalies on each new reading
        if (!isPaused) {
          const metrics = [
            'temperature',
            'voltage',
            'signalNoise',
            'laserStability',
            'controlSignalDrift',
            'errorRate',
            'signalIntegrity'
          ] as const;

          for (const metric of metrics) {
            const anomaly = detectAnomaly(readings, metric, anomalySensitivity);
            if (anomaly) {
              dispatch(addAnomaly(anomaly));
              telemetryService.sendAnomaly(metric, anomaly.deviation, anomaly.value);
            }
          }
        }
      }
    });

    // Update latency periodically
    latencyIntervalRef.current = setInterval(() => {
      dispatch(setWsLatency(telemetryService.getLatency()));
    }, 1000);

    return () => {
      unsubscribe();
      if (latencyIntervalRef.current) {
        clearInterval(latencyIntervalRef.current);
      }
      telemetryService.disconnect();
    };
  }, [dispatch, isPaused, anomalySensitivity, readings]);
}
