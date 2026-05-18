import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

app.use(express.json());

// In-memory anomaly log
const anomalies = [];

// Telemetry state - tracks baseline and drift for realistic simulation
const telemetryState = {
  temperature: {
    baseline: 73.2,
    drift: 0,
    driftRate: 0.001,
    amplitude: 0.8,
    frequency: 0.48,
    noise: 0.28
  },
  voltage: {
    baseline: 5.0,
    drift: 0,
    driftRate: 0.0005,
    amplitude: 0.1,
    frequency: 0.28,
    noise: 0.018
  },
  signalNoise: {
    baseline: 0.15,
    drift: 0,
    driftRate: 0.00023,
    amplitude: 0.03,
    frequency: 0.22,
    noise: 0.008
  },
  laserStability: {
    baseline: 98.5,
    drift: 0,
    driftRate: 0.0003,
    amplitude: 0.45,
    frequency: 0.36,
    noise: 0.18
  },
  controlSignalDrift: {
    baseline: 0.08,
    drift: 0,
    driftRate: 0.00012,
    amplitude: 0.018,
    frequency: 0.52,
    noise: 0.004
  },
  errorRate: {
    baseline: 0.002,
    drift: 0,
    driftRate: 0.000012,
    amplitude: 0.0009,
    frequency: 0.14,
    noise: 0.00035
  },
  signalIntegrity: {
    baseline: 99.8,
    drift: 0,
    driftRate: 0.00011,
    amplitude: 0.16,
    frequency: 0.12,
    noise: 0.05
  },
  systemUptime: 0,
  telemetryChannels: 14
};

const EXPERIMENT_START = Date.now();
let messageCount = 0;
let lastTelemetry = null;

// Telemetry data generator using sine waves + drift + noise
// This feels more physical than pure randomness
function generateTelemetry() {
  const now = Date.now();
  const elapsedSeconds = (now - EXPERIMENT_START) / 1000;
  telemetryState.systemUptime = elapsedSeconds;

  // Apply drift to baselines
  for (const key in telemetryState) {
    const metric = telemetryState[key];
    if (metric && metric.driftRate !== undefined) {
      metric.drift += metric.driftRate * (Math.random() - 0.48);
      metric.drift = Math.max(-0.6, Math.min(0.6, metric.drift));
    }
  }

  const generateValue = (baseline, amplitude, frequency, drift, noise) => {
    const oscillation = amplitude * Math.sin((elapsedSeconds * frequency * Math.PI) / 10);
    const randomNoise = (Math.random() - 0.5) * 2 * noise;
    return baseline + drift + oscillation + randomNoise;
  };

  const temperature = parseFloat(
    generateValue(
      telemetryState.temperature.baseline,
      telemetryState.temperature.amplitude,
      telemetryState.temperature.frequency,
      telemetryState.temperature.drift,
      telemetryState.temperature.noise
    ).toFixed(2)
  );

  const voltage = parseFloat(
    generateValue(
      telemetryState.voltage.baseline,
      telemetryState.voltage.amplitude,
      telemetryState.voltage.frequency,
      telemetryState.voltage.drift,
      telemetryState.voltage.noise
    ).toFixed(3)
  );

  const signalNoise = parseFloat(
    generateValue(
      telemetryState.signalNoise.baseline,
      telemetryState.signalNoise.amplitude,
      telemetryState.signalNoise.frequency,
      telemetryState.signalNoise.drift,
      telemetryState.signalNoise.noise
    ).toFixed(4)
  );

  const laserStability = parseFloat(
    generateValue(
      telemetryState.laserStability.baseline,
      telemetryState.laserStability.amplitude,
      telemetryState.laserStability.frequency,
      telemetryState.laserStability.drift,
      telemetryState.laserStability.noise
    ).toFixed(2)
  );

  const controlSignalDrift = parseFloat(
    generateValue(
      telemetryState.controlSignalDrift.baseline,
      telemetryState.controlSignalDrift.amplitude,
      telemetryState.controlSignalDrift.frequency,
      telemetryState.controlSignalDrift.drift,
      telemetryState.controlSignalDrift.noise
    ).toFixed(4)
  );

  const errorRate = parseFloat(
    generateValue(
      telemetryState.errorRate.baseline,
      telemetryState.errorRate.amplitude,
      telemetryState.errorRate.frequency,
      telemetryState.errorRate.drift,
      telemetryState.errorRate.noise
    ).toFixed(5)
  );

  const signalIntegrity = parseFloat(
    Math.max(
      91.5,
      Math.min(
        99.99,
        telemetryState.signalIntegrity.baseline +
          Math.sin(elapsedSeconds * 0.1) * telemetryState.signalIntegrity.amplitude -
          Math.random() * telemetryState.signalIntegrity.noise -
          Math.abs(errorRate - telemetryState.errorRate.baseline) * 12
      )
    ).toFixed(2)
  );

  const signalLatency = parseFloat(
    (12 + Math.sin(elapsedSeconds * 0.4) * 3 + Math.random() * 1.2).toFixed(1)
  );

  const powerLoad = parseFloat(
    (62 + Math.cos(elapsedSeconds * 0.25) * 2.8 + Math.random() * 0.4).toFixed(1)
  );

  const powerEfficiency = parseFloat(
    (94 + Math.sin(elapsedSeconds * 0.14) * 1.2 - Math.random() * 0.3).toFixed(1)
  );

  const pipelineHealth = parseFloat(
    (97 + Math.cos(elapsedSeconds * 0.08) * 1.5 - Math.random() * 0.25).toFixed(1)
  );

  const phaseSeverity = signalIntegrity < 97.2 || errorRate > 0.0052 ? 2 : 1;
  const missionPhase =
    elapsedSeconds < 120
      ? 'Initialization'
      : phaseSeverity === 2
      ? 'Alert'
      : 'Nominal';

  const data = {
    timestamp: now,
    messageId: messageCount + 1,
    telemetryChannels: telemetryState.telemetryChannels,
    missionPhase,
    temperature,
    voltage,
    signalNoise,
    laserStability,
    controlSignalDrift,
    errorRate,
    signalIntegrity,
    systemUptime: elapsedSeconds,
    signalLatency,
    powerLoad,
    powerEfficiency,
    pipelineHealth,
    source: 'mission telemetry simulator'
  };

  return data;
}

