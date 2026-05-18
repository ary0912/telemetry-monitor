import { memo } from 'react';

import {
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

import { AnomalyEvent } from '../types';
import { getDeviationDescription } from '../utils/anomalyDetection';

interface AnomalyCenterProps {
  anomalies: AnomalyEvent[];
}

function AnomalyCenterComponent({
  anomalies
}: AnomalyCenterProps) {
  const visibleAnomalies = anomalies.slice(0, 4);

  return (
    <section
      className="
        overflow-hidden rounded-2xl
        border border-hairline
        bg-surface-soft/70
      "
    >
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        className="
          flex items-center justify-between gap-4
          border-b border-hairline
          px-5 py-5

          sm:px-6
        "
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
            anomaly intelligence
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-on-dark">
            Signal deviations
          </h3>
        </div>

        <div
          className="
            rounded-full
            bg-warning/10
            px-3 py-1.5
            text-[10px]
            font-medium
            uppercase tracking-[0.18em]
            text-warning
          "
        >
          {anomalies.length} active
        </div>
      </div>

      {/* ===================================================== */}
      {/* EMPTY STATE */}
      {/* ===================================================== */}

      {visibleAnomalies.length === 0 ? (
        <div className="px-5 py-8 sm:px-6">
          <div
            className="
              rounded-xl border border-hairline
              bg-surface-card/70
              p-6
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-success/10
                "
              >
                <AlertTriangle
                  size={18}
                  className="text-success"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-on-dark">
                  No active anomalies
                </h4>

                <p className="mt-2 text-sm leading-7 text-body">
                  Telemetry streams are currently
                  operating within expected signal
                  thresholds.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ===================================================== */
        /* LIST */
        /* ===================================================== */

        <div className="divide-y divide-hairline">
          {visibleAnomalies.map((anomaly) => (
            <div
              key={`${anomaly.metric}-${anomaly.timestamp}`}
              className="
                group px-5 py-5
                transition-colors duration-200

                hover:bg-white/[0.02]

                sm:px-6
              "
            >
              <div className="flex items-start justify-between gap-5">
                {/* LEFT */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-4">
                    {/* ICON */}

                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-xl
                        bg-warning/10
                      "
                    >
                      <AlertTriangle
                        size={18}
                        className="text-warning"
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-medium text-on-dark">
                          {anomaly.metric}
                        </h4>

                        <div
                          className="
                            rounded-full
                            border border-hairline
                            bg-surface-card
                            px-2 py-1
                            text-[10px]
                            uppercase tracking-[0.18em]
                            text-muted
                          "
                        >
                          anomaly
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-body">
                        {getDeviationDescription(
                          anomaly.deviation
                        )}{' '}
                        deviation detected in telemetry
                        behavior.
                      </p>

                      {/* FOOTER */}

                      <div
                        className="
                          mt-5 flex flex-wrap
                          items-center gap-4
                        "
                      >
                        <div
                          className="
                            rounded-full
                            border border-hairline
                            bg-surface-card/70
                            px-3 py-1.5
                            text-[11px]
                            uppercase tracking-[0.18em]
                            text-muted
                          "
                        >
                          {new Date(
                            anomaly.timestamp
                          ).toLocaleTimeString([], {
                            hour12: false
                          })}
                        </div>

                        <div className="text-sm text-body">
                          Signal value:{' '}
                          <span className="font-medium text-on-dark">
                            {anomaly.value.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div
                  className="
                    flex shrink-0 items-center gap-3
                    rounded-xl
                    border border-hairline
                    bg-surface-card/70
                    px-4 py-3
                  "
                >
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                      deviation
                    </p>

                    <p className="mt-1 text-sm font-semibold text-on-dark">
                      {anomaly.deviation.toFixed(2)}
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className="
                      text-muted transition-transform duration-200

                      group-hover:translate-x-0.5
                    "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export const AnomalyCenter = memo(
  AnomalyCenterComponent
);