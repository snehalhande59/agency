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
      <div className="relative rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Maharashtra State Road Transport Corporation (MSRTC) Reservation</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-[#153B5B] tracking-tight font-display mb-2">
            Book Maharashtra ST &amp; Shivneri Buses
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm max-w-2xl leading-relaxed">
            Search 18,000+ daily MSRTC state bus routes across Maharashtra. Experience guaranteed government concession rates, real-time depot departures, and interactive seat booking.
          </p>
        </div>

        {/* Booking Search Form */}
        <form onSubmit={handleSearch} className="mt-6 relative z-10 space-y-4">
          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <Info className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-[#EFF7FC] border border-[#E5EDF5] p-4 sm:p-5 rounded-2xl shadow-xs">
            
            {/* Origin Depot */}
            <div className="lg:col-span-4 relative">
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
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
                className="w-full bg-white border border-[#E5EDF5] rounded-xl px-4 py-3 text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all placeholder:text-[#94A3B8]"
              />

              {fromDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#E5EDF5] rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto no-scrollbar">
                  {filteredFromDepots.length > 0 ? (
                    filteredFromDepots.map((depot) => (
                      <button
                        type="button"
                        key={depot.id}
                        onClick={() => {
                          setFromQuery(depot.name);
                          setFromDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#EFF7FC] text-xs flex items-center justify-between border-b border-[#E5EDF5] last:border-0 transition-colors"
                      >
                        <span className="font-bold text-[#153B5B]">{depot.name}</span>
                        <span className="text-[10px] bg-[#DCEEFF] text-[#3898D8] px-2 py-0.5 rounded font-mono font-bold">
                          {depot.code}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-xs text-[#64748B] text-center">No depots matching</div>
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
                className="p-3 rounded-xl bg-white border border-[#E5EDF5] text-[#153B5B] hover:text-rose-600 hover:border-rose-400 transition-all shadow-xs"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Depot */}
            <div className="lg:col-span-4 relative">
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3898D8]" />
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
                className="w-full bg-white border border-[#E5EDF5] rounded-xl px-4 py-3 text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all placeholder:text-[#94A3B8]"
              />

              {toDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#E5EDF5] rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto no-scrollbar">
                  {filteredToDepots.length > 0 ? (
                    filteredToDepots.map((depot) => (
                      <button
                        type="button"
                        key={depot.id}
                        onClick={() => {
                          setToQuery(depot.name);
                          setToDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#EFF7FC] text-xs flex items-center justify-between border-b border-[#E5EDF5] last:border-0 transition-colors"
                      >
                        <span className="font-bold text-[#153B5B]">{depot.name}</span>
                        <span className="text-[10px] bg-[#DCEEFF] text-[#3898D8] px-2 py-0.5 rounded font-mono font-bold">
                          {depot.code}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-xs text-[#64748B] text-center">No depots matching</div>
                  )}
                </div>
              )}
            </div>

            {/* Journey Date */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Journey Date
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-white border border-[#E5EDF5] rounded-xl px-4 py-3 text-sm text-[#153B5B] font-bold focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all"
              />
            </div>

          </div>

          {/* Service Category Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#64748B] font-bold mr-1">Service Type:</span>
            {MSRTC_SERVICE_TYPES.map((service) => (
              <button
                type="button"
                key={service.code}
                onClick={() => setServiceType(service.code)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  serviceType === service.code
                    ? 'bg-rose-600 text-white shadow-sm border border-rose-600'
                    : 'bg-white border border-[#E5EDF5] text-[#153B5B] hover:border-rose-300 hover:text-rose-700'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>

          {/* Submit Search Button */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <Info className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Simulated seat inventory updated every 60 seconds with live government fares</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
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
          <h3 className="text-base sm:text-lg font-black text-[#153B5B] font-display flex items-center gap-2">
            <Bus className="w-4 h-4 text-rose-600" />
            <span>Popular Maharashtra Corridors</span>
          </h3>
          <span className="text-xs text-[#64748B]">Instant one-click route selection</span>
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
              className="text-left p-4 rounded-2xl bg-white border border-[#E5EDF5] hover:border-rose-500 hover:shadow-md transition-all group flex flex-col justify-between shadow-2xs"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                  {c.tag}
                </span>
                <div className="mt-2 text-sm font-extrabold text-[#153B5B] group-hover:text-rose-600 transition-colors">
                  {c.from}
                </div>
                <div className="text-xs text-[#64748B] mt-1 flex items-center gap-1.5">
                  <span className="text-[#94A3B8]">to</span>
                  <span className="text-[#153B5B] font-bold">{c.to}</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#E5EDF5] flex items-center justify-between text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                <span>View Buses &amp; Seats</span>
                <span>&rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Maharashtra Government Concessions Feature Card */}
      <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E5EDF5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#153B5B] font-display">
                Maharashtra State Government Concessions
              </h3>
              <p className="text-xs text-[#64748B]">
                Official travel subsidies supported and auto-calculated during seat reservation
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 self-start md:self-auto">
            100% Guaranteed Subsidies
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-rose-700">Mahila Samman</span>
              <span className="text-xs font-black text-emerald-600">50% OFF</span>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Applicable to all women passengers across all standard &amp; luxury state transport buses.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-amber-700">Amrit Jyeshtha (75+)</span>
              <span className="text-xs font-black text-emerald-600">100% FREE</span>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              100% free travel in Ordinary/Hirkani buses, and 50% discount in Shivshahi &amp; Shivneri AC.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#3898D8]">Senior Citizen (65-74)</span>
              <span className="text-xs font-black text-emerald-600">50% OFF</span>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Standard 50% discount on fare with valid Government of Maharashtra or Aadhaar verification.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-purple-700">Divyang (Disability)</span>
              <span className="text-xs font-black text-emerald-600">75% OFF</span>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              75% discount for certified disabled individuals with official UDID / disability pass.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
