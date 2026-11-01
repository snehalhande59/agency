import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const EmployeeTransportPage = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/20">
        <span className="text-xs font-bold text-electric-400 uppercase tracking-widest">Enterprise Commute Architecture</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2 mb-3">
          Employee Transportation Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Scale corporate transport operations effortlessly. We handle end-to-end routing, shift scheduling, safe late-night drops for women employees, and compliance adherence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-electric-600/20 text-electric-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Shift Wise Automation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Support for 24/7 rotational shifts, US/UK timezone alignment, and automated pickup schedule notifications to employee smartphones.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Safety Charter & SOS</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Police verification, GPS panic triggers, digital OTP check-in, and female security escort marshals for pickups/drops between 8 PM and 6 AM.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Dynamic AI Cluster Routing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Smart algorithms cluster employees living nearby into optimal 4-seater and 6-seater routes, reducing travel time by up to 28%.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Ready to benchmark employee transport costs?</h3>
          <p className="text-xs text-slate-400">Share your employee pin codes and receive an optimized route simulation.</p>
        </div>
        <Link
          to="/corporate/demo"
          className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition-all whitespace-nowrap"
        >
          Request Route Audit
        </Link>
      </div>
    </div>
  );
};
