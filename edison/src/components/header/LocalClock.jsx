import { useEffect, useState } from 'react';

const getLocalDateTime = (timeZone) => {
  const date = new Date();
  const time = new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(date);
  const day = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone }).format(date);
  return { time, day };
};

const LocalClock = ({ timeZone }) => {
  const [dateTime, setDateTime] = useState(() => getLocalDateTime(timeZone));

  useEffect(() => {
    const timer = window.setInterval(() => setDateTime(getLocalDateTime(timeZone)), 1000);
    return () => window.clearInterval(timer);
  }, [timeZone]);

  return (
    <div className="local-clock" aria-label={`Hora local: ${dateTime.time}`}>
      <span className="local-clock__time">{dateTime.time}</span>
      <span className="local-clock__date">{dateTime.day}</span>
    </div>
  );
};

export default LocalClock;
