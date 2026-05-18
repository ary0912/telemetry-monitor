# Telemetry Monitor

A production-ready industrial telemetry observability platform built with a React + TypeScript frontend and a Node.js backend. Designed for high-frequency data streams, anomaly intelligence, and operator workflows in mission-critical engineering environments.


## Platform overview

Telemetry Monitor is built to support engineering operations with a production-quality observability shell, real-time charting, anomaly detection, incident history, operator notes, and snapshot capture.

## Key features

- Live streaming telemetry over WebSocket
- Real-time anomaly scoring and alert surfacing
- Operator notes panel with persistent storage
- Snapshot capture for investigation handoff
- Health score, latency, and throughput monitoring
- Adaptive experiment profiles with mission modes
- Command palette with `Cmd/Ctrl+K`
- Fully responsive industrial dashboard

## Tech stack

**Backend**
- Node.js + Express
- `ws` WebSocket server for live telemetry
- Simulated telemetry generator for prototype workloads

**Frontend**
- React 18 + TypeScript
- Vite bundler
- Redux Toolkit for state management
- Tailwind CSS for UI styling
- Recharts for interactive charts
- framer-motion for polished motion
- react-router-dom for navigation

## Project structure

```
telemetry-monitor/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── Procfile
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   ├── tsconfig.json
│   └── vite.config.ts
├── README.md
└── vercel.json
```

## Quick start

**Prerequisites:** Node.js 18+

```bash
cd /Users/aryanlodha/Desktop/2026 Projects/telemetry-monitor
npm install
cd frontend
npm install
```

Run backend:

```bash
cd backend
node server.js
```

Run frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000`

## Deployment

### Frontend
1. Push the repository to GitHub
2. Create a new Vercel project
3. Import the repo
4. Set `VITE_API_BASE_URL` to your backend URL, if required

### Backend
1. Deploy the `backend` folder to Railway, Heroku, or any Node host
2. Set `PORT` and `NODE_ENV=production`

## Architecture

The frontend is built around a shell layout with:
- `Shell.tsx` for navigation, status, and command palette
- `DashboardPage.tsx` for the mission control experience
- `CommandPalette.tsx` for instant operator actions
- `Telemetric` and anomaly state in Redux Toolkit
- `useTelemetrySync.ts` for live WebSocket ingestion

The backend emits simulated telemetry data to the front-end WebSocket connection.

## Data model

The platform tracks multiple industrial metrics, including:
- temperature
- voltage
- signalNoise
- laserStability
- controlSignalDrift
- errorRate
- signalIntegrity

## Notes

- Use `Cmd/Ctrl+K` to open the command palette.
- Operator notes are stored in the browser local storage.
- Snapshots capture a quick state summary useful for incident triage.
- Live stream health and stale-stream detection help maintain observability.

## Future improvements

- Add historical persistence and analytics storage
- Add webhooks and external alert channels
- Support authenticated user sessions
- Add metric filtering and saved dashboards

---

> Run frontend with `npm run dev` and backend with `node server.js`.

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
