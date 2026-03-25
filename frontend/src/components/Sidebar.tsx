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
    <div className="flex flex-col overflow-y-auto h-full space-y-2">
      {/* Stream control */}
      <div className="p-2">
        <button
          onClick={() => dispatch(setIsPaused(!isPaused))}
          className="w-full cyber-button flex items-center justify-center gap-3 py-4 text-sm uppercase font-black tracking-widest group"
        >
          {isPaused ? (
            <>
              <PlayIcon size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              Resume Core
            </>
          ) : (
            <>
              <PauseIcon size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              Suspend Scan
            </>
          )}
        </button>
      </div>

      {/* Experiment selector */}
      <div className="px-2">
        <div className="p-4 glass-card rounded-xl">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">
            Target Workspace
          </label>
          <div className="flex items-center justify-between px-3 py-3 bg-white/5 border border-white/5 rounded-lg text-xs text-white font-bold cursor-pointer hover:border-cyber-cyan/30 transition-all group">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-cyber-cyan" />
              <span>PRODUCTION_GRID_X</span>
            </div>
            <ChevronDownIcon size={14} className="text-slate-500 group-hover:text-cyber-cyan" />
          </div>
        </div>
      </div>

      {/* Anomaly sensitivity */}
      <div className="px-2">
        <div className="p-4 glass-card rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              AI Threshold
            </label>
            <span className="font-mono text-xs font-bold text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/20">
              {anomalySensitivity.toFixed(1)}σ
            </span>
          </div>
          <input
            type="range"
            min="1.5"
            max="3.0"
            step="0.1"
            value={anomalySensitivity}
            onChange={(e) => dispatch(setAnomalySensitivity(parseFloat(e.target.value)))}
            className="w-full accent-cyber-cyan cursor-pointer"
          />
          <p className="text-[10px] text-slate-500 mt-3 font-medium leading-relaxed">
            Adjusting sigma values recalibrates the Active AI detection layer.
          </p>
        </div>
      </div>

      {/* Control modes */}
      <div className="px-2">
        <div className="p-4 glass-card rounded-xl space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 block">
            System Overlays
          </label>
          <button
            onClick={() => dispatch(setCalibrationMode(!calibrationMode))}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              calibrationMode
                ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <RotateCwIcon size={12} className={calibrationMode ? 'animate-spin-slow' : ''} />
              Auto-Calibration
            </div>
            {calibrationMode && <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />}
          </button>
          <button
            onClick={() => dispatch(setSignalNormalization(!signalNormalization))}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              signalNormalization
                ? 'bg-cyber-purple/20 border-cyber-purple text-cyber-purple shadow-[0_0_15px_rgba(157,0,255,0.2)]'
                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <ZapOffIcon size={12} />
              Normalization
            </div>
            {signalNormalization && <div className="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-pulse" />}
          </button>
        </div>
      </div>

      {/* Status section */}
      <div className="px-2 mt-auto pb-4">
        <div className="p-4 glass-card rounded-xl border-t-2 border-t-cyber-cyan/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyber-cyan/10 rounded-lg">
              <ShieldCheck size={18} className="text-cyber-cyan" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Active Protection</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Grid Status: Verified</p>
            </div>
          </div>
          <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
            Audit logs
          </button>
        </div>
      </div>
    </div>
  );
}
