import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  CalendarClock, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Zap,
  Globe2,
  FileCheck,
  Truck,
  Car,
  Briefcase,
  CreditCard,
  LogIn,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { corporateMetrics } from '../../data/mockData';

export const CorporateOverviewPage = () => {
  const rolePortals = [
    {
      title: 'Company HR & Admin Portal',
      marathiSubtitle: 'कंपनी ॲडमिन डॅशबोर्ड',
      desc: 'Employee rostering, shift approvals, emergency SOS alerts, and mobility compliance.',
      path: '/corporate/admin',
      icon: Building2,
      badge: 'Admin Console',
      badgeColor: 'bg-[#DCEEFF] text-[#3898D8] border-[#3898D8]/20',
      btnText: 'Launch Admin Portal'
    },
    {
      title: 'Corporate Employee App',
      marathiSubtitle: 'कर्मचारी ट्रॅव्हल ॲप',
      desc: 'Daily office commute booking, live cab tracking, boarding OTP, and SOS panic button.',
      path: '/corporate/employee',
      icon: Users,
      badge: 'Employee Hub',
      badgeColor: 'bg-[#E6F7F5] text-[#19A89A] border-[#19A89A]/30',
      btnText: 'Launch Employee App'
    },
    {
      title: 'Transport Dispatch Ops',
      marathiSubtitle: 'ट्रान्सपोर्ट ऑपरेशन्स डेस्क',
      desc: 'Automated corridor routing, vehicle & driver allocation, and live fleet telemetry.',
      path: '/corporate/transport-manager',
      icon: Truck,
      badge: 'Fleet Ops Desk',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      btnText: 'Launch Transport Ops'
    },
    {
      title: 'Chauffeur & Driver Console',
      marathiSubtitle: 'ड्रायव्हर / चालक ॲप',
      desc: 'Mobile-friendly assigned duty rosters, passenger pickup verification, and trip completion.',
      path: '/corporate/driver',
      icon: Car,
      badge: 'Driver App',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      btnText: 'Launch Driver App'
    },
    {
      title: 'Vendor Fleet Partner',
      marathiSubtitle: 'फ्लीट व्हेंडर पार्टनर',
      desc: 'Manage contracted commercial vehicles, chauffeur compliance, and SLA logs.',
      path: '/corporate/vendor',
      icon: Briefcase,
      badge: 'Vendor Partner',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      btnText: 'Launch Vendor Desk'
    },
    {
      title: 'Finance & B2B Billing',
      marathiSubtitle: 'फायनान्स व इनव्हॉइसिंग',
      desc: 'Department-wise billing ledgers, Net-30 credit terms, and GST tax statements.',
      path: '/corporate/finance',
      icon: CreditCard,
      badge: 'Finance Desk',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      btnText: 'Launch Finance Portal'
    }
  ];

  return (
    <div className="space-y-10 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5EDF5] p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DCEEFF] text-[#3898D8] border border-[#3898D8]/20 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Enterprise Transportation Management System (ETMS)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#153B5B] font-display leading-tight">
            Integrated Corporate <br />
            <span className="text-[#3898D8]">Fleet & Mobility Solutions</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Eliminate transport logistics headaches. From Fortune 500 tech campuses in BKC and Hinjawadi to high-growth startups, AeroVoyage powers end-to-end employee daily commutes, executive VIP rentals, and centralized corporate travel billing.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/corporate/admin"
              className="px-6 py-3 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#3898D8]/30 transition-all flex items-center gap-2"
            >
              <span>Open HR Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/corporate/login"
              className="px-6 py-3 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5] font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4 text-[#3898D8]" />
              <span>Multi-Role Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Direct Portal Launch Hub */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EDF5] pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3898D8]">Live Operational Modules</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#153B5B]">
              Direct Corporate Portals (थेट कॉर्पोरेट पोर्टल्स)
            </h2>
          </div>
          <p className="text-xs text-[#64748B]">
            Click any portal below for instant 1-click access to its interactive workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rolePortals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div 
                key={portal.path}
                className="bg-white rounded-3xl p-6 border border-[#E5EDF5] hover:border-[#3898D8] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${portal.badgeColor}`}>
                      {portal.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#153B5B] group-hover:text-[#3898D8] transition-colors">
                      {portal.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#19A89A]">{portal.marathiSubtitle}</p>
                    <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                      {portal.desc}
                    </p>
                  </div>
                </div>

                <Link
                  to={portal.path}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EFF7FC] group-hover:bg-[#3898D8] text-[#153B5B] group-hover:text-white font-bold text-xs transition-all flex items-center justify-between border border-[#E5EDF5] group-hover:border-[#3898D8]"
                >
                  <span>{portal.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-xs">
          <div className="text-[#64748B] text-xs font-semibold mb-1">Managed Employees</div>
          <div className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">{corporateMetrics.totalEmployees.toLocaleString()}</div>
          <div className="text-[11px] text-[#19A89A] font-semibold mt-1">Across 3 Metro Regions</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-xs">
          <div className="text-[#64748B] text-xs font-semibold mb-1">Active Dedicated Cabs</div>
          <div className="text-2xl sm:text-3xl font-black text-[#3898D8] font-display">{corporateMetrics.activeVehicles} Cabs</div>
          <div className="text-[11px] text-[#64748B] mt-1">100% GPS Enabled</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-xs">
          <div className="text-[#64748B] text-xs font-semibold mb-1">SLA Punctuality</div>
          <div className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">{corporateMetrics.onTimePunctuality}</div>
          <div className="text-[11px] text-[#19A89A] font-semibold mt-1">ISO 9001 Standard</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-xs">
          <div className="text-[#64748B] text-xs font-semibold mb-1">CO2 Green Offset</div>
          <div className="text-2xl sm:text-3xl font-black text-[#19A89A] font-display">{corporateMetrics.co2SavedKg}</div>
          <div className="text-[11px] text-[#64748B] mt-1">Via Smart Carpooling</div>
        </div>
      </div>

      {/* Corporate Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-xs hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">Daily Employee Pickup & Drop</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Automated rostering, dynamic geofenced routing, women employee safety protocols with female security marshals on night shifts.
          </p>
          <Link to="/corporate/daily-pickup" className="text-xs font-bold text-[#3898D8] flex items-center gap-1 hover:underline pt-2">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-xs hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#19A89A] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">Compliance & Chauffeur Vetting</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            100% police verification, defensive driving certifications, breathalyzer audits, and POSH women safety guidelines.
          </p>
          <Link to="/corporate/safety" className="text-xs font-bold text-[#19A89A] flex items-center gap-1 hover:underline pt-2">
            <span>Safety Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-xs hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EFF7FC] text-[#3898D8] flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">Centralized GST Invoicing</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Monthly consolidated corporate ledger with cost-center tracking, department segregation, and automated GST input credit invoices.
          </p>
          <Link to="/corporate/pricing" className="text-xs font-bold text-[#3898D8] flex items-center gap-1 hover:underline pt-2">
            <span>Pricing Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
