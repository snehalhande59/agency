import React from 'react';
import { ServicePageTemplate } from './ServicePageTemplate';
import { vehiclesData } from '../../data/mockData';

export const AirportTransferPage = () => {
  const airportVehicles = vehiclesData.filter(v => ['Sedan', 'SUV', 'Luxury Sedan'].includes(v.category));

  return (
    <ServicePageTemplate
      title="Airport Pickup & Drop"
      subtitle="Punctual airport transfers with automated flight tracking, complimentary waiting, and VIP meet-and-greet."
      tagline="Touchdown to Doorstep Seamlessly"
      badge="Flight Sync Telematics"
      serviceKey="airport-transfers"
      heroImage="https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80"
      description="Never fret about finding a cab after a tiring flight. Our chauffeurs track your flight in real-time, adjust automatically for landing delays, and receive you at the arrival terminal with a personalized name card and luggage assistance."
      pickupPlaceholder="e.g. Mumbai Airport T2 / Pune Airport"
      dropPlaceholder="e.g. Hotel / Office / Residential Address"
      vehicles={airportVehicles}
      features={[
        { title: 'Live Flight Delay Sync', desc: 'Whether your flight lands 30 minutes early or 2 hours late, your chauffeur will be waiting.' },
        { title: '45-Minute Free Wait Time', desc: 'Generous complimentary wait window for baggage claim and immigration clearance.' },
        { title: 'Terminal Meet & Greet', desc: 'Chauffeur assists with trolley and luggage directly at the designated arrival gate.' }
      ]}
      pricingPlans={[
        {
          name: 'City Airport Drop (Sedan)',
          desc: 'Reliable doorstep pickup to airport departure gates across Mumbai & Pune.',
          price: '₹799 Flat',
          features: ['Sedan (Dzire / Etios)', 'On-time guarantee (or 50% refund)', 'Clean luggage boot', 'Zero midnight extra']
        },
        {
          name: 'Executive SUV Airport Arrival',
          desc: 'High comfort pickup with luggage room for international & family flights.',
          price: '₹1,599',
          popular: true,
          features: ['Innova Crysta SUV', 'Flight tracking included', '45m free terminal waiting', 'Meet & Greet with placard']
        },
        {
          name: 'VIP Prestige Welcome (Mercedes/BMW)',
          desc: 'First-class luxury pickup for visiting executives, delegacy, and VIP guests.',
          price: '₹3,999',
          features: ['Mercedes E-Class / BMW 5', 'Suited executive chauffeur', 'Chilled water & magazines', 'VIP curb parking access']
        }
      ]}
      faqs={[
        { q: 'What happens if my flight gets delayed?', a: 'You enter your flight number during booking. Our operations dashboard monitors live radar telemetry and updates your driver automatically, ensuring zero waiting charges for flight delays.' },
        { q: 'Where will I meet my driver at Mumbai T2?', a: 'Your driver will coordinate via phone/WhatsApp and be waiting at the designated Multi-Level Car Parking (P4/P7) pickup area with your name placard.' },
        { q: 'Can I book an airport drop for 4:00 AM?', a: 'Yes, our 24/7 airport dispatch guarantees timely early morning pickups with drivers arriving 15 minutes before the requested time.' }
      ]}
    />
  );
};
