import { MetricKey } from '../../types';

export interface ExperimentProfile {
  id: string;
  name: string;
  mode: string;
  description: string;
  snapshotInterval: string;
  anomalySensitivity: number;
  activeMetrics: MetricKey[];
  operatorGuidance: string;
}

export const EXPERIMENT_PROFILES: ExperimentProfile[] = [
  {
    id: 'hydraulic-pressure-validation',
    name: 'Hydraulic Pressure Validation',
    mode: 'Pressure control',
    description: 'Monitor high-resolution pressure curves and valve behavior during pressurization cycles.',
    snapshotInterval: '4s',
    anomalySensitivity: 2.25,
    activeMetrics: ['temperature', 'voltage', 'errorRate'],
    operatorGuidance: 'Prioritize pressure drift and heat accumulation during high-load phases.'
  },
  {
    id: 'high-speed-valve-calibration',
    name: 'High-Speed Valve Calibration',
    mode: 'Dynamic flow',
    description: 'Track response latencies and stability for high-frequency valve actuation tests.',
    snapshotInterval: '2s',
    anomalySensitivity: 2.0,
    activeMetrics: ['controlSignalDrift', 'voltage', 'signalIntegrity'],
    operatorGuidance: 'Watch for control signal resonance and rapid error spikes.'
  },
  {
    id: 'thermal-stress-test',
    name: 'Thermal Stress Test',
    mode: 'Heat profiling',
    description: 'Evaluate thermal boundary conditions and system resilience under steady-state load.',
    snapshotInterval: '6s',
    anomalySensitivity: 2.4,
    activeMetrics: ['temperature', 'laserStability', 'signalNoise'],
    operatorGuidance: 'Maintain coolant flow and verify margin around high temperature thresholds.'
  }
];
