import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ServicePageTemplate } from './ServicePageTemplate';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, Zap, ArrowRight, Smartphone, RefreshCw, Sparkles, ShieldAlert } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { NCMC_BANNER_TEXT } from '../../services/ncmc/ncmcService';

export const NcmcTransitPage = () => {
  const { openBookingModal } = useBooking();
  const [cardType, setCardType] = useState('RuPay Platinum Contactless');
  const [transitNetwork, setTransitNetwork] = useState('Mumbai Metro (Line 1, 2A, 7 & 3)');

  return (
    <div className="space-y-12">
      <ServicePageTemplate
        title="National Common Mobility Card (NCMC) & Transit Pass"
        subtitle="One Nation One Card: Contactless RuPay transit pass for Mumbai Metro lines, BEST AC buses, Navi Mumbai Metro, and suburban transit gates."
        tagline="Seamless Contactless Commuting"
        badge="NCMC RuPay Smart Transit"
        serviceKey="ncmc-card"
        heroImage="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
        description="Experience the convenience of One Nation One Card (NCMC). Tap and enter any metro gate, urban bus fleet, or coastal ferry across Maharashtra. Top up your digital balance instantly with zero convenience fees, track ride history, and link your corporate transit allowance seamlessly."
        pickupPlaceholder="Select Transit Corridor (e.g. Metro Line 2A & 7 / Line 3 Aqua)"
        dropPlaceholder="Select Pass Plan (e.g. 30-Day Monthly Unlimited)"
        features={[
          { title: 'Sub-Second Tap & Go Transit', desc: 'Compliant with EMV Contactless specifications for instantaneous gate entry.' },
          { title: 'BEST AC & Navi Mumbai Metro Sync', desc: 'Single card valid on Mumbai Metro, Pune Metro, and BEST city electric buses.' },
          { title: 'Zero Surcharge Top-Up', desc: 'Instant recharge via UPI, net banking, or corporate expense accounts.' }
        ]}
        pricingPlans={[
          {
            name: 'Metro 30-Day Unlimited Pass',
            desc: 'Unlimited rides across Metro lines with automated monthly rollover.',
            price: '₹1,200 / Month',
            popular: true,
            features: ['Unlimited Metro Gate Entries', 'Peak Hours Fastlane Access', 'Lost Card Balance Protection', 'Digital WhatsApp Receipt']
          },
          {
            name: 'Combo Pass (Metro + BEST Bus)',
            desc: 'Complete multimodal Mumbai transit pass for daily suburban office commuters.',
            price: '₹1,850 / Month',
            features: ['Metro Lines 1, 2A, 7 & 3', 'All BEST AC & Non-AC Buses', 'Free Transfer Windows', 'Corporate Expense Invoice']
          },
          {
            name: 'Prepaid Wallet Card (Demo Credit)',
            desc: 'Stored-value contactless card for occasional intercity transit and toll plazas.',
            price: '₹500 Balance Credit',
            features: ['Contactless Tap & Go', 'Zero Expiry on Balance', 'Accepted at Toll Plazas', 'Simulated Demo Account']
          }
        ]}
        faqs={[
          { q: 'Where can I use the NCMC Transit Card in Maharashtra?', a: 'You can use it across Mumbai Metro (Lines 1, 2A, 7 and the Aqua Line 3), Pune Metro (Purple and Aqua lines), all BEST electric buses, and participating highway toll booths.' },
          { q: 'Is this real money or simulated in this environment?', a: 'This frontend runs in Demo Simulation Mode (Provider NOT_CONFIGURED). You can test ordering, topping up, and issuing simulated passes without real charges.' },
          { q: 'Can corporate employers subsidize NCMC passes?', a: 'Yes! Through our Corporate Transportation Portal, enterprises can distribute monthly subsidized transit allowances directly to employee NCMC smart passes.' }
        ]}
      />

      {/* Transit Network Map & Balance Simulation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* Launch Interactive NCMC Portal */}
        <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEEFF] border border-[#3898D8]/20 text-[#3898D8] text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-[#19A89A]" />
              <span>{NCMC_BANNER_TEXT}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
              Launch NCMC Smart Card Portal &amp; Turnstile Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
              Explore your live contactless RuPay smart card visual, register or link cards with zero sensitive PIN entry, simulate wallet recharges, buy daily/monthly metro passes, view turnstile tap ledgers, and report lost cards.
            </p>
          </div>

          <Link
            to="/ncmc"
            className="px-6 py-3.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shrink-0 transition-all"
          >
            <span>Open NCMC Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5EDF5] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#E5EDF5] gap-2">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#3898D8]" />
              <h3 className="text-base font-bold text-[#153B5B]">Supported Multimodal Transit Corridors</h3>
            </div>
            <span className="text-xs font-semibold text-[#3898D8] bg-[#DCEEFF] px-2.5 py-1 rounded-full border border-[#3898D8]/20">
              One Nation One Card
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
              <span className="text-xs font-bold text-[#3898D8]">Mumbai Metro Rail Network</span>
              <p className="text-xs text-[#64748B]">Lines 1 (Ghatkopar-Versova), 2A (Dahisar-Andheri W), 7 (Dahisar-Gundavali), Line 3 Aqua Line (Colaba-Bandra-SEEPZ).</p>
              <div className="text-[11px] text-[#19A89A] font-semibold">✓ Automated Tap Gates Ready</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
              <span className="text-xs font-bold text-[#3898D8]">BEST & NMMT Electric Bus Fleets</span>
              <p className="text-xs text-[#64748B]">All 3,500+ AC and non-AC electric city buses with contactless conductor ticketing machines.</p>
              <div className="text-[11px] text-[#19A89A] font-semibold">✓ Zero Cash Commute</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
              <span className="text-xs font-bold text-[#19A89A]">Pune Metro & Highway Fastag</span>
              <p className="text-xs text-[#64748B]">PCMC to Swargate, Vanaz to Ramwadi, plus fastag integration on major Maharashtra expressways.</p>
              <div className="text-[11px] text-[#19A89A] font-semibold">✓ Unified State Mobility</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
