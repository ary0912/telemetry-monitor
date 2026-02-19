import React, { useEffect, useState } from 'react';
import { useTelemetryStore } from '../store/telemetry';

export function Footer() {
  const wsLatency = useTelemetryStore((s) => s.wsLatency);
  const messageCount = useTelemetryStore((s) => s.messageCount);
  const readings = useTelemetryStore((s) => s.readings);
  const connected = useTelemetryStore((s) => s.connected);
  const [streamingFreq, setStreamingFreq] = useState('0.0 Hz');

  useEffect(() => {
    if (readings.length < 2) return;

    // Calculate streaming frequency based on last few readings
    const recentReadings = readings.slice(-10);
    if (recentReadings.length < 2) return;

    const timeSpanMs =
      recentReadings[recentReadings.length - 1].timestamp - recentReadings[0].timestamp;
    if (timeSpanMs === 0) return;

    const freq = (recentReadings.length / timeSpanMs) * 1000;
    setStreamingFreq(`${freq.toFixed(1)} Hz`);
  }, [readings]);

  return (
    <div className="border-t border-slate-800 bg-slate-900 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-500' : 'bg-slate-600'}`} />
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>

        <div className="font-mono">
          Latency: <span className="text-slate-300">{wsLatency.toFixed(0)}ms</span>
        </div>

        <div className="font-mono">
          Frequency: <span className="text-slate-300">{streamingFreq}</span>
        </div>
      </div>

      <div className="font-mono text-slate-500">
        Messages: <span className="text-slate-300">{messageCount}</span>
      </div>
    </div>
  );
}
