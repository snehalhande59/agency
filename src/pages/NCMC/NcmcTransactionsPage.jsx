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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5EDF5] gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/ncmc/dashboard"
            className="p-2.5 rounded-xl bg-[#EFF7FC] border border-[#E5EDF5] text-[#153B5B] hover:text-[#3898D8] hover:bg-[#DCEEFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#153B5B] font-display">
              Tap &amp; Go Turnstile Transaction Ledger
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Card: <span className="font-mono text-[#3898D8] font-bold">{activeCard.maskedCardNumber}</span>
            </p>
          </div>
        </div>

        <div className="text-xs text-[#64748B] font-bold">
          Showing {filteredTxns.length} Recorded Transit Events
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-2xl border border-[#E5EDF5] shadow-xs">
        
        {/* Search */}
        <div className="sm:col-span-7 relative">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search station, bus route, or txn ID..."
            className="w-full bg-[#F8FAFC] border border-[#E5EDF5] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#153B5B] font-bold focus:outline-none focus:border-[#3898D8] focus:bg-white placeholder:text-[#94A3B8]"
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
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                filterMode === f.id
                  ? 'bg-[#3898D8] text-white shadow-xs'
                  : 'bg-[#F8FAFC] border border-[#E5EDF5] text-[#64748B] hover:text-[#153B5B]'
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
                className="rounded-2xl bg-white border border-[#E5EDF5] overflow-hidden hover:border-[#3898D8] shadow-xs transition-all"
              >
                <div
                  onClick={() => toggleExpand(txn.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isRecharge
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : isEntry
                        ? 'bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]'
                        : 'bg-[#EFF7FC] text-[#3898D8] border border-[#DCEEFF]'
                    }`}>
                      {isRecharge ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#153B5B] flex items-center gap-2">
                        <span>{txn.location}</span>
                        <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">{txn.id}</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5 flex items-center gap-2">
                        <span>{txn.timestamp}</span>
                        <span>•</span>
                        <span className="text-[#3898D8] font-bold">{txn.network}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-sm sm:text-base font-black font-mono ${
                        isRecharge ? 'text-emerald-600' : isEntry ? 'text-[#64748B]' : 'text-[#153B5B]'
                      }`}>
                        {isRecharge ? `+₹${txn.amount.toFixed(2)}` : isEntry ? 'Check-in (₹0)' : `-₹${txn.amount.toFixed(2)}`}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                        {txn.status}
                      </span>
                    </div>

                    <div className="text-[#64748B] hover:text-[#153B5B]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Itemized Receipt */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-[#F8FAFC] border-t border-[#E5EDF5] text-xs text-[#153B5B] grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#64748B] block">Tap Event Type</span>
                      <span className="font-mono text-[#153B5B] font-bold">{txn.type}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#64748B] block">Transit Operator</span>
                      <span className="text-[#153B5B] font-bold">{txn.network}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#64748B] block">AFC Settlement Terminal</span>
                      <span className="font-mono text-[#3898D8] font-bold">GATE-NCMC-P9910</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5EDF5] p-8 shadow-xs">
            <History className="w-10 h-10 text-[#94A3B8] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#153B5B]">No Matching Transactions</h3>
            <p className="text-xs text-[#64748B]">Try adjusting your search query or filter chip.</p>
          </div>
        )}
      </div>

    </div>
  );
};
