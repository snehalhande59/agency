import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Train, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { DEMO_BANNER_TEXT } from '../../services/railway/railwayService';

export const PnrStatusDemoPage = () => {
  const { confirmedBookings } = useRailwayStore();

  const [inputRef, setInputRef] = useState(confirmedBookings[0]?.demoBookingRef || 'DEMO-RAIL-8K92X');
  const [searchedRecord, setSearchedRecord] = useState(confirmedBookings[0] || null);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = inputRef.trim().toUpperCase();
    const found = confirmedBookings.find(
      (b) => b.demoBookingRef.toUpperCase() === clean || b.trainNumber === clean
    );
    setSearchedRecord(found || null);
    setSearched(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Demo Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
        <span className="font-bold uppercase tracking-wider font-mono">{DEMO_BANNER_TEXT}</span>
      </div>

      {/* Search Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/30 shadow-2xl space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display">PNR / Demo Reference Tracker</h2>
          <p className="text-xs text-slate-400 mt-1">
            Enter your Demo Booking Reference (e.g. <strong className="text-white font-mono">DEMO-RAIL-8K92X</strong>) to check live chart preparation & berth status.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={inputRef}
              onChange={(e) => setInputRef(e.target.value)}
              placeholder="Enter Demo Booking Reference"
              className="w-full bg-navy-950 border border-slate-700 rounded-2xl py-3 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-electric-500 font-mono uppercase"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-electric-600 to-blue-600 hover:from-electric-500 hover:to-blue-500 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Check Status</span>
          </button>
        </form>

        {/* Quick sample chips */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>Active Demo Bookings:</span>
          {confirmedBookings.map((b) => (
            <button
              key={b.demoBookingRef}
              type="button"
              onClick={() => {
                setInputRef(b.demoBookingRef);
                setSearchedRecord(b);
              }}
              className="font-mono text-[11px] bg-navy-950 hover:bg-navy-800 text-electric-300 px-2 py-0.5 rounded border border-slate-800"
            >
              {b.demoBookingRef}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {searched && (
        searchedRecord ? (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Demo Reference Number</span>
                <span className="text-xl font-bold font-mono text-white">{searchedRecord.demoBookingRef}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  Chart Not Prepared (Departing {searchedRecord.departureTime})
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  searchedRecord.status.includes('Cancelled')
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {searchedRecord.status}
                </span>
              </div>
            </div>

            {/* Train details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-navy-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Train Info</span>
                <strong className="text-white text-sm block mt-0.5">{searchedRecord.trainName}</strong>
                <span className="text-electric-400 font-mono">#{searchedRecord.trainNumber}</span>
              </div>

              <div className="p-3.5 bg-navy-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Route Trajectory</span>
                <strong className="text-white text-sm block mt-0.5">{searchedRecord.fromName}</strong>
                <span className="text-slate-400">To: {searchedRecord.toName}</span>
              </div>

              <div className="p-3.5 bg-navy-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Journey Date</span>
                <strong className="text-white text-sm block mt-0.5">{searchedRecord.journeyDate}</strong>
                <span className="text-slate-400">Class: {searchedRecord.travelClass} ({searchedRecord.quota})</span>
              </div>
            </div>

            {/* Passenger Status Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Passenger Live Status Breakdown
              </h4>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-navy-950/70">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-navy-900/60 text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-4 font-semibold">#</th>
                      <th className="py-2.5 px-4 font-semibold">Passenger Name</th>
                      <th className="py-2.5 px-4 font-semibold">Booking Status</th>
                      <th className="py-2.5 px-4 font-semibold">Current Live Status</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Coach / Seat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {searchedRecord.passengers.map((p, i) => (
                      <tr key={i} className="hover:bg-white/5">
                        <td className="py-3 px-4 font-mono">{i + 1}</td>
                        <td className="py-3 px-4 font-semibold text-white">{p.name}</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">CNF</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>CNF (Confirmed)</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-electric-400 text-right">
                          {p.coach}-{p.seat} ({p.berthType})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                to={`/railway/ticket/${searchedRecord.demoBookingRef}`}
                className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition-all"
              >
                View Full ERS Ticket Slip →
              </Link>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 glass-panel rounded-3xl border border-slate-800 space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Record Found for "{inputRef}"</h3>
            <p className="text-xs text-slate-400">
              Please enter a valid Demo Reference (e.g. DEMO-RAIL-8K92X) or complete a demo booking first.
            </p>
          </div>
        )
      )}

    </div>
  );
};
