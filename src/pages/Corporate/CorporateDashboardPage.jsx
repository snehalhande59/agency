import React, { useState } from 'react';
import { 
  Users, 
  Car, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { corporateMetrics, corporateRecentTrips } from '../../data/mockData';

export const CorporateDashboardPage = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState(corporateRecentTrips);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredTrips = trips.filter(trip => {
    const matchesFilter = filterType === 'All' || trip.status === filterType || trip.type === filterType;
    const matchesSearch = trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.driver.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'In Transit':
        return 'bg-electric-500/15 text-electric-400 border-electric-500/30 animate-pulse';
      case 'Scheduled':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-electric-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Live Enterprise Dispatch Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Enterprise Fleet Command Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Managing employee transit routes for Nexus Hub BKC & Hinjawadi Campus
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 hover:text-white transition-all ${isRefreshing ? 'animate-spin text-electric-400' : ''}`}
            title="Refresh Live Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('Exporting corporate MIS shift log as CSV/Excel...')}
            className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Roster</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Total Employees</span>
            <Users className="w-4 h-4 text-electric-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-display">{corporateMetrics.totalEmployees.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400">+12 this week</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Active Fleet</span>
            <Car className="w-4 h-4 text-electric-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-electric-400 font-display">{corporateMetrics.activeVehicles}</div>
          <span className="text-[10px] text-slate-400">All GPS Synced</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Today's Trips</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-display">{corporateMetrics.todayTrips}</div>
          <span className="text-[10px] text-blue-400">3 Shifts Scheduled</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Completed Trips</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display">{corporateMetrics.completedTrips}</div>
          <span className="text-[10px] text-emerald-400">Punctuality 99.4%</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Upcoming Trips</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-display">{corporateMetrics.upcomingTrips}</div>
          <span className="text-[10px] text-slate-400">Evening Shift Drop</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Monthly Expense</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-black text-white font-display">{corporateMetrics.monthlySpend}</div>
          <span className="text-[10px] text-slate-400">Within Budget SLA</span>
        </div>

      </div>

      {/* Main Analytics & Vehicle Allocation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Monthly Expense Breakdown Chart Simulation */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Expense & Km Telemetry</h3>
              <p className="text-xs text-slate-400">Fleet cost allocation across delivery centers</p>
            </div>
            <span className="text-xs font-semibold text-electric-400 bg-electric-600/10 px-2.5 py-1 rounded-lg border border-electric-500/20">
              Q4 FY26 Current
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-medium">Engineering & Product Roster (Hinjawadi Phase 3)</span>
                <span className="font-bold text-white">₹7,80,000 (42%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-electric-500 h-full rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-medium">Operations & 24/7 Global Support (Mindspace Airoli)</span>
                <span className="font-bold text-white">₹5,40,000 (29%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '29%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-medium">Executive Leadership & Client Visits (Bandra Kurla Complex)</span>
                <span className="font-bold text-white">₹3,25,000 (18%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-medium">Airport Transfers & Ad-hoc Sales Travels</span>
                <span className="font-bold text-white">₹2,00,000 (11%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Total Distance Run</span>
              <span className="text-sm font-bold text-white">384,200 km</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Avg Cost / Seat</span>
              <span className="text-sm font-bold text-emerald-400">₹3,827 / mo</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Billing Cycle</span>
              <span className="text-sm font-bold text-slate-200">Net 30 Invoiced</span>
            </div>
          </div>
        </div>

        {/* Right: Vehicle Fleet Allocation Breakdown */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
            Active Vehicle Allocation
          </h3>

          <div className="space-y-3">
            <div className="p-3 bg-navy-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">Executive Sedans (Dzire/Aura)</span>
                <span className="text-[10px] text-slate-400 block">4 Passengers • 72 Cabs</span>
              </div>
              <span className="text-xs font-bold text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded">39% Fleet</span>
            </div>

            <div className="p-3 bg-navy-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">SUVs (Innova / Ertiga)</span>
                <span className="text-[10px] text-slate-400 block">6 Passengers • 68 Cabs</span>
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">37% Fleet</span>
            </div>

            <div className="p-3 bg-navy-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">Mini Buses (Urbania / 26-Seater)</span>
                <span className="text-[10px] text-slate-400 block">17-26 Pax • 34 Buses</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">18% Fleet</span>
            </div>

            <div className="p-3 bg-navy-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">VIP Prestige Luxury (Mercedes/BMW)</span>
                <span className="text-[10px] text-slate-400 block">CXO Chauffeur • 10 Cabs</span>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">6% Fleet</span>
            </div>
          </div>
        </div>

      </div>

      {/* Route Management & Live Trips Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Live Route Management & Trip Dispatch</h3>
            <p className="text-xs text-slate-400">Real-time telematics of morning and evening shift rosters</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search route, cab, or driver..."
                className="bg-navy-950 border border-slate-700 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500 w-52"
              />
            </div>

            {/* Filter Buttons */}
            {['All', 'In Transit', 'Scheduled', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterType(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === st
                    ? 'bg-electric-600 text-white shadow-glow-sm'
                    : 'bg-navy-950 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Trip ID</th>
                <th className="py-3 px-4 font-semibold">Route Trajectory</th>
                <th className="py-3 px-4 font-semibold">Assigned Fleet & Driver</th>
                <th className="py-3 px-4 font-semibold">Shift Type</th>
                <th className="py-3 px-4 font-semibold">Scheduled</th>
                <th className="py-3 px-4 font-semibold">Occupancy</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-electric-400">
                    {trip.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {trip.route}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-200">{trip.vehicle}</div>
                    <div className="text-[10px] text-slate-400">Driver: {trip.driver}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {trip.type}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {trip.time}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">
                    {trip.occupants}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(trip.status)}`}>
                      {trip.status}
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
