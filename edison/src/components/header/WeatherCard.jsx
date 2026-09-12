import { WEATHER_UNITS } from '../../interfaces/weather.interface';

const WeatherCard = ({ location, weather, status }) => {
  const locationLabel = [location.city, location.country].filter(Boolean).join(', ');
  const isLoading = status === 'loading';

  return (
    <aside className="weather-card" aria-live="polite">
      <i className={`fa ${isLoading ? 'fa-refresh fa-spin' : weather?.icon || 'fa-map-marker'}`} aria-hidden="true"></i>
      <div>
        {weather ? (
          <>
            <strong>{weather.temperature}{WEATHER_UNITS.temperature}</strong>
            <span>{weather.condition}</span>
          </>
        ) : (
          <>
            <strong>{isLoading ? 'Clima actual' : 'Clima no disponible'}</strong>
            <span>{isLoading ? 'Consultando condiciones' : 'Reintenta más tarde'}</span>
          </>
        )}
        <small>{locationLabel}{location.isFallback && ' · Ubicación de referencia'}</small>
      </div>
    </aside>
  );
};

export default WeatherCard;
