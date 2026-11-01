import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowLeft, Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNcmcStore } from '../../store/useNcmcStore';

export const NcmcTransactionsPage = () => {
  const { transactions, activeCard } = useNcmcStore();

  const [filterMode, setFilterMode] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTxnId, setExpandedTxnId] = useState(null);

  const filteredTxns = transactions.filter((txn) => {
    const matchesFilter =
      filterMode === 'ALL' ||
      (filterMode === 'METRO' && txn.mode === 'Metro Rail') ||
      (filterMode === 'BUS' && txn.mode === 'Urban Bus') ||
      (filterMode === 'TOPUP' && txn.mode === 'Top-Up');

    const matchesSearch =
      !searchQuery ||
      txn.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedTxnId(expandedTxnId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/ncmc/dashboard"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Tap &amp; Go Turnstile Transaction Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Card: <span className="font-mono text-cyan-300">{activeCard.maskedCardNumber}</span>
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Showing {filteredTxns.length} Recorded Transit Events
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-navy-900/80 p-4 rounded-2xl border border-slate-800 shadow-md">
        
        {/* Search */}
        <div className="sm:col-span-7 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search station, bus route, or txn ID..."
            className="w-full bg-navy-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
          />
        </div>

        {/* Filter Chips */}
        <div className="sm:col-span-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'METRO', label: 'Metro Rail' },
            { id: 'BUS', label: 'BEST Bus' },
            { id: 'TOPUP', label: 'Top-Ups' }
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterMode(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterMode === f.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-navy-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTxns.length > 0 ? (
          filteredTxns.map((txn) => {
            const isRecharge = txn.type === 'WALLET_RECHARGE';
            const isEntry = txn.type === 'ENTRY_TAP';
            const isExpanded = expandedTxnId === txn.id;

            return (
              <div
                key={txn.id}
                className="rounded-2xl bg-navy-900 border border-slate-800/90 overflow-hidden hover:border-slate-700 transition-all"
              >
                <div
                  onClick={() => toggleExpand(txn.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isRecharge
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                        : isEntry
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {isRecharge ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <span>{txn.location}</span>
                        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">{txn.id}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{txn.timestamp}</span>
                        <span>•</span>
                        <span className="text-cyan-400 font-medium">{txn.network}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-sm sm:text-base font-black font-mono ${
                        isRecharge ? 'text-emerald-400' : isEntry ? 'text-slate-400' : 'text-white'
                      }`}>
                        {isRecharge ? `+₹${txn.amount.toFixed(2)}` : isEntry ? 'Check-in (₹0)' : `-₹${txn.amount.toFixed(2)}`}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {txn.status}
                      </span>
                    </div>

                    <div className="text-slate-500 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Itemized Receipt */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-navy-950 border-t border-slate-800 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Tap Event Type</span>
                      <span className="font-mono text-white font-semibold">{txn.type}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Transit Operator</span>
                      <span className="text-white font-medium">{txn.network}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">AFC Settlement Terminal</span>
                      <span className="font-mono text-cyan-300">GATE-NCMC-P9910</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-navy-900/50 rounded-2xl border border-slate-800 p-8">
            <History className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">No Matching Transactions</h3>
            <p className="text-xs text-slate-400">Try adjusting your search query or filter chip.</p>
          </div>
        )}
      </div>

    </div>
  );
};
