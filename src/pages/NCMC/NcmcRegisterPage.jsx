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
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
        <Link
          to="/ncmc"
          className="p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#DCEEFF] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display" style={{ color: '#153B5B' }}>
            Apply for New NCMC Smart Mobility Card
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5" style={{ color: '#64748B' }}>
            Interoperable RuPay contactless transit card for Mumbai Metro, BEST &amp; Pune Metro
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-4 rounded-2xl bg-[#E6F7F5] border border-[#19A89A]/30 text-[#153B5B] text-xs flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#19A89A] shrink-0" />
          <span>
            <strong className="text-[#153B5B]">SECURITY ASSURANCE:</strong> We never ask for or store Card PIN, CVV, or banking credentials. Your transit profile is registered in a secure sandbox.
          </span>
        </div>
        <span className="text-[10px] font-mono bg-[#19A89A]/20 text-[#148377] px-2.5 py-1 rounded-full font-bold uppercase shrink-0">
          Zero-PIN
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm space-y-6">
        
        <div>
          <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#3898D8]" />
            <span>Cardholder Particulars</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Full Legal Name (as per Govt ID)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Snehal Hande"
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Mobile Number (for Transit SMS Alerts)
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9820XXXXXX"
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Issuing Bank Selection */}
        <div className="pt-4 border-t border-[#E5EDF5]">
          <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#3898D8]" />
            <span>Select Preferred Issuing Partner Bank</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {NCMC_ISSUERS.map((issuer) => {
              const isSelected = issuerBank === issuer.name;
              return (
                <button
                  type="button"
                  key={issuer.code}
                  onClick={() => setIssuerBank(issuer.name)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#E6F7F5] border-2 border-[#19A89A] shadow-xs'
                      : 'bg-white border-[#E5EDF5] hover:border-[#3898D8] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="text-xs font-extrabold text-[#153B5B]" style={{ color: '#153B5B' }}>{issuer.name}</div>
                  <div className={`text-[10px] mt-0.5 font-bold ${isSelected ? 'text-[#19A89A]' : 'text-[#64748B]'}`} style={{ color: isSelected ? '#19A89A' : '#64748B' }}>
                    {issuer.cardScheme}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Verification & Transit Region */}
        <div className="pt-4 border-t border-[#E5EDF5] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
              Last 4 Digits of Aadhaar (Identity Verification)
            </label>
            <input
              type="text"
              maxLength="4"
              value={aadhaarLast4}
              onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 8832"
              required
              className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white font-mono"
            />
            <span className="text-[10px] text-[#64748B] mt-1 block font-medium">Only 4 digits required for subsidy linking</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
              Primary Transit Region
            </label>
            <select
              value={transitCorridor}
              onChange={(e) => setTransitCorridor(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
            >
              <option value="Mumbai Metropolitan Region (MMRDA & BEST)">Mumbai Metropolitan Region (MMRDA &amp; BEST)</option>
              <option value="Pune Metro (Maha Metro)">Pune Metro (Purple &amp; Aqua Line)</option>
              <option value="Nagpur Metro Transit">Nagpur Metro Transit</option>
            </select>
          </div>
        </div>

        {/* Delivery / Issuance Option */}
        <div className="pt-4 border-t border-[#E5EDF5]">
          <label className="block text-xs font-bold text-[#153B5B] mb-2">
            Card Issuance &amp; Collection Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryMode('STATION_COUNTER')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                deliveryMode === 'STATION_COUNTER'
                  ? 'bg-[#EFF7FC] border-2 border-[#3898D8]'
                  : 'bg-white border-[#E5EDF5] hover:border-[#CBD5E1]'
              }`}
            >
              <div className="text-xs font-bold text-[#153B5B]">Instant Metro Customer Counter Pickup</div>
              <div className="text-[10px] text-[#64748B] mt-0.5">Collect from any customer care kiosk with OTP</div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryMode('HOME_DELIVERY')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                deliveryMode === 'HOME_DELIVERY'
                  ? 'bg-[#EFF7FC] border-2 border-[#3898D8]'
                  : 'bg-white border-[#E5EDF5] hover:border-[#CBD5E1]'
              }`}
            >
              <div className="text-xs font-bold text-[#153B5B]">Postal Delivery to Residential Address</div>
              <div className="text-[10px] text-[#64748B] mt-0.5">Dispatched within 3-5 business days</div>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-[#E5EDF5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/ncmc"
            className="text-xs font-bold text-[#64748B] hover:text-[#153B5B] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>{isSubmitting ? 'Registering Demo Card...' : 'Issue Demo NCMC Card'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
