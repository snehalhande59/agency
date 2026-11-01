import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Train, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRightLeft, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { STATIONS, TRAVEL_CLASSES, QUOTAS, TRAINS_DATA } from '../../services/railway/railwayService';

export const RailwaySearchPage = () => {
  const navigate = useNavigate();
  const { searchForm, setSearchForm, setSelectedTrain } = useRailwayStore();

  const [fromQuery, setFromQuery] = useState(searchForm.fromName);
  const [toQuery, setToQuery] = useState(searchForm.toName);
  const [fromCode, setFromCode] = useState(searchForm.fromCode);
  const [toCode, setToCode] = useState(searchForm.toCode);
  const [journeyDate, setJourneyDate] = useState(searchForm.journeyDate);
  const [travelClass, setTravelClass] = useState(searchForm.travelClass);
  const [quota, setQuota] = useState(searchForm.quota);
  const [passengerCount, setPassengerCount] = useState(searchForm.passengerCount);

  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredFromStations = STATIONS.filter(
    (s) => s.code.toLowerCase().includes(fromQuery.toLowerCase()) || s.name.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredToStations = STATIONS.filter(
    (s) => s.code.toLowerCase().includes(toQuery.toLowerCase()) || s.name.toLowerCase().includes(toQuery.toLowerCase())
  );

  const handleSwap = () => {
    const tempQ = fromQuery;
    const tempC = fromCode;
    setFromQuery(toQuery);
    setFromCode(toCode);
    setToQuery(tempQ);
    setToCode(tempC);
    setFormError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (fromCode && toCode && fromCode === toCode) {
      setFormError('Origin and destination stations cannot be the same.');
      return;
    }
    setFormError('');
    setSearchForm({
      fromCode,
      fromName: fromQuery,
      toCode,
      toName: toQuery,
      journeyDate,
      travelClass,
      quota,
      passengerCount
    });
    navigate('/railway/results');
  };

  return (
    <div className="space-y-10">
      
      {/* Search Hero Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/30 shadow-2xl relative bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-600/20 text-electric-300 border border-electric-500/30 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 text-electric-glow" />
            <span>IRCTC High-Speed Reservation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Book Train Tickets & Live Berth Availability
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search 10,000+ train routes with verified Tatkal assist, confirmation predictor, and Vande Bharat seating.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{formError}</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* From Station with Autocomplete */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                From Station
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-electric-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fromQuery}
                  onFocus={() => setFromDropdown(true)}
                  onChange={(e) => {
                    setFromQuery(e.target.value);
                    setFromDropdown(true);
                  }}
                  placeholder="Enter origin station or code"
                  className="w-full bg-navy-950 border border-slate-700 rounded-2xl py-3 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
                />
              </div>

              {fromDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-navy-900 border border-electric-500/30 rounded-2xl shadow-2xl max-h-56 overflow-y-auto p-1.5 backdrop-blur-2xl">
                  {filteredFromStations.map((st) => (
                    <button
                      key={st.code}
                      type="button"
                      onClick={() => {
                        setFromQuery(`${st.name} (${st.code})`);
                        setFromCode(st.code);
                        setFromDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{st.name}</div>
                        <div className="text-[10px] text-slate-400">{st.city}, {st.state}</div>
                      </div>
                      <span className="font-mono text-xs font-bold text-electric-400 bg-navy-950 px-2 py-0.5 rounded border border-slate-800">
                        {st.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="hidden md:flex md:col-span-1 justify-center pt-5">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 rounded-full bg-navy-800 border border-slate-700 text-slate-300 hover:text-electric-400 hover:border-electric-500 transition-all shadow-sm"
                title="Swap Stations"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* To Station with Autocomplete */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                To Station
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={toQuery}
                  onFocus={() => setToDropdown(true)}
                  onChange={(e) => {
                    setToQuery(e.target.value);
                    setToDropdown(true);
                  }}
                  placeholder="Enter destination station or code"
                  className="w-full bg-navy-950 border border-slate-700 rounded-2xl py-3 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
                />
              </div>

              {toDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-navy-900 border border-electric-500/30 rounded-2xl shadow-2xl max-h-56 overflow-y-auto p-1.5 backdrop-blur-2xl">
                  {filteredToStations.map((st) => (
                    <button
                      key={st.code}
                      type="button"
                      onClick={() => {
                        setToQuery(`${st.name} (${st.code})`);
                        setToCode(st.code);
                        setToDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{st.name}</div>
                        <div className="text-[10px] text-slate-400">{st.city}, {st.state}</div>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-navy-950 px-2 py-0.5 rounded border border-slate-800">
                        {st.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Field */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                Journey Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-electric-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="date"
                  required
                  value={journeyDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-2xl py-3 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-electric-500 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Search CTA Button */}
            <div className="md:col-span-2 pt-1 md:pt-5">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-electric-600 via-blue-600 to-electric-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Trains</span>
              </button>
            </div>

          </div>

          {/* Secondary Filters Row: Class, Quota, Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                Travel Class
              </label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-electric-500"
              >
                {TRAVEL_CLASSES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                Booking Quota
              </label>
              <select
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-electric-500"
              >
                {QUOTAS.map((q) => (
                  <option key={q.code} value={q.code}>{q.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                Passengers Count
              </label>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-electric-500"
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4 Passengers</option>
                <option value={6}>6 Passengers (Max per ticket)</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Featured Rail Corridors */}
      <div>
        <h3 className="text-lg font-bold text-white font-display mb-4">
          Popular High-Speed Rail Corridors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAINS_DATA.map((train) => (
            <div
              key={train.number}
              className="glass-card p-5 rounded-3xl border border-slate-800 hover:border-electric-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-electric-400 bg-electric-600/15 px-2 py-0.5 rounded border border-electric-500/20">
                    #{train.number}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {train.type}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{train.name}</h4>
                <div className="flex items-center justify-between text-xs text-slate-300 py-2 border-y border-slate-800">
                  <div>
                    <span className="text-base font-extrabold text-white font-display">{train.departureTime}</span>
                    <span className="text-[10px] text-slate-400 block">{train.fromCode}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{train.duration}</span>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-white font-display">{train.arrivalTime}</span>
                    <span className="text-[10px] text-slate-400 block">{train.toCode}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">Available: <strong className="text-emerald-400">{Object.keys(train.classes).join(', ')}</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrain(train);
                    navigate('/railway/results');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs transition-all shadow-glow-sm"
                >
                  View Berths →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
