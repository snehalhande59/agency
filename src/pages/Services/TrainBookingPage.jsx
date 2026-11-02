import React, { useState } from 'react';
import { ServicePageTemplate } from './ServicePageTemplate';
import { Train, Search, ShieldCheck, CheckCircle2, Ticket, Clock, Zap, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

export const TrainBookingPage = () => {
  const { openBookingModal } = useBooking();
  const [trainClass, setTrainClass] = useState('Executive Chair Car (EC)');
  const [quota, setQuota] = useState('General');

  const popularTrains = [
    { number: '22221', name: 'CSMT Mumbai - Hazrat Nizamuddin Rajdhani', time: '16:00 -> 09:55', duration: '17h 55m', status: 'Available', fare: '₹2,840' },
    { number: '20706', name: 'CSMT Mumbai - Jalna Vande Bharat Express', time: '13:10 -> 20:30', duration: '7h 20m', status: 'Available', fare: '₹1,580' },
    { number: '12123', name: 'Deccan Queen Express (Mumbai -> Pune)', time: '17:10 -> 20:25', duration: '3h 15m', status: 'Available', fare: '₹495' },
    { number: '12051', name: 'Jan Shatabdi Express (CSMT -> Madgaon Goa)', time: '05:10 -> 14:10', duration: '9h 00m', status: 'Tatkal Open', fare: '₹1,020' },
  ];

  return (
    <div className="space-y-12">
      <ServicePageTemplate
        title="Indian Railways Ticket Booking & Tatkal Concierge"
        subtitle="Confirmed train ticket reservations, Vande Bharat Express seats, Tatkal booking assistance, and live PNR confirmation tracking."
        tagline="Seamless Rail Reservations"
        badge="IRCTC Partner Booking Interface"
        serviceKey="train-tickets"
        heroImage="https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80"
        description="Skip the confusion of waitlisted tickets and IRCTC server crashes. Our specialized rail ticketing concierge helps you book confirmed seats on premium trains including Vande Bharat, Rajdhani, Shatabdi, Tejas, and Superfast express trains with free cancellation refund assurance."
        pickupPlaceholder="From Station (e.g. Mumbai CSMT / LTT / Pune Junction)"
        dropPlaceholder="To Station (e.g. New Delhi / Ahmedabad / Madgaon Goa)"
        features={[
          { title: 'Tatkal Booking Fastlane Assist', desc: 'Pre-filled passenger credentials with automated high-speed checkout at 10:00 AM (AC) & 11:00 AM (Sleeper).' },
          { title: 'Free Cancellation & Instant Refund', desc: 'Opt for zero-penalty ticket cancellation with instant credit back to your account.' },
          { title: 'Predictive PNR Confirmation Algorithm', desc: 'Know exact historical probability before booking any RAC or waitlisted ticket.' }
        ]}
        pricingPlans={[
          {
            name: 'Standard Confirmed Reservation',
            desc: 'General quota reservation for advance bookings (up to 120 days).',
            price: 'Govt Fare + ₹60 Assist',
            features: ['Confirmed Seat / Berth Allocation', 'Instant WhatsApp E-Ticket', 'SMS Boarding Alert', 'Station Chauffeur Cab Sync']
          },
          {
            name: 'Tatkal Priority Assistance',
            desc: 'High-speed automated booking support during morning Tatkal quota rush.',
            price: 'Govt Fare + ₹199 Assist',
            popular: true,
            features: ['10 AM / 11 AM Priority Queue', '98% Confirmed Seat Success Rate', '100% Refund if not confirmed', 'Vande Bharat / Rajdhani Special']
          },
          {
            name: 'VIP Rail & Chauffeur Combo',
            desc: 'Confirmed 1st AC / Executive Vande Bharat ticket bundled with doorstep taxi pickup.',
            price: 'Custom Integrated Fare',
            features: ['Executive Chair / 1A Coupe', 'Doorstep Cab to Station Platform', 'Luggage Porter Assistance', 'Destination Cab Waiting']
          }
        ]}
        faqs={[
          { q: 'What is the Tatkal success rate with TRAVELNEX?', a: 'Our automated system has an industry-leading 98.4% success rate for securing confirmed berths within the first 60 seconds of Tatkal window opening.' },
          { q: 'How do I receive my confirmed railway ticket?', a: 'Your official IRCTC E-Ticket with PNR number, coach, and berth details is delivered instantly via WhatsApp, email, and accessible in your TRAVELNEX Dashboard.' },
          { q: 'Can I combine train booking with station cab pickup?', a: 'Yes! That is the core advantage of our unified platform: your taxi will be synchronized with your train arrival time at the destination railway station.' }
        ]}
      />

      {/* Interactive Module Launch Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-electric-950 via-navy-900 to-navy-950 border border-electric-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-glow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-electric-400 mb-1">
              <Zap className="w-4 h-4" />
              <span>IRCTC-Style Railway Booking Module Available</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Search Live Schedules, Berth Quotas & Demo Tickets
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Experience the complete multi-step railway booking simulator with seat availability, berth selection & PNR tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/railway"
              className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center gap-2 shrink-0"
            >
              <span>Launch Railway Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/railway/pnr-status"
              className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PNR Tracker</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Train Live Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="glass-panel p-6 rounded-3xl border border-electric-500/20">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Train className="w-5 h-5 text-electric-400" />
              <h3 className="text-base font-bold text-white">Popular High-Speed Rail Express Routes</h3>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              IRCTC Connected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularTrains.map((train) => (
              <div
                key={train.number}
                className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 hover:border-electric-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono font-bold text-electric-400 bg-electric-600/15 px-2 py-0.5 rounded">
                      #{train.number}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {train.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{train.name}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                    <span>{train.time}</span>
                    <span>Duration: {train.duration}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-white font-display">From {train.fare}</span>
                  <button
                    onClick={() => openBookingModal({ category: `Train ${train.name}`, fare: train.fare })}
                    className="px-3.5 py-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold transition-all shadow-glow-sm"
                  >
                    Reserve Berth
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
