import { INTEGRATION_CONFIG, PROVIDER_STATUS } from '../config/integrations.config';

/**
 * Payment Service Adapter
 * Since Payment provider is NOT_CONFIGURED, all transactions are strictly simulated demo operations.
 */
export const paymentAdapter = {
  processDemoPayment: async ({ amount, currency = 'INR', customerName, method = 'SIMULATED_UPI' }) => {
    // Artificial latency for realistic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

    const simulatedTxnId = `SIM_TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      isSimulated: true,
      providerStatus: INTEGRATION_CONFIG.payment.status,
      transactionId: simulatedTxnId,
      amount,
      currency,
      customerName,
      method,
      timestamp: new Date().toISOString(),
      label: 'Simulated Demo Transaction — Zero Real Funds Charged',
      note: 'Payment provider is NOT_CONFIGURED. In production this delegates to authenticated gateway.'
    };
  }
};
