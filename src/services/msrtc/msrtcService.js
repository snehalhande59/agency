/**
 * MSRTC Mock Service Layer
 * Isolated data layer for Maharashtra State Road Transport Corporation (MSRTC) simulation.
 * All functions and data are isolated from UI components for seamless integration with authorized MSRTC APIs later.
 */

export const MSRTC_BANNER_TEXT = "MSRTC Provider Integration Pending";

export const MSRTC_SERVICE_TYPES = [
  { code: 'ALL', name: 'All Services', desc: 'View all state transport options' },
  { code: 'SHIVNERI', name: 'Shivneri Volvo AC', desc: 'Flagship Scandinavian Multi-Axle Volvo with chilled AC & air suspension' },
  { code: 'SHIVSHAHI', name: 'Shivshahi AC Seater / Sleeper', desc: 'Air-conditioned luxury state coaches' },
  { code: 'HIRKANI', name: 'Hirkani Semi-Luxury', desc: 'Nim-Aram 2x2 pushback seating' },
  { code: 'ASIAD', name: 'Asiad Express', desc: 'Fast intercity semi-luxury non-AC' },
  { code: 'SEMI_LUXURY', name: 'Semi-Luxury', desc: 'Comfortable express state routes' },
  { code: 'ORDINARY', name: 'Ordinary (Lal Pari)', desc: 'Iconic rural and urban state transport' }
];

export const MSRTC_DEPOTS = [
  { id: 'MUM_DADAR', name: 'Mumbai - Dadar Asiad Stand', city: 'Mumbai', code: 'DDR' },
  { id: 'MUM_BORIVALI', name: 'Mumbai - Borivali (Nancy Colony)', city: 'Mumbai', code: 'BVI' },
  { id: 'MUM_CENTRAL', name: 'Mumbai Central CBS', city: 'Mumbai', code: 'MMCT' },
  { id: 'MUM_THANE', name: 'Thane (Vandana / CIDCO Stand)', city: 'Thane', code: 'TNA' },
  { id: 'PUN_SWARGATE', name: 'Pune - Swargate Bus Depot', city: 'Pune', code: 'SWG' },
  { id: 'PUN_SHIVAJINAGAR', name: 'Pune - Shivajinagar Stand', city: 'Pune', code: 'SVJR' },
  { id: 'PUN_STATION', name: 'Pune Railway Station Bus Stand', city: 'Pune', code: 'PUN' },
  { id: 'PUN_WAKAD', name: 'Pune - Wakad Flyover Pickup', city: 'Pune', code: 'WKD' },
  { id: 'NSK_CBS', name: 'Nashik - Old CBS Bus Stand', city: 'Nashik', code: 'NSK' },
  { id: 'NSK_MAHAMARG', name: 'Nashik - Mahamarg Bus Stand', city: 'Nashik', code: 'MMG' },
  { id: 'KLH_CBS', name: 'Kolhapur Central Bus Stand (CBS)', city: 'Kolhapur', code: 'KLH' },
  { id: 'AUR_CIDCO', name: 'Chh. Sambhajinagar - Cidco Bus Stand', city: 'Sambhajinagar', code: 'CID' },
  { id: 'SHI_SAI', name: 'Shirdi - Sai Nagar Bus Stand', city: 'Shirdi', code: 'SHR' },
  { id: 'MHB_ST', name: 'Mahabaleshwar ST Stand', city: 'Mahabaleshwar', code: 'MHB' },
  { id: 'RTN_CBS', name: 'Ratnagiri Central Bus Stand', city: 'Ratnagiri', code: 'RTN' },
  { id: 'SLP_CBS', name: 'Solapur Central Bus Stand', city: 'Solapur', code: 'SLP' }
];

