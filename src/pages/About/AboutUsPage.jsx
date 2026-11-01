import React from 'react';
import { ShieldCheck, Award, Users, Compass, Globe2, Building2, CheckCircle2 } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 space-y-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Hero */}
      <section className="relative py-12 text-center max-w-4xl mx-auto px-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">About AeroVoyage Luxe</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display mt-2 mb-4">
          Pioneering the Future of <br />
          <span className="text-[#3898D8]">Unified Ground Mobility</span>
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
          Founded with a mission to eliminate fragmented travel booking in India, AeroVoyage unites urban taxis, outstation cabs, multi-axle luxury buses, airport shuttles, and corporate employee transportation under one digital ecosystem.
        </p>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#153B5B]">Safety Above All</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every vehicle in our partner network undergoes rigorous 40-point fitness checks. Every chauffeur is background-verified by law enforcement and trained in defensive highway tactics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#153B5B]">Price Transparency</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We abhor hidden charges, unexpected highway surge prices, and post-trip surprises. What you see is what you pay—with toll breakdowns itemized upfront.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#153B5B]">Enterprise Standards</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Trusted by 120+ enterprises to transport over 4,800 employees daily with a verified 99.4% on-time punctuality rate and dedicated corporate account managers.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5EDF5] shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#153B5B] font-display">1.2M+</div>
            <div className="text-xs text-[#64748B] mt-1">Passengers Moved</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#3898D8] font-display">1,200+</div>
            <div className="text-xs text-[#64748B] mt-1">Fleet Vehicles</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#153B5B] font-display">80+</div>
            <div className="text-xs text-[#64748B] mt-1">Towns & Cities Connected</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#19A89A] font-display">4.9/5</div>
            <div className="text-xs text-[#64748B] mt-1">Verified User Rating</div>
          </div>
        </div>
      </section>

    </div>
  );
};
