/**
 * Cabecera Monumental de Galería con tipografía macro/micro asimétrica
 */
const GaleriaHeader = () => {
    return (
        <div className="galeria-editorial-monument">
            {/* Meta superior */}
            <div className="galeria-editorial-monument__meta">
                <span className="galeria-editorial-monument__badge">
                    <i className="fa fa-picture-o" aria-hidden="true"></i> Dirección de Arte &amp; Creatividad
                </span>
                <span className="galeria-editorial-monument__kicker">
                    Edison Vidal Ospina — Art Portfolio
                </span>
            </div>

            {/* Fila Monumental: Titular Macro a dos líneas + Micro-ubicación */}
            <div className="galeria-editorial-monument__headline-row">
                <div className="galeria-editorial-monument__title-wrap">
                    <h2 className="galeria-editorial-monument__title">
                        <span className="galeria-editorial-monument__line-top">
                            Arte Digital
                        </span>
                        <span className="galeria-editorial-monument__line-bottom">
                            <span className="galeria-editorial-monument__slash">/</span> <span>Galería</span>
                        </span>
                    </h2>
                </div>

                {/* Micro-bloque superior derecho: Ubicación / Estudio */}
                <div className="galeria-editorial-monument__aside-info">
                    <span className="galeria-editorial-monument__aside-label">Based on</span>
                    <span className="galeria-editorial-monument__aside-city">Bogotá, Colombia</span>
                    <span className="galeria-editorial-monument__aside-role">UI Architect &amp; Artist</span>
                </div>
            </div>

            {/* Línea introductoria curatorial */}
            <div className="galeria-editorial-monument__intro-line">
                <p className="galeria-editorial-monument__statement-desc">
                    Ilustración digital, campañas visuales de gran formato y piezas gráficas premiadas
                </p>
                <div className="galeria-editorial-monument__statement-tags">
                    <span>Concept Art</span>
                    <span className="galeria-editorial-monument__statement-dot">•</span>
                    <span>Matte Painting</span>
                    <span className="galeria-editorial-monument__statement-dot">•</span>
                    <span>Dirección de Arte</span>
                </div>
            </div>
        </div>
    );
};

export default GaleriaHeader;
