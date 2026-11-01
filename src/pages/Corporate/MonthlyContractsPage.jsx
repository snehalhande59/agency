import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, Shield, ArrowRight, Award } from 'lucide-react';

export const MonthlyContractsPage = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/20">
        <span className="text-xs font-bold text-electric-400 uppercase tracking-widest">Fixed Retainer Leases</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2 mb-3">
          Monthly Corporate Cab Contracts
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Provide your Managing Directors, CXOs, and VIP clients with dedicated vehicles and uniformed executive chauffeurs on flexible 3-month, 6-month, or annual retainer contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-xs font-bold uppercase text-electric-400">Executive Sedan Retainer</div>
          <h3 className="text-xl font-bold text-white font-display">Maruti Dzire / Honda City</h3>
          <div className="text-2xl font-extrabold text-white font-display">₹42,000 <span className="text-xs text-slate-400 font-normal">/ Month</span></div>
          <p className="text-xs text-slate-400">2,000 km / 26 days per month running allowance with dedicated uniformed chauffeur.</p>
          <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Chauffeur in Uniform</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full Maintenance & Fuel Included</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Immediate Standby Replacement</li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-electric-500/40 shadow-glow space-y-4">
          <div className="text-xs font-bold uppercase text-electric-300">CXO & Leadership Flagship</div>
          <h3 className="text-xl font-bold text-white font-display">Toyota Innova Crysta / Hycross</h3>
          <div className="text-2xl font-extrabold text-electric-400 font-display">₹68,000 <span className="text-xs text-slate-400 font-normal">/ Month</span></div>
          <p className="text-xs text-slate-400">2,500 km / 26 days running with premium captain chairs and intercity clearance.</p>
          <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Senior Vetted English Chauffeur</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Expressway Fastag Automated</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Executive Amenity Kit & Wi-Fi</li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-xs font-bold uppercase text-amber-400">VIP Board & Founder Fleet</div>
          <h3 className="text-xl font-bold text-white font-display">Mercedes-Benz E-Class / BMW 5</h3>
          <div className="text-2xl font-extrabold text-white font-display">₹1,45,000 <span className="text-xs text-slate-400 font-normal">/ Month</span></div>
          <p className="text-xs text-slate-400">Prestige luxury sedan for visiting global executives, board members, and dignitaries.</p>
          <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> White-Glove Protocol Chauffeur</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Priority 24/7 Concierge Hotline</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Tax Deductible Lease</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/corporate/demo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow transition-all"
        >
          <span>Request Custom Retainer Contract</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
