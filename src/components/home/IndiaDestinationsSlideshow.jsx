import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Star, 
  Calendar, 
  Clock, 
  Sparkles, 
  Compass, 
  Heart,
  Plane,
  Car,
  CheckCircle2,
  Pause,
  Play
} from 'lucide-react';

export const INDIA_POPULAR_PLACES = [
  {
    id: 'agra-taj-mahal',
    name: 'Taj Mahal & Agra Fort',
    state: 'Uttar Pradesh',
    category: 'Heritage & Forts',
    tagline: 'UNESCO Wonder of the World • Symbol of Eternal Love',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'Oct – Mar',
    idealDays: '2 Days Tour',
    startingFare: '₹2,499',
    rating: 4.9,
    reviews: '12.4k',
    highlights: ['Marble Inlay Craft', 'Mehtab Bagh Sunset', 'Fatehpur Sikri', 'Yamuna River View'],
    tourType: 'Same-day Express Cab / Weekend Package'
  },
  {
    id: 'jaipur-pink-city',
    name: 'Jaipur – The Royal Pink City',
    state: 'Rajasthan',
    category: 'Heritage & Forts',
    tagline: 'Hawa Mahal, Royal Amer Fort & Grand Palaces',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'Nov – Mar',
    idealDays: '3 Days Tour',
    startingFare: '₹3,899',
    rating: 4.8,
    reviews: '9.8k',
    highlights: ['Hawa Mahal Facade', 'Amer Fort Elephant Ride', 'City Palace Museum', 'Chokhi Dhani Dinner'],
    tourType: 'Heritage Chauffeur Tour'
  },
  {
    id: 'kerala-backwaters',
    name: 'Alleppey & Kumarakom Backwaters',
    state: 'Kerala',
    category: 'Coastal & Beaches',
    tagline: 'God’s Own Country • Luxury Houseboat Cruises',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'Sep – Mar',
    idealDays: '4 Days Tour',
    startingFare: '₹4,499',
    rating: 4.9,
    reviews: '14.1k',
    highlights: ['Traditional Houseboats', 'Ayurvedic Retreats', 'Vembanad Lake Sunset', 'Spicy Coastal Cuisine'],
    tourType: 'Airport Sync + Houseboat Package'
  },
  {
    id: 'kashmir-srinagar',
    name: 'Srinagar & Gulmarg Paradise',
    state: 'Jammu & Kashmir',
    category: 'Mountains & Lakes',
    tagline: 'Dal Lake Shikaras, Snow Peaks & Gondola Rides',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'All Seasons',
    idealDays: '5 Days Tour',
    startingFare: '₹5,999',
    rating: 4.9,
    reviews: '16.5k',
    highlights: ['Dal Lake Houseboats', 'Gulmarg Cable Car', 'Mughal Nishat Bagh', 'Snowy Apharwat Peak'],
    tourType: '4x4 Heated SUV Mountain Tour'
  },
  {
    id: 'varanasi-kashi',
    name: 'Varanasi – Ancient Kashi Ghats',
    state: 'Uttar Pradesh',
    category: 'Spiritual',
    tagline: 'Sacred Ganga Evening Aarti & Kashi Vishwanath Corridor',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'Oct – Mar',
    idealDays: '2-3 Days Tour',
    startingFare: '₹2,799',
    rating: 4.9,
    reviews: '18.2k',
    highlights: ['Grand Maha Aarti', 'Sunrise Boat Ride', 'Kashi Vishwanath Temple', 'Sarnath Buddhist Stupa'],
    tourType: 'Pilgrimage Chauffeur Transfer'
  },
  {
    id: 'ladakh-pangong',
    name: 'Pangong Tso & Leh High Passes',
    state: 'Ladakh',
    category: 'Mountains & Lakes',
    tagline: 'Changing Azure Waters, Khardung La & Monasteries',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'May – Sep',
    idealDays: '6 Days Tour',
    startingFare: '₹7,499',
    rating: 4.9,
    reviews: '8.3k',
    highlights: ['Pangong Lake Reflections', 'Khardung La (17,582 ft)', 'Nubra Valley Dunes', 'Thiksey Monastery'],
    tourType: 'High-Altitude SUV Expedition'
  },
  {
    id: 'goa-coast',
    name: 'Goa Coastal Beaches & Old Goa',
    state: 'Goa',
    category: 'Coastal & Beaches',
    tagline: 'Golden Sands, Latin Quarter & Water Sports',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'Oct – May',
    idealDays: '3-4 Days Tour',
    startingFare: '₹2,999',
    rating: 4.8,
    reviews: '22.1k',
    highlights: ['Calangute & Palolem', 'Basilica of Bom Jesus', 'Mandovi River Cruise', 'Dudhsagar Waterfalls'],
    tourType: 'Intercity Highway Cab / Ro-Ro'
  },
  {
    id: 'mumbai-marine-drive',
    name: 'Mumbai – Marine Drive & Gateway',
    state: 'Maharashtra',
    category: 'Coastal & Beaches',
    tagline: 'Queen’s Necklace, Coastal Road & Heritage Victoria',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'All Year',
    idealDays: '1-2 Days Tour',
    startingFare: '₹1,499',
    rating: 4.8,
    reviews: '30.4k',
    highlights: ['Gateway of India', 'Marine Drive Promenade', 'Bandra-Worli Sea Link', 'Elephanta Island Caves'],
    tourType: '24x7 Urban City & Airport Cabs'
  },
  {
    id: 'amritsar-golden-temple',
    name: 'Amritsar – The Golden Temple',
    state: 'Punjab',
    category: 'Spiritual',
    tagline: 'Sri Harmandir Sahib & Wagah Border Retreat',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'Oct – Mar',
    idealDays: '2 Days Tour',
    startingFare: '₹2,299',
    rating: 4.9,
    reviews: '15.6k',
    highlights: ['Golden Temple Sanctum', 'Langar Experience', 'Wagah Border Parade', 'Jallianwala Bagh Memorial'],
    tourType: 'Deluxe Cab & Highway Transfer'
  },
  {
    id: 'udaipur-city-of-lakes',
    name: 'Udaipur – The City of Lakes',
    state: 'Rajasthan',
    category: 'Heritage & Forts',
    tagline: 'Lake Pichola, Royal City Palace & Jag Mandir',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    bestTime: 'Oct – Mar',
    idealDays: '3 Days Tour',
    startingFare: '₹3,599',
    rating: 4.8,
    reviews: '11.2k',
    highlights: ['Lake Pichola Boat Cruise', 'City Palace Architecture', 'Saheliyon Ki Bari', 'Monsoon Palace Sunset'],
    tourType: 'Royal Rajasthan Touring Cab'
  }
];

