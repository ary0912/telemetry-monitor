import { useAppDispatch, useAppSelector } from '../store';
import { clearAnomalies } from '../store/telemetrySlice';
import { AnomalyEvent } from '../types';
import { formatRelativeTime } from '../utils/formatting';
import { AlertCircleIcon, DownloadIcon, TrashIcon, TrendingUp, ShieldAlert } from 'lucide-react';
import { exportAnomaliesAsCSV, downloadCSV } from '../utils/formatting';

interface Props {
  anomalies: AnomalyEvent[];
}

export function AnomalyFeed({ anomalies }: Props) {
  const dispatch = useAppDispatch();
  const { showAnomalies } = useAppSelector((state) => state.telemetry);

  const handleExport = () => {
    const csv = exportAnomaliesAsCSV(anomalies);
    downloadCSV(csv, `anomalies-${new Date().getTime()}.csv`);
  };

  const getDeviationColor = (deviation: number) => {
    const abs = Math.abs(deviation);
    if (abs > 3) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (abs > 2.5) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (abs > 2) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header handled by parent Dashboard for consistency, but if internal needed: */}
      {!anomalies.length && (
        <div className="px-4 py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={20} className="text-slate-600" />
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">No Active Threats</p>
          <p className="text-[9px] text-slate-600 mt-1 uppercase font-bold">Signal integrity is 100%</p>
        </div>
      )}

      {/* Anomalies list */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {anomalies.map((anomaly, idx) => (
          <div
            key={idx}
            className="p-3 bg-white/2 border border-white/5 rounded-lg hover:border-cyber-cyan/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-cyan transition-all group-hover:w-1.5" />
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic flex items-center gap-2">
                    <TrendingUp size={10} className="text-cyber-cyan" />
                    {anomaly.metric}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tabular-nums">
                    {formatRelativeTime(anomaly.timestamp)}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] text-slate-500 mb-1 font-bold uppercase tracking-widest">Deviation Depth</p>
                    <p className={`text-xs font-black tabular-nums ${getDeviationColor(anomaly.deviation).split(' ')[0]}`}>
                      Δ {anomaly.deviation.toFixed(2)}σ
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-500 mb-1 font-bold uppercase tracking-widest">Raw Value</p>
                    <p className="text-xs font-mono font-bold text-white tabular-nums">
                      {anomaly.value.toFixed(3)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleExport}
          disabled={anomalies.length === 0}
          className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-20 flex items-center justify-center gap-2"
        >
          <DownloadIcon size={12} />
          Export
        </button>
        <button
          onClick={() => dispatch(clearAnomalies())}
          disabled={anomalies.length === 0}
          className="flex-1 bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-20 flex items-center justify-center gap-2"
        >
          <TrashIcon size={12} />
          Wipe
        </button>
      </div>
    </div>
  );
}
