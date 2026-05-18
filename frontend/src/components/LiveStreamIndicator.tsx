import { motion } from 'framer-motion';

import {
  Pause,
  Radio,
  WifiOff
} from 'lucide-react';

/* ========================================================= */
/* TYPES */
/* ========================================================= */

interface LiveStreamIndicatorProps {
  connected: boolean;
  paused: boolean;
}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function LiveStreamIndicator({
  connected,
  paused
}: LiveStreamIndicatorProps) {
  const status = !connected
    ? {
        label: 'Disconnected',
        description:
          'No active telemetry stream',
        icon: WifiOff,
        dot: 'bg-rose-400',
        text: 'text-rose-300',
        surface:
          'border-rose-500/15 bg-rose-500/10'
      }
    : paused
    ? {
        label: 'Paused',
        description:
          'Realtime updates halted',
        icon: Pause,
        dot: 'bg-amber-400',
        text: 'text-amber-300',
        surface:
          'border-amber-500/15 bg-amber-500/10'
      }
    : {
        label: 'Realtime',
        description:
          'Telemetry actively streaming',
        icon: Radio,
        dot: 'bg-emerald-400',
        text: 'text-emerald-300',
        surface:
          'border-emerald-500/15 bg-emerald-500/10'
      };

  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.35
      }}
      className={`
        group relative overflow-hidden
        rounded-2xl border
        px-4 py-3
        backdrop-blur-xl
        transition-all duration-300

        hover:scale-[1.01]

        ${status.surface}
      `}
    >
      {/* ========================================================= */}
      {/* GLOW */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute right-[-30px] top-[-30px]
            h-[90px] w-[90px]
            rounded-full blur-2xl opacity-40

            ${
              connected
                ? paused
                  ? 'bg-amber-400/20'
                  : 'bg-emerald-400/20'
                : 'bg-rose-400/20'
            }
          `}
        />
      </div>

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative flex items-center gap-3">
        {/* ICON */}

        <div
          className={`
            relative flex h-11 w-11
            items-center justify-center
            rounded-xl
            bg-black/20

            ${status.text}
          `}
        >
          {/* pulse */}

          {connected && !paused && (
            <span
              className={`
                absolute inset-0 rounded-xl
                ${status.dot}
                opacity-20 blur-md
              `}
            />
          )}

          {/* dot */}

          <span
            className={`
              absolute right-1.5 top-1.5
              h-2 w-2 rounded-full

              ${status.dot}

              ${
                connected && !paused
                  ? 'animate-pulse'
                  : ''
              }
            `}
          />

          <StatusIcon
            className="h-4.5 w-4.5"
            strokeWidth={2}
          />
        </div>

        {/* TEXT */}

        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/28">
            Stream state
          </p>

          <p
            className={`
              mt-1 text-sm
              font-medium

              ${status.text}
            `}
          >
            {status.label}
          </p>

          <p className="mt-0.5 text-xs text-white/38">
            {status.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}