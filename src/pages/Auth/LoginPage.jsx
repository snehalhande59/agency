import React, { useState, useEffect } from 'react';
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
  Users,
  Compass,
  Train,
  CreditCard,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { useAuthStore, DEMO_PROFILES } from '../../store/useAuthStore';
import { useCorporateStore } from '../../store/useCorporateStore';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'CORPORATE';

  const { loginAsRole, login } = useAuthStore();
  const { setDemoUserRole } = useCorporateStore();

  const [activeTab, setActiveTab] = useState(initialRole.toUpperCase());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  // Sync sample email when switching tab
  useEffect(() => {
    if (activeTab === 'CUSTOMER') {
      setEmail(DEMO_PROFILES.CUSTOMER.email);
    } else if (activeTab === 'EMPLOYEE') {
      setEmail(DEMO_PROFILES.EMPLOYEE.email);
    } else if (activeTab === 'CORPORATE') {
      setEmail(DEMO_PROFILES.CORPORATE.email);
    } else {
      setEmail(DEMO_PROFILES.ADMIN.email);
    }
  }, [activeTab]);

  const handleQuickDemoLogin = (roleKey) => {
    setIsLoading(true);

    // Sync corporate role state if applicable
    if (roleKey === 'EMPLOYEE') {
      setDemoUserRole('employee');
    } else if (roleKey === 'CORPORATE') {
      setDemoUserRole('hr_admin');
    }

    setTimeout(() => {
      const profile = loginAsRole(roleKey);
      setIsLoading(false);
      navigate(profile.dashboardPath);
    }, 300);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (activeTab === 'EMPLOYEE') {
      setDemoUserRole('employee');
    } else if (activeTab === 'CORPORATE') {
      setDemoUserRole('hr_admin');
    }

    setTimeout(() => {
      const loggedUser = login(email, password, activeTab);
      setIsLoading(false);
      navigate(loggedUser.dashboardPath || '/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F8FAFC] flex flex-col items-center justify-center relative">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#3898D8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-3xl border border-[#E5EDF5] shadow-lg relative z-10">
        
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
            Role-Based Portal Access
          </h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
            Choose your role below to view authentic live data across Super Admin, Corporate HR, Employee Commute, or Retail Passenger dashboards.
          </p>
        </div>

        {/* 4 Clear Role Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('CORPORATE')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
              activeTab === 'CORPORATE'
                ? 'bg-white text-[#19A89A] shadow-sm border border-[#E5EDF5]'
                : 'text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#19A89A]" />
            <span>Corporate Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('EMPLOYEE')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
              activeTab === 'EMPLOYEE'
                ? 'bg-white text-[#3898D8] shadow-sm border border-[#E5EDF5]'
                : 'text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#3898D8]" />
            <span>Employee Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ADMIN')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
              activeTab === 'ADMIN'
                ? 'bg-white text-[#153B5B] shadow-sm border border-[#E5EDF5]'
                : 'text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#153B5B]" />
            <span>Super Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CUSTOMER')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 ${
              activeTab === 'CUSTOMER'
                ? 'bg-white text-[#3898D8] shadow-sm border border-[#E5EDF5]'
                : 'text-[#64748B] hover:text-[#153B5B]'
            }`}
          >
            <User className="w-4 h-4 text-[#3898D8]" />
            <span>Passenger</span>
          </button>
        </div>

        {/* Active Portal Overview Card & Quick 1-Click Demo Login */}
        <div className="mb-6 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Destination Dashboard
            </span>
            <span className="text-xs font-bold font-mono text-[#3898D8] bg-[#EFF7FC] px-2.5 py-0.5 rounded-full border border-[#DCEEFF]">
              {DEMO_PROFILES[activeTab]?.dashboardPath}
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <img 
              src={DEMO_PROFILES[activeTab]?.avatar} 
              alt={DEMO_PROFILES[activeTab]?.name} 
              className="w-12 h-12 rounded-2xl object-cover border-2 border-[#3898D8] shadow-xs shrink-0"
            />
            <div>
              <div className="text-base font-black text-[#153B5B]">
                {DEMO_PROFILES[activeTab]?.name}
              </div>
              <div className="text-xs font-bold text-[#3898D8]">
                {DEMO_PROFILES[activeTab]?.roleTitle}
              </div>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                {DEMO_PROFILES[activeTab]?.roleDescription}
              </p>
            </div>
          </div>

          {/* Actual Data Preview Checklist */}
          <div className="p-3.5 rounded-xl bg-white border border-[#E5EDF5] space-y-1.5 text-xs text-[#153B5B]">
            <div className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider mb-1">
              Active Data Preloaded In This Session:
            </div>
            {activeTab === 'CORPORATE' && (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19A89A] shrink-0" />
                  <span><strong>Nexus Global Technologies India:</strong> 1,280 Employees on active roster</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19A89A] shrink-0" />
                  <span><strong>Pending Approvals Desk:</strong> 4 Employee ride requests with 1-click Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19A89A] shrink-0" />
                  <span><strong>Live Fleet &amp; Retainers:</strong> 6 Dedicated Cabs, 42 Monthly Retainers, GST Invoices</span>
                </div>
              </>
            )}
            {activeTab === 'EMPLOYEE' && (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
                  <span><strong>Today's Live Commute:</strong> Toyota Innova Crysta (MH 02 ER 9120)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
                  <span><strong>Chauffeur Details:</strong> Ramesh Shinde (+91 98190 22345) • Boarding OTP: <strong>4921</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
                  <span><strong>Monthly Commute Quota:</strong> 38/44 Trips completed (6 Remaining)</span>
                </div>
              </>
            )}
            {activeTab === 'ADMIN' && (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#153B5B] shrink-0" />
                  <span><strong>Platform Revenue (GMV):</strong> ₹84.25 Lakhs, 12,480 Total Bookings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#153B5B] shrink-0" />
                  <span><strong>Fleet &amp; Drivers:</strong> 640 Vehicles, 580 Verified Drivers, 48 Corporate Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#153B5B] shrink-0" />
                  <span><strong>Transit Adapters:</strong> IRCTC Rail, MSRTC Shivneri &amp; RuPay NCMC gateways</span>
                </div>
              </>
            )}
            {activeTab === 'CUSTOMER' && (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
                  <span><strong>Outstation Cab:</strong> Mumbai to Pune (BK-77492, Innova Crysta)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
                  <span><strong>Vande Bharat Express:</strong> Mumbai to Pune (DEMO-RAIL-8K92X, Seat C3-44)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
                  <span><strong>MSRTC Shivneri Volvo:</strong> Dadar to Swargate (DEMO-MSRTC-9K24A, Seats 11, 12)</span>
                </div>
              </>
            )}
          </div>

          {/* Instant 1-Click Launch Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleQuickDemoLogin(activeTab)}
            className="w-full py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-[#DCEEFF]" />
            <span>
              {isLoading ? 'Opening Dashboard...' : `Instant 1-Click Login to ${DEMO_PROFILES[activeTab]?.roleTitle}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Credential Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-[#64748B] font-mono">Demo Credentials Filled</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-white hover:bg-[#EFF7FC] text-[#153B5B] border border-[#E5EDF5] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>Sign In with Custom Credentials</span>
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 pt-4 border-t border-[#E5EDF5] text-center text-xs text-[#64748B] flex items-center justify-between">
          <Link to="/" className="text-[#3898D8] hover:underline font-bold flex items-center gap-1">
            &larr; Back to Home
          </Link>
          <span>AeroVoyage Luxe Multi-Tenant Authentication</span>
        </div>

      </div>

    </div>
  );
};
