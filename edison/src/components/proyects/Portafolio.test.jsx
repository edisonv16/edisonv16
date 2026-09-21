import { render, screen } from '@testing-library/react';
import Portafolio from './Portafolio';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide-mock">{children}</div>
}));

jest.mock('swiper/modules', () => ({
  EffectCoverflow: () => null,
  Pagination: () => null,
  Navigation: () => null
}));

describe('Portafolio Component', () => {
  test('renders section titles: Aplicaciones, Sitios Web and Galería', () => {
    render(<Portafolio />);

    expect(screen.getByText('Aplicaciones')).toBeInTheDocument();
    expect(screen.getByText('Sitios Web')).toBeInTheDocument();
    expect(screen.getByText('Galería')).toBeInTheDocument();
  });

  test('renders project cards with titles, company and work badges', () => {
    render(<Portafolio />);

    expect(screen.getByText('Aulas sin fronteras')).toBeInTheDocument();
    expect(screen.getByText('La tv en Colombia')).toBeInTheDocument();
    expect(screen.getByText('Cerrando brechas')).toBeInTheDocument();
    expect(screen.getAllByText('Comisión de Regulación de Comunicaciones').length).toBeGreaterThan(0);

    expect(screen.getByText('RTVC')).toBeInTheDocument();
    expect(screen.getAllByText('Sitio Web').length).toBeGreaterThan(0);
  });

  test('renders detailed descriptions for Futbol Red, Portafolio, El Tiempo, Ciencuadras and JepitConjuntos', () => {
    render(<Portafolio />);

    expect(screen.getByText(/Desarrollo frontend e implementación de maquetas responsive para el portal deportivo/i)).toBeInTheDocument();
    expect(screen.getByText(/Desarrollo frontend y maquetación de interfaces para el diario económico líder/i)).toBeInTheDocument();
    expect(screen.getByText(/Desarrollo frontend para especiales multimedia e historias digitales/i)).toBeInTheDocument();
    expect(screen.getByText(/Desarrollo frontend para la plataforma proptech inmobiliaria líder/i)).toBeInTheDocument();
    expect(screen.getByText(/Desarrollo frontend y arquitectura modular para la plataforma de administración/i)).toBeInTheDocument();
  });

  test('renders active project links with target _blank and rel noopener noreferrer', () => {
    render(<Portafolio />);

    const crcLink = screen.getByRole('link', { name: /visitar sitio web de comisión de regulación de comunicaciones/i });
    expect(crcLink).toBeInTheDocument();
    expect(crcLink).toHaveAttribute('href', 'https://crcom.gov.co/es');
    expect(crcLink).toHaveAttribute('target', '_blank');
    expect(crcLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(crcLink).toHaveClass('portafolio-badge--link');
  });

  test('renders offline badges without anchor tags for projects without url', () => {
    render(<Portafolio />);

    const aulasHeader = screen.getByText('Aulas sin fronteras');
    const aulasCard = aulasHeader.closest('.portafolio');
    expect(aulasCard).toBeInTheDocument();

    // Must not have an anchor link
    expect(aulasCard.querySelector('a')).toBeNull();

    // Must have the offline badge
    const offlineBadge = aulasCard.querySelector('.portafolio-badge--offline');
    expect(offlineBadge).toBeInTheDocument();
    expect(offlineBadge).toHaveTextContent('Sitio Web');

    // La tv en Colombia must also have an offline badge now that its broken link was cleared
    const latvHeader = screen.getByText('La tv en Colombia');
    const latvCard = latvHeader.closest('.portafolio');
    expect(latvCard.querySelector('a')).toBeNull();
    expect(latvCard.querySelector('.portafolio-badge--offline')).toBeInTheDocument();
  });
});
