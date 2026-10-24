import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#141722] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Bağla"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1B202D] aspect-square flex items-center justify-center border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.discountPercent && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#FF5E1E] text-white text-xs font-black shadow-md tabular-nums">
                  -{product.discountPercent}% ENDİRİM
                </div>
              )}
            </div>

            {/* Info & Buy Module */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Brand & Category */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="text-[#FF5E1E] font-bold uppercase">{product.brand}</span>
                  <span>·</span>
                  <span>{product.category}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  {product.name}
                </h2>

                {/* Ratings & Stock */}
                <div className="flex items-center gap-3 text-xs text-slate-300 mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-1 text-amber-400 font-bold tabular-nums">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span>·</span>
                  <span className="text-slate-400 tabular-nums">{product.reviewCount} müştəri rəyi</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">Anbarda mövcuddur</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Technical Specifications */}
                <div className="mb-6 bg-[#181C26] rounded-xl p-3.5 border border-white/5 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    Texniki Göstəricilər
                  </h4>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs text-slate-300">
                      <span className="text-slate-400">{key}:</span>
                      <span className="font-medium text-white">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Module */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      {(product.price * quantity).toFixed(2)} ₼
                    </span>
                    {product.oldPrice && (
                      <span className="ml-2 text-sm text-slate-500 line-through tabular-nums">
                        {(product.oldPrice * quantity).toFixed(2)} ₼
                      </span>
                    )}
                    <span className="block text-xs text-slate-400 mt-0.5">
                      Vahid qiyməti: {product.price.toFixed(2)} ₼ / {product.unit}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#1B202C] border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
                      aria-label="Azalt"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
                      aria-label="Artır"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-[#FF5E1E] hover:bg-[#FF6B00] text-white shadow-[#FF5E1E]/25 active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Səbətə əlavə edildi!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Səbətə əlavə et - {(product.price * quantity).toFixed(2)} ₼</span>
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] text-slate-400 text-center">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
                    <Truck className="w-4 h-4 text-[#FF5E1E]" />
                    <span>2 saatda çatdırılma</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
                    <ShieldCheck className="w-4 h-4 text-[#FF5E1E]" />
                    <span>100% Orijinal</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
                    <RotateCcw className="w-4 h-4 text-[#FF5E1E]" />
                    <span>14 gün geri qaytarma</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
