import { fetchWithRetry, categorizeError, ServiceError } from './http.util';

describe('http.util', () => {
  const originalFetch = global.fetch;
  const originalNavigator = global.navigator;

  afterEach(() => {
    global.fetch = originalFetch;
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true
    });
    jest.restoreAllMocks();
  });

  describe('categorizeError', () => {
    test('classifies offline when navigator.onLine is false', () => {
      Object.defineProperty(global, 'navigator', {
        value: { onLine: false },
        configurable: true,
        writable: true
      });

      const err = categorizeError(new Error('Failed to fetch'));
      expect(err).toBeInstanceOf(ServiceError);
      expect(err.category).toBe('OFFLINE');
      expect(err.userMessage).toContain('falta de conexión a internet');
    });

    test('classifies HTTP 401 error', () => {
      const err = categorizeError(new Error('HTTP_401'), 401);
      expect(err.category).toBe('UNAUTHORIZED');
      expect(err.status).toBe(401);
      expect(err.userMessage).toContain('Error 401: No autorizado');
    });

    test('classifies HTTP 403 error', () => {
      const err = categorizeError(new Error('HTTP_403'), 403);
      expect(err.category).toBe('FORBIDDEN');
      expect(err.status).toBe(403);
      expect(err.userMessage).toContain('Error 403: Acceso denegado');
    });

    test('classifies HTTP 500 error', () => {
      const err = categorizeError(new Error('HTTP_500'), 500);
      expect(err.category).toBe('SERVER_ERROR');
      expect(err.status).toBe(500);
      expect(err.userMessage).toContain('Error 500: Error interno en el servidor');
    });

    test('classifies Timeout / Abort / VPN error', () => {
      const timeoutErr = new Error('The operation was aborted due to timeout');
      timeoutErr.name = 'TimeoutError';
      const err = categorizeError(timeoutErr);
      expect(err.category).toBe('TIMEOUT_OR_VPN');
      expect(err.userMessage).toContain('VPN, firewall o tiempo de espera');
    });
  });

  describe('fetchWithRetry', () => {
    test('succeeds on first attempt without retrying', async () => {
      const mockResponse = { ok: true, json: async () => ({ success: true }) };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const res = await fetchWithRetry('https://api.example.com/test', {}, 3, 10);
      expect(res).toBe(mockResponse);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('retries on failure and succeeds on 2nd attempt', async () => {
      const mockResponse = { ok: true, json: async () => ({ success: true }) };
      global.fetch = jest.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockResponse);

      const res = await fetchWithRetry('https://api.example.com/test', {}, 3, 10);
      expect(res).toBe(mockResponse);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test('retries up to 3 attempts on persistent failure and throws ServiceError', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Persistent failure'));

      await expect(
        fetchWithRetry('https://api.example.com/test', {}, 3, 5)
      ).rejects.toThrow(ServiceError);

      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    test('retries when response.ok is false and reports status code', async () => {
      const errorResponse = { ok: false, status: 500, statusText: 'Internal Server Error' };
      global.fetch = jest.fn().mockResolvedValue(errorResponse);

      await expect(
        fetchWithRetry('https://api.example.com/test', {}, 3, 5)
      ).rejects.toMatchObject({
        status: 500,
        category: 'SERVER_ERROR',
        attempts: 3
      });

      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
  });
});
