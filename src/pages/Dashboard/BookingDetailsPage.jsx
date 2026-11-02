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
      <div className="text-center py-12 bg-white rounded-3xl border border-[#E5EDF5]">
        <p className="text-[#153B5B] mb-4">Booking not found.</p>
        <Link to="/dashboard/my-bookings" className="text-[#3898D8] font-bold">
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
          className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#153B5B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Bookings</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E5EDF5] text-[#153B5B] text-xs font-bold hover:bg-[#EFF7FC] transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#3898D8]" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>

      {/* Luxury E-Ticket Card */}
      <div className="rounded-3xl border border-[#E5EDF5] overflow-hidden shadow-md bg-white">
        
        {/* Ticket Header */}
        <div className="p-6 bg-[#F8FAFC] border-b border-[#E5EDF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] flex items-center justify-center text-[#3898D8] shadow-xs">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#3898D8]">Official Travel Voucher</span>
              <h1 className="text-xl font-black text-[#153B5B] font-display">{booking.service}</h1>
              <p className="text-xs text-[#64748B]">Booking Ref: <strong className="text-[#153B5B] font-mono">{booking.id}</strong></p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-[#64748B] block uppercase font-bold tracking-wider">Trip Status</span>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {booking.status}
            </span>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Journey Route */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#3898D8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">Pickup Point</span>
                <p className="text-sm font-bold text-[#153B5B]">{booking.from}</p>
              </div>
            </div>

            <div className="border-l-2 border-dashed border-[#CBD5E1] ml-2.5 h-4"></div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#19A89A] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">Drop Destination</span>
                <p className="text-sm font-bold text-[#19A89A]">{booking.to}</p>
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
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5EDF5]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Journey Date</span>
              <strong className="text-[#153B5B] text-xs">{booking.date}</strong>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5EDF5]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Pickup Time</span>
              <strong className="text-[#153B5B] text-xs">{booking.time}</strong>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5EDF5]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Guests</span>
              <strong className="text-[#153B5B] text-xs">{booking.passengers} Passengers</strong>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5EDF5]">
              <span className="text-[#64748B] block text-[10px] uppercase font-bold">Total Fare</span>
              <strong className="text-[#3898D8] text-sm font-black">{booking.fare}</strong>
            </div>
          </div>

          {/* Chauffeur & Vehicle Allocation */}
          <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#DCEEFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-[#3898D8] font-bold uppercase tracking-wider">Chauffeur & Fleet Details</span>
              <h4 className="text-sm font-bold text-[#153B5B]">{booking.driverName}</h4>
              <p className="text-xs text-[#64748B]">Vehicle: {booking.vehicle}</p>
              <p className="text-xs font-mono text-[#3898D8] font-bold">Plate: {booking.vehicleNumber}</p>
            </div>

            <a
              href={`tel:${booking.driverPhone}`}
              className="px-4 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
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
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-all"
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
