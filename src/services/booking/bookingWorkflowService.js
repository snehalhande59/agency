/**
 * Booking Workflow & Route Simulation Service
 * Handles 10 travel workflows, sample route distance matrices, and transparent fare formulas.
 * Operates in authorized-integration-ready demo mode with zero fake external requests.
 */

export const BOOKING_WORKFLOWS = [
  {
    id: 'local-taxi',
    name: 'Local Taxi',
    tagline: 'Point-to-point urban transit without surge pricing',
    category: 'Local',
    icon: 'Car',
    badge: 'City Commute',
    defaultPickup: 'Bandra Kurla Complex (BKC), Mumbai',
    defaultDrop: 'Nariman Point, South Mumbai',
    defaultPassengers: 2,
    defaultLuggage: 2,
    baseFareMin: 450,
    requiresDrop: true,
    requiresReturnDate: false,
    requiresFlightNumber: false,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['Sedan', 'SUV', 'Luxury Sedan']
  },
  {
    id: 'outstation-one-way',
    name: 'Outstation One Way',
    tagline: 'Intercity one-way highway drops with zero return fare penalty',
    category: 'Outstation',
    icon: 'Compass',
    badge: 'Intercity Drop',
    defaultPickup: 'Mumbai (Dadar / Borivali / Thane)',
    defaultDrop: 'Pune (Hinjawadi / Koregaon Park)',
    defaultPassengers: 3,
    defaultLuggage: 3,
    baseFareMin: 2200,
    requiresDrop: true,
    requiresReturnDate: false,
    requiresFlightNumber: false,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['Sedan', 'SUV', 'Luxury Sedan', 'Tempo Traveller']
  },
  {
    id: 'outstation-round-trip',
    name: 'Outstation Round Trip',
    tagline: 'Multi-day intercity round trips with dedicated chauffeur at disposal',
    category: 'Outstation',
    icon: 'RefreshCw',
    badge: 'Round Trip',
    defaultPickup: 'Mumbai (Andheri / Powai)',
    defaultDrop: 'Mahabaleshwar (Hill Station)',
    defaultPassengers: 4,
    defaultLuggage: 4,
    baseFareMin: 4800,
    requiresDrop: true,
    requiresReturnDate: true,
    requiresFlightNumber: false,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['Sedan', 'SUV', 'Luxury Sedan', 'Tempo Traveller']
  },
  {
    id: 'airport-pickup',
    name: 'Airport Pickup',
    tagline: 'Flight delay synchronized arrivals with terminal meet & greet',
    category: 'Airport',
    icon: 'Plane',
    badge: 'Flight Arrival',
    defaultPickup: 'Mumbai Chhatrapati Shivaji Maharaj Airport (T2)',
    defaultDrop: 'Powai Hiranandani, Mumbai',
    defaultPassengers: 2,
    defaultLuggage: 3,
    baseFareMin: 1250,
    requiresDrop: true,
    requiresReturnDate: false,
    requiresFlightNumber: true,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['Sedan', 'SUV', 'Luxury Sedan']
  },
  {
    id: 'airport-drop',
    name: 'Airport Drop',
    tagline: 'Punctual departure transfers with guaranteed on-time airport arrival',
    category: 'Airport',
    icon: 'PlaneTakeoff',
    badge: 'Flight Departure',
    defaultPickup: 'Thane West (Ghodbunder Road)',
    defaultDrop: 'Mumbai Airport Terminal 2 (International/Domestic)',
    defaultPassengers: 2,
    defaultLuggage: 3,
    baseFareMin: 1150,
    requiresDrop: true,
    requiresReturnDate: false,
    requiresFlightNumber: true,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['Sedan', 'SUV', 'Luxury Sedan']
  },
  {
    id: 'hourly-rental',
    name: 'Hourly Rental',
    tagline: 'Chauffeured car at your disposal with unlimited city stops',
    category: 'Rental',
    icon: 'Clock',
    badge: 'Flexible Hourly',
    defaultPickup: 'Worli / Lower Parel, Mumbai',
    defaultDrop: 'Multiple City Errands & Meetings',
    defaultPassengers: 2,
    defaultLuggage: 2,
    baseFareMin: 1499,
    requiresDrop: false,
    requiresReturnDate: false,
    requiresFlightNumber: false,
    supportsHourlyPackages: true,
    allowedVehicleCategories: ['Sedan', 'SUV', 'Luxury Sedan']
  },
  {
    id: 'luxury-car-rental',
    name: 'Luxury Car Rental',
    tagline: 'Mercedes-Benz, BMW, and Audi with suited executive chauffeurs',
    category: 'Luxury',
    icon: 'Sparkles',
    badge: 'VIP & Executive',
    defaultPickup: 'Taj Mahal Palace, Colaba, Mumbai',
    defaultDrop: 'Bandra West / St. Regis Hotel',
    defaultPassengers: 3,
    defaultLuggage: 2,
    baseFareMin: 4500,
    requiresDrop: true,
    requiresReturnDate: false,
    requiresFlightNumber: false,
    supportsHourlyPackages: true,
    allowedVehicleCategories: ['Luxury Sedan']
  },
  {
    id: 'mini-bus',
    name: 'Mini Bus Booking',
    tagline: '13 to 26-seater Force Urbania and Maharaja luxury travellers',
    category: 'Bus',
    icon: 'Bus',
    badge: '13-26 Seater',
    defaultPickup: 'Dadar Central, Mumbai',
    defaultDrop: 'Shirdi Sai Ashram / Nashik',
    defaultPassengers: 14,
    defaultLuggage: 12,
    baseFareMin: 6500,
    requiresDrop: true,
    requiresReturnDate: false,
    requiresFlightNumber: false,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['Tempo Traveller', 'Mini Bus']
  },
  {
    id: 'luxury-bus',
    name: 'Luxury Bus Booking',
    tagline: 'Multi-axle Volvo 9600 & Scania 45-55 seater flagship coaches',
    category: 'Bus',
    icon: 'BusFront',
    badge: 'Multi-Axle Coach',
    defaultPickup: 'Vashi Toll Naka, Navi Mumbai',
    defaultDrop: 'Goa (Panaji / Candolim Beach)',
    defaultPassengers: 35,
    defaultLuggage: 40,
    baseFareMin: 14500,
    requiresDrop: true,
    requiresReturnDate: false,
    requiresFlightNumber: false,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['Luxury Coach']
  },
  {
    id: 'group-transportation',
    name: 'Group Transportation',
    tagline: 'End-to-end convoy management for corporate events & weddings',
    category: 'Group',
    icon: 'Users',
    badge: 'Event Logistics',
    defaultPickup: 'Jio World Convention Centre, BKC',
    defaultDrop: 'Lonavala Aamby Valley Resort',
    defaultPassengers: 25,
    defaultLuggage: 25,
    baseFareMin: 12000,
    requiresDrop: true,
    requiresReturnDate: true,
    requiresFlightNumber: false,
    supportsHourlyPackages: false,
    allowedVehicleCategories: ['SUV', 'Tempo Traveller', 'Mini Bus', 'Luxury Coach']
  }
];

