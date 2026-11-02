import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Smartphone, Building2, CreditCard, Sparkles, AlertCircle, Info, Loader2 } from 'lucide-react';
import { useNcmcStore } from '../../store/useNcmcStore';

export const NcmcRechargePage = () => {
  const navigate = useNavigate();
  const { activeCard, requestDemoRecharge } = useNcmcStore();

  const [selectedAmount, setSelectedAmount] = useState('500');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [rechargeResult, setRechargeResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const presetAmounts = ['100', '200', '500', '1000', '2000'];

  const finalAmount = customAmount ? parseFloat(customAmount) : parseFloat(selectedAmount);

  const handleRecharge = (e) => {
    e.preventDefault();
    if (!finalAmount || isNaN(finalAmount)) {
      setErrorMessage('Please enter a valid recharge amount.');
      return;
    }
    if (finalAmount < 50) {
      setErrorMessage('Minimum recharge amount is ₹50.');
      return;
    }
    if (finalAmount > 10000) {
      setErrorMessage('Maximum single recharge limit is ₹10,000.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);

    setTimeout(() => {
      const res = requestDemoRecharge(finalAmount, paymentMethod);
      setIsProcessing(false);
      setRechargeResult(res);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
        <Link
          to="/ncmc/dashboard"
          className="p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#DCEEFF] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
            NCMC Smart Transit Wallet Recharge
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Target Card: <strong className="font-mono text-[#3898D8]">{activeCard.maskedCardNumber}</strong> ({activeCard.issuerBank})
          </p>
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="p-4 rounded-2xl bg-[#E6F7F5] border border-[#19A89A]/30 text-[#153B5B] text-xs flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#19A89A] shrink-0" />
          <span>
            <strong className="text-[#148377]">DEMO SIMULATION:</strong> No actual money is debited. Completing this simulation updates your demo wallet balance.
          </span>
        </div>
        <span className="text-[10px] font-mono bg-white text-[#148377] border border-[#19A89A]/40 px-2.5 py-0.5 rounded uppercase font-bold">
          Sandbox
        </span>
      </div>

      {/* Current Balance Bar */}
      <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] flex items-center justify-between shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Current Demo Balance</span>
          <div className="text-2xl font-black text-[#153B5B] font-mono mt-0.5 flex items-center gap-1">
            <span className="text-[#3898D8]">₹</span>
            <span>{activeCard.walletBalance.toFixed(2)}</span>
          </div>
        </div>
        <span className="text-xs text-[#148377] bg-[#E6F7F5] px-3 py-1 rounded-full border border-[#19A89A]/30 font-bold">
          NFC Ready
        </span>
      </div>

      {/* Confirmation Modal */}
      {rechargeResult && (
        <div className="p-6 rounded-3xl bg-[#E6F7F5] border border-[#19A89A]/40 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#19A89A]/20">
            <div className="flex items-center gap-2 text-[#148377] font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#19A89A]" />
              <span>Simulated Top-Up Accepted</span>
            </div>
            <span className="text-xs font-mono text-[#148377] bg-white border border-[#19A89A]/30 px-2 py-0.5 rounded font-bold">
              {rechargeResult.referenceId}
            </span>
          </div>

          <div className="text-xs text-[#153B5B] leading-relaxed space-y-2">
            <p>
              Your simulated recharge of <strong className="text-[#153B5B] font-mono font-bold">₹{finalAmount}</strong> has been credited to your demo wallet!
            </p>
            <p className="text-[11px] text-[#64748B]">
              {rechargeResult.message}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/ncmc/dashboard"
              className="px-6 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-sm"
            >
              Return to Dashboard
            </Link>
            <button
              type="button"
              onClick={() => setRechargeResult(null)}
              className="px-4 py-2.5 rounded-xl bg-white text-[#153B5B] hover:bg-[#EFF7FC] text-xs font-bold border border-[#E5EDF5]"
            >
              Top Up Again
            </button>
          </div>
        </div>
      )}

      {/* Recharge Form */}
      {!rechargeResult && (
        <form onSubmit={handleRecharge} className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Amount Selection */}
          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-2">
              Select Recharge Amount
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {presetAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-xl font-mono text-xs font-bold border transition-all ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-[#EFF7FC] border-2 border-[#3898D8] text-[#3898D8] shadow-xs'
                      : 'bg-white border-[#E5EDF5] text-[#153B5B] hover:border-[#3898D8] hover:bg-[#F8FAFC]'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold text-[#64748B] mb-1">Or Enter Custom Amount (₹50 - ₹10,000):</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-mono font-bold text-[#64748B]">₹</span>
                <input
                  type="number"
                  min="50"
                  max="10000"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount('');
                  }}
                  placeholder="e.g. 750"
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-8 pr-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="pt-4 border-t border-[#E5EDF5]">
            <label className="block text-xs font-bold text-[#153B5B] mb-3">
              Select Simulated Payment Source
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-bold transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-[#EFF7FC] border-2 border-[#3898D8] text-[#3898D8]'
                    : 'bg-white border-[#E5EDF5] text-[#153B5B] hover:border-[#3898D8]'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#3898D8]" />
                <div className="text-left">
                  <div className="font-extrabold text-[#153B5B]">Instant UPI</div>
                  <div className="text-[10px] text-[#64748B]">Google Pay, PhonePe, Paytm</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('DEBIT_CARD')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-bold transition-all ${
                  paymentMethod === 'DEBIT_CARD'
                    ? 'bg-[#EFF7FC] border-2 border-[#3898D8] text-[#3898D8]'
                    : 'bg-white border-[#E5EDF5] text-[#153B5B] hover:border-[#3898D8]'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#3898D8]" />
                <div className="text-left">
                  <div className="font-extrabold text-[#153B5B]">RuPay Debit Card</div>
                  <div className="text-[10px] text-[#64748B]">Zero surcharge gateway</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NET_BANKING')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-bold transition-all ${
                  paymentMethod === 'NET_BANKING'
                    ? 'bg-[#EFF7FC] border-2 border-[#3898D8] text-[#3898D8]'
                    : 'bg-white border-[#E5EDF5] text-[#153B5B] hover:border-[#3898D8]'
                }`}
              >
                <Building2 className="w-5 h-5 text-[#19A89A]" />
                <div className="text-left">
                  <div className="font-extrabold text-[#153B5B]">Net Banking</div>
                  <div className="text-[10px] text-[#64748B]">SBI, HDFC, BoM</div>
                </div>
              </button>
            </div>
          </div>

          {/* Chip Write Explanation */}
          <div className="p-4 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-xs text-[#153B5B] flex items-start gap-3">
            <Info className="w-4 h-4 text-[#3898D8] shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              <strong className="text-[#153B5B]">How NCMC Chip Balance Sync Works:</strong> In physical live environments, top-up funds are recorded on the transit server and physically encoded onto the smart card chip during your next tap at an automated Metro Gate or Add-Value Terminal.
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#E5EDF5] flex items-center justify-between">
            <div className="text-xs">
              <span className="text-[#64748B] font-bold">Amount to Top-Up: </span>
              <strong className="text-[#153B5B] font-mono text-base font-black">₹{finalAmount}</strong>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="px-8 py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Demo Top-Up...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Simulate Recharge</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
