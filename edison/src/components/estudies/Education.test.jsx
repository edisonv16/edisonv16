import { render, screen, fireEvent } from '@testing-library/react';
import Education from './Education';
import InfoEducation from '../../data/InfoEducation';

describe('Education Component (Roadmap / Timeline)', () => {
  test('renders section heading and credentials badge', () => {
    render(<Education />);

    expect(
      screen.getByRole('region', { name: /educación, certificaciones y reconocimientos/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/formación & credenciales/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /educación, certificaciones y reconocimientos/i })
    ).toBeInTheDocument();
  });

  test('renders category milestones and course titles with high contrast', () => {
    render(<Education />);

    InfoEducation.education.forEach((categoryGroup) => {
      expect(screen.getByText(categoryGroup.institucion)).toBeInTheDocument();
    });

    expect(screen.getByText(/experiencIA: Inteligencia artificial generativa/i)).toBeInTheDocument();
    expect(screen.getByText(/scrum master professional certificate/i)).toBeInTheDocument();
  });

  test('does not render raw credential hashes', () => {
    render(<Education />);

    // Ensure raw credential strings from InfoEducation are completely omitted
    expect(screen.queryByText(/FLSQSJWBDB/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/5391f1de-b20a-4e5b/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Credencial:/i)).not.toBeInTheDocument();
  });

  test('filters categories when clicking category filter buttons', () => {
    render(<Education />);

    // Find and click the 'Premios' filter button
    const premiosButton = screen.getByRole('tab', { name: /premios/i });
    fireEvent.click(premiosButton);

    // Only 'Premios y reconocimientos' should be visible
    expect(screen.getByText('Premios y reconocimientos')).toBeInTheDocument();
    expect(screen.queryByText('Licencias y certificaciones recientes')).not.toBeInTheDocument();

    // Click 'Todos' to restore all categories
    const allButton = screen.getByRole('tab', { name: /todos/i });
    fireEvent.click(allButton);

    expect(screen.getByText('Licencias y certificaciones recientes')).toBeInTheDocument();
    expect(screen.getByText('Premios y reconocimientos')).toBeInTheDocument();
  });
});
