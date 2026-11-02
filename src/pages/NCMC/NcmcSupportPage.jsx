import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy, ArrowLeft, Send, CheckCircle2, FileText, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNcmcStore } from '../../store/useNcmcStore';

export const NcmcSupportPage = () => {
  const { activeCard, supportTickets, submitSupportTicket } = useNcmcStore();

  const [issueType, setIssueType] = useState('Gate Tap Double Deduction');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('snehal.hande@nexus-enterprise.in');
  const [ticketResult, setTicketResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const res = submitSupportTicket({
        issueType,
        description,
        contactEmail
      });
      setIsSubmitting(false);
      setTicketResult(res);
      setDescription('');
    }, 800);
  };

  const supportFaqs = [
    {
      q: 'What should I do if the turnstile deducts fare but the gate does not open?',
      a: 'In live Metro stations, approach the Station Master / Customer Care counter immediately. Conductor AFC gates maintain an automatic 60-second reversal window for uncompleted gate entries.'
    },
    {
      q: 'How long does an online wallet recharge take to reflect on my card?',
      a: 'Online top-ups are validated when you physically tap your card at any Metro Station Add-Value Machine (AVM), Ticket Vending Machine (TVM), or AFC entry gate.'
    },
    {
      q: 'Can I use one NCMC card for multiple passengers on the same metro trip?',
      a: 'No. NCMC contactless smart cards operate on closed-loop turnstile logic (Entry & Exit pair). Each commuter must carry their own card or token to clear automatic turnstiles.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#E5EDF5]">
        <Link
          to="/ncmc/dashboard"
          className="p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#DCEEFF] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-[#3898D8]" />
            <span>NCMC Cardholder Support &amp; Grievance Desk</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Log turnstile tap disputes, report double deductions, or inquire about card sync
          </p>
        </div>
      </div>

      {ticketResult && (
        <div className="p-6 rounded-3xl bg-[#E6F7F5] border border-[#19A89A]/30 text-[#153B5B] space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-[#148377]">
              <CheckCircle2 className="w-5 h-5 text-[#19A89A]" />
              <span>Grievance Ticket Registered in Demo Sandbox</span>
            </div>
            <span className="font-mono text-xs text-[#148377] bg-white border border-[#19A89A]/30 px-2 py-0.5 rounded font-bold">
              {ticketResult.ticketNumber}
            </span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            {ticketResult.message}
          </p>
        </div>
      )}

      {/* Ticket Submission Form */}
      <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider mb-5 flex items-center gap-2">
          <Send className="w-4 h-4 text-[#3898D8]" />
          <span>Raise a New Support Ticket</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Issue Category
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
              >
                <option value="Gate Tap Double Deduction">Gate Tap Double Deduction</option>
                <option value="Card Not Read at Turnstile">Card Not Read at Turnstile</option>
                <option value="Online Top-Up Balance Sync Delay">Online Top-Up Balance Sync Delay</option>
                <option value="Transit Pass Activation Discrepancy">Transit Pass Activation Discrepancy</option>
                <option value="Physical Card Defect">Physical Card Defect</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
                Registered Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153B5B] mb-1.5">
              Incident Details (Station Gate / Bus Number / Timing)
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Gundavali Metro Gate 2 charged ₹30 twice at 09:14 AM today..."
              required
              className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white placeholder:text-[#94A3B8]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Logging Ticket...' : 'Submit Support Ticket'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Support History */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#3898D8]" />
          <span>My Support Tickets</span>
        </h3>

        <div className="space-y-3">
          {supportTickets.map((tkt) => (
            <div key={tkt.ticketNumber} className="p-4 rounded-2xl bg-white border border-[#E5EDF5] text-xs space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#3898D8]">{tkt.ticketNumber}</span>
                  <span className="font-bold text-[#153B5B]">• {tkt.issueType}</span>
                </div>
                <span className="text-[10px] bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF] px-2 py-0.5 rounded font-mono font-bold">
                  {tkt.status}
                </span>
              </div>
              <p className="text-[#64748B] text-[11px]">{tkt.description}</p>
              {tkt.resolution && (
                <div className="p-2.5 rounded-lg bg-[#E6F7F5] text-[#148377] text-[11px] border border-[#19A89A]/20 font-medium">
                  <strong>Resolution:</strong> {tkt.resolution}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Common AFC Turnstile FAQs */}
      <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#153B5B] uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#3898D8]" />
          <span>Turnstile &amp; Contactless Tap FAQs</span>
        </h3>

        <div className="space-y-3">
          {supportFaqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left font-bold text-[#153B5B] flex items-center justify-between hover:text-[#3898D8] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#3898D8] shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0 ml-2" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-[#64748B] text-[11px] leading-relaxed border-t border-[#E5EDF5] pt-3 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
