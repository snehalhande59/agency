import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useBooking();

  const [email, setEmail] = useState('snehal.hande@nexus-enterprise.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginUser(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 relative bg-[#F8FAFC]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#E5EDF5] shadow-lg relative z-10">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-[#153B5B] font-display">Aero<span className="text-[#3898D8]">Voyage</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-[#153B5B] font-display">Welcome Back</h1>
          <p className="text-xs text-[#64748B] mt-1">Sign in to manage your rides and corporate vouchers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#153B5B] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#153B5B]">Password</label>
              <span className="text-[11px] text-[#3898D8] hover:underline cursor-pointer">Forgot password?</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 pl-9 pr-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <span className="text-xs">Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E5EDF5] text-center text-xs text-[#64748B]">
          <span>Don't have an account yet? </span>
          <Link to="/signup" className="text-[#3898D8] font-bold hover:underline">
            Register Demo Account
          </Link>
        </div>

        <div className="mt-4 p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[11px] text-[#64748B] text-center">
          Demo Mode: Click "Sign In" with prefilled credentials to access user dashboard.
        </div>

      </div>
    </div>
  );
};
