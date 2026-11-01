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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/msrtc/results"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
              <span>Select Seats</span>
              <span className="text-xs bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full border border-red-500/30">
                2x2 Pushback Coach
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedBus.serviceName} • {selectedBus.originDepot} &rarr; {selectedBus.destDepot}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Max 6 seats per booking</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-navy-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-navy-950 border border-slate-600 flex items-center justify-center text-[10px] text-slate-300 font-bold">
            1
          </div>
          <span className="text-slate-300">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-600 border border-red-400 flex items-center justify-center text-[10px] text-white font-bold shadow-sm shadow-red-600/50">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-white font-semibold">Selected</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-950/70 border border-rose-500/60 flex items-center justify-center text-[10px] text-rose-300 font-bold">
            <Heart className="w-3 h-3 text-rose-400" />
          </div>
          <span className="text-rose-300">Women Reserved (50% Concession)</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-800/60 border border-slate-800 flex items-center justify-center text-[10px] text-slate-500 font-bold cursor-not-allowed">
            X
          </div>
          <span className="text-slate-500">Booked</span>
        </div>
      </div>

      {/* Coach Container */}
      <div className="max-w-xl mx-auto bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Front of Bus & Driver Cabin */}
        <div className="pb-6 mb-6 border-b-2 border-dashed border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Disc className="w-6 h-6 animate-spin-slow text-red-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Driver Cabin</div>
              <div className="text-[10px] text-slate-400">Front Windshield</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
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
                            ? 'bg-slate-800/40 border border-slate-800/80 text-slate-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-red-600 text-white border-2 border-red-300 shadow-lg shadow-red-600/50 scale-105 z-10'
                            : isWomen
                            ? 'bg-rose-950/40 border border-rose-500/60 text-rose-300 hover:bg-rose-900/50 hover:border-rose-400'
                            : 'bg-navy-950 border border-slate-600 text-slate-200 hover:border-red-500 hover:bg-slate-900'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : isWomen ? (
                          <Heart className="w-3 h-3 text-rose-400 mb-0.5" />
                        ) : null}
                        <span>{seat.seatNumber}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Central Aisle */}
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[10px] text-slate-600 font-mono tracking-widest select-none">
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
                            ? 'bg-slate-800/40 border border-slate-800/80 text-slate-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-red-600 text-white border-2 border-red-300 shadow-lg shadow-red-600/50 scale-105 z-10'
                            : isWomen
                            ? 'bg-rose-950/40 border border-rose-500/60 text-rose-300 hover:bg-rose-900/50 hover:border-rose-400'
                            : 'bg-navy-950 border border-slate-600 text-slate-200 hover:border-red-500 hover:bg-slate-900'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : isWomen ? (
                          <Heart className="w-3 h-3 text-rose-400 mb-0.5" />
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
        <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-700 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Rear Emergency Exit Window
          </span>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-4 z-40 max-w-4xl mx-auto bg-navy-900/95 border border-slate-700/80 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Selected Seats ({selectedSeats.length}):</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-lg bg-red-600 text-white font-mono font-bold text-xs shadow-sm"
                  >
                    #{s}
                  </span>
                ))
              ) : (
                <span className="text-xs text-amber-400">Please choose at least 1 seat</span>
              )}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Standard Base: <span className="font-mono text-white font-semibold">₹{totalBaseFare}</span> • Final concessions calculated in next step
          </div>
        </div>

        <button
          type="button"
          disabled={selectedSeats.length === 0}
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
        >
          <span>Continue to Passenger Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
