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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5EDF5] gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/ncmc/dashboard"
            className="p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#DCEEFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display flex items-center gap-2">
              <Ticket className="w-6 h-6 text-[#3898D8]" />
              <span>Unlimited Transit Passes</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Daily, weekly, and monthly automated turnstile passes for Mumbai Metro &amp; BEST electric buses
            </p>
          </div>
        </div>

        <Link
          to="/ncmc/dashboard"
          className="text-xs font-bold px-4 py-2 rounded-xl bg-[#EFF7FC] text-[#3898D8] hover:bg-[#DCEEFF] border border-[#DCEEFF] self-start sm:self-auto"
        >
          View Dashboard
        </Link>
      </div>

      {purchaseSuccess && (
        <div className="p-4 rounded-2xl bg-[#E6F7F5] border border-[#19A89A]/30 text-[#148377] text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-[#19A89A] shrink-0" />
          <span className="font-bold">Demo Transit Pass activated successfully! Attached to card {activeCard.maskedCardNumber}.</span>
        </div>
      )}

      {/* Active Pass Banner (if active) */}
      {activePass && (
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Currently Active Pass
                </span>
                <span className="text-xs font-mono font-bold text-[#3898D8]">{activePass.passId}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
                {activePass.title}
              </h3>
              <p className="text-xs font-bold text-[#64748B]">{activePass.network}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#3898D8]" />
                  <span>Valid From: <strong className="text-[#153B5B] font-mono font-bold">{activePass.validFrom}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Valid Until: <strong className="text-[#153B5B] font-mono font-bold">{activePass.validUntil}</strong></span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] text-center min-w-[130px]">
                <div className="text-2xl font-black text-[#3898D8] font-mono">{activePass.daysRemaining}</div>
                <div className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Days Remaining</div>
              </div>

              <button
                type="button"
                onClick={() => setShowQrCode(!showQrCode)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] font-bold text-xs flex items-center justify-center gap-2 border border-[#DCEEFF] shadow-xs"
              >
                <QrCode className="w-4 h-4 text-[#3898D8]" />
                <span>{showQrCode ? 'Hide Optical QR' : 'View Optical Gate Pass'}</span>
              </button>
            </div>
          </div>

          {/* Optical QR Pass Dropdown */}
          {showQrCode && (
            <div className="mt-6 pt-6 border-t border-[#E5EDF5] flex flex-col sm:flex-row items-center gap-6 animate-in fade-in duration-200">
              <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-md shrink-0 flex items-center justify-center border border-[#E5EDF5]">
                <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-white rounded-lg">
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-[#3898D8] rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-[#3898D8] rounded-sm" />
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
              <div className="text-xs text-[#153B5B] space-y-1 text-center sm:text-left">
                <div className="font-mono font-bold text-[#153B5B] text-sm">{activePass.qrGateCode}</div>
                <p className="text-[#64748B] text-[11px] leading-relaxed">
                  Hold this optical code 5cm above the turnstile scanner on Metro Line 2A, 7, 3 or bus entry validator.
                </p>
                <div className="text-[10px] text-[#3898D8] font-bold pt-1">
                  Synchronized with Smart Card ID: {activeCard.cardId}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Available Pass Plans Grid */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#153B5B] font-display mb-4">
          Choose a Smart Mobility Pass Plan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {NCMC_PASS_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl bg-white border p-6 flex flex-col justify-between transition-all shadow-sm ${
                plan.popular
                  ? 'border-2 border-[#3898D8] shadow-md'
                  : 'border-[#E5EDF5] hover:border-[#3898D8]'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF] px-2.5 py-0.5 rounded-full inline-block mb-3">
                    Most Popular
                  </span>
                )}
                <h4 className="text-base font-bold text-[#153B5B] mb-1">{plan.title}</h4>
                <div className="text-xs text-[#3898D8] font-bold mb-3">{plan.validity}</div>
                <div className="text-2xl font-black text-[#153B5B] font-mono mb-3">
                  ₹{plan.price}
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                  {plan.rides}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleActivate(plan)}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? 'bg-[#3898D8] hover:bg-[#287DB8] text-white shadow-sm'
                    : 'bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5]'
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
