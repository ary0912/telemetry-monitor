import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

import { TelemetryReading, MetricKey } from '../types';
import { METRIC_CONFIGS } from '../utils/constants';
import { formatMetricValue } from '../utils/anomalyDetection';

interface TelemetryTableProps {
  readings: TelemetryReading[];
  selectedMetrics: readonly MetricKey[];
}

const DEFAULT_METRICS = [
  'temperature',
  'voltage',
  'signalIntegrity',
  'errorRate'
] as const;

export const TelemetryTable = memo(function TelemetryTable({
  readings,
  selectedMetrics
}: TelemetryTableProps) {
  /* ====================================================== */
  /* DATA */
  /* ====================================================== */

  const rows = useMemo(
    () => readings.slice(-80).reverse(),
    [readings]
  );

  const metrics =
    selectedMetrics.length > 0
      ? selectedMetrics.slice(0, 4)
      : DEFAULT_METRICS;

  /* ====================================================== */
  /* EMPTY STATE */
  /* ====================================================== */

  const isEmpty = rows.length === 0;

  /* ====================================================== */
  /* UI */
  /* ====================================================== */

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 12
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.35
      }}
      className="
        overflow-hidden
        rounded-2xl
        border border-white/5
        bg-[#070B14]/90
        backdrop-blur-xl
      "
    >
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div
        className="
          flex items-center justify-between
          border-b border-white/5
          px-6 py-5
        "
      >
        <div>
          <p
            className="
              text-[11px]
              font-medium
              text-muted
            "
          >
            Telemetry Explorer
          </p>

          <h3
            className="
              mt-2
              text-[1.35rem]
              font-semibold
              tracking-[-0.03em]
              text-on-dark
            "
          >
            Realtime signal samples
          </h3>

          <p className="mt-2 text-sm text-muted">
            Live operational telemetry across monitored channels.
          </p>
        </div>

        <div
          className="
            flex items-center gap-2
            rounded-full
            border border-cyan-400/10
            bg-cyan-400/5
            px-4 py-2
          "
        >
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

          <span
            className="
              text-[11px]
              font-medium
              text-cyan-300
            "
          >
            Live
          </span>
        </div>
      </div>

      {/* ================================================== */}
      {/* TABLE VIEWPORT */}
      {/* ================================================== */}

      <div className="relative h-[540px] overflow-hidden">
        {/* TOP SHADOW */}

        <div
          className="
            pointer-events-none absolute inset-x-0 top-0 z-20 h-10
            bg-gradient-to-b from-[#070B14] to-transparent
          "
        />

        {/* BOTTOM SHADOW */}

        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16
            bg-gradient-to-t from-[#070B14] to-transparent
          "
        />

        {/* INTERNAL SCROLL */}

        <div
          className="
            h-full overflow-auto
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-white/10
          "
        >
          {isEmpty ? (
            <div
              className="
                flex h-full items-center justify-center
                px-6
              "
            >
              <div className="text-center">
                <p className="text-sm font-medium text-on-dark">
                  Awaiting telemetry stream
                </p>

                <p className="mt-2 text-sm text-muted">
                  Live signal data will appear here once ingestion begins.
                </p>
              </div>
            </div>
          ) : (
            <table
              className="
                w-full min-w-[720px]
                border-separate border-spacing-0
              "
            >
              {/* ========================================== */}
              {/* HEADER */}
              {/* ========================================== */}

              <thead className="sticky top-0 z-10">
                <tr className="bg-[#0B1120]/96 backdrop-blur-xl">
                  <th
                    className="
                      border-b border-white/5
                      px-6 py-4
                      text-left
                      text-[11px]
                      font-medium
                      text-muted
                    "
                  >
                    Timestamp
                  </th>

                  {metrics.map((metric) => (
                    <th
                      key={metric}
                      className="
                        border-b border-white/5
                        px-6 py-4
                        text-right
                        text-[11px]
                        font-medium
                        text-muted
                      "
                    >
                      {METRIC_CONFIGS[metric].label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ========================================== */}
              {/* BODY */}
              {/* ========================================== */}

              <tbody>
                {rows.map((reading) => (
                  <tr
                    key={reading.timestamp}
                    className="
                      group
                      transition-colors duration-150
                      hover:bg-white/2
                    "
                  >
                    {/* TIMESTAMP */}

                    <td
                      className="
                        border-b border-white/5
                        px-6 py-4
                        whitespace-nowrap
                      "
                    >
                      <div className="flex flex-col">
                        <span
                          className="
                            font-mono text-sm
                            font-medium
                            text-on-dark
                          "
                        >
                          {new Date(
                            reading.timestamp
                          ).toLocaleTimeString([], {
                            hour12: false
                          })}
                        </span>

                        <span
                          className="
                            mt-1 text-[10px]
                            text-muted
                          "
                        >
                          Stream sample
                        </span>
                      </div>
                    </td>

                    {/* METRIC VALUES */}

                    {metrics.map((metric) => (
                      <td
                        key={metric}
                        className="
                          border-b border-white/5
                          px-6 py-4
                          text-right
                          whitespace-nowrap
                        "
                      >
                        <div className="flex flex-col items-end">
                          <span
                            className="
                              font-mono text-sm
                              font-semibold
                              tracking-[-0.02em]
                            "
                            style={{
                              color:
                                METRIC_CONFIGS[metric]
                                  .color
                            }}
                          >
                            {formatMetricValue(
                              reading[metric],
                              metric
                            )}
                          </span>

                          <span
                            className="
                              mt-1 text-[10px]
                              text-muted
                            "
                          >
                            {
                              METRIC_CONFIGS[metric]
                                .unit
                            }
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </motion.section>
  );
});