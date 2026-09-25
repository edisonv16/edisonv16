import { render, screen, fireEvent } from '@testing-library/react';
import WhatsAppChatWidget from './WhatsAppChatWidget';

describe('WhatsAppChatWidget', () => {
  const originalOpen = window.open;

  beforeEach(() => {
    window.dataLayer = [];
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = originalOpen;
    delete window.dataLayer;
  });

  test('debe renderizar el botón disparador con su etiqueta accesible y badge inicial', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveAttribute('aria-expanded', 'false');

    const badgeElement = screen.getByLabelText(/1 mensaje sin leer/i);
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent('1');
  });

  test('debe abrir la tarjeta de chat al hacer clic en el botón flotante y limpiar el badge', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
    expect(screen.getByText(/edison vidal ospina/i)).toBeInTheDocument();
    expect(screen.getByText(/en línea/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/1 mensaje sin leer/i)).not.toBeInTheDocument();
  });

  test('debe cerrar la tarjeta de chat al hacer clic en el botón de cerrar', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const closeButton = screen.getByRole('button', { name: /cerrar conversación de whatsapp/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('debe permitir editar el mensaje predeterminado en el textarea', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const textarea = screen.getByRole('textbox', { name: /mensaje a enviar:/i });
    expect(textarea.value).toContain('Hola Edison');

    fireEvent.change(textarea, { target: { value: 'Mensaje de prueba para agendar entrevista' } });
    expect(textarea.value).toBe('Mensaje de prueba para agendar entrevista');
  });

  test('debe disparar el evento en dataLayer y abrir WhatsApp con la URL codificada al enviar', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const textarea = screen.getByRole('textbox', { name: /mensaje a enviar:/i });
    fireEvent.change(textarea, { target: { value: 'Quiero agendar una cita técnica' } });

    const submitButton = screen.getByRole('button', { name: /enviar mensaje a whatsapp y activar agendamiento/i });
    fireEvent.click(submitButton);

    // 1. Validar evento en dataLayer para Tag Manager
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toMatchObject({
      event: 'whatsapp_click',
      whatsapp_phone: '573185735382',
      whatsapp_source: 'portfolio_floating_widget',
      whatsapp_message_length: 31
    });

    // 2. Validar llamada a window.open
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/573185735382?text=Quiero%20agendar%20una%20cita%20t%C3%A9cnica'),
      '_blank',
      'noopener,noreferrer'
    );

    // 3. La ventana debe cerrarse tras el envío
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('debe deshabilitar el botón de envío si el mensaje está en blanco', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const textarea = screen.getByRole('textbox', { name: /mensaje a enviar:/i });
    fireEvent.change(textarea, { target: { value: '   ' } });

    const submitButton = screen.getByRole('button', { name: /enviar mensaje a whatsapp y activar agendamiento/i });
    expect(submitButton).toBeDisabled();

    fireEvent.click(submitButton);
    expect(window.open).not.toHaveBeenCalled();
  });
});
