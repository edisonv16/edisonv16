import InfoPortafolio from '../../data/InfoPortafolio.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Galeria from './Galeria';

const Portafolio = () => {
    const portafolio = InfoPortafolio;
    const imagesapps = '/apps/';
    const imagesweb = '/web/';
    return (
        <section id="portfolio">
            <div className='container-xxl'>
                <div className="row">
                    <div className="col-12 section-header">
                        <span className="section-badge">
                            <i className="fa fa-mobile" aria-hidden="true"></i> Portafolio Mobile & Web
                        </span>
                        <h2 className="section-title-principal">
                            <span>Aplicaciones</span>
                        </h2>
                        <p className="section-subtitle">
                            Desarrollo de experiencias interactivas y aplicaciones orientadas al usuario con alto rendimiento visual
                        </p>
                    </div>
                    <div className='container-galeria'>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            loop={true}
                            slidesPerView={'auto'}
                            autoplay={{
                                delay: 7000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 5,
                                slideShadows: true,
                            }}
                            pagination={{el:'.swiper-pagination', clickable:true}}
                            navigation={{
                                nextEl:'.swiper-button-next',
                                prevEl:'.swiper-button-prev',
                                clickable: true,
                            }}
                            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                            className="swiper-container"
                        >
                            <SwiperSlide>
                                <img src={imagesapps + "app_appprevio.png"} alt="Captura de pantalla de App Previo" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_crc.png"} alt="Captura de pantalla de App CRC" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_crc2.png"} alt="Vista detallada de App CRC" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_ecoturistica.png"} alt="Captura de pantalla de App Ecoturística" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_gentedemar.png"} alt="Captura de pantalla de App Gente de Mar" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_inder.png"} alt="Captura de pantalla de App INDER" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_notifico.png"} alt="Captura de pantalla de App Notifico" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_tolimamusical.png"} alt="Captura de pantalla de App Tolima Musical" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={imagesapps + "app_artesanal.png"} alt="Captura de pantalla de App Artesanal" />
                            </SwiperSlide>
                            <button type="button" className='swiper-button-prev slider-arrow' aria-label="Slide anterior"></button>
                            <button type="button" className='swiper-button-next slider-arrow' aria-label="Slide siguiente"></button>
                            <div className='swiper-pagination'></div>
                        </Swiper>
                    </div>
                    <div className="col-12 section-header section-header--sub">
                        <span className="section-badge">
                            <i className="fa fa-globe" aria-hidden="true"></i> Portafolio Web Corporativo
                        </span>
                        <h2 className="section-title-principal">
                            <span>Sitios Web</span>
                        </h2>
                        <p className="section-subtitle">
                            Plataformas transaccionales masivas, medios de comunicación y portales corporativos de alto impacto
                        </p>
                    </div>
                    {portafolio.Proyects.map((projectItem) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3" key={projectItem.title}>
                                <div className='portafolio'>
                                    <h4 className='portafolio-title'>{projectItem.title}</h4>
                                    <picture className='portafolio-img'>
                                        <source type="image/jpeg" srcSet={imagesweb + projectItem.img} />
                                        <img src={imagesweb + projectItem.img} alt={projectItem.title || projectItem.img} />
                                        {projectItem.url ? (
                                            <a
                                                href={projectItem.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='portafolio-badge portafolio-badge--link'
                                                title={`Visitar ${projectItem.title} (se abre en nueva pestaña)`}
                                                aria-label={`Visitar sitio web de ${projectItem.title} en una nueva pestaña`}
                                            >
                                                <span>{projectItem.tipo}</span>
                                                <i className='fa fa-external-link' aria-hidden='true'></i>
                                            </a>
                                        ) : (
                                            <span
                                                className='portafolio-badge portafolio-badge--offline'
                                                title="Sitio web histórico o sin enlace público activo"
                                            >
                                                <span>{projectItem.tipo}</span>
                                            </span>
                                        )}
                                    </picture>
                                    <p className='portafolio-company'>{projectItem.compani}</p>
                                    <p className='portafolio-description'>{projectItem.description}</p>
                                    <p className='portafolio-work'>{projectItem.work}</p>
                                </div>
                            </div>
                        )
                    })}
                    <Galeria />
                </div>

            </div>
        </section>
    );
}

export default Portafolio;