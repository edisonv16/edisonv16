import { useEffect, useState } from 'react';
import { getFallbackLocation } from '../../models/location.model';
import { getVisitorLocation } from '../../services/location.service';
import { getCurrentWeather } from '../../services/weather.service';
import LocalClock from './LocalClock';
import WeatherCard from './WeatherCard';

const HomeStatus = () => {
  const [location, setLocation] = useState(getFallbackLocation);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadConditions = async () => {
      try {
        const visitorLocation = await getVisitorLocation();
        if (!isMounted) return;
        setLocation(visitorLocation);

        const currentWeather = await getCurrentWeather(visitorLocation);
        if (!isMounted) return;

        setWeather(currentWeather);
        setStatus('ready');
        setErrorMessage(null);
      } catch (err) {
        if (!isMounted) return;
        setStatus('error');
        setErrorMessage(err?.userMessage || err?.message || 'No se pudo conectar al servicio.');
      }
    };

    loadConditions();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="home-status">
      <LocalClock timeZone={location.timeZone} />
      <WeatherCard
        location={location}
        weather={weather}
        status={status}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default HomeStatus;