export const MSRTC_CONCESSIONS = [
  { code: 'NONE', name: 'None (Standard Adult Fare)', discountPercent: 0, requiredDoc: null },
  { code: 'MAHILA_SAMMAN', name: 'Mahila Samman (50% Off for All Women)', discountPercent: 50, requiredDoc: 'Valid Govt Photo ID' },
  { code: 'AMRIT_JYESTHA', name: 'Amrit Jyeshtha Citizen (75+ Yrs - 100% Free on Non-AC, 50% on AC)', discountPercent: 100, requiredDoc: 'Aadhaar Card with 75+ Age' },
  { code: 'SENIOR_CITIZEN', name: 'Senior Citizen (65 to 74 Yrs - 50% Off)', discountPercent: 50, requiredDoc: 'Aadhaar / Senior Citizen ID' },
  { code: 'DIVYANG', name: 'Divyang / Persons with Disability (75% Off)', discountPercent: 75, requiredDoc: 'UDID / Disability Card' }
];

export const MSRTC_BUSES_DATA = [
  {
    id: 'BUS-SHIV-01',
    serviceNumber: 'MH-14-BT-9102',
    serviceType: 'SHIVNERI',
    serviceName: 'Shivneri Volvo Multi-Axle AC',
    originDepot: 'Mumbai - Dadar Asiad Stand',
    destDepot: 'Pune - Swargate Bus Depot',
    departureTime: '06:00 AM',
    arrivalTime: '09:30 AM',
    duration: '3h 30m',
    baseFare: 535,
    totalSeats: 40,
    availableSeatsCount: 22,
    amenities: ['Air Conditioning', 'Air Suspension', 'Mineral Water', 'Charging Ports', 'Emergency Exit'],
    boardingPoints: [
      { name: 'Dadar Asiad Stand', time: '06:00 AM' },
      { name: 'Maitri Park, Chembur', time: '06:25 AM' },
      { name: 'Vashi Highway Toll Plaza', time: '06:45 AM' },
      { name: 'Kalamboli McDonald Circle', time: '07:10 AM' }
    ],
    droppingPoints: [
      { name: 'Wakad Flyover, Pune', time: '08:50 AM' },
      { name: 'Aundh Parihar Chowk', time: '09:05 AM' },
      { name: 'Pune Swargate Bus Depot', time: '09:30 AM' }
    ]
  },
  {
    id: 'BUS-SHIV-02',
    serviceNumber: 'MH-14-BT-9108',
    serviceType: 'SHIVNERI',
    serviceName: 'Shivneri Volvo Multi-Axle AC',
    originDepot: 'Mumbai - Borivali (Nancy Colony)',
    destDepot: 'Pune - Swargate Bus Depot',
    departureTime: '06:30 AM',
    arrivalTime: '10:15 AM',
    duration: '3h 45m',
    baseFare: 575,
    totalSeats: 40,
    availableSeatsCount: 16,
    amenities: ['Air Conditioning', 'Air Suspension', 'Mineral Water', 'Charging Ports'],
    boardingPoints: [
      { name: 'Borivali (Nancy Colony)', time: '06:30 AM' },
      { name: 'Kandivali (Samata Nagar)', time: '06:40 AM' },
      { name: 'Goregaon Hub Mall', time: '06:55 AM' },
      { name: 'Sion Circle', time: '07:25 AM' },
      { name: 'Vashi Plaza', time: '07:50 AM' }
    ],
    droppingPoints: [
      { name: 'Hinjawadi Bridge', time: '09:35 AM' },
      { name: 'Wakad Bridge', time: '09:45 AM' },
      { name: 'Pune Swargate Bus Depot', time: '10:15 AM' }
    ]
  },
  {
    id: 'BUS-SHAHI-03',
    serviceNumber: 'MH-20-EQ-4421',
    serviceType: 'SHIVSHAHI',
    serviceName: 'Shivshahi AC Seater Express',
    originDepot: 'Pune - Shivajinagar Stand',
    destDepot: 'Nashik - Old CBS Bus Stand',
    departureTime: '07:00 AM',
    arrivalTime: '11:45 AM',
    duration: '4h 45m',
    baseFare: 460,
    totalSeats: 44,
    availableSeatsCount: 28,
    amenities: ['Air Conditioning', 'Pushback Seats', 'USB Mobile Charger'],
    boardingPoints: [
      { name: 'Shivajinagar Stand', time: '07:00 AM' },
      { name: 'Bhosari Landewadi', time: '07:25 AM' },
      { name: 'Chakan Chowk', time: '07:45 AM' }
    ],
    droppingPoints: [
      { name: 'Sinnar Bus Stand', time: '11:05 AM' },
      { name: 'Nashik Dwarka Circle', time: '11:30 AM' },
      { name: 'Nashik Old CBS', time: '11:45 AM' }
    ]
  },
  {
    id: 'BUS-HIRK-04',
    serviceNumber: 'MH-12-RN-7712',
    serviceType: 'HIRKANI',
    serviceName: 'Hirkani Semi-Luxury (Nim-Aram)',
    originDepot: 'Mumbai Central CBS',
    destDepot: 'Kolhapur Central Bus Stand (CBS)',
    departureTime: '08:00 AM',
    arrivalTime: '05:30 PM',
    duration: '9h 30m',
    baseFare: 620,
    totalSeats: 44,
    availableSeatsCount: 19,
    amenities: ['2x2 Pushback Seats', 'Individual Reading Vents', 'Luggage Carrier'],
    boardingPoints: [
      { name: 'Mumbai Central CBS', time: '08:00 AM' },
      { name: 'Dadar Parel TT', time: '08:20 AM' },
      { name: 'Maitri Park Chembur', time: '08:45 AM' }
    ],
    droppingPoints: [
      { name: 'Satara CBS', time: '02:30 PM' },
      { name: 'Karad Bypass', time: '03:45 PM' },
      { name: 'Kolhapur CBS', time: '05:30 PM' }
    ]
  },
  {
    id: 'BUS-SHIV-05',
    serviceNumber: 'MH-14-BT-9140',
    serviceType: 'SHIVNERI',
    serviceName: 'Shivneri Volvo Multi-Axle AC',
    originDepot: 'Thane (Vandana / CIDCO Stand)',
    destDepot: 'Pune - Swargate Bus Depot',
    departureTime: '07:15 AM',
    arrivalTime: '10:30 AM',
    duration: '3h 15m',
    baseFare: 510,
    totalSeats: 40,
    availableSeatsCount: 24,
    amenities: ['Air Conditioning', 'Air Suspension', 'Mineral Water', 'Charging Ports'],
    boardingPoints: [
      { name: 'Thane Vandana Stand', time: '07:15 AM' },
      { name: 'Rabale Police Station', time: '07:35 AM' },
      { name: 'Turbhe Naka', time: '07:50 AM' }
    ],
    droppingPoints: [
      { name: 'Wakad Bypass', time: '09:50 AM' },
      { name: 'Pune Swargate Bus Depot', time: '10:30 AM' }
    ]
  },
  {
    id: 'BUS-ORD-06',
    serviceNumber: 'MH-11-AA-3044',
    serviceType: 'ORDINARY',
    serviceName: 'Ordinary (Lal Pari Express)',
    originDepot: 'Pune - Swargate Bus Depot',
    destDepot: 'Mahabaleshwar ST Stand',
    departureTime: '06:45 AM',
    arrivalTime: '10:15 AM',
    duration: '3h 30m',
    baseFare: 195,
    totalSeats: 50,
    availableSeatsCount: 31,
    amenities: ['Government Regulated Tariff', 'Concessions Valid 100%'],
    boardingPoints: [
      { name: 'Swargate Stand', time: '06:45 AM' },
      { name: 'Katraj Bus Stop', time: '07:05 AM' }
    ],
    droppingPoints: [
      { name: 'Shirwal Stand', time: '08:00 AM' },
      { name: 'Wai Stand', time: '09:00 AM' },
      { name: 'Panchgani Stand', time: '09:45 AM' },
      { name: 'Mahabaleshwar ST Stand', time: '10:15 AM' }
    ]
  }
];

