import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  Globe2,
  Lock,
  Headphones
} from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-white border-t border-[#E5EDF5] pt-16 pb-12 overflow-hidden text-[#153B5B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-[#E5EDF5] mb-12">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="w-12 h-12 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#3898D8]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#153B5B]">100% Verified Fleet</h4>
              <p className="text-xs text-[#64748B]">Chauffeur background checks</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="w-12 h-12 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#3898D8]">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#153B5B]">24/7 Operations Desk</h4>
              <p className="text-xs text-[#64748B]">Real-time trip concierge</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="w-12 h-12 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#3898D8]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#153B5B]">Transparent Pricing</h4>
              <p className="text-xs text-[#64748B]">No surge guarantee on rentals</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="w-12 h-12 rounded-xl bg-[#DCEEFF] flex items-center justify-center text-[#3898D8]">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#153B5B]">Enterprise Mobility</h4>
              <p className="text-xs text-[#64748B]">ISO 9001:2015 SLA standard</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5EDF5]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3898D8] to-[#19A89A] p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Car className="w-5 h-5 text-[#3898D8]" />
                </div>
              </div>
              <span className="text-xl font-black text-[#153B5B] font-display">Aero<span className="text-[#3898D8]">Voyage</span> <span className="text-xs text-[#3898D8] font-bold px-1.5 py-0.5 bg-[#DCEEFF] rounded border border-[#3898D8]/20">TRAVEL</span></span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-sm">
              India's premier unified transport & corporate travel tech ecosystem. Providing executive cabs, luxury buses, outstation transit, airport transfers, and state-wide group logistics.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#153B5B] uppercase tracking-wider mb-2">Subscribe for Travel Updates & Corporate Perks</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter business or personal email"
                  required
                  className="bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2 text-sm text-[#153B5B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3898D8] hover:bg-[#287DB8] text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-[#3898D8]/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#19A89A] mt-2 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you! You are now subscribed to executive updates.</span>
                </div>
              )}
            </div>
          </div>

          {/* Travel Services */}
          <div>
            <h4 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 border-l-2 border-[#3898D8] pl-2">Travel Services</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link to="/services/local-taxi" className="hover:text-[#3898D8] transition-colors">Local City Taxi</Link></li>
              <li><Link to="/services/outstation-cabs" className="hover:text-[#3898D8] transition-colors">Outstation Cabs</Link></li>
              <li><Link to="/services/airport-transfers" className="hover:text-[#3898D8] transition-colors">Airport Pickup & Drop</Link></li>
              <li><Link to="/services/mini-bus" className="hover:text-[#3898D8] transition-colors">Mini Bus (13-26 Seater)</Link></li>
              <li><Link to="/services/luxury-bus" className="hover:text-[#3898D8] transition-colors">Luxury Volvo Coach</Link></li>
              <li><Link to="/services/group-travel" className="hover:text-[#3898D8] transition-colors">Group Transportation</Link></li>
              <li><Link to="/services/train-tickets" className="hover:text-[#3898D8] transition-colors">Railway Reservations</Link></li>
              <li><Link to="/services/maharashtra-st-bus" className="hover:text-[#3898D8] transition-colors">Maharashtra ST Bus</Link></li>
              <li><Link to="/services/ncmc-transit" className="hover:text-[#3898D8] transition-colors">NCMC Transit Smart Card</Link></li>
            </ul>
          </div>

          {/* Corporate Solutions */}
          <div>
            <h4 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 border-l-2 border-[#3898D8] pl-2">Corporate Portal</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link to="/corporate" className="hover:text-[#3898D8] transition-colors">Corporate Overview</Link></li>
              <li><Link to="/corporate/employee-transport" className="hover:text-[#3898D8] transition-colors">Employee Daily Pickup</Link></li>
              <li><Link to="/corporate/monthly-contracts" className="hover:text-[#3898D8] transition-colors">Monthly Cab Contracts</Link></li>
              <li><Link to="/corporate/business-travel" className="hover:text-[#3898D8] transition-colors">Executive Business Travel</Link></li>
              <li><Link to="/corporate/pricing" className="hover:text-[#3898D8] transition-colors">Enterprise Pricing</Link></li>
              <li><Link to="/corporate/demo" className="hover:text-[#3898D8] transition-colors">Request Enterprise Demo</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#3898D8] transition-colors">Client Fleet Dashboard</Link></li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-4 border-l-2 border-[#3898D8] pl-2">Support & HQ</h4>
            <div className="space-y-3 text-xs text-[#64748B]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#3898D8] shrink-0 mt-0.5" />
                <span>One BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#3898D8] shrink-0" />
                <span className="text-[#153B5B] font-semibold">+91 1800 209 8899 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3898D8] shrink-0" />
                <span>concierge@aerovoyage.com</span>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <Link to="/faqs" className="text-[#3898D8] hover:underline font-medium">FAQs</Link>
                <span>•</span>
                <Link to="/about" className="text-[#3898D8] hover:underline font-medium">About</Link>
                <span>•</span>
                <Link to="/contact" className="text-[#3898D8] hover:underline font-medium">Contact</Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© {new Date().getFullYear()} AeroVoyage Travel Mobility Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#153B5B] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#153B5B] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#153B5B] cursor-pointer">Chauffeur Safety Charter</span>
            <span className="hover:text-[#153B5B] cursor-pointer">SLA Agreement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
