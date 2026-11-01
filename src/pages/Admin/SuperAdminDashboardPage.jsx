import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CalendarCheck, 
  Car, 
  Truck, 
  Building2, 
  RefreshCw, 
  Cpu, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldAlert, 
  AlertTriangle, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Activity,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { useSuperAdminStore } from '../../store/useSuperAdminStore';

export const SuperAdminDashboardPage = () => {
  const { kpiMetrics, providerIntegrations, refundRequests } = useSuperAdminStore();
  const [bookingFilter, setBookingFilter] = useState('ALL');

  const recentTransactions = [
    { id: 'BK-10492', service: 'Outstation Cab (Mumbai - Pune)', user: 'Snehal Hande', amount: '₹2,450', status: 'CONFIRMED', mode: 'Cab', time: '12 mins ago' },
    { id: 'DEMO-RAIL-8K92X', service: 'CSMT Jalna Vande Bharat (CC)', user: 'Snehal Hande', amount: '₹1,860', status: 'CONFIRMED_DEMO', mode: 'Railway', time: '45 mins ago' },
    { id: 'DEMO-MSRTC-SHIV77', service: 'MSRTC Shivneri Volvo AC (Seat 11, 12)', user: 'Sanjay Patil', amount: '₹650', status: 'ISSUED_DEMO', mode: 'MSRTC', time: '1 hour ago' },
    { id: 'PASS-MUM-ACTIVE-88', service: 'NCMC Monthly Metro Unlimited Pass', user: 'Snehal Hande', amount: '₹1,200', status: 'ACTIVE_VALID', mode: 'NCMC', time: '3 hours ago' },
    { id: 'BK-10491', service: 'Airport Transfer (Terminal 2)', user: 'Pooja Sharma', amount: '₹850', status: 'COMPLETED', mode: 'Cab', time: '4 hours ago' }
  ];

  return (
    <div className="space-y-8 bg-[#F8FAFC] text-[#153B5B]">
      {/* Top Banner: Sandbox & Pending Status */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#EFF7FC] via-white to-[#DCEEFF] border border-[#3898D8]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center shrink-0 shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#153B5B] flex items-center gap-2">
              <span>Platform Health: Staging Simulator Active</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300 font-bold">
                Providers Pending
              </span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Railway, MSRTC & NCMC adapters are operational in mock staging. 0 external credentials exposed.
            </p>
          </div>
        </div>

        <Link
          to="/admin/provider-status"
          className="px-4 py-2 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-xs flex items-center gap-1.5 self-start md:self-auto transition-all shadow-sm"
        >
          <span>View Integration Matrix</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 8 Primary KPI Widgets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* GMV */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Total GMV (Demo)</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">+18.4%</span>
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">
            ₹{(kpiMetrics.totalRevenue / 100000).toFixed(2)} L
          </div>
          <span className="text-[10px] text-[#64748B]">Gross booking value (simulated)</span>
        </div>

        {/* Total Bookings */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Total Bookings</span>
            <CalendarCheck className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#3898D8] font-display">
            {kpiMetrics.totalBookings.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#19A89A] font-semibold">Cabs, Rail, MSRTC & NCMC</span>
        </div>

        {/* Active Users */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Registered Users</span>
            <Users className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">
            {kpiMetrics.activeUsers.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#64748B]">Retail & Corporate accounts</span>
        </div>

        {/* Fleet Vehicles */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Active Fleet</span>
            <Car className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">
            {kpiMetrics.fleetVehicles} Cars & Buses
          </div>
          <span className="text-[10px] text-[#64748B]">{kpiMetrics.activeChauffeurs} Chauffeurs verified</span>
        </div>

        {/* Corporate Clients */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Corporate B2B</span>
            <Building2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">
            {kpiMetrics.corporateClients} Enterprise
          </div>
          <span className="text-[10px] text-amber-700 font-semibold">Net-30 & Net-45 SLAs</span>
        </div>

        {/* Pending Refunds */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Pending Refunds</span>
            <RefreshCw className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 font-display">
            {kpiMetrics.pendingRefundsCount} Claims
          </div>
          <Link to="/admin/refund-management" className="text-[10px] text-rose-600 font-bold hover:underline">
            Requires Approval →
          </Link>
        </div>

        {/* Open Grievances */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Support Tickets</span>
            <Activity className="w-4 h-4 text-[#19A89A]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">
            {kpiMetrics.disputeCount} Open
          </div>
          <span className="text-[10px] text-[#19A89A] font-semibold">Average resolution: 42m</span>
        </div>

        {/* Integration State */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Providers</span>
            <Cpu className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-700 font-display">
            3 Pending / 2 Not Config
          </div>
          <span className="text-[10px] text-[#64748B]">IRCTC, MSRTC, NCMC, PG, Maps</span>
        </div>
      </div>

      {/* Revenue & Service Volume Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Service Volume Breakdown Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#153B5B] text-base">Booking Velocity by Transit Vertical</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Simulated weekly distribution across Maharashtra mobility network</p>
            </div>
            <span className="text-xs font-mono text-[#64748B]">Oct 2026</span>
          </div>

          {/* Stylized Bar Chart */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#153B5B]">Outstation & Local Cabs (42%)</span>
                <span className="text-[#153B5B] font-bold">5,240 trips</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#3898D8] rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#153B5B]">MSRTC State Transport (Shivneri/Shivshahi) (26%)</span>
                <span className="text-[#153B5B] font-bold">3,240 tickets</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#19A89A] rounded-full" style={{ width: '26%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#153B5B]">IRCTC Indian Railways Simulation (18%)</span>
                <span className="text-[#153B5B] font-bold">2,246 passengers</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#3898D8] rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#153B5B]">NCMC Smart Mobility Passes & Wallet (14%)</span>
                <span className="text-[#153B5B] font-bold">1,754 passes</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#153B5B] rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EDF5] flex items-center justify-between text-xs text-[#64748B]">
            <span>Peak travel corridor: Mumbai ↔ Pune Expressway</span>
            <Link to="/admin/reports" className="text-[#3898D8] hover:text-[#153B5B] font-semibold">
              Deep Analytics →
            </Link>
          </div>
        </div>

        {/* Integration Status Mini-Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#153B5B] text-base">Third-Party Gateway Health</h3>
            <Link to="/admin/provider-status" className="text-xs text-[#3898D8] hover:text-[#153B5B] font-semibold">
              Full Matrix →
            </Link>
          </div>

          <div className="space-y-3">
            {providerIntegrations.slice(0, 5).map((item) => (
              <div key={item.id} className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#153B5B]">{item.name}</div>
                  <span className="text-[10px] text-[#64748B] font-mono">{item.category}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'Pending Authorization'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-[#64748B] border border-slate-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
            <strong>Audit Guarantee:</strong> Staging sandboxes mock all third-party payloads without calling live APIs or storing secrets.
          </div>
        </div>
      </div>

      {/* Unified Bookings Table Preview */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#153B5B] text-base">Recent Platform Activity (All Modes)</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Live transaction stream across Cabs, Rail, MSRTC and NCMC</p>
          </div>

          <Link
            to="/admin/bookings"
            className="px-4 py-2 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5] text-xs font-bold self-start sm:self-auto transition-all"
          >
            View All 12,480 Bookings
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-semibold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Service Details</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#EFF7FC]/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{tx.id}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF7FC] text-[#153B5B] border border-[#DCEEFF]">
                      {tx.mode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#153B5B]">{tx.service}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{tx.user}</td>
                  <td className="py-3.5 px-4 font-bold text-[#153B5B]">{tx.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#64748B]">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
