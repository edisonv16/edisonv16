const Testimonial = () => {
    return (
        <section id="testimonials">
            <div className="text-container">
                <div className="row">
                    <div className="two columns header-col">
                        <h1><span>Client Testimonials</span></h1>
                    </div>
                    <div className="ten columns flex-container">
                        <div className="flexslider">
                            <ul className="slides">
                                <li>
                                    <blockquote>
                                        <p>Soy de las personas que me encanta hacer mi trabajo de la mejor manera, me gusta que mis clientes estén satisfechos con mi trabajo y con la empresa a la que le preste mis servicios profesiones. Brindando lo mejor de mis capacidades y aptitudes, logrando todos los objetivos propuestos.</p>
                                        <cite>Edison Ospina</cite>
                                    </blockquote>
                                </li>
                                <li>
                                    <blockquote>
                                        <p>
                                            Nuestro trabajo va a llenar gran parte de nuestra vida, y la única forma de estar realmente satisfecho, es hacer aquello que creen que es un gran trabajo. Y la única manera de hacer un gran trabajo es amar lo que haces. Si no lo has encontrado, sigue buscando. No se Conforme. Al igual que con todos los asuntos del corazón, sabra cuando lo encuentre.
                                            <cite>Steve Jobs</cite>
                                        </p>
                                    </blockquote>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;