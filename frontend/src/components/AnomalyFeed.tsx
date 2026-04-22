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

  const getDeviationStyle = (deviation: number) => {
    const abs = Math.abs(deviation);
    if (abs > 3) return { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', accent: 'bg-rose-500' };
    if (abs > 2.5) return { color: 'text-cyber-amber', bg: 'bg-amber-500/10', border: 'border-amber-500/20', accent: 'bg-amber-500' };
    return { color: 'text-cyber-cyan', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', accent: 'bg-cyan-500' };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Empty State */}
      {!anomalies.length && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
          <div className="relative">
            <ShieldAlert size={48} strokeWidth={1} className="text-slate-400" />
            <div className="absolute inset-0 animate-ping opacity-20">
              <ShieldAlert size={48} strokeWidth={1} className="text-cyan-500" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="label-caps !text-slate-400">Signal Integrity: 100.0%</p>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">No orbital variance detected in current session</p>
          </div>
        </div>
      )}

      {/* Anomalies list */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-4">
          {anomalies.map((anomaly, idx) => {
            const style = getDeviationStyle(anomaly.deviation);
            return (
              <div
                key={idx}
                className="group relative flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-[1px] ${style.accent} opacity-30 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${style.bg} ${style.border}`}>
                      <TrendingUp size={14} className={style.color} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{anomaly.metric}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tabular-nums">
                    {formatRelativeTime(anomaly.timestamp)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Variance Depth</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-mono font-black tabular-nums ${style.color}`}>
                        Δ {anomaly.deviation.toFixed(2)}σ
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Peak Amplitude</p>
                    <p className="text-sm font-mono font-black text-white tabular-nums">
                      {anomaly.value.toFixed(3)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <button
          onClick={handleExport}
          disabled={anomalies.length === 0}
          className="cyber-button-primary disabled:opacity-20 flex items-center justify-center gap-3 text-[10px] tracking-widest h-11"
        >
          <DownloadIcon size={14} />
          EXPORT LOGS
        </button>
        <button
          onClick={() => dispatch(clearAnomalies())}
          disabled={anomalies.length === 0}
          className="cyber-button disabled:opacity-20 flex items-center justify-center gap-3 text-[10px] tracking-widest h-11 hover:!text-rose-400 hover:!border-rose-500/30"
        >
          <TrashIcon size={14} />
          WIPE BUFFER
        </button>
      </div>
    </div>
  );
}
