import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Bus, Search, Ticket, ShieldAlert, XCircle, RefreshCw, Sparkles, Navigation } from 'lucide-react';
import { MSRTC_BANNER_TEXT } from '../../services/msrtc/msrtcService';

export const MsrtcLayout = () => {
  const msrtcNav = [
    { label: 'Bus Search & Booking', path: '/msrtc', icon: Search, exact: true },
    { label: 'State Bus Fleet & Schedule', path: '/msrtc/results', icon: Bus },
    { label: 'My Bus Passes / Tickets', path: '/msrtc/my-tickets', icon: Ticket },
    { label: 'Ticket Cancellation & Refunds', path: '/msrtc/cancel', icon: RefreshCw }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. REQUIRED OFFICIAL DEMO BANNER: Display 'MSRTC Provider Integration Pending' */}
      <div className="bg-red-50 border-b border-red-200 text-red-900 py-3 px-4 backdrop-blur-md sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-extrabold tracking-wide uppercase font-mono text-red-900">
              {MSRTC_BANNER_TEXT}
            </span>
          </div>
          <p className="text-[11px] text-red-800 font-medium">
            Simulated demonstration environment. No official MSRTC tickets are issued or real payment processed.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Module Sub-Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-8 border-b border-[#E5EDF5] gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
                  Maharashtra State Road Transport (MSRTC)
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full border border-red-200">
                  Demo Environment
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Shivneri Volvo AC, Shivshahi, Hirkani Nim-Aram &amp; Lal Pari Bus Booking System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {msrtcNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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
