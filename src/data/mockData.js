// Mock Data for TRAVELNEX — Premium Indian Tours & Travel Management Platform

export const servicesData = [
  {
    id: 'local-taxi',
    title: 'Local Taxi Services',
    shortDesc: 'Point-to-point urban rides, hourly rental packages, and on-demand city commuting across Mumbai and Pune.',
    slug: '/services/local-taxi',
    icon: 'Car',
    badge: 'Instant & Scheduled',
    startingPrice: '₹14/km',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Instant 10-min pickup', 'Verified local chauffeurs', 'Zero surge guarantee on rentals', 'Clean AC vehicles']
  },
  {
    id: 'outstation-cabs',
    title: 'Outstation Cab Booking',
    shortDesc: 'One-way drops & round trips across Mumbai–Pune Expressway, Samruddhi Mahamarg, and 1,200+ intercity routes.',
    slug: '/services/outstation-cabs',
    icon: 'Compass',
    badge: 'Popular',
    startingPrice: '₹11/km',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    features: ['One-way & round trips', 'Toll & state tax transparency', 'Doorstep pickup in Maharashtra', 'Zero hidden driver night charges']
  },
  {
    id: 'airport-transfers',
    title: 'Airport Pickup & Drop',
    shortDesc: 'Punctual airport transfers for Mumbai CSMIA (T1/T2), Pune Airport (PNQ), and Goa Mopa with live flight tracking.',
    slug: '/services/airport-transfers',
    icon: 'PlaneTakeoff',
    badge: 'Flight Sync',
    startingPrice: '₹799 flat',
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=800&q=80',
    features: ['Live Air India / IndiGo flight sync', 'Complimentary 45m wait time', 'Luggage assist chauffeur', 'Dedicated terminal pickup']
  },
  {
    id: 'mini-bus',
    title: 'Mini Bus Booking',
    shortDesc: '13 to 26-seater executive Force Urbania & Tempo Travellers for family outings, Shirdi yatras, and weddings.',
    slug: '/services/mini-bus',
    icon: 'BusFront',
    badge: 'Group Choice',
    startingPrice: '₹24/km',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: ['Reclining pushback seats', 'Ample boot space for Indian luggage', 'LED screens & sound system', 'Experienced ghat captains']
  },
  {
    id: 'luxury-bus',
    title: 'Luxury Bus & Coach',
    shortDesc: '36 to 55-seater multi-axle luxury coaches (Volvo 9600, BharatBenz Gliderz) with plush sleeper and semi-sleeper amenities.',
    slug: '/services/luxury-bus',
    icon: 'Sparkles',
    badge: 'Ultra Luxury',
    startingPrice: '₹48/km',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    features: ['Air suspension glide', 'Individual mobile charging points', 'On-board washroom options', 'Corporate event transit']
  },
  {
    id: 'group-travel',
    title: 'Group Transportation',
    shortDesc: 'End-to-end logistics for destination weddings in Goa, Konkan tours, corporate summits, and temple pilgrimages.',
    slug: '/services/group-travel',
    icon: 'Users',
    badge: 'Custom Logistics',
    startingPrice: 'Custom Quote',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
    features: ['Dedicated convoy coordinator', 'Fleet tracking dashboard', 'Luggage support vans', 'Multi-day Maharashtra itinerary']
  },
  {
    id: 'train-tickets',
    title: 'Railway Ticket Booking',
    shortDesc: 'Confirmed train reservations, Vande Bharat Express seats, Tatkal booking assistance, and PNR status tracking.',
    slug: '/services/train-tickets',
    icon: 'Train',
    badge: 'IRCTC Staging Assist',
    startingPrice: '₹120 fee',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80',
    features: ['Instant Tatkal booking assistance', 'Live PNR confirmation predictor', 'Free cancellation options', 'Vande Bharat & Rajdhani specials']
  },
  {
    id: 'maharashtra-st-bus',
    title: 'Maharashtra ST Bus Booking',
    shortDesc: 'Official MSRTC Shivneri Volvo AC, Shivshahi, Hirkani Nim-Aram, and Ordinary Lal Pari bookings across state routes.',
    slug: '/services/maharashtra-st-bus',
    icon: 'MapPin',
    badge: 'MSRTC Connect',
    startingPrice: 'Standard Govt Fares',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: ['Volvo Shivneri AC fleet', 'Shivshahi Sleeper coaches', 'Connecting 3,000+ Maharashtra depots', '50% Mahila Sanman & Senior Citizen concession']
  },
  {
    id: 'ncmc-card',
    title: 'NCMC Transit Smart Card',
    shortDesc: 'One Nation One Card: Contactless RuPay transit pass for Mumbai Metro Lines 1, 2A & 7, Pune Metro, and BEST buses.',
    slug: '/services/ncmc-transit',
    icon: 'CreditCard',
    badge: 'One Nation One Card',
    startingPrice: 'Instant Digital Pass',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    features: ['Tap & go Metro gates', 'BEST AC bus sync', 'Automated UPI fast recharge', 'Authorized integration ready']
  }
];

