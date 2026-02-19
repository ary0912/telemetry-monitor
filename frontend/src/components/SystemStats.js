import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { calculateRollingAverage, formatMetricValue } from '../utils/anomalyDetection';
import { METRIC_CONFIGS, DISPLAY_METRICS } from '../utils/constants';
import { BarChart3 } from 'lucide-react';
export function SystemStats({ readings }) {
    // Memoize calculations to avoid re-computing on every render
    const stats = useMemo(() => {
        if (readings.length === 0) {
            return DISPLAY_METRICS.reduce((acc, metric) => {
                acc[metric] = 0;
                return acc;
            }, {});
        }
        return DISPLAY_METRICS.reduce((acc, metric) => {
            acc[metric] = calculateRollingAverage(readings, metric, 150);
            return acc;
        }, {});
    }, [readings]);
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "p-4 border-b border-lab-800 flex items-center gap-2", children: [_jsx(BarChart3, { size: 16, className: "text-cyan-400" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-white", children: "System summary" }), _jsx("p", { className: "text-xs text-slate-500", children: "1-minute rolling average" })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4", children: _jsx("div", { className: "space-y-3", children: DISPLAY_METRICS.map((metric) => {
                        const config = METRIC_CONFIGS[metric];
                        const value = stats[metric];
                        const [min, max] = config.normalRange;
                        const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
                        const isOutOfRange = value < min || value > max;
                        return (_jsxs("div", { className: "group", children: [_jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: config.color } }), _jsx("span", { className: "text-xs font-semibold text-slate-300", children: config.label })] }), _jsxs("div", { className: "flex items-baseline gap-1", children: [_jsx("span", { className: "font-mono text-xs font-bold text-white", children: formatMetricValue(value, metric) }), _jsx("span", { className: "text-xs text-slate-500", children: config.unit })] })] }), _jsx("div", { className: "h-1.5 bg-lab-800 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full transition-all duration-300 ${isOutOfRange
                                            ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                            : 'bg-gradient-accent'}`, style: { width: `${Math.max(5, percentage)}%` } }) })] }, metric));
                    }) }) })] }));
}
