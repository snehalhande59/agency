/**
 * NCMC Smart Mobility Service Adapter Layer
 * Isolated provider adapter for National Common Mobility Card (One Nation One Card).
 * Strictly frontend-only with zero live bank credentials or storage of sensitive payment tokens.
 * All functions return demo simulation records with visible status labeling.
 */

export const NCMC_BANNER_TEXT = "DEMO MODE – NCMC issuer integration pending.";

export const NCMC_ISSUERS = [
  { code: 'SBI', name: 'State Bank of India', cardScheme: 'RuPay Platinum Contactless', network: 'One Nation One Card' },
  { code: 'HDFC', name: 'HDFC Bank', cardScheme: 'RuPay Select NCMC', network: 'One Nation One Card' },
  { code: 'BOM', name: 'Bank of Maharashtra', cardScheme: 'RuPay Classic Transit', network: 'One Nation One Card' },
  { code: 'ICICI', name: 'ICICI Bank', cardScheme: 'RuPay Contactless NCMC', network: 'One Nation One Card' }
];

export const NCMC_NETWORKS = [
  { id: 'MMRDA', name: 'Mumbai Metro (Line 2A, 7 & 3)', type: 'Metro Rail' },
  { id: 'PUNE_METRO', name: 'Pune Metro (Purple & Aqua Lines)', type: 'Metro Rail' },
  { id: 'BEST', name: 'BEST Electric City Buses (Mumbai)', type: 'Urban Bus' },
  { id: 'NMMT', name: 'Navi Mumbai Municipal Transport (NMMT)', type: 'Urban Bus' },
  { id: 'TOLL', name: 'Bandra-Worli Sea Link & Highway Tolls', type: 'Fastag / Toll' }
];

export const NCMC_DEMO_CARD = {
  cardId: 'NCMC-IN-8842',
  maskedCardNumber: '6071 •••• •••• 8842',
  cardHolderName: 'Snehal Hande',
  issuerBank: 'State Bank of India',
  issuerCode: 'SBI',
  scheme: 'RuPay Platinum Contactless',
  cardStatus: 'ACTIVE',
  walletBalance: 850.00,
  currency: 'INR',
  expiryDate: '11/29',
  nfcEnabled: true,
  issuedAt: '2024-03-15',
  cardType: 'Physical Smart Card + Virtual Transit Wallet'
};

export const NCMC_TRANSACTIONS = [
  {
    id: 'TXN-NCMC-9912',
    timestamp: 'Today, 09:14 AM',
    location: 'Gundavali Metro Station (Gate 2)',
    network: 'Mumbai Metro Line 7',
    type: 'EXIT_TAP',
    amount: 30.00,
    status: 'SETTLED',
    mode: 'Metro Rail'
  },
  {
    id: 'TXN-NCMC-9911',
    timestamp: 'Today, 08:35 AM',
    location: 'Dahisar East Metro Station (Gate 1)',
    network: 'Mumbai Metro Line 2A',
    type: 'ENTRY_TAP',
    amount: 0.00,
    status: 'AUTHORIZED',
    mode: 'Metro Rail'
  },
  {
    id: 'TXN-NCMC-9884',
    timestamp: 'Yesterday, 07:45 PM',
    location: 'BEST Bus #A-115 (Bandra Kurla Complex to Dadar)',
    network: 'BEST Electric City Bus',
    type: 'BUS_TAP',
    amount: 15.00,
    status: 'SETTLED',
    mode: 'Urban Bus'
  },
  {
    id: 'TXN-NCMC-9820',
    timestamp: '28 Oct 2026, 06:10 PM',
    location: 'BKC Metro Station (Line 3 Aqua Gate 4)',
    network: 'Mumbai Metro Line 3',
    type: 'EXIT_TAP',
    amount: 40.00,
    status: 'SETTLED',
    mode: 'Metro Rail'
  },
  {
    id: 'TXN-NCMC-9750',
    timestamp: '25 Oct 2026, 11:30 AM',
    location: 'Online Wallet Top-up (Demo Simulation)',
    network: 'NCMC Transit Top-Up',
    type: 'WALLET_RECHARGE',
    amount: 500.00,
    status: 'SIMULATED_CREDIT',
    mode: 'Top-Up'
  }
];

export const NCMC_PASS_PLANS = [
  {
    id: 'PASS-DAILY',
    title: 'Daily All-Day Metro Pass',
    validity: '1 Calendar Day',
    price: 100,
    rides: 'Unlimited Rides on Metro Lines 2A & 7',
    popular: false,
    color: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'PASS-WEEKLY',
    title: 'Weekly Commuter Pass',
    validity: '7 Consecutive Days',
    price: 350,
    rides: 'Unlimited Metro Rail Trips',
    popular: false,
    color: 'from-indigo-600 to-blue-700'
  },
  {
    id: 'PASS-MONTHLY',
    title: 'Monthly Unlimited Metro Pass',
    validity: '30 Calendar Days',
    price: 1200,
    rides: 'Unlimited Metro Access + Fastlane NFC Gates',
    popular: true,
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'PASS-COMBO',
    title: 'Metro + BEST Bus Multimodal Pass',
    validity: '30 Calendar Days',
    price: 1850,
    rides: 'Mumbai Metro (Lines 1, 2A, 7 & 3) + All BEST AC Buses',
    popular: false,
    color: 'from-purple-600 to-pink-700'
  }
];

export const ncmcService = {
  getBannerText: () => NCMC_BANNER_TEXT,

  getIssuers: () => NCMC_ISSUERS,

  getNetworks: () => NCMC_NETWORKS,

  getDemoCard: () => NCMC_DEMO_CARD,

  getTransactions: () => NCMC_TRANSACTIONS,

  getPassPlans: () => NCMC_PASS_PLANS,

  simulateRechargeRequest: ({ cardId, amount, paymentMethod }) => {
    return {
      success: true,
      referenceId: `DEMO-NCMC-TOPUP-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'DEMO_PENDING_TERMINAL_TAP',
      message: 'Demo recharge simulation accepted. In live NCMC environment, balance updates onto chip during next physical gate tap.',
      amount,
      note: 'DEMO MODE – NCMC issuer integration pending. No real bank accounts debited.'
    };
  },

  simulateLostCardReport: ({ cardId, reason, contactPhone }) => {
    return {
      success: true,
      caseNumber: `INC-NCMC-LOST-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'SIMULATED_CARD_BLOCKED',
      timestamp: new Date().toISOString(),
      reason,
      message: 'Card blocking simulated successfully. Remaining balance protected pending issuance of replacement smart card.',
      note: 'DEMO MODE – NCMC issuer integration pending.'
    };
  },

  submitSupportRequest: ({ cardId, issueType, description, contactEmail }) => {
    return {
      success: true,
      ticketNumber: `TKT-NCMC-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'LOGGED_IN_DEMO',
      issueType,
      createdAt: new Date().toISOString(),
      message: 'Support ticket registered in demo sandbox. A representative would contact within 24 hours in production.',
      note: 'DEMO MODE – NCMC issuer integration pending.'
    };
  }
};
