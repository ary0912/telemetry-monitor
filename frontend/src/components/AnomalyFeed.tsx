import React, { useEffect } from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { AnomalyEvent } from '../types';
import { formatRelativeTime } from '../utils/formatting';
import { AlertCircleIcon, DownloadIcon, TrashIcon, TrendingUp } from 'lucide-react';
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

  const getDeviationColor = (deviation: number) => {
    const abs = Math.abs(deviation);
    if (abs > 3) return 'text-red-400 bg-red-950';
    if (abs > 2.5) return 'text-orange-400 bg-orange-950';
    if (abs > 2) return 'text-yellow-400 bg-yellow-950';
    return 'text-cyan-400 bg-cyan-950';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-lab-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-cyan-400" />
            <h3 className="font-bold text-white">Deviations</h3>
          </div>
          <span className="text-xs font-mono bg-lab-800 text-cyan-400 px-2.5 py-1 rounded-full font-semibold">
            {anomalies.length}
          </span>
        </div>
        <p className="text-xs text-slate-500">Recent anomalies detected</p>
      </div>

      {/* Anomalies list */}
      <div className="flex-1 overflow-y-auto">
        {anomalies.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 p-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-lab-800 mx-auto mb-3 flex items-center justify-center">
                <AlertCircleIcon size={16} className="text-slate-600" />
              </div>
              <p className="text-sm font-medium">All signals normal</p>
              <p className="text-xs mt-1">No deviations detected</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-lab-800">
            {anomalies.map((anomaly, idx) => (
              <div
                key={idx}
                className="p-3 hover:bg-lab-800 transition-colors duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 p-1.5 rounded-lg ${getDeviationColor(
                      anomaly.deviation
                    )}`}
                  >
                    <AlertCircleIcon size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        {anomaly.metric}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatRelativeTime(anomaly.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1.5">
                      Deviation:{' '}
                      <span className={`font-bold ${getDeviationColor(anomaly.deviation)}`}>
                        Δ {anomaly.deviation.toFixed(2)}σ
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
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
      <div className="border-t border-lab-800 p-3 flex gap-2">
        <button
          onClick={handleExport}
          disabled={anomalies.length === 0}
          className="flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DownloadIcon size={13} />
          Export
        </button>
        <button
          onClick={() => clearAnomalies()}
          disabled={anomalies.length === 0}
          className="flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <TrashIcon size={13} />
          Clear
        </button>
      </div>
    </div>
  );
}
