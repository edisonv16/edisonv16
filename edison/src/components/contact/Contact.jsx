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
                    <div id="container" itemscope itemtype="http://www.data-vocabulay.org/Person">
                        <div id="contenido">
                            <form action="php/envairmail.php" method="post">
                                <table border="0">
                                    <tr>
                                        <td width="50%">
                                            <p style="text-align:center;">Introduce tu nombre</p>
                                        </td>
                                        <td width="50%">
                                            <input type="text" size="50%" required name="nombre" placeholder="Nombre" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p style="text-align:center;">Introduce tu email</p>
                                        </td>
                                        <td>
                                            <input type="email" size="50%" value="Ejem: usuario@dominio.com" name="email" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p style="text-align:center;">Escriba su mensaje</p>
                                        </td>
                                        <td>
                                            <textarea cols="50%" rows="8" name="mensaje" placeholder="Escribe tu mensaje"></textarea>
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
                            Ciudad Bogotá Carrera 20 # 35-23<br/>
                                Barrio la Soledad<br/>
                                    <span>(318) 796-0278</span><br/>
                                        edisonv16@hotmail.com edisonv16@gmail.com
                    </p>
                </div>
            </aside>
            <Testimonial />
        </section>
                        );
}

 export default Contact;