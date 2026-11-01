import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Train, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Printer, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  QrCode, 
  ArrowLeft,
  XCircle,
  FileText
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { DEMO_BANNER_TEXT } from '../../services/railway/railwayService';

export const DemoTicketPage = () => {
  const { ref } = useParams();
  const navigate = useNavigate();
  const { confirmedBookings } = useRailwayStore();

  const ticket = confirmedBookings.find((b) => b.demoBookingRef === ref) || confirmedBookings[0];

  if (!ticket) {
    return (
      <div className="text-center py-12 glass-panel rounded-3xl">
        <p className="text-white mb-4">Demo ticket record not found.</p>
        <Link to="/railway" className="text-electric-400 font-bold">
          ← Back to Railway Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Banner & Print Trigger */}
      <div className="flex items-center justify-between">
        <Link
          to="/railway"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Railway Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-navy-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print ERS Ticket</span>
          </button>
        </div>
      </div>

      {/* Mandatory Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
        <span className="font-bold uppercase tracking-wider font-mono">{DEMO_BANNER_TEXT}</span>
      </div>

      {/* Official-Style Electronic Reservation Slip (ERS) */}
      <div className="glass-panel rounded-3xl border border-electric-500/30 overflow-hidden shadow-2xl bg-navy-900/95 print:bg-white print:text-black">
        
        {/* Ticket Header */}
        <div className="p-6 bg-navy-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric-600 to-blue-700 flex items-center justify-center text-white shadow-glow-sm">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-electric-400 uppercase tracking-widest block font-mono">
                Electronic Reservation Slip (ERS) — Demo Reference Only
              </span>
              <h2 className="text-xl font-bold text-white font-display">
                {ticket.trainName} (#{ticket.trainNumber})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Demo Reference: <strong className="text-white font-mono bg-navy-900 px-2 py-0.5 rounded border border-slate-800">{ticket.demoBookingRef}</strong>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Booking Status</span>
            <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
              ticket.status.includes('Cancelled')
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {ticket.status}
            </span>
          </div>
        </div>

        {/* Journey Coordinates */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-navy-950/70 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Boarding Station</span>
              <strong className="text-white text-sm block mt-0.5">{ticket.fromName}</strong>
              <span className="text-slate-400 font-mono">Dep: {ticket.departureTime}</span>
            </div>

            <div className="sm:text-center border-y sm:border-y-0 sm:border-x border-slate-800 py-2 sm:py-0">
              <span className="text-slate-400 block text-[10px] uppercase">Date of Journey</span>
              <strong className="text-electric-300 text-sm block mt-0.5">{ticket.journeyDate}</strong>
              <span className="text-slate-400">Class: <strong>{ticket.travelClass}</strong> ({ticket.quota})</span>
            </div>

            <div className="sm:text-right">
              <span className="text-slate-400 block text-[10px] uppercase">Destination Station</span>
              <strong className="text-white text-sm block mt-0.5">{ticket.toName}</strong>
              <span className="text-emerald-400 font-mono">Arr: {ticket.arrivalTime}</span>
            </div>
          </div>

          {/* Passenger Berth Details Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-electric-400" />
              <span>Confirmed Passenger & Berth Allocations</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-navy-950/70">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-navy-900/60 text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-semibold">#</th>
                    <th className="py-2.5 px-4 font-semibold">Passenger Name</th>
                    <th className="py-2.5 px-4 font-semibold">Age / Gender</th>
                    <th className="py-2.5 px-4 font-semibold">Coach</th>
                    <th className="py-2.5 px-4 font-semibold">Seat / Berth</th>
                    <th className="py-2.5 px-4 font-semibold">Berth Type</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {ticket.passengers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="py-3 px-4 font-mono">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-white">{p.name}</td>
                      <td className="py-3 px-4 text-slate-300">{p.age} / {p.gender}</td>
                      <td className="py-3 px-4 font-mono font-bold text-electric-400">{p.coach}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{p.seat}</td>
                      <td className="py-3 px-4 text-slate-300">{p.berthType}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fare Summary & QR Code */}
          <div className="p-4 rounded-2xl bg-navy-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <span className="text-slate-400 uppercase text-[10px] block">Payment Summary</span>
              <div className="text-lg font-bold text-white font-display">
                Total Demo Fare: <span className="text-electric-300">₹{ticket.fareBreakdown.totalFare.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400">Transaction Mode: {ticket.paymentInfo?.method || 'SIMULATED_UPI'}</p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto bg-navy-900 p-2.5 rounded-xl border border-slate-800">
              <QrCode className="w-12 h-12 text-electric-400" />
              <div className="text-[10px] text-slate-400">
                <span className="text-white font-bold block">Mobile ERS QR</span>
                <span>Scannable by TTE (Demo)</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
            <Link
              to="/railway/pnr-status"
              className="text-xs font-bold text-electric-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Track in PNR / Demo Reference Checker</span>
            </Link>

            {!ticket.status.includes('Cancelled') && (
              <Link
                to="/railway/cancel"
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancel Ticket</span>
              </Link>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
