import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Car, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  User, 
  Settings, 
  CheckCircle2, 
  Sparkles,
  Briefcase,
  Users
} from 'lucide-react';
import { useAuthStore, DEMO_PROFILES } from '../../store/useAuthStore';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'CUSTOMER';

  const { loginAsRole, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState(initialRole.toUpperCase());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  // Sync sample email when switching tab
  React.useEffect(() => {
    if (activeTab === 'CUSTOMER') {
      setEmail(DEMO_PROFILES.CUSTOMER.email);
    } else if (activeTab === 'CORPORATE') {
      setEmail(DEMO_PROFILES.CORPORATE.email);
    } else {
      setEmail(DEMO_PROFILES.ADMIN.email);
    }
  }, [activeTab]);

  const handleQuickDemoLogin = (roleKey) => {
    setIsLoading(true);
    setTimeout(() => {
      const profile = loginAsRole(roleKey);
      setIsLoading(false);
      navigate(profile.dashboardPath);
    }, 300);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const loggedUser = login(email, password, activeTab);
      setIsLoading(false);
      navigate(loggedUser.dashboardPath || '/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F8FAFC] flex flex-col items-center justify-center relative">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#3898D8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl bg-white p-6 sm:p-10 rounded-3xl border border-[#E5EDF5] shadow-lg relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-[#153B5B] font-display">
              Aero<span className="text-[#3898D8]">Voyage</span> Luxe
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">
            Role-Based Unified Sign-In
          </h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
            Choose your login portal below to access your dedicated dashboard (Customer, Corporate HR, or Operations)
          </p>
        </div>

        {/* 3 Clear Role Selection Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('CUSTOMER')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeTab === 'CUSTOMER'
                ? 'bg-white text-[#3898D8] shadow-sm border border-[#E5EDF5]'
                : 'text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            <User className="w-4 h-4 text-[#3898D8]" />
            <span>Passenger / Customer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CORPORATE')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeTab === 'CORPORATE'
                ? 'bg-white text-[#19A89A] shadow-sm border border-[#E5EDF5]'
                : 'text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#19A89A]" />
            <span>Corporate HR Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ADMIN')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeTab === 'ADMIN'
                ? 'bg-white text-[#153B5B] shadow-sm border border-[#E5EDF5]'
                : 'text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#153B5B]" />
            <span>Platform Admin</span>
          </button>
        </div>

        {/* Active Portal Overview Card & Quick 1-Click Demo Login */}
        <div className="mb-6 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Selected Portal Destination
            </span>
            <span className="text-xs font-bold font-mono text-[#3898D8] bg-[#EFF7FC] px-2.5 py-0.5 rounded-full border border-[#DCEEFF]">
              {DEMO_PROFILES[activeTab].dashboardPath}
            </span>
          </div>

          <div>
            <div className="text-sm font-black text-[#153B5B] flex items-center gap-1.5">
              <span>{DEMO_PROFILES[activeTab].name}</span>
              <span className="text-xs font-bold text-[#64748B]">({DEMO_PROFILES[activeTab].roleTitle})</span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              {DEMO_PROFILES[activeTab].roleDescription}
            </p>
          </div>

          {/* Instant 1-Click Launch Button */}
          <button
            type="button"
            onClick={() => handleQuickDemoLogin(activeTab)}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#19A89A]" />
            <span>1-Click Instant Demo Login ({DEMO_PROFILES[activeTab].roleTitle})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Traditional Form Alternative */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-[#E5EDF5] w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider shrink-0">
            or sign in with credentials
          </span>
        </div>

        <form onSubmit={handleCustomSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
              {activeTab === 'CORPORATE' ? 'Corporate Work Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-[#153B5B]">Password</label>
              <span className="text-[11px] font-bold text-[#3898D8] hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#153B5B] hover:bg-[#0E283F] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to {DEMO_PROFILES[activeTab].roleTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E5EDF5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
          <span>Need a new passenger account?</span>
          <Link to="/signup" className="text-[#3898D8] font-bold hover:underline">
            Register Passenger Account &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};
