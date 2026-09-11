import { useState } from 'react';
import InfoEducation from '../../data/InfoEducation.jsx';

const Education = () => {
    const [education, setEducation] = useState(InfoEducation);



    return (
        <div className="container-xxl education pb-5 pt-5">
            <h1 className='text-center mb-5'><span>Educación, certificaciones y reconocimientos</span></h1>
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
