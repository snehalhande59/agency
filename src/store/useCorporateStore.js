import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCorporateStore = create(
  persist(
    (set, get) => ({
      // Active view role: 'admin' | 'employee'
      activeRole: 'admin',
      setActiveRole: (role) => set({ activeRole: role }),

      // 1. Company Profile
      companyProfile: {
        companyName: 'Nexus Global Technologies India Pvt Ltd',
        cin: 'U72900MH2018PTC319802',
        gstin: '27AABCN8821Q1Z4',
        headquarters: 'Tower 4, Level 8, Maker Maxity, BKC, Mumbai 400051',
        campuses: [
          'BKC Innovation Hub, Mumbai',
          'Hinjawadi IT Park Phase 2, Pune',
          'MIHAN SEZ Campus, Nagpur'
        ],
        totalEmployees: 1280,
        activeContracts: 42,
        accountManager: 'Vikramaditya Singhania (VP Enterprise Mobility)',
        billingCycle: 'Net-30 Corporate Invoicing',
        slaTier: 'Platinum Enterprise (99.4% On-Time Guarantee)'
      },

      // 2. Dashboard Widgets & KPIs
      stats: {
        totalEmployees: 1280,
        activeVehicles: 74,
        todaysTrips: 186,
        completedTrips: 142,
        pendingTrips: 44,
        monthlyExpenses: 2845000, // ₹28,45,000
        budgetUtilization: 88,
        onTimePunctuality: 99.4,
        co2SavedKg: 14200
      },

      // 3. Employee Management List
      employees: [
        {
          id: 'EMP-8842',
          name: 'Pooja Sharma',
          email: 'pooja.sharma@nexusglobal.io',
          phone: '+91 98202 11094',
          department: 'Engineering',
          shift: 'Morning (08:30 AM - 05:30 PM)',
          pickupPoint: 'Lokhandwala Circle, Andheri West',
          dropPoint: 'Nexus Hub BKC, Tower 4',
          assignedRoute: 'Route #12 (Western Suburbs)',
          assignedCab: 'MH 02 ER 9120 (Innova Crysta)',
          status: 'ACTIVE'
        },
        {
          id: 'EMP-8843',
          name: 'Rohit Kulkarni',
          email: 'rohit.k@nexusglobal.io',
          phone: '+91 98203 44910',
          department: 'Product Management',
          shift: 'Morning (08:30 AM - 05:30 PM)',
          pickupPoint: 'Dadar TT Circle, Mumbai',
          dropPoint: 'Nexus Hub BKC, Tower 4',
          assignedRoute: 'Route #04 (Central Express)',
          assignedCab: 'MH 01 CV 4410 (Prime Sedan)',
          status: 'ACTIVE'
        },
        {
          id: 'EMP-8844',
          name: 'Ananya Iyer',
          email: 'ananya.iyer@nexusglobal.io',
          phone: '+91 98199 88201',
          department: 'Data & Analytics',
          shift: 'Evening (01:00 PM - 10:00 PM)',
          pickupPoint: 'Hiranandani Gardens, Powai',
          dropPoint: 'Nexus Hub BKC, Tower 4',
          assignedRoute: 'Route #08 (Eastern Corridor)',
          assignedCab: 'MH 03 DN 7720 (Force Urbania)',
          status: 'ACTIVE'
        },
        {
          id: 'EMP-8845',
          name: 'Siddharth Mehta',
          email: 'siddharth.m@nexusglobal.io',
          phone: '+91 98211 20045',
          department: 'Enterprise Sales',
          shift: 'Flexible / Client Visits',
          pickupPoint: 'Worli Sea Face, Mumbai',
          dropPoint: 'Client Locations / BKC',
          assignedRoute: 'Dedicated Executive Cab',
          assignedCab: 'MH 01 EE 1001 (BMW 5 Series)',
          status: 'ACTIVE'
        },
        {
          id: 'EMP-8846',
          name: 'Tanvi Deshmukh',
          email: 'tanvi.d@nexusglobal.io',
          phone: '+91 98330 45129',
          department: 'Finance & Legal',
          shift: 'Morning (08:30 AM - 05:30 PM)',
          pickupPoint: 'Vashi Sector 17, Navi Mumbai',
          dropPoint: 'Nexus Hub BKC, Tower 4',
          assignedRoute: 'Route #15 (Navi Mumbai Shuttle)',
          assignedCab: 'MH 43 AB 5500 (Executive Mini Bus)',
          status: 'ON_LEAVE'
        }
      ],

      // 4. Driver Management List
      drivers: [
        {
          id: 'DRV-101',
          name: 'Ramesh Shinde',
          phone: '+91 98190 22345',
          licenseNumber: 'MH-02-2015004491',
          rating: 4.9,
          totalTrips: 1840,
          assignedVehicle: 'Innova Crysta (MH 02 ER 9120)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED'
        },
        {
          id: 'DRV-102',
          name: 'Suresh Patil',
          phone: '+91 98205 77120',
          licenseNumber: 'MH-01-2012009941',
          rating: 4.8,
          totalTrips: 2450,
          assignedVehicle: 'Maruti Dzire (MH 01 CV 4410)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED'
        },
        {
          id: 'DRV-103',
          name: 'Manoj Ghadge',
          phone: '+91 98198 33019',
          licenseNumber: 'MH-03-2016008122',
          rating: 4.95,
          totalTrips: 920,
          assignedVehicle: 'Force Urbania (MH 03 DN 7720)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED'
        },
        {
          id: 'DRV-104',
          name: 'Santosh Kamble',
          phone: '+91 98209 11840',
          licenseNumber: 'MH-43-2014002391',
          rating: 4.75,
          totalTrips: 3100,
          assignedVehicle: 'BharatBenz Mini Bus (MH 43 AB 5500)',
          status: 'BREAK',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED'
        }
      ],

      // 5. Vehicle Management List
      vehicles: [
        {
          id: 'VEH-01',
          plateNumber: 'MH 02 ER 9120',
          model: 'Toyota Innova Crysta 2.4 VX',
          category: 'Executive SUV',
          seats: 7,
          fuelType: 'BS6 Diesel',
          assignedDriver: 'Ramesh Shinde',
          fitnessExpiry: '2027-04-15',
          telematicsStatus: 'SIMULATED_ACTIVE',
          status: 'IN_SERVICE'
        },
        {
          id: 'VEH-02',
          plateNumber: 'MH 01 CV 4410',
          model: 'Maruti Suzuki Dzire ZXi CNG',
          category: 'Prime Sedan',
          seats: 4,
          fuelType: 'CNG + Petrol',
          assignedDriver: 'Suresh Patil',
          fitnessExpiry: '2026-12-20',
          telematicsStatus: 'SIMULATED_ACTIVE',
          status: 'IN_SERVICE'
        },
        {
          id: 'VEH-03',
          plateNumber: 'MH 03 DN 7720',
          model: 'Force Urbania Luxury Van',
          category: 'Tempo Traveller',
          seats: 17,
          fuelType: 'BS6 Diesel',
          assignedDriver: 'Manoj Ghadge',
          fitnessExpiry: '2028-02-10',
          telematicsStatus: 'SIMULATED_ACTIVE',
          status: 'IN_SERVICE'
        },
        {
          id: 'VEH-04',
          plateNumber: 'MH 43 AB 5500',
          model: 'BharatBenz 26-Seater Executive',
          category: 'Mini Bus',
          seats: 26,
          fuelType: 'BS6 Diesel',
          assignedDriver: 'Santosh Kamble',
          fitnessExpiry: '2027-08-30',
          telematicsStatus: 'SIMULATED_ACTIVE',
          status: 'IN_SERVICE'
        },
        {
          id: 'VEH-05',
          plateNumber: 'MH 01 EE 1001',
          model: 'BMW 5 Series 530d M Sport',
          category: 'Luxury Sedan',
          seats: 4,
          fuelType: 'Diesel',
          assignedDriver: 'Direct Chauffeur Desk',
          fitnessExpiry: '2028-11-15',
          telematicsStatus: 'SIMULATED_ACTIVE',
          status: 'RESERVED_VIP'
        }
      ],

      // 6. Routes Management List
      routes: [
        {
          id: 'RT-12',
          name: 'Route #12: Western Suburbs Express',
          origin: 'Borivali Nancy Colony',
          destination: 'Nexus Hub BKC, Tower 4',
          haltsCount: 6,
          distanceKm: 28,
          avgDuration: '55 mins',
          shiftTiming: 'Morning Shift (07:30 AM Departure)',
          assignedVehicle: 'MH 02 ER 9120 (Innova Crysta)',
          allocatedEmployees: 6,
          maxCapacity: 7,
          status: 'OPTIMAL'
        },
        {
          id: 'RT-04',
          name: 'Route #04: Central Island Corridor',
          origin: 'Thane Vandana Stand',
          destination: 'Nexus Hub BKC, Tower 4',
          haltsCount: 5,
          distanceKm: 31,
          avgDuration: '50 mins via Eastern Freeway',
          shiftTiming: 'Morning Shift (07:45 AM Departure)',
          assignedVehicle: 'MH 01 CV 4410 (Prime Sedan)',
          allocatedEmployees: 4,
          maxCapacity: 4,
          status: 'FULL'
        },
        {
          id: 'RT-08',
          name: 'Route #08: Powai & Ghatkopar Metro Feeder',
          origin: 'Hiranandani Powai',
          destination: 'Nexus Hub BKC, Tower 4',
          haltsCount: 7,
          distanceKm: 16,
          avgDuration: '35 mins via JVLR',
          shiftTiming: 'Evening Shift (12:15 PM Departure)',
          assignedVehicle: 'MH 03 DN 7720 (Force Urbania)',
          allocatedEmployees: 14,
          maxCapacity: 17,
          status: 'OPTIMAL'
        },
        {
          id: 'RT-15',
          name: 'Route #15: Navi Mumbai Tech Shuttle',
          origin: 'Kharghar Hiranandani',
          destination: 'Nexus Hub BKC, Tower 4',
          haltsCount: 8,
          distanceKm: 38,
          avgDuration: '65 mins via Sion-Panvel',
          shiftTiming: 'Morning Shift (07:15 AM Departure)',
          assignedVehicle: 'MH 43 AB 5500 (BharatBenz)',
          allocatedEmployees: 24,
          maxCapacity: 26,
          status: 'OPTIMAL'
        }
      ],

      // 7. Monthly Cab Contracts
      monthlyContracts: [
        {
          id: 'CTR-2026-091',
          department: 'Executive Leadership Team',
          vehicleCategory: 'Luxury Sedan (BMW 5 Series & Audi A6)',
          vehiclesCount: 4,
          monthlyCommitment: '2,500 KM / vehicle / month',
          monthlyBilling: 580000,
          driverType: 'Uniformed Dedicated 24/7 Chauffeur',
          startDate: '2026-01-01',
          renewalDate: '2026-12-31',
          status: 'ACTIVE'
        },
        {
          id: 'CTR-2026-092',
          department: 'Client Engagement & Audits',
          vehicleCategory: 'Innova Crysta VX Fleet',
          vehiclesCount: 12,
          monthlyCommitment: '3,000 KM / vehicle / month',
          monthlyBilling: 1140000,
          driverType: 'Designated Daytime Chauffeur',
          startDate: '2026-03-01',
          renewalDate: '2027-02-28',
          status: 'ACTIVE'
        },
        {
          id: 'CTR-2026-093',
          department: 'Late Night Shift Escort Cabs',
          vehicleCategory: 'Prime Sedans with SOS Security',
          vehiclesCount: 16,
          monthlyCommitment: 'Night Shift Dedicated Roster',
          monthlyBilling: 1125000,
          driverType: 'Background Verified Night Escort',
          startDate: '2026-04-01',
          renewalDate: '2027-03-31',
          status: 'ACTIVE'
        }
      ],

      // 8. Corporate Travel Requests (Approval Queue)
      travelRequests: [
        {
          id: 'REQ-TRV-551',
          employeeName: 'Siddharth Mehta',
          employeeId: 'EMP-8845',
          department: 'Enterprise Sales',
          serviceType: 'Outstation Client Meeting (Mumbai to Pune Hinjawadi)',
          travelDate: '2026-11-04',
          returnDate: '2026-11-05',
          vehicleRequested: 'Executive SUV (Innova Crysta)',
          estCost: 6500,
          businessJustification: 'Client quarterly review meeting with Tech Mahindra campus directors.',
          status: 'PENDING_APPROVAL'
        },
        {
          id: 'REQ-TRV-552',
          employeeName: 'Ananya Iyer',
          employeeId: 'EMP-8844',
          department: 'Data & Analytics',
          serviceType: 'Airport Drop (Mumbai Airport T2 International)',
          travelDate: '2026-11-08',
          returnDate: null,
          vehicleRequested: 'Prime Sedan',
          estCost: 1450,
          businessJustification: 'Attending Singapore AI & Cloud Enterprise Summit representing Nexus.',
          status: 'APPROVED'
        },
        {
          id: 'REQ-TRV-553',
          employeeName: 'Rohit Kulkarni',
          employeeId: 'EMP-8843',
          department: 'Product Management',
          serviceType: 'Full Day Hourly Rental (8 Hours / 80 KM)',
          travelDate: '2026-11-03',
          returnDate: null,
          vehicleRequested: 'Prime Sedan',
          estCost: 2400,
          businessJustification: 'Visiting 4 vendor fabrication units across Rabale & Turbhe MIDC.',
          status: 'PENDING_APPROVAL'
        }
      ],

      // 9. Monthly Invoices & Expense Reports
      invoices: [
        {
          invoiceNumber: 'INV-AERO-2026-10',
          month: 'October 2026',
          dueDate: '2026-11-15',
          totalKilometers: 94820,
          tripsCount: 4890,
          baseServiceCharge: 2450000,
          tollsAndParking: 195000,
          fuelSurcharge: 0,
          gstTax: 132250,
          netPayable: 2777250,
          status: 'ISSUED_UNPAID'
        },
        {
          invoiceNumber: 'INV-AERO-2026-09',
          month: 'September 2026',
          dueDate: '2026-10-15',
          totalKilometers: 91400,
          tripsCount: 4720,
          baseServiceCharge: 2380000,
          tollsAndParking: 188000,
          fuelSurcharge: 0,
          gstTax: 128400,
          netPayable: 2696400,
          status: 'PAID_SETTLED'
        },
        {
          invoiceNumber: 'INV-AERO-2026-08',
          month: 'August 2026',
          dueDate: '2026-09-15',
          totalKilometers: 88900,
          tripsCount: 4580,
          baseServiceCharge: 2310000,
          tollsAndParking: 179000,
          fuelSurcharge: 0,
          gstTax: 124450,
          netPayable: 2613450,
          status: 'PAID_SETTLED'
        }
      ],

      // 10. Employee Portal Specific State
      currentEmployee: {
        id: 'EMP-8842',
        name: 'Pooja Sharma',
        designation: 'Senior Software Engineer (Frontend Core)',
        department: 'Digital Platform Group',
        email: 'pooja.sharma@nexusglobal.io',
        phone: '+91 98202 11094',
        bloodGroup: 'B+ Positive',
        emergencyContact: 'Ashok Sharma (+91 98200 44211)',
        pickupAddress: 'B-402, Samarth Deep, Lokhandwala Circle, Andheri West, Mumbai 400053',
        dropAddress: 'Tower 4, Level 8, Nexus Global Hub, BKC, Mumbai 400051',
        pickupTime: '07:45 AM',
        dropTime: '06:15 PM',
        assignedRoute: 'Route #12: Western Suburbs Express',
        assignedVehicle: 'Toyota Innova Crysta (MH 02 ER 9120)',
        assignedDriver: {
          name: 'Ramesh Shinde',
          phone: '+91 98190 22345',
          rating: 4.9,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        tripStatus: 'SCHEDULED_FOR_TOMORROW',
        todayOtp: '4921'
      },

      employeeNotifications: [
        {
          id: 'NOTIF-01',
          title: 'Morning Shift Cab Scheduled',
          timestamp: '1 hour ago',
          message: 'Chauffeur Ramesh Shinde (Innova MH 02 ER 9120) scheduled for 07:45 AM pickup at Lokhandwala Circle.',
          type: 'INFO'
        },
        {
          id: 'NOTIF-02',
          title: 'Route Timetable Optimization',
          timestamp: 'Yesterday',
          message: 'Western Suburbs Route #12 halt at Samata Nagar adjusted by 5 minutes for expressway fast-lane traffic.',
          type: 'ROUTE_UPDATE'
        },
        {
          id: 'NOTIF-03',
          title: 'Ad-hoc Late Night Drop Approved',
          timestamp: '3 days ago',
          message: 'Your transport manager approved dedicated security escort cab for Nov 6 project sprint.',
          type: 'APPROVAL'
        }
      ],

      employeeRideHistory: [
        {
          id: 'RIDE-8891',
          date: 'Today',
          time: '08:32 AM',
          type: 'Morning Office Inbound',
          from: 'Lokhandwala Circle, Andheri W',
          to: 'Nexus Hub BKC Tower 4',
          vehicle: 'Innova Crysta (MH 02 ER 9120)',
          driver: 'Ramesh Shinde',
          status: 'COMPLETED_ON_TIME'
        },
        {
          id: 'RIDE-8890',
          date: 'Yesterday',
          time: '06:22 PM',
          type: 'Evening Home Outbound',
          from: 'Nexus Hub BKC Tower 4',
          to: 'Lokhandwala Circle, Andheri W',
          vehicle: 'Innova Crysta (MH 02 ER 9120)',
          driver: 'Ramesh Shinde',
          status: 'COMPLETED_ON_TIME'
        },
        {
          id: 'RIDE-8885',
          date: '30 Oct 2026',
          time: '08:28 AM',
          type: 'Morning Office Inbound',
          from: 'Lokhandwala Circle, Andheri W',
          to: 'Nexus Hub BKC Tower 4',
          vehicle: 'Innova Crysta (MH 02 ER 9120)',
          driver: 'Ramesh Shinde',
          status: 'COMPLETED_ON_TIME'
        }
      ],

      // Actions
      addEmployee: (newEmp) => {
        set((state) => ({
          employees: [{ ...newEmp, id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`, status: 'ACTIVE' }, ...state.employees],
          stats: { ...state.stats, totalEmployees: state.stats.totalEmployees + 1 }
        }));
      },

      approveTravelRequest: (reqId) => {
        set((state) => ({
          travelRequests: state.travelRequests.map((r) =>
            r.id === reqId ? { ...r, status: 'APPROVED' } : r
          )
        }));
      },

      rejectTravelRequest: (reqId) => {
        set((state) => ({
          travelRequests: state.travelRequests.map((r) =>
            r.id === reqId ? { ...r, status: 'REJECTED' } : r
          )
        }));
      },

      submitEmployeeTransportRequest: ({ serviceType, travelDate, pickup, drop, reason }) => {
        const newReq = {
          id: `REQ-EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          employeeName: get().currentEmployee.name,
          employeeId: get().currentEmployee.id,
          department: get().currentEmployee.department,
          serviceType: serviceType || 'Ad-Hoc Commute / Late Night Drop',
          travelDate: travelDate || new Date().toISOString().split('T')[0],
          returnDate: null,
          vehicleRequested: 'Executive Sedan',
          estCost: 1200,
          businessJustification: reason || 'Project sprint extended hours delivery',
          status: 'PENDING_APPROVAL'
        };

        const newNotif = {
          id: `NOTIF-${Date.now()}`,
          title: 'Transport Request Submitted',
          timestamp: 'Just Now',
          message: `Your request for ${serviceType} on ${travelDate} is awaiting manager approval.`,
          type: 'REQUEST_SUBMITTED'
        };

        set((state) => ({
          travelRequests: [newReq, ...state.travelRequests],
          employeeNotifications: [newNotif, ...state.employeeNotifications]
        }));

        return newReq;
      },

      updateEmployeeProfile: (updates) => {
        set((state) => ({
          currentEmployee: { ...state.currentEmployee, ...updates }
        }));
      }
    }),
    {
      name: 'aerovoyage_corporate_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
