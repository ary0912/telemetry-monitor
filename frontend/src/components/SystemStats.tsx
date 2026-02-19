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
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-lab-800 flex items-center gap-2">
        <BarChart3 size={16} className="text-cyan-400" />
        <div>
          <h3 className="font-bold text-white">System summary</h3>
          <p className="text-xs text-slate-500">1-minute rolling average</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {DISPLAY_METRICS.map((metric) => {
            const config = METRIC_CONFIGS[metric];
            const value = stats[metric];
            const [min, max] = config.normalRange;
            const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
            const isOutOfRange = value < min || value > max;

            return (
              <div key={metric} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-xs font-semibold text-slate-300">{config.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xs font-bold text-white">
                      {formatMetricValue(value, metric)}
                    </span>
                    <span className="text-xs text-slate-500">{config.unit}</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-1.5 bg-lab-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isOutOfRange
                        ? 'bg-gradient-to-r from-red-500 to-orange-500'
                        : 'bg-gradient-accent'
                    }`}
                    style={{ width: `${Math.max(5, percentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
