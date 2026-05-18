import { useEffect, useMemo, useState } from 'react';

import {
  Activity,
  Clock3,
  Database,
  Signal,
  Wifi,
  WifiOff
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useAppSelector } from '../store';

/* ========================================================= */
/* FOOTER */
/* ========================================================= */

export function Footer() {
  const {
    wsLatency,
    messageCount,
    readings,
    connected
  } = useAppSelector(
    (state) => state.telemetry
  );

  const [streamingFreq, setStreamingFreq] =
    useState('0.0 Hz');

  /* ========================================================= */
  /* STREAM FREQUENCY */
  /* ========================================================= */

  useEffect(() => {
    if (readings.length < 2) return;

    const recentReadings =
      readings.slice(-12);

    if (recentReadings.length < 2) return;

    const first =
      recentReadings[0].timestamp;

    const last =
      recentReadings[
        recentReadings.length - 1
      ].timestamp;

    const duration =
      last - first;

    if (duration <= 0) return;

    const frequency =
      (recentReadings.length /
        duration) *
      1000;

    setStreamingFreq(
      `${frequency.toFixed(1)} Hz`
    );
  }, [readings]);

  /* ========================================================= */
  /* STATUS */
  /* ========================================================= */

  const networkStatus = useMemo(() => {
    if (!connected) {
      return {
        label: 'Offline',
        icon: WifiOff,
        dot: 'bg-rose-400',
        text: 'text-rose-300',
        surface:
          'bg-rose-500/10 border-rose-500/15'
      };
    }

    return {
      label: 'Realtime',
      icon: Wifi,
      dot: 'bg-emerald-400',
      text: 'text-emerald-300',
      surface:
        'bg-emerald-500/10 border-emerald-500/15'
    };
  }, [connected]);

  const StatusIcon =
    networkStatus.icon;

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <footer
      className="
        relative overflow-hidden
        rounded-2xl
        border border-white/6
        bg-white/2
        backdrop-blur-2xl
      "
    >
      {/* ambient glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[-120px] h-[240px] w-[240px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* content */}

      <div
        className="
          relative flex flex-col gap-5
          px-5 py-5

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* ========================================================= */}
        {/* LEFT */}
        {/* ========================================================= */}

        <div
          className="
            flex flex-wrap items-center
            gap-3
          "
        >
          {/* STATUS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className={`
              flex items-center gap-3
              rounded-xl border
              px-4 py-3
              ${networkStatus.surface}
            `}
          >
            <div
              className={`
                relative flex h-9 w-9
                items-center justify-center
                rounded-lg
                bg-black/20
                ${networkStatus.text}
              `}
            >
              <div
                className={`
                  absolute right-1 top-1
                  h-2 w-2 rounded-full
                  ${networkStatus.dot}

                  ${
                    connected
                      ? 'animate-pulse'
                      : ''
                  }
                `}
              />

              <StatusIcon
                className="h-4 w-4"
                strokeWidth={2}
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                Connection
              </p>

              <p
                className={`
                  mt-1 text-sm
                  font-medium
                  ${networkStatus.text}
                `}
              >
                {networkStatus.label}
              </p>
            </div>
          </motion.div>

          {/* LATENCY */}

          <FooterMetric
            icon={
              <Clock3
                className="h-4 w-4"
                strokeWidth={1.9}
              />
            }
            label="Latency"
            value={`${wsLatency.toFixed(
              0
            )} ms`}
          />

          {/* FREQ */}

          <FooterMetric
            icon={
              <Signal
                className="h-4 w-4"
                strokeWidth={1.9}
              />
            }
            label="Frequency"
            value={streamingFreq}
          />
        </div>

        {/* ========================================================= */}
        {/* RIGHT */}
        {/* ========================================================= */}

        <div
          className="
            flex flex-wrap items-center
            gap-3
          "
        >
          {/* PACKETS */}

          <FooterMetric
            icon={
              <Database
                className="h-4 w-4"
                strokeWidth={1.9}
              />
            }
            label="Packets"
            value={messageCount.toLocaleString()}
          />

          {/* BUFFER */}

          <FooterMetric
            icon={
              <Activity
                className="h-4 w-4"
                strokeWidth={1.9}
              />
            }
            label="Buffer"
            value={readings.length.toLocaleString()}
          />
        </div>
      </div>
    </footer>
  );
}

/* ========================================================= */
/* FOOTER METRIC */
/* ========================================================= */

function FooterMetric({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -1
      }}
      transition={{
        duration: 0.2
      }}
      className="
        group flex items-center gap-3
        rounded-xl border border-white/6
        bg-white/2
        px-4 py-3
        transition-all duration-300

        hover:border-cyan-400/15
        hover:bg-white/3
      "
    >
      <div
        className="
          flex h-9 w-9
          items-center justify-center
          rounded-lg
          bg-cyan-500/10
          text-cyan-300
          transition-transform duration-300

          group-hover:scale-105
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/28">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-white/92">
          {value}
        </p>
      </div>
    </motion.div>
  );
}