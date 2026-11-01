import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSuperAdminStore = create(
  persist(
    (set, get) => ({
      // 1. Platform Statistics Overview
      kpiMetrics: {
        totalRevenue: 8425000, // ₹84.25 Lakhs
        totalBookings: 12480,
        activeUsers: 38200,
        fleetVehicles: 640,
        activeChauffeurs: 580,
        corporateClients: 48,
        disputeCount: 14,
        pendingRefundsCount: 6
      },

      // 2. Provider Integration Statuses (Exact prompt requirement)
      providerIntegrations: [
        {
          id: 'railway',
          name: 'Indian Railways / IRCTC Gateway',
          category: 'Rail Transit',
          status: 'Pending Authorization',
          statusColor: 'amber',
          mode: 'DEMO_MOCK_ONLY',
          credentialsConfigured: false,
          endpoint: 'PENDING_OFFICIAL_IRCTC_AUTHORIZATION',
          lastChecked: '2 mins ago',
          notes: 'Simulation environment active. Official sandbox credentials pending IRCTC third-party agency authorization.'
        },
        {
          id: 'msrtc',
          name: 'Maharashtra State Road Transport (MSRTC)',
          category: 'State Bus Fleet',
          status: 'Pending Authorization',
          statusColor: 'amber',
          mode: 'DEMO_MOCK_ONLY',
          credentialsConfigured: false,
          endpoint: 'PENDING_MSRTC_ITMS_CREDENTIALS',
          lastChecked: '5 mins ago',
          notes: 'Operating on verified state depot schedule matrices and government concession formulas.'
        },
        {
          id: 'ncmc',
          name: 'National Common Mobility Card (RuPay NCMC)',
          category: 'Contactless Smart Mobility',
          status: 'Pending Authorization',
          statusColor: 'amber',
          mode: 'DEMO_MOCK_ONLY',
          credentialsConfigured: false,
          endpoint: 'PENDING_NPCI_BANK_HOST_ACQUIRER',
          lastChecked: '10 mins ago',
          notes: 'RuPay tokenization adapter ready. Central Clearing House (CCH) live connection pending.'
        },
        {
          id: 'payment',
          name: 'Commercial Payment Gateway (UPI / Cards)',
          category: 'Financial Settlement',
          status: 'Not Configured',
          statusColor: 'slate',
          mode: 'SAFE_SANDBOX_SIMULATION',
          credentialsConfigured: false,
          endpoint: 'NOT_CONFIGURED',
          lastChecked: 'Just Now',
          notes: 'Zero real money processing. All transactions are simulated with demo references.'
        },
        {
          id: 'maps',
          name: 'Geospatial & Telematics Engine (Maps / Routing)',
          category: 'Location & Telemetry',
          status: 'Not Configured',
          statusColor: 'slate',
          mode: 'MOCK_DISTANCE_MATRIX',
          credentialsConfigured: false,
          endpoint: 'NOT_CONFIGURED',
          lastChecked: 'Just Now',
          notes: 'Using pre-computed highway distances and stylized SVG mock route telemetry.'
        }
      ],

      // 3. User Management
      users: [
        {
          id: 'USR-1001',
          name: 'Snehal Hande',
          email: 'snehal.hande@apexmobility.io',
          phone: '+91 98202 88410',
          role: 'Super Administrator & Corporate Lead',
          totalTrips: 34,
          joinedDate: '2025-04-12',
          status: 'ACTIVE',
          walletBalance: 850
        },
        {
          id: 'USR-1002',
          name: 'Pooja Sharma',
          email: 'pooja.sharma@nexusglobal.io',
          phone: '+91 98202 11094',
          role: 'Corporate Employee',
          totalTrips: 88,
          joinedDate: '2025-06-20',
          status: 'ACTIVE',
          walletBalance: 420
        },
        {
          id: 'USR-1003',
          name: 'Vikramaditya Singhania',
          email: 'vikram@nexusglobal.io',
          phone: '+91 98190 44211',
          role: 'Corporate Admin',
          totalTrips: 12,
          joinedDate: '2025-01-10',
          status: 'ACTIVE',
          walletBalance: 12500
        },
        {
          id: 'USR-1004',
          name: 'Sunita Patil',
          email: 'sunita.patil@example.com',
          phone: '+91 98201 98420',
          role: 'Customer',
          totalTrips: 6,
          joinedDate: '2026-02-18',
          status: 'ACTIVE',
          walletBalance: 200
        },
        {
          id: 'USR-1005',
          name: 'Kunal Verma',
          email: 'kunal.verma@fintechventures.in',
          phone: '+91 98330 11984',
          role: 'Customer',
          totalTrips: 18,
          joinedDate: '2025-09-05',
          status: 'FLAGGED_REVIEW',
          walletBalance: 0
        }
      ],

      // 4. Cab Operators
      cabOperators: [
        {
          id: 'OP-CAB-01',
          name: 'Sahyadri Highway Mobility LLP',
          city: 'Mumbai & Pune',
          vehiclesCount: 145,
          activeDrivers: 138,
          rating: 4.88,
          complianceStatus: 'VERIFIED_COMPLIANT',
          contactPerson: 'Milind Sawant (+91 98200 33410)'
        },
        {
          id: 'OP-CAB-02',
          name: 'MetroLuxe Chauffeur Services',
          city: 'Mumbai MMR & Airport',
          vehiclesCount: 82,
          activeDrivers: 80,
          rating: 4.94,
          complianceStatus: 'VERIFIED_COMPLIANT',
          contactPerson: 'David Fernandes (+91 98190 22100)'
        },
        {
          id: 'OP-CAB-03',
          name: 'Deccan Express Fleet Pvt Ltd',
          city: 'Pune & Nashik',
          vehiclesCount: 110,
          activeDrivers: 104,
          rating: 4.79,
          complianceStatus: 'VERIFIED_COMPLIANT',
          contactPerson: 'Ankush Jadhav (+91 98211 44520)'
        }
      ],

      // 5. Bus Operators
      busOperators: [
        {
          id: 'OP-BUS-01',
          name: 'Konduskar Travels Multi-Axle',
          routesCount: 24,
          busesCount: 48,
          rating: 4.85,
          status: 'ACTIVE',
          headquarters: 'Kolhapur & Mumbai'
        },
        {
          id: 'OP-BUS-02',
          name: 'Purple Metrolink Scania Coaches',
          routesCount: 36,
          busesCount: 65,
          rating: 4.89,
          status: 'ACTIVE',
          headquarters: 'Pune & Mumbai'
        },
        {
          id: 'OP-BUS-03',
          name: 'Neeta Volvo Luxury Logistics',
          routesCount: 42,
          busesCount: 85,
          rating: 4.74,
          status: 'ACTIVE',
          headquarters: 'Mumbai & Shirdi'
        }
      ],

      // 6. Corporate Clients (B2B)
      corporateClients: [
        {
          id: 'CORP-01',
          name: 'Nexus Global Technologies India',
          contractTier: 'Platinum SLA',
          employeesCount: 1280,
          activeVehicles: 74,
          monthlySpend: 2845000,
          creditTerms: 'Net-30',
          status: 'ACTIVE'
        },
        {
          id: 'CORP-02',
          name: 'Capgemini Technology Services',
          contractTier: 'Gold SLA',
          employeesCount: 2400,
          activeVehicles: 120,
          monthlySpend: 4650000,
          creditTerms: 'Net-45',
          status: 'ACTIVE'
        },
        {
          id: 'CORP-03',
          name: 'Morgan Stanley BKC Center',
          contractTier: 'Platinum SLA',
          employeesCount: 850,
          activeVehicles: 45,
          monthlySpend: 2100000,
          creditTerms: 'Net-30',
          status: 'ACTIVE'
        }
      ],

      // 7. Refund Management Queue
      refundRequests: [
        {
          id: 'REF-MAN-901',
          bookingRef: 'DEMO-RAIL-8K92X',
          service: 'IRCTC Railway Reservation',
          customerName: 'Snehal Hande',
          originalAmount: 1860,
          deduction: 240,
          refundAmount: 1620,
          requestDate: '2026-10-31',
          reason: 'Change in itinerary',
          status: 'PENDING_APPROVAL'
        },
        {
          id: 'REF-MAN-902',
          bookingRef: 'DEMO-MSRTC-OLD34',
          service: 'MSRTC Shivneri Volvo AC',
          customerName: 'Sanjay Patil',
          originalAmount: 650,
          deduction: 65,
          refundAmount: 585,
          requestDate: '2026-10-29',
          reason: 'Flight delayed, missed bus',
          status: 'PROCESSED'
        },
        {
          id: 'REF-MAN-903',
          bookingRef: 'BK-10492',
          service: 'Outstation Cab (Mumbai to Pune)',
          customerName: 'Sunita Patil',
          originalAmount: 2450,
          deduction: 245,
          refundAmount: 2205,
          requestDate: '2026-10-30',
          reason: 'Meeting postponed by client',
          status: 'PENDING_APPROVAL'
        }
      ],

      // 8. Platform Support Tickets
      supportTickets: [
        {
          id: 'SUP-991',
          user: 'Snehal Hande',
          category: 'NCMC Turnstile Double Deduction',
          priority: 'HIGH',
          status: 'OPEN',
          date: 'Today, 10:15 AM',
          subject: 'Gundavali Gate 2 charged ₹30 twice'
        },
        {
          id: 'SUP-990',
          user: 'Pooja Sharma',
          category: 'Corporate Cab Delay Inquiry',
          priority: 'MEDIUM',
          status: 'RESOLVED',
          date: 'Yesterday, 06:40 PM',
          subject: 'Western Suburbs Route #12 10-min traffic delay'
        },
        {
          id: 'SUP-989',
          user: 'Kunal Verma',
          category: 'Refund Status Verification',
          priority: 'LOW',
          status: 'RESOLVED',
          date: '28 Oct 2026',
          subject: 'When will simulated ₹1,620 reflect in source ledger?'
        }
      ],

      // Actions
      approveRefund: (refundId) => {
        set((state) => ({
          refundRequests: state.refundRequests.map((r) =>
            r.id === refundId ? { ...r, status: 'PROCESSED' } : r
          ),
          kpiMetrics: {
            ...state.kpiMetrics,
            pendingRefundsCount: Math.max(0, state.kpiMetrics.pendingRefundsCount - 1)
          }
        }));
      },

      rejectRefund: (refundId) => {
        set((state) => ({
          refundRequests: state.refundRequests.map((r) =>
            r.id === refundId ? { ...r, status: 'REJECTED' } : r
          ),
          kpiMetrics: {
            ...state.kpiMetrics,
            pendingRefundsCount: Math.max(0, state.kpiMetrics.pendingRefundsCount - 1)
          }
        }));
      },

      toggleUserStatus: (userId) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId
              ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
              : u
          )
        }));
      },

      resolveSupportTicket: (ticketId) => {
        set((state) => ({
          supportTickets: state.supportTickets.map((t) =>
            t.id === ticketId ? { ...t, status: 'RESOLVED' } : t
          )
        }));
      }
    }),
    {
      name: 'aerovoyage_superadmin_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
