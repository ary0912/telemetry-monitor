import React, { useEffect } from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { AnomalyEvent } from '../types';
import { formatRelativeTime } from '../utils/formatting';
import { AlertCircleIcon, DownloadIcon, TrashIcon } from 'lucide-react';
import { exportAnomaliesAsCSV, downloadCSV } from '../utils/formatting';

interface Props {
  anomalies: AnomalyEvent[];
}

export function AnomalyFeed({ anomalies }: Props) {
  const clearAnomalies = useTelemetryStore((s) => s.clearAnomalies);
  const showAnomalies = useTelemetryStore((s) => s.showAnomalies);

  const handleExport = () => {
    const csv = exportAnomaliesAsCSV(anomalies);
    downloadCSV(csv, `anomalies-${new Date().getTime()}.csv`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-100 text-sm">Deviations</h3>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
            {anomalies.length}
          </span>
        </div>
        <p className="text-xs text-slate-500">Recent anomalies detected</p>
      </div>

      {/* Anomalies list */}
      <div className="flex-1 overflow-y-auto">
        {anomalies.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p className="text-sm">All monitored signals within expected range</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {anomalies.map((anomaly, idx) => (
              <div key={idx} className="p-3 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-2">
                  <AlertCircleIcon size={14} className="mt-0.5 text-amber-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-slate-300">
                        {anomaly.metric}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatRelativeTime(anomaly.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Deviation: <span className="text-slate-200">Δ {anomaly.deviation.toFixed(2)}σ</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Value: {anomaly.value.toFixed(3)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-slate-800 p-3 flex gap-2">
        <button
          onClick={handleExport}
          disabled={anomalies.length === 0}
          className="flex-1 flex items-center justify-center gap-2 px-2 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-slate-300 transition-colors"
        >
          <DownloadIcon size={14} />
          Export CSV
        </button>
        <button
          onClick={() => clearAnomalies()}
          disabled={anomalies.length === 0}
          className="flex-1 flex items-center justify-center gap-2 px-2 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-slate-300 transition-colors"
        >
          <TrashIcon size={14} />
          Clear
        </button>
      </div>
    </div>
  );
}