export const IndiaDestinationsSlideshow = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const categories = ['All', 'Heritage & Forts', 'Mountains & Lakes', 'Coastal & Beaches', 'Spiritual'];

  const filteredPlaces = activeCategory === 'All' 
    ? INDIA_POPULAR_PLACES 
    : INDIA_POPULAR_PLACES.filter(p => p.category === activeCategory);

  const total = filteredPlaces.length;

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + total) % total);
  };

  const currentPlace = filteredPlaces[currentIndex] || filteredPlaces[0];

  const handleBookPlace = (place) => {
    navigate(`/book?service=outstation-round-trip&drop=${encodeURIComponent(place.name.split('–')[0].trim())}`);
  };

  return (
    <section id="popular-india-slideshow" className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#F8FAFC] border-b border-[#E5EDF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEEFF] text-[#3898D8] text-xs font-bold border border-[#3898D8]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#19A89A]" />
              <span>Incredible India • Top Iconic Attractions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#153B5B] font-display tracking-tight">
              Most Popular Places in India
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Discover India's most celebrated heritage palaces, misty Himalayan valleys, sacred river ghats, and tropical backwaters with guaranteed chauffeur packages.
            </p>
          </div>

          {/* Autoplay toggle and Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E5EDF5] hover:border-[#3898D8] text-[#153B5B] text-xs font-bold shadow-2xs transition-all"
              title={isPaused ? "Resume Autoplay" : "Pause Slideshow"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#3898D8]" /> : <Pause className="w-3.5 h-3.5 text-[#19A89A]" />}
              <span>{isPaused ? "Play" : "Auto-Slide"}</span>
            </button>

            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white border border-[#E5EDF5] hover:border-[#3898D8] text-[#153B5B] flex items-center justify-center hover:bg-[#EFF7FC] shadow-2xs transition-all active:scale-95"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-[#3898D8] text-white flex items-center justify-center hover:bg-[#287DB8] shadow-sm transition-all active:scale-95"
              aria-label="Next destination"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#153B5B] text-white shadow-sm'
                  : 'bg-white border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B] hover:border-[#CBD5E1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Big Showcase Card (Active Slide) */}
        {currentPlace && (
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5EDF5] shadow-xl grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            
            {/* Left Image Showcase with Smooth Animated Transition */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full overflow-hidden bg-slate-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlace.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1.0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentPlace.image}
                    alt={currentPlace.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Pill on Image */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/25 text-white text-xs font-black shadow-md flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#19A89A]" />
                  <span>{currentPlace.state}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#3898D8] text-white text-xs font-bold shadow-md">
                  {currentPlace.category}
                </span>
              </div>

              {/* Bottom Image Rating & Place Tag */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{currentPlace.rating}</span>
                  <span className="text-slate-300">({currentPlace.reviews} reviews)</span>
                </div>
                <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-slate-200 font-medium">
                  {currentPlace.tourType}
                </div>
              </div>
            </div>

            {/* Right Information & Booking Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5EDF5] pb-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#3898D8] font-bold">
                    <Compass className="w-4 h-4" />
                    <span>Popular Route #{currentIndex + 1} of {total}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentPlace.idealDays}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display tracking-tight leading-tight">
                    {currentPlace.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#19A89A] mt-1">
                    {currentPlace.tagline}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                    Key Highlights &amp; Sightseeing
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {currentPlace.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-[#153B5B] bg-[#EFF7FC] p-2 rounded-xl border border-[#DCEEFF] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel Specs */}
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">Best Time to Visit</span>
                    <span className="font-bold text-[#153B5B]">{currentPlace.bestTime}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">Starting Tariff</span>
                    <span className="text-lg font-black text-[#3898D8] font-mono">{currentPlace.startingFare}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookPlace(currentPlace)}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Car className="w-4 h-4" />
                  <span>Book Cab / Tour to {currentPlace.name.split('–')[0].split('&')[0].trim()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/flights')}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#DCEEFF] transition-colors"
                  title="Check flight options"
                >
                  <Plane className="w-4 h-4" />
                  <span>Flights</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Thumbnail Navigation Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {filteredPlaces.slice(0, 5).map((place, index) => {
            const isSelected = index === currentIndex;
            return (
              <button
                key={place.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`text-left p-2.5 rounded-2xl border transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-white border-2 border-[#3898D8] shadow-md ring-2 ring-[#3898D8]/20'
                    : 'bg-white/80 border-[#E5EDF5] hover:border-[#CBD5E1] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#153B5B] truncate">{place.name.split('–')[0]}</div>
                  <div className="text-[10px] text-[#64748B] truncate">{place.state}</div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
