import React from 'react';
import { useTelemetryStore } from '../store/telemetry';
import {
  PauseIcon,
  PlayIcon,
  ChevronDownIcon,
  SettingsIcon,
  ZapOffIcon,
  RotateCwIcon,
  Wifi
} from 'lucide-react';

export function Sidebar() {
  const isPaused = useTelemetryStore((s) => s.isPaused);
  const setIsPaused = useTelemetryStore((s) => s.setIsPaused);
  const anomalySensitivity = useTelemetryStore((s) => s.anomalySensitivity);
  const setAnomalySensitivity = useTelemetryStore((s) => s.setAnomalySensitivity);
  const calibrationMode = useTelemetryStore((s) => s.calibrationMode);
  const setCalibrationMode = useTelemetryStore((s) => s.setCalibrationMode);
  const signalNormalization = useTelemetryStore((s) => s.signalNormalizationActive);
  const setSignalNormalization = useTelemetryStore((s) => s.setSignalNormalization);
  const connected = useTelemetryStore((s) => s.connected);

  return (
    <div className="card flex flex-col overflow-y-auto h-full">
      {/* Stream control */}
      <div className="p-4 border-b border-lab-800">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-full btn-primary text-sm"
        >
          {isPaused ? (
            <>
              <PlayIcon size={16} />
              Resume
            </>
          ) : (
            <>
              <PauseIcon size={16} />
              Pause
            </>
          )}
        </button>
      </div>

      {/* Experiment selector */}
      <div className="p-4 border-b border-lab-800">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Active experiment
        </label>
        <div className="mt-2 flex items-center justify-between px-3 py-2.5 bg-lab-800 hover:bg-lab-700 rounded-lg text-sm text-slate-100 cursor-pointer transition-all duration-200 border border-lab-700 hover:border-lab-600">
          <span className="font-semibold">EXP-2026-0219</span>
          <ChevronDownIcon size={16} />
        </div>
      </div>

      {/* System status */}
      <div className="p-4 border-b border-lab-800">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Connection
        </label>
        <div className="mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg bg-lab-800 border border-lab-700">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              connected ? 'bg-gradient-accent animate-pulse-subtle' : 'bg-slate-600'
            }`}
          />
          <div>
            <p className="text-xs font-semibold text-slate-300">
              {connected ? 'Connected' : 'Offline'}
            </p>
            <p className="text-xs text-slate-500">
              {connected ? 'Data streaming' : 'Waiting...'}
            </p>
          </div>
        </div>
      </div>

      {/* Anomaly sensitivity */}
      <div className="p-4 border-b border-lab-800">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Sensitivity
          </label>
          <span className="text-xs font-mono bg-lab-800 text-cyan-400 px-2 py-1 rounded">
            {anomalySensitivity.toFixed(1)}σ
          </span>
        </div>
        <input
          type="range"
          min="1.5"
          max="3.0"
          step="0.1"
          value={anomalySensitivity}
          onChange={(e) => setAnomalySensitivity(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-slate-500 mt-2">Adjusts detection threshold</p>
      </div>

      {/* Control modes */}
      <div className="p-4 border-b border-lab-800">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 block">
          Modes
        </label>
        <div className="space-y-2">
          <button
            onClick={() => setCalibrationMode(!calibrationMode)}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
              calibrationMode
                ? 'bg-lab-700 border-lab-600 text-white shadow-glow'
                : 'bg-lab-800 border-lab-700 text-slate-300 hover:bg-lab-700'
            }`}
          >
            <RotateCwIcon size={14} />
            Calibration
          </button>
          <button
            onClick={() => setSignalNormalization(!signalNormalization)}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
              signalNormalization
                ? 'bg-lab-700 border-lab-600 text-white shadow-glow'
                : 'bg-lab-800 border-lab-700 text-slate-300 hover:bg-lab-700'
            }`}
          >
            <ZapOffIcon size={14} />
            Normalization
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-b border-lab-800">
        <button className="w-full btn-secondary text-sm">
          <SettingsIcon size={16} />
          Settings
        </button>
      </div>

      {/* Info section */}
      <div className="p-4 mt-auto">
        <div className="bg-lab-800 rounded-lg p-3 border border-lab-700">
          <p className="text-xs font-semibold text-slate-300 mb-2">Tip</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Adjust sensitivity to tune detection. Higher values = fewer alerts.
          </p>
        </div>
      </div>
    </div>
  );
}
