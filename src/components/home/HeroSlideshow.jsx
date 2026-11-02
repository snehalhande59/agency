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
    tag: 'Agra, Uttar Pradesh • UNESCO World Wonder',
    icon: Sparkles,
    title: 'Taj Mahal & Agra Heritage: Symbol of Eternal Love',
    subtitle: 'Chauffeured sedan and luxury SUV packages from Delhi and Mumbai to the iconic Taj Mahal, Agra Fort, and Fatehpur Sikri with verified highway captains.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Agra Tour Cab', path: '/book?service=outstation-round-trip&drop=Agra' },
    ctaSecondary: { label: 'Explore India Tours', path: '#popular-india-slideshow' },
    highlight: 'Same-day expressway return with toll & tax transparency'
  },
  {
    id: 2,
    tag: 'Jaipur, Rajasthan • The Royal Pink City',
    icon: MapPin,
    title: 'Hawa Mahal & Amer Fort: Royal Palaces of Rajasthan',
    subtitle: 'Experience royal Rajasthani hospitality. Intercity chauffeured cabs and Tempo Travellers for Hawa Mahal, City Palace, Jal Mahal, and Nahargarh sunset tours.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Jaipur Tour', path: '/book?service=outstation-round-trip&drop=Jaipur' },
    ctaSecondary: { label: 'Browse Fleet', path: '#services-section' },
    highlight: 'Delhi & Mumbai to Jaipur express corridor in premium Innova Crysta'
  },
  {
    id: 3,
    tag: 'Alleppey & Kumarakom, Kerala • God’s Own Country',
    icon: Compass,
    title: 'Kerala Backwaters & Houseboats: Tropical Serenity',
    subtitle: 'Cruise through coconut-fringed palm lagoons, emerald canals, and serene backwater houseboats with Cochin airport pickup and drop.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Kerala Transfer', path: '/book?service=outstation-one-way&drop=Kerala' },
    ctaSecondary: { label: 'Flight + Cab Sync', path: '/flights' },
    highlight: 'Complimentary airport pickup & drop with luggage assistance'
  },
  {
    id: 4,
    tag: 'Srinagar & Gulmarg, Kashmir • Paradise on Earth',
    icon: Sparkles,
    title: 'Dal Lake & Snow Peaks: Heavenly Himalayan Escapes',
    subtitle: 'Scenic Shikara rides on Dal Lake, Mughal Gardens, and snow gondola adventures in Gulmarg and Pahalgam with heated 4x4 SUVs.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Kashmir Tour', path: '/book?service=outstation-round-trip&drop=Srinagar' },
    ctaSecondary: { label: 'Flight Booking', path: '/flights' },
    highlight: '4x4 Snow-ready fleet with verified local mountain captains'
  },
  {
    id: 5,
    tag: 'Varanasi, Uttar Pradesh • Spiritual Capital of India',
    icon: MapPin,
    title: 'Kashi Vishwanath & Sacred Ganga Aarti Ghats',
    subtitle: 'Witness the divine evening Ganga Aarti at Dashashwamedh Ghat and early dawn boat rides along sacred riverfronts with private chauffeur transfers.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Kashi Pilgrimage', path: '/book?service=outstation-one-way&drop=Varanasi' },
    ctaSecondary: { label: 'Confirmed Trains', path: '/railway' },
    highlight: 'Vande Bharat train & airport transfer connectivity'
  },
  {
    id: 6,
    tag: 'Goa Coastal Paradise • Golden Sand & Heritage',
    icon: Car,
    title: 'Goa Coastal Highways: Sun-Kissed Beaches & Latin Quarters',
    subtitle: 'Cruise along Calangute, Baga, Palolem beaches and Old Goa Portuguese cathedrals in comfortable air-conditioned cabs with zero surge.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Goa Road Trip', path: '/book?service=outstation-round-trip&drop=Goa' },
    ctaSecondary: { label: 'MSRTC Bus Option', path: '/msrtc' },
    highlight: 'Mumbai & Pune to Goa round-trips via NH-66 Konkan highway'
  },
  {
    id: 7,
    tag: 'Mumbai, Maharashtra • The City of Dreams',
    icon: MapPin,
    title: 'Marine Drive & Gateway of India: Coastal Metropolis',
    subtitle: 'Travel along the Arabian Sea coast, Bandra-Worli Sea Link, and Mumbai Coastal Road in premium chauffeured sedans and electric cabs.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Mumbai Cab', path: '/book?service=local-taxi' },
    ctaSecondary: { label: 'NCMC Transit Card', path: '/ncmc' },
    highlight: '24x7 Airport T2 and intercity expressway pickup'
  },
  {
    id: 8,
    tag: 'Pangong Tso & Leh, Ladakh • The Himalayan Crown',
    icon: Compass,
    title: 'Ladakh High Passes & Crystal Azure Pangong Lake',
    subtitle: 'Conquer Khardung La, explore ancient Buddhist monasteries, and marvel at the changing hues of high-altitude Pangong Tso with rugged all-terrain SUVs.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2200&q=85',
    ctaPrimary: { label: 'Book Ladakh Expedition', path: '/book?service=outstation-round-trip&drop=Ladakh' },
    ctaSecondary: { label: 'Group Travellers', path: '/services/mini-bus' },
    highlight: 'Oxygen-equipped touring SUVs with seasoned altitude experts'
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
