import ArtworkCard from './ArtworkCard';

/**
 * Pausa Editorial & Gran Formato (Digital Expertise):
 * Genera descanso visual con una obra panorámica destacada
 * y una tarjeta curatorial con citas y especificaciones.
 */
const GaleriaInterlude = ({ featuredArtwork, onOpenLightbox }) => {
    if (!featuredArtwork) {
        return null;
    }

    return (
        <div className="galeria-interlude">
            <div className="galeria-interlude__header">
                <span className="galeria-interlude__kicker">
                    02 / Visión de Escala &amp; Publicidad
                </span>
                <h3 className="galeria-interlude__title">
                    Dirección de Arte &amp; Gran Formato
                </h3>
                <p className="galeria-interlude__subtitle">
                    De la concepción conceptual al renderizado publicitario de alto impacto en gran escala
                </p>
            </div>

            <div className="galeria-interlude__layout">
                {/* Obra destacada en formato amplio */}
                <div className="galeria-interlude__artwork">
                    <ArtworkCard
                        galleryItem={featuredArtwork}
                        itemIndex={4}
                        onOpen={onOpenLightbox}
                    />
                </div>

                {/* Tarjeta de Pausa Curatorial & Manifiesto de Impacto */}
                <div className="galeria-card galeria-card--editorial galeria-interlude__card">
                    <div className="galeria-card--editorial__content">
                        <span className="galeria-card--editorial__kicker">
                            Visión de Impacto
                        </span>
                        <h4 className="galeria-card--editorial__title">
                            De la Idea al Alcance Masivo
                        </h4>
                        <p className="galeria-card--editorial__quote">
                            “El arte digital no solo ilustra una idea; crea una experiencia sensorial e inmersiva que conecta con la audiencia.”
                        </p>
                        <div className="galeria-card--editorial__author">
                            <strong>Edison Vidal Ospina</strong>
                            <span>Senior UI Architect &amp; Art Director</span>
                        </div>
                        <div className="galeria-interlude__specs">
                            <div className="galeria-interlude__spec-row">
                                <span>Disciplina</span>
                                <strong>Dirección de Arte &amp; Render 3D</strong>
                            </div>
                            <div className="galeria-interlude__spec-row">
                                <span>Formato</span>
                                <strong>Composición Panorámica</strong>
                            </div>
                            <div className="galeria-interlude__spec-row">
                                <span>Año</span>
                                <strong>2023 — 2024</strong>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="galeria-card--editorial__link"
                            onClick={() => onOpenLightbox(featuredArtwork)}
                            aria-label={`Ver detalles en pantalla completa de ${featuredArtwork.title}`}
                        >
                            <span>Ver detalles en pantalla completa</span>
                            <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaleriaInterlude;
