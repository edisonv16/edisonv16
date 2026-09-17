import { render, screen, fireEvent, act } from '@testing-library/react';
import Testimonial from './Testimonial';

describe('Testimonial Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders initial quote from Edison Ospina', () => {
    render(<Testimonial />);

    expect(screen.getByText(/Soy de las personas que me encanta hacer mi trabajo/i)).toBeInTheDocument();
    expect(screen.getByText('Edison Ospina')).toBeInTheDocument();
  });

  test('switches quote when clicking on pagination dots', () => {
    render(<Testimonial />);

    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(3);

    fireEvent.click(dots[1]);
    expect(screen.getByText(/Nuestro trabajo va a llenar gran parte de nuestra vida/i)).toBeInTheDocument();
    expect(screen.getByText('Steve Jobs')).toBeInTheDocument();

    fireEvent.click(dots[2]);
    expect(screen.getByText(/La trampa de la optimización: diseñar un proceso complejo para resolver un problema que nunca debió existir/i)).toBeInTheDocument();
    expect(screen.getByText('Edison Ospina')).toBeInTheDocument();
    expect(screen.getByText(/Axioma de arquitectura de software/i)).toBeInTheDocument();
  });

  test('auto-advances quotes according to calculated reading times', () => {
    render(<Testimonial />);

    expect(screen.getByText('Edison Ospina')).toBeInTheDocument();

    // Edison's reading time is 19s (19000ms)
    act(() => {
      jest.advanceTimersByTime(19000);
    });
    expect(screen.getByText('Steve Jobs')).toBeInTheDocument();

    // Steve Jobs' reading time is 25s (25000ms)
    act(() => {
      jest.advanceTimersByTime(25000);
    });
    expect(screen.getByText(/La trampa de la optimización/i)).toBeInTheDocument();
    expect(screen.getByText(/Axioma de arquitectura de software/i)).toBeInTheDocument();

    // Axiom reading time is 10s (10000ms)
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText(/Soy de las personas que me encanta hacer mi trabajo/i)).toBeInTheDocument();
  });

  test('pauses auto-advancement on mouseEnter and resumes on mouseLeave', () => {
    const { container } = render(<Testimonial />);
    const card = container.querySelector('.testimonial-card');

    expect(screen.getByText('Edison Ospina')).toBeInTheDocument();

    fireEvent.mouseEnter(card);

    act(() => {
      jest.advanceTimersByTime(20000);
    });
    // Should still be Edison because timer was paused
    expect(screen.getByText('Edison Ospina')).toBeInTheDocument();

    fireEvent.mouseLeave(card);

    act(() => {
      jest.advanceTimersByTime(19000);
    });
    // Now it should have transitioned to Steve Jobs
    expect(screen.getByText('Steve Jobs')).toBeInTheDocument();
  });
});
