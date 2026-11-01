import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bus, Clock, Calendar, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Filter, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { useMsrtcStore } from '../../store/useMsrtcStore';
import { msrtcService, MSRTC_SERVICE_TYPES } from '../../services/msrtc/msrtcService';

export const MsrtcResultsPage = () => {
  const navigate = useNavigate();
  const { searchForm, setSelectedBus } = useMsrtcStore();

  const [activeFilterService, setActiveFilterService] = useState(searchForm.serviceType || 'ALL');
  const [acOnly, setAcOnly] = useState(false);
  const [expandedBusId, setExpandedBusId] = useState(null);

  // Get matching buses using isolated mock service
  const buses = useMemo(() => {
    let results = msrtcService.searchBuses({
      originDepot: searchForm.originDepot,
      destDepot: searchForm.destDepot,
      serviceType: activeFilterService
    });

    if (acOnly) {
      results = results.filter((b) => b.serviceType === 'SHIVNERI' || b.serviceType === 'SHIVSHAHI');
    }

    return results;
  }, [searchForm, activeFilterService, acOnly]);

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    navigate('/msrtc/seats');
  };

  const toggleExpand = (busId) => {
    setExpandedBusId(expandedBusId === busId ? null : busId);
  };

  return (
    <div className="space-y-6">
      
      {/* Route & Date Summary Bar */}
      <div className="bg-navy-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            to="/msrtc"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Modify Search"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
              <span>{searchForm.originDepot || 'Mumbai (Dadar Asiad)'}</span>
              <ArrowRight className="w-4 h-4 text-red-400" />
              <span>{searchForm.destDepot || 'Pune (Swargate CBS)'}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {searchForm.journeyDate || 'Today'}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{buses.length} State Buses Operating</span>
            </div>
          </div>
        </div>

        <Link
          to="/msrtc"
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-200 transition-all self-start md:self-auto"
        >
          Modify Search
        </Link>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-900/60 p-3.5 rounded-2xl border border-slate-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          {MSRTC_SERVICE_TYPES.map((service) => (
            <button
              key={service.code}
              type="button"
              onClick={() => setActiveFilterService(service.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilterService === service.code
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-navy-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {service.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={acOnly}
            onChange={(e) => setAcOnly(e.target.checked)}
            className="rounded border-slate-700 text-red-600 focus:ring-red-500 bg-navy-950"
          />
          <span>AC Buses Only (Shivneri / Shivshahi)</span>
        </label>
      </div>

      {/* Bus Results List */}
      <div className="space-y-4">
        {buses.length > 0 ? (
          buses.map((bus) => {
            const isExpanded = expandedBusId === bus.id;
            const isShivneri = bus.serviceType === 'SHIVNERI';

            return (
              <div
                key={bus.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isShivneri
                    ? 'bg-gradient-to-r from-navy-900 via-navy-900/90 to-red-950/20 border-red-500/30 hover:border-red-500/60'
                    : 'bg-navy-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="p-5 sm:p-6">
                  
                  {/* Top line badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        isShivneri
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-display'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 font-display'
                      }`}>
                        {bus.serviceName}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {bus.serviceNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        {bus.availableSeatsCount} Seats Left
                      </span>
                    </div>
                  </div>

                  {/* Main Grid: Times, Depot, Duration, Price, Select */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Origin -> Duration -> Dest */}
                    <div className="lg:col-span-7 grid grid-cols-3 items-center text-center sm:text-left">
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-white font-mono">
                          {bus.departureTime}
                        </div>
                        <div className="text-xs font-medium text-slate-300 mt-0.5 line-clamp-1">
                          {bus.originDepot}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center px-2">
                        <span className="text-[11px] text-slate-400 font-medium">{bus.duration}</span>
                        <div className="w-full flex items-center justify-center my-1.5">
                          <div className="h-0.5 flex-1 bg-slate-700" />
                          <Bus className="w-4 h-4 text-red-400 mx-2 shrink-0" />
                          <div className="h-0.5 flex-1 bg-slate-700" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">Express Corridor</span>
                      </div>

                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-black text-white font-mono">
                          {bus.arrivalTime}
                        </div>
                        <div className="text-xs font-medium text-slate-300 mt-0.5 line-clamp-1">
                          {bus.destDepot}
                        </div>
                      </div>
                    </div>

                    {/* Fare & Booking Button */}
                    <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center justify-end gap-4 lg:pl-6 lg:border-l lg:border-slate-800">
                      <div className="text-left sm:text-right">
                        <div className="text-[11px] text-slate-400">Base Fare (Adult)</div>
                        <div className="text-2xl font-black text-white font-mono flex items-center sm:justify-end gap-0.5">
                          <span className="text-red-400">₹</span>
                          <span>{bus.baseFare}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400 font-medium">Govt Subsidies Apply</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectBus(bus)}
                        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Select Seats</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Amenities and Details Toggle */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      {bus.amenities?.map((am, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 font-medium"
                        >
                          {am}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(bus.id)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <span>{isExpanded ? 'Hide Boarding Points' : 'View Boarding & Dropping Points'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Boarding & Dropping Halts */}
                {isExpanded && (
                  <div className="bg-navy-950 border-t border-slate-800 p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-red-400">
                        <span>Boarding Points ({bus.originDepot})</span>
                      </h4>
                      <div className="space-y-2">
                        {bus.boardingPoints?.map((bp, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-navy-900 border border-slate-800">
                            <span className="text-slate-300 font-medium">{bp.name}</span>
                            <span className="text-slate-400 font-mono text-[11px]">{bp.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-blue-400">
                        <span>Dropping Points ({bus.destDepot})</span>
                      </h4>
                      <div className="space-y-2">
                        {bus.droppingPoints?.map((dp, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-navy-900 border border-slate-800">
                            <span className="text-slate-300 font-medium">{dp.name}</span>
                            <span className="text-slate-400 font-mono text-[11px]">{dp.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-navy-900/50 rounded-2xl border border-slate-800 p-8">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No State Buses Found for Selected Filter</h3>
            <p className="text-xs text-slate-400 mb-4">Try clearing filters or selecting 'All Services'.</p>
            <button
              type="button"
              onClick={() => {
                setActiveFilterService('ALL');
                setAcOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
