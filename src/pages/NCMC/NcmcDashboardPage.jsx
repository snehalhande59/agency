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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5EDF5] gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display flex items-center gap-2">
            <span>Cardholder Transit Dashboard</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF7FC] text-[#3898D8] px-2.5 py-0.5 rounded-full border border-[#DCEEFF]">
              Active
            </span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage your RuPay contactless smart card, monitor tap history, and inspect digital passes
          </p>
        </div>

        {cardsList.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] font-bold">Active Card:</span>
            <select
              value={activeCard.cardId}
              onChange={(e) => {
                const found = cardsList.find((c) => c.cardId === e.target.value);
                if (found) setActiveCard(found);
              }}
              className="bg-white border border-[#E5EDF5] text-xs font-mono font-bold text-[#153B5B] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#3898D8]"
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
          <div className="mt-4 flex items-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1 text-[#19A89A] font-bold">
              <Wifi className="w-3.5 h-3.5" />
              <span>NFC Tap &amp; Go Active</span>
            </span>
            <span>•</span>
            <span>ID: <strong className="font-mono text-[#153B5B]">{activeCard.cardId}</strong></span>
          </div>
        </div>

        {/* Right: Balance & Active Pass Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Balance Widget */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Demo Transit Balance</span>
                <span className="text-[10px] bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF] px-2 py-0.5 rounded font-mono font-bold">RuPay Stored</span>
              </div>
              <div className="text-3xl font-black text-[#153B5B] font-mono mt-2 flex items-center gap-1">
                <span className="text-[#3898D8]">₹</span>
                <span>{activeCard.walletBalance.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">
                Valid at all metro turnstiles &amp; BEST bus validator terminals
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/ncmc/recharge"
                className="w-full py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Recharge Card Balance</span>
              </Link>
            </div>
          </div>

          {/* Active Pass Widget */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm flex flex-col justify-between space-y-4">
            {activePass ? (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Active Pass</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      {activePass.daysRemaining} Days Left
                    </span>
                  </div>
                  <div className="text-base font-bold text-[#153B5B] mt-1.5 line-clamp-1">{activePass.title}</div>
                  <div className="text-xs text-[#3898D8] font-bold mt-0.5">{activePass.network}</div>
                  <div className="text-[10px] text-[#64748B] mt-2 font-mono font-semibold">
                    Valid until: {activePass.validUntil}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="flex-1 py-2.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#3898D8] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#DCEEFF] transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#3898D8]" />
                    <span>Show Gate QR</span>
                  </button>

                  <Link
                    to="/ncmc/passes"
                    className="px-3 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF7FC] text-[#64748B] hover:text-[#153B5B] text-xs border border-[#E5EDF5]"
                    title="Change Pass"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <Ticket className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
                <div className="text-xs font-bold text-[#153B5B]">No Active Unlimited Pass</div>
                <Link
                  to="/ncmc/passes"
                  className="mt-3 inline-block px-4 py-2 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white text-xs font-bold"
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
          className="p-4 rounded-2xl bg-white border border-[#E5EDF5] hover:border-[#3898D8] hover:shadow-md text-center transition-all group shadow-2xs"
        >
          <Zap className="w-5 h-5 text-[#3898D8] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#153B5B]">Instant Top-Up</div>
          <div className="text-[10px] text-[#64748B] mt-0.5">UPI &amp; Net Banking</div>
        </Link>

        <Link
          to="/ncmc/transactions"
          className="p-4 rounded-2xl bg-white border border-[#E5EDF5] hover:border-[#3898D8] hover:shadow-md text-center transition-all group shadow-2xs"
        >
          <History className="w-5 h-5 text-[#3898D8] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#153B5B]">Tap History</div>
          <div className="text-[10px] text-[#64748B] mt-0.5">Metro &amp; Bus Ledger</div>
        </Link>

        <Link
          to="/ncmc/passes"
          className="p-4 rounded-2xl bg-white border border-[#E5EDF5] hover:border-[#3898D8] hover:shadow-md text-center transition-all group shadow-2xs"
        >
          <Ticket className="w-5 h-5 text-purple-600 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#153B5B]">Transit Passes</div>
          <div className="text-[10px] text-[#64748B] mt-0.5">Daily, Weekly, Monthly</div>
        </Link>

        <Link
          to="/ncmc/lost-card"
          className="p-4 rounded-2xl bg-white border border-[#E5EDF5] hover:border-rose-400 hover:shadow-md text-center transition-all group shadow-2xs"
        >
          <AlertTriangle className="w-5 h-5 text-rose-500 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-[#153B5B]">Report Lost Card</div>
          <div className="text-[10px] text-[#64748B] mt-0.5">Instant Safe Block</div>
        </Link>
      </div>

      {/* Recent Tap & Go Transactions Feed */}
      <div className="rounded-3xl bg-white border border-[#E5EDF5] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5EDF5]">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-[#3898D8]" />
            <h3 className="text-sm sm:text-base font-bold text-[#153B5B]">Recent Tap &amp; Go Turnstile Logs</h3>
          </div>
          <Link
            to="/ncmc/transactions"
            className="text-xs font-bold text-[#3898D8] hover:text-[#287DB8] flex items-center gap-1"
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
                className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isRecharge
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : isEntry
                      ? 'bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]'
                      : 'bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]'
                  }`}>
                    {isRecharge ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-[#153B5B]">{txn.location}</div>
                    <div className="text-[10px] text-[#64748B]">
                      {txn.timestamp} • <span className="text-[#153B5B] font-semibold">{txn.network}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-mono font-bold ${isRecharge ? 'text-emerald-600' : 'text-[#153B5B]'}`}>
                    {isRecharge ? `+₹${txn.amount.toFixed(2)}` : isEntry ? 'Check-in (₹0)' : `-₹${txn.amount.toFixed(2)}`}
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] font-semibold">{txn.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Gate Pass Modal Simulation */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-[#E5EDF5] p-6 text-center space-y-4 shadow-2xl relative text-[#153B5B]">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EDF5]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3898D8]">
                Digital Turnstile QR Pass
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="text-[#64748B] hover:text-[#153B5B] text-xs font-mono font-bold p-1 rounded hover:bg-[#EFF7FC]"
              >
                ✕
              </button>
            </div>

            {/* QR Mockup */}
            <div className="p-4 bg-white rounded-2xl mx-auto inline-block shadow-inner border border-[#E5EDF5]">
              <div className="w-48 h-48 bg-slate-900 p-2 rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2 bg-white rounded-lg">
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-[#3898D8] rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-black rounded-sm" />

                  <div className="bg-white rounded-sm" />
                  <div className="bg-[#3898D8] rounded-sm" />
                  <div className="bg-black rounded-sm" />
                  <div className="bg-[#3898D8] rounded-sm" />
                  <div className="bg-white rounded-sm" />

                  <div className="bg-black rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-[#3898D8] rounded-sm" />
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
              <div className="text-xs font-bold text-[#153B5B] font-mono">{activePass?.qrGateCode}</div>
              <p className="text-[10px] text-[#64748B] mt-1">
                Scan at optical gate reader on Metro Line 2A, 7 or BEST electric bus
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#3898D8] hover:bg-[#287DB8] text-white font-bold text-xs shadow-sm"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
