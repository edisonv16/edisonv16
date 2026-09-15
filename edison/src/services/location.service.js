import { createLocationModel, getBrowserTimeZone } from '../models/location.model';
import { fetchWithRetry } from '../utils/http.util';

const GEOJS_API_URL = 'https://get.geojs.io/v1/ip/geo.json';

export const getVisitorLocation = async () => {
  const response = await fetchWithRetry(
    GEOJS_API_URL,
    { timeoutMs: 4000 },
    3
  );

  const data = await response.json();
  const latitude = parseFloat(data.latitude);
  const longitude = parseFloat(data.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Coordenadas no válidas devueltas por el servicio de geolocalización.');
  }

  return createLocationModel({
    latitude,
    longitude,
    city: data.city || 'Ubicación actual',
    country: data.country || '',
    timeZone: data.timezone || getBrowserTimeZone(),
    isFallback: false
  });
};