export const HOURLY_PACKAGES = [
  { id: 'PKG-4H', name: '4 Hours / 40 KM', hours: 4, km: 40, multiplier: 1.0 },
  { id: 'PKG-8H', name: '8 Hours / 80 KM (Full Day)', hours: 8, km: 80, multiplier: 1.85 },
  { id: 'PKG-12H', name: '12 Hours / 120 KM (Extended)', hours: 12, km: 120, multiplier: 2.6 }
];

export const SAMPLE_ROUTES_MATRIX = [
  { from: 'mumbai', to: 'pune', distanceKm: 148, duration: '2h 45m', highway: 'Mumbai-Pune Expressway (NH 48)', tollEst: 320 },
  { from: 'pune', to: 'mumbai', distanceKm: 148, duration: '2h 45m', highway: 'Mumbai-Pune Expressway (NH 48)', tollEst: 320 },
  { from: 'mumbai', to: 'shirdi', distanceKm: 242, duration: '4h 30m', highway: 'Samruddhi Mahamarg / NH 160', tollEst: 410 },
  { from: 'mumbai', to: 'nashik', distanceKm: 165, duration: '3h 30m', highway: 'Mumbai-Agra Highway (NH 160)', tollEst: 280 },
  { from: 'mumbai', to: 'mahabaleshwar', distanceKm: 260, duration: '5h 15m', highway: 'NH 48 via Pune / Khopoli', tollEst: 380 },
  { from: 'mumbai', to: 'alibaug', distanceKm: 98, duration: '2h 15m', highway: 'Mumbai-Goa Highway (NH 66)', tollEst: 150 },
  { from: 'mumbai', to: 'goa', distanceKm: 585, duration: '9h 45m', highway: 'NH 48 & NH 66 Coastal Expressway', tollEst: 850 },
  { from: 'mumbai', to: 'lonavala', distanceKm: 85, duration: '1h 45m', highway: 'Mumbai-Pune Expressway', tollEst: 260 },
  { from: 'pune', to: 'nashik', distanceKm: 210, duration: '4h 15m', highway: 'Pune-Nashik Highway (NH 60)', tollEst: 220 },
  { from: 'pune', to: 'mahabaleshwar', distanceKm: 120, duration: '2h 30m', highway: 'NH 48 & Wai Ghat', tollEst: 180 },
  { from: 'pune', to: 'shirdi', distanceKm: 185, duration: '4h 00m', highway: 'Ahmednagar-Pune Highway', tollEst: 240 },
  { from: 'airport', to: 'bkc', distanceKm: 12, duration: '25m', highway: 'Western Express Highway / SCLR', tollEst: 0 },
  { from: 'airport', to: 'south-mumbai', distanceKm: 26, duration: '45m', highway: 'Bandra-Worli Sea Link / Coastal Rd', tollEst: 100 },
  { from: 'airport', to: 'navi-mumbai', distanceKm: 32, duration: '50m', highway: 'Eastern Freeway & Sion-Panvel Expy', tollEst: 45 }
];

