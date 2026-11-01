import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ncmcService, NCMC_DEMO_CARD, NCMC_TRANSACTIONS, NCMC_PASS_PLANS } from '../services/ncmc/ncmcService';

export const useNcmcStore = create(
  persist(
    (set, get) => ({
      activeCard: NCMC_DEMO_CARD,
      
      cardsList: [
        NCMC_DEMO_CARD,
        {
          cardId: 'NCMC-IN-4921',
          maskedCardNumber: '6082 •••• •••• 4921',
          cardHolderName: 'Snehal Hande (Secondary)',
          issuerBank: 'HDFC Bank',
          issuerCode: 'HDFC',
          scheme: 'RuPay Select NCMC',
          cardStatus: 'ACTIVE',
          walletBalance: 240.00,
          currency: 'INR',
          expiryDate: '08/30',
          nfcEnabled: true,
          issuedAt: '2024-06-20',
          cardType: 'Virtual Transit Pass'
        }
      ],

      transactions: NCMC_TRANSACTIONS,

      activePass: {
        passId: 'PASS-MUM-ACTIVE-88',
        planId: 'PASS-MONTHLY',
        title: 'Monthly Unlimited Metro Pass',
        network: 'Mumbai Metro Lines 2A & 7',
        validFrom: new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0],
        daysRemaining: 20,
        status: 'ACTIVE_VALID',
        ridesUsed: 38,
        qrGateCode: 'NCMC-QR-GATE-PASS-SIM-98124'
      },

      supportTickets: [
        {
          ticketNumber: 'TKT-NCMC-41029',
          issueType: 'Gate Tap Double Deduction Inquiry',
          status: 'RESOLVED_DEMO',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          description: 'Gate 2 at Gundavali showed exit error and re-tapped.',
          resolution: 'Simulated reversal verified. ₹30 credited back to virtual ledger.'
        }
      ],

      lostCardIncidents: [],

      // Actions
      setActiveCard: (card) => set({ activeCard: card }),

      registerNewCard: ({ fullName, mobile, issuerBank, aadhaarLast4, transitCorridor }) => {
        const randomEnding = Math.floor(1000 + Math.random() * 9000);
        const newCard = {
          cardId: `NCMC-IN-${randomEnding}`,
          maskedCardNumber: `6071 •••• •••• ${randomEnding}`,
          cardHolderName: fullName,
          issuerBank: issuerBank || 'State Bank of India',
          issuerCode: 'SBI',
          scheme: 'RuPay Platinum Contactless',
          cardStatus: 'ACTIVE',
          walletBalance: 250.00,
          currency: 'INR',
          expiryDate: '12/31',
          nfcEnabled: true,
          issuedAt: new Date().toISOString().split('T')[0],
          cardType: 'Personalized NCMC Mobility Card'
        };

        set((state) => ({
          cardsList: [newCard, ...state.cardsList],
          activeCard: newCard
        }));

        return newCard;
      },

      linkExistingCard: ({ cardNumberMasked, cardHolderName, issuerBank }) => {
        const last4 = cardNumberMasked.replace(/\D/g, '').slice(-4) || '7721';
        const linkedCard = {
          cardId: `NCMC-LINKED-${last4}`,
          maskedCardNumber: `6082 •••• •••• ${last4}`,
          cardHolderName: cardHolderName || 'Primary Cardholder',
          issuerBank: issuerBank || 'Bank of Maharashtra',
          issuerCode: 'BOM',
          scheme: 'RuPay Classic Transit',
          cardStatus: 'ACTIVE',
          walletBalance: 420.00,
          currency: 'INR',
          expiryDate: '09/29',
          nfcEnabled: true,
          issuedAt: new Date().toISOString().split('T')[0],
          cardType: 'Linked Partner Bank Card'
        };

        set((state) => ({
          cardsList: [linkedCard, ...state.cardsList],
          activeCard: linkedCard
        }));

        return linkedCard;
      },

      requestDemoRecharge: (amount, paymentMethod = 'Instant UPI') => {
        const res = ncmcService.simulateRechargeRequest({
          cardId: get().activeCard.cardId,
          amount,
          paymentMethod
        });

        // Add simulated top-up transaction entry
        const topupTxn = {
          id: `TXN-NCMC-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: 'Just Now',
          location: 'Online Wallet Top-Up (Simulation)',
          network: 'NCMC Transit Top-Up',
          type: 'WALLET_RECHARGE',
          amount: parseFloat(amount),
          status: 'SIMULATED_CREDIT',
          mode: 'Top-Up'
        };

        set((state) => ({
          activeCard: {
            ...state.activeCard,
            walletBalance: state.activeCard.walletBalance + parseFloat(amount)
          },
          transactions: [topupTxn, ...state.transactions]
        }));

        return res;
      },

      purchaseTransitPass: (plan) => {
        const validUntil = new Date(Date.now() + 86400000 * (plan.id === 'PASS-DAILY' ? 1 : plan.id === 'PASS-WEEKLY' ? 7 : 30)).toISOString().split('T')[0];
        
        const newPass = {
          passId: `PASS-MUM-${Math.floor(1000 + Math.random() * 9000)}`,
          planId: plan.id,
          title: plan.title,
          network: 'Mumbai Metro Lines & Transit',
          validFrom: new Date().toISOString().split('T')[0],
          validUntil,
          daysRemaining: plan.id === 'PASS-DAILY' ? 1 : plan.id === 'PASS-WEEKLY' ? 7 : 30,
          status: 'ACTIVE_VALID',
          ridesUsed: 0,
          qrGateCode: `NCMC-QR-GATE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        };

        set({ activePass: newPass });
        return newPass;
      },

      reportLostCard: ({ reason, contactPhone }) => {
        const { activeCard, cardsList } = get();
        const res = ncmcService.simulateLostCardReport({
          cardId: activeCard.cardId,
          reason,
          contactPhone
        });

        const updatedCard = { ...activeCard, cardStatus: 'BLOCKED_SIMULATED' };

        set((state) => ({
          activeCard: updatedCard,
          cardsList: state.cardsList.map((c) => (c.cardId === activeCard.cardId ? updatedCard : c)),
          lostCardIncidents: [
            {
              caseNumber: res.caseNumber,
              cardId: activeCard.cardId,
              maskedNumber: activeCard.maskedCardNumber,
              reportedAt: res.timestamp,
              reason,
              status: 'BLOCKED_PROTECTED',
              message: res.message
            },
            ...state.lostCardIncidents
          ]
        }));

        return res;
      },

      submitSupportTicket: ({ issueType, description, contactEmail }) => {
        const { activeCard } = get();
        const res = ncmcService.submitSupportRequest({
          cardId: activeCard.cardId,
          issueType,
          description,
          contactEmail
        });

        const newTicket = {
          ticketNumber: res.ticketNumber,
          issueType,
          status: 'REGISTERED_DEMO',
          createdAt: res.createdAt,
          description,
          resolution: 'Logged in demo sandbox. Verification pending issuer reconciliation.'
        };

        set((state) => ({
          supportTickets: [newTicket, ...state.supportTickets]
        }));

        return res;
      }
    }),
    {
      name: 'aerovoyage_ncmc_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
