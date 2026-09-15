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
    expect(dots).toHaveLength(2);

    fireEvent.click(dots[1]);

    expect(screen.getByText(/Nuestro trabajo va a llenar gran parte de nuestra vida/i)).toBeInTheDocument();
    expect(screen.getByText('Steve Jobs')).toBeInTheDocument();
  });

  test('auto-advances quote after timer interval', () => {
    render(<Testimonial />);

    expect(screen.getByText('Edison Ospina')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    expect(screen.getByText('Steve Jobs')).toBeInTheDocument();
  });
});
