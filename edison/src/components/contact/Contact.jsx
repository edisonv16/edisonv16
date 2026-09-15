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
    <section id="contact">
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
