import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bus, Check, ShieldCheck, Heart, User, Info, Disc } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';
import { msrtcService } from '../../services/msrtc/msrtcService';

export const MsrtcSeatLayoutPage = () => {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, toggleSeat, searchForm } = useMsrtcStore();

  // Generate interactive seat matrix for this bus
  const seatLayout = useMemo(() => {
    return msrtcService.generateSeatLayout(selectedBus);
  }, [selectedBus]);

  // Group into rows of 4 (2 seats left, 2 seats right)
  const rows = useMemo(() => {
    const rowMap = {};
    seatLayout.forEach((seat) => {
      if (!rowMap[seat.row]) {
        rowMap[seat.row] = [];
      }
      rowMap[seat.row].push(seat);
    });
    return Object.values(rowMap);
  }, [seatLayout]);

  const totalBaseFare = (selectedSeats.length || 0) * (selectedBus?.baseFare || 500);

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    navigate('/msrtc/passengers');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5EDF5]">
        <div className="flex items-center gap-3">
          <Link
            to="/msrtc/results"
            className="p-2.5 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:text-rose-600 hover:bg-rose-50 border border-[#E5EDF5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display flex items-center gap-2">
              <span>Select Seats</span>
              <span className="text-xs bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200 font-bold">
                2x2 Pushback Coach
              </span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              {selectedBus?.serviceName || 'Shivneri AC'} • {selectedBus?.originDepot || 'Mumbai'} &rarr; {selectedBus?.destDepot || 'Pune'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#64748B]">Max 6 seats per booking</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-white p-4 rounded-2xl border border-[#E5EDF5] text-xs shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[10px] text-[#153B5B] font-bold">
            1
          </div>
          <span className="text-[#64748B] font-semibold">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-600 border border-rose-400 flex items-center justify-center text-[10px] text-white font-bold shadow-xs">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-rose-700 font-bold">Selected</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-pink-50 border border-pink-300 flex items-center justify-center text-[10px] text-pink-700 font-bold">
            <Heart className="w-3 h-3 text-pink-600" />
          </div>
          <span className="text-pink-700 font-bold">Women Reserved (50% Concession)</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-bold cursor-not-allowed">
            X
          </div>
          <span className="text-slate-400 font-medium">Booked</span>
        </div>
      </div>

      {/* Coach Container */}
      <div className="max-w-xl mx-auto bg-white border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-8 shadow-sm relative">
        
        {/* Front of Bus & Driver Cabin */}
        <div className="pb-6 mb-6 border-b-2 border-dashed border-[#E5EDF5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] flex items-center justify-center text-[#153B5B]">
              <Disc className="w-6 h-6 animate-spin-slow text-rose-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#153B5B]">Driver Cabin</div>
              <div className="text-[10px] text-[#64748B]">Front Windshield</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg">
              Passenger Entry Door
            </span>
          </div>
        </div>

        {/* 2x2 Seating Grid with Central Aisle */}
        <div className="space-y-3.5">
          {rows.map((rowSeats, rIdx) => {
            const leftSeats = rowSeats.filter((s) => s.side === 'LEFT');
            const rightSeats = rowSeats.filter((s) => s.side === 'RIGHT');

            return (
              <div key={rIdx} className="flex items-center justify-between gap-4">
                
                {/* Left 2 seats (Window + Aisle) */}
                <div className="flex items-center gap-2.5">
                  {leftSeats.map((seat) => {
                    const isSelected = selectedSeats.includes(seat.seatNumber);
                    const isBooked = seat.status === 'BOOKED';
                    const isWomen = seat.status === 'WOMEN_RESERVED';

                    return (
                      <button
                        key={seat.seatNumber}
                        type="button"
                        disabled={isBooked}
                        onClick={() => toggleSeat(seat.seatNumber)}
                        title={`Seat ${seat.seatNumber} (${seat.type}) - ₹${seat.price}`}
                        className={`w-11 h-12 rounded-xl flex flex-col items-center justify-center transition-all relative font-mono text-xs font-bold ${
                          isBooked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-rose-600 text-white border-2 border-rose-300 shadow-md scale-105 z-10'
                            : isWomen
                            ? 'bg-pink-50 border border-pink-300 text-pink-700 hover:bg-pink-100 hover:border-pink-400'
                            : 'bg-[#F8FAFC] border border-[#CBD5E1] text-[#153B5B] hover:border-rose-400 hover:bg-rose-50/50'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : isWomen ? (
                          <Heart className="w-3 h-3 text-pink-600 mb-0.5" />
                        ) : null}
                        <span>{seat.seatNumber}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Central Aisle */}
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[10px] text-[#94A3B8] font-mono tracking-widest select-none">
                    AISLE
                  </span>
                </div>

                {/* Right 2 seats (Aisle + Window) */}
                <div className="flex items-center gap-2.5">
                  {rightSeats.map((seat) => {
                    const isSelected = selectedSeats.includes(seat.seatNumber);
                    const isBooked = seat.status === 'BOOKED';
                    const isWomen = seat.status === 'WOMEN_RESERVED';

                    return (
                      <button
                        key={seat.seatNumber}
                        type="button"
                        disabled={isBooked}
                        onClick={() => toggleSeat(seat.seatNumber)}
                        title={`Seat ${seat.seatNumber} (${seat.type}) - ₹${seat.price}`}
                        className={`w-11 h-12 rounded-xl flex flex-col items-center justify-center transition-all relative font-mono text-xs font-bold ${
                          isBooked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-rose-600 text-white border-2 border-rose-300 shadow-md scale-105 z-10'
                            : isWomen
                            ? 'bg-pink-50 border border-pink-300 text-pink-700 hover:bg-pink-100 hover:border-pink-400'
                            : 'bg-[#F8FAFC] border border-[#CBD5E1] text-[#153B5B] hover:border-rose-400 hover:bg-rose-50/50'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : isWomen ? (
                          <Heart className="w-3 h-3 text-pink-600 mb-0.5" />
                        ) : null}
                        <span>{seat.seatNumber}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* Rear of Bus / Emergency Door */}
        <div className="mt-8 pt-4 border-t-2 border-dashed border-[#E5EDF5] text-center">
          <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
            Rear Emergency Exit Window
          </span>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-4 z-40 max-w-4xl mx-auto bg-white/95 border border-[#CBD5E1] rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] font-bold">Selected Seats ({selectedSeats.length}):</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-lg bg-rose-600 text-white font-mono font-bold text-xs shadow-xs"
                  >
                    #{s}
                  </span>
                ))
              ) : (
                <span className="text-xs text-amber-700 font-bold">Please choose at least 1 seat</span>
              )}
            </div>
          </div>
          <div className="text-[11px] text-[#64748B] mt-1">
            Standard Base: <span className="font-mono text-[#153B5B] font-bold">₹{totalBaseFare}</span> • Final concessions calculated in next step
          </div>
        </div>

        <button
          type="button"
          disabled={selectedSeats.length === 0}
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>Continue to Passenger Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
