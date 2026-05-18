import React from 'react';

import { motion } from 'framer-motion';

import {
  Activity,
  ArrowLeft,
  Cpu,
  ShieldCheck,
  Wifi
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../store';

import { TelemetryChart } from './TelemetryChart';
import { AnomalyFeed } from './AnomalyFeed';
import { SystemStats } from './SystemStats';
import { Footer } from './Footer';
import { WelcomeModal } from './WelcomeModal';
import { MissionIntelligence } from './MissionIntelligence';

/* ========================================================= */
/* MOTION */
/* ========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 12
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/* ========================================================= */
/* DASHBOARD */
/* ========================================================= */

export function Dashboard() {
  const {
    readings,
    anomalies,
    connected,
    healthScore,
    throughput
  } = useAppSelector((state) => state.telemetry);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* ambient glows */}

        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-15%] right-[-10%] h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-3xl" />

        {/* blueprint grid */}

        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <WelcomeModal />

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <header className="relative z-50 border-b border-white/[0.05] bg-black/20 backdrop-blur-md">
        <div className="flex items-center justify-between px-5 py-4 lg:px-10">
          {/* ========================================================= */}
          {/* LEFT */}
          {/* ========================================================= */}

          <div className="flex items-center gap-5">
            {/* LOGO */}

            <NavLink
              to="/"
              className="
                group relative flex h-11 w-11
                items-center justify-center
                overflow-hidden rounded-xl
                border border-white/[0.05]
                bg-white/[0.02]
                transition-all duration-300

                hover:bg-white/[0.03]
              "
            >
              <div className="relative flex items-center gap-[2px] text-[0.95rem] font-semibold tracking-[-0.04em]">
                <span className="text-cyan-300">
                  T
                </span>

                <span className="text-white">
                  M
                </span>
              </div>
            </NavLink>

            {/* TITLE */}

            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                telemetry workspace
              </p>

              <h1
                className="
                  mt-2
                  text-[1.65rem]
                  font-semibold
                  tracking-[-0.045em]

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
              flex items-center gap-3
              rounded-full
              border border-white/[0.05]
              bg-white/[0.02]
              p-2
            "
          >
            <HeaderPill
              icon={<Wifi size={13} />}
              label="Stream"
              value={connected ? 'Live' : 'Offline'}
            />

            <HeaderPill
              icon={<ShieldCheck size={13} />}
              label="Health"
              value={`${healthScore.toFixed(0)}%`}
            />

            <NavLink
              to="/"
              className="
                group flex h-11 w-11
                items-center justify-center
                rounded-full border
                border-white/[0.05]
                bg-white/[0.02]
                text-white/50
                transition-all duration-300

                hover:bg-white/[0.04]
                hover:text-cyan-300
              "
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN */}
      {/* ========================================================= */}

      <main className="relative z-10 px-5 pb-8 pt-6 lg:px-10">
        {/* ========================================================= */}
        {/* HERO */}
        {/* ========================================================= */}

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="
            overflow-hidden rounded-[28px]
            border border-white/[0.05]
            bg-white/[0.025]
          "
        >
          {/* ========================================================= */}
          {/* TOP */}
          {/* ========================================================= */}

          <div className="border-b border-white/[0.05] px-6 py-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-300" />

                <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  realtime telemetry
                </span>
              </div>

              <h2
                className="
                  mt-6
                  max-w-[10ch]
                  text-[3rem]
                  font-semibold
                  leading-[0.92]
                  tracking-[-0.06em]

                  sm:text-[4.4rem]
                  xl:text-[5.2rem]
                "
              >
                System signal intelligence
              </h2>

              <p
                className="
                  mt-7
                  max-w-[58ch]
                  text-[15px]
                  leading-8
                  text-white/55

                  sm:text-[17px]
                  sm:leading-9
                "
              >
                Monitor telemetry streams,
                operational anomalies,
                infrastructure health,
                and realtime system activity
                through a modern observability
                workspace.
              </p>
            </div>

            {/* ========================================================= */}
            {/* KPI */}
            {/* ========================================================= */}

            <div
              className="
                mt-10 grid gap-4

                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              <StatusCard
                icon={<Wifi size={16} />}
                title="Signal link"
                value={connected ? 'Nominal' : 'Offline'}
                description="Realtime stream synchronization active."
              />

              <StatusCard
                icon={<ShieldCheck size={16} />}
                title="Detection"
                value="Adaptive"
                description="Anomaly engine operating normally."
              />

              <StatusCard
                icon={<Cpu size={16} />}
                title="Pipeline"
                value={`${throughput.toFixed(1)} msg/s`}
                description="Telemetry ingestion throughput stable."
              />

              <StatusCard
                icon={<Activity size={16} />}
                title="Events"
                value={`${anomalies.length}`}
                description="Realtime incident events detected."
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CHART */}
          {/* ========================================================= */}

          <div className="p-4 sm:p-6 lg:p-8">
            <div
              className="
                overflow-hidden rounded-[24px]
                border border-white/[0.05]
                bg-[#070d18]
                p-5
              "
            >
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  signal correlation
                </p>

                <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.045em]">
                  Live operational telemetry
                </h3>
              </div>

              <div className="h-[540px]">
                <TelemetryChart
                  readings={readings}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================================= */}
        {/* WORKSPACE */}
        {/* ========================================================= */}

        <div
          className="
            mt-8 grid gap-6

            xl:grid-cols-[1fr_360px]
          "
        >
          {/* ========================================================= */}
          {/* LEFT */}
          {/* ========================================================= */}

          <section className="flex min-w-0 flex-col gap-6">
            {/* ========================================================= */}
            {/* INCIDENT CENTER */}
            {/* ========================================================= */}

            <section
              className="
                overflow-hidden rounded-[24px]
                border border-white/[0.05]
                bg-white/[0.025]
              "
            >
              <div className="border-b border-white/[0.05] px-6 py-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  incident center
                </p>

                <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.045em]">
                  Anomaly intelligence
                </h3>

                <p className="mt-4 max-w-[60ch] text-[15px] leading-8 text-white/55">
                  Statistical anomaly detection
                  and adaptive event analysis
                  across operational telemetry
                  channels.
                </p>
              </div>

              <div className="p-5">
                <AnomalyFeed anomalies={anomalies} />
              </div>
            </section>

            {/* ========================================================= */}
            {/* SYSTEM STATS */}
            {/* ========================================================= */}

            <section
              className="
                overflow-hidden rounded-[24px]
                border border-white/[0.05]
                bg-white/[0.025]
              "
            >
              <div className="border-b border-white/[0.05] px-6 py-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  operational analytics
                </p>

                <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.045em]">
                  Runtime metrics
                </h3>

                <p className="mt-4 max-w-[60ch] text-[15px] leading-8 text-white/55">
                  Aggregated telemetry
                  measurements and realtime
                  system statistics for active
                  infrastructure streams.
                </p>
              </div>

              <div className="p-5">
                <SystemStats readings={readings} />
              </div>
            </section>
          </section>

          {/* ========================================================= */}
          {/* RIGHT RAIL */}
          {/* ========================================================= */}

          <aside className="flex flex-col gap-6">
            <MissionIntelligence />

            <Footer />
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ========================================================= */
/* HEADER PILL */
/* ========================================================= */

function HeaderPill({
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
        rounded-full border border-white/[0.05]
        bg-white/[0.02]
        px-4 py-3
      "
    >
      <div className="text-cyan-300 opacity-80">
        {icon}
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium tracking-[-0.02em] text-white/90">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ========================================================= */
/* STATUS CARD */
/* ========================================================= */

function StatusCard({
  icon,
  title,
  value,
  description
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
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
        rounded-2xl border border-white/[0.05]
        bg-white/[0.02]
        p-5
        transition-colors duration-200

        hover:bg-white/[0.03]
      "
    >
      <div className="flex items-center justify-between">
        <div className="text-cyan-300 opacity-80">
          {icon}
        </div>

        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-white/28">
        {title}
      </p>

      <h3 className="mt-3 text-[2rem] font-semibold tracking-[-0.045em] text-white">
        {value}
      </h3>

      <p className="mt-4 text-[14px] leading-7 text-white/50">
        {description}
      </p>
    </motion.div>
  );
}