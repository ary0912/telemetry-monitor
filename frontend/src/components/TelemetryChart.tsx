import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { TelemetryReading } from '../types';
import { formatMetricValue } from '../utils/anomalyDetection';
import { DISPLAY_METRICS, METRIC_CONFIGS } from '../utils/constants';

interface Props {
  readings: TelemetryReading[];
}

export function TelemetryChart({ readings }: Props) {
  // Memoize chart data to avoid unnecessary re-renders
  const chartData = useMemo(
    () =>
      readings.map((r) => ({
        timestamp: r.timestamp,
        temperature: r.temperature,
        voltage: r.voltage * 100,
        signalNoise: r.signalNoise * 100,
        laserStability: r.laserStability,
        controlSignalDrift: r.controlSignalDrift * 100,
        errorRate: r.errorRate * 1000,
        signalIntegrity: r.signalIntegrity
      })),
    [readings]
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="glass rounded-lg px-4 py-3 shadow-lab-lg border border-lab-700">
        <p className="text-xs text-slate-400 font-semibold mb-2">
          {new Date(payload[0]?.payload?.timestamp).toLocaleTimeString()}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, idx: number) => (
            <p key={idx} style={{ color: entry.color }} className="text-xs font-mono font-semibold">
              {entry.name}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col p-6 animate-scan">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white glow-text uppercase tracking-widest italic">Grid Telemetry</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active nodes: {readings.length} / Signal: nominal</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-cyber-cyan uppercase tracking-widest">Live Stream</div>
          <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-slate-500 uppercase tracking-widest">60FPS</div>
        </div>
      </div>

      {readings.length === 0 ? (
        <div className="w-full flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-lab-800 mx-auto mb-3 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
            </div>
            <p className="text-slate-500 font-medium">Waiting for data...</p>
            <p className="text-xs text-slate-600 mt-1">Connecting to telemetry stream</p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 10 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(58, 74, 131, 0.3)"
              vertical={true}
              opacity={0.5}
            />
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
              stroke="#64748b"
              style={{ fontSize: '11px' }}
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '11px' }}
              tick={{ fill: '#94a3b8' }}
              width={35}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: 'rgba(0, 242, 255, 0.2)', strokeWidth: 2, strokeDasharray: '4 4' }} 
            />

            {/* Temperature */}
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ef4444"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
              name="Temperature"
            />

            {/* Voltage */}
            <Line
              type="monotone"
              dataKey="voltage"
              stroke="#f59e0b"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
              name="Voltage"
            />

            {/* Signal Noise */}
            <Line
              type="monotone"
              dataKey="signalNoise"
              stroke="#8b5cf6"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
              name="Signal Noise"
            />

            {/* Laser Stability */}
            <Line
              type="monotone"
              dataKey="laserStability"
              stroke="#06b6d4"
              dot={false}
              strokeWidth={2.5}
              isAnimationActive={false}
              name="Laser Stability"
            />

            {/* Control Signal Drift */}
            <Line
              type="monotone"
              dataKey="controlSignalDrift"
              stroke="#ec4899"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
              name="Control Drift"
            />

            {/* Error Rate */}
            <Line
              type="monotone"
              dataKey="errorRate"
              stroke="#6366f1"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
              name="Error Rate"
            />

            {/* Signal Integrity */}
            <Line
              type="monotone"
              dataKey="signalIntegrity"
              stroke="#10b981"
              dot={false}
              strokeWidth={2.5}
              isAnimationActive={false}
              name="Signal Integrity"
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      {readings.length > 0 && (
        <div className="mt-6 grid grid-cols-4 gap-4 text-[10px] pt-6 border-t border-white/5">
          {DISPLAY_METRICS.map((metric) => (
            <div key={metric} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
              <div
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                style={{ backgroundColor: METRIC_CONFIGS[metric].color, boxShadow: `0 0 10px ${METRIC_CONFIGS[metric].color}40` }}
              />
              <span className="text-slate-400 font-bold uppercase tracking-widest leading-none">{METRIC_CONFIGS[metric].label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
