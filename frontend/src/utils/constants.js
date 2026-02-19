export const METRIC_CONFIGS = {
    temperature: {
        label: 'Temperature',
        unit: '°C',
        thresholdZScore: 2.0,
        color: '#ef4444',
        normalRange: [70, 76]
    },
    voltage: {
        label: 'Voltage',
        unit: 'V',
        thresholdZScore: 2.0,
        color: '#f59e0b',
        normalRange: [4.8, 5.2]
    },
    signalNoise: {
        label: 'Signal Noise',
        unit: 'μV',
        thresholdZScore: 2.0,
        color: '#8b5cf6',
        normalRange: [0.1, 0.2]
    },
    laserStability: {
        label: 'Laser Stability',
        unit: '%',
        thresholdZScore: 2.0,
        color: '#06b6d4',
        normalRange: [97.5, 99.5]
    },
    controlSignalDrift: {
        label: 'Control Signal Drift',
        unit: 'rad',
        thresholdZScore: 2.0,
        color: '#ec4899',
        normalRange: [0.05, 0.11]
    },
    errorRate: {
        label: 'Error Rate',
        unit: '%',
        thresholdZScore: 2.5,
        color: '#6366f1',
        normalRange: [0.0, 0.005]
    },
    signalIntegrity: {
        label: 'Signal Integrity',
        unit: '%',
        thresholdZScore: 2.0,
        color: '#10b981',
        normalRange: [99.6, 100.0]
    }
};
export const DISPLAY_METRICS = [
    'temperature',
    'voltage',
    'signalNoise',
    'laserStability',
    'controlSignalDrift',
    'errorRate',
    'signalIntegrity'
];
export const WS_RECONNECT_INTERVAL = 3000; // ms
export const WS_MAX_RETRIES = 15;
export const CHART_WINDOW_SIZE = 1500; // ~10 minutes at 400ms intervals
