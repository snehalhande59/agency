import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Phone, 
  Bell, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  QrCode, 
  ArrowRight, 
  Star, 
  Send, 
  Compass, 
  Navigation,
  FileText,
  KeyRound,
  Building2,
  Award
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateEmployeePortal = () => {
  const { 
    currentDemoUser, 
    corporateBookings, 
    shifts, 
    createCommuteBooking, 
    triggerEmergencySos, 
    rateCompletedTrip 
  } = useCorporateStore();

  const [activeTab, setActiveTab] = useState('ACTIVE');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBookingForRating, setSelectedBookingForRating] = useState(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingFeedback, setRatingFeedback] = useState('Very polite chauffeur, spotless car, and on-time pickup.');
  const [sosSuccess, setSosSuccess] = useState(false);

  // Form states
  const [serviceType, setServiceType] = useState('Daily Office Pickup');
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [shiftTime, setShiftTime] = useState('Morning Shift (08:30 AM)');
  const [pickupLocation, setPickupLocation] = useState(currentDemoUser.pickupAddress || 'Lokhandwala Circle, Andheri West, Mumbai');
  const [dropLocation, setDropLocation] = useState(currentDemoUser.dropAddress || 'Tower 4, Nexus Global Hub, BKC, Mumbai');
  const [vehicleCategory, setVehicleCategory] = useState('Prime Sedan');
  const [specialInstructions, setSpecialInstructions] = useState('Need boot space for 2 luggage bags and laptop backpack.');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  // Filter employee's own bookings
  const myBookings = corporateBookings.filter(
    (b) => b.employeeId === (currentDemoUser.employeeId || 'EMP-8842') || b.employeeName.toLowerCase().includes('pooja')
  );

  const activeBooking = myBookings.find(
    (b) => b.status === 'DISPATCHED_ASSIGNED' || b.status === 'EN_ROUTE' || b.status === 'ARRIVED_PICKUP' || b.status === 'BOARDED_IN_TRANSIT' || b.status === 'PENDING_HR_APPROVAL' || b.status === 'APPROVED_AWAITING_DISPATCH'
  ) || myBookings[0];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const created = createCommuteBooking({
      employeeId: currentDemoUser.employeeId || 'EMP-8842',
      employeeName: currentDemoUser.name || 'Pooja Sharma',
      employeePhone: currentDemoUser.phone || '+91 98202 11094',
      department: currentDemoUser.department || 'Engineering',
      serviceType,
      travelDate,
      shift: shiftTime,
      pickupLocation,
      dropLocation,
      vehicleCategoryPreference: vehicleCategory,
      specialInstructions
    });

    setFormSuccessMessage(`Commute request ${created.id} submitted! Routing to HR Admin Sunita Deshmukh for approval.`);
    setTimeout(() => {
      setFormSuccessMessage('');
      setShowBookingModal(false);
    }, 2500);
  };

  const handleSosTrigger = () => {
    if (!window.confirm('Simulate 24/7 Corporate Emergency SOS alert for this trip? This sends immediate high-priority alerts to HR and Transport Operations.')) return;
    triggerEmergencySos(activeBooking ? activeBooking.id : 'CORP-BK-1081', 'Simulated In-Trip Emergency SOS pressed by employee via mobile app');
    setSosSuccess(true);
    setTimeout(() => setSosSuccess(false), 5000);
  };

  const submitRating = (e) => {
    e.preventDefault();
    if (selectedBookingForRating) {
      rateCompletedTrip(selectedBookingForRating.id, ratingScore, ratingFeedback);
    }
    setShowRatingModal(false);
    setSelectedBookingForRating(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING_HR_APPROVAL':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">Pending HR Approval</span>;
      case 'APPROVED_AWAITING_DISPATCH':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">HR Approved / Queued Dispatch</span>;
      case 'DISPATCHED_ASSIGNED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">Vehicle Assigned</span>;
      case 'EN_ROUTE':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Chauffeur En Route</span>;
      case 'ARRIVED_PICKUP':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">Arrived at Gate</span>;
      case 'BOARDED_IN_TRANSIT':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-[#19A89A] border border-teal-200">In Transit</span>;
      case 'TRIP_COMPLETED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Completed &amp; Billed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. Employee Digital ID & Quick Status Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={currentDemoUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"} 
              alt={currentDemoUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#3898D8] shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Active Corporate Commuter" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
                {currentDemoUser.name || 'Pooja Sharma'}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF] px-2 py-0.5 rounded font-mono">
                {currentDemoUser.employeeId || 'EMP-8842'}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">{currentDemoUser.title || 'Senior Software Engineer'}</p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#64748B] mt-1.5">
              <span>Department: <strong className="text-[#153B5B]">{currentDemoUser.department || 'Engineering'}</strong></span>
              <span>•</span>
              <span>Cost Centre: <strong className="text-[#3898D8] font-mono">CC-ENG-401</strong></span>
              <span>•</span>
              <span>Shift: <strong className="text-[#19A89A]">General (09:30 AM - 06:30 PM)</strong></span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowBookingModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md shadow-[#3898D8]/20 transition-all flex items-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>Book Next Commute</span>
          </button>
          <button
            onClick={handleSosTrigger}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs transition-all flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Simulate Emergency SOS</span>
          </button>
        </div>
      </div>

      {/* SOS Alert notification banner if triggered */}
      {sosSuccess && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />
            <div>
              <strong className="block font-bold">Simulated Emergency SOS Activated!</strong>
              <span>High priority alert dispatched to Nexus Corporate Command Center, HR, and assigned driver.</span>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-rose-200/60 px-2 py-1 rounded font-bold">ACKNOWLEDGED</span>
        </div>
      )}

      {/* 2. Commute Stat KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Monthly Quota</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-[#153B5B]">38 / 44</span>
            <span className="text-xs font-bold text-[#19A89A]">6 Left</span>
          </div>
          <div className="w-full bg-[#E5EDF5] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#19A89A] h-full rounded-full" style={{ width: '86%' }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Completed Trips</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-[#3898D8]">38</span>
            <span className="text-xs font-bold text-[#64748B]">100% On-Time</span>
          </div>
          <p className="text-[10px] text-[#64748B] mt-2">Zero missed pickups this quarter</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Safety Score</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-[#19A89A]">100%</span>
            <ShieldCheck className="w-4 h-4 text-[#19A89A]" />
          </div>
          <p className="text-[10px] text-[#64748B] mt-2">Verified GPS &amp; Night Escort</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Carbon Offset</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-[#153B5B]">48.2 kg</span>
            <span className="text-xs font-bold text-emerald-600">Saved</span>
          </div>
          <p className="text-[10px] text-[#64748B] mt-2">Shared corporate EV / CNG fleet</p>
        </div>
      </div>

      {/* 3. Live Commute Boarding Pass & Telemetry Tracker (If active booking exists) */}
      {activeBooking && (
        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5EDF5] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3898D8]">Live Commute Pass</span>
                <span className="font-mono text-xs font-bold text-[#64748B]">({activeBooking.id})</span>
              </div>
              <h2 className="text-lg font-black text-[#153B5B] mt-0.5">{activeBooking.serviceType}</h2>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(activeBooking.status)}
              <div className="bg-[#EFF7FC] px-3 py-1.5 rounded-xl border border-[#DCEEFF] text-right">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Boarding Pass OTP</span>
                <span className="text-base font-black font-mono text-[#3898D8] tracking-widest">{activeBooking.boardingOtp}</span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#3898D8] text-white flex items-center justify-center font-bold text-xs mb-1">
                ✓
              </div>
              <span className="font-bold text-[#153B5B] text-[11px]">Requested</span>
              <span className="text-[10px] text-[#64748B]">HR Review</span>
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1 ${
                activeBooking.status !== 'PENDING_HR_APPROVAL' ? 'bg-[#3898D8] text-white' : 'bg-[#E5EDF5] text-[#64748B]'
              }`}>
                {activeBooking.status !== 'PENDING_HR_APPROVAL' ? '✓' : '2'}
              </div>
              <span className="font-bold text-[#153B5B] text-[11px]">Approved</span>
              <span className="text-[10px] text-[#64748B]">By Sunita D.</span>
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1 ${
                activeBooking.assignedVehicle !== 'Unallocated' ? 'bg-[#3898D8] text-white' : 'bg-[#E5EDF5] text-[#64748B]'
              }`}>
                {activeBooking.assignedVehicle !== 'Unallocated' ? '✓' : '3'}
              </div>
              <span className="font-bold text-[#153B5B] text-[11px]">Assigned</span>
              <span className="text-[10px] text-[#64748B]">Cab Dispatched</span>
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1 ${
                activeBooking.driverStatus === 'BOARDED' || activeBooking.driverStatus === 'TRIP_COMPLETED' ? 'bg-[#19A89A] text-white' : 'bg-[#E5EDF5] text-[#64748B]'
              }`}>
                {activeBooking.driverStatus === 'BOARDED' || activeBooking.driverStatus === 'TRIP_COMPLETED' ? '✓' : '4'}
              </div>
              <span className="font-bold text-[#153B5B] text-[11px]">Boarded</span>
              <span className="text-[10px] text-[#64748B]">OTP Verified</span>
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1 ${
                activeBooking.status === 'TRIP_COMPLETED' ? 'bg-emerald-600 text-white' : 'bg-[#E5EDF5] text-[#64748B]'
              }`}>
                {activeBooking.status === 'TRIP_COMPLETED' ? '✓' : '5'}
              </div>
              <span className="font-bold text-[#153B5B] text-[11px]">Completed</span>
              <span className="text-[10px] text-[#64748B]">Office Drop</span>
            </div>
          </div>

          {/* Chauffeur and Route Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Assigned Chauffeur &amp; Vehicle</span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#153B5B]">{activeBooking.assignedDriver}</h4>
                  <p className="text-xs text-[#64748B]">Driver Contact: <strong className="text-[#19A89A] font-mono">+91 98190 22345</strong></p>
                </div>
                <span className="px-2.5 py-1 rounded bg-white border border-[#E5EDF5] text-xs font-mono font-bold text-[#153B5B]">
                  {activeBooking.assignedVehicle}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[#E5EDF5] text-xs text-[#64748B]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Commercial Badge, Police Background Verified</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">Pickup &amp; Drop Locality</span>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3898D8] mt-1 shrink-0" />
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Pickup Locality</span>
                    <strong className="text-[#153B5B]">{activeBooking.pickupLocation}</strong>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#19A89A] mt-1 shrink-0" />
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Drop Office</span>
                    <strong className="text-[#153B5B]">{activeBooking.dropLocation}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tabs: My Commute Requests & History */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EDF5]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('ACTIVE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ACTIVE'
                  ? 'bg-[#3898D8] text-white shadow-sm'
                  : 'bg-[#EFF7FC] text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              My Commute Requests ({myBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('POLICY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'POLICY'
                  ? 'bg-[#3898D8] text-white shadow-sm'
                  : 'bg-[#EFF7FC] text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              Company Transport Policy
            </button>
          </div>
        </div>

        {activeTab === 'ACTIVE' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] font-bold border-b border-[#E5EDF5]">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Service &amp; Shift</th>
                  <th className="py-3 px-4">Travel Date</th>
                  <th className="py-3 px-4">Vehicle &amp; Chauffeur</th>
                  <th className="py-3 px-4">Boarding OTP</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EDF5]">
                {myBookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#3898D8]">
                      {bk.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-[#153B5B] block">{bk.serviceType}</strong>
                      <span className="text-[11px] text-[#64748B]">{bk.shift}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#153B5B]">
                      {bk.travelDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[#153B5B] font-semibold block">{bk.assignedVehicle}</span>
                      <span className="text-[11px] text-[#64748B]">{bk.assignedDriver}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#19A89A]">
                      {bk.boardingOtp}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(bk.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {bk.status === 'TRIP_COMPLETED' ? (
                        <button
                          onClick={() => {
                            setSelectedBookingForRating(bk);
                            setShowRatingModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] font-bold text-[11px] border border-[#DCEEFF] transition-all inline-flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 fill-current text-amber-400" />
                          <span>{bk.rating ? `Rated ${bk.rating}★` : 'Rate Trip'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleSosTrigger}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-[11px] font-bold border border-rose-200 transition-all"
                        >
                          SOS
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#153B5B]">Nexus Corporate Mobility Guidelines</h3>
            <ul className="space-y-2.5 text-[#64748B]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Shift Cutoff:</strong> Commute requests for morning shifts must be submitted before 08:00 PM on the previous day.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Female Commuter Safety:</strong> Mandatory security guard escort accompanied for all drops between 08:00 PM and 06:00 AM. Chauffeur stays at pickup/drop until employee enters residential gate safely.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Boarding Verification:</strong> Always share your 4-digit digital OTP with the chauffeur upon boarding. Never board without confirming license plate MH match.</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 5. Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white border border-[#E5EDF5] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#153B5B]">
            <div className="flex items-center justify-between p-5 border-b border-[#E5EDF5] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#153B5B]">Book Employee Commute</h3>
                  <p className="text-xs text-[#64748B]">Official corporate cab request with automated HR workflow</p>
                </div>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 overflow-y-auto space-y-4">
              {formSuccessMessage ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  {formSuccessMessage}
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Service Type</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                  >
                    <option value="Daily Office Pickup">Daily Office Pickup</option>
                    <option value="Evening Office Drop">Evening Office Drop</option>
                    <option value="Late Night Office Drop (Past 09:00 PM)">Late Night Office Drop (Past 09:00 PM)</option>
                    <option value="Inter-Campus Transfer (BKC to Pune)">Inter-Campus Transfer (BKC to Pune)</option>
                    <option value="Airport Transfer (BOM Terminal 2)">Airport Transfer (BOM Terminal 2)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Shift Schedule</label>
                  <select
                    value={shiftTime}
                    onChange={(e) => setShiftTime(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                  >
                    <option value="Morning Shift (08:30 AM)">Morning Shift (08:30 AM)</option>
                    <option value="General Shift (10:00 AM)">General Shift (10:00 AM)</option>
                    <option value="Evening Return (06:30 PM)">Evening Return (06:30 PM)</option>
                    <option value="Night Shift (09:30 PM)">Night Shift (09:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153B5B] mb-1">Travel Date</label>
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153B5B] mb-1">Pickup Address / Locality</label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153B5B] mb-1">Drop Campus / Locality</label>
                <input
                  type="text"
                  required
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Vehicle Preference</label>
                  <select
                    value={vehicleCategory}
                    onChange={(e) => setVehicleCategory(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                  >
                    <option value="Prime Sedan">Prime Sedan (Dzire / Amaze)</option>
                    <option value="Executive SUV">Executive SUV (Innova Crysta)</option>
                    <option value="Corporate Van">Corporate Van (Force Urbania)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Cost Centre</label>
                  <input
                    type="text"
                    disabled
                    value="CC-ENG-401 (Engineering Mobility)"
                    className="w-full bg-[#EFF7FC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-xs text-[#64748B] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153B5B] mb-1">Special Instructions / Remarks</label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>

              <div className="p-3 bg-[#EFF7FC] border border-[#DCEEFF] rounded-xl text-xs text-[#64748B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3898D8] shrink-0" />
                <span>Trip automatically billed to corporate account upon OTP verification. Zero out-of-pocket expense.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#64748B] hover:text-[#153B5B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md shadow-[#3898D8]/20 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit to HR Admin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Rating Modal */}
      {showRatingModal && selectedBookingForRating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white border border-[#E5EDF5] rounded-3xl shadow-2xl p-6 text-[#153B5B] space-y-4">
            <h3 className="text-base font-bold text-[#153B5B]">Rate Your Chauffeur Experience</h3>
            <p className="text-xs text-[#64748B]">Trip {selectedBookingForRating.id} with {selectedBookingForRating.assignedDriver}</p>

            <div className="flex justify-center gap-2 py-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingScore(star)}
                  className={`text-2xl transition-transform hover:scale-110 ${
                    star <= ratingScore ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1">Feedback / Remarks</label>
              <textarea
                value={ratingFeedback}
                onChange={(e) => setRatingFeedback(e.target.value)}
                rows={3}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl p-3 text-xs text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#64748B]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={submitRating}
                className="px-5 py-2 rounded-xl bg-[#3898D8] text-white font-bold text-xs"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
