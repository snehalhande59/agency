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
  Map
} from 'lucide-react';

export const CorporateSidebar = ({ isOpen, onClose }) => {
  const corporateNav = [
    { name: 'Corporate Overview', path: '/corporate', icon: Building2, exact: true },
    { name: 'Admin Console & Fleet', path: '/corporate/admin', icon: LayoutDashboard },
    { name: 'Employee Commute Portal', path: '/corporate/employee', icon: Users },
    { name: 'Daily Pickup & Drop', path: '/corporate/daily-pickup', icon: CalendarClock },
    { name: 'Monthly Cab Contracts', path: '/corporate/monthly-contracts', icon: FileText },
    { name: 'Executive Business Travel', path: '/corporate/business-travel', icon: Briefcase },
    { name: 'Enterprise Pricing', path: '/corporate/pricing', icon: CreditCard },
    { name: 'Request Demo / RFP', path: '/corporate/demo', icon: Send },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-20 z-40 h-[100vh] lg:h-[calc(100vh-5rem)] w-72 bg-white border-r border-[#E5EDF5] shadow-sm p-5 flex flex-col justify-between transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div>
        {/* Header Badge */}
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-[#E5EDF5]">
          <div className="w-10 h-10 rounded-xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#153B5B] font-display">Enterprise Portal</h3>
            <span className="text-[10px] text-[#3898D8] font-bold uppercase tracking-wider">B2B Mobility Suite</span>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {corporateNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#3898D8] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Enterprise SLA Info Box */}
      <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] text-xs space-y-2">
        <div className="flex items-center gap-2 text-[#19A89A] font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>ISO 27001 Certified</span>
        </div>
        <p className="text-[11px] text-[#64748B] leading-relaxed">
          Guaranteed 99.4% SLA punctuality with automated CO2 emission sustainability tracking.
        </p>
        <div className="pt-1">
          <a
            href="tel:18002098899"
            className="text-[11px] text-[#3898D8] font-semibold hover:underline block"
          >
            Direct Enterprise Desk →
          </a>
        </div>
      </div>
    </aside>
  );
};
