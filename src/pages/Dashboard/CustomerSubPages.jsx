import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Train, 
  Bus, 
  Car, 
  CreditCard, 
  Receipt, 
  RefreshCw, 
  Bell, 
  LifeBuoy, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ExternalLink, 
  ChevronRight, 
  Download, 
  Calendar, 
  MapPin, 
  User, 
  Plus, 
  X, 
  ShieldCheck, 
  Info,
  DollarSign,
  Ticket,
  ArrowRight
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { useMsrtcStore } from '../../store/useMsrtcStore';
import { useNcmcStore } from '../../store/useNcmcStore';
import { useBooking } from '../../context/BookingContext';

// =========================================================================
// 1. CUSTOMER RAILWAY TICKETS PAGE
// =========================================================================
export const CustomerRailwayTicketsPage = () => {
  const { confirmedBookings } = useRailwayStore();
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = confirmedBookings.filter(b => {
    const matchesFilter = filter === 'ALL' || (filter === 'CONFIRMED' && b.status === 'CONFIRMED_DEMO');
    const matchesSearch = searchQuery === '' || 
      b.trainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.trainNumber.includes(searchQuery) ||
      b.demoBookingRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Train className="w-6 h-6 text-emerald-400" />
            <span>Railway Reservations</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            IRCTC simulated booking archive, berth allocation and journey passes.
          </p>
        </div>

        <Link
          to="/railway"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Book Train Ticket</span>
        </Link>
      </div>

      {/* Demo Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">DEMO MODE – IRCTC integration pending authorization.</span>
          <p className="text-[11px] text-amber-200/80 mt-0.5">
            Reservations below are simulated using standard Indian Railways timetable datasets. No actual railway tickets or official PNRs are generated.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-navy-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search train or demo ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'CONFIRMED'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab 
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'All Tickets' : 'Confirmed'}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Cards */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-navy-900/40 rounded-3xl border border-slate-800">
            <Train className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white">No railway reservations found</h3>
            <p className="text-xs text-slate-400 mt-1">Ready to plan your next train journey?</p>
            <Link
              to="/railway"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Book Now
            </Link>
          </div>
        ) : (
          filteredBookings.map((ticket) => (
            <div
              key={ticket.demoBookingRef}
              className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {ticket.travelClass}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">
                        {ticket.trainNumber} - {ticket.trainName}
                      </h3>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {ticket.status}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Demo Ref: <span className="text-emerald-400 font-semibold">{ticket.demoBookingRef}</span>
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-base font-black text-white">₹{ticket.totalFare}</div>
                  <span className="text-[10px] text-slate-400">{ticket.passengers?.length || 1} Passenger(s) • Quota: {ticket.quota}</span>
                </div>
              </div>

              {/* Station Route Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Origin</span>
                  <p className="font-bold text-white mt-0.5">{ticket.fromName}</p>
                  <p className="text-[11px] text-emerald-400 font-mono">{ticket.departureTime} • {ticket.journeyDate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Destination</span>
                  <p className="font-bold text-white mt-0.5">{ticket.toName}</p>
                  <p className="text-[11px] text-slate-300 font-mono">{ticket.arrivalTime} • {ticket.journeyDate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Allocated Berths (Simulated)</span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {ticket.passengers?.map((p, idx) => (
                      <span key={idx} className="bg-navy-950 px-2 py-0.5 rounded text-[11px] border border-slate-700 text-slate-300">
                        {p.name} ({ticket.travelClass}-B{idx + 1}-{24 + idx})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/railway/ticket/${ticket.demoBookingRef}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold border border-emerald-500/30 transition-all flex items-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>View Demo Ticket</span>
                  </Link>
                  <Link
                    to="/railway/pnr-status"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-all flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Check PNR Demo</span>
                  </Link>
                </div>

                <Link
                  to="/railway/cancel"
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Request Cancellation</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 2. CUSTOMER MSRTC BUS TICKETS PAGE
// =========================================================================
export const CustomerMsrtcTicketsPage = () => {
  const { confirmedBookings } = useMsrtcStore();
  const [filter, setFilter] = useState('ALL');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Bus className="w-6 h-6 text-rose-400" />
            <span>MSRTC ST Bus Passes</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Maharashtra State Road Transport Corporation e-tickets and state concessions.
          </p>
        </div>

        <Link
          to="/msrtc"
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Book MSRTC Bus</span>
        </Link>
      </div>

      {/* Demo Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">MSRTC Provider Integration Pending.</span>
          <p className="text-[11px] text-amber-200/80 mt-0.5">
            These tickets operate on verified state depot timetables and official concession criteria. Not an official state transport document.
          </p>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {confirmedBookings.length === 0 ? (
          <div className="text-center py-12 bg-navy-900/40 rounded-3xl border border-slate-800">
            <Bus className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white">No MSRTC bus passes found</h3>
            <p className="text-xs text-slate-400 mt-1">Explore Shivneri Volvo AC, Shivshahi and Ordinary schedules.</p>
            <Link
              to="/msrtc"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
            >
              Search Buses
            </Link>
          </div>
        ) : (
          confirmedBookings.map((ticket) => (
            <div
              key={ticket.demoTicketRef}
              className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-rose-500/40 transition-all shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
                    ST
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">
                        {ticket.serviceType} • {ticket.busNumber}
                      </h3>
                      <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                        {ticket.status}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      E-Ticket Ref: <span className="text-rose-400 font-semibold">{ticket.demoTicketRef}</span>
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-base font-black text-white">₹{ticket.totalFare}</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {ticket.concessionApplied ? 'Concession Applied' : 'Standard Fare'}
                  </span>
                </div>
              </div>

              {/* Depots */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Boarding Stand</span>
                  <p className="font-bold text-white mt-0.5">{ticket.originDepot}</p>
                  <p className="text-[11px] text-rose-400 font-mono">{ticket.departureTime} • {ticket.journeyDate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Destination Depot</span>
                  <p className="font-bold text-white mt-0.5">{ticket.destDepot}</p>
                  <p className="text-[11px] text-slate-300 font-mono">{ticket.arrivalTime}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Seats & Passengers</span>
                  <p className="font-mono text-slate-200 mt-0.5">
                    Seats: {ticket.selectedSeats?.join(', ') || '11, 12'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {ticket.passengers?.map(p => p.name).join(', ') || 'Sanjay Patil, Sunita Patil'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <Link
                  to={`/msrtc/ticket/${ticket.demoTicketRef}`}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-semibold border border-rose-500/30 transition-all flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>View MSRTC E-Pass</span>
                </Link>

                <Link
                  to="/msrtc/cancel"
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Cancel ST Ticket</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 3. CUSTOMER CAB BOOKINGS PAGE
// =========================================================================
export const CustomerCabBookingsPage = () => {
  const { bookings } = useBooking();
  // Filter for cab bookings (exclude rail/bus charter if applicable)
  const cabBookings = bookings.filter(b => 
    !b.service?.toLowerCase().includes('rail') && 
    !b.service?.toLowerCase().includes('bus')
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Car className="w-6 h-6 text-electric-400" />
            <span>Cab & Chauffeur Bookings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Local point-to-point taxis, outstation cabs, hourly rentals and airport transfers.
          </p>
        </div>

        <Link
          to="/book"
          className="px-4 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Cab</span>
        </Link>
      </div>

      <div className="space-y-4">
        {cabBookings.length === 0 ? (
          <div className="text-center py-12 bg-navy-900/40 rounded-3xl border border-slate-800">
            <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white">No active cab bookings</h3>
            <p className="text-xs text-slate-400 mt-1">Book an executive sedan or SUV with vetted chauffeurs.</p>
            <Link
              to="/book"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-600 text-white font-bold text-xs"
            >
              Book Cab
            </Link>
          </div>
        ) : (
          cabBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-electric-500/40 transition-all shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center font-bold text-sm">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">
                        {booking.service}
                      </h3>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {booking.status || 'CONFIRMED'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Booking Ref: <span className="text-electric-400 font-semibold">{booking.id}</span>
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-base font-black text-white">{booking.estimatedPrice || '₹2,450'}</div>
                  <span className="text-[10px] text-slate-400">All-Inclusive Fixed Fare</span>
                </div>
              </div>

              {/* Route */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Pickup</span>
                  <p className="font-bold text-white mt-0.5">{booking.pickupLocation || 'Bandra Kurla Complex (BKC), Mumbai'}</p>
                  <p className="text-[11px] text-electric-400 font-mono">{booking.date} • {booking.time || '10:00 AM'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Drop</span>
                  <p className="font-bold text-white mt-0.5">{booking.destination || 'Chhatrapati Shivaji Maharaj Airport T2'}</p>
                  <p className="text-[11px] text-slate-400">Est. Distance: ~14.5 km</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Vehicle & Driver (Demo)</span>
                  <p className="font-bold text-slate-200 mt-0.5">Toyota Innova Crysta (MH 02 EE 9840)</p>
                  <p className="text-[11px] text-slate-400">Driver: Rajesh Ghadge (4.9★)</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <Link
                  to={`/dashboard/bookings/${booking.id}`}
                  className="px-3 py-1.5 rounded-lg bg-electric-600/20 hover:bg-electric-600/30 text-electric-300 font-semibold border border-electric-500/30 transition-all flex items-center gap-1.5"
                >
                  <span>Trip Telemetry & Receipt</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-slate-500 font-mono">Simulated Chauffeur Tracking</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 4. CUSTOMER BUS & COACH BOOKINGS PAGE
// =========================================================================
export const CustomerBusBookingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-purple-400" />
            <span>Bus & Coach Charters</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Private 17-seater Tempo Travellers, 45-seater luxury Volvo coaches and wedding group charters.
          </p>
        </div>

        <Link
          to="/services/luxury-bus"
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Charter A Coach</span>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-purple-500/40 transition-all shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">
                    Volvo 9600 Multi-Axle Luxury Coach (45-Seater)
                  </h3>
                  <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                    CHARTER_CONFIRMED
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Charter ID: <span className="text-purple-400 font-semibold">CHTR-VOL-2026-88</span>
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-base font-black text-white">₹38,500</div>
              <span className="text-[10px] text-slate-400">3-Day Corporate Offsite Package</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Pickup Depot</span>
              <p className="font-bold text-white mt-0.5">Nexus Tech Hub, Airoli, Navi Mumbai</p>
              <p className="text-[11px] text-purple-400 font-mono">06:00 AM • 14 Nov 2026</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Destination</span>
              <p className="font-bold text-white mt-0.5">Della Resorts, Lonavala</p>
              <p className="text-[11px] text-slate-400">Round Trip with 3 Days Local Standby</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Amenities Included</span>
              <p className="text-slate-300 mt-0.5">Air Suspension, Wi-Fi 6, Reclining Leather, Cold Storage</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
            <span className="text-[11px] text-slate-400">Chauffeur: Anil Kadam & Relief Driver Assigned</span>
            <button
              onClick={() => alert('Demo Charter Agreement downloaded (Simulated PDF).')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Charter Contract (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. CUSTOMER NCMC TRANSIT CARDS PAGE
// =========================================================================
export const CustomerNcmcCardsPage = () => {
  const { cardsList, activePass, transactions } = useNcmcStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-cyan-400" />
            <span>NCMC Smart Mobility Cards</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            National Common Mobility Card (One Nation One Card) wallet balance and metro turnstile passes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/ncmc/register"
            className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-glow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply New Card</span>
          </Link>
          <Link
            to="/ncmc/recharge"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <span>Top-up Wallet</span>
          </Link>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">DEMO MODE – NCMC issuer integration pending.</span>
          <p className="text-[11px] text-amber-200/80 mt-0.5">
            Card balances and contactless tap passes shown here are simulated for transit testing.
          </p>
        </div>
      </div>

      {/* Cards Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardsList.map((card) => (
          <div
            key={card.cardId}
            className="relative p-6 rounded-3xl bg-gradient-to-br from-navy-900 via-slate-900 to-navy-950 border border-cyan-500/30 shadow-2xl overflow-hidden space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  {card.scheme || 'RuPay NCMC'}
                </span>
                <h3 className="text-sm font-bold text-white">{card.issuerBank}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {card.cardStatus}
              </span>
            </div>

            <div className="py-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Masked Card Number</span>
              <p className="text-lg font-mono font-bold text-white tracking-widest mt-0.5">
                {card.maskedCardNumber}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Prepaid Balance</span>
                <p className="text-xl font-black text-cyan-300">₹{card.walletBalance?.toFixed(2)}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Valid Thru</span>
                <p className="text-xs font-mono text-slate-200 mt-0.5">{card.expiryDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Link
                to="/ncmc/recharge"
                className="flex-1 py-2 text-center rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition-all"
              >
                Top-Up (Demo)
              </Link>
              <Link
                to="/ncmc/transactions"
                className="flex-1 py-2 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
              >
                Statement
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Active Transit Pass Highlight */}
      {activePass && (
        <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-sm">{activePass.title}</h4>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                  {activePass.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {activePass.network} • {activePass.daysRemaining} Days Remaining
              </p>
            </div>
          </div>

          <Link
            to="/ncmc/passes"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-all"
          >
            <span>Turnstile QR & Renew</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 6. CUSTOMER PAYMENT HISTORY PAGE
// =========================================================================
export const CustomerPaymentHistoryPage = () => {
  const transactions = [
    { id: 'TXN-90812', service: 'Railway Booking (CSMT - PUNE)', date: '31 Oct 2026, 02:40 PM', amount: 1860, mode: 'UPI / Demo Sandbox', status: 'SUCCESS_SIMULATED' },
    { id: 'TXN-90811', service: 'MSRTC Shivneri Bus (Dadar - Swargate)', date: '29 Oct 2026, 11:15 AM', amount: 650, mode: 'RuPay Debit Card', status: 'SUCCESS_SIMULATED' },
    { id: 'TXN-90810', service: 'NCMC Transit Wallet Auto-Topup', date: '28 Oct 2026, 09:00 AM', amount: 500, mode: 'Net Banking', status: 'SUCCESS_SIMULATED' },
    { id: 'TXN-90809', service: 'Outstation Cab (Mumbai to Pune)', date: '25 Oct 2026, 07:30 AM', amount: 2450, mode: 'Corporate Account (Net-30)', status: 'SUCCESS_SIMULATED' },
    { id: 'TXN-90808', service: 'Airport Transfer (BKC to Terminal 2)', date: '20 Oct 2026, 06:15 PM', amount: 850, mode: 'UPI / Demo Sandbox', status: 'SUCCESS_SIMULATED' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-400" />
            <span>Payment History & Invoices</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Consolidated ledger of all demo transactions across cabs, trains, state buses and NCMC smart cards.
          </p>
        </div>

        <button
          onClick={() => alert('Consolidated GST tax invoice statement simulated.')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Statement</span>
        </button>
      </div>

      {/* Ledger Table */}
      <div className="bg-navy-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Service Category</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">{tx.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-200">{tx.service}</td>
                  <td className="py-3.5 px-4 text-slate-400">{tx.date}</td>
                  <td className="py-3.5 px-4 text-slate-300">{tx.mode}</td>
                  <td className="py-3.5 px-4 font-bold text-white">₹{tx.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Simulated Invoice for ${tx.id} downloaded.`)}
                      className="text-electric-400 hover:text-white font-semibold text-xs flex items-center gap-1 justify-end"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 7. CUSTOMER REFUND REQUESTS PAGE
// =========================================================================
export const CustomerRefundRequestsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [bookingRefInput, setBookingRefInput] = useState('');
  const [reasonInput, setReasonInput] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const [refunds, setRefunds] = useState([
    {
      id: 'REF-8891',
      bookingRef: 'DEMO-RAIL-8K92X',
      service: 'IRCTC Railway Reservation',
      amount: 1620,
      deduction: 240,
      date: '31 Oct 2026',
      status: 'PENDING_APPROVAL',
      reason: 'Change of schedule'
    },
    {
      id: 'REF-8840',
      bookingRef: 'DEMO-MSRTC-OLD34',
      service: 'MSRTC Shivneri Volvo AC',
      amount: 585,
      deduction: 65,
      date: '29 Oct 2026',
      status: 'PROCESSED_SIMULATED',
      reason: 'Flight arrived after scheduled departure'
    }
  ]);

  const handleSubmitRefund = (e) => {
    e.preventDefault();
    if (!bookingRefInput) return;
    const newRef = {
      id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingRef: bookingRefInput,
      service: 'Customer Initiated Cancellation',
      amount: 1450,
      deduction: 150,
      date: 'Just Now',
      status: 'PENDING_APPROVAL',
      reason: reasonInput || 'Trip cancelled by customer'
    };
    setRefunds([newRef, ...refunds]);
    setBookingRefInput('');
    setReasonInput('');
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-amber-400" />
            <span>Refund Requests & Claims</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track refund status for cancelled train tickets, state bus bookings or cab schedule amendments.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Refund Request</span>
        </button>
      </div>

      {/* Refunds List */}
      <div className="space-y-4">
        {refunds.map((refund) => (
          <div
            key={refund.id}
            className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">{refund.service}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    refund.status === 'PENDING_APPROVAL' 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {refund.status}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Refund ID: <span className="text-amber-400 font-semibold">{refund.id}</span> • Booking Ref: {refund.bookingRef}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-base font-black text-white">₹{refund.amount}</div>
                <span className="text-[10px] text-slate-400">Cancellation Deduction: ₹{refund.deduction}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
              <p>Reason: <span className="text-slate-200">{refund.reason}</span></p>
              <span className="text-[11px] font-mono">Initiated: {refund.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Raise Refund Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-navy-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Submit Refund Request</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedMessage ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center">
                Refund claim submitted for Super Admin review!
              </div>
            ) : (
              <form onSubmit={handleSubmitRefund} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Booking Reference ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DEMO-RAIL-8K92X or BK-10492"
                    value={bookingRefInput}
                    onChange={(e) => setBookingRefInput(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Reason for Cancellation</label>
                  <textarea
                    rows={3}
                    placeholder="Explain why the travel was modified or cancelled..."
                    value={reasonInput}
                    onChange={(e) => setReasonInput(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 text-[11px] text-slate-400">
                  Standard policy: Cancellations processed within 2-4 hours in demo simulation mode.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 8. CUSTOMER NOTIFICATIONS PAGE
// =========================================================================
export const CustomerNotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'Vande Bharat Express Platform Assigned',
      description: 'Your train 20706 CSMT Jalna Express is scheduled on Platform #8 at CSMT.',
      time: '15 mins ago',
      unread: true,
      category: 'RAILWAY'
    },
    {
      id: 2,
      title: 'MSRTC Mahila Samman Concession Active',
      description: '50% fare reduction applied successfully to Passenger Sunita Patil for Pune journey.',
      time: '2 hours ago',
      unread: true,
      category: 'MSRTC'
    },
    {
      id: 3,
      title: 'NCMC Card Balance Alert',
      description: 'Your secondary card (NCMC-IN-4921) balance is ₹240. Tap to top up before transit.',
      time: 'Yesterday',
      unread: false,
      category: 'NCMC'
    },
    {
      id: 4,
      title: 'Chauffeur Background Verification Complete',
      description: 'Chauffeur Rajesh Ghadge has completed annual defensive driving compliance certification.',
      time: '3 days ago',
      unread: false,
      category: 'SECURITY'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-electric-400" />
            <span>Travel Alerts & Notifications</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Realtime dispatch alerts, platform allocation notifications and concession reminders.
          </p>
        </div>

        <button
          onClick={() => alert('All notifications marked as read.')}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs self-start sm:self-auto transition-all"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
              item.unread
                ? 'bg-navy-900/90 border-electric-500/40'
                : 'bg-navy-900/50 border-slate-800'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-electric-400 mt-2 shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-white text-xs">{item.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 9. CUSTOMER SUPPORT TICKETS PAGE
// =========================================================================
export const CustomerSupportTicketsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('NCMC Transit Inquiry');
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-991',
      subject: 'Gundavali Gate 2 charged ₹30 twice',
      category: 'NCMC Transit',
      priority: 'HIGH',
      status: 'OPEN',
      date: 'Today, 10:15 AM'
    },
    {
      id: 'TKT-989',
      subject: 'When will simulated ₹1,620 reflect in source ledger?',
      category: 'Refund Inquiry',
      priority: 'MEDIUM',
      status: 'RESOLVED',
      date: '28 Oct 2026'
    }
  ]);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject) return;
    const newTkt = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      priority: 'MEDIUM',
      status: 'OPEN',
      date: 'Just Now'
    };
    setTickets([newTkt, ...tickets]);
    setSubject('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-cyan-400" />
            <span>Support & Grievances</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            24x7 passenger grievance resolution, chauffeur feedback and billing inquiries.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Grievance</span>
        </button>
      </div>

      <div className="space-y-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">{t.subject}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    t.status === 'OPEN'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Ticket ID: <span className="text-cyan-400 font-semibold">{t.id}</span> • Category: {t.category}
                </span>
              </div>

              <span className="text-xs text-slate-400 font-mono">{t.date}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Priority: <strong className="text-white">{t.priority}</strong></span>
              <button
                onClick={() => alert(`Support agent response: We have logged ${t.id} for investigation.`)}
                className="text-cyan-400 hover:text-white font-semibold flex items-center gap-1"
              >
                <span>View Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-navy-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-cyan-400" />
                <span>Create Support Ticket</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Summary of your inquiry..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="NCMC Transit Inquiry">NCMC Transit & Turnstile</option>
                  <option value="Railway Ticket Query">Railway Ticket Query</option>
                  <option value="MSRTC Schedule Query">MSRTC Schedule Query</option>
                  <option value="Cab Chauffeur Feedback">Cab & Chauffeur Feedback</option>
                  <option value="Billing & Refund">Billing & Refund</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide trip details, ticket ref or turnstile location..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
