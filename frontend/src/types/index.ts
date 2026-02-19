// Core telemetry data types
export interface TelemetryReading {
  timestamp: number;
  temperature: number;
  voltage: number;
  signalNoise: number;
  laserStability: number;
  controlSignalDrift: number;
  errorRate: number;
  signalIntegrity: number;
  systemUptime: number;
}

export interface AnomalyEvent {
  timestamp: string;
  metric: string;
  deviation: number;
  value: number;
}

export interface WebSocketMessage {
  type: 'telemetry' | 'status' | 'error';
  data?: TelemetryReading;
  message?: string;
  messageId?: number;
  uptime?: number;
}

export interface SystemStats {
  avgTemperature: number;
  avgVoltage: number;
  avgSignalNoise: number;
  avgLaserStability: number;
  avgControlSignalDrift: number;
  avgErrorRate: number;
  avgSignalIntegrity: number;
}

export type MetricKey =
  | 'temperature'
  | 'voltage'
  | 'signalNoise'
  | 'laserStability'
  | 'controlSignalDrift'
  | 'errorRate'
  | 'signalIntegrity';

// Metric configuration for display and thresholds
export interface MetricConfig {
  label: string;
  unit: string;
  thresholdZScore: number;
  color: string;
  normalRange: [number, number];
}

export type MetricConfigs = Record<MetricKey, MetricConfig>;
