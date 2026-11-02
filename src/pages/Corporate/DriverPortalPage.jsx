import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  KeyRound, 
  User, 
  AlertTriangle,
  Navigation,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const DriverPortalPage = () => {
  const { 
    corporateBookings, 
    currentDemoUser, 
    driverStartTrip, 
    driverArriveAtPickup, 
    driverVerifyBoarding, 
    driverMarkNoShow, 
    driverCompleteTrip,
    triggerEmergencySos
  } = useCorporateStore();

  const [onDuty, setOnDuty] = useState(true);
  const [selectedBookingForOtp, setSelectedBookingForOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpMessage, setOtpMessage] = useState(null);

  // Filter trips for driver (matches assigned vehicle or driver name, or shows all active if demo)
  const driverTrips = corporateBookings.filter(b => 
    b.assignedDriver?.toLowerCase().includes('ramesh') || 
    b.assignedVehicle?.includes('MH 02 ER 9120') ||
    b.status === 'DISPATCHED_ASSIGNED' ||
    b.status === 'DRIVER_EN_ROUTE' ||
    b.status === 'DRIVER_ARRIVED' ||
    b.status === 'PASSENGER_BOARDED'
  );

  const handleOpenOtpModal = (booking) => {
    setSelectedBookingForOtp(booking);
    setEnteredOtp('');
    setOtpMessage(null);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!selectedBookingForOtp) return;

    const res = driverVerifyBoarding(selectedBookingForOtp.id, enteredOtp);
    if (res.success) {
      setOtpMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setSelectedBookingForOtp(null);
        setOtpMessage(null);
      }, 1200);
    } else {
      setOtpMessage({ type: 'error', text: res.message });
    }
  };

  const handleDriverSos = () => {
    const activeTrip = driverTrips[0];
    triggerEmergencySos({
      bookingId: activeTrip?.id || 'DRIVER_DISPATCH',
      triggeredBy: 'Chauffeur Ramesh Shinde (MH 02 ER 9120)',
      location: 'Western Express Highway / Andheri Corridor (Simulated)'
    });
    alert('🚨 Emergency SOS alert sent to Transport Manager & Corporate Security Desk.');
  };

  return (
    <div className="max-w-xl mx-auto space-y-5 text-[#153B5B]">
      
      {/* Mobile Driver Header Card */}
      <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              alt="Chauffeur"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#19A89A] shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-extrabold text-[#153B5B]">Ramesh Shinde</h2>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E6F7F5] text-[#19A89A]">MH-101</span>
              </div>
              <p className="text-xs text-[#64748B]">Toyota Innova Crysta • MH 02 ER 9120</p>
              <div className="text-[11px] text-amber-500 font-bold flex items-center gap-1 mt-0.5">
                <span>★ 4.90 Rating</span>
                <span className="text-[#64748B] font-normal">• 1,840+ Safe Trips</span>
              </div>
            </div>
          </div>

          {/* Duty Status Toggle */}
          <button
            onClick={() => setOnDuty(!onDuty)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
              onDuty 
                ? 'bg-[#19A89A] text-white hover:bg-[#158f83]' 
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {onDuty ? '● ON DUTY' : '○ OFF DUTY'}
          </button>
        </div>

        {/* Quick Driver Action Bar */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5EDF5]">
          <button
            onClick={handleDriverSos}
            className="py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Driver SOS Alert</span>
          </button>

          <a
            href="tel:18002098899"
            className="py-2.5 px-3 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] border border-[#E5EDF5] text-[#153B5B] font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-[#3898D8]" />
            <span>Ops Support Desk</span>
          </a>
        </div>
      </div>

      {/* Assigned Shift Commute Trips */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold text-[#153B5B] uppercase tracking-wider">
            Today's Assigned Commute Trips
          </h3>
          <span className="text-xs font-mono text-[#3898D8] font-bold">{driverTrips.length} Trips Assigned</span>
        </div>

        {driverTrips.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#E5EDF5] shadow-sm text-[#64748B] text-xs">
            No active trips assigned for this duty window.
          </div>
        ) : (
          driverTrips.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4 hover:border-[#3898D8] transition-all"
            >
              {/* Trip Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#3898D8]">{b.id}</span>
                  <span className="text-xs text-[#64748B] block font-semibold">{b.serviceType}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  b.status === 'COMPLETED'
                    ? 'bg-[#E6F7F5] text-[#19A89A] border-[#19A89A]/30'
                    : b.status === 'PASSENGER_BOARDED'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : b.status === 'DRIVER_ARRIVED'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : b.status === 'DRIVER_EN_ROUTE'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {b.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Passenger Info */}
              <div className="flex items-center justify-between bg-[#F8FAFC] p-3 rounded-2xl border border-[#E5EDF5]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#153B5B]">{b.employeeName}</h4>
                    <p className="text-[11px] text-[#64748B]">{b.department}</p>
                  </div>
                </div>

                <a
                  href={`tel:${b.employeePhone}`}
                  className="px-3 py-1.5 rounded-xl bg-[#3898D8] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>

              {/* Stops & Locations */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-[#3898D8] font-bold mt-0.5">📍</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Pickup Point</span>
                    <p className="font-semibold text-[#153B5B]">{b.pickupLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#19A89A] font-bold mt-0.5">🏢</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Campus Destination</span>
                    <p className="font-semibold text-[#153B5B]">{b.dropLocation}</p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Action Buttons */}
              <div className="pt-2 border-t border-[#E5EDF5] space-y-2">
                {b.status === 'DISPATCHED_ASSIGNED' && (
                  <button
                    onClick={() => driverStartTrip(b.id)}
                    className="w-full py-3 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#3898D8]/20 transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Start Duty &amp; Drive to Pickup</span>
                  </button>
                )}

                {b.status === 'DRIVER_EN_ROUTE' && (
                  <button
                    onClick={() => driverArriveAtPickup(b.id)}
                    className="w-full py-3 rounded-2xl bg-[#19A89A] hover:bg-[#158f83] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#19A89A]/20 transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Mark Arrived at Pickup Gate</span>
                  </button>
                )}

                {b.status === 'DRIVER_ARRIVED' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenOtpModal(b)}
                      className="py-3 px-2 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#3898D8]/20 transition-all"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Verify Boarding OTP</span>
                    </button>
                    <button
                      onClick={() => driverMarkNoShow(b.id)}
                      className="py-3 px-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs transition-all"
                    >
                      <span>Mark No-Show</span>
                    </button>
                  </div>
                )}

                {b.status === 'PASSENGER_BOARDED' && (
                  <button
                    onClick={() => driverCompleteTrip(b.id)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#19A89A] to-[#087653] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Drop &amp; End Trip</span>
                  </button>
                )}

                {b.status === 'COMPLETED' && (
                  <div className="p-2.5 rounded-xl bg-[#E6F7F5] border border-[#19A89A]/30 text-center text-xs font-bold text-[#19A89A] flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Drop Successfully Finished &amp; Billed</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* =========================================================================
          MODAL: BOARDING OTP VERIFICATION
          ========================================================================= */}
      {selectedBookingForOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white border border-[#E5EDF5] rounded-3xl p-6 shadow-2xl space-y-4 text-[#153B5B]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#3898D8]">TRIP {selectedBookingForOtp.id}</span>
                <h3 className="text-base font-bold text-[#153B5B]">Verify Passenger Boarding</h3>
              </div>
              <button
                onClick={() => setSelectedBookingForOtp(null)}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#153B5B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#64748B]">
              Ask passenger <strong className="text-[#153B5B]">{selectedBookingForOtp.employeeName}</strong> for their 4-digit boarding OTP displayed on their corporate app.
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#153B5B] mb-1">Enter 4-Digit Boarding OTP</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 4921"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full text-center tracking-[0.3em] font-mono text-xl font-black bg-[#F8FAFC] border-2 border-[#3898D8] rounded-2xl py-3 text-[#153B5B] focus:outline-none focus:bg-white"
                />
              </div>

              {/* Quick Auto-fill button for demo tester */}
              <button
                type="button"
                onClick={() => setEnteredOtp(selectedBookingForOtp.boardingOtp || '4921')}
                className="w-full text-center text-[11px] text-[#3898D8] font-bold hover:underline"
              >
                Auto-fill Demo Passenger OTP: ({selectedBookingForOtp.boardingOtp || '4921'})
              </button>

              {otpMessage && (
                <div className={`p-2.5 rounded-xl text-xs font-bold text-center ${
                  otpMessage.type === 'success' 
                    ? 'bg-[#E6F7F5] text-[#19A89A] border border-[#19A89A]/30' 
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {otpMessage.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md shadow-[#3898D8]/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Passenger Onboard</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
