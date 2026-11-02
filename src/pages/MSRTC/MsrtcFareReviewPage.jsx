import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bus, Calendar, Clock, MapPin, User, ShieldCheck, Award, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';
import { msrtcService, MSRTC_CONCESSIONS } from '../../services/msrtc/msrtcService';

export const MsrtcFareReviewPage = () => {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, passengers, boardingPoint, droppingPoint, searchForm, contactDetails } = useMsrtcStore();

  // Calculate detailed itemized fare across all passengers
  const calculation = useMemo(() => {
    let totalGross = 0;
    let totalDiscount = 0;

    const passengerBreakdowns = passengers.map((p) => {
      const breakdown = msrtcService.calculateFareBreakdown({
        bus: selectedBus,
        seatNumbers: [p.seatNumber],
        concessionCode: p.concessionCode
      });
      totalGross += breakdown.grossFare;
      totalDiscount += breakdown.concessionDiscount;
      return {
        ...p,
        grossFare: breakdown.grossFare,
        discount: breakdown.concessionDiscount,
        concessionName: breakdown.concessionName
      };
    });

    const reservationCharge = 15 * selectedSeats.length;
    const accidentReliefFund = 5 * selectedSeats.length;
    const netFare = totalGross - totalDiscount + reservationCharge + accidentReliefFund;

    return {
      passengerBreakdowns,
      totalGross,
      totalDiscount,
      reservationCharge,
      accidentReliefFund,
      netFare
    };
  }, [selectedBus, selectedSeats, passengers]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
        <Link
          to="/msrtc/passengers"
          className="p-2.5 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:text-rose-600 hover:bg-rose-50 border border-[#E5EDF5] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
            Booking &amp; Fare Summary Review
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Verify trip itinerary, government concession deductions, and itemized fee breakdown
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Itinerary & Passengers */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Trip Itinerary Card */}
          <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5EDF5]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                  {selectedBus?.serviceName || 'Shivneri AC'}
                </span>
                <h3 className="text-sm font-bold text-[#153B5B] mt-1.5 font-mono">{selectedBus?.serviceNumber}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#64748B] font-bold flex items-center gap-1 justify-end">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {searchForm?.journeyDate || 'Today'}
                </span>
                <span className="text-[11px] text-[#64748B]">{selectedBus?.duration || '3h 30m'} run time</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#64748B] uppercase">Boarding Point</div>
                  <div className="text-xs font-bold text-[#153B5B]">{boardingPoint?.name || selectedBus?.originDepot}</div>
                  <div className="text-[11px] text-[#64748B] font-mono mt-0.5 font-semibold">
                    Departure: {boardingPoint?.time || selectedBus?.departureTime}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EFF7FC] border border-[#DCEEFF] flex items-center justify-center text-[#3898D8] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#64748B] uppercase">Dropping Point</div>
                  <div className="text-xs font-bold text-[#153B5B]">{droppingPoint?.name || selectedBus?.destDepot}</div>
                  <div className="text-[11px] text-[#64748B] font-mono mt-0.5 font-semibold">
                    Est. Arrival: {droppingPoint?.time || selectedBus?.arrivalTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E5EDF5] flex items-center justify-between text-xs">
              <span className="text-[#64748B] font-bold">Reserved Seats ({selectedSeats.length}):</span>
              <span className="font-mono font-bold text-rose-600">
                {selectedSeats.map((s) => `#${s}`).join(', ')}
              </span>
            </div>
          </div>

          {/* Passenger Manifest Card */}
          <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-rose-600" />
              <span>Passengers &amp; Concessions</span>
            </h3>

            <div className="space-y-3">
              {calculation.passengerBreakdowns.map((p) => (
                <div key={p.seatNumber} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold">
                        Seat #{p.seatNumber}
                      </span>
                      <span className="font-bold text-[#153B5B]">{p.name}</span>
                    </div>
                    <span className="text-[#64748B] font-semibold">{p.age} yrs • {p.gender}</span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E5EDF5] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-[#153B5B] font-semibold">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>{p.concessionName}</span>
                    </div>

                    {p.discount > 0 ? (
                      <span className="font-bold text-emerald-700 font-mono">
                        -₹{p.discount} Saved
                      </span>
                    ) : (
                      <span className="text-[#64748B]">Standard Tariff</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Itemized Fare Breakdown & CTA */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-2xl bg-white border border-[#E5EDF5] p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5EDF5] flex items-center justify-between">
              <span>Itemized Fare Breakdown</span>
              <span className="text-[10px] bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF] px-2 py-0.5 rounded font-bold">INR (₹)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#153B5B]">
                <span className="text-[#64748B]">Gross Basic Fare ({selectedSeats.length} Seats)</span>
                <span className="font-mono font-bold">₹{calculation.totalGross}</span>
              </div>

              {calculation.totalDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>State Concession Subsidy</span>
                  </span>
                  <span className="font-mono font-bold">-₹{calculation.totalDiscount}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#64748B]">
                <span>Computerized Reservation Fee (₹15/seat)</span>
                <span className="font-mono font-semibold text-[#153B5B]">₹{calculation.reservationCharge}</span>
              </div>

              <div className="flex items-center justify-between text-[#64748B]">
                <span>Accident Relief Fund (₹5/seat)</span>
                <span className="font-mono font-semibold text-[#153B5B]">₹{calculation.accidentReliefFund}</span>
              </div>

              <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between text-sm sm:text-base font-black text-[#153B5B]">
                <span>Net Payable Amount</span>
                <span className="font-mono text-xl text-rose-600">₹{calculation.netFare}</span>
              </div>
            </div>

            {/* Simulated Banner */}
            <div className="mt-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span className="font-medium">Demo Mode: Payment will be simulated without actual money debited.</span>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={() => navigate('/msrtc/payment')}
              className="mt-6 w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Demo Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 text-center">
              <Link to="/msrtc/passengers" className="text-xs text-[#64748B] hover:text-[#153B5B] underline font-bold">
                Modify Passengers or Seats
              </Link>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] p-5 space-y-2 text-xs text-[#64748B]">
            <div className="flex items-center gap-2 text-[#153B5B] font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Guaranteed Reserved Seat Status</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Official MSRTC conductor reservation sheets automatically reflect allocated seat numbers on vehicle departure.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
