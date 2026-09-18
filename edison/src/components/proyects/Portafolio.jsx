import InfoPortafolio from '../../data/InfoPortafolio.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

const Portafolio = () => {
    const portafolio = InfoPortafolio;
    const imagesapps = '/apps/';
    const imagescampanas = '/campanas/';
    const imagesilustraciones = '/ilustraciones/';
    const imagesweb = '/web/';
    return (
        <section id="portfolio">
            <div className='container-xxl'>
                <div className="row">
                    <div className="col-12 section-header mb-4">
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
                    <div className="col-12 section-header mt-5 mb-4">
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
                    {portafolio.Proyects.map((item) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3" key={item.title}>
                                <div className='portafolio'>
                                    <h4 className='portafolio-title'>{item.title}</h4>
                                    <picture className='portafolio-img'>
                                        <source type="image/jpeg" srcSet={imagesweb + item.img} />
                                        <img src={imagesweb + item.img} alt={item.title || item.img} />
                                        {item.url ? (
                                            <a
                                                href={item.url}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='portafolio-badge portafolio-badge--link'
                                                title={`Visitar ${item.title}`}
                                            >
                                                <span>{item.tipo}</span>
                                                <i className='fa fa-external-link' aria-hidden='true'></i>
                                            </a>
                                        ) : (
                                            <span className='portafolio-badge'>
                                                {item.tipo}
                                            </span>
                                        )}
                                    </picture>
                                    <p className='portafolio-company'>{item.compani}</p>
                                    <p className='portafolio-description'>{item.description}</p>
                                    <p className='portafolio-work'>{item.work}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div className="col-12 section-header mt-5 mb-4">
                        <span className="section-badge">
                            <i className="fa fa-picture-o" aria-hidden="true"></i> Dirección de Arte & Creatividad
                        </span>
                        <h2 className="section-title-principal">
                            <span>Galería</span>
                        </h2>
                        <p className="section-subtitle">
                            Ilustración digital, campañas visuales de gran formato y piezas gráficas premiadas
                        </p>
                    </div>
                    <div className="galeria_container">
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagesilustraciones + "ilus_timbortom.jpg"} alt="timbortom" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagescampanas + "cam_confit.png"} alt="confit" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagescampanas + "cam_doritos.jpg"} alt="doritos" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagesilustraciones + "ilus_agua.jpg"} alt="cinco" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagesilustraciones + "ilus_princemask.jpg"} alt="seis" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagesilustraciones + "ilus_familia.jpg"} alt="familia" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagesilustraciones + "ilus_spaider.jpg"} alt="Spiderman" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagesilustraciones + "ilus_juanadearco.jpg"} alt="Arquera" />
                        </div>

                        <div className="galeria__item">
                            <img className="galeria__img" src={imagesilustraciones + "ilus_madre.jpg"} alt="mujer" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagescampanas + "cam_bufalo.png"} alt="bufalo" />
                        </div>
                        <div className="galeria__item">
                            <img className="galeria__img" src={imagescampanas + "cam_micanola.png"} alt="mi canola" />

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Portafolio;