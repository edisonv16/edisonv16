import InfoEducation from '../../data/InfoEducation.jsx';

const Education = () => {
    const education = InfoEducation;

    return (
        <div className="container-xxl education pb-5 pt-5">
            <div className="row">
                <div className="col-12 section-header mb-5">
                    <span className="section-badge section-badge--dark">
                        <i className="fa fa-graduation-cap" aria-hidden="true"></i> Formación & Credenciales
                    </span>
                    <h2 className="section-title-principal section-title-principal--dark">
                        <span>Educación, Certificaciones y Reconocimientos</span>
                    </h2>
                    <p className="section-subtitle section-subtitle--dark">
                        Formación profesional universitaria, certificaciones internacionales Scrum Master y distinciones periodísticas
                    </p>
                </div>
            </div>
            <div className="row">
                {education.education.map((item) => {
                    return (
                        <div className='card-education' key={item.id}>
                            <h3>{item.institucion}</h3>
                            {item.curso.map((course) => {
                                const details = [
                                    course.institucion,
                                    course.fecha,
                                    course.credencial && `Credencial: ${course.credencial}`,
                                    course.aptitudes && `Aptitudes: ${course.aptitudes}`
                                ].filter(Boolean)

                                return (
                                    <div className="info" key={course.id}>
                                        <p><span>&bull;</span>{course.curso}</p>
                                        {details.length > 0 && <small>{details.join(' · ')}</small>}
                                    </div>
                                    )
                                })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Education;
