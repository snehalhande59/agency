import React, { useState } from 'react';
import { ShieldAlert, Info, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { INTEGRATION_CONFIG } from '../../services/config/integrations.config';

export const SimulatedBanner = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-[#EFF7FC] border-b border-[#DCEEFF] text-[#153B5B] text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#19A89A] animate-pulse"></span>
          <span className="font-bold text-[#3898D8] uppercase tracking-wider text-[10px] bg-[#DCEEFF] px-2 py-0.5 rounded border border-[#3898D8]/30">
            Demo Simulation Mode
          </span>
          <span className="text-[#64748B] text-xs">
            Providers are <strong className="text-[#153B5B]">NOT_CONFIGURED</strong>. Transactions &amp; bookings are simulated with zero live financial charges.
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] font-bold text-[#3898D8] hover:text-[#287DB8] flex items-center gap-1 self-start sm:self-auto transition-colors"
        >
          <span>Provider Status Matrix</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-[#DCEEFF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-[11px]">
          {Object.entries(INTEGRATION_CONFIG).map(([key, config]) => (
            <div key={key} className="p-2.5 rounded-xl bg-white border border-[#E5EDF5] shadow-sm">
              <div className="font-bold text-[#153B5B] truncate">{config.name}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-[#64748B]">Status:</span>
                <span className="font-mono text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  {config.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
