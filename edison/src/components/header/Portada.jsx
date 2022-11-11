import Info from '../../data/Info.jsx';
import { useState } from 'react';

const Portada = () => {
    const [info, setInfo] = useState(Info);
    const { profile } = info;
    const { name, tel, email, wellcomome, profileProfession, habilidades } = profile;

    return (
    <>
        <div className="row banner">
            <div className="banner-text">
                <h1 className="responsive-headline">¡Hola! Soy <br/>{name}</h1>
                <h3>{wellcomome}</h3>
                <hr />
                <ul className="social">
                    <li><a href="https://www.facebook.com/edison.ospina.940" target="_blank"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="https://twitter.com/edisonv16" target="_blank"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="https://plus.google.com/u/0/114659983859149474982" target="_blank"><i className="fa fa-google-plus"></i></a></li>
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