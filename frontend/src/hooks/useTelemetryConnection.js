import { useEffect, useRef } from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { telemetryService } from '../services/websocket';
import { detectAnomaly } from '../utils/anomalyDetection';
export function useTelemetryConnection() {
    const store = useTelemetryStore();
    const latencyIntervalRef = useRef(null);
    useEffect(() => {
        // Connect to WebSocket
        telemetryService.connect().then(() => {
            console.log('Connected');
            store.setConnected(true);
        }, (err) => {
            console.error('Connection failed:', err);
        });
        // Subscribe to telemetry updates
        const unsubscribe = telemetryService.subscribe((msg) => {
            if (msg.type === 'telemetry' && msg.data) {
                const reading = msg.data;
                store.addReading(reading);
                // Check for anomalies on each new reading
                if (!store.isPaused) {
                    const metrics = [
                        'temperature',
                        'voltage',
                        'signalNoise',
                        'laserStability',
                        'controlSignalDrift',
                        'errorRate',
                        'signalIntegrity'
                    ];
                    for (const metric of metrics) {
                        const anomaly = detectAnomaly(store.readings, metric, store.anomalySensitivity);
                        if (anomaly) {
                            store.addAnomaly(anomaly);
                            telemetryService.sendAnomaly(metric, anomaly.deviation, anomaly.value);
                        }
                    }
                }
            }
        });
        // Update latency periodically
        latencyIntervalRef.current = setInterval(() => {
            store.setWsLatency(telemetryService.getLatency());
        }, 1000);
        return () => {
            unsubscribe();
            if (latencyIntervalRef.current) {
                clearInterval(latencyIntervalRef.current);
            }
            telemetryService.disconnect();
        };
    }, [store]);
}
