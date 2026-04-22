import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  setIsPaused, 
  setAnomalySensitivity, 
  setCalibrationMode, 
  setSignalNormalization 
} from '../store/telemetrySlice';
import {
  PauseIcon,
  PlayIcon,
  ChevronDownIcon,
  SettingsIcon,
  ZapOffIcon,
  RotateCwIcon,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { 
    isPaused, 
    anomalySensitivity, 
    calibrationMode, 
    signalNormalizationActive: signalNormalization,
    connected 
  } = useAppSelector((state) => state.telemetry);

  return (
    <div className="flex flex-col h-full space-y-4 lg:space-y-6">
      {/* Stream control */}
      <div className="glass-card p-1 rounded-xl lg:rounded-2xl">
        <button
          onClick={() => dispatch(setIsPaused(!isPaused))}
          className={`w-full flex items-center justify-center gap-3 py-4 lg:py-5 text-[10px] lg:text-xs font-black tracking-widest transition-all duration-300 rounded-lg lg:rounded-xl group ${
            isPaused 
              ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20' 
              : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:border-white/20'
          }`}
        >
          {isPaused ? (
            <>
              <PlayIcon size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              RESUME MONITORING
            </>
          ) : (
            <>
              <PauseIcon size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              SUSPEND SCAN
            </>
          )}
        </button>
      </div>

      {/* Experiment selector */}
      <div className="p-4 lg:p-6 glass-card rounded-xl lg:rounded-2xl space-y-4">
        <label className="label-caps">Target Workspace</label>
        <div className="flex items-center justify-between px-4 py-4 lg:py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] lg:text-xs text-white font-bold cursor-pointer hover:border-cyber-cyan/30 transition-all group">
          <div className="flex items-center gap-3">
            <Cpu size={16} className="text-cyber-cyan" />
            <span className="font-mono">PRODUCTION_GRID_X</span>
          </div>
          <ChevronDownIcon size={14} className="text-slate-500 group-hover:text-cyber-cyan" />
        </div>
      </div>

      {/* Anomaly sensitivity */}
      <div className="p-4 lg:p-6 glass-card rounded-xl lg:rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="label-caps">AI Threshold</label>
          <span className="font-mono text-[10px] font-bold text-cyber-cyan bg-cyber-cyan/10 px-2 py-1 rounded-md border border-cyber-cyan/20">
            {anomalySensitivity.toFixed(1)}σ
          </span>
        </div>
        <div className="relative pt-2 pb-1">
          <input
            type="range"
            min="1.5"
            max="3.0"
            step="0.1"
            value={anomalySensitivity}
            onChange={(e) => dispatch(setAnomalySensitivity(parseFloat(e.target.value)))}
            className="w-full accent-cyber-cyan cursor-pointer h-2 bg-white/5 rounded-lg appearance-none"
          />
        </div>
        <p className="text-[9px] lg:text-[10px] text-slate-500 font-medium leading-relaxed">
          Sigma values recalibrate the active neural detection layer in real-time.
        </p>
      </div>

      {/* Control modes */}
      <div className="p-4 lg:p-6 glass-card rounded-xl lg:rounded-2xl space-y-4">
        <label className="label-caps">System Overlays</label>
        <div className="space-y-3">
          <button
            onClick={() => dispatch(setCalibrationMode(!calibrationMode))}
            className={`w-full flex items-center justify-between px-4 py-4 lg:py-3 rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              calibrationMode
                ? 'bg-cyber-cyan/10 border-cyber-cyan/50 text-cyber-cyan'
                : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <RotateCwIcon size={14} className={calibrationMode ? 'animate-spin-slow' : ''} />
              Auto-Calibration
            </div>
            {calibrationMode && <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(56,189,248,1)]" />}
          </button>
          
          <button
            onClick={() => dispatch(setSignalNormalization(!signalNormalization))}
            className={`w-full flex items-center justify-between px-4 py-4 lg:py-3 rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              signalNormalization
                ? 'bg-cyber-purple/10 border-cyber-purple/50 text-cyber-purple'
                : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <ZapOffIcon size={14} />
              Normalization
            </div>
            {signalNormalization && <div className="w-1.5 h-1.5 rounded-full bg-cyber-purple shadow-[0_0_8px_rgba(129,140,248,1)]" />}
          </button>
        </div>
      </div>

      {/* Status section */}
      <div className="mt-auto pt-6 border-t border-white/5 hidden lg:block">
        <div className="flex items-start gap-4 mb-4 px-2">
          <div className="p-2 bg-cyber-cyan/10 rounded-xl border border-cyber-cyan/20">
            <ShieldCheck size={20} className="text-cyber-cyan" />
          </div>
          <div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Active Protection</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-slate-500 font-bold uppercase">Grid Status: Verified</p>
            </div>
          </div>
        </div>
        <button className="w-full cyber-button text-[10px] font-black uppercase tracking-widest h-12">
          View Audit logs
        </button>
      </div>
    </div>
  );
}
