import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { CreditCard, LayoutDashboard, UserPlus, Link2, Zap, History, Ticket, ShieldAlert, LifeBuoy, AlertTriangle } from 'lucide-react';
import { NCMC_BANNER_TEXT } from '../../services/ncmc/ncmcService';

export const NcmcLayout = () => {
  const ncmcNav = [
    { label: 'Overview', path: '/ncmc', icon: CreditCard, exact: true },
    { label: 'Card Dashboard', path: '/ncmc/dashboard', icon: LayoutDashboard },
    { label: 'Register Card', path: '/ncmc/register', icon: UserPlus },
    { label: 'Link Existing Card', path: '/ncmc/link', icon: Link2 },
    { label: 'Recharge', path: '/ncmc/recharge', icon: Zap },
    { label: 'Transactions', path: '/ncmc/transactions', icon: History },
    { label: 'Transit Pass', path: '/ncmc/passes', icon: Ticket },
    { label: 'Report Lost Card', path: '/ncmc/lost-card', icon: AlertTriangle },
    { label: 'Card Support', path: '/ncmc/support', icon: LifeBuoy }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. REQUIRED DEMO MODE STATUS BANNER */}
      <div className="bg-[#EFF7FC] border-b border-[#DCEEFF] text-[#153B5B] py-3 px-4 backdrop-blur-md sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3898D8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3898D8]"></span>
            </span>
            <ShieldAlert className="w-4 h-4 text-[#3898D8] shrink-0" />
            <span className="font-extrabold tracking-wide uppercase font-mono text-[#153B5B]">
              {NCMC_BANNER_TEXT}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] font-medium">
            Authorized bank integration ready UI. Zero card PINs or CVV are stored. All balance updates are simulated.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Module Sub-Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-8 border-b border-[#E5EDF5] gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
                  National Common Mobility Card (NCMC)
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF7FC] text-[#3898D8] px-2.5 py-0.5 rounded-full border border-[#DCEEFF]">
                  One Nation • One Card
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                RuPay Contactless Smart Mobility for Mumbai Metro, BEST Buses, Pune Metro &amp; Highway Tolls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {ncmcNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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
