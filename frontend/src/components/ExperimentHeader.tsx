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
    <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl px-6 lg:px-10 py-4 lg:py-6 sticky top-0 z-50">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-[2400px] mx-auto gap-6 sm:gap-0">
        <div className="flex items-center gap-4 lg:gap-16 w-full sm:w-auto justify-between sm:justify-start">
          {/* Logo and title */}
          <div className="flex items-center gap-3 lg:gap-5">
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Zap className="text-white relative z-10 group-hover:scale-110 transition-transform duration-500 w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-lg lg:text-2xl font-black tracking-[0.1em] text-white italic group whitespace-nowrap">
                AETHER <span className="text-slate-500 group-hover:text-cyber-cyan transition-colors duration-500">OPS //</span> CG-9
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-cyber-cyan animate-pulse" />
                <p className="text-[8px] lg:text-[9px] text-slate-500 font-bold uppercase tracking-[0.25em]">Autonomous Neural Monitoring</p>
              </div>
            </div>
          </div>

          {/* Metrics - Hidden on very small mobile, visible from small screens up */}
          <div className="hidden sm:flex gap-6 lg:gap-10">
            {/* Runtime */}
            <div className="hidden lg:block space-y-1.5 border-l border-white/5 pl-8">
              <span className="label-caps !text-[9px]">Uptime</span>
              <div className="flex items-center gap-3">
                <Activity size={14} className="text-cyber-cyan opacity-50" />
                <span className="font-mono text-base lg:text-xl text-white font-black tabular-nums">{formatDuration(runtime)}</span>
              </div>
            </div>

            {/* Throughput */}
            <div className="hidden md:block space-y-1.5 border-l border-white/5 pl-4 lg:pl-8">
              <span className="label-caps !text-[9px]">Throughput</span>
              <div className="flex items-center gap-2 lg:gap-3">
                <Radio size={14} className="text-cyber-purple opacity-50" />
                <span className="font-mono text-base lg:text-xl text-white font-black tabular-nums uppercase">{throughput}</span>
              </div>
            </div>

            {/* Signal Integrity */}
            <div className="space-y-1.5 border-l border-white/5 pl-4 lg:pl-8">
              <span className="label-caps !text-[9px]">Accuracy</span>
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                <span className="font-mono text-base lg:text-xl text-white font-black tabular-nums">{signalIntegrity.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 px-4 lg:px-8 py-2 lg:py-3 rounded-xl lg:rounded-2xl hover:border-white/10 transition-all group w-full sm:w-auto">
          <div className="text-right flex-1 sm:flex-none">
            <p className="text-[7px] lg:text-[8px] text-slate-500 font-black uppercase tracking-widest mb-0.5">Network Status</p>
            <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest text-white">
              {connected ? 'Operational' : 'Establishing...'}
            </p>
          </div>
          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center transition-all duration-500 ${
            connected ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20' : 'bg-white/5 text-slate-500 border-white/5'
          } border`}>
            <Globe className={`w-4 h-4 lg:w-5 lg:h-5 ${connected ? 'animate-pulse' : ''}`} />
          </div>
        </div>
      </div>
    </header>
  );
}
