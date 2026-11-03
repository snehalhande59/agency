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
  PieChart,
  ShieldAlert,
  Upload
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateAdminPortal = () => {
  const store = useCorporateStore();
  
  const companyProfile = store.companyProfile || {
    companyName: 'Nexus Global Technologies India Pvt Ltd',
    cin: 'U72900MH2018PTC319802',
    gstin: '27AABCN8821Q1Z4',
    headquarters: 'Tower 4, Level 8, Maker Maxity, BKC, Mumbai 400051',
    totalEmployees: 1280,
    activeContracts: 42,
    accountManager: 'Vikramaditya Singhania (VP Enterprise Mobility)',
    billingCycle: 'Net-30 Corporate Invoicing',
    slaTier: 'Platinum Enterprise (99.4% On-Time Guarantee)'
  };
  
  const employees = store.employees || [];
  const drivers = store.drivers || [];
  const vehicles = store.vehicles || [];
  const routes = store.routes || [];
  const monthlyContracts = store.monthlyContracts || [];
  const corporateBookings = store.corporateBookings || [];
  const invoices = store.invoices || [];
  const safetyAlerts = store.safetyAlerts || [];
  const hrApproveBooking = store.hrApproveBooking || (() => {});
  const hrRejectBooking = store.hrRejectBooking || (() => {});
  const addEmployee = store.addEmployee || (() => {});
  const resolveEmergencyAlert = store.resolveEmergencyAlert || (() => {});

  const stats = store.stats || {
    totalEmployees: companyProfile?.totalEmployees || 1280,
    activeVehicles: vehicles?.length || 48,
    todaysTrips: 142,
    completedTrips: 136,
    pendingApprovals: 4,
    monthlyRetainers: monthlyContracts?.length || 42,
    totalSpendYtd: 2845000
  };

  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDeptFilter, setEmployeeDeptFilter] = useState('ALL');
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [approvalRemarks, setApprovalRemarks] = useState('Approved per Q4 mobility guidelines');

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

  const pendingBookings = corporateBookings.filter(b => b.status === 'PENDING_HR_APPROVAL');

  const exportEmployeeCsv = () => {
    const headers = ['Employee ID', 'Name', 'Department', 'Pickup Point', 'Shift', 'Phone'];
    const rows = filteredEmployees.map(e => [e.id, `"${e.name}"`, e.department, `"${e.pickupPoint}"`, `"${e.shift}"`, e.phone]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nexus_Employees_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddEmployeeModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Employee</span>
          </button>
          <button
            onClick={exportEmployeeCsv}
            className="px-4 py-2.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5] font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-[#3898D8]" />
            <span>Export Roster CSV</span>
          </button>
        </div>
      </div>

      {/* Safety Alert Warning Banner if unhandled alerts exist */}
      {safetyAlerts && safetyAlerts.some(a => a.status === 'TRIGGERED' || a.status === 'OPEN') && (
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Active Safety Telemetry Alert Detected</h4>
              <p className="text-xs text-rose-700 mt-0.5">
                {safetyAlerts.find(a => a.status === 'TRIGGERED' || a.status === 'OPEN')?.message || 'Simulated Emergency SOS triggered by commuter.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => resolveEmergencyAlert(safetyAlerts[0]?.id || 'ALERT-01')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs self-start sm:self-auto shrink-0 shadow-sm"
          >
            Acknowledge &amp; Mark Resolved
          </button>
        </div>
      )}

      {/* 2. Top 6 KPI Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Total Employees</span>
            <Users className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">{stats.totalEmployees.toLocaleString()}</div>
          <span className="text-[10px] text-[#19A89A] font-medium">+14 new this month</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Active Vehicles</span>
            <Car className="w-4 h-4 text-[#3898D8]" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">{stats.activeVehicles}</div>
          <span className="text-[10px] text-[#64748B] font-medium">Across 4 campuses</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Today's Trips</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#153B5B] font-display">{stats.todaysTrips}</div>
          <span className="text-[10px] text-[#3898D8] font-medium">3 shifts operational</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Completed Trips</span>
            <CheckCircle2 className="w-4 h-4 text-[#19A89A]" />
          </div>
          <div className="text-2xl font-black text-[#19A89A] font-display">{stats.completedTrips}</div>
          <span className="text-[10px] text-[#19A89A] font-medium">99.4% On-Time SLA</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs mb-1">
            <span>Pending Approvals</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-purple-600 font-display">{pendingBookings.length}</div>
          <span className="text-[10px] text-[#64748B] font-medium">Commute requests</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-xs">
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
          { id: 'REQUESTS', label: `Commute Approvals (${pendingBookings.length})` },
          { id: 'EMPLOYEES', label: 'Employee Roster' },
          { id: 'DRIVERS', label: 'Drivers & Verification' },
          { id: 'VEHICLES', label: 'Fleet & Vehicles' },
          { id: 'ROUTES', label: 'Routes & Halts' },
          { id: 'CONTRACTS', label: 'Monthly Contracts' },
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Monthly Spend Bar Chart */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#153B5B] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#3898D8]" />
                    <span>Monthly Corporate Mobility Expenditure (₹ Lakhs)</span>
                  </h3>
                  <p className="text-xs text-[#64748B]">Monthly budget utilization with zero surge billing</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#19A89A] bg-[#E6F7F5] px-2.5 py-0.5 rounded border border-[#19A89A]/30">
                  -4.2% Cost Optimized
                </span>
              </div>

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
                    <span className="text-[10px] font-mono font-bold text-[#153B5B]">₹{b.amount}L</span>
                    <div 
                      className="w-full bg-[#3898D8] rounded-t-xl transition-all duration-500 hover:bg-[#287DB8]" 
                      style={{ height: b.height }}
                    />
                    <span className="text-[10px] font-medium text-[#64748B]">{b.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="lg:col-span-5 rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#153B5B] flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#19A89A]" />
                <span>Department Fleet Usage Share</span>
              </h3>
              <div className="space-y-3 pt-2">
                {[
                  { name: 'Engineering & Tech', pct: 45, color: 'bg-[#3898D8]' },
                  { name: 'Customer Operations & Support', pct: 25, color: 'bg-[#19A89A]' },
                  { name: 'Sales & Client Relations', pct: 18, color: 'bg-indigo-500' },
                  { name: 'Executive Leadership', pct: 12, color: 'bg-amber-500' }
                ].map((dept, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#153B5B] font-medium">{dept.name}</span>
                      <span className="font-bold text-[#153B5B] font-mono">{dept.pct}%</span>
                    </div>
                    <div className="w-full bg-[#E5EDF5] h-2 rounded-full overflow-hidden">
                      <div className={`${dept.color} h-full rounded-full`} style={{ width: `${dept.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: COMMUTE APPROVALS (INTERCONNECTED WORKFLOW) */}
      {activeTab === 'REQUESTS' && (
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E5EDF5] gap-3">
            <div>
              <h3 className="text-base font-bold text-[#153B5B]">Employee Commute Approval Queue</h3>
              <p className="text-xs text-[#64748B]">Review incoming requests and route to Transport Operations for cab dispatch</p>
            </div>
            <span className="text-xs font-bold text-[#3898D8] bg-[#EFF7FC] border border-[#DCEEFF] px-3 py-1 rounded-xl">
              {corporateBookings.length} Total Bookings in System
            </span>
          </div>

          <div className="space-y-3">
            {corporateBookings.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#3898D8] text-sm">{b.id}</span>
                    <strong className="text-[#153B5B] text-sm">{b.employeeName}</strong>
                    <span className="text-[#64748B]">({b.department} • {b.designation})</span>
                  </div>
                  <div className="text-[#153B5B] font-semibold flex items-center gap-2">
                    <span>{b.serviceType}</span>
                    <span className="text-[#64748B]">•</span>
                    <span className="text-[#19A89A]">{b.shift}</span>
                  </div>
                  <div className="text-[#64748B] text-[11px] flex flex-wrap items-center gap-3">
                    <span>Pickup: <strong className="text-[#153B5B]">{b.pickupLocation}</strong></span>
                    <span>→</span>
                    <span>Drop: <strong className="text-[#153B5B]">{b.dropLocation}</strong></span>
                  </div>
                  <div className="text-[10px] text-[#64748B] font-mono flex items-center gap-3">
                    <span>Date: <strong className="text-[#153B5B]">{b.travelDate}</strong></span>
                    <span>Est: <strong className="text-[#153B5B]">₹{b.costEst}</strong></span>
                    <span>Cost Centre: <strong className="text-[#3898D8]">{b.costCentre}</strong></span>
                    <span>Boarding OTP: <strong className="text-[#19A89A] font-bold">{b.boardingOtp}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {b.status === 'PENDING_HR_APPROVAL' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => hrApproveBooking(b.id, approvalRemarks, b.costCentre)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve &amp; Dispatch</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => hrRejectBooking(b.id, 'Exceeds monthly department limit')}
                        className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]">
                      {b.status.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EMPLOYEES */}
      {activeTab === 'EMPLOYEES' && (
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EDF5]">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search employee by name, ID or pickup..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#153B5B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={employeeDeptFilter}
                onChange={(e) => setEmployeeDeptFilter(e.target.value)}
                className="bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
              >
                <option value="ALL">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Data & Analytics">Data &amp; Analytics</option>
                <option value="Enterprise Sales">Enterprise Sales</option>
                <option value="Operations & Support">Operations &amp; Support</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] font-bold border-b border-[#E5EDF5]">
                <tr>
                  <th className="py-3 px-4">Employee ID</th>
                  <th className="py-3 px-4">Name &amp; Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Home Pickup Point</th>
                  <th className="py-3 px-4">Assigned Route</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EDF5]">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#3898D8]">{emp.id}</td>
                    <td className="py-3 px-4">
                      <strong className="text-[#153B5B] block">{emp.name}</strong>
                      <span className="text-[11px] text-[#64748B]">{emp.designation || 'Specialist'}</span>
                    </td>
                    <td className="py-3 px-4 text-[#153B5B] font-medium">{emp.department}</td>
                    <td className="py-3 px-4 text-[#64748B] max-w-xs truncate">{emp.pickupPoint}</td>
                    <td className="py-3 px-4 text-[#19A89A] font-medium">{emp.assignedRoute || 'Route #12'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
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

      {/* TAB 4: DRIVERS */}
      {activeTab === 'DRIVERS' && (
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#153B5B]">Dedicated Enterprise Chauffeur Roster</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] font-bold border-b border-[#E5EDF5]">
                <tr>
                  <th className="py-3 px-4">Driver Name</th>
                  <th className="py-3 px-4">Commercial Badge</th>
                  <th className="py-3 px-4">Police Clearance</th>
                  <th className="py-3 px-4">Assigned Vehicle</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EDF5]">
                {drivers.map((d) => (
                  <tr key={d.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4">
                      <strong className="text-[#153B5B] block">{d.name}</strong>
                      <span className="text-[11px] text-[#64748B] font-mono">{d.phone}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#153B5B]">{d.badgeNumber}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {d.policeClearance}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#3898D8] font-bold">{d.assignedVehicle}</td>
                    <td className="py-3 px-4 text-amber-500 font-bold">★ {d.rating}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: VEHICLES */}
      {activeTab === 'VEHICLES' && (
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#153B5B]">Corporate Dedicated Fleet Inventory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] font-bold border-b border-[#E5EDF5]">
                <tr>
                  <th className="py-3 px-4">License Plate</th>
                  <th className="py-3 px-4">Vehicle Model</th>
                  <th className="py-3 px-4">Category &amp; Fuel</th>
                  <th className="py-3 px-4">Assigned Driver</th>
                  <th className="py-3 px-4">Fitness &amp; PUC</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EDF5]">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#153B5B]">{v.plateNumber}</td>
                    <td className="py-3 px-4 text-[#153B5B] font-semibold">{v.model}</td>
                    <td className="py-3 px-4 text-[#64748B]">{v.category} • {v.fuelType}</td>
                    <td className="py-3 px-4 text-[#19A89A] font-medium">{v.assignedDriver}</td>
                    <td className="py-3 px-4 text-[#64748B] font-mono text-[11px]">Valid till {v.fitnessExpiry}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
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

      {/* TAB 6: ROUTES */}
      {activeTab === 'ROUTES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((r) => (
            <div key={r.id} className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                <span className="font-mono text-[#3898D8] font-bold text-sm">{r.id}</span>
                <span className="text-xs text-[#64748B]">{r.city} • Regular Corridor</span>
              </div>
              <h4 className="text-base font-bold text-[#153B5B]">{r.name}</h4>
              <div className="space-y-2 text-xs text-[#64748B] p-3 bg-[#F8FAFC] rounded-xl border border-[#E5EDF5]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#3898D8]" />
                  <span>Origin: <strong className="text-[#153B5B]">{r.origin}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#19A89A]" />
                  <span>Destination: <strong className="text-[#153B5B]">{r.destination}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: CONTRACTS */}
      {activeTab === 'CONTRACTS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#153B5B]">Enterprise Retainer &amp; Monthly Contracts</h3>
            <span className="text-xs text-[#3898D8] font-bold">Fixed Tariff Guarantees</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {monthlyContracts.map((c) => (
              <div key={c.id} className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#3898D8] font-bold text-xs">{c.id}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      {c.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#153B5B]">{c.department}</h4>
                  <div className="text-xs text-[#64748B] mt-1">{c.vehicleCategory} ({c.vehiclesCount} Cabs)</div>

                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] my-4 space-y-2 text-xs text-[#64748B]">
                    <div>Commitment: <strong className="text-[#153B5B]">{c.monthlyCommitment}</strong></div>
                    <div>Chauffeurs: <strong className="text-[#153B5B]">{c.driverType}</strong></div>
                    <div className="text-[#3898D8] font-semibold">Renewal: {c.renewalDate}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">Monthly Billing:</span>
                  <span className="text-lg font-black text-[#153B5B] font-mono">₹{c.monthlyBilling.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: INVOICES */}
      {activeTab === 'INVOICES' && (
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
            <div>
              <h3 className="text-base font-bold text-[#153B5B]">Monthly Consolidated Corporate Invoices</h3>
              <p className="text-xs text-[#64748B]">Net-30 Enterprise Credit Terms with GST credit statement</p>
            </div>
            <span className="text-xs text-[#19A89A] font-bold">GST 18% Input Credit Allowed</span>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.invoiceNumber} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#153B5B] text-sm">{inv.invoiceNumber}</span>
                    <strong className="text-[#3898D8] text-sm">{inv.month}</strong>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-1">
                    {inv.tripsCount.toLocaleString()} Trips • {inv.totalKilometers.toLocaleString()} KM logged • Due: {inv.dueDate}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-base font-black text-[#153B5B] font-mono">₹{inv.netPayable.toLocaleString()}</div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {inv.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading simulated PDF voucher for ${inv.invoiceNumber}...`)}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#EFF7FC] text-[#3898D8] border border-[#E5EDF5] shadow-xs"
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
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-base font-bold text-[#153B5B]">Enterprise Profile &amp; Billing Specifications</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-1">
              <span className="text-[10px] text-[#64748B] uppercase font-semibold">Registered Entity</span>
              <div className="text-sm font-bold text-[#153B5B]">{companyProfile.companyName}</div>
              <div className="text-[#64748B]">Headquarters: {companyProfile.headquarters}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-1">
              <span className="text-[10px] text-[#64748B] uppercase font-semibold">Account Manager</span>
              <div className="text-sm font-bold text-[#153B5B]">{companyProfile.accountManager}</div>
              <div className="text-[#3898D8]">{companyProfile.billingCycle}</div>
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
