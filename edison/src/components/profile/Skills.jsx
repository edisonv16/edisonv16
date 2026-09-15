import Info from "../../data/Info.jsx";

const Skill = () => {
    const { profile } = Info;
    const { habilidades } = profile;

    return (
        <section id="skills">
            <div className='container-xxl pt-5 pb-5'>
                <div className="col-12">
                    <h1 className="mt-5">Competencias Técnicas</h1>
                </div>
                <div className="row g-4 mt-1">
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
