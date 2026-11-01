import { INTEGRATION_CONFIG } from '../config/integrations.config';

/**
 * Railway Provider Service Adapter
 * Safely wraps railway inventory operations with NOT_CONFIGURED fallback.
 */
export const railwayAdapter = {
  checkPnrStatus: async (pnrNumber) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      success: true,
      isSimulated: true,
      providerStatus: INTEGRATION_CONFIG.railway.status,
      pnr: pnrNumber,
      trainName: 'Vande Bharat Express (20706)',
      status: 'CONFIRMED (CNF)',
      berth: 'Coach C2 - Seat 42 (Window)',
      dateOfJourney: '2026-11-08',
      simulatedNotice: 'IRCTC Provider NOT_CONFIGURED: Simulated PNR record'
    };
  }
};
