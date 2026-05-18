import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { telemetryService } from '../../../services/websocket';
import { addReading, addAnomaly, setConnected, setWsLatency, setStaleStream, setHealthScore, updateThroughput } from '../../../store/telemetrySlice';
import { detectAnomaly, calculateRollingAverage } from '../../../utils/anomalyDetection';
import { DISPLAY_METRICS } from '../../../utils/constants';
import { TelemetryReading, MetricKey } from '../../../types';

export function useTelemetrySync() {
  const dispatch = useAppDispatch();
  const { isPaused, anomalySensitivity, readings } = useAppSelector((state) => state.telemetry);
  const readingsRef = useRef<TelemetryReading[]>(readings);

  useEffect(() => {
    readingsRef.current = readings;
  }, [readings]);

  useEffect(() => {
    const metrics = DISPLAY_METRICS as readonly MetricKey[];
    let staleTimeout: number | null = null;

    const handleMessage = (msg: any) => {
      if (msg.type === 'telemetry' && msg.data) {
        const reading = msg.data as TelemetryReading;
        const currentReadings = [...readingsRef.current, reading].slice(-1500);
        readingsRef.current = currentReadings;

        dispatch(addReading(reading));
        dispatch(updateThroughput(1));

        if (!isPaused) {
          for (const metric of metrics) {
            const anomaly = detectAnomaly(currentReadings, metric, anomalySensitivity);
            if (anomaly) {
              dispatch(addAnomaly(anomaly));
              telemetryService.sendAnomaly(metric, anomaly.deviation, anomaly.value);
            }
          }
        }

        const healthScore = Math.max(28, Math.min(100, 100 - Math.abs(calculateRollingAverage(currentReadings, 'errorRate', 100) * 1000)));
        dispatch(setHealthScore(healthScore));
        dispatch(setConnected(true));

        if (staleTimeout) {
          window.clearTimeout(staleTimeout);
        }
        staleTimeout = window.setTimeout(() => dispatch(setStaleStream(true)), 5500);
      }
    };

    telemetryService.connect().then(
      () => dispatch(setConnected(true)),
      () => dispatch(setConnected(false))
    );

    const unsubscribe = telemetryService.subscribe(handleMessage);
    const latencyInterval = window.setInterval(() => {
      dispatch(setWsLatency(telemetryService.getLatency()));
    }, 1200);

    return () => {
      unsubscribe();
      window.clearInterval(latencyInterval);
      if (staleTimeout) window.clearTimeout(staleTimeout);
      telemetryService.disconnect();
    };
  }, [dispatch, anomalySensitivity, isPaused]);
}
