import useEducation from './useEducation';

const Education = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    categoryFilters
  } = useEducation();

  return (
    <div
      className="container-xxl education-roadmap"
      role="region"
      aria-label="Educación, Certificaciones y Reconocimientos"
    >
      <div className="row">
        <div className="col-12 section-header">
          <span className="section-badge section-badge--dark">
            <i className="fa fa-graduation-cap" aria-hidden="true"></i> Formación &amp; Credenciales
          </span>
          <h2 className="section-title-principal section-title-principal--dark">
            <span>Educación, Certificaciones y Reconocimientos</span>
          </h2>
          <p className="section-subtitle section-subtitle--dark">
            Formación profesional universitaria, certificaciones internacionales Scrum Master y distinciones periodísticas
          </p>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="education-roadmap__filters" role="group" aria-label="Filtrar por categoría">
            {categoryFilters.map((filterItem) => {
              const isActive = selectedCategory === filterItem.id;
              return (
                <button
                  key={filterItem.id}
                  type="button"
                  aria-pressed={isActive}
                  className={`education-roadmap__filter-btn ${isActive ? 'education-roadmap__filter-btn--active' : ''}`}
                  onClick={() => setSelectedCategory(filterItem.id)}
                >
                  <span className="education-roadmap__filter-label">{filterItem.label}</span>
                  <span className="education-roadmap__filter-count">{filterItem.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Roadmap track and milestones */}
      <div className="education-roadmap__timeline">
        {categories.map((categoryItem) => (
          <div key={categoryItem.id} className="education-roadmap__milestone-group">
            {/* Milestone Header / Node */}
            <div className="education-roadmap__milestone-header">
              <div className="education-roadmap__node-badge" aria-hidden="true">
                <span className="education-roadmap__node-number">{categoryItem.milestone}</span>
                <i className={`fa ${categoryItem.icon} education-roadmap__node-icon`}></i>
              </div>
              <div className="education-roadmap__header-content">
                <h3 className="education-roadmap__category-title">{categoryItem.title}</h3>
                {categoryItem.description && (
                  <p className="education-roadmap__category-description">{categoryItem.description}</p>
                )}
              </div>
              <div className="education-roadmap__counter-badge">
                <span>{categoryItem.totalCourses} {categoryItem.totalCourses === 1 ? 'item' : 'items'}</span>
              </div>
            </div>

            {/* Milestone Cards Grid */}
            <div className="education-roadmap__grid">
              {categoryItem.courses.map((courseItem) => (
                <article key={courseItem.id} className="education-roadmap__card">
                  <div className="education-roadmap__card-top">
                    <span className={`education-roadmap__year-badge education-roadmap__year-badge--${courseItem.badgeType}`}>
                      <i className={`fa ${courseItem.badgeIcon}`} aria-hidden="true"></i> {courseItem.badgeLabel}
                    </span>
                    {courseItem.issuer && (
                      <span className="education-roadmap__issuer-badge">
                        <i className="fa fa-university" aria-hidden="true"></i> {courseItem.issuer}
                      </span>
                    )}
                  </div>

                  <h4 className="education-roadmap__course-title">{courseItem.title}</h4>

                  {courseItem.dateText && (
                    <div className="education-roadmap__date-info">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                      <span>{courseItem.dateText}</span>
                    </div>
                  )}

                  {courseItem.skills.length > 0 && (
                    <div className="education-roadmap__skills" aria-label="Aptitudes">
                      {courseItem.skills.map((skillItem, skillIndex) => (
                        <span key={`${courseItem.id}-skill-${skillIndex}`} className="education-roadmap__skill-tag">
                          {skillItem}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
