import { render, screen } from '@testing-library/react';
import Work from './Work';
import InfoWork from '../../data/InfoWork';

describe('Work Component', () => {
  test('renders section title and badge', () => {
    render(<Work />);

    expect(screen.getByRole('region', { name: /trayectoria profesional y experiencia laboral/i })).toBeInTheDocument();
    expect(screen.getByText('Trayectoria Profesional')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /experiencia laboral/i })).toBeInTheDocument();
  });

  test('renders all companies from InfoWork', () => {
    render(<Work />);

    InfoWork.work.forEach((item) => {
      expect(screen.getByText(item.empresa)).toBeInTheDocument();
      expect(screen.getByText(item.cargo)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(item.date, 'i'))).toBeInTheDocument();
    });
  });

  test('applies current highlight to Sodimac (actualidad role)', () => {
    const { container } = render(<Work />);

    const currentCard = container.querySelector('.work-card--current');
    expect(currentCard).toBeInTheDocument();
    expect(currentCard).toHaveTextContent('Sodimac Colombia');
    expect(currentCard).toHaveTextContent(/actualidad/i);
  });
});
