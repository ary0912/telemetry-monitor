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
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        {DISPLAY_METRICS.map((metric) => {
          const config = METRIC_CONFIGS[metric];
          const value = stats[metric];
          const [min, max] = config.normalRange;
          const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
          const isOutOfRange = value < min || value > max;

          return (
            <div key={metric} className="group space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-shadow duration-500"
                    style={{ 
                      backgroundColor: isOutOfRange ? 'var(--color-cyber-red)' : config.color, 
                      boxShadow: `0 0 10px ${isOutOfRange ? 'var(--color-cyber-red)' : config.color}40` 
                    }}
                  />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-hover:text-slate-300 transition-colors">{config.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`font-mono text-sm font-black tabular-nums tracking-tighter ${isOutOfRange ? 'text-rose-500' : 'text-white'}`}>
                    {formatMetricValue(value, metric)}
                  </span>
                  <span className="text-[9px] text-slate-600 font-bold uppercase">{config.unit}</span>
                </div>
              </div>
              
              {/* Segmented Progress Bar */}
              <div className="flex gap-1 h-1.5 w-full">
                {[...Array(24)].map((_, i) => {
                  const segmentLimit = (i / 23) * 100;
                  const isActive = segmentLimit <= percentage;
                  
                  return (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-sm transition-all duration-300 ${
                        isActive
                          ? (isOutOfRange ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : `bg-white opacity-40 shadow-[0_0_8px_rgba(255,255,255,0.2)]`)
                          : 'bg-white/5'
                      }`}
                      style={{ 
                        backgroundColor: isActive && !isOutOfRange ? config.color : undefined,
                        opacity: isActive ? 1 : 0.1,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
