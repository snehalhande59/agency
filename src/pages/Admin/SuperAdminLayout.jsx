import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Train, 
  Bus, 
  CreditCard, 
  Car, 
  Truck, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  Receipt, 
  RefreshCw, 
  BarChart3, 
  Cpu, 
  LifeBuoy, 
  Settings, 
  Menu, 
  X, 
  ArrowLeft, 
  Search, 
  Bell, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const SuperAdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navSections = [
    {
      group: 'Core Management',
      items: [
        { label: 'Platform Overview', path: '/admin', icon: LayoutDashboard, exact: true },
        { label: 'User Directory', path: '/admin/users', icon: Users },
        { label: 'Unified Bookings', path: '/admin/bookings', icon: CalendarCheck }
      ]
    },
    {
      group: 'Transit Services',
      items: [
        { label: 'Railway Services', path: '/admin/railway-services', icon: Train },
        { label: 'MSRTC Bus Services', path: '/admin/msrtc-services', icon: Bus },
        { label: 'NCMC Transit Services', path: '/admin/ncmc-services', icon: CreditCard }
      ]
    },
    {
      group: 'Fleet & Partners',
      items: [
        { label: 'Cab Operators', path: '/admin/cab-operators', icon: Car },
        { label: 'Bus Operators', path: '/admin/bus-operators', icon: Truck },
        { label: 'Fleet Vehicles', path: '/admin/vehicles', icon: Car },
        { label: 'Chauffeurs & Drivers', path: '/admin/drivers', icon: UserCheck },
        { label: 'Corporate Clients', path: '/admin/corporate-clients', icon: Building2 }
      ]
    },
    {
      group: 'Financial & Governance',
      items: [
        { label: 'Payments Demo Ledger', path: '/admin/payments-demo', icon: Receipt },
        { label: 'Refund Management', path: '/admin/refund-management', icon: RefreshCw },
        { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 }
      ]
    },
    {
      group: 'System & Security',
      items: [
        { label: 'Provider Integration Status', path: '/admin/provider-status', icon: Cpu },
        { label: 'Platform Grievances', path: '/admin/support', icon: LifeBuoy },
        { label: 'System Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#153B5B] flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5EDF5] px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3898D8] to-[#19A89A] flex items-center justify-center text-white font-black text-sm shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-[#153B5B] text-base tracking-wide font-display">AeroVoyage</span>
              <span className="text-[10px] font-bold text-[#3898D8] block -mt-1 uppercase tracking-widest">
                Super Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Search & Indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#EFF7FC] px-3 py-1.5 rounded-xl border border-[#E5EDF5] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#19A89A] animate-pulse"></span>
            <span className="text-[#64748B] font-mono text-[11px] font-bold">DEMO_SANDBOX_STAGING</span>
          </div>

          <Link
            to="/admin/provider-status"
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Providers pending authorization"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Provider Status (Pending)</span>
          </Link>

          <Link
            to="/dashboard"
            className="px-3 py-1.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] border border-[#DCEEFF] text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customer View</span>
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-72 bg-white border-r border-[#E5EDF5] p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-61px)] sticky top-[61px] shrink-0">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#94A3B8]">
                {sec.group}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact 
                  ? location.pathname === item.path 
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#3898D8] text-white shadow-md shadow-[#3898D8]/20'
                          : 'text-[#64748B] hover:bg-[#EFF7FC] hover:text-[#153B5B]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-sm flex">
            <div className="w-72 bg-white border-r border-[#E5EDF5] p-4 space-y-6 overflow-y-auto max-h-screen shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                <span className="font-bold text-[#153B5B] text-sm">Admin Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-[#64748B] hover:text-[#153B5B]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navSections.map((sec, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#94A3B8]">
                    {sec.group}
                  </div>
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-[#3898D8] text-white shadow-sm'
                              : 'text-[#64748B] hover:bg-[#EFF7FC] hover:text-[#153B5B]'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
