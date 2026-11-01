import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { CorporateSidebar } from '../../components/corporate/CorporateSidebar';
import { Menu, X, Building2, UserCheck, ShieldAlert, ArrowRight } from 'lucide-react';

export const CorporateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.includes('/corporate/admin');
  const isEmployee = location.pathname.includes('/corporate/employee');

  return (
    <div className="min-h-screen pt-20 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Enterprise Role Switcher & Telematics Status Strip */}
      <div className="bg-[#EFF7FC] border-b border-[#E5EDF5] text-[#153B5B] py-2.5 px-4 sticky top-16 z-30 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19A89A] animate-pulse" />
            <span className="font-extrabold uppercase tracking-wide font-mono text-[#153B5B]">
              DEMO MODE – SIMULATED TELEMATICS &amp; DRIVER ALLOCATION WITHOUT LIVE GPS INTEGRATION
            </span>
          </div>

          {/* 1-Click Role Switcher */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E5EDF5] shadow-sm self-start sm:self-auto">
            <Link
              to="/corporate/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isAdmin
                  ? 'bg-[#3898D8] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>

            <Link
              to="/corporate/employee"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isEmployee
                  ? 'bg-[#19A89A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Employee Portal</span>
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
          <span>Corporate Navigation</span>
        </button>
        <span className="text-xs font-bold text-[#153B5B]">Enterprise Suite</span>
      </div>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Sidebar */}
        <CorporateSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-[#153B5B]/40 backdrop-blur-sm z-30 lg:hidden"
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
