import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Phone, 
  Bell, 
  History, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  QrCode,
  ArrowRight,
  Info
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateEmployeePortal = () => {
  const { 
    currentEmployee, 
    employeeNotifications, 
    employeeRideHistory, 
    submitEmployeeTransportRequest 
  } = useCorporateStore();

  const [activeTab, setActiveTab] = useState('SCHEDULE');
  const [requestServiceType, setRequestServiceType] = useState('Late Night Office Drop (Past 09:00 PM)');
  const [requestDate, setRequestDate] = useState(new Date().toISOString().split('T')[0]);
  const [requestReason, setRequestReason] = useState('Critical release deployment & server migration sprint');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    submitEmployeeTransportRequest({
      serviceType: requestServiceType,
      travelDate: requestDate,
      reason: requestReason
    });
    setRequestSubmitted(true);
    setTimeout(() => setRequestSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* 1. Employee Digital Commute Badge Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#3898D8] flex items-center justify-center text-white text-2xl font-black font-display shadow-sm">
            {currentEmployee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
                {currentEmployee.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF] px-2 py-0.5 rounded font-mono">
                {currentEmployee.id}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">{currentEmployee.designation}</p>
            <div className="flex items-center gap-3 text-[11px] text-[#64748B] mt-1">
              <span>Dept: <strong className="text-[#153B5B]">{currentEmployee.department}</strong></span>
              <span>•</span>
              <span>Blood Group: <strong className="text-rose-600">{currentEmployee.bloodGroup}</strong></span>
            </div>
          </div>
        </div>

        {/* Today's Commute OTP & Live Status */}
        <div className="flex items-center gap-3 bg-[#EFF7FC] p-4 rounded-2xl border border-[#E5EDF5]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#64748B] block">Boarding Commute Pass</span>
            <div className="text-xl font-black text-[#153B5B] font-mono flex items-center gap-2">
              <span className="text-[#3898D8]">OTP: {currentEmployee.todayOtp}</span>
            </div>
            <span className="text-[10px] text-[#19A89A] font-semibold">Scheduled On-Time</span>
          </div>

          <div className="p-2 rounded-xl bg-white text-[#3898D8] border border-[#E5EDF5] shadow-xs">
            <QrCode className="w-8 h-8 text-[#3898D8]" />
          </div>
        </div>
      </div>

      {/* 2. Employee Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-[#E5EDF5]">
        {[
          { id: 'SCHEDULE', label: 'My Daily Commute' },
          { id: 'REQUEST', label: 'Request Special Cab' },
          { id: 'HISTORY', label: 'My Ride History' },
          { id: 'NOTIFICATIONS', label: `Notifications (${employeeNotifications.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#3898D8] text-white shadow-sm'
                : 'bg-white border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DAILY TRANSPORT SCHEDULE */}
      {activeTab === 'SCHEDULE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Schedule & Stops */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stops Card */}
            <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  {currentEmployee.assignedRoute}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">Active Roster</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Morning Pickup Point</span>
                    <div className="text-sm font-bold text-white">{currentEmployee.pickupAddress}</div>
                    <div className="text-xs text-cyan-300 font-mono font-bold mt-0.5">
                      Scheduled Pickup: {currentEmployee.pickupTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Campus Drop Destination</span>
                    <div className="text-sm font-bold text-white">{currentEmployee.dropAddress}</div>
                    <div className="text-xs text-emerald-300 font-mono font-bold mt-0.5">
                      Evening Return Pickup: {currentEmployee.dropTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Telematics Notice */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed text-[11px]">
                <strong>Compliance Notice:</strong> Live GPS tracking on the employee app is simulated in demo mode. In enterprise production, vehicle telemetry updates every 3 seconds with automated SOS emergency response integration.
              </div>
            </div>

          </div>

          {/* Right Column: Assigned Chauffeur & Vehicle */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Chauffeur Card */}
            <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl space-y-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Assigned Dedicated Chauffeur
              </span>

              <div className="flex items-center gap-3">
                <img
                  src={currentEmployee.assignedDriver.photo}
                  alt={currentEmployee.assignedDriver.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-cyan-400 shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
                  }}
                />
                <div>
                  <h4 className="text-base font-bold text-white">{currentEmployee.assignedDriver.name}</h4>
                  <div className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <span>★ {currentEmployee.assignedDriver.rating}</span>
                    <span className="text-slate-400 font-normal">(1,840+ Completed Trips)</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">✓ Police Cleared &amp; Verified</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${currentEmployee.assignedDriver.phone}`}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-600/30 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Chauffeur: {currentEmployee.assignedDriver.phone}</span>
                </a>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Assigned Fleet Vehicle</span>
              <div className="text-base font-bold text-white">{currentEmployee.assignedVehicle}</div>
              <div className="text-slate-400">7-Seater Executive SUV • Dual Zone AC</div>
              <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                Sanitized Daily • Speed-governed 80 km/h
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: SPECIAL TRANSPORT REQUEST FORM */}
      {activeTab === 'REQUEST' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">Request Ad-Hoc Corporate Transport</h3>
              <p className="text-xs text-slate-400">For late-night overtime drops, client meetings, or emergency airport transfers</p>
            </div>

            {requestSubmitted && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Special cab request submitted successfully to your manager for approval.</span>
              </div>
            )}

            <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Service Type</label>
                <select
                  value={requestServiceType}
                  onChange={(e) => setRequestServiceType(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Late Night Office Drop (Past 09:00 PM)">Late Night Office Drop (Past 09:00 PM with Security Escort)</option>
                  <option value="Airport Pickup / Drop (Client Travel)">Airport Pickup / Drop (Client Travel)</option>
                  <option value="Outstation Client Visit (Mumbai to Pune/Nashik)">Outstation Client Visit (Mumbai to Pune/Nashik)</option>
                  <option value="Emergency Medical Commute">Emergency Medical Commute</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Travel Date</label>
                <input
                  type="date"
                  value={requestDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setRequestDate(e.target.value)}
                  required
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Business Justification &amp; Project Code</label>
                <textarea
                  rows="3"
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  required
                  placeholder="Mention project sprint or client meeting purpose..."
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit for Manager Approval</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: RIDE HISTORY */}
      {activeTab === 'HISTORY' && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Personal Commute History</h3>

          <div className="space-y-3">
            {employeeRideHistory.map((ride) => (
              <div key={ride.id} className="p-4 rounded-2xl bg-navy-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-300">{ride.id}</span>
                    <strong className="text-white">{ride.type}</strong>
                  </div>
                  <div className="text-slate-400 mt-1">
                    {ride.from} &rarr; {ride.to}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {ride.date} at {ride.time} • Chauffeur: {ride.driver} ({ride.vehicle})
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full self-start sm:self-auto">
                  {ride.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'NOTIFICATIONS' && (
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Commute Notifications &amp; Shift Alerts</span>
          </h3>

          <div className="space-y-3">
            {employeeNotifications.map((notif) => (
              <div key={notif.id} className="p-4 rounded-2xl bg-navy-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">{notif.title}</strong>
                  <span className="text-[10px] text-slate-500 font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
