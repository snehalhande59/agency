/**
 * AeroVoyage Luxe – Enterprise Airline & Flight Reservation Service
 * Real-world Indian domestic & international flight inventory, schedule database,
 * baggage policies, document validation rules, and DigiYatra CISF security protocols.
 */

export const AIRPORTS = [
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj Int\'l Airport', state: 'Maharashtra', terminal: 'T2 (Int\'l & Domestic)' },
  { code: 'PNQ', city: 'Pune', name: 'Pune Lohegaon International Airport', state: 'Maharashtra', terminal: 'New Integrated Terminal' },
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', state: 'Delhi NCR', terminal: 'T3 (Full Service) / T2 (IndiGo)' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', state: 'Karnataka', terminal: 'T2 (Garden Terminal)' },
  { code: 'GOX', city: 'Goa (MOPA)', name: 'Manohar International Airport', state: 'Goa', terminal: 'Main Terminal' },
  { code: 'GOI', city: 'Goa (Dabolim)', name: 'Dabolim Airport', state: 'Goa', terminal: 'Terminal 1' },
  { code: 'NAG', city: 'Nagpur', name: 'Dr. Babasaheb Ambedkar Int\'l Airport', state: 'Maharashtra', terminal: 'Domestic Terminal' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport', state: 'Telangana', terminal: 'Main Terminal' },
  { code: 'AMD', city: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel Int\'l Airport', state: 'Gujarat', terminal: 'Terminal 1' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose Int\'l Airport', state: 'West Bengal', terminal: 'Terminal 2' }
];

export const REQUIRED_DOCUMENTS_GUIDELINES = {
  domestic: [
    {
      id: 'aadhaar',
      name: 'Aadhaar Card (Physical / m-Aadhaar / e-Aadhaar)',
      requirement: 'Mandatory original with readable QR code & clear photograph. DigiYatra biometric gate verified.',
      mandatory: true
    },
    {
      id: 'pan_or_dl',
      name: 'Voter ID Card / Driving License / Pan Card',
      requirement: 'Government-issued photo identification acceptable at CISF airport entry gates.',
      mandatory: false
    },
    {
      id: 'student_or_infant',
      name: 'Infant / Minor Birth Certificate or School ID',
      requirement: 'Children under 2 years must present original birth certificate or hospital discharge slip for infant fare.',
      mandatory: false
    }
  ],
  international: [
    {
      id: 'passport',
      name: 'Valid Indian / Foreign Passport',
      requirement: 'Must have at least 6 months validity remaining from date of departure with minimum 2 blank pages.',
      mandatory: true
    },
    {
      id: 'visa_or_oci',
      name: 'Valid Destination Visa / e-Visa / OCI / Transit Permit',
      requirement: 'Physical stamp or approved e-Visa printout verified at airline check-in counter.',
      mandatory: true
    }
  ]
};

