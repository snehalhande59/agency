import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Link2, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { useNcmcStore } from '../../store/useNcmcStore';
import { NCMC_ISSUERS } from '../../services/ncmc/ncmcService';

export const NcmcLinkPage = () => {
  const navigate = useNavigate();
  const { linkExistingCard } = useNcmcStore();

  const [cardHolderName, setCardHolderName] = useState('Snehal Hande');
  const [issuerBank, setIssuerBank] = useState('HDFC Bank');
  const [last4Digits, setLast4Digits] = useState('7721');
  const [expiry, setExpiry] = useState('09/29');
  const [isLinking, setIsLinking] = useState(false);

  const handleLink = (e) => {
    e.preventDefault();
    setIsLinking(true);

    setTimeout(() => {
      linkExistingCard({
        cardNumberMasked: `6082 •••• •••• ${last4Digits}`,
        cardHolderName,
        issuerBank
      });
      setIsLinking(false);
      navigate('/ncmc/dashboard');
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <Link
          to="/ncmc"
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Link Existing RuPay NCMC Card
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Connect any bank-issued contactless card to sync transit passes and tap history
          </p>
        </div>
      </div>

      {/* Strict Security Promise */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-cyan-300">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>ZERO-STORAGE PAYMENT SECURITY</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          We never ask for your full 16-digit card number, CVV security code, or ATM PIN. We only require the last 4 digits to identify your RuPay contactless transit profile.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLink} className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Name on Card
          </label>
          <input
            type="text"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            placeholder="As printed on front of card"
            required
            className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Issuing Bank
          </label>
          <select
            value={issuerBank}
            onChange={(e) => setIssuerBank(e.target.value)}
            className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {NCMC_ISSUERS.map((issuer) => (
              <option key={issuer.code} value={issuer.name}>
                {issuer.name} ({issuer.cardScheme})
              </option>
            ))}
            <option value="Canara Bank">Canara Bank (RuPay Transit)</option>
            <option value="Axis Bank">Axis Bank (RuPay Platinum)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Card Number (Last 4 Digits Only)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-500 select-none">
                •••• •••• ••••
              </span>
              <input
                type="text"
                maxLength="4"
                value={last4Digits}
                onChange={(e) => setLast4Digits(e.target.value.replace(/\D/g, ''))}
                placeholder="7721"
                required
                className="w-full bg-navy-950 border border-slate-700 rounded-xl pl-28 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono tracking-widest font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Card Expiry (MM/YY)
            </label>
            <input
              type="text"
              maxLength="5"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="09/29"
              required
              className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/ncmc"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </Link>

          <button
            type="submit"
            disabled={isLinking}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
          >
            <span>{isLinking ? 'Verifying Card Token...' : 'Link NCMC Card to Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
