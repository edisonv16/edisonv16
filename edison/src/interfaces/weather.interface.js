/**
 * @typedef {Object} WeatherLocation
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} city
 * @property {string} country
 * @property {string} timeZone
 * @property {boolean} isFallback
 */

/**
 * @typedef {Object} WeatherData
 * @property {number} temperature
 * @property {number} apparentTemperature
 * @property {number} windSpeed
 * @property {string} condition
 * @property {string} icon
 * @property {boolean} isDay
 */

export const WEATHER_UNITS = Object.freeze({
  temperature: '°C',
  windSpeed: 'km/h'
});
