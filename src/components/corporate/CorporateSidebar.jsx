import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
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
  LogOut,
  FileSpreadsheet
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { currentDemoUser, companyProfile } = useCorporateStore();

  const handleLogout = () => {
    if (onClose) onClose();
    navigate('/corporate/login');
  };
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
            <h3 className="text-sm font-black text-[#153B5B] font-display">AEROVOYAGE LUXE</h3>
            <span className="text-[10px] text-[#3898D8] font-bold uppercase tracking-wider block">Enterprise B2B Mobility</span>
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

      {/* Active Corporate User Profile & Sign Out */}
      <div className="mt-6 pt-4 border-t border-[#E5EDF5] space-y-3">
        <div className="p-3 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img 
              src={currentDemoUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'} 
              alt={currentDemoUser?.name}
              className="w-8 h-8 rounded-full border border-[#3898D8] object-cover shrink-0" 
            />
            <div className="truncate">
              <p className="text-xs font-bold text-[#153B5B] truncate">{currentDemoUser?.name || 'Snehal Hande'}</p>
              <p className="text-[10px] text-[#64748B] truncate">{companyProfile?.companyName || 'Nexus Global Technologies'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 transition-colors shadow-2xs shrink-0"
            title="Sign out of Corporate Mobility"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Enterprise SLA Info Box */}
        <div className="p-3 rounded-2xl bg-white border border-[#E5EDF5] text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-[#19A89A] font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ISO 27001 &amp; POSH Compliant</span>
          </div>
          <p className="text-[10px] text-[#64748B] leading-relaxed">
            Direct Enterprise Desk: 1800-209-8899
          </p>
        </div>
      </div>
    </aside>
  );
};
