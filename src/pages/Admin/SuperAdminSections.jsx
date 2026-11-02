import React, { useState } from 'react';
import { 
  Users, 
  CalendarCheck, 
  Train, 
  Bus, 
  CreditCard, 
  Car, 
  Truck, 
  UserCheck, 
  Building2, 
  Receipt, 
  RefreshCw, 
  BarChart3, 
  LifeBuoy, 
  Settings,
  Search,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { useSuperAdminStore } from '../../store/useSuperAdminStore';
import { TRAINS_DATA } from '../../services/railway/railwayService';
import { MSRTC_BUSES_DATA } from '../../services/msrtc/msrtcService';

// =========================================================================
// 1. SUPER ADMIN USERS PAGE
// =========================================================================
export const SuperAdminUsersPage = () => {
  const { users, toggleUserStatus } = useSuperAdminStore();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                        u.email.toLowerCase().includes(search.toLowerCase()) ||
                        u.id.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'ALL' || u.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#3898D8]" />
            <span>Platform User Management</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Browse registered passengers, corporate leads, driver logins and account status.
          </p>
        </div>

        <button 
          onClick={() => alert('Simulated export of user directory.')}
          className="px-4 py-2 rounded-xl bg-white hover:bg-[#EFF7FC] text-[#153B5B] border border-[#E5EDF5] text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-[#3898D8]" />
          <span>Export User Directory</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E5EDF5] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-9 pr-4 py-2 text-xs text-[#153B5B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'Customer', 'Corporate'].map(tab => (
            <button
              key={tab}
              onClick={() => setRoleFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                roleFilter === tab 
                  ? 'bg-[#DCEEFF] text-[#3898D8] border border-[#3898D8]/40 font-bold' 
                  : 'text-[#64748B] hover:text-[#153B5B] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Name & Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Role Tier</th>
                <th className="py-3 px-4">Total Trips</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{u.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#153B5B]">{u.name}</div>
                    <div className="text-[11px] text-[#64748B]">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B] font-mono">{u.phone}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#153B5B]">{u.totalTrips}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      u.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        u.status === 'ACTIVE'
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SUPER ADMIN BOOKINGS PAGE
// =========================================================================
export const SuperAdminBookingsPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const bookings = [
    { id: 'BK-10492', service: 'Outstation Cab (Mumbai ↔ Pune)', mode: 'CAB', customer: 'Snehal Hande', amount: '₹2,450', date: '31 Oct 2026', status: 'CONFIRMED' },
    { id: 'DEMO-RAIL-8K92X', service: 'CSMT Jalna Vande Bharat (CC Class)', mode: 'RAIL', customer: 'Snehal Hande', amount: '₹1,860', date: '04 Nov 2026', status: 'CONFIRMED_DEMO' },
    { id: 'DEMO-MSRTC-SHIV77', service: 'MSRTC Shivneri Volvo AC (Seat 11, 12)', mode: 'MSRTC', customer: 'Sanjay Patil', amount: '₹650', date: '02 Nov 2026', status: 'ISSUED_DEMO' },
    { id: 'PASS-MUM-ACTIVE-88', service: 'NCMC Monthly Metro Unlimited Pass', mode: 'NCMC', customer: 'Snehal Hande', amount: '₹1,200', date: '21 Oct 2026', status: 'ACTIVE_VALID' },
    { id: 'BK-10491', service: 'Airport Transfer (Terminal 2 Pickup)', mode: 'CAB', customer: 'Pooja Sharma', amount: '₹850', date: '28 Oct 2026', status: 'COMPLETED' },
    { id: 'CHTR-VOL-2026-88', service: 'Volvo 9600 Luxury Coach (45-Seater Charter)', mode: 'BUS', customer: 'Vikramaditya Singhania', amount: '₹38,500', date: '14 Nov 2026', status: 'CONFIRMED' }
  ];

  const filtered = bookings.filter(b => {
    const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) || 
                        b.service.toLowerCase().includes(search.toLowerCase()) ||
                        b.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || b.mode === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-[#3898D8]" />
            <span>Unified Platform Bookings</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Global ledger combining Cabs, IRCTC Trains, MSRTC ST Buses, Charters and NCMC Passes.
          </p>
        </div>

        <button 
          onClick={() => alert('Simulated export of unified bookings ledger.')}
          className="px-4 py-2 rounded-xl bg-white hover:bg-[#EFF7FC] text-[#153B5B] border border-[#E5EDF5] text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-[#3898D8]" />
          <span>Export All Bookings</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E5EDF5] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search booking ref, service or passenger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-9 pr-4 py-2 text-xs text-[#153B5B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['ALL', 'CAB', 'RAIL', 'MSRTC', 'NCMC', 'BUS'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab 
                  ? 'bg-[#DCEEFF] text-[#3898D8] border border-[#3898D8]/40 font-bold' 
                  : 'text-[#64748B] hover:text-[#153B5B] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Vertical</th>
                <th className="py-3 px-4">Service Description</th>
                <th className="py-3 px-4">Passenger / Client</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Fare</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{b.id}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]">
                      {b.mode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#153B5B]">{b.service}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{b.customer}</td>
                  <td className="py-3.5 px-4 text-[#64748B] font-mono">{b.date}</td>
                  <td className="py-3.5 px-4 font-black text-[#3898D8]">{b.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SUPER ADMIN RAILWAY SERVICES PAGE
// =========================================================================
export const SuperAdminRailwayServicesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Train className="w-6 h-6 text-emerald-600" />
            <span>Railway Services & Timetable Schema</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Indian Railways express trains, Vande Bharat, Tejas and Deccan Queen timetable cache.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          Pending IRCTC Official B2C Agreement
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRAINS_DATA.map((t) => (
          <div key={t.trainNumber} className="p-5 rounded-2xl bg-white border border-[#E5EDF5] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                  IR
                </span>
                <div>
                  <h3 className="font-bold text-[#153B5B] text-sm">{t.trainNumber} - {t.trainName}</h3>
                  <span className="text-[10px] text-emerald-600 font-semibold">{t.trainType}</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#3898D8]">{t.duration}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Route</span>
                <p className="text-[#153B5B] font-semibold mt-0.5">{t.fromStation.code} → {t.toStation.code}</p>
                <p className="text-[11px] text-[#64748B]">{t.departureTime} dep / {t.arrivalTime} arr</p>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Classes Configured</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {t.classes.map(c => (
                    <span key={c} className="px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[10px] font-mono text-[#153B5B] border border-[#E5EDF5] font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#64748B] font-mono pt-1 border-t border-[#E5EDF5]">
              Running Days: {t.runsOn?.join(', ') || 'Daily (Mon-Sun)'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 4. SUPER ADMIN MSRTC SERVICES PAGE (SCREENSHOT 4 EXACT FIX)
// =========================================================================
export const SuperAdminMsrtcServicesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Bus className="w-6 h-6 text-rose-600" />
            <span className="text-[#153B5B]">MSRTC Fleet & Depot Schedules</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Maharashtra State Road Transport Corporation schedules, depots, live seat quotas, and concession management.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
          Live ITMS Transit Sync Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MSRTC_BUSES_DATA.map((b) => (
          <div key={b.id || b.serviceNumber} className="p-5 rounded-2xl bg-white border border-[#E5EDF5] space-y-3 shadow-xs hover:border-[#3898D8] hover:shadow-md transition-all">
            <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-2.5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                  ST
                </span>
                <div>
                  <h3 className="font-extrabold text-[#153B5B] text-sm">
                    {b.serviceNumber || 'MH-14-BT-9102'} • {b.serviceType}
                  </h3>
                  <span className="text-[11px] text-rose-700 font-bold block">
                    {b.serviceName || (b.originDepot ? b.originDepot.split('-')[0].trim() + ' Depot' : 'MSRTC Intercity')}
                  </span>
                </div>
              </div>
              <span className="text-base font-black text-[#3898D8]">₹{b.baseFare}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Route Corridor</span>
                <p className="text-[#153B5B] font-bold mt-0.5 line-clamp-1">{b.originDepot} → {b.destDepot}</p>
                <p className="text-[11px] text-[#64748B] font-mono mt-0.5 font-semibold">{b.departureTime} → {b.arrivalTime}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Seating Capacity</span>
                <p className="text-[#153B5B] font-bold mt-0.5">
                  {b.totalSeats} Seats ({b.serviceType === 'SHIVNERI' ? '2x2 AC Volvo' : '2x2 Semi-Luxury'})
                </p>
                <p className="text-[11px] text-emerald-700 font-extrabold mt-0.5">
                  {b.availableSeatsCount || 22} Seats Available
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 5. SUPER ADMIN NCMC SERVICES PAGE
// =========================================================================
export const SuperAdminNcmcServicesPage = () => {
  const terminals = [
    { id: 'TERM-MM-L2A-01', station: 'Gundavali (Metro Line 7/2A)', gates: 14, status: 'STAGING_SIM', validatorFirmware: 'v4.2.1-RuPay' },
    { id: 'TERM-MM-L1-04', station: 'Ghatkopar Interchange', gates: 18, status: 'STAGING_SIM', validatorFirmware: 'v4.2.1-RuPay' },
    { id: 'TERM-BEST-CSMT', station: 'BEST South Mumbai Feeder Fleet', gates: 120, status: 'STAGING_SIM', validatorFirmware: 'v3.8.0-Tap' },
    { id: 'TERM-NMM-CBD', station: 'Navi Mumbai Metro Belapur', gates: 8, status: 'STAGING_SIM', validatorFirmware: 'v4.2.1-RuPay' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#3898D8]" />
            <span>NCMC Validators & Transit Gateways</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            RuPay contactless terminal nodes, turnstile fare deduction formulas and pass models.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          Pending NPCI CCH Acquirer Agreement
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Terminal Node ID</th>
                <th className="py-3 px-4">Transit Station / Fleet</th>
                <th className="py-3 px-4">Turnstile Gates</th>
                <th className="py-3 px-4">Firmware Spec</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {terminals.map((t) => (
                <tr key={t.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#153B5B]">{t.station}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{t.gates} Turnstiles</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#3898D8]">{t.validatorFirmware}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 6. SUPER ADMIN CAB OPERATORS PAGE
// =========================================================================
export const SuperAdminCabOperatorsPage = () => {
  const { cabOperators } = useSuperAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Car className="w-6 h-6 text-[#3898D8]" />
            <span>Cab Operator Alliances</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Registered fleet vendors, chauffeur compliance audits and SLA verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cabOperators.map((op) => (
          <div key={op.id} className="p-5 rounded-2xl bg-white border border-[#E5EDF5] space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#64748B]">{op.id}</span>
                <h3 className="font-bold text-[#153B5B] text-sm">{op.name}</h3>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">{op.rating} ★</span>
            </div>

            <div className="space-y-1.5 text-xs text-[#64748B]">
              <div className="flex justify-between">
                <span>Operating City:</span>
                <span className="text-[#153B5B] font-semibold">{op.city}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Fleet:</span>
                <span className="text-[#153B5B] font-semibold">{op.vehiclesCount} Cabs</span>
              </div>
              <div className="flex justify-between">
                <span>Active Drivers:</span>
                <span className="text-[#153B5B] font-semibold">{op.activeDrivers} Drivers</span>
              </div>
              <div className="flex justify-between">
                <span>Compliance:</span>
                <span className="text-emerald-600 font-bold">{op.complianceStatus}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5EDF5] text-[11px] text-[#64748B]">
              Contact: {op.contactPerson}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 7. SUPER ADMIN BUS OPERATORS PAGE
// =========================================================================
export const SuperAdminBusOperatorsPage = () => {
  const { busOperators } = useSuperAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#3898D8]" />
            <span>Bus & Coach Fleet Operators</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Private luxury multi-axle coaches, sleeper buses and corporate intercity charters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {busOperators.map((op) => (
          <div key={op.id} className="p-5 rounded-2xl bg-white border border-[#E5EDF5] space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#64748B]">{op.id}</span>
                <h3 className="font-bold text-[#153B5B] text-sm">{op.name}</h3>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">{op.rating} ★</span>
            </div>

            <div className="space-y-1.5 text-xs text-[#64748B]">
              <div className="flex justify-between">
                <span>Headquarters:</span>
                <span className="text-[#153B5B] font-semibold">{op.headquarters}</span>
              </div>
              <div className="flex justify-between">
                <span>Routes Managed:</span>
                <span className="text-[#153B5B] font-semibold">{op.routesCount} Express Routes</span>
              </div>
              <div className="flex justify-between">
                <span>Total Coaches:</span>
                <span className="text-[#153B5B] font-semibold">{op.busesCount} Luxury Coaches</span>
              </div>
              <div className="flex justify-between">
                <span>Partner Status:</span>
                <span className="text-emerald-600 font-bold">{op.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 8. SUPER ADMIN FLEET VEHICLES PAGE
// =========================================================================
export const SuperAdminVehiclesPage = () => {
  const vehicles = [
    { plate: 'MH 02 EE 9840', model: 'Toyota Innova Crysta', type: 'Premium SUV', category: 'Cab', fitnessValidUntil: '2027-08-15', status: 'IN_SERVICE' },
    { plate: 'MH 01 DX 1204', model: 'Mercedes-Benz E-Class', type: 'Luxury Executive', category: 'Luxury', fitnessValidUntil: '2028-01-10', status: 'IN_SERVICE' },
    { plate: 'MH 12 QW 4410', model: 'Volvo 9600 Multi-Axle', type: 'Luxury Coach 45-Seater', category: 'Bus', fitnessValidUntil: '2026-12-30', status: 'IN_SERVICE' },
    { plate: 'MH 14 TR 8812', model: 'Force Urbania 17-Seater', type: 'Mini Bus', category: 'Bus', fitnessValidUntil: '2027-03-22', status: 'IN_SERVICE' },
    { plate: 'MH 04 KP 3012', model: 'BYD Atto 3 EV', type: 'Green Electric Sedan', category: 'Cab', fitnessValidUntil: '2029-05-18', status: 'IN_SERVICE' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Car className="w-6 h-6 text-[#3898D8]" />
            <span>Fleet Vehicles Master Registry</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Certified vehicles, fitness validity, GPS telemetry link and service status.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">License Plate</th>
                <th className="py-3 px-4">Make & Model</th>
                <th className="py-3 px-4">Vehicle Category</th>
                <th className="py-3 px-4">Fitness Certificate</th>
                <th className="py-3 px-4">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {vehicles.map((v) => (
                <tr key={v.plate} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{v.plate}</td>
                  <td className="py-3.5 px-4 font-bold text-[#153B5B]">{v.model}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{v.type}</td>
                  <td className="py-3.5 px-4 font-mono text-[#64748B]">Valid to {v.fitnessValidUntil}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 9. SUPER ADMIN CHAUFFEURS & DRIVERS PAGE
// =========================================================================
export const SuperAdminDriversPage = () => {
  const drivers = [
    { id: 'DRV-801', name: 'Rajesh Ghadge', phone: '+91 98200 11980', rating: '4.92 ★', policeVerification: 'VERIFIED_CLEAN', assignedVehicle: 'MH 02 EE 9840' },
    { id: 'DRV-802', name: 'Anil Kadam', phone: '+91 98211 44102', rating: '4.88 ★', policeVerification: 'VERIFIED_CLEAN', assignedVehicle: 'MH 12 QW 4410' },
    { id: 'DRV-803', name: 'Santosh Shinde', phone: '+91 98190 22194', rating: '4.95 ★', policeVerification: 'VERIFIED_CLEAN', assignedVehicle: 'MH 01 DX 1204' },
    { id: 'DRV-804', name: 'Vijay Bhosle', phone: '+91 98330 99410', rating: '4.80 ★', policeVerification: 'VERIFIED_CLEAN', assignedVehicle: 'MH 14 TR 8812' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <span>Chauffeurs & Commercial Drivers</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Police verification records, passenger safety ratings and assigned fleet allocations.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Driver ID</th>
                <th className="py-3 px-4">Chauffeur Name</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Safety Rating</th>
                <th className="py-3 px-4">Police Verification</th>
                <th className="py-3 px-4">Assigned Vehicle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{d.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#153B5B]">{d.name}</td>
                  <td className="py-3.5 px-4 text-[#64748B] font-mono">{d.phone}</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">{d.rating}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {d.policeVerification}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#3898D8]">{d.assignedVehicle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 10. SUPER ADMIN CORPORATE CLIENTS PAGE
// =========================================================================
export const SuperAdminCorporateClientsPage = () => {
  const { corporateClients } = useSuperAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#3898D8]" />
            <span>Corporate Enterprise Accounts</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            B2B employee commute contracts, monthly invoicing terms and dedicated fleet allocation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {corporateClients.map((client) => (
          <div key={client.id} className="p-6 rounded-3xl bg-white border border-[#E5EDF5] space-y-4 shadow-xs">
            <div className="flex items-start justify-between border-b border-[#E5EDF5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#3898D8] bg-[#DCEEFF] px-2 py-0.5 rounded">{client.contractTier}</span>
                <h3 className="font-extrabold text-[#153B5B] text-base mt-1">{client.name}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {client.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Contracted Employees:</span>
                <span className="text-[#153B5B] font-bold">{client.employeesCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Dedicated Fleet:</span>
                <span className="text-[#153B5B] font-bold">{client.activeVehicles} Cabs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Monthly Contract Value:</span>
                <span className="text-emerald-700 font-bold">₹{(client.monthlySpend / 100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Invoicing Terms:</span>
                <span className="text-[#153B5B] font-mono font-bold">{client.creditTerms}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 11. SUPER ADMIN PAYMENTS DEMO PAGE
// =========================================================================
export const SuperAdminPaymentsDemoPage = () => {
  const transactions = [
    { id: 'PAY-DEMO-9912', bookingRef: 'DEMO-RAIL-8K92X', customer: 'Snehal Hande', amount: 1860, mode: 'UPI / Demo Sandbox', date: '31 Oct 2026', status: 'SETTLED_DEMO' },
    { id: 'PAY-DEMO-9911', bookingRef: 'DEMO-MSRTC-SHIV77', customer: 'Sanjay Patil', amount: 650, mode: 'RuPay Debit Card', date: '29 Oct 2026', status: 'SETTLED_DEMO' },
    { id: 'PAY-DEMO-9910', bookingRef: 'BK-10492', customer: 'Snehal Hande', amount: 2450, mode: 'Corporate Account (Net-30)', date: '28 Oct 2026', status: 'SETTLED_DEMO' },
    { id: 'PAY-DEMO-9909', bookingRef: 'PASS-MUM-ACTIVE-88', customer: 'Snehal Hande', amount: 1200, mode: 'Net Banking Simulation', date: '21 Oct 2026', status: 'SETTLED_DEMO' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-600" />
            <span>Payments Demo Settlement Ledger</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Simulated payment transactions, UPI authorization stubs and zero-charge validation records.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-[#E5EDF5] text-xs shadow-xs">
          <span className="text-[#64748B]">Payment Gateway Status: </span>
          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Demo Sandbox Mode</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{tx.id}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#3898D8]">{tx.bookingRef}</td>
                  <td className="py-3.5 px-4 text-[#153B5B] font-semibold">{tx.customer}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{tx.mode}</td>
                  <td className="py-3.5 px-4 font-black text-[#3898D8]">₹{tx.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-[#64748B]">{tx.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 12. SUPER ADMIN REFUND MANAGEMENT DEMO PAGE (Interactive Approval Queue)
// =========================================================================
export const SuperAdminRefundManagementPage = () => {
  const { refundRequests, approveRefund, rejectRefund } = useSuperAdminStore();
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleConfirmAction = () => {
    if (!selectedRefund || !actionType) return;
    if (actionType === 'APPROVE') {
      approveRefund(selectedRefund.id);
    } else {
      rejectRefund(selectedRefund.id);
    }
    setSelectedRefund(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-rose-600" />
            <span>Refund Management Demo Queue</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Review and adjudicate customer cancellation claims across rail, bus and cab verticals.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Claim ID</th>
                <th className="py-3 px-4">Service & Booking Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Original Amount</th>
                <th className="py-3 px-4">Deduction</th>
                <th className="py-3 px-4">Refund Amount</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Adjudicate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {refundRequests.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{r.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#153B5B]">{r.service}</div>
                    <div className="text-[11px] font-mono text-[#3898D8] font-bold">{r.bookingRef}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#153B5B] font-semibold">{r.customerName}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">₹{r.originalAmount}</td>
                  <td className="py-3.5 px-4 font-mono text-rose-700 font-bold">₹{r.deduction}</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700">₹{r.refundAmount}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{r.reason}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      r.status === 'PENDING_APPROVAL'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : r.status === 'PROCESSED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {r.status === 'PENDING_APPROVAL' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedRefund(r); setActionType('APPROVE'); }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => { setSelectedRefund(r); setActionType('REJECT'); }}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[#64748B] font-mono text-[11px]">Decided</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {selectedRefund && actionType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#E5EDF5] rounded-3xl p-6 shadow-2xl space-y-4 text-[#153B5B]">
            <h3 className="text-base font-bold text-[#153B5B] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Confirm Refund Adjudication</span>
            </h3>

            <p className="text-xs text-[#64748B]">
              Are you sure you want to <strong className="text-[#153B5B]">{actionType}</strong> refund claim{' '}
              <span className="font-mono text-[#3898D8] font-bold">{selectedRefund.id}</span> for{' '}
              <strong className="text-[#153B5B]">{selectedRefund.customerName}</strong> in the amount of{' '}
              <strong className="text-[#19A89A]">₹{selectedRefund.refundAmount}</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5EDF5]">
              <button
                onClick={() => { setSelectedRefund(null); setActionType(null); }}
                className="px-4 py-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:bg-[#DCEEFF] font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-xl font-bold text-xs text-white shadow-sm ${
                  actionType === 'APPROVE' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'
                }`}
              >
                Confirm {actionType}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 13. SUPER ADMIN REPORTS & ANALYTICS PAGE
// =========================================================================
export const SuperAdminReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#3898D8]" />
            <span>Platform Reports & Mobility Analytics</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Aggregated passenger traffic corridors, peak depot departures and route density reports.
          </p>
        </div>

        <button
          onClick={() => alert('Simulated export of Q4 2026 Maharashtra Mobility Report (PDF).')}
          className="px-4 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Executive Dossier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] space-y-3 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-[#64748B]">Top Corridor</span>
          <h3 className="text-lg font-bold text-[#153B5B]">Mumbai ↔ Pune Expressway</h3>
          <p className="text-xs text-[#64748B]">
            6,420 trips this month across Cabs (52%), Shivneri (36%) & Vande Bharat (12%).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] space-y-3 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-[#64748B]">Customer Satisfaction</span>
          <h3 className="text-lg font-bold text-emerald-700">4.89 / 5.00 ★</h3>
          <p className="text-xs text-[#64748B]">
            Based on 3,420 verified post-journey ratings across all four transport verticals.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] space-y-3 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-[#64748B]">Peak Boarding Hour</span>
          <h3 className="text-lg font-bold text-[#3898D8]">07:30 AM – 09:15 AM</h3>
          <p className="text-xs text-[#64748B]">
            Accounting for 34% of morning corporate commuter movements in the Mumbai MMR.
          </p>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 14. SUPER ADMIN SUPPORT CONSOLE PAGE
// =========================================================================
export const SuperAdminSupportPage = () => {
  const { supportTickets, resolveSupportTicket } = useSuperAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-[#3898D8]" />
            <span>Support & Grievances Console</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Resolve passenger turnstile double-tap inquiries, chauffeur disputes and itinerary assistance.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Subject & Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {supportTickets.map((t) => (
                <tr key={t.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#153B5B]">{t.id}</td>
                  <td className="py-3.5 px-4 text-[#153B5B] font-semibold">{t.user}</td>
                  <td className="py-3.5 px-4 font-bold text-[#153B5B]">{t.subject}</td>
                  <td className="py-3.5 px-4 text-[#64748B]">{t.category}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      t.priority === 'HIGH' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-[#F8FAFC] text-[#64748B] border border-[#E5EDF5]'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      t.status === 'OPEN'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {t.status === 'OPEN' ? (
                      <button
                        onClick={() => resolveSupportTicket(t.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-[#64748B] font-mono text-[11px]">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 15. SUPER ADMIN SETTINGS PAGE
// =========================================================================
export const SuperAdminSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#64748B]" />
            <span>Platform System Settings</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Global governance rules, audit retention intervals, sandbox toggles and RBAC policies.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] space-y-4 max-w-2xl text-xs shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
          <div>
            <div className="font-bold text-[#153B5B]">Strict Sandbox Isolation Mode</div>
            <p className="text-[#64748B] text-[11px] mt-0.5">Enforce zero-live calls for all third-party endpoints</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ENFORCED
          </span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
          <div>
            <div className="font-bold text-[#153B5B]">Simulated Financial Deduction</div>
            <p className="text-[#64748B] text-[11px] mt-0.5">Generate mock settlement references without real fund movements</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ACTIVE
          </span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
          <div>
            <div className="font-bold text-[#153B5B]">Zero Secrets Policy Check</div>
            <p className="text-[#64748B] text-[11px] mt-0.5">No client-side exposure of production API keys or tokens</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            PASSING (100%)
          </span>
        </div>
      </div>
    </div>
  );
};
