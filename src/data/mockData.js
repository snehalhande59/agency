// Mock Data for AeroVoyage Luxe Travel Platform

export const servicesData = [
  {
    id: 'local-taxi',
    title: 'Local Taxi Services',
    shortDesc: 'Point-to-point urban rides, hourly rental packages, and on-demand city commuting.',
    slug: '/services/local-taxi',
    icon: 'Car',
    badge: 'Instant & Scheduled',
    startingPrice: '₹14/km',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    features: ['Instant 10-min pickup', 'Verified chauffeurs', 'Zero surge guarantee on rentals', 'Clean AC vehicles']
  },
  {
    id: 'outstation-cabs',
    title: 'Outstation Cab Booking',
    shortDesc: 'One-way drops & round trips across 1,200+ intercity routes with verified chauffeurs.',
    slug: '/services/outstation-cabs',
    icon: 'Compass',
    badge: 'Popular',
    startingPrice: '₹11/km',
    image: 'https://images.unsplash.com/photo-1571501679680-de32f1e7a412?auto=format&fit=crop&w=800&q=80',
    features: ['One-way & round trips', 'Toll & tax transparency', 'Doorstep pickup', 'No hidden driver charges']
  },
  {
    id: 'airport-transfers',
    title: 'Airport Pickup & Drop',
    shortDesc: 'Punctual airport transfers with flight tracking, meet-and-greet, and zero-wait pickup.',
    slug: '/services/airport-transfers',
    icon: 'PlaneTakeoff',
    badge: 'Flight Sync',
    startingPrice: '₹799 flat',
    image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80',
    features: ['Live flight delay tracking', 'Complimentary 45m wait time', 'Luggage assist chauffeur', 'Dedicated terminal pickup']
  },
  {
    id: 'mini-bus',
    title: 'Mini Bus Booking',
    shortDesc: '13 to 26-seater executive Tempo Travellers & minibuses for family outings and weddings.',
    slug: '/services/mini-bus',
    icon: 'BusFront',
    badge: 'Group Choice',
    startingPrice: '₹24/km',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    features: ['Reclining pushback seats', 'Ample boot space', 'LED screens & sound system', 'Experienced highway captains']
  },
  {
    id: 'luxury-bus',
    title: 'Luxury Bus & Coach',
    shortDesc: '32 to 55-seater multi-axle luxury coaches (Volvo, Scania, BharatBenz) with plush amenities.',
    slug: '/services/luxury-bus',
    icon: 'Sparkles',
    badge: 'Ultra Luxury',
    startingPrice: '₹48/km',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
    features: ['Air suspension glide', 'Individual charging points', 'On-board washroom options', 'Corporate event transit']
  },
  {
    id: 'group-travel',
    title: 'Group Transportation',
    shortDesc: 'End-to-end logistics for weddings, college tours, conferences, pilgrimage, and delegacy.',
    slug: '/services/group-travel',
    icon: 'Users',
    badge: 'Custom Logistics',
    startingPrice: 'Custom Quote',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    features: ['Dedicated convoy coordinator', 'Fleet tracking dashboard', 'Luggage support vans', 'Multi-day itinerary planning']
  },
  {
    id: 'train-tickets',
    title: 'Railway Ticket Booking',
    shortDesc: 'Confirmed train reservations, Tatkal assistance, PNR status tracking, and meal booking.',
    slug: '/services/train-tickets',
    icon: 'Train',
    badge: 'IRCTC Authorized',
    startingPrice: '₹120 fee',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80',
    features: ['Instant Tatkal booking', 'Live PNR confirmation predictor', 'Free cancellation options', 'Vande Bharat special seats']
  },
  {
    id: 'maharashtra-st-bus',
    title: 'Maharashtra ST Bus Booking',
    shortDesc: 'Official MSRTC Shivneri, Shivshahi, Ashwamedh, and Ordinary bus bookings across state routes.',
    slug: '/services/maharashtra-st-bus',
    icon: 'MapPin',
    badge: 'MSRTC Connect',
    startingPrice: 'Standard Govt Fares',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
    features: ['Volvo Shivneri AC fleet', 'Shivshahi Sleeper coaches', 'Connecting 3,000+ towns', 'Senior citizen discount support']
  },
  {
    id: 'ncmc-card',
    title: 'NCMC Transit Smart Card',
    shortDesc: 'One Nation One Card: Contactless RuPay transit pass for Mumbai Metro, BEST buses, and toll plazas.',
    slug: '/services/ncmc-transit',
    icon: 'CreditCard',
    badge: 'One Nation One Card',
    startingPrice: 'Instant Digital Pass',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    features: ['Tap & go Metro gates', 'BEST AC bus sync', 'Automated fast recharge', 'Simulated demo credentials']
  }
];

