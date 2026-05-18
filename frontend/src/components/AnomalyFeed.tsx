import { memo, useMemo } from 'react';

import {
  AlertCircleIcon,
  DownloadIcon,
  ShieldAlert,
  TrashIcon,
  TrendingUp
} from 'lucide-react';

import {
  useAppDispatch,
  useAppSelector
} from '../store';

import { clearAnomalies } from '../store/telemetrySlice';

import { AnomalyEvent } from '../types';

import {
  downloadCSV,
  exportAnomaliesAsCSV,
  formatRelativeTime
} from '../utils/formatting';

interface Props {
  anomalies: AnomalyEvent[];
}

function AnomalyFeedComponent({
  anomalies
}: Props) {
  const dispatch = useAppDispatch();

  const { showAnomalies } = useAppSelector(
    (state) => state.telemetry
  );

  const visibleAnomalies = useMemo(
    () => anomalies.slice(0, 8),
    [anomalies]
  );

  const handleExport = () => {
    const csv = exportAnomaliesAsCSV(anomalies);

    downloadCSV(
      csv,
      `telemetry-anomalies-${Date.now()}.csv`
    );
  };

  const getSeverity = (deviation: number) => {
    const abs = Math.abs(deviation);

    if (abs >= 3) {
      return {
        badge: 'critical',
        accent: 'bg-m-red',
        surface: 'bg-m-red/10',
        text: 'text-m-red'
      };
    }

    if (abs >= 2.5) {
      return {
        badge: 'elevated',
        accent: 'bg-warning',
        surface: 'bg-warning/10',
        text: 'text-warning'
      };
    }

    return {
      badge: 'moderate',
      accent: 'bg-m-blue-light',
      surface: 'bg-m-blue-light/10',
      text: 'text-m-blue-light'
    };
  };

  return (
    <div className="flex h-full flex-col">
      {/* ===================================================== */}
      {/* EMPTY */}
      {/* ===================================================== */}

      {!visibleAnomalies.length && (
        <div
          className="
            flex flex-1 flex-col
            items-center justify-center
            px-6 py-12
          "
        >
          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-hairline
              bg-surface-card/70
            "
          >
            <ShieldAlert
              size={28}
              className="text-success"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-on-dark">
              No active anomalies
            </p>

            <p className="mt-3 max-w-xs text-sm leading-7 text-body">
              All telemetry streams are currently
              operating within expected signal
              thresholds.
            </p>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* LIST */}
      {/* ===================================================== */}

      {!!visibleAnomalies.length && (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {visibleAnomalies.map((anomaly, idx) => {
              const severity = getSeverity(
                anomaly.deviation
              );

              return (
                <div
                  key={`${anomaly.metric}-${idx}`}
                  className="
                    group overflow-hidden
                    rounded-xl
                    border border-hairline
                    bg-surface-card/70
                    transition-all duration-200

                    hover:border-white/[0.08]
                    hover:bg-surface-card
                  "
                >
                  {/* TOP ACCENT */}

                  <div
                    className={`h-[1px] w-full ${severity.accent} opacity-60`}
                  />

                  {/* CONTENT */}

                  <div className="p-5">
                    {/* TOP */}

                    <div className="flex items-start justify-between gap-4">
                      {/* LEFT */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              flex h-10 w-10 shrink-0
                              items-center justify-center
                              rounded-xl
                              ${severity.surface}
                            `}
                          >
                            <TrendingUp
                              size={18}
                              className={severity.text}
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="truncate text-sm font-medium text-on-dark">
                                {anomaly.metric}
                              </h4>

                              <div
                                className={`
                                  rounded-full
                                  px-2 py-1
                                  text-[10px]
                                  uppercase tracking-[0.18em]

                                  ${severity.surface}
                                  ${severity.text}
                                `}
                              >
                                {severity.badge}
                              </div>
                            </div>

                            <p className="mt-2 text-sm leading-7 text-body">
                              Signal variance exceeded
                              operational baseline
                              thresholds.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* TIME */}

                      <div className="shrink-0 text-right">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                          detected
                        </p>

                        <p className="mt-2 text-xs font-medium text-body">
                          {formatRelativeTime(
                            anomaly.timestamp
                          )}
                        </p>
                      </div>
                    </div>

                    {/* METRICS */}

                    <div
                      className="
                        mt-5 grid gap-3

                        sm:grid-cols-2
                      "
                    >
                      {/* DEVIATION */}

                      <div
                        className="
                          rounded-xl
                          border border-hairline
                          bg-surface-soft/70
                          p-4
                        "
                      >
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                          deviation
                        </p>

                        <div className="mt-3 flex items-end gap-2">
                          <span
                            className={`text-2xl font-semibold tracking-[-0.05em] ${severity.text}`}
                          >
                            {anomaly.deviation.toFixed(
                              2
                            )}
                          </span>

                          <span className="pb-1 text-sm text-muted">
                            σ
                          </span>
                        </div>
                      </div>

                      {/* VALUE */}

                      <div
                        className="
                          rounded-xl
                          border border-hairline
                          bg-surface-soft/70
                          p-4
                        "
                      >
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                          signal value
                        </p>

                        <div className="mt-3 flex items-end gap-2">
                          <span className="text-2xl font-semibold tracking-[-0.05em] text-on-dark">
                            {anomaly.value.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* ACTIONS */}
      {/* ===================================================== */}

      <div
        className="
          mt-6 grid gap-3
          border-t border-hairline
          pt-6

          sm:grid-cols-2
        "
      >
        {/* EXPORT */}

        <button
          onClick={handleExport}
          disabled={!anomalies.length}
          className="
            flex h-12 items-center justify-center gap-3
            rounded-xl
            border border-hairline
            bg-surface-card/70
            text-sm font-medium text-on-dark
            transition-all duration-200

            hover:border-m-blue-light/20
            hover:bg-m-blue-light/10

            disabled:cursor-not-allowed
            disabled:opacity-40

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-m-blue-light/40
          "
        >
          <DownloadIcon size={16} />

          Export logs
        </button>

        {/* CLEAR */}

        <button
          onClick={() =>
            dispatch(clearAnomalies())
          }
          disabled={!anomalies.length}
          className="
            flex h-12 items-center justify-center gap-3
            rounded-xl
            border border-hairline
            bg-surface-card/70
            text-sm font-medium text-body
            transition-all duration-200

            hover:border-m-red/20
            hover:bg-m-red/10
            hover:text-m-red

            disabled:cursor-not-allowed
            disabled:opacity-40

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-m-red/30
          "
        >
          <TrashIcon size={16} />

          Clear buffer
        </button>
      </div>
    </div>
  );
}

export const AnomalyFeed = memo(
  AnomalyFeedComponent
);