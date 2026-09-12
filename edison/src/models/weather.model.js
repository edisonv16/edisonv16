const WEATHER_CONDITIONS = {
  0: { condition: 'Cielo despejado', icon: 'fa-sun-o' },
  1: { condition: 'Principalmente despejado', icon: 'fa-sun-o' },
  2: { condition: 'Parcialmente nublado', icon: 'fa-cloud' },
  3: { condition: 'Nublado', icon: 'fa-cloud' },
  45: { condition: 'Niebla', icon: 'fa-cloud' },
  48: { condition: 'Niebla con escarcha', icon: 'fa-cloud' },
  51: { condition: 'Llovizna ligera', icon: 'fa-tint' },
  53: { condition: 'Llovizna moderada', icon: 'fa-tint' },
  55: { condition: 'Llovizna intensa', icon: 'fa-tint' },
  61: { condition: 'Lluvia ligera', icon: 'fa-tint' },
  63: { condition: 'Lluvia moderada', icon: 'fa-tint' },
  65: { condition: 'Lluvia intensa', icon: 'fa-tint' },
  71: { condition: 'Nieve ligera', icon: 'fa-snowflake-o' },
  73: { condition: 'Nieve moderada', icon: 'fa-snowflake-o' },
  75: { condition: 'Nieve intensa', icon: 'fa-snowflake-o' },
  80: { condition: 'Chubascos ligeros', icon: 'fa-tint' },
  81: { condition: 'Chubascos moderados', icon: 'fa-tint' },
  82: { condition: 'Chubascos intensos', icon: 'fa-tint' },
  95: { condition: 'Tormenta', icon: 'fa-bolt' },
  96: { condition: 'Tormenta con granizo', icon: 'fa-bolt' },
  99: { condition: 'Tormenta fuerte con granizo', icon: 'fa-bolt' }
};

export const createWeatherModel = (current) => {
  const condition = WEATHER_CONDITIONS[current.weather_code] || { condition: 'Condiciones variables', icon: 'fa-cloud' };

  return {
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    windSpeed: Math.round(current.wind_speed_10m),
    condition: condition.condition,
    icon: condition.icon,
    isDay: Boolean(current.is_day)
  };
};
