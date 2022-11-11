const Profile = () => {
    return (
        <section id="about">
            <div className="row">
                <div className="three columns">
                    <img className="profile-pic" src="images/profilepic.png" alt="" />
                </div>
                <div className="nine columns main-col">
                    <h2>Perfil profesional</h2>
                    <p>Profesional en diseño web resposive desing, diseños webfluidos, diseñador front end web y mobile en Android y IOS, trabajo con metodologías Lean y Scrum, diseño en INTERFACES UX e INTERFACES MÓVILES, manejo buenas practicas de la
                        W3C, diseños gráfico en software, sistema de versionamiento en Git, diseños digitales, artes gráficas, editorial, identidad corporativa, retoques digitales en fotos, animación 2D y diseño de piezas publicitarias.
                    </p>
                    <div className="row">
                        <div className="columns contact-details">
                            <h2>Detalles de contacto</h2>
                            <p className="address">
                                <span>Edison V. Ospina Corredor</span><br/>
                                    <span>Barrio la Soledad<br/>
                                        Cra 24 # 35-23
                                    </span><br/>
                                        <span> Teléfonos: (318)7960278</span><br/>
                                            <span>edisonv16@hotmail.com, edisonv16@gmail.com</span>
                            </p>
                            <div className="columns download">
                                <p>
                                    <a href="pdf/CV2016A.pdf" target="_blank" className="button"><i className="fa fa-download"></i>Descarga mi H.V</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;