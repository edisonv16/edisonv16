import InfoWork from "../../data/InfoWork";

const Work = () => {
  const { work } = InfoWork;

  return (
    <section id="work" aria-label="Trayectoria profesional y experiencia laboral">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 text-center work-section-header">
            <span className="work-section-badge">
              <i className="fa fa-briefcase" aria-hidden="true"></i> Trayectoria Profesional
            </span>
            <h2 className="work-title-principal">
              <span>Experiencia Laboral</span>
            </h2>
            <p className="work-subtitle">
              Más de 18 años liderando arquitectura frontend, ingeniería de software y modernización de plataformas web de misión crítica
            </p>
          </div>
        </div>

        <div className="row g-4 work-cards-row">
          {work.map((item) => {
            const isCurrent = item.date.toLowerCase().includes('actualidad');

            return (
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                key={item.id}
              >
                <article className={`work-card ${isCurrent ? 'work-card--current' : ''}`}>
                  <div className="work-card__header">
                    <div className="work-card__company-wrap">
                      <div className="work-card__icon-box" aria-hidden="true">
                        <i className={`fa ${isCurrent ? 'fa-rocket' : 'fa-building-o'}`}></i>
                      </div>
                      <h3 className="work-card__company">{item.empresa}</h3>
                    </div>
                    <span className={`work-card__date ${isCurrent ? 'work-card__date--current' : ''}`}>
                      <i className="fa fa-calendar-o" aria-hidden="true"></i> {item.date}
                    </span>
                  </div>

                  <div className="work-card__role-wrap">
                    <h4 className="work-card__role">{item.cargo}</h4>
                  </div>

                  <p className="work-card__description">{item.description}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;
