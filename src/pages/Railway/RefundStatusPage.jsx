import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  DollarSign, 
  ArrowLeft 
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { DEMO_BANNER_TEXT } from '../../services/railway/railwayService';

export const RefundStatusPage = () => {
  const { cancellations } = useRailwayStore();
  const [searchRef, setSearchRef] = useState('');

  const displayList = cancellations.filter(
    (c) =>
      !searchRef.trim() ||
      c.refundRef.toLowerCase().includes(searchRef.toLowerCase()) ||
      c.demoBookingRef.toLowerCase().includes(searchRef.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Demo Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
        <span className="font-bold uppercase tracking-wider font-mono">{DEMO_BANNER_TEXT}</span>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/20 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-emerald-400">
              <RefreshCw className="w-5 h-5" />
              <h2 className="text-xl font-bold text-white font-display">Railway Cancellation & Refund Tracker</h2>
            </div>
            <p className="text-xs text-slate-400">
              Track real-time status of simulated refunds processed back to source payment methods.
            </p>
          </div>

          <Link
            to="/railway/cancel"
            className="px-4 py-2 rounded-xl bg-navy-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all self-start sm:self-auto"
          >
            Cancel Another Ticket
          </Link>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder="Search by Refund Reference or Demo Booking Ref..."
            className="w-full bg-navy-950 border border-slate-700 rounded-2xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500 font-mono"
          />
        </div>

        {/* Refunds List */}
        {displayList.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-navy-950/60 border border-slate-800 space-y-2">
            <Clock className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Cancellation / Refund Records Found</h3>
            <p className="text-xs text-slate-400">
              {cancellations.length === 0
                ? 'You have not cancelled any demo tickets yet.'
                : 'No refund matching your search reference.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayList.map((c) => (
              <div
                key={c.refundRef}
                className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Refund Reference ID</span>
                    <div className="font-mono font-bold text-emerald-400 text-sm">{c.refundRef}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{c.refundStatus}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Booking Ref</span>
                    <strong className="text-white font-mono">{c.demoBookingRef}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Train Info</span>
                    <strong className="text-slate-200">#{c.trainNumber} {c.trainName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Deduction</span>
                    <strong className="text-rose-400 font-mono">-₹{c.cancellationCharge}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Net Refund Amount</span>
                    <strong className="text-emerald-300 text-sm font-extrabold font-display">₹{c.refundAmount.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Reason: {c.reason}</span>
                  <span className="font-mono">Credited: {c.estimatedCreditTime}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
