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
      <div className="bg-white border border-[#E5EDF5] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/msrtc"
            className="p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Modify Search"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#153B5B]">
              <span>{searchForm.originDepot || 'Mumbai (Dadar Asiad)'}</span>
              <ArrowRight className="w-4 h-4 text-rose-600" />
              <span>{searchForm.destDepot || 'Pune (Swargate CBS)'}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#64748B] mt-0.5">
              <span className="flex items-center gap-1 font-bold">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {searchForm.journeyDate || 'Today'}
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-extrabold">{buses.length} State Buses Operating</span>
            </div>
          </div>
        </div>

        <Link
          to="/msrtc"
          className="text-xs font-bold px-4 py-2 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] hover:bg-[#DCEEFF] text-[#153B5B] transition-all self-start md:self-auto"
        >
          Modify Search
        </Link>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#E5EDF5] shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <Filter className="w-3.5 h-3.5 text-[#64748B] mr-1 shrink-0" />
          {MSRTC_SERVICE_TYPES.map((service) => (
            <button
              key={service.code}
              type="button"
              onClick={() => setActiveFilterService(service.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeFilterService === service.code
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-[#F8FAFC] border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              {service.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-bold text-[#153B5B] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={acOnly}
            onChange={(e) => setAcOnly(e.target.checked)}
            className="rounded border-[#CBD5E1] text-rose-600 focus:ring-rose-500"
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
                className={`rounded-2xl border transition-all overflow-hidden bg-white shadow-xs ${
                  isShivneri
                    ? 'border-rose-300 hover:border-rose-500'
                    : 'border-[#E5EDF5] hover:border-[#3898D8]'
                }`}
              >
                <div className="p-5 sm:p-6">
                  
                  {/* Top line badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        isShivneri
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 font-display'
                          : 'bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF] font-display'
                      }`}>
                        {bus.serviceName}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#64748B]">
                        {bus.serviceNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
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
                        <div className="text-xl sm:text-2xl font-black text-[#153B5B] font-mono">
                          {bus.departureTime}
                        </div>
                        <div className="text-xs font-bold text-[#64748B] mt-0.5 line-clamp-1">
                          {bus.originDepot}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center px-2">
                        <span className="text-[11px] text-[#64748B] font-bold">{bus.duration}</span>
                        <div className="w-full flex items-center justify-center my-1.5">
                          <div className="h-0.5 flex-1 bg-[#E5EDF5]" />
                          <Bus className="w-4 h-4 text-rose-600 mx-2 shrink-0" />
                          <div className="h-0.5 flex-1 bg-[#E5EDF5]" />
                        </div>
                        <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Express Corridor</span>
                      </div>

                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-black text-[#153B5B] font-mono">
                          {bus.arrivalTime}
                        </div>
                        <div className="text-xs font-bold text-[#64748B] mt-0.5 line-clamp-1">
                          {bus.destDepot}
                        </div>
                      </div>
                    </div>

                    {/* Fare & Booking Button */}
                    <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center justify-end gap-4 lg:pl-6 lg:border-l lg:border-[#E5EDF5]">
                      <div className="text-left sm:text-right">
                        <div className="text-[11px] text-[#64748B] font-bold">Base Fare (Adult)</div>
                        <div className="text-2xl font-black text-[#153B5B] font-mono flex items-center sm:justify-end gap-0.5">
                          <span className="text-rose-600">₹</span>
                          <span>{bus.baseFare}</span>
                        </div>
                        <div className="text-[10px] text-emerald-700 font-extrabold">Govt Subsidies Apply</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectBus(bus)}
                        className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Select Seats</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Amenities and Details Toggle */}
                  <div className="mt-4 pt-3.5 border-t border-[#E5EDF5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      {bus.amenities?.map((am, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#F8FAFC] text-[#153B5B] px-2 py-0.5 rounded border border-[#E5EDF5] font-bold"
                        >
                          {am}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(bus.id)}
                      className="text-[#64748B] hover:text-[#153B5B] flex items-center gap-1 font-bold text-[11px]"
                    >
                      <span>{isExpanded ? 'Hide Boarding Points' : 'View Boarding & Dropping Points'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Boarding & Dropping Halts */}
                {isExpanded && (
                  <div className="bg-[#F8FAFC] border-t border-[#E5EDF5] p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <h4 className="font-extrabold mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-rose-700">
                        <span>Boarding Points ({bus.originDepot})</span>
                      </h4>
                      <div className="space-y-2">
                        {bus.boardingPoints?.map((bp, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E5EDF5]">
                            <span className="text-[#153B5B] font-bold">{bp.name}</span>
                            <span className="text-[#64748B] font-mono text-[11px] font-semibold">{bp.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-extrabold mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#3898D8]">
                        <span>Dropping Points ({bus.destDepot})</span>
                      </h4>
                      <div className="space-y-2">
                        {bus.droppingPoints?.map((dp, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E5EDF5]">
                            <span className="text-[#153B5B] font-bold">{dp.name}</span>
                            <span className="text-[#64748B] font-mono text-[11px] font-semibold">{dp.time}</span>
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
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5EDF5] p-8 shadow-xs">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#153B5B] mb-1">No State Buses Found for Selected Filter</h3>
            <p className="text-xs text-[#64748B] mb-4">Try clearing filters or selecting 'All Services'.</p>
            <button
              type="button"
              onClick={() => {
                setActiveFilterService('ALL');
                setAcOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
