import React, { useState } from 'react';
import { 
  Truck, 
  Car, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Receipt, 
  DollarSign,
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const VendorPortalPage = () => {
  const { vendors, vehicles, drivers, invoices, submitVendorInvoice } = useCorporateStore();

  const currentVendor = vendors[0] || {
    id: 'VND-01',
    name: 'Mahalaxmi Mobility Solutions Pvt Ltd',
    contactPerson: 'Sanjay Deshmukh',
    phone: '+91 98220 77100',
    email: 'partners@mahalaxmitravels.com',
    city: 'Mumbai & Navi Mumbai',
    activeFleetCount: 38,
    activeDriversCount: 42,
    rating: 4.88,
    monthlyTurnover: 1840000
  };

  const [isSubmitInvoiceOpen, setIsSubmitInvoiceOpen] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState(485000);
  const [invoicePeriod, setInvoicePeriod] = useState('October 2026 Commute Fleet');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitInvoice = (e) => {
    e.preventDefault();
    submitVendorInvoice({
      vendorName: currentVendor.name,
      amount: Number(invoiceAmount),
      period: invoicePeriod
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitInvoiceOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-[#153B5B]">
      
      {/* Top Vendor Header Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#DCEEFF] text-[#3898D8] flex items-center justify-center font-black shadow-sm">
            <Truck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#153B5B] font-display">
                {currentVendor.name}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F7F5] text-[#19A89A] border border-[#19A89A]/30">
                Verified Vendor Partner
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Contact: {currentVendor.contactPerson} • {currentVendor.phone} • {currentVendor.city}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSubmitInvoiceOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-md shadow-[#3898D8]/20 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Receipt className="w-4 h-4" />
          <span>Submit Monthly Vendor Bill</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Contracted Fleet</span>
          <div className="text-2xl font-black text-[#153B5B] font-display">{currentVendor.activeFleetCount} Cabs</div>
          <span className="text-[10px] text-[#19A89A] font-semibold">100% RTO Fitness Cleared</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Active Chauffeurs</span>
          <div className="text-2xl font-black text-[#3898D8] font-display">{currentVendor.activeDriversCount} Drivers</div>
          <span className="text-[10px] text-[#64748B]">Police Verification Complete</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Vendor SLA Score</span>
          <div className="text-2xl font-black text-amber-500 font-display">★ {currentVendor.rating}</div>
          <span className="text-[10px] text-[#64748B]">Top 5% Partner Tier</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Monthly Billing (Est)</span>
          <div className="text-2xl font-black text-[#19A89A] font-display">₹18.4 Lakhs</div>
          <span className="text-[10px] text-[#64748B]">Net-15 Disbursed</span>
        </div>
      </div>

      {/* Active Rate Cards & Retainer Structure */}
      <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
          <h3 className="text-base font-bold text-[#153B5B]">Approved Retainer Vehicle Rate Cards</h3>
          <span className="text-xs font-mono font-bold text-[#3898D8]">Q4 FY26 CONTRACT FIXED RATES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { category: 'Prime Sedan', models: 'Dzire / Amaze', base: '₹14 / KM', dailyPackage: '₹1,600 / 80 KM', tollPolicy: 'Fastag billed at actuals' },
            { category: 'Executive SUV', models: 'Innova Crysta / Hycross', base: '₹19 / KM', dailyPackage: '₹2,450 / 80 KM', tollPolicy: 'Fastag billed at actuals' },
            { category: 'Tempo Traveller', models: 'Force Urbania 17-Seater', base: '₹26 / KM', dailyPackage: '₹3,600 / 80 KM', tollPolicy: 'Fastag billed at actuals' },
            { category: 'Corporate Coach', models: 'BharatBenz 26-Seater', base: '₹34 / KM', dailyPackage: '₹4,800 / 80 KM', tollPolicy: 'State permits included' }
          ].map((r, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#153B5B]">{r.category}</span>
                <span className="font-mono text-[#3898D8] font-bold">{r.base}</span>
              </div>
              <div className="text-[11px] text-[#64748B]">{r.models}</div>
              <div className="pt-2 border-t border-[#E5EDF5] text-[11px] text-[#153B5B]">
                <div>Package: <strong>{r.dailyPackage}</strong></div>
                <div className="text-[#19A89A]">{r.tollPolicy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contracted Vehicles Under This Vendor */}
      <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#153B5B]">Assigned Fleet Inventory (Vendor Roster)</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {vehicles.slice(0, 3).map((v) => (
            <div key={v.id} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#3898D8] bg-white px-2 py-0.5 rounded border border-[#E5EDF5]">{v.plateNumber}</span>
                <span className="text-[10px] text-[#19A89A] font-bold">✓ Active in Service</span>
              </div>
              <div className="font-bold text-[#153B5B]">{v.model}</div>
              <div className="text-[#64748B] text-[11px]">Chauffeur: <strong>{v.assignedDriver}</strong></div>
              <div className="text-[11px] text-[#64748B]">RTO Fitness valid till: <strong className="text-[#153B5B]">{v.fitnessExpiry}</strong></div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MODAL: SUBMIT VENDOR INVOICE
          ========================================================================= */}
      {isSubmitInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-[#E5EDF5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#153B5B]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
              <h3 className="text-base font-bold text-[#153B5B]">Submit Monthly Fleet Bill</h3>
              <button
                onClick={() => setIsSubmitInvoiceOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#153B5B] hover:bg-[#EFF7FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-4 rounded-xl bg-[#E6F7F5] border border-[#19A89A]/30 text-center text-xs font-bold text-[#19A89A]">
                ✓ Invoice submitted for corporate finance audit!
              </div>
            ) : (
              <form onSubmit={handleSubmitInvoice} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Billing Period / Service Description</label>
                  <input
                    type="text"
                    required
                    value={invoicePeriod}
                    onChange={(e) => setInvoicePeriod(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-semibold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>

                <div>
                  <label className="block text-[#153B5B] font-bold mb-1">Total Bill Amount (INR ₹)</label>
                  <input
                    type="number"
                    required
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-4 py-2.5 text-xs text-[#153B5B] font-mono font-bold focus:outline-none focus:border-[#3898D8]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[11px] text-[#64748B]">
                  Standard Net-15 audit reconciliation applies according to the signed SLA agreement.
                </div>

                <div className="pt-3 border-t border-[#E5EDF5] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitInvoiceOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#EFF7FC] text-[#153B5B] font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#3898D8] text-white font-bold"
                  >
                    Submit Invoice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
