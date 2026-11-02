import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ArrowLeft, CheckCircle2, Clock, ShieldAlert, XCircle, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';

export const MsrtcCancelRefundPage = () => {
  const { confirmedBookings, cancelDemoTicket, refundRecords } = useMsrtcStore();

  const activeBookings = confirmedBookings.filter((b) => b.status === 'CONFIRMED');
  const [selectedRef, setSelectedRef] = useState(activeBookings[0]?.demoBookingRef || '');
  const [reason, setReason] = useState('Change of travel plan');
  const [cancellationResult, setCancellationResult] = useState(null);

  const selectedBooking = confirmedBookings.find((b) => b.demoBookingRef === selectedRef);

  // Compute estimated refund
  const netOriginal = selectedBooking?.fareBreakdown?.netFare || 0;
  const estimatedDeduction = Math.round(netOriginal * 0.1); // 10% standard clerkage
  const estimatedRefund = Math.max(0, netOriginal - estimatedDeduction);

  const handleCancel = (e) => {
    e.preventDefault();
    if (!selectedRef) return;

    const res = cancelDemoTicket(selectedRef, reason);
    setCancellationResult(res);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5EDF5] gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-rose-600" />
            <span>MSRTC Ticket Cancellation &amp; Refund Status</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Simulate computerized clerkage deductions and instant mock refund reconciliation
          </p>
        </div>

        <Link
          to="/msrtc/my-tickets"
          className="text-xs font-bold px-4 py-2 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5] self-start sm:self-auto"
        >
          View My Tickets
        </Link>
      </div>

      {/* Success Notification */}
      {cancellationResult && (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Simulated Cancellation Completed Successfully</span>
          </div>
          <div className="text-xs text-[#153B5B] leading-relaxed">
            Your simulated refund of <strong className="text-emerald-700 font-mono font-bold">₹{cancellationResult.refundAmount}</strong> has been logged under Reference ID <strong className="font-mono text-[#153B5B] font-bold">{cancellationResult.refundRef}</strong>.
          </div>
        </div>
      )}

      {/* Cancellation Rules Overview */}
      <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm">
        <h3 className="text-xs font-bold text-[#153B5B] uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>MSRTC Official Cancellation Tariff &amp; Clerkage Schedule</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="font-bold text-[#153B5B] mb-0.5">Up to 24 Hours Prior</div>
            <div className="text-emerald-700 font-mono font-bold">10% Clerkage</div>
            <div className="text-[10px] text-[#64748B] mt-1 font-semibold">90% Net Fare Refunded</div>
          </div>

          <div className="p-3 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="font-bold text-[#153B5B] mb-0.5">12 to 24 Hours</div>
            <div className="text-amber-700 font-mono font-bold">25% Clerkage</div>
            <div className="text-[10px] text-[#64748B] mt-1 font-semibold">75% Net Fare Refunded</div>
          </div>

          <div className="p-3 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="font-bold text-[#153B5B] mb-0.5">2 to 12 Hours</div>
            <div className="text-rose-700 font-mono font-bold">50% Deduction</div>
            <div className="text-[10px] text-[#64748B] mt-1 font-semibold">50% Net Fare Refunded</div>
          </div>

          <div className="p-3 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="font-bold text-[#153B5B] mb-0.5">Less than 2 Hours</div>
            <div className="text-rose-700 font-mono font-bold">No Refund</div>
            <div className="text-[10px] text-[#64748B] mt-1 font-semibold">Non-refundable window</div>
          </div>
        </div>
      </div>

      {/* Cancellation Simulator Form */}
      <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-5 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-rose-600" />
          <span>Initiate Cancellation</span>
        </h3>

        {activeBookings.length > 0 ? (
          <form onSubmit={handleCancel} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                  Select Confirmed Ticket
                </label>
                <select
                  value={selectedRef}
                  onChange={(e) => setSelectedRef(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
                >
                  {activeBookings.map((b) => (
                    <option key={b.demoBookingRef} value={b.demoBookingRef}>
                      {b.demoBookingRef} — {b.bus?.serviceName} (₹{b.fareBreakdown?.netFare})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                  Reason for Cancellation
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:bg-white"
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
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-[10px] uppercase text-[#64748B] block font-bold">Total Paid</span>
                  <span className="text-base font-bold text-[#153B5B] font-mono">₹{netOriginal}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#64748B] block font-bold">Clerkage (10%)</span>
                  <span className="text-base font-bold text-rose-600 font-mono">-₹{estimatedDeduction}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#64748B] block font-bold">Refund Amount</span>
                  <span className="text-base font-bold text-emerald-700 font-mono">₹{estimatedRefund}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <XCircle className="w-4 h-4" />
              <span>Simulate Cancellation &amp; Process Refund</span>
            </button>
          </form>
        ) : (
          <div className="text-xs text-[#64748B] p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EDF5] text-center font-semibold">
            No active confirmed tickets available to cancel. You can book a test ticket first.
          </div>
        )}
      </div>

      {/* Refund Status Ledger */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-rose-600" />
          <span>Processed Refund Ledger &amp; Status Tracker</span>
        </h3>

        <div className="space-y-3">
          {refundRecords && refundRecords.length > 0 ? (
            refundRecords.map((refRecord) => (
              <div
                key={refRecord.demoRefundRef}
                className="p-5 rounded-2xl bg-white border border-[#E5EDF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#153B5B] bg-[#EFF7FC] px-2 py-0.5 rounded border border-[#DCEEFF]">
                      {refRecord.demoRefundRef}
                    </span>
                    <span className="text-[11px] text-[#64748B] font-semibold">
                      Booking: {refRecord.demoBookingRef}
                    </span>
                  </div>
                  <div className="text-[#153B5B] font-bold mt-1">
                    {refRecord.route} ({refRecord.serviceName})
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">
                    {new Date(refRecord.cancelledAt).toLocaleDateString()} • {refRecord.estCreditDate}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded mb-1">
                    {refRecord.status}
                  </span>
                  <div className="font-mono font-black text-sm text-emerald-700">
                    ₹{refRecord.refundAmount} (Deduction: ₹{refRecord.clerkageDeduction})
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-[#64748B] p-4 bg-white rounded-xl border border-[#E5EDF5] text-center font-semibold">
              No refund transactions recorded yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
