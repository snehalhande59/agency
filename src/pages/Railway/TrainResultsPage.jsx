import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Train, 
  Clock, 
  Calendar, 
  MapPin, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Utensils, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { railwayService, TRAINS_DATA, TRAVEL_CLASSES } from '../../services/railway/railwayService';

export const TrainResultsPage = () => {
  const navigate = useNavigate();
  const { searchForm, setSelectedTrain } = useRailwayStore();

  const [trainTypeFilter, setTrainTypeFilter] = useState('ALL');
  const [classFilter, setClassFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('duration'); // 'duration', 'departure', 'fare'
  const [selectedScheduleModal, setSelectedScheduleModal] = useState(null);

  // Filter trains
  const rawTrains = railwayService.searchTrains({
    fromCode: searchForm.fromCode,
    toCode: searchForm.toCode,
    travelClass: searchForm.travelClass,
    quota: searchForm.quota
  });

  const filteredTrains = rawTrains.filter((train) => {
    const matchType = trainTypeFilter === 'ALL' || train.type === trainTypeFilter;
    const matchClass = classFilter === 'ALL' || train.classes[classFilter];
    return matchType && matchClass;
  });

  // Sort trains
  filteredTrains.sort((a, b) => {
    if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    if (sortBy === 'fare') {
      const minFareA = Math.min(...Object.values(a.classes).map(c => c.baseFare));
      const minFareB = Math.min(...Object.values(b.classes).map(c => c.baseFare));
      return minFareA - minFareB;
    }
    return 0;
  });

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleSelectSeat = (train, classCode) => {
    setSelectedTrain(train, classCode, searchForm.quota);
    navigate('/railway/passengers');
  };

  return (
    <div className="space-y-6">
      
      {/* Route Header Strip */}
      <div className="glass-panel p-5 rounded-2xl border border-electric-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <span>Route Search Results</span>
            <span>•</span>
            <span className="text-electric-400 font-mono">{searchForm.journeyDate}</span>
            <span>•</span>
            <span className="text-emerald-400">Quota: {searchForm.quota}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
            <span>{searchForm.fromName || 'Mumbai (CSMT)'}</span>
            <span className="text-slate-500">→</span>
            <span>{searchForm.toName || 'Pune Junction (PUNE)'}</span>
          </h2>
        </div>

        <Link
          to="/railway"
          className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all self-start md:self-auto"
        >
          Modify Search
        </Link>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-bold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Type:</span>
          </span>

          {['ALL', 'Vande Bharat', 'Rajdhani', 'Superfast', 'Jan Shatabdi'].map((type) => (
            <button
              key={type}
              onClick={() => setTrainTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                trainTypeFilter === type
                  ? 'bg-electric-600 text-white'
                  : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort By:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-navy-900 border border-slate-700 text-slate-200 text-xs rounded-lg py-1.5 px-2.5 focus:outline-none focus:border-electric-500"
          >
            <option value="duration">Fastest Duration</option>
            <option value="departure">Early Departure</option>
            <option value="fare">Lowest Fare</option>
          </select>
        </div>
      </div>

      {/* Train Results List */}
      <div className="space-y-4">
        {filteredTrains.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-3xl border border-slate-800 space-y-3">
            <Train className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No trains matching selected criteria</h3>
            <p className="text-xs text-slate-400">Try adjusting your class or train type filters.</p>
          </div>
        ) : (
          filteredTrains.map((train) => (
            <div
              key={train.number}
              className="glass-card rounded-3xl p-5 sm:p-6 border border-slate-800 hover:border-electric-500/30 transition-all space-y-4"
            >
              {/* Train Top Details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-electric-400 bg-electric-600/15 px-2.5 py-0.5 rounded border border-electric-500/20">
                    #{train.number}
                  </span>
                  <h3 className="text-base font-bold text-white font-display">{train.name}</h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {train.type}
                  </span>
                </div>

                {/* Running Days */}
                <div className="flex items-center gap-1 text-[10px] font-mono">
                  <span className="text-slate-400 mr-1">Runs On:</span>
                  {allDays.map((day) => {
                    const runs = train.runningDays.includes(day);
                    return (
                      <span
                        key={day}
                        className={`w-5 h-5 rounded flex items-center justify-center font-bold ${
                          runs ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800/40 text-slate-600'
                        }`}
                        title={`${day}: ${runs ? 'Operating' : 'Not Operating'}`}
                      >
                        {day[0]}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Time & Duration Trajectory */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 flex items-center justify-between py-2 px-4 rounded-2xl bg-navy-950/70 border border-slate-800/80">
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-white font-display">{train.departureTime}</span>
                    <span className="text-xs text-slate-300 font-semibold block">{train.fromCode}</span>
                    <span className="text-[10px] text-slate-400">{searchForm.journeyDate}</span>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <span className="text-xs font-mono text-slate-400 mb-1">{train.duration}</span>
                    <div className="w-24 sm:w-36 h-0.5 bg-gradient-to-r from-electric-500 to-emerald-400 relative">
                      <div className="w-2 h-2 rounded-full bg-electric-400 absolute -top-[3px] left-0"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-[3px] right-0"></div>
                    </div>
                    <button
                      onClick={() => setSelectedScheduleModal(train)}
                      className="text-[10px] text-electric-400 hover:underline mt-1 font-semibold"
                    >
                      Route Schedule & Halts
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-white font-display">{train.arrivalTime}</span>
                    <span className="text-xs text-emerald-400 font-semibold block">{train.toCode}</span>
                    <span className="text-[10px] text-slate-400">Arrival</span>
                  </div>
                </div>

                <div className="md:col-span-4 flex items-center justify-end gap-3 text-xs text-slate-400">
                  {train.pantryAvailable && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-navy-900 border border-slate-800 text-slate-300">
                      <Utensils className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pantry Catering Ready</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Class Availability Boxes */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Select Travel Class & Confirm Availability:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {Object.entries(train.classes).map(([classCode, classData]) => {
                    const isAvailable = classData.status.startsWith('AVAILABLE');
                    const isRac = classData.status.startsWith('RAC');

                    return (
                      <div
                        key={classCode}
                        onClick={() => handleSelectSeat(train, classCode)}
                        className="p-3 rounded-2xl bg-navy-950/80 border border-slate-800 hover:border-electric-500 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-white group-hover:text-electric-300 font-mono">
                            {classCode}
                          </span>
                          <span className="text-xs font-extrabold text-white font-display">
                            ₹{classData.baseFare}
                          </span>
                        </div>

                        <div className="pt-2">
                          <span
                            className={`text-[10px] font-bold block truncate ${
                              isAvailable ? 'text-emerald-400' : isRac ? 'text-amber-400' : 'text-rose-400'
                            }`}
                          >
                            {classData.status}
                          </span>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Click to Book →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Route Schedule Modal */}
      {selectedScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-[#E5EDF5] rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-[#153B5B]">
            <div className="p-5 border-b border-[#E5EDF5] bg-[#F8FAFC] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#3898D8]">Train #{selectedScheduleModal.number}</span>
                <h3 className="text-base font-bold text-[#153B5B]">{selectedScheduleModal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedScheduleModal(null)}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-[#EFF7FC] text-[#153B5B] hover:bg-[#DCEEFF] font-bold transition-colors"
              >
                Close ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5EDF5] text-[#64748B] uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3">Station</th>
                    <th className="py-2.5 px-3">Arr.</th>
                    <th className="py-2.5 px-3">Dep.</th>
                    <th className="py-2.5 px-3">Halt</th>
                    <th className="py-2.5 px-3">Distance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
                  {selectedScheduleModal.routeSchedule.map((st, i) => (
                    <tr key={i} className="hover:bg-[#EFF7FC]/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#153B5B]">
                        {st.station} <span className="text-[10px] text-[#64748B]">({st.code})</span>
                      </td>
                      <td className="py-2.5 px-3 text-[#64748B]">{st.arrival}</td>
                      <td className="py-2.5 px-3 text-[#153B5B] font-semibold">{st.departure}</td>
                      <td className="py-2.5 px-3 text-[#64748B]">{st.halt}</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B]">{st.distance} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
