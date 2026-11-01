import { INTEGRATION_CONFIG } from '../config/integrations.config';

/**
 * Maps & Telematics Service Adapter
 * Uses local matrix when Google Maps / MapMyIndia provider is NOT_CONFIGURED.
 */
export const mapsAdapter = {
  calculateRoute: async (origin, destination) => {
    // Simulated route calculations
    const cleanOrigin = (origin || '').toLowerCase();
    const cleanDest = (destination || '').toLowerCase();

    let distanceKm = 150;
    let durationHours = 2.5;

    if (cleanDest.includes('pune') || cleanOrigin.includes('pune')) {
      distanceKm = 148;
      durationHours = 2.4;
    } else if (cleanDest.includes('goa') || cleanOrigin.includes('goa')) {
      distanceKm = 585;
      durationHours = 9.5;
    } else if (cleanDest.includes('shirdi') || cleanOrigin.includes('shirdi')) {
      distanceKm = 240;
      durationHours = 4.2;
    } else if (cleanDest.includes('airport')) {
      distanceKm = 28;
      durationHours = 0.8;
    }

    return {
      success: true,
      isSimulated: true,
      providerStatus: INTEGRATION_CONFIG.maps.status,
      distanceKm,
      durationHours,
      durationText: `${Math.floor(durationHours)}h ${Math.round((durationHours % 1) * 60)}m`,
      tollEstimated: Math.round(distanceKm * 2.2),
      recommendedRoute: 'Via National Expressway / State Super-Highway'
    };
  }
};
