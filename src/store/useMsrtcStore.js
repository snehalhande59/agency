import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { msrtcService, MSRTC_BUSES_DATA, MSRTC_DEPOTS } from '../services/msrtc/msrtcService';

export const useMsrtcStore = create(
  persist(
    (set, get) => ({
      // Search parameters
      searchForm: {
        originDepot: 'Mumbai - Dadar Asiad Stand',
        destDepot: 'Pune - Swargate Bus Depot',
        journeyDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        serviceType: 'ALL'
      },

      // Active selection
      selectedBus: MSRTC_BUSES_DATA[0],
      selectedSeats: ['11', '12'],
      boardingPoint: MSRTC_BUSES_DATA[0].boardingPoints[0],
      droppingPoint: MSRTC_BUSES_DATA[0].droppingPoints[MSRTC_BUSES_DATA[0].droppingPoints.length - 1],

      // Passengers list (keyed by seat)
      passengers: [
        {
          seatNumber: '11',
          name: 'Sanjay Patil',
          age: 48,
          gender: 'Male',
          concessionCode: 'NONE',
          idProofNumber: 'MH-ID-9821'
        },
        {
          seatNumber: '12',
          name: 'Sunita Patil',
          age: 45,
          gender: 'Female',
          concessionCode: 'MAHILA_SAMMAN',
          idProofNumber: 'AADHAAR-8831'
        }
      ],

      // Contact details
      contactDetails: {
        mobile: '9820198420',
        email: 'sanjay.patil@mahamobility.io'
      },

      // Confirmed demo tickets list
      confirmedBookings: [
        {
          demoBookingRef: 'DEMO-MSRTC-9K24A',
          bookedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          status: 'CONFIRMED',
          bus: {
            serviceNumber: 'MH-14-BT-9102',
            serviceType: 'SHIVNERI',
            serviceName: 'Shivneri Volvo Multi-Axle AC',
            originDepot: 'Mumbai - Dadar Asiad Stand',
            destDepot: 'Pune - Swargate Bus Depot',
            departureTime: '06:00 AM',
            arrivalTime: '09:30 AM',
            duration: '3h 30m',
            baseFare: 535
          },
          journeyDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          boardingPoint: { name: 'Dadar Asiad Stand', time: '06:00 AM' },
          droppingPoint: { name: 'Pune Swargate Bus Depot', time: '09:30 AM' },
          selectedSeats: ['11', '12'],
          passengers: [
            { seatNumber: '11', name: 'Sanjay Patil', age: 48, gender: 'Male', concessionCode: 'NONE', concessionName: 'None (Standard Adult Fare)' },
            { seatNumber: '12', name: 'Sunita Patil', age: 45, gender: 'Female', concessionCode: 'MAHILA_SAMMAN', concessionName: 'Mahila Samman (50% Off)' }
          ],
          fareBreakdown: {
            baseUnitFare: 535,
            seatCount: 2,
            grossFare: 1070,
            concessionDiscount: 268,
            reservationCharge: 30,
            accidentReliefFund: 10,
            netFare: 842
          },
          contactDetails: {
            mobile: '9820198420',
            email: 'sanjay.patil@mahamobility.io'
          },
          paymentMethod: 'Instant UPI (Simulated)',
          transactionId: 'TXN-MSRTC-889104'
        }
      ],

      // Refund tracking list
      refundRecords: [
        {
          demoRefundRef: 'REF-MSRTC-5120',
          demoBookingRef: 'DEMO-MSRTC-OLD34',
          cancelledAt: new Date(Date.now() - 86400000 * 4).toISOString(),
          route: 'Mumbai Central CBS -> Kolhapur Central Bus Stand',
          serviceName: 'Hirkani Semi-Luxury',
          originalAmount: 650,
          clerkageDeduction: 65,
          refundAmount: 585,
          status: 'REFUND_PROCESSED',
          estCreditDate: 'Processed to Original Source'
        }
      ],

      // Setters & Actions
      setSearchForm: (updates) => {
        set((state) => ({
          searchForm: { ...state.searchForm, ...updates }
        }));
      },

      setSelectedBus: (bus) => {
        set({
          selectedBus: bus,
          selectedSeats: ['11'],
          boardingPoint: bus.boardingPoints ? bus.boardingPoints[0] : null,
          droppingPoint: bus.droppingPoints ? bus.droppingPoints[bus.droppingPoints.length - 1] : null,
          passengers: [
            {
              seatNumber: '11',
              name: 'Sanjay Patil',
              age: 48,
              gender: 'Male',
              concessionCode: 'NONE',
              idProofNumber: ''
            }
          ]
        });
      },

      toggleSeat: (seatNumber) => {
        const { selectedSeats, passengers, selectedBus } = get();
        if (selectedSeats.includes(seatNumber)) {
          // Cannot unselect if only 1 seat left
          if (selectedSeats.length === 1) return;
          const nextSeats = selectedSeats.filter((s) => s !== seatNumber);
          const nextPassengers = passengers.filter((p) => p.seatNumber !== seatNumber);
          set({ selectedSeats: nextSeats, passengers: nextPassengers });
        } else {
          // Max 6 seats per booking
          if (selectedSeats.length >= 6) return;
          const nextSeats = [...selectedSeats, seatNumber].sort((a, b) => parseInt(a) - parseInt(b));
          const nextPassengers = [
            ...passengers,
            {
              seatNumber,
              name: '',
              age: '',
              gender: 'Male',
              concessionCode: 'NONE',
              idProofNumber: ''
            }
          ];
          set({ selectedSeats: nextSeats, passengers: nextPassengers });
        }
      },

      setBoardingPoint: (point) => set({ boardingPoint: point }),
      setDroppingPoint: (point) => set({ droppingPoint: point }),

      updatePassenger: (seatNumber, updates) => {
        set((state) => ({
          passengers: state.passengers.map((p) =>
            p.seatNumber === seatNumber ? { ...p, ...updates } : p
          )
        }));
      },

      setContactDetails: (details) => {
        set((state) => ({
          contactDetails: { ...state.contactDetails, ...details }
        }));
      },

      confirmDemoBooking: (paymentData = {}) => {
        const { selectedBus, searchForm, selectedSeats, boardingPoint, droppingPoint, passengers, contactDetails } = get();
        const demoRef = msrtcService.generateDemoTicketRef();

        // Calculate total net fare across passengers
        let totalGross = 0;
        let totalDiscount = 0;
        const mappedPassengers = passengers.map((p) => {
          const breakdown = msrtcService.calculateFareBreakdown({
            bus: selectedBus,
            seatNumbers: [p.seatNumber],
            concessionCode: p.concessionCode
          });
          totalGross += breakdown.grossFare;
          totalDiscount += breakdown.concessionDiscount;
          return {
            ...p,
            concessionName: breakdown.concessionName
          };
        });

        const reservationCharge = 15 * selectedSeats.length;
        const accidentReliefFund = 5 * selectedSeats.length;
        const netFare = totalGross - totalDiscount + reservationCharge + accidentReliefFund;

        const newBooking = {
          demoBookingRef: demoRef,
          bookedAt: new Date().toISOString(),
          status: 'CONFIRMED',
          bus: {
            id: selectedBus.id,
            serviceNumber: selectedBus.serviceNumber,
            serviceType: selectedBus.serviceType,
            serviceName: selectedBus.serviceName,
            originDepot: selectedBus.originDepot,
            destDepot: selectedBus.destDepot,
            departureTime: selectedBus.departureTime,
            arrivalTime: selectedBus.arrivalTime,
            duration: selectedBus.duration,
            baseFare: selectedBus.baseFare
          },
          journeyDate: searchForm.journeyDate,
          boardingPoint: boardingPoint || { name: selectedBus.originDepot, time: selectedBus.departureTime },
          droppingPoint: droppingPoint || { name: selectedBus.destDepot, time: selectedBus.arrivalTime },
          selectedSeats: [...selectedSeats],
          passengers: mappedPassengers,
          fareBreakdown: {
            baseUnitFare: selectedBus.baseFare,
            seatCount: selectedSeats.length,
            grossFare: totalGross,
            concessionDiscount: totalDiscount,
            reservationCharge,
            accidentReliefFund,
            netFare
          },
          contactDetails: { ...contactDetails },
          paymentMethod: paymentData.method || 'Instant UPI (Simulated Demo)',
          transactionId: `TXN-MSRTC-${Math.floor(100000 + Math.random() * 900000)}`
        };

        set((state) => ({
          confirmedBookings: [newBooking, ...state.confirmedBookings]
        }));

        return newBooking;
      },

      cancelDemoBooking: (demoBookingRef, reason = 'Passenger requested cancellation') => {
        const { confirmedBookings, refundRecords } = get();
        const targetBooking = confirmedBookings.find((b) => b.demoBookingRef === demoBookingRef);
        if (!targetBooking) return { success: false, message: 'Booking reference not found' };

        const deductionRate = 0.10; // 10% standard clerkage
        const netOriginal = targetBooking.fareBreakdown?.netFare || 500;
        const clerkageDeduction = Math.round(netOriginal * deductionRate);
        const refundAmount = netOriginal - clerkageDeduction;
        const refundRef = `REF-MSRTC-${Math.floor(1000 + Math.random() * 9000)}`;

        const newRefundRecord = {
          demoRefundRef: refundRef,
          demoBookingRef: targetBooking.demoBookingRef,
          cancelledAt: new Date().toISOString(),
          route: `${targetBooking.bus.originDepot} -> ${targetBooking.bus.destDepot}`,
          serviceName: targetBooking.bus.serviceName,
          originalAmount: netOriginal,
          clerkageDeduction,
          refundAmount,
          status: 'REFUND_PROCESSED',
          estCreditDate: 'Simulated 1-2 business days to source account',
          reason
        };

        set({
          confirmedBookings: confirmedBookings.map((b) =>
            b.demoBookingRef === demoBookingRef ? { ...b, status: 'CANCELLED' } : b
          ),
          refundRecords: [newRefundRecord, ...refundRecords]
        });

        return { success: true, refundRef, refundAmount, clerkageDeduction };
      }
    }),
    {
      name: 'aerovoyage_msrtc_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
