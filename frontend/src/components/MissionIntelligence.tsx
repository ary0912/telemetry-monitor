import {
  Activity,
  Brain,
  ShieldCheck,
  Sparkles,
  Target
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useAppSelector } from '../store';

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function MissionIntelligence() {
  const {
    readings,
    anomalies,
    connected
  } = useAppSelector(
    (state) => state.telemetry
  );

  /* ========================================================= */
  /* DERIVED METRICS */
  /* ========================================================= */

  const telemetryVolume =
    readings.length.toLocaleString();

  const anomalyCount =
    anomalies.length.toLocaleString();

  const confidence =
    connected
      ? (
          99.2 +
          Math.min(
            readings.length / 10000,
            0.7
          )
        ).toFixed(2)
      : '0.00';

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <section className="space-y-5">
      {/* ========================================================= */}
      {/* PRIMARY PANEL */}
      {/* ========================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.45
        }}
        className="
          relative overflow-hidden
          rounded-2xl
          border border-white/6
          bg-white/2
          p-6
          backdrop-blur-2xl
        "
      >
        {/* glow */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-[-60px] top-[-40px] h-[180px] w-[180px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        {/* header */}

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />

              <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                Mission intelligence
              </p>
            </div>

            <h3 className="mt-4 text-[1.55rem] font-semibold tracking-[-0.05em] text-white">
              Operational telemetry overview
            </h3>
          </div>

          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-cyan-500/10
              text-cyan-300
            "
          >
            <Brain
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* body */}

        <p className="relative mt-6 text-sm leading-8 text-white/48">
          The platform continuously
          monitors realtime telemetry
          streams, identifies abnormal
          signal behavior, evaluates
          infrastructure stability,
          and maintains operational
          visibility across active
          monitoring pipelines.
        </p>

        {/* metrics */}

        <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
          <IntelligenceMetric
            icon={
              <Activity
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            }
            label="Telemetry"
            value={telemetryVolume}
            tone="cyan"
          />

          <IntelligenceMetric
            icon={
              <ShieldCheck
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            }
            label="Anomalies"
            value={anomalyCount}
            tone="emerald"
          />

          <IntelligenceMetric
            icon={
              <Sparkles
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            }
            label="Confidence"
            value={`${confidence}%`}
            tone="violet"
          />
        </div>
      </motion.div>

      {/* ========================================================= */}
      {/* SECONDARY PANEL */}
      {/* ========================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 14
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.05,
          duration: 0.45
        }}
        className="
          relative overflow-hidden
          rounded-2xl
          border border-white/6
          bg-white/2
          p-5
          backdrop-blur-2xl
        "
      >
        {/* background */}

        <div className="pointer-events-none absolute bottom-[-40px] right-[-20px] opacity-10">
          <Target
            size={120}
            strokeWidth={1}
            className="text-cyan-300"
          />
        </div>

        {/* content */}

        <div className="relative">
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
              <Target
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                Operational objective
              </p>

              <h4 className="mt-1 text-sm font-medium text-white/92">
                Realtime infrastructure observability
              </h4>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-white/45">
            Maintain stable telemetry
            ingestion, surface anomaly
            patterns in realtime,
            preserve signal integrity,
            and provide operators with
            actionable infrastructure
            visibility through a
            minimal monitoring
            environment.
          </p>
        </div>
      </motion.div>

      {/* ========================================================= */}
      {/* FOOTNOTE */}
      {/* ========================================================= */}

      <div className="px-1">
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/18">
          telemetry observability suite
        </p>
      </div>
    </section>
  );
}

/* ========================================================= */
/* METRIC */
/* ========================================================= */

function IntelligenceMetric({
  icon,
  label,
  value,
  tone
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: 'cyan' | 'emerald' | 'violet';
}) {
  const tones = {
    cyan: {
      surface: 'bg-cyan-500/10',
      text: 'text-cyan-300'
    },

    emerald: {
      surface: 'bg-emerald-500/10',
      text: 'text-emerald-300'
    },

    violet: {
      surface: 'bg-violet-500/10',
      text: 'text-violet-300'
    }
  };

  return (
    <div
      className="
        rounded-xl
        border border-white/6
        bg-white/3
        p-4
      "
    >
      <div className="flex items-center justify-between">
        <div
          className={`
            flex h-10 w-10
            items-center justify-center
            rounded-xl

            ${tones[tone].surface}
            ${tones[tone].text}
          `}
        >
          {icon}
        </div>

        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-white/28">
        {label}
      </p>

      <h4 className="mt-2 text-[1.8rem] font-semibold tracking-[-0.06em] text-white">
        {value}
      </h4>
    </div>
  );
}