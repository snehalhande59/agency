import React from 'react';
import { MapPin, Navigation, Clock, ShieldAlert, Sparkles, Compass } from 'lucide-react';

export const MockRouteMap = ({
  pickup = 'Mumbai (Bandra/BKC)',
  drop = 'Pune (Swargate / Hinjawadi)',
  distanceKm = 148,
  duration = '2h 45m',
  highway = 'Mumbai-Pune Expressway (NH 48)',
  isRoundTrip = false,
  className = ''
}) => {
  return (
    <div className={`relative rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      
      {/* 1. Header with Maps Integration Notice */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold shadow-lg">
          <Navigation className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>MOCK ROUTE TELEMETRY • MAPS API NOT CONFIGURED</span>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-semibold">
          <Compass className="w-3 h-3 text-slate-400" />
          <span>{highway}</span>
        </div>
      </div>

      {/* 2. Stylized SVG Dark-Mode Map Canvas */}
      <div className="relative w-full h-56 sm:h-72 bg-navy-950 overflow-hidden">
        
        {/* Subtle Grid Lines to represent topographic/geospatial tiles */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* Ambient Geographic Glows */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dynamic Route SVG Polyline */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 600 240" fill="none" preserveAspectRatio="none">
          <defs>
            {/* Gradient along the route path */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Underlay Shadow Path */}
          <path
            d="M 80 180 C 180 120, 260 210, 360 110 C 420 50, 480 120, 520 70"
            stroke="#0ea5e9"
            strokeWidth="8"
            strokeOpacity="0.15"
            fill="none"
          />

          {/* Active Animated Route Polyline */}
          <path
            d="M 80 180 C 180 120, 260 210, 360 110 C 420 50, 480 120, 520 70"
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
            className="animate-pulse"
            fill="none"
            filter="url(#glow)"
          />

          {/* Waypoint 1: Origin Point */}
          <circle cx="80" cy="180" r="10" fill="#06b6d4" fillOpacity="0.25" />
          <circle cx="80" cy="180" r="5" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />

          {/* Midpoint: Toll / Highway Rest Area */}
          <circle cx="360" cy="110" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />

          {/* Waypoint 2: Destination Point */}
          <circle cx="520" cy="70" r="10" fill="#ec4899" fillOpacity="0.25" />
          <circle cx="520" cy="70" r="5" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
        </svg>

        {/* HTML Markers Positioned Over Canvas */}
        <div className="absolute left-6 sm:left-12 bottom-6 z-20 pointer-events-none">
          <div className="bg-navy-950/95 border border-cyan-500/50 rounded-xl px-3 py-1.5 shadow-xl text-left max-w-[190px]">
            <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>Pickup Point</span>
            </div>
            <div className="text-xs font-bold text-white truncate">{pickup}</div>
          </div>
        </div>

        <div className="absolute right-6 sm:right-12 top-10 sm:top-14 z-20 pointer-events-none">
          <div className="bg-navy-950/95 border border-pink-500/50 rounded-xl px-3 py-1.5 shadow-xl text-right max-w-[190px]">
            <div className="flex items-center justify-end gap-1.5 text-[9px] uppercase font-bold text-pink-400">
              <span>Destination</span>
              <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />
            </div>
            <div className="text-xs font-bold text-white truncate">{drop}</div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Route Metrics Strip */}
      <div className="p-4 bg-navy-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 sm:gap-6">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Est. Distance</span>
            <span className="text-base font-black text-white font-mono flex items-center gap-1">
              <span>{isRoundTrip ? distanceKm * 2 : distanceKm}</span>
              <span className="text-xs text-cyan-400">KM</span>
              {isRoundTrip && <span className="text-[10px] text-slate-500 font-sans font-normal">(Round Trip)</span>}
            </span>
          </div>

          <div className="border-l border-slate-800 pl-4 sm:pl-6">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Run Time</span>
            <span className="text-base font-black text-white font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{duration}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 max-w-xs text-right">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Pre-computed route matrix. Live GPS dispatch will activate upon provider configuration.</span>
        </div>
      </div>

    </div>
  );
};
