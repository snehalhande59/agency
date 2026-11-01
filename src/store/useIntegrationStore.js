import { create } from 'zustand';
import { INTEGRATION_CONFIG, PROVIDER_STATUS } from '../services/config/integrations.config';

export const useIntegrationStore = create((set) => ({
  providers: INTEGRATION_CONFIG,
  isDemoMode: true,

  getProvider: (id) => INTEGRATION_CONFIG[id] || null,

  isConfigured: (id) =>
    INTEGRATION_CONFIG[id]?.status === PROVIDER_STATUS.CONFIGURED
}));
