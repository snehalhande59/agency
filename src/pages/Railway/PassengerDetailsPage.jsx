import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Train, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Mail,
  Phone,
  UserCheck
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { BERTH_PREFERENCES } from '../../services/railway/railwayService';

export const PassengerDetailsPage = () => {
  const navigate = useNavigate();
  const { 
    selectedTrain, 
    selectedClass, 
    selectedQuota, 
    searchForm, 
    passengers, 
    addPassenger, 
    removePassenger, 
    updatePassenger,
    contactDetails,
    setContactDetails
  } = useRailwayStore();

  const [error, setError] = useState('');

  const handleProceed = (e) => {
    e.preventDefault();
    // Validate passengers
    for (const p of passengers) {
      if (!p.name.trim() || !p.age) {
        setError('Please enter name and age for all passengers.');
        return;
      }
    }
    if (!contactDetails.mobile || contactDetails.mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    navigate('/railway/review');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Back button & Journey Summary */}
      <div className="flex items-center justify-between">
        <Link
          to="/railway/results"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Train Results</span>
        </Link>
        <span className="text-xs text-electric-400 font-mono">Step 3 of 5: Passenger Manifest</span>
      </div>

      {/* Train Info Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-electric-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-electric-400">#{selectedTrain.number}</span>
            <span className="text-xs font-bold text-white">{selectedTrain.name}</span>
          </div>
          <p className="text-xs text-slate-400">
            {searchForm.fromName} ({selectedTrain.departureTime}) → {searchForm.toName} ({selectedTrain.arrivalTime}) • {searchForm.journeyDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-electric-600/20 text-electric-300 border border-electric-500/30 text-xs font-bold font-mono">
            Class: {selectedClass}
          </span>
          <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
            Quota: {selectedQuota}
          </span>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleProceed} className="space-y-6">
        
        {/* Passenger Forms */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Users className="w-5 h-5 text-electric-400" />
              <span>Passenger Information</span>
            </h3>

            {passengers.length < 6 && (
              <button
                type="button"
                onClick={addPassenger}
                className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 border border-slate-700 text-xs font-semibold text-electric-300 flex items-center gap-1.5 transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add Passenger</span>
              </button>
            )}
          </div>

          {passengers.map((p, index) => (
            <div
              key={p.id}
              className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4 relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Passenger {index + 1}
                </span>

                {passengers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePassenger(p.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Full Legal Name (as on ID card)</label>
                  <input
                    type="text"
                    required
                    value={p.name}
                    onChange={(e) => updatePassenger(p.id, 'name', e.target.value)}
                    placeholder="e.g. Ramesh Kumar Patel"
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    required
                    value={p.age}
                    onChange={(e) => updatePassenger(p.id, 'age', e.target.value)}
                    placeholder="Age"
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Gender</label>
                  <select
                    value={p.gender}
                    onChange={(e) => updatePassenger(p.id, 'gender', e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Berth / Seat Preference</label>
                  <select
                    value={p.berthPreference}
                    onChange={(e) => updatePassenger(p.id, 'berthPreference', e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-electric-500"
                  >
                    {BERTH_PREFERENCES.map((b) => (
                      <option key={b.code} value={b.code}>{b.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Pantry Food Preference</label>
                  <select
                    value={p.foodPreference}
                    onChange={(e) => updatePassenger(p.id, 'foodPreference', e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-electric-500"
                  >
                    <option value="Veg">Vegetarian Meal</option>
                    <option value="Non-Veg">Non-Vegetarian Meal</option>
                    <option value="Jain">Jain Meal</option>
                    <option value="No-Food">No Food Required</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information & IRCTC ID */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <span>Contact & IRCTC Account Details (Demo)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Mobile for E-Ticket SMS</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  value={contactDetails.mobile}
                  onChange={(e) => setContactDetails({ mobile: e.target.value })}
                  placeholder="10-digit mobile"
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Email for PDF ERS Ticket</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails({ email: e.target.value })}
                  placeholder="Email address"
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">IRCTC Username (Simulated)</label>
              <input
                type="text"
                value={contactDetails.irctcUsername}
                onChange={(e) => setContactDetails({ irctcUsername: e.target.value })}
                placeholder="IRCTC username"
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-electric-500"
              />
            </div>
          </div>
        </div>

        {/* Submit to Review */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-electric-600 via-blue-600 to-electric-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Fare Breakdown & Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
