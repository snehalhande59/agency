import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Compass, ArrowRight, Flame } from 'lucide-react';

export const IndiaPlacesTicker = () => {
  const navigate = useNavigate();

  // Row 1: Famous Heritage, Spiritual & Western/Northern Highlights
  const placesRow1 = [
    { name: 'Shirdi', state: 'Maharashtra', tag: 'Sai Samadhi Dham', icon: '🛕', color: 'from-amber-500/10 to-orange-500/10 border-amber-300' },
    { name: 'Pune', state: 'Maharashtra', tag: 'IT & Sinhagad', icon: '🏰', color: 'from-blue-500/10 to-cyan-500/10 border-blue-300' },
    { name: 'Mumbai', state: 'Maharashtra', tag: 'Marine Drive Gateway', icon: '🌊', color: 'from-sky-500/10 to-indigo-500/10 border-sky-300' },
    { name: 'Goa', state: 'Goa', tag: 'Sun & Coastal Highway', icon: '🏖️', color: 'from-teal-500/10 to-emerald-500/10 border-teal-300' },
    { name: 'Manali', state: 'Himachal', tag: 'Snow Peaks & Rohtang', icon: '🏔️', color: 'from-cyan-500/10 to-blue-500/10 border-cyan-300' },
    { name: 'Jaipur', state: 'Rajasthan', tag: 'Royal Pink City & Forts', icon: '👑', color: 'from-rose-500/10 to-pink-500/10 border-rose-300' },
    { name: 'Varanasi', state: 'Uttar Pradesh', tag: 'Ganga Aarti & Kashi', icon: '🕉️', color: 'from-orange-500/10 to-amber-500/10 border-orange-300' },
    { name: 'Agra', state: 'Uttar Pradesh', tag: 'Taj Mahal Wonder', icon: '🕌', color: 'from-amber-500/10 to-yellow-500/10 border-amber-300' },
    { name: 'Mahabaleshwar', state: 'Maharashtra', tag: 'Misty Western Ghats', icon: '🍓', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-300' },
    { name: 'Nashik', state: 'Maharashtra', tag: 'Sula Vineyards & Kumbh', icon: '🍇', color: 'from-purple-500/10 to-indigo-500/10 border-purple-300' },
    { name: 'Udaipur', state: 'Rajasthan', tag: 'City of Lakes & Palaces', icon: '⛵', color: 'from-blue-500/10 to-indigo-500/10 border-blue-300' },
    { name: 'Lonavala', state: 'Maharashtra', tag: 'Tiger Point Sahyadri', icon: '⛰️', color: 'from-green-500/10 to-emerald-500/10 border-green-300' }
  ];

  // Row 2: Scenic Southern, Himalayan & Iconic Indian Destinations
  const placesRow2 = [
    { name: 'Kerala', state: 'God\'s Own Country', tag: 'Alleppey Backwaters', icon: '🌴', color: 'from-emerald-500/10 to-green-500/10 border-emerald-300' },
    { name: 'Rishikesh', state: 'Uttarakhand', tag: 'Yoga Capital & Rafting', icon: '🧘', color: 'from-teal-500/10 to-cyan-500/10 border-teal-300' },
    { name: 'Ooty', state: 'Tamil Nadu', tag: 'Nilgiri Blue Mountains', icon: '🚂', color: 'from-lime-500/10 to-emerald-500/10 border-lime-300' },
    { name: 'Darjeeling', state: 'West Bengal', tag: 'Kanchenjunga & Tea', icon: '☕', color: 'from-amber-500/10 to-orange-500/10 border-amber-300' },
    { name: 'Ladakh', state: 'Ladakh', tag: 'Pangong & Khardung La', icon: '🏍️', color: 'from-sky-500/10 to-blue-500/10 border-sky-300' },
    { name: 'Amritsar', state: 'Punjab', tag: 'Golden Temple & Wagah', icon: '✨', color: 'from-yellow-500/10 to-amber-500/10 border-yellow-300' },
    { name: 'Bengaluru', state: 'Karnataka', tag: 'Silicon Valley Hub', icon: '💻', color: 'from-indigo-500/10 to-blue-500/10 border-indigo-300' },
    { name: 'Hyderabad', state: 'Telangana', tag: 'Charminar & Biryani', icon: '💎', color: 'from-violet-500/10 to-purple-500/10 border-violet-300' },
    { name: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', tag: 'Ellora Rock Caves', icon: '🏛️', color: 'from-amber-500/10 to-stone-500/10 border-amber-300' },
    { name: 'Ayodhya', state: 'Uttar Pradesh', tag: 'Ram Janmabhoomi Mandir', icon: '🚩', color: 'from-orange-500/10 to-rose-500/10 border-orange-300' },
    { name: 'Shimla', state: 'Himachal', tag: 'Mall Road & Ridge', icon: '❄️', color: 'from-cyan-500/10 to-sky-500/10 border-cyan-300' },
    { name: 'Alibaug', state: 'Maharashtra', tag: 'Mandwa Ro-Ro Beach', icon: '⚓', color: 'from-blue-500/10 to-teal-500/10 border-blue-300' }
  ];

  const handlePlaceClick = (place) => {
    navigate(`/book?service=outstation-one-way&drop=${encodeURIComponent(place.name + ' (' + place.state + ')')}`);
  };

  return (
    <section className="py-12 bg-white relative overflow-hidden border-b border-[#E5EDF5]">
      {/* Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gradient-to-r from-[#3898D8]/10 via-[#19A89A]/10 to-[#3898D8]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#EFF7FC] border border-[#DCEEFF] flex items-center justify-center text-[#3898D8] shadow-2xs shrink-0">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black text-[#153B5B] font-display tracking-tight">
                  Most Popular Places &amp; Express Corridors Across India
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded-full border border-orange-200">
                  Fast Live Slides
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                Click any trending destination to book direct chauffeur cab, flight or state transport
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#3898D8] shrink-0">
            <Compass className="w-4 h-4 text-[#19A89A]" />
            <span>1,200+ Active Routes Across India</span>
          </div>
        </div>
      </div>

      {/* Slide Track 1: Fast Slide to Left */}
      <div className="relative w-full overflow-hidden mb-3">
        {/* Soft edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 22, // Fast smooth slide
              ease: 'linear'
            }
          }}
          className="flex items-center gap-3.5 whitespace-nowrap will-change-transform"
        >
          {[...placesRow1, ...placesRow1, ...placesRow1].map((place, idx) => (
            <button
              key={`${place.name}-${idx}`}
              type="button"
              onClick={() => handlePlaceClick(place)}
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#EFF7FC] border border-[#E5EDF5] hover:border-[#3898D8] shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer text-left shrink-0 hover:scale-105 active:scale-95"
            >
              <span className="text-xl shrink-0 group-hover:scale-125 transition-transform">
                {place.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#153B5B] group-hover:text-[#3898D8] transition-colors">
                    {place.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#64748B] bg-white px-2 py-0.5 rounded-full border border-[#E5EDF5]">
                    {place.state}
                  </span>
                </div>
                <div className="text-[11px] text-[#64748B] font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19A89A]" />
                  <span>{place.tag}</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#3898D8] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-1" />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Slide Track 2: Fast Slide to Right */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [-1920, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 24, // Fast smooth slide
              ease: 'linear'
            }
          }}
          className="flex items-center gap-3.5 whitespace-nowrap will-change-transform"
        >
          {[...placesRow2, ...placesRow2, ...placesRow2].map((place, idx) => (
            <button
              key={`${place.name}-r2-${idx}`}
              type="button"
              onClick={() => handlePlaceClick(place)}
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#EFF7FC] border border-[#E5EDF5] hover:border-[#19A89A] shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer text-left shrink-0 hover:scale-105 active:scale-95"
            >
              <span className="text-xl shrink-0 group-hover:scale-125 transition-transform">
                {place.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#153B5B] group-hover:text-[#19A89A] transition-colors">
                    {place.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#64748B] bg-white px-2 py-0.5 rounded-full border border-[#E5EDF5]">
                    {place.state}
                  </span>
                </div>
                <div className="text-[11px] text-[#64748B] font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3898D8]" />
                  <span>{place.tag}</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#19A89A] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-1" />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
