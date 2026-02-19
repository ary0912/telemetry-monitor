import React from 'react';
import { useTelemetryStore } from '../store/telemetry';
import {
  PauseIcon,
  PlayIcon,
  ChevronDownIcon,
  SettingsIcon,
  ZapOffIcon,
  RotateCwIcon
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
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
      {/* Stream control */}
      <div className="p-4 border-b border-slate-800">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm font-medium text-slate-100 transition-colors"
        >
          {isPaused ? (
            <>
              <PlayIcon size={16} />
              Resume stream
            </>
          ) : (
            <>
              <PauseIcon size={16} />
              Pause stream
            </>
          )}
        </button>
      </div>

      {/* Experiment selector */}
      <div className="p-4 border-b border-slate-800">
        <label className="text-xs font-semibold text-slate-400 uppercase">Experiment</label>
        <div className="mt-2 flex items-center justify-between px-3 py-2 bg-slate-800 rounded text-sm text-slate-100 cursor-pointer hover:bg-slate-700">
          <span>EXP-2026-0219</span>
          <ChevronDownIcon size={16} />
        </div>
      </div>

      {/* System status */}
      <div className="p-4 border-b border-slate-800">
        <label className="text-xs font-semibold text-slate-400 uppercase">System status</label>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Connection</span>
            <div
              className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500' : 'bg-slate-500'}`}
            />
          </div>
          <div className="text-xs text-slate-500">
            {connected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
      </div>

      {/* Anomaly sensitivity */}
      <div className="p-4 border-b border-slate-800">
        <label className="text-xs font-semibold text-slate-400 uppercase">Anomaly threshold</label>
        <div className="mt-3 space-y-2">
          <input
            type="range"
            min="1.5"
            max="3.0"
            step="0.1"
            value={anomalySensitivity}
            onChange={(e) => setAnomalySensitivity(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
                ((anomalySensitivity - 1.5) / 1.5) * 100
              }%, #334155 ${((anomalySensitivity - 1.5) / 1.5) * 100}%, #334155 100%)`
            }}
          />
          <div className="text-xs text-slate-400">
            {anomalySensitivity.toFixed(1)}σ deviation
          </div>
        </div>
      </div>

      {/* Control modes */}
      <div className="p-4 border-b border-slate-800">
        <label className="text-xs font-semibold text-slate-400 uppercase mb-3 block">
          Control modes
        </label>
        <div className="space-y-2">
          <button
            onClick={() => setCalibrationMode(!calibrationMode)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
              calibrationMode
                ? 'bg-slate-700 text-slate-100'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <RotateCwIcon size={14} />
            Calibration mode
          </button>
          <button
            onClick={() => setSignalNormalization(!signalNormalization)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
              signalNormalization
                ? 'bg-slate-700 text-slate-100'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <ZapOffIcon size={14} />
            Signal normalization
          </button>
        </div>
      </div>

      {/* Settings placeholder */}
      <div className="p-4 border-b border-slate-800">
        <button className="w-full flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm text-slate-400 transition-colors">
          <SettingsIcon size={16} />
          Advanced settings
        </button>
      </div>
    </div>
  );
}
