import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Train, Search, Ticket, ShieldAlert, FileText, RefreshCw, XCircle, ChevronRight } from 'lucide-react';
import { DEMO_BANNER_TEXT } from '../../services/railway/railwayService';

export const RailwayLayout = () => {
  const railwayNav = [
    { label: 'Train Search & Booking', path: '/railway', icon: Search, exact: true },
    { label: 'Live Train Schedule', path: '/railway/results', icon: Train },
    { label: 'Check PNR Status', path: '/railway/pnr-status', icon: FileText },
    { label: 'Ticket Cancellation', path: '/railway/cancel', icon: XCircle },
    { label: 'Refund Status', path: '/railway/refund-status', icon: RefreshCw }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. REQUIRED DEMO MODE IRCTC BANNER */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 py-3 px-4 backdrop-blur-md sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
            <span className="font-extrabold tracking-wide uppercase font-mono">{DEMO_BANNER_TEXT}</span>
          </div>
          <p className="text-[11px] text-amber-800 font-medium">
            Simulated demonstration only. No live reservations are submitted to Indian Railways.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Module Sub-Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#E5EDF5] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">Indian Railways IRCTC Gateway</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF7FC] text-[#3898D8] px-2 py-0.5 rounded border border-[#DCEEFF]">
                  Demo Module
                </span>
              </div>
              <p className="text-xs text-[#64748B]">Vande Bharat, Rajdhani, Shatabdi, Tatkal & Superfast Train Reservations</p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {railwayNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#3898D8] text-white shadow-sm'
                        : 'bg-white border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Content Outlet */}
        <Outlet />

      </div>
    </div>
  );
};
