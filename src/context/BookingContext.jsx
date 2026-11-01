import React, { createContext, useContext } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { useAuthStore } from '../store/useAuthStore';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const {
    bookings,
    searchParams,
    bookingModal,
    updateSearchParams,
    openBookingModal,
    closeBookingModal,
    createBooking,
    cancelBooking
  } = useBookingStore();

  const { user, login, logout, updateProfile } = useAuthStore();

  return (
    <BookingContext.Provider
      value={{
        bookings,
        user,
        searchParams,
        bookingModal,
        updateSearchParams,
        openBookingModal,
        closeBookingModal,
        createBooking,
        cancelBooking,
        loginUser: login,
        logoutUser: logout,
        updateProfile
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
