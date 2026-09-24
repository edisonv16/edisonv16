import { useState, useMemo, useEffect, useCallback } from 'react';
import InfoPortafolio from '../../data/InfoPortafolio.jsx';

const CATEGORY_META = {
    all: {
        id: 'all',
        label: 'Todas las Obras',
        icon: 'fa-th-large'
    },
    ilustracion: {
        id: 'ilustracion',
        label: 'Ilustración Digital',
        icon: 'fa-paint-brush'
    },
    campanas: {
        id: 'campanas',
        label: 'Campañas Publicitarias',
        icon: 'fa-bullhorn'
    }
};

export const useGaleria = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeLightboxItem, setActiveLightboxItem] = useState(null);

    const galleryItems = useMemo(() => {
        return InfoPortafolio?.Galeria || [];
    }, []);

    const categoryFilters = useMemo(() => {
        const totalItemsCount = galleryItems.length;
        const countByCategory = galleryItems.reduce((accumulatedCounts, currentItem) => {
            const currentCategory = currentItem.category;
            accumulatedCounts[currentCategory] = (accumulatedCounts[currentCategory] || 0) + 1;
            return accumulatedCounts;
        }, {});

        return [
            {
                ...CATEGORY_META.all,
                count: totalItemsCount
            },
            {
                ...CATEGORY_META.ilustracion,
                count: countByCategory.ilustracion || 0
            },
            {
                ...CATEGORY_META.campanas,
                count: countByCategory.campanas || 0
            }
        ];
    }, [galleryItems]);

    const displayedItems = useMemo(() => {
        if (selectedCategory === 'all') {
            return galleryItems;
        }
        return galleryItems.filter((item) => item.category === selectedCategory);
    }, [galleryItems, selectedCategory]);

    const activeItemIndex = useMemo(() => {
        if (!activeLightboxItem) {
            return -1;
        }
        return displayedItems.findIndex((item) => item.id === activeLightboxItem.id);
    }, [activeLightboxItem, displayedItems]);

    const openLightbox = useCallback((item) => {
        setActiveLightboxItem(item);
    }, []);

    const closeLightbox = useCallback(() => {
        setActiveLightboxItem(null);
    }, []);

    const nextLightboxItem = useCallback(() => {
        if (activeItemIndex === -1 || displayedItems.length === 0) {
            return;
        }
        const nextIndex = (activeItemIndex + 1) % displayedItems.length;
        setActiveLightboxItem(displayedItems[nextIndex]);
    }, [activeItemIndex, displayedItems]);

    const prevLightboxItem = useCallback(() => {
        if (activeItemIndex === -1 || displayedItems.length === 0) {
            return;
        }
        const previousIndex = (activeItemIndex - 1 + displayedItems.length) % displayedItems.length;
        setActiveLightboxItem(displayedItems[previousIndex]);
    }, [activeItemIndex, displayedItems]);

    // Gestión de teclado y bloqueo de scroll al abrir el Lightbox
    useEffect(() => {
        if (!activeLightboxItem) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowRight') {
                nextLightboxItem();
            } else if (event.key === 'ArrowLeft') {
                prevLightboxItem();
            }
        };

        const originalOverflowStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflowStyle;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeLightboxItem, closeLightbox, nextLightboxItem, prevLightboxItem]);

    return {
        galleryItems: displayedItems,
        totalItemsCount: displayedItems.length,
        selectedCategory,
        setSelectedCategory,
        categoryFilters,
        activeLightboxItem,
        activeItemIndex,
        isLightboxOpen: Boolean(activeLightboxItem),
        openLightbox,
        closeLightbox,
        nextLightboxItem,
        prevLightboxItem
    };
};

export default useGaleria;
