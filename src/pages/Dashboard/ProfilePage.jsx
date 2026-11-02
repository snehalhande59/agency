import React, { useState } from 'react';
import { User, Mail, Phone, Building2, MapPin, CheckCircle2, ShieldCheck, Save } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const ProfilePage = () => {
  const { user } = useBooking();

  const [name, setName] = useState(user?.name || 'Snehal Hande');
  const [email, setEmail] = useState(user?.email || 'snehal.hande@nexus-enterprise.in');
  const [phone, setPhone] = useState(user?.phone || '+91 98202 88410');
  const [company, setCompany] = useState(user?.company || 'Nexus Global Technologies India Pvt Ltd');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5EDF5] shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#153B5B] font-display">Profile & Corporate Identity</h2>
          <p className="text-xs text-[#64748B]">Update your contact details for booking SMS, voucher delivery, and GST invoicing</p>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1">Official Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1">Mobile / WhatsApp Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1">Company / Organization</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
