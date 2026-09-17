export class ServiceError extends Error {
  constructor(message, { category = 'UNKNOWN', status = null, attempts = 1, originalError = null } = {}) {
    super(message);
    this.name = 'ServiceError';
    this.userMessage = message;
    this.category = category;
    this.status = status;
    this.attempts = attempts;
    this.originalError = originalError;
  }
}

export const categorizeError = (error, status = null, attempts = 3) => {
  const isBrowserOffline = typeof navigator !== 'undefined' && navigator.onLine === false;

  if (isBrowserOffline) {
    return new ServiceError('No se pudo conectar al servicio por falta de conexión a internet.', {
      category: 'OFFLINE',
      status,
      attempts,
      originalError: error
    });
  }

  if (status === 401) {
    return new ServiceError('Error 401: No autorizado para acceder al servicio.', {
      category: 'UNAUTHORIZED',
      status: 401,
      attempts,
      originalError: error
    });
  }

  if (status === 403) {
    return new ServiceError('Error 403: Acceso denegado o restringido al servicio.', {
      category: 'FORBIDDEN',
      status: 403,
      attempts,
      originalError: error
    });
  }

  if (status && status >= 500) {
    return new ServiceError(`Error ${status}: Error interno en el servidor del servicio.`, {
      category: 'SERVER_ERROR',
      status,
      attempts,
      originalError: error
    });
  }

  if (status && status >= 400) {
    const detail = error?.serverDetail || (error?.message && !error.message.startsWith('HTTP_') ? error.message : null);
    const message = detail
      ? `Error ${status}: ${detail}`
      : `Error ${status}: Problema en la solicitud del servicio.`;
    return new ServiceError(message, {
      category: 'CLIENT_ERROR',
      status,
      attempts,
      originalError: error
    });
  }

  const errorName = error?.name || '';
  const errorMessage = error?.message?.toLowerCase() || '';

  if (
    errorName === 'TimeoutError' ||
    errorName === 'AbortError' ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('aborted')
  ) {
    return new ServiceError('No se pudo conectar al servicio. Posible bloqueo por VPN, firewall o tiempo de espera agotado.', {
      category: 'TIMEOUT_OR_VPN',
      status,
      attempts,
      originalError: error
    });
  }

  if (errorName === 'TypeError' || errorMessage.includes('fetch') || errorMessage.includes('network')) {
    return new ServiceError('No se pudo conectar al servicio por falta de conexión a internet o bloqueo de red.', {
      category: 'NETWORK_ERROR',
      status,
      attempts,
      originalError: error
    });
  }

  return new ServiceError(error?.message || 'Error inesperado al consultar el servicio.', {
    category: 'UNKNOWN',
    status,
    attempts,
    originalError: error
  });
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithRetry = async (url, options = {}, maxAttempts = 3, delayMs = 600) => {
  const { timeoutMs, ...fetchOptions } = options;
  let lastError = null;
  let lastStatus = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let timeoutId = null;
    try {
      let signal = fetchOptions.signal;

      if (timeoutMs) {
        if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
          signal = AbortSignal.timeout(timeoutMs);
        } else if (typeof AbortController !== 'undefined') {
          const controller = new AbortController();
          signal = controller.signal;
          timeoutId = setTimeout(() => controller.abort(new Error('TimeoutError')), timeoutMs);
        }
      }

      const response = await fetch(url, {
        ...fetchOptions,
        signal: signal || fetchOptions.signal
      });

      if (!response.ok) {
        lastStatus = response.status;
        let responseBody = '';
        try {
          responseBody = await response.text();
        } catch {
          // ignore
        }
        const error = new Error(responseBody || `HTTP_${response.status}`);
        error.serverDetail = responseBody;
        throw error;
      }

      return response;
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts && delayMs > 0) {
        await wait(delayMs);
      }
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  throw categorizeError(lastError, lastStatus, maxAttempts);
};
