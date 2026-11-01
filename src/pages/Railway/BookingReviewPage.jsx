import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Train, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  ShieldAlert,
  DollarSign,
  Utensils,
  Receipt
} from 'lucide-react';
import { useRailwayStore } from '../../store/useRailwayStore';
import { railwayService, DEMO_BANNER_TEXT } from '../../services/railway/railwayService';

export const BookingReviewPage = () => {
  const navigate = useNavigate();
  const { selectedTrain, selectedClass, selectedQuota, searchForm, passengers, contactDetails } = useRailwayStore();

  const fareBreakdown = railwayService.calculateFareBreakdown({
    trainNumber: selectedTrain.number,
    classCode: selectedClass,
    quota: selectedQuota,
    passengerCount: passengers.length
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/railway/passengers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Passenger Details</span>
        </Link>
        <span className="text-xs text-electric-400 font-mono">Step 4 of 5: Review & Fare Summary</span>
      </div>

      {/* Grid: Left Journey & Manifest, Right Fare Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Review Details */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Train Specs */}
          <div className="glass-panel p-5 rounded-3xl border border-electric-500/20 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-electric-400">#{selectedTrain.number}</span>
                <h3 className="text-sm font-bold text-white">{selectedTrain.name}</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded">
                Class {selectedClass} ({selectedQuota})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-lg font-black text-white font-display">{selectedTrain.departureTime}</span>
                <span className="text-[11px] text-slate-300 block">{searchForm.fromName}</span>
                <span className="text-[10px] text-slate-400">{searchForm.journeyDate}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{selectedTrain.duration}</span>
              <div className="text-right">
                <span className="text-lg font-black text-white font-display">{selectedTrain.arrivalTime}</span>
                <span className="text-[11px] text-emerald-400 block">{searchForm.toName}</span>
                <span className="text-[10px] text-slate-400">Scheduled Arrival</span>
              </div>
            </div>
          </div>

          {/* Passenger Manifest Summary */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-electric-400" />
              <span>Passengers Manifest ({passengers.length})</span>
            </h4>

            <div className="divide-y divide-slate-800/80">
              {passengers.map((p, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{idx + 1}. {p.name}</span>
                    <span className="text-slate-400 text-[11px] block">{p.age} yrs • {p.gender}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-300 text-[11px] block">Pref: <strong className="text-electric-300">{p.berthPreference}</strong></span>
                    <span className="text-slate-400 text-[10px]">Meal: {p.foodPreference}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details Review */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-xs flex items-center justify-between text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">SMS & E-Ticket Notification</span>
              <span className="font-semibold text-white">{contactDetails.mobile} • {contactDetails.email}</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px]">IRCTC: {contactDetails.irctcUsername}</span>
          </div>

        </div>

        {/* Right Column: Fare Breakdown Card */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="glass-panel p-6 rounded-3xl border border-electric-500/30 space-y-4 bg-navy-900/90 shadow-2xl">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Receipt className="w-4 h-4 text-electric-400" />
              <h3 className="text-sm font-bold text-white">Itemized Fare Summary</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Fare ({passengers.length} × ₹{fareBreakdown.perPassengerBase})</span>
                <span className="font-mono text-white">₹{fareBreakdown.perPassengerBase * passengers.length}</span>
              </div>

              {fareBreakdown.tatkalSurcharge > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Tatkal Surcharge ({passengers.length} × ₹{fareBreakdown.tatkalSurcharge})</span>
                  <span className="font-mono">₹{fareBreakdown.tatkalSurcharge * passengers.length}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Reservation Charge</span>
                <span className="font-mono text-white">₹{fareBreakdown.reservationFee * passengers.length}</span>
              </div>

              {fareBreakdown.superfastFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Superfast Charge</span>
                  <span className="font-mono text-white">₹{fareBreakdown.superfastFee * passengers.length}</span>
                </div>
              )}

              {fareBreakdown.cateringFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Pantry Catering Charge</span>
                  <span className="font-mono text-white">₹{fareBreakdown.cateringFee}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Goods & Service Tax (GST 5%)</span>
                <span className="font-mono text-white">₹{fareBreakdown.gstRate}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
                <span>Total Demo Amount:</span>
                <span className="text-xl font-extrabold text-electric-300 font-display">₹{fareBreakdown.totalFare.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/railway/payment')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-electric-600 via-blue-600 to-electric-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Proceed to Demo Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300/90 leading-relaxed text-center">
              Notice: Payment gateway is in simulation mode. No credit card or bank account will be charged.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
