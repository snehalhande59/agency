import React from 'react';
import { ServicePageTemplate } from './ServicePageTemplate';
import { vehiclesData } from '../../data/mockData';

export const LocalTaxiPage = () => {
  const localVehicles = vehiclesData.filter(v => ['Sedan', 'SUV', 'Luxury Sedan'].includes(v.category));

  return (
    <ServicePageTemplate
      title="Local Taxi & City Rentals"
      subtitle="Chauffeured city point-to-point transfers and flexible 4, 8, or 12-hour rental packages with unlimited stops."
      tagline="City Mobility Without Surges"
      badge="Instant & Scheduled Urban Cabs"
      serviceKey="local-taxi"
      heroImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80"
      description="Navigate Mumbai, Pune, Thane, and Navi Mumbai with ease. Whether attending back-to-back corporate meetings at BKC, shopping across town, or visiting relatives, our chauffeurs navigate traffic while you relax in air-conditioned comfort."
      pickupPlaceholder="e.g. Bandra Kurla Complex (BKC), Mumbai"
      dropPlaceholder="e.g. Marine Drive / Multiple City Stops"
      vehicles={localVehicles}
      features={[
        { title: 'Zero Surge Guarantee', desc: 'Pre-fixed hourly rates even during peak office hours and rainy evenings.' },
        { title: 'Multiple Stops & Waiting Included', desc: 'Hop between errands, client meetings, or shopping hubs without re-booking.' },
        { title: 'Spotless AC Vehicles', desc: 'Disinfected interiors, mobile chargers, bottled water, and courteous chauffeurs.' }
      ]}
      pricingPlans={[
        {
          name: '4 Hours / 40 KM Package',
          desc: 'Perfect for quick errands, medical visits, or airport drop with intermediate meeting.',
          price: '₹1,299',
          features: ['Sedan (Dzire/Etios)', 'AC Climate Control', 'Driver Allowance Included', 'Extra km @ ₹14/km']
        },
        {
          name: '8 Hours / 80 KM Executive',
          desc: 'Our most requested full-day package for business meetings, audits, and city tours.',
          price: '₹2,399',
          popular: true,
          features: ['Executive Sedan or SUV', 'Multiple Intercity Stops', 'Zero Peak Surge', 'Extra km @ ₹16/km']
        },
        {
          name: '12 Hours / 120 KM VIP Day',
          desc: 'Comprehensive full-day luxury mobility for weddings, VIP delegates, or film crews.',
          price: '₹3,799',
          features: ['Luxury Sedan / Innova Crysta', 'Chauffeur in Formal Attire', 'Toll calculation included', 'Extra km @ ₹20/km']
        }
      ]}
      faqs={[
        { q: 'Can I extend my local taxi package mid-journey?', a: 'Yes! You can easily extend your rental by letting your chauffeur know. Extra hours are billed at an affordable standard rate of ₹150/hr with no surge penalties.' },
        { q: 'Are parking fees and toll charges included in city rentals?', a: 'Toll charges on sea links/freeways and local parking receipts are billed at actuals transparently with receipts.' },
        { q: 'Can I book a cab for immediate pickup?', a: 'Yes, our on-demand city dispatch network covers all major residential and corporate zones with a typical 10 to 15-minute response time.' }
      ]}
    />
  );
};
