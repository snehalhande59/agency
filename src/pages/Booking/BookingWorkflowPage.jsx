import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Car, 
  Compass, 
  Plane, 
  PlaneTakeoff, 
  Clock, 
  Sparkles, 
  Bus, 
  BusFront, 
  Users, 
  RefreshCw, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Printer, 
  Download, 
  Phone, 
  User, 
  Briefcase, 
  AlertCircle, 
  Tag, 
  QrCode,
  DollarSign,
  Fuel,
  Info
} from 'lucide-react';
import { MockRouteMap } from '../../components/booking/MockRouteMap';
import { 
  bookingWorkflowService, 
  BOOKING_WORKFLOWS, 
  HOURLY_PACKAGES 
} from '../../services/booking/bookingWorkflowService';
import { vehiclesData } from '../../data/mockData';
import { useBooking } from '../../context/BookingContext';

export const BookingWorkflowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  // 1. Detect service from query string (e.g. ?service=airport-pickup)
  const queryParams = new URLSearchParams(location.search);
  const initialServiceId = queryParams.get('service') || 'outstation-one-way';

  const [activeWorkflowId, setActiveWorkflowId] = useState(initialServiceId);
  const currentWorkflow = useMemo(() => {
    return bookingWorkflowService.getWorkflowById(activeWorkflowId);
  }, [activeWorkflowId]);

  // Workflow Steps: 1: Route, 2: Vehicles, 3: Passenger, 4: Review, 5: Payment, 6: Confirmed
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [pickup, setPickup] = useState(currentWorkflow.defaultPickup);
  const [drop, setDrop] = useState(currentWorkflow.defaultDrop);
  const [journeyDate, setJourneyDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('09:30 AM');
  const [passengerCount, setPassengerCount] = useState(currentWorkflow.defaultPassengers || 2);
  const [luggageCount, setLuggageCount] = useState(currentWorkflow.defaultLuggage || 2);
  const [flightNumber, setFlightNumber] = useState('6E-5321 (IndiGo)');
  const [selectedHourlyPackage, setSelectedHourlyPackage] = useState(HOURLY_PACKAGES[1]);
  const [promoCode, setPromoCode] = useState('LUXE200');
  const [promoApplied, setPromoApplied] = useState(true);

  // Passenger state
  const [passengerName, setPassengerName] = useState('Snehal Hande');
  const [passengerPhone, setPassengerPhone] = useState('+91 98202 88410');
  const [passengerEmail, setPassengerEmail] = useState('snehal.hande@nexus-enterprise.in');
  const [landmarkNotes, setLandmarkNotes] = useState('Near Gate 3 Main Entrance');

  // Selected Vehicle state
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Switch workflow when user clicks workflow tab
  const handleWorkflowChange = (wfId) => {
    setActiveWorkflowId(wfId);
    const wf = bookingWorkflowService.getWorkflowById(wfId);
    setPickup(wf.defaultPickup);
    setDrop(wf.defaultDrop);
    setPassengerCount(wf.defaultPassengers);
    setLuggageCount(wf.defaultLuggage);
    setSelectedVehicle(null);
    setCurrentStep(1);
  };

  // Compute estimated distance and route
  const routeEstimate = useMemo(() => {
    return bookingWorkflowService.estimateRouteData(pickup, drop);
  }, [pickup, drop]);

  // Filter vehicles matching current workflow
  const availableVehicles = useMemo(() => {
    return vehiclesData.filter((v) => currentWorkflow.allowedVehicleCategories.includes(v.category));
  }, [currentWorkflow]);

  // Auto-select first vehicle
  useEffect(() => {
    if (availableVehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(availableVehicles[0]);
    }
  }, [availableVehicles, selectedVehicle]);

  // Calculate fare breakdown for selected vehicle
  const fareBreakdown = useMemo(() => {
    if (!selectedVehicle) return null;
    return bookingWorkflowService.calculateItemizedFare({
      workflowId: activeWorkflowId,
      vehicle: selectedVehicle,
      distanceKm: routeEstimate.distanceKm,
      isRoundTrip: currentWorkflow.requiresReturnDate,
      hourlyPackage: currentWorkflow.supportsHourlyPackages ? selectedHourlyPackage : null,
      promoCode: promoApplied ? promoCode : ''
    });
  }, [selectedVehicle, activeWorkflowId, routeEstimate, currentWorkflow, selectedHourlyPackage, promoApplied, promoCode]);

  // Actions
  const handleProceedToVehicles = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleSelectVehicleAndProceed = (veh) => {
    setSelectedVehicle(veh);
    setCurrentStep(3);
  };

  const handleProceedToReview = (e) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const handleProceedToPayment = () => {
    setCurrentStep(5);
  };

  const handleCompleteDemoPayment = async () => {
    const newBooking = await createBooking({
      service: currentWorkflow.name,
      vehicleName: selectedVehicle.name,
      pickup,
      drop: currentWorkflow.supportsHourlyPackages ? selectedHourlyPackage.name : drop,
      date: journeyDate,
      time: pickupTime,
      passengers: passengerCount,
      fare: `₹${fareBreakdown?.totalFare?.toLocaleString()}`,
      passengerName,
      passengerPhone,
      driverName: 'Sanjay Pawar (4.9 ★)',
      driverPhone: '+91 98190 44210',
      vehicleNumber: `MH 12 BT ${Math.floor(1000 + Math.random() * 9000)}`
    });

    setConfirmedBookingData(newBooking);
    setCurrentStep(6);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Required Maps / Telematics Status Header */}
      <div className="bg-[#EFF7FC] border-b border-[#DCEEFF] text-[#153B5B] py-2.5 px-4 sticky top-16 z-30 backdrop-blur-md text-xs shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19A89A] animate-pulse" />
            <span className="font-extrabold uppercase tracking-wide font-mono text-[#153B5B]">
              SIMULATED ROUTE TELEMETRY &amp; DEMO DISPATCH
            </span>
          </div>
          <span className="text-[11px] text-[#64748B]">
            Maps API in demo mode. Actual chauffeur allocation requires connected telematics.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Module Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">
            Premium Chauffeur &amp; Fleet Booking Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            End-to-end interactive reservation workflow across 10 executive mobility services
          </p>
        </div>

        {/* 10 Workflow Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {BOOKING_WORKFLOWS.map((wf) => {
            const isActive = activeWorkflowId === wf.id;
            return (
              <button
                key={wf.id}
                type="button"
                onClick={() => handleWorkflowChange(wf.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#3898D8] text-white shadow-md'
                    : 'bg-white border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]'
                }`}
              >
                <span>{wf.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#EFF7FC] text-[#64748B]'
                }`}>
                  {wf.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
            {[
              { num: 1, label: 'Trip & Route' },
              { num: 2, label: 'Vehicle Selection' },
              { num: 3, label: 'Passenger Details' },
              { num: 4, label: 'Review Summary' },
              { num: 5, label: 'Demo Payment' },
              { num: 6, label: 'Dispatch Pass' }
            ].map((s) => {
              const isPast = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div
                  key={s.num}
                  className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-[#DCEEFF] border-[#3898D8] text-[#153B5B]'
                      : isPast
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'border-transparent text-[#64748B]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    isCurrent
                      ? 'bg-[#3898D8] text-white'
                      : isPast
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#EFF7FC] text-[#64748B]'
                  }`}>
                    {isPast ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
                  </span>
                  <span className="font-semibold truncate">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: TRIP PARAMETERS & MOCK MAP */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Booking Form Fields */}
            <form onSubmit={handleProceedToVehicles} className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3898D8]">
                      Step 1 • Service Parameters
                    </span>
                    <span className="text-xs font-bold text-[#153B5B]">— {currentWorkflow.name}</span>
                  </div>
                  <span className="text-[11px] text-[#64748B]">{currentWorkflow.tagline}</span>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#3898D8]" />
                    <span>Pickup Address / Landmark</span>
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    required
                    placeholder="Enter pickup address, hotel, or station..."
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>

                {/* Drop Location / Package Selector */}
                {currentWorkflow.supportsHourlyPackages ? (
                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Select Hourly Rental Package</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {HOURLY_PACKAGES.map((pkg) => (
                        <button
                          type="button"
                          key={pkg.id}
                          onClick={() => setSelectedHourlyPackage(pkg)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedHourlyPackage.id === pkg.id
                              ? 'bg-[#DCEEFF] border-[#3898D8] text-[#153B5B] shadow-sm'
                              : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#64748B] hover:border-[#3898D8]'
                          }`}
                        >
                          <div className="font-bold text-xs text-[#153B5B]">{pkg.name}</div>
                          <div className="text-[10px] text-[#64748B] mt-0.5">Unlimited City Stops</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#19A89A]" />
                      <span>Drop Destination / Airport Terminal</span>
                    </label>
                    <input
                      type="text"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      required
                      placeholder="Enter destination city, hotel, or airport terminal..."
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                    />
                  </div>
                )}

                {/* Dates & Pickup Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#3898D8]" />
                      <span>Journey Date</span>
                    </label>
                    <input
                      type="date"
                      value={journeyDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      required
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] font-mono [color-scheme:light]"
                    />
                  </div>

                  {currentWorkflow.requiresReturnDate ? (
                    <div>
                      <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-[#19A89A]" />
                        <span>Return Journey Date</span>
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        min={journeyDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        required
                        className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] font-mono [color-scheme:light]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Pickup Time</span>
                      </label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        required
                        className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* Capacity & Luggage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#3898D8]" />
                      <span>Passenger Count</span>
                    </label>
                    <div className="flex items-center bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                        className="w-8 h-8 rounded-lg bg-[#EFF7FC] text-[#153B5B] font-bold text-sm hover:bg-[#DCEEFF] transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold font-mono text-[#153B5B] text-sm">
                        {passengerCount} Passengers
                      </span>
                      <button
                        type="button"
                        onClick={() => setPassengerCount(Math.min(50, passengerCount + 1))}
                        className="w-8 h-8 rounded-lg bg-[#EFF7FC] text-[#153B5B] font-bold text-sm hover:bg-[#DCEEFF] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                      <span>Luggage Requirements</span>
                    </label>
                    <div className="flex items-center bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => setLuggageCount(Math.max(0, luggageCount - 1))}
                        className="w-8 h-8 rounded-lg bg-[#EFF7FC] text-[#153B5B] font-bold text-sm hover:bg-[#DCEEFF] transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold font-mono text-[#153B5B] text-sm">
                        {luggageCount} Suitcases
                      </span>
                      <button
                        type="button"
                        onClick={() => setLuggageCount(Math.min(45, luggageCount + 1))}
                        className="w-8 h-8 rounded-lg bg-[#EFF7FC] text-[#153B5B] font-bold text-sm hover:bg-[#DCEEFF] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Flight Number for Airport Workflows */}
                {currentWorkflow.requiresFlightNumber && (
                  <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#DCEEFF] space-y-2">
                    <label className="block text-xs font-semibold text-[#153B5B] flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-[#3898D8]" />
                      <span>Flight Number (for Automated Delay Tracking)</span>
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="e.g. 6E-5321 or AI-882"
                      required
                      className="w-full bg-white border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] font-mono"
                    />
                    <span className="text-[10px] text-[#64748B]">
                      Chauffeur timing automatically adjusts if your flight is delayed. Zero wait surcharge.
                    </span>
                  </div>
                )}

                {/* Submit Step 1 Button */}
                <div className="pt-4 border-t border-[#E5EDF5] flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>View Available Vehicles</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>

              </div>
            </form>

            {/* Right Column: Mock Route Map Preview */}
            <div className="lg:col-span-5 space-y-4">
              <MockRouteMap
                pickup={pickup}
                drop={currentWorkflow.supportsHourlyPackages ? selectedHourlyPackage.name : drop}
                distanceKm={routeEstimate.distanceKm}
                duration={routeEstimate.duration}
                highway={routeEstimate.highway}
                isRoundTrip={currentWorkflow.requiresReturnDate}
              />

              <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] text-xs text-[#64748B] space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-[#153B5B] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#19A89A]" />
                  <span>Guaranteed Upfront Pricing</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  All outstation quotes include vehicle rental, driver allowance, state taxes, and toll estimations. Zero unexpected billing on highway journeys.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: VEHICLE SELECTION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5EDF5]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="p-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:bg-[#DCEEFF] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-[#153B5B] font-display">
                    Select Your Vehicle
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    {availableVehicles.length} vehicle categories available for {currentWorkflow.name}
                  </p>
                </div>
              </div>

              <div className="text-xs text-[#64748B] hidden sm:block">
                Route: <strong className="text-[#153B5B]">{routeEstimate.distanceKm} KM</strong> • {routeEstimate.duration}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableVehicles.map((veh) => {
                const estBreakdown = bookingWorkflowService.calculateItemizedFare({
                  workflowId: activeWorkflowId,
                  vehicle: veh,
                  distanceKm: routeEstimate.distanceKm,
                  isRoundTrip: currentWorkflow.requiresReturnDate,
                  hourlyPackage: currentWorkflow.supportsHourlyPackages ? selectedHourlyPackage : null,
                  promoCode: promoApplied ? promoCode : ''
                });

                const isSelected = selectedVehicle?.id === veh.id;

                return (
                  <div
                    key={veh.id}
                    className={`rounded-3xl bg-white border overflow-hidden flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-[#3898D8] shadow-xl shadow-[#3898D8]/10 scale-[1.01]'
                        : 'border-[#E5EDF5] hover:border-[#3898D8]'
                    }`}
                  >
                    <div>
                      {/* Vehicle Image */}
                      <div className="relative h-44 w-full overflow-hidden bg-[#EFF7FC]">
                        <img
                          src={veh.image}
                          alt={veh.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <span className="absolute top-3 left-3 bg-[#3898D8] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                          {veh.category}
                        </span>
                        <span className="absolute top-3 right-3 bg-white/90 text-[#153B5B] text-[10px] font-mono px-2 py-0.5 rounded border border-[#E5EDF5]">
                          {veh.pricePerKm}
                        </span>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-[#153B5B]">{veh.name}</h3>
                          <div className="text-xs text-[#64748B] mt-0.5">{veh.models}</div>
                        </div>

                        {/* Capacities */}
                        <div className="flex items-center gap-4 text-xs text-[#153B5B] pt-1 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#3898D8]" />
                            <span>{veh.passengers} Seats</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                            <span>{veh.luggage}</span>
                          </span>
                          <span>•</span>
                          <span className="text-[#19A89A] font-bold">Dual AC</span>
                        </div>

                        {/* Features */}
                        <div className="space-y-1 text-xs text-[#64748B] border-t border-[#E5EDF5] pt-3">
                          {veh.features?.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-[#19A89A] shrink-0" />
                              <span className="text-[11px] font-medium">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Fare & Action */}
                    <div className="p-6 pt-0">
                      <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-between mb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#64748B] block">Total Est. Fare</span>
                          <div className="text-xl font-black text-[#153B5B] font-mono flex items-center gap-0.5">
                            <span className="text-[#3898D8]">₹</span>
                            <span>{estBreakdown.totalFare.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#19A89A] font-bold bg-[#E6F7F5] px-2 py-0.5 rounded border border-[#19A89A]/30">
                          Tolls &amp; GST Included
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectVehicleAndProceed(veh)}
                        className="w-full py-3 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <span>Select Vehicle &amp; Continue</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: PASSENGER PARTICULARS */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="p-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:bg-[#DCEEFF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-[#153B5B] font-display">
                  Passenger Particulars &amp; Notes
                </h2>
                <p className="text-xs text-[#64748B]">
                  Vehicle: <strong className="text-[#3898D8]">{selectedVehicle?.name}</strong> • {currentWorkflow.name}
                </p>
              </div>
            </div>

            <form onSubmit={handleProceedToReview} className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#3898D8]" />
                  <span>Lead Passenger Full Name</span>
                </label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  required
                  placeholder="e.g. Snehal Hande"
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#3898D8]" />
                    <span>Contact Phone (+91)</span>
                  </label>
                  <input
                    type="tel"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    required
                    placeholder="+91 98202 88410"
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#153B5B] mb-1.5">
                    Email Address (for Digital Voucher)
                  </label>
                  <input
                    type="email"
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    required
                    placeholder="snehal@example.com"
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#153B5B] mb-1.5">
                  Pickup Landmark &amp; Driver Special Instructions
                </label>
                <textarea
                  rows="3"
                  value={landmarkNotes}
                  onChange={(e) => setLandmarkNotes(e.target.value)}
                  placeholder="e.g. Near Gate 3 building lobby, extra boot space needed for golf kit..."
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5EDF5] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-[#64748B] hover:text-[#153B5B] transition-colors"
                >
                  Back to Vehicles
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Review Booking Summary</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: REVIEW & SUMMARY */}
        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="p-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:bg-[#DCEEFF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-[#153B5B] font-display">
                  Review Travel Summary
                </h2>
                <p className="text-xs text-[#64748B]">
                  Verify journey parameters, chauffeur dispatch details, and transparent billing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Itinerary Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3898D8] font-mono">
                      {currentWorkflow.name}
                    </span>
                    <span className="text-xs text-[#64748B]">{journeyDate} at {pickupTime}</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block">Pickup Location</span>
                      <span className="font-bold text-[#153B5B] text-sm">{pickup}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block">Destination</span>
                      <span className="font-bold text-[#153B5B] text-sm">
                        {currentWorkflow.supportsHourlyPackages ? selectedHourlyPackage.name : drop}
                      </span>
                    </div>

                    {currentWorkflow.requiresReturnDate && (
                      <div>
                        <span className="text-[10px] text-[#64748B] uppercase font-bold block">Return Date</span>
                        <span className="font-bold text-[#19A89A]">{returnDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between text-xs text-[#64748B]">
                    <span>Selected Vehicle:</span>
                    <strong className="text-[#153B5B]">{selectedVehicle?.name}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>Lead Passenger:</span>
                    <strong className="text-[#153B5B]">{passengerName} ({passengerPhone})</strong>
                  </div>
                </div>

                {/* Simulated Chauffeur Card */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block">Simulated Chauffeur Allocation</span>
                    <div className="font-bold text-[#153B5B] text-sm mt-0.5">Sanjay Pawar (4.9 ★ Rating)</div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">Verified Chauffeur • Police Cleared</div>
                  </div>
                  <span className="text-[10px] text-[#3898D8] bg-[#DCEEFF] px-2.5 py-1 rounded-full border border-[#3898D8]/30 font-mono font-bold">
                    DEMO DISPATCH
                  </span>
                </div>
              </div>

              {/* Right Column: Transparent Billing */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider pb-2 border-b border-[#E5EDF5]">
                    Transparent Itemized Billing
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#64748B]">
                    <div className="flex justify-between">
                      <span>Base Rental ({fareBreakdown?.billableDistance} KM):</span>
                      <span className="font-mono font-semibold text-[#153B5B]">₹{fareBreakdown?.baseFare}</span>
                    </div>

                    {fareBreakdown?.driverAllowance > 0 && (
                      <div className="flex justify-between">
                        <span>Chauffeur Allowance:</span>
                        <span className="font-mono font-semibold text-[#153B5B]">₹{fareBreakdown?.driverAllowance}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Tolls &amp; State Permit:</span>
                      <span className="font-mono font-semibold text-[#153B5B]">₹{fareBreakdown?.tollEstimate}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST (5% Passenger Transport):</span>
                      <span className="font-mono font-semibold text-[#153B5B]">₹{fareBreakdown?.gstAmount}</span>
                    </div>

                    {fareBreakdown?.discount > 0 && (
                      <div className="flex justify-between text-[#19A89A] font-bold">
                        <span>Promo Code ({promoCode}):</span>
                        <span className="font-mono">-₹{fareBreakdown?.discount}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#E5EDF5] flex justify-between items-center text-sm font-bold text-[#153B5B]">
                      <span>Net Total Payable:</span>
                      <span className="font-mono text-xl text-[#3898D8] font-black">
                        ₹{fareBreakdown?.totalFare?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Promo Box */}
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#153B5B]">
                      <Tag className="w-3.5 h-3.5 text-[#3898D8]" />
                      <span className="font-mono font-bold text-[#3898D8]">{promoCode}</span>
                    </div>
                    <span className="text-[10px] text-[#19A89A] font-bold">APPLIED (₹200 Off)</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="w-full py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-white" />
                    <span>Proceed to Demo Payment</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 5: DEMO PAYMENT */}
        {currentStep === 5 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="p-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:bg-[#DCEEFF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-[#153B5B] font-display">
                  Simulated Payment Checkout
                </h2>
                <p className="text-xs text-[#64748B]">
                  Total Amount: <strong className="font-mono text-[#3898D8]">₹{fareBreakdown?.totalFare?.toLocaleString()}</strong>
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>DEMO PAYMENT:</strong> No real bank charges occur. Simulated payment confirmation generates your travel voucher.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#153B5B] mb-3">
                  Choose Demo Payment Instrument
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-[#DCEEFF] border-[#3898D8] text-[#153B5B] shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#64748B] hover:border-[#3898D8]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#153B5B]">Instant UPI</div>
                    <div className="text-[10px] text-[#64748B] mt-1">GPay, PhonePe, Paytm</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      paymentMethod === 'CARD'
                        ? 'bg-[#DCEEFF] border-[#3898D8] text-[#153B5B] shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#64748B] hover:border-[#3898D8]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#153B5B]">Corporate Card</div>
                    <div className="text-[10px] text-[#64748B] mt-1">Visa, RuPay, Amex</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NET30')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      paymentMethod === 'NET30'
                        ? 'bg-[#DCEEFF] border-[#3898D8] text-[#153B5B] shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#64748B] hover:border-[#3898D8]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#153B5B]">Enterprise Net-30</div>
                    <div className="text-[10px] text-[#64748B] mt-1">Monthly Billing Invoice</div>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] text-xs text-[#153B5B]">
                <span className="font-mono text-[#3898D8] font-bold block mb-1">Simulated VPA: passenger@okhdfcbank</span>
                <span className="text-[11px] text-[#64748B]">Zero sensitive banking passwords requested. Sandbox tokenized verification.</span>
              </div>

              <button
                type="button"
                onClick={handleCompleteDemoPayment}
                className="w-full py-4 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>Simulate Payment &amp; Dispatch Ride (₹{fareBreakdown?.totalFare?.toLocaleString()})</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION & DISPATCH PASS */}
        {currentStep === 6 && confirmedBookingData && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Top Success Banner */}
            <div className="p-6 rounded-3xl bg-[#E6F7F5] border border-[#19A89A]/30 text-center space-y-2 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#19A89A]/20 text-[#19A89A] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
                Chauffeur Ride Reserved Successfully!
              </h2>
              <div className="text-xs text-[#19A89A] font-mono font-bold">
                Booking ID: <strong className="text-[#153B5B] underline">{confirmedBookingData.id}</strong> • Simulated Dispatch
              </div>
            </div>

            {/* Travel Voucher Card */}
            <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5EDF5] gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#3898D8] tracking-wider">Service Type</span>
                  <div className="text-base font-bold text-[#153B5B]">{confirmedBookingData.service}</div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Date &amp; Pickup Time</span>
                  <div className="text-sm font-bold text-[#153B5B] font-mono">
                    {confirmedBookingData.date} at {confirmedBookingData.time}
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5]">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Pickup</span>
                  <div className="font-bold text-[#153B5B] text-sm">{confirmedBookingData.from}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5]">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">Destination</span>
                  <div className="font-bold text-[#153B5B] text-sm">{confirmedBookingData.to}</div>
                </div>
              </div>

              {/* Chauffeur & Vehicle Allocation */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">Allocated Chauffeur</span>
                  <div className="text-base font-bold text-[#153B5B] mt-0.5">{confirmedBookingData.driverName}</div>
                  <div className="text-xs font-mono text-[#3898D8] font-semibold mt-0.5">{confirmedBookingData.driverPhone}</div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">Vehicle Assigned</span>
                  <div className="text-sm font-bold text-[#153B5B] mt-0.5">{confirmedBookingData.vehicle}</div>
                  <div className="text-xs font-mono text-amber-600 font-bold mt-0.5">{confirmedBookingData.vehicleNumber}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#E5EDF5] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] font-semibold text-xs flex items-center gap-1.5 border border-[#E5EDF5] transition-colors"
                  >
                    <Printer className="w-4 h-4 text-[#3898D8]" />
                    <span>Print Voucher</span>
                  </button>

                  <Link
                    to="/dashboard/my-bookings"
                    className="px-4 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <span>View in Trip History</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setConfirmedBookingData(null);
                  }}
                  className="text-xs text-[#64748B] hover:text-[#3898D8] underline"
                >
                  Book Another Journey
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
