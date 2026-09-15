import { fetchWithRetry } from '../utils/http.util';

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/edisonv16@gmail.com';

export const sendContactEmail = async ({ nombre, email, mensaje }) => {
  const payload = {
    name: nombre,
    email: email,
    message: mensaje,
    _subject: `Nuevo mensaje de contacto de ${nombre}`,
    _template: 'table',
    _captcha: 'false'
  };

  const response = await fetchWithRetry(
    FORMSUBMIT_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload),
      timeoutMs: 10000
    },
    2,
    500
  );

  const data = await response.json();
  return data;
};