export const msrtcService = {
  getDepots: () => MSRTC_DEPOTS,

  searchDepots: (query) => {
    if (!query) return MSRTC_DEPOTS.slice(0, 6);
    const q = query.toLowerCase().trim();
    return MSRTC_DEPOTS.filter(
      d => d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.code.toLowerCase().includes(q)
    );
  },

  searchBuses: ({ originDepot, destDepot, serviceType }) => {
    let results = MSRTC_BUSES_DATA;

    if (originDepot) {
      results = results.filter(b => b.originDepot.toLowerCase().includes(originDepot.toLowerCase()) || originDepot.toLowerCase().includes(b.originDepot.toLowerCase().split(' - ')[0]));
    }

    if (destDepot) {
      results = results.filter(b => b.destDepot.toLowerCase().includes(destDepot.toLowerCase()) || destDepot.toLowerCase().includes(b.destDepot.toLowerCase().split(' - ')[0]));
    }

    if (results.length === 0) {
      // Return core high frequency buses so demo stays 100% interactive
      results = MSRTC_BUSES_DATA.slice(0, 4);
    }

    if (serviceType && serviceType !== 'ALL') {
      results = results.filter(b => b.serviceType === serviceType);
    }

    return results;
  },

  getBusById: (busId) => {
    return MSRTC_BUSES_DATA.find(b => b.id === busId) || MSRTC_BUSES_DATA[0];
  },

  generateSeatLayout: (bus) => {
    // Generates a 2x2 layout with 40 or 44 seats
    const total = bus.totalSeats || 40;
    const seats = [];

    // Pre-booked simulated seat numbers
    const preBooked = [3, 7, 8, 14, 15, 21, 22, 29, 30, 35];
    const womenReserved = [1, 2, 5, 6, 9, 10];

    for (let i = 1; i <= total; i++) {
      const isBooked = preBooked.includes(i);
      const isWomen = womenReserved.includes(i) && !isBooked;

      seats.push({
        seatNumber: `${i}`,
        type: i % 4 === 1 || i % 4 === 0 ? 'WINDOW' : 'AISLE',
        row: Math.ceil(i / 4),
        side: i % 4 === 1 || i % 4 === 2 ? 'LEFT' : 'RIGHT',
        status: isBooked ? 'BOOKED' : isWomen ? 'WOMEN_RESERVED' : 'AVAILABLE',
        price: bus.baseFare
      });
    }

    return seats;
  },

  calculateFareBreakdown: ({ bus, seatNumbers = [], concessionCode = 'NONE' }) => {
    const seatCount = seatNumbers.length || 1;
    const baseUnitFare = bus.baseFare;
    const grossFare = baseUnitFare * seatCount;

    const concession = MSRTC_CONCESSIONS.find(c => c.code === concessionCode) || MSRTC_CONCESSIONS[0];

    let concessionDiscount = 0;
    if (concession.discountPercent > 0) {
      if (concession.code === 'AMRIT_JYESTHA') {
        // 100% on Ordinary/Semi-Luxury/Hirkani, 50% on Shivshahi/Shivneri
        const discountRate = (bus.serviceType === 'ORDINARY' || bus.serviceType === 'HIRKANI') ? 1.0 : 0.5;
        concessionDiscount = Math.round(grossFare * discountRate);
      } else {
        concessionDiscount = Math.round(grossFare * (concession.discountPercent / 100));
      }
    }

    const reservationCharge = 15 * seatCount;
    const accidentReliefFund = 5 * seatCount;
    const netFare = grossFare - concessionDiscount + reservationCharge + accidentReliefFund;

    return {
      baseUnitFare,
      seatCount,
      grossFare,
      concessionDiscount,
      concessionName: concession.name,
      reservationCharge,
      accidentReliefFund,
      netFare
    };
  },

  generateDemoTicketRef: () => {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `DEMO-MSRTC-${randomHex}`;
  }
};
