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
  FileCheck
} from 'lucide-react';
import { corporateMetrics } from '../../data/mockData';

export const CorporateOverviewPage = () => {
  return (
    <div className="space-y-10 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5EDF5] p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEEFF] text-[#3898D8] border border-[#3898D8]/20 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Enterprise Transportation Management System (ETMS)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display leading-tight">
            Integrated Corporate <br />
            <span className="text-[#3898D8]">Fleet & Mobility Solutions</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Eliminate transport logistics headaches. From Fortune 500 tech campuses in BKC and Hinjawadi to high-growth startups, AeroVoyage powers end-to-end employee daily commutes, executive VIP rentals, and centralized corporate travel billing.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/corporate/demo"
              className="px-6 py-3 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>Request RFP / Enterprise Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/corporate/admin"
              className="px-6 py-3 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5] font-semibold text-xs sm:text-sm transition-all"
            >
              View Live Fleet Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <div className="text-[#64748B] text-xs font-semibold mb-1">Managed Employees</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display">{corporateMetrics.totalEmployees.toLocaleString()}</div>
          <div className="text-[11px] text-[#19A89A] font-semibold mt-1">Across 3 Metro Regions</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <div className="text-[#64748B] text-xs font-semibold mb-1">Active Dedicated Cabs</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#3898D8] font-display">{corporateMetrics.activeVehicles} Cabs</div>
          <div className="text-[11px] text-[#64748B] mt-1">100% GPS Enabled</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <div className="text-[#64748B] text-xs font-semibold mb-1">SLA Punctuality</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display">{corporateMetrics.onTimePunctuality}</div>
          <div className="text-[11px] text-[#19A89A] font-semibold mt-1">ISO 9001 Standard</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EDF5] shadow-sm">
          <div className="text-[#64748B] text-xs font-semibold mb-1">CO2 Green Offset</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#19A89A] font-display">{corporateMetrics.co2SavedKg}</div>
          <div className="text-[11px] text-[#64748B] mt-1">Via Smart Carpooling</div>
        </div>
      </div>

      {/* Corporate Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm hover:shadow-md transition-all space-y-3">
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

        <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">Monthly Dedicated Cab Contracts</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Dedicated vehicles and executive chauffeurs on fixed monthly retainers for C-suite leaders and project delivery squads.
          </p>
          <Link to="/corporate/monthly-contracts" className="text-xs font-bold text-[#3898D8] flex items-center gap-1 hover:underline pt-2">
            <span>Contract Terms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">Consolidated GST & Analytics</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Single consolidated monthly GST invoice, department-wise cost center breakdown, and comprehensive audit-ready reporting.
          </p>
          <Link to="/corporate/pricing" className="text-xs font-bold text-[#3898D8] flex items-center gap-1 hover:underline pt-2">
            <span>Enterprise Rates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
