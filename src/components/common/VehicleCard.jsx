import React from 'react';
import { Users, Briefcase, Wind, Check, Star, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const VehicleCard = ({ vehicle }) => {
  const { openBookingModal } = useBooking();

  return (
    <div className="bg-white rounded-3xl overflow-hidden flex flex-col group border border-[#E5EDF5] hover:border-[#3898D8] shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Vehicle Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-[#EFF7FC]">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

        {/* Tag Pill */}
        {vehicle.tag && (
          <div className="absolute top-3 left-3 bg-[#3898D8] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {vehicle.tag}
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-[#E5EDF5] text-[#153B5B] text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>4.9</span>
        </div>

        <div className="absolute bottom-2 left-4 text-xs font-bold text-white uppercase tracking-wider">
          {vehicle.category}
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-[#153B5B] group-hover:text-[#3898D8] transition-colors">
              {vehicle.name}
            </h3>
          </div>
          <p className="text-xs text-[#64748B] mb-4">{vehicle.models}</p>

          {/* Quick Specs Badges */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] mb-4 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-xs font-bold text-[#153B5B]">
                <Users className="w-3.5 h-3.5 text-[#3898D8]" />
                <span>{vehicle.passengers} Seats</span>
              </div>
              <span className="text-[10px] text-[#64748B]">Max Capacity</span>
            </div>

            <div className="flex flex-col items-center border-x border-[#E5EDF5]">
              <div className="flex items-center gap-1 text-xs font-bold text-[#153B5B]">
                <Briefcase className="w-3.5 h-3.5 text-[#3898D8]" />
                <span>{vehicle.luggage}</span>
              </div>
              <span className="text-[10px] text-[#64748B]">Boot Space</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-xs font-bold text-[#19A89A]">
                <Wind className="w-3.5 h-3.5" />
                <span>Climate AC</span>
              </div>
              <span className="text-[10px] text-[#64748B]">Chilled Air</span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-1.5 mb-5">
            {vehicle.features?.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#153B5B]">
                <div className="w-4 h-4 rounded-full bg-[#DCEEFF] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#3898D8]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-bold">Starts From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#153B5B] font-display">₹{vehicle.basePrice}</span>
              <span className="text-xs text-[#64748B] font-medium">/ {vehicle.pricePerKm}</span>
            </div>
          </div>

          <button
            onClick={() => openBookingModal(vehicle)}
            className="px-4 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white text-xs font-bold shadow-md shadow-[#3898D8]/20 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
