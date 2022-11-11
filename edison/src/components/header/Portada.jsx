const Portada = () => {
    return (
    <>
        <div className="row banner">
            <div className="banner-text">
                <h1 className="responsive-headline">!Hola¡<br/> soy  Edison Ospina</h1>
                <h3>Soy<span> Diseñador Gráfico</span> con <span>énfasis en
                    diseño web</span>, <span>Ux y Lean Ux</span>. Con <span>5 años diseñando en web</span> y <span>2 años diseñando y desarrollado aplicaciones móviles.</span><br/>
                        <a className="smoothscroll" href="#about"> Aprende más</a>
                        <a className="smoothscroll" href="#about">acerca de mi</a>.</h3>
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