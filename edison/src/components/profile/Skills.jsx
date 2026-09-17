import Info from "../../data/Info.jsx";

const Skill = () => {
    const { profile } = Info;
    const { habilidades } = profile;

    return (
        <section id="skills" aria-label="Competencias y habilidades técnicas">
            <div className='container-xxl pt-5 pb-5'>
                <div className="row">
                    <div className="col-12 section-header">
                        <span className="section-badge">
                            <i className="fa fa-code" aria-hidden="true"></i> Especialidades & Stack
                        </span>
                        <h2 className="section-title-principal">
                            <span>Competencias Técnicas</span>
                        </h2>
                        <p className="section-subtitle">
                            Dominio avanzado en ecosistemas frontend modernos, tipado estricto, programación reactiva y arquitectura escalable
                        </p>
                    </div>
                </div>
                <div className="row g-4">
                    {habilidades.map((skill) => (
                        <article className="col-12 col-md-6" key={skill.categoria}>
                            <div className="skill-category">
                                <h2>{skill.categoria}</h2>
                                <p>{skill.tecnologias}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skill;
