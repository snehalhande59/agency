import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, 
  Menu, 
  X, 
  ChevronDown, 
  Building2, 
  Plane, 
  Compass, 
  Bus, 
  Train, 
  PhoneCall, 
  User, 
  ShieldCheck,
  CalendarCheck,
  CreditCard
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const serviceLinks = [
    { name: 'Local Taxi Services', path: '/services/local-taxi', icon: Car, desc: 'Point-to-point urban rides' },
    { name: 'Outstation Cabs', path: '/services/outstation-cabs', icon: Compass, desc: 'Intercity one-way & round trips' },
    { name: 'Airport Transfers', path: '/services/airport-transfers', icon: Plane, desc: 'Flight synced pickups & drops' },
    { name: 'Mini Bus Booking', path: '/services/mini-bus', icon: Bus, desc: '13-26 seater luxury travellers' },
    { name: 'Luxury Bus Booking', path: '/services/luxury-bus', icon: Bus, desc: 'Multi-axle Volvo & Scania coaches' },
    { name: 'Group Transportation', path: '/services/group-travel', icon: User, desc: 'Conferences, weddings & tours' },
    { name: 'Railway Ticket Booking', path: '/railway', icon: Train, desc: 'Confirmed train reservations' },
    { name: 'Maharashtra ST Bus', path: '/msrtc', icon: ShieldCheck, desc: 'MSRTC Shivneri & Shivshahi' },
    { name: 'NCMC Transit Smart Card', path: '/ncmc', icon: CreditCard, desc: 'Contactless Metro & BEST pass' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-[#E5EDF5]' : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-[#E5EDF5]/70'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
          
          {/* Brand Logo - Reliable Click Redirection to Home with Smooth Scroll to Top */}
          <Link 
            to="/" 
            onClick={() => { 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              setIsOpen(false); 
            }} 
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#3898D8] to-[#19A89A] p-0.5 shadow-sm group-hover:shadow-md transition-all shrink-0">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#3898D8] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#153B5B] font-display">
                  Aero<span className="text-[#3898D8]">Voyage</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#DCEEFF] text-[#3898D8] border border-[#3898D8]/20">
                  LUXE
                </span>
              </div>
              <p className="text-[9px] text-[#64748B] tracking-wider font-semibold">
                PREMIUM MOBILITY &amp; TOURS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${isActive('/') ? 'text-[#3898D8] bg-[#DCEEFF]/70' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button 
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${location.pathname.startsWith('/services') ? 'text-[#3898D8] bg-[#DCEEFF]/70' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-[#3898D8]' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdown && (
                <div className="absolute top-full left-0 w-[540px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#E5EDF5] grid grid-cols-2 gap-2">
                    {serviceLinks.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#EFF7FC] transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-[#DCEEFF] text-[#3898D8] group-hover:bg-[#3898D8] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#153B5B] group-hover:text-[#3898D8] transition-colors">
                              {service.name}
                            </div>
                            <div className="text-xs text-[#64748B] line-clamp-1">{service.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/services/outstation-cabs" 
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${isActive('/services/outstation-cabs') ? 'text-[#3898D8] bg-[#DCEEFF]/70' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
            >
              Outstation
            </Link>

            <Link 
              to="/services/airport-transfers" 
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${isActive('/services/airport-transfers') ? 'text-[#3898D8] bg-[#DCEEFF]/70' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
            >
              Airport Transfer
            </Link>

            <Link 
              to="/services/luxury-bus" 
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${isActive('/services/luxury-bus') ? 'text-[#3898D8] bg-[#DCEEFF]/70' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
            >
              Bus &amp; Train
            </Link>

            <Link 
              to="/corporate" 
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${location.pathname.startsWith('/corporate') ? 'text-white bg-[#3898D8] shadow-sm' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
            >
              <Building2 className="w-4 h-4" />
              <span>Corporate</span>
            </Link>

            <Link 
              to="/about" 
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${isActive('/about') ? 'text-[#3898D8] bg-[#DCEEFF]/70' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
            >
              About Us
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${isActive('/contact') ? 'text-[#3898D8] bg-[#DCEEFF]/70' : 'text-[#153B5B] hover:text-[#3898D8] hover:bg-[#EFF7FC]'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs & Auth */}
          <div className="hidden lg:flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] border border-[#DCEEFF] text-[#3898D8] text-xs font-bold transition-all shadow-xs"
                  title="Super Admin Dashboard"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] hover:border-[#3898D8]/50 text-[#153B5B] hover:text-[#3898D8] transition-all text-sm font-semibold"
                >
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover border border-[#3898D8]" />
                  <span className="font-bold truncate max-w-[130px]">{user.name}</span>
                </Link>
              </div>
            ) : (
              <Link 
                to="/login"
                className="text-sm font-bold text-[#153B5B] hover:text-[#3898D8] px-3 py-1.5 transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/book"
              className="px-4 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm shadow-md shadow-[#3898D8]/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Ride</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/book"
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#3898D8] text-white shadow-sm flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
    </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-[#E5EDF5] shadow-xl px-4 pt-4 pb-6 space-y-3 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3 border-b border-[#E5EDF5]">
            <Link
              to="/"
              className={`p-2.5 rounded-xl text-sm font-semibold ${isActive('/') ? 'bg-[#3898D8] text-white' : 'bg-[#EFF7FC] text-[#153B5B]'}`}
            >
              Home
            </Link>
            <Link
              to="/corporate"
              className={`p-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 ${location.pathname.startsWith('/corporate') ? 'bg-[#3898D8] text-white' : 'bg-[#EFF7FC] text-[#3898D8]'}`}
            >
              <Building2 className="w-4 h-4" />
              Corporate
            </Link>
            <Link
              to="/about"
              className={`p-2.5 rounded-xl text-sm font-semibold ${isActive('/about') ? 'bg-[#3898D8] text-white' : 'bg-[#EFF7FC] text-[#153B5B]'}`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`p-2.5 rounded-xl text-sm font-semibold ${isActive('/contact') ? 'bg-[#3898D8] text-white' : 'bg-[#EFF7FC] text-[#153B5B]'}`}
            >
              Contact Us
            </Link>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B] px-2 py-1">Services Fleet</p>
            {serviceLinks.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.path}
                  to={service.path}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#EFF7FC] text-[#153B5B] transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-[#DCEEFF] text-[#3898D8]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">{service.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5EDF5] flex flex-col gap-2">
            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center justify-between p-3 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B]"
              >
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                  <span className="text-sm font-bold">{user.name}</span>
                </div>
                <span className="text-xs bg-[#DCEEFF] text-[#3898D8] font-bold px-2 py-0.5 rounded">Dashboard →</span>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-sm font-bold text-[#153B5B]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full text-center py-2.5 rounded-xl bg-[#3898D8] text-sm font-bold text-white shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
