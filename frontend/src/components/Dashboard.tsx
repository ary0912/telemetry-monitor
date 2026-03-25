import React from 'react';
import { useAppSelector } from '../store';
import { ExperimentHeader } from './ExperimentHeader';
import { Sidebar } from './Sidebar';
import { TelemetryChart } from './TelemetryChart';
import { AnomalyFeed } from './AnomalyFeed';
import { SystemStats } from './SystemStats';
import { Footer } from './Footer';

export function Dashboard() {
  const { readings, anomalies } = useAppSelector((state) => state.telemetry);

  return (
    <div className="min-h-screen bg-deep text-slate-100 flex flex-col cyber-grid">
      {/* Header */}
      <ExperimentHeader />

      {/* Main layout: sidebar + content + right panel */}
      <div className="flex flex-1 overflow-hidden gap-6 p-6">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Central chart area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="flex-1 overflow-hidden glass-card rounded-xl">
            <TelemetryChart readings={readings} />
          </div>
        </div>

        {/* Right panel: anomalies + stats */}
        <div className="w-96 flex-shrink-0 flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 glass-card overflow-y-auto rounded-xl p-4">
            <h3 className="text-sm font-bold text-cyber-cyan mb-4 uppercase tracking-widest glow-text">Anomaly Detection</h3>
            <AnomalyFeed anomalies={anomalies} />
          </div>
          <div className="glass-card overflow-y-auto rounded-xl p-4">
            <h3 className="text-sm font-bold text-cyber-cyan mb-4 uppercase tracking-widest glow-text">System Metrics</h3>
            <SystemStats readings={readings} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
