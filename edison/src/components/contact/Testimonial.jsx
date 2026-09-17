import { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    id: 'quote-edison-compromiso',
    quote: 'Soy de las personas que me encanta hacer mi trabajo de la mejor manera, me gusta que mis clientes estén satisfechos con mi trabajo y con la empresa a la que le preste mis servicios profesiones. Brindando lo mejor de mis capacidades y aptitudes, logrando todos los objetivos propuestos.',
    author: 'Edison Ospina',
    role: 'Senior Frontend Engineer & UI Architect',
    durationMs: 19000 // 51 palabras a ~190 PPM + 3s margen = 19s
  },
  {
    id: 'quote-steve-jobs',
    quote: 'Nuestro trabajo va a llenar gran parte de nuestra vida, y la única forma de estar realmente satisfecho, es hacer aquello que creen que es un gran trabajo. Y la única manera de hacer un gran trabajo es amar lo que haces. Si no lo has encontrado, sigue buscando. No se Conforme. Al igual que con todos los asuntos del corazón, sabra cuando lo encuentre.',
    author: 'Steve Jobs',
    role: 'Cofundador de Apple',
    durationMs: 25000 // 70 palabras a ~190 PPM + 3s margen = 25s
  },
  {
    id: 'quote-edison-optimizacion',
    quote: 'La trampa de la optimización: diseñar un proceso complejo para resolver un problema que nunca debió existir.',
    author: 'Edison Ospina',
    role: 'Axioma de arquitectura de software (Inspirado en Peter Drucker & Elon Musk)',
    durationMs: 10000 // 17 palabras a ~190 PPM + 4.6s margen = 10s
  }
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = TESTIMONIALS[activeIndex];
  const duration = current.durationMs || 15000;

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, duration]);

  return (
    <section id="testimonials" aria-label="Testimonios y citas inspiracionales">
      <div className="testimonials-wrapper">
        <div
          className="testimonial-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="testimonial-quote-icon" aria-hidden="true">
            <i className="fa fa-quote-left"></i>
          </div>

          <div className="testimonial-content">
            <blockquote key={current.id} className="testimonial-slide">
              <p className="testimonial-text">&ldquo;{current.quote}&rdquo;</p>
              <div className="testimonial-author-box">
                <cite className="testimonial-author">{current.author}</cite>
                {current.role && <span className="testimonial-role">{current.role}</span>}
              </div>
            </blockquote>

            <div className="testimonial-controls" role="tablist" aria-label="Navegación de testimonios">
              {TESTIMONIALS.map((item, index) => (
                <button
                  key={item.id}
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