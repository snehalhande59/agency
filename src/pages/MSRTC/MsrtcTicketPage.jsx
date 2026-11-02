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
        <h2 className="text-xl font-bold text-[#153B5B]">Ticket Reference Not Found</h2>
        <Link to="/msrtc/my-tickets" className="mt-4 inline-block text-xs text-rose-600 underline font-bold">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5EDF5] print:hidden">
        <div className="flex items-center gap-3">
          <Link
            to="/msrtc/my-tickets"
            className="p-2.5 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:text-rose-600 hover:bg-rose-50 border border-[#E5EDF5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Demo Booking Confirmed
              </span>
              <span className="text-xs font-mono text-[#64748B] font-bold">{ticket.demoBookingRef}</span>
            </div>
            <h2 className="text-xl font-black text-[#153B5B] font-display mt-0.5">
              Electronic Bus Ticket (E-Pass)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EFF7FC] text-[#153B5B] font-bold text-xs flex items-center gap-2 border border-[#E5EDF5] shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#3898D8]" />
            <span>Print E-Ticket</span>
          </button>

          <Link
            to="/msrtc"
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <span>Book Another</span>
          </Link>
        </div>
      </div>

      {/* Official-Look Printable Ticket Pass */}
      <div className="rounded-3xl bg-white border-2 border-[#CBD5E1] overflow-hidden shadow-md relative text-[#153B5B] print:border-black print:text-black print:bg-white">
        
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:bg-red-700 print:text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-rose-100">
                Maharashtra State Road Transport Corporation
              </div>
              <h1 className="text-lg sm:text-xl font-black font-display tracking-tight text-white">
                {ticket.bus?.serviceName || 'Shivneri Volvo Multi-Axle AC'}
              </h1>
              <span className="text-xs font-mono text-rose-100">{ticket.bus?.serviceNumber}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-100 block">
              Demo Booking Reference
            </span>
            <span className="text-lg sm:text-xl font-black font-mono tracking-wider bg-black/20 px-3 py-1 rounded-lg inline-block mt-0.5 border border-white/20 text-white">
              {ticket.demoBookingRef}
            </span>
          </div>
        </div>

        {/* Demo Watermark Banner */}
        <div className="bg-amber-50 border-y border-amber-200 text-amber-900 px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 print:border-amber-600 print:text-amber-900">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
          <span>SIMULATED DEMO ELECTRONIC BUS PASS — NOT AN OFFICIAL MSRTC TRAVEL PERMIT</span>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Origin -> Destination Run */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] print:bg-slate-50 print:border-slate-300">
            
            <div className="md:col-span-4">
              <span className="text-[10px] uppercase font-bold text-[#64748B]">Boarding Station</span>
              <div className="text-base font-black text-[#153B5B] print:text-black mt-0.5">
                {ticket.boardingPoint?.name || ticket.bus?.originDepot}
              </div>
              <div className="text-xs font-mono text-rose-600 print:text-red-700 mt-0.5 font-bold">
                Time: {ticket.boardingPoint?.time || ticket.bus?.departureTime}
              </div>
            </div>

            <div className="md:col-span-4 text-center">
              <span className="text-xs font-bold text-[#64748B] flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {ticket.journeyDate}
              </span>
              <div className="text-[10px] text-[#64748B] font-mono mt-0.5 font-semibold">Duration: {ticket.bus?.duration}</div>
            </div>

            <div className="md:col-span-4 text-left md:text-right">
              <span className="text-[10px] uppercase font-bold text-[#64748B]">Dropping Station</span>
              <div className="text-base font-black text-[#153B5B] print:text-black mt-0.5">
                {ticket.droppingPoint?.name || ticket.bus?.destDepot}
              </div>
              <div className="text-xs font-mono text-[#3898D8] print:text-blue-700 mt-0.5 font-bold">
                Arrival: {ticket.droppingPoint?.time || ticket.bus?.arrivalTime}
              </div>
            </div>

          </div>

          {/* Reserved Seats & QR Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Seats & Concessions List */}
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-bold text-[#153B5B] uppercase tracking-wider print:text-black">
                Passenger Manifest ({ticket.passengers?.length} Reserved Seats)
              </h3>

              <div className="space-y-2.5">
                {ticket.passengers?.map((p, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-between text-xs print:bg-slate-50 print:border-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-mono font-bold text-xs shadow-xs">
                        Seat #{p.seatNumber}
                      </span>
                      <div>
                        <div className="font-bold text-[#153B5B] print:text-black">{p.name}</div>
                        <div className="text-[10px] text-[#64748B] print:text-slate-600 font-semibold">
                          {p.age} Yrs • {p.gender}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-bold text-emerald-700 print:text-emerald-700 block">
                        {p.concessionName || 'Standard Fare'}
                      </span>
                      <span className="text-[10px] text-[#64748B] font-mono font-bold">Status: ALLOCATED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Mockup */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-[#EFF7FC] text-[#153B5B] border border-[#DCEEFF] text-center shadow-xs">
              {/* High-fidelity SVG QR representation */}
              <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center relative shadow-xs border border-[#CBD5E1]">
                <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-white rounded-lg">
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />

                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />

                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-rose-600 rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />

                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />

                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold mt-2 text-[#153B5B] tracking-wider">
                SCAN AT CONDUCTOR TERMINAL
              </span>
              <span className="text-[9px] text-[#64748B] font-semibold">MSRTC Digital Verification</span>
            </div>

          </div>

          {/* Fare Summary Strip */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] flex flex-wrap items-center justify-between gap-4 text-xs print:bg-slate-50 print:border-slate-300">
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold">Payment Method</span>
              <div className="font-bold text-[#153B5B] print:text-black">{ticket.paymentMethod}</div>
              <div className="text-[10px] font-mono text-[#64748B]">{ticket.transactionId}</div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#64748B] uppercase font-bold">Total Net Amount Paid</span>
              <div className="text-lg font-black text-emerald-700 print:text-emerald-700 font-mono">
                ₹{ticket.fareBreakdown?.netFare}
              </div>
            </div>
          </div>

          {/* Passenger Notice */}
          <div className="text-[10px] text-[#64748B] space-y-1 border-t border-[#E5EDF5] pt-3 print:text-slate-600">
            <p>1. Please carry a valid original Government photo ID (Aadhaar / Voter ID / Driving Licence) during journey.</p>
            <p>2. Women and Senior Citizen concession holders must produce proof of concession eligibility to the conductor on demand.</p>
            <p>3. Reporting time at boarding depot is 15 minutes prior to scheduled departure.</p>
          </div>

        </div>

      </div>

    </div>
  );
};
