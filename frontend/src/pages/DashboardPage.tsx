/* ========================================================= */
/* DASHBOARD PAGE — ENTERPRISE OPERATIONAL OBSERVABILITY UI */
/* ========================================================= */

import {
  memo,
  useMemo,
  useState,
  useEffect,
  useRef
} from 'react';

import {
  Activity,
  AlertTriangle,
  ChevronDown,
  Cpu,
  Gauge,
  ShieldCheck,
  Wifi
} from 'lucide-react';

import {
  motion,
  AnimatePresence,
  useReducedMotion
} from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../store';

import { useTelemetrySync } from '../features/telemetry/hooks/useTelemetrySync';

import { TelemetryChart } from '../components/TelemetryChart';
import { AnomalyCenter } from '../components/AnomalyCenter';
import { HealthCenter } from '../components/HealthCenter';
import { EventTimeline } from '../components/EventTimeline';
import { OperatorNotesPanel } from '../components/OperatorNotesPanel';
import { TelemetryTable } from '../components/TelemetryTable';
import { WelcomeModal } from '../components/WelcomeModal';
import { setActiveProfile } from '../features/experiments/experimentSlice';
import {
  setSelectedMetrics,
  setAnomalySensitivity
} from '../store/telemetrySlice';

/* ========================================================= */
/* MOTION */
/* ========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 12
  },

  visible: ({
    reduceMotion = false,
    delay = 0
  }: {
    reduceMotion?: boolean;
    delay?: number;
  }) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay,
      duration: reduceMotion ? 0 : 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

/* ========================================================= */
/* PAGE */
/* ========================================================= */

