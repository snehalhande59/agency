import React, { useState } from 'react';
import { Send, CheckCircle2, Building2, User, Mail, Phone, MapPin, Users, ShieldCheck } from 'lucide-react';

export const CorporateDemoPage = () => {
  const [formData, setFormData] = useState({
    company: 'Nexus Global Technologies India Pvt Ltd',
    name: 'Snehal Hande',
    email: 'snehal.hande@nexus-enterprise.in',
    phone: '+91 98202 88410',
    employeeCount: '250 - 500 Employees',
    city: 'Mumbai & Pune (Both Hubs)',
    requirement: 'Daily employee pickup/drop and executive airport transfers',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electric-500/20 text-center space-y-2">
        <span className="text-xs font-bold text-electric-400 uppercase tracking-widest">Enterprise Consultation</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Request an Enterprise Mobility Demo
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Schedule a personalized demonstration of our Enterprise Transportation Suite. Learn how our clients cut mobility costs by 22% while ensuring 99.4% SLA punctuality.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 bg-navy-900/90 shadow-2xl">
        {submitted ? (
          <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white font-display">Demo Request Received!</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-white">{formData.name}</span>. A senior corporate accounts director will contact <span className="text-electric-300">{formData.company}</span> within 2 business hours with a sample fleet roster and pilot proposal.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contact Person Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Direct Phone / WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-electric-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Approximate Employee Workforce</label>
                <select
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-electric-500"
                >
                  <option value="15 - 50 Employees">15 - 50 Employees</option>
                  <option value="50 - 250 Employees">50 - 250 Employees</option>
                  <option value="250 - 500 Employees">250 - 500 Employees</option>
                  <option value="500 - 2,000 Employees">500 - 2,000 Employees</option>
                  <option value="2,000+ Employees">2,000+ Campus Scale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">City / Region of Operation</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-electric-500"
                >
                  <option value="Mumbai Metropolitan Region (MMR)">Mumbai (MMR / Navi Mumbai / Thane)</option>
                  <option value="Pune IT Parks">Pune (Hinjawadi / Magarpatta / Kharadi)</option>
                  <option value="Mumbai & Pune (Both Hubs)">Mumbai & Pune (Both Hubs)</option>
                  <option value="Pan-Maharashtra Multi-City">Pan-Maharashtra Multi-City</option>
                  <option value="Other Pan-India Metros">Other Pan-India Metros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary Transport Requirements</label>
              <textarea
                rows={3}
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                placeholder="Describe your current transportation setup, shift schedules, or pain points..."
                className="w-full bg-navy-950 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-electric-500 resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-electric-600 via-blue-600 to-electric-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit RFP / Request Interactive Demo</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>We adhere to enterprise NDA and non-disclosure standards.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
