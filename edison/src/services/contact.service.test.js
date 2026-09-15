import { sendContactEmail } from './contact.service';

describe('contact.service', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  test('sends email successfully to endpoint', async () => {
    const mockSuccessResponse = {
      ok: true,
      json: async () => ({ success: 'true', message: 'The email was sent successfully' })
    };

    global.fetch = jest.fn().mockResolvedValue(mockSuccessResponse);

    const result = await sendContactEmail({
      nombre: 'Edison Ospina',
      email: 'edisonv16@gmail.com',
      mensaje: 'Prueba de mensaje de contacto con longitud suficiente para superar cien caracteres mínimos de validación.'
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://formsubmit.co/ajax/edisonv16@gmail.com',
      expect.objectContaining({
        method: 'POST'
      })
    );
    expect(result.success).toBe('true');
  });
});
