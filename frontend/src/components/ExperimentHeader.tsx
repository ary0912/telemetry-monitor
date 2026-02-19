import React from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { formatDuration, formatDataThroughput } from '../utils/formatting';

export function ExperimentHeader() {
  const readings = useTelemetryStore((s) => s.readings);
  const messageCount = useTelemetryStore((s) => s.messageCount);

  const runtime = readings.length > 0 ? readings[readings.length - 1].systemUptime : 0;
  const signalIntegrity =
    readings.length > 0 ? readings[readings.length - 1].signalIntegrity : 100;
  const throughput = formatDataThroughput(messageCount, runtime);

  return (
    <div className="border-b border-slate-800 bg-slate-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-lg font-semibold text-slate-100">EXP-2026-0219</h1>
            <p className="text-xs text-slate-400">Experimental monitoring system</p>
          </div>

          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-slate-400">Runtime</p>
              <p className="font-mono text-slate-100">{formatDuration(runtime)}</p>
            </div>

            <div>
              <p className="text-slate-400">Data throughput</p>
              <p className="font-mono text-slate-100">{throughput}</p>
            </div>

            <div>
              <p className="text-slate-400">Signal integrity</p>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${signalIntegrity}%`
                    }}
                  />
                </div>
                <span className="font-mono text-slate-100">{signalIntegrity.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-slate-400">Streaming</span>
        </div>
      </div>
    </div>
  );
}
