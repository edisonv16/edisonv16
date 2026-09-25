const EMPTY_ARTWORK_LIST = [];

/**
 * Muelle lateral derecho de la colección:
 * - Carrusel horizontal de miniaturas
 * - Controles de navegación (< >) y contador de obras
 */
const GaleriaCollectionDock = ({
    collectionArtworkList = EMPTY_ARTWORK_LIST,
    activeArtwork = null,
    railRef = null,
    onSelectArtwork = () => {},
    onPrev = () => {},
    onNext = () => {},
    formattedCurrentNumber = '01',
    formattedTotalCount = '01'
}) => {
    return (
        <div className="galeria-collection__dock">
            {/* Carril de miniaturas visuales */}
            <div
                ref={railRef}
                className="galeria-collection__rail"
                role="region"
                aria-label="Carrusel de miniaturas de la colección"
            >
                {collectionArtworkList.map((artworkPiece, pieceIndex) => {
                    const isCardActive = activeArtwork && artworkPiece.id === activeArtwork.id;
                    const cardIndexLabel = String(pieceIndex + 1).padStart(2, '0');
                    const cardImageUrl = artworkPiece.folder + artworkPiece.img;

                    return (
                        <button
                            key={artworkPiece.id}
                            type="button"
                            data-artwork-id={artworkPiece.id}
                            className={`galeria-collection__thumb ${isCardActive ? 'galeria-collection__thumb--active' : ''}`}
                            onClick={() => onSelectArtwork(artworkPiece)}
                            aria-pressed={isCardActive}
                            aria-label={`Seleccionar obra: ${artworkPiece.title}`}
                        >
                            <div className="galeria-collection__thumb-media">
                                <img
                                    src={cardImageUrl}
                                    alt={artworkPiece.alt || artworkPiece.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="galeria-collection__thumb-img"
                                />
                                <div className="galeria-collection__thumb-overlay">
                                    <div className="galeria-collection__thumb-top">
                                        <span className="galeria-collection__thumb-number">
                                            {cardIndexLabel}
                                        </span>
                                        {isCardActive && (
                                            <span className="galeria-collection__thumb-badge">
                                                <i className="fa fa-dot-circle-o" aria-hidden="true"></i> Activa
                                            </span>
                                        )}
                                    </div>
                                    <div className="galeria-collection__thumb-bottom">
                                        <span className="galeria-collection__thumb-category">
                                            {artworkPiece.categoryLabel}
                                        </span>
                                        <strong className="galeria-collection__thumb-title">
                                            {artworkPiece.title}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Botonera de navegación integrada debajo de las miniaturas */}
            <div className="galeria-collection__dock-controls">
                <div className="galeria-collection__arrows">
                    <button
                        type="button"
                        className="galeria-collection__arrow-btn"
                        onClick={onPrev}
                        aria-label="Ver obra anterior en la colección"
                    >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </button>
                    <button
                        type="button"
                        className="galeria-collection__arrow-btn"
                        onClick={onNext}
                        aria-label="Ver obra siguiente en la colección"
                    >
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="galeria-collection__counter-wrap">
                    <span className="galeria-collection__counter-numbers">
                        {formattedCurrentNumber} <span className="galeria-collection__counter-sep">/</span> {formattedTotalCount}
                    </span>
                    <span className="galeria-collection__count">
                        {formattedTotalCount} obras
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GaleriaCollectionDock;
