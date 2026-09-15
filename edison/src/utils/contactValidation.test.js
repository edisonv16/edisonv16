import {
  validateName,
  validateEmail,
  validateMessage,
  validateContactForm
} from './contactValidation';

describe('contactValidation', () => {
  describe('validateName', () => {
    test('rejects empty or whitespace-only name', () => {
      const res = validateName('   ');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('El nombre es obligatorio.');
      expect(res.severity).toBe('error');
    });

    test('rejects name with less than 6 characters with warning', () => {
      const res = validateName('Juan');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('al menos 6 caracteres');
      expect(res.severity).toBe('warning');
    });

    test('rejects name with numbers', () => {
      const res = validateName('Edison 123');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('no puede contener números');
      expect(res.severity).toBe('error');
    });

    test('rejects name with question mark or injection tokens', () => {
      const res = validateName('Edison?');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("No se permiten caracteres especiales como '?'");

      const sqlRes = validateName("Robert'; DROP TABLE");
      expect(sqlRes.isValid).toBe(false);
    });

    test('rejects name with URLs', () => {
      const res = validateName('Edison http://test.com');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('No se permiten enlaces o URLs');
    });

    test('rejects name exceeding 100 characters', () => {
      const longName = 'A'.repeat(101);
      const res = validateName(longName);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('no puede superar los 100 caracteres');
      expect(res.severity).toBe('error');
    });

    test('accepts valid names with letters, spaces and accents', () => {
      const res1 = validateName('Edison Vidal Ospina');
      expect(res1.isValid).toBe(true);

      const res2 = validateName('María José Peña');
      expect(res2.isValid).toBe(true);
    });
  });

  describe('validateEmail', () => {
    test('rejects empty email', () => {
      const res = validateEmail('');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('El correo electrónico es obligatorio.');
    });

    test('rejects email exceeding 100 characters', () => {
      const longEmail = 'a'.repeat(95) + '@test.com';
      expect(longEmail.length).toBeGreaterThan(100);
      const res = validateEmail(longEmail);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('no puede superar los 100 caracteres');
      expect(res.severity).toBe('error');
    });

    test('rejects email without @ or domain', () => {
      const res1 = validateEmail('edisongmail.com');
      expect(res1.isValid).toBe(false);

      const res2 = validateEmail('edison@');
      expect(res2.isValid).toBe(false);
    });

    test('accepts valid email with .com or .co', () => {
      const resCom = validateEmail('edisonv16@gmail.com');
      expect(resCom.isValid).toBe(true);

      const resCo = validateEmail('contacto@empresa.com.co');
      expect(resCo.isValid).toBe(true);
    });
  });

  describe('validateMessage', () => {
    test('rejects empty message', () => {
      const res = validateMessage('');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Las observaciones o mensaje son obligatorios.');
    });

    test('rejects message with less than 100 characters with warning and missing count', () => {
      const shortMsg = 'Hola, este es un mensaje corto.';
      const res = validateMessage(shortMsg);
      expect(res.isValid).toBe(false);
      expect(res.severity).toBe('warning');
      expect(res.error).toContain('faltan');
    });

    test('rejects message exceeding 1000 characters', () => {
      const longMsg = 'a'.repeat(1001);
      const res = validateMessage(longMsg);
      expect(res.isValid).toBe(false);
      expect(res.severity).toBe('error');
      expect(res.error).toContain('no puede superar los 1000 caracteres');
    });

    test('rejects script tags or malicious code', () => {
      const malicious = '<script>alert("hack")</script> ' + 'a'.repeat(100);
      const res = validateMessage(malicious);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('No se permite código ejecutable');
    });

    test('accepts valid message between 100 and 1000 characters', () => {
      const validMsg = 'Estimado Edison, me interesó mucho tu perfil como Senior Frontend Engineer y quisiéramos coordinar una entrevista técnica para un proyecto de arquitectura web.';
      expect(validMsg.length).toBeGreaterThanOrEqual(100);
      expect(validMsg.length).toBeLessThanOrEqual(1000);

      const res = validateMessage(validMsg);
      expect(res.isValid).toBe(true);
      expect(res.error).toBeNull();
    });
  });

  describe('validateContactForm', () => {
    test('validates complete form correctly', () => {
      const invalidForm = validateContactForm({
        nombre: 'Ed',
        email: 'invalid',
        mensaje: 'corto'
      });

      expect(invalidForm.isValid).toBe(false);
      expect(invalidForm.errors.nombre).toBeDefined();
      expect(invalidForm.errors.email).toBeDefined();
      expect(invalidForm.errors.mensaje).toBeDefined();

      const validForm = validateContactForm({
        nombre: 'Edison Ospina',
        email: 'edisonv16@gmail.com',
        mensaje: 'Estimado Edison, me interesó mucho tu perfil como Senior Frontend Engineer y quisiéramos coordinar una entrevista técnica para un proyecto de arquitectura web.'
      });

      expect(validForm.isValid).toBe(true);
      expect(Object.keys(validForm.errors)).toHaveLength(0);
    });
  });
});
