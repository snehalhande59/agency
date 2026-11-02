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
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <Link
          to="/ncmc/dashboard"
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-cyan-400" />
            <span>NCMC Cardholder Support &amp; Grievance Desk</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Log turnstile tap disputes, report double deductions, or inquire about card sync
          </p>
        </div>
      </div>

      {ticketResult && (
        <div className="p-6 rounded-3xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Grievance Ticket Registered in Demo Sandbox</span>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
              {ticketResult.ticketNumber}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {ticketResult.message}
          </p>
        </div>
      )}

      {/* Ticket Submission Form */}
      <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
          <Send className="w-4 h-4 text-cyan-400" />
          <span>Raise a New Support Ticket</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Issue Category
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Gate Tap Double Deduction">Gate Tap Double Deduction</option>
                <option value="Card Not Read at Turnstile">Card Not Read at Turnstile</option>
                <option value="Online Top-Up Balance Sync Delay">Online Top-Up Balance Sync Delay</option>
                <option value="Transit Pass Activation Discrepancy">Transit Pass Activation Discrepancy</option>
                <option value="Physical Card Defect">Physical Card Defect</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Registered Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Incident Details (Station Gate / Bus Number / Timing)
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Gundavali Metro Gate 2 charged ₹30 twice at 09:14 AM today..."
              required
              className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Logging Ticket...' : 'Submit Support Ticket'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Support History */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>My Support Tickets</span>
        </h3>

        <div className="space-y-3">
          {supportTickets.map((tkt) => (
            <div key={tkt.ticketNumber} className="p-4 rounded-2xl bg-navy-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-cyan-300">{tkt.ticketNumber}</span>
                  <span className="font-semibold text-white">• {tkt.issueType}</span>
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                  {tkt.status}
                </span>
              </div>
              <p className="text-slate-400 text-[11px]">{tkt.description}</p>
              {tkt.resolution && (
                <div className="p-2.5 rounded-lg bg-navy-950 text-emerald-400 text-[11px] border border-emerald-500/20">
                  <strong>Resolution:</strong> {tkt.resolution}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Common AFC Turnstile FAQs */}
      <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Turnstile &amp; Contactless Tap FAQs</span>
        </h3>

        <div className="space-y-3">
          {supportFaqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="rounded-xl bg-navy-950 border border-slate-800 overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left font-bold text-white flex items-center justify-between hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-slate-400 text-[11px] leading-relaxed border-t border-slate-800/80 pt-3">
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
