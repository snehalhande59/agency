import React from 'react';
import { ServicePageTemplate } from './ServicePageTemplate';
import { vehiclesData } from '../../data/mockData';

export const MiniBusPage = () => {
  const minibusVehicles = vehiclesData.filter(v => ['Tempo Traveller', 'Mini Bus'].includes(v.category));

  return (
    <ServicePageTemplate
      title="Mini Bus & Tempo Traveller Booking"
      subtitle="13 to 26-seater luxury executive Tempo Travellers and mini coaches for family pilgrimages, weddings, and group excursions."
      tagline="Travel Together in Comfort"
      badge="Spacious Executive Fleet"
      serviceKey="mini-bus"
      heroImage="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
      description="Enjoy the journey together without splitting into multiple small cabs. Our Force Urbania and Maharaja Tempo Travellers feature plush pushback 2x1 leather seating, individual AC vents, smart LED screens, microphone sound systems, and dedicated luggage racks."
      pickupPlaceholder="e.g. Pune / Mumbai / Thane Assembly Point"
      dropPlaceholder="e.g. Shirdi / Mahabaleshwar / Goa / Nashik"
      vehicles={minibusVehicles}
      features={[
        { title: 'Plush Pushback Reclining Seats', desc: 'Ergonomic calf-rest seats with ample legroom for comfortable long highway journeys.' },
        { title: 'Dedicated Chilled AC Ducts', desc: 'Roof-mounted powerful air conditioning vents for every single passenger row.' },
        { title: 'On-Board Entertainment & Mic', desc: 'Smart LED TV, Bluetooth surround sound, and PA microphone for guides and family singalongs.' }
      ]}
      pricingPlans={[
        {
          name: '13-Seater Maharaja Luxury',
          desc: '1x1 captain seat layout for VIP family tours, pilgrimage, and delegacy.',
          price: '₹22/km',
          features: ['13 Pushback Leather Seats', 'Air Suspension Ride', 'Ample Boot Luggage', 'Daily min. 250 km']
        },
        {
          name: '17-Seater Force Urbania',
          desc: 'The gold standard in Indian executive travel with silent cabin isolation.',
          price: '₹26/km',
          popular: true,
          features: ['17 Executive Seats', 'Panoramic View Windows', 'USB charger at every seat', 'Daily min. 250 km']
        },
        {
          name: '26-Seater Mini Coach',
          desc: 'Ideal for wedding guest shuttles, college industrial visits, and corporate offsites.',
          price: '₹34/km',
          features: ['26 Pushback Seats', 'Underbody Luggage Bay', 'Professional Highway Captain', 'Daily min. 300 km']
        }
      ]}
      faqs={[
        { q: 'Is luggage space sufficient for 17 passengers?', a: 'Yes! Our Urbania and Tempo Travellers have spacious rear luggage compartments as well as top-carrier options with waterproof tarpaulins for heavy baggage.' },
        { q: 'Can we hire a mini bus for a multi-day tour (e.g., 5 days in Konkan or Goa)?', a: 'Yes, multi-day bookings are our specialty. The vehicle stays with your group throughout the itinerary with fixed transparent daily driver allowances.' },
        { q: 'Are all state taxes and permits handled by TRAVELNEX?', a: 'Yes, all our commercial mini buses carry valid All-India Tourist Permits (AITP) and our team handles border taxes and state permits seamlessly.' }
      ]}
    />
  );
};
