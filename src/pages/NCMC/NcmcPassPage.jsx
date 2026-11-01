import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowLeft, CheckCircle2, Calendar, QrCode, Sparkles, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { useNcmcStore } from '../../store/useNcmcStore';
import { NCMC_PASS_PLANS } from '../../services/ncmc/ncmcService';

export const NcmcPassPage = () => {
  const { activePass, purchaseTransitPass, activeCard } = useNcmcStore();
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const handleActivate = (plan) => {
    purchaseTransitPass(plan);
    setPurchaseSuccess(true);
    setTimeout(() => setPurchaseSuccess(false), 3500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/ncmc/dashboard"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
              <Ticket className="w-6 h-6 text-cyan-400" />
              <span>Unlimited Transit Passes</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily, weekly, and monthly automated turnstile passes for Mumbai Metro &amp; BEST electric buses
            </p>
          </div>
        </div>

        <Link
          to="/ncmc/dashboard"
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 self-start sm:self-auto"
        >
          View Dashboard
        </Link>
      </div>

      {purchaseSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Demo Transit Pass activated successfully! Attached to card {activeCard.maskedCardNumber}.</span>
        </div>
      )}

      {/* Active Pass Banner (if active) */}
      {activePass && (
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-cyan-950/40 to-navy-900 border border-cyan-500/40 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  Currently Active Pass
                </span>
                <span className="text-xs font-mono text-cyan-300">{activePass.passId}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                {activePass.title}
              </h3>
              <p className="text-xs text-slate-300">{activePass.network}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Valid From: <strong className="text-white font-mono">{activePass.validFrom}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Valid Until: <strong className="text-white font-mono">{activePass.validUntil}</strong></span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 text-center min-w-[130px]">
                <div className="text-2xl font-black text-cyan-400 font-mono">{activePass.daysRemaining}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Days Remaining</div>
              </div>

              <button
                type="button"
                onClick={() => setShowQrCode(!showQrCode)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 shadow-sm"
              >
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>{showQrCode ? 'Hide Optical QR' : 'View Optical Gate Pass'}</span>
              </button>
            </div>
          </div>

          {/* Optical QR Pass Dropdown */}
          {showQrCode && (
            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-6 animate-in fade-in duration-200">
              <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-md shrink-0 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-white rounded-lg">
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-cyan-600 rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-cyan-600 rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-1 text-center sm:text-left">
                <div className="font-mono font-bold text-white text-sm">{activePass.qrGateCode}</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Hold this optical code 5cm above the turnstile scanner on Metro Line 2A, 7, 3 or bus entry validator.
                </p>
                <div className="text-[10px] text-cyan-400 font-semibold pt-1">
                  Synchronized with Smart Card ID: {activeCard.cardId}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Available Pass Plans Grid */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-white font-display mb-4">
          Choose a Smart Mobility Pass Plan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {NCMC_PASS_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl bg-navy-900 border p-6 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-cyan-500 shadow-xl shadow-cyan-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full inline-block mb-3">
                    Most Popular
                  </span>
                )}
                <h4 className="text-base font-bold text-white mb-1">{plan.title}</h4>
                <div className="text-xs text-cyan-400 font-semibold mb-3">{plan.validity}</div>
                <div className="text-2xl font-black text-white font-mono mb-3">
                  ₹{plan.price}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {plan.rides}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleActivate(plan)}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <span>Activate Demo Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