export const vehiclesData = [
  {
    id: 'prime-sedan',
    name: 'Prime Sedan',
    category: 'Sedan',
    models: 'Maruti Suzuki Dzire, Tata Tigor, Honda Amaze',
    passengers: 4,
    luggage: '2 Large Bags',
    ac: true,
    pricePerKm: '₹12/km',
    basePrice: 1200,
    tag: 'Most Economical',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    features: ['Clean interiors', 'Air conditioned', 'Music system', 'Bottled water']
  },
  {
    id: 'compact-suv',
    name: 'Compact SUV',
    category: 'SUV',
    models: 'Tata Nexon, Mahindra Bolero Neo, Hyundai Creta',
    passengers: 5,
    luggage: '3 Large Bags',
    ac: true,
    pricePerKm: '₹15/km',
    basePrice: 1500,
    tag: 'Hill & City Agile',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    features: ['High ground clearance', 'Spacious cabin', 'ISOFIX safety', 'Drive modes']
  },
  {
    id: 'premium-suv',
    name: 'Executive MPV / SUV',
    category: 'SUV',
    models: 'Toyota Innova Crysta, Maruti Suzuki Ertiga, Mahindra Scorpio-N',
    passengers: 6,
    luggage: '4 Large Bags',
    ac: true,
    pricePerKm: '₹17/km',
    basePrice: 1800,
    tag: 'Best for Families',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    features: ['Extra legroom', 'Dual zone AC', 'Captain chairs available', 'Smooth suspension']
  },
  {
    id: 'luxury-sedan',
    name: 'Executive & Luxury Fleet',
    category: 'Luxury Sedan',
    models: 'Toyota Innova Hycross, Mahindra XUV700, Toyota Fortuner',
    passengers: 4,
    luggage: '3 Large Bags',
    ac: true,
    pricePerKm: '₹45/km',
    basePrice: 4500,
    tag: 'VIP & Corporate',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
    features: ['Uniformed chauffeur', 'Premium leather', 'Noise cancellation', 'Wi-Fi hotspot']
  },
  {
    id: 'tempo-traveller',
    name: 'Luxury Tempo Traveller',
    category: 'Tempo Traveller',
    models: 'Force Urbania, Force Traveller Maharaja 17-Seater',
    passengers: 17,
    luggage: '12 Large Bags',
    ac: true,
    pricePerKm: '₹26/km',
    basePrice: 3200,
    tag: 'Group Travel',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    features: ['Pushback seats', 'Individual reading lights', '32" Smart LED TV', 'PA microphone system']
  },
  {
    id: 'executive-minibus',
    name: 'Executive Mini Bus',
    category: 'Mini Bus',
    models: 'Tata Winger, Tata Starbus, BharatBenz 26-Seater',
    passengers: 26,
    luggage: '20 Bags',
    ac: true,
    pricePerKm: '₹34/km',
    basePrice: 4800,
    tag: 'Corporate & Wedding',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    features: ['High-deck panoramic windows', 'Chilled AC ducting', 'Underbody luggage bay', 'USB charging at all seats']
  },
  {
    id: 'luxury-coach',
    name: 'Multi-Axle Luxury Coach',
    category: 'Luxury Coach',
    models: 'Volvo 9600 Multi-Axle, BharatBenz Glider 45-Seater',
    passengers: 45,
    luggage: '45+ Bags',
    ac: true,
    pricePerKm: '₹55/km',
    basePrice: 8500,
    tag: 'Intercity Flagship',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
    features: ['Hydraulic air suspension', 'Ergonomic calf-rest seats', 'Live CCTV telematics', 'Speed-governed 80km/h safety']
  }
];

