import useGaleriaCollection from './useGaleriaCollection';
import GaleriaCollectionDock from './GaleriaCollectionDock';

const EMPTY_ARTWORK_LIST = [];

/**
 * Colección & Catálogo Curado:
 * - Efecto de cambio 3D Creative (perspectiva en profundidad en el eje Z y rotación suave)
 * - Título y encabezado 100% justificados a la izquierda
 * - Lienzo principal limpio sin tarjetas flotantes que tapen la obra
 * - Miniaturas en la esquina derecha del lienzo con controles (< >) debajo
 * - Textos activos y enlace sutil "Explorar obra →" ubicados debajo del lienzo a la izquierda
 */
const GaleriaCollection = ({ collectionArtworkList = EMPTY_ARTWORK_LIST, onOpenLightbox }) => {
    const {
        activeArtwork,
        previousArtwork,
        transitionDirection,
        isTransitioning,
        railRef,
        formattedCurrentNumber,
        formattedTotalCount,
        activeImageUrl,
        previousImageUrl,
        handleSelectArtwork,
        handlePrev,
        handleNext
    } = useGaleriaCollection(collectionArtworkList);

    if (!collectionArtworkList || collectionArtworkList.length === 0 || !activeArtwork) {
        return null;
    }

    return (
        <div
            id="galeria-coleccion"
            className="galeria-collection"
            role="region"
            aria-label="Colección complementaria de obras"
        >
            {/* Encabezado superior alineado a la derecha (estilo editorial asimétrico) */}
            <div className="galeria-collection__header">
                <span className="galeria-collection__kicker">
                    03 / Catálogo Detallado
                </span>
                <h3 className="galeria-collection__section-name">
                    Colección &amp; Piezas Gráficas
                </h3>
                <p className="galeria-collection__lead">
                    Una selección de exploraciones visuales donde ilustración, campaña y dirección de arte encuentran su propia escala.
                </p>
            </div>

            {/* ===================================================================
                LIENZO PRINCIPAL CON EFECTO CREATIVE 3D
                La imagen saliente retrocede en el espacio Z y la entrante avanza
               =================================================================== */}
            <div className="galeria-collection__showcase">
                {/* Contenedor con perspectiva 3D para la transición de profundidad */}
                <div className="galeria-collection__viewport-3d">
                    {/* Capa saliente durante la transición */}
                    {isTransitioning && previousArtwork && (
                        <div
                            key={`prev-${previousArtwork.id}`}
                            className={`galeria-collection__bg-layer galeria-collection__bg-layer--outgoing-${transitionDirection}`}
                            aria-hidden="true"
                        >
                            <img
                                src={previousImageUrl}
                                alt=""
                                className="galeria-collection__bg-image"
                            />
                        </div>
                    )}

                    {/* Capa activa / entrante */}
                    <div
                        key={`curr-${activeArtwork.id}`}
                        className={`galeria-collection__bg-layer ${
                            isTransitioning
                                ? `galeria-collection__bg-layer--incoming-${transitionDirection}`
                                : 'galeria-collection__bg-layer--active'
                        }`}
                    >
                        <img
                            src={activeImageUrl}
                            alt={activeArtwork.alt || activeArtwork.title}
                            className="galeria-collection__bg-image"
                        />
                    </div>
                </div>

                {/* Sutil atmósfera de viñeta para contraste elegante */}
                <span className="galeria-collection__scrim" aria-hidden="true"></span>

                {/* Acción y metadatos anclados en la esquina inferior izquierda del lienzo (sin fondo blanco sólido) */}
                <div className="galeria-collection__canvas-meta">
                    <div className="galeria-collection__canvas-tags">
                        <span className="galeria-collection__canvas-badge">
                            {activeArtwork.categoryLabel}
                        </span>
                        <span className="galeria-collection__canvas-dot">•</span>
                        <span className="galeria-collection__canvas-technique">
                            <i className="fa fa-paint-brush" aria-hidden="true"></i> {activeArtwork.technique}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="galeria-collection__explore-btn"
                        onClick={() => onOpenLightbox(activeArtwork)}
                        aria-label={`Abrir obra destacada: ${activeArtwork.title}`}
                    >
                        <span className="galeria-collection__explore-text">Explorar obra</span>
                        <span className="galeria-collection__explore-arrow" aria-hidden="true">
                            <i className="fa fa-arrow-right"></i>
                        </span>
                    </button>
                </div>

                {/* Muelle lateral derecho: Miniaturas arriba + Controles (< >) inmediatamente debajo */}
                <GaleriaCollectionDock
                    collectionArtworkList={collectionArtworkList}
                    activeArtwork={activeArtwork}
                    railRef={railRef}
                    onSelectArtwork={handleSelectArtwork}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    formattedCurrentNumber={formattedCurrentNumber}
                    formattedTotalCount={formattedTotalCount}
                />
            </div>

            {/* ===================================================================
                ÁREA EDITORIAL JUSTIFICADA A LA IZQUIERDA (Debajo del lienzo)
               =================================================================== */}
            <div className="galeria-collection__footer-info">
                <h4 className="galeria-collection__info-title">
                    {activeArtwork.title}
                </h4>

                <p className="galeria-collection__info-desc">
                    {activeArtwork.description}
                </p>
            </div>
        </div>
    );
};

export default GaleriaCollection;
