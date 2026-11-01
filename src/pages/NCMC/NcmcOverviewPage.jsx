import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Wifi, ShieldCheck, Zap, ArrowRight, LayoutDashboard, UserPlus, Link2, Sparkles, Building2, CheckCircle2, Ticket } from 'lucide-react';
import { NcmcCardVisual } from '../../components/ncmc/NcmcCardVisual';
import { useNcmcStore } from '../../store/useNcmcStore';
import { NCMC_NETWORKS, NCMC_ISSUERS } from '../../services/ncmc/ncmcService';

export const NcmcOverviewPage = () => {
  const { activeCard } = useNcmcStore();

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Showcase */}
      <div className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unified National Transit Standard • Powered by RuPay</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              One Nation • One Mobility Card
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Tap and ride seamlessly across Mumbai Metro, Pune Metro, BEST electric city buses, suburban transit turnstiles, and highway toll plazas. Zero queue delays with sub-second contactless tap-and-go.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/ncmc/dashboard"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all hover:scale-105"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open Card Dashboard</span>
              </Link>

              <Link
                to="/ncmc/recharge"
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Recharge Balance</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <NcmcCardVisual card={activeCard} />
          </div>
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/ncmc/register"
          className="p-5 rounded-2xl bg-navy-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-navy-850 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
              Apply for New NCMC Card
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Order personalized smart card with home delivery or depot counter pickup.
            </p>
          </div>
          <span className="text-[11px] font-bold text-cyan-400 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Register Now</span> &rarr;
          </span>
        </Link>

        <Link
          to="/ncmc/link"
          className="p-5 rounded-2xl bg-navy-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-navy-850 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Link2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
              Link Existing Bank Card
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Activate transit wallet on your existing RuPay debit card from SBI, HDFC, or Bank of Maharashtra.
            </p>
          </div>
          <span className="text-[11px] font-bold text-blue-400 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Link Card</span> &rarr;
          </span>
        </Link>

        <Link
          to="/ncmc/passes"
          className="p-5 rounded-2xl bg-navy-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-navy-850 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Ticket className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
              Buy Unlimited Transit Passes
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore Daily, Weekly, and 30-Day Monthly passes for unlimited metro &amp; BEST electric bus rides.
            </p>
          </div>
          <span className="text-[11px] font-bold text-purple-400 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>View Passes</span> &rarr;
          </span>
        </Link>

        <Link
          to="/ncmc/recharge"
          className="p-5 rounded-2xl bg-navy-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-navy-850 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
              Instant Wallet Recharge
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Top up demo balance instantly using UPI, Net Banking, or corporate allowance.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Top Up</span> &rarr;
          </span>
        </Link>
      </div>

      {/* Supported Transit Networks in Maharashtra */}
      <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Supported Transit Operators &amp; Gate Networks
            </h3>
            <p className="text-xs text-slate-400">
              Interoperable automated fare collection (AFC) systems live across Maharashtra
            </p>
          </div>
          <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 self-start sm:self-auto">
            100% Contactless AFC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NCMC_NETWORKS.map((network) => (
            <div key={network.id} className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{network.name}</div>
                <div className="text-[10px] text-slate-400">{network.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Strict Privacy Architecture */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/40 via-navy-900 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Zero-Knowledge Financial Privacy</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            We Never Collect or Store Your Sensitive Card Credentials
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            In compliance with RBI and NPCI tokenization mandates, our platform never requests or stores raw card PINs, CVVs, or OTPs. All card numbers are strictly masked, and transactions are simulated pending authorized issuer integration.
          </p>
        </div>

        <Link
          to="/ncmc/dashboard"
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shrink-0 border border-slate-700"
        >
          View Demo Dashboard
        </Link>
      </div>

    </div>
  );
};
