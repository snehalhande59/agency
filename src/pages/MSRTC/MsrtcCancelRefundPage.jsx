import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, XCircle, AlertCircle, CheckCircle2, ShieldAlert, ArrowRight, Clock, FileText, ArrowLeft } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';

export const MsrtcCancelRefundPage = () => {
  const { confirmedBookings, refundRecords, cancelDemoBooking } = useMsrtcStore();

  const activeBookings = confirmedBookings.filter((b) => b.status === 'CONFIRMED');

  const [selectedRef, setSelectedRef] = useState(activeBookings[0]?.demoBookingRef || '');
  const [reason, setReason] = useState('Change of travel plan');
  const [cancellationResult, setCancellationResult] = useState(null);

  const selectedBooking = confirmedBookings.find((b) => b.demoBookingRef === selectedRef);

  const handleCancel = (e) => {
    e.preventDefault();
    if (!selectedRef) return;

    const res = cancelDemoBooking(selectedRef, reason);
    if (res.success) {
      setCancellationResult(res);
    }
  };

  const netOriginal = selectedBooking?.fareBreakdown?.netFare || 0;
  const estimatedDeduction = Math.round(netOriginal * 0.1); // 10% standard clerkage
  const estimatedRefund = netOriginal - estimatedDeduction;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-red-400" />
            <span>MSRTC Ticket Cancellation &amp; Refund Status</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulate computerized clerkage deductions and instant mock refund reconciliation
          </p>
        </div>

        <Link
          to="/msrtc/my-tickets"
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 self-start sm:self-auto"
        >
          View My Tickets
        </Link>
      </div>

      {/* Success Notification */}
      {cancellationResult && (
        <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 space-y-2 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Simulated Cancellation Completed Successfully</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            Your simulated refund of <strong className="text-white font-mono">₹{cancellationResult.refundAmount}</strong> has been logged under Reference ID <strong className="text-white font-mono">{cancellationResult.refundRef}</strong>.
          </div>
        </div>
      )}

      {/* Cancellation Rules Overview */}
      <div className="rounded-2xl bg-navy-900 border border-slate-800 p-6 shadow-xl">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>MSRTC Official Cancellation Tariff &amp; Clerkage Schedule</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
            <div className="font-bold text-white mb-0.5">Up to 24 Hours Prior</div>
            <div className="text-emerald-400 font-mono font-bold">10% Clerkage</div>
            <div className="text-[10px] text-slate-500 mt-1">90% Net Fare Refunded</div>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
            <div className="font-bold text-white mb-0.5">12 to 24 Hours</div>
            <div className="text-amber-400 font-mono font-bold">25% Clerkage</div>
            <div className="text-[10px] text-slate-500 mt-1">75% Net Fare Refunded</div>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
            <div className="font-bold text-white mb-0.5">2 to 12 Hours</div>
            <div className="text-rose-400 font-mono font-bold">50% Deduction</div>
            <div className="text-[10px] text-slate-500 mt-1">50% Net Fare Refunded</div>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
            <div className="font-bold text-white mb-0.5">Less than 2 Hours</div>
            <div className="text-red-400 font-mono font-bold">No Refund</div>
            <div className="text-[10px] text-slate-500 mt-1">Non-refundable window</div>
          </div>
        </div>
      </div>

      {/* Cancellation Simulator Form */}
      <div className="rounded-2xl bg-navy-900 border border-slate-800 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-400" />
          <span>Initiate Cancellation</span>
        </h3>

        {activeBookings.length > 0 ? (
          <form onSubmit={handleCancel} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Select Confirmed Ticket
                </label>
                <select
                  value={selectedRef}
                  onChange={(e) => setSelectedRef(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                >
                  {activeBookings.map((b) => (
                    <option key={b.demoBookingRef} value={b.demoBookingRef}>
                      {b.demoBookingRef} — {b.bus?.serviceName} (₹{b.fareBreakdown?.netFare})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Reason for Cancellation
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Change of travel plan">Change of travel plan</option>
                  <option value="Booked incorrect bus/timing">Booked incorrect bus/timing</option>
                  <option value="Personal emergency">Personal emergency</option>
                  <option value="Other">Other reason</option>
                </select>
              </div>
            </div>

            {/* Instant Refund Preview */}
            {selectedBooking && (
              <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Total Paid</span>
                  <span className="text-base font-bold text-white font-mono">₹{netOriginal}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Clerkage (10%)</span>
                  <span className="text-base font-bold text-red-400 font-mono">-₹{estimatedDeduction}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Refund Amount</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">₹{estimatedRefund}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
            >
              <XCircle className="w-4 h-4" />
              <span>Simulate Cancellation &amp; Process Refund</span>
            </button>
          </form>
        ) : (
          <div className="text-xs text-slate-400 p-4 bg-navy-950 rounded-xl border border-slate-800 text-center">
            No active confirmed tickets available to cancel. You can book a test ticket first.
          </div>
        )}
      </div>

      {/* Refund Status Ledger */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-red-400" />
          <span>Processed Refund Ledger &amp; Status Tracker</span>
        </h3>

        <div className="space-y-3">
          {refundRecords && refundRecords.length > 0 ? (
            refundRecords.map((refRecord) => (
              <div
                key={refRecord.demoRefundRef}
                className="p-5 rounded-2xl bg-navy-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white bg-navy-950 px-2 py-0.5 rounded border border-slate-700">
                      {refRecord.demoRefundRef}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Booking: {refRecord.demoBookingRef}
                    </span>
                  </div>
                  <div className="text-slate-300 font-medium mt-1">
                    {refRecord.route} ({refRecord.serviceName})
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {new Date(refRecord.cancelledAt).toLocaleDateString()} • {refRecord.estCreditDate}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded mb-1">
                    {refRecord.status}
                  </span>
                  <div className="font-mono font-black text-sm text-emerald-400">
                    ₹{refRecord.refundAmount} (Deduction: ₹{refRecord.clerkageDeduction})
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-slate-500 p-4 bg-navy-900 rounded-xl text-center">
              No refund transactions recorded yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
