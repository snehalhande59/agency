import React from 'react';
import { Wifi, ShieldCheck, CreditCard, Sparkles, AlertTriangle } from 'lucide-react';

export const NcmcCardVisual = ({ card, showBalance = true, className = '' }) => {
  if (!card) return null;

  const isBlocked = card.cardStatus === 'BLOCKED_SIMULATED';

  return (
    <div className={`relative w-full max-w-md aspect-[1.586/1] rounded-3xl p-6 sm:p-7 shadow-2xl transition-all duration-300 overflow-hidden select-none group ${className}`}>
      
      {/* Background with Metallic Glass & Gradients */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isBlocked
          ? 'bg-gradient-to-br from-slate-950 via-rose-950/90 to-slate-900 border border-rose-500/50 shadow-xl'
          : 'bg-gradient-to-br from-[#071B2F] via-[#0F2D4A] to-[#1A4568] border border-cyan-400/40 shadow-2xl'
      }`}>
        {/* Holographic Sheen / Wave Pattern */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between text-white font-sans">
        
        {/* Top Header: Issuer Bank & Contactless Symbol */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold tracking-wider uppercase font-display text-white">
                {card.issuerBank}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-cyan-300/90 font-medium">
                National Common Mobility Card
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isBlocked ? (
              <span className="flex items-center gap-1 text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                BLOCKED
              </span>
            ) : (
              <Wifi className="w-6 h-6 text-cyan-300 rotate-90 opacity-90" />
            )}
          </div>
        </div>

        {/* Golden EMV Chip & Hologram Stripe */}
        <div className="flex items-center justify-between my-2">
          {/* EMV Chip Representation */}
          <div className="w-11 h-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300/60 shadow-md relative overflow-hidden flex flex-col justify-between p-1">
            <div className="w-full h-0.5 bg-amber-800/40 rounded-full" />
            <div className="w-full flex justify-between">
              <div className="w-2 h-2 rounded-full border border-amber-800/40" />
              <div className="w-2 h-2 rounded-full border border-amber-800/40" />
            </div>
            <div className="w-full h-0.5 bg-amber-800/40 rounded-full" />
          </div>

          {/* One Nation One Card Emblem */}
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md inline-block">
              One Nation • One Card
            </span>
          </div>
        </div>

        {/* Masked Card Number */}
        <div className="my-1">
          <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-slate-100 drop-shadow-md">
            {card.maskedCardNumber}
          </div>
        </div>

        {/* Bottom Strip: Cardholder, Expiry & RuPay Logo */}
        <div className="flex items-end justify-between pt-2 border-t border-white/10">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Cardholder</div>
            <div className="text-xs sm:text-sm font-bold tracking-wide text-white font-mono uppercase truncate max-w-[170px]">
              {card.cardHolderName}
            </div>
          </div>

          <div className="text-center">
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Valid Thru</div>
            <div className="text-xs sm:text-sm font-bold font-mono text-white">
              {card.expiryDate}
            </div>
          </div>

          <div className="text-right">
            {/* RuPay Logo Representation */}
            <div className="inline-flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded shadow-sm">
              <span className="text-[11px] font-black text-blue-900 tracking-tight italic">RuPay</span>
              <span className="text-[9px] font-bold text-orange-600">❯❯</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
