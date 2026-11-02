import React from 'react';
import { ServicePageTemplate } from './ServicePageTemplate';
import { vehiclesData } from '../../data/mockData';

export const GroupTravelPage = () => {
  const groupVehicles = vehiclesData.filter(v => ['Tempo Traveller', 'Mini Bus', 'Luxury Coach'].includes(v.category));

  return (
    <ServicePageTemplate
      title="Group Transportation & Event Logistics"
      subtitle="Turnkey convoy and fleet logistics for grand weddings, multinational corporate summits, educational tours, and VIP delegations."
      tagline="Flawless Large-Scale Mobility"
      badge="Custom Event Transport Management"
      serviceKey="group-travel"
      heroImage="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80"
      description="Moving 50 to 5,000 guests requires military-grade operational precision. AeroVoyage provides dedicated on-ground transport coordinators, real-time convoy tracking dashboards, emergency backup vehicles on standby, and coordinated luggage management vans."
      pickupPlaceholder="e.g. Airport Terminals / Partner Hotels"
      dropPlaceholder="e.g. Wedding Destination / Convention Center"
      vehicles={groupVehicles}
      features={[
        { title: 'Dedicated On-Ground Transport Lead', desc: 'A senior fleet manager stationed at your venue to coordinate pickups, departures, and guest requests.' },
        { title: 'Convoy Live Fleet Telematics', desc: 'A consolidated online dashboard for the event host to see all vehicle locations and passenger counts in real time.' },
        { title: 'Standby Emergency Replacement Vehicles', desc: 'Guaranteed buffer vehicles stationed nearby to eliminate any possibility of transport bottlenecks.' }
      ]}
      pricingPlans={[
        {
          name: 'Wedding Shuttle Package (20-80 Guests)',
          desc: 'Airport pickups + Hotel to wedding mandap / reception transfers throughout 3 days.',
          price: '₹48,000 / Day',
          features: ['2x 17-Seater Urbanias + 2x Sedans', 'Dedicated Fleet Coordinator', 'Unlimited local hotel shuttle', 'Luggage support vehicle']
        },
        {
          name: 'Corporate Summit Fleet (100-300 Pax)',
          desc: 'Coordinated transit for multi-day international summits, tech conferences, and banquets.',
          price: '₹1,25,000 / Day',
          popular: true,
          features: ['4x Luxury Volvo Coaches + 6x SUVs', 'Live Dispatch Dashboard', 'Hostess / Chauffeur Placards', 'Consolidated Corporate Billing']
        },
        {
          name: 'Mega Convention / Festival (500+ Pax)',
          desc: 'Full-scale mass transport infrastructure with park-and-ride buses and security escort.',
          price: 'Custom Enterprise Quote',
          features: ['Fleet of 15+ Multi-Axle Coaches', 'Operations Command Room', 'Traffic Police Liaison', '24/7 SLA Guarantee']
        }
      ]}
      faqs={[
        { q: 'How does the on-ground transport coordinator help our event?', a: 'Your designated coordinator manages chauffeur call-sheets, tracks incoming guest flights, guides guests into their allocated buses/cabs, and resolves any last-minute route adjustments on the spot.' },
        { q: 'Can we book mixed fleets of luxury sedans and large coaches?', a: 'Yes! Most large events combine Mercedes/Innova VIP transfers for dignitaries with 45-seater coaches for general guests, all managed under one master schedule.' },
        { q: 'What happens if guest arrival timings change?', a: 'Our team maintains dynamic rosters connected to live airline arrivals to regroup and dispatch vehicles efficiently without delays or chaos.' }
      ]}
    />
  );
};