// Broadcast telemetry to all connected clients
function broadcastTelemetry() {
  const data = generateTelemetry();
  lastTelemetry = data;
  messageCount++;

  const payload = JSON.stringify({
    type: 'telemetry',
    data,
    messageId: messageCount
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('[WS] Client connected');

  // Send current state on connect
  ws.send(
    JSON.stringify({
      type: 'status',
      message: 'Connected to telemetry server',
      uptime: (Date.now() - EXPERIMENT_START) / 1000
    })
  );

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.type === 'anomaly') {
        // Server-side anomaly detection confirmation
        anomalies.push({
          timestamp: new Date().toISOString(),
          metric: msg.metric,
          deviation: msg.deviation,
          value: msg.value
        });
      }
    } catch (e) {
      console.error('Failed to parse message:', e.message);
    }
  });

  ws.on('close', () => {
    console.log('[WS] Client disconnected');
  });

  ws.on('error', (err) => {
    console.error('[WS] Error:', err.message);
  });
});

// REST endpoints
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 2rem; color: #0f172a;">
      <h1>🔬 Telemetry Monitor API</h1>
      <p>Server is running healthy. WebSocket stream is available at <code>/ws</code>.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 1rem 0;" />
      <p>Status: <a href="/api/health" style="color: #00f2ff; font-weight: bold; text-decoration: none;">View Health Metrics</a></p>
    </div>
  `);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: (Date.now() - EXPERIMENT_START) / 1000,
    connectedClients: wss.clients.size,
    messagesSent: messageCount,
    telemetryChannels: telemetryState.telemetryChannels,
    currentPhase: lastTelemetry?.missionPhase ?? 'Unknown'
  });
});

app.get('/api/anomalies', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  res.json({
    anomalies: anomalies.slice(-limit),
    total: anomalies.length
  });
});

app.get('/api/anomalies/:id', (req, res) => {
  const anomaly = anomalies[parseInt(req.params.id)];
  if (!anomaly) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(anomaly);
});

app.get('/api/telemetry/latest', (req, res) => {
  if (!lastTelemetry) {
    return res.status(503).json({ error: 'Telemetry stream not ready' });
  }

  res.json({
    status: 'ok',
    telemetry: lastTelemetry,
    channels: telemetryState.telemetryChannels,
    missionPhase: lastTelemetry.missionPhase
  });
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`\n🔬 Telemetry Monitor Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`HTTP: http://localhost:${PORT}`);
  console.log(`WS:   ws://localhost:${PORT}/ws`);
  console.log(`Telemetry API: http://localhost:${PORT}/api/telemetry/latest`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

// Broadcast telemetry every 400ms (mimics realistic update rate)
setInterval(broadcastTelemetry, 400);
