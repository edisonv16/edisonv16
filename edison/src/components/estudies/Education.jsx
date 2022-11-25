import { useState } from 'react';
import InfoEducation from '../../data/InfoEducation.jsx';

const Education = () => {
    const [education, setEducation] = useState(InfoEducation);



    return (
        <div className="row education">
            <div className="three columns header-col">
                <h1><span>Formación Academica, Cursos, Enfasis y Diplmados</span></h1>
            </div>
            <div className="nine columns main-col">
                {education.education.map((item, index) => {
                    return (
                        <div className="row item" key={index}>
                            <div className="twelve columns">
                                <h3>{item.institucion}</h3>
                                {item.curso.map((item, index) => {
                                    return (
                                        <p className="info" key={index}>
                                            <span>&bull;</span>{item.curso}
                                        </p>
                                        )
                                    })}
                            </div>
                        </div>
                    )
                })}

                {/* <div className="row item">
                    <div className="twelve columns">
                        <h3>Vivilab bogotá</h3>
                        <p className="info">
                            Taller de usabilidad<span>&bull;</span> <em className="date">Noviembre 2015</em>
                            <br />Taller de Lean y Ux<span>&bull;</span> <em className="date">Noviembre 2014</em>
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Education;