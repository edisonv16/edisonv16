const Footer = () => {
    return (
        <footer>
            <div className="container-xxl">
                <div className="twelve">
                    <ul className="social-links">
                        <li><a href="https://www.facebook.com/edison.ospina.940" target="_blank"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="https://twitter.com/edisonv16" target="_blank"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="https://plus.google.com/u/0/114659983859149474982" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                    </ul>

                    <ul className="copyright">
                        <li>&copy; Copyright 2023 Diseñador:<a title="Styleshout" href="http://www.styleshout.com/"> Edison V. Ospina Corredor</a></li>
                    </ul>
                </div>
                <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
            </div>
        </footer>
    );
}
export default Footer;
