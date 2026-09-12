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

  useEffect(() => {
    let isMounted = true;

    const loadConditions = async () => {
      const visitorLocation = await getVisitorLocation();
      if (!isMounted) return;

      setLocation(visitorLocation);

      try {
        const currentWeather = await getCurrentWeather(visitorLocation);
        if (isMounted) {
          setWeather(currentWeather);
          setStatus('ready');
        }
      } catch {
        if (isMounted) setStatus('error');
      }
    };

    loadConditions();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="home-status">
      <LocalClock timeZone={location.timeZone} />
      <WeatherCard location={location} weather={weather} status={status} />
    </div>
  );
};

export default HomeStatus;
