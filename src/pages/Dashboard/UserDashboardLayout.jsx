import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Train, 
  Bus, 
  Car, 
  CreditCard, 
  Receipt, 
  RefreshCw, 
  Bell, 
  User, 
  LifeBuoy, 
  LogOut, 
  Menu, 
  X, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  Ticket
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const UserDashboardLayout = () => {
  const { user, openBookingModal, logoutUser } = useBooking();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { label: 'My Bookings (All)', path: '/dashboard/my-bookings', icon: CalendarCheck },
    { label: 'Railway Tickets', path: '/dashboard/railway-tickets', icon: Train },
    { label: 'MSRTC Bus Passes', path: '/dashboard/msrtc-tickets', icon: Bus },
    { label: 'Cab Bookings', path: '/dashboard/cab-bookings', icon: Car },
    { label: 'Bus & Coach Bookings', path: '/dashboard/bus-bookings', icon: Ticket },
    { label: 'NCMC Transit Cards', path: '/dashboard/ncmc-cards', icon: CreditCard },
    { label: 'Payment History', path: '/dashboard/payments', icon: Receipt },
    { label: 'Refund Requests', path: '/dashboard/refunds', icon: RefreshCw },
    { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { label: 'Profile & Settings', path: '/dashboard/profile', icon: User },
    { label: 'Support & Grievances', path: '/dashboard/support', icon: LifeBuoy }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Top Header Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#3898D8] shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
                  {user?.name || 'Snehal Hande'}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#DCEEFF] text-[#3898D8] px-2.5 py-0.5 rounded-full border border-[#3898D8]/20">
                  Administrator &amp; Customer Hub
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {user?.email || 'snehal.hande@nexus-enterprise.in'} • {user?.company || 'Nexus Global Technologies'} • +91 98202 88410
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <Link
              to="/book"
              className="px-4 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md shadow-[#3898D8]/20 transition-all flex items-center gap-1.5"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Book Ride / Travel</span>
            </Link>

            <Link
              to="/admin"
              className="px-3.5 py-2 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] border border-[#DCEEFF] text-[#3898D8] font-bold text-xs flex items-center gap-1.5 transition-all"
              title="Super Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#3898D8]" />
              <span className="hidden sm:inline">Admin Console</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              title="Logout from Account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Sub-pages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 rounded-3xl bg-white border border-[#E5EDF5] p-4 shadow-sm space-y-1 sticky top-28">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Customer Services
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#3898D8] text-white shadow-md shadow-[#3898D8]/20'
                        : 'text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {/* Logout Action in Sidebar */}
            <div className="pt-3 border-t border-[#E5EDF5] mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-all"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout (साइन आउट)</span>
              </button>
            </div>
          </aside>

          {/* Mobile Navigation Scrollbar */}
          <div className="lg:hidden col-span-12 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#3898D8] text-white shadow-sm'
                        : 'bg-white border border-[#E5EDF5] text-[#153B5B]'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-rose-50 text-rose-700 border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Sub-Page Content Outlet */}
          <main className="lg:col-span-9 min-w-0">
            <Outlet />
          </main>

        </div>
      </div>

    </div>
  );
};
