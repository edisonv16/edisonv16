const GaleriaModal = ({
    item,
    currentIndex,
    totalCount,
    onClose,
    onNext,
    onPrev
}) => {
    if (!item) {
        return null;
    }

    const imageSource = item.folder + item.img;
    const currentPositionText = `${currentIndex + 1} / ${totalCount}`;

    return (
        <dialog
            className="galeria-modal"
            open
            aria-label={`Detalle de la obra: ${item.title}`}
        >
            <button
                type="button"
                className="galeria-modal__backdrop"
                onClick={onClose}
                aria-label="Cerrar modal al hacer clic en el fondo"
                tabIndex={-1}
            />

            <div className="galeria-modal__content">
                {/* Barra superior con contador y botón de cierre */}
                <div className="galeria-modal__header">
                    <div className="galeria-modal__header-meta">
                        <span className="galeria-modal__badge">
                            {item.categoryLabel}
                        </span>
                        <span className="galeria-modal__counter" aria-live="polite">
                            {currentPositionText}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="galeria-modal__close-btn"
                        onClick={onClose}
                        aria-label="Cerrar vista detallada de la obra"
                    >
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>

                {/* Zona principal de imagen con botones de navegación */}
                <div className="galeria-modal__body">
                    <div className="galeria-modal__media-col">
                        <button
                            type="button"
                            className="galeria-modal__nav-btn galeria-modal__nav-btn--prev"
                            onClick={onPrev}
                            aria-label="Ver obra anterior de la galería"
                        >
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </button>
                        <img
                            src={imageSource}
                            alt={item.alt || item.title}
                            className="galeria-modal__img"
                        />
                        <button
                            type="button"
                            className="galeria-modal__nav-btn galeria-modal__nav-btn--next"
                            onClick={onNext}
                            aria-label="Ver obra siguiente de la galería"
                        >
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="galeria-modal__info-col">
                        <div className="galeria-modal__details">
                            <h3 className="galeria-modal__title">{item.title}</h3>
                            <p className="galeria-modal__technique">
                                <i className="fa fa-paint-brush" aria-hidden="true"></i> {item.technique}
                            </p>
                            <p className="galeria-modal__desc">{item.description}</p>
                        </div>
                        <div className="galeria-modal__footer-meta">
                            <div className="galeria-modal__author">
                                <strong>Edison Vidal Ospina</strong>
                                <span>Dirección de arte e ilustración digital</span>
                            </div>
                            <span className="galeria-modal__hints" aria-hidden="true">
                                <kbd>←</kbd><kbd>→</kbd> navegar
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default GaleriaModal;
