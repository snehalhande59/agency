import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  XCircle, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Train, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { DEMO_BANNER_TEXT } from '../../services/railway/railwayService';

export const RailwayCancellationPage = () => {
  const navigate = useNavigate();
  const { confirmedBookings, cancelDemoBooking } = useRailwayStore();

  const activeBookings = confirmedBookings.filter((b) => !b.status.includes('Cancelled'));

  const [selectedRef, setSelectedRef] = useState(activeBookings[0]?.demoBookingRef || '');
  const [reason, setReason] = useState('Change of travel plan');
  const [confirmedCheck, setConfirmedCheck] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedBooking = confirmedBookings.find((b) => b.demoBookingRef === selectedRef);

  const cancellationFee = selectedBooking ? Math.min(240, Math.round(selectedBooking.fareBreakdown.totalFare * 0.15)) : 0;
  const refundableAmount = selectedBooking ? selectedBooking.fareBreakdown.totalFare - cancellationFee : 0;

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    if (!selectedRef) return;

    setIsProcessing(true);
    setTimeout(() => {
      const refundRecord = cancelDemoBooking(selectedRef, reason);
      setIsProcessing(false);
      navigate('/railway/refund-status');
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Demo Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
        <span className="font-bold uppercase tracking-wider font-mono">{DEMO_BANNER_TEXT}</span>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-navy-900/90 shadow-2xl space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-rose-400">
            <XCircle className="w-5 h-5" />
            <h2 className="text-xl font-bold text-white font-display">Railway Ticket Cancellation</h2>
          </div>
          <p className="text-xs text-slate-400">
            Cancel demo bookings and calculate simulated refunds according to Indian Railways cancellation rules.
          </p>
        </div>

        {activeBookings.length === 0 ? (
          <div className="text-center py-8 space-y-3 bg-navy-950/60 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-300">You do not have any active confirmed bookings to cancel.</p>
            <Link
              to="/railway"
              className="px-4 py-2 rounded-xl bg-electric-600 text-white text-xs font-bold inline-block"
            >
              Book a Demo Ticket First
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCancelSubmit} className="space-y-5">
            
            {/* Select ticket to cancel */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Ticket to Cancel:
              </label>

              <select
                value={selectedRef}
                onChange={(e) => setSelectedRef(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                {activeBookings.map((b) => (
                  <option key={b.demoBookingRef} value={b.demoBookingRef}>
                    {b.demoBookingRef} — {b.trainName} (#{b.trainNumber}) on {b.journeyDate} (₹{b.fareBreakdown.totalFare})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Booking Summary */}
            {selectedBooking && (
              <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Original Ticket Total:</span>
                  <span className="font-bold text-white">₹{selectedBooking.fareBreakdown.totalFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-rose-400">
                  <span>Clerkage / IRCTC Cancellation Charge:</span>
                  <span className="font-bold">-₹{cancellationFee}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-emerald-400">
                  <span>Net Estimated Refund to Source:</span>
                  <span className="text-base font-extrabold text-emerald-300 font-display">₹{refundableAmount.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Reason for Cancellation:
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="Change of travel plan">Change of travel plan</option>
                <option value="Alternate transport chosen">Alternate transport chosen (Cab / Flight)</option>
                <option value="Personal emergency">Personal emergency</option>
                <option value="Testing demo cancellation workflow">Testing demo cancellation workflow</option>
              </select>
            </div>

            {/* Confirmation checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={confirmedCheck}
                onChange={(e) => setConfirmedCheck(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-rose-500 focus:ring-rose-500 bg-navy-950"
              />
              <span>I confirm cancellation of this demo reservation. Allocated berths will be released back to the simulated pool.</span>
            </label>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Processing Simulated Cancellation...</span>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Confirm Cancellation & Release ₹{refundableAmount.toLocaleString()} Refund</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
