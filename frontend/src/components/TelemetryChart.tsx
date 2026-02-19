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
    <div className="w-full h-full card flex flex-col p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white mb-1">Telemetry streams</h2>
        <p className="text-sm text-slate-400">Real-time monitoring ({readings.length} samples)</p>
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
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(6, 182, 212, 0.3)', strokeWidth: 1 }} />

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
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs pt-4 border-t border-lab-800">
          {DISPLAY_METRICS.map((metric) => (
            <div key={metric} className="flex items-center gap-2.5 px-2 py-1.5 rounded bg-lab-800">
              <div
                className="w-1 h-3 rounded-full"
                style={{ backgroundColor: METRIC_CONFIGS[metric].color }}
              />
              <span className="text-slate-300 font-medium">{METRIC_CONFIGS[metric].label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
