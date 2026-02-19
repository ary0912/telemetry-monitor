import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTelemetryStore } from '../store/telemetry';
import { ExperimentHeader } from './ExperimentHeader';
import { Sidebar } from './Sidebar';
import { TelemetryChart } from './TelemetryChart';
import { AnomalyFeed } from './AnomalyFeed';
import { SystemStats } from './SystemStats';
import { Footer } from './Footer';
export function Dashboard() {
    const readings = useTelemetryStore((s) => s.readings);
    const anomalies = useTelemetryStore((s) => s.anomalies);
    const connected = useTelemetryStore((s) => s.connected);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-lab text-slate-100 flex flex-col", children: [_jsx(ExperimentHeader, {}), _jsxs("div", { className: "flex flex-1 overflow-hidden gap-4 p-4", children: [_jsx("div", { className: "w-64 flex-shrink-0", children: _jsx(Sidebar, {}) }), _jsx("div", { className: "flex-1 flex flex-col overflow-hidden min-w-0", children: _jsx("div", { className: "flex-1 overflow-hidden", children: _jsx(TelemetryChart, { readings: readings }) }) }), _jsxs("div", { className: "w-80 flex-shrink-0 flex flex-col gap-4 overflow-hidden", children: [_jsx("div", { className: "flex-1 card overflow-y-auto", children: _jsx(AnomalyFeed, { anomalies: anomalies }) }), _jsx("div", { className: "card overflow-y-auto", children: _jsx(SystemStats, { readings: readings }) })] })] }), _jsx(Footer, {})] }));
}
