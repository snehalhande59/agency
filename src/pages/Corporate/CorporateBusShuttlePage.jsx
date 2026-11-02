import React, { useState } from 'react';
import { 
  Bus, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  QrCode, 
  Calendar,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateBusShuttlePage = () => {
  const { routes, createCommuteBooking } = useCorporateStore();

  const [selectedRoute, setSelectedRoute] = useState('RT-15');
  const [selectedShift, setSelectedShift] = useState('Morning Shift (07:15 AM)');
  const [employeeName, setEmployeeName] = useState('Pooja Sharma');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const shuttleServices = [
    {
      id: 'SHUTTLE-01',
      title: 'Hinjawadi Tech Park Daily Shuttles',
      city: 'Pune',
      image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
      fleet: 'BharatBenz & Volvo 9600 AC Coaches (35 - 45 Seater)',
      routes: 'Wakad, Baner, Kothrud, Hadapsar, Magarpatta to Hinjawadi Phase 1, 2, 3',
      frequency: 'Every 15 mins during peak shifts',
      passTariff: 'Subsidized by Enterprise Employer'
    },
    {
      id: 'SHUTTLE-02',
      title: 'Mumbai BKC & Airoli Mindspace Feeder',
      city: 'Mumbai & Navi Mumbai',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      fleet: 'Force Urbania & Executive Mini Coaches (17 - 26 Seater)',
      routes: 'Borivali WEH, Thane Teen Hath Naka, Powai, Vashi to BKC Tower 4',
      frequency: 'Every 20 mins (07:00 AM - 11:00 AM & 05:00 PM - 09:30 PM)',
      passTariff: 'Zero Employee Fare (100% Retainer Covered)'
    },
    {
      id: 'SHUTTLE-03',
      title: 'Late Night Shift Escort Vans',
      city: 'Mumbai & Pune',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      fleet: 'Executive Tempo Travellers with Security Escort',
      routes: 'Door-to-door clustered drops across suburban sectors',
      frequency: 'Synchronized with 10:00 PM, 01:00 AM & 03:00 AM logouts',
      passTariff: 'Mandatory Safe Commute Protocol'
    }
  ];

  const handleBookShuttleSeat = (e) => {
    e.preventDefault();
    const newBooking = createCommuteBooking({
      employeeName: employeeName,
      serviceType: 'Corporate Bus Shuttle Seat',
      travelDate: new Date().toISOString().split('T')[0],
      shift: selectedShift,
      pickupLocation: 'Designated Shuttle Stop',
      dropLocation: 'Corporate Campus Main Gate',
      vehicleCategoryPreference: 'Shuttle Bus',
      specialInstructions: 'Monthly Shuttle Pass QR Reservation'
    });

    setBookingSuccess(newBooking);
  };

  return (
    <div className="space-y-8 text-[#153B5B]">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#153B5B] via-[#1b4b73] to-[#153B5B] p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold shadow-sm">
            <Bus className="w-4 h-4 text-[#3898D8]" />
            <span>High-Capacity Mass Commute Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            Corporate Bus &amp; Employee Shuttle Networks
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Reduce carbon emissions and commute costs with dedicated air-conditioned corporate buses, luxury Force Urbania vans, and fixed-stop scheduled campus shuttles.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
              <span>Dedicated Fixed Bus Corridors</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
              <span>QR Mobile Boarding Passes</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
              <span>Guaranteed Pushback Seats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shuttle Networks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shuttleServices.map((service) => (
          <div key={service.id} className="bg-white rounded-3xl border border-[#E5EDF5] overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#3898D8] text-[10px] font-bold shadow-sm">
                {service.city}
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#153B5B]">{service.title}</h3>
                <p className="text-xs text-[#64748B] mt-1">{service.fleet}</p>
                <div className="mt-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] text-xs space-y-1.5">
                  <div className="text-[11px] text-[#64748B]"><strong>Corridor:</strong> {service.routes}</div>
                  <div className="text-[11px] text-[#19A89A] font-semibold">Frequency: {service.frequency}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between text-xs">
                <span className="font-bold text-[#3898D8]">{service.passTariff}</span>
                <span className="text-xs font-semibold text-[#153B5B]">100% Reserved</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Shuttle Seat Booking Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
          <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#153B5B]">Reserve Corporate Shuttle Seat (Demo Pass)</h3>
            <p className="text-xs text-[#64748B]">Select your campus corridor stop and generate digital QR pass</p>
          </div>
        </div>

        {bookingSuccess ? (
          <div className="p-6 rounded-2xl bg-[#E6F7F5] border border-[#19A89A]/30 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#19A89A]/20 text-[#19A89A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#153B5B]">Shuttle Seat Reserved!</h4>
            <p className="text-xs text-[#19A89A] font-bold">Booking Reference: {bookingSuccess.id} • Boarding OTP: {bookingSuccess.boardingOtp}</p>
            <div className="p-4 bg-white rounded-xl inline-block border border-[#E5EDF5] shadow-sm text-xs font-mono text-[#153B5B]">
              <QrCode className="w-24 h-24 mx-auto text-[#153B5B] mb-2" />
              <span>PASS_ID_{bookingSuccess.id}</span>
            </div>
            <p className="text-xs text-[#64748B]">Show QR code to the shuttle driver terminal when boarding.</p>
            <button
              onClick={() => setBookingSuccess(null)}
              className="px-4 py-2 rounded-xl bg-[#3898D8] text-white text-xs font-bold"
            >
              Book Another Shuttle
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookShuttleSeat} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[#153B5B] font-bold mb-1">Employee Name</label>
              <input
                type="text"
                required
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold"
              />
            </div>

            <div>
              <label className="block text-[#153B5B] font-bold mb-1">Select Transit Route</label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold"
              >
                <option value="RT-15">Route #15: Navi Mumbai Tech Shuttle (24 Seats)</option>
                <option value="RT-12">Route #12: Western Suburbs Express (Innova Fleet)</option>
                <option value="RT-08">Route #08: Powai &amp; JVLR Metro Feeder (17 Seats)</option>
                <option value="RT-PUNE-01">Pune Corridor: Baner - Wakad to Hinjawadi</option>
              </select>
            </div>

            <div>
              <label className="block text-[#153B5B] font-bold mb-1">Shift Departure Time</label>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold"
              >
                <option value="Morning Shift (07:15 AM)">Morning Shift (07:15 AM Departure)</option>
                <option value="General Shift (08:15 AM)">General Shift (08:15 AM Departure)</option>
                <option value="Afternoon Shift (12:30 PM)">Afternoon Shift (12:30 PM Departure)</option>
                <option value="Night Shift (09:45 PM)">Night Shift (09:45 PM Departure)</option>
              </select>
            </div>

            <div className="sm:col-span-3 pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Generate Digital Shuttle Pass</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
