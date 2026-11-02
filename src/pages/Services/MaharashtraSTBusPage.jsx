import React from 'react';
import { Link } from 'react-router-dom';
import { ServicePageTemplate } from './ServicePageTemplate';
import { Bus, MapPin, CheckCircle2, ShieldCheck, Ticket, ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { MSRTC_BANNER_TEXT } from '../../services/msrtc/msrtcService';

export const MaharashtraSTBusPage = () => {
  const { openBookingModal } = useBooking();

  const msrtcRoutes = [
    { service: 'Shivneri Volvo AC', from: 'Mumbai (Dadar Asiad)', to: 'Pune (Swargate / Station)', freq: 'Every 15 Mins', fare: '₹535', stops: 'Expressway Direct' },
    { service: 'Shivneri Volvo AC', from: 'Borivali (Nancy Colony)', to: 'Pune (Swargate)', freq: 'Every 30 Mins', fare: '₹575', stops: 'Expressway Direct' },
    { service: 'Shivshahi AC Sleeper', from: 'Mumbai (Central)', to: 'Kolhapur (CBS)', freq: 'Nightly 9:30 PM', fare: '₹780', stops: 'Satara, Karad' },
    { service: 'Shivshahi AC Seater', from: 'Pune (Shivajinagar)', to: 'Nashik (CBS)', freq: 'Hourly', fare: '₹460', stops: 'Narayangaon, Sangamner' },
    { service: 'Ashwamedh Multi-Axle', from: 'Mumbai (CSMT)', to: 'Aurangabad (Cidco)', freq: 'Daily 06:00 AM & 10:00 PM', fare: '₹890', stops: 'Samruddhi Mahamarg' },
    { service: 'Shivneri Volvo AC', from: 'Thane (Vandana)', to: 'Pune (Swargate)', freq: 'Every 30 Mins', fare: '₹510', stops: 'Expressway Direct' }
  ];

  return (
    <div className="space-y-12">
      <ServicePageTemplate
        title="Maharashtra State Transport (ST) & Shivneri Bus Booking"
        subtitle="Official partner reservation portal for MSRTC Shivneri Volvo, Shivshahi AC, Ashwamedh Multi-Axle, and Ordinary buses across 3,000+ state routes."
        tagline="State Pride & Dependable Highway Connectivity"
        badge="Maharashtra State Transport (MSRTC) Connect"
        serviceKey="maharashtra-st-bus"
        heroImage="https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1200&q=80"
        description="Book your trusted red, green, and luxury blue Maharashtra ST buses seamlessly. As the lifeline of Maharashtra's public transport, MSRTC connects every town and remote village from Sahyadri ghats to Marathwada and Vidarbha. Travel safely on the Mumbai-Pune Expressway with high-frequency Shivneri Volvo buses running every 15 minutes."
        pickupPlaceholder="e.g. Mumbai (Dadar / Borivali / Thane)"
        dropPlaceholder="e.g. Pune (Swargate / Station) or Nashik / Kolhapur"
        features={[
          { title: 'Shivneri Volvo Multi-Axle Fleet', desc: 'Frequent departures with Scandinavian air suspension and onboard entertainment.' },
          { title: 'Concession & Senior Citizen Discounts', desc: 'Seamlessly apply Maharashtra govt Amrit Jyeshtha and women traveller concessions.' },
          { title: 'Direct ST Bus Stand Boarding', desc: 'Guaranteed confirmed seats without standing in lengthy bus depot queues.' }
        ]}
        pricingPlans={[
          {
            name: 'Shivneri Volvo AC (Mumbai <-> Pune)',
            desc: 'The iconic expressway executive express running every 15 minutes round the clock.',
            price: '₹535 Fixed Govt Rate',
            popular: true,
            features: ['Volvo 9400 Multi-Axle', 'Chilled AC & Mineral Water', 'Dadar to Swargate / Station in 3.5 hrs', 'Luggage space included']
          },
          {
            name: 'Shivshahi AC Sleeper',
            desc: 'Comfortable air-conditioned sleeper berths for overnight state travel.',
            price: '₹750 - ₹950',
            features: ['Individual Sleeper Berth', 'Reading light & mobile charging', 'Clean linen provided', 'Connecting 80+ tier-2 cities']
          },
          {
            name: 'Ordinary / Hirkani Semi-Luxury',
            desc: 'Budget-friendly connectivity to every rural taluka and scenic hill destination.',
            price: 'Standard MSRTC Fares',
            features: ['Reaches 3,000+ talukas', 'No advance booking fee', 'Instant digital m-ticket', 'Senior citizen discount applicable']
          }
        ]}
        faqs={[
          { q: 'How often do Shivneri buses run between Mumbai and Pune?', a: 'Shivneri buses depart every 15 minutes from Dadar Asiad Stand, Borivali Nancy Colony, and Thane Vandana Stand between 5:30 AM and 11:30 PM daily.' },
          { q: 'Can I show my digital ticket on my smartphone while boarding?', a: 'Yes! MSRTC conductors accept digital QR E-tickets shown on your mobile phone along with any valid photo ID (Aadhaar, PAN, Driving License).' },
          { q: 'How do concessions work for senior citizens?', a: 'Senior citizens aged 65 to 74 receive 50% discount and citizens aged 75+ travel free under Amrit Jyeshtha Citizen scheme by presenting valid government age proof.' }
        ]}
      />

      {/* MSRTC Schedule Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* Launch Interactive MSRTC Engine Card */}
        <div className="rounded-3xl bg-gradient-to-r from-red-950/80 via-navy-900 to-rose-950/60 border border-red-500/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>{MSRTC_BANNER_TEXT}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Launch Interactive MSRTC Booking Module
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Experience the full Maharashtra State Transport digital reservation system with 2x2 interactive seat layouts, Mahila Samman &amp; Amrit Jyeshtha concessions, simulated digital bus pass generation, and instant refund tracking.
            </p>
          </div>

          <Link
            to="/msrtc"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 shrink-0 transition-all hover:scale-105"
          >
            <span>Open MSRTC Engine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-electric-500/20">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Bus className="w-5 h-5 text-electric-400" />
              <h3 className="text-base font-bold text-white">Live MSRTC Flagship Bus Schedules</h3>
            </div>
            <span className="text-xs font-semibold text-electric-300 bg-electric-600/20 px-2.5 py-1 rounded-full border border-electric-500/30">
              State Transport Network
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Service Type</th>
                  <th className="py-3 px-4 font-semibold">Origin Point</th>
                  <th className="py-3 px-4 font-semibold">Destination Stand</th>
                  <th className="py-3 px-4 font-semibold">Frequency</th>
                  <th className="py-3 px-4 font-semibold">Govt Tariff</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {msrtcRoutes.map((route, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-electric-400"></span>
                        {route.service}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{route.from}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-medium">{route.to}</td>
                    <td className="py-3.5 px-4 text-slate-400">{route.freq}</td>
                    <td className="py-3.5 px-4 font-extrabold text-white font-display">{route.fare}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/msrtc/results"
                        className="inline-block px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-md shadow-red-600/30 text-xs"
                      >
                        Reserve Seat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
