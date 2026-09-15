import { render, screen, fireEvent } from '@testing-library/react';
import Contact from './Contact';

describe('Contact Component', () => {
  test('renders contact information with city, email and phone', () => {
    render(<Contact />);

    expect(screen.getByText('Bogotá, Colombia')).toBeInTheDocument();
    expect(screen.getByText('edisonv16@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('(+57) 318 573 5382')).toBeInTheDocument();
  });

  test('renders 3 form fields: nombre, email and mensaje', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Observaciones o mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  test('displays validation alerts when submitting an empty form', () => {
    render(<Contact />);

    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('Las observaciones o mensaje son obligatorios.')).toBeInTheDocument();
  });

  test('displays warning when nombre has less than 6 characters', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    fireEvent.change(nameInput, { target: { value: 'Juan' } });
    fireEvent.blur(nameInput);

    expect(screen.getByText(/al menos 6 caracteres/i)).toBeInTheDocument();
  });

  test('displays error when nombre contains numbers or special injection characters', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);

    fireEvent.change(nameInput, { target: { value: 'Edison123' } });
    fireEvent.blur(nameInput);
    expect(screen.getByText(/no puede contener números/i)).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Edison?' } });
    fireEvent.blur(nameInput);
    expect(screen.getByText(/No se permiten caracteres especiales como '\?'/i)).toBeInTheDocument();
  });

  test('displays warning when mensaje has less than 100 characters with remaining count', () => {
    render(<Contact />);

    const messageInput = screen.getByLabelText(/Observaciones o mensaje/i);
    fireEvent.change(messageInput, { target: { value: 'Mensaje corto de prueba.' } });
    fireEvent.blur(messageInput);

    expect(screen.getByText(/El mensaje debe tener al menos 100 caracteres/i)).toBeInTheDocument();
  });

  test('submits successfully and displays affirmative confirmation with submitted fields and 24h SLA', async () => {
    const mockSuccessResponse = {
      ok: true,
      json: async () => ({ success: true })
    };
    global.fetch = jest.fn().mockResolvedValue(mockSuccessResponse);

    render(<Contact />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const messageInput = screen.getByLabelText(/Observaciones o mensaje/i);

    const validMessage = 'Estimado Edison, me interesó mucho tu perfil profesional como Senior Frontend Engineer y deseamos coordinar una entrevista técnica para un proyecto.';
    expect(validMessage.length).toBeGreaterThanOrEqual(100);

    fireEvent.change(nameInput, { target: { value: 'Carlos Mendoza' } });
    fireEvent.change(emailInput, { target: { value: 'carlos@empresa.com.co' } });
    fireEvent.change(messageInput, { target: { value: validMessage } });

    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('¡Mensaje enviado correctamente!')).toBeInTheDocument();
    expect(screen.getByText('Carlos Mendoza')).toBeInTheDocument();
    expect(screen.getByText('carlos@empresa.com.co')).toBeInTheDocument();
    expect(screen.getByText(validMessage)).toBeInTheDocument();
    expect(screen.getByText(/Te responderé en las próximas/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Enviar otro mensaje/i });
    fireEvent.click(resetBtn);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
  });

  test('displays error alert in red when submission fails and preserves entered data', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    render(<Contact />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const messageInput = screen.getByLabelText(/Observaciones o mensaje/i);

    const validMessage =
      'Hola Edison, te contacto para una consultoría técnica sobre arquitectura de frontend en React y diseño de sistemas web.';
    expect(validMessage.length).toBeGreaterThanOrEqual(100);

    fireEvent.change(nameInput, { target: { value: 'Andrea Suárez' } });
    fireEvent.change(emailInput, { target: { value: 'andrea@tech.co' } });
    fireEvent.change(messageInput, { target: { value: validMessage } });

    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('No se pudo enviar el mensaje')).toBeInTheDocument();
    expect(
      screen.getByText(/No se pudo conectar al servicio por falta de conexión a internet o bloqueo de red/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reintentar envío/i })).toBeInTheDocument();
    expect(screen.getByText(/Enviar mediante mi correo \(alternativa\)/i)).toBeInTheDocument();

    // Verify fields were preserved so user doesn't lose their input
    expect(nameInput.value).toBe('Andrea Suárez');
    expect(emailInput.value).toBe('andrea@tech.co');
    expect(messageInput.value).toBe(validMessage);
  });
});
