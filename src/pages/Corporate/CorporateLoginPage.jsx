import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Car, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  Briefcase, 
  Receipt, 
  Cpu, 
  Truck,
  Sparkles,
  Lock,
  Mail,
  KeyRound
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateLoginPage = () => {
  const navigate = useNavigate();
  const { setDemoUserRole } = useCorporateStore();

  const [selectedRole, setSelectedRole] = useState('hr_admin');
  const [email, setEmail] = useState('snehal.hande@nexus-enterprise.in');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'hr_admin',
      title: 'Company HR / Admin (Snehal Hande)',
      desc: 'Employee management, shift rosters, and trip approvals (Nexus Global Technologies)',
      email: 'snehal.hande@nexus-enterprise.in',
      icon: Building2,
      badge: 'Admin Console',
      redirect: '/corporate/admin',
      color: '#3898D8'
    },
    {
      id: 'transport_manager',
      title: 'Transport Manager',
      desc: 'Fleet dispatch, vehicle/driver allocation, and live telemetry',
      email: 'transport.ops@nexus-enterprise.in',
      icon: Cpu,
      badge: 'Operations Desk',
      redirect: '/corporate/transport-manager',
      color: '#19A89A'
    },
    {
      id: 'employee',
      title: 'Corporate Employee',
      desc: 'Daily office commute booking, trip tracking, and boarding OTP',
      email: 'pooja.sharma@nexus-enterprise.in',
      icon: UserCheck,
      badge: 'Employee Portal',
      redirect: '/corporate/employee',
      color: '#3898D8'
    },
    {
      id: 'driver',
      title: 'Chauffeur / Driver',
      desc: 'Mobile-friendly assigned trips, passenger boarding, and route status',
      email: 'ramesh.shinde@driver-demo.in',
      icon: Car,
      badge: 'Driver Console',
      redirect: '/corporate/driver',
      color: '#19A89A'
    },
    {
      id: 'vendor',
      title: 'Fleet Vendor Partner',
      desc: 'Vendor contracts, fleet inventory, and monthly invoice submissions',
      email: 'contracts@mahalaxmitravels.com',
      icon: Truck,
      badge: 'Vendor Partner',
      redirect: '/corporate/vendor',
      color: '#F59E0B'
    },
    {
      id: 'finance',
      title: 'Finance & Billing',
      desc: 'Consolidated invoices, department expenses, and GST reports',
      email: 'finance.billing@nexus-enterprise.in',
      icon: Receipt,
      badge: 'Finance Desk',
      redirect: '/corporate/finance',
      color: '#8B5CF6'
    }
  ];

  const handleRoleSelect = (roleItem) => {
    setSelectedRole(roleItem.id);
    setEmail(roleItem.email);
    setPassword('••••••••');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Apply role in corporate store
    setDemoUserRole(selectedRole);

    setTimeout(() => {
      setLoading(false);
      const target = roles.find((r) => r.id === selectedRole);
      navigate(target ? target.redirect : '/corporate/admin');
    }, 600);
  };

  const handleQuickLaunch = (roleItem) => {
    setDemoUserRole(roleItem.id);
    navigate(roleItem.redirect);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEEFF] text-[#3898D8] text-xs font-bold border border-[#3898D8]/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#19A89A]" />
            <span>Unified Enterprise Authentication</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#153B5B] font-display">
            Corporate Transportation Portal Login
          </h1>
          <p className="text-sm text-[#64748B]">
            Role-based access for Employees, HR Admins, Fleet Operations, Drivers, Vendors and Finance. Select your role below for instant demo sign-in.
          </p>
        </div>

        {/* 1-Click Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {roles.map((r) => {
            const isSelected = selectedRole === r.id;
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => handleRoleSelect(r)}
                className={`p-5 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#3898D8] shadow-lg ring-2 ring-[#3898D8]/20 -translate-y-0.5'
                    : 'bg-white border-[#E5EDF5] hover:border-[#3898D8]/50 shadow-sm hover:shadow'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: r.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF7FC] text-[#153B5B] border border-[#E5EDF5]">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#153B5B] mb-1">{r.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-3">{r.desc}</p>
                </div>

                <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#64748B] truncate max-w-[150px]">{r.email}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickLaunch(r);
                    }}
                    className="font-bold text-[#3898D8] hover:text-[#287DB8] flex items-center gap-1 hover:translate-x-0.5 transition-all"
                  >
                    <span>Instant Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Role Login Form Card */}
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E5EDF5] shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E5EDF5]">
            <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#153B5B]">Sign In as {roles.find(r => r.id === selectedRole)?.title}</h3>
              <p className="text-xs text-[#64748B]">Pre-filled demo credentials with SSO bypass</p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#3898D8] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[11px] text-[#64748B] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
              <span>Demo mode auto-authenticates without external SMS or SAML IdP.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authorizing Portal Access...</span>
              ) : (
                <>
                  <span>Enter {roles.find(r => r.id === selectedRole)?.badge}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
