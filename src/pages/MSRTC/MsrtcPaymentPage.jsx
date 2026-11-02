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
      <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
        <Link
          to="/msrtc/review"
          className="p-2.5 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:text-rose-600 hover:bg-rose-50 border border-[#E5EDF5] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
            Simulated Demo Payment Gateway
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            MSRTC Test Environment — Safe sandbox payment simulation
          </p>
        </div>
      </div>

      {/* Demo Warning Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong className="text-amber-950">DEMO TRANSACTION:</strong> No actual money is debited. Completing this simulation generates a demo QR bus pass.
          </span>
        </div>
        <span className="font-mono text-[10px] bg-white border border-amber-300 px-2.5 py-0.5 rounded text-amber-800 uppercase font-bold shrink-0">
          Sandbox
        </span>
      </div>

      {/* Amount Payable Highlight */}
      <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 flex items-center justify-between shadow-sm">
        <div>
          <span className="text-xs text-[#64748B] uppercase font-bold">Total Net Fare</span>
          <div className="text-3xl font-black text-[#153B5B] font-mono flex items-center gap-1 mt-0.5">
            <span className="text-rose-600">₹</span>
            <span>{netPayable}</span>
          </div>
          <span className="text-[11px] text-[#64748B] font-semibold">For {selectedSeats.length} Reserved Seats</span>
        </div>

        <div className="text-right">
          <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            Subsidies Deducted
          </span>
        </div>
      </div>

      {/* Payment Modes */}
      <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider">
          Choose Simulated Payment Method
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('UPI')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
              paymentMethod === 'UPI'
                ? 'bg-rose-50 border-2 border-rose-600 text-rose-700 shadow-xs'
                : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#153B5B] hover:border-rose-300 hover:bg-white'
            }`}
          >
            <Smartphone className="w-5 h-5 text-rose-600" />
            <span>Instant UPI / QR</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('CARD')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
              paymentMethod === 'CARD'
                ? 'bg-[#EFF7FC] border-2 border-[#3898D8] text-[#153B5B] shadow-xs'
                : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#153B5B] hover:border-[#3898D8] hover:bg-white'
            }`}
          >
            <CreditCard className="w-5 h-5 text-[#3898D8]" />
            <span>Debit / RuPay</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('NET_BANKING')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
              paymentMethod === 'NET_BANKING'
                ? 'bg-amber-50 border-2 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#153B5B] hover:border-amber-400 hover:bg-white'
            }`}
          >
            <Building2 className="w-5 h-5 text-amber-600" />
            <span>Net Banking</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('NCMC')}
            className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
              paymentMethod === 'NCMC'
                ? 'bg-[#E6F7F5] border-2 border-[#19A89A] text-[#148377] shadow-xs'
                : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#153B5B] hover:border-[#19A89A] hover:bg-white'
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#19A89A]" />
            <span>NCMC Pass Card</span>
          </button>
        </div>

        {/* Selected Method Details */}
        <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5]">
          {paymentMethod === 'UPI' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#153B5B]">Enter Virtual Payment Address (VPA):</span>
                <span className="text-[10px] text-emerald-700 font-bold">Auto-approved in demo</span>
              </div>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@okhdfcbank"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 font-mono"
              />
              <div className="flex items-center gap-2 text-xs text-[#64748B] pt-1 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E5EDF5] font-semibold">Google Pay</span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E5EDF5] font-semibold">PhonePe</span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E5EDF5] font-semibold">Paytm</span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E5EDF5] font-semibold">BHIM UPI</span>
              </div>
            </div>
          )}

          {paymentMethod === 'CARD' && (
            <div className="space-y-3 text-xs text-[#153B5B]">
              <p className="font-semibold">Simulating Indian RuPay / Visa / Mastercard verification.</p>
              <div className="p-3 bg-white border border-[#E5EDF5] rounded-xl font-mono text-[#153B5B] font-bold">
                Card Number: •••• •••• •••• 4242 (Simulated)
              </div>
            </div>
          )}

          {paymentMethod === 'NET_BANKING' && (
            <div className="space-y-2 text-xs text-[#153B5B]">
              <p className="font-semibold">State Bank of India / Bank of Maharashtra Gateway Simulation.</p>
            </div>
          )}

          {paymentMethod === 'NCMC' && (
            <div className="space-y-2 text-xs text-[#153B5B]">
              <p className="font-semibold">National Common Mobility Card (One Nation One Card) Transit Wallet debited.</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={handleSimulatePayment}
          className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-60"
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
