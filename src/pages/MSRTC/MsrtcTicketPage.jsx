import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bus, CheckCircle2, QrCode, Printer, ArrowLeft, Download, ShieldAlert, Award, Calendar, Clock, MapPin, Share2 } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';

export const MsrtcTicketPage = () => {
  const { ref } = useParams();
  const { confirmedBookings } = useMsrtcStore();

  const ticket = useMemo(() => {
    return confirmedBookings.find((b) => b.demoBookingRef === ref) || confirmedBookings[0];
  }, [confirmedBookings, ref]);

  if (!ticket) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-white">Ticket Reference Not Found</h2>
        <Link to="/msrtc/my-tickets" className="mt-4 inline-block text-xs text-red-400 underline">
          View My Tickets
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 print:p-0 print:m-0">
      
      {/* Top Controls (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            to="/msrtc/my-tickets"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Demo Booking Confirmed
              </span>
              <span className="text-xs font-mono text-slate-400">{ticket.demoBookingRef}</span>
            </div>
            <h2 className="text-xl font-black text-white font-display mt-0.5">
              Electronic Bus Ticket (E-Pass)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print E-Ticket</span>
          </button>

          <Link
            to="/msrtc"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30"
          >
            <span>Book Another</span>
          </Link>
        </div>
      </div>

      {/* Official-Look Printable Ticket Pass */}
      <div className="rounded-3xl bg-navy-900 border-2 border-slate-700 overflow-hidden shadow-2xl relative text-slate-100 print:border-black print:text-black print:bg-white">
        
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:bg-red-700 print:text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-red-200">
                Maharashtra State Road Transport Corporation
              </div>
              <h1 className="text-lg sm:text-xl font-black font-display tracking-tight">
                {ticket.bus?.serviceName || 'Shivneri Volvo Multi-Axle AC'}
              </h1>
              <span className="text-xs font-mono opacity-90">{ticket.bus?.serviceNumber}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-red-200 block">
              Demo Booking Reference
            </span>
            <span className="text-lg sm:text-xl font-black font-mono tracking-wider bg-black/20 px-3 py-1 rounded-lg inline-block mt-0.5 border border-white/10">
              {ticket.demoBookingRef}
            </span>
          </div>
        </div>

        {/* Demo Watermark Banner */}
        <div className="bg-amber-500/15 border-y border-amber-500/30 text-amber-300 px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 print:border-amber-600 print:text-amber-900">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>SIMULATED DEMO ELECTRONIC BUS PASS — NOT AN OFFICIAL MSRTC TRAVEL PERMIT</span>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Origin -> Destination Run */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl bg-navy-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-300">
            
            <div className="md:col-span-4">
              <span className="text-[10px] uppercase font-bold text-slate-400">Boarding Station</span>
              <div className="text-base font-bold text-white print:text-black mt-0.5">
                {ticket.boardingPoint?.name || ticket.bus?.originDepot}
              </div>
              <div className="text-xs font-mono text-red-400 print:text-red-700 mt-0.5 font-bold">
                Time: {ticket.boardingPoint?.time || ticket.bus?.departureTime}
              </div>
            </div>

            <div className="md:col-span-4 text-center">
              <span className="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {ticket.journeyDate}
              </span>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Duration: {ticket.bus?.duration}</div>
            </div>

            <div className="md:col-span-4 text-left md:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Dropping Station</span>
              <div className="text-base font-bold text-white print:text-black mt-0.5">
                {ticket.droppingPoint?.name || ticket.bus?.destDepot}
              </div>
              <div className="text-xs font-mono text-blue-400 print:text-blue-700 mt-0.5 font-bold">
                Arrival: {ticket.droppingPoint?.time || ticket.bus?.arrivalTime}
              </div>
            </div>

          </div>

          {/* Reserved Seats & QR Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Seats & Concessions List */}
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider print:text-black">
                Passenger Manifest ({ticket.passengers?.length} Reserved Seats)
              </h3>

              <div className="space-y-2.5">
                {ticket.passengers?.map((p, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between text-xs print:bg-slate-50 print:border-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-xs">
                        Seat #{p.seatNumber}
                      </span>
                      <div>
                        <div className="font-bold text-white print:text-black">{p.name}</div>
                        <div className="text-[10px] text-slate-400 print:text-slate-600">
                          {p.age} Yrs • {p.gender}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-emerald-400 print:text-emerald-700 block">
                        {p.concessionName || 'Standard Fare'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Status: ALLOCATED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Mockup */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-white text-slate-900 border border-slate-300 text-center shadow-md">
              {/* High-fidelity SVG QR representation */}
              <div className="w-32 h-32 bg-slate-900 p-2 rounded-xl flex items-center justify-center relative shadow-inner">
                <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-white rounded-lg">
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-red-600 rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold mt-2 text-slate-700 tracking-wider">
                SCAN AT CONDUCTOR TERMINAL
              </span>
              <span className="text-[9px] text-slate-500">MSRTC Digital Verification</span>
            </div>

          </div>

          {/* Fare Summary Strip */}
          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs print:bg-slate-50 print:border-slate-300">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Payment Method</span>
              <div className="font-semibold text-white print:text-black">{ticket.paymentMethod}</div>
              <div className="text-[10px] font-mono text-slate-500">{ticket.transactionId}</div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Net Amount Paid</span>
              <div className="text-lg font-black text-emerald-400 print:text-emerald-700 font-mono">
                ₹{ticket.fareBreakdown?.netFare}
              </div>
            </div>
          </div>

          {/* Passenger Notice */}
          <div className="text-[10px] text-slate-400 space-y-1 border-t border-slate-800 pt-3 print:text-slate-600">
            <p>1. Please carry a valid original Government photo ID (Aadhaar / Voter ID / Driving Licence) during journey.</p>
            <p>2. Women and Senior Citizen concession holders must produce proof of concession eligibility to the conductor on demand.</p>
            <p>3. Reporting time at boarding depot is 15 minutes prior to scheduled departure.</p>
          </div>

        </div>

      </div>

    </div>
  );
};
