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
      <div className="glass-card rounded-xl px-4 py-3 shadow-premium border border-white/10">
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
          {new Date(payload[0]?.payload?.timestamp).toLocaleTimeString()}
        </p>
        <div className="space-y-2">
          {payload.map((entry: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-6">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{entry.name}</span>
              <span style={{ color: entry.color }} className="text-[10px] font-mono font-black">
                {entry.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col p-4 lg:p-8">
      <div className="mb-4 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base lg:text-xl font-black text-white glow-text uppercase tracking-[0.3em] italic">Grid Telemetry</h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[8px] lg:text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">
              Nodes: {readings.length} <span className="hidden sm:inline">// Status: Nominal</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none px-3 lg:px-4 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[8px] lg:text-[9px] font-black text-cyber-cyan uppercase tracking-widest flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-cyber-cyan animate-ping text-center" />
            Live Stream
          </div>
          <div className="flex-1 sm:flex-none px-3 lg:px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[8px] lg:text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">
            60 FPS / HD
          </div>
        </div>
      </div>

      {readings.length === 0 ? (
        <div className="w-full flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="relative w-16 h-16 lg:w-24 lg:h-24">
            <div className="absolute inset-0 rounded-full border-2 border-white/5" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyber-cyan animate-spin" />
            <div className="absolute inset-2 lg:inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-2 lg:inset-4 rounded-full border border-transparent border-b-cyber-purple animate-spin-reverse" />
          </div>
          <div className="text-center px-4">
            <p className="label-caps glow-text text-cyber-cyan !text-[9px] lg:!text-[10px]">Establishing Connection</p>
            <p className="text-[8px] lg:text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-widest animate-pulse max-w-xs mx-auto text-center">Syncing with production grid telemetry via neural link...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 bg-white/[0.01] rounded-2xl border border-white/5 p-2 lg:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                {DISPLAY_METRICS.map(metric => (
                  <linearGradient key={metric} id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={METRIC_CONFIGS[metric].color} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={METRIC_CONFIGS[metric].color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(255, 255, 255, 0.03)"
                vertical={false}
              />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}
                stroke="#475569"
                style={{ fontSize: '8px', fontWeight: 700 }}
                tick={{ fill: '#475569' }}
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis
                stroke="#475569"
                style={{ fontSize: '8px', fontWeight: 700 }}
                tick={{ fill: '#475569' }}
                width={35}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: 'rgba(56, 189, 248, 0.2)', strokeWidth: 1 }} 
              />

              {DISPLAY_METRICS.map(metric => (
                <Area
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={METRIC_CONFIGS[metric].color}
                  fill={`url(#grad-${metric})`}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  name={METRIC_CONFIGS[metric].label}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Legend */}
      {readings.length > 0 && (
        <div className="mt-4 lg:mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 lg:gap-3">
          {DISPLAY_METRICS.map((metric) => (
            <div key={metric} className="flex flex-col gap-1.5 lg:gap-2 p-2.5 lg:p-3 rounded-lg lg:rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full"
                  style={{ backgroundColor: METRIC_CONFIGS[metric].color, boxShadow: `0 0 10px ${METRIC_CONFIGS[metric].color}40` }}
                />
                <span className="text-slate-500 font-black uppercase text-[8px] lg:text-[10px] tracking-wider group-hover:text-slate-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">{METRIC_CONFIGS[metric].label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] lg:text-xs font-mono font-black text-white">
                  {chartData[chartData.length - 1][metric as keyof typeof chartData[0]].toFixed(1)}
                </span>
                <span className="text-[7px] lg:text-[8px] text-slate-600 font-bold uppercase">{METRIC_CONFIGS[metric].unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
