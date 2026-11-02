import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Car, 
  Bus, 
  Train, 
  Plane, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CalendarCheck,
  Pause,
  Play
} from 'lucide-react';

export const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Mumbai Coastal Gateway',
    icon: MapPin,
    title: 'Mumbai City Skyline & Bandra-Worli Sea Link',
    subtitle: 'Experience seamless transfers across Mumbai, Marine Drive, Nariman Point and Bandra-Worli Sea Link with dedicated executive chauffeurs.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Mumbai Cab', path: '/book?service=local-taxi' },
    ctaSecondary: { label: 'Airport Transfers', path: '/services/airport-transfers' },
    highlight: 'Chauffeur pickup across Mumbai & Navi Mumbai with zero surge'
  },
  {
    id: 2,
    tag: 'Expressway Chauffeurs',
    icon: Car,
    title: 'Tata & Mahindra Fleet on Mumbai–Pune Expressway',
    subtitle: 'Tata Nexon, Mahindra XUV700, Scorpio-N and Toyota Innova Crysta with verified highway captains on Maharashtra’s premier expressways.',
    image: 'https://images.unsplash.com/photo-1571501679680-de32f1e7a412?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Outstation Cab', path: '/book?service=outstation-one-way' },
    ctaSecondary: { label: 'Explore Fleet', path: '#services-section' },
    highlight: 'Mumbai ↔ Pune via Expressway in 2h 45m with zero surge'
  },
  {
    id: 3,
    tag: 'Confirmed Rail Reservations',
    icon: Train,
    title: 'Vande Bharat Express & Indian Railways Fastlane',
    subtitle: 'Confirmed train berths, Vande Bharat, Rajdhani, Tejas and Shatabdi express schedules with live Tatkal seat telemetry.',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Search Train Tickets', path: '/railway' },
    ctaSecondary: { label: 'Check PNR Status Demo', path: '/railway/pnr-status' },
    highlight: '10,000+ Indian Railway routes with instant Tatkal assist'
  },
  {
    id: 4,
    tag: 'MSRTC State Transport',
    icon: Bus,
    title: 'MSRTC Shivneri Volvo & Intercity Luxury Buses',
    subtitle: 'Glide across Maharashtra and Goa in official MSRTC Shivneri Volvo AC buses, Shivshahi coaches, and multi-axle luxury tourist charters.',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book MSRTC Shivneri', path: '/msrtc' },
    ctaSecondary: { label: 'Charter Luxury Coach', path: '/services/luxury-bus' },
    highlight: 'Air-suspension glide with Wi-Fi, pushback recliners & GPS'
  },
  {
    id: 5,
    tag: 'Goa Coastal Highway',
    icon: MapPin,
    title: 'Scenic Goa Coastal Roads & NH-66 Konkan Drives',
    subtitle: 'Cruise along sun-kissed beaches, heritage Latin quarters, and picturesque coastal coconut avenues in comfortable air-conditioned cabs.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Goa Road Trip', path: '/book?service=outstation-round-trip' },
    ctaSecondary: { label: 'Explore Destinations', path: '#destinations-section' },
    highlight: 'Mumbai & Pune to Goa round-trips with scenic Konkan halts'
  },
  {
    id: 6,
    tag: 'Western Ghats Escapes',
    icon: MapPin,
    title: 'Misty Western Ghats: Mahabaleshwar, Panchgani & Lonavala',
    subtitle: 'Experience Tiger Point, Arthur Seat panoramas, strawberry valleys, and tranquil Western Ghat hill stations with hill-certified drivers.',
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Explore Hill Station Trips', path: '/book?service=outstation-round-trip' },
    ctaSecondary: { label: 'View Destinations', path: '#destinations-section' },
    highlight: 'Weekend getaways to Mahabaleshwar, Panchgani & Lonavala'
  },
  {
    id: 7,
    tag: 'Royal Rajasthan Heritage',
    icon: MapPin,
    title: 'Rajasthan Heritage: Jaipur, Udaipur & Jodhpur',
    subtitle: 'Journey through the majestic palaces of Jaipur, Lake Pichola in Udaipur, and Mehrangarh Fort with curated royal heritage itineraries.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Heritage Tour', path: '/book?service=outstation-round-trip' },
    ctaSecondary: { label: 'Group Transportation', path: '/services/group-travel' },
    highlight: 'Golden Triangle & royal Rajasthani palace tours'
  },
  {
    id: 8,
    tag: 'God’s Own Country',
    icon: MapPin,
    title: 'Kerala Scenic Roads, Munnar Tea Valleys & Backwaters',
    subtitle: 'Traverse the mist-laden tea plantations of Munnar, serene Alleppey backwaters, and pristine coastal Malabar routes in luxury.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Explore Kerala Packages', path: '/book?service=outstation-round-trip' },
    ctaSecondary: { label: 'NCMC Transit Card', path: '/ncmc' },
    highlight: 'Munnar hill drives, Alleppey houseboats & Kochi airport sync'
  }
];

export const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;

  // 5-second automatic slideshow
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [isPaused, totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const slide = HERO_SLIDES[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div 
      className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] overflow-hidden rounded-3xl shadow-2xl border border-[#E5EDF5]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Crossfade & Ken Burns Zoom */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center animate-kenburns"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1571501679680-de32f1e7a412?auto=format&fit=crop&w=2200&q=85';
            }}
          />

          {/* Cinematic Light Gradient & Dark Translucent Readability Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2844]/85 via-[#0F2844]/65 to-black/30 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2844]/90 via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between py-10 sm:py-14">
        
        {/* Top Highlight Badge */}
        <div className="flex items-center justify-between">
          <motion.div
            key={`tag-${slide.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold shadow-sm"
          >
            <IconComponent className="w-3.5 h-3.5 text-[#3898D8]" />
            <span>{slide.tag}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#19A89A] animate-pulse"></span>
          </motion.div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white text-[11px] font-medium backdrop-blur-md transition-colors"
            title={isPaused ? "Resume Autoplay" : "Pause Slideshow"}
          >
            {isPaused ? <Play className="w-3 h-3 text-[#3898D8]" /> : <Pause className="w-3 h-3 text-slate-300" />}
            <span>{isPaused ? "Paused" : "Auto (5s)"}</span>
          </button>
        </div>

        {/* Center Main Text */}
        <div className="max-w-3xl space-y-4 my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-block px-3 py-1 rounded-lg bg-[#3898D8]/30 text-[#DCEEFF] text-xs font-semibold tracking-wide border border-[#3898D8]/40">
                ✦ {slide.highlight}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link
                  to={slide.ctaPrimary.path}
                  className="px-6 py-3.5 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm shadow-lg shadow-[#3898D8]/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
                >
                  <span>{slide.ctaPrimary.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to={slide.ctaSecondary.path}
                  className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md border border-white/30 transition-all flex items-center gap-2"
                >
                  <span>{slide.ctaSecondary.label}</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Indicators & Arrows */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          {/* Indicators */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((s, index) => {
              const active = index === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    active 
                      ? 'w-8 h-2.5 bg-[#3898D8] shadow-sm' 
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
            <span className="text-xs font-mono text-white/70 ml-2">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
