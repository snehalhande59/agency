import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRightLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Sparkles, 
  Luggage, 
  Coffee, 
  Clock, 
  FileText, 
  QrCode, 
  Printer, 
  ChevronRight, 
  Check, 
  X,
  CreditCard
} from 'lucide-react';
import { 
  AIRPORTS, 
  FLIGHTS_DATA, 
  REQUIRED_DOCUMENTS_GUIDELINES, 
  generateAirlinePnr 
} from '../../services/flight/flightService';
import { useBooking } from '../../context/BookingContext';

export const FlightBookingPage = () => {
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  // Search Filter State
  const [tripType, setTripType] = useState('one-way');
  const [fromCode, setFromCode] = useState('BOM');
  const [toCode, setToCode] = useState('DEL');
  const [departDate, setDepartDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [passengers, setPassengers] = useState(1);

  // Selected Flight for Booking Flow
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  // Passenger & Document Form State
  const [passengerName, setPassengerName] = useState('Snehal Hande');
  const [passengerEmail, setPassengerEmail] = useState('snehal.hande@nexus-enterprise.in');
  const [passengerPhone, setPassengerPhone] = useState('+91 98202 88410');
  const [gender, setGender] = useState('Female');
  const [docType, setDocType] = useState('Aadhaar Card');
  const [docNumber, setDocNumber] = useState('•••• •••• 8842');
  const [seatPref, setSeatPref] = useState('12A (Window)');
  const [mealPref, setMealPref] = useState('Vegetarian Gourmet (Jain / Hindu)');
  const [digiYatraEnabled, setDigiYatraEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter flights by selected routes
  const availableFlights = FLIGHTS_DATA.filter((f) => {
    const matchFrom = f.origin === fromCode || fromCode === 'ALL';
    const matchTo = f.dest === toCode || toCode === 'ALL';
    return matchFrom && matchTo;
  });

  const handleSwapAirports = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  const handleOpenBooking = (flight) => {
    setSelectedFlight(flight);
    setShowBookingModal(true);
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedPnr = generateAirlinePnr();
    const ticketData = {
      pnr: `${selectedFlight.airlineCode}-${generatedPnr}`,
      flightNumber: selectedFlight.flightNumber,
      airline: selectedFlight.airline,
      origin: `${selectedFlight.originCity} (${selectedFlight.origin})`,
      dest: `${selectedFlight.destCity} (${selectedFlight.dest})`,
      departTime: selectedFlight.departureTime,
      arriveTime: selectedFlight.arrivalTime,
      date: departDate,
      duration: selectedFlight.duration,
      aircraft: selectedFlight.aircraft,
      terminal: selectedFlight.terminal,
      passengerName,
      passengerEmail,
      passengerPhone,
      docType,
      docNumber,
      seat: seatPref,
      meal: mealPref,
      digiYatra: digiYatraEnabled,
      fare: selectedFlight.fare * passengers,
      baggage: selectedFlight.baggage,
      status: 'CONFIRMED'
    };

    setTimeout(() => {
      // Save into global user booking store
      createBooking({
        service: `Flight - ${selectedFlight.airline} (${selectedFlight.flightNumber})`,
        from: `${selectedFlight.originCity} (${selectedFlight.origin})`,
        to: `${selectedFlight.destCity} (${selectedFlight.dest})`,
        date: departDate,
        time: selectedFlight.departureTime,
        vehicle: `${selectedFlight.aircraft} • Seat ${seatPref}`,
        fare: `₹${(selectedFlight.fare * passengers).toLocaleString('en-IN')}`,
        status: 'Confirmed',
        driverName: `Capt. V. Sharma (${selectedFlight.airline})`,
        pnr: ticketData.pnr
      });

      setIsSubmitting(false);
      setShowBookingModal(false);
      setConfirmedTicket(ticketData);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Header & Trust Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E5EDF5] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEEFF] text-[#3898D8] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#19A89A]" />
              <span>IATA Certified Domestic &amp; International Airline Desk</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#153B5B] font-display">
              Flight Ticket Booking &amp; E-Check-in
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Compare non-stop schedules across Air India, IndiGo, Vistara &amp; Akasa Air with zero payment surge.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>DigiYatra Fast-Track Ready</span>
            </span>
          </div>
        </div>

        {/* 2. Flight Search Engine Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EDF5] shadow-sm space-y-6">
          <div className="flex items-center gap-4 border-b border-[#E5EDF5] pb-4">
            <button
              onClick={() => setTripType('one-way')}
              className={`text-xs sm:text-sm font-bold pb-2 transition-all relative ${
                tripType === 'one-way'
                  ? 'text-[#3898D8] border-b-2 border-[#3898D8]'
                  : 'text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              One-Way Flight
            </button>
            <button
              onClick={() => setTripType('round-trip')}
              className={`text-xs sm:text-sm font-bold pb-2 transition-all relative ${
                tripType === 'round-trip'
                  ? 'text-[#3898D8] border-b-2 border-[#3898D8]'
                  : 'text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              Round-Trip Flight
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Origin Airport */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[#3898D8] -rotate-45" />
                <span>Departure City (From)</span>
              </label>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-3 text-xs sm:text-sm font-bold text-[#153B5B] focus:border-[#3898D8] focus:bg-white transition-all"
              >
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code}) - {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex items-end justify-center pb-1">
              <button
                type="button"
                onClick={handleSwapAirports}
                className="p-3 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] border border-[#E5EDF5] transition-all"
                title="Swap origin and destination"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Airport */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[#19A89A] rotate-45" />
                <span>Arrival City (To)</span>
              </label>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-3 text-xs sm:text-sm font-bold text-[#153B5B] focus:border-[#3898D8] focus:bg-white transition-all"
              >
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code}) - {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Travel Date</span>
              </label>
              <input
                type="date"
                value={departDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-3 text-xs sm:text-sm font-bold text-[#153B5B] focus:border-[#3898D8] focus:bg-white transition-all"
              />
            </div>

            {/* Passengers & Class */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Class &amp; Seats</span>
              </label>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-3 text-xs sm:text-sm font-bold text-[#153B5B] focus:border-[#3898D8] focus:bg-white transition-all"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business Class</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Mandatory Documents & CISF Guidelines Checklist */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#EFF7FC] border border-[#E5EDF5] space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white text-[#3898D8] border border-[#E5EDF5] shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#153B5B]">
                Mandatory Airport Check-in Documents &amp; Guidelines (BCAS &amp; DGCA)
              </h3>
              <p className="text-[11px] sm:text-xs text-[#64748B]">
                Ensure you carry valid original documents for hassle-free entry at Indian airport security gates:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>1. Original Photo ID (Domestic)</span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                Aadhaar Card, Voter ID, Driving License, or Passport matching the exact name on ticket.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-[#3898D8] font-bold text-xs">
                <QrCode className="w-4 h-4 shrink-0" />
                <span>2. DigiYatra Biometric Gate</span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                Scan your QR at Mumbai T2 / Delhi T3 for contactless facial gate check-in in under 10 seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                <Luggage className="w-4 h-4 shrink-0" />
                <span>3. Cabin &amp; Check-in Baggage</span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                7 kg Cabin Bag + 15 kg/20 kg Check-in. Power banks must strictly be kept in Cabin Bags only.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Available Flights Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[#153B5B]">
              Available Flights ({fromCode} &rarr; {toCode})
            </h2>
            <span className="text-xs text-[#64748B] font-semibold">
              Showing {availableFlights.length > 0 ? availableFlights.length : FLIGHTS_DATA.length} scheduled services
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {(availableFlights.length > 0 ? availableFlights : FLIGHTS_DATA).map((f) => (
              <div
                key={f.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E5EDF5] hover:border-[#3898D8] shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Airline & Aircraft */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <img
                    src={f.logo}
                    alt={f.airline}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E5EDF5] shadow-2xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-[#153B5B] text-base">{f.airline}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-[#3898D8]">{f.flightNumber}</span>
                      <span className="text-[10px] text-[#64748B] font-mono">• {f.aircraft}</span>
                    </div>
                  </div>
                </div>

                {/* Timing & Nonstop Route */}
                <div className="flex-1 grid grid-cols-3 items-center text-center max-w-md mx-auto">
                  <div className="text-left">
                    <span className="text-lg sm:text-xl font-black text-[#153B5B] block">{f.departureTime}</span>
                    <span className="text-xs font-bold text-[#64748B]">{f.origin} ({f.originCity})</span>
                    <span className="text-[10px] text-[#94A3B8] block">{f.terminal.dep}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#64748B]">{f.duration}</span>
                    <div className="w-full flex items-center my-1">
                      <div className="w-2 h-2 rounded-full bg-[#3898D8]" />
                      <div className="flex-1 h-[2px] bg-[#E5EDF5]" />
                      <Plane className="w-3.5 h-3.5 text-[#3898D8] rotate-90" />
                      <div className="flex-1 h-[2px] bg-[#E5EDF5]" />
                      <div className="w-2 h-2 rounded-full bg-[#19A89A]" />
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600">Non-Stop</span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-black text-[#153B5B] block">{f.arrivalTime}</span>
                    <span className="text-xs font-bold text-[#64748B]">{f.dest} ({f.destCity})</span>
                    <span className="text-[10px] text-[#94A3B8] block">{f.terminal.arr}</span>
                  </div>
                </div>

                {/* Baggage & Meal Perks */}
                <div className="flex flex-col gap-1 text-xs text-[#64748B] lg:border-l lg:border-[#E5EDF5] lg:pl-6">
                  <div className="flex items-center gap-1.5">
                    <Luggage className="w-3.5 h-3.5 text-[#3898D8]" />
                    <span>Check-in: <strong className="text-[#153B5B]">{f.baggage.checkin}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-amber-600" />
                    <span>{f.mealIncluded ? <strong className="text-emerald-700">Meal Included</strong> : 'Buy on Board'}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">{f.seatsAvailable} Seats Left</span>
                </div>

                {/* Price & Book Button */}
                <div className="flex items-center lg:flex-col items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E5EDF5]">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">All-Inclusive Fare</span>
                    <span className="text-xl font-black text-[#3898D8]">₹{f.fare.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(f)}
                    className="px-6 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Select &amp; Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Booking Modal (Passenger Details & Travel Document Form) */}
      {showBookingModal && selectedFlight && (
        <div className="fixed inset-0 z-50 bg-[#153B5B]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E5EDF5] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95">
            <div className="p-5 sm:p-6 bg-[#EFF7FC] border-b border-[#E5EDF5] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#3898D8] uppercase tracking-wider block">
                  Passenger Document &amp; Reservation Details
                </span>
                <h3 className="text-lg font-black text-[#153B5B]">
                  {selectedFlight.airline} {selectedFlight.flightNumber} • {selectedFlight.origin} &rarr; {selectedFlight.dest}
                </h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 rounded-xl bg-white text-[#64748B] hover:text-[#153B5B] border border-[#E5EDF5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmReservation} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Passenger Full Name (as per Govt ID)</label>
                  <input
                    type="text"
                    required
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Email (for E-Ticket &amp; Boarding Pass)</label>
                  <input
                    type="email"
                    required
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Travel Verification Document</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  >
                    <option value="Aadhaar Card">Aadhaar Card (UIDAI Verified)</option>
                    <option value="Passport">Passport (Indian / International)</option>
                    <option value="Voter ID">Voter ID Card (ECI)</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Document Number / UID</label>
                  <input
                    type="text"
                    required
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Preferred Seat</label>
                  <select
                    value={seatPref}
                    onChange={(e) => setSeatPref(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  >
                    <option value="12A (Window)">12A (Window)</option>
                    <option value="12C (Aisle)">12C (Aisle)</option>
                    <option value="14F (Window)">14F (Window)</option>
                    <option value="1A (Extra Legroom Front)">1A (Extra Legroom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Meal Preference</label>
                  <select
                    value={mealPref}
                    onChange={(e) => setMealPref(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#153B5B]"
                  >
                    <option value="Vegetarian Gourmet (Jain / Hindu)">Vegetarian Gourmet (Jain / Hindu)</option>
                    <option value="Non-Vegetarian Chicken Meal">Non-Vegetarian Chicken Meal</option>
                    <option value="Fruit & Diabetic Meal">Fruit &amp; Diabetic Meal</option>
                  </select>
                </div>
              </div>

              {/* DigiYatra Opt-in */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Enable DigiYatra Contactless Facial Boarding at Airport</span>
                </div>
                <input
                  type="checkbox"
                  checked={digiYatraEnabled}
                  onChange={(e) => setDigiYatraEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#3898D8] rounded"
                />
              </div>

              {/* Fare Total and Confirm */}
              <div className="pt-4 border-t border-[#E5EDF5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Total Amount</span>
                  <span className="text-xl font-black text-[#3898D8]">₹{selectedFlight.fare.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  {isSubmitting ? (
                    <span>Issuing Airline PNR...</span>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Confirm &amp; Issue E-Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Confirmed E-Ticket Modal Screen */}
      {confirmedTicket && (
        <div className="fixed inset-0 z-50 bg-[#153B5B]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E5EDF5] shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                    Confirmed Airline E-Ticket
                  </span>
                  <h3 className="text-lg font-black text-[#153B5B]">
                    PNR: {confirmedTicket.pnr}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setConfirmedTicket(null)}
                className="p-2 rounded-xl bg-[#EFF7FC] text-[#64748B] hover:text-[#153B5B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ticket Card Details */}
            <div className="p-5 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] space-y-4">
              <div className="flex justify-between items-center text-xs border-b border-[#E5EDF5] pb-3">
                <div>
                  <span className="text-[10px] text-[#64748B] block">PASSENGER NAME</span>
                  <strong className="text-[#153B5B] text-sm">{confirmedTicket.passengerName}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#64748B] block">AIRLINE &amp; FLIGHT</span>
                  <strong className="text-[#3898D8] text-sm">{confirmedTicket.airline} ({confirmedTicket.flightNumber})</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#64748B] block">DEPARTURE</span>
                  <strong className="text-[#153B5B]">{confirmedTicket.origin}</strong>
                  <div className="text-[11px] text-[#3898D8] font-bold">{confirmedTicket.departTime} • {confirmedTicket.date}</div>
                  <div className="text-[10px] text-[#64748B]">{confirmedTicket.terminal.dep}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#64748B] block">ARRIVAL</span>
                  <strong className="text-[#153B5B]">{confirmedTicket.dest}</strong>
                  <div className="text-[11px] text-[#3898D8] font-bold">{confirmedTicket.arriveTime}</div>
                  <div className="text-[10px] text-[#64748B]">{confirmedTicket.terminal.arr}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5EDF5] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#64748B] block">SEAT</span>
                  <strong className="text-[#153B5B]">{confirmedTicket.seat}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">ID VERIFIED</span>
                  <strong className="text-[#153B5B]">{confirmedTicket.docType}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">DIGIYATRA</span>
                  <strong className="text-emerald-700">{confirmedTicket.digiYatra ? 'ACTIVE ✓' : 'NO'}</strong>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert(`E-Ticket for PNR ${confirmedTicket.pnr} downloaded! Saved to your dashboard.`);
                  setConfirmedTicket(null);
                  navigate('/dashboard/my-bookings');
                }}
                className="flex-1 py-3 rounded-xl bg-[#3898D8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print E-Ticket</span>
              </button>
              <button
                onClick={() => setConfirmedTicket(null)}
                className="px-5 py-3 rounded-xl bg-[#EFF7FC] text-[#153B5B] font-bold text-xs border border-[#E5EDF5]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
