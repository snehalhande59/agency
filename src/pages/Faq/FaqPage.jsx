import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Car, Building2, Train } from 'lucide-react';
import { faqsData } from '../../data/mockData';

export const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Booking & Fares', 'Safety & Drivers', 'Corporate Fleet', 'Trains & Bus'];

  const extendedFaqs = [
    ...faqsData,
    {
      question: 'What is the baggage limit for Sedan and SUV outstation rides?',
      answer: 'Prime Sedans comfortably fit 2 large suitcases (28") plus 2 cabin bags. Executive SUVs like Innova Crysta can accommodate 4 large bags plus 3 cabin bags with rear seat adjustments.'
    },
    {
      question: 'Can I choose my chauffeur or request English-speaking drivers?',
      answer: 'Yes! For our Executive SUV, Luxury Sedan, and Corporate contracts, you can request fluent English-speaking chauffeurs trained in business etiquette.'
    },
    {
      question: 'Are pets allowed in AeroVoyage cabs?',
      answer: 'Yes, pet-friendly cabs can be arranged on request. Please inform our operations team during booking so a pet-friendly seat cover is installed.'
    },
    {
      question: 'How do monthly corporate invoices work for businesses?',
      answer: 'We provide itemized billing with department tags, digital trip logs with employee OTP sign-offs, and single GST compliant monthly invoices with 30-day corporate credit.'
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 space-y-12 bg-[#F8FAFC] text-[#153B5B]">
      
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">Knowledge Base</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display mt-2 mb-3">
          Help &amp; Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#64748B]">
          Find instant answers to common questions about our vehicles, pricing, safety protocols, and corporate plans.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#3898D8] text-white shadow-sm'
                  : 'bg-white border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {extendedFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E5EDF5] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#153B5B] hover:text-[#3898D8] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3898D8] shrink-0"></span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#3898D8] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E5EDF5] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};
