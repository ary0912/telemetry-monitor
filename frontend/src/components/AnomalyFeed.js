import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTelemetryStore } from '../store/telemetry';
import { formatRelativeTime } from '../utils/formatting';
import { AlertCircleIcon, DownloadIcon, TrashIcon, TrendingUp } from 'lucide-react';
import { exportAnomaliesAsCSV, downloadCSV } from '../utils/formatting';
export function AnomalyFeed({ anomalies }) {
    const clearAnomalies = useTelemetryStore((s) => s.clearAnomalies);
    const showAnomalies = useTelemetryStore((s) => s.showAnomalies);
    const handleExport = () => {
        const csv = exportAnomaliesAsCSV(anomalies);
        downloadCSV(csv, `anomalies-${new Date().getTime()}.csv`);
    };
    const getDeviationColor = (deviation) => {
        const abs = Math.abs(deviation);
        if (abs > 3)
            return 'text-red-400 bg-red-950';
        if (abs > 2.5)
            return 'text-orange-400 bg-orange-950';
        if (abs > 2)
            return 'text-yellow-400 bg-yellow-950';
        return 'text-cyan-400 bg-cyan-950';
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "p-4 border-b border-lab-800", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { size: 16, className: "text-cyan-400" }), _jsx("h3", { className: "font-bold text-white", children: "Deviations" })] }), _jsx("span", { className: "text-xs font-mono bg-lab-800 text-cyan-400 px-2.5 py-1 rounded-full font-semibold", children: anomalies.length })] }), _jsx("p", { className: "text-xs text-slate-500", children: "Recent anomalies detected" })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: anomalies.length === 0 ? (_jsx("div", { className: "flex items-center justify-center h-full text-slate-500 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-lab-800 mx-auto mb-3 flex items-center justify-center", children: _jsx(AlertCircleIcon, { size: 16, className: "text-slate-600" }) }), _jsx("p", { className: "text-sm font-medium", children: "All signals normal" }), _jsx("p", { className: "text-xs mt-1", children: "No deviations detected" })] }) })) : (_jsx("div", { className: "divide-y divide-lab-800", children: anomalies.map((anomaly, idx) => (_jsx("div", { className: "p-3 hover:bg-lab-800 transition-colors duration-200 group", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `mt-0.5 p-1.5 rounded-lg ${getDeviationColor(anomaly.deviation)}`, children: _jsx(AlertCircleIcon, { size: 12 }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-baseline gap-2 mb-1", children: [_jsx("span", { className: "text-xs font-bold text-white uppercase tracking-wide", children: anomaly.metric }), _jsx("span", { className: "text-xs text-slate-500", children: formatRelativeTime(anomaly.timestamp) })] }), _jsxs("p", { className: "text-xs text-slate-400 mb-1.5", children: ["Deviation:", ' ', _jsxs("span", { className: `font-bold ${getDeviationColor(anomaly.deviation)}`, children: ["\u0394 ", anomaly.deviation.toFixed(2), "\u03C3"] })] }), _jsxs("p", { className: "text-xs text-slate-500 font-mono", children: ["Value: ", anomaly.value.toFixed(3)] })] })] }) }, idx))) })) }), _jsxs("div", { className: "border-t border-lab-800 p-3 flex gap-2", children: [_jsxs("button", { onClick: handleExport, disabled: anomalies.length === 0, className: "flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed", children: [_jsx(DownloadIcon, { size: 13 }), "Export"] }), _jsxs("button", { onClick: () => clearAnomalies(), disabled: anomalies.length === 0, className: "flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed", children: [_jsx(TrashIcon, { size: 13 }), "Clear"] })] })] }));
}
