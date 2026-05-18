import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  ArrowRight,
  Radar,
  Activity,
  Shield,
  Gauge,
  Database,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Layers3,
  Command,
  Cpu,
  TrendingUp,
  Eye,
  Clock3
} from 'lucide-react';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-canvas text-on-dark">
      {/* ====================================================== */}
      {/* ATMOSPHERIC BACKGROUND */}
      {/* ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-[520px] w-[520px] rounded-full bg-m-blue-light/4 blur-[140px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-electric-blue/4 blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px'
          }}
        />
      </div>

      {/* ====================================================== */}
      {/* CONTAINER */}
      {/* ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1700px] px-5 pb-24 pt-5 sm:px-8 xl:px-10">
        {/* ====================================================== */}
        {/* NAVBAR */}
        {/* ====================================================== */}

        <motion.nav
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center justify-between border-b border-hairline pb-5"
        >
          {/* LEFT */}

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface-soft">
              <Radar className="h-5 w-5 text-m-blue-light" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                telemetry infrastructure
              </p>

              <h2 className="mt-1 text-sm font-semibold tracking-[var(--tracking-heading)]">
                OBSERVABILITY CORE
              </h2>
            </div>
          </div>

          {/* CENTER */}

          <div className="hidden items-center gap-10 lg:flex">
            <a
              href="#overview"
              className="text-sm text-muted transition-colors duration-300 hover:text-on-dark"
            >
              Overview
            </a>

            <a
              href="#workflow"
              className="text-sm text-muted transition-colors duration-300 hover:text-on-dark"
            >
              Workflow
            </a>

            <a
              href="#system"
              className="text-sm text-muted transition-colors duration-300 hover:text-on-dark"
            >
              Architecture
            </a>
          </div>

          {/* RIGHT */}

          <Link
            to="/dashboard"
className="
  group relative inline-flex items-center gap-3
  overflow-hidden
  rounded-xl
  border border-white/10
  bg-white
  px-5 py-3
  text-sm font-semibold text-black

  shadow-[0_10px_30px_rgba(255,255,255,0.10)]

  transition-all duration-300

  hover:bg-[#f5f5f5]
  hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_rgba(255,255,255,0.16),0_18px_60px_rgba(255,255,255,0.12)]

  hover:-translate-y-[1px]
"
          >
            Open Mission Workspace

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.nav>

        {/* ====================================================== */}
        {/* HERO */}
        {/* ====================================================== */}

        <section
          id="overview"
          className="
            relative grid min-h-[88vh]
            items-center gap-16 py-16
            xl:grid-cols-[0.84fr_1.16fr]
          "
        >
          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="max-w-2xl"
          >
            {/* STATUS */}

            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-m-blue-light/15
                bg-m-blue-light/10
                px-4 py-2
              "
            >
              <div className="h-2 w-2 rounded-full bg-m-blue-light animate-pulse" />

              <span className="text-sm text-m-blue-light">
                14 live telemetry channels active
              </span>
            </div>

            {/* HERO TITLE */}

            <h1
              className="
                mt-8
                max-w-[12ch]
                text-[3.8rem]
                font-semibold
                leading-[0.92]
                tracking-[-0.03em]

                sm:text-[5.4rem]
                lg:text-[6.2rem]
                xl:text-[7rem]
              "
            >
              Operational telemetry intelligence for mission-critical systems.
            </h1>

            {/* SUBTEXT */}

            <p
              className="
                mt-8
                max-w-2xl
                text-[1.1rem]
                leading-9
                text-body
              "
            >
              Analyze live signal fidelity, investigate anomalies before
              they escalate, and keep engineered systems aligned with
              operational readiness.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-8 text-muted">
              Mission-ready observability infrastructure with realtime
              telemetry, anomaly triage, and resilient engineering workflows.
            </p>

            {/* CTA */}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="
  group relative inline-flex items-center gap-3
  overflow-hidden
  rounded-xl
  border border-white/10
  bg-white
  px-7 py-4
  text-sm font-semibold text-black

  shadow-[0_10px_30px_rgba(255,255,255,0.10)]

  transition-all duration-300

  hover:bg-[#f5f5f5]
  hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_rgba(255,255,255,0.16),0_18px_60px_rgba(255,255,255,0.12)]

  hover:-translate-y-[1px]
