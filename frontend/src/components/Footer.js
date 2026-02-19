import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { Wifi, Clock, Signal } from 'lucide-react';
export function Footer() {
    const wsLatency = useTelemetryStore((s) => s.wsLatency);
    const messageCount = useTelemetryStore((s) => s.messageCount);
    const readings = useTelemetryStore((s) => s.readings);
    const connected = useTelemetryStore((s) => s.connected);
    const [streamingFreq, setStreamingFreq] = useState('0.0 Hz');
    useEffect(() => {
        if (readings.length < 2)
            return;
        const recentReadings = readings.slice(-10);
        if (recentReadings.length < 2)
            return;
        const timeSpanMs = recentReadings[recentReadings.length - 1].timestamp - recentReadings[0].timestamp;
        if (timeSpanMs === 0)
            return;
        const freq = (recentReadings.length / timeSpanMs) * 1000;
        setStreamingFreq(`${freq.toFixed(1)} Hz`);
    }, [readings]);
    return (_jsxs("div", { className: "border-t border-lab-800 bg-lab-900 px-6 py-3 flex items-center justify-between text-xs text-slate-400 font-medium", children: [_jsxs("div", { className: "flex items-center gap-8", children: [_jsxs("div", { className: "flex items-center gap-3 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700", children: [_jsx(Wifi, { size: 14, className: connected ? 'text-emerald-400' : 'text-slate-600' }), _jsx("span", { className: connected ? 'text-emerald-400 font-semibold' : 'text-slate-500', children: connected ? 'Connected' : 'Offline' })] }), _jsxs("div", { className: "flex items-center gap-3 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700", children: [_jsx(Clock, { size: 14, className: "text-cyan-400" }), _jsxs("span", { className: "text-slate-300 font-mono font-semibold", children: [wsLatency.toFixed(0), "ms"] })] }), _jsxs("div", { className: "flex items-center gap-3 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700", children: [_jsx(Signal, { size: 14, className: "text-purple-400" }), _jsx("span", { className: "text-slate-300 font-mono font-semibold", children: streamingFreq })] })] }), _jsxs("div", { className: "flex items-center gap-6 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-slate-500 text-xs", children: "Total samples" }), _jsx("p", { className: "font-mono text-slate-300 font-bold", children: messageCount.toLocaleString() })] }), _jsx("div", { className: "w-px h-6 bg-lab-700" }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-slate-500 text-xs", children: "Data points" }), _jsx("p", { className: "font-mono text-slate-300 font-bold", children: readings.length.toLocaleString() })] })] })] }));
}
