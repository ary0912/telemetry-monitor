import { motion } from 'framer-motion';

import {
  Activity,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

/* ========================================================= */
/* TYPES */
/* ========================================================= */

interface HealthCenterProps {
  healthScore: number;
}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function HealthCenter({
  healthScore
}: HealthCenterProps) {
  const progress = Math.min(
    100,
    Math.max(0, healthScore)
  );

  const getHealthTone = () => {
    if (progress >= 90) {
      return {
        label: 'Optimal',
        text: 'text-emerald-300',
        surface:
          'bg-emerald-500/10 border-emerald-500/15',
        glow: 'bg-emerald-400/20'
      };
    }

    if (progress >= 70) {
      return {
        label: 'Stable',
        text: 'text-cyan-300',
        surface:
          'bg-cyan-500/10 border-cyan-500/15',
        glow: 'bg-cyan-400/20'
      };
    }

    return {
      label: 'Degraded',
      text: 'text-amber-300',
      surface:
        'bg-amber-500/10 border-amber-500/15',
      glow: 'bg-amber-400/20'
    };
  };

  const tone = getHealthTone();

  return (
    <section
      className="
        relative overflow-hidden
        rounded-2xl
        border border-white/6
        bg-white/2
        backdrop-blur-2xl
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute right-[-60px] top-[-60px]
            h-[180px] w-[180px]
            rounded-full blur-3xl

            ${tone.glow}
          `}
        />
      </div>

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div
        className="
          relative flex items-start
          justify-between gap-4
          border-b border-white/6
          px-5 py-5
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />

            <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              Infrastructure health
            </p>
          </div>

          <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.04em] text-white">
            System confidence
          </h3>
        </div>

        <div
          className={`
            rounded-full border
            px-3 py-1.5
            text-[10px]
            font-medium
            uppercase tracking-[0.18em]

            ${tone.surface}
            ${tone.text}
          `}
        >
          {tone.label}
        </div>
      </div>

      {/* ========================================================= */}
      {/* BODY */}
      {/* ========================================================= */}

      <div className="relative p-5">
        {/* TOP SCORE */}

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Confidence score
            </p>

            <div className="mt-3 flex items-end gap-2">
              <h4 className="text-[4rem] font-semibold leading-none tracking-[-0.08em] text-white">
                {progress}
              </h4>

              <span className="pb-2 text-lg text-white/35">
                %
              </span>
            </div>
          </div>

          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-2xl
              border border-white/6
              bg-white/3
              text-cyan-300
            "
          >
            <ShieldCheck
              className="h-6 w-6"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* PROGRESS */}
        {/* ========================================================= */}

        <div className="mt-8">
          <div
            className="
              relative h-3 overflow-hidden
              rounded-full
              bg-white/5
            "
          >
            {/* background */}

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03),transparent)]" />

            {/* progress */}

            <motion.div
              initial={{
                width: 0
              }}
              animate={{
                width: `${progress}%`
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="
                relative h-full rounded-full
                bg-gradient-to-r
                from-cyan-400
                via-sky-500
                to-indigo-500
              "
            >
              <div className="absolute inset-0 opacity-70 blur-md" />
            </motion.div>
          </div>

          {/* scale */}

          <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/20">
            <span>0</span>

            <span>Infrastructure</span>

            <span>100</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* METRICS */}
        {/* ========================================================= */}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <HealthMetric
            icon={
              <Activity
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            }
            label="Stream stability"
            value="Nominal"
          />

          <HealthMetric
            icon={
              <TrendingUp
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            }
            label="Anomaly pressure"
            value="Low"
          />
        </div>

        {/* ========================================================= */}
        {/* DESCRIPTION */}
        {/* ========================================================= */}

        <p className="mt-7 text-sm leading-7 text-white/45">
          Confidence is calculated from
          telemetry freshness, anomaly
          density, pipeline latency,
          realtime ingestion stability,
          and stream synchronization.
        </p>
      </div>
    </section>
  );
}

/* ========================================================= */
/* HEALTH METRIC */
/* ========================================================= */

function HealthMetric({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-xl
        border border-white/6
        bg-white/3
        px-4 py-4
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-cyan-500/10
            text-cyan-300
          "
        >
          {icon}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/28">
            {label}
          </p>

          <p className="mt-1 text-sm font-medium text-white/90">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}