import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  CalendarClock, 
  FileText, 
  Briefcase, 
  CreditCard, 
  Send, 
  LayoutDashboard, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Map,
  Truck,
  Car,
  Bus,
  ShieldAlert,
  BarChart3,
  LogIn,
  FileSpreadsheet
} from 'lucide-react';

export const CorporateSidebar = ({ isOpen, onClose }) => {
  const rolePortals = [
    { name: 'HR Admin Console', path: '/corporate/admin', icon: LayoutDashboard },
    { name: 'Transport Dispatch', path: '/corporate/transport-manager', icon: Truck },
    { name: 'Employee Commute', path: '/corporate/employee', icon: Users },
    { name: 'Driver Console', path: '/corporate/driver', icon: Car },
    { name: 'Vendor Fleet Partner', path: '/corporate/vendor', icon: Briefcase },
    { name: 'Finance & Invoicing', path: '/corporate/finance', icon: CreditCard },
    { name: 'Reports & ESG Carbon', path: '/corporate/reports', icon: BarChart3 }
  ];

  const servicePages = [
    { name: 'Corporate Overview', path: '/corporate', icon: Building2, exact: true },
    { name: 'Daily Employee Commute', path: '/corporate/daily-pickup', icon: CalendarClock },
    { name: 'Office Bus & Shuttles', path: '/corporate/bus-shuttle', icon: Bus },
    { name: 'Monthly Fleet Retainers', path: '/corporate/monthly-contracts', icon: FileText },
    { name: 'Business Travel Desk', path: '/corporate/business-travel', icon: Briefcase },
    { name: 'Safety & POSH Escort', path: '/corporate/safety', icon: ShieldCheck }
  ];

  const commercialPages = [
    { name: 'Enterprise Pricing', path: '/corporate/pricing', icon: CreditCard },
    { name: 'Request Quote / RFP', path: '/corporate/quote', icon: FileSpreadsheet },
    { name: 'Book Interactive Demo', path: '/corporate/demo', icon: Send },
    { name: 'Multi-Role Login Hub', path: '/corporate/login', icon: LogIn }
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-28 z-40 h-[100vh] lg:h-[calc(100vh-7rem)] w-72 bg-white border-r border-[#E5EDF5] shadow-xs p-5 flex flex-col justify-between transition-transform duration-300 overflow-y-auto no-scrollbar ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="space-y-6">
        {/* Header Badge */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
          <div className="w-10 h-10 rounded-xl bg-[#3898D8] flex items-center justify-center text-white shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#153B5B] font-display">TRAVELNEX B2B</h3>
            <span className="text-[10px] text-[#3898D8] font-bold uppercase tracking-wider block">Enterprise Mobility</span>
          </div>
        </div>

        {/* 1. Multi-Role Dashboards */}
        <div>
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mb-2 px-1">
            Role Portals &amp; Dispatch
          </span>
          <nav className="space-y-1">
            {rolePortals.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#3898D8] text-white shadow-xs font-bold'
                        : 'text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* 2. Mobility Services */}
        <div>
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mb-2 px-1">
            Solutions &amp; Compliance
          </span>
          <nav className="space-y-1">
            {servicePages.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#3898D8] text-white shadow-xs font-bold'
                        : 'text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* 3. Commercial & Quote */}
        <div>
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mb-2 px-1">
            Commercial &amp; Onboarding
          </span>
          <nav className="space-y-1">
            {commercialPages.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#3898D8] text-white shadow-xs font-bold'
                        : 'text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Enterprise SLA Info Box */}
      <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] text-xs space-y-2 mt-6">
        <div className="flex items-center gap-2 text-[#19A89A] font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>ISO 27001 &amp; POSH Compliant</span>
        </div>
        <p className="text-[11px] text-[#64748B] leading-relaxed">
          Guaranteed 99.4% SLA punctuality with automated CO2 emission sustainability tracking.
        </p>
        <div className="pt-1">
          <a
            href="tel:18002098899"
            className="text-[11px] text-[#3898D8] font-semibold hover:underline block"
          >
            Direct Enterprise Desk: 1800-209-8899 →
          </a>
        </div>
      </div>
    </aside>
  );
};