"

              >
                Open mission workspace

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#workflow"
                className="
                  inline-flex items-center gap-2
                  rounded-xl
                  border border-hairline
                  bg-surface-card
                  px-5 py-4
                  text-sm font-medium text-on-dark
                  transition-all duration-300
                  hover:border-m-blue-light/20
                "
              >
                Explore workflows
              </a>
            </div>

            {/* FEATURE STRIP */}

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <FeaturePill
                title="SLA-grade observability"
                description="Realtime operational signal coverage."
              />

              <FeaturePill
                title="Adaptive anomaly triage"
                description="Operational incident investigation."
              />

              <FeaturePill
                title="Live engineering workflows"
                description="Built for mission-critical systems."
              />
            </div>

            {/* METRICS */}

            <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <MinimalMetric
                value="18ms"
                label="Detection latency"
              />

              <MinimalMetric
                value="99.97%"
                label="Stream uptime"
              />

              <MinimalMetric
                value="14"
                label="Live channels"
              />

              <MinimalMetric
                value="24/7"
                label="Monitoring"
              />
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* RIGHT PANEL */}
          {/* ================================================= */}

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[32px] bg-m-blue-light/4 blur-[90px]" />

            <div
              className="
                relative overflow-hidden
                rounded-[32px]
                border border-hairline
                bg-surface-elevated
                shadow-panel
              "
            >
              {/* TOPBAR */}

              <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-success" />

                  <span className="text-sm font-medium text-on-dark">
                    Operational telemetry
                  </span>
                </div>

                <div className="flex items-center gap-5 text-xs uppercase tracking-[0.18em] text-muted">
                  <span>LIVE</span>
                  <span>14 channels</span>
                  <span>nominal</span>
                </div>
              </div>

              {/* CONTENT */}

              <div className="grid gap-5 p-5 sm:p-6">
                {/* METRICS */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <OperationalCard
                    icon={<Gauge size={16} />}
                    label="Latency"
                    value="18ms"
                  />

                  <OperationalCard
                    icon={<Shield size={16} />}
                    label="Integrity"
                    value="99.82%"
                  />

                  <OperationalCard
                    icon={<AlertTriangle size={16} />}
                    label="Incidents"
                    value="02"
                  />
                </div>

                {/* CHART */}

                <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                        signal correlation
                      </p>

                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                        Realtime signal analytics
                      </h3>
                    </div>

                    <div className="rounded-full border border-m-blue-light/15 bg-m-blue-light/10 px-3 py-1">
                      <span className="text-xs text-m-blue-light">
                        synchronized
                      </span>
                    </div>
                  </div>

                  <div
                    className="
                      relative h-72 overflow-hidden
                      rounded-2xl
                      border border-hairline
                      bg-gradient-to-b from-m-blue-light/5 to-transparent
                    "
                  >
                    <svg
                      viewBox="0 0 700 240"
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M0,180 C80,100 140,150 220,120 C300,90 360,170 440,110 C520,60 610,130 700,70"
                        fill="none"
                        stroke="rgba(0,102,177,0.95)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                      />

                      <motion.path
                        d="M0,200 C120,160 180,120 260,150 C340,180 420,70 520,110 C600,140 650,60 700,90"
                        fill="none"
                        stroke="rgba(6,83,182,0.5)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5 }}
                      />
                    </svg>

                    <motion.div
                      animate={{
                        x: ['-10%', '110%']
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: 'linear'
                      }}
                      className="
                        absolute top-0 h-full w-32
                        bg-gradient-to-r
                        from-transparent
                        via-m-blue-light/10
                        to-transparent
                        blur-xl
                      "
                    />
                  </div>
                </div>

                {/* LOWER GRID */}

                <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
                  {/* INCIDENT FEED */}

                  <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                          incident log
                        </p>

                        <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                          Live event feed
                        </h3>
                      </div>

                      <Command className="h-5 w-5 text-m-blue-light" />
                    </div>

                    <div className="mt-6 space-y-5">
                      <FeedItem
                        type="success"
                        title="Signal synchronization completed"
                        time="2 seconds ago"
                      />

                      <FeedItem
                        type="warning"
                        title="Thermal deviation threshold exceeded"
                        time="14 seconds ago"
                      />

                      <FeedItem
                        type="normal"
                        title="Replay snapshot archived"
                        time="1 minute ago"
                      />
                    </div>
                  </div>

                  {/* SYSTEM STATE */}

                  <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                      system status
                    </p>

                    <div className="mt-6 space-y-5">
                      <MiniStatus
                        icon={<Wifi size={15} />}
                        label="Stream health"
                        value="Nominal"
                      />

                      <MiniStatus
                        icon={<Database size={15} />}
                        label="Pipeline"
                        value="Operational"
                      />

                      <MiniStatus
                        icon={<Shield size={15} />}
                        label="Detection"
                        value="Adaptive"
                      />

                      <MiniStatus
                        icon={<Cpu size={15} />}
                        label="Processing"
                        value="Realtime"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ====================================================== */}
        {/* WORKFLOW */}
        {/* ====================================================== */}

        <section
          id="workflow"
          className="mt-24"
        >
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
              operational workflow
            </p>

            <h2
              className="
                mt-5
                text-[2.8rem]
                font-semibold
                leading-[0.96]
                tracking-[-0.02em]

                sm:text-[4.2rem]
              "
            >
              Designed for investigation, not dashboard decoration.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-body">
              Every workflow is optimized for operational visibility,
              telemetry investigation, and realtime engineering response.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <WorkflowCard
              icon={<Eye />}
              title="Inspect live telemetry"
              description="Observe unstable telemetry streams with synchronized operational visibility."
            />

            <WorkflowCard
              icon={<AlertTriangle />}
              title="Investigate anomalies"
              description="Identify telemetry deviations and isolate operational incidents rapidly."
            />

            <WorkflowCard
              icon={<Clock3 />}
              title="Replay operational events"
              description="Replay historical telemetry states for debugging and investigation."
            />
          </div>
        </section>

        {/* ====================================================== */}
        {/* SYSTEM */}
        {/* ====================================================== */}

        <section
          id="system"
          className="
            mt-28
            rounded-[32px]
            border border-hairline
            bg-surface-soft
            p-6 sm:p-10
          "
        >
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
              infrastructure architecture
            </p>

            <h2
              className="
                mt-5
                text-[2.8rem]
                font-semibold
                leading-[0.96]
                tracking-[-0.02em]

                sm:text-[4.2rem]
              "
            >
              Realtime telemetry infrastructure pipeline.
            </h2>

            <p className="mt-6 text-lg leading-8 text-body">
              Built for low-latency telemetry ingestion, adaptive anomaly
              detection, operational replay systems, and continuous signal
              observability.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <ArchitectureNode
              icon={<Wifi />}
              title="Telemetry ingestion"
              description="Realtime stream synchronization across distributed telemetry channels."
            />

            <ArchitectureNode
              icon={<Layers3 />}
              title="Streaming pipeline"
              description="Low-latency transport and event orchestration infrastructure."
            />

            <ArchitectureNode
              icon={<TrendingUp />}
              title="Detection engine"
              description="Adaptive rolling anomaly detection with operational scoring."
            />

            <ArchitectureNode
              icon={<CheckCircle2 />}
              title="Operator workspace"
              description="Centralized observability workflows for engineering teams."
            />
          </div>
        </section>

        {/* ====================================================== */}
        {/* FOOTER */}
        {/* ====================================================== */}

        <footer className="mt-24 border-t border-hairline py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-body">
              Operational telemetry infrastructure for realtime engineering systems.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <span>Realtime streaming</span>
              <span>Anomaly investigation</span>
              <span>Operational observability</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ====================================================== */
