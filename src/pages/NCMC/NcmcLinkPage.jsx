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
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
        <Link
          to="/ncmc"
          className="p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#DCEEFF] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
            Link Existing RuPay NCMC Card
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Connect any bank-issued contactless card to sync transit passes and tap history
          </p>
        </div>
      </div>

      {/* Strict Security Promise */}
      <div className="p-4 rounded-2xl bg-[#E6F7F5] border border-[#19A89A]/30 text-[#153B5B] text-xs space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-[#148377]">
          <Lock className="w-4 h-4 text-[#19A89A]" />
          <span>ZERO-STORAGE PAYMENT SECURITY</span>
        </div>
        <p className="text-[#64748B] leading-relaxed text-[11px]">
          We never ask for your full 16-digit card number, CVV security code, or ATM PIN. We only require the last 4 digits to identify your RuPay contactless transit profile.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLink} className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm space-y-6">
        
        <div>
          <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
            Name on Card
          </label>
          <input
            type="text"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            placeholder="As printed on front of card"
            required
            className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
            Issuing Bank
          </label>
          <select
            value={issuerBank}
            onChange={(e) => setIssuerBank(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
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
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
              Card Number (Last 4 Digits Only)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-[#94A3B8] select-none">
                •••• •••• ••••
              </span>
              <input
                type="text"
                maxLength="4"
                value={last4Digits}
                onChange={(e) => setLast4Digits(e.target.value.replace(/\D/g, ''))}
                placeholder="7721"
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-28 pr-4 py-2.5 text-xs sm:text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white font-mono tracking-widest font-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
              Card Expiry (MM/YY)
            </label>
            <input
              type="text"
              maxLength="5"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="09/29"
              required
              className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white font-mono font-bold"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5EDF5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/ncmc"
            className="text-xs font-bold text-[#64748B] hover:text-[#153B5B] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </Link>

          <button
            type="submit"
            disabled={isLinking}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>{isLinking ? 'Verifying Card Token...' : 'Link NCMC Card to Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
