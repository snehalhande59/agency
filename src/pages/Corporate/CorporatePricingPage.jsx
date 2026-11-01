import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

export const CorporatePricingPage = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/20">
        <span className="text-xs font-bold text-electric-400 uppercase tracking-widest">Transparent Enterprise Billing</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2 mb-3">
          Corporate Mobility Pricing Plans
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Customized rate cards tailored to your team size, trip volumes, and vehicle preferences. Single monthly GST invoice with 30-day corporate credit terms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-xs font-bold uppercase text-slate-400">Growth Stage</div>
          <h3 className="text-lg font-bold text-white">Starter Fleet</h3>
          <div className="text-2xl font-black text-white font-display">₹1,800 <span className="text-xs font-normal text-slate-400">/ Day per cab</span></div>
          <p className="text-xs text-slate-400">For companies with 15-50 commuting employees or ad-hoc sales visits.</p>
          <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> On-demand cab dispatch</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Weekly itemized billing</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Web dashboard access</li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-electric-500 shadow-glow space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-electric-600 text-white inline-block">Popular Enterprise</span>
          <h3 className="text-lg font-bold text-white">Scale Enterprise</h3>
          <div className="text-2xl font-black text-electric-400 font-display">Custom Volume Discount</div>
          <p className="text-xs text-slate-400">For mid-size enterprises & IT parks with 50-500 daily commuters.</p>
          <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dedicated 4-seater & 6-seater fleet</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dynamic AI routing & OTP check-in</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Key Account Manager</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 30-Day Corporate Credit Term</li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-xs font-bold uppercase text-amber-400">Multinational Campus</div>
          <h3 className="text-lg font-bold text-white">Campus Turnkey</h3>
          <div className="text-2xl font-black text-white font-display">Full SLA Outsourcing</div>
          <p className="text-xs text-slate-400">Complete fleet management for 500+ employees across multi-site campuses.</p>
          <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Buses, minibuses & cabs mix</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> On-premise transport control room</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ERP & HRMS native API integration</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/corporate/demo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow transition-all"
        >
          <span>Request Customized Enterprise Quote</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
