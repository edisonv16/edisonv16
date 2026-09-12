const DEFAULT_LOCATION = Object.freeze({
  latitude: 4.711,
  longitude: -74.0721,
  city: 'Bogotá',
  country: 'Colombia',
  timeZone: 'America/Bogota',
  isFallback: true
});

export const getBrowserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_LOCATION.timeZone;

export const createLocationModel = ({ latitude, longitude, city, country, timeZone = getBrowserTimeZone(), isFallback = false }) => ({
  latitude,
  longitude,
  city: city || 'Ubicación actual',
  country: country || '',
  timeZone,
  isFallback
});

export const getFallbackLocation = () => ({ ...DEFAULT_LOCATION, timeZone: getBrowserTimeZone() });
