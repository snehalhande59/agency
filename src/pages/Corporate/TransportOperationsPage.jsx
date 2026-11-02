import React, { useState } from 'react';
import { 
  Cpu, 
  Car, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Navigation, 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Truck, 
  Compass, 
  ChevronRight,
  Sparkles,
  Calendar,
  X
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const TransportOperationsPage = () => {
  const { 
    corporateBookings, 
    vehicles, 
    drivers, 
    routes, 
    safetyAlerts,
    assignVehicleAndDriver,
    addVehicle,
    addDriver,
    resolveEmergencyAlert
  } = useCorporateStore();

  const [activeTab, setActiveTab] = useState('DISPATCH');
  const [search, setSearch] = useState('');
  const [shiftFilter, setShiftFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Allocation Modal State
  const [allocatingBooking, setAllocatingBooking] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');

  // Add Vehicle Modal State
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [newVehPlate, setNewVehPlate] = useState('');
  const [newVehModel, setNewVehModel] = useState('Toyota Innova Crysta');
  const [newVehCategory, setNewVehCategory] = useState('Executive SUV');
  const [newVehSeats, setNewVehSeats] = useState(7);
  const [newVehVendor, setNewVehVendor] = useState('Mahalaxmi Mobility Solutions');

  // Add Driver Modal State
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [newDrvName, setNewDrvName] = useState('');
  const [newDrvPhone, setNewDrvPhone] = useState('');
  const [newDrvLicense, setNewDrvLicense] = useState('');
  const [newDrvExp, setNewDrvExp] = useState(10);

  // Statistics
  const pendingAllocationCount = corporateBookings.filter(b => b.status === 'APPROVED_AWAITING_DISPATCH' || b.status === 'PENDING_HR_APPROVAL').length;
  const activeDispatchedCount = corporateBookings.filter(b => b.status === 'DISPATCHED_ASSIGNED' || b.status === 'DRIVER_EN_ROUTE' || b.status === 'PASSENGER_BOARDED').length;
  const completedTodayCount = corporateBookings.filter(b => b.status === 'COMPLETED').length;
  const activeAlertsCount = safetyAlerts.filter(a => !a.resolved).length;

  const handleOpenAllocation = (booking) => {
    setAllocatingBooking(booking);
    setSelectedVehicle(vehicles[0]?.plateNumber || '');
    setSelectedDriver(drivers[0]?.name || '');
  };

  const handleConfirmAllocation = (e) => {
    e.preventDefault();
    if (!allocatingBooking || !selectedVehicle || !selectedDriver) return;

    assignVehicleAndDriver(allocatingBooking.id, selectedVehicle, selectedDriver);
    setAllocatingBooking(null);
  };

  const handleCreateVehicle = (e) => {
    e.preventDefault();
    if (!newVehPlate) return;

    addVehicle({
      plateNumber: newVehPlate,
      model: newVehModel,
      category: newVehCategory,
      seats: Number(newVehSeats),
      ac: true,
      fuelType: 'BS6 Diesel',
      assignedDriver: 'Unassigned',
      fitnessExpiry: '2028-06-30',
      assignedVendor: newVehVendor
    });

    setNewVehPlate('');
    setIsAddVehicleOpen(false);
  };

  const handleCreateDriver = (e) => {
    e.preventDefault();
    if (!newDrvName || !newDrvPhone) return;

    addDriver({
      name: newDrvName,
      phone: newDrvPhone,
      licenseNumber: newDrvLicense || 'MH-02-2018009210',
      licenseExpiry: '2030-05-15',
      experienceYears: Number(newDrvExp),
      rating: 4.9,
      totalTrips: 0,
      assignedVehicle: 'Unallocated',
      vendorName: 'Mahalaxmi Mobility Solutions',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    });

    setNewDrvName('');
    setNewDrvPhone('');
    setIsAddDriverOpen(false);
  };

  // Filtered Bookings
  const filteredBookings = corporateBookings.filter(b => {
    const matchSearch = b.employeeName?.toLowerCase().includes(search.toLowerCase()) ||
                        b.id?.toLowerCase().includes(search.toLowerCase()) ||
                        b.pickupLocation?.toLowerCase().includes(search.toLowerCase());
    const matchShift = shiftFilter === 'ALL' || b.shift?.includes(shiftFilter);
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchSearch && matchShift && matchStatus;
  });

  return (
    <div className="space-y-6 text-[#153B5B]">
      
      {/* Top Cockpit Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#19A89A] animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-[#3898D8] uppercase tracking-wider">
              FLEET DISPATCH CONSOLE • CENTRAL TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display mt-1">
            Transport Operations &amp; Fleet Management
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time daily dispatching, vehicle allocation, route adherence and driver telematics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAddVehicleOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] font-bold text-xs border border-[#E5EDF5] transition-all flex items-center gap-2"
          >
            <Car className="w-4 h-4 text-[#3898D8]" />
            <span>+ Add Fleet Vehicle</span>
          </button>
          <button
            onClick={() => setIsAddDriverOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md shadow-[#3898D8]/20 transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>+ Add Chauffeur</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Awaiting Allocation</span>
          <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] font-display">{pendingAllocationCount}</div>
          <span className="text-[10px] text-[#64748B]">Requires driver/cab assignment</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Active on Road</span>
          <div className="text-2xl sm:text-3xl font-black text-[#3898D8] font-display">{activeDispatchedCount}</div>
          <span className="text-[10px] text-[#19A89A] font-semibold">Live GPS Telemetry</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Completed Today</span>
          <div className="text-2xl sm:text-3xl font-black text-[#19A89A] font-display">{completedTodayCount}</div>
          <span className="text-[10px] text-[#64748B]">99.4% On-time punctuality</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Safety Incident Alerts</span>
          <div className={`text-2xl sm:text-3xl font-black font-display ${activeAlertsCount > 0 ? 'text-[#EF4444]' : 'text-[#19A89A]'}`}>
            {activeAlertsCount}
          </div>
          <span className="text-[10px] text-[#64748B]">{activeAlertsCount > 0 ? 'Active SOS monitoring' : 'All clear'}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E5EDF5] gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'DISPATCH', label: 'Daily Dispatch & Operations', count: corporateBookings.length },
          { id: 'TELEMETRY', label: 'Interactive Live Telemetry Map', count: 'Live' },
          { id: 'FLEET', label: 'Fleet & Vehicle Inventory', count: vehicles.length },
          { id: 'DRIVERS', label: 'Chauffeurs & Police Checks', count: drivers.length },
          { id: 'ROUTES', label: 'Route Planning & Corridors', count: routes.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#3898D8] text-white shadow-sm'
                : 'bg-white text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC] border border-[#E5EDF5]'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#EFF7FC] text-[#3898D8]'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* =========================================================================
          TAB 1: DAILY DISPATCH & OPERATIONS
          ========================================================================= */}
      {activeTab === 'DISPATCH' && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Employee name, Booking ID or pickup area..."
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#153B5B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={shiftFilter}
                onChange={(e) => setShiftFilter(e.target.value)}
                className="bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2 text-xs font-semibold text-[#153B5B]"
              >
                <option value="ALL">All Shifts</option>
                <option value="Morning">Morning Shift</option>
                <option value="General">General Shift</option>
                <option value="Afternoon">Afternoon Shift</option>
                <option value="Night">Night Shift</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2 text-xs font-semibold text-[#153B5B]"
              >
                <option value="ALL">All Statuses</option>
                <option value="APPROVED_AWAITING_DISPATCH">Awaiting Dispatch</option>
                <option value="DISPATCHED_ASSIGNED">Assigned</option>
                <option value="DRIVER_EN_ROUTE">En Route</option>
                <option value="PASSENGER_BOARDED">Boarded</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING_HR_APPROVAL">Pending HR</option>
              </select>
            </div>
          </div>

          {/* Bookings Dispatch Table */}
          <div className="rounded-3xl bg-white border border-[#E5EDF5] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5EDF5] bg-[#F8FAFC] text-[#64748B] uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 font-bold">Booking Ref</th>
                    <th className="py-3 px-4 font-bold">Employee &amp; Dept</th>
                    <th className="py-3 px-4 font-bold">Pickup &amp; Destination</th>
                    <th className="py-3 px-4 font-bold">Shift / Category</th>
                    <th className="py-3 px-4 font-bold">Allocated Vehicle &amp; Driver</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-[#64748B]">
                        No corporate commute records match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#EFF7FC]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#3898D8]">
                          {b.id}
                          <span className="block text-[10px] text-[#64748B] font-sans font-normal">{b.travelDate}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#153B5B]">{b.employeeName}</div>
                          <div className="text-[10px] text-[#64748B]">{b.department} • {b.employeePhone}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="text-xs truncate font-medium text-[#153B5B]">📍 {b.pickupLocation}</div>
                          <div className="text-[11px] text-[#64748B] truncate">🏢 {b.dropLocation}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold block text-[#153B5B]">{b.shift}</span>
                          <span className="text-[10px] text-[#3898D8] font-bold">{b.vehicleCategoryPreference}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          {b.assignedVehicle !== 'Unallocated' ? (
                            <div>
                              <div className="font-bold text-[#153B5B]">{b.assignedVehicle}</div>
                              <div className="text-[11px] text-[#19A89A] font-semibold">{b.assignedDriver}</div>
                            </div>
                          ) : (
                            <span className="text-[11px] font-bold text-[#F59E0B] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Pending Allocation
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            b.status === 'COMPLETED'
                              ? 'bg-[#E6F7F5] text-[#19A89A] border-[#19A89A]/30'
                              : b.status === 'DISPATCHED_ASSIGNED' || b.status === 'PASSENGER_BOARDED'
                              ? 'bg-[#DCEEFF] text-[#3898D8] border-[#3898D8]/30'
                              : b.status === 'DRIVER_EN_ROUTE'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : b.status === 'APPROVED_AWAITING_DISPATCH'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {b.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleOpenAllocation(b)}
                            className="px-3 py-1.5 rounded-lg bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-sm transition-all"
                          >
                            {b.assignedVehicle !== 'Unallocated' ? 'Re-allocate' : 'Allocate Cab'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: INTERACTIVE LIVE TELEMETRY MAP
          ========================================================================= */}
      {activeTab === 'TELEMETRY' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#3898D8] animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-[#153B5B]">Active Commute Fleet Coordinates (Simulated Radar)</h3>
                <p className="text-xs text-[#64748B]">Simulated 3-second GPS telemetry ping across Mumbai &amp; Pune Express corridors</p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#19A89A] bg-[#E6F7F5] px-3 py-1 rounded-full border border-[#19A89A]/30">
              MOCK_GPS_RADAR_ONLINE
            </span>
          </div>

          {/* Stylized Canvas */}
          <div className="relative rounded-3xl bg-[#0C2238] border border-[#153B5B] p-6 text-white min-h-[460px] flex flex-col justify-between overflow-hidden shadow-xl">
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f25_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f25_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#19A89A] animate-ping" />
                <span className="font-mono">TELEMETRY CORRIDOR: MUMBAI BKC &amp; PUNE HINJAWADI</span>
              </div>
              <div className="text-xs text-slate-300 font-mono">Simulated Speed Governor: 80 km/h limit active</div>
            </div>

            {/* Simulated Live Vehicle Markers */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {[
                {
                  plate: 'MH 02 ER 9120',
                  model: 'Innova Crysta',
                  driver: 'Ramesh Shinde',
                  passenger: 'Pooja Sharma',
                  speed: '48 km/h',
                  eta: '12 mins',
                  location: 'WEH Goregaon Flyover Southbound',
                  status: 'EN_ROUTE'
                },
                {
                  plate: 'MH 01 CV 4410',
                  model: 'Maruti Dzire',
                  driver: 'Suresh Patil',
                  passenger: 'Rohit Kulkarni',
                  speed: '36 km/h',
                  eta: '18 mins',
                  location: 'Eastern Express Highway Ghatkopar',
                  status: 'BOARDED'
                },
                {
                  plate: 'MH 12 QK 5510',
                  model: 'Maruti Ertiga',
                  driver: 'Nitin Sawant',
                  passenger: 'Aditya Patil',
                  speed: '55 km/h',
                  eta: '8 mins',
                  location: 'Hinjawadi Phase 1 Shivaji Chowk',
                  status: 'EN_ROUTE'
                }
              ].map((v, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#153B5B]/80 backdrop-blur-md border border-white/20 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#3898D8] bg-black/40 px-2 py-0.5 rounded border border-[#3898D8]/40">
                      {v.plate}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#19A89A]/30 text-[#19A89A]">
                      {v.status}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white">{v.model}</div>
                  <div className="text-xs text-slate-300">Chauffeur: <strong className="text-white">{v.driver}</strong></div>
                  <div className="text-xs text-slate-300">Passenger: <strong className="text-cyan-300">{v.passenger}</strong></div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400">⚡ {v.speed}</span>
                    <span className="text-amber-300">⏳ ETA: {v.eta}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">📍 {v.location}</p>
                </div>
              ))}
            </div>

            <div className="relative z-10 p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
              <span>Notice: Live vehicle locations and speed telematics are simulated for frontend demonstration.</span>
              <span className="text-[11px] font-mono text-[#3898D8]">4 Active Corridors Monitored</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: FLEET & VEHICLE INVENTORY
          ========================================================================= */}
      {activeTab === 'FLEET' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#153B5B]">Corporate Contracted Fleet Vehicles</h3>
            <button
              onClick={() => setIsAddVehicleOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#3898D8] text-white text-xs font-bold"
            >
              + Register New Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((v) => (
              <div key={v.id} className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold bg-[#EFF7FC] text-[#3898D8] px-2.5 py-1 rounded-md border border-[#E5EDF5]">
                    {v.plateNumber}
                  </span>
                  <span className="text-[10px] font-bold text-[#19A89A] bg-[#E6F7F5] px-2 py-0.5 rounded-full">
                    {v.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[#153B5B]">{v.model}</h4>
                  <div className="text-xs text-[#64748B] mt-0.5">{v.category} • {v.seats} Seats • {v.fuelType}</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Assigned Chauffeur</span>
                    <span className="font-semibold text-[#153B5B]">{v.assignedDriver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Fleet Partner</span>
                    <span className="font-semibold text-[#153B5B] truncate max-w-[170px]">{v.assignedVendor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">RTO Fitness Expiry</span>
                    <span className="font-mono text-[#19A89A] font-bold">{v.fitnessExpiry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: CHAUFFEURS & DRIVERS
          ========================================================================= */}
      {activeTab === 'DRIVERS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#153B5B]">Dedicated Corporate Chauffeur Roster</h3>
            <button
              onClick={() => setIsAddDriverOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#3898D8] text-white text-xs font-bold"
            >
              + Onboard Chauffeur
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((d) => (
              <div key={d.id} className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={d.photo}
                    alt={d.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#3898D8] shadow-sm"
                  />
                  <div>
                    <h4 className="text-base font-bold text-[#153B5B]">{d.name}</h4>
                    <div className="text-xs font-mono text-[#3898D8]">{d.phone}</div>
                    <div className="text-[11px] text-amber-500 font-bold">★ {d.rating} ({d.totalTrips} completed trips)</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Licence Expiry</span>
                    <span className="font-mono font-bold text-[#153B5B]">{d.licenseExpiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Assigned Cab</span>
                    <span className="font-semibold text-[#153B5B] truncate max-w-[170px]">{d.assignedVehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Police Verification</span>
                    <span className="text-[#19A89A] font-bold">✓ {d.policeVerification}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: ROUTE PLANNING
          ========================================================================= */}
      {activeTab === 'ROUTES' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#153B5B]">Configured Shift Transit Corridors</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((r) => (
              <div key={r.id} className="p-5 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#3898D8] bg-[#DCEEFF] px-2.5 py-1 rounded-md">
                    {r.id}
                  </span>
                  <span className="text-xs text-[#64748B] font-semibold">{r.city}</span>
                </div>

                <h4 className="text-base font-bold text-[#153B5B]">{r.name}</h4>
                <div className="text-xs text-[#64748B]">
                  Distance: <strong className="text-[#153B5B]">{r.distanceKm} KM</strong> • Est. Duration: <strong className="text-[#153B5B]">{r.avgDuration}</strong>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">Pickup Halts Sequence:</span>
                  <div className="space-y-1">
                    {r.stops?.map((st, i) => (
                      <div key={i} className="text-xs text-[#153B5B] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3898D8]" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5EDF5] flex justify-between items-center text-xs">
                  <span className="text-[#64748B]">Assigned: <strong className="text-[#153B5B]">{r.assignedVehicle}</strong></span>
                  <span className="text-[11px] font-bold text-[#19A89A] bg-[#E6F7F5] px-2.5 py-0.5 rounded-full">
                    {r.allocatedEmployees}/{r.maxCapacity} Seats Full
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ALLOCATE VEHICLE & DRIVER TO BOOKING
          ========================================================================= */}
      {allocatingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white border border-[#E5EDF5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#153B5B]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
              <div>
                <span className="text-xs font-mono font-bold text-[#3898D8]">{allocatingBooking.id}</span>
                <h3 className="text-base font-bold text-[#153B5B]">Dispatch Vehicle &amp; Chauffeur</h3>
              </div>
              <button
                onClick={() => setAllocatingBooking(null)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] text-xs space-y-1">
              <div>Passenger: <strong className="text-[#153B5B]">{allocatingBooking.employeeName}</strong> ({allocatingBooking.department})</div>
              <div>Pickup Point: <strong className="text-[#153B5B]">{allocatingBooking.pickupLocation}</strong></div>
              <div>Shift: <strong className="text-[#3898D8]">{allocatingBooking.shift}</strong></div>
            </div>

            <form onSubmit={handleConfirmAllocation} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#153B5B] font-bold mb-1">Select Available Fleet Vehicle</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  required
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={`${v.model} (${v.plateNumber})`}>
                      {v.plateNumber} • {v.model} ({v.seats} Seats) • {v.status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#153B5B] font-bold mb-1">Select Verified Chauffeur</label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  required
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                >
                  {drivers.map((d) => (
                    <option key={d.id} value={`${d.name} (${d.phone})`}>
                      {d.name} • Rating: ★{d.rating} • {d.phone} • {d.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-[#E5EDF5] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAllocatingBooking(null)}
                  className="px-4 py-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] font-semibold hover:bg-[#DCEEFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold shadow-sm"
                >
                  Confirm Dispatch Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW FLEET VEHICLE
          ========================================================================= */}
      {isAddVehicleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-[#E5EDF5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#153B5B]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
              <h3 className="text-base font-bold text-[#153B5B]">Register New Fleet Vehicle</h3>
              <button
                onClick={() => setIsAddVehicleOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#153B5B] font-bold mb-1">Registration Plate (RTO)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MH 02 ER 9120"
                  value={newVehPlate}
                  onChange={(e) => setNewVehPlate(e.target.value.toUpperCase())}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-mono font-bold focus:outline-none focus:border-[#3898D8]"
                />
              </div>

              <div>
                <label className="block text-[#153B5B] font-bold mb-1">Vehicle Model</label>
                <select
                  value={newVehModel}
                  onChange={(e) => setNewVehModel(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold"
                >
                  <option value="Toyota Innova Crysta">Toyota Innova Crysta</option>
                  <option value="Toyota Innova Hycross">Toyota Innova Hycross</option>
                  <option value="Maruti Suzuki Dzire">Maruti Suzuki Dzire</option>
                  <option value="Maruti Suzuki Ertiga">Maruti Suzuki Ertiga</option>
                  <option value="Mahindra Scorpio-N">Mahindra Scorpio-N</option>
                  <option value="Force Urbania 17-Seater">Force Urbania 17-Seater</option>
                  <option value="BharatBenz 26-Seater Coach">BharatBenz 26-Seater Coach</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Category</label>
                  <select
                    value={newVehCategory}
                    onChange={(e) => setNewVehCategory(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2.5 text-xs text-[#153B5B] font-semibold"
                  >
                    <option value="Executive SUV">Executive SUV</option>
                    <option value="Prime Sedan">Prime Sedan</option>
                    <option value="MUV">MUV</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                    <option value="Mini Bus">Mini Bus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Seating Capacity</label>
                  <input
                    type="number"
                    value={newVehSeats}
                    onChange={(e) => setNewVehSeats(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2.5 text-xs text-[#153B5B] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#153B5B] font-bold mb-1">Contracted Fleet Partner</label>
                <select
                  value={newVehVendor}
                  onChange={(e) => setNewVehVendor(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold"
                >
                  <option value="Mahalaxmi Mobility Solutions">Mahalaxmi Mobility Solutions</option>
                  <option value="Sahyadri Fleet Logistics">Sahyadri Fleet Logistics</option>
                  <option value="Konkan Tourist Corp">Konkan Tourist Corp</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#E5EDF5] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddVehicleOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3898D8] text-white font-bold"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW CHAUFFEUR
          ========================================================================= */}
      {isAddDriverOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-[#E5EDF5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#153B5B]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
              <h3 className="text-base font-bold text-[#153B5B]">Onboard Dedicated Chauffeur</h3>
              <button
                onClick={() => setIsAddDriverOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDriver} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#153B5B] font-bold mb-1">Chauffeur Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nitin Sawant"
                  value={newDrvName}
                  onChange={(e) => setNewDrvName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                />
              </div>

              <div>
                <label className="block text-[#153B5B] font-bold mb-1">Mobile Contact Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={newDrvPhone}
                  onChange={(e) => setNewDrvPhone(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-mono font-semibold focus:outline-none focus:border-[#3898D8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Commercial Licence #</label>
                  <input
                    type="text"
                    placeholder="MH-02-XXXXXXX"
                    value={newDrvLicense}
                    onChange={(e) => setNewDrvLicense(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2.5 text-xs text-[#153B5B] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={newDrvExp}
                    onChange={(e) => setNewDrvExp(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2.5 text-xs text-[#153B5B]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#E6F7F5] border border-[#19A89A]/30 text-[11px] text-[#19A89A] font-semibold">
                ✓ Automated police background verification ping simulated.
              </div>

              <div className="pt-3 border-t border-[#E5EDF5] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDriverOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3898D8] text-white font-bold"
                >
                  Onboard Chauffeur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
