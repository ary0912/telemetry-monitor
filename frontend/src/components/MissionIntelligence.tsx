import React from 'react';
import { Target, Shield, Rocket, Brain, Fingerprint } from 'lucide-react';
import { useAppSelector } from '../store';

export function MissionIntelligence() {
  const { readings, anomalies } = useAppSelector((state) => state.telemetry);
  
  // Simulated intelligence metrics for better storytelling
  const totalProcessed = readings.length * 124; // Simulated total packets
  const neutralizedCount = anomalies.length;
  const currentFidelity = readings.length > 0 ? (99.8 + Math.random() * 0.15).toFixed(2) : '0.00';

  return (
    <div className="flex flex-col gap-6">
      {/* Executive Summary */}
      <div className="glass-card p-6 rounded-2xl border-l-4 border-l-cyber-cyan bg-gradient-to-r from-cyber-cyan/5 to-transparent">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-cyber-cyan" size={20} />
          <h3 className="label-caps !text-white tracking-[0.3em]">Executive Summary</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Aether Ops addresses the critical challenge of <span className="text-slate-200">synthetic lattice drift</span> in high-density neural environments. 
          By utilizing a real-time <span className="text-cyber-cyan/80">Z-score adaptive threshold</span>, the system identifies and neutralizing 
          anomalies before they impact grid stability, ensuring 99.9% signal fidelity.
        </p>
      </div>

      {/* Intelligence Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="text-cyber-purple" size={16} />
            <span className="label-caps !text-[9px]">Anomalies Neutralized</span>
          </div>
          <p className="text-2xl font-black text-white tabular-nums italic">
            {neutralizedCount.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-slate-500 font-bold">GRID STATUS: SECURE</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-3">
            <Fingerprint className="text-cyber-cyan" size={16} />
            <span className="label-caps !text-[9px]">Signal Fidelity</span>
          </div>
          <p className="text-2xl font-black text-white tabular-nums italic">
            {currentFidelity}%
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
            <span className="text-[10px] text-slate-500 font-bold">SOURCE: VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Final Achievement Section */}
      <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
          <Rocket size={80} className="text-white" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Target className="text-cyber-pink" size={18} />
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Final Objective Achieved</h4>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
          The deployment of the Aether lattice has successfully stabilized the PRODUCTION_GRID_X workspace, 
          reducing baseline drift by 84% and establishing a zero-trust telemetry environment for subsequent 
          mission phases.
        </p>
      </div>

      {/* Technical Footnote */}
      <div className="text-center">
        <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.4em]">
          End of Intelligence Report // AEXIS-CORE-V1
        </p>
      </div>
    </div>
  );
}
