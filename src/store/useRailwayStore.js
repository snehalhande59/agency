import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { railwayService, TRAINS_DATA, STATIONS } from '../services/railway/railwayService';

export const useRailwayStore = create(
  persist(
    (set, get) => ({
      // Search form state
      searchForm: {
        fromCode: 'CSMT',
        fromName: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
        toCode: 'PUNE',
        toName: 'Pune Junction (PUNE)',
        journeyDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        travelClass: 'ALL',
        quota: 'GN',
        passengerCount: 2
      },

      // Selection state
      selectedTrain: TRAINS_DATA[0],
      selectedClass: 'CC',
      selectedQuota: 'GN',

      // Passengers list
      passengers: [
        { id: 1, name: 'Snehal Hande', age: 28, gender: 'Female', berthPreference: 'WINDOW', foodPreference: 'Veg', isSenior: false },
        { id: 2, name: 'Pooja Hande', age: 26, gender: 'Female', berthPreference: 'NO_PREF', foodPreference: 'Veg', isSenior: false }
      ],

      // Contact details
      contactDetails: {
        mobile: '9820288410',
        email: 'snehal.hande@apexmobility.io',
        irctcUsername: 'snehal_h26'
      },

      // Confirmed demo reservations
      confirmedBookings: [
        {
          demoBookingRef: 'DEMO-RAIL-8K92X',
          trainNumber: '20706',
          trainName: 'CSMT Jalna Vande Bharat Express',
          trainType: 'Vande Bharat',
          fromCode: 'CSMT',
          fromName: 'Mumbai CSMT',
          toCode: 'PUNE',
          toName: 'Pune Junction',
          journeyDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          departureTime: '13:10',
          arrivalTime: '16:25',
          travelClass: 'CC',
          quota: 'GN',
          passengers: [
            { name: 'Snehal Hande', age: 28, gender: 'Female', coach: 'C3', seat: '44', berthType: 'Window (WS)', status: 'CNF' },
            { name: 'Pooja Hande', age: 26, gender: 'Female', coach: 'C3', seat: '45', berthType: 'Aisle (AS)', status: 'CNF' }
          ],
          fareBreakdown: {
            totalFare: 1860,
            baseFare: 1490,
            gst: 74,
            catering: 370
          },
          status: 'Confirmed (Demo)',
          bookedAt: new Date().toISOString()
        }
      ],

      // Cancelled bookings / refunds
      cancellations: [],

      // Actions
      setSearchForm: (formData) =>
        set((state) => ({
          searchForm: { ...state.searchForm, ...formData }
        })),

      setSelectedTrain: (train, classCode = 'CC', quota = 'GN') =>
        set(() => ({
          selectedTrain: train,
          selectedClass: classCode,
          selectedQuota: quota
        })),

      setPassengers: (passengers) => set({ passengers }),

      addPassenger: () =>
        set((state) => ({
          passengers: [
            ...state.passengers,
            {
              id: Date.now(),
              name: '',
              age: '',
              gender: 'Male',
              berthPreference: 'NO_PREF',
              foodPreference: 'Veg',
              isSenior: false
            }
          ]
        })),

      removePassenger: (id) =>
        set((state) => ({
          passengers: state.passengers.filter((p) => p.id !== id)
        })),

      updatePassenger: (id, field, value) =>
        set((state) => ({
          passengers: state.passengers.map((p) =>
            p.id === id ? { ...p, [field]: value } : p
          )
        })),

      setContactDetails: (details) =>
        set((state) => ({
          contactDetails: { ...state.contactDetails, ...details }
        })),

      // Confirm Demo Railway Reservation
      confirmDemoBooking: (paymentInfo) => {
        const state = get();
        const demoRef = railwayService.generateDemoBookingRef();
        const train = state.selectedTrain || TRAINS_DATA[0];
        const fare = railwayService.calculateFareBreakdown({
          trainNumber: train.number,
          classCode: state.selectedClass,
          quota: state.selectedQuota,
          passengerCount: state.passengers.length
        });

        const allocatedCoach = state.selectedClass === 'EC' ? 'E1' : state.selectedClass === 'CC' ? 'C2' : state.selectedClass === '1A' ? 'H1' : state.selectedClass === '2A' ? 'A1' : state.selectedClass === '3A' ? 'B2' : 'S3';

        const allocatedPassengers = state.passengers.map((p, index) => ({
          name: p.name || `Passenger ${index + 1}`,
          age: p.age || 28,
          gender: p.gender || 'Male',
          coach: allocatedCoach,
          seat: `${Math.floor(20 + index * 2)}`,
          berthType: p.berthPreference === 'WINDOW' ? 'Window' : p.berthPreference === 'LOWER' ? 'Lower Berth' : 'Confirmed Berth',
          status: 'CNF (Demo)'
        }));

        const newBooking = {
          demoBookingRef: demoRef,
          trainNumber: train.number,
          trainName: train.name,
          trainType: train.type,
          fromCode: state.searchForm.fromCode,
          fromName: state.searchForm.fromName,
          toCode: state.searchForm.toCode,
          toName: state.searchForm.toName,
          journeyDate: state.searchForm.journeyDate,
          departureTime: train.departureTime,
          arrivalTime: train.arrivalTime,
          travelClass: state.selectedClass,
          quota: state.selectedQuota,
          passengers: allocatedPassengers,
          fareBreakdown: fare,
          status: 'Confirmed (Demo)',
          paymentInfo,
          bookedAt: new Date().toISOString()
        };

        set((s) => ({
          confirmedBookings: [newBooking, ...s.confirmedBookings]
        }));

        return newBooking;
      },

      // Cancel a demo booking
      cancelDemoBooking: (demoRef, reason = 'Passenger requested cancellation') => {
        const state = get();
        const booking = state.confirmedBookings.find((b) => b.demoBookingRef === demoRef);
        if (!booking) return null;

        const cancellationCharge = Math.min(240, Math.round(booking.fareBreakdown.totalFare * 0.15));
        const refundAmount = booking.fareBreakdown.totalFare - cancellationCharge;
        const refundRef = `REFUND-${demoRef.replace('DEMO-RAIL-', '')}-${Math.floor(100 + Math.random() * 900)}`;

        const cancellationRecord = {
          refundRef,
          demoBookingRef: demoRef,
          trainNumber: booking.trainNumber,
          trainName: booking.trainName,
          cancelledAt: new Date().toISOString(),
          originalFare: booking.fareBreakdown.totalFare,
          cancellationCharge,
          refundAmount,
          reason,
          refundStatus: 'Processed (Simulated Direct to Source Bank)',
          estimatedCreditTime: 'Instant (Simulated Demo)'
        };

        set((s) => ({
          confirmedBookings: s.confirmedBookings.map((b) =>
            b.demoBookingRef === demoRef ? { ...b, status: 'Cancelled (Demo)' } : b
          ),
          cancellations: [cancellationRecord, ...s.cancellations]
        }));

        return cancellationRecord;
      }
    }),
    {
      name: 'aerovoyage_railway_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
