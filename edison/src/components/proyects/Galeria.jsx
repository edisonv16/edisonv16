import useGaleria from './useGaleria';
import GaleriaHeader from './GaleriaHeader';
import GaleriaHero from './GaleriaHero';
import GaleriaInterlude from './GaleriaInterlude';
import GaleriaCollection from './GaleriaCollection';
import GaleriaModal from './GaleriaModal';

/**
 * Galería de Arte & Campañas Visuales — Edison Vidal Ospina
 * Implementación de Dirección de Arte inspirada en estudio editorial Dttio.
 * Cuenta con un Showcase Asimétrico en 3 columnas, pausas curatoriales intermedias
 * y un catálogo curado con generoso descanso visual.
 */
const Galeria = () => {
    const {
        galleryItems,
        totalItemsCount,
        selectedCategory,
        setSelectedCategory,
        categoryFilters,
        activeLightboxItem,
        activeItemIndex,
        isLightboxOpen,
        openLightbox,
        closeLightbox,
        nextLightboxItem,
        prevLightboxItem
    } = useGaleria();

    // Primeras 4 obras para el Showcase Asimétrico Dttio
    const heroArtworkList = galleryItems.slice(0, 4);

    // Obra destacada para la pausa editorial de gran formato
    const featuredArtwork = galleryItems.length > 4 ? galleryItems[4] : null;

    // Colección complementaria de obras
    const collectionArtworkList = galleryItems.length > 5 ? galleryItems.slice(5) : [];

    return (
        <div className="col-12 galeria-section">
            {/* Cabecera Monumental Asimétrica */}
            <GaleriaHeader />

            {/* Bloque 1: Showcase Asimétrico Dttio (4 Obras + Filtros + Manifiesto) */}
            <GaleriaHero
                heroArtworkList={heroArtworkList}
                categoryFilters={categoryFilters}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onOpenLightbox={openLightbox}
                totalAvailableCount={galleryItems.length}
            />

            {/* Bloque 2: Pausa Editorial & Gran Formato (Descanso Visual Intermedio) */}
            <GaleriaInterlude
                featuredArtwork={featuredArtwork}
                onOpenLightbox={openLightbox}
            />

            {/* Bloque 3: Colección & Catálogo Curado */}
            <GaleriaCollection
                collectionArtworkList={collectionArtworkList}
                onOpenLightbox={openLightbox}
            />

            {/* Modal Lightbox Accesible */}
            {isLightboxOpen && (
                <GaleriaModal
                    item={activeLightboxItem}
                    currentIndex={activeItemIndex}
                    totalCount={totalItemsCount}
                    onClose={closeLightbox}
                    onNext={nextLightboxItem}
                    onPrev={prevLightboxItem}
                />
            )}
        </div>
    );
};

export default Galeria;
