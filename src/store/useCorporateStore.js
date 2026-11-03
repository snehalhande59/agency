import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCorporateStore = create(
  persist(
    (set, get) => ({
      // Active view role: 'hr_admin' | 'transport_manager' | 'employee' | 'driver' | 'vendor' | 'finance'
      activeRole: 'hr_admin',
      setActiveRole: (role) => set({ activeRole: role }),

      // Active demo user identity for each role
      currentDemoUser: {
        role: 'hr_admin',
        name: 'Snehal Hande',
        title: 'VP of HR & Corporate Mobility Director',
        company: 'Nexus Global Technologies India Pvt Ltd',
        email: 'snehal.hande@nexus-enterprise.in',
        phone: '+91 98202 88410',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
      },

      setDemoUserRole: (roleKey) => {
        const users = {
          hr_admin: {
            role: 'hr_admin',
            name: 'Snehal Hande',
            title: 'VP of HR & Corporate Mobility Director',
            company: 'Nexus Global Technologies India Pvt Ltd',
            email: 'snehal.hande@nexus-enterprise.in',
            phone: '+91 98202 88410',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
          },
          transport_manager: {
            role: 'transport_manager',
            name: 'Vikramaditya Singhania',
            title: 'Head of Fleet Operations & Logistics',
            email: 'transport.ops@nexus-enterprise.in',
            phone: '+91 98200 44920',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
          },
          employee: {
            role: 'employee',
            name: 'Pooja Sharma',
            title: 'Senior Software Engineer (Frontend Core)',
            email: 'pooja.sharma@nexus-enterprise.in',
            phone: '+91 98202 11094',
            employeeId: 'EMP-8842',
            department: 'Engineering',
            pickupAddress: 'B-402, Samarth Deep, Lokhandwala Circle, Andheri West, Mumbai',
            dropAddress: 'Tower 4, Nexus Global Hub, BKC, Mumbai',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
          },
          driver: {
            role: 'driver',
            name: 'Ramesh Shinde',
            title: 'Certified Senior Chauffeur (Badge #MH-101)',
            email: 'ramesh.shinde@driver-demo.in',
            phone: '+91 98190 22345',
            assignedVehicle: 'Toyota Innova Crysta (MH 02 ER 9120)',
            rating: 4.9,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
          },
          vendor: {
            role: 'vendor',
            name: 'Mahalaxmi Mobility Solutions',
            title: 'Premier Fleet Partner & Retainer Contractor',
            email: 'contracts@mahalaxmitravels.com',
            phone: '+91 98220 77100',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
          },
          finance: {
            role: 'finance',
            name: 'Kavita Menon',
            title: 'Corporate Finance Controller & Mobility Billing VP',
            email: 'finance.billing@nexus-enterprise.in',
            phone: '+91 98204 33119',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
          }
        };

        if (users[roleKey]) {
          set({ activeRole: roleKey, currentDemoUser: users[roleKey] });
        }
      },

      // 1. Company Profile
      companyProfile: {
        companyName: 'Nexus Global Technologies India Pvt Ltd',
        cin: 'U72900MH2018PTC319802',
        gstin: '27AABCN8821Q1Z4',
        headquarters: 'Tower 4, Level 8, Maker Maxity, BKC, Mumbai 400051',
        campuses: [
          'BKC Innovation Hub, Bandra Kurla Complex, Mumbai',
          'Hinjawadi IT Park Phase 2, Pune',
          'Magarpatta Cybercity, Hadapsar, Pune',
          'Viman Nagar Commerce Zone, Pune',
          'Airoli Mindspace Tech Park, Navi Mumbai'
        ],
        totalEmployees: 1280,
        activeContracts: 42,
        accountManager: 'Vikramaditya Singhania (VP Enterprise Mobility)',
        billingCycle: 'Net-30 Corporate Invoicing',
        slaTier: 'Platinum Enterprise (99.4% On-Time Guarantee)'
      },

      // 2. Company Policies
      policies: {
        bookingCutoffHours: 3, // Cutoff 3h before shift
        cancellationCutoffHours: 2,
        nightShiftStart: '20:00', // 08:00 PM
        nightShiftEnd: '06:00', // 06:00 AM
        femaleNightEscortMandatory: true,
        allowedVehicleCategories: ['Prime Sedan', 'Executive SUV', 'Tempo Traveller', 'Mini Bus'],
        monthlyEmployeeRideLimit: 44, // 22 working days * 2
        departmentBudgets: {
          'Engineering': 1450000,
          'Product Management': 450000,
          'Data & Analytics': 520000,
          'Enterprise Sales': 680000,
          'Finance & Legal': 380000,
          'Operations & Support': 620000
        }
      },

      // 3. Shift Timetables
      shifts: [
        { id: 'SH-01', name: 'Morning Shift', start: '08:30 AM', end: '05:30 PM', activeRosterCount: 540, days: 'Mon - Fri', type: 'GENERAL' },
        { id: 'SH-02', name: 'General Day Shift', start: '09:30 AM', end: '06:30 PM', activeRosterCount: 380, days: 'Mon - Fri', type: 'GENERAL' },
        { id: 'SH-03', name: 'Afternoon Shift', start: '01:00 PM', end: '10:00 PM', activeRosterCount: 160, days: 'Mon - Fri', type: 'EVENING' },
        { id: 'SH-04', name: 'Night Shift (Escort Compliant)', start: '10:00 PM', end: '07:00 AM', activeRosterCount: 95, days: 'Mon - Sun (Rotational)', type: 'NIGHT_ESCORT' },
        { id: 'SH-05', name: 'US / UK Client Overlap', start: '05:30 PM', end: '02:30 AM', activeRosterCount: 105, days: 'Mon - Fri', type: 'NIGHT_ESCORT' }
      ],

      // 4. Employees Directory
      employees: [
        {
          id: 'EMP-8842',
          name: 'Pooja Sharma',
          email: 'pooja.sharma@nexus-enterprise.in',
          phone: '+91 98202 11094',
          department: 'Engineering',
          designation: 'Senior Software Engineer (Frontend Core)',
          shift: 'Morning Shift',
          pickupPoint: 'Lokhandwala Circle, Andheri West, Mumbai',
          dropPoint: 'Tower 4, Maker Maxity, BKC, Mumbai',
          assignedRoute: 'Route #12: Western Suburbs Express',
          assignedCab: 'MH 02 ER 9120 (Innova Crysta)',
          status: 'ACTIVE',
          emergencyContact: 'Ashok Sharma (+91 98200 44211)',
          gender: 'Female',
          nightEscortEligible: true
        },
        {
          id: 'EMP-8843',
          name: 'Rohit Kulkarni',
          email: 'rohit.k@nexus-enterprise.in',
          phone: '+91 98203 44910',
          department: 'Product Management',
          designation: 'Principal Product Lead',
          shift: 'Morning Shift',
          pickupPoint: 'Dadar TT Circle, Mumbai',
          dropPoint: 'Tower 4, Maker Maxity, BKC, Mumbai',
          assignedRoute: 'Route #04: Central Island Corridor',
          assignedCab: 'MH 01 CV 4410 (Prime Sedan)',
          status: 'ACTIVE',
          emergencyContact: 'Meera Kulkarni (+91 98205 11984)',
          gender: 'Male',
          nightEscortEligible: false
        },
        {
          id: 'EMP-8844',
          name: 'Ananya Iyer',
          email: 'ananya.iyer@nexus-enterprise.in',
          phone: '+91 98199 88201',
          department: 'Data & Analytics',
          designation: 'Staff ML Engineer',
          shift: 'Afternoon Shift',
          pickupPoint: 'Hiranandani Gardens, Powai, Mumbai',
          dropPoint: 'Tower 4, Maker Maxity, BKC, Mumbai',
          assignedRoute: 'Route #08: Eastern Corridor',
          assignedCab: 'MH 03 DN 7720 (Force Urbania)',
          status: 'ACTIVE',
          emergencyContact: 'S. Iyer (+91 98190 22001)',
          gender: 'Female',
          nightEscortEligible: true
        },
        {
          id: 'EMP-8845',
          name: 'Siddharth Mehta',
          email: 'siddharth.m@nexus-enterprise.in',
          phone: '+91 98211 20045',
          department: 'Enterprise Sales',
          designation: 'VP Client Solutions',
          shift: 'General Day Shift',
          pickupPoint: 'Worli Sea Face, Mumbai',
          dropPoint: 'Tower 4, Maker Maxity, BKC, Mumbai',
          assignedRoute: 'Dedicated Executive Cab',
          assignedCab: 'MH 01 EE 1001 (Toyota Camry Hybrid)',
          status: 'ACTIVE',
          emergencyContact: 'Ritu Mehta (+91 98211 55990)',
          gender: 'Male',
          nightEscortEligible: false
        },
        {
          id: 'EMP-8846',
          name: 'Tanvi Deshmukh',
          email: 'tanvi.d@nexus-enterprise.in',
          phone: '+91 98330 45129',
          department: 'Finance & Legal',
          designation: 'Legal Counsel & Compliance Specialist',
          shift: 'Morning Shift',
          pickupPoint: 'Vashi Sector 17, Navi Mumbai',
          dropPoint: 'Tower 4, Maker Maxity, BKC, Mumbai',
          assignedRoute: 'Route #15: Navi Mumbai Shuttle',
          assignedCab: 'MH 43 AB 5500 (BharatBenz Mini Bus)',
          status: 'ACTIVE',
          emergencyContact: 'Rajesh Deshmukh (+91 98330 11200)',
          gender: 'Female',
          nightEscortEligible: true
        },
        {
          id: 'EMP-8847',
          name: 'Aditya Patil',
          email: 'aditya.patil@nexus-enterprise.in',
          phone: '+91 98220 99401',
          department: 'Engineering',
          designation: 'DevOps & Site Reliability Architect',
          shift: 'Night Shift (Escort Compliant)',
          pickupPoint: 'Wakad Bridge, Pune',
          dropPoint: 'Hinjawadi IT Park Phase 2, Pune',
          assignedRoute: 'Pune Hinjawadi Corridor #3',
          assignedCab: 'MH 12 QK 5510 (Maruti Ertiga)',
          status: 'ACTIVE',
          emergencyContact: 'Sunita Patil (+91 98220 11994)',
          gender: 'Male',
          nightEscortEligible: false
        }
      ],

      // 5. Driver Roster
      drivers: [
        {
          id: 'DRV-101',
          name: 'Ramesh Shinde',
          phone: '+91 98190 22345',
          licenseNumber: 'MH-02-2015004491',
          licenseExpiry: '2029-06-15',
          experienceYears: 12,
          rating: 4.9,
          totalTrips: 1840,
          assignedVehicle: 'Toyota Innova Crysta (MH 02 ER 9120)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED',
          vendorName: 'Mahalaxmi Mobility Solutions',
          currentLocation: 'Andheri West (Simulated)',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 'DRV-102',
          name: 'Suresh Patil',
          phone: '+91 98205 77120',
          licenseNumber: 'MH-01-2012009941',
          licenseExpiry: '2028-09-30',
          experienceYears: 15,
          rating: 4.85,
          totalTrips: 2450,
          assignedVehicle: 'Maruti Suzuki Dzire (MH 01 CV 4410)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED',
          vendorName: 'Mahalaxmi Mobility Solutions',
          currentLocation: 'Dadar TT (Simulated)',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 'DRV-103',
          name: 'Manoj Ghadge',
          phone: '+91 98198 33019',
          licenseNumber: 'MH-03-2016008122',
          licenseExpiry: '2030-03-12',
          experienceYears: 9,
          rating: 4.95,
          totalTrips: 920,
          assignedVehicle: 'Force Urbania (MH 03 DN 7720)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED',
          vendorName: 'Sahyadri Fleet Logistics',
          currentLocation: 'Powai JVLR (Simulated)',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 'DRV-104',
          name: 'Santosh Kamble',
          phone: '+91 98209 11840',
          licenseNumber: 'MH-43-2014002391',
          licenseExpiry: '2027-11-20',
          experienceYears: 18,
          rating: 4.78,
          totalTrips: 3100,
          assignedVehicle: 'BharatBenz Mini Bus (MH 43 AB 5500)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED',
          vendorName: 'Konkan Tourist Corp',
          currentLocation: 'Vashi Palm Beach (Simulated)',
          photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 'DRV-105',
          name: 'Nitin Sawant',
          phone: '+91 98224 88310',
          licenseNumber: 'MH-12-2017001920',
          licenseExpiry: '2031-01-18',
          experienceYears: 8,
          rating: 4.92,
          totalTrips: 1140,
          assignedVehicle: 'Maruti Suzuki Ertiga (MH 12 QK 5510)',
          status: 'ON_DUTY',
          policeVerification: 'VERIFIED_CLEARED',
          covidVaccine: 'FULLY_VACCINATED',
          vendorName: 'Pune Chauffeur Network',
          currentLocation: 'Hinjawadi Phase 1 (Simulated)',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
        }
      ],

      // 6. Fleet Vehicles Inventory
      vehicles: [
        {
          id: 'VEH-01',
          plateNumber: 'MH 02 ER 9120',
          model: 'Toyota Innova Crysta 2.4 VX',
          category: 'Executive SUV',
          seats: 7,
          ac: true,
          fuelType: 'BS6 Diesel',
          assignedDriver: 'Ramesh Shinde',
          fitnessExpiry: '2027-04-15',
          insuranceExpiry: '2027-03-31',
          permitExpiry: '2028-05-20',
          pucExpiry: '2027-02-10',
          assignedVendor: 'Mahalaxmi Mobility Solutions',
          status: 'IN_SERVICE',
          totalKilometers: 68400,
          telematicsStatus: 'SIMULATED_ACTIVE'
        },
        {
          id: 'VEH-02',
          plateNumber: 'MH 01 CV 4410',
          model: 'Maruti Suzuki Dzire ZXi CNG',
          category: 'Prime Sedan',
          seats: 4,
          ac: true,
          fuelType: 'CNG + Petrol',
          assignedDriver: 'Suresh Patil',
          fitnessExpiry: '2026-12-20',
          insuranceExpiry: '2027-01-15',
          permitExpiry: '2028-01-10',
          pucExpiry: '2026-11-30',
          assignedVendor: 'Mahalaxmi Mobility Solutions',
          status: 'IN_SERVICE',
          totalKilometers: 51200,
          telematicsStatus: 'SIMULATED_ACTIVE'
        },
        {
          id: 'VEH-03',
          plateNumber: 'MH 03 DN 7720',
          model: 'Force Urbania Luxury Van',
          category: 'Tempo Traveller',
          seats: 17,
          ac: true,
          fuelType: 'BS6 Diesel',
          assignedDriver: 'Manoj Ghadge',
          fitnessExpiry: '2028-02-10',
          insuranceExpiry: '2027-07-25',
          permitExpiry: '2029-02-15',
          pucExpiry: '2027-04-18',
          assignedVendor: 'Sahyadri Fleet Logistics',
          status: 'IN_SERVICE',
          totalKilometers: 42100,
          telematicsStatus: 'SIMULATED_ACTIVE'
        },
        {
          id: 'VEH-04',
          plateNumber: 'MH 43 AB 5500',
          model: 'BharatBenz 26-Seater Executive Coach',
          category: 'Mini Bus',
          seats: 26,
          ac: true,
          fuelType: 'BS6 Diesel',
          assignedDriver: 'Santosh Kamble',
          fitnessExpiry: '2027-08-30',
          insuranceExpiry: '2027-06-14',
          permitExpiry: '2028-09-12',
          pucExpiry: '2027-03-22',
          assignedVendor: 'Konkan Tourist Corp',
          status: 'IN_SERVICE',
          totalKilometers: 89000,
          telematicsStatus: 'SIMULATED_ACTIVE'
        },
        {
          id: 'VEH-05',
          plateNumber: 'MH 12 QK 5510',
          model: 'Maruti Suzuki Ertiga VXi Hybrid',
          category: 'MUV',
          seats: 6,
          ac: true,
          fuelType: 'Hybrid Petrol',
          assignedDriver: 'Nitin Sawant',
          fitnessExpiry: '2028-05-18',
          insuranceExpiry: '2027-09-20',
          permitExpiry: '2029-04-10',
          pucExpiry: '2027-05-12',
          assignedVendor: 'Pune Chauffeur Network',
          status: 'IN_SERVICE',
          totalKilometers: 36800,
          telematicsStatus: 'SIMULATED_ACTIVE'
        },
        {
          id: 'VEH-06',
          plateNumber: 'MH 01 EE 1001',
          model: 'Toyota Camry Hybrid / BMW 5 Series',
          category: 'Luxury Sedan',
          seats: 4,
          ac: true,
          fuelType: 'Hybrid',
          assignedDriver: 'Direct Chauffeur Desk',
          fitnessExpiry: '2028-11-15',
          insuranceExpiry: '2027-10-10',
          permitExpiry: '2029-10-01',
          pucExpiry: '2027-06-25',
          assignedVendor: 'Mahalaxmi Mobility Solutions',
          status: 'RESERVED_VIP',
          totalKilometers: 28900,
          telematicsStatus: 'SIMULATED_ACTIVE'
        }
      ],

      // 7. Route Planning & Corridor Roster
      routes: [
        {
          id: 'RT-12',
          name: 'Route #12: Western Suburbs Express',
          city: 'Mumbai',
          origin: 'Borivali Nancy Colony',
          destination: 'Nexus Hub BKC, Tower 4',
          stops: [
            'Borivali Nancy Colony (07:15 AM)',
            'Kandivali Highway Junction (07:25 AM)',
            'Malad Inorbit Link Road (07:35 AM)',
            'Lokhandwala Circle Andheri (07:45 AM)',
            'Santacruz WEH Hub (08:05 AM)',
            'BKC Tower 4 Arrival (08:25 AM)'
          ],
          distanceKm: 28,
          avgDuration: '55 mins',
          shiftTiming: 'Morning Shift',
          assignedVehicle: 'Toyota Innova Crysta (MH 02 ER 9120)',
          assignedDriver: 'Ramesh Shinde',
          allocatedEmployees: 6,
          maxCapacity: 7,
          status: 'OPTIMAL'
        },
        {
          id: 'RT-04',
          name: 'Route #04: Central Island Corridor',
          city: 'Mumbai',
          origin: 'Thane Vandana Stand',
          destination: 'Nexus Hub BKC, Tower 4',
          stops: [
            'Thane Vandana Stand (07:30 AM)',
            'Mulund Toll Plaza (07:40 AM)',
            'Ghatkopar R-City Mall (07:55 AM)',
            'Kurla Station East (08:15 AM)',
            'BKC Tower 4 Arrival (08:30 AM)'
          ],
          distanceKm: 31,
          avgDuration: '50 mins via Eastern Express Highway',
          shiftTiming: 'Morning Shift',
          assignedVehicle: 'Maruti Suzuki Dzire (MH 01 CV 4410)',
          assignedDriver: 'Suresh Patil',
          allocatedEmployees: 4,
          maxCapacity: 4,
          status: 'FULL'
        },
        {
          id: 'RT-08',
          name: 'Route #08: Powai & JVLR Metro Feeder',
          city: 'Mumbai',
          origin: 'Hiranandani Powai',
          destination: 'Nexus Hub BKC, Tower 4',
          stops: [
            'Hiranandani Central Avenue (12:15 PM)',
            'IIT Bombay Main Gate (12:22 PM)',
            'Saki Naka Metro Hub (12:35 PM)',
            'Kurla LBS Marg (12:48 PM)',
            'BKC Tower 4 Arrival (01:00 PM)'
          ],
          distanceKm: 16,
          avgDuration: '35 mins via SCLR',
          shiftTiming: 'Afternoon Shift',
          assignedVehicle: 'Force Urbania (MH 03 DN 7720)',
          assignedDriver: 'Manoj Ghadge',
          allocatedEmployees: 14,
          maxCapacity: 17,
          status: 'OPTIMAL'
        },
        {
          id: 'RT-PUNE-01',
          name: 'Pune Corridor #1: Baner - Wakad to Hinjawadi',
          city: 'Pune',
          origin: 'Baner High Street',
          destination: 'Hinjawadi IT Park Phase 2 & 3',
          stops: [
            'Baner Balewadi Phata (08:15 AM)',
            'Wakad Flyover Chowk (08:28 AM)',
            'Hinjawadi Shivaji Chowk (08:40 AM)',
            'Hinjawadi Phase 2 Circle (08:52 AM)',
            'Tech Mahindra / Infosys Circle Phase 3 (09:05 AM)'
          ],
          distanceKm: 19,
          avgDuration: '40 mins',
          shiftTiming: 'General Day Shift',
          assignedVehicle: 'Maruti Suzuki Ertiga (MH 12 QK 5510)',
          assignedDriver: 'Nitin Sawant',
          allocatedEmployees: 5,
          maxCapacity: 6,
          status: 'OPTIMAL'
        }
      ],

      // 8. Central Live Bookings & Triplist (Interconnected Model)
      corporateBookings: [
        {
          id: 'CORP-BK-1081',
          employeeId: 'EMP-8842',
          employeeName: 'Pooja Sharma',
          employeePhone: '+91 98202 11094',
          department: 'Engineering',
          designation: 'Senior Software Engineer',
          serviceType: 'Daily Office Pickup',
          travelDate: new Date().toISOString().split('T')[0],
          shift: 'Morning Shift (08:30 AM)',
          pickupLocation: 'Lokhandwala Circle, Andheri West, Mumbai',
          dropLocation: 'Nexus Hub BKC, Tower 4, Mumbai',
          vehicleCategoryPreference: 'Executive SUV',
          specialInstructions: 'Ground floor pickup near main security arch gate.',
          status: 'DISPATCHED_ASSIGNED',
          assignedVehicle: 'Toyota Innova Crysta (MH 02 ER 9120)',
          assignedDriver: 'Ramesh Shinde (+91 98190 22345)',
          boardingOtp: '4921',
          costEst: 850,
          costCentre: 'CC-ENG-401',
          driverStatus: 'EN_ROUTE',
          etaMinutes: 12,
          approvalRemarks: 'Standard corporate commute approved under Q4 engineering budget.'
        },
        {
          id: 'CORP-BK-1082',
          employeeId: 'EMP-8843',
          employeeName: 'Rohit Kulkarni',
          employeePhone: '+91 98203 44910',
          department: 'Product Management',
          designation: 'Principal Product Lead',
          serviceType: 'Both-Way Commute',
          travelDate: new Date().toISOString().split('T')[0],
          shift: 'Morning Shift (08:30 AM)',
          pickupLocation: 'Dadar TT Circle, Mumbai',
          dropLocation: 'Nexus Hub BKC, Tower 4, Mumbai',
          vehicleCategoryPreference: 'Prime Sedan',
          specialInstructions: 'Evening return cab at 06:30 PM.',
          status: 'APPROVED_AWAITING_DISPATCH',
          assignedVehicle: 'Maruti Suzuki Dzire (MH 01 CV 4410)',
          assignedDriver: 'Pending Operational Assignment',
          boardingOtp: '7104',
          costEst: 640,
          costCentre: 'CC-PROD-202',
          driverStatus: 'ASSIGNED',
          etaMinutes: 25,
          approvalRemarks: 'Approved for product sprint alignment.'
        },
        {
          id: 'CORP-BK-1083',
          employeeId: 'EMP-8844',
          employeeName: 'Ananya Iyer',
          employeePhone: '+91 98199 88201',
          department: 'Data & Analytics',
          designation: 'Staff ML Engineer',
          serviceType: 'Daily Office Drop',
          travelDate: new Date().toISOString().split('T')[0],
          shift: 'Afternoon Shift (01:00 PM)',
          pickupLocation: 'Hiranandani Gardens, Powai, Mumbai',
          dropLocation: 'Nexus Hub BKC, Tower 4, Mumbai',
          vehicleCategoryPreference: 'Tempo Traveller',
          specialInstructions: 'Carrying cloud telemetry presentation gear.',
          status: 'PENDING_HR_APPROVAL',
          assignedVehicle: 'Unallocated',
          assignedDriver: 'Unallocated',
          boardingOtp: '3390',
          costEst: 480,
          costCentre: 'CC-DATA-103',
          driverStatus: 'UNASSIGNED',
          etaMinutes: 0,
          approvalRemarks: ''
        },
        {
          id: 'CORP-BK-1084',
          employeeId: 'EMP-8847',
          employeeName: 'Aditya Patil',
          employeePhone: '+91 98220 99401',
          department: 'Engineering',
          designation: 'DevOps & Site Reliability Architect',
          serviceType: 'Night-Shift Transport',
          travelDate: new Date().toISOString().split('T')[0],
          shift: 'Night Shift (10:00 PM)',
          pickupLocation: 'Wakad Bridge, Pune',
          dropLocation: 'Hinjawadi IT Park Phase 2, Pune',
          vehicleCategoryPreference: 'MUV',
          specialInstructions: 'Critical server deployment shift. Security guard escort verified.',
          status: 'PENDING_HR_APPROVAL',
          assignedVehicle: 'Unallocated',
          assignedDriver: 'Unallocated',
          boardingOtp: '8821',
          costEst: 720,
          costCentre: 'CC-ENG-401',
          driverStatus: 'UNASSIGNED',
          etaMinutes: 0,
          approvalRemarks: ''
        },
        {
          id: 'CORP-BK-1080',
          employeeId: 'EMP-8845',
          employeeName: 'Siddharth Mehta',
          employeePhone: '+91 98211 20045',
          department: 'Enterprise Sales',
          designation: 'VP Client Solutions',
          serviceType: 'Business Travel',
          travelDate: '2026-11-01',
          shift: 'General Day Shift',
          pickupLocation: 'Worli Sea Face, Mumbai',
          dropLocation: 'Chhatrapati Shivaji Maharaj International Airport (T2)',
          vehicleCategoryPreference: 'Luxury Sedan',
          specialInstructions: 'Client delegate flight arrival meet & greet.',
          status: 'COMPLETED',
          assignedVehicle: 'Toyota Camry Hybrid (MH 01 EE 1001)',
          assignedDriver: 'Ramesh Shinde (+91 98190 22345)',
          boardingOtp: '1102',
          costEst: 1650,
          costCentre: 'CC-SALES-501',
          driverStatus: 'TRIP_COMPLETED',
          etaMinutes: 0,
          approvalRemarks: 'Executive travel approved by CXO.'
        }
      ],

      // 9. Retainer Monthly Contracts
      monthlyContracts: [
        {
          id: 'CTR-2026-091',
          department: 'Executive Leadership Team',
          vehicleCategory: 'Luxury Sedan (BMW 5 Series & Toyota Camry)',
          vehiclesCount: 4,
          monthlyCommitment: '2,500 KM / vehicle / month',
          monthlyBilling: 580000,
          driverType: 'Uniformed Dedicated 24/7 Chauffeur',
          startDate: '2026-01-01',
          renewalDate: '2026-12-31',
          status: 'ACTIVE',
          vendorName: 'Mahalaxmi Mobility Solutions'
        },
        {
          id: 'CTR-2026-092',
          department: 'Hinjawadi Pune Campus Shuttle',
          vehicleCategory: 'Executive Force Urbania & BharatBenz',
          vehiclesCount: 8,
          monthlyCommitment: '16 Daily Scheduled Shift Trips',
          monthlyBilling: 940000,
          driverType: 'Permanent Route Certified Drivers',
          startDate: '2026-03-01',
          renewalDate: '2027-02-28',
          status: 'ACTIVE',
          vendorName: 'Sahyadri Fleet Logistics'
        },
        {
          id: 'CTR-2026-093',
          department: 'Night Shift Female Escort Cabs',
          vehicleCategory: 'GPS Cabs with Police Cleared Escorts',
          vehiclesCount: 14,
          monthlyCommitment: 'Night Shift Dedicated Roster (10 PM - 6 AM)',
          monthlyBilling: 1125000,
          driverType: 'Background Cleared Armed / Guard Escort',
          startDate: '2026-04-01',
          renewalDate: '2027-03-31',
          status: 'ACTIVE',
          vendorName: 'Mahalaxmi Mobility Solutions'
        }
      ],

      // 10. Vendors Management
      vendors: [
        {
          id: 'VND-01',
          name: 'Mahalaxmi Mobility Solutions Pvt Ltd',
          contactPerson: 'Sanjay Deshmukh (Managing Partner)',
          phone: '+91 98220 77100',
          email: 'partners@mahalaxmitravels.com',
          city: 'Mumbai & Navi Mumbai',
          activeFleetCount: 38,
          activeDriversCount: 42,
          rating: 4.88,
          complianceAuditStatus: 'AUDITED_PASSED_OCT2026',
          monthlyTurnover: 1840000,
          pendingInvoices: 1
        },
        {
          id: 'VND-02',
          name: 'Sahyadri Fleet Logistics',
          contactPerson: 'Mahesh Jadhav (Operations Head)',
          phone: '+91 98230 44102',
          email: 'dispatch@sahyadrifleet.in',
          city: 'Pune & Pimpri-Chinchwad',
          activeFleetCount: 24,
          activeDriversCount: 28,
          rating: 4.92,
          complianceAuditStatus: 'AUDITED_PASSED_OCT2026',
          monthlyTurnover: 1220000,
          pendingInvoices: 0
        },
        {
          id: 'VND-03',
          name: 'Konkan Tourist & Intercity Coaches',
          contactPerson: 'Prashant Rane',
          phone: '+91 98210 11980',
          email: 'accounts@konkantourist.com',
          city: 'Thane, Mumbai & Coastal Corridor',
          activeFleetCount: 16,
          activeDriversCount: 19,
          rating: 4.75,
          complianceAuditStatus: 'AUDITED_PASSED_SEP2026',
          monthlyTurnover: 760000,
          pendingInvoices: 1
        }
      ],

      // 11. Invoices & Billing Ledger
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
          status: 'ISSUED_UNPAID',
          vendorShare: 2150000,
          companyShare: 2777250
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
          status: 'PAID_SETTLED',
          vendorShare: 2080000,
          companyShare: 2696400
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
          status: 'PAID_SETTLED',
          vendorShare: 2010000,
          companyShare: 2613450
        }
      ],

      // 12. Safety & SOS Incident Alerts
      safetyAlerts: [
        {
          id: 'SOS-ALERT-901',
          tripId: 'CORP-BK-1081',
          employeeName: 'Pooja Sharma',
          driverName: 'Ramesh Shinde',
          vehicle: 'Toyota Innova Crysta (MH 02 ER 9120)',
          location: 'Western Express Highway, Goregaon Flyover (Simulated)',
          timestamp: 'Just Now',
          status: 'MONITORING_ACTIVE',
          description: 'Simulated SOS test ping from employee mobile console. Response desk alert dispatched.',
          resolved: false
        }
      ],

      // 13. System Notifications
      notifications: [
        {
          id: 'NOTIF-01',
          recipientRole: 'all',
          title: 'Booking Request Submitted',
          timestamp: '15 mins ago',
          message: 'Pooja Sharma submitted request CORP-BK-1081 for Daily Office Pickup.',
          type: 'BOOKING_NEW'
        },
        {
          id: 'NOTIF-02',
          recipientRole: 'transport_manager',
          title: 'HR Approval Granted',
          timestamp: '25 mins ago',
          message: 'Rohit Kulkarni (CORP-BK-1082) approved by Snehal Hande (VP HR & Mobility). Pending vehicle allocation.',
          type: 'HR_APPROVED'
        },
        {
          id: 'NOTIF-03',
          recipientRole: 'employee',
          title: 'Chauffeur En Route',
          timestamp: '1 hour ago',
          message: 'Chauffeur Ramesh Shinde is 12 mins away from Lokhandwala Circle. OTP: 4921.',
          type: 'DISPATCH_UPDATE'
        }
      ],

      // =======================================================================
      // INTERCONNECTED ACTIONS & WORKFLOW METHODS
      // =======================================================================

      // 1. Employee creates a commute booking
      createCommuteBooking: (formData) => {
        const idNumber = Math.floor(1000 + Math.random() * 9000);
        const bookingId = `CORP-BK-${idNumber}`;
        const generatedOtp = `${Math.floor(1000 + Math.random() * 9000)}`;

        const newBooking = {
          id: bookingId,
          employeeId: formData.employeeId || get().currentDemoUser.employeeId || 'EMP-8842',
          employeeName: formData.employeeName || get().currentDemoUser.name || 'Pooja Sharma',
          employeePhone: formData.employeePhone || get().currentDemoUser.phone || '+91 98202 11094',
          department: formData.department || 'Engineering',
          designation: formData.designation || 'Senior Software Engineer',
          serviceType: formData.serviceType || 'Daily Office Pickup',
          travelDate: formData.travelDate || new Date().toISOString().split('T')[0],
          shift: formData.shift || 'Morning Shift (08:30 AM)',
          pickupLocation: formData.pickupLocation || 'Lokhandwala Circle, Andheri West, Mumbai',
          dropLocation: formData.dropLocation || 'Tower 4, Maker Maxity, BKC, Mumbai',
          vehicleCategoryPreference: formData.vehicleCategoryPreference || 'Prime Sedan',
          specialInstructions: formData.specialInstructions || 'N/A',
          status: 'PENDING_HR_APPROVAL',
          assignedVehicle: 'Unallocated',
          assignedDriver: 'Unallocated',
          boardingOtp: generatedOtp,
          costEst: formData.serviceType?.includes('Night') ? 850 : 650,
          costCentre: formData.costCentre || 'CC-ENG-401',
          driverStatus: 'UNASSIGNED',
          etaMinutes: 0,
          approvalRemarks: ''
        };

        const newNotif = {
          id: `NOTIF-${Date.now()}`,
          recipientRole: 'hr_admin',
          title: `New Commute Request: ${bookingId}`,
          timestamp: 'Just Now',
          message: `${newBooking.employeeName} (${newBooking.department}) requested ${newBooking.serviceType} for ${newBooking.travelDate}.`,
          type: 'BOOKING_NEW'
        };

        set((state) => ({
          corporateBookings: [newBooking, ...state.corporateBookings],
          notifications: [newNotif, ...state.notifications]
        }));

        return newBooking;
      },

      // 2. HR Admin approves or rejects booking
      hrApproveBooking: (bookingId, remarks = 'Approved per corporate mobility policy', costCentre = 'CC-ENG-401') => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? {
                  ...b,
                  status: 'APPROVED_AWAITING_DISPATCH',
                  approvalRemarks: remarks,
                  costCentre: costCentre
                }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'transport_manager',
              title: `HR Approved: ${bookingId}`,
              timestamp: 'Just Now',
              message: `Booking ${bookingId} approved by HR. Ready for vehicle and driver assignment.`,
              type: 'HR_APPROVED'
            },
            ...state.notifications
          ]
        }));
      },

      hrRejectBooking: (bookingId, reason = 'Exceeds monthly department commute quota') => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? {
                  ...b,
                  status: 'REJECTED',
                  approvalRemarks: reason
                }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'employee',
              title: `Booking Rejected: ${bookingId}`,
              timestamp: 'Just Now',
              message: `Your booking was rejected. Reason: ${reason}`,
              type: 'REJECTED'
            },
            ...state.notifications
          ]
        }));
      },

      // 3. Transport Operations assigns vehicle & driver
      assignVehicleAndDriver: (bookingId, vehiclePlate, driverName) => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? {
                  ...b,
                  status: 'DISPATCHED_ASSIGNED',
                  assignedVehicle: vehiclePlate,
                  assignedDriver: driverName,
                  driverStatus: 'ASSIGNED',
                  etaMinutes: 15
                }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'driver',
              title: `Trip Assigned: ${bookingId}`,
              timestamp: 'Just Now',
              message: `You have been assigned to trip ${bookingId}. Vehicle: ${vehiclePlate}.`,
              type: 'DISPATCH_ASSIGNED'
            },
            {
              id: `NOTIF-${Date.now() + 1}`,
              recipientRole: 'employee',
              title: `Chauffeur Assigned: ${bookingId}`,
              timestamp: 'Just Now',
              message: `Your chauffeur is ${driverName}. Vehicle: ${vehiclePlate}.`,
              type: 'DISPATCH_ASSIGNED'
            },
            ...state.notifications
          ]
        }));
      },

      // 4. Driver actions in Driver Portal
      driverStartTrip: (bookingId) => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? { ...b, status: 'DRIVER_EN_ROUTE', driverStatus: 'EN_ROUTE', etaMinutes: 10 }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'employee',
              title: 'Chauffeur En Route',
              timestamp: 'Just Now',
              message: `Your chauffeur has started the trip and is en route to your pickup point.`,
              type: 'STATUS_UPDATE'
            },
            ...state.notifications
          ]
        }));
      },

      driverArriveAtPickup: (bookingId) => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? { ...b, status: 'DRIVER_ARRIVED', driverStatus: 'ARRIVED_AT_STOP', etaMinutes: 0 }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'employee',
              title: 'Chauffeur Arrived at Pickup!',
              timestamp: 'Just Now',
              message: `Vehicle has arrived at your gate. Please share your 4-digit boarding OTP with driver.`,
              type: 'STATUS_UPDATE'
            },
            ...state.notifications
          ]
        }));
      },

      driverVerifyBoarding: (bookingId, enteredOtp) => {
        const target = get().corporateBookings.find((b) => b.id === bookingId);
        if (!target) return { success: false, message: 'Booking not found' };

        // Demo OTP check: accept exact match or default '4921' or allow bypass for demo test
        const isMatch = target.boardingOtp === enteredOtp || enteredOtp === '4921' || enteredOtp === 'DEMO';

        if (!isMatch) {
          return { success: false, message: 'Invalid OTP! Please check employee app.' };
        }

        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? {
                  ...b,
                  status: 'PASSENGER_BOARDED',
                  driverStatus: 'ON_ROUTE_TO_DESTINATION',
                  boardedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'all',
              title: `Boarding Verified: ${bookingId}`,
              timestamp: 'Just Now',
              message: `Passenger boarded safely. Digital OTP telemetry recorded.`,
              type: 'BOARDING_CONFIRMED'
            },
            ...state.notifications
          ]
        }));

        return { success: true, message: 'OTP verified successfully! Passenger boarded.' };
      },

      driverMarkNoShow: (bookingId) => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? { ...b, status: 'NO_SHOW', driverStatus: 'NO_SHOW_RECORDED' }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'transport_manager',
              title: `Passenger No-Show: ${bookingId}`,
              timestamp: 'Just Now',
              message: `Driver reported employee no-show after standard 10-minute wait policy.`,
              type: 'WARNING'
            },
            ...state.notifications
          ]
        }));
      },

      driverCompleteTrip: (bookingId) => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? {
                  ...b,
                  status: 'COMPLETED',
                  driverStatus: 'TRIP_COMPLETED',
                  completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              : b
          ),
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'all',
              title: `Trip Completed: ${bookingId}`,
              timestamp: 'Just Now',
              message: `Trip ${bookingId} completed successfully. Logged to monthly billing and reports.`,
              type: 'TRIP_COMPLETED'
            },
            ...state.notifications
          ]
        }));
      },

      // 5. Employee or Driver triggers Emergency SOS
      triggerEmergencySos: ({ bookingId, triggeredBy, location }) => {
        const newAlert = {
          id: `SOS-ALERT-${Math.floor(100 + Math.random() * 900)}`,
          tripId: bookingId || 'GENERAL_COMMUTE',
          employeeName: triggeredBy || get().currentDemoUser.name,
          driverName: 'Assigned Response Chauffeur',
          vehicle: 'Tracked Corporate Fleet Vehicle',
          location: location || 'Pune-Mumbai Expressway / BKC Corridor (Simulated Coordinates)',
          timestamp: 'Just Now',
          status: 'ACTIVE_EMERGENCY_DISPATCH',
          description: 'EMERGENCY SOS TRIGGERED FROM MOBILE CONSOLE. Dedicated transport manager and emergency contacts alerted.',
          resolved: false
        };

        set((state) => ({
          safetyAlerts: [newAlert, ...state.safetyAlerts],
          notifications: [
            {
              id: `NOTIF-${Date.now()}`,
              recipientRole: 'all',
              title: '🚨 EMERGENCY SOS TRIGGERED!',
              timestamp: 'CRITICAL JUST NOW',
              message: `Urgent assistance requested by ${newAlert.employeeName} at ${newAlert.location}.`,
              type: 'CRITICAL_SOS'
            },
            ...state.notifications
          ]
        }));

        return newAlert;
      },

      resolveEmergencyAlert: (alertId) => {
        set((state) => ({
          safetyAlerts: state.safetyAlerts.map((a) =>
            a.id === alertId ? { ...a, resolved: true, status: 'RESOLVED_CLOSED' } : a
          )
        }));
      },

      // 6. Employee Rates Completed Trip
      rateCompletedTrip: (bookingId, stars, feedback) => {
        set((state) => ({
          corporateBookings: state.corporateBookings.map((b) =>
            b.id === bookingId
              ? { ...b, passengerRating: stars, passengerFeedback: feedback }
              : b
          )
        }));
      },

      // 7. Employee Management CRUD
      addEmployee: (newEmp) => {
        const empId = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
        set((state) => ({
          employees: [{ ...newEmp, id: empId, status: 'ACTIVE' }, ...state.employees]
        }));
      },

      updateEmployee: (empId, updates) => {
        set((state) => ({
          employees: state.employees.map((e) => (e.id === empId ? { ...e, ...updates } : e))
        }));
      },

      deactivateEmployee: (empId) => {
        set((state) => ({
          employees: state.employees.map((e) =>
            e.id === empId ? { ...e, status: e.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : e
          )
        }));
      },

      bulkImportDemoEmployees: () => {
        const imported = [
          {
            id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
            name: 'Ketan Shirsat',
            email: 'ketan.s@nexus-enterprise.in',
            phone: '+91 98201 12901',
            department: 'Engineering',
            designation: 'Senior QA Automation Lead',
            shift: 'Morning Shift',
            pickupPoint: 'Ghodbunder Road, Thane West',
            dropPoint: 'Tower 4, Maker Maxity, BKC, Mumbai',
            assignedRoute: 'Route #04: Central Island Corridor',
            assignedCab: 'MH 01 CV 4410',
            status: 'ACTIVE',
            gender: 'Male',
            nightEscortEligible: false
          },
          {
            id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
            name: 'Priyanka Bansal',
            email: 'priyanka.b@nexus-enterprise.in',
            phone: '+91 98199 44321',
            department: 'Data & Analytics',
            designation: 'BI Dashboard Developer',
            shift: 'Morning Shift',
            pickupPoint: 'Kharadi EON Free Zone, Pune',
            dropPoint: 'Magarpatta Cybercity, Pune',
            assignedRoute: 'Pune East Shuttle',
            assignedCab: 'MH 12 QK 5510',
            status: 'ACTIVE',
            gender: 'Female',
            nightEscortEligible: true
          }
        ];

        set((state) => ({
          employees: [...imported, ...state.employees]
        }));
      },

      // 8. Vehicle & Driver Management CRUD
      addVehicle: (newVeh) => {
        const vehId = `VEH-${Math.floor(10 + Math.random() * 90)}`;
        set((state) => ({
          vehicles: [{ ...newVeh, id: vehId, status: 'IN_SERVICE', telematicsStatus: 'SIMULATED_ACTIVE' }, ...state.vehicles]
        }));
      },

      addDriver: (newDrv) => {
        const drvId = `DRV-${Math.floor(100 + Math.random() * 900)}`;
        set((state) => ({
          drivers: [{ ...newDrv, id: drvId, status: 'ON_DUTY', policeVerification: 'VERIFIED_CLEARED' }, ...state.drivers]
        }));
      },

      // 9. Vendor Invoice Submission
      submitVendorInvoice: ({ vendorName, amount, period }) => {
        const invNum = `INV-VND-${Date.now().toString().slice(-6)}`;
        const newInv = {
          invoiceNumber: invNum,
          month: period || 'Current Period',
          dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
          totalKilometers: 14200,
          tripsCount: 420,
          baseServiceCharge: amount * 0.88,
          tollsAndParking: amount * 0.05,
          fuelSurcharge: 0,
          gstTax: amount * 0.07,
          netPayable: amount,
          status: 'PENDING_AUDIT',
          vendorShare: amount,
          companyShare: amount,
          vendorName: vendorName
        };

        set((state) => ({
          invoices: [newInv, ...state.invoices]
        }));
      },

      // 10. Mark Invoice as Paid
      settleInvoice: (invNumber) => {
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.invoiceNumber === invNumber ? { ...inv, status: 'PAID_SETTLED' } : inv
          )
        }));
      }
    }),
    {
      name: 'travelnex_corporate_unified_v2',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
