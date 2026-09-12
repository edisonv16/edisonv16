import Portada from './Portada';

const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora < 12) {
        return { mensaje: 'Buenos Días', nombreEstilo: 'estilo-manana' };
    } else if (hora < 18) {
        return { mensaje: 'Buenas Tardes', nombreEstilo: 'estilo-tarde' };
    }
    return { mensaje: 'Buenas Noches', nombreEstilo: 'estilo-noche' };
};

const Header = () => {
    const { mensaje, nombreEstilo } = getSaludo();
    return (
        <header id="home" className={nombreEstilo + ' ' + 'text-center'}>
            <nav className="side-nav" aria-label="Navegación principal">
                <ul>
                    <li><a className="smoothscroll" href="#home" data-tooltip="Inicio" aria-label="Ir a inicio"><i className="fa fa-home" aria-hidden="true"></i></a></li>
                    <li><a className="smoothscroll" href="#about" data-tooltip="Perfil profesional" aria-label="Ir al perfil profesional"><i className="fa fa-user" aria-hidden="true"></i></a></li>
                    <li><a className="smoothscroll" href="#skills" data-tooltip="Habilidades" aria-label="Ir a habilidades"><i className="fa fa-code" aria-hidden="true"></i></a></li>
                    <li><a className="smoothscroll" href="#portfolio" data-tooltip="Proyectos" aria-label="Ir a proyectos"><i className="fa fa-folder-open" aria-hidden="true"></i></a></li>
                    <li><a className="smoothscroll" href="#work" data-tooltip="Trayectoria profesional" aria-label="Ir a trayectoria profesional"><i className="fa fa-briefcase" aria-hidden="true"></i></a></li>
                    <li><a className="smoothscroll" href="#resume" data-tooltip="Formación y certificaciones" aria-label="Ir a formación y certificaciones"><i className="fa fa-graduation-cap" aria-hidden="true"></i></a></li>
                </ul>
            </nav>
            <Portada 
            mensaje = {mensaje}
            />
        </header>
    );
}

export default Header;
