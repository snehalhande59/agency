import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Phone, FileText, AlertCircle } from 'lucide-react';
import { useNcmcStore } from '../../store/useNcmcStore';

export const NcmcLostCardPage = () => {
  const { activeCard, reportLostCard, lostCardIncidents } = useNcmcStore();

  const [reason, setReason] = useState('Lost during commute / metro station');
  const [contactPhone, setContactPhone] = useState('9820288410');
  const [incidentResult, setIncidentResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = reportLostCard({ reason, contactPhone });
      setIsSubmitting(false);
      setIncidentResult(res);
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <Link
          to="/ncmc/dashboard"
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <span>Report Lost or Damaged NCMC Card</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Safely block contactless NFC turnstile access and protect remaining transit wallet balance
          </p>
        </div>
      </div>

      {/* Confirmation of Block */}
      {incidentResult && (
        <div className="p-6 rounded-3xl bg-rose-950/40 border border-rose-500/50 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Lock className="w-5 h-5 text-rose-400" />
              <span>Simulated Card Block Initiated</span>
            </div>
            <span className="text-xs font-mono text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
              {incidentResult.caseNumber}
            </span>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed">
            Card <strong className="font-mono text-white">{activeCard.maskedCardNumber}</strong> has been placed in simulated BLOCKED status. Stored transit funds are frozen from unauthorized gate taps.
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/ncmc/dashboard"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Return to Dashboard
            </Link>
            <Link
              to="/ncmc/register"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
            >
              Apply for Replacement Card
            </Link>
          </div>
        </div>
      )}

      {/* Form */}
      {!incidentResult && (
        <form onSubmit={handleSubmit} className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Card to be Blocked</span>
              <div className="text-sm font-bold text-white font-mono mt-0.5">{activeCard.maskedCardNumber}</div>
              <div className="text-[10px] text-slate-400">{activeCard.issuerBank} • Balance: ₹{activeCard.walletBalance.toFixed(2)}</div>
            </div>
            <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg">
              {activeCard.cardStatus}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Reason for Incident Report
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
            >
              <option value="Lost during commute / metro station">Lost during commute / metro station</option>
              <option value="Suspected theft / stolen wallet">Suspected theft / stolen wallet</option>
              <option value="Card chip damaged / unreadable at turnstile">Card chip damaged / unreadable at turnstile</option>
              <option value="Temporary misplacement">Temporary misplacement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Contact Phone (for SMS Case Tracking)
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
              placeholder="9820XXXXXX"
              className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 font-mono"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Notice on Replacement Balance Transfer:</strong> In production NCMC systems, once a lost card is blacklisted in the Central Clearing House (CCH), the remaining verified balance is credited to the newly issued replacement smart card within 3 business days.
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <Link
              to="/ncmc/dashboard"
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || activeCard.cardStatus === 'BLOCKED_SIMULATED'}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Blocking Card...' : 'Confirm Simulated Card Block'}</span>
            </button>
          </div>

        </form>
      )}

      {/* Incident History Ledger */}
      {lostCardIncidents.length > 0 && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Past Incident Reports</span>
          </h3>

          <div className="space-y-3">
            {lostCardIncidents.map((inc) => (
              <div key={inc.caseNumber} className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <div className="font-mono font-bold text-rose-300">{inc.caseNumber}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{inc.maskedNumber} • {inc.reason}</div>
                </div>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">
                  {inc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
