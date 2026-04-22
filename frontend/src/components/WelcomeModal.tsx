import React, { useState, useEffect } from 'react';
import { Shield, Zap, Activity, Info, X } from 'lucide-react';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcomeModal', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-[95%] max-w-lg glass-card rounded-2xl lg:rounded-3xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto">
        {/* Header/Banner */}
        <div className="h-32 lg:h-40 bg-gradient-to-br from-cyber-cyan/10 via-cyber-purple/5 to-transparent relative flex flex-col items-center justify-center border-b border-white/5 shrink-0">
          <div className="absolute inset-0 cyber-grid opacity-20" />
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative group overflow-hidden mb-3 lg:mb-4">
            <Zap className="text-cyber-cyan group-hover:scale-110 transition-transform duration-500 w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
          </div>
          <h2 className="label-caps glow-text !text-cyber-cyan !text-[10px] lg:!text-[12px]">PROTOCOL INITIALIZATION</h2>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-10 space-y-6 lg:space-y-8">
          <div className="space-y-3 lg:space-y-4">
            <h3 className="text-xl lg:text-2xl font-black text-white italic tracking-tight uppercase">Mission Briefing</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyber-cyan/5 border border-cyber-cyan/20">
                <p className="text-[10px] font-black text-cyber-cyan uppercase tracking-widest mb-1">The Problem</p>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  High-density neural lattices suffer from <span className="text-white font-bold">synthetic drift</span>—unpredictable signal fluctuations that compromises grid stability and data integrity.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-cyber-purple/5 border border-cyber-purple/20">
                <p className="text-[10px] font-black text-cyber-purple uppercase tracking-widest mb-1">The Solution</p>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  Aether Ops utilizes an <span className="text-white font-bold">adaptive Z-score engine</span> to monitor 8+ telemetry vectors in real-time, instantly isolating drift anomalies before they cascade.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:gap-4">
            <div className="flex items-start gap-4 p-4 lg:p-4 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="p-2 bg-cyber-cyan/10 rounded-lg shrink-0">
                <Activity size={18} className="text-cyber-cyan" />
              </div>
              <div>
                <p className="text-[10px] lg:text-xs font-black text-white uppercase tracking-wider mb-1">Live Grid Telemetry</p>
                <p className="text-[10px] lg:text-[11px] text-slate-500 font-medium">Full-spectrum visibility into the neural lattice with sub-10ms latency.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 lg:p-4 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="p-2 bg-cyber-purple/10 rounded-lg shrink-0">
                <Shield size={18} className="text-cyber-purple" />
              </div>
              <div>
                <p className="text-[10px] lg:text-xs font-black text-white uppercase tracking-wider mb-1">AI Mitigation</p>
                <p className="text-[10px] lg:text-[11px] text-slate-500 font-medium">Active neutralization of signal deviations beyond 2.0σ in real-time.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full cyber-button-primary h-12 lg:h-14 text-[10px] lg:text-xs tracking-[0.2em]"
          >
            INITIALIZE LINK
          </button>
          
          <p className="text-center text-[8px] lg:text-[10px] text-slate-600 font-bold uppercase tracking-widest">
            v1.0.0-CORE // SECURE CONNECTION VERIFIED
          </p>
        </div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 lg:top-6 right-4 lg:right-6 p-2 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
        </button>
      </div>
    </div>
  );
}
