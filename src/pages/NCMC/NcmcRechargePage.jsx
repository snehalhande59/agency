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
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <Link
          to="/ncmc/dashboard"
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            NCMC Smart Transit Wallet Recharge
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Target Card: <strong className="font-mono text-cyan-300">{activeCard.maskedCardNumber}</strong> ({activeCard.issuerBank})
          </p>
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>DEMO SIMULATION:</strong> No actual money is debited. Completing this simulation updates your demo wallet balance.
          </span>
        </div>
        <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded uppercase font-bold">
          Sandbox
        </span>
      </div>

      {/* Current Balance Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-slate-900 border border-slate-800 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Demo Balance</span>
          <div className="text-2xl font-black text-white font-mono mt-0.5 flex items-center gap-1">
            <span className="text-cyan-400">₹</span>
            <span>{activeCard.walletBalance.toFixed(2)}</span>
          </div>
        </div>
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
          NFC Ready
        </span>
      </div>

      {/* Confirmation Modal */}
      {rechargeResult && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/70 to-navy-950 border border-emerald-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Simulated Top-Up Accepted</span>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
              {rechargeResult.referenceId}
            </span>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed space-y-2">
            <p>
              Your simulated recharge of <strong className="text-white font-mono">₹{finalAmount}</strong> has been credited to your demo wallet!
            </p>
            <p className="text-[11px] text-slate-400">
              {rechargeResult.message}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/ncmc/dashboard"
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30"
            >
              Return to Dashboard
            </Link>
            <button
              type="button"
              onClick={() => setRechargeResult(null)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Top Up Again
            </button>
          </div>
        </div>
      )}

      {/* Recharge Form */}
      {!rechargeResult && (
        <form onSubmit={handleRecharge} className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Amount Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
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
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-600/30'
                      : 'bg-navy-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-[11px] text-slate-400 mb-1">Or Enter Custom Amount (₹50 - ₹10,000):</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">₹</span>
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
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="pt-4 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-400 mb-3">
              Select Simulated Payment Source
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-semibold transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-cyan-600/20 border-cyan-400 text-white shadow-md'
                    : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <div className="text-left">
                  <div className="font-bold text-white">Instant UPI</div>
                  <div className="text-[10px] text-slate-400">Google Pay, PhonePe, Paytm</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('DEBIT_CARD')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-semibold transition-all ${
                  paymentMethod === 'DEBIT_CARD'
                    ? 'bg-cyan-600/20 border-cyan-400 text-white shadow-md'
                    : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="font-bold text-white">RuPay Debit Card</div>
                  <div className="text-[10px] text-slate-400">Zero surcharge gateway</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NET_BANKING')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-semibold transition-all ${
                  paymentMethod === 'NET_BANKING'
                    ? 'bg-cyan-600/20 border-cyan-400 text-white shadow-md'
                    : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-5 h-5 text-amber-400" />
                <div className="text-left">
                  <div className="font-bold text-white">Net Banking</div>
                  <div className="text-[10px] text-slate-400">SBI, HDFC, BoM</div>
                </div>
              </button>
            </div>
          </div>

          {/* Chip Write Explanation */}
          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              <strong>How NCMC Chip Balance Sync Works:</strong> In physical live environments, top-up funds are recorded on the transit server and physically encoded onto the smart card chip during your next tap at an automated Metro Gate or Add-Value Terminal.
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400">Amount to Top-Up: </span>
              <strong className="text-white font-mono text-base">₹{finalAmount}</strong>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
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
