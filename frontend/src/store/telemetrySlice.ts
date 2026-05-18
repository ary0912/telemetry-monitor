import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TelemetryReading, AnomalyEvent, MetricKey } from '../types';

export interface TelemetryState {
  readings: TelemetryReading[];
  anomalies: AnomalyEvent[];
  connected: boolean;
  wsLatency: number;
  messageCount: number;
  isPaused: boolean;
  anomalySensitivity: number;
  selectedMetrics: readonly MetricKey[];
  healthScore: number;
  staleStream: boolean;
  throughput: number;
  replayMode: boolean;
  replayPosition: number;
  showAnomalies: boolean;
  calibrationMode: boolean;
  signalNormalizationActive: boolean;
  manualOverrideEngaged: boolean;
}

const MAX_READINGS = 1500;

const initialState: TelemetryState = {
  readings: [],
  anomalies: [],
  connected: false,
  wsLatency: 0,
  messageCount: 0,
  isPaused: false,
  anomalySensitivity: 2.0,
  selectedMetrics: ['temperature', 'voltage', 'signalNoise', 'laserStability', 'controlSignalDrift', 'errorRate', 'signalIntegrity'],
  healthScore: 100,
  staleStream: false,
  throughput: 0,
  replayMode: false,
  replayPosition: 0,
  showAnomalies: true,
  calibrationMode: false,
  signalNormalizationActive: true,
  manualOverrideEngaged: false,
};

const telemetrySlice = createSlice({
  name: 'telemetry',
  initialState,
  reducers: {
    addReading: (state, action: PayloadAction<TelemetryReading>) => {
      state.readings.push(action.payload);
      if (state.readings.length > MAX_READINGS) {
        state.readings.shift();
      }
      state.messageCount += 1;
      state.throughput += 1;
      state.staleStream = false;
    },
    addAnomaly: (state, action: PayloadAction<AnomalyEvent>) => {
      state.anomalies.unshift(action.payload);
      if (state.anomalies.length > 100) {
        state.anomalies.pop();
      }
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
      if (!action.payload) {
        state.staleStream = true;
      }
    },
    setWsLatency: (state, action: PayloadAction<number>) => {
      state.wsLatency = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setAnomalySensitivity: (state, action: PayloadAction<number>) => {
      state.anomalySensitivity = action.payload;
    },
    setSelectedMetrics: (state, action: PayloadAction<readonly MetricKey[]>) => {
      state.selectedMetrics = [...action.payload];
    },
    setHealthScore: (state, action: PayloadAction<number>) => {
      state.healthScore = action.payload;
    },
    setStaleStream: (state, action: PayloadAction<boolean>) => {
      state.staleStream = action.payload;
    },
    updateThroughput: (state, action: PayloadAction<number>) => {
      state.throughput = Math.max(0, state.throughput + action.payload);
    },
    setReplayMode: (state, action: PayloadAction<boolean>) => {
      state.replayMode = action.payload;
    },
    setReplayPosition: (state, action: PayloadAction<number>) => {
      state.replayPosition = Math.min(Math.max(0, action.payload), state.readings.length ? state.readings[state.readings.length - 1].timestamp - state.readings[0].timestamp : 0);
    },
    setShowAnomalies: (state, action: PayloadAction<boolean>) => {
      state.showAnomalies = action.payload;
    },
    setCalibrationMode: (state, action: PayloadAction<boolean>) => {
      state.calibrationMode = action.payload;
    },
    setSignalNormalization: (state, action: PayloadAction<boolean>) => {
      state.signalNormalizationActive = action.payload;
    },
    setManualOverride: (state, action: PayloadAction<boolean>) => {
      state.manualOverrideEngaged = action.payload;
    },
    clearAnomalies: (state) => {
      state.anomalies = [];
    },
    clearReadings: (state) => {
      state.readings = [];
      state.throughput = 0;
      state.messageCount = 0;
    }
  }
});

export const {
  addReading,
  addAnomaly,
  setConnected,
  setWsLatency,
  setIsPaused,
  setAnomalySensitivity,
  setSelectedMetrics,
  setHealthScore,
  setStaleStream,
  updateThroughput,
  setReplayMode,
  setReplayPosition,
  setShowAnomalies,
  setCalibrationMode,
  setSignalNormalization,
  setManualOverride,
  clearAnomalies,
  clearReadings
} = telemetrySlice.actions;

export default telemetrySlice.reducer;
