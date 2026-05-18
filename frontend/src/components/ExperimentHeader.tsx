import {
  Activity,
  Globe,
  Radio,
  ShieldCheck,
  Zap
} from 'lucide-react';

import { useAppSelector } from '../store';

import {
  formatDataThroughput,
  formatDuration
} from '../utils/formatting';

/* ========================================================= */
/* HEADER */
/* ========================================================= */

export function ExperimentHeader() {
  const {
    readings,
    messageCount,
    connected
  } = useAppSelector(
    (state) => state.telemetry
  );

  /* ========================================================= */
  /* DATA */
  /* ========================================================= */

  const lastReading =
    readings[readings.length - 1];

  const runtime = lastReading
    ? lastReading.systemUptime
    : 0;

  const signalIntegrity = lastReading
    ? lastReading.signalIntegrity
    : 100;

  const throughput = formatDataThroughput(
    messageCount,
    runtime
  );

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/5
        bg-black/20
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto flex max-w-[2200px]
          flex-col gap-5
          px-5 py-5

          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:px-10
        "
      >
        {/* ========================================================= */}
        {/* LEFT */}
        {/* ========================================================= */}

        <div className="flex items-center gap-5">
          {/* LOGO */}

          <div
            className="
              relative flex h-12 w-12 shrink-0
              items-center justify-center
              overflow-hidden rounded-2xl
              border border-white/6
              bg-white/3
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />

            <Zap
              className="
                relative z-10
                h-5 w-5
                text-cyan-300
              "
              strokeWidth={1.8}
            />
          </div>

          {/* TITLE */}

          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />

              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                telemetry infrastructure
              </p>
            </div>

            <h1
              className="
                mt-2
                text-[1.6rem]
                font-semibold
                tracking-[-0.03em]

                sm:text-[2rem]
              "
            >
              Operational observability
            </h1>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT */}
        {/* ========================================================= */}

        <div
          className="
            grid w-full gap-3

            sm:grid-cols-2
            xl:flex xl:w-auto
          "
        >
          <MinimalStat
            icon={
              <Activity className="h-4 w-4" />
            }
            label="Runtime"
            value={formatDuration(runtime)}
          />

          <MinimalStat
            icon={<Radio className="h-4 w-4" />}
            label="Throughput"
            value={throughput}
          />

          <MinimalStat
            icon={
              <ShieldCheck className="h-4 w-4" />
            }
            label="Signal integrity"
            value={`${signalIntegrity.toFixed(
              1
            )}%`}
          />

          <ConnectionStatus
            connected={connected}
          />
        </div>
      </div>
    </header>
  );
}

/* ========================================================= */
/* MINIMAL STAT */
/* ========================================================= */

function MinimalStat({
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
        flex items-center gap-3
        rounded-2xl
        border border-white/5
        bg-white/2
        px-4 py-3
        transition-colors duration-200

        hover:bg-white/3
      "
    >
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl
          bg-cyan-500/10
          text-cyan-300
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
          {label}
        </p>

        <p
          className="
            mt-1
            truncate
            text-sm font-medium
            text-white/90
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ========================================================= */
/* CONNECTION STATUS */
/* ========================================================= */

function ConnectionStatus({
  connected
}: {
  connected: boolean;
}) {
  return (
    <div
      className={`
        flex items-center gap-3
        rounded-2xl border
        px-4 py-3
        transition-colors duration-200

        ${
          connected
            ? 'border-emerald-500/10 bg-emerald-500/5'
            : 'border-red-500/10 bg-red-500/5'
        }
      `}
    >
      <div
        className={`
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl

          ${
            connected
              ? 'bg-emerald-500/10 text-emerald-300'
              : 'bg-red-500/10 text-red-300'
          }
        `}
      >
        <Globe
          className={`h-4 w-4 ${
            connected
              ? 'animate-pulse'
              : ''
          }`}
        />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
          Network
        </p>

        <p
          className={`
            mt-1 text-sm font-medium

            ${
              connected
                ? 'text-emerald-300'
                : 'text-red-300'
            }
          `}
        >
          {connected
            ? 'Operational'
            : 'Offline'}
        </p>
      </div>
    </div>
  );
}