export const FLIGHTS_DATA = [
  {
    id: 'FL-AI-881',
    flightNumber: 'AI-881',
    airline: 'Air India',
    airlineCode: 'AI',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    origin: 'BOM',
    originCity: 'Mumbai',
    dest: 'DEL',
    destCity: 'New Delhi',
    departureTime: '06:30 AM',
    arrivalTime: '08:45 AM',
    duration: '2h 15m',
    aircraft: 'Boeing 787-8 Dreamliner',
    cabinClass: 'Economy',
    fare: 4850,
    seatsAvailable: 28,
    baggage: { cabin: '7 kg', checkin: '20 kg (Complimentary)' },
    mealIncluded: true,
    mealType: 'Hot Gourmet Breakfast & Beverages',
    refundable: true,
    terminal: { dep: 'T2, CSMIA Mumbai', arr: 'T3, IGI New Delhi' }
  },
  {
    id: 'FL-6E-5321',
    flightNumber: '6E-5321',
    airline: 'IndiGo',
    airlineCode: '6E',
    logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=120&q=80',
    origin: 'BOM',
    originCity: 'Mumbai',
    dest: 'DEL',
    destCity: 'New Delhi',
    departureTime: '08:00 AM',
    arrivalTime: '10:15 AM',
    duration: '2h 15m',
    aircraft: 'Airbus A321neo',
    cabinClass: 'Economy',
    fare: 3950,
    seatsAvailable: 14,
    baggage: { cabin: '7 kg', checkin: '15 kg' },
    mealIncluded: false,
    mealType: '6E Tiffin (On-Demand Purchase)',
    refundable: false,
    terminal: { dep: 'T2, CSMIA Mumbai', arr: 'T2, IGI New Delhi' }
  },
  {
    id: 'FL-UK-992',
    flightNumber: 'UK-992',
    airline: 'Vistara',
    airlineCode: 'UK',
    logo: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=120&q=80',
    origin: 'BOM',
    originCity: 'Mumbai',
    dest: 'DEL',
    destCity: 'New Delhi',
    departureTime: '10:30 AM',
    arrivalTime: '12:45 PM',
    duration: '2h 15m',
    aircraft: 'Airbus A320neo',
    cabinClass: 'Premium Economy',
    fare: 7200,
    seatsAvailable: 9,
    baggage: { cabin: '10 kg', checkin: '25 kg' },
    mealIncluded: true,
    mealType: 'Three-Course Chef Crafted Lunch',
    refundable: true,
    terminal: { dep: 'T2, CSMIA Mumbai', arr: 'T3, IGI New Delhi' }
  },
  {
    id: 'FL-QP-1304',
    flightNumber: 'QP-1304',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    logo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=120&q=80',
    origin: 'BOM',
    originCity: 'Mumbai',
    dest: 'GOX',
    destCity: 'Goa (MOPA)',
    departureTime: '09:15 AM',
    arrivalTime: '10:25 AM',
    duration: '1h 10m',
    aircraft: 'Boeing 737 MAX 8',
    cabinClass: 'Economy',
    fare: 2899,
    seatsAvailable: 19,
    baggage: { cabin: '7 kg', checkin: '15 kg' },
    mealIncluded: false,
    mealType: 'Cafe Akasa Gourmet Snacks',
    refundable: true,
    terminal: { dep: 'T1, CSMIA Mumbai', arr: 'Main Terminal, MOPA Goa' }
  },
  {
    id: 'FL-AI-622',
    flightNumber: 'AI-622',
    airline: 'Air India',
    airlineCode: 'AI',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    origin: 'BOM',
    originCity: 'Mumbai',
    dest: 'BLR',
    destCity: 'Bengaluru',
    departureTime: '07:45 AM',
    arrivalTime: '09:30 AM',
    duration: '1h 45m',
    aircraft: 'Airbus A320neo',
    cabinClass: 'Economy',
    fare: 3450,
    seatsAvailable: 32,
    baggage: { cabin: '7 kg', checkin: '20 kg' },
    mealIncluded: true,
    mealType: 'South Indian Breakfast & Tea/Coffee',
    refundable: true,
    terminal: { dep: 'T2, CSMIA Mumbai', arr: 'T2, BLR Airport' }
  },
  {
    id: 'FL-6E-448',
    flightNumber: '6E-448',
    airline: 'IndiGo',
    airlineCode: '6E',
    logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=120&q=80',
    origin: 'PNQ',
    originCity: 'Pune',
    dest: 'DEL',
    destCity: 'New Delhi',
    departureTime: '06:10 AM',
    arrivalTime: '08:20 AM',
    duration: '2h 10m',
    aircraft: 'Airbus A321neo',
    cabinClass: 'Economy',
    fare: 4200,
    seatsAvailable: 18,
    baggage: { cabin: '7 kg', checkin: '15 kg' },
    mealIncluded: false,
    mealType: 'Buy-on-Board Beverage & Snacks',
    refundable: true,
    terminal: { dep: 'New Terminal, Pune Lohegaon', arr: 'T2, IGI New Delhi' }
  },
  {
    id: 'FL-AI-860',
    flightNumber: 'AI-860',
    airline: 'Air India',
    airlineCode: 'AI',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    origin: 'PNQ',
    originCity: 'Pune',
    dest: 'BLR',
    destCity: 'Bengaluru',
    departureTime: '11:20 AM',
    arrivalTime: '12:45 PM',
    duration: '1h 25m',
    aircraft: 'Airbus A320neo',
    cabinClass: 'Economy',
    fare: 3100,
    seatsAvailable: 24,
    baggage: { cabin: '7 kg', checkin: '20 kg' },
    mealIncluded: true,
    mealType: 'Warm Snacks & Refreshment',
    refundable: true,
    terminal: { dep: 'Pune Int\'l Airport', arr: 'T2, BLR Airport' }
  }
];

export const generateAirlinePnr = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
};
