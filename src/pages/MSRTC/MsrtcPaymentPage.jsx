import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, QrCode, CreditCard, Building2, Smartphone, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';
import { msrtcService } from '../../services/msrtc/msrtcService';

export const MsrtcPaymentPage = () => {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, passengers, confirmDemoBooking } = useMsrtcStore();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('passenger@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  // Compute total
  let totalGross = 0;
  let totalDiscount = 0;
  passengers.forEach((p) => {
    const b = msrtcService.calculateFareBreakdown({
      bus: selectedBus,
      seatNumbers: [p.seatNumber],
      concessionCode: p.concessionCode
    });
    totalGross += b.grossFare;
    totalDiscount += b.concessionDiscount;
  });
  const reservationCharge = 15 * selectedSeats.length;
  const accidentReliefFund = 5 * selectedSeats.length;
  const netPayable = totalGross - totalDiscount + reservationCharge + accidentReliefFund;

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const bookedTicket = confirmDemoBooking({
        method: paymentMethod === 'UPI' ? `Instant UPI (${upiId})` : `${paymentMethod} (Simulated Payment)`
      });
      setIsProcessing(false);
      navigate(`/msrtc/ticket/${bookedTicket.demoBookingRef}`);
    }, 1400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <Link
          to="/msrtc/review"
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Simulated Demo Payment Gateway
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            MSRTC Test Environment — Safe sandbox payment simulation
          </p>
        </div>
      </div>

      {/* Demo Warning Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>DEMO TRANSACTION:</strong> No actual money is debited. Completing this simulation generates a demo QR bus pass.
          </span>
        </div>
        <span className="font-mono text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 uppercase font-bold">
          Sandbox
        </span>
      </div>

      {/* Amount Payable Highlight */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-slate-900 border border-slate-800 p-6 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Net Fare</span>
          <div className="text-3xl font-black text-white font-mono flex items-center gap-1 mt-0.5">
            <span className="text-red-400">₹</span>
            <span>{netPayable}</span>
          </div>
          <span className="text-[11px] text-slate-400">For {selectedSeats.length} Reserved Seats</span>
        </div>

        <div className="text-right">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-medium">
            Subsidies Deducted
          </span>
        </div>
      </div>

      {/* Payment Modes */}
      <div className="rounded-2xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Choose Simulated Payment Method
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('UPI')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
              paymentMethod === 'UPI'
                ? 'bg-red-600/20 border-red-500 text-white shadow-md'
                : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-5 h-5 text-red-400" />
            <span>Instant UPI / QR</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('CARD')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
              paymentMethod === 'CARD'
                ? 'bg-red-600/20 border-red-500 text-white shadow-md'
                : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <CreditCard className="w-5 h-5 text-blue-400" />
            <span>Debit / RuPay</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('NET_BANKING')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
              paymentMethod === 'NET_BANKING'
                ? 'bg-red-600/20 border-red-500 text-white shadow-md'
                : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Net Banking</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('NCMC')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
              paymentMethod === 'NCMC'
                ? 'bg-red-600/20 border-red-500 text-white shadow-md'
                : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>NCMC Pass Card</span>
          </button>
        </div>

        {/* Selected Method Details */}
        <div className="p-5 rounded-xl bg-navy-950 border border-slate-800">
          {paymentMethod === 'UPI' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Enter Virtual Payment Address (VPA):</span>
                <span className="text-[10px] text-emerald-400">Auto-approved in demo</span>
              </div>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@okhdfcbank"
                className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              />
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono">Google Pay</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono">PhonePe</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono">Paytm</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono">BHIM UPI</span>
              </div>
            </div>
          )}

          {paymentMethod === 'CARD' && (
            <div className="space-y-3 text-xs text-slate-300">
              <p>Simulating Indian RuPay / Visa / Mastercard verification.</p>
              <div className="p-3 bg-navy-900 rounded-lg font-mono text-slate-400">
                Card Number: •••• •••• •••• 4242 (Simulated)
              </div>
            </div>
          )}

          {paymentMethod === 'NET_BANKING' && (
            <div className="space-y-2 text-xs text-slate-300">
              <p>State Bank of India / Bank of Maharashtra Gateway Simulation.</p>
            </div>
          )}

          {paymentMethod === 'NCMC' && (
            <div className="space-y-2 text-xs text-slate-300">
              <p>National Common Mobility Card (One Nation One Card) Transit Wallet debited.</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={handleSimulatePayment}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Simulating Authorization &amp; Generating Pass...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Authorize Demo Payment (₹{netPayable})</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
};
