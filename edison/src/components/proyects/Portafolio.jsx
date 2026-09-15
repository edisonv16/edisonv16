import InfoPortafolio from '../../data/InfoPortafolio.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

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
                    <h1>Aplicaciones</h1>
                    <div className='container-galeria'>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            loop={true}
                            slidesPerView={'auto'}
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
                            modules={[EffectCoverflow, Pagination, Navigation]}
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
                            <div className='slider-controler'>
                                <div className='swiper-button-prev slider-arrow'>
                                    <ion-icon name="arrow-back-outline"></ion-icon>
                                </div>
                            </div>
                            <div className='slider-controler'>
                                <div className='swiper-button-next slider-arrow'>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </div>
                            </div>
                            <div className='swiper-pagination'></div>
                        </Swiper>
                    </div>
                    <h1 className='mt-5'>Sitios Web</h1>
                    {portafolio.Proyects.map((item) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3" key={item.title}>
                                <div className='portafolio'>
                                    <h4 className='portafolio-title'>{item.title}</h4>
                                    <picture className='portafolio-img'>
                                        {/* <source type="image/webp" srcset="assets/imgs/flower1.webp"/> */}
                                        <source type="image/jpeg" srcSet={imagesweb + item.img} />
                                        <img src={imagesweb + item.img} alt={item.img} />
                                        <a href={item.url} target='_blank' rel='noreferrer'><p>{item.tipo}</p></a>
                                    </picture>
                                    <p className='portafolio-company'>{item.compani}</p>
                                    <p className='portafolio-description'>{item.description}</p>
                                    <p className='portafolio-work'>{item.work}</p>
                                </div>
                            </div>
                        )
                    })}
                    <h1 className='mt-5'>Galería</h1>
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