import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
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
        voltage: r.voltage * 100, // Scale for better visibility
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
      <div className="bg-slate-900 border border-slate-700 rounded px-3 py-2 shadow-lg">
        <p className="text-xs text-slate-400">
          {new Date(payload[0]?.payload?.timestamp).toLocaleTimeString()}
        </p>
        {payload.map((entry: any, idx: number) => (
          <p key={idx} style={{ color: entry.color }} className="text-xs font-mono">
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-slate-900 rounded-lg border border-slate-800 p-4">
      <h2 className="text-sm font-semibold text-slate-300 mb-4">Telemetry streams</h2>

      {readings.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-slate-500">
          <p>Waiting for data...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} width={40} />
            <Tooltip content={<CustomTooltip />} />

            {/* Temperature */}
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ef4444"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
              name="Temperature"
            />

            {/* Voltage */}
            <Line
              type="monotone"
              dataKey="voltage"
              stroke="#f59e0b"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
              name="Voltage (x100)"
            />

            {/* Signal Noise */}
            <Line
              type="monotone"
              dataKey="signalNoise"
              stroke="#8b5cf6"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
              name="Signal Noise (x100)"
            />

            {/* Laser Stability */}
            <Line
              type="monotone"
              dataKey="laserStability"
              stroke="#06b6d4"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
              name="Laser Stability"
            />

            {/* Control Signal Drift */}
            <Line
              type="monotone"
              dataKey="controlSignalDrift"
              stroke="#ec4899"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
              name="Control Signal Drift (x100)"
            />

            {/* Error Rate */}
            <Line
              type="monotone"
              dataKey="errorRate"
              stroke="#6366f1"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
              name="Error Rate (x1000)"
            />

            {/* Signal Integrity */}
            <Line
              type="monotone"
              dataKey="signalIntegrity"
              stroke="#10b981"
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
              name="Signal Integrity"
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {DISPLAY_METRICS.map((metric) => (
          <div key={metric} className="flex items-center gap-2">
            <div
              className="w-3 h-0.5"
              style={{ backgroundColor: METRIC_CONFIGS[metric].color }}
            />
            <span className="text-slate-400">{METRIC_CONFIGS[metric].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
