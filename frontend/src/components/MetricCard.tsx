import { useMemo } from 'react';

import { motion } from 'framer-motion';

import {
  Activity,
  TrendingUp
} from 'lucide-react';

import {
  MetricKey,
  TelemetryReading
} from '../types';

import {
  METRIC_CONFIGS
} from '../utils/constants';

import {
  calculateRollingAverage,
  formatMetricValue
} from '../utils/anomalyDetection';

/* ========================================================= */
/* TYPES */
/* ========================================================= */

interface MetricCardProps {
  metricKey: MetricKey;
  readings: TelemetryReading[];
}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function MetricCard({
  metricKey,
  readings
}: MetricCardProps) {
  const config =
    METRIC_CONFIGS[metricKey];

  const latestValue =
    readings.length > 0
      ? readings[
          readings.length - 1
        ][metricKey]
      : null;

  const rollingAverage =
    useMemo(() => {
      return calculateRollingAverage(
        readings,
        metricKey,
        100
      );
    }, [metricKey, readings]);

  const progress =
    latestValue !== null
      ? Math.min(
          100,
          Math.max(
            0,
            ((latestValue -
              config.normalRange[0]) /
              (config.normalRange[1] -
                config.normalRange[0])) *
              100
          )
        )
      : 0;

  const isHealthy =
    latestValue !== null &&
    latestValue >=
      config.normalRange[0] &&
    latestValue <=
      config.normalRange[1];

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <motion.div
      whileHover={{
        y: -2
      }}
      transition={{
        duration: 0.22
      }}
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-white/6
        bg-white/2
        p-5
        backdrop-blur-2xl
      "
    >
      {/* ========================================================= */}
      {/* AMBIENT GLOW */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-[-40px] top-[-40px] h-[140px] w-[140px] rounded-full blur-3xl opacity-20"
          style={{
            background: config.color
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="relative flex items-start justify-between gap-4">
        {/* left */}

        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/28">
            {config.label}
          </p>

          <div className="mt-4 flex items-end gap-2">
            <h3 className="text-[2.6rem] font-semibold leading-none tracking-[-0.08em] text-white">
              {latestValue !== null
                ? formatMetricValue(
                    latestValue,
                    metricKey
                  )
                : '--'}
            </h3>
          </div>
        </div>

        {/* icon */}

        <div
          className="
            relative flex h-14 w-14
            items-center justify-center
            rounded-2xl
            border border-white/6
            bg-black/20
          "
          style={{
            boxShadow: `0 0 24px ${config.color}18`
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              background: config.color
            }}
          />

          <Activity
            className="h-5 w-5"
            strokeWidth={1.8}
            style={{
              color: config.color
            }}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* PROGRESS */}
      {/* ========================================================= */}

      <div className="relative mt-7">
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{
              width: 0
            }}
            animate={{
              width: `${progress}%`
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${config.color}, ${config.color}90)`
            }}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <div
        className="
          relative mt-6
          grid gap-3
          rounded-xl
          border border-white/6
          bg-white/3
          p-4
        "
      >
        {/* average */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp
              className="h-4 w-4 text-cyan-300"
              strokeWidth={1.8}
            />

            <span className="text-xs uppercase tracking-[0.16em] text-white/32">
              Rolling average
            </span>
          </div>

          <span className="text-sm font-medium text-white/88">
            {formatMetricValue(
              rollingAverage,
              metricKey
            )}
          </span>
        </div>

        {/* threshold */}

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.16em] text-white/32">
            Expected range
          </span>

          <span className="text-xs text-white/60">
            {config.normalRange[0]}
            {' — '}
            {config.normalRange[1]}
            {config.unit}
          </span>
        </div>

        {/* status */}

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.16em] text-white/32">
            Status
          </span>

          <div className="flex items-center gap-2">
            <div
              className={`
                h-2 w-2 rounded-full

                ${
                  isHealthy
                    ? 'bg-emerald-400'
                    : 'bg-amber-400'
                }
              `}
            />

            <span
              className={`
                text-xs font-medium

                ${
                  isHealthy
                    ? 'text-emerald-300'
                    : 'text-amber-300'
                }
              `}
            >
              {isHealthy
                ? 'Nominal'
                : 'Outside range'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}