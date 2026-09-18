import Info from '../../data/Info.jsx';
import LocalClock from './LocalClock';
import WeatherCard from './WeatherCard';
import useHomeStatus from './useHomeStatus';

const Portada = ({ mensaje }) => {
    const { profile } = Info;
    const { name, wellcomome } = profile;
    const { location, weather, status, errorMessage } = useHomeStatus();

    return (
    <>
        <div className="container-xxl banner">
            <div className="home-status">
                <LocalClock timeZone={location.timeZone} />
            </div>
            <div className="banner-content">
                <div className='banner-text'>
                    <h1 className="responsive-headline">{mensaje} <br/> Soy {' ' + name}</h1>
                    <p>{wellcomome}</p>
                    <hr />
                    <ul className="social">
                        <li><a href="https://www.linkedin.com/in/edison-ospina" target="_blank" rel="noreferrer" aria-label="Perfil de LinkedIn"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
                <WeatherCard
                    location={location}
                    weather={weather}
                    status={status}
                    errorMessage={errorMessage}
                />
            </div>
        </div>

        <p className="scrolldown">
            <a className="smoothscroll" href="#about" aria-label="Ir a la sección de perfil profesional">
                <i className="icon-down-circle" aria-hidden="true"></i>
            </a>
        </p>
    </>
    );
};

export default Portada;
