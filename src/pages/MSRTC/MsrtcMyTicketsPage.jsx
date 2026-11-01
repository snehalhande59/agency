import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Ticket, Calendar, Clock, MapPin, CheckCircle2, XCircle, ArrowRight, Printer, AlertCircle } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';

export const MsrtcMyTicketsPage = () => {
  const { confirmedBookings } = useMsrtcStore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <Ticket className="w-6 h-6 text-red-400" />
            <span>My MSRTC Bus Tickets &amp; E-Passes</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your simulated Maharashtra State bus reservations, download digital passes, or initiate cancellations
          </p>
        </div>

        <Link
          to="/msrtc"
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30 self-start sm:self-auto"
        >
          <span>Book New Bus Ticket</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {confirmedBookings && confirmedBookings.length > 0 ? (
          confirmedBookings.map((ticket) => {
            const isConfirmed = ticket.status === 'CONFIRMED';

            return (
              <div
                key={ticket.demoBookingRef}
                className="rounded-2xl bg-navy-900 border border-slate-800 p-5 sm:p-6 shadow-xl hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm text-white tracking-wider bg-navy-950 px-3 py-1 rounded-lg border border-slate-700">
                      {ticket.demoBookingRef}
                    </span>
                    <span className="text-xs text-slate-400">
                      Booked on {new Date(ticket.bookedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold ${
                      isConfirmed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {isConfirmed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{ticket.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Bus details */}
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wide">
                        {ticket.bus?.serviceName}
                      </span>
                      <span className="text-xs font-mono text-slate-400">• {ticket.bus?.serviceNumber}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">From</span>
                        <span className="font-bold">{ticket.boardingPoint?.name || ticket.bus?.originDepot}</span>
                      </div>
                      <span className="text-slate-600 hidden sm:inline">&rarr;</span>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">To</span>
                        <span className="font-bold">{ticket.droppingPoint?.name || ticket.bus?.destDepot}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {ticket.journeyDate}
                      </span>
                      <span>•</span>
                      <span>
                        Seats: <strong className="text-white font-mono">{ticket.selectedSeats?.join(', ')}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Paid: <strong className="text-white font-mono">₹{ticket.fareBreakdown?.netFare}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 justify-end">
                    <Link
                      to={`/msrtc/ticket/${ticket.demoBookingRef}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                    >
                      <Ticket className="w-4 h-4 text-red-400" />
                      <span>View E-Pass Ticket</span>
                    </Link>

                    {isConfirmed && (
                      <Link
                        to="/msrtc/cancel"
                        className="px-4 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-300 font-semibold text-xs flex items-center justify-center gap-2 border border-red-500/30 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Reservation</span>
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-navy-900/50 rounded-2xl border border-slate-800 p-8">
            <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Active Demo Bus Tickets</h3>
            <p className="text-xs text-slate-400 mb-5">
              You haven't made any simulated MSRTC bookings yet.
            </p>
            <Link
              to="/msrtc"
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md"
            >
              <Bus className="w-4 h-4" />
              <span>Search &amp; Book State Buses</span>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};
