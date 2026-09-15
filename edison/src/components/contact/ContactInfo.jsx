const ContactInfo = ({ contactInfo }) => {
  return (
    <aside className="contact-card__info" aria-label="Información de contacto">
      <div className="contact-card__info-header">
        <h3>Información de Contacto</h3>
        <p>Hablemos sobre arquitectura frontend, liderazgo técnico o desarrollo web corporativo.</p>
      </div>

      <ul className="contact-card__items">
        <li className="contact-card__item">
          <div className="contact-card__icon-box" aria-hidden="true">
            <i className="fa fa-home"></i>
          </div>
          <div className="contact-card__item-text">
            <span className="contact-card__item-label">Ubicación</span>
            <span className="contact-card__item-value">{contactInfo.city}</span>
          </div>
        </li>

        <li className="contact-card__item">
          <div className="contact-card__icon-box" aria-hidden="true">
            <i className="fa fa-envelope"></i>
          </div>
          <div className="contact-card__item-text">
            <span className="contact-card__item-label">Correo Electrónico</span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="contact-card__item-value"
              aria-label={`Enviar correo a ${contactInfo.email}`}
            >
              {contactInfo.email}
            </a>
          </div>
        </li>

        <li className="contact-card__item">
          <div className="contact-card__icon-box" aria-hidden="true">
            <i className="fa fa-phone"></i>
          </div>
          <div className="contact-card__item-text">
            <span className="contact-card__item-label">Teléfono</span>
            <a
              href="tel:+573185735382"
              className="contact-card__item-value"
              aria-label={`Llamar al ${contactInfo.phone}`}
            >
              {contactInfo.phone}
            </a>
          </div>
        </li>
      </ul>

      <div className="contact-card__note">
        <p>Disponible para oportunidades de liderazgo técnico, consultorías y proyectos de alta complejidad.</p>
        <span className="contact-card__sla">
          <i className="fa fa-clock-o" aria-hidden="true"></i> Respuestas en menos de 24 horas
        </span>
      </div>
    </aside>
  );
};

export default ContactInfo;
