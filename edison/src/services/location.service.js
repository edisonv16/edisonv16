import { createLocationModel, getBrowserTimeZone, getFallbackLocation } from '../models/location.model';

const GEOJS_API_URL = 'https://get.geojs.io/v1/ip/geo.json';

export const getVisitorLocation = async () => {
  try {
    const response = await fetch(GEOJS_API_URL, {
      signal: AbortSignal.timeout(4000)
    });

    if (!response.ok) {
      throw new Error('No fue posible consultar la ubicación por IP.');
    }

    const data = await response.json();
    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Coordenadas no válidas.');
    }

    return createLocationModel({
      latitude,
      longitude,
      city: data.city || 'Ubicación actual',
      country: data.country || '',
      timeZone: data.timezone || getBrowserTimeZone(),
      isFallback: false
    });
  } catch {
    return getFallbackLocation();
  }
};
