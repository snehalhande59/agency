import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  PhoneCall, 
  ChevronDown,
  Info,
  DollarSign,
  Tag,
  Navigation
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { VehicleCard } from '../../components/common/VehicleCard';

export const ServicePageTemplate = ({
  title,
  subtitle,
  tagline,
  heroImage,
  badge,
  serviceKey,
  description,
  pickupPlaceholder = 'Enter pickup point',
  dropPlaceholder = 'Enter drop destination',
  vehicles = [],
  features = [],
  pricingPlans = [],
  faqs = [],
  extraFields = null
}) => {
  const navigate = useNavigate();
  const { openBookingModal, updateSearchParams } = useBooking();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00 AM');
  const [guests, setGuests] = useState(2);
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[0]?.name || '');
  const [openFaq, setOpenFaq] = useState(0);

  const serviceWorkflowMap = {
    'local-taxi': 'local-taxi',
    'outstation-cabs': 'outstation-one-way',
    'airport-transfers': 'airport-pickup',
    'mini-bus': 'mini-bus',
    'luxury-bus': 'luxury-bus',
    'group-travel': 'group-transportation'
  };

  const handleQuickBook = (e) => {
    e.preventDefault();
    const targetWorkflow = serviceWorkflowMap[serviceKey] || 'outstation-one-way';
    updateSearchParams({
      pickup: pickup || 'City Center',
      drop: drop || 'Destination',
      date,
      time,
      passengers: guests,
      serviceType: serviceKey
    });

    navigate(`/book?service=${targetWorkflow}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[#E5EDF5]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: `url('${heroImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#153B5B]/90 via-[#153B5B]/80 to-[#153B5B]/60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3898D8]/20 text-[#DCEEFF] border border-[#3898D8]/40 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3898D8]" />
                <span>{badge || 'Premium Travel Service'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight drop-shadow-sm">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-xl font-normal">
                {subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-100 pt-2">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
                  <span>Instant Confirmation</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
                  <span>Verified Chauffeur</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
                  <span>Transparent Rates</span>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-xl text-[#153B5B]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5EDF5]">
                  <h3 className="text-sm font-bold text-[#153B5B] flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#3898D8]" />
                    <span>Quick Reservation Form</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-[#19A89A] bg-[#19A89A]/10 px-2 py-0.5 rounded">24/7 Available</span>
                </div>

                <form onSubmit={handleQuickBook} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder={pickupPlaceholder}
                        className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] placeholder-[#64748B] focus:outline-none focus:border-[#3898D8] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                      Drop Destination
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#19A89A] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                        placeholder={dropPlaceholder}
                        className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] placeholder-[#64748B] focus:outline-none focus:border-[#3898D8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                        Passengers
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8]"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={6}>6 Guests</option>
                        <option value={14}>14+ (Mini Bus)</option>
                        <option value={35}>35+ (Coach)</option>
                      </select>
                    </div>
                  </div>

                  {extraFields}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Instant Price Quote & Reserve</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DESCRIPTION & FEATURES */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">{tagline}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display">
                Engineered for Maximum Comfort & Zero Delays
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {description}
              </p>

              <div className="space-y-3 pt-2">
                {features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#153B5B]">{feat.title}</h4>
                      <p className="text-xs text-[#64748B]">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-[#E5EDF5] shadow-lg relative bg-white">
                <img 
                  src={heroImage} 
                  alt={title} 
                  className="w-full h-[400px] object-cover" 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1571501679680-de32f1e7a412?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#153B5B]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5EDF5] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#153B5B]">Chauffeur Safety Guarantee</h4>
                      <p className="text-xs text-[#64748B]">Police verified, SOS equipped, clean interiors.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#3898D8] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. AVAILABLE FLEET CARDS */}
      {vehicles && vehicles.length > 0 && (
        <section className="py-16 bg-[#EFF7FC] border-t border-[#E5EDF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display">
                Available Vehicle Options
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Choose the vehicle model suited to your luggage, group size, and comfort level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. PRICING PACKAGES */}
      {pricingPlans && pricingPlans.length > 0 && (
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">Fixed & Fair</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display mt-1">
                Transparent Pricing Packages
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                All inclusive packages with zero hidden fees. Tolls, driver allowance, and GST itemized.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-3xl p-6 bg-white border flex flex-col justify-between transition-all shadow-sm hover:shadow-md ${
                    plan.popular ? 'border-[#3898D8] ring-2 ring-[#3898D8]/20' : 'border-[#E5EDF5]'
                  }`}
                >
                  <div>
                    {plan.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#3898D8] text-white mb-3 inline-block">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-[#153B5B] mb-1">{plan.name}</h3>
                    <p className="text-xs text-[#64748B] mb-4">{plan.desc}</p>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display mb-4">
                      {plan.price}
                    </div>

                    <div className="space-y-2 mb-6 border-t border-[#E5EDF5] pt-4">
                      {plan.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#64748B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#19A89A] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlan(plan.name);
                      openBookingModal({
                        category: plan.name,
                        fare: plan.price
                      });
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                      plan.popular
                        ? 'bg-[#3898D8] hover:bg-[#2b82bd] text-white shadow-sm'
                        : 'bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5]'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. SERVICE FAQS */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 bg-[#EFF7FC] border-t border-[#E5EDF5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#153B5B] font-display">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-[#153B5B] hover:text-[#3898D8] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#3898D8] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#64748B] leading-relaxed border-t border-[#E5EDF5] pt-2.5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. BOTTOM CTA */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#153B5B] via-[#1b4b73] to-[#153B5B] p-8 sm:p-12 border border-[#3898D8]/20 text-center relative overflow-hidden shadow-xl text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mb-3">
              Ready to Book Your {title}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto mb-6">
              Lock in your ride with 100% price certainty, professional chauffeur guarantee, and zero surge charges.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-3 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                Book Instant Demo Ride
              </button>
              <a
                href="tel:18002098899"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#DCEEFF]" />
                <span>Call 24/7 Desk: 1800-209-8899</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
