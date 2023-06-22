import { useState, useEffect } from 'react';
import Portada from './Portada';

const Header = () => {
    const [mensaje, setMensaje] = useState('');
    const [nombreEstilo, setNombreEstilo] = useState('');
    const [fechaActual, setFechaActual] = useState('');
    useEffect(()=>{
        const fecha = new Date();
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString(undefined, opciones);
        const hora = new Date().getHours();
        let mensaje;
        let nombreEstilo;
    
        if (hora < 12) {
            mensaje = 'Buenos Días';
            nombreEstilo = 'estilo-manana';
        }
        else if (hora < 18){
            mensaje = 'Buenas Tardes';
            nombreEstilo = 'estilo-tarde';
        } 
        else if (hora < 24){
            mensaje = 'Buenas Noches';
            nombreEstilo = 'estilo-noche';
        } 

        setFechaActual(fechaFormateada);
        setMensaje(mensaje);
        setNombreEstilo(nombreEstilo);
    }, [])
    return (
        <header id="home" className={nombreEstilo + ' ' + 'text-center'}>
            <nav id="nav-wrap">
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
                <ul id="nav" className=" nav">
                    <li className="current"><a className="smoothscroll" href="#home">Inicio</a></li>
                    <li><a className="smoothscroll" href="#about">¿Quién soy?</a></li>
                    <li><a className="smoothscroll" href="#resume">Estudios</a></li>
                    <li><a className="smoothscroll" href="#portfolio">Proyectos</a></li>
                </ul>
            </nav>
            <Portada 
            mensaje = {mensaje}
            fechaActual = {fechaActual}
            />
        </header>
    );
}

export default Header;