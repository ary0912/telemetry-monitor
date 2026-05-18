import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-elevated text-on-dark px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="rounded-3xl border border-hairline bg-surface-soft shadow-panel p-10 text-center max-w-lg"
      >
        <div className="mb-6 flex justify-center">
          <div className="h-14 w-14 rounded-full border border-m-blue-light/30 bg-gradient-to-br from-m-blue-light/20 to-surface-elevated shadow-glow animate-pulse-subtle" />
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Telemetry observability platform</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Rehydrating telemetry streams…</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Preparing live signal pipelines, anomaly engines, and mission-critical dashboards.
        </p>
      </motion.div>
    </div>
  );
}
