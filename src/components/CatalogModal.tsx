import React from 'react';
import { X, Layers, Grid, Paintbrush, Zap, Droplet, Shield, Wrench, Box, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectCategory: (categorySlug: string) => void;
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

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[85vh] bg-[#12151C] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#161922]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF5E1E]/20 text-[#FF5E1E] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Tikinti və Təmir Kataloqu
              </h2>
              <p className="text-xs text-slate-400">
                15,000+ sertifikatlı məhsul və zavod qiymətləri
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            aria-label="Bağla"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Categories & Subcategories Grid */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group relative p-4 rounded-2xl bg-[#181C26] hover:bg-[#202534] border border-white/5 hover:border-[#FF5E1E]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#FF5E1E]/20 text-slate-300 group-hover:text-[#FF5E1E] flex items-center justify-center transition-colors">
                      {ICON_MAP[cat.iconName] || <Layers className="w-5 h-5" />}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 tabular-nums">
                      {cat.itemCount} məhsul
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#FF5E1E] transition-colors mb-2">
                    {cat.title}
                  </h3>

                  <ul className="space-y-1.5 mb-4">
                    {cat.subcategories.slice(0, 4).map((sub, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          onClose();
                        }}
                        className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer transition-colors truncate flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onClose();
                  }}
                  className="w-full mt-2 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#FF5E1E] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Bütün məhsullar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer quick brands bar */}
        <div className="p-4 border-t border-white/10 bg-[#161922] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="font-semibold text-slate-300 shrink-0">Populyar Brendlər:</span>
            {['Mətanət A', 'Ağdağ', 'Sika', 'Knauf', 'Holcim', 'Bosch', 'DYO', 'Kalde'].map((brand) => (
              <span key={brand} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 shrink-0">
                {brand}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-xs transition-colors shrink-0 ml-4"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
};
