import React, { useEffect, useState } from 'react';
import { useTelemetryStore } from '../store/telemetry';
import { Wifi, Clock, Signal } from 'lucide-react';

export function Footer() {
  const wsLatency = useTelemetryStore((s) => s.wsLatency);
  const messageCount = useTelemetryStore((s) => s.messageCount);
  const readings = useTelemetryStore((s) => s.readings);
  const connected = useTelemetryStore((s) => s.connected);
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
    <div className="border-t border-lab-800 bg-lab-900 px-6 py-3 flex items-center justify-between text-xs text-slate-400 font-medium">
      <div className="flex items-center gap-8">
        {/* Connection */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700">
          <Wifi size={14} className={connected ? 'text-emerald-400' : 'text-slate-600'} />
          <span className={connected ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
            {connected ? 'Connected' : 'Offline'}
          </span>
        </div>

        {/* Latency */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700">
          <Clock size={14} className="text-cyan-400" />
          <span className="text-slate-300 font-mono font-semibold">{wsLatency.toFixed(0)}ms</span>
        </div>

        {/* Frequency */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700">
          <Signal size={14} className="text-purple-400" />
          <span className="text-slate-300 font-mono font-semibold">{streamingFreq}</span>
        </div>
      </div>

      {/* Right side stats */}
      <div className="flex items-center gap-6 px-3 py-2 rounded-lg bg-lab-800 border border-lab-700">
        <div className="text-center">
          <p className="text-slate-500 text-xs">Total samples</p>
          <p className="font-mono text-slate-300 font-bold">{messageCount.toLocaleString()}</p>
        </div>
        <div className="w-px h-6 bg-lab-700" />
        <div className="text-center">
          <p className="text-slate-500 text-xs">Data points</p>
          <p className="font-mono text-slate-300 font-bold">{readings.length.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
