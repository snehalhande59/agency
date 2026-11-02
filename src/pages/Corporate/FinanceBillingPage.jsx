import React, { useState } from 'react';
import { 
  Receipt, 
  Download, 
  CheckCircle2, 
  Clock, 
  FileText, 
  DollarSign, 
  Building2, 
  Calendar, 
  ArrowUpRight,
  Filter,
  Search,
  Check
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const FinanceBillingPage = () => {
  const { invoices, companyProfile, settleInvoice } = useCorporateStore();
  const [filter, setFilter] = useState('ALL');

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'PAID') return inv.status === 'PAID_SETTLED';
    if (filter === 'UNPAID') return inv.status !== 'PAID_SETTLED';
    return true;
  });

  const totalBilledYtd = invoices.reduce((acc, curr) => acc + curr.netPayable, 0);

  const handleDownloadPdf = (invoiceNumber) => {
    alert(`📄 Demo Corporate Invoice ${invoiceNumber} downloaded as PDF with GST input tax credit (ITC) schedule.`);
  };

  const handleExportCsv = () => {
    alert('📊 Monthly mobility expense ledger exported as CSV spreadsheet.');
  };

  return (
    <div className="space-y-6 text-[#153B5B]">
      
      {/* Header Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#3898D8] uppercase tracking-wider block">
            ENTERPRISE MOBILITY BILLING &amp; DISBURSEMENT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display mt-0.5">
            Finance, Billing &amp; Monthly Invoices
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            GST compliant monthly consolidated invoices, department budget allocation, and vendor settlement reconciliation.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] font-bold text-xs border border-[#E5EDF5] transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-[#3898D8]" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Current Month Net Due</span>
          <div className="text-2xl sm:text-3xl font-black text-[#3898D8] font-display">₹27.77 Lakhs</div>
          <span className="text-[10px] text-[#64748B]">Due by 15 Nov 2026</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Billed YTD</span>
          <div className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">₹{(totalBilledYtd / 100000).toFixed(1)} Lakhs</div>
          <span className="text-[10px] text-[#19A89A] font-semibold">100% Tax Compliant</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">GST Input Tax Credit</span>
          <div className="text-2xl sm:text-3xl font-black text-[#19A89A] font-display">₹3.85 Lakhs</div>
          <span className="text-[10px] text-[#64748B]">5% GST on transport</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Billing Model</span>
          <div className="text-xl font-bold text-[#153B5B] font-display">Net-30 Invoicing</div>
          <span className="text-[10px] text-[#3898D8] font-semibold">Zero Surge Surcharge</span>
        </div>
      </div>

      {/* Department Expense Allocation */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
          <h3 className="text-base font-bold text-[#153B5B]">Department Expense Breakdown (October 2026)</h3>
          <span className="text-xs font-mono text-[#64748B]">ALLOCATION PER COST CENTRE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {[
            { dept: 'Engineering & Tech', cost: '₹13.40 Lakhs', trips: '2,340 trips', share: '48%', code: 'CC-ENG-401' },
            { dept: 'Data & Analytics', cost: '₹4.90 Lakhs', trips: '840 trips', share: '18%', code: 'CC-DATA-103' },
            { dept: 'Product Management', cost: '₹3.90 Lakhs', trips: '680 trips', share: '14%', code: 'CC-PROD-202' },
            { dept: 'Enterprise Sales', cost: '₹3.20 Lakhs', trips: '490 trips', share: '11%', code: 'CC-SALES-501' },
            { dept: 'Finance & Legal', cost: '₹1.45 Lakhs', trips: '310 trips', share: '5%', code: 'CC-FIN-601' },
            { dept: 'Leadership Executive', cost: '₹0.92 Lakhs', trips: '230 trips', share: '4%', code: 'CC-EXEC-101' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#153B5B]">{item.dept}</span>
                <span className="font-mono text-[#3898D8] font-bold">{item.share}</span>
              </div>
              <div className="text-base font-extrabold text-[#153B5B] font-display">{item.cost}</div>
              <div className="flex justify-between text-[11px] text-[#64748B]">
                <span>{item.trips}</span>
                <span className="font-mono">{item.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Invoices List */}
      <div className="rounded-3xl bg-white border border-[#E5EDF5] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E5EDF5] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#3898D8]" />
            <h3 className="text-base font-bold text-[#153B5B]">Official Consolidated Company Invoices</h3>
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'UNPAID', 'PAID'].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filter === mode 
                    ? 'bg-[#3898D8] text-white shadow-sm' 
                    : 'bg-white text-[#64748B] hover:text-[#153B5B] border border-[#E5EDF5]'
                }`}
              >
                {mode === 'ALL' ? 'All Invoices' : mode === 'UNPAID' ? 'Pending Disbursal' : 'Settled'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5EDF5] text-[#64748B] uppercase tracking-wider text-[11px] bg-[#F8FAFC]">
                <th className="py-3 px-4 font-bold">Invoice Ref</th>
                <th className="py-3 px-4 font-bold">Billing Cycle</th>
                <th className="py-3 px-4 font-bold">Trips &amp; KM</th>
                <th className="py-3 px-4 font-bold">Base Tariff</th>
                <th className="py-3 px-4 font-bold">GST (5%)</th>
                <th className="py-3 px-4 font-bold">Net Total</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              {filteredInvoices.map((inv) => (
                <tr key={inv.invoiceNumber} className="hover:bg-[#EFF7FC]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#3898D8]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#153B5B]">{inv.month}</div>
                    <div className="text-[10px] text-[#64748B]">Due: {inv.dueDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#153B5B]">{inv.tripsCount?.toLocaleString()} Trips</div>
                    <div className="text-[10px] text-[#64748B] font-mono">{inv.totalKilometers?.toLocaleString()} KM logged</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#153B5B]">
                    ₹{inv.baseServiceCharge?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#19A89A]">
                    ₹{inv.gstTax?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-[#153B5B]">
                    ₹{inv.netPayable?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      inv.status === 'PAID_SETTLED'
                        ? 'bg-[#E6F7F5] text-[#19A89A] border-[#19A89A]/30'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {inv.status === 'PAID_SETTLED' ? 'PAID & SETTLED' : 'ISSUED / UNPAID'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status !== 'PAID_SETTLED' && (
                        <button
                          onClick={() => settleInvoice(inv.invoiceNumber)}
                          className="px-2.5 py-1 rounded-lg bg-[#19A89A] hover:bg-[#158f83] text-white text-[11px] font-bold shadow-sm"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => handleDownloadPdf(inv.invoiceNumber)}
                        className="p-1.5 rounded-lg bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] border border-[#E5EDF5]"
                        title="Download Invoice PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
