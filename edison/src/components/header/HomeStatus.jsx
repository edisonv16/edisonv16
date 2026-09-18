import LocalClock from './LocalClock';
import WeatherCard from './WeatherCard';
import useHomeStatus from './useHomeStatus';

const HomeStatus = () => {
  const { location, weather, status, errorMessage } = useHomeStatus();

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