export const destinationsData = [
  {
    name: 'Mumbai',
    tagline: 'The City of Dreams & Coastal Gateway',
    distance: 'Direct Hub',
    duration: 'Airport / Terminal Direct',
    startingPrice: '₹1,499',
    popularFor: ['Marine Drive', 'Gateway of India', 'Corporate Hubs', 'Bandra-Worli Sea Link'],
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Pune',
    tagline: 'Oxford of the East & IT Metropolis',
    distance: '150 km from Mumbai',
    duration: '2.5 hrs via Expressway',
    startingPrice: '₹2,199',
    popularFor: ['Hinjawadi IT Park', 'Sinhagad Fort', 'Aga Khan Palace', 'Shaniwar Wada'],
    image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Goa',
    tagline: 'Sun, Sand, Heritage & Coastal Highways',
    distance: '580 km',
    duration: '9.5 hrs Scenic Drive',
    startingPrice: '₹7,499',
    popularFor: ['Calangute & Anjuna', 'Old Goa Cathedrals', 'South Goa Serenity', 'Palolem Beach'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Mahabaleshwar',
    tagline: 'Strawberry Valleys & Misty Western Ghats',
    distance: '260 km',
    duration: '5 hrs',
    startingPrice: '₹3,499',
    popularFor: ['Venna Lake', 'Arthur Seat Point', 'Mapro Garden', 'Panchgani Table Land'],
    image: 'https://images.unsplash.com/photo-1626014303757-6564477577f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Shirdi',
    tagline: 'Sacred Pilgrimage & Spiritual Serenity',
    distance: '240 km',
    duration: '4.5 hrs via Samruddhi',
    startingPrice: '₹3,299',
    popularFor: ['Sai Baba Samadhi Temple', 'Shani Shingnapur', 'Samruddhi Mahamarg Drive'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nashik',
    tagline: 'Wine Capital of India & Kumbh Mela City',
    distance: '165 km',
    duration: '3.5 hrs via Kasara Ghat',
    startingPrice: '₹2,499',
    popularFor: ['Sula Vineyards', 'Trimbakeshwar Temple', 'Panchavati', 'Godavari Ghats'],
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Lonavala & Khandala',
    tagline: 'Waterfalls, Forts & Weekend Escapes',
    distance: '85 km',
    duration: '1.5 hrs',
    startingPrice: '₹1,699',
    popularFor: ['Tiger Point', 'Bhushi Dam', 'Karla Caves', 'Famous Chikki Outlets'],
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chhatrapati Sambhajinagar',
    tagline: 'UNESCO World Heritage Caves & Heritage',
    distance: '335 km',
    duration: '5.5 hrs via Samruddhi',
    startingPrice: '₹4,199',
    popularFor: ['Ellora Caves', 'Ajanta Caves', 'Bibi Ka Maqbara', 'Daulatabad Fort'],
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443834a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Jaipur',
    tagline: 'The Pink City of Palaces & Royal Grandeur',
    distance: 'North India Circuit',
    duration: 'Golden Triangle Hub',
    startingPrice: '₹4,999',
    popularFor: ['Hawa Mahal', 'Amer Fort', 'City Palace', 'Jantar Mantar'],
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Varanasi',
    tagline: 'Ancient Ghats & Spiritual Heart of India',
    distance: 'Eastern Heritage Circuit',
    duration: 'Ganga Riverside Hub',
    startingPrice: '₹3,899',
    popularFor: ['Dashashwamedh Ghat', 'Kashi Vishwanath', 'Evening Ganga Aarti', 'Sarnath'],
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Agra',
    tagline: 'Home to the World Wonder Taj Mahal',
    distance: '210 km from Delhi',
    duration: 'Yamuna Expressway 3 hrs',
    startingPrice: '₹2,799',
    popularFor: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Munnar & Alleppey',
    tagline: 'God’s Own Country: Tea Hills & Backwaters',
    distance: 'South India Circuit',
    duration: 'Scenic Kerala Highway',
    startingPrice: '₹5,999',
    popularFor: ['Munnar Tea Gardens', 'Alleppey Houseboats', 'Vembanad Lake', 'Periyar Wildlife'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  }
];

export const testimonialsData = [
  {
    name: 'Rajiv Singhania',
    role: 'VP Operations, FinEdge Global',
    city: 'Mumbai',
    rating: 5,
    text: 'AeroVoyage has completely transformed our employee mobility across 3 delivery centers. 450+ employees commute daily without a single delay in the past 8 months. Outstanding corporate telematics!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Architect & Family Traveller',
    city: 'Pune',
    rating: 5,
    text: 'Booked an Innova Crysta for our family trip from Pune to Mahabaleshwar. The driver was impeccably dressed, extremely courteous, and drove so smoothly through the ghats. Top-notch service!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Dr. Sameer Kulkarni',
    role: 'Keynote Speaker & Consultant',
    city: 'Nashik',
    rating: 5,
    text: 'Their airport transfer from Mumbai T2 to Nashik saved me during heavy rains. The flight landed 1.5 hours late at 2 AM, and the chauffeur was waiting with a cold towel and water. Real 5-star experience.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Pooja Bhatt',
    role: 'Event Lead, RedVelvet Weddings',
    city: 'Goa',
    rating: 5,
    text: 'Coordinating 12 Luxury Urbania minibuses for a high-profile destination wedding in North Goa was a breeze. AeroVoyage provided a dedicated fleet manager on-ground. Flawless execution.',
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
  { id: 'TRP-8921', route: 'Thane Majiwada -> BKC Tech Park', vehicle: 'Innova Crysta (MH04-EK-9021)', driver: 'Sanjay More', status: 'Completed', time: '08:45 AM', occupants: '6/6', type: 'Daily Pickup' },
  { id: 'TRP-8922', route: 'Kothrud -> Hinjawadi Phase 3', vehicle: 'Force Urbania (MH12-RN-4412)', driver: 'Ganesh Shinde', status: 'In Transit', time: '09:15 AM', occupants: '14/16', type: 'Daily Pickup' },
  { id: 'TRP-8923', route: 'Mumbai T2 -> Bandra Kurla Complex', vehicle: 'BMW 5 Series (MH01-DE-1008)', driver: 'Vikram Joshi', status: 'Completed', time: '10:00 AM', occupants: '1/3', type: 'VIP Executive' },
  { id: 'TRP-8924', route: 'Vashi Station -> Mindspace Airoli', vehicle: 'BharatBenz Coach (MH46-AL-7800)', driver: 'Ramesh Patil', status: 'Completed', time: '08:30 AM', occupants: '32/34', type: 'Shuttle' },
  { id: 'TRP-8925', route: 'Airoli -> Goregaon East Hub', vehicle: 'Maruti Ertiga (MH03-CP-3312)', driver: 'Pravin Rane', status: 'Scheduled', time: '06:30 PM', occupants: '5/6', type: 'Evening Drop' },
  { id: 'TRP-8926', route: 'Magarpatta -> Pune Airport (PNQ)', vehicle: 'Prime Sedan (MH12-TY-8844)', driver: 'Kailas Jadhav', status: 'Scheduled', time: '07:15 PM', occupants: '2/4', type: 'Airport Drop' }
];

export const initialBookings = [
  {
    id: 'BK-77492',
    service: 'Outstation Cab Booking',
    from: 'Mumbai (Andheri East)',
    to: 'Pune (Koregaon Park)',
    date: '2026-11-05',
    time: '07:30 AM',
    passengers: 3,
    vehicle: 'Executive SUV - Innova Crysta',
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
    from: 'Mumbai Airport T2 (Terminal 2)',
    to: 'Colaba, South Mumbai',
    date: '2026-11-03',
    time: '11:15 PM',
    passengers: 2,
    vehicle: 'Luxury Prestige Sedan - Mercedes E-Class',
    fare: '₹3,450',
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
    to: 'Lonavala (Villa Retreat)',
    date: '2026-10-24',
    time: '09:00 AM',
    passengers: 14,
    vehicle: 'Luxury Tempo Traveller 17-Seater',
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
    question: 'How do I book a cab or bus on AeroVoyage?',
    answer: 'Simply select your desired service (Local, Outstation, Airport, Mini Bus, Train, or ST Bus) on our homepage or service page. Enter pickup, destination, travel date, time, and passenger count. Choose your preferred vehicle model and click "Book Your Ride" to immediately receive your demo booking confirmation.'
  },
  {
    question: 'Are toll charges, state taxes, and driver allowance included in Outstation fares?',
    answer: 'Yes! AeroVoyage adheres to a strict 100% transparent pricing policy. On all standard outstation round trips and drops, standard toll estimates and chauffeur allowances are clearly displayed beforehand with zero hidden surprises.'
  },
  {
    question: 'What happens if my flight is delayed for an Airport Pickup?',
    answer: 'We provide automated live flight tracking. Your chauffeur monitors your flight number and automatically adjusts arrival timing. You also receive 45 minutes of complimentary wait time after your flight touches down.'
  },
  {
    question: 'How does Corporate Transportation Management work for enterprises?',
    answer: 'Enterprises get access to our dedicated Corporate Mobility portal. We provide dedicated vehicle fleets, dynamic GPS routing, automated roster management, employee SOS emergency features, and consolidated monthly GST invoicing with full SLA compliance.'
  },
  {
    question: 'Can I book Maharashtra ST Bus (MSRTC) and Indian Railway tickets here?',
    answer: 'Yes. AeroVoyage provides integrated interfaces for Maharashtra State Transport (Shivneri Volvo, Shivshahi, AC Sleeper) as well as IRCTC train ticket reservation assistance with tatkal tracking and live seat availability.'
  },
  {
    question: 'What safety standards and sanitization protocols are maintained?',
    answer: 'All our chauffeurs undergo mandatory criminal background checks, defensive driving certifications, and regular health assessments. Vehicles are deep-sanitized before every journey, equipped with GPS panic triggers and first-aid kits.'
  }
];
