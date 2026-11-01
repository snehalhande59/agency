import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Building2, Smartphone, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { useNcmcStore } from '../../store/useNcmcStore';
import { NCMC_ISSUERS } from '../../services/ncmc/ncmcService';

export const NcmcRegisterPage = () => {
  const navigate = useNavigate();
  const { registerNewCard } = useNcmcStore();

  const [fullName, setFullName] = useState('Snehal Hande');
  const [mobile, setMobile] = useState('9820288410');
  const [issuerBank, setIssuerBank] = useState('State Bank of India');
  const [aadhaarLast4, setAadhaarLast4] = useState('8832');
  const [transitCorridor, setTransitCorridor] = useState('Mumbai Metropolitan Region (MMRDA & BEST)');
  const [deliveryMode, setDeliveryMode] = useState('STATION_COUNTER');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      registerNewCard({
        fullName,
        mobile,
        issuerBank,
        aadhaarLast4,
        transitCorridor
      });
      setIsSubmitting(false);
      navigate('/ncmc/dashboard');
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
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
            Apply for New NCMC Smart Mobility Card
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Interoperable RuPay contactless transit card for Mumbai Metro, BEST &amp; Pune Metro
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>
            <strong>SECURITY ASSURANCE:</strong> We never ask for or store Card PIN, CVV, or banking credentials. Your transit profile is registered in a secure sandbox.
          </span>
        </div>
        <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold uppercase">
          Zero-PIN
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-cyan-400" />
            <span>Cardholder Particulars</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Full Legal Name (as per Govt ID)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Snehal Hande"
                required
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Mobile Number (for Transit SMS Alerts)
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9820XXXXXX"
                required
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Issuing Bank Selection */}
        <div className="pt-4 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Select Preferred Issuing Partner Bank</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {NCMC_ISSUERS.map((issuer) => (
              <button
                type="button"
                key={issuer.code}
                onClick={() => setIssuerBank(issuer.name)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  issuerBank === issuer.name
                    ? 'bg-cyan-600/20 border-cyan-400 text-white shadow-md'
                    : 'bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white">{issuer.name}</div>
                <div className="text-[10px] text-cyan-400 mt-0.5">{issuer.cardScheme}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Verification & Transit Region */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Last 4 Digits of Aadhaar (Identity Verification)
            </label>
            <input
              type="text"
              maxLength="4"
              value={aadhaarLast4}
              onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 8832"
              required
              className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Only 4 digits required for subsidy linking</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Primary Transit Region
            </label>
            <select
              value={transitCorridor}
              onChange={(e) => setTransitCorridor(e.target.value)}
              className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Mumbai Metropolitan Region (MMRDA & BEST)">Mumbai Metropolitan Region (MMRDA &amp; BEST)</option>
              <option value="Pune Metro (Maha Metro)">Pune Metro (Purple &amp; Aqua Line)</option>
              <option value="Nagpur Metro Transit">Nagpur Metro Transit</option>
            </select>
          </div>
        </div>

        {/* Delivery / Issuance Option */}
        <div className="pt-4 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-400 mb-2">
            Card Issuance &amp; Collection Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryMode('STATION_COUNTER')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                deliveryMode === 'STATION_COUNTER'
                  ? 'bg-cyan-600/20 border-cyan-400 text-white'
                  : 'bg-navy-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-white">Instant Metro Customer Counter Pickup</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Collect from any customer care kiosk with OTP</div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryMode('HOME_DELIVERY')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                deliveryMode === 'HOME_DELIVERY'
                  ? 'bg-cyan-600/20 border-cyan-400 text-white'
                  : 'bg-navy-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-white">Postal Delivery to Residential Address</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Dispatched within 3-5 business days</div>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/ncmc"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
          >
            <span>{isSubmitting ? 'Registering Demo Card...' : 'Issue Demo NCMC Card'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
