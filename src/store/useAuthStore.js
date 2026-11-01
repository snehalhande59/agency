import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        id: 'USR-9021',
        name: 'Snehal Hande',
        email: 'snehal.hande@apexmobility.io',
        phone: '+91 98202 88410',
        company: 'Apex Digital Labs',
        role: 'Super Administrator',
        memberSince: 'March 2024',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      isAuthenticated: true,

      login: (email, password) => {
        const loggedUser = {
          id: 'USR-8820',
          name: email.split('@')[0].toUpperCase(),
          email: email,
          phone: '+91 98202 88410',
          company: 'Premier Client Group',
          role: 'Business Traveler',
          memberSince: 'Today',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        };
        set({ user: loggedUser, isAuthenticated: true });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (updatedData) =>
        set((state) => ({
          user: { ...state.user, ...updatedData }
        }))
    }),
    {
      name: 'aerovoyage_auth_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
