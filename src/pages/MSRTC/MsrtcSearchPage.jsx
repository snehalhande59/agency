import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, MapPin, Calendar, ArrowRightLeft, Search, Sparkles, Award, ShieldCheck, HeartHandshake, Info } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';
import { MSRTC_DEPOTS, MSRTC_SERVICE_TYPES, MSRTC_CONCESSIONS } from '../../services/msrtc/msrtcService';

export const MsrtcSearchPage = () => {
  const navigate = useNavigate();
  const { searchForm, setSearchForm } = useMsrtcStore();

  const [fromQuery, setFromQuery] = useState(searchForm.originDepot || '');
  const [toQuery, setToQuery] = useState(searchForm.destDepot || '');
  const [date, setDate] = useState(searchForm.journeyDate || '');
  const [serviceType, setServiceType] = useState(searchForm.serviceType || 'ALL');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredFromDepots = MSRTC_DEPOTS.filter(
    (d) => d.name.toLowerCase().includes(fromQuery.toLowerCase()) || d.city.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredToDepots = MSRTC_DEPOTS.filter(
    (d) => d.name.toLowerCase().includes(toQuery.toLowerCase()) || d.city.toLowerCase().includes(toQuery.toLowerCase())
  );

  const handleSwap = () => {
    const temp = fromQuery;
    setFromQuery(toQuery);
    setToQuery(temp);
    setFormError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (fromQuery && toQuery && fromQuery.trim().toLowerCase() === toQuery.trim().toLowerCase()) {
      setFormError('Boarding and destination bus depots cannot be the same.');
      return;
    }
    setFormError('');
    setSearchForm({
      originDepot: fromQuery,
      destDepot: toQuery,
      journeyDate: date,
      serviceType: serviceType
    });
    navigate('/msrtc/results');
  };

  const popularCorridors = [
    { from: 'Mumbai - Dadar Asiad Stand', to: 'Pune - Swargate Bus Depot', tag: 'High Frequency' },
    { from: 'Mumbai - Borivali (Nancy Colony)', to: 'Pune - Swargate Bus Depot', tag: 'Shivneri AC' },
    { from: 'Pune - Shivajinagar Stand', to: 'Nashik - Old CBS Bus Stand', tag: 'Shivshahi' },
    { from: 'Pune - Swargate Bus Depot', to: 'Mahabaleshwar ST Stand', tag: 'Scenic Ghats' },
    { from: 'Mumbai Central CBS', to: 'Kolhapur Central Bus Stand (CBS)', tag: 'Express' }
  ];

  return (
    <div className="space-y-10">
      
      {/* Hero Search Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State Transport Corporation Online Bus Booking Simulation</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-3">
            Book Maharashtra ST &amp; Shivneri Buses
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Search 18,000+ daily MSRTC state bus routes across Maharashtra. Experience guaranteed government concession rates, real-time depot departures, and interactive seat booking.
          </p>
        </div>

        {/* Booking Search Form */}
        <form onSubmit={handleSearch} className="mt-8 relative z-10 space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
              <Info className="w-4 h-4 text-red-400 shrink-0" />
              <span>{formError}</span>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-navy-900/90 border border-slate-800 p-4 sm:p-6 rounded-2xl backdrop-blur-xl shadow-xl">
            
            {/* Origin Depot */}
            <div className="lg:col-span-4 relative">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                From Bus Station / Depot
              </label>
              <input
                type="text"
                value={fromQuery}
                onChange={(e) => {
                  setFromQuery(e.target.value);
                  setFromDropdownOpen(true);
                }}
                onFocus={() => setFromDropdownOpen(true)}
                placeholder="Search departure depot or city..."
                required
                className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium placeholder:text-slate-500"
              />

              {fromDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-navy-900 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-56 overflow-y-auto no-scrollbar">
                  {filteredFromDepots.length > 0 ? (
                    filteredFromDepots.map((depot) => (
                      <button
                        type="button"
                        key={depot.id}
                        onClick={() => {
                          setFromQuery(depot.name);
                          setFromDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 text-xs flex items-center justify-between border-b border-slate-800/60 last:border-0"
                      >
                        <span className="font-semibold text-white">{depot.name}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                          {depot.code}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-xs text-slate-400 text-center">No depots matching</div>
                  )}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex items-end justify-center pb-1">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap origin and destination"
                className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-red-500/50 transition-all shadow-sm"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Depot */}
            <div className="lg:col-span-4 relative">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                To Bus Station / Depot
              </label>
              <input
                type="text"
                value={toQuery}
                onChange={(e) => {
                  setToQuery(e.target.value);
                  setToDropdownOpen(true);
                }}
                onFocus={() => setToDropdownOpen(true)}
                placeholder="Search arrival depot or city..."
                required
                className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium placeholder:text-slate-500"
              />

              {toDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-navy-900 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-56 overflow-y-auto no-scrollbar">
                  {filteredToDepots.length > 0 ? (
                    filteredToDepots.map((depot) => (
                      <button
                        type="button"
                        key={depot.id}
                        onClick={() => {
                          setToQuery(depot.name);
                          setToDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 text-xs flex items-center justify-between border-b border-slate-800/60 last:border-0"
                      >
                        <span className="font-semibold text-white">{depot.name}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                          {depot.code}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-xs text-slate-400 text-center">No depots matching</div>
                  )}
                </div>
              )}
            </div>

            {/* Journey Date */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Journey Date
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium"
              />
            </div>

          </div>

          {/* Service Category Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Service Type:</span>
            {MSRTC_SERVICE_TYPES.map((service) => (
              <button
                type="button"
                key={service.code}
                onClick={() => setServiceType(service.code)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  serviceType === service.code
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 border border-red-500'
                    : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>

          {/* Submit Search Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-red-400 shrink-0" />
              <span>Simulated seat inventory updated every 60 seconds with live government fares</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Search State Buses</span>
            </button>
          </div>
        </form>

      </div>

      {/* Popular Corridors Quick-Select */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
            <Bus className="w-4 h-4 text-red-400" />
            Popular Maharashtra Corridors
          </h3>
          <span className="text-xs text-slate-400">Instant one-click route selection</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {popularCorridors.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setFromQuery(c.from);
                setToQuery(c.to);
                setSearchForm({ originDepot: c.from, destDepot: c.to, journeyDate: date, serviceType });
                navigate('/msrtc/results');
              }}
              className="text-left p-4 rounded-2xl bg-navy-900/60 border border-slate-800/80 hover:border-red-500/50 hover:bg-navy-850 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                  {c.tag}
                </span>
                <div className="mt-2 text-xs font-semibold text-white group-hover:text-red-300 transition-colors">
                  {c.from}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <span>to</span>
                  <span className="text-slate-300 font-medium">{c.to}</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-red-400 group-hover:translate-x-1 transition-transform">
                <span>View Buses &amp; Seats</span>
                <span>&rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Maharashtra Government Concessions Feature Card */}
      <div className="rounded-3xl bg-gradient-to-br from-red-950/40 via-navy-900 to-slate-900 border border-red-500/30 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Maharashtra State Government Concessions
              </h3>
              <p className="text-xs text-slate-400">
                Official travel subsidies supported and auto-calculated during seat reservation
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-red-300 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 self-start md:self-auto">
            100% Guaranteed Subsidies
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-navy-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-rose-300">Mahila Samman</span>
              <span className="text-xs font-black text-emerald-400">50% OFF</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Applicable to all women passengers across all standard &amp; luxury state transport buses.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-amber-300">Amrit Jyeshtha (75+)</span>
              <span className="text-xs font-black text-emerald-400">100% FREE</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              100% free travel in Ordinary/Hirkani buses, and 50% discount in Shivshahi &amp; Shivneri AC.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-blue-300">Senior Citizen (65-74)</span>
              <span className="text-xs font-black text-emerald-400">50% OFF</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Standard 50% discount on fare with valid Government of Maharashtra or Aadhaar verification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-purple-300">Divyang (Disability)</span>
              <span className="text-xs font-black text-emerald-400">75% OFF</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              75% discount for certified disabled individuals with official UDID / disability pass.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
