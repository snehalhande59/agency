import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { CorporateSidebar } from '../../components/corporate/CorporateSidebar';
import { 
  Menu, 
  X, 
  Building2, 
  UserCheck, 
  ShieldAlert, 
  ArrowRight,
  Truck,
  Car,
  Briefcase,
  CreditCard,
  BarChart3,
  LogIn
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { activeRole, setDemoUserRole } = useCorporateStore();

  const rolePills = [
    { id: 'hr_admin', label: 'HR Admin', path: '/corporate/admin', icon: Building2 },
    { id: 'transport_manager', label: 'Transport Ops', path: '/corporate/transport-manager', icon: Truck },
    { id: 'employee', label: 'Employee', path: '/corporate/employee', icon: UserCheck },
    { id: 'driver', label: 'Driver Console', path: '/corporate/driver', icon: Car },
    { id: 'vendor', label: 'Vendor Partner', path: '/corporate/vendor', icon: Briefcase },
    { id: 'finance', label: 'Finance & Billing', path: '/corporate/finance', icon: CreditCard },
    { id: 'reports', label: 'Reports & ESG', path: '/corporate/reports', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Enterprise Multi-Role Switcher & Simulation Notice Strip */}
      <div className="bg-[#EFF7FC] border-b border-[#E5EDF5] text-[#153B5B] py-2.5 px-4 sticky top-16 z-30 backdrop-blur-md shadow-xs">
        <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19A89A] animate-pulse shrink-0" />
            <span className="font-extrabold uppercase tracking-wide font-mono text-[11px] text-[#153B5B]">
              DEMO MODE – SIMULATED TELEMATICS &amp; DISPATCH WORKFLOW (NO LIVE GPS HARDWARE CONNECTED)
            </span>
          </div>

          {/* 1-Click Multi-Role Quick Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 no-scrollbar">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
              Switch Role:
            </span>
            {rolePills.map((role) => {
              const Icon = role.icon;
              const isActive = location.pathname === role.path;
              return (
                <Link
                  key={role.id}
                  to={role.path}
                  onClick={() => setDemoUserRole(role.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#3898D8] text-white shadow-sm'
                      : 'bg-white border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B] hover:border-[#3898D8]/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{role.label}</span>
                </Link>
              );
            })}

            <Link
              to="/corporate/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap bg-[#19A89A] text-white hover:bg-[#148377] transition-all ml-1 shadow-xs"
              title="View full demo credentials & login screen"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>All Logins</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Bar for Corporate */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5EDF5]">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-[#3898D8] bg-[#EFF7FC] px-3 py-2 rounded-xl border border-[#E5EDF5]"
        >
          <Menu className="w-4 h-4" />
          <span>Corporate Menu</span>
        </button>
        <span className="text-xs font-bold text-[#153B5B]">Enterprise Mobility Suite</span>
      </div>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Sidebar */}
        <CorporateSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-[#153B5B]/40 backdrop-blur-sm z-30 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
