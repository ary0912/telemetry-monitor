import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TelemetryReading, AnomalyEvent } from '../types';

export interface TelemetryState {
  readings: TelemetryReading[];
  anomalies: AnomalyEvent[];
  connected: boolean;
  wsLatency: number;
  messageCount: number;
  isPaused: boolean;
  anomalySensitivity: number;
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
    },
    addAnomaly: (state, action: PayloadAction<AnomalyEvent>) => {
      state.anomalies.unshift(action.payload);
      if (state.anomalies.length > 100) {
        state.anomalies.pop();
      }
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
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
    },
  },
});

export const {
  addReading,
  addAnomaly,
  setConnected,
  setWsLatency,
  setIsPaused,
  setAnomalySensitivity,
  setShowAnomalies,
  setCalibrationMode,
  setSignalNormalization,
  setManualOverride,
  clearAnomalies,
  clearReadings,
} = telemetrySlice.actions;

export default telemetrySlice.reducer;
