/**
 * Integration Configuration Layer
 * Defines third-party providers with zero live secrets or requests.
 * All external providers are explicitly set to NOT_CONFIGURED.
 */

export const PROVIDER_STATUS = {
  NOT_CONFIGURED: 'NOT_CONFIGURED',
  CONFIGURED: 'CONFIGURED',
  SIMULATED: 'SIMULATED'
};

export const INTEGRATION_CONFIG = {
  railway: {
    id: 'railway',
    name: 'Indian Railways / IRCTC Service',
    status: PROVIDER_STATUS.NOT_CONFIGURED,
    mode: 'DEMO_MOCK_ONLY',
    endpoint: null,
    secretConfigured: false,
    description: 'Direct PNR status, seat inventory, and Tatkal queue adapter.',
    fallbackMessage: 'Railway provider is NOT_CONFIGURED. Running in local simulation mode with realistic mock schedules.'
  },
  msrtc: {
    id: 'msrtc',
    name: 'Maharashtra State Road Transport (MSRTC Shivneri)',
    status: PROVIDER_STATUS.NOT_CONFIGURED,
    mode: 'DEMO_MOCK_ONLY',
    endpoint: null,
    secretConfigured: false,
    description: 'State bus scheduling and government concession verification adapter.',
    fallbackMessage: 'MSRTC provider is NOT_CONFIGURED. Displaying verified state transport timetable mock data.'
  },
  ncmc: {
    id: 'ncmc',
    name: 'National Common Mobility Card (NCMC) Metro/Transit',
    status: PROVIDER_STATUS.NOT_CONFIGURED,
    mode: 'DEMO_MOCK_ONLY',
    endpoint: null,
    secretConfigured: false,
    description: 'RuPay Contactless / Metro smart wallet tap validation adapter.',
    fallbackMessage: 'NCMC gateway is NOT_CONFIGURED. Transit passes are issued as simulated demo credentials.'
  },
  payment: {
    id: 'payment',
    name: 'Payment Gateway (UPI / Cards / Corporate Net-30)',
    status: PROVIDER_STATUS.NOT_CONFIGURED,
    mode: 'DEMO_MOCK_ONLY',
    endpoint: null,
    secretConfigured: false,
    description: 'Commercial payment checkout adapter. Zero real-money processing.',
    fallbackMessage: 'Payment provider is NOT_CONFIGURED. All transactions are purely simulated demo bookings with no real charges.'
  },
  maps: {
    id: 'maps',
    name: 'Geospatial & Telematics Engine (Maps / Routing)',
    status: PROVIDER_STATUS.NOT_CONFIGURED,
    mode: 'DEMO_MOCK_ONLY',
    endpoint: null,
    secretConfigured: false,
    description: 'Live highway telemetry, GPS geofencing, and intercity routing adapter.',
    fallbackMessage: 'Maps provider is NOT_CONFIGURED. Coordinates and route durations use pre-computed distance matrices.'
  }
};

/**
 * Helper to check provider status safely
 */
export const getProviderStatus = (providerKey) => {
  return INTEGRATION_CONFIG[providerKey]?.status || PROVIDER_STATUS.NOT_CONFIGURED;
};

/**
 * Check if the application is running in safe simulation mode
 */
export const isSimulationMode = () => {
  return Object.values(INTEGRATION_CONFIG).every(
    provider => provider.status === PROVIDER_STATUS.NOT_CONFIGURED
  );
};
