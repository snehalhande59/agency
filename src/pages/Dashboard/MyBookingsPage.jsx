import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Download, 
  AlertCircle 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const MyBookingsPage = () => {
  const { bookings, cancelBooking, openBookingModal } = useBooking();
  const [filter, setFilter] = useState('All');

  const filtered = bookings.filter(b => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Completed':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Cancelled':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white font-display">My Travel Bookings</h2>
          <p className="text-xs text-slate-400">View demo reservations, trip passes, and chauffeur contacts</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Confirmed', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-electric-600 text-white shadow-glow-sm'
                  : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-3xl border border-slate-800 space-y-3">
          <Car className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No bookings found</h3>
          <p className="text-xs text-slate-400">You don't have any {filter.toLowerCase()} rides at the moment.</p>
          <button
            onClick={() => openBookingModal()}
            className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition-all"
          >
            Book a Demo Ride
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-800 hover:border-electric-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-electric-400 bg-electric-600/15 px-2.5 py-0.5 rounded border border-electric-500/20">
                    {b.id}
                  </span>
                  <span className="text-xs font-bold text-white">{b.service}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(b.status)}`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-electric-400 shrink-0" />
                    <span className="font-medium text-white">{b.from}</span>
                    <span className="text-slate-500">→</span>
                    <span className="font-medium text-emerald-400">{b.to}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{b.date} at {b.time}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>Vehicle: <strong className="text-slate-200">{b.vehicle}</strong></span>
                  <span>Driver: <strong className="text-slate-200">{b.driverName}</strong></span>
                  <span>Fare: <strong className="text-electric-300 font-display">{b.fare}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <Link
                  to={`/dashboard/bookings/${b.id}`}
                  className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Trip Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {b.status === 'Confirmed' && (
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-rose-500/20 text-rose-400 border border-slate-700 text-xs font-semibold transition-all"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
