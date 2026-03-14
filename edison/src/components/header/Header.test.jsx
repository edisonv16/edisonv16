import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

const REAL_DATE = Date;

const mockDate = (isoDate) => {
  global.Date = class extends REAL_DATE {
    constructor(...args) {
      if (args.length) {
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

describe('Header', () => {
  afterEach(() => {
    restoreDate();
  });

  test('renders morning greeting with morning class', async () => {
    mockDate('2024-01-10T09:00:00');

    render(<Header />);

    expect(await screen.findByText(/Buenos Días/i)).toBeInTheDocument();
    expect(document.querySelector('#home')).toHaveClass('estilo-manana');
  });

  test('renders afternoon greeting with afternoon class', async () => {
    mockDate('2024-01-10T15:00:00');

    render(<Header />);

    expect(await screen.findByText(/Buenas Tardes/i)).toBeInTheDocument();
    expect(document.querySelector('#home')).toHaveClass('estilo-tarde');
  });

  test('renders evening greeting with evening class', async () => {
    mockDate('2024-01-10T21:00:00');

    render(<Header />);

    expect(await screen.findByText(/Buenas Noches/i)).toBeInTheDocument();
    expect(document.querySelector('#home')).toHaveClass('estilo-noche');
  });
});
