import { motion } from 'framer-motion';

import {
  AlertTriangle,
  Activity,
  Clock3,
  RefreshCcw,
  Wifi,
  WifiOff
} from 'lucide-react';

import { AnomalyEvent } from '../types';
import { getDeviationDescription } from '../utils/anomalyDetection';

/* ========================================================= */
/* TYPES */
/* ========================================================= */

interface EventTimelineProps {
  anomalies: AnomalyEvent[];
  staleStream: boolean;
  connected: boolean;
}

interface TimelineEvent {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function EventTimeline({
  anomalies,
  staleStream,
  connected
}: EventTimelineProps) {
  /* ========================================================= */
  /* EVENTS */
  /* ========================================================= */

  const events: TimelineEvent[] = [
    {
      id: 'stream-status',

      title: connected
        ? 'Telemetry stream active'
        : 'Stream disconnected',

      subtitle: connected
        ? 'Realtime ingestion pipeline operating normally'
        : 'Attempting automatic reconnection',

      timestamp: new Date().toISOString(),

      severity: connected ? 'info' : 'critical'
    },

    ...anomalies.slice(0, 4).map((anomaly, index) => ({
      id: `anomaly-${anomaly.timestamp}-${index}`,

      title: `${anomaly.metric} anomaly detected`,

      subtitle: `${getDeviationDescription(
        anomaly.deviation
      )} deviation · ${anomaly.value.toFixed(3)}`,

      timestamp: anomaly.timestamp,

      severity:
        (
          Math.abs(anomaly.deviation) > 3
            ? 'critical'
            : Math.abs(anomaly.deviation) > 2.5
            ? 'warning'
            : 'info'
        ) as TimelineEvent['severity']
    }))
  ];

  /* ========================================================= */
  /* STALE STREAM */
  /* ========================================================= */

  if (staleStream) {
    events.unshift({
      id: 'stale-stream',

      title: 'Telemetry delay detected',

      subtitle:
        'No incoming signal received within expected interval',

      timestamp: new Date().toISOString(),

      severity: 'warning'
    });
  }

  /* ========================================================= */
  /* EMPTY STATE */
  /* ========================================================= */

  const hasEvents = events.length > 0;

  return (
    <section
      className="
        overflow-hidden rounded-[28px]
        border border-white/5
        bg-white/2
        backdrop-blur-xl
      "
    >
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div
        className="
          flex items-center justify-between
          border-b border-white/5
          px-6 py-5
        "
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
            operational timeline
          </p>

          <h3 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.03em] text-white">
            Event chronology
          </h3>
        </div>

        <div
          className="
            flex items-center gap-2
            rounded-full
            border border-white/5
            bg-white/3
            px-3 py-2
          "
        >
          <Clock3 className="h-3.5 w-3.5 text-cyan-300" />

          <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
            Live
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BODY */}
      {/* ========================================================= */}

      <div className="p-5">
        {!hasEvents ? (
          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl border border-dashed border-white/6
              bg-white/1.5
              px-6 py-14
              text-center
            "
          >
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-white/3
              "
            >
              <Activity className="h-6 w-6 text-white/30" />
            </div>

            <h4 className="mt-5 text-sm font-medium text-white/80">
              No active operational events
            </h4>

            <p className="mt-2 max-w-xs text-sm leading-7 text-white/40">
              Timeline updates will appear here when
              anomalies or stream events are detected.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) => {
              const styles = getEventStyles(
                event.severity
              );

              return (
                <motion.div
                  key={event.id}
                  initial={{
                    opacity: 0,
                    y: 8
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.28,
                    delay: index * 0.03
                  }}
                  className="
                    group relative overflow-hidden
                    rounded-2xl
                    border border-white/5
                    bg-white/2
                    p-4
                    transition-colors duration-200

                    hover:bg-white/3
                  "
                >
                  {/* LEFT ACCENT */}

                  <div
                    className={`absolute left-0 top-0 h-full w-0.5 ${styles.line}`}
                  />

                  <div className="flex items-start gap-4">
                    {/* ICON */}

                    <div
                      className={`
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-2xl
                        border ${styles.border}
                        ${styles.bg}
                      `}
                    >
                      {event.severity ===
                      'critical' ? (
                        <AlertTriangle
                          size={17}
                          className={styles.icon}
                        />
                      ) : event.severity ===
                        'warning' ? (
                        <RefreshCcw
                          size={17}
                          className={styles.icon}
                        />
                      ) : connected ? (
                        <Wifi
                          size={17}
                          className={styles.icon}
                        />
                      ) : (
                        <WifiOff
                          size={17}
                          className={styles.icon}
                        />
                      )}
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-medium tracking-[-0.01em] text-white">
                            {event.title}
                          </h4>

                          <p className="mt-2 text-sm leading-7 text-white/45">
                            {event.subtitle}
                          </p>
                        </div>

                        <span className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-white/30">
                          {new Date(
                            event.timestamp
                          ).toLocaleTimeString([], {
                            hour12: false
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================================= */
/* STYLES */
/* ========================================================= */

function getEventStyles(
  severity: 'critical' | 'warning' | 'info'
) {
  switch (severity) {
    case 'critical':
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/10',
        icon: 'text-red-300',
        line: 'bg-red-400'
      };

    case 'warning':
      return {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/10',
        icon: 'text-amber-300',
        line: 'bg-amber-400'
      };

    default:
      return {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/10',
        icon: 'text-cyan-300',
        line: 'bg-cyan-400'
      };
  }
}