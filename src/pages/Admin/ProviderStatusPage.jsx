import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Lock, 
  Server, 
  Key, 
  Activity, 
  Layers, 
  FileText, 
  Terminal,
  ExternalLink,
  Info
} from 'lucide-react';
import { useSuperAdminStore } from '../../store/useSuperAdminStore';

export const ProviderStatusPage = () => {
  const { providerIntegrations } = useSuperAdminStore();
  const [testingId, setTestingId] = useState(null);
  const [testLog, setTestLog] = useState([
    { timestamp: '21:40:02', service: 'System Health', message: 'Zero live credentials configured. Sandboxed simulation is enforced globally.' },
    { timestamp: '21:40:15', service: 'Railway Adapter', message: 'Mock dataset active: 8 express trains loaded from local schema.' },
    { timestamp: '21:40:28', service: 'MSRTC Adapter', message: 'Depot schedule cache loaded: 6 Maharashtra routes active.' },
    { timestamp: '21:40:34', service: 'NCMC Adapter', message: 'RuPay token validator simulator initialized. Central Clearing House disconnected.' }
  ]);

  const handleTestAdapter = (id, name) => {
    setTestingId(id);
    setTimeout(() => {
      setTestLog(prev => [
        {
          timestamp: new Date().toLocaleTimeString(),
          service: name,
          message: `Health ping returned: [DEMO_STUB_OK]. Mode: NOT_CONFIGURED. No live external network traffic generated.`
        },
        ...prev
      ]);
      setTestingId(null);
    }, 800);
  };

  return (
    <div className="space-y-8 bg-[#F8FAFC] text-[#153B5B]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#153B5B] font-display">
              Provider Integration Status
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              AUDITED SANDBOX
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1 max-w-2xl">
            Realtime security audit, API gateway adapter health and third-party authorization status.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5EDF5] shadow-sm flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#19A89A] animate-pulse"></div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#64748B]">Security Invariant</div>
            <div className="text-xs font-bold text-[#153B5B]">0 Live Credentials Exposed</div>
          </div>
        </div>
      </div>

      {/* Critical Mandate Banner */}
      <div className="p-5 rounded-3xl bg-amber-50/80 border-2 border-amber-300 shadow-sm space-y-2">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
          <h2 className="text-base font-bold text-amber-900">
            Strict Architecture Mandate: Zero Unverified Connection Policy
          </h2>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          In strict adherence to enterprise security protocols, <strong>no provider integration is shown as connected</strong> unless it is genuinely configured, cryptographically authenticated, and end-to-end verified with live upstream servers. All mock data services currently run in isolated frontend demo sandbox adapters.
        </p>
      </div>

      {/* 5 Core Provider Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providerIntegrations.map((provider) => {
          const isPending = provider.status === 'Pending Authorization';
          const isNotConfigured = provider.status === 'Not Configured';

          return (
            <div
              key={provider.id}
              className="p-6 rounded-3xl bg-white border border-[#E5EDF5] hover:border-[#3898D8] transition-all shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      {provider.category}
                    </span>
                    <h3 className="font-bold text-[#153B5B] text-base mt-0.5">
                      {provider.name}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border flex items-center gap-1.5 shrink-0 ${
                      isPending
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-slate-100 text-[#64748B] border-slate-200'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{provider.status}</span>
                  </span>
                </div>

                {/* Status Properties Table */}
                <div className="space-y-2 text-xs bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E5EDF5] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Gateway Mode:</span>
                    <span className="text-[#3898D8] font-bold">{provider.mode}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Live Credentials:</span>
                    <span className="text-rose-600 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{provider.credentialsConfigured ? 'CONFIGURED' : 'NOT_CONFIGURED'}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Upstream Host:</span>
                    <span className="text-[#153B5B] truncate max-w-[180px]" title={provider.endpoint}>
                      {provider.endpoint}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Audit Check:</span>
                    <span className="text-[#153B5B]">{provider.lastChecked}</span>
                  </div>
                </div>

                {/* Notes */}
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {provider.notes}
                </p>
              </div>

              {/* Action Ping Button */}
              <div className="pt-4 border-t border-[#E5EDF5] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-mono">Adapter Interface v2.4</span>
                <button
                  onClick={() => handleTestAdapter(provider.id, provider.name)}
                  disabled={testingId === provider.id}
                  className="px-3 py-1.5 rounded-xl bg-[#EFF7FC] hover:bg-[#DCEEFF] text-[#153B5B] border border-[#E5EDF5] text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingId === provider.id ? 'animate-spin' : ''}`} />
                  <span>{testingId === provider.id ? 'Pinging Stub...' : 'Test Adapter'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Requirement Matrix */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5EDF5] shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#153B5B] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#3898D8]" />
          <span>Integration Readiness & Prerequisite Checklist</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-semibold text-[10px] tracking-wider border-b border-[#E5EDF5]">
              <tr>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Required Authorization / Agreement</th>
                <th className="py-3 px-4">Required Secrets / Keys</th>
                <th className="py-3 px-4">Current Staging State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EDF5] text-[#153B5B]">
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#153B5B]">IRCTC / Indian Railways</td>
                <td className="py-3.5 px-4 text-[#64748B]">Commercial Non-Exclusive Agreement for B2C Ticket Booking Service</td>
                <td className="py-3.5 px-4 font-mono text-[#64748B]">IRCTC_CORP_USER, RSA_2048_CERT, TERMINAL_KEY</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Pending Authorization
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-[#153B5B]">MSRTC Central ITMS</td>
                <td className="py-3.5 px-4 text-[#64748B]">Maharashtra State Road Transport ITMS API Gateway Access Protocol</td>
                <td className="py-3.5 px-4 font-mono text-[#64748B]">MSRTC_CLIENT_ID, DEPOT_GATEWAY_HMAC_SECRET</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Pending Authorization
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-[#153B5B]">RuPay NCMC Smart Transit</td>
                <td className="py-3.5 px-4 text-[#64748B]">NPCI Central Clearing House & Bank Acquirer Transit Host Agreement</td>
                <td className="py-3.5 px-4 font-mono text-[#64748B]">NPCI_CCH_CERTIFICATE, BANK_HOST_ACQUIRER_KEY</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Pending Authorization
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-[#153B5B]">Commercial Payment Gateway</td>
                <td className="py-3.5 px-4 text-[#64748B]">Merchant Aggregator Integration (Razorpay / Cashfree / Stripe)</td>
                <td className="py-3.5 px-4 font-mono text-[#64748B]">PG_KEY_ID, PG_KEY_SECRET, WEBHOOK_SIGNING_SALT</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-[#64748B] border border-slate-200">
                    Not Configured
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-[#153B5B]">Maps & Telematics Engine</td>
                <td className="py-3.5 px-4 text-[#64748B]">Mapbox GL / Google Maps Platform Fleet Telematics API</td>
                <td className="py-3.5 px-4 font-mono text-[#64748B]">MAPS_API_KEY, MATRIX_ROUTING_KEY</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-[#64748B] border border-slate-200">
                    Not Configured
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Realtime Adapter Diagnostic Terminal */}
      <div className="p-6 rounded-3xl bg-[#153B5B] text-slate-100 border border-[#153B5B] space-y-3 font-mono shadow-md">
        <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#19A89A]" />
            <span className="font-bold text-white">Security & Adapter Ping Console</span>
          </div>
          <span className="text-[11px] text-[#DCEEFF]">Live Sandbox Telemetry</span>
        </div>

        <div className="space-y-1.5 text-xs">
          {testLog.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-slate-400 shrink-0">[{log.timestamp}]</span>
              <span className="text-[#3898D8] font-semibold shrink-0">[{log.service}]:</span>
              <span className="text-slate-200">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
