/**
 * Tarjeta individual de obra de arte con presentación squircle y overlay accesible
 */
const ArtworkCard = ({ galleryItem, itemIndex, onOpen }) => {
    const itemImageUrl = galleryItem.folder + galleryItem.img;
    const indexLabel = String(itemIndex + 1).padStart(2, '0');

    return (
        <button
            type="button"
            className="galeria-card"
            onClick={() => onOpen(galleryItem)}
            aria-label={`Abrir detalle de la obra: ${galleryItem.title}`}
        >
            <div className="galeria-card__media">
                <img
                    src={itemImageUrl}
                    alt={galleryItem.alt || galleryItem.title}
                    loading="lazy"
                    decoding="async"
                    className="galeria-card__img"
                />
                <div className="galeria-card__overlay">
                    <div className="galeria-card__overlay-top">
                        <span className="galeria-card__badge">
                            {galleryItem.categoryLabel}
                        </span>
                        <span className="galeria-card__action-icon" aria-hidden="true">
                            <i className="fa fa-search-plus"></i>
                        </span>
                    </div>
                    <div className="galeria-card__overlay-bottom">
                        <span className="galeria-card__index">{indexLabel}.</span>
                        <span className="galeria-card__title">{galleryItem.title}</span>
                        <span className="galeria-card__technique">
                            <i className="fa fa-paint-brush" aria-hidden="true"></i> {galleryItem.technique}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default ArtworkCard;