/* FEATURE PILL */
/* ====================================================== */

function FeaturePill({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-card/80 px-4 py-4">
      <p className="text-sm font-semibold text-on-dark">
        {title}
      </p>

      <p className="mt-2 text-xs leading-6 text-muted">
        {description}
      </p>
    </div>
  );
}

/* ====================================================== */
/* METRIC */
/* ====================================================== */

function MinimalMetric({
  value,
  label
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-soft p-5">
      <div className="text-[2rem] font-semibold tracking-[var(--tracking-heading)]">
        {value}
      </div>

      <p className="mt-2 text-sm text-muted">
        {label}
      </p>
    </div>
  );
}

/* ====================================================== */
/* OPERATIONAL CARD */
/* ====================================================== */

function OperationalCard({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-2xl
        border border-hairline
        bg-surface-soft
        p-5
        transition-all duration-300
        hover:border-m-blue-light/20
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-card text-m-blue-light">
          {icon}
        </div>

        <div className="h-2 w-2 rounded-full bg-success" />
      </div>

      <p className="mt-5 text-sm text-muted">
        {label}
      </p>

      <h3 className="mt-2 text-3xl font-semibold tracking-[var(--tracking-heading)]">
        {value}
      </h3>
    </motion.div>
  );
}

/* ====================================================== */
/* FEED ITEM */
/* ====================================================== */

function FeedItem({
  title,
  time,
  type
}: {
  title: string;
  time: string;
  type: 'success' | 'warning' | 'normal';
}) {
  const styles = {
    success: 'bg-success',
    warning: 'bg-warning',
    normal: 'bg-m-blue-light'
  };

  return (
    <div className="flex items-start gap-4">
      <div className={`mt-2 h-2.5 w-2.5 rounded-full ${styles[type]}`} />

      <div>
        <p className="text-sm font-medium text-on-dark">
          {title}
        </p>

        <p className="mt-1 text-sm text-muted">
          {time}
        </p>
      </div>
    </div>
  );
}

/* ====================================================== */
/* MINI STATUS */
/* ====================================================== */

function MiniStatus({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-m-blue-light">
          {icon}
        </div>

        <span className="text-sm text-body">
          {label}
        </span>
      </div>

      <span className="text-sm font-medium text-on-dark">
        {value}
      </span>
    </div>
  );
}

/* ====================================================== */
/* WORKFLOW */
/* ====================================================== */

function WorkflowCard({
  icon,
  title,
  description
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-[28px]
        border border-hairline
        bg-surface-soft
        p-7
        transition-all duration-300
        hover:border-m-blue-light/20
      "
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-m-blue-light/10 text-m-blue-light">
        {icon}
      </div>

      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-body">
        {description}
      </p>
    </motion.div>
  );
}

/* ====================================================== */
/* ARCHITECTURE */
/* ====================================================== */

function ArchitectureNode({
  icon,
  title,
  description
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-hairline
        bg-surface-card
        p-6
        transition-all duration-300
        hover:border-m-blue-light/20
      "
    >
      <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-m-blue-light/5 blur-2xl" />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-m-blue-light/10 text-m-blue-light">
          {icon}
        </div>

        <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
          {title}
        </h3>

        <p className="mt-4 leading-8 text-body">
          {description}
        </p>
      </div>
    </motion.div>
  );
}