import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  User, 
  ShieldAlert, 
  Briefcase,
  Users,
  CreditCard,
  Plane,
  Bus,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useBooking();
  const { updateProfile } = useAuthStore();

  const [activeTab, setActiveTab] = useState('CUSTOMER'); // 'CUSTOMER' | 'CORPORATE' | 'ADMIN'
  const [email, setEmail] = useState('snehal.hande@nexus-enterprise.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  // Quick 1-Click Persona Logins
  const handleRoleLogin = (roleType) => {
    setIsLoading(true);
    setTimeout(() => {
      if (roleType === 'CUSTOMER') {
        loginUser('snehal.hande@gmail.com', 'password');
        updateProfile({
          name: 'Snehal Hande',
          role: 'Customer / Passenger',
          designation: 'Verified Commuter',
          company: 'Individual Travel Account',
          email: 'snehal.hande@gmail.com'
        });
        setIsLoading(false);
        navigate('/dashboard');
      } else if (roleType === 'CORPORATE') {
        loginUser('snehal.hande@nexus-enterprise.in', 'password');
        updateProfile({
          name: 'Snehal Hande',
          role: 'Corporate HR & Mobility Director',
          designation: 'VP of Human Resources & Corporate Mobility',
          company: 'Nexus Global Technologies India Pvt Ltd (Hinjewadi, Pune)',
          email: 'snehal.hande@nexus-enterprise.in'
        });
        setIsLoading(false);
        navigate('/corporate/admin');
      } else if (roleType === 'ADMIN') {
        loginUser('admin@aerovoyage.com', 'password');
        updateProfile({
          name: 'System Administrator',
          role: 'Platform Super Admin',
          designation: 'Head of Transit Operations & Fleet Telematics',
          company: 'AeroVoyage Luxe HQ',
          email: 'admin@aerovoyage.com'
        });
        setIsLoading(false);
        navigate('/admin');
      }
    }, 350);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'CUSTOMER') {
      handleRoleLogin('CUSTOMER');
    } else if (activeTab === 'CORPORATE') {
      handleRoleLogin('CORPORATE');
    } else {
      handleRoleLogin('ADMIN');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 relative bg-[#F8FAFC]">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-3xl border border-[#E5EDF5] shadow-xl relative z-10 space-y-8">
        
        {/* Brand & Page Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
              <Car className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-[#153B5B] font-display">
              Aero<span className="text-[#3898D8]">Voyage</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">
            AeroVoyage Unified Login Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
            Select your account type below to access the correct dashboard (Customer, Corporate Enterprise, or Super Admin).
          </p>
        </div>

        {/* 3 Clear Account Persona Cards (1-Click Instant Login) */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block mb-3 text-center sm:text-left">
            Choose Your Account Role (कोणाचे अकाउंट आहे ते निवडा)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* 1. Customer Persona */}
            <div 
              onClick={() => setActiveTab('CUSTOMER')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                activeTab === 'CUSTOMER'
                  ? 'bg-[#EFF7FC] border-2 border-[#3898D8] shadow-md ring-2 ring-[#3898D8]/20'
                  : 'bg-white border-[#E5EDF5] hover:border-[#3898D8]/40 hover:bg-[#F8FAFC]'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-3">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-sm font-black text-[#153B5B]">Customer / Passenger</div>
                <div className="text-[11px] text-[#19A89A] font-bold mt-0.5">ग्राहक डॅशबोर्ड</div>
                <p className="text-[11px] text-[#64748B] mt-2 leading-relaxed">
                  Book cabs, MSRTC state buses, flights, and check personal invoices.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleLogin('CUSTOMER');
                }}
                className="mt-4 w-full py-2 rounded-xl bg-[#3898D8] text-white text-xs font-bold shadow-xs hover:bg-[#287DB8] transition-colors"
              >
                1-Click Login →
              </button>
            </div>

            {/* 2. Corporate HR & Mobility Director Persona */}
            <div 
              onClick={() => setActiveTab('CORPORATE')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                activeTab === 'CORPORATE'
                  ? 'bg-[#EFF7FC] border-2 border-[#3898D8] shadow-md ring-2 ring-[#3898D8]/20'
                  : 'bg-white border-[#E5EDF5] hover:border-[#3898D8]/40 hover:bg-[#F8FAFC]'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 border border-amber-200">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-black text-[#153B5B]">Corporate HR Director</div>
                <div className="text-[11px] text-amber-700 font-bold mt-0.5">Nexus Global Tech</div>
                <p className="text-[11px] text-[#64748B] mt-2 leading-relaxed">
                  Snehal Hande: Employee commute roster, cab approvals &amp; B2B billing.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleLogin('CORPORATE');
                }}
                className="mt-4 w-full py-2 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-xs hover:bg-amber-700 transition-colors"
              >
                1-Click Login →
              </button>
            </div>

            {/* 3. Platform Super Admin */}
            <div 
              onClick={() => setActiveTab('ADMIN')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                activeTab === 'ADMIN'
                  ? 'bg-[#EFF7FC] border-2 border-[#3898D8] shadow-md ring-2 ring-[#3898D8]/20'
                  : 'bg-white border-[#E5EDF5] hover:border-[#3898D8]/40 hover:bg-[#F8FAFC]'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 border border-purple-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-sm font-black text-[#153B5B]">Super Administrator</div>
                <div className="text-[11px] text-purple-700 font-bold mt-0.5">सिस्टीम ॲडमिन</div>
                <p className="text-[11px] text-[#64748B] mt-2 leading-relaxed">
                  Live fleet GPS telemetry, MSRTC depot ITMS sync &amp; platform settings.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleLogin('ADMIN');
                }}
                className="mt-4 w-full py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-xs hover:bg-purple-700 transition-colors"
              >
                1-Click Login →
              </button>
            </div>

          </div>
        </div>

        {/* Selected Role Credentials Sign-In Form */}
        <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
            <span className="text-xs font-bold text-[#153B5B]">
              Active Login: {activeTab === 'CUSTOMER' ? 'Customer (Snehal Hande)' : activeTab === 'CORPORATE' ? 'Corporate VP HR (Nexus Global Tech)' : 'Super Admin Console'}
            </span>
            <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E5EDF5] text-[#3898D8]">
              Target: {activeTab === 'CUSTOMER' ? '/dashboard' : activeTab === 'CORPORATE' ? '/corporate/admin' : '/admin'}
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={
                    activeTab === 'CUSTOMER' 
                      ? 'snehal.hande@gmail.com' 
                      : activeTab === 'CORPORATE' 
                      ? 'snehal.hande@nexus-enterprise.in' 
                      : 'admin@aerovoyage.com'
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E5EDF5] rounded-xl py-2.5 pl-10 pr-3 text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#153B5B]">Security Password</label>
                <span className="text-[11px] text-[#3898D8] font-bold hover:underline cursor-pointer">Preset Demo Access</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#E5EDF5] rounded-xl py-2.5 pl-10 pr-3 text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Verifying Credentials &amp; Redirecting...</span>
              ) : (
                <>
                  <span>Sign In as {activeTab === 'CUSTOMER' ? 'Customer' : activeTab === 'CORPORATE' ? 'Corporate VP' : 'Admin'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Dashboard Role Guide in Marathi & English for Complete Clarity */}
        <div className="p-4 rounded-2xl bg-[#EFF7FC] border border-[#DCEEFF] text-xs text-[#153B5B] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#3898D8]">
            <Sparkles className="w-4 h-4 text-[#19A89A]" />
            <span>डॅशबोर्ड्सची अचूक माहिती (Exact Role &amp; Dashboard Guide):</span>
          </div>
          <ul className="space-y-1.5 text-[11px] text-[#64748B]">
            <li>• <strong>ग्राहक (Customer) Dashboard:</strong> वैयक्तिक टॅक्सी, MSRTC एसटी बसेस, रेल्वे PNR, फ्लाइट्स आणि RuPay NCMC स्मार्ट कार्डचे बुकिंग बघण्यासाठी.</li>
            <li>• <strong>कॉर्पोरेट (Corporate) Portal:</strong> Nexus Global Technologies कंपनीच्या कर्मचाऱ्यांचे शिफ्ट रोस्टर्स, कॅब बुकिंग मंजुरी आणि महिन्याचे बिलिंग सांभाळण्यासाठी (स्नेहल हांडे - VP HR).</li>
            <li>• <strong>सिस्टीम ॲडमिन (Super Admin) Console:</strong> संपूर्ण गाड्यांचे ताफा ट्रॅकिंग, MSRTC ITMS सर्व्हर सिंक आणि महसूल अहवाल पाहण्यासाठी.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};
