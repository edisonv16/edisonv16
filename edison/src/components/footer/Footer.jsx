const Footer = () => {
    return (
        <footer>
            <div className="container-xxl">
                <div className="twelve">
                    <ul className="social-links">
                        <li><a href="https://www.linkedin.com/in/edison-ospina" target="_blank" rel="noreferrer" aria-label="Perfil de LinkedIn"><i className="fa fa-linkedin"></i></a></li>
                    </ul>

                    <ul className="copyright">
                        <li>&copy; {new Date().getFullYear()} Edison Vidal Ospina Corredor</li>
                    </ul>
                </div>
                <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
            </div>
        </footer>
    );
}
export default Footer;
