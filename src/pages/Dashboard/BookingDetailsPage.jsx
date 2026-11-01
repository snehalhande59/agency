import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  User, 
  Phone, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { MockRouteMap } from '../../components/booking/MockRouteMap';

export const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useBooking();

  const booking = bookings.find(b => b.id === id) || bookings[0];

  if (!booking) {
    return (
      <div className="text-center py-12 glass-panel rounded-3xl">
        <p className="text-white mb-4">Booking not found.</p>
        <Link to="/dashboard/my-bookings" className="text-electric-400 font-bold">
          ← Back to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/my-bookings"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Bookings</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-navy-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:text-white transition-all flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>

      {/* Luxury E-Ticket Card */}
      <div className="glass-panel rounded-3xl border border-electric-500/30 overflow-hidden shadow-2xl bg-navy-900/90">
        
        {/* Ticket Header */}
        <div className="p-6 bg-navy-950/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric-600 to-blue-700 flex items-center justify-center text-white shadow-glow-sm">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-electric-400">Official Travel Voucher</span>
              <h1 className="text-xl font-bold text-white font-display">{booking.service}</h1>
              <p className="text-xs text-slate-400">Booking Ref: <strong className="text-white font-mono">{booking.id}</strong></p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Trip Status</span>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {booking.status}
            </span>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Journey Route */}
          <div className="p-4 rounded-2xl bg-navy-950/70 border border-slate-800 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Pickup Point</span>
                <p className="text-sm font-semibold text-white">{booking.from}</p>
              </div>
            </div>

            <div className="border-l-2 border-dashed border-slate-700 ml-2.5 h-4"></div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Drop Destination</span>
                <p className="text-sm font-semibold text-emerald-300">{booking.to}</p>
              </div>
            </div>
          </div>

          {/* Simulated Route Telemetry Map */}
          <MockRouteMap
            pickup={booking.from}
            drop={booking.to}
            distanceKm={148}
            duration="2h 45m"
            highway="Simulated Highway Corridor"
          />

          {/* Schedule & Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-navy-950/50 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Journey Date</span>
              <strong className="text-white text-xs">{booking.date}</strong>
            </div>

            <div className="p-3 bg-navy-950/50 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Pickup Time</span>
              <strong className="text-white text-xs">{booking.time}</strong>
            </div>

            <div className="p-3 bg-navy-950/50 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Guests</span>
              <strong className="text-white text-xs">{booking.passengers} Passengers</strong>
            </div>

            <div className="p-3 bg-navy-950/50 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Total Fare</span>
              <strong className="text-electric-300 text-sm font-display">{booking.fare}</strong>
            </div>
          </div>

          {/* Chauffeur & Vehicle Allocation */}
          <div className="p-4 rounded-2xl bg-electric-600/10 border border-electric-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-electric-300 font-bold uppercase tracking-wider">Chauffeur & Fleet Details</span>
              <h4 className="text-sm font-bold text-white">{booking.driverName}</h4>
              <p className="text-xs text-slate-300">Vehicle: {booking.vehicle}</p>
              <p className="text-xs font-mono text-electric-300 font-bold">Plate: {booking.vehicleNumber}</p>
            </div>

            <a
              href={`tel:${booking.driverPhone}`}
              className="px-4 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Chauffeur: {booking.driverPhone}</span>
            </a>
          </div>

          {/* Cancellation button if confirmed */}
          {booking.status === 'Confirmed' && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this demo booking?')) {
                    cancelBooking(booking.id);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold transition-all"
              >
                Cancel This Booking
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
