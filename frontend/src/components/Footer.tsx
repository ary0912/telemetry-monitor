import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { Wifi, Clock, Signal, Database, Activity } from 'lucide-react';

export function Footer() {
  const { wsLatency, messageCount, readings, connected } = useAppSelector((state) => state.telemetry);
  const [streamingFreq, setStreamingFreq] = useState('0.0 Hz');

  useEffect(() => {
    if (readings.length < 2) return;

    const recentReadings = readings.slice(-10);
    if (recentReadings.length < 2) return;

    const timeSpanMs =
      recentReadings[recentReadings.length - 1].timestamp - recentReadings[0].timestamp;
    if (timeSpanMs === 0) return;

    const freq = (recentReadings.length / timeSpanMs) * 1000;
    setStreamingFreq(`${freq.toFixed(1)} Hz`);
  }, [readings]);

  return (
    <footer className="border-t border-white/5 bg-slate-950/80 backdrop-blur-xl px-6 lg:px-10 py-3 lg:py-3 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-8 lg:gap-12">
        {/* Connection */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${connected ? 'bg-cyber-cyan shadow-[0_0_8px_rgba(56,189,248,0.5)] animate-pulse' : 'bg-slate-700'}`} />
          <div className="flex flex-col">
            <span className="label-caps !text-[7px] lg:!text-[8px] !tracking-[0.3em] opacity-50 leading-none mb-1">Status</span>
            <span className={`text-[9px] lg:text-[10px] font-black tracking-widest leading-none ${connected ? 'text-white' : 'text-slate-600'}`}>
              {connected ? 'SYNC_ACTIVE' : 'SYNC_LOST'}
            </span>
          </div>
        </div>

        {/* Latency */}
        <div className="flex items-center gap-3 lg:gap-4 border-l border-white/5 pl-6 lg:pl-8">
          <Clock size={12} className="text-cyber-purple opacity-50" />
          <div className="flex flex-col">
            <span className="label-caps !text-[7px] lg:!text-[8px] !tracking-[0.3em] opacity-50 leading-none mb-1">Delay</span>
            <span className="text-[9px] lg:text-[10px] text-white font-mono font-black tabular-nums leading-none">{wsLatency.toFixed(0)}ms</span>
          </div>
        </div>

        {/* Frequency - Hidden on small mobile */}
        <div className="hidden xs:flex items-center gap-3 lg:gap-4 border-l border-white/5 pl-6 lg:pl-8">
          <Signal size={12} className="text-cyber-cyan opacity-50" />
          <div className="flex flex-col">
            <span className="label-caps !text-[7px] lg:!text-[8px] !tracking-[0.3em] opacity-50 leading-none mb-1">Freq</span>
            <span className="text-[9px] lg:text-[10px] text-white font-mono font-black tabular-nums leading-none">{streamingFreq}</span>
          </div>
        </div>
      </div>

      {/* Right side stats - Hidden on small mobile to save space */}
      <div className="hidden sm:flex items-center gap-8 lg:gap-12">
        <div className="flex flex-col text-right">
          <span className="label-caps !text-[7px] lg:!text-[8px] !tracking-[0.3em] opacity-50 mb-1 leading-none">Stream Vol</span>
          <div className="flex items-center justify-end gap-2 lg:gap-3 leading-none">
            <span className="text-[9px] lg:text-[10px] text-white font-mono font-black tabular-nums">{messageCount.toLocaleString()} <span className="text-[7px] lg:text-[8px] text-slate-600">PKTS</span></span>
            <Database size={12} className="text-slate-700" />
          </div>
        </div>
        
        <div className="hidden md:flex flex-col text-right">
          <span className="label-caps !text-[7px] lg:!text-[8px] !tracking-[0.3em] opacity-50 mb-1 leading-none">Buffer</span>
          <div className="flex items-center justify-end gap-2 lg:gap-3 leading-none">
            <span className="text-[9px] lg:text-[10px] text-white font-mono font-black tabular-nums">{readings.length.toLocaleString()} <span className="text-[7px] lg:text-[8px] text-slate-600">UNITS</span></span>
            <Activity size={12} className="text-slate-700" />
          </div>
        </div>
      </div>
    </footer>
  );
}
