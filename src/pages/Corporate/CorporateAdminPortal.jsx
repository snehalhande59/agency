import React, { useState } from 'react';
import { 
  Building2, 
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
  ShieldCheck, 
  ChevronRight, 
  Plus, 
  FileText, 
  Calendar, 
  Briefcase, 
  Check, 
  X, 
  ArrowUpRight, 
  Activity,
  Layers,
  Phone,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateAdminPortal = () => {
  const { 
    companyProfile, 
    stats, 
    employees, 
    drivers, 
    vehicles, 
    routes, 
    monthlyContracts, 
    travelRequests, 
    invoices, 
    approveTravelRequest, 
    rejectTravelRequest, 
    addEmployee 
  } = useCorporateStore();

  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDeptFilter, setEmployeeDeptFilter] = useState('ALL');
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  // New Employee Modal state
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('Engineering');
  const [newEmpPickup, setNewEmpPickup] = useState('');
  const [newEmpShift, setNewEmpShift] = useState('Morning (08:30 AM - 05:30 PM)');
  const [newEmpPhone, setNewEmpPhone] = useState('');

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!newEmpName || !newEmpPickup) return;
    addEmployee({
      name: newEmpName,
      department: newEmpDept,
      pickupPoint: newEmpPickup,
      dropPoint: 'Nexus Hub BKC, Tower 4',
      shift: newEmpShift,
      phone: newEmpPhone || '+91 98200 00000',
      email: `${newEmpName.toLowerCase().replace(/\s+/g, '.')}@nexusglobal.io`,
      assignedRoute: 'Route #12 (Western Suburbs)',
      assignedCab: 'MH 02 ER 9120'
    });
    setNewEmpName('');
    setNewEmpPickup('');
    setIsAddEmployeeModalOpen(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesDept = employeeDeptFilter === 'ALL' || emp.department === employeeDeptFilter;
    const matchesSearch = !employeeSearch || 
      emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.id.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.pickupPoint.toLowerCase().includes(employeeSearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. Portal Header & Company Info Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#19A89A] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#19A89A] font-mono">
              Corporate Administrator Console • Enterprise Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">
            {companyProfile.companyName}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] mt-1">
            <span>CIN: <strong className="font-mono text-[#153B5B]">{companyProfile.cin}</strong></span>
            <span>•</span>
            <span>GSTIN: <strong className="font-mono text-[#153B5B]">{companyProfile.gstin}</strong></span>
            <span>•</span>
            <span className="text-[#3898D8] font-medium">{companyProfile.slaTier}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddEmployeeModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Employee</span>
          </button>
        </div>
      </div>

      {/* 2. Top 6 KPI Widgets Required by Prompt */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Total Employees */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Total Employees</span>
            <Users className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">{stats.totalEmployees.toLocaleString()}</div>
          <span className="text-[10px] text-[#19A89A] font-medium">+14 new this month</span>
        </div>

        {/* Active Vehicles */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Active Vehicles</span>
            <Car className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">{stats.activeVehicles}</div>
          <span className="text-[10px] text-[#64748B] font-medium">Across 4 campuses</span>
        </div>

        {/* Today's Trips */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Today's Trips</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">{stats.todaysTrips}</div>
          <span className="text-[10px] text-[#3898D8] font-medium">3 shifts operational</span>
        </div>

        {/* Completed Trips */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Completed Trips</span>
            <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
          </div>
          <div className="text-2xl font-black text-[#19A89A] font-display">{stats.completedTrips}</div>
          <span className="text-[10px] text-[#19A89A] font-medium">99.4% On-Time SLA</span>
        </div>

        {/* Pending Trips */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Pending Trips</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-purple-600 font-display">{stats.pendingTrips}</div>
          <span className="text-[10px] text-[#64748B] font-medium">Night shift &amp; drops</span>
        </div>

        {/* Monthly Expenses */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Monthly Expenses</span>
            <DollarSign className="w-4 h-4 text-[#19A89A]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">₹28.45L</div>
          <span className="text-[10px] text-[#19A89A] font-medium">Within budget (88%)</span>
        </div>

      </div>

      {/* 3. Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-[#E5EDF5]">
        {[
          { id: 'DASHBOARD', label: 'Analytics & Command' },
          { id: 'EMPLOYEES', label: 'Employee Roster' },
          { id: 'DRIVERS', label: 'Drivers & Verification' },
          { id: 'VEHICLES', label: 'Fleet & Vehicles' },
          { id: 'ROUTES', label: 'Routes & Halts' },
          { id: 'CONTRACTS', label: 'Monthly Contracts' },
          { id: 'REQUESTS', label: 'Travel Requests' },
          { id: 'INVOICES', label: 'Invoices & Expenses' },
          { id: 'COMPANY', label: 'Company Profile' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#3898D8] text-white shadow-sm'
                : 'bg-white border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ANALYTICS & FLEET COMMAND */}
      {activeTab === 'DASHBOARD' && (
        <div className="space-y-6">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Monthly Spend Bar Chart Mockup */}
            <div className="lg:col-span-7 rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-electric-400" />
                    <span>Monthly Corporate Mobility Expenditure (₹ Lakhs)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Monthly budget utilization with zero surge billing</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  -4.2% Cost Optimized
                </span>
              </div>

              {/* Bar Visualizer */}
              <div className="h-48 pt-6 flex items-end justify-between gap-4 px-2">
                {[
                  { month: 'Jun', amount: 24.2, height: '65%' },
                  { month: 'Jul', amount: 25.8, height: '70%' },
                  { month: 'Aug', amount: 26.1, height: '74%' },
                  { month: 'Sep', amount: 26.9, height: '78%' },
                  { month: 'Oct', amount: 28.4, height: '88%' },
                  { month: 'Nov (Est)', amount: 27.5, height: '82%' }
                ].map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono font-bold text-slate-300">₹{b.amount}L</span>
                    <div 
                      className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-blue-700 via-electric-600 to-cyan-400 hover:brightness-125 transition-all shadow-glow-sm"
                      style={{ height: b.height }}
                    />
                    <span className="text-xs text-slate-400 font-semibold">{b.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Split Pie/Bar Representation */}
            <div className="lg:col-span-5 rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-cyan-400" />
                  <span>Fleet Utilization by Department</span>
                </h3>
                <p className="text-xs text-slate-400">Shift allocation and dedicated cab distribution</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Engineering &amp; Tech (584 Staff)</span>
                    <strong className="text-white font-mono">48%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-electric-500 rounded-full" style={{ width: '48%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Data Analytics &amp; Product (320 Staff)</span>
                    <strong className="text-white font-mono">26%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '26%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Enterprise Sales &amp; Client Visits (180 Staff)</span>
                    <strong className="text-white font-mono">16%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '16%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Finance, HR &amp; Corporate (196 Staff)</span>
                    <strong className="text-white font-mono">10%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Total Transit Footprint:</span>
                <strong className="text-emerald-400 font-mono">14,200 KG CO2 Offset</strong>
              </div>
            </div>

          </div>

          {/* Today's Shifts & Active Routes */}
          <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Live Shift Schedules &amp; Transit Corridors</h3>
              <span className="text-xs text-slate-400">4 Active Major Corridors</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {routes.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-400 font-bold">{r.id}</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      {r.status}
                    </span>
                  </div>
                  <div className="font-bold text-white text-sm truncate">{r.name}</div>
                  <div className="text-[11px] text-slate-400">{r.shiftTiming}</div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                    <span>Assigned:</span>
                    <strong className="text-white">{r.allocatedEmployees}/{r.maxCapacity} Seats</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EMPLOYEE MANAGEMENT */}
      {activeTab === 'EMPLOYEES' && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Employee Transit Roster</h3>
              <p className="text-xs text-slate-400">Manage daily assigned cabs, pickup stages, and department shifts</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  placeholder="Search name, emp ID or stop..."
                  className="bg-navy-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-electric-500"
                />
              </div>

              <select
                value={employeeDeptFilter}
                onChange={(e) => setEmployeeDeptFilter(e.target.value)}
                className="bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-500"
              >
                <option value="ALL">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Data & Analytics">Data &amp; Analytics</option>
                <option value="Enterprise Sales">Enterprise Sales</option>
                <option value="Finance & Legal">Finance &amp; Legal</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Employee Details</th>
                  <th className="py-3 px-4">Department &amp; Shift</th>
                  <th className="py-3 px-4">Pickup Point</th>
                  <th className="py-3 px-4">Assigned Cab &amp; Route</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{emp.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{emp.id} • {emp.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-300 font-medium">{emp.department}</div>
                      <div className="text-[10px] text-slate-500">{emp.shift}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white">{emp.pickupPoint}</div>
                      <div className="text-[10px] text-slate-500">Destination: {emp.dropPoint}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-cyan-400 font-semibold">{emp.assignedCab}</div>
                      <div className="text-[10px] text-slate-400">{emp.assignedRoute}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        emp.status === 'ACTIVE' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DRIVER MANAGEMENT */}
      {activeTab === 'DRIVERS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Dedicated Chauffeurs &amp; Police Verification</h3>
            <span className="text-xs text-emerald-400">100% Police Verified Fleet</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {drivers.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-400 font-bold">{d.id}</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    {d.status}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-bold text-white">{d.name}</div>
                  <div className="text-cyan-300 font-mono text-[11px] mt-0.5">{d.phone}</div>
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1 text-[11px]">
                  <div>Vehicle: <strong className="text-slate-200">{d.assignedVehicle}</strong></div>
                  <div>Rating: <strong className="text-amber-400">★ {d.rating}</strong> ({d.totalTrips} trips)</div>
                  <div className="text-emerald-400 font-semibold">✓ {d.policeVerification}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: VEHICLES */}
      {activeTab === 'VEHICLES' && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Active Corporate Fleet Inventory</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Registration</th>
                  <th className="py-3 px-4">Model &amp; Category</th>
                  <th className="py-3 px-4">Seats</th>
                  <th className="py-3 px-4">Fuel &amp; Compliance</th>
                  <th className="py-3 px-4">Assigned Chauffeur</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{v.plateNumber}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{v.model}</div>
                      <div className="text-[10px] text-cyan-400">{v.category}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{v.seats} Seats</td>
                    <td className="py-3.5 px-4">
                      <div>{v.fuelType}</div>
                      <div className="text-[10px] text-slate-500">Fitness: {v.fitnessExpiry}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-300">{v.assignedDriver}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ROUTES */}
      {activeTab === 'ROUTES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((r) => (
            <div key={r.id} className="p-6 rounded-3xl bg-navy-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono text-cyan-400 font-bold text-sm">{r.id}</span>
                <span className="text-xs text-slate-400">{r.distanceKm} KM • {r.avgDuration}</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{r.name}</h4>
                <div className="text-xs text-cyan-400 mt-1">{r.shiftTiming}</div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 p-3 bg-navy-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Start: {r.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>End: {r.destination}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">Vehicle: {r.assignedVehicle}</span>
                <span className="font-bold text-emerald-400">{r.allocatedEmployees}/{r.maxCapacity} Seats Occupied</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: MONTHLY CAB CONTRACTS */}
      {activeTab === 'CONTRACTS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Enterprise Retainer &amp; Monthly Contracts</h3>
            <span className="text-xs text-cyan-400">Fixed Tariff Guarantees</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {monthlyContracts.map((c) => (
              <div key={c.id} className="p-6 rounded-3xl bg-navy-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-cyan-400 font-bold text-xs">{c.id}</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                      {c.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{c.department}</h4>
                  <div className="text-xs text-slate-400 mt-1">{c.vehicleCategory} ({c.vehiclesCount} Cabs)</div>

                  <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 my-4 space-y-2 text-xs">
                    <div>Commitment: <strong className="text-white">{c.monthlyCommitment}</strong></div>
                    <div>Chauffeurs: <strong className="text-slate-300">{c.driverType}</strong></div>
                    <div className="text-cyan-400 font-semibold">Renewal: {c.renewalDate}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Monthly Billing:</span>
                  <span className="text-lg font-black text-white font-mono">₹{c.monthlyBilling.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: TRAVEL REQUESTS (APPROVAL WORKFLOW) */}
      {activeTab === 'REQUESTS' && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Employee Corporate Travel Approval Queue</h3>

          <div className="space-y-3">
            {travelRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-2xl bg-navy-950 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-300">{req.id}</span>
                    <strong className="text-white text-sm">{req.employeeName}</strong>
                    <span className="text-slate-400">({req.department})</span>
                  </div>
                  <div className="text-white font-medium">{req.serviceType}</div>
                  <p className="text-slate-400 text-[11px]">{req.businessJustification}</p>
                  <div className="text-[10px] text-cyan-400 font-mono">
                    Date: {req.travelDate} • Vehicle: {req.vehicleRequested} • Est: ₹{req.estCost}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {req.status === 'PENDING_APPROVAL' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => approveTravelRequest(req.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => rejectTravelRequest(req.id)}
                        className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'APPROVED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: INVOICES & EXPENSES */}
      {activeTab === 'INVOICES' && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Monthly Consolidated Corporate Invoices</h3>
            <span className="text-xs text-slate-400">Net-30 Enterprise Credit Terms</span>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.invoiceNumber} className="p-5 rounded-2xl bg-navy-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{inv.invoiceNumber}</span>
                    <strong className="text-cyan-300 font-display text-sm">{inv.month}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {inv.tripsCount.toLocaleString()} Trips • {inv.totalKilometers.toLocaleString()} KM logged • Due: {inv.dueDate}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-base font-black text-white font-mono">₹{inv.netPayable.toLocaleString()}</div>
                    <span className="text-[10px] text-emerald-400 font-bold">{inv.status}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading simulated PDF voucher for ${inv.invoiceNumber}...`)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                    title="Download Invoice PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: COMPANY PROFILE */}
      {activeTab === 'COMPANY' && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-bold text-white">Enterprise Profile &amp; Billing Specifications</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Registered Entity</span>
              <div className="text-sm font-bold text-white">{companyProfile.companyName}</div>
              <div className="text-slate-400">Headquarters: {companyProfile.headquarters}</div>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Account Manager</span>
              <div className="text-sm font-bold text-white">{companyProfile.accountManager}</div>
              <div className="text-cyan-400">{companyProfile.billingCycle}</div>
            </div>
          </div>
        </div>
      )}

      {/* Onboard Employee Modal */}
      {isAddEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 space-y-5 shadow-2xl text-[#153B5B]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
              <h3 className="text-base font-bold text-[#153B5B]">Onboard Employee to Transit Roster</h3>
              <button
                type="button"
                onClick={() => setIsAddEmployeeModalOpen(false)}
                className="text-[#64748B] hover:text-[#153B5B] p-1.5 rounded-lg hover:bg-[#EFF7FC]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEmployeeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#153B5B] mb-1 font-bold">Employee Full Name</label>
                <input
                  type="text"
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                  required
                  placeholder="e.g. Vikas Salunkhe"
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#153B5B] mb-1 font-bold">Department</label>
                <select
                  value={newEmpDept}
                  onChange={(e) => setNewEmpDept(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Data & Analytics">Data &amp; Analytics</option>
                  <option value="Enterprise Sales">Enterprise Sales</option>
                  <option value="Finance & Legal">Finance &amp; Legal</option>
                </select>
              </div>

              <div>
                <label className="block text-[#153B5B] mb-1 font-bold">Home Pickup Address</label>
                <input
                  type="text"
                  value={newEmpPickup}
                  onChange={(e) => setNewEmpPickup(e.target.value)}
                  required
                  placeholder="e.g. R-City Mall, Ghatkopar West"
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#153B5B] mb-1 font-bold">Phone Number</label>
                <input
                  type="tel"
                  value={newEmpPhone}
                  onChange={(e) => setNewEmpPhone(e.target.value)}
                  placeholder="+91 98200 XXXXX"
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8] focus:bg-white font-mono"
                />
              </div>

              <div className="pt-3 border-t border-[#E5EDF5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddEmployeeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:bg-[#DCEEFF] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold shadow-sm"
                >
                  Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
