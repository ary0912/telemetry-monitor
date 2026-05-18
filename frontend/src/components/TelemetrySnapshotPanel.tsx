import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Layers3,
  Clock3,
  ShieldCheck,
  AlertTriangle,
  Activity
} from 'lucide-react';

import { TelemetryReading } from '../types';

interface TelemetrySnapshotPanelProps {
  readings: TelemetryReading[];
  anomalyCount?: number;
}

type SnapshotStatus = 'stable' | 'warning' | 'critical';

interface Snapshot {
  id: string;
  createdAt: number;

  metrics: {
    temperature: number;
    voltage: number;
    signalIntegrity: number;
  };

  anomalyCount: number;

  status: SnapshotStatus;
}

const STORAGE_KEY = 'telemetry_snapshot_archive_v2';
const MAX_SNAPSHOTS = 6;

export function TelemetrySnapshotPanel({
  readings,
  anomalyCount = 0
}: TelemetrySnapshotPanelProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [captureSuccess, setCaptureSuccess] = useState(false);

  /* ========================================================= */
  /* HYDRATE */
  /* ========================================================= */

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (!stored) return;

      setSnapshots(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to restore snapshots', error);
    }
  }, []);

  /* ========================================================= */
  /* PERSIST */
  /* ========================================================= */

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(snapshots)
    );
  }, [snapshots]);

  /* ========================================================= */
  /* LATEST READING */
  /* ========================================================= */

  const latest = useMemo(
    () => (readings.length ? readings[readings.length - 1] : null),
    [readings]
  );

  /* ========================================================= */
  /* STATUS */
  /* ========================================================= */

  const deriveStatus = (
    integrity: number,
    anomalies: number
  ): SnapshotStatus => {
    if (integrity < 88 || anomalies > 8) {
      return 'critical';
    }

    if (integrity < 95 || anomalies > 3) {
      return 'warning';
    }

    return 'stable';
  };

  /* ========================================================= */
  /* CREATE SNAPSHOT */
  /* ========================================================= */

  const createSnapshot = () => {
    if (!latest) return;

    const snapshot: Snapshot = {
      id: crypto.randomUUID(),

      createdAt: Date.now(),

      metrics: {
        temperature: latest.temperature,
        voltage: latest.voltage,
        signalIntegrity: latest.signalIntegrity
      },

      anomalyCount,

      status: deriveStatus(
        latest.signalIntegrity,
        anomalyCount
      )
    };

    setSnapshots((current) => [
      snapshot,
      ...current.slice(0, MAX_SNAPSHOTS - 1)
    ]);

    setCaptureSuccess(true);

    window.setTimeout(() => {
      setCaptureSuccess(false);
    }, 1600);
  };

  /* ========================================================= */
  /* STATUS CONFIG */
  /* ========================================================= */

  const statusConfig = {
    stable: {
      label: 'Stable',
      color:
        'text-emerald-300 border-emerald-500/20 bg-emerald-500/10',
      dot: 'bg-emerald-400'
    },

    warning: {
      label: 'Warning',
      color:
        'text-amber-300 border-amber-500/20 bg-amber-500/10',
      dot: 'bg-amber-400'
    },

    critical: {
      label: 'Critical',
      color:
        'text-rose-300 border-rose-500/20 bg-rose-500/10',
      dot: 'bg-rose-400'
    }
  };

  return (
    <section
      className="
        overflow-hidden rounded-2xl
        border border-hairline
        bg-surface-soft/90
        backdrop-blur-xl
      "
    >
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div
        className="
          flex items-start justify-between gap-4
          border-b border-white/5
          px-6 py-5
        "
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
            telemetry archive
          </p>

          <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.04em] text-on-dark">
            State preservation
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
            Preserve operational telemetry states for
            anomaly investigation, replay analysis, and
            forensic diagnostics.
          </p>
        </div>

        {/* ACTION */}

        <button
          type="button"
          onClick={createSnapshot}
          disabled={!latest}
          aria-label="Capture telemetry snapshot"
          className={`
            group relative inline-flex items-center gap-3
            overflow-hidden rounded-xl
            border px-4 py-3
            text-[11px] font-semibold uppercase tracking-[0.22em]
            transition-all duration-300

            ${
              captureSuccess
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                : 'border-m-blue-light/20 bg-m-blue-light/10 text-m-blue-light hover:border-m-blue-light/40 hover:bg-m-blue-light/15'
            }

            disabled:cursor-not-allowed
            disabled:opacity-40
          `}
        >
          <div
            className="
              absolute inset-0 opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
            "
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_70%)]" />
          </div>

          <Camera
            size={15}
            className={captureSuccess ? 'animate-pulse' : ''}
          />

          <span className="relative z-10">
            {captureSuccess
              ? 'Frame captured'
              : 'Capture frame'}
          </span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* BODY */}
      {/* ========================================================= */}

      <div className="p-5">
        {/* META */}

        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-m-blue-light shadow-[0_0_10px_rgba(56,189,248,0.4)]" />

            <span className="text-[10px] uppercase tracking-[0.24em] text-muted">
              {snapshots.length} preserved states
            </span>
          </div>

          <div className="rounded-full border border-white/5 bg-white/2 px-3 py-1.5">
            <span className="text-[10px] uppercase tracking-[0.24em] text-muted">
              forensic retention
            </span>
          </div>
        </div>

        {/* EMPTY */}

        {snapshots.length === 0 ? (
          <div
            className="
              rounded-2xl border border-dashed
              border-white/10
              bg-white/2
              p-8
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  border border-white/5
                  bg-surface-card
                "
              >
                <Layers3
                  size={20}
                  className="text-m-blue-light"
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-on-dark">
                  No telemetry frames preserved
                </h4>

                <p className="mt-2 max-w-md text-sm leading-7 text-muted">
                  Capture operational states during
                  anomalies, instability spikes, or
                  mission-critical telemetry deviations.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {snapshots.map((snapshot) => {
                const status =
                  statusConfig[snapshot.status];

                return (
                  <motion.div
                    key={snapshot.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 14,
                      scale: 0.98
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      y: -10
                    }}
                    transition={{
                      duration: 0.28
                    }}
                    className="
                      group relative overflow-hidden
                      rounded-2xl
                      border border-white/5
                      bg-white/2
                      p-5
                      transition-all duration-300

                      hover:border-m-blue-light/20
                      hover:bg-white/3
                    "
                  >
                    {/* GLOW */}

                    <div
                      className="
                        pointer-events-none absolute inset-0
                        opacity-0 transition-opacity duration-500
                        group-hover:opacity-100
                      "
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_70%)]" />
                    </div>

                    {/* TOP */}

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            flex h-11 w-11 items-center justify-center
                            rounded-2xl border
                            ${status.color}
                          `}
                        >
                          {snapshot.status ===
                          'critical' ? (
                            <AlertTriangle size={18} />
                          ) : snapshot.status ===
                            'warning' ? (
                            <Activity size={18} />
                          ) : (
                            <ShieldCheck size={18} />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${status.dot}`}
                            />

                            <p className="text-sm font-semibold text-on-dark">
                              {status.label} telemetry
                              frame
                            </p>
                          </div>

                          <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted">
                            anomaly count ·{' '}
                            {snapshot.anomalyCount}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 text-muted">
                          <Clock3 size={13} />

                          <span className="text-[10px] uppercase tracking-[0.22em]">
                            {new Date(
                              snapshot.createdAt
                            ).toLocaleTimeString([], {
                              hour12: false
                            })}
                          </span>
                        </div>

                        <p className="mt-2 text-[11px] text-muted">
                          {formatRelativeTime(
                            snapshot.createdAt
                          )}
                        </p>
                      </div>
                    </div>

                    {/* METRICS */}

                    <div className="relative mt-5 grid grid-cols-3 gap-3">
                      <MetricCell
                        label="Temperature"
                        value={`${snapshot.metrics.temperature.toFixed(
                          1
                        )}°C`}
                      />

                      <MetricCell
                        label="Voltage"
                        value={`${snapshot.metrics.voltage.toFixed(
                          2
                        )}V`}
                      />

                      <MetricCell
                        label="Integrity"
                        value={`${snapshot.metrics.signalIntegrity.toFixed(
                          1
                        )}%`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================================= */
/* METRIC CELL */
/* ========================================================= */

function MetricCell({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl border border-white/5
        bg-surface-card/70
        p-4
      "
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
        {label}
      </p>

      <p
        className="
          mt-3 font-mono text-[1rem]
          font-semibold tracking-[-0.04em]
          text-on-dark
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ========================================================= */
/* RELATIVE TIME */
/* ========================================================= */

function formatRelativeTime(timestamp: number) {
  const seconds = Math.floor(
    (Date.now() - timestamp) / 1000
  );

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  return `${hours}h ago`;
}