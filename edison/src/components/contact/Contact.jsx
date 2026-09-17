import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import Testimonial from './Testimonial';

const Contact = () => {
  const contactInfo = {
    city: 'Bogotá, Colombia',
    email: 'edisonv16@gmail.com',
    phone: '(+57) 318 573 5382'
  };

  return (
    <section id="contact" aria-label="Contacto directo">
      <div className="container-xxl mb-4">
        <div className="row">
          <div className="col-12 section-header mb-4">
            <span className="section-badge section-badge--dark">
              <i className="fa fa-envelope" aria-hidden="true"></i> Canal Directo
            </span>
            <h2 className="section-title-principal section-title-principal--dark">
              <span>Contacto</span>
            </h2>
            <p className="section-subtitle section-subtitle--dark">
              ¿Tienes un proyecto, desafío arquitectónico o consulta técnica? Envíame un mensaje y conversemos.
            </p>
          </div>
        </div>
      </div>
      <div className="contact-section-wrapper">
        <div className="contact-card">
          <ContactInfo contactInfo={contactInfo} />
          <ContactForm contactEmail={contactInfo.email} />
        </div>
      </div>
      <Testimonial />
    </section>
  );
};

export default Contact;
