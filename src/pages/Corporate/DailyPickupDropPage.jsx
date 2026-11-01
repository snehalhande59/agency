import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, CheckCircle2, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export const DailyPickupDropPage = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/20">
        <span className="text-xs font-bold text-electric-400 uppercase tracking-widest">Punctual & Safe Daily Shuttles</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-2 mb-3">
          Daily Pickup & Drop Operations
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Ensure your workforce reaches their desks refreshed and on time. We manage fixed point-to-point office shuttles and home-to-office door pickup grids across Mumbai, Navi Mumbai, Thane, and Pune.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-electric-400" />
            <span>Nodal Hub Shuttles</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            High-frequency mini buses connecting key suburban railway stations (Thane, Kalyan, Vashi, Borivali, Pune Station) directly to tech parks (Mindspace, BKC, Hinjawadi Phase 1, 2, 3, Magarpatta).
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Departures every 15-20 minutes during rush hours</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>QR code pass verification at boarding</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dedicated bus marshals ensuring seat availability</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Doorstep Cab Carpools</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            4-passenger and 6-passenger air-conditioned cabs that pick up employees directly from their residential societies and drop them back safely after evening shifts.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SMS alerts 10 minutes prior to cab arrival</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Guaranteed female employee safe drop escort</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero cancellation driver reliability policy</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/corporate/demo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow transition-all"
        >
          <span>Schedule Corporate Fleet Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