export const vehiclesData = [
  {
    id: 'prime-sedan',
    name: 'Maruti Suzuki Dzire',
    brand: 'Maruti Suzuki',
    category: 'Sedan',
    models: 'Maruti Suzuki Dzire, Honda Amaze, Hyundai Aura',
    passengers: 4,
    luggage: '2 Large Bags + 2 Handbags',
    ac: true,
    pricePerKm: '₹12/km',
    basePrice: 1200,
    tag: 'Most Economical',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Clean sanitized cabin', 'Chilled Air Conditioning', 'Fastag enabled', 'Bottled mineral water']
  },
  {
    id: 'ertiga-muv',
    name: 'Maruti Suzuki Ertiga',
    brand: 'Maruti Suzuki',
    category: 'SUV',
    models: 'Maruti Suzuki Ertiga, Kia Carens, Maruti XL6',
    passengers: 6,
    luggage: '3 Large Bags + 2 Small Bags',
    ac: true,
    pricePerKm: '₹15/km',
    basePrice: 1500,
    tag: 'Value for Small Groups',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Foldable 3rd row seating', 'Dual rear AC vents', 'Smooth highway ride', 'Spacious headroom']
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    brand: 'Toyota',
    category: 'SUV',
    models: 'Toyota Innova Crysta, Innova Hycross',
    passengers: 7,
    luggage: '4 Large Bags + 3 Small Bags',
    ac: true,
    pricePerKm: '₹18/km',
    basePrice: 1800,
    tag: 'King of Indian Highways',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Plush captain chairs', 'Triple-zone climate control', 'Unmatched ghat stability', 'Expressway cruiser']
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner 4x4',
    brand: 'Toyota',
    category: 'Luxury SUV',
    models: 'Toyota Fortuner, Mahindra XUV700, Scorpio-N',
    passengers: 7,
    luggage: '4 Large Bags',
    ac: true,
    pricePerKm: '₹32/km',
    basePrice: 3500,
    tag: 'Executive & VIP',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: ['High ground clearance', 'Leather upholstered seats', 'All-terrain capability', 'VIP convoy presence']
  },
  {
    id: 'force-urbania',
    name: 'Force Urbania / Traveller',
    brand: 'Force Motors',
    category: 'Tempo Traveller',
    models: 'Force Urbania 17-Seater, Force Traveller 3350',
    passengers: 17,
    luggage: '14 Large Bags',
    ac: true,
    pricePerKm: '₹26/km',
    basePrice: 3200,
    tag: 'Family & Pilgrim Tours',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: ['Reclining pushback seats', 'Individual AC blowers & reading lights', '32" Smart LED TV', 'PA microphone system']
  },
  {
    id: 'tata-winger',
    name: 'Tata Winger / Starbus Mini',
    brand: 'Tata Motors',
    category: 'Mini Bus',
    models: 'Tata Winger 15-Seater, BharatBenz 26-Seater',
    passengers: 26,
    luggage: '20 Bags',
    ac: true,
    pricePerKm: '₹34/km',
    basePrice: 4800,
    tag: 'Corporate & Wedding',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    features: ['Wide panoramic windows', 'Chilled ceiling ducting', 'Underbody luggage bay', 'USB charging at all seats']
  },
  {
    id: 'volvo-coach',
    name: 'Volvo 9600 Multi-Axle Luxury Coach',
    brand: 'Volvo Buses India',
    category: 'Luxury Coach',
    models: 'Volvo 9600 B11R, BharatBenz Gliderz 45-Seater',
    passengers: 45,
    luggage: '45+ Bags',
    ac: true,
    pricePerKm: '₹55/km',
    basePrice: 8500,
    tag: 'Intercity Flagship',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    features: ['Electronically controlled air suspension', 'Ergonomic calf-rest seats', 'Live CCTV telematics', 'Speed-governed 80km/h safety']
  }
];

