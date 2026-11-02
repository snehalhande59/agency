import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        id: 'USR-9021',
        name: 'Snehal Hande',
        email: 'snehal.hande@nexus-enterprise.in',
        phone: '+91 98202 88410',
        company: 'Nexus Global Technologies India Pvt Ltd',
        designation: 'VP of Human Resources & Corporate Mobility',
        department: 'People Operations & Mobility Desk',
        role: 'Corporate Administrator & Executive Client',
        memberSince: 'March 2024',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      isAuthenticated: true,

      login: (email, password) => {
        const loggedUser = {
          id: 'USR-8820',
          name: email.includes('@') ? email.split('@')[0].replace('.', ' ').toUpperCase() : 'SNEHAL HANDE',
          email: email,
          phone: '+91 98202 88410',
          company: 'Nexus Global Technologies India Pvt Ltd',
          designation: 'Corporate Executive Member',
          role: 'Corporate Client',
          memberSince: 'Today',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
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
