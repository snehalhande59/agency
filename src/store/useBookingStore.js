import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialBookings } from '../data/mockData';
import { paymentAdapter } from '../services/adapters/paymentAdapter';
import confetti from 'canvas-confetti';

export const useBookingStore = create(
  persist(
    (set, get) => ({
      // State
      bookings: initialBookings,
      searchParams: {
        serviceType: 'outstation-cabs',
        pickup: 'Mumbai (All Locations)',
        drop: 'Pune (Expressway Direct)',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        passengers: 2,
        journeyType: 'one-way',
      },
      bookingModal: {
        isOpen: false,
        vehicle: null,
        service: null,
        confirmedBooking: null
      },

      // Actions
      updateSearchParams: (newParams) =>
        set((state) => ({
          searchParams: { ...state.searchParams, ...newParams }
        })),

      openBookingModal: (item = {}) =>
        set(() => ({
          bookingModal: {
            isOpen: true,
            vehicle: item?.category ? item : null,
            service: item?.slug ? item : null,
            confirmedBooking: null
          }
        })),

      closeBookingModal: () =>
        set(() => ({
          bookingModal: {
            isOpen: false,
            vehicle: null,
            service: null,
            confirmedBooking: null
          }
        })),

      createBooking: async (details) => {
        const state = get();
        const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;

        // Process simulated transaction via adapter
        const simulatedPayment = await paymentAdapter.processDemoPayment({
          amount: details.fare || '₹2,450',
          customerName: details.passengerName || 'Snehal Hande'
        });

        const newBooking = {
          id: bookingId,
          service: details.service || 'Outstation Cab Booking',
          from: details.pickup || state.searchParams.pickup,
          to: details.drop || state.searchParams.drop,
          date: details.date || state.searchParams.date,
          time: details.time || state.searchParams.time,
          passengers: details.passengers || state.searchParams.passengers,
          vehicle: details.vehicleName || 'Executive Sedan (Dzire / Etios)',
          fare: details.fare || '₹2,450',
          status: 'Confirmed',
          isSimulated: true,
          simulatedTxnId: simulatedPayment.transactionId,
          driverName: details.driverName || 'Ramesh Shinde (4.9 ★)',
          driverPhone: details.driverPhone || '+91 98190 22345',
          vehicleNumber: details.vehicleNumber || `MH ${Math.floor(10 + Math.random() * 89)} AB ${Math.floor(1000 + Math.random() * 9000)}`,
          bookedOn: new Date().toISOString().split('T')[0]
        };

        set((state) => ({
          bookings: [newBooking, ...state.bookings],
          bookingModal: {
            ...state.bookingModal,
            confirmedBooking: newBooking
          }
        }));

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        return newBooking;
      },

      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status: 'Cancelled' } : b
          )
        }))
    }),
    {
      name: 'aerovoyage_booking_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
