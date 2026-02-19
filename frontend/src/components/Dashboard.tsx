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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <ExperimentHeader />

      {/* Main layout: sidebar + content + right panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Central chart area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4 overflow-hidden">
            <TelemetryChart readings={readings} />
          </div>
        </div>

        {/* Right panel: anomalies + stats */}
        <div className="w-80 border-l border-slate-800 flex flex-col bg-slate-900">
          <div className="flex-1 overflow-y-auto">
            <AnomalyFeed anomalies={anomalies} />
          </div>
          <div className="border-t border-slate-800">
            <SystemStats readings={readings} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
