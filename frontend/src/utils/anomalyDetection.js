// Calculates rolling standard deviation and mean for z-score detection
// Using a sliding window approach for real-time anomaly detection
export function calculateZScore(readings, metric, windowSize = 50) {
    if (readings.length < windowSize)
        return null;
    const window = readings.slice(-windowSize).map((r) => r[metric]);
    const mean = window.reduce((a, b) => a + b, 0) / window.length;
    const variance = window.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / window.length;
    const stdDev = Math.sqrt(variance);
    if (stdDev === 0)
        return 0;
    const lastValue = window[window.length - 1];
    return (lastValue - mean) / stdDev;
}
// Detect if a metric shows significant deviation
// This is used to trigger anomaly alerts without being overly noisy
export function detectAnomaly(readings, metric, sensitivity = 2.0) {
    if (readings.length < 2)
        return null;
    const zScore = calculateZScore(readings, metric, 50);
    if (zScore === null)
        return null;
    // Trigger anomaly if deviation exceeds threshold
    if (Math.abs(zScore) > sensitivity) {
        const lastReading = readings[readings.length - 1];
        return {
            timestamp: new Date(lastReading.timestamp).toISOString(),
            metric,
            deviation: zScore,
            value: lastReading[metric]
        };
    }
    return null;
}
// Get human-readable deviation description
export function getDeviationDescription(zScore) {
    const sigma = Math.abs(zScore);
    if (sigma > 3)
        return 'Critical';
    if (sigma > 2.5)
        return 'High';
    if (sigma > 2)
        return 'Moderate';
    return 'Minimal';
}
// Format metric value with appropriate precision
export function formatMetricValue(value, metric) {
    const precisions = {
        temperature: 1,
        voltage: 2,
        signalNoise: 3,
        laserStability: 2,
        controlSignalDrift: 3,
        errorRate: 4,
        signalIntegrity: 2
    };
    return value.toFixed(precisions[metric] || 2);
}
// Get color for metric visualization
export function getMetricColor(metric) {
    const colors = {
        temperature: '#ef4444',
        voltage: '#f59e0b',
        signalNoise: '#8b5cf6',
        laserStability: '#06b6d4',
        controlSignalDrift: '#ec4899',
        errorRate: '#6366f1',
        signalIntegrity: '#10b981'
    };
    return colors[metric];
}
// Calculate rolling average for stats panel
export function calculateRollingAverage(readings, metric, windowSize = 150 // ~1 minute at 400ms intervals
) {
    if (readings.length === 0)
        return 0;
    const window = readings.slice(-windowSize);
    const sum = window.reduce((acc, r) => acc + r[metric], 0);
    return sum / window.length;
}
