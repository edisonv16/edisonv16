const ContactSuccessMessage = ({ submittedData, contactEmail, onReset }) => {
  return (
    <div className="contact-card__form-wrapper">
      <div className="contact-form__success-box" role="status" aria-live="polite">
        <div className="contact-form__success-icon-wrapper" aria-hidden="true">
          <i className="fa fa-check-circle"></i>
        </div>

        <h3 className="contact-form__success-title">¡Mensaje enviado correctamente!</h3>
        <p className="contact-form__success-subtitle">
          Tu información se ha enviado con éxito a <strong>{contactEmail}</strong>.
        </p>

        {/* Resumen de los datos enviados */}
        <div className="contact-form__summary" aria-label="Resumen de datos enviados">
          <div className="contact-form__summary-item">
            <span className="contact-form__summary-label">Nombre completo:</span>
            <span className="contact-form__summary-value">{submittedData.nombre}</span>
          </div>

          <div className="contact-form__summary-item">
            <span className="contact-form__summary-label">Correo electrónico:</span>
            <span className="contact-form__summary-value">{submittedData.email}</span>
          </div>

          <div className="contact-form__summary-item contact-form__summary-item--full">
            <span className="contact-form__summary-label">Observaciones o mensaje:</span>
            <p className="contact-form__summary-text">{submittedData.mensaje}</p>
          </div>
        </div>

        {/* Compromiso de respuesta en 24 horas */}
        <div className="contact-form__sla-badge">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
          <span>Te responderé en las próximas <strong>24 horas</strong> al correo proporcionado.</span>
        </div>

        <button
          type="button"
          className="contact-form__submit-btn contact-form__submit-btn--reset"
          onClick={onReset}
        >
          <i className="fa fa-paper-plane" aria-hidden="true"></i> Enviar otro mensaje
        </button>
      </div>
    </div>
  );
};

export default ContactSuccessMessage;
