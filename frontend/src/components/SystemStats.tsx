import React, { useMemo } from 'react';
import { TelemetryReading } from '../types';
import { calculateRollingAverage, formatMetricValue } from '../utils/anomalyDetection';
import { METRIC_CONFIGS, DISPLAY_METRICS } from '../utils/constants';
import { BarChart3 } from 'lucide-react';

interface Props {
  readings: TelemetryReading[];
}

export function SystemStats({ readings }: Props) {
  // Memoize calculations to avoid re-computing on every render
  const stats = useMemo(() => {
    if (readings.length === 0) {
      return DISPLAY_METRICS.reduce(
        (acc, metric) => {
          acc[metric] = 0;
          return acc;
        },
        {} as Record<string, number>
      );
    }

    return DISPLAY_METRICS.reduce(
      (acc, metric) => {
        acc[metric] = calculateRollingAverage(readings, metric, 150);
        return acc;
      },
      {} as Record<string, number>
    );
  }, [readings]);

  return (
    <div className="flex flex-col h-full bg-deep">

      <div className="flex-1 overflow-y-auto space-y-4">
        {DISPLAY_METRICS.map((metric) => {
          const config = METRIC_CONFIGS[metric];
          const value = stats[metric];
          const [min, max] = config.normalRange;
          const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
          const isOutOfRange = value < min || value > max;

          return (
            <div key={metric} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}60` }}
                  />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{config.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xs font-black text-white tabular-nums tracking-tighter">
                    {formatMetricValue(value, metric)}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">{config.unit}</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="h-1 bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 transition-all duration-500 delay-[${i * 20}ms] ${
                      i / 20 * 100 <= percentage
                        ? (isOutOfRange ? 'bg-rose-500' : 'bg-cyber-cyan')
                        : 'bg-white/5'
                    } ${isOutOfRange && i / 20 * 100 <= percentage ? 'animate-pulse' : ''}`}
                    style={{ 
                      opacity: i / 20 * 100 <= percentage ? 1 : 0.2,
                      boxShadow: i / 20 * 100 <= percentage ? `0 0 5px ${isOutOfRange ? '#f43f5e' : '#00f2ff'}40` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
