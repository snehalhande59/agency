import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRightLeft, 
  Search, 
  Car, 
  Plane, 
  Compass, 
  Bus, 
  Train,
  CreditCard,
  Check, 
  Shield,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BookingSearchPanel = ({ defaultTab = 'outstation', className = '' }) => {
  const navigate = useNavigate();
  const { searchParams, updateSearchParams, openBookingModal } = useBooking();

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [journeyType, setJourneyType] = useState('one-way');
  const [pickup, setPickup] = useState(searchParams.pickup || 'Mumbai (Bandra/BKC/T2)');
  const [drop, setDrop] = useState(searchParams.drop || 'Pune (Hinjawadi / Koregaon Park)');
  const [date, setDate] = useState(searchParams.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:30 AM');
  const [passengers, setPassengers] = useState(2);
  const [localPackage, setLocalPackage] = useState('8 Hours / 80 KM');
  const [trainClass, setTrainClass] = useState('Executive Chair Car (EC)');
  const [error, setError] = useState('');

  const tabs = [
    { id: 'outstation', label: 'Outstation Cabs', icon: Compass, sub: 'Intercity One-Way & Round' },
    { id: 'local', label: 'Local Taxi', icon: Car, sub: 'Hourly Rental & City Commute' },
    { id: 'airport', label: 'Airport Transfer', icon: Plane, sub: 'Flight Tracked Direct' },
    { id: 'bus', label: 'Luxury & Mini Bus', icon: Bus, sub: 'Volvo & Urbania Groups' },
    { id: 'trains', label: 'Trains & Tatkal', icon: Train, sub: 'Vande Bharat Confirmed' },
    { id: 'msrtc', label: 'MSRTC Shivneri', icon: Ticket, sub: 'State Volvo Direct' },
    { id: 'ncmc', label: 'NCMC Transit Pass', icon: CreditCard, sub: 'Metro & Contactless' }
  ];

  const handleSwap = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setError('');
    if (tabId === 'airport') {
      setDrop('Chhatrapati Shivaji Maharaj International Airport (T2)');
    } else if (tabId === 'trains') {
      setPickup('CSMT Mumbai Terminus');
      setDrop('Hazrat Nizamuddin (New Delhi)');
    } else if (tabId === 'msrtc') {
      setPickup('Mumbai Dadar Asiad Stand');
      setDrop('Pune Swargate Bus Depot');
    } else if (tabId === 'ncmc') {
      setPickup('Mumbai Metro Line 2A/7 & Line 3');
      setDrop('Contactless Smart Wallet');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pickup.trim() || (!drop.trim() && activeTab !== 'ncmc')) {
      setError('Please provide origin and destination points.');
      return;
    }
    setError('');

    updateSearchParams({
      serviceType: activeTab,
      pickup,
      drop: activeTab === 'ncmc' ? 'All Metro & Transit Gates' : drop,
      date,
      time,
      passengers,
      journeyType
    });

    if (activeTab === 'msrtc') {
      navigate('/msrtc/results');
      return;
    }

    if (activeTab === 'trains') {
      navigate('/railway/results');
      return;
    }

    if (activeTab === 'ncmc') {
      navigate('/ncmc');
      return;
    }

    if (activeTab === 'outstation') {
      const targetWf = journeyType === 'round-trip' ? 'outstation-round-trip' : 'outstation-one-way';
      navigate(`/book?service=${targetWf}`);
      return;
    }

    if (activeTab === 'local') {
      navigate('/book?service=local-taxi');
      return;
    }

    if (activeTab === 'airport') {
      navigate('/book?service=airport-pickup');
      return;
    }

    if (activeTab === 'bus') {
      navigate('/book?service=mini-bus');
      return;
    }

    let category = 'Prime Sedan (Dzire / Etios)';
    let fare = '₹2,450';

    if (activeTab === 'airport') {
      category = 'Airport Executive Cab';
      fare = '₹1,499';
    } else if (activeTab === 'local') {
      category = `Local Hourly (${localPackage})`;
      fare = '₹2,399';
    } else if (activeTab === 'bus') {
      category = 'Force Urbania 17-Seater';
      fare = '₹7,800';
    } else if (activeTab === 'trains') {
      category = `Train Reservation (${trainClass})`;
      fare = '₹1,580';
    } else if (activeTab === 'msrtc') {
      category = 'MSRTC Shivneri Volvo AC';
      fare = '₹535';
    } else if (activeTab === 'ncmc') {
      category = 'NCMC One Nation One Transit Pass';
      fare = '₹500 Balance Credit';
    }

    openBookingModal({
      category,
      pickup,
      drop: activeTab === 'ncmc' ? 'Metro & Transit Auto-Gate' : drop,
      date,
      time,
      passengers,
      fare
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl bg-white p-5 md:p-7 shadow-xl border border-[#E5EDF5]">
      
      {/* Service Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-[#E5EDF5] no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all duration-200 ${
                isActive 
                  ? 'bg-[#3898D8] text-white shadow-md shadow-[#3898D8]/30' 
                  : 'bg-[#EFF7FC] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#DCEEFF] border border-[#E5EDF5]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* Outstation sub-toggle */}
        {activeTab === 'outstation' && (
          <div className="ml-auto hidden md:flex items-center gap-1 bg-[#EFF7FC] p-1 rounded-xl border border-[#E5EDF5]">
            <button
              type="button"
              onClick={() => setJourneyType('one-way')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${journeyType === 'one-way' ? 'bg-[#3898D8] text-white shadow-sm' : 'text-[#64748B] hover:text-[#153B5B]'}`}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => setJourneyType('round-trip')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${journeyType === 'round-trip' ? 'bg-[#3898D8] text-white shadow-sm' : 'text-[#64748B] hover:text-[#153B5B]'}`}
            >
              Round Trip
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Main Search Fields Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Origin / Pickup Point */}
        <div className={activeTab === 'ncmc' ? 'md:col-span-6' : 'md:col-span-3'}>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 ml-1">
            {activeTab === 'airport' ? 'Pickup Address' : activeTab === 'trains' ? 'From Station' : activeTab === 'msrtc' ? 'Boarding Stand' : activeTab === 'ncmc' ? 'Select Transit System' : 'Pickup Location'}
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-[#3898D8] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup point"
              required
              className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-2xl py-3 pl-10 pr-3 text-sm text-[#153B5B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white focus:ring-1 focus:ring-[#3898D8] transition-all font-medium"
            />
          </div>
        </div>

        {/* Swap Button (Hidden for NCMC) */}
        {activeTab !== 'ncmc' && (
          <div className="hidden md:flex md:col-span-1 justify-center pt-5">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2.5 rounded-full bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:border-[#3898D8] hover:scale-105 transition-all shadow-sm"
              title="Swap Locations"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Drop Destination */}
        {activeTab !== 'ncmc' ? (
          <div className="md:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 ml-1">
              {activeTab === 'airport' ? 'Airport Destination' : activeTab === 'trains' ? 'To Station' : activeTab === 'msrtc' ? 'Destination Stand' : 'Drop Destination'}
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-[#19A89A] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Enter drop destination"
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-2xl py-3 pl-10 pr-3 text-sm text-[#153B5B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3898D8] focus:bg-white focus:ring-1 focus:ring-[#3898D8] transition-all font-medium"
              />
            </div>
          </div>
        ) : (
          <div className="md:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 ml-1">
              Smart Transit Plan
            </label>
            <select
              value={localPackage}
              onChange={(e) => setLocalPackage(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-2xl py-3 px-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white transition-all font-medium"
            >
              <option value="Metro Unlimited Monthly">Metro Unlimited 30-Day Pass</option>
              <option value="BEST Bus AC Combo">BEST AC Bus + Metro Combo</option>
              <option value="Airport Metro Express">Airport Metro Fast Pass</option>
            </select>
          </div>
        )}

        {/* Date Field */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 ml-1">
            Travel Date
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-4 h-4 text-[#3898D8] absolute left-3.5 pointer-events-none" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-2xl py-3 pl-10 pr-2 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        {/* Passengers / Seats */}
        <div className="md:col-span-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 ml-1">
            Pax
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-2xl py-3 px-2 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:bg-white transition-all font-medium"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={14}>14+</option>
            <option value={35}>35+</option>
          </select>
        </div>

        {/* Search CTA Button */}
        <div className="md:col-span-2 pt-1 md:pt-5">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-sm shadow-md shadow-[#3898D8]/30 hover:shadow-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99]"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{activeTab === 'ncmc' ? 'Get Smart Pass' : 'Search Rides'}</span>
          </button>
        </div>

      </form>

      {/* Feature Badges under panel */}
      <div className="mt-4 pt-3.5 border-t border-[#E5EDF5] flex flex-wrap items-center justify-between text-xs text-[#64748B] gap-2">
        <div className="flex items-center gap-1.5 font-medium">
          <Check className="w-3.5 h-3.5 text-[#19A89A] shrink-0" />
          <span>Zero surge guarantee on booked packages</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <Shield className="w-3.5 h-3.5 text-[#3898D8] shrink-0" />
          <span>Verified chauffeurs &amp; live GPS tracking</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>IRCTC, MSRTC &amp; NCMC integrated travel interfaces</span>
        </div>
      </div>

    </div>
  );
};
