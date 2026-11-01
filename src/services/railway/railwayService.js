/**
 * Railway Mock Service
 * Isolated data layer for IRCTC-style railway booking simulation.
 * When official IRCTC partner APIs are authorized, this file can be swapped with a live adapter.
 */

export const DEMO_BANNER_TEXT = "DEMO MODE – IRCTC integration pending authorization.";

export const STATIONS = [
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'BDTS', name: 'Bandra Terminus', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'LTT', name: 'Lokmanya Tilak Terminus (Kurla)', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra' },
  { code: 'NDLS', name: 'New Delhi Railway Station', city: 'New Delhi', state: 'Delhi' },
  { code: 'NZM', name: 'Hazrat Nizamuddin', city: 'Delhi', state: 'Delhi' },
  { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat' },
  { code: 'MAO', name: 'Madgaon Junction', city: 'Goa', state: 'Goa' },
  { code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh' },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal' },
  { code: 'MAS', name: 'Chennai Central (MGR)', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'NGP', name: 'Nagpur Junction', city: 'Nagpur', state: 'Maharashtra' },
  { code: 'SUR', name: 'Solapur Junction', city: 'Solapur', state: 'Maharashtra' },
  { code: 'NK', name: 'Nashik Road', city: 'Nashik', state: 'Maharashtra' }
];

export const TRAVEL_CLASSES = [
  { code: 'ALL', name: 'All Classes' },
  { code: 'EC', name: 'Executive Chair Car (EC)' },
  { code: 'CC', name: 'AC Chair Car (CC)' },
  { code: '1A', name: 'AC First Class (1A)' },
  { code: '2A', name: 'AC 2 Tier (2A)' },
  { code: '3A', name: 'AC 3 Tier (3A)' },
  { code: 'SL', name: 'Sleeper Class (SL)' }
];

export const QUOTAS = [
  { code: 'GN', name: 'General Quota (GN)' },
  { code: 'TQ', name: 'Tatkal Quota (TQ)' },
  { code: 'PT', name: 'Premium Tatkal (PT)' },
  { code: 'LD', name: 'Ladies Quota (LD)' },
  { code: 'SS', name: 'Senior Citizen / Lower Berth (SS)' }
];

export const BERTH_PREFERENCES = [
  { code: 'NO_PREF', label: 'No Preference' },
  { code: 'LOWER', label: 'Lower Berth' },
  { code: 'MIDDLE', label: 'Middle Berth' },
  { code: 'UPPER', label: 'Upper Berth' },
  { code: 'SIDE_LOWER', label: 'Side Lower' },
  { code: 'SIDE_UPPER', label: 'Side Upper' },
  { code: 'WINDOW', label: 'Window Seat (Chair Car)' }
];

export const TRAINS_DATA = [
  {
    number: '20706',
    name: 'CSMT Jalna Vande Bharat Express',
    type: 'Vande Bharat',
    fromCode: 'CSMT',
    toCode: 'PUNE',
    departureTime: '13:10',
    arrivalTime: '16:25',
    duration: '3h 15m',
    durationMinutes: 195,
    runningDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: {
      EC: { available: true, status: 'AVAILABLE-32', baseFare: 1465, tatkalExtra: 400 },
      CC: { available: true, status: 'AVAILABLE-94', baseFare: 745, tatkalExtra: 200 }
    },
    routeSchedule: [
      { station: 'Mumbai CSMT', code: 'CSMT', arrival: 'Source', departure: '13:10', halt: '-', day: 1, distance: 0 },
      { station: 'Dadar Central', code: 'DR', arrival: '13:22', departure: '13:24', halt: '2m', day: 1, distance: 9 },
      { station: 'Thane', code: 'TNA', arrival: '13:43', departure: '13:45', halt: '2m', day: 1, distance: 34 },
      { station: 'Kalyan Junction', code: 'KYN', arrival: '14:03', departure: '14:05', halt: '2m', day: 1, distance: 54 },
      { station: 'Pune Junction', code: 'PUNE', arrival: '16:25', departure: 'Destination', halt: '-', day: 1, distance: 192 }
    ]
  },
  {
    number: '22221',
    name: 'Mumbai CSMT - Hazrat Nizamuddin Rajdhani Express',
    type: 'Rajdhani',
    fromCode: 'CSMT',
    toCode: 'NZM',
    departureTime: '16:00',
    arrivalTime: '09:55',
    duration: '17h 55m',
    durationMinutes: 1075,
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: {
      '1A': { available: true, status: 'AVAILABLE-12', baseFare: 4890, tatkalExtra: 0 },
      '2A': { available: true, status: 'AVAILABLE-44', baseFare: 3010, tatkalExtra: 500 },
      '3A': { available: true, status: 'RAC-8', baseFare: 2180, tatkalExtra: 400 }
    },
    routeSchedule: [
      { station: 'Mumbai CSMT', code: 'CSMT', arrival: 'Source', departure: '16:00', halt: '-', day: 1, distance: 0 },
      { station: 'Kalyan Junction', code: 'KYN', arrival: '16:43', departure: '16:45', halt: '2m', day: 1, distance: 54 },
      { station: 'Nashik Road', code: 'NK', arrival: '19:17', departure: '19:20', halt: '3m', day: 1, distance: 188 },
      { station: 'Jalgaon Junction', code: 'JL', arrival: '22:18', departure: '22:20', halt: '2m', day: 1, distance: 421 },
      { station: 'Bhopal Junction', code: 'BPL', arrival: '05:00', departure: '05:05', halt: '5m', day: 2, distance: 838 },
      { station: 'Hazrat Nizamuddin', code: 'NZM', arrival: '09:55', departure: 'Destination', halt: '-', day: 2, distance: 1537 }
    ]
  },
  {
    number: '12123',
    name: 'Deccan Queen Superfast Express',
    type: 'Superfast',
    fromCode: 'CSMT',
    toCode: 'PUNE',
    departureTime: '17:10',
    arrivalTime: '20:25',
    duration: '3h 15m',
    durationMinutes: 195,
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: {
      CC: { available: true, status: 'AVAILABLE-118', baseFare: 395, tatkalExtra: 125 },
      '2A': { available: true, status: 'AVAILABLE-16', baseFare: 740, tatkalExtra: 200 }
    },
    routeSchedule: [
      { station: 'Mumbai CSMT', code: 'CSMT', arrival: 'Source', departure: '17:10', halt: '-', day: 1, distance: 0 },
      { station: 'Karjat Junction', code: 'KJT', arrival: '18:33', departure: '18:35', halt: '2m', day: 1, distance: 100 },
      { station: 'Lonavala', code: 'LNL', arrival: '19:19', departure: '19:20', halt: '1m', day: 1, distance: 128 },
      { station: 'Shivajinagar', code: 'SVJR', arrival: '20:09', departure: '20:10', halt: '1m', day: 1, distance: 190 },
      { station: 'Pune Junction', code: 'PUNE', arrival: '20:25', departure: 'Destination', halt: '-', day: 1, distance: 192 }
    ]
  },
  {
    number: '12051',
    name: 'Mumbai CSMT - Madgaon Jan Shatabdi Express',
    type: 'Jan Shatabdi',
    fromCode: 'CSMT',
    toCode: 'MAO',
    departureTime: '05:10',
    arrivalTime: '14:10',
    duration: '9h 00m',
    durationMinutes: 540,
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: {
      EC: { available: true, status: 'AVAILABLE-14', baseFare: 2240, tatkalExtra: 400 },
      CC: { available: true, status: 'AVAILABLE-65', baseFare: 1045, tatkalExtra: 200 }
    },
    routeSchedule: [
      { station: 'Mumbai CSMT', code: 'CSMT', arrival: 'Source', departure: '05:10', halt: '-', day: 1, distance: 0 },
      { station: 'Dadar Central', code: 'DR', arrival: '05:20', departure: '05:22', halt: '2m', day: 1, distance: 9 },
      { station: 'Thane', code: 'TNA', arrival: '05:43', departure: '05:45', halt: '2m', day: 1, distance: 34 },
      { station: 'Panvel', code: 'PNVL', arrival: '06:23', departure: '06:25', halt: '2m', day: 1, distance: 69 },
      { station: 'Ratnagiri', code: 'RN', arrival: '10:35', departure: '10:40', halt: '5m', day: 1, distance: 350 },
      { station: 'Madgaon Junction', code: 'MAO', arrival: '14:10', departure: 'Destination', halt: '-', day: 1, distance: 580 }
    ]
  },
  {
    number: '12951',
    name: 'Mumbai Central - New Delhi Tejas Rajdhani',
    type: 'Rajdhani',
    fromCode: 'MMCT',
    toCode: 'NDLS',
    departureTime: '17:00',
    arrivalTime: '08:32',
    duration: '15h 32m',
    durationMinutes: 932,
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: {
      '1A': { available: true, status: 'AVAILABLE-08', baseFare: 5240, tatkalExtra: 0 },
      '2A': { available: true, status: 'AVAILABLE-52', baseFare: 3260, tatkalExtra: 500 },
      '3A': { available: true, status: 'AVAILABLE-114', baseFare: 2310, tatkalExtra: 400 }
    },
    routeSchedule: [
      { station: 'Mumbai Central', code: 'MMCT', arrival: 'Source', departure: '17:00', halt: '-', day: 1, distance: 0 },
      { station: 'Borivali', code: 'BVI', arrival: '17:22', departure: '17:24', halt: '2m', day: 1, distance: 30 },
      { station: 'Surat', code: 'ST', arrival: '19:43', departure: '19:48', halt: '5m', day: 1, distance: 263 },
      { station: 'Vadodara Junction', code: 'BRC', arrival: '21:06', departure: '21:16', halt: '10m', day: 1, distance: 393 },
      { station: 'Ratlam Junction', code: 'RTM', arrival: '00:25', departure: '00:28', halt: '3m', day: 2, distance: 653 },
      { station: 'Kota Junction', code: 'KOTA', arrival: '03:15', departure: '03:20', halt: '5m', day: 2, distance: 920 },
      { station: 'New Delhi', code: 'NDLS', arrival: '08:32', departure: 'Destination', halt: '-', day: 2, distance: 1386 }
    ]
  },
  {
    number: '12261',
    name: 'CSMT Howrah AC Duronto Express',
    type: 'Duronto',
    fromCode: 'CSMT',
    toCode: 'HWH',
    departureTime: '17:15',
    arrivalTime: '19:30',
    duration: '26h 15m',
    durationMinutes: 1575,
    runningDays: ['Tue', 'Wed', 'Thu', 'Sun'],
    pantryAvailable: true,
    classes: {
      '1A': { available: true, status: 'AVAILABLE-04', baseFare: 5890, tatkalExtra: 0 },
      '2A': { available: true, status: 'AVAILABLE-28', baseFare: 3480, tatkalExtra: 500 },
      '3A': { available: true, status: 'AVAILABLE-78', baseFare: 2470, tatkalExtra: 400 },
      SL: { available: true, status: 'RAC-14', baseFare: 840, tatkalExtra: 150 }
    },
    routeSchedule: [
      { station: 'Mumbai CSMT', code: 'CSMT', arrival: 'Source', departure: '17:15', halt: '-', day: 1, distance: 0 },
      { station: 'Nagpur Junction', code: 'NGP', arrival: '04:15', departure: '04:20', halt: '5m', day: 2, distance: 837 },
      { station: 'Raipur Junction', code: 'R', arrival: '08:45', departure: '08:50', halt: '5m', day: 2, distance: 1139 },
      { station: 'Bilaspur Junction', code: 'BSP', arrival: '10:35', departure: '10:45', halt: '10m', day: 2, distance: 1250 },
      { station: 'Tatanagar Junction', code: 'TATA', arrival: '15:55', departure: '16:00', halt: '5m', day: 2, distance: 1718 },
      { station: 'Howrah Junction', code: 'HWH', arrival: '19:30', departure: 'Destination', halt: '-', day: 2, distance: 1968 }
    ]
  }
];

export const railwayService = {
  getStations: () => STATIONS,

  searchStations: (query) => {
    if (!query) return STATIONS.slice(0, 6);
    const q = query.toLowerCase().trim();
    return STATIONS.filter(
      (s) =>
        s.code.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    );
  },

  searchTrains: ({ fromCode, toCode, date, travelClass, quota }) => {
    // If exact route matching, or fallback to sensible city pairs
    let results = TRAINS_DATA.filter((train) => {
      const matchFrom = !fromCode || train.fromCode === fromCode || train.routeSchedule.some(s => s.code === fromCode);
      const matchTo = !toCode || train.toCode === toCode || train.routeSchedule.some(s => s.code === toCode);
      return matchFrom && matchTo;
    });

    if (results.length === 0) {
      // If no strict direct match, return representative trains so the user has an interactive demo
      results = TRAINS_DATA.slice(0, 4);
    }

    if (travelClass && travelClass !== 'ALL') {
      results = results.filter((train) => train.classes[travelClass]);
    }

    return results;
  },

  getTrainByNumber: (trainNumber) => {
    return TRAINS_DATA.find((t) => t.number === trainNumber) || TRAINS_DATA[0];
  },

  calculateFareBreakdown: ({ trainNumber, classCode, quota = 'GN', passengerCount = 1 }) => {
    const train = railwayService.getTrainByNumber(trainNumber);
    const classData = train.classes[classCode] || Object.values(train.classes)[0];
    const baseRate = classData ? classData.baseFare : 650;
    const tatkalSurcharge = quota === 'TQ' || quota === 'PT' ? (classData.tatkalExtra || 200) : 0;
    const reservationFee = classCode === '1A' ? 60 : classCode === '2A' || classCode === 'EC' ? 50 : 40;
    const superfastFee = train.type === 'Rajdhani' || train.type === 'Vande Bharat' || train.type === 'Superfast' ? 45 : 0;
    const singlePassengerFare = baseRate + tatkalSurcharge + reservationFee + superfastFee;
    const totalBaseFare = singlePassengerFare * passengerCount;
    const gstRate = classCode === 'SL' ? 0 : Math.round(totalBaseFare * 0.05); // 5% GST on AC classes
    const cateringFee = train.pantryAvailable ? 185 * passengerCount : 0;
    const totalFare = totalBaseFare + gstRate + cateringFee;

    return {
      perPassengerBase: baseRate,
      tatkalSurcharge,
      reservationFee,
      superfastFee,
      singlePassengerTotal: singlePassengerFare,
      passengerCount,
      totalBaseFare,
      gstRate,
      cateringFee,
      totalFare
    };
  },

  generateDemoBookingRef: () => {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `DEMO-RAIL-${randomHex}`;
  }
};