export const bookingWorkflowService = {
  getWorkflows: () => BOOKING_WORKFLOWS,

  getWorkflowById: (id) => {
    return BOOKING_WORKFLOWS.find((w) => w.id === id) || BOOKING_WORKFLOWS[0];
  },

  estimateRouteData: (pickup = '', drop = '') => {
    const p = pickup.toLowerCase();
    const d = drop.toLowerCase();

    // Check pre-configured corridors
    for (let r of SAMPLE_ROUTES_MATRIX) {
      if ((p.includes(r.from) && d.includes(r.to)) || (p.includes(r.to) && d.includes(r.from))) {
        return {
          distanceKm: r.distanceKm,
          duration: r.duration,
          highway: r.highway,
          tollEst: r.tollEst,
          isExactMatch: true
        };
      }
    }

    // Heuristic fallback for realistic local or outstation calculations
    const isAirport = p.includes('airport') || d.includes('airport');
    const isIntercity = (p.includes('pune') || d.includes('pune') || p.includes('nashik') || d.includes('nashik') || p.includes('shirdi') || d.includes('shirdi'));

    if (isAirport) {
      return {
        distanceKm: 22,
        duration: '40m',
        highway: 'Western Express Highway / Airport Corridor',
        tollEst: 0,
        isExactMatch: false
      };
    }

    if (isIntercity) {
      return {
        distanceKm: 160,
        duration: '3h 15m',
        highway: 'State Expressway Network',
        tollEst: 310,
        isExactMatch: false
      };
    }

    // Standard urban point-to-point
    return {
      distanceKm: 28,
      duration: '50m',
      highway: 'City Arterial Arteries & Sea Link',
      tollEst: 85,
      isExactMatch: false
    };
  },

  calculateItemizedFare: ({
    workflowId,
    vehicle,
    distanceKm = 148,
    isRoundTrip = false,
    hourlyPackage = null,
    promoCode = ''
  }) => {
    const baseRatePerKm = parseInt(vehicle.pricePerKm?.replace(/\D/g, '') || '14', 10);
    const vehicleBase = vehicle.basePrice || 1800;

    let billableDistance = distanceKm;
    if (isRoundTrip) {
      billableDistance = distanceKm * 2;
    }

    let rawFare = 0;

    if (workflowId === 'hourly-rental' && hourlyPackage) {
      rawFare = vehicleBase * (hourlyPackage.multiplier || 1.85);
    } else {
      const distanceFare = billableDistance * baseRatePerKm;
      rawFare = Math.max(vehicleBase, distanceFare);
    }

    const driverAllowance = isRoundTrip ? 600 : (workflowId === 'hourly-rental' ? 300 : 0);
    const tollEstimate = Math.round(billableDistance * 1.5);
    const gstRate = 0.05; // 5% GST on passenger transport
    const gstAmount = Math.round(rawFare * gstRate);

    let discount = 0;
    if (promoCode && promoCode.toUpperCase() === 'LUXE200') {
      discount = 200;
    }

    const totalFare = Math.max(200, rawFare + driverAllowance + tollEstimate + gstAmount - discount);

    return {
      baseFare: Math.round(rawFare),
      billableDistance,
      baseRatePerKm,
      driverAllowance,
      tollEstimate,
      gstAmount,
      discount,
      totalFare: Math.round(totalFare)
    };
  }
};
