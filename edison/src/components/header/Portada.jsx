import { useState, useEffect } from 'react';
import Info from '../../data/Info.jsx';

const Portada = (props) => {
    const [info, setInfo] = useState(Info);
    const { profile } = info;
    const { name, wellcomome } = profile;


    return (
    <>
        <div className="container-xxl banner">
            <p className='fecha'>{props.fechaActual}</p>
            <div className='banner-text'>
                <h1 className="responsive-headline">{props.mensaje} <br/> Soy {' ' + name}</h1>
                <p>{wellcomome}</p>
                <hr />
                <ul className="social">
                    <li><a href="https://www.linkedin.com/in/edison-ospina" target="_blank" rel="noreferrer" aria-label="Perfil de LinkedIn"><i className="fa fa-linkedin"></i></a></li>
                </ul>
            </div>
            
        </div>

        <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
        </p>
    </>
    );
}
 
export default Portada;
