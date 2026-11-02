import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  PieChart, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Leaf
} from 'lucide-react';
import { useCorporateStore } from '../../store/useCorporateStore';

export const CorporateReportsPage = () => {
  const { corporateBookings, stats, safetyAlerts } = useCorporateStore();
  const [dateRange, setDateRange] = useState('OCT_2026');

  const handleExportReportCsv = () => {
    alert('📊 Complete enterprise mobility telemetry and utilization report exported as CSV.');
  };

  return (
    <div className="space-y-6 text-[#153B5B]">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#3898D8] uppercase tracking-wider block">
            ANALYTICS, TELEMETRY AUDIT &amp; ESG COMPLIANCE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#153B5B] font-display mt-0.5">
            Mobility Reports &amp; Analytics
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Fleet utilization, driver punctuality SLA, ESG carbon offset telemetry and female escort compliance records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl px-3 py-2 text-xs font-semibold text-[#153B5B]"
          >
            <option value="OCT_2026">October 2026 (Current Cycle)</option>
            <option value="SEP_2026">September 2026</option>
            <option value="Q3_2026">Q3 FY26 Performance</option>
            <option value="YTD_2026">Year-to-Date 2026</option>
          </select>

          <button
            onClick={handleExportReportCsv}
            className="px-4 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">SLA Punctuality</span>
          <div className="text-2xl sm:text-3xl font-black text-[#19A89A] font-display">{stats.onTimePunctuality}%</div>
          <span className="text-[10px] text-[#64748B]">Platinum 99% Benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Fleet Seat Occupancy</span>
          <div className="text-2xl sm:text-3xl font-black text-[#3898D8] font-display">86.4%</div>
          <span className="text-[10px] text-[#19A89A] font-semibold">+4.2% Route Optimized</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">ESG Carbon Offset</span>
          <div className="text-2xl sm:text-3xl font-black text-[#19A89A] font-display">14.2 Tons</div>
          <span className="text-[10px] text-[#64748B]">CO2 Saved via Shared Van/Bus</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Night Shift Escort</span>
          <div className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">100%</div>
          <span className="text-[10px] text-[#19A89A] font-semibold">Zero Compliance Violations</span>
        </div>
      </div>

      {/* Visual Report Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Expenditure Trend */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#153B5B]">Monthly Commute Mobility Spend (₹ Lakhs)</h3>
              <p className="text-xs text-[#64748B]">Fixed contracts vs ad-hoc dynamic travel expenditure</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#19A89A] bg-[#E6F7F5] px-2.5 py-0.5 rounded-full">
              Budget Controlled
            </span>
          </div>

          <div className="h-52 pt-6 flex items-end justify-between gap-4 px-2">
            {[
              { month: 'Jun', fixed: 21.0, adhoc: 3.2, height: '65%' },
              { month: 'Jul', fixed: 21.5, adhoc: 4.3, height: '70%' },
              { month: 'Aug', fixed: 22.0, adhoc: 4.1, height: '74%' },
              { month: 'Sep', fixed: 22.5, adhoc: 4.4, height: '78%' },
              { month: 'Oct', fixed: 23.0, adhoc: 5.4, height: '88%' },
              { month: 'Nov (Est)', fixed: 23.0, adhoc: 4.5, height: '82%' }
            ].map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono font-bold text-[#153B5B]">₹{(b.fixed + b.adhoc).toFixed(1)}L</span>
                <div 
                  className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-[#153B5B] via-[#3898D8] to-[#19A89A] hover:brightness-110 transition-all shadow-sm"
                  style={{ height: b.height }}
                />
                <span className="text-xs text-[#64748B] font-semibold">{b.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 border-t border-[#E5EDF5] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#3898D8]" />
              <span className="text-[#64748B]">Fixed Scheduled Shifts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#19A89A]" />
              <span className="text-[#64748B]">Ad-hoc &amp; Business Travel</span>
            </div>
          </div>
        </div>

        {/* Fleet Vehicle Utilization Split */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-[#E5EDF5] p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#153B5B]">Fleet Category Distribution</h3>
            <p className="text-xs text-[#64748B]">Active vehicles deployed across corporate shifts</p>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#153B5B] font-semibold">Executive SUVs (Innova Crysta / Hycross)</span>
                <strong className="text-[#153B5B] font-mono">42% (31 Cabs)</strong>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#3898D8] rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#153B5B] font-semibold">Prime Sedans (Maruti Dzire CNG / Amaze)</span>
                <strong className="text-[#153B5B] font-mono">30% (22 Cabs)</strong>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#19A89A] rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#153B5B] font-semibold">Shared Vans (Force Urbania 17-Seater)</span>
                <strong className="text-[#153B5B] font-mono">18% (13 Vans)</strong>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#153B5B] font-semibold">Corporate Shuttles (BharatBenz Coaches)</span>
                <strong className="text-[#153B5B] font-mono">10% (8 Buses)</strong>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EFF7FC] overflow-hidden">
                <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#EFF7FC] border border-[#E5EDF5] text-xs text-[#64748B] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#19A89A] shrink-0" />
            <span>Optimal passenger-to-vehicle seat allocation ratio of 94.2%.</span>
          </div>
        </div>

      </div>

      {/* Safety & Compliance Telemetry Audit */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#153B5B]">Employee Safety &amp; Night Shift Escort Telemetry Log</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#153B5B]">SOS Response Desk</span>
              <span className="text-[10px] text-[#19A89A] font-bold">✓ 100% Resolved</span>
            </div>
            <p className="text-[#64748B]">All 3 simulated test pings addressed within 45 seconds benchmark.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#153B5B]">Police Background Verification</span>
              <span className="text-[10px] text-[#19A89A] font-bold">✓ 100% Compliant</span>
            </div>
            <p className="text-[#64748B]">Every chauffeur carrying active commercial license and police clearance certificates.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#153B5B]">RTO Speed Governors</span>
              <span className="text-[10px] text-[#19A89A] font-bold">✓ 80 km/h Calibrated</span>
            </div>
            <p className="text-[#64748B]">Zero speeding incidents recorded on Mumbai-Pune and Thane-Airoli corridors.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
