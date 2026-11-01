import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Phone, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const UserDashboardPage = () => {
  const { bookings, openBookingModal } = useBooking();

  const recentBooking = bookings[0];

  return (
    <div className="space-y-8">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Total Booked Rides</span>
          <div className="text-2xl font-black text-[#153B5B] font-display mt-1">{bookings.length + 8}</div>
          <span className="text-[10px] text-[#19A89A] font-semibold">All Confirmed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">AeroLuxe Miles</span>
          <div className="text-2xl font-black text-[#3898D8] font-display mt-1">4,280 pts</div>
          <span className="text-[10px] text-[#3898D8] font-semibold">₹420 Cashback Ready</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Corporate Membership</span>
          <div className="text-2xl font-black text-[#153B5B] font-display mt-1">Tier 1 Platinum</div>
          <span className="text-[10px] text-amber-600 font-semibold">Priority Chauffeurs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Saved Addresses</span>
          <div className="text-2xl font-black text-[#153B5B] font-display mt-1">4 Hubs</div>
          <span className="text-[10px] text-[#64748B]">Home, Office, Airport</span>
        </div>
      </div>

      {/* Latest Active Ride Spotlight */}
      {recentBooking && (
        <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E5EDF5] gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3898D8]">Upcoming Journey</span>
              <h2 className="text-lg font-bold text-[#153B5B]">{recentBooking.service}</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E6F7F5] text-[#19A89A] border border-[#19A89A]/30 self-start sm:self-auto">
              {recentBooking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3898D8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#64748B] block font-semibold">Pickup Location</span>
                  <p className="text-xs font-bold text-[#153B5B]">{recentBooking.from}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 text-[#19A89A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#64748B] block font-semibold">Drop Location</span>
                  <p className="text-xs font-bold text-[#153B5B]">{recentBooking.to}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-y md:border-y-0 md:border-x border-[#E5EDF5] py-3 md:py-0 md:px-4">
              <div>
                <span className="text-[10px] text-[#64748B] block font-semibold">Date &amp; Schedule</span>
                <p className="text-xs font-bold text-[#153B5B]">{recentBooking.date} at {recentBooking.time}</p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-[#64748B] block font-semibold">Vehicle Model</span>
                <p className="text-xs font-bold text-[#3898D8]">{recentBooking.vehicle}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#64748B] font-semibold">Assigned Chauffeur</span>
                <span className="text-xs font-bold text-[#153B5B]">{recentBooking.driverName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#64748B] font-semibold">Driver Contact</span>
                <span className="text-xs font-mono font-bold text-[#19A89A]">{recentBooking.driverPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#64748B] font-semibold">License Plate</span>
                <span className="text-xs font-mono font-bold bg-[#EFF7FC] px-2 py-0.5 rounded text-[#153B5B] border border-[#E5EDF5]">{recentBooking.vehicleNumber}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Booking Ref: <span className="font-mono font-bold text-[#153B5B]">{recentBooking.id}</span></span>
            <Link
              to={`/dashboard/bookings/${recentBooking.id}`}
              className="text-xs font-bold text-[#3898D8] hover:text-[#287DB8] flex items-center gap-1 transition-colors"
            >
              <span>View Full Trip Voucher</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => openBookingModal({ drop: 'Mumbai Airport (T2)', category: 'Airport Transfer' })}
          className="bg-white p-5 rounded-2xl border border-[#E5EDF5] cursor-pointer group hover:border-[#3898D8] shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-3 group-hover:bg-[#3898D8] group-hover:text-white transition-colors">
            <Car className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#153B5B] group-hover:text-[#3898D8] transition-colors">Book Airport Drop</h3>
          <p className="text-xs text-[#64748B] mt-1">Direct flight sync ride to Mumbai CSMT T2 or Pune Airport.</p>
        </div>

        <div
          onClick={() => openBookingModal({ pickup: 'Mumbai', drop: 'Pune', category: 'Executive SUV' })}
          className="bg-white p-5 rounded-2xl border border-[#E5EDF5] cursor-pointer group hover:border-[#3898D8] shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-3 group-hover:bg-[#3898D8] group-hover:text-white transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#153B5B] group-hover:text-[#3898D8] transition-colors">Mumbai - Pune Express</h3>
          <p className="text-xs text-[#64748B] mt-1">One-way drops from ₹2,199 on the Expressway.</p>
        </div>

        <div
          onClick={() => openBookingModal({ category: 'Force Urbania 17-Seater' })}
          className="bg-white p-5 rounded-2xl border border-[#E5EDF5] cursor-pointer group hover:border-[#3898D8] shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-3 group-hover:bg-[#3898D8] group-hover:text-white transition-colors">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#153B5B] group-hover:text-[#3898D8] transition-colors">Mini Bus for Weekend</h3>
          <p className="text-xs text-[#64748B] mt-1">Luxury 17 &amp; 26-seater Tempo Travellers for groups.</p>
        </div>
      </div>

    </div>
  );
};
