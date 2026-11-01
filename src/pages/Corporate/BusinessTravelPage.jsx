import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plane, Globe2, ShieldCheck, ArrowRight } from 'lucide-react';

export const BusinessTravelPage = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/20">
        <span className="text-xs font-bold text-electric-400 uppercase tracking-widest">Executive Business Mobility</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2 mb-3">
          Corporate Business Travel Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Streamline business trips, client meetings, airport transit, and intercity corporate runs across Indian commercial hubs with consolidated corporate billing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-electric-600/20 text-electric-400 flex items-center justify-center">
            <Plane className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Airport Fast-Track Transfers</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatic flight tracking, meet-and-greet at Terminal 2 Multi-Level Car Parking, zero waiting anxiety, and seamless curbside drops.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Corporate Travel Desk Integration</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Connect our API directly into SAP Concur, Darwinbox, or your in-house HRMS to automate travel approvals, per diem limits, and claims.
          </p>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/corporate/pricing"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow transition-all"
        >
          <span>View Enterprise Rate Cards</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
