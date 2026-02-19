# Telemetry Monitoring System

A professional real-time telemetry monitoring system for experimental hardware systems. Built with Node.js/Express backend, React/TypeScript frontend, and WebSocket real-time streaming.

**🚀 Live Demo:** Coming soon after GitHub push!

## Overview

This is a production-grade internal monitoring dashboard designed for scientists and hardware engineers running high-frequency experimental systems. Stream and analyze telemetry data in real-time, with statistical anomaly detection and an intuitive dark-themed interface optimized for lab environments.

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
│   ├── server.js           # Express + WebSocket server
│   ├── package.json
│   ├── Procfile            # Railway deployment
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/     # React components (Dashboard, Charts, etc.)
│   │   ├── hooks/          # Custom hooks (WebSocket connection)
│   │   ├── store/          # Zustand state management
│   │   ├── utils/          # Anomaly detection, formatting
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── README.md
├── vercel.json             # Vercel deployment config
└── .gitignore
```

## Quick Start

### Local Development

**Prerequisites:** Node.js 18+

1. **Clone and install:**
   ```bash
   git clone <repo-url>
   cd telemetry-monitor
   npm install
   cd frontend && npm install && cd ..
   ```

2. **Start backend:**
   ```bash
   cd backend && node server.js
   ```
   Runs on `http://localhost:8080`

3. **Start frontend (new terminal):**
   ```bash
   cd frontend && npm run dev
   ```
   Runs on `http://localhost:3000`

## Deployment

### Frontend (Vercel - Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Vite configuration
5. Add environment variable:
   - `VITE_API_BASE_URL` = Your backend URL
6. Deploy!

### Backend (Railway - Free)

1. Go to [railway.app](https://railway.app) → New Project
2. Deploy from GitHub repository
3. Railway auto-detects Node.js
4. Set environment variables in Railway dashboard:
   - `PORT` = 8080
   - `NODE_ENV` = production
5. Copy the Railway URL and set it as `VITE_API_BASE_URL` in Vercel

## API Reference

### WebSocket: `ws://localhost:8080/api/telemetry`

Real-time telemetry stream (400ms updates)

**Message format:**
```json
{
  "timestamp": 1697894400000,
  "temperature": 45.2,
  "pressure": 1013.25,
  "vibration": 0.12,
  "humidity": 65.4,
  "anomalies": ["temperature"]
}
```

### REST Endpoints

- `GET /api/health` - Server health & status
- `GET /api/anomalies` - Anomaly log (latest)

## Architecture Details

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
