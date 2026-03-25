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
    <div className="border-t border-white/5 bg-surface/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-10">
        {/* Connection */}
        <div className="flex items-center gap-3">
          <Wifi size={14} className={connected ? 'text-cyber-cyan animate-pulse' : 'text-slate-600'} />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Network</span>
            <span className={`text-[10px] uppercase font-black tracking-widest leading-none ${connected ? 'text-white' : 'text-slate-600'}`}>
              {connected ? 'Active_Link' : 'Link_Lost'}
            </span>
          </div>
        </div>

        {/* Latency */}
        <div className="flex items-center gap-3">
          <Clock size={14} className="text-cyber-purple" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Latency</span>
            <span className="text-[10px] text-white font-mono font-black tracking-widest leading-none">{wsLatency.toFixed(0)}ms</span>
          </div>
        </div>

        {/* Frequency */}
        <div className="flex items-center gap-3">
          <Signal size={14} className="text-cyber-cyan" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Sampling</span>
            <span className="text-[10px] text-white font-mono font-black tracking-widest leading-none">{streamingFreq}</span>
          </div>
        </div>
      </div>

      {/* Right side stats */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Database size={14} className="text-slate-500" />
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Total_Packets</span>
            <span className="text-[10px] text-white font-mono font-black tracking-widest leading-none">{messageCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-slate-500" />
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Buffer_Size</span>
            <span className="text-[10px] text-white font-mono font-black tracking-widest leading-none">{readings.length.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
