import React from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { formatDuration, formatDataThroughput } from '../utils/formatting';
import { Activity, Zap, Radio } from 'lucide-react';

export function ExperimentHeader() {
  const readings = useTelemetryStore((s) => s.readings);
  const messageCount = useTelemetryStore((s) => s.messageCount);

  const runtime = readings.length > 0 ? readings[readings.length - 1].systemUptime : 0;
  const signalIntegrity =
    readings.length > 0 ? readings[readings.length - 1].signalIntegrity : 100;
  const throughput = formatDataThroughput(messageCount, runtime);

  return (
    <div className="border-b border-lab-800 bg-lab-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow">
              <Zap className="text-lab-950" size={20} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EXP-2026-0219</h1>
              <p className="text-xs text-slate-400 font-medium">Real-time telemetry</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex gap-8 ml-4">
            {/* Runtime */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-lab-800 border border-lab-700">
              <Activity size={16} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Runtime</p>
                <p className="font-mono text-sm text-white font-semibold">{formatDuration(runtime)}</p>
              </div>
            </div>

            {/* Throughput */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-lab-800 border border-lab-700">
              <Radio size={16} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Throughput</p>
                <p className="font-mono text-sm text-white font-semibold">{throughput}</p>
              </div>
            </div>

            {/* Signal Integrity */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-lab-800 border border-lab-700">
              <div className="w-6 h-6 rounded-full bg-lab-700 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-accent" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Integrity</p>
                <p className="font-mono text-sm text-white font-semibold">{signalIntegrity.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lab-800 border border-lab-700">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-subtle" />
          <span className="text-sm font-medium text-slate-300">Streaming</span>
        </div>
      </div>
    </div>
  );
}
