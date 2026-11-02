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
  Pause,
  Play
} from 'lucide-react';

export const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Mumbai Coastal Highway',
    icon: MapPin,
    title: 'Mumbai Coastal Highway & Bandra-Worli Sea Link',
    subtitle: 'Chauffeured sedan and SUV transfers across Marine Drive, Nariman Point, and Bandra-Worli Sea Link in Maruti Dzire, Ertiga and Innova Crysta.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Mumbai Cab', path: '/book?service=local-taxi' },
    ctaSecondary: { label: 'Airport Transfers', path: '/services/airport-transfers' },
    highlight: 'Executive chauffeur transfers with zero surge'
  },
  {
    id: 2,
    tag: 'Sahyadri Mountain Expressway',
    icon: Car,
    title: 'Maharashtra Sahyadri Road: Mumbai–Pune Expressway',
    subtitle: 'Travel through the misty Western Ghats, Kasara Ghat, and Lonavala with Tata Safari, Mahindra Scorpio-N, and Toyota Innova Hycross.',
    image: 'https://images.unsplash.com/photo-1571501679680-de32f1e7a412?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Outstation Cab', path: '/book?service=outstation-one-way' },
    ctaSecondary: { label: 'Explore Fleet', path: '#services-section' },
    highlight: 'Mumbai ↔ Pune in 2h 45m with verified highway captains'
  },
  {
    id: 3,
    tag: 'MSRTC State Transport',
    icon: Bus,
    title: 'MSRTC Shivneri Volvo & Intercity Highway Luxury Buses',
    subtitle: 'Glide across Maharashtra and Goa in official MSRTC Shivneri Volvo AC buses, Shivshahi coaches, and multi-axle luxury tourist charters.',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book MSRTC Shivneri', path: '/msrtc' },
    ctaSecondary: { label: 'Charter Luxury Coach', path: '/services/luxury-bus' },
    highlight: 'Air-suspension glide with Wi-Fi, pushback recliners & GPS'
  },
  {
    id: 4,
    tag: 'Indian Railways Fastlane',
    icon: Train,
    title: 'Vande Bharat Express Travelling Through Indian Scenery',
    subtitle: 'Confirmed train berths, Vande Bharat, Rajdhani, Tejas and Shatabdi express schedules with live Tatkal seat telemetry.',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Search Train Tickets', path: '/railway' },
    ctaSecondary: { label: 'Check PNR Status Demo', path: '/railway/pnr-status' },
    highlight: '10,000+ Indian Railway routes with instant Tatkal assist'
  },
  {
    id: 5,
    tag: 'Airport Terminal Concierge',
    icon: Plane,
    title: 'Air India & IndiGo Flight Transfer: Mumbai T2, Pune & Delhi',
    subtitle: 'Synchronized with Air India, IndiGo and Akasa flights. Chauffeur meet & greet, luggage porter assistance and guaranteed fixed flat tariffs.',
    image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Airport Transfer', path: '/book?service=airport-pickup' },
    ctaSecondary: { label: 'Corporate Commute', path: '/corporate' },
    highlight: 'Complimentary 45m flight delay buffer for domestic & intl arrivals'
  },
  {
    id: 6,
    tag: 'Goa Coastal Highway',
    icon: MapPin,
    title: 'Goa Coastal Roads, NH-66 Konkan & Tourist Vehicles',
    subtitle: 'Cruise along sun-kissed beaches, heritage Latin quarters, and picturesque coastal palm avenues in comfortable air-conditioned cabs.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Goa Road Trip', path: '/book?service=outstation-round-trip' },
    ctaSecondary: { label: 'Explore Destinations', path: '#destinations-section' },
    highlight: 'Mumbai & Pune to Goa round-trips with scenic Konkan halts'
  }
];

export const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5500);

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
      {/* Background Photographs with Ken Burns & Smooth Crossfade */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1571501679680-de32f1e7a412?auto=format&fit=crop&w=2200&q=85';
            }}
          />

          {/* Balanced High-Contrast Gradient Scrim: Deep on the text side, clear and vivid on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between pt-8 sm:pt-12 pb-24 sm:pb-28">
        
        {/* Top Bar: Tag Badge & Controls */}
        <div className="flex items-center justify-between">
          <motion.div
            key={`tag-${slide.id}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-black shadow-lg"
          >
            <div className="w-5 h-5 rounded-full bg-[#3898D8] flex items-center justify-center text-white shadow-xs">
              <IconComponent className="w-3 h-3" />
            </div>
            <span className="tracking-wide uppercase font-bold text-[11px] text-white">{slide.tag}</span>
            <span className="w-2 h-2 rounded-full bg-[#19A89A] animate-pulse" />
          </motion.div>

          {/* Autoplay & Arrows in Top-Right so they never get obscured by search bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950/80 text-white text-xs font-bold backdrop-blur-md border border-white/25 transition-all"
              title={isPaused ? "Resume Autoplay" : "Pause Slideshow"}
            >
              {isPaused ? <Play className="w-3 h-3 text-[#3898D8]" /> : <Pause className="w-3 h-3 text-[#19A89A]" />}
              <span className="hidden sm:inline">{isPaused ? "Play" : "Auto (5s)"}</span>
            </button>

            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md flex items-center justify-center border border-white/25 transition-all active:scale-95 shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md flex items-center justify-center border border-white/25 transition-all active:scale-95 shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Center Main Text with Premium High-Contrast Glass Plate */}
        <div className="max-w-3xl my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-9 rounded-3xl bg-slate-950/75 backdrop-blur-xl border border-white/25 shadow-2xl space-y-4"
            >
              {/* Highlight Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#19A89A] text-white text-xs font-black tracking-wide shadow-md">
                <span className="text-white">✦</span>
                <span>{slide.highlight}</span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] font-display drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {slide.title}
              </h1>

              {/* Subtitle with Ultra High Contrast Crisp Light Text */}
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to={slide.ctaPrimary.path}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#3898D8] to-[#19A89A] hover:from-[#287DB8] hover:to-[#148377] text-white font-black text-sm shadow-xl shadow-[#3898D8]/40 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
                >
                  <span>{slide.ctaPrimary.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to={slide.ctaSecondary.path}
                  className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm backdrop-blur-md border-2 border-white/40 hover:border-white/70 transition-all flex items-center gap-2"
                >
                  <span>{slide.ctaSecondary.label}</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Slide Dot Indicators */}
        <div className="flex items-center gap-2 pt-2">
          {HERO_SLIDES.map((s, index) => {
            const active = index === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  active 
                    ? 'w-9 h-2.5 bg-[#3898D8] shadow-md shadow-[#3898D8]/50 ring-2 ring-white/40' 
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
          <span className="text-xs font-mono font-bold text-white/90 ml-3 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
            0{currentSlide + 1} / 0{totalSlides}
          </span>
        </div>

      </div>
    </div>
  );
};
