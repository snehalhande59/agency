import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Building2,
  Smartphone
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { railwayService, DEMO_BANNER_TEXT } from '../../services/railway/railwayService';

export const DemoPaymentPage = () => {
  const navigate = useNavigate();
  const { selectedTrain, selectedClass, selectedQuota, passengers, confirmDemoBooking } = useRailwayStore();

  const [paymentMethod, setPaymentMethod] = useState('UPI_SIMULATED');
  const [upiId, setUpiId] = useState('snehal@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  const fareBreakdown = railwayService.calculateFareBreakdown({
    trainNumber: selectedTrain.number,
    classCode: selectedClass,
    quota: selectedQuota,
    passengerCount: passengers.length
  });

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newBooking = confirmDemoBooking({
        method: paymentMethod,
        simulatedAccount: upiId,
        amount: fareBreakdown.totalFare,
        timestamp: new Date().toISOString()
      });
      setIsProcessing(false);
      navigate(`/railway/ticket/${newBooking.demoBookingRef}`);
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Demo Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 shrink-0 text-amber-400" />
        <div>
          <span className="font-bold uppercase tracking-wider block font-mono">{DEMO_BANNER_TEXT}</span>
          <p className="text-[11px] text-amber-200/80">Simulated payment gateway. Click "Authorize Demo Payment" to generate a demo booking ticket without charging real money.</p>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/30 bg-navy-900/90 shadow-2xl space-y-5">
        
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Total Amount Payable</span>
            <div className="text-2xl font-black text-white font-display">₹{fareBreakdown.totalFare.toLocaleString()}</div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {passengers.length} Passenger(s)
          </span>
        </div>

        {/* Method Select */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Select Simulated Payment Method:
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('UPI_SIMULATED')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentMethod === 'UPI_SIMULATED'
                  ? 'bg-electric-600/20 border-electric-500 text-white shadow-glow-sm'
                  : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-5 h-5 mx-auto mb-1 text-electric-400" />
              <span className="text-xs font-bold block">Instant UPI</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('CARD_SIMULATED')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentMethod === 'CARD_SIMULATED'
                  ? 'bg-electric-600/20 border-electric-500 text-white shadow-glow-sm'
                  : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-400" />
              <span className="text-xs font-bold block">Credit/Debit</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('NET30_SIMULATED')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentMethod === 'NET30_SIMULATED'
                  ? 'bg-electric-600/20 border-electric-500 text-white shadow-glow-sm'
                  : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
              <span className="text-xs font-bold block">Corporate Net-30</span>
            </button>
          </div>
        </div>

        {/* Payment Form Details */}
        <form onSubmit={handlePay} className="space-y-4 pt-2">
          {paymentMethod === 'UPI_SIMULATED' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Simulated Virtual Payment Address (VPA)</label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@bank"
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-electric-500 font-mono"
              />
            </div>
          )}

          {paymentMethod === 'CARD_SIMULATED' && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">Simulated Card Number</label>
              <input
                type="text"
                disabled
                value="•••• •••• •••• 4242 (Demo Test Card)"
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-400 font-mono"
              />
            </div>
          )}

          {paymentMethod === 'NET30_SIMULATED' && (
            <div className="p-3 bg-navy-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="text-emerald-400 font-bold block mb-1">✓ Corporate Account Approved</span>
              <span>Invoiced on monthly consolidated billing under Nexus Global Technologies India Pvt Ltd.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-electric-600 via-blue-600 to-electric-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Simulating IRCTC Dispatch...</span>
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Authorize Demo Payment (₹{fareBreakdown.totalFare.toLocaleString()})</span>
              </>
            )}
          </button>
        </form>

      </div>

    </div>
  );
};
