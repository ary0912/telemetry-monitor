# Telemetry Monitor

A production-grade real-time telemetry monitoring system for experimental hardware. Built for engineers, by engineers. No fluff.

## Overview

This is an internal monitoring dashboard used to stream and analyze high-frequency telemetry data from experimental systems. The system detects anomalies in real time using statistical deviation analysis and provides an intuitive interface for engineers to monitor system health.

## Features

- **Live multi-metric streaming** via WebSocket (7 concurrent metrics)
- **Statistical anomaly detection** using rolling z-score analysis
- **Dark-themed dashboard** optimized for lab environments
- **Configurable sensitivity thresholds** for anomaly detection
- **Pause/resume streaming** without losing data
- **Export anomaly logs** as CSV
- **Rolling 10-minute chart window** with zoom capability
- **System health indicators** (latency, throughput, signal integrity)
- **Realistic data simulation** using sine waves + drift + noise

## Tech Stack

**Backend:**
- Node.js + Express
- WebSocket server for real-time streaming
- Simulated telemetry with realistic physical behavior

**Frontend:**
- React 18 + TypeScript
- Vite (dev server + bundler)
- Zustand (state management)
- Recharts (time-series visualization)
- Tailwind CSS (minimal styling)
- Lucide React (icons)

## Project Structure

```
telemetry-monitor/
├── backend/
│   ├── server.js          # Express + WebSocket server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # UI components (Dashboard, Chart, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # WebSocket service
│   │   ├── store/         # Zustand state management
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Anomaly detection, formatting
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css      # Tailwind + custom styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Backend setup:**
```bash
cd backend
npm install
```

2. **Frontend setup:**
```bash
cd frontend
npm install
```

### Running Locally

1. **Start the backend server:**
```bash
cd backend
npm start
# Server runs on http://localhost:8080
# WebSocket available at ws://localhost:8080/ws
```

2. **In a new terminal, start the frontend dev server:**
```bash
cd frontend
npm run dev
# Opens http://localhost:3000 automatically
```

The dashboard will load and immediately begin streaming telemetry data from the backend.

## API Endpoints

### WebSocket: `ws://localhost:8080/ws`

**Incoming messages:**
- `type: "telemetry"` - Real-time telemetry reading with all 7 metrics
- `type: "status"` - Connection status and server info

**Outgoing messages:**
- `type: "anomaly"` - Client sends detected anomaly to server

### REST Endpoints

- `GET /api/health` - Server health status
- `GET /api/anomalies` - Get anomaly log (query: `limit` - default 100)
- `GET /api/anomalies/:id` - Get specific anomaly by index

## Telemetry Metrics

The system monitors:

| Metric | Unit | Normal Range | Purpose |
|--------|------|--------------|---------|
| Temperature | °C | 70–76 | Thermal control feedback |
| Voltage | V | 4.8–5.2 | Power supply stability |
| Signal Noise | μV | 0.1–0.2 | Signal quality indicator |
| Laser Stability | % | 97.5–99.5 | Laser output consistency |
| Control Signal Drift | rad | 0.05–0.11 | System control precision |
| Error Rate | % | 0–0.5 | Data integrity check |
| Signal Integrity | % | 99.6–100.0 | Overall system health |

## Anomaly Detection

Anomalies are detected using a rolling z-score calculation over the last 50 readings:

```
z = (value - rolling_mean) / rolling_stddev
```

An anomaly is flagged when |z| exceeds the configured threshold (default: 2.0σ).

The threshold can be adjusted in the UI sidebar (1.5σ to 3.0σ range).

## Control Features

- **Pause Stream** - Temporarily halt data ingestion
- **Calibration Mode** - Special experimental configuration
- **Signal Normalization** - Apply baseline correction
- **Anomaly Sensitivity** - Adjust detection threshold (1.5–3.0σ)
- **Export Anomalies** - Download event log as CSV

## Performance Considerations

- Chart data is limited to 1500 readings (~10 minutes at 400ms intervals)
- WebSocket data arrives every 400ms
- Anomaly detection runs on each new reading
- Memoization prevents unnecessary re-renders
- UI updates are batched for efficiency

## Development Notes

### Adding a New Metric

1. Add to `TelemetryReading` type in `src/types/index.ts`
2. Add to `METRIC_CONFIGS` in `src/utils/constants.ts`
3. Add generation logic in `backend/server.js`
4. Add line to chart in `src/components/TelemetryChart.tsx`
5. Add to anomaly detection in `src/hooks/useTelemetryConnection.ts`

### Architecture Decisions

- **Zustand over Redux**: Lighter state management for this domain
- **Rolling z-score over moving average**: Better captures sudden deviations
- **Sine waves in simulation**: More physical than pure randomness
- **WebSocket over HTTP polling**: Real-time low-latency updates
- **Tailwind + custom CSS**: Minimal but intentional styling

## Troubleshooting

**Dashboard doesn't connect:**
- Check backend is running on port 8080
- Verify WebSocket URL in `frontend/src/services/websocket.ts`
- Check browser console for errors

**No data appearing:**
- Confirm backend is sending telemetry (check server logs)
- Verify network tab shows WebSocket messages

**High CPU usage:**
- Reduce chart window size in `src/utils/constants.ts`
- Check for memory leaks in browser DevTools

## Future Enhancements

- Exportable configuration profiles
- Multi-experiment comparison
- Alert webhooks to external systems
- Historical data persistence
- Advanced filtering and search

## License

Internal use only.
