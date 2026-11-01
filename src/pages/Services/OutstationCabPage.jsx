import React from 'react';
import { ServicePageTemplate } from './ServicePageTemplate';
import { vehiclesData } from '../../data/mockData';

export const OutstationCabPage = () => {
  const outstationVehicles = vehiclesData.filter(v => ['Sedan', 'SUV', 'Luxury Sedan', 'Tempo Traveller'].includes(v.category));

  return (
    <ServicePageTemplate
      title="Outstation Cab Booking"
      subtitle="One-way drops and scenic round-trips across 1,200+ intercity routes with vetted highway chauffeurs."
      tagline="Intercity Travel Redefined"
      badge="Top Rated Intercity Fleet"
      serviceKey="outstation-cabs"
      heroImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
      description="Enjoy peaceful highway journeys across Maharashtra, Goa, and neighbouring states. From the Mumbai-Pune Expressway to the Samruddhi Mahamarg and coastal konkan drives, our verified chauffeurs are experienced with mountain ghats and night highway journeys."
      pickupPlaceholder="e.g. Mumbai (Any locality or Airport)"
      dropPlaceholder="e.g. Pune / Mahabaleshwar / Goa / Nashik"
      vehicles={outstationVehicles}
      features={[
        { title: 'Affordable One-Way Fares', desc: 'Why pay return fare when you only need a drop? Pay exclusively for the distance travelled.' },
        { title: 'Chauffeurs Trained for Highway Safety', desc: 'All outstation drivers are certified in defensive driving with zero night accident records.' },
        { title: 'Doorstep Pickup & Zero Cancel Fee', desc: 'Pickup right from your residence or hotel with free cancellation up to 6 hours prior.' }
      ]}
      pricingPlans={[
        {
          name: 'One-Way Drop (Mumbai -> Pune)',
          desc: 'Expressway direct drop between any location in Mumbai and Pune.',
          price: '₹2,199',
          popular: true,
          features: ['Prime Sedan (4 Seats)', 'Tolls & Fastag included', 'Door-to-door drop', 'No driver allowance extra']
        },
        {
          name: 'Round Trip Weekend Escape',
          desc: 'Mumbai/Pune to Lonavala, Mahabaleshwar, or Alibaug for 2-3 days.',
          price: '₹5,499',
          features: ['Innova Crysta SUV', '250 km/day running included', 'Driver night stay included', 'Sightseeing flexibility']
        },
        {
          name: 'Long Haul Scenic (Mumbai -> Goa)',
          desc: 'Deluxe highway drive via NH66 or Kolhapur bypass with luggage space.',
          price: '₹8,999',
          features: ['Luxury Sedan / Innova', 'Dual Driver option on request', 'Complimentary bottled refreshments', 'All State tax assistance']
        }
      ]}
      faqs={[
        { q: 'Is night driving safe with your outstation drivers?', a: 'Yes, our highway chauffeurs are vetted for night-shift fitness, follow strict speed-governor regulations, and plan designated rest stops on certified highway food plazas.' },
        { q: 'How is the total fare calculated for outstation round trips?', a: 'Round-trip fares are based on standard minimum km per day (typically 250 or 300 km) multiplied by the vehicle rate per km, with clear transparency on toll estimates.' },
        { q: 'Can we stop for lunch and snacks along the highway?', a: 'Absolutely! Our drivers are happy to stop at your preferred highway eateries, dhabas, or scenic viewpoints.' }
      ]}
    />
  );
};
