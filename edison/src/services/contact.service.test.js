import { sendContactEmail } from './contact.service';

describe('contact.service', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  test('sends email successfully to EmailJS endpoint with expected payload and reCAPTCHA token', async () => {
    const mockSuccessResponse = {
      ok: true,
      text: async () => 'OK'
    };

    global.fetch = jest.fn().mockResolvedValue(mockSuccessResponse);

    const result = await sendContactEmail({
      nombre: 'Edison Ospina',
      email: 'edisonv16@gmail.com',
      mensaje: 'Prueba de mensaje de contacto con longitud suficiente para superar cien caracteres mínimos de validación.',
      captchaToken: 'test-recaptcha-token-xyz'
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.emailjs.com/api/v1.0/email/send',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );

    const calledBody = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(calledBody.service_id).toBe('service_6o6hwrt');
    expect(calledBody.template_id).toBe('template_7bvmakg');
    expect(calledBody.user_id).toBe('TXrNNX1tNYiuinhUI');
    expect(calledBody.template_params).toEqual({
      name: 'Edison Ospina',
      email: 'edisonv16@gmail.com',
      message: 'Prueba de mensaje de contacto con longitud suficiente para superar cien caracteres mínimos de validación.',
      title: 'Portafolio Edison Ospina',
      'g-recaptcha-response': 'test-recaptcha-token-xyz'
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe('OK');
  });

  test('throws error when EmailJS responds with non-ok status', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 400
    };

    global.fetch = jest.fn().mockResolvedValue(mockErrorResponse);

    await expect(
      sendContactEmail({
        nombre: 'Edison Ospina',
        email: 'edisonv16@gmail.com',
        mensaje: 'Prueba de mensaje de contacto.'
      })
    ).rejects.toThrow();
  });
});
