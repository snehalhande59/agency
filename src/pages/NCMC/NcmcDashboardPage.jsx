import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Zap, History, Ticket, ArrowUpRight, ArrowDownLeft, ShieldCheck, Wifi, Sparkles, QrCode, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { NcmcCardVisual } from '../../components/ncmc/NcmcCardVisual';
import { useNcmcStore } from '../../store/useNcmcStore';

export const NcmcDashboardPage = () => {
  const { activeCard, cardsList, setActiveCard, activePass, transactions } = useNcmcStore();
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Card Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <span>Cardholder Transit Dashboard</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              Active
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your RuPay contactless smart card, monitor tap history, and inspect digital passes
          </p>
        </div>

        {cardsList.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Active Card:</span>
            <select
              value={activeCard.cardId}
              onChange={(e) => {
                const found = cardsList.find((c) => c.cardId === e.target.value);
                if (found) setActiveCard(found);
              }}
              className="bg-navy-900 border border-slate-700 text-xs font-mono font-bold text-cyan-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400"
            >
              {cardsList.map((c) => (
                <option key={c.cardId} value={c.cardId}>
                  {c.maskedCardNumber} ({c.issuerBank})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Top Grid: Card Visual + Balance & Pass Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Card Visual */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <NcmcCardVisual card={activeCard} />
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Wifi className="w-3.5 h-3.5" />
              <span>NFC Tap &amp; Go Active</span>
            </span>
            <span>•</span>
            <span>ID: <strong className="font-mono text-slate-200">{activeCard.cardId}</strong></span>
          </div>
        </div>

        {/* Right: Balance & Active Pass Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Balance Widget */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-navy-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Demo Transit Balance</span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono">RuPay Stored</span>
              </div>
              <div className="text-3xl font-black text-white font-mono mt-2 flex items-center gap-1">
                <span className="text-cyan-400">₹</span>
                <span>{activeCard.walletBalance.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Valid at all metro turnstiles &amp; BEST bus validator terminals
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/ncmc/recharge"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-600/30 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Recharge Card Balance</span>
              </Link>
            </div>
          </div>

          {/* Active Pass Widget */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-navy-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            {activePass ? (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Pass</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      {activePass.daysRemaining} Days Left
                    </span>
                  </div>
                  <div className="text-base font-bold text-white mt-1.5 line-clamp-1">{activePass.title}</div>
                  <div className="text-xs text-cyan-400 mt-0.5">{activePass.network}</div>
                  <div className="text-[10px] text-slate-400 mt-2 font-mono">
                    Valid until: {activePass.validUntil}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Show Gate QR</span>
                  </button>

                  <Link
                    to="/ncmc/passes"
                    className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700"
                    title="Change Pass"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <Ticket className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <div className="text-xs font-bold text-white">No Active Unlimited Pass</div>
                <Link
                  to="/ncmc/passes"
                  className="mt-3 inline-block px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                >
                  Buy Transit Pass
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Quick Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/ncmc/recharge"
          className="p-4 rounded-2xl bg-navy-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-navy-850 text-center transition-all group"
        >
          <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">Instant Top-Up</div>
          <div className="text-[10px] text-slate-400 mt-0.5">UPI &amp; Net Banking</div>
        </Link>

        <Link
          to="/ncmc/transactions"
          className="p-4 rounded-2xl bg-navy-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-navy-850 text-center transition-all group"
        >
          <History className="w-5 h-5 text-blue-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">Tap History</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Metro &amp; Bus Ledger</div>
        </Link>

        <Link
          to="/ncmc/passes"
          className="p-4 rounded-2xl bg-navy-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-navy-850 text-center transition-all group"
        >
          <Ticket className="w-5 h-5 text-purple-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">Transit Passes</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Daily, Weekly, Monthly</div>
        </Link>

        <Link
          to="/ncmc/lost-card"
          className="p-4 rounded-2xl bg-navy-900 border border-slate-800 hover:border-rose-500/40 hover:bg-navy-850 text-center transition-all group"
        >
          <AlertTriangle className="w-5 h-5 text-rose-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-white">Report Lost Card</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Instant Safe Block</div>
        </Link>
      </div>

      {/* Recent Tap & Go Transactions Feed */}
      <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">Recent Tap &amp; Go Turnstile Logs</h3>
          </div>
          <Link
            to="/ncmc/transactions"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View Full Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 4).map((txn) => {
            const isRecharge = txn.type === 'WALLET_RECHARGE';
            const isEntry = txn.type === 'ENTRY_TAP';

            return (
              <div
                key={txn.id}
                className="p-3.5 rounded-xl bg-navy-950 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isRecharge
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                      : isEntry
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {isRecharge ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-white">{txn.location}</div>
                    <div className="text-[10px] text-slate-400">
                      {txn.timestamp} • <span className="text-slate-300">{txn.network}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-mono font-bold ${isRecharge ? 'text-emerald-400' : 'text-white'}`}>
                    {isRecharge ? `+₹${txn.amount.toFixed(2)}` : isEntry ? 'Check-in (₹0)' : `-₹${txn.amount.toFixed(2)}`}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{txn.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Gate Pass Modal Simulation */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-navy-900 border border-cyan-500/40 p-6 text-center space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Digital Turnstile QR Pass
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold"
              >
                ✕
              </button>
            </div>

            {/* QR Mockup */}
            <div className="p-4 bg-white rounded-2xl mx-auto inline-block shadow-inner">
              <div className="w-48 h-48 bg-slate-900 p-2 rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2 bg-white rounded-lg">
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-cyan-600 rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-white rounded-sm" />
                  <div className="bg-cyan-600 rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-cyan-600 rounded-sm" />
                  <div className="bg-white rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-cyan-600 rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-white font-mono">{activePass?.qrGateCode}</div>
              <p className="text-[10px] text-slate-400 mt-1">
                Scan at optical gate reader on Metro Line 2A, 7 or BEST electric bus
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
