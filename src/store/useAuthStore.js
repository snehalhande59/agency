import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const DEMO_PROFILES = {
  CUSTOMER: {
    id: 'CUST-7721',
    name: 'Snehal Hande',
    email: 'snehal.traveler@gmail.com',
    phone: '+91 98202 88410',
    role: 'CUSTOMER',
    roleTitle: 'Passenger / Retail Customer',
    roleDescription: 'Personal travel: Outstation Cabs, Flights, Train tickets, MSRTC State Buses, NCMC Metro Card',
    dashboardPath: '/dashboard',
    memberSince: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  EMPLOYEE: {
    id: 'EMP-8842',
    name: 'Pooja Sharma',
    email: 'pooja.sharma@nexus-enterprise.in',
    phone: '+91 98202 11094',
    company: 'Nexus Global Technologies India Pvt. Ltd.',
    designation: 'Senior Software Engineer (Frontend Core)',
    department: 'Engineering Department (Hinjewadi & BKC)',
    pickupPoint: 'Samarth Deep, Lokhandwala Circle, Andheri West, Mumbai',
    dropPoint: 'Tower 4, Maker Maxity, BKC, Mumbai',
    assignedCab: 'Toyota Innova Crysta (MH 02 ER 9120)',
    role: 'EMPLOYEE',
    roleTitle: 'Corporate Employee Commuter',
    roleDescription: 'Daily office commute: Live assigned cab, chauffeur Ramesh Shinde, boarding OTP & shift roster',
    dashboardPath: '/corporate/employee',
    memberSince: 'February 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  CORPORATE: {
    id: 'CORP-VP-9021',
    name: 'Snehal Hande',
    email: 'snehal.hande@nexus-enterprise.in',
    phone: '+91 98202 88410',
    company: 'Nexus Global Technologies India Pvt. Ltd.',
    designation: 'VP of Human Resources & Corporate Mobility',
    department: 'People Operations & Corporate Mobility Desk',
    location: 'Phase 3, Hinjewadi Rajiv Gandhi Infotech Park, Pune',
    role: 'CORPORATE',
    roleTitle: 'Corporate VP HR Admin',
    roleDescription: 'Enterprise transport: 1,280 employee shift rosters, cab dispatch, B2B monthly billing & ESG carbon reports',
    dashboardPath: '/corporate/admin',
    memberSince: 'March 2024',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  ADMIN: {
    id: 'ADMIN-001',
    name: 'AeroVoyage Ops Admin',
    email: 'admin@aerovoyageluxe.com',
    phone: '+91 22 6123 4567',
    company: 'AeroVoyage Luxe Mobility HQ',
    designation: 'Platform Operations Director',
    role: 'ADMIN',
    roleTitle: 'Super Admin Operations Desk',
    roleDescription: 'Platform governance: Live vehicle telematics, third-party API gateways (MSRTC/IRCTC/NPCI) and support desk',
    dashboardPath: '/admin',
    memberSince: 'Platform Genesis',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
};

export const useAuthStore = create(
  persist(
    (set) => ({
      // Default initial state: Customer (passenger) logged in
      user: DEMO_PROFILES.CUSTOMER,
      isAuthenticated: true,

      loginAsRole: (roleKey) => {
        const profile = DEMO_PROFILES[roleKey] || DEMO_PROFILES.CUSTOMER;
        set({ user: profile, isAuthenticated: true });
        return profile;
      },

      login: (email, password, roleType = 'CUSTOMER') => {
        let baseProfile = DEMO_PROFILES[roleType] || DEMO_PROFILES.CUSTOMER;
        if (email && email.toLowerCase().includes('pooja')) {
          baseProfile = DEMO_PROFILES.EMPLOYEE;
        } else if (email && email.includes('@nexus')) {
          baseProfile = DEMO_PROFILES.CORPORATE;
        } else if (email && email.includes('@aerovoyage')) {
          baseProfile = DEMO_PROFILES.ADMIN;
        }

        const loggedUser = {
          ...baseProfile,
          email: email || baseProfile.email,
          name: email ? (email.split('@')[0].replace('.', ' ').toUpperCase()) : baseProfile.name
        };

        set({ user: loggedUser, isAuthenticated: true });
        return loggedUser;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (updatedData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null
        }))
    }),
    {
      name: 'aerovoyage_auth_storage_v2',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
