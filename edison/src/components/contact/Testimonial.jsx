import { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    quote: 'Soy de las personas que me encanta hacer mi trabajo de la mejor manera, me gusta que mis clientes estén satisfechos con mi trabajo y con la empresa a la que le preste mis servicios profesiones. Brindando lo mejor de mis capacidades y aptitudes, logrando todos los objetivos propuestos.',
    author: 'Edison Ospina',
    role: 'Senior Frontend Engineer & UI Architect'
  },
  {
    quote: 'Nuestro trabajo va a llenar gran parte de nuestra vida, y la única forma de estar realmente satisfecho, es hacer aquello que creen que es un gran trabajo. Y la única manera de hacer un gran trabajo es amar lo que haces. Si no lo has encontrado, sigue buscando. No se Conforme. Al igual que con todos los asuntos del corazón, sabra cuando lo encuentre.',
    author: 'Steve Jobs',
    role: 'Cofundador de Apple'
  }
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" aria-label="Testimonios y citas inspiracionales">
      <div className="testimonials-wrapper">
        <div className="testimonial-card">
          <div className="testimonial-quote-icon" aria-hidden="true">
            <i className="fa fa-quote-left"></i>
          </div>

          <div className="testimonial-content">
            <blockquote key={activeIndex} className="testimonial-slide">
              <p className="testimonial-text">&ldquo;{current.quote}&rdquo;</p>
              <div className="testimonial-author-box">
                <cite className="testimonial-author">{current.author}</cite>
                {current.role && <span className="testimonial-role">{current.role}</span>}
              </div>
            </blockquote>

            <div className="testimonial-controls" role="tablist" aria-label="Navegación de testimonios">
              {TESTIMONIALS.map((item, index) => (
                <button
                  key={item.author}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-label={`Ver cita de ${item.author}`}
                  className={`testimonial-dot ${activeIndex === index ? 'testimonial-dot--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;