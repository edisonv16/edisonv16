import { render, screen } from '@testing-library/react';
import Header from './Header';

const REAL_DATE = Date;

const mockDate = (isoDate) => {
  global.Date = class extends REAL_DATE {
    constructor(...args) {
      if (args.length > 0) {
        return new REAL_DATE(...args);
      }

      return new REAL_DATE(isoDate);
    }

    static now() {
      return new REAL_DATE(isoDate).getTime();
    }
  };
};

const restoreDate = () => {
  global.Date = REAL_DATE;
};

const runGreetingScenario = async ({ isoDate, greeting, className }) => {
  mockDate(isoDate);
  render(<Header />);

  expect(await screen.findByText(greeting, { exact: false })).toBeInTheDocument();
  expect(document.querySelector('#home')).toHaveClass(className);
};

describe('Header', () => {
  afterEach(() => {
    restoreDate();
  });

  test('renders morning greeting with morning class', async () => {
    await runGreetingScenario({
      isoDate: '2024-01-10T09:00:00',
      greeting: 'Buenos Días',
      className: 'estilo-manana',
    });
  });

  test('renders afternoon greeting with afternoon class', async () => {
    await runGreetingScenario({
      isoDate: '2024-01-10T15:00:00',
      greeting: 'Buenas Tardes',
      className: 'estilo-tarde',
    });
  });

  test('renders all 7 navigation items in side-nav including Formation and Contact', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation', { name: /navegación principal/i });
    expect(nav).toBeInTheDocument();

    const expectedLinks = [
      { href: '#home', label: 'Ir a inicio', tooltip: 'Inicio' },
      { href: '#about', label: 'Ir al perfil profesional', tooltip: 'Perfil profesional' },
      { href: '#skills', label: 'Ir a habilidades', tooltip: 'Habilidades' },
      { href: '#portfolio', label: 'Ir a proyectos', tooltip: 'Proyectos' },
      { href: '#work', label: 'Ir a trayectoria profesional', tooltip: 'Trayectoria profesional' },
      { href: '#resume', label: 'Ir a formación y certificaciones', tooltip: 'Formación y certificaciones' },
      { href: '#contact', label: 'Ir a contacto', tooltip: 'Contacto' },
    ];

    expectedLinks.forEach(({ href, label, tooltip }) => {
      const link = screen.getByRole('link', { name: label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('data-tooltip', tooltip);
    });
  });
});
