import { WEATHER_UNITS } from '../../interfaces/weather.interface';

const WeatherCard = ({ location, weather, status, errorMessage }) => {
  const locationLabel = [location?.city, location?.country].filter(Boolean).join(', ');
  const isLoading = status === 'loading';
  const isError = status === 'error';

  if (isError) {
    return (
      <aside className="weather-card weather-card--error" role="alert" aria-live="assertive">
        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
        <div>
          <strong className="weather-card__error-title">Alerta del servicio</strong>
          <span className="weather-card__error-message">
            {errorMessage || 'No se pudo conectar al servicio.'}
          </span>
          <small className="weather-card__error-attempts">3 consultas realizadas sin éxito</small>
        </div>
      </aside>
    );
  }

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
        <small>{locationLabel}{location?.isFallback && ' · Ubicación de referencia'}</small>
      </div>
    </aside>
  );
};

export default WeatherCard;
