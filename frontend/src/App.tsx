import React from 'react';
import { Dashboard } from './components/Dashboard';
import { useTelemetryConnection } from './hooks/useTelemetryConnection';

function App() {
  // Initialize WebSocket connection and anomaly detection
  useTelemetryConnection();

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Dashboard />
    </div>
  );
}

export default App;
