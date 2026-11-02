import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  Calculator, 
  Users, 
  Car, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  Sparkles
} from 'lucide-react';

export const CorporateQuotePage = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Pune');
  const [employeesCount, setEmployeesCount] = useState(250);
  const [vehicleTypes, setVehicleTypes] = useState(['Executive SUV', 'Prime Sedan']);
  const [submitted, setSubmitted] = useState(false);

  const estimatedMonthlyBudget = Math.round(employeesCount * 2200);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleVehicle = (type) => {
    if (vehicleTypes.includes(type)) {
      setVehicleTypes(vehicleTypes.filter(t => t !== type));
    } else {
      setVehicleTypes([...vehicleTypes, type]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[#153B5B]">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEEFF] text-[#3898D8] text-xs font-bold border border-[#3898D8]/20">
          <Calculator className="w-3.5 h-3.5 text-[#19A89A]" />
          <span>Tailored B2B Mobility Tariffs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#153B5B] font-display">
          Request an Enterprise Mobility Quote
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Get customized employee commute rate cards, corporate bus shuttle proposals and dedicated monthly retainer cab contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#E5EDF5] p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E6F7F5] text-[#19A89A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#153B5B]">Custom Quote Generated!</h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                Thank you, <strong>{contactName}</strong>. Our enterprise mobility solutions director has sent customized rate proposals for <strong>{companyName}</strong> to {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#3898D8] text-white font-bold text-xs"
              >
                Create Another Proposal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Consultancy Services"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Snehal Hande"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Official Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Mobile Contact #</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Campus City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs text-[#153B5B] font-semibold"
                  >
                    <option value="Pune">Pune (Hinjawadi, Magarpatta, Viman Nagar)</option>
                    <option value="Mumbai">Mumbai (BKC, Andheri, Powai)</option>
                    <option value="Navi Mumbai">Navi Mumbai (Airoli, Vashi, Mahape)</option>
                    <option value="Thane">Thane &amp; Ghodbunder Road</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Daily Commuting Employees</label>
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    step="10"
                    value={employeesCount}
                    onChange={(e) => setEmployeesCount(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3.5 py-2.5 text-xs text-[#153B5B] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#153B5B] font-bold mb-1.5">Preferred Fleet Categories</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Prime Sedan (Dzire)', 'Executive SUV (Innova)', 'Tempo Traveller (Urbania)', 'Staff Bus (BharatBenz)'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => toggleVehicle(t)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        vehicleTypes.includes(t)
                          ? 'bg-[#DCEEFF] border-[#3898D8] text-[#153B5B] font-bold shadow-sm'
                          : 'bg-[#F8FAFC] border-[#E5EDF5] text-[#64748B]'
                      }`}
                    >
                      {vehicleTypes.includes(t) ? '✓ ' : '+ '} {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit RFP &amp; Get Custom Rate Sheet</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#153B5B]">Estimated Monthly Projection</h3>
            
            <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] space-y-2">
              <span className="text-[11px] text-[#64748B] block">Approximate Budget (Demo Estimate)</span>
              <div className="text-2xl font-black text-[#3898D8] font-display">
                ₹{(estimatedMonthlyBudget / 100000).toFixed(2)} Lakhs / month
              </div>
              <p className="text-[10px] text-[#64748B]">
                Based on ~{employeesCount} employees with shared optimal routing and zero surge tariffs.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#19A89A] font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>GST Input Tax Credit (ITC) Eligible</span>
              </div>
              <div className="flex items-center gap-2 text-[#19A89A] font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dedicated Relationship Manager</span>
              </div>
              <div className="flex items-center gap-2 text-[#19A89A] font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>99.4% On-time SLA Guarantee</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] text-xs space-y-2">
            <span className="font-bold text-[#153B5B] block">Direct Enterprise Desk:</span>
            <p className="text-[#64748B]">Call our Maharashtra enterprise solutions director directly at <strong className="text-[#3898D8]">1800 209 8899</strong> or email <strong className="text-[#3898D8]">corporate@aerovoyage.in</strong></p>
          </div>
        </div>

      </div>

    </div>
  );
};
