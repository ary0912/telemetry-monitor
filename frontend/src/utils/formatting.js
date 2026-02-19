// Format relative time for anomaly feed
export function formatRelativeTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 1000)
        return 'now';
    const diffSecs = Math.floor(diffMs / 1000);
    if (diffSecs < 60)
        return `${diffSecs}s ago`;
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60)
        return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
}
// Format duration in HH:MM:SS format
export function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}
// Estimate data throughput
export function formatDataThroughput(messageCount, runtimeSeconds) {
    if (runtimeSeconds === 0)
        return '0 msg/s';
    const rate = messageCount / runtimeSeconds;
    return `${rate.toFixed(1)} msg/s`;
}
// Export anomalies as CSV
export function exportAnomaliesAsCSV(anomalies) {
    const headers = ['Timestamp', 'Metric', 'Deviation (σ)', 'Value'];
    const rows = anomalies.map((a) => [
        a.timestamp,
        a.metric,
        a.deviation.toFixed(2),
        a.value.toFixed(4)
    ]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    return csv;
}
// Download CSV file
export function downloadCSV(csv, filename = 'anomalies.csv') {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
