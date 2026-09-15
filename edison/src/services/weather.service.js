import { createWeatherModel } from '../models/weather.model';
import { fetchWithRetry } from '../utils/http.util';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const getCurrentWeather = async ({ latitude, longitude }) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    timezone: 'auto'
  });

  const response = await fetchWithRetry(
    `${WEATHER_API_URL}?${params}`,
    { timeoutMs: 5000 },
    3
  );

  const data = await response.json();
  return createWeatherModel(data.current);
};
