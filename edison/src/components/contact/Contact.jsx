import Testimonial from "./Testimonial";

const Contact = () => {
    return (
        <section id="contact">
            <div className="row section-head">
                <div className="two columns header-col">
                    <h1><span>Get In Touch.</span></h1>
                </div>
                <div className="ten columns">
                    <p className="lead">
                        Si te intereso algo de mi hoja de vida, <br /> COMUNICATE CONMMIGO
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="eight columns">
                    <div id="container" itemScope itemType="http://www.data-vocabulary.org/Person">
                        <div id="contenido">
                            <form action="php/enviarmail.php" method="post">
                                <table border="0">
                                    <tr>
                                        <td width="50%">
                                            <label htmlFor="nombre" style={{ display: 'block', textAlign: 'center' }}>Introduce tu nombre</label>
                                        </td>
                                        <td width="50%">
                                            <input id="nombre" type="text" size="50%" required name="nombre" placeholder="Nombre" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="email" style={{ display: 'block', textAlign: 'center' }}>Introduce tu email</label>
                                        </td>
                                        <td>
                                            <input id="email" type="email" size="50%" name="email" placeholder="Ejem: usuario@dominio.com" required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="mensaje" style={{ display: 'block', textAlign: 'center' }}>Escriba su mensaje</label>
                                        </td>
                                        <td>
                                            <textarea id="mensaje" cols="50%" rows="8" name="mensaje" placeholder="Escribe tu mensaje" required></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            <input className="boton-enviar" type="submit" value="Enviar" />
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <aside className="four columns footer-widgets">
                <div className="widget widget_contact">
                    <h4>Información de contacto</h4>
                    <p className="address">
                        Edison Vidal Ospina Corredor<br/>
                        Bogotá D.C., Colombia<br/>
                        <span>(+57) 318 573 5382</span><br/>
                        edisonv16@gmail.com
                    </p>
                </div>
            </aside>
            <Testimonial />
        </section>
    );
}

export default Contact;
