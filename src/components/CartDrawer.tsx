import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout flow state
  const [isCheckout, setIsCheckout] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+994 ');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'pos' | 'card'>('pos');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = rawSubtotal * discountRate;
  const deliveryFee = rawSubtotal > 150 || rawSubtotal === 0 ? 0 : 10;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'TEMIR10') {
      setDiscountRate(0.10);
      setPromoSuccess('10% endirim tətbiq olundu!');
    } else {
      setPromoError('Yanlış promo kod. "TEMIR10" yoxlayın.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || phone.length < 9 || !address) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `TEM-${Math.floor(100000 + Math.random() * 900000)}`;
      onOrderSuccess(generatedId);
      onClearCart();
      setIsCheckout(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#12151D] border-l border-white/10 shadow-2xl h-full flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#161922] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF5E1E]/20 text-[#FF5E1E] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isCheckout ? 'Sifarişin Rəsmiləşdirilməsi' : 'Səbət'}
              </h2>
              <span className="text-xs text-slate-400">
                {items.length} adda məhsul
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isCheckout && items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors px-2 py-1"
                title="Səbəti təmizlə"
              >
                Təmizlə
              </button>
            )}
            <button
              onClick={() => {
                setIsCheckout(false);
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Bağla"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">Səbətiniz boşdur</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Kataloqdan zəruri tikinti və təmir materiallarını seçərək səbətə əlavə edin.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white text-xs font-bold transition-all shadow-md"
              >
                Kataloqa Keç
              </button>
            </div>
          ) : isCheckout ? (
            /* Checkout Form */
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Adınız və Soyadınız *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Məs: Emil Əliyev"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#161922] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Əlaqə Nömrəsi *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+994 (50) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#161922] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Çatdırılma Ünvanı *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Məs: Bakı ş., Nərimanov r., Təbriz küç. 45, mənzil 12"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#161922] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Ödəniş Üsulu
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pos')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      paymentMethod === 'pos'
                        ? 'border-[#FF5E1E] bg-[#FF5E1E]/15 text-white'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    Qapıda POS
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      paymentMethod === 'cash'
                        ? 'border-[#FF5E1E] bg-[#FF5E1E]/15 text-white'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    Qapıda Nağd
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      paymentMethod === 'card'
                        ? 'border-[#FF5E1E] bg-[#FF5E1E]/15 text-white'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    Kartla Onlayn
                  </button>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF5E1E] shrink-0" />
                <span>Kuryer sifarişdən əvvəl sizinlə zənglə əlaqə saxlayacaq.</span>
              </div>
            </form>
          ) : (
            /* Items List */
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#161922] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#FF5E1E] font-semibold block uppercase">
                      {product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-black text-white tabular-nums block mt-1">
                      {(product.price * quantity).toFixed(2)} ₼
                      <span className="text-[10px] text-slate-400 font-normal ml-1">
                        ({product.price.toFixed(2)} ₼ / {product.unit})
                      </span>
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      aria-label="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-[#0F1115] rounded-lg p-0.5 border border-white/5">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:bg-white/10"
                        aria-label="Azalt"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:bg-white/10"
                        aria-label="Artır"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Promo kod (məs: TEMIR10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#161922] border border-white/10 focus:border-[#FF5E1E] text-xs text-white rounded-xl pl-9 pr-3 py-2.5 uppercase outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors shrink-0"
                  >
                    Tətbiq et
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-400 mt-1">{promoSuccess}</p>}
              </form>
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#161922] space-y-3">
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Məhsul dəyəri:</span>
                <span className="text-white font-semibold tabular-nums">{rawSubtotal.toFixed(2)} ₼</span>
              </div>

              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo endirim (10%):</span>
                  <span className="tabular-nums">-{discountAmount.toFixed(2)} ₼</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Çatdırılma:</span>
                <span className={`font-semibold tabular-nums ${deliveryFee === 0 ? 'text-emerald-400' : 'text-white'}`}>
                  {deliveryFee === 0 ? 'PULSUZ (150₼-dən yuxarı)' : `${deliveryFee.toFixed(2)} ₼`}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-white/5 text-sm font-bold text-white">
                <span>Yekun Məbləğ:</span>
                <span className="text-lg text-[#FF5E1E] tabular-nums font-black">{finalTotal.toFixed(2)} ₼</span>
              </div>
            </div>

            {isCheckout ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
                >
                  Geri
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="flex-2 py-3 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#FF5E1E]/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Rəsmiləşdirilir...' : 'Sifarişi Təsdiqlə'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCheckout(true)}
                className="w-full py-3.5 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white font-bold text-sm transition-all shadow-lg shadow-[#FF5E1E]/25 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Sifarişi Rəsmiləşdir</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
