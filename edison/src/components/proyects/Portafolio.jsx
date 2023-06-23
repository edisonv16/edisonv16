import { useState } from 'react';
import InfoPortafolio from '../../data/InfoPortafolio.jsx';

const Portafolio = () => {
    const [portafolio, setInfoPortafolio] = useState(InfoPortafolio);
    const images = '/'
    const urlImagenes = images;
    return (
        <section id="portfolio">
            <div className='container-xxl'>
                <h1>Aplicaciones y Sitios Web</h1>
                <div className="row">
                    {portafolio.Proyects.map((item, index) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3" key={index}>
                                <div className='portafolio'>
                                    <h4 className='portafolio-title'>{item.title}</h4>
                                    <picture className='portafolio-img'>
                                        {/* <source type="image/webp" srcset="assets/imgs/flower1.webp"/> */}
                                        <source type="image/jpeg" srcSet={urlImagenes + item.img} />
                                        <img src={urlImagenes + item.img} alt={item.img} />
                                        <a href={item.url} target='_blank'><p>{item.tipo}</p></a>
                                    </picture>
                                    <p className='portafolio-company'>{item.compani}</p>
                                    <p className='portafolio-description'>{item.description}</p>
                                    <p className='portafolio-work'>{item.work}</p>
                                </div>
                            </div>
                        )
                    })}
                    <h1>Diseños y Publicidad</h1>
                    <div className="galeria_container">
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "edison_timburtom.jpg"} alt="uno" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil1.png"} alt="dos" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "doritos.jpg"} alt="tres" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "img-tres.png"} alt="tres" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "img-cuatro.jpg"} alt="cuatro" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "img-cinco.jpg"} alt="cinco" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil1.png"} alt="seis" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "ilustracion1.jpg"} alt="familia" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "ilustracion2.jpg"} alt="Arquera" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "ilustracion3.jpg"} alt="Spiderman" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "ilustracion4.jpg"} alt="mujer" />
                        </div>


                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil2.png"} alt="siente" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil3.png"} alt="ocho" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil4.png"} alt="nueve" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil5.png"} alt="diez" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil6.png"} alt="once" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "img-dos.png"} alt="dos" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil7.png"} alt="doce" />
                        </div>
                       
                        
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil8.png"} alt="trece" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "movil9.png"} alt="catorce" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={urlImagenes + "bufalo.png"} alt="bufalo" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Portafolio;