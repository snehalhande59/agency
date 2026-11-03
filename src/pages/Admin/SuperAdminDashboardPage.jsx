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
  FileSpreadsheet,
  Plane,
  Train,
  Bus,
  CreditCard,
  Navigation,
  Radio
} from 'lucide-react';
import { useSuperAdminStore } from '../../store/useSuperAdminStore';

export const SuperAdminDashboardPage = () => {
  const { kpiMetrics, providerIntegrations, refundRequests } = useSuperAdminStore();
  const [bookingFilter, setBookingFilter] = useState('ALL');

  const allTransactions = [
    { id: 'BK-10492', service: 'Outstation Cab (Mumbai to Pune)', user: 'Snehal Hande', amount: '₹2,650', status: 'CONFIRMED', mode: 'Cab', time: '8 mins ago', details: 'Toyota Innova Crysta • MH 02 EE 7819' },
    { id: 'CORP-BK-1081', service: 'Corporate Shift Commute (Morning)', user: 'Pooja Sharma', amount: '₹850', status: 'IN_TRANSIT', mode: 'Corporate', time: '14 mins ago', details: 'Nexus Global • MH 02 ER 9120' },
    { id: 'DEMO-RAIL-8K92X', service: 'CSMT Jalna Vande Bharat Express (CC)', user: 'Snehal Hande', amount: '₹1,860', status: 'CONFIRMED', mode: 'Railway', time: '22 mins ago', details: 'Coach C3 • Seats 44, 45' },
    { id: 'FL-6E-512', service: 'IndiGo Flight 6E 512 (Mumbai BOM → Delhi DEL)', user: 'Snehal Hande', amount: '₹4,890', status: 'TICKETED', mode: 'Flight', time: '35 mins ago', details: 'PNR 6E-9021 • Seat 12A' },
    { id: 'DEMO-MSRTC-9K24A', service: 'MSRTC Shivneri Volvo AC (Dadar → Swargate)', user: 'Sanjay Patil', amount: '₹1,070', status: 'ISSUED', mode: 'MSRTC', time: '48 mins ago', details: 'Seats 11, 12 • 50% Concession' },
    { id: 'PASS-MUM-8842', service: 'NCMC Monthly Metro Unlimited Smart Pass', user: 'Pooja Sharma', amount: '₹1,200', status: 'ACTIVE', mode: 'NCMC', time: '1 hour ago', details: 'RuPay Contactless • Card 6071' },
    { id: 'CORP-BK-1084', service: 'Night Shift Commute (Hinjewadi Phase 2)', user: 'Aditya Patil', amount: '₹720', status: 'PENDING_APPROVAL', mode: 'Corporate', time: '2 hours ago', details: 'Nexus Engineering • Wakad Bridge' },
    { id: 'BK-77488', service: 'Airport Transfer (Terminal 2 CSMT to Colaba)', user: 'Rohit Kulkarni', amount: '₹3,450', status: 'COMPLETED', mode: 'Cab', time: '3 hours ago', details: 'Mercedes E-Class • MH 01 DX 0077' },
    { id: 'BK-77310', service: 'Mini Bus Booking (Pune Station to Lonavala)', user: 'Deepak Kamble', amount: '₹7,800', status: 'COMPLETED', mode: 'Cab', time: '5 hours ago', details: 'Force Urbania 17-Seater' }
  ];

  const filteredTransactions = allTransactions.filter(t => {
    if (bookingFilter === 'ALL') return true;
    if (bookingFilter === 'CAB') return t.mode === 'Cab';
    if (bookingFilter === 'CORPORATE') return t.mode === 'Corporate';
    if (bookingFilter === 'RAILWAY') return t.mode === 'Railway';
    if (bookingFilter === 'MSRTC') return t.mode === 'MSRTC';
    if (bookingFilter === 'FLIGHT') return t.mode === 'Flight';
    if (bookingFilter === 'NCMC') return t.mode === 'NCMC';
    return true;
  });

  const activeFleetStream = [
    { plate: 'MH 02 ER 9120', model: 'Toyota Innova Crysta', chauffeur: 'Ramesh Shinde', location: 'WEH Andheri West → BKC', speed: '44 km/h', status: 'ON_DUTY_COMMUTE', batteryFuel: 'Diesel 78%' },
    { plate: 'MH 12 QK 5510', model: 'Maruti Ertiga Hybrid', chauffeur: 'Nitin Sawant', location: 'Wakad Bridge → Hinjewadi Phase 3', speed: '38 km/h', status: 'ON_DUTY_SHUTTLE', batteryFuel: 'Hybrid 85%' },
    { plate: 'MH 01 CV 4410', model: 'Maruti Dzire ZXi CNG', chauffeur: 'Suresh Patil', location: 'SCLR Flyover, Kurla', speed: '32 km/h', status: 'ON_DUTY_CAB', batteryFuel: 'CNG 90%' },
    { plate: 'MH 03 DN 7720', model: 'Force Urbania 17-Seater', chauffeur: 'Manoj Ghadge', location: 'Eastern Express Highway, Powai', speed: '50 km/h', status: 'SHARED_CORRIDOR', batteryFuel: 'Diesel 64%' },
    { plate: 'MH 01 DX 0077', model: 'Mercedes-Benz E-Class', chauffeur: 'Nitin Kadam', location: 'CSMT International Airport T2', speed: '0 km/h', status: 'STANDBY_VIP', batteryFuel: 'Petrol 92%' }
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
              Railway, MSRTC &amp; NCMC adapters are operational in mock staging. 0 external credentials exposed.
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
          <span className="text-[10px] text-[#19A89A] font-semibold">Cabs, Rail, MSRTC &amp; NCMC</span>
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
          <span className="text-[10px] text-[#64748B]">Retail &amp; Corporate accounts</span>
        </div>

        {/* Fleet Vehicles */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Active Fleet</span>
            <Car className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">
            {kpiMetrics.fleetVehicles} Cars &amp; Buses
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
          <span className="text-[10px] text-amber-700 font-semibold">Net-30 &amp; Net-45 SLAs</span>
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

      {/* Live Fleet Telemetry Stream */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EDF5]">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="font-bold text-[#153B5B] text-base flex items-center gap-2">
                <span>Live Fleet Telemetry &amp; GPS Stream</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Active Realtime
                </span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">Highways and city corridors monitored via simulated CAN-bus telemetry</p>
            </div>
          </div>

          <Link
            to="/admin/fleets"
            className="px-3.5 py-1.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] border border-[#DCEEFF] text-xs font-bold transition-all self-start sm:self-auto"
          >
            Manage All 640 Vehicles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {activeFleetStream.map((v) => (
            <div key={v.plate} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#3898D8] transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs text-[#153B5B] bg-white px-2.5 py-1 rounded-lg border border-[#E5EDF5]">
                  {v.plate}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {v.speed}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-[#153B5B]">{v.model}</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Chauffeur: <strong className="text-[#153B5B]">{v.chauffeur}</strong></div>
              </div>

              <div className="pt-2 border-t border-[#E5EDF5] flex items-center justify-between text-[10px] text-[#64748B]">
                <span className="truncate max-w-[180px]" title={v.location}>📍 {v.location}</span>
                <span className="font-mono font-semibold">{v.batteryFuel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unified Bookings Table Preview */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#153B5B] text-base">Recent Platform Activity (All Modes)</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Live transaction stream across Cabs, Corporate, Flights, Rail, MSRTC and NCMC</p>
          </div>

          <Link
            to="/admin/bookings"
            className="px-4 py-2 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5] text-xs font-bold self-start sm:self-auto transition-all"
          >
            View All 12,480 Bookings
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'ALL', label: 'All Modes' },
            { id: 'CAB', label: 'Cabs & Outstation' },
            { id: 'CORPORATE', label: 'Corporate Commute' },
            { id: 'FLIGHT', label: 'Airlines' },
            { id: 'RAILWAY', label: 'IRCTC Trains' },
            { id: 'MSRTC', label: 'MSRTC Bus' },
            { id: 'NCMC', label: 'NCMC Metro' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setBookingFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                bookingFilter === tab.id
                  ? 'bg-[#3898D8] text-white shadow-xs'
                  : 'bg-[#F8FAFC] border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
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
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#EFF7FC]/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{tx.id}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]">
                      {tx.mode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#153B5B]">{tx.service}</div>
                    <div className="text-[10px] text-[#64748B] font-mono mt-0.5">{tx.details}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B] font-semibold">{tx.user}</td>
                  <td className="py-3.5 px-4 font-black text-[#153B5B] font-mono">{tx.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
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
