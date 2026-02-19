import { jsx as _jsx } from "react/jsx-runtime";
import { Dashboard } from './components/Dashboard';
import { useTelemetryConnection } from './hooks/useTelemetryConnection';
function App() {
    // Initialize WebSocket connection and anomaly detection
    useTelemetryConnection();
    return (_jsx("div", { className: "h-screen w-screen overflow-hidden", children: _jsx(Dashboard, {}) }));
}
export default App;
