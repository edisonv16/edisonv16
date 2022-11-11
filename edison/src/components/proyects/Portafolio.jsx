const Portafolio = () => {
    const images = 'src/assets/img/'
    const urlImagenes = images;
    return (
        <section id="portfolio">
            <div className="row">
                <div className="twelve columns collapsed">
                    <h1>Diseños y publicidad</h1>
                    <section className="disenos">
                        <img className="img-uno" src={urlImagenes + "bufalo.png" } alt="bufalo" />
                        <img className="img-dos" src={urlImagenes + "img-dos.png"} alt="dos" />
                        <img className="img-tres" src={urlImagenes + "img-tres.png"} alt="tres" />
                        <img className="img-cuatro" src={urlImagenes + "img-cuatro.jpg"} alt="cuatro" />
                    </section>
                    <h1>Sitios web</h1>
                    <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                        <div className="columns portfolio-item">
                            <div className="item-wrap">
                                <a href="#modal-01" title="">
                                    <img alt="" src={urlImagenes + "/portfolio/img-a.png"} />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Aulas sin fronteras</h5>
                                            <p>Diseño web y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>
                            </div>
                        </div>
                        <div className="columns portfolio-item">
                            <div className="item-wrap">
                                <a href="#modal-02" title="">
                                    <img alt="" src="images/portfolio/img-b.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>La tv en Colombia</h5>
                                            <p>Diseño web y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>
                            </div>
                        </div>
                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-03" title="">
                                    <img alt="" src="images/portfolio/img-c.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Cerrando brechas</h5>
                                            <p>Front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-04" title="">
                                    <img alt="" src="images/portfolio/img-d.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Comisión de regulación de comunicaciones</h5>
                                            <p>Diseño y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-05" title="">
                                    <img alt="" src="images/portfolio/img-e.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Azul Total</h5>
                                            <p>Front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-06" title="">
                                    <img alt="" src="images/portfolio/img-f.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Destinos (Ministerio de turismo)</h5>
                                            <p>Diseño y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-07" title="">
                                    <img alt="" src="images/portfolio/img-g.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Conciliación</h5>
                                            <p>Diseño y Front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-08" title="">
                                    <img alt="" src="images/portfolio/img-h.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Dirección Maritima de Colombia</h5>
                                            <p>Diseño y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-09" title="">
                                    <img alt="" src="images/portfolio/img-i.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Ejecutorga</h5>
                                            <p>Diseño y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-10" title="">
                                    <img alt="" src="images/portfolio/img-j.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Info hotel</h5>
                                            <p>Diseño y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-11" title="">
                                    <img alt="" src="images/portfolio/img-k.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Ser pilo paga dos</h5>
                                            <p>Diseño y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-12" title="">
                                    <img alt="" src="images/portfolio/img-l.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Mi canola</h5>
                                            <p>Diseño y Front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-13" title="">
                                    <img alt="" src="images/portfolio/img-m.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Spanihs in Colombia</h5>
                                            <p>Front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>
                        <div className="columns portfolio-item">
                            <div className="item-wrap">

                                <a href="#modal-14" title="">
                                    <img alt="" src="images/portfolio/img-n.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Tolima ecoturística</h5>
                                            <p>Fron end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>

                            </div>
                        </div>

                        <div className="columns portfolio-item">
                            <div className="item-wrap">
                                <a href="#modal-15" title="">
                                    <img alt="" src="images/portfolio/img-o.png" />
                                    <div className="overlay">
                                        <div className="portfolio-item-meta">
                                            <h5>Tolima kids</h5>
                                            <p>Diseño y front end</p>
                                        </div>
                                    </div>
                                    <div className="link-icon"><i className="icon-plus"></i></div>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>


                <div id="modal-01" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-a.png" alt="" />

                    <div className="description-box">
                        <h4>Aulas sin fronteras</h4>
                        <p>Un proyecto del Ministerio de educación, donde participe como diseñador gráfico, realizando los bocetos y diseños del sitio web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño Gráfico</span>
                    </div>

                    <div className="link-box">
                        <a href="http://aprende.colombiaaprende.edu.co/es/aulassinfronteras" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>

                <div id="modal-02" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-b.png" alt="" />

                    <div className="description-box">
                        <h4>La tv en Colombia</h4>
                        <p>Un proyecto de Señal Colombia para celebrar los 60 años de la tv nacional, donde participe como Diseñador gráfico y front end.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://latv.senalmemoria.co/#/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>

                <div id="modal-03" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-c.png" alt="" />

                    <div className="description-box">
                        <h4>Cerrando brechas</h4>
                        <p>Un proyecto del Ministerio de educación, donde participe como front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://aprende.colombiaaprende.edu.co/es/cerrando_brechas" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>

                <div id="modal-04" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-d.png" alt="" />

                    <div className="description-box">
                        <h4>Comisión de regulación de comunicaciones</h4>
                        <p>Un proyecto de la CRC, donde participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="https://www.crcom.gov.co/es/pagina/inicio" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>

                <div id="modal-05" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-e.png" alt="" />

                    <div className="description-box">
                        <h4>Azul total</h4>
                        <p>Un proyecto de los inchas de millonarios, donde participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://multimillonariosv.cambalachelibre.com/" target="_blank" >Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>

                <div id="modal-06" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-f.png" alt="" />

                    <div className="description-box">
                        <h4>Destinos (Ministerio de turismo)</h4>
                        <p>Un proyecto del Ministerio de turismo, donde participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://destinos.mincit.gov.co/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>

                <div id="modal-07" className="popup-modal mfp-hide">

                    <img className="cale-with-grid" src="images/portfolio/modals/img-g.png" alt="" />

                    <div className="description-box">
                        <h4>Conciliación</h4>
                        <p>Un proyecto del Ministerio de justicia, donde participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://arbitraje.argusws.com/portal" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>

                <div id="modal-08" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-h.png" alt="" />

                    <div className="description-box">
                        <h4>Dimar</h4>
                        <p>Un proyecto de la Dirección Maritima de Colombia, participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="https://www.dimar.mil.co/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>
                <div id="modal-09" className="popup-modal mfp-hide">
                    <img className="scale-with-grid" src="images/portfolio/modals/img-i.png" alt="" />
                    <div className="description-box">
                        <h4>Ejecutorga</h4>
                        <p>Un proyecto del departamento del tolima, participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>
                    <div className="link-box">
                        <a href="http://ejecutorga.gov.co/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>
                </div>
                <div id="modal-10" className="popup-modal mfp-hide">
                    <img className="scale-with-grid" src="images/portfolio/modals/img-j.png" alt="" />
                    <div className="description-box">
                        <h4>Info hotel</h4>
                        <p>Un poyecto del departamento del tolima, participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://info-hotel.co/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>
                <div id="modal-11" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-k.png" alt="" />

                    <div className="description-box">
                        <h4>Ser pilo paga dos</h4>
                        <p>Un proyecto del Ministerio de Educación, participe como front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://aprende.colombiaaprende.edu.co/es/serpilopaga" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>
                <div id="modal-12" className="popup-modal mfp-hide">
                    <img className="scale-with-grid" src="images/portfolio/modals/img-l.png" alt="" />
                    <div className="description-box">
                        <h4>Mi canola</h4>
                        <p>Un proyecto de la empresa cimatrading, participe como front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>
                    <div className="link-box">
                        <a href="http://micanola.com/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>
                </div>
                <div id="modal-13" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-m.png" alt="" />

                    <div className="description-box">
                        <h4>Spanish in Colombia</h4>
                        <p>Un proyecto del instituto caro y cuervo, participe como front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://pruebas.spanishincolombia.gov.co/en/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>
                <div id="modal-14" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-n.png" alt="" />

                    <div className="description-box">
                        <h4>Tolima ecológica</h4>
                        <p>Un poyecto del departamento del tolima, participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>

                    <div className="link-box">
                        <a href="http://tolima-ecologica.co/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>
                <div id="modal-15" className="popup-modal mfp-hide">

                    <img className="scale-with-grid" src="images/portfolio/modals/img-o.png" alt="" />

                    <div className="description-box">
                        <h4>Tolima kids</h4>
                        <p>Un poyecto del departamento del tolima, participe como Diseñador gráfico y front end, implementando el diseño gráfico y plasmarlo en la web.</p>
                        <span className="categories"><i className="fa fa-tag"></i>Diseño gráfico, front end</span>
                    </div>
                    <div className="link-box">
                        <a href="http://tolimakids.co/index/" target="_blank">Ver página</a>
                        <a className="popup-modal-dismiss">Cerrar</a>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Portafolio;
