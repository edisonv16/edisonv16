import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  const dummyLocation = {
    city: 'Bogotá',
    country: 'Colombia',
    isFallback: false
  };

  const dummyWeather = {
    temperature: 18,
    condition: 'Soleado',
    icon: 'fa-sun-o'
  };

  test('renders weather info when status is ready', () => {
    render(
      <WeatherCard
        location={dummyLocation}
        weather={dummyWeather}
        status="ready"
      />
    );

    expect(screen.getByText(/18°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Soleado/i)).toBeInTheDocument();
    expect(screen.getByText(/Bogotá, Colombia/i)).toBeInTheDocument();
  });

  test('renders loading status correctly', () => {
    render(
      <WeatherCard
        location={dummyLocation}
        weather={null}
        status="loading"
      />
    );

    expect(screen.getByText('Clima actual')).toBeInTheDocument();
    expect(screen.getByText('Consultando condiciones')).toBeInTheDocument();
  });

  test('renders red alert with role="alert" and descriptive message when status is error', () => {
    const errorMsg = 'No se pudo conectar al servicio por falta de conexión a internet.';
    render(
      <WeatherCard
        location={dummyLocation}
        weather={null}
        status="error"
        errorMessage={errorMsg}
      />
    );

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass('weather-card--error');
    expect(screen.getByText('Alerta del servicio')).toBeInTheDocument();
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    expect(screen.getByText('3 consultas realizadas sin éxito')).toBeInTheDocument();
  });

  test('renders default error message if none is provided', () => {
    render(
      <WeatherCard
        location={dummyLocation}
        weather={null}
        status="error"
      />
    );

    expect(screen.getByText('No se pudo conectar al servicio.')).toBeInTheDocument();
  });
});
