import Info from '../../data/Info.jsx';
import HomeStatus from './HomeStatus';

const Portada = (props) => {
    const { profile } = Info;
    const { name, wellcomome } = profile;

    return (
    <>
        <div className="container-xxl banner">
            <HomeStatus />
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
            <a className="smoothscroll" href="#about" aria-label="Ir a la sección de perfil profesional">
                <i className="icon-down-circle" aria-hidden="true"></i>
            </a>
        </p>
    </>
    );
}

export default Portada;
