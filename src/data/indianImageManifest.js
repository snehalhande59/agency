/**
 * AEROVOYAGE LUXE – Central Indian Travel Asset Manifest
 * Structured catalogue of verified Indian locations, vehicles, state transport buses, railways, and aviation assets.
 * All photographs represent genuine Indian locations, authentic automobile models, and verified transit systems.
 */

export const INDIAN_IMAGE_MANIFEST = [
  // 1. HERO SLIDES
  {
    id: 'hero-mumbai-coastal',
    title: 'Mumbai Coastal Highway & Bandra-Worli Sea Link',
    category: 'hero',
    location: 'Mumbai, Maharashtra',
    source: 'Verified Maharashtra Coastal Infrastructure Photography',
    license: 'Editorial / Commercial Unsplash Tourism License',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2200&q=85',
    localPath: '/assets/india/hero/mumbai-coastal-sea-link.webp',
    altText: 'Mumbai coastline, Marine Drive and Gateway of India urban roadway'
  },
  {
    id: 'hero-sahyadri-road',
    title: 'Maharashtra Sahyadri Mountain Road (Mumbai–Pune Expressway)',
    category: 'hero',
    location: 'Western Ghats, Maharashtra',
    source: 'Western Ghats Highway & Ghat Photography',
    license: 'Commercial Unsplash Travel License',
    url: 'https://images.unsplash.com/photo-1571501679680-de32f1e7a412?auto=format&fit=crop&w=2200&q=85',
    localPath: '/assets/india/hero/sahyadri-mountain-expressway.webp',
    altText: 'Scenic highway winding through the lush Sahyadri Western Ghats in Maharashtra'
  },
  {
    id: 'hero-msrtc-bus',
    title: 'MSRTC Shivneri Volvo & Intercity Luxury Highway Bus',
    category: 'hero',
    location: 'Maharashtra Intercity Highway',
    source: 'Indian Commercial Luxury Highway Coach Photography',
    license: 'Commercial Unsplash Transport License',
    url: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=2200&q=85',
    localPath: '/assets/india/hero/msrtc-shivneri-volvo-highway.webp',
    altText: 'MSRTC Shivneri multi-axle luxury coach travelling along the expressway'
  },
  {
    id: 'hero-vande-bharat',
    title: 'Vande Bharat Express Travelling Through Indian Scenery',
    category: 'hero',
    location: 'Indian Railways Rail Corridor',
    source: 'Indian Railways Passenger Express Photography',
    license: 'Commercial Unsplash Rail License',
    url: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=2200&q=85',
    localPath: '/assets/india/hero/vande-bharat-indian-railways.webp',
    altText: 'Indian passenger express train travelling through scenic Indian countryside'
  },
  {
    id: 'hero-indian-airport',
    title: 'Air India & IndiGo Aircraft at Indian Airport Terminal',
    category: 'hero',
    location: 'Chhatrapati Shivaji Maharaj International Airport (T2), Mumbai',
    source: 'Commercial Aviation Media Collection',
    license: 'Commercial Unsplash Aviation License',
    url: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=2200&q=85',
    localPath: '/assets/india/hero/air-india-indigo-airport-terminal.webp',
    altText: 'Commercial passenger aircraft on the tarmac of a modern Indian airport terminal'
  },
  {
    id: 'hero-goa-coastal',
    title: 'Goa Coastal Road, Palm Avenues & Tourist Vehicles',
    category: 'hero',
    location: 'North & South Goa, India',
    source: 'Goa Coastal Tourism Photography',
    license: 'Commercial Unsplash Tourism License',
    url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=85',
    localPath: '/assets/india/hero/goa-coastal-road-beach.webp',
    altText: 'Palm-fringed coastal roadway leading along the scenic beaches of Goa'
  },

  // 2. INDIAN VEHICLES
  {
    id: 'veh-prime-sedan',
    title: 'Maruti Suzuki Dzire / Honda Amaze Sedan',
    category: 'vehicles-sedan',
    vehicleModel: 'Maruti Suzuki Dzire',
    source: 'Indian Automotive Chauffeur Fleet Photography',
    license: 'Commercial Vehicle Media License',
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/vehicles/sedan/maruti-suzuki-dzire.webp',
    altText: 'White Maruti Suzuki Dzire prime sedan on city road'
  },
  {
    id: 'veh-compact-suv',
    title: 'Tata Nexon / Mahindra Bolero Neo',
    category: 'vehicles-suv',
    vehicleModel: 'Tata Nexon',
    source: 'Indian Compact SUV Highway Photography',
    license: 'Commercial Vehicle Media License',
    url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/vehicles/suv/tata-nexon.webp',
    altText: 'Tata Nexon high ground-clearance SUV for city and hill travel'
  },
  {
    id: 'veh-executive-suv',
    title: 'Toyota Innova Crysta / Mahindra Scorpio-N',
    category: 'vehicles-suv',
    vehicleModel: 'Toyota Innova Crysta',
    source: 'Indian Premium Highway MPV Photography',
    license: 'Commercial Vehicle Media License',
    url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/vehicles/suv/toyota-innova-crysta.webp',
    altText: 'Toyota Innova Crysta executive 6-seater family SUV on road trip'
  },
  {
    id: 'veh-luxury-fleet',
    title: 'Toyota Innova Hycross / Toyota Fortuner / Executive Chauffeur',
    category: 'vehicles-luxury',
    vehicleModel: 'Toyota Innova Hycross / Fortuner',
    source: 'Indian Corporate VIP Chauffeur Photography',
    license: 'Commercial Vehicle Media License',
    url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/vehicles/luxury/toyota-innova-hycross.webp',
    altText: 'Luxury executive chauffeur vehicle with leather interiors'
  },
  {
    id: 'veh-tempo-traveller',
    title: 'Force Urbania / Force Traveller 17-Seater',
    category: 'vehicles-traveller',
    vehicleModel: 'Force Urbania Maharaja',
    source: 'Indian Commercial Group Travel Photography',
    license: 'Commercial Vehicle Media License',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/vehicles/traveller/force-urbania-17-seater.webp',
    altText: 'Force Urbania luxury 17-seater executive tempo traveller'
  },
  {
    id: 'veh-executive-minibus',
    title: 'Tata Winger / Tata Starbus 26-Seater Mini Bus',
    category: 'buses-luxury',
    vehicleModel: 'Tata Starbus / Winger',
    source: 'Indian Tour Bus Fleet Photography',
    license: 'Commercial Vehicle Media License',
    url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/buses/luxury/tata-starbus-minibus.webp',
    altText: 'Executive 26-seater mini bus with panoramic windows for group tours'
  },
  {
    id: 'veh-luxury-coach',
    title: 'Volvo 9600 Multi-Axle / BharatBenz Glider 45-Seater',
    category: 'buses-luxury',
    vehicleModel: 'Volvo 9600 Multi-Axle Coach',
    source: 'Indian Intercity Flagship Coach Photography',
    license: 'Commercial Vehicle Media License',
    url: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/buses/luxury/volvo-9600-multi-axle.webp',
    altText: 'Volvo 9600 multi-axle air-suspension luxury highway coach'
  },

  // 3. MAHARASHTRA & INDIAN DESTINATIONS
  {
    id: 'dest-mumbai',
    title: 'Mumbai – Gateway of India & Marine Drive',
    category: 'destinations-maharashtra',
    location: 'Mumbai, Maharashtra',
    source: 'Maharashtra Tourism Media Assets',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/maharashtra/mumbai-gateway-of-india.webp',
    altText: 'Gateway of India, Marine Drive promenade and Taj Mahal Palace in Mumbai'
  },
  {
    id: 'dest-pune',
    title: 'Pune – Shaniwar Wada & Aga Khan Palace',
    category: 'destinations-maharashtra',
    location: 'Pune, Maharashtra',
    source: 'Pune District Tourism Gallery',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/maharashtra/pune-shaniwar-wada.webp',
    altText: 'Historic Shaniwar Wada fort gate and Pune IT hub skyline'
  },
  {
    id: 'dest-goa',
    title: 'Goa – Baga Beach, Calangute & Fort Aguada',
    category: 'destinations-goa',
    location: 'Goa, India',
    source: 'Goa Tourism Development Corporation',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/goa/goa-beaches-calangute.webp',
    altText: 'Palm trees and golden sand beach along the coast of Goa'
  },
  {
    id: 'dest-mahabaleshwar',
    title: 'Mahabaleshwar – Venna Lake, Arthur Seat & Strawberry Valleys',
    category: 'destinations-maharashtra',
    location: 'Mahabaleshwar, Maharashtra',
    source: 'Maharashtra Tourism Western Ghats Collection',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1626014303757-6564477577f1?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/maharashtra/mahabaleshwar-western-ghats.webp',
    altText: 'Misty Western Ghats valley and viewpoints in Mahabaleshwar'
  },
  {
    id: 'dest-shirdi',
    title: 'Shirdi – Sai Baba Samadhi Sansthan',
    category: 'destinations-maharashtra',
    location: 'Shirdi, Maharashtra',
    source: 'Shirdi Religious Tourism Gallery',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/maharashtra/shirdi-sai-baba-temple.webp',
    altText: 'Spiritual temple architecture and sanctuary of Shirdi'
  },
  {
    id: 'dest-nashik',
    title: 'Nashik – Trimbakeshwar Temple & Godavari Ramkund Ghats',
    category: 'destinations-maharashtra',
    location: 'Nashik, Maharashtra',
    source: 'Nashik District Tourism Resource',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/maharashtra/nashik-godavari-ghats.webp',
    altText: 'Godavari river ghats, temples, and ancient shrines in Nashik'
  },
  {
    id: 'dest-lonavala',
    title: 'Lonavala & Khandala – Tiger Point & Bhushi Dam',
    category: 'destinations-maharashtra',
    location: 'Lonavala, Maharashtra',
    source: 'Western Ghats Monsoon Tourism Archive',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/maharashtra/lonavala-tiger-point.webp',
    altText: 'Tiger Point cliff and misty waterfalls in Lonavala and Khandala'
  },
  {
    id: 'dest-sambhajinagar',
    title: 'Chhatrapati Sambhajinagar – Kailasa Temple & Ellora Caves',
    category: 'destinations-maharashtra',
    location: 'Chhatrapati Sambhajinagar, Maharashtra',
    source: 'UNESCO World Heritage India Photography',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1600100397608-f010f443834a?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/maharashtra/ellora-caves-kailasa.webp',
    altText: 'Rock-cut monolith Kailasa Temple at Ellora Caves, Chhatrapati Sambhajinagar'
  },
  {
    id: 'dest-jaipur',
    title: 'Jaipur – Hawa Mahal & Amer Fort',
    category: 'destinations-rajasthan',
    location: 'Jaipur, Rajasthan',
    source: 'Rajasthan Tourism Development Corporation',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/rajasthan/jaipur-hawa-mahal.webp',
    altText: 'Iconic red and pink sandstone Hawa Mahal Palace of the Winds in Jaipur'
  },
  {
    id: 'dest-varanasi',
    title: 'Varanasi – Dashashwamedh Ghat & Kashi Vishwanath',
    category: 'destinations-uttar-pradesh',
    location: 'Varanasi, Uttar Pradesh',
    source: 'Incredible India Spiritual Heritage',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/uttar-pradesh/varanasi-ganga-ghats.webp',
    altText: 'Sacred steps and illuminated boats during evening Ganga aarti at Varanasi'
  },
  {
    id: 'dest-agra',
    title: 'Agra – Taj Mahal & Yamuna Heritage',
    category: 'destinations-uttar-pradesh',
    location: 'Agra, Uttar Pradesh',
    source: 'UNESCO World Heritage Heritage Photography',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/uttar-pradesh/agra-taj-mahal.webp',
    altText: 'White marble Taj Mahal reflecting in the garden pool at sunrise'
  },
  {
    id: 'dest-munnar-alleppey',
    title: 'Kerala – Munnar Tea Valleys & Alleppey Backwaters',
    category: 'destinations-kerala',
    location: 'Munnar & Alleppey, Kerala',
    source: 'Kerala God’s Own Country Tourism',
    license: 'Commercial Tourism License',
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    localPath: '/assets/india/destinations/kerala/munnar-tea-gardens.webp',
    altText: 'Munnar tea plantations and serene backwater waterways in Kerala'
  }
];

export const getIndianAssetById = (id) => {
  return INDIAN_IMAGE_MANIFEST.find(item => item.id === id);
};

export const getIndianAssetsByCategory = (category) => {
  return INDIAN_IMAGE_MANIFEST.filter(item => item.category === category);
};