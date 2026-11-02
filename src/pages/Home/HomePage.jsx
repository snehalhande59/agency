import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Plane, 
  Compass, 
  Bus, 
  Train, 
  ChevronDown,
  Headphones,
  Percent,
  CreditCard,
  Ticket,
  Shield,
  Zap,
  Globe2
} from 'lucide-react';
import { HeroSlideshow } from '../../components/home/HeroSlideshow';
import { BookingSearchPanel } from '../../components/common/BookingSearchPanel';
import { VehicleCard } from '../../components/common/VehicleCard';
import { servicesData, vehiclesData, destinationsData, testimonialsData, faqsData } from '../../data/mockData';
import { useBooking } from '../../context/BookingContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const { openBookingModal, updateSearchParams } = useBooking();
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(0);

  const vehicleCategories = ['All', 'Sedan', 'SUV', 'Luxury Sedan', 'Tempo Traveller', 'Mini Bus', 'Luxury Coach'];

  const filteredVehicles = selectedVehicleCategory === 'All'
    ? vehiclesData
    : vehiclesData.filter(v => v.category === selectedVehicleCategory);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Car': return Car;
      case 'Compass': return Compass;
      case 'PlaneTakeoff': return Plane;
      case 'BusFront': return Bus;
      case 'Sparkles': return Sparkles;
      case 'Users': return Users;
      case 'Train': return Train;
      case 'MapPin': return MapPin;
      case 'CreditCard': return CreditCard;
      default: return Car;
    }
  };

  const handleDestinationClick = (dest) => {
    updateSearchParams({
      pickup: 'Mumbai (Direct Hub)',
      drop: dest.name,
      serviceType: 'outstation-cabs'
    });
    openBookingModal({
      category: 'Executive SUV - Innova Crysta',
      drop: dest.name,
      pickup: 'Mumbai'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. CINEMATIC REAL-IMAGE HERO SLIDESHOW SECTION */}
      <section className="relative pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <HeroSlideshow />

        {/* Floating Booking Search Panel Overlapping Hero */}
        <div className="relative z-20 -mt-14 sm:-mt-20 px-2 sm:px-4">
          <BookingSearchPanel />
        </div>
      </section>

      {/* 2. POPULAR MAHARASHTRA DESTINATIONS (Elevated directly below Hero Booking Bar for Prime Visibility) */}
      <section id="destinations-section" className="py-16 sm:py-20 bg-white border-b border-[#E5EDF5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">Maharashtra Tourism &amp; Outstation Escapes</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display">
              Popular Maharashtra Destinations
            </h2>
            <p className="text-sm text-[#64748B]">
              One-way drops and scenic round trips with guaranteed chauffeur availability across Maharashtra and coastal Goa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinationsData.map((dest) => (
              <div
                key={dest.name}
                onClick={() => handleDestinationClick(dest)}
                className="destination-image-card group relative rounded-3xl overflow-hidden bg-slate-900 cursor-pointer border border-[#E5EDF5] hover:border-[#3898D8] shadow-md hover:shadow-2xl transition-all duration-300 h-84 flex flex-col justify-end p-5"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20 group-hover:via-slate-950/50 transition-colors"></div>

                <div className="relative z-10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/30 shadow-sm"
                      style={{ color: '#FFFFFF' }}
                    >
                      {dest.duration}
                    </span>
                    <span 
                      className="text-xs font-black px-3 py-1 rounded-xl bg-[#3898D8] shadow-md shadow-[#3898D8]/40"
                      style={{ color: '#FFFFFF' }}
                    >
                      From {dest.startingPrice}
                    </span>
                  </div>

                  {/* Prominently Highlighted Destination Title */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#19A89A] shrink-0 animate-pulse shadow-md shadow-[#19A89A]" />
                    <h3 
                      className="destination-name-white text-2xl font-black tracking-tight font-display transition-colors"
                      style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8)' }}
                    >
                      {dest.name}
                    </h3>
                  </div>

                  <p 
                    className="destination-text-white text-xs font-medium line-clamp-1"
                    style={{ color: '#F1F5F9', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                  >
                    {dest.tagline}
                  </p>

                  <div className="pt-2.5 flex items-center justify-between text-xs border-t border-white/25 font-bold">
                    <span className="flex items-center gap-1.5" style={{ color: '#FFFFFF', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                      <MapPin className="w-3.5 h-3.5 text-[#19A89A]" />
                      <span style={{ color: '#FFFFFF' }}>{dest.distance}</span>
                    </span>
                    <span 
                      className="px-3 py-1 rounded-lg font-bold flex items-center gap-1 shadow-md group-hover:translate-x-1 transition-all"
                      style={{ backgroundColor: '#3898D8', color: '#FFFFFF' }}
                    >
                      Book Route →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. TRAVEL SERVICES SECTION */}
      <section id="services-section" className="py-20 sm:py-24 bg-[#EFF7FC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEEFF] text-[#3898D8] text-xs font-bold border border-[#3898D8]/20">
              <Car className="w-3.5 h-3.5" />
              <span>Unified Mobility Platform</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display">
              Comprehensive Travel Services
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              One ecosystem for all your travel needs: Chauffeur-driven cabs, luxury Volvo coaches, airport drops, confirmed train tickets, and MSRTC state connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden flex flex-col group border border-[#E5EDF5] hover:border-[#3898D8] shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-[#E5EDF5] text-[#3898D8] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {service.badge}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-3 group-hover:bg-[#3898D8] group-hover:text-white transition-colors shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#153B5B] mb-2 group-hover:text-[#3898D8] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5EDF5] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-bold">Starting Tariff</span>
                        <span className="text-xs font-bold text-[#153B5B]">{service.startingPrice}</span>
                      </div>
                      <Link
                        to={service.slug}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3898D8] group-hover:text-[#287DB8] transition-colors group-hover:translate-x-1"
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] relative border-b border-[#E5EDF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">The AeroVoyage Standard</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="text-sm text-[#64748B]">
              We eliminate typical travel friction with verified professionals, upfront transparent billing, and 24/7 highway concierge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#3898D8] hover:bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#153B5B] mb-2">99.4% On-Time Punctuality</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Smart dispatch algorithms and flight delay synchronization guarantee your chauffeur arrives before scheduled pickup.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#3898D8] hover:bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#153B5B] mb-2">Verified Highway Chauffeurs</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Background-verified, police-cleared, and trained for courteous long-distance driving and defensive safety tactics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#3898D8] hover:bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-4">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#153B5B] mb-2">Zero Surge Guarantee</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                No rain surges or festive price hikes on planned outstation trips, airport rides, and executive corporate rentals.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#3898D8] hover:bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#153B5B] mb-2">Sanitized &amp; Premium Fleet</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Regular vehicle maintenance, deep steam cleaning, pristine upholstery, and dual-zone climate air conditioning.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#3898D8] hover:bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#153B5B] mb-2">24/7 Highway Command Desk</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Dedicated trip managers continuously monitor live GPS telemetry to assist with routing, tolls, or roadside support.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#3898D8] hover:bg-white shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#153B5B] mb-2">SOS &amp; Real-Time Tracking</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Share live journey links with loved ones or company dispatch managers with emergency quick response integration.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FEATURED VEHICLES FLEET */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">Class &amp; Comfort</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display mt-1">
                Our Featured Fleet
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {vehicleCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedVehicleCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedVehicleCategory === cat
                      ? 'bg-[#3898D8] text-white shadow-md shadow-[#3898D8]/20'
                      : 'bg-white border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 sm:py-24 bg-[#EFF7FC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">Effortless Journey</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display">
              How AeroVoyage Works
            </h2>
            <p className="text-sm text-[#64748B]">
              Four frictionless steps to reserve your premium ride in under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] text-center relative group hover:border-[#3898D8] shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#DCEEFF] text-[#3898D8] font-extrabold text-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3898D8] group-hover:text-white transition-colors">
                01
              </div>
              <h3 className="text-base font-bold text-[#153B5B] mb-2">Select Your Service</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Choose between Outstation, Airport Transfer, Local Taxi, Luxury Mini Bus, Train, or MSRTC.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] text-center relative group hover:border-[#3898D8] shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#DCEEFF] text-[#3898D8] font-extrabold text-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3898D8] group-hover:text-white transition-colors">
                02
              </div>
              <h3 className="text-base font-bold text-[#153B5B] mb-2">Enter Journey Details</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Specify pickup point, destination, date, departure timing, and number of guests.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] text-center relative group hover:border-[#3898D8] shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#DCEEFF] text-[#3898D8] font-extrabold text-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3898D8] group-hover:text-white transition-colors">
                03
              </div>
              <h3 className="text-base font-bold text-[#153B5B] mb-2">Review Vehicle Fleet</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Compare models, luggage capacity, seating, and transparent upfront pricing cards.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] text-center relative group hover:border-[#19A89A] shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#E6F7F5] text-[#19A89A] font-extrabold text-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#19A89A] group-hover:text-white transition-colors">
                04
              </div>
              <h3 className="text-base font-bold text-[#153B5B] mb-2">Instant Confirmation</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Receive instant confirmation with vehicle number, driver credentials, and GPS sync.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. CORPORATE TRANSPORTATION PROMOTIONAL SECTION */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden border-y border-[#E5EDF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#153B5B] via-[#10304C] to-[#1E6A9E] rounded-3xl p-8 sm:p-12 shadow-2xl text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white border border-white/20 text-xs font-bold backdrop-blur-md">
                  <Building2 className="w-3.5 h-3.5 text-[#3898D8]" />
                  <span>Enterprise Mobility Management Suite</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
                  Smart Corporate Transportation. <br />
                  <span className="text-[#3898D8]">Simplified.</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Empower your organization with safe, compliant, automated employee commutes and VIP executive rentals. Manage rosters, vehicle telemetry, and single consolidated GST invoicing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
                    <span>Employee Daily Pickup &amp; Drop Roster</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
                    <span>Monthly Corporate Cab Contracts</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
                    <span>Dynamic AI Route Optimization</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
                    <span>VIP Executive Business Travel</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
                    <span>Dedicated 24/7 Corporate Account Lead</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
                    <span>Automated MIS &amp; CO2 Carbon Auditing</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/corporate"
                    className="px-7 py-3.5 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm shadow-lg shadow-[#3898D8]/30 transition-all flex items-center gap-2"
                  >
                    <span>Explore Corporate Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/corporate/demo"
                    className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all backdrop-blur-md"
                  >
                    Schedule Enterprise Demo
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold text-white">Live Enterprise Console</span>
                    <span className="text-[10px] font-mono text-[#19A89A] bg-[#19A89A]/20 px-2 py-0.5 rounded border border-[#19A89A]/30">LIVE STATUS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-300">Total Employees</span>
                      <div className="text-xl font-extrabold text-white font-display">4,820</div>
                      <span className="text-[10px] text-[#19A89A]">Across 3 IT Parks</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-300">Active Vehicles</span>
                      <div className="text-xl font-extrabold text-[#3898D8] font-display">184 Cabs</div>
                      <span className="text-[10px] text-slate-300">GPS Tracked</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/10 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Today's Shift Punctuality</span>
                      <span className="text-[#19A89A] font-bold">99.4%</span>
                    </div>
                    <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#19A89A] h-full w-[99.4%]"></div>
                    </div>
                  </div>

                  <Link
                    to="/corporate/dashboard"
                    className="w-full py-2.5 rounded-xl bg-white text-[#153B5B] hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Launch Interactive Dashboard Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 sm:py-24 bg-[#EFF7FC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">Client Stories</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display">
              Loved by Tourists &amp; Corporate Leaders
            </h2>
            <p className="text-sm text-[#64748B]">
              Read how AeroVoyage delivers consistent reliability across leisure and corporate transit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsData.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#E5EDF5] hover:border-[#3898D8] shadow-sm hover:shadow-md flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#E5EDF5]">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#3898D8]/30"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#153B5B]">{t.name}</h4>
                    <p className="text-[10px] text-[#64748B]">{t.role}</p>
                    <span className="text-[10px] text-[#3898D8] font-semibold">{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. HOMEPAGE FAQS ACCORDION */}
      <section className="py-20 sm:py-24 bg-white border-t border-[#E5EDF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">Clear Answers</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#153B5B] font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Everything you need to know about booking, chauffeurs, cancellation, and enterprise contracts.
            </p>
          </div>

          <div className="space-y-3">
            {faqsData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#153B5B] hover:text-[#3898D8] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#3898D8] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E5EDF5] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
