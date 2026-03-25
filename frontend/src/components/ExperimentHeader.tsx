import React from 'react';
import { useAppSelector } from '../store';
import { formatDuration, formatDataThroughput } from '../utils/formatting';
import { Activity, Zap, Radio, Globe } from 'lucide-react';

export function ExperimentHeader() {
  const { readings, messageCount, connected } = useAppSelector((state) => state.telemetry);

  const lastReading = readings[readings.length - 1];
  const runtime = lastReading ? lastReading.systemUptime : 0;
  const signalIntegrity = lastReading ? lastReading.signalIntegrity : 100;
  const throughput = formatDataThroughput(messageCount, runtime);

  return (
    <div className="border-b border-white/5 bg-surface/80 backdrop-blur-md px-8 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Logo and title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-cyber-cyan blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
              <Zap className="text-deep relative z-10" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white glow-text italic">CYBER-GRID // CG-9</h1>
              <p className="text-[10px] text-cyber-cyan font-bold uppercase tracking-[0.2em] opacity-80">Autonomous Threat Detection</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex gap-6">
            {/* Runtime */}
            <div className="flex flex-col px-4 py-1 border-l border-white/10">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Session Time</span>
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyber-cyan" />
                <span className="font-mono text-lg text-white font-medium">{formatDuration(runtime)}</span>
              </div>
            </div>

            {/* Throughput */}
            <div className="flex flex-col px-4 py-1 border-l border-white/10">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Data Rate</span>
              <div className="flex items-center gap-2">
                <Radio size={14} className="text-cyber-purple" />
                <span className="font-mono text-lg text-white font-medium uppercase">{throughput}</span>
              </div>
            </div>

            {/* Signal Integrity */}
            <div className="flex flex-col px-4 py-1 border-l border-white/10">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Signal Trust</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                <span className="font-mono text-lg text-white font-medium">{signalIntegrity.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors cursor-default">
          <div className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-cyber-cyan animate-pulse' : 'bg-slate-600'} shadow-[0_0_8px_rgba(0,242,255,0.5)]`} />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
            {connected ? 'Syncing Nodes' : 'Searching...'}
          </span>
          <Globe size={16} className="text-slate-500" />
        </div>
      </div>
    </div>
  );
}
