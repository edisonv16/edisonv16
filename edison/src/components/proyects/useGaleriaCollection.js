import { useState, useRef, useEffect, useCallback } from 'react';

const EMPTY_ARTWORK_LIST = [];

/**
 * Hook para la gestión del estado, transiciones 3D y navegación del carril de la colección.
 *
 * @param {Array} collectionArtworkList Lista de obras de la colección complementaria.
 * @returns {Object} Estado y manejadores de interacción de la colección.
 */
export const useGaleriaCollection = (collectionArtworkList = EMPTY_ARTWORK_LIST) => {
    const [selectedArtworkId, setSelectedArtworkId] = useState(null);
    const [previousArtwork, setPreviousArtwork] = useState(null);
    const [transitionDirection, setTransitionDirection] = useState('next');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const railRef = useRef(null);
    const transitionTimeoutRef = useRef(null);
    const isInitialMountReference = useRef(true);

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

    // Desplazar horizontalmente el carril de miniaturas solo al cambiar de obra por interacción (sin mover la ventana)
    useEffect(() => {
        if (isInitialMountReference.current) {
            isInitialMountReference.current = false;
            return;
        }

        if (railRef.current && activeArtwork) {
            const activeCardElement = railRef.current.querySelector(`[data-artwork-id="${activeArtwork.id}"]`);
            if (activeCardElement) {
                const railContainer = railRef.current;
                const cardOffsetLeft = activeCardElement.offsetLeft;
                const cardWidth = activeCardElement.offsetWidth;
                const containerWidth = railContainer.clientWidth;
                const targetScrollLeft = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);

                if (typeof railContainer.scrollTo === 'function') {
                    railContainer.scrollTo({
                        left: targetScrollLeft,
                        behavior: 'smooth'
                    });
                } else {
                    railContainer.scrollLeft = targetScrollLeft;
                }
            }
        }
    }, [activeArtwork]);

    const formattedCurrentNumber = String(currentSafeIndex + 1).padStart(2, '0');
    const formattedTotalCount = String(collectionArtworkList.length).padStart(2, '0');
    const activeImageUrl = activeArtwork ? activeArtwork.folder + activeArtwork.img : '';
    const previousImageUrl = previousArtwork ? previousArtwork.folder + previousArtwork.img : null;

    return {
        activeArtwork,
        previousArtwork,
        transitionDirection,
        isTransitioning,
        railRef,
        currentSafeIndex,
        formattedCurrentNumber,
        formattedTotalCount,
        activeImageUrl,
        previousImageUrl,
        handleSelectArtwork,
        handlePrev,
        handleNext
    };
};

export default useGaleriaCollection;
