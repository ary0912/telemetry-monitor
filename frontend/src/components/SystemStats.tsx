import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

import { TelemetryReading } from '../types';
import {
  calculateRollingAverage,
  formatMetricValue
} from '../utils/anomalyDetection';

import {
  METRIC_CONFIGS,
  DISPLAY_METRICS
} from '../utils/constants';

interface Props {
  readings: TelemetryReading[];
}

export function SystemStats({ readings }: Props) {
  /**
   * =================================================
   * MEMOIZED METRIC CALCULATIONS
   * =================================================
   */

  const stats = useMemo(() => {
    if (!readings.length) {
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
        acc[metric] = calculateRollingAverage(
          readings,
          metric,
          150
        );

        return acc;
      },
      {} as Record<string, number>
    );
  }, [readings]);

  /**
   * =================================================
   * HEALTH SUMMARY
   * =================================================
   */

  const healthSummary = useMemo(() => {
    let healthy = 0;

    DISPLAY_METRICS.forEach((metric) => {
      const config = METRIC_CONFIGS[metric];
      const value = stats[metric];

      const [min, max] = config.normalRange;

      if (value >= min && value <= max) {
        healthy += 1;
      }
    });

    return Math.round(
      (healthy / DISPLAY_METRICS.length) * 100
    );
  }, [stats]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-white/5 bg-[#07101A]/90 backdrop-blur-2xl">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-white/5 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-m-blue-light shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                Runtime telemetry
              </p>
            </div>

            <h3 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.05em] text-on-dark">
              System analytics
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Rolling telemetry intelligence across monitored
              operational channels and adaptive runtime systems.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-emerald-500/15 bg-emerald-500/10 px-4 py-3 md:block">
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={16}
                className="text-emerald-300"
              />

              <div>
                <p className="text-[9px] uppercase tracking-[0.24em] text-emerald-300/70">
                  Health
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-200">
                  {healthSummary}% Stable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* BODY */}
      {/* ================================================= */}

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-6">
          {DISPLAY_METRICS.map((metric, index) => {
            const config = METRIC_CONFIGS[metric];

            const value = stats[metric];

            const [min, max] = config.normalRange;

            const percentage = Math.max(
              0,
              Math.min(
                100,
                ((value - min) / (max - min)) * 100
              )
            );

            const isOutOfRange =
              value < min || value > max;

            const metricState = isOutOfRange
              ? 'Anomaly'
              : percentage > 80
                ? 'Elevated'
                : 'Nominal';

            return (
              <motion.div
                key={metric}
                initial={{
                  opacity: 0,
                  y: 12
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04
                }}
                className="
                  group relative overflow-hidden
                  rounded-2xl
                  border border-white/5
                  bg-white/2
                  p-5
                  transition-all duration-300
                  hover:border-white/10
                  hover:bg-white/3
                "
              >
                {/* Ambient Glow */}

                <div
                  className="absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at top right, ${config.color}12, transparent 70%)`
                  }}
                />

                {/* Top Row */}

                <div className="relative flex items-start justify-between gap-4">
                  {/* LEFT */}

                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex h-12 w-12 items-center justify-center
                        rounded-2xl border border-white/5
                        bg-white/3
                      "
                      style={{
                        boxShadow: `0 0 24px ${config.color}15`
                      }}
                    >
                      {isOutOfRange ? (
                        <AlertTriangle
                          size={18}
                          style={{
                            color: '#fb7185'
                          }}
                        />
                      ) : (
                        <Activity
                          size={18}
                          style={{
                            color: config.color
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-on-dark">
                          {config.label}
                        </p>

                        <span
                          className={`
                            rounded-full px-2 py-0.5
                            text-[8px] font-black uppercase tracking-[0.18em]
                            ${
                              isOutOfRange
                                ? 'bg-rose-500/10 text-rose-300'
                                : 'bg-emerald-500/10 text-emerald-300'
                            }
                          `}
                        >
                          {metricState}
                        </span>
                      </div>

                      <div className="mt-3 flex items-end gap-2">
                        <span
                          className={`
                            font-mono text-[2rem] font-black
                            tracking-[-0.08em]
                            ${
                              isOutOfRange
                                ? 'text-rose-400'
                                : 'text-on-dark'
                            }
                          `}
                        >
                          {formatMetricValue(
                            value,
                            metric
                          )}
                        </span>

                        <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                          {config.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}

                  <div className="hidden items-center gap-2 rounded-full border border-white/5 bg-white/2 px-3 py-2 lg:flex">
                    <TrendingUp
                      size={14}
                      style={{
                        color: config.color
                      }}
                    />

                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                      Avg Signal
                    </span>
                  </div>
                </div>

                {/* RANGE */}

                <div className="relative mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-muted">
                      Operational range
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      {min} — {max} {config.unit}
                    </span>
                  </div>

                  {/* Segmented Meter */}

                  <div className="flex h-2 w-full gap-1">
                    {[...Array(28)].map((_, i) => {
                      const segmentLimit =
                        (i / 27) * 100;

                      const active =
                        segmentLimit <= percentage;

                      return (
                        <div
                          key={i}
                          className={`
                            h-full flex-1 rounded-full
                            transition-all duration-300
                            ${
                              active
                                ? 'opacity-100'
                                : 'opacity-20'
                            }
                          `}
                          style={{
                            backgroundColor: active
                              ? isOutOfRange
                                ? '#fb7185'
                                : config.color
                              : '#1e293b',
                            boxShadow: active
                              ? `0 0 10px ${
                                  isOutOfRange
                                    ? '#fb7185'
                                    : config.color
                                }40`
                              : 'none'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* FOOTER */}

                <div className="relative mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <BarChart3
                      size={14}
                      className="text-muted"
                    />

                    <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                      Rolling average
                    </span>
                  </div>

                  <div
                    className={`
                      rounded-full px-3 py-1
                      text-[9px] font-bold uppercase tracking-[0.18em]
                      ${
                        isOutOfRange
                          ? 'bg-rose-500/10 text-rose-300'
                          : 'bg-emerald-500/10 text-emerald-300'
                      }
                    `}
                  >
                    {isOutOfRange
                      ? 'Outside Threshold'
                      : 'Within Threshold'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}