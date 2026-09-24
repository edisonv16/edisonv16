import ArtworkCard from './ArtworkCard';

/**
 * Showcase Asimétrico Dttio:
 * Organiza las 4 obras principales junto a la tarjeta de manifiesto editorial (col 1)
 * y el panel de filtros tipográficos (col 3) para brindar descanso visual y ritmo.
 */
const GaleriaHero = ({
    heroArtworkList,
    categoryFilters,
    selectedCategory,
    onSelectCategory,
    onOpenLightbox,
    totalAvailableCount
}) => {
    return (
        <div
            className="galeria-dttio-hero"
            role="region"
            aria-label="Showcase principal de obras selectas"
        >
            {/* Columna 1: Obra 1 + Tarjeta de Manifiesto Editorial (Descanso Visual) */}
            <div className="galeria-dttio-col galeria-dttio-col--left">
                {heroArtworkList[0] && (
                    <ArtworkCard
                        galleryItem={heroArtworkList[0]}
                        itemIndex={0}
                        onOpen={onOpenLightbox}
                    />
                )}

                <div className="galeria-card galeria-card--editorial galeria-editorial-statement-card">
                    <div className="galeria-card--editorial__content">
                        <span className="galeria-card--editorial__kicker">
                            Dirección &amp; Metodología
                        </span>
                        <h3 className="galeria-card--editorial__title">
                            Narrativa Visual &amp; Concept Art
                        </h3>
                        <div className="galeria-card--editorial__list">
                            <div className="galeria-card--editorial__row">
                                <span>Pintura Digital &amp; Anatomía</span>
                                <span className="galeria-card--editorial__year">2024</span>
                            </div>
                            <div className="galeria-card--editorial__row">
                                <span>Composición Gran Formato</span>
                                <span className="galeria-card--editorial__year">2023</span>
                            </div>
                            <div className="galeria-card--editorial__row">
                                <span>Atmósferas &amp; Realismo Mágico</span>
                                <span className="galeria-card--editorial__year">2022</span>
                            </div>
                        </div>
                        <p className="galeria-card--editorial__desc">
                            Equilibrio entre la rigurosidad compositiva y la libertad plástica de la ilustración contemporánea.
                        </p>
                        {totalAvailableCount > 4 && (
                            <a
                                href="#galeria-coleccion"
                                className="galeria-card--editorial__link"
                                title="Explorar el catálogo completo de obras"
                            >
                                <span>Explorar Colección Completa</span>
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Columna 2: Obra 2 + Obra 3 (Con Stagger / Desplazamiento orgánico) */}
            <div className="galeria-dttio-col galeria-dttio-col--center">
                {heroArtworkList[1] && (
                    <ArtworkCard
                        galleryItem={heroArtworkList[1]}
                        itemIndex={1}
                        onOpen={onOpenLightbox}
                    />
                )}
                {heroArtworkList[2] && (
                    <ArtworkCard
                        galleryItem={heroArtworkList[2]}
                        itemIndex={2}
                        onOpen={onOpenLightbox}
                    />
                )}
            </div>

            {/* Columna 3: Índice Tipográfico de Filtros (Estilo Dttio) + Obra 4 */}
            <div className="galeria-dttio-col galeria-dttio-col--right">
                <div className="galeria-editorial-filters-panel">
                    <span className="galeria-editorial-filters-panel__eyebrow">
                        Índice de Obras
                    </span>
                    <nav
                        className="galeria-editorial-filters"
                        aria-label="Filtros de galería"
                    >
                        {categoryFilters.map((filterItem) => {
                            const isSelected = selectedCategory === filterItem.id;
                            const formattedCount = String(filterItem.count).padStart(2, '0');
                            const buttonClassName = isSelected
                                ? 'galeria-editorial-filter galeria-editorial-filter--active'
                                : 'galeria-editorial-filter';

                            return (
                                <button
                                    key={filterItem.id}
                                    type="button"
                                    className={buttonClassName}
                                    onClick={() => onSelectCategory(filterItem.id)}
                                    aria-pressed={isSelected}
                                    aria-label={`Filtrar obras por ${filterItem.label}`}
                                >
                                    <span
                                        className="galeria-editorial-filter__arrow"
                                        aria-hidden="true"
                                    >
                                        {isSelected ? '→' : ''}
                                    </span>
                                    <span className="galeria-editorial-filter__label">
                                        {filterItem.label}
                                    </span>
                                    <span className="galeria-editorial-filter__count">
                                        ({formattedCount})
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {heroArtworkList[3] && (
                    <ArtworkCard
                        galleryItem={heroArtworkList[3]}
                        itemIndex={3}
                        onOpen={onOpenLightbox}
                    />
                )}
            </div>
        </div>
    );
};

export default GaleriaHero;
