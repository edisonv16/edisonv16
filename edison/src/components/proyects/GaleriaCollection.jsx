import { useState, useRef, useEffect, useCallback } from 'react';

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
    const [selectedArtworkId, setSelectedArtworkId] = useState(null);
    const [previousArtwork, setPreviousArtwork] = useState(null);
    const [transitionDirection, setTransitionDirection] = useState('next');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const railRef = useRef(null);
    const transitionTimeoutRef = useRef(null);

    // Selección de la obra activa derivada en render
    const activeArtwork =
        collectionArtworkList.find((item) => item.id === selectedArtworkId) ||
        collectionArtworkList[0] ||
        null;

    const currentSafeIndex = activeArtwork
        ? collectionArtworkList.findIndex((item) => item.id === activeArtwork.id)
        : 0;

    // Disparador de transición con efecto 3D Creative
    const trigger3DTransition = useCallback((nextArtwork, direction) => {
        if (!nextArtwork || nextArtwork.id === activeArtwork?.id) {
            return;
        }

        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }

        setPreviousArtwork(activeArtwork);
        setTransitionDirection(direction);
        setIsTransitioning(true);
        setSelectedArtworkId(nextArtwork.id);

        transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            setPreviousArtwork(null);
        }, 750);
    }, [activeArtwork]);

    // Limpieza de temporizador al desmontar
    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    const handleSelectArtwork = useCallback((artwork) => {
        if (!activeArtwork || artwork.id === activeArtwork.id) {
            return;
        }
        const targetIndex = collectionArtworkList.findIndex((item) => item.id === artwork.id);
        const direction = targetIndex >= currentSafeIndex ? 'next' : 'prev';
        trigger3DTransition(artwork, direction);
    }, [activeArtwork, collectionArtworkList, currentSafeIndex, trigger3DTransition]);

    const handlePrev = useCallback(() => {
        if (!collectionArtworkList.length) {
            return;
        }
        const prevIndex = (currentSafeIndex - 1 + collectionArtworkList.length) % collectionArtworkList.length;
        trigger3DTransition(collectionArtworkList[prevIndex], 'prev');
    }, [currentSafeIndex, collectionArtworkList, trigger3DTransition]);

    const handleNext = useCallback(() => {
        if (!collectionArtworkList.length) {
            return;
        }
        const nextIndex = (currentSafeIndex + 1) % collectionArtworkList.length;
        trigger3DTransition(collectionArtworkList[nextIndex], 'next');
    }, [currentSafeIndex, collectionArtworkList, trigger3DTransition]);

    // Desplazar automáticamente el carril al cambiar de obra
    useEffect(() => {
        if (railRef.current && activeArtwork) {
            const activeCardElement = railRef.current.querySelector(`[data-artwork-id="${activeArtwork.id}"]`);
            if (activeCardElement && typeof activeCardElement.scrollIntoView === 'function') {
                activeCardElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [activeArtwork]);

    if (!collectionArtworkList || collectionArtworkList.length === 0 || !activeArtwork) {
        return null;
    }

    const activeImageUrl = activeArtwork.folder + activeArtwork.img;
    const previousImageUrl = previousArtwork ? previousArtwork.folder + previousArtwork.img : null;
    const formattedCurrentNumber = String(currentSafeIndex + 1).padStart(2, '0');
    const formattedTotalCount = String(collectionArtworkList.length).padStart(2, '0');

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
                <div className="galeria-collection__dock">
                    {/* Carril de miniaturas visuales */}
                    <div
                        ref={railRef}
                        className="galeria-collection__rail"
                        role="region"
                        aria-label="Carrusel de miniaturas de la colección"
                    >
                        {collectionArtworkList.map((artworkPiece, pieceIndex) => {
                            const isCardActive = artworkPiece.id === activeArtwork.id;
                            const cardIndexLabel = String(pieceIndex + 1).padStart(2, '0');
                            const cardImageUrl = artworkPiece.folder + artworkPiece.img;

                            return (
                                <button
                                    key={artworkPiece.id}
                                    type="button"
                                    data-artwork-id={artworkPiece.id}
                                    className={`galeria-collection__thumb ${isCardActive ? 'galeria-collection__thumb--active' : ''}`}
                                    onClick={() => handleSelectArtwork(artworkPiece)}
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
                                onClick={handlePrev}
                                aria-label="Ver obra anterior en la colección"
                            >
                                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                className="galeria-collection__arrow-btn"
                                onClick={handleNext}
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
