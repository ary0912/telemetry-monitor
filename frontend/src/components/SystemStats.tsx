import React, { useMemo } from 'react';
import { TelemetryReading } from '../types';
import { calculateRollingAverage, formatMetricValue } from '../utils/anomalyDetection';
import { METRIC_CONFIGS, DISPLAY_METRICS } from '../utils/constants';

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
    <div className="p-4">
      <h3 className="font-semibold text-slate-100 text-sm mb-4">System summary</h3>

      <div className="space-y-3">
        {DISPLAY_METRICS.map((metric) => {
          const config = METRIC_CONFIGS[metric];
          const value = stats[metric];

          return (
            <div key={metric} className="flex items-baseline justify-between text-xs">
              <span className="text-slate-400">{config.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-slate-100">
                  {formatMetricValue(value, metric)}
                </span>
                <span className="text-slate-500">{config.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">Rolling 1-minute average</p>
      </div>
    </div>
  );
}
