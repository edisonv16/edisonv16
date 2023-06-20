import { useState } from 'react';
import InfoEducation from '../../data/InfoEducation.jsx';

const Education = () => {
    const [education, setEducation] = useState(InfoEducation);



    return (
        <div className="container-xxl education pb-5 pt-5">
            <h1 className='text-center mb-5'><span>Formación Academica, Cursos, Enfasis y Diplmados</span></h1>
            <div className="row">
                {education.education.map((item, index) => {
                    return (
                        <div className='card-education' key={index}>
                            <h3>{item.institucion}</h3>
                            {item.curso.map((item, index) => {
                                return (
                                    <p className="info" key={index}>
                                        <span>&bull;</span>{item.curso}
                                    </p>
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