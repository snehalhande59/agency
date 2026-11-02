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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Completed':
        return 'bg-[#DCEEFF] text-[#3898D8] border-[#3898D8]/30';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-[#F8FAFC] text-[#64748B] border-[#E5EDF5]';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#153B5B] font-display">My Travel Bookings</h2>
          <p className="text-xs text-[#64748B]">View demo reservations, trip passes, and chauffeur contacts</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Confirmed', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-[#3898D8] text-white shadow-xs font-bold'
                  : 'bg-[#F8FAFC] border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#E5EDF5] space-y-3 shadow-xs">
          <Car className="w-12 h-12 text-[#94A3B8] mx-auto" />
          <h3 className="text-base font-bold text-[#153B5B]">No bookings found</h3>
          <p className="text-xs text-[#64748B]">You don't have any {filter.toLowerCase()} rides at the moment.</p>
          <button
            onClick={() => openBookingModal()}
            className="px-5 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-xs transition-all"
          >
            Book a Demo Ride
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E5EDF5] hover:border-[#3898D8] transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#3898D8] bg-[#DCEEFF] px-2.5 py-0.5 rounded border border-[#3898D8]/20">
                    {b.id}
                  </span>
                  <span className="text-xs font-extrabold text-[#153B5B]">{b.service}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(b.status)}`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#153B5B]">
                    <MapPin className="w-4 h-4 text-[#3898D8] shrink-0" />
                    <span className="font-bold text-[#153B5B]">{b.from}</span>
                    <span className="text-[#64748B]">→</span>
                    <span className="font-bold text-[#19A89A]">{b.to}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Calendar className="w-4 h-4 text-[#94A3B8] shrink-0" />
                    <span>{b.date} at {b.time}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] pt-1">
                  <span>Vehicle: <strong className="text-[#153B5B]">{b.vehicle}</strong></span>
                  <span>Driver: <strong className="text-[#153B5B]">{b.driverName}</strong></span>
                  <span>Fare: <strong className="text-[#3898D8] font-bold">{b.fare}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E5EDF5]">
                <Link
                  to={`/dashboard/bookings/${b.id}`}
                  className="px-4 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span>Trip Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {b.status === 'Confirmed' && (
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all"
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