export default function DashboardPage() {
  useTelemetrySync();

  const shouldReduceMotion =
    useReducedMotion();

  const {
    readings,
    anomalies,
    healthScore,
    connected,
    selectedMetrics,
    throughput,
    staleStream
  } = useAppSelector(
    (state) => state.telemetry
  );

  const {
    profiles,
    activeProfileId
  } = useAppSelector(
    (state) => state.experiments
  );

  const activeProfile =
    profiles.find(
      (profile) =>
        profile.id === activeProfileId
    ) ?? profiles[0];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!activeProfile) return;

    dispatch(
      setSelectedMetrics(
        activeProfile.activeMetrics
      )
    );
    dispatch(
      setAnomalySensitivity(
        activeProfile.anomalySensitivity
      )
    );
  }, [dispatch, activeProfile]);

  const [
    isSelectorOpen,
    setIsSelectorOpen
  ] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  /* ========================================================= */
  /* OUTSIDE CLICK */
  /* ========================================================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setIsSelectorOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  /* ========================================================= */
  /* ESCAPE CLOSE */
  /* ========================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        setIsSelectorOpen(false);
      }
    };

    window.addEventListener(
      'keydown',
      handleEscape
    );

    return () =>
      window.removeEventListener(
        'keydown',
        handleEscape
      );
  }, []);

  /* ========================================================= */
  /* MEMOIZED */
  /* ========================================================= */

  const chart = useMemo(
    () => (
      <MemoizedTelemetryChart
        readings={readings}
        selectedMetrics={
          selectedMetrics
        }
      />
    ),
    [readings, selectedMetrics]
  );

  return (
    <div
      className="
        relative min-h-screen
        overflow-hidden
        bg-[#050816]
        text-white
      "
    >
      <WelcomeModal />

      {/* ========================================================= */}
      {/* SKIP LINK */}
      {/* ========================================================= */}

      <a
        href="#dashboard-content"
        className="
          sr-only z-50

          focus:not-sr-only
          focus:absolute
          focus:left-4
          focus:top-4
          focus:rounded-lg
          focus:bg-white
          focus:px-4
          focus:py-3
          focus:text-black
        "
      >
        Skip to dashboard content
      </a>

      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
      >
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-5%] h-[340px] w-[340px] rounded-full bg-blue-500/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize:
              '80px 80px'
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* APP */}
      {/* ========================================================= */}

      <div className="relative z-10">
        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <header
          role="banner"
          className="
            sticky top-0 z-40
            border-b border-white/5
            bg-black/20
            backdrop-blur-md
          "
        >
          <div
            className="
              flex flex-col gap-5

              px-5 py-4

              lg:flex-row
              lg:items-center
              lg:justify-between

              lg:px-10
            "
          >
            {/* ========================================================= */}
            {/* LEFT */}
            {/* ========================================================= */}

            <div>
              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="
                    h-1.5 w-1.5
                    rounded-full
                    bg-emerald-400
                    animate-pulse
                  "
                />

                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  realtime operational
                  monitoring
                </p>
              </div>

              <h1
                className="
                  mt-3

                  text-[1.7rem]
                  font-semibold
                  leading-[1]

                  tracking-[-0.02em]

                  sm:text-[2rem]
                "
              >
                Operational
                observability
              </h1>
            </div>

            {/* ========================================================= */}
            {/* RIGHT */}
            {/* ========================================================= */}

            <div
              className="
                flex flex-wrap
                items-center gap-3

                rounded-full
                border border-white/5
                bg-white/2

                p-2
              "
            >
              {/* ========================================================= */}
              {/* PROFILE */}
              {/* ========================================================= */}

              <div
                ref={dropdownRef}
                className="relative"
              >
                <button
                  aria-haspopup="listbox"
                  aria-expanded={
                    isSelectorOpen
                  }
                  aria-label="Select telemetry profile"
                  onClick={() =>
                    setIsSelectorOpen(
                      (prev) => !prev
                    )
                  }
                  className="
                    flex min-h-[48px]
                    items-center gap-3

                    rounded-full
                    border border-white/5
                    bg-white/2

                    px-4 py-3

                    transition-all duration-200

                    hover:bg-white/3

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-cyan-400/40
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#050816]
                  "
                >
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                      profile
                    </p>

                    <p className="mt-1 text-sm font-medium tracking-[-0.02em]">
                      {
                        activeProfile.name
                      }
                    </p>
                  </div>

                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 text-white/40 transition-transform duration-200 ${
                      isSelectorOpen
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                {/* ========================================================= */}
                {/* DROPDOWN */}
                {/* ========================================================= */}

                <AnimatePresence>
                  {isSelectorOpen && (
                    <motion.div
                      role="listbox"
                      initial={{
                        opacity: 0,
                        y: 8
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      exit={{
                        opacity: 0,
                        y: 8
                      }}
                      transition={{
                        duration:
                          shouldReduceMotion
                            ? 0
                            : 0.18
                      }}
                      className="
                        absolute right-0
                        top-[calc(100%+10px)]

                        z-50
                        w-[280px]

                        overflow-hidden
                        rounded-2xl

                        border border-white/5
                        bg-[#0b1120]

                        shadow-2xl
                      "
                    >
                      {profiles.map(
                        (profile) => (
                          <button
                            key={
                              profile.id
                            }
                            type="button"
                            role="option"
                            aria-selected={
                              profile.id ===
                              activeProfileId
                            }
                            onClick={() => {
                              dispatch(
                                setActiveProfile(
                                  profile.id
                                )
                              );
                              setIsSelectorOpen(
                                false
                              );
                            }}
                            className="
                              flex min-h-[56px]
                              w-full

                              items-center
                              justify-between

                              border-b border-white/[0.035]

                              px-5 py-4

                              text-left

                              transition-colors duration-200

                              last:border-none

                              hover:bg-white/3

                              focus-visible:outline-none
                              focus-visible:bg-white/5
                            "
                          >
                            <div>
                              <p className="text-sm font-medium tracking-[-0.02em]">
                                {
                                  profile.name
                                }
                              </p>

                              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/35">
                                {
                                  profile.mode
                                }
                              </p>
                            </div>

                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                          </button>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ========================================================= */}
              {/* STATUS */}
              {/* ========================================================= */}

              <HeaderStat
                icon={
                  <Wifi
                    aria-hidden="true"
                    size={14}
                  />
                }
                value={
                  connected
                    ? `${throughput.toFixed(
                        1
                      )} msg/s`
                    : 'offline'
                }
              />

              <HeaderStat
                icon={
                  <ShieldCheck
                    aria-hidden="true"
                    size={14}
                  />
                }
                value={`${healthScore.toFixed(
                  0
                )}%`}
              />
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* BODY */}
        {/* ========================================================= */}

        <main
          id="dashboard-content"
          role="main"
          className="
            px-5 pb-10 pt-6

            lg:px-10
          "
        >
          {/* ========================================================= */}
          {/* HERO */}
          {/* ========================================================= */}

          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={{
              reduceMotion:
                shouldReduceMotion
            }}
            className="
              overflow-hidden

              rounded-[28px]

              border border-white/5
              bg-white/[0.025]
            "
          >
            {/* ========================================================= */}
            {/* TOP */}
            {/* ========================================================= */}

            <div
              className="
                border-b border-white/5

                px-6 py-6

                lg:px-8
              "
            >
              <div className="max-w-4xl">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  realtime telemetry
                  monitoring
                </p>

                <h2
                  className="
                    mt-6
                    max-w-[10ch]

                    text-[3rem]
                    font-semibold

                    leading-[0.92]

                    tracking-[-0.03em]

                    sm:text-[4.4rem]
                    xl:text-[5.2rem]
                  "
                >
                  System signal
                  intelligence
                </h2>

                <p
                  className="
                    mt-7
                    max-w-[58ch]

                    text-[15px]
                    leading-8

                    tracking-[-0.01em]
                    text-white/55

                    sm:text-[17px]
                    sm:leading-9
                  "
                >
                  Monitor realtime
                  telemetry streams,
                  anomaly behavior,
                  infrastructure
                  health, and
                  operational system
                  activity through a
                  focused observability
                  environment.
                </p>
              </div>

              {/* ========================================================= */}
              {/* METRICS */}
              {/* ========================================================= */}

              <div
                className="
                  mt-10
                  grid gap-4

                  sm:grid-cols-2
                  xl:grid-cols-4
                "
              >
                <MinimalMetric
                  label="Signal integrity"
                  value="99.82%"
                  icon={
                    <Cpu
                      aria-hidden="true"
                      size={17}
                    />
                  }
                />

                <MinimalMetric
                  label="Pipeline latency"
                  value="18ms"
                  icon={
                    <Gauge
                      aria-hidden="true"
                      size={17}
                    />
                  }
                />

                <MinimalMetric
                  label="Anomaly events"
                  value={`${anomalies.length}`}
                  icon={
                    <AlertTriangle
                      aria-hidden="true"
                      size={17}
                    />
                  }
                />

                <MinimalMetric
                  label="Live channels"
                  value={`${selectedMetrics.length}`}
                  icon={
                    <Activity
                      aria-hidden="true"
                      size={17}
                    />
                  }
                />
              </div>
            </div>

            {/* ========================================================= */}
            {/* CHART */}
            {/* ========================================================= */}

            <div className="p-4 sm:p-6 lg:p-8">
              <div
                className="
                  overflow-hidden

                  rounded-[24px]

                  border border-white/5
                  bg-[#070d18]

                  p-5
                "
              >
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                    telemetry correlation
                  </p>

                  <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.02em]">
                    Live operational
                    streams
                  </h3>
                </div>

                <div
                  className="
                    h-[520px]
                    min-w-0
                  "
                >
                  {chart}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ========================================================= */}
          {/* WORKSPACE */}
          {/* ========================================================= */}

          <section
            aria-label="Telemetry workspace"
            className="
              mt-8
              grid gap-6

              2xl:grid-cols-[1.3fr_0.7fr]
            "
          >
            {/* ========================================================= */}
            {/* LEFT */}
            {/* ========================================================= */}

            <div className="min-w-0 space-y-6">
              <AnomalyCenter
                anomalies={
                  anomalies
                }
              />

              <MemoizedTelemetryTable
                readings={readings}
                selectedMetrics={
                  selectedMetrics
                }
              />
            </div>

            {/* ========================================================= */}
            {/* RIGHT */}
            {/* ========================================================= */}

            <aside className="min-w-0 space-y-6">
              <HealthCenter
                healthScore={
                  healthScore
                }
              />

              <MemoizedEventTimeline
                anomalies={
                  anomalies
                }
                staleStream={
                  staleStream
                }
                connected={
                  connected
                }
              />

              <OperatorNotesPanel />
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ========================================================= */
/* HEADER STAT */
/* ========================================================= */

function HeaderStat({
  icon,
  value
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div
      className="
        flex min-h-[48px]
        items-center gap-3

        rounded-full

        border border-white/5
        bg-white/2

        px-4 py-3
      "
    >
      <div className="text-cyan-300 opacity-80">
        {icon}
      </div>

      <span className="text-sm font-medium tracking-[-0.02em] text-white/90">
        {value}
      </span>
    </div>
  );
}

/* ========================================================= */
/* METRIC */
/* ========================================================= */

function MinimalMetric({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -2
      }}
      transition={{
        duration: 0.2
      }}
      className="
        rounded-2xl

        border border-white/5
        bg-white/2

        p-5

        transition-colors duration-200

        hover:bg-white/3
      "
    >
      <div className="flex items-center justify-between">
        <div className="text-cyan-300 opacity-80">
          {icon}
        </div>

        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-white/28">
        {label}
      </p>

      <h3 className="mt-3 text-[2.2rem] font-semibold tracking-[-0.02em] text-white">
        {value}
      </h3>
    </motion.div>
  );
}

/* ========================================================= */
/* MEMOIZED */
/* ========================================================= */

const MemoizedTelemetryChart =
  memo(TelemetryChart);

const MemoizedTelemetryTable =
  memo(TelemetryTable);

const MemoizedEventTimeline =
  memo(EventTimeline);