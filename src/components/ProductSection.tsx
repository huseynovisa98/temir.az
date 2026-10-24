import React, { useState, useMemo } from 'react';
import { ShoppingCart, Star, Check, Eye, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { BRANDS } from '../data/mockData';

interface ProductSectionProps {
  products: Product[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  activeCategory,
  setActiveCategory,
  searchQuery,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'discount' | 'rating'>('default');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categoryFilters = [
    { slug: 'all', label: 'Bütün Məhsullar' },
    { slug: 'discount', label: 'Xüsusi Endirimlər' },
    { slug: 'quru-qarisiglar', label: 'Quru qarışıqlar' },
    { slug: 'boyalar-laklar', label: 'Boyalar və laklar' },
    { slug: 'kasi-keramika', label: 'Kaşı və keramika' },
    { slug: 'elektrik', label: 'Elektrik' },
    { slug: 'santexnika', label: 'Santexnika' },
    { slug: 'aletler', label: 'Alətlər' },
    { slug: 'izolasiya', label: 'İzolasiya' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory === 'discount') {
        if (!p.oldPrice || !p.discountPercent) return false;
      } else if (activeCategory !== 'all') {
        if (p.categorySlug !== activeCategory) return false;
      }

      // Brand filter
      if (selectedBrand !== 'all') {
        if (!p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, activeCategory, selectedBrand, searchQuery, sortBy]);

  const handleAddToCartClick = (p: Product) => {
    onAddToCart(p, 1);
    setAddedItemIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  return (
    <section id="products" className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5E1E] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E]" />
              Kataloq & Xüsusi Təkliflər
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sertifikatlı Tikinti Materialları
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Topdan və pərakəndə zavod qiymətləri, qaimə-faktura və ünvana operativ çatdırılma
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sıralama:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#161920] border border-white/10 hover:border-white/20 text-xs sm:text-sm text-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#FF5E1E] transition-colors"
            >
              <option value="default">Seçilmişlər</option>
              <option value="discount">Ən çox endirim</option>
              <option value="price-asc">Qiymət: Ucuzdan bahaya</option>
              <option value="price-desc">Qiymət: Bahadan ucuza</option>
              <option value="rating">Müştəri reytinqi</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categoryFilters.map((tab) => {
            const isActive = activeCategory === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => setActiveCategory(tab.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#FF5E1E] text-white shadow-md shadow-[#FF5E1E]/20'
                    : 'bg-[#161922] text-slate-300 hover:text-white hover:bg-[#1E2330] border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Brand Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 shrink-0">Brend:</span>
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedBrand === 'all'
                ? 'bg-white/15 text-white font-bold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Bütün brendlər
          </button>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedBrand === brand
                  ? 'bg-[#FF5E1E]/20 text-[#FF5E1E] border border-[#FF5E1E]/40 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedItemIds[product.id];

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-[#141720] border border-white/5 hover:border-white/20 hover:bg-[#181D29] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[4/3] w-full bg-[#1A1F2B] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      referrerPolicy="no-referrer"
                    />

                    {/* Discount Tag */}
                    {product.discountPercent && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#FF5E1E] text-white text-xs font-black shadow-md tabular-nums">
                        -{product.discountPercent}%
                      </div>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={() => onQuickView(product)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                      title="Məhsula baxış"
                      aria-label="Məhsula baxış"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand & Category Metadata - unboxed with separator */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-medium">
                        <span className="text-[#FF5E1E] font-semibold">{product.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.category}</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="text-sm sm:text-base font-bold text-white group-hover:text-[#FF5E1E] transition-colors line-clamp-2 cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h3>

                      {/* Rating & Stock */}
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                        <div className="flex items-center gap-1 text-amber-400 font-semibold tabular-nums">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">({product.reviewCount} rəy)</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400 font-medium">Stokda var</span>
                      </div>
                    </div>

                    {/* Price and Add to Cart Row */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-xl font-black text-white tabular-nums tracking-tight">
                            {product.price.toFixed(2)} ₼
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs text-slate-500 line-through tabular-nums">
                              {product.oldPrice.toFixed(2)} ₼
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block -mt-0.5">
                          / {product.unit}
                        </span>
                      </div>

                      {/* Add to Cart CTA */}
                      <button
                        onClick={() => handleAddToCartClick(product)}
                        className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                            : 'bg-[#FF5E1E] hover:bg-[#FF6B00] text-white shadow-md shadow-[#FF5E1E]/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Əlavə olundu</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Səbətə at</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto">
            <p className="text-slate-300 font-semibold text-lg mb-2">Axtarışa uyğun məhsul tapılmadı</p>
            <p className="text-slate-400 text-xs mb-6">
              Zəhmət olmasa axtarış parametrlərini və ya seçilmiş brend filtrini dəyişdirin.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedBrand('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#FF5E1E] text-white text-xs font-bold"
            >
              Bütün filtrləri sıfırla
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
