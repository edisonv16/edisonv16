import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WhatsAppChatWidget from './WhatsAppChatWidget';

describe('WhatsAppChatWidget (Chat Conversacional Embebido)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    window.dataLayer = [];
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    delete window.dataLayer;
    jest.clearAllMocks();
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

  test('debe enviar el mensaje al webhook de Make.com, registrar evento en dataLayer y renderizar la respuesta del asistente', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: () => 'application/json'
      },
      text: async () => JSON.stringify({
        reply: '¡Hola! Con gusto agendamos una llamada. ¿Te queda bien el martes a las 10 AM?'
      }),
      json: async () => ({
        reply: '¡Hola! Con gusto agendamos una llamada. ¿Te queda bien el martes a las 10 AM?'
      })
    });

    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const textarea = screen.getByRole('textbox', { name: /mensaje a enviar:/i });
    fireEvent.change(textarea, { target: { value: 'Quiero agendar una cita técnica' } });

    const submitButton = screen.getByRole('button', { name: /enviar mensaje al asistente/i });
    fireEvent.click(submitButton);

    // 1. Validar que el mensaje del usuario aparece de inmediato en la conversación
    expect(screen.getByText('Quiero agendar una cita técnica')).toBeInTheDocument();

    // 2. Validar que el evento en dataLayer se disparó para Google Tag Manager / GA4
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toMatchObject({
      event: 'whatsapp_click',
      whatsapp_phone: '573185735382',
      whatsapp_source: 'portfolio_embedded_chat',
      whatsapp_message_length: 31
    });

    // 3. Validar la llamada al Webhook de Make.com
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://hook.us2.make.com/jt5r7jvtrodngsjka1atkwkrt5ol3ct7',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: expect.stringContaining('"message":"Quiero agendar una cita técnica"')
      })
    );

    // 4. Esperar y validar que la respuesta del agente de Make se renderiza en la misma ventana
    await waitFor(() => {
      expect(
        screen.getByText('¡Hola! Con gusto agendamos una llamada. ¿Te queda bien el martes a las 10 AM?')
      ).toBeInTheDocument();
    });

    // 5. El textarea se debe limpiar para continuar la conversación
    expect(textarea.value).toBe('');
  });

  test('debe deshabilitar el botón de envío si el mensaje está en blanco', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const textarea = screen.getByRole('textbox', { name: /mensaje a enviar:/i });
    fireEvent.change(textarea, { target: { value: '   ' } });

    const submitButton = screen.getByRole('button', { name: /enviar mensaje al asistente/i });
    expect(submitButton).toBeDisabled();

    fireEvent.click(submitButton);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('debe mostrar mensaje de contingencia con enlace directo a WhatsApp si el webhook falla', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const textarea = screen.getByRole('textbox', { name: /mensaje a enviar:/i });
    fireEvent.change(textarea, { target: { value: 'Hola, tengo una pregunta' } });

    const submitButton = screen.getByRole('button', { name: /enviar mensaje al asistente/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/también puedes tocar aquí para continuar por whatsapp/i)).toBeInTheDocument();
    });

    const fallbackLink = screen.getByRole('link', { name: /abrir conversación directamente en whatsapp/i });
    expect(fallbackLink).toHaveAttribute('href', expect.stringContaining('https://wa.me/573185735382'));
    expect(fallbackLink).toHaveAttribute('target', '_blank');
    expect(fallbackLink).toHaveAttribute('rel', 'noreferrer');
  });

  test('debe mostrar los 3 botones de opciones rápidas al abrir el chat inicial', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    expect(screen.getByRole('button', { name: /📅 agendar cita/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /💼 preguntar sobre mi portafolio/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /💬 hablar directamente con edison/i })).toBeInTheDocument();
  });

  test('debe enviar mensaje al webhook y ocultar opciones al hacer clic en Agendar cita', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify({ reply: 'Con gusto agendamos. ¿Qué día prefieres?' }),
      json: async () => ({ reply: 'Con gusto agendamos. ¿Qué día prefieres?' })
    });

    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const agendaButton = screen.getByRole('button', { name: /📅 agendar cita/i });
    fireEvent.click(agendaButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://hook.us2.make.com/jt5r7jvtrodngsjka1atkwkrt5ol3ct7',
      expect.objectContaining({
        body: expect.stringContaining('me gustaría agendar una reunión o cita')
      })
    );

    // Los botones de opciones rápidas se ocultan al avanzar la conversación
    expect(screen.queryByRole('button', { name: /📅 agendar cita/i })).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Con gusto agendamos. ¿Qué día prefieres?')).toBeInTheDocument();
    });
  });

  test('debe mostrar mensaje orientativo al hacer clic en Preguntar sobre mi portafolio', () => {
    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const portfolioButton = screen.getByRole('button', { name: /💼 preguntar sobre mi portafolio/i });
    fireEvent.click(portfolioButton);

    expect(
      screen.getByText(/¡Excelente! Cuéntame qué te gustaría saber. Puedes preguntarme sobre mi experiencia/i)
    ).toBeInTheDocument();
  });

  test('debe abrir WhatsApp directo al hacer clic en Hablar directamente con Edison', () => {
    const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => {});

    render(<WhatsAppChatWidget />);

    const triggerButton = screen.getByRole('button', { name: /abrir chat interactivo de whatsapp/i });
    fireEvent.click(triggerButton);

    const directButton = screen.getByRole('button', { name: /💬 hablar directamente con edison/i });
    fireEvent.click(directButton);

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/573185735382'),
      '_blank',
      'noopener,noreferrer'
    );

    windowOpenSpy.mockRestore();
  });
});
