import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useBooking();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email || 'newuser@aerovoyage.com', password || 'secret');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 relative bg-[#F8FAFC]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#E5EDF5] shadow-lg relative z-10">
        
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#3898D8] flex items-center justify-center text-white shadow-sm">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-[#153B5B] font-display">Aero<span className="text-[#3898D8]">Voyage</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-[#153B5B] font-display">Create Account</h1>
          <p className="text-xs text-[#64748B] mt-1">Join the premier personal &amp; corporate mobility network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#153B5B] mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Snehal Hande"
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2 pl-9 pr-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#153B5B] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="snehal@example.com"
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2 pl-9 pr-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#153B5B] mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 00000"
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2 pl-9 pr-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#153B5B] mb-1">Create Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2 pl-9 pr-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Create Demo Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E5EDF5] text-center text-xs text-[#64748B]">
          <span>Already registered? </span>
          <Link to="/login" className="text-[#3898D8] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};
