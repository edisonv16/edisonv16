export const validateName = (name) => {
  const value = (name || '').trim();

  if (!value) {
    return {
      isValid: false,
      error: 'El nombre es obligatorio.',
      severity: 'error'
    };
  }

  if (value.length < 6) {
    return {
      isValid: false,
      error: `El nombre debe tener al menos 6 caracteres (actualmente tiene ${value.length}).`,
      severity: 'warning'
    };
  }

  if (value.length > 100) {
    return {
      isValid: false,
      error: `El nombre no puede superar los 100 caracteres (actualmente tiene ${value.length}).`,
      severity: 'error'
    };
  }

  if (/\d/.test(value)) {
    return {
      isValid: false,
      error: 'El nombre no puede contener números, solo letras.',
      severity: 'error'
    };
  }

  if (/[?;'"`<>{}\\]/.test(value)) {
    return {
      isValid: false,
      error: "No se permiten caracteres especiales como '?' ni símbolos de inyección. Solo texto.",
      severity: 'error'
    };
  }

  if (/(https?:\/\/|www\.|\.com|\.co|\.net)/i.test(value)) {
    return {
      isValid: false,
      error: 'No se permiten enlaces o URLs en el campo de nombre.',
      severity: 'error'
    };
  }

  // Permite letras mayúsculas, minúsculas, tildes comunes (áéíóúÁÉÍÓÚ), diéresis (üÜ), eñes (ñÑ) y espacios
  const validNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  if (!validNameRegex.test(value)) {
    return {
      isValid: false,
      error: 'El nombre solo puede contener letras y acentos válidos.',
      severity: 'error'
    };
  }

  return { isValid: true, error: null, severity: null };
};

export const validateEmail = (email) => {
  const value = (email || '').trim();

  if (!value) {
    return {
      isValid: false,
      error: 'El correo electrónico es obligatorio.',
      severity: 'error'
    };
  }

  if (value.length > 100) {
    return {
      isValid: false,
      error: `El correo electrónico no puede superar los 100 caracteres (actualmente tiene ${value.length}).`,
      severity: 'error'
    };
  }

  // Requiere '@' y dominio como .com o .co o extensiones estándar
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co|[a-zA-Z]{2,})$/i;
  if (!emailRegex.test(value)) {
    return {
      isValid: false,
      error: "Ingresa un correo electrónico válido (debe incluir '@' y un dominio como .com o .co).",
      severity: 'error'
    };
  }

  return { isValid: true, error: null, severity: null };
};

export const validateMessage = (message) => {
  const value = (message || '').trim();

  if (!value) {
    return {
      isValid: false,
      error: 'Las observaciones o mensaje son obligatorios.',
      severity: 'error'
    };
  }

  if (value.length < 100) {
    const faltan = 100 - value.length;
    return {
      isValid: false,
      error: `El mensaje debe tener al menos 100 caracteres (faltan ${faltan} caracteres).`,
      severity: 'warning'
    };
  }

  if (value.length > 1000) {
    return {
      isValid: false,
      error: `El mensaje no puede superar los 1000 caracteres (actualmente tiene ${value.length}).`,
      severity: 'error'
    };
  }

  if (/<script|javascript:|eval\(|<iframe/i.test(value)) {
    return {
      isValid: false,
      error: 'No se permite código ejecutable ni scripts en el mensaje.',
      severity: 'error'
    };
  }

  return { isValid: true, error: null, severity: null };
};

export const validateContactForm = ({ nombre, email, mensaje }) => {
  const nameResult = validateName(nombre);
  const emailResult = validateEmail(email);
  const messageResult = validateMessage(mensaje);

  const errors = {};
  const severities = {};

  if (!nameResult.isValid) {
    errors.nombre = nameResult.error;
    severities.nombre = nameResult.severity;
  }

  if (!emailResult.isValid) {
    errors.email = emailResult.error;
    severities.email = emailResult.severity;
  }

  if (!messageResult.isValid) {
    errors.mensaje = messageResult.error;
    severities.mensaje = messageResult.severity;
  }

  const isValid = nameResult.isValid && emailResult.isValid && messageResult.isValid;

  return { isValid, errors, severities };
};

export const openMailto = (url) => {
  if (typeof window !== 'undefined' && window.location) {
    try {
      window.location.href = url;
    } catch {
      // Manejo seguro en entornos de prueba con jsdom
    }
  }
};
