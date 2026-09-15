import { useState } from 'react';
import {
  validateName,
  validateEmail,
  validateMessage,
  validateContactForm
} from '../../utils/contactValidation';
import { sendContactEmail } from '../../services/contact.service';
import ContactSuccessMessage from './ContactSuccessMessage';

const INITIAL_FORM = {
  nombre: '',
  email: '',
  mensaje: ''
};

const validateField = (name, value) => {
  if (name === 'nombre') return validateName(value);
  if (name === 'email') return validateEmail(value);
  if (name === 'mensaje') return validateMessage(value);
  return { isValid: true, error: null, severity: null };
};

const getInputClass = (error, severity, baseClass) => {
  if (!error) return baseClass;
  if (severity === 'warning') return `${baseClass} ${baseClass}--warning`;
  return `${baseClass} ${baseClass}--error`;
};

const FieldAlert = ({ id, error, severity }) => {
  if (!error) return null;
  const isWarning = severity === 'warning';
  const alertClass = isWarning ? 'contact-form__alert--warning' : 'contact-form__alert--error';
  const iconClass = isWarning ? 'fa-exclamation-triangle' : 'fa-exclamation-circle';

  return (
    <div id={id} className={`contact-form__alert ${alertClass}`} role="alert">
      <i className={`fa ${iconClass}`} aria-hidden="true"></i>
      <span>{error}</span>
    </div>
  );
};

const MessageCounter = ({ length }) => {
  if (length < 100) {
    return (
      <span className="contact-form__counter-badge contact-form__counter-badge--pending">
        Faltan {100 - length} caracteres para el mínimo
      </span>
    );
  }

  if (length <= 1000) {
    return (
      <span className="contact-form__counter-badge contact-form__counter-badge--ready">
        <i className="fa fa-check" aria-hidden="true"></i> Mínimo alcanzado
      </span>
    );
  }

  return (
    <span className="contact-form__counter-badge contact-form__counter-badge--overflow">
      Límite excedido
    </span>
  );
};

const SendErrorAlert = ({ error, currentMailtoUrl, isSending }) => {
  if (!error) return null;

  return (
    <div className="contact-form__send-error" role="alert" aria-live="assertive">
      <div className="contact-form__send-error-header">
        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
        <strong>No se pudo enviar el mensaje</strong>
      </div>
      <p>{error}</p>
      <div className="contact-form__send-error-actions">
        <button
          type="submit"
          className="contact-form__retry-btn"
          disabled={isSending}
        >
          <i className="fa fa-refresh" aria-hidden="true"></i> Reintentar envío
        </button>
        <a
          href={currentMailtoUrl}
          className="contact-form__mailto-fallback-btn"
        >
          <i className="fa fa-envelope" aria-hidden="true"></i> Enviar mediante mi correo (alternativa)
        </a>
      </div>
    </div>
  );
};

const ContactForm = ({ contactEmail }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [severities, setSeverities] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const updateFieldError = (name, value) => {
    const result = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: result.isValid ? null : result.error }));
    setSeverities((prev) => ({ ...prev, [name]: result.severity }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      updateFieldError(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateFieldError(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    setErrors(validation.errors);
    setSeverities(validation.severities);

    if (!validation.isValid) {
      return;
    }

    setIsSending(true);
    setSendError(null);

    try {
      await sendContactEmail(formData);
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    } catch (err) {
      const message =
        err?.userMessage ||
        err?.message ||
        'No se pudo conectar al servicio de mensajería para enviar el correo.';
      setSendError(message);
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSeverities({});
    setSubmittedData(null);
    setSendError(null);
    setIsSubmitted(false);
  };

  const messageLength = formData.mensaje.trim().length;
  const currentMailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `Contacto Portafolio - ${formData.nombre}`
  )}&body=${encodeURIComponent(
    `Nombre: ${formData.nombre}\nCorreo: ${formData.email}\n\nObservaciones / Mensaje:\n${formData.mensaje}`
  )}`;

  if (isSubmitted && submittedData) {
    return (
      <ContactSuccessMessage
        submittedData={submittedData}
        contactEmail={contactEmail}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="contact-card__form-wrapper">
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulario de contacto"
      >
        {/* Campo 1: Nombre */}
        <div className="contact-form__field">
          <label htmlFor="nombre">
            <span>
              Nombre completo
              <span className="contact-form__required-indicator" title="Campo obligatorio">*</span>
            </span>
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            autoComplete="name"
            maxLength={100}
            className={getInputClass(errors.nombre, severities.nombre, 'contact-form__input')}
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ejemplo: Edison Ospina"
            required
            aria-required="true"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          />
          <FieldAlert id="nombre-error" error={errors.nombre} severity={severities.nombre} />
        </div>

        {/* Campo 2: Email */}
        <div className="contact-form__field">
          <label htmlFor="email">
            <span>
              Correo electrónico
              <span className="contact-form__required-indicator" title="Campo obligatorio">*</span>
            </span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            maxLength={100}
            className={getInputClass(errors.email, severities.email, 'contact-form__input')}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ejemplo: nombre@dominio.com o .co"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <FieldAlert id="email-error" error={errors.email} severity={severities.email} />
        </div>

        {/* Campo 3: Mensaje / Observaciones */}
        <div className="contact-form__field">
          <label htmlFor="mensaje">
            <span>
              Observaciones o mensaje
              <span className="contact-form__required-indicator" title="Campo obligatorio">*</span>
            </span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="6"
            maxLength={1000}
            className={getInputClass(errors.mensaje, severities.mensaje, 'contact-form__textarea')}
            value={formData.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe tus observaciones, requerimientos o propuesta de proyecto (mínimo 100 caracteres)..."
            required
            aria-required="true"
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
          ></textarea>

          <div className="contact-form__counter">
            <MessageCounter length={messageLength} />
            <span>{messageLength} / 1000 caracteres</span>
          </div>

          <FieldAlert id="mensaje-error" error={errors.mensaje} severity={severities.mensaje} />
        </div>

        {/* Alerta de fallo de envío si ocurre un error */}
        <SendErrorAlert
          error={sendError}
          currentMailtoUrl={currentMailtoUrl}
          isSending={isSending}
        />

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="contact-form__submit-btn"
          disabled={isSending}
        >
          <i
            className={`fa ${isSending ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}
            aria-hidden="true"
          ></i>
          <span>{isSending ? 'Enviando mensaje...' : 'Enviar Mensaje'}</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
