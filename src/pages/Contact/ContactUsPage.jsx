import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Headphones, Building2, Clock } from 'lucide-react';

export const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Booking Enquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: 'General Booking Enquiry', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 space-y-12 bg-[#F8FAFC] text-[#153B5B]">
      
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto px-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3898D8]">24/7 Operations Command</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#153B5B] font-display mt-2 mb-3">
          Get in Touch
        </h1>
        <p className="text-sm text-[#64748B]">
          Our dispatch desk, airport coordinators, and corporate account managers are available round the clock.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-2">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#153B5B]">24/7 Passenger Support</h3>
              <p className="text-xs text-[#64748B]">Toll-free customer care &amp; active trip helpline:</p>
              <div className="text-sm font-bold text-[#3898D8]">+91 1800 209 8899</div>
              <div className="text-xs text-[#64748B]">+91 98201 00299 (WhatsApp Priority)</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-2">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#153B5B]">Email Communications</h3>
              <p className="text-xs text-[#64748B]">Trip inquiries &amp; corporate RFP submissions:</p>
              <div className="text-xs font-semibold text-[#153B5B]">concierge@aerovoyage.com</div>
              <div className="text-xs font-semibold text-[#153B5B]">corporate@aerovoyage.com</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E5EDF5] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#153B5B]">Corporate Headquarters</h3>
              <p className="text-xs text-[#64748B]">
                Level 11, One BKC, G-Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051
              </p>
              <div className="pt-2 text-xs text-[#64748B] border-t border-[#E5EDF5]">
                <strong className="text-[#153B5B]">Pune Branch:</strong> Quadron Business Park, Hinjawadi Phase 2, Pune 411057
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5EDF5] shadow-lg">
              <h3 className="text-lg font-bold text-[#153B5B] font-display mb-1">Send Us a Direct Message</h3>
              <p className="text-xs text-[#64748B] mb-6">We respond to passenger and corporate inquiries within 15 minutes.</p>

              {submitted && (
                <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-[#19A89A]" />
                  <span>Your message has been received! A concierge executive will call or email you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] placeholder-[#64748B] focus:outline-none focus:border-[#3898D8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] placeholder-[#64748B] focus:outline-none focus:border-[#3898D8] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] placeholder-[#64748B] focus:outline-none focus:border-[#3898D8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#153B5B] mb-1">Inquiry Type</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] focus:outline-none focus:border-[#3898D8] transition-colors"
                    >
                      <option value="General Booking Enquiry">General Booking Enquiry</option>
                      <option value="Outstation Cab Booking">Outstation Cab Booking</option>
                      <option value="Airport Transfer Priority">Airport Transfer Priority</option>
                      <option value="Luxury Bus / Group Rental">Luxury Bus / Group Rental</option>
                      <option value="Corporate Fleet Tie-Up">Corporate Fleet Tie-Up</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#153B5B] mb-1">Your Message or Route Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your journey schedule, passenger count, or corporate requirements..."
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl py-2.5 px-3 text-sm text-[#153B5B] placeholder-[#64748B] focus:outline-none focus:border-[#3898D8] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#3898D8] hover:bg-[#2b82bd] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Operations Desk</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
