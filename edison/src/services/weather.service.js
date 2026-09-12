import { createWeatherModel } from '../models/weather.model';

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
  const response = await fetch(`${WEATHER_API_URL}?${params}`, {
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error('No fue posible consultar el clima actual.');
  }

  const data = await response.json();
  return createWeatherModel(data.current);
};
