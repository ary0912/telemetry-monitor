import { create } from 'zustand';
import { TelemetryReading, AnomalyEvent } from '../types';

export interface TelemetryStore {
  // Telemetry data
  readings: TelemetryReading[];
  anomalies: AnomalyEvent[];

  // Connection state
  connected: boolean;
  wsLatency: number;
  messageCount: number;

  // UI state
  isPaused: boolean;
  anomalySensitivity: number; // 1.5 to 3.0 sigma
  showAnomalies: boolean;

  // Control state
  calibrationMode: boolean;
  signalNormalizationActive: boolean;
  manualOverrideEngaged: boolean;

  // Actions
  addReading: (reading: TelemetryReading) => void;
  addAnomaly: (anomaly: AnomalyEvent) => void;
  setConnected: (connected: boolean) => void;
  setWsLatency: (latency: number) => void;
  setIsPaused: (paused: boolean) => void;
  setAnomalySensitivity: (sensitivity: number) => void;
  setShowAnomalies: (show: boolean) => void;
  setCalibrationMode: (mode: boolean) => void;
  setSignalNormalization: (active: boolean) => void;
  setManualOverride: (engaged: boolean) => void;
  clearAnomalies: () => void;
  clearReadings: () => void;
}

const MAX_READINGS = 1500; // ~10 minutes at 400ms intervals

export const useTelemetryStore = create<TelemetryStore>((set) => ({
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

  addReading: (reading) =>
    set((state) => ({
      readings: [...state.readings, reading].slice(-MAX_READINGS),
      messageCount: state.messageCount + 1
    })),

  addAnomaly: (anomaly) =>
    set((state) => ({
      anomalies: [anomaly, ...state.anomalies].slice(0, 100) // Keep last 100
    })),

  setConnected: (connected) => set({ connected }),
  setWsLatency: (wsLatency) => set({ wsLatency }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setAnomalySensitivity: (anomalySensitivity) => set({ anomalySensitivity }),
  setShowAnomalies: (showAnomalies) => set({ showAnomalies }),
  setCalibrationMode: (calibrationMode) => set({ calibrationMode }),
  setSignalNormalization: (signalNormalizationActive) =>
    set({ signalNormalizationActive }),
  setManualOverride: (manualOverrideEngaged) => set({ manualOverrideEngaged }),
  clearAnomalies: () => set({ anomalies: [] }),
  clearReadings: () => set({ readings: [] })
}));
