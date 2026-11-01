import React from 'react';
import { ServicePageTemplate } from './ServicePageTemplate';
import { vehiclesData } from '../../data/mockData';

export const LuxuryBusPage = () => {
  const coachVehicles = vehiclesData.filter(v => ['Luxury Coach', 'Mini Bus'].includes(v.category));

  return (
    <ServicePageTemplate
      title="Luxury Bus & Coach Booking"
      subtitle="32 to 55-seater multi-axle Volvo 9600, Scania, and BharatBenz coaches for conferences, corporate retreats, and luxury intercity transit."
      tagline="Flagship Highway Hospitality"
      badge="Multi-Axle Air Suspension"
      serviceKey="luxury-bus"
      heroImage="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
      description="Experience the ultimate in ground travel luxury. Our multi-axle Volvo and Scania coaches offer true gliding comfort with electronically controlled air suspension, whisper-quiet sound insulation, premium semi-sleeper/sleeper berths, on-board washroom amenities, and dual-driver safety protocols."
      pickupPlaceholder="e.g. Corporate Campus / Hotel Lobby / Station"
      dropPlaceholder="e.g. Resort / Convention Center / Intercity Route"
      vehicles={coachVehicles}
      features={[
        { title: 'Multi-Axle Electronically Controlled Suspension', desc: 'Virtually absorbs all road bumps and highway undulations for undisturbed sleep.' },
        { title: 'On-Board Restroom & Pantry Option', desc: 'Long-distance models equipped with aircraft-grade chemical toilets and pantry chillers.' },
        { title: 'Dual Highway Captains & Attendant', desc: 'Two certified Volvo academy captains on roster for rotation safety on long routes.' }
      ]}
      pricingPlans={[
        {
          name: '36-Seater Executive Coach',
          desc: 'BharatBenz / Tata Ultra luxury coach for corporate delegations and day tours.',
          price: '₹42/km',
          features: ['36 Semi-Sleeper Seats', 'Chilled Climate Control', 'Large Luggage Underbelly', 'Daily min. 300 km']
        },
        {
          name: '45-Seater Volvo 9600 Multi-Axle',
          desc: 'The undisputed benchmark in long distance highway luxury and smooth cruising.',
          price: '₹55/km',
          popular: true,
          features: ['45 Luxury Reclining Berths', 'Air Suspension Glider', 'Live GPS Tracking Link', 'Daily min. 350 km']
        },
        {
          name: 'VIP Sleeper Suite Coach',
          desc: '30 Private luxury sleeper pods with charging sockets and reading ambient lights.',
          price: '₹62/km',
          features: ['30 Sleeper Berths', 'On-Board Clean Washroom', 'High-Speed Wi-Fi Hotspot', 'Dual Captain Roster']
        }
      ]}
      faqs={[
        { q: 'How far in advance should we reserve a 45-seater Volvo coach?', a: 'We recommend booking at least 7 to 10 days in advance, especially during the wedding and corporate conference seasons (October through March).' },
        { q: 'Can corporate branding or banner wraps be applied to the coach?', a: 'Yes! For corporate delegations, investor conferences, and sports events, we can coordinate custom fleet exterior wrap branding upon request.' },
        { q: 'What safety certifications do your bus drivers possess?', a: 'All drivers hold heavy passenger commercial licenses, pass regular medical/vision evaluations, and undergo specialized training at Volvo Driving Training Centers.' }
      ]}
    />
  );
};
