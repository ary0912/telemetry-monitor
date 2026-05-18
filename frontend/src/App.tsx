import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoadingScreen } from './shared/ui/LoadingScreen';
import { Shell } from './layouts/Shell';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Shell><DashboardPage /></Shell>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
