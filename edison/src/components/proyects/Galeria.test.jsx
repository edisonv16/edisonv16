import { render, screen, fireEvent, within } from '@testing-library/react';
import Galeria from './Galeria';

describe('Galeria Component', () => {
    test('renders section header, badge and subtitle', () => {
        render(<Galeria />);

        expect(screen.getByText('Dirección de Arte & Creatividad')).toBeInTheDocument();
        expect(screen.getByText('Galería')).toBeInTheDocument();
        expect(screen.getByText(/Ilustración digital, campañas visuales de gran formato y piezas gráficas premiadas/i)).toBeInTheDocument();
    });

    test('renders category filter buttons with counters', () => {
        render(<Galeria />);

        const allButton = screen.getByRole('button', { name: /filtrar obras por todas las obras/i });
        const ilustracionButton = screen.getByRole('button', { name: /filtrar obras por ilustración digital/i });
        const campanasButton = screen.getByRole('button', { name: /filtrar obras por campañas publicitarias/i });

        expect(allButton).toBeInTheDocument();
        expect(ilustracionButton).toBeInTheDocument();
        expect(campanasButton).toBeInTheDocument();

        expect(allButton).toHaveClass('galeria-editorial-filter--active');
        expect(allButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('renders all artwork cards when all filter is active', () => {
        render(<Galeria />);

        expect(screen.getByText('Spider-Man — Realismo Mágico')).toBeInTheDocument();
        expect(screen.getByText('Guerrera Lunar — La Arquera Mística')).toBeInTheDocument();
        expect(screen.getByText('Búfalo Auto Brillante — Campaña Zen & Protección')).toBeInTheDocument();
        expect(screen.getByText('Aceite Express — La Calidad en Nuestra Naturaleza')).toBeInTheDocument();
        expect(screen.getByText('Doritos — Campaña de Alto Impacto')).toBeInTheDocument();
        expect(screen.getByText('Confit — Dulcería & Confitería')).toBeInTheDocument();
    });

    test('renders the complementary collection as an interactive showcase', () => {
        render(<Galeria />);

        expect(screen.getByText('Colección & Piezas Gráficas')).toBeInTheDocument();
        expect(screen.getByText(/Una selección de exploraciones visuales/i)).toBeInTheDocument();
        expect(screen.getByText('06 obras')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /abrir obra destacada: metamorfosis líquida/i })).toBeInTheDocument();
    });

    test('filters artworks when selecting Ilustración Digital', () => {
        render(<Galeria />);

        const ilustracionButton = screen.getByRole('button', { name: /filtrar obras por ilustración digital/i });
        fireEvent.click(ilustracionButton);

        expect(screen.getByText('Spider-Man — Realismo Mágico')).toBeInTheDocument();
        expect(screen.getByText('Retrato en Carmín — La Dama de las Rosas')).toBeInTheDocument();

        // Campaigns should not be present
        expect(screen.queryByText('Búfalo Auto Brillante — Campaña Zen & Protección')).toBeNull();
        expect(screen.queryByText('Doritos — Campaña de Alto Impacto')).toBeNull();
    });

    test('filters artworks when selecting Campañas Publicitarias', () => {
        render(<Galeria />);

        const campanasButton = screen.getByRole('button', { name: /filtrar obras por campañas publicitarias/i });
        fireEvent.click(campanasButton);

        expect(screen.getByText('Búfalo Auto Brillante — Campaña Zen & Protección')).toBeInTheDocument();
        expect(screen.getByText('Doritos — Campaña de Alto Impacto')).toBeInTheDocument();
        expect(screen.getByText('Confit — Dulcería & Confitería')).toBeInTheDocument();
        expect(screen.getByText('Aceite Express — La Calidad en Nuestra Naturaleza')).toBeInTheDocument();

        // Illustrations should not be present
        expect(screen.queryByText('Spider-Man — Realismo Mágico')).toBeNull();
        expect(screen.queryByText('Guerrera Lunar — La Arquera Mística')).toBeNull();
    });

    test('opens Lightbox modal on card click, navigates and closes correctly', () => {
        render(<Galeria />);

        const card = screen.getByRole('button', { name: /abrir detalle de la obra: spider-man — realismo mágico/i });
        fireEvent.click(card);

        // Lightbox dialog should be open
        const dialog = screen.getByRole('dialog', { name: /detalle de la obra: spider-man — realismo mágico/i });
        expect(dialog).toBeInTheDocument();

        // Check counter and technique inside dialog
        expect(within(dialog).getByText('1 / 11')).toBeInTheDocument();
        expect(within(dialog).getByText(/Concept Art & Iluminación Cinematográfica/i)).toBeInTheDocument();

        // Navigate next
        const nextButton = screen.getByRole('button', { name: /ver obra siguiente de la galería/i });
        fireEvent.click(nextButton);

        expect(within(dialog).getByText('2 / 11')).toBeInTheDocument();
        expect(within(dialog).getByText('Guerrera Lunar — La Arquera Mística')).toBeInTheDocument();

        // Navigate prev
        const prevButton = screen.getByRole('button', { name: /ver obra anterior de la galería/i });
        fireEvent.click(prevButton);

        expect(within(dialog).getByText('1 / 11')).toBeInTheDocument();
        expect(within(dialog).getByText('Spider-Man — Realismo Mágico')).toBeInTheDocument();

        // Close modal
        const closeButton = screen.getByRole('button', { name: /cerrar vista detallada de la obra/i });
        fireEvent.click(closeButton);

        expect(screen.queryByRole('dialog')).toBeNull();
    });

    test('closes Lightbox modal on Escape key press', () => {
        render(<Galeria />);

        const card = screen.getByRole('button', { name: /abrir detalle de la obra: spider-man — realismo mágico/i });
        fireEvent.click(card);

        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

        expect(screen.queryByRole('dialog')).toBeNull();
    });
});
