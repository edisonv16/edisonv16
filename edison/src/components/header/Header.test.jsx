import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  expect(await screen.findByText(greeting)).toBeInTheDocument();
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

  test('renders evening greeting with evening class', async () => {
    await runGreetingScenario({
      isoDate: '2024-01-10T21:00:00',
      greeting: 'Buenas Noches',
      className: 'estilo-noche',
    });
  });
});
