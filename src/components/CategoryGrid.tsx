import React from 'react';
import { Layers, Grid, Paintbrush, Zap, Droplet, Shield, Wrench, Box, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5" />,
  Grid: <Grid className="w-5 h-5" />,
  Paintbrush: <Paintbrush className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Droplet: <Droplet className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-8 sm:py-12 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5E1E] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E]" />
              Əsas Kateqoriyalar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tikinti və Təmir Materialları
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              İnşaatın bünövrəsindən açar təhvili təmirədək zəruri olan bütün sertifikatlı məhsul qrupları
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs sm:text-sm font-semibold text-[#FF5E1E] hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Bütün kataloq</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'border-[#FF5E1E] bg-[#1F2432] shadow-xl shadow-[#FF5E1E]/15 scale-[1.02]'
                    : 'border-white/5 bg-[#141720] hover:bg-[#1A1F2C] hover:border-white/20 hover:-translate-y-1'
                }`}
              >
                {/* Background Image Thumbnail with overlay */}
                <div className="relative h-28 sm:h-32 w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.55] group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-transparent to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#0F1115]/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center group-hover:bg-[#FF5E1E] transition-colors">
                    {ICON_MAP[cat.iconName] || <Layers className="w-4 h-4" />}
                  </div>

                  {/* Count */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-semibold text-slate-300 tabular-nums">
                    {cat.itemCount}+
                  </div>
                </div>

                {/* Info */}
                <div className="p-3.5 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FF5E1E] transition-colors truncate">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">
                    {cat.subcategories.slice(0, 2).join(', ')}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