export const destinationsData = [
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'The City of Dreams, Marine Drive & Gateway of India',
    distance: 'Direct Hub',
    duration: 'Airport / Terminal Direct',
    startingPrice: '₹1,499',
    popularFor: ['Marine Drive', 'Gateway of India', 'CSMT Heritage', 'BKC Corporate Hubs'],
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Pune',
    state: 'Maharashtra',
    tagline: 'Oxford of the East, IT Metropolis & Cultural Capital',
    distance: '150 km from Mumbai',
    duration: '2.5 hrs via Expressway',
    startingPrice: '₹2,199',
    popularFor: ['Hinjawadi IT Park', 'Sinhagad Fort', 'Shaniwar Wada', 'Koregaon Park'],
    image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Lonavala & Khandala',
    state: 'Maharashtra',
    tagline: 'Misty Waterfalls, Tiger Point & Western Ghats Weekend Escapes',
    distance: '85 km from Mumbai',
    duration: '1.5 hrs via Expressway',
    startingPrice: '₹1,699',
    popularFor: ['Tiger Point', 'Bhushi Dam', 'Karla Caves', 'Famous Lonavala Chikki'],
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Mahabaleshwar & Panchgani',
    state: 'Maharashtra',
    tagline: 'Strawberry Valleys, Arthur Seat & Mountain Ghats',
    distance: '260 km from Mumbai',
    duration: '5 hrs',
    startingPrice: '₹3,499',
    popularFor: ['Venna Lake Boating', 'Arthur Seat Point', 'Mapro Garden', 'Table Land Panchgani'],
    image: 'https://images.unsplash.com/photo-1626014303757-6564477577f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Shirdi',
    state: 'Maharashtra',
    tagline: 'Sacred Pilgrimage to Shri Sai Baba Samadhi Mandir',
    distance: '240 km from Mumbai',
    duration: '4.5 hrs via Samruddhi',
    startingPrice: '₹3,299',
    popularFor: ['Sai Baba Samadhi Temple', 'Dwarkamai', 'Shani Shingnapur', 'Samruddhi Mahamarg Drive'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nashik',
    state: 'Maharashtra',
    tagline: 'Wine Capital of India & Kumbh Mela Heritage on Godavari',
    distance: '165 km from Mumbai',
    duration: '3.5 hrs via Kasara Ghat',
    startingPrice: '₹2,499',
    popularFor: ['Sula Vineyards', 'Trimbakeshwar Jyotirlinga', 'Panchavati', 'Wine Tasting Tours'],
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun-Kissed Beaches, Coastal Konkan Highways & Heritage Cathedrals',
    distance: '580 km from Mumbai',
    duration: '9.5 hrs Scenic Drive',
    startingPrice: '₹7,499',
    popularFor: ['Calangute & Baga', 'Old Goa Basilica', 'South Goa Serenity', 'Mandovi River Cruises'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Alibaug & Kashid',
    state: 'Maharashtra',
    tagline: 'Coastal Forts, Coconut Groves & Mandwa Ro-Ro Connectivity',
    distance: '95 km from Mumbai',
    duration: '2 hrs via Atal Setu / Ro-Ro',
    startingPrice: '₹2,299',
    popularFor: ['Kolaba Sea Fort', 'Varsoli Beach', 'Kashid White Sand', 'Mandwa Jetty Speedboats'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    tagline: 'UNESCO World Heritage Ajanta & Ellora Caves Gateway',
    distance: '335 km from Mumbai',
    duration: '5 hrs via Samruddhi',
    startingPrice: '₹4,499',
    popularFor: ['Ellora Kailash Temple', 'Ajanta Frescoes', 'Bibi Ka Maqbara', 'Daulatabad Fort'],
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kolhapur',
    state: 'Maharashtra',
    tagline: 'Shree Mahalakshmi Temple, Historic Panhala Fort & Cuisine',
    distance: '380 km from Mumbai',
    duration: '6.5 hrs via NH 48',
    startingPrice: '₹4,999',
    popularFor: ['Mahalakshmi Ambabai Mandir', 'Rankala Lake', 'Panhala Fort', 'Kolhapuri Chappals'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Matheran',
    state: 'Maharashtra',
    tagline: 'Asia’s Only Automobile-Free Hill Station & Heritage Toy Train',
    distance: '80 km from Mumbai',
    duration: '2 hrs to Dasturi Naka',
    startingPrice: '₹1,899',
    popularFor: ['Dasturi Drop Service', 'Charlotte Lake', 'Panorama Point', 'Louisa Point Sunset'],
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ratnagiri & Ganpatipule',
    state: 'Maharashtra',
    tagline: 'Pristine Konkan Coastal Highway, Alphonso Orchards & Swayambhu Ganpati',
    distance: '340 km from Mumbai',
    duration: '7 hrs Scenic Konkan Route',
    startingPrice: '₹5,499',
    popularFor: ['Ganpatipule Beach Temple', 'Jaigad Fort', 'Aare Ware Coastal Road', 'Ratnadurg Fort'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  }
];

export const testimonialsData = [
  {
    name: 'Rajiv Singhania',
    role: 'VP Operations, FinEdge Global',
    city: 'Mumbai',
    rating: 5,
    text: 'TRAVELNEX has completely transformed our employee mobility across 3 delivery centers in BKC and Hinjawadi. 450+ employees commute daily without a single delay in the past 8 months. Outstanding corporate telematics and verified chauffeurs!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Snehal Hande',
    role: 'Tech Lead & Explorer',
    city: 'Pune',
    rating: 5,
    text: 'Booked an Innova Crysta for our family trip from Pune to Mahabaleshwar and Panchgani. The chauffeur drove so smoothly through the ghats, navigated fog effortlessly, and was thoroughly courteous. Top-notch Indian road travel experience!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Dr. Sameer Kulkarni',
    role: 'Consulting Surgeon',
    city: 'Nashik',
    rating: 5,
    text: 'Their airport transfer from Mumbai T2 to Nashik via Kasara Ghat saved me during heavy monsoon rains. The flight landed 1.5 hours late at 2 AM, and the driver was waiting at P4 with a cold towel and water. Real 5-star reliability.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Pooja Bhatt',
    role: 'Wedding Curator, RedVelvet Events',
    city: 'Goa',
    rating: 5,
    text: 'Coordinating 12 Luxury Force Urbania minibuses for a high-profile destination wedding in North Goa was a breeze. TRAVELNEX provided an on-ground coordinator who managed all airport transfers and convoy routing flawlessly.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  }
];

export const corporateMetrics = {
  totalEmployees: 4820,
  activeVehicles: 184,
  todayTrips: 342,
  completedTrips: 310,
  upcomingTrips: 32,
  onTimePunctuality: '99.4%',
  totalKmToday: '14,890 km',
  co2SavedKg: '1,420 kg',
  monthlySpend: '₹18,45,000'
};

export const corporateRecentTrips = [
  { id: 'TRP-8921', route: 'Thane Majiwada -> BKC Tech Park', vehicle: 'Toyota Innova Crysta (MH04-EK-9021)', driver: 'Sanjay More', status: 'Completed', time: '08:45 AM', occupants: '6/6', type: 'Daily Pickup' },
  { id: 'TRP-8922', route: 'Kothrud -> Hinjawadi Phase 3', vehicle: 'Force Urbania (MH12-RN-4412)', driver: 'Ganesh Shinde', status: 'In Transit', time: '09:15 AM', occupants: '14/16', type: 'Daily Pickup' },
  { id: 'TRP-8923', route: 'Mumbai T2 -> Bandra Kurla Complex', vehicle: 'Toyota Fortuner (MH01-DE-1008)', driver: 'Vikram Joshi', status: 'Completed', time: '10:00 AM', occupants: '1/3', type: 'VIP Executive' },
  { id: 'TRP-8924', route: 'Vashi Station -> Mindspace Airoli', vehicle: 'BharatBenz Coach (MH46-AL-7800)', driver: 'Ramesh Patil', status: 'Completed', time: '08:30 AM', occupants: '32/34', type: 'Shuttle' },
  { id: 'TRP-8925', route: 'Airoli -> Goregaon East Hub', vehicle: 'Maruti Suzuki Ertiga (MH03-CP-3312)', driver: 'Pravin Rane', status: 'Scheduled', time: '06:30 PM', occupants: '5/6', type: 'Evening Drop' },
  { id: 'TRP-8926', route: 'Magarpatta -> Pune Airport (PNQ)', vehicle: 'Maruti Suzuki Dzire (MH12-TY-8844)', driver: 'Kailas Jadhav', status: 'Scheduled', time: '07:15 PM', occupants: '2/4', type: 'Airport Drop' }
];

export const initialBookings = [
  {
    id: 'BK-77492',
    service: 'Outstation Cab Booking',
    from: 'Mumbai (Andheri East)',
    to: 'Pune (Koregaon Park)',
    date: '2026-11-05',
    time: '07:30 AM',
    passengers: 4,
    vehicle: 'Toyota Innova Crysta (7-Seater)',
    fare: '₹2,650',
    status: 'Confirmed',
    driverName: 'Santosh Sawant',
    driverPhone: '+91 98201 44512',
    vehicleNumber: 'MH 02 EE 7819',
    bookedOn: '2026-11-01'
  },
  {
    id: 'BK-77488',
    service: 'Airport Pickup & Drop',
    from: 'Mumbai Airport T2 (Chhatrapati Shivaji Maharaj International)',
    to: 'Colaba, South Mumbai',
    date: '2026-11-03',
    time: '11:15 PM',
    passengers: 2,
    vehicle: 'Maruti Suzuki Dzire (Prime Sedan)',
    fare: '₹1,250',
    status: 'Confirmed',
    driverName: 'Nitin Kadam',
    driverPhone: '+91 97690 12837',
    vehicleNumber: 'MH 01 DX 0077',
    bookedOn: '2026-10-31'
  },
  {
    id: 'BK-77310',
    service: 'Mini Bus Booking',
    from: 'Pune Railway Station',
    to: 'Lonavala & Khandala (Villa Retreat)',
    date: '2026-10-24',
    time: '09:00 AM',
    passengers: 14,
    vehicle: 'Force Urbania Luxury 17-Seater',
    fare: '₹7,800',
    status: 'Completed',
    driverName: 'Deepak Kamble',
    driverPhone: '+91 94220 98112',
    vehicleNumber: 'MH 14 CC 4519',
    bookedOn: '2026-10-20'
  }
];

export const faqsData = [
  {
    question: 'How do I book a cab, bus, or train on TRAVELNEX?',
    answer: 'Simply select your desired service (Local Taxi, Outstation Cab, Airport Transfer, Mini Bus, Train, or MSRTC ST Bus) on our homepage or service page. Enter pickup, destination, travel date, time, and passenger count. Choose your preferred vehicle model and click "Book Your Ride" to immediately receive your demo booking confirmation.'
  },
  {
    question: 'Are toll charges, state taxes, and driver allowance included in Outstation fares?',
    answer: 'Yes! TRAVELNEX adheres to a strict 100% transparent pricing policy. On all standard outstation round trips and drops across Maharashtra and neighboring states, standard toll estimates and chauffeur allowances are clearly displayed beforehand with zero hidden surprises.'
  },
  {
    question: 'What happens if my flight is delayed for an Airport Pickup?',
    answer: 'We provide automated live flight tracking with Indian carriers (Air India, IndiGo, Akasa Air, SpiceJet). Your chauffeur monitors your flight number and automatically adjusts arrival timing at Mumbai T2 or Pune Airport. You also receive 45 minutes of complimentary wait time after your flight touches down.'
  },
  {
    question: 'How does Corporate Transportation Management work for enterprises?',
    answer: 'Enterprises in BKC, Hinjawadi, Magarpatta, and Powai get access to our dedicated Corporate Mobility portal. We provide dedicated vehicle fleets (Innova Crysta, Force Urbania, BharatBenz), dynamic GPS routing, automated roster management, employee SOS emergency features, and consolidated monthly GST invoicing with full SLA compliance.'
  },
  {
    question: 'Can I book Maharashtra ST Bus (MSRTC) and Indian Railway tickets here?',
    answer: 'Yes. TRAVELNEX provides integrated interfaces for Maharashtra State Transport (Shivneri Volvo, Shivshahi, AC Sleeper, Hirkani) as well as IRCTC train ticket reservation assistance with tatkal tracking and live seat availability.'
  },
  {
    question: 'What safety standards and sanitization protocols are maintained?',
    answer: 'All our chauffeurs undergo mandatory criminal background checks, defensive driving certifications, and regular health assessments. Vehicles are deep-sanitized before every journey, equipped with GPS panic triggers and first-aid kits.'
  }
];
