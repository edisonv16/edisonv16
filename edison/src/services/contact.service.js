import { fetchWithRetry } from '../utils/http.util';

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

const SERVICE_ID =
  (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_SERVICE_ID) ||
  'service_6o6hwrt';
const TEMPLATE_ID =
  (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_TEMPLATE_ID) ||
  'template_7bvmakg';
const PUBLIC_KEY =
  (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_PUBLIC_KEY) ||
  'TXrNNX1tNYiuinhUI';

export const sendContactEmail = async ({ nombre, email, mensaje, captchaToken }) => {
  const payload = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      name: nombre,
      email: email,
      message: mensaje,
      title: 'Portafolio Edison Ospina',
      'g-recaptcha-response': captchaToken || ''
    }
  };

  const response = await fetchWithRetry(
    EMAILJS_API_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify(payload),
      timeoutMs: 10000
    },
    2,
    500
  );

  let message = 'OK';
  if (typeof response.text === 'function') {
    message = await response.text();
  } else if (typeof response.json === 'function') {
    const data = await response.json();
    message = data?.message || 'OK';
  }

  return {
    success: true,
    message
  };
};
