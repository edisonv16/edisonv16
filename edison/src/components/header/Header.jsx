import Portada from './Portada';

const Header = () => {
    return (
        <header id="home">
            <nav id="nav-wrap">
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
                <ul id="nav" className="nav">
                    <li className="current"><a className="smoothscroll" href="#home">Inicio</a></li>
                    <li><a className="smoothscroll" href="#about">¿Quién soy?</a></li>
                    <li><a className="smoothscroll" href="#resume">Estudios</a></li>
                    <li><a className="smoothscroll" href="#portfolio">Proyectos</a></li>
                    <li><a className="smoothscroll" href="#testimonials">Frases</a></li>
                    <li><a className="smoothscroll" href="#contact">Contacto</a></li>
                </ul>
            </nav>
            <Portada />
        </header>
    );
}

export default Header;