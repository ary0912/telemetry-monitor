import React from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { ExperimentHeader } from './ExperimentHeader';
import { Sidebar } from './Sidebar';
import { TelemetryChart } from './TelemetryChart';
import { AnomalyFeed } from './AnomalyFeed';
import { SystemStats } from './SystemStats';
import { Footer } from './Footer';

export function Dashboard() {
  const readings = useTelemetryStore((s) => s.readings);
  const anomalies = useTelemetryStore((s) => s.anomalies);
  const connected = useTelemetryStore((s) => s.connected);

  return (
    <div className="min-h-screen bg-gradient-lab text-slate-100 flex flex-col">
      {/* Header */}
      <ExperimentHeader />

      {/* Main layout: sidebar + content + right panel */}
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Central chart area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="flex-1 overflow-hidden">
            <TelemetryChart readings={readings} />
          </div>
        </div>

        {/* Right panel: anomalies + stats */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 card overflow-y-auto">
            <AnomalyFeed anomalies={anomalies} />
          </div>
          <div className="card overflow-y-auto">
            <SystemStats readings={readings} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
