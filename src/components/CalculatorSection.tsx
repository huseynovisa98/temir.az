import React, { useState } from 'react';
import { Calculator, Sparkles, ShoppingCart, Plus, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CalculatorSectionProps {
  products: Product[];
  onAddMultipleToCart: (items: { product: Product; quantity: number }[]) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  products,
  onAddMultipleToCart,
}) => {
  const [calcType, setCalcType] = useState<'suvaq' | 'boya' | 'kafel'>('suvaq');
  const [areaSqM, setAreaSqM] = useState<number>(60);
  const [thicknessMm, setThicknessMm] = useState<number>(15);
  const [coatCount, setCoatCount] = useState<number>(2);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Calculation formulas:
  // 1. Suvaq: 1 m² at 10mm thickness consumes approx 8.5 kg of Ağdağ.
  // Bags of 30kg = Math.ceil((areaSqM * (thicknessMm / 10) * 8.5) / 30)
  const agdagBags = Math.ceil((areaSqM * (thicknessMm / 10) * 8.5) / 30);

  // 2. Boya: 1 Liter paint covers approx 12 m² per coat.
  // Liters needed = Math.ceil((areaSqM * coatCount) / 12)
  // Buckets of 15L = Math.ceil(liters / 15)
  const paintLiters = Math.ceil((areaSqM * coatCount) / 12);
  const paintBuckets = Math.max(1, Math.ceil(paintLiters / 15));

  // 3. Kafel: Tile area + 10% reserve. Sika 25kg bag covers approx 5 m².
  const tileSqMWithWaste = Math.ceil(areaSqM * 1.1);
  const sikaBags = Math.ceil(tileSqMWithWaste / 5);

  const handleAddCalculatedToCart = () => {
    const itemsToAdd: { product: Product; quantity: number }[] = [];

    if (calcType === 'suvaq') {
      const agdag = products.find((p) => p.name.includes('Ağdağ'));
      if (agdag) itemsToAdd.push({ product: agdag, quantity: agdagBags });
    } else if (calcType === 'boya') {
      const dyo = products.find((p) => p.name.includes('DYO'));
      if (dyo) itemsToAdd.push({ product: dyo, quantity: paintBuckets });
    } else if (calcType === 'kafel') {
      const tile = products.find((p) => p.name.includes('Kerama Marazzi'));
      const sika = products.find((p) => p.name.includes('Sika'));
      if (tile) itemsToAdd.push({ product: tile, quantity: tileSqMWithWaste });
      if (sika) itemsToAdd.push({ product: sika, quantity: sikaBags });
    }

    if (itemsToAdd.length > 0) {
      onAddMultipleToCart(itemsToAdd);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }
  };

  return (
    <section id="calculator" className="py-12 sm:py-20 border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5E1E] mb-2">
            <Calculator className="w-4 h-4 text-[#FF5E1E]" />
            Ağıllı Təmir Kalkulyatoru
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tikinti Materiallarını Dəqiq Hesabla
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Artıq və ya əskik material almaqdan qorxmayın. Sahəni daxil edin, sistem sizə lazım olan miqdarı və dəyəri hesablasın.
          </p>
        </div>

        {/* Calculator Widget Card */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          
          {/* Mode Switcher */}
          <div className="flex p-1.5 bg-[#0F1115] rounded-2xl mb-8 max-w-md mx-auto border border-white/5">
            <button
              onClick={() => setCalcType('suvaq')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calcType === 'suvaq' ? 'bg-[#FF5E1E] text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Suvaq (Ağdağ)
            </button>
            <button
              onClick={() => setCalcType('boya')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calcType === 'boya' ? 'bg-[#FF5E1E] text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Boya & Emulsiya
            </button>
            <button
              onClick={() => setCalcType('kafel')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calcType === 'kafel' ? 'bg-[#FF5E1E] text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kafel & Yapışdırıcı
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                  <span>Təmir sahəsi (kvadrat metr):</span>
                  <span className="text-[#FF5E1E] font-bold tabular-nums">{areaSqM} m²</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={areaSqM}
                  onChange={(e) => setAreaSqM(Number(e.target.value))}
                  className="w-full accent-[#FF5E1E] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5 m²</span>
                  <span>150 m²</span>
                  <span>300 m²</span>
                </div>
              </div>

              {calcType === 'suvaq' && (
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                    <span>Orta suvaq qatı qalınlığı:</span>
                    <span className="text-[#FF5E1E] font-bold tabular-nums">{thicknessMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={thicknessMm}
                    onChange={(e) => setThicknessMm(Number(e.target.value))}
                    className="w-full accent-[#FF5E1E] bg-white/10 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>5 mm (Nazik)</span>
                    <span>15 mm (Standart)</span>
                    <span>30 mm (Qalın)</span>
                  </div>
                </div>
              )}

              {calcType === 'boya' && (
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                    <span>Rəngləmə qatlarının sayı:</span>
                    <span className="text-[#FF5E1E] font-bold tabular-nums">{coatCount} qat</span>
                  </div>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCoatCount(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          coatCount === num
                            ? 'bg-[#FF5E1E] border-[#FF5E1E] text-white'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {num} Qat
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {calcType === 'kafel' && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white">Avtomatik ehtiyat payı:</div>
                  <p className="text-slate-400">
                    Künc kəsimləri və sınıqlar üçün hesablamaya +10% ehtiyat kafel əlavə olunub.
                  </p>
                </div>
              )}
            </div>

            {/* Output Calculation Result Box */}
            <div className="bg-[#10131B] rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Hesablanmış Tələbat:
              </div>

              {calcType === 'suvaq' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-200">Ağdağ Direk Suvaq 30 kq:</span>
                    <span className="text-lg font-bold text-white tabular-nums">{agdagBags} kisə</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-200">Təxmini ümumi çəki:</span>
                    <span className="text-sm font-semibold text-slate-400 tabular-nums">{(agdagBags * 30)} kq</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm text-slate-200 font-semibold">Təxmini büdcə:</span>
                    <span className="text-xl font-extrabold text-[#FF5E1E] tabular-nums">{(agdagBags * 5.60).toFixed(2)} ₼</span>
                  </div>
                </div>
              )}

              {calcType === 'boya' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-200">DYO İpək Mat Boya (15L):</span>
                    <span className="text-lg font-bold text-white tabular-nums">{paintBuckets} böyük vedrə</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-200">Tələb olunan xalis boya:</span>
                    <span className="text-sm font-semibold text-slate-400 tabular-nums">{paintLiters} Litr</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm text-slate-200 font-semibold">Təxmini büdcə:</span>
                    <span className="text-xl font-extrabold text-[#FF5E1E] tabular-nums">{(paintBuckets * 68.00).toFixed(2)} ₼</span>
                  </div>
                </div>
              )}

              {calcType === 'kafel' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-200">Kermoqranit plitə (ehtiyatla):</span>
                    <span className="text-lg font-bold text-white tabular-nums">{tileSqMWithWaste} m²</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-200">Sika kafel yapışdırıcısı:</span>
                    <span className="text-sm font-semibold text-slate-400 tabular-nums">{sikaBags} kisə (25 kq)</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm text-slate-200 font-semibold">Təxmini büdcə:</span>
                    <span className="text-xl font-extrabold text-[#FF5E1E] tabular-nums">
                      {(tileSqMWithWaste * 38.50 + sikaBags * 7.90).toFixed(2)} ₼
                    </span>
                  </div>
                </div>
              )}

              {/* Single Click Add to Cart Action */}
              <button
                onClick={handleAddCalculatedToCart}
                className={`w-full mt-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF5E1E] hover:bg-[#FF6B00] text-white shadow-lg shadow-[#FF5E1E]/25'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Materiallar səbətə əlavə olundu!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Bu materialları səbətə əlavə et</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
