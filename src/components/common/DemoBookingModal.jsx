import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  Car, 
  Tag, 
  ArrowRight,
  Download,
  Printer
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const DemoBookingModal = () => {
  const navigate = useNavigate();
  const { bookingModal, closeBookingModal, createBooking, searchParams } = useBooking();

  const [passengerName, setPassengerName] = useState('Snehal Hande');
  const [passengerPhone, setPassengerPhone] = useState('+91 98202 88410');
  const [pickup, setPickup] = useState(bookingModal.pickup || searchParams.pickup || 'Bandra West, Mumbai');
  const [drop, setDrop] = useState(bookingModal.drop || searchParams.drop || 'Koregaon Park, Pune');
  const [date, setDate] = useState(bookingModal.date || searchParams.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(bookingModal.time || '10:00 AM');
  const [coupon, setCoupon] = useState('LUXE200');
  const [couponApplied, setCouponApplied] = useState(true);

  if (!bookingModal.isOpen) return null;

  const vehicleName = bookingModal.vehicle?.name || 'Executive Sedan (Dzire / Etios)';
  const baseFareNumber = bookingModal.vehicle?.basePrice || 2450;
  const discount = couponApplied ? 200 : 0;
  const finalFare = baseFareNumber - discount + 120; // + GST/Tolls

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    createBooking({
      service: bookingModal.service?.title || 'Outstation Cab Booking',
      vehicleName: vehicleName,
      pickup: pickup,
      drop: drop,
      date: date,
      time: time,
      passengers: bookingModal.passengers || searchParams.passengers || 2,
      fare: `₹${finalFare.toLocaleString()}`
    });
  };

  const confirmed = bookingModal.confirmedBooking;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-[#E5EDF5] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#153B5B]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5EDF5] bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#153B5B]">
                {confirmed ? 'Booking Confirmed (Demo)' : 'Confirm Your Luxury Ride'}
              </h3>
              <p className="text-xs text-[#64748B]">
                {confirmed ? 'Instant dispatch confirmation details' : 'Review travel parameters and proceed'}
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#153B5B]">
          {confirmed ? (
            /* Confirmed Receipt View */
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="text-center py-5 bg-[#E6F7F5] border border-[#19A89A]/30 rounded-2xl">
                <div className="w-12 h-12 bg-[#19A89A]/20 text-[#19A89A] rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#153B5B]">Ride Successfully Reserved!</h4>
                <p className="text-xs text-[#19A89A] font-bold mt-0.5">Demo Booking ID: <span className="underline">{confirmed.id}</span></p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEEFF] text-[#3898D8] border border-[#3898D8]/30 text-[10px] font-mono">
                  <span>Simulated Txn: {confirmed.simulatedTxnId || 'SIM_TXN_DEMO'} (Zero Real Funds Transferred)</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1.5">A demo SMS & WhatsApp confirmation has been simulated.</p>
              </div>

              {/* Ride Summary Ticket */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#E5EDF5]">
                  <span className="text-xs text-[#64748B]">Vehicle Allocated</span>
                  <span className="text-xs font-bold text-[#3898D8]">{confirmed.vehicle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">Assigned Driver</span>
                  <span className="text-xs font-semibold text-[#153B5B]">{confirmed.driverName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">Driver Contact</span>
                  <span className="text-xs font-mono text-[#19A89A] font-semibold">{confirmed.driverPhone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">License Plate</span>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded text-[#153B5B] border border-[#E5EDF5]">{confirmed.vehicleNumber}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#E5EDF5]">
                  <span className="text-xs text-[#64748B]">Total Demo Fare</span>
                  <span className="text-base font-extrabold text-[#3898D8] font-display">{confirmed.fare}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    closeBookingModal();
                    navigate('/dashboard/my-bookings');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>View in My Bookings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => alert('Demo booking voucher downloaded as PDF.')}
                  className="w-full py-3 px-4 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] font-semibold text-xs border border-[#E5EDF5] transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#3898D8]" />
                  <span>Download Voucher</span>
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              
              {/* Selected Vehicle Badge */}
              <div className="p-3.5 rounded-2xl bg-[#EFF7FC] border border-[#DCEEFF] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#3898D8] uppercase tracking-wider font-bold block">Selected Option</span>
                  <h4 className="text-base font-extrabold text-[#153B5B]">{vehicleName}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#64748B] block">Estimated Fare</span>
                  <span className="text-base font-black text-[#3898D8]">₹{finalFare.toLocaleString()}</span>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Lead Passenger Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. Snehal Hande"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] font-semibold placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white focus:ring-1 focus:ring-[#3898D8] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">WhatsApp / Mobile</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      placeholder="+91 98202 88410"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] font-semibold placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white focus:ring-1 focus:ring-[#3898D8] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup & Drop Points */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Pickup Address / Terminal</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="House / Hotel / Terminal number"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] font-semibold placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white focus:ring-1 focus:ring-[#3898D8] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Drop Address / City Destination</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#19A89A] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      placeholder="Drop locality, hotel, or city area"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] font-semibold placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white focus:ring-1 focus:ring-[#3898D8] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white [color-scheme:light]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#153B5B] mb-1">Pickup Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 10:00 AM"
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] font-semibold placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white"
                  />
                </div>
              </div>

              {/* Promo Coupon */}
              <div className="pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#3898D8] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Promo Code"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2 pl-9 pr-3 text-xs uppercase font-mono font-bold text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCouponApplied(true)}
                    className="px-4 py-2 bg-[#DCEEFF] hover:bg-[#cbe3fa] border border-[#3898D8]/30 rounded-xl text-xs font-bold text-[#3898D8] transition-colors"
                  >
                    {couponApplied ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-[#19A89A] mt-1 font-semibold">Coupon LUXE200 applied: ₹200 discount saved!</p>
                )}
              </div>

              {/* Fare Breakdown */}
              <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E5EDF5] text-xs space-y-2">
                <div className="flex justify-between text-[#64748B]">
                  <span>Base Vehicle Rate</span>
                  <span className="font-semibold text-[#153B5B]">₹{baseFareNumber.toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#19A89A] font-semibold">
                    <span>Promo Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#64748B]">
                  <span>State Tolls & Service GST</span>
                  <span className="font-semibold text-[#153B5B]">₹120</span>
                </div>
                <div className="flex justify-between text-[#153B5B] font-bold text-sm pt-2 border-t border-[#E5EDF5]">
                  <span>Net Estimated Amount</span>
                  <span className="text-[#3898D8] font-black text-base font-display">₹{finalFare.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Confirm Demo Booking (No Payment Required)</span>
              </button>

              <p className="text-[10px] text-center text-[#64748B]">
                Frontend demonstration only. No actual charge or payment processing occurs.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};