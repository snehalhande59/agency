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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-navy-900 border border-electric-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-navy-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-electric-600/20 text-electric-400 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {confirmed ? 'Booking Confirmed (Demo)' : 'Confirm Your Luxury Ride'}
              </h3>
              <p className="text-xs text-slate-400">
                {confirmed ? 'Instant dispatch confirmation details' : 'Review travel parameters and proceed'}
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {confirmed ? (
            /* Confirmed Receipt View */
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="text-center py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Ride Successfully Reserved!</h4>
                <p className="text-xs text-emerald-400 font-medium">Demo Booking ID: <span className="font-bold underline">{confirmed.id}</span></p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono">
                  <span>Simulated Txn: {confirmed.simulatedTxnId || 'SIM_TXN_DEMO'} (Zero Real Funds Transferred)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">A demo SMS & WhatsApp confirmation has been simulated.</p>
              </div>

              {/* Ride Summary Ticket */}
              <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Vehicle Allocated</span>
                  <span className="text-xs font-bold text-electric-300">{confirmed.vehicle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Assigned Driver</span>
                  <span className="text-xs font-semibold text-white">{confirmed.driverName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Driver Contact</span>
                  <span className="text-xs font-mono text-emerald-400">{confirmed.driverPhone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">License Plate</span>
                  <span className="text-xs font-mono font-bold bg-navy-800 px-2 py-0.5 rounded text-white border border-slate-700">{confirmed.vehicleNumber}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-400">Total Demo Fare</span>
                  <span className="text-base font-extrabold text-white font-display">{confirmed.fare}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    closeBookingModal();
                    navigate('/dashboard/my-bookings');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>View in My Bookings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => alert('Demo booking voucher downloaded as PDF.')}
                  className="w-full py-3 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Voucher</span>
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              
              {/* Selected Vehicle Badge */}
              <div className="p-3.5 rounded-2xl bg-electric-600/10 border border-electric-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-electric-400 uppercase tracking-wider font-semibold block">Selected Option</span>
                  <h4 className="text-sm font-bold text-white">{vehicleName}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Estimated Fare</span>
                  <span className="text-sm font-bold text-electric-300">₹{finalFare.toLocaleString()}</span>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Lead Passenger Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Mobile</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup & Drop Points */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Pickup Address / Terminal</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-electric-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="House / Hotel / Terminal number"
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Drop Address / City Destination</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      placeholder="Drop locality, hotel, or city area"
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-electric-500 [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Pickup Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 09:30 AM"
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  />
                </div>
              </div>

              {/* Promo Coupon */}
              <div className="pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-electric-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Promo Code"
                      className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs uppercase font-mono text-white focus:outline-none focus:border-electric-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCouponApplied(true)}
                    className="px-3 py-2 bg-navy-800 hover:bg-navy-700 border border-slate-700 rounded-xl text-xs font-semibold text-electric-300"
                  >
                    {couponApplied ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-400 mt-1 font-medium">Coupon LUXE200 applied: ₹200 discount saved!</p>
                )}
              </div>

              {/* Fare Breakdown */}
              <div className="p-3 bg-navy-950/60 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Base Vehicle Rate</span>
                  <span>₹{baseFareNumber.toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Promo Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>State Tolls & Service GST</span>
                  <span>₹120</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-1.5 border-t border-slate-800">
                  <span>Net Estimated Amount</span>
                  <span className="text-electric-400 font-display">₹{finalFare.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-electric-600 via-blue-600 to-electric-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Demo Booking (No Payment Required)</span>
              </button>

              <p className="text-[10px] text-center text-slate-400">
                Frontend demonstration only. No actual charge or payment processing occurs.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
