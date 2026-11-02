import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  UserCheck, 
  Clock, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateSafetyPage = () => {
  const { triggerEmergencySos } = useCorporateStore();
  const [sosSent, setSosSent] = useState(false);

  const handleSimulateSos = () => {
    triggerEmergencySos({
      bookingId: 'DEMO-SAFETY-AUDIT',
      triggeredBy: 'Safety Officer / Employee Console',
      location: 'BKC / Western Express Highway (Simulated)'
    });
    setSosSent(true);
    setTimeout(() => setSosSent(false), 4000);
  };

  return (
    <div className="space-y-8 text-[#153B5B]">
      
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#064E3B] via-[#087653] to-[#064E3B] p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#19A89A]" />
            <span>ISO 27001 &amp; Duty-of-Care Certified</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            Enterprise Employee Safety, Security &amp; Compliance
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Zero-compromise passenger safety protocols, police background checked chauffeurs, 24/7 dedicated command center monitoring, and state-mandated female night-shift security escorts.
          </p>
        </div>
      </div>

      {/* Safety Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#19A89A] flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">100% Police Background Verified Chauffeurs</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Every driver undergoes rigorous criminal history check, biometric fingerprint matching, local police station verification, and annual medical &amp; vision fitness checkups.
          </p>
          <div className="pt-2 text-xs font-bold text-[#19A89A] flex items-center gap-1">
            <span>Annual Aadhaar &amp; License Audit</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">Female Night Shift Escort Mandate</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Strict adherence to Maharashtra Government Shops &amp; Establishments Act guidelines. For shifts between 08:00 PM and 06:00 AM, female employees are never picked up first or dropped last without a dedicated security guard onboard.
          </p>
          <div className="pt-2 text-xs font-bold text-[#3898D8] flex items-center gap-1">
            <span>Cluster Route Optimization</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#153B5B]">Real-Time Telematics &amp; Speed Governors</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            All fleet vehicles are equipped with RTO AIS-140 certified GPS trackers and calibrated 80 km/h speed governors. Instant automated alerts for route deviations or prolonged unscheduled halts.
          </p>
          <div className="pt-2 text-xs font-bold text-amber-600 flex items-center gap-1">
            <span>RTO AIS-140 Compliant</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Interactive SOS Simulation Console */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5EDF5]">
          <div>
            <h3 className="text-base font-bold text-[#153B5B]">Test In-App Emergency SOS Telemetry Trigger</h3>
            <p className="text-xs text-[#64748B]">Simulate passenger emergency alert broadcast to Corporate Safety Control Desk</p>
          </div>

          <button
            onClick={handleSimulateSos}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Test Simulated SOS Alert</span>
          </button>
        </div>

        {sosSent && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <span>🚨 Simulated SOS alert broadcast! Registered in Transport Operations &amp; HR Admin safety feeds.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5]">
            <span className="text-[#64748B] block">Average Response Time:</span>
            <strong className="text-[#153B5B]">45 Seconds (SLA Tier 1)</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5]">
            <span className="text-[#64748B] block">Emergency Helpline:</span>
            <strong className="text-[#3898D8]">1800 209 8899 (Toll-Free)</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5]">
            <span className="text-[#64748B] block">Police Coordination:</span>
            <strong className="text-[#19A89A]">Dial 112 API Ready</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5]">
            <span className="text-[#64748B] block">Escort Coverage:</span>
            <strong className="text-[#153B5B]">100% Female Night Shifts</strong>
          </div>
        </div>
      </div>

    </div>
  );
};
