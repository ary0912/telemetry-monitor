import React from 'react';
import { useAppSelector } from '../store';
import { ExperimentHeader } from './ExperimentHeader';
import { Sidebar } from './Sidebar';
import { TelemetryChart } from './TelemetryChart';
import { AnomalyFeed } from './AnomalyFeed';
import { SystemStats } from './SystemStats';
import { Footer } from './Footer';
import { WelcomeModal } from './WelcomeModal';
import { MissionIntelligence } from './MissionIntelligence';

export function Dashboard() {
  const { readings, anomalies } = useAppSelector((state) => state.telemetry);
  const [activeTab, setActiveTab] = React.useState<'chart' | 'anomalies' | 'stats' | 'mission'>('chart');

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-slate-100 flex flex-col cyber-grid selection:bg-cyan-500/30">
      <WelcomeModal />
      {/* Header */}
      <ExperimentHeader />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <button 
          onClick={() => setActiveTab('chart')}
          className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'chart' ? 'text-cyber-cyan border-b-2 border-cyber-cyan' : 'text-slate-500'}`}
        >
          Telemetry
        </button>
        <button 
          onClick={() => setActiveTab('anomalies')}
          className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'anomalies' ? 'text-cyber-cyan border-b-2 border-cyber-cyan' : 'text-slate-500'}`}
        >
          Anomalies
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'stats' ? 'text-cyber-cyan border-b-2 border-cyber-cyan' : 'text-slate-500'}`}
        >
          Metrics
        </button>
        <button 
          onClick={() => setActiveTab('mission')}
          className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'mission' ? 'text-cyber-cyan border-b-2 border-cyber-cyan' : 'text-slate-500'}`}
        >
          Mission
        </button>
      </div>

      {/* Main layout */}
      <main className="flex flex-col lg:flex-row flex-1 overflow-x-hidden overflow-y-auto lg:overflow-hidden p-4 lg:p-8 gap-6 lg:gap-8 min-h-0">
        
        {/* Sidebar - Hidden on mobile, visible in Metrics tab or on Desktop */}
        <aside className={`${activeTab === 'stats' ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 flex-shrink-0 flex-col pb-4 lg:pb-0`}>
          <Sidebar />
        </aside>

        {/* Central chart area */}
        <section className={`${activeTab === 'chart' ? 'flex' : 'hidden'} lg:flex flex-1 flex-col min-w-0 min-h-[500px] lg:min-h-0`}>
          <div className="flex-1 glass-card rounded-2xl animate-scan flex flex-col">
            <TelemetryChart readings={readings} />
          </div>
        </section>

        {/* Mission Intelligence - Mobile Only Tab or Desktop persistent panel */}
        <section className={`${activeTab === 'mission' ? 'flex' : 'hidden'} lg:hidden flex-1 flex-col p-2`}>
          <MissionIntelligence />
        </section>

        {/* Right panel: anomalies + stats */}
        <aside className={`${activeTab === 'anomalies' ? 'flex' : 'hidden'} lg:flex w-full lg:w-[400px] flex-shrink-0 flex-col gap-6 lg:gap-8 pb-4 lg:pb-0`}>
          <div className="flex-1 glass-card rounded-2xl flex flex-col min-h-[400px] lg:min-h-0 overflow-hidden shrink-0">
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <h3 className="label-caps glow-text flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                Anomaly Detection
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <AnomalyFeed anomalies={anomalies} />
            </div>
          </div>
          
          <div className="hidden lg:flex flex-shrink-0">
            <MissionIntelligence />
          </div>

          <div className={`${activeTab === 'stats' ? 'flex' : 'hidden'} lg:flex h-[300px] glass-card overflow-hidden rounded-2xl flex flex-col`}>
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <h3 className="label-caps glow-text flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-pulse" />
                System Metrics
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SystemStats readings={readings} />
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
