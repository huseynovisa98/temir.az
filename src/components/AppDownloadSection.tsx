import React from 'react';
import { Smartphone, Download, QrCode, Sparkles, Check, ArrowRight } from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  return (
    <section id="app-download" className="py-12 sm:py-20 relative overflow-hidden">
      {/* Background radial accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF5E1E]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Copy & App Badges */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF5E1E]/20 text-[#FF5E1E] border border-[#FF5E1E]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mobil Tətbiq</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                temir.az Hər An Əlinizin Altında
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Tikinti obyektindən və ya evdən çıxmadan minlərlə materialı sifariş edin, ən yaxın sərbəst ustanı xəritədə tapın və sifariş statusunu real vaxtda izləyin.
              </p>

              {/* Feature bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>1 kliklə təkrar material sifarişi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Usta ilə daxili çatlarda birbaşa əlaqə</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Eksklüziv tətbiqdaxili 5-15% endirimlər</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>GPS vasitəsilə ünvana dəqiq çatdırılma</span>
                </div>
              </div>

              {/* Store Badges and QR code row */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {/* App Store Button */}
                <a
                  href="#app-download"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black hover:bg-neutral-900 border border-white/20 text-white transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.87.94-2.97-1 .04-2.15.67-2.82 1.45-.58.67-1.1 1.76-.96 2.83 1.11.09 2.21-.53 2.84-1.31z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase leading-none font-medium">Download on the</div>
                    <div className="text-sm font-bold leading-tight">App Store</div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#app-download"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black hover:bg-neutral-900 border border-white/20 text-white transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.347-.365-.544-.888-.544-1.488V3.302c0-.6.197-1.123.543-1.488zm11.235 11.238l2.25 2.25-10.74 6.202 8.49-8.452zm0-2.104L6.354 2.496l10.74 6.202-2.25 2.25zm1.539 1.052l3.418-1.973c.712-.411.712-1.085 0-1.496l-3.418-1.973-1.539 1.54 1.539 1.54z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase leading-none font-medium">GET IT ON</div>
                    <div className="text-sm font-bold leading-tight">Google Play</div>
                  </div>
                </a>

                {/* QR Code Quick Scan */}
                <div className="hidden sm:flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-black" />
                  </div>
                  <div className="leading-tight">
                    <span className="font-bold text-white block">QR Kodu oxudun</span>
                    <span className="text-[10px] text-slate-400">Dərhal yükləyin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Smartphone Showcase Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 rounded-[40px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border-4 border-slate-700">
                {/* Speaker Notch */}
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />

                {/* Screen Content */}
                <div className="rounded-[30px] overflow-hidden bg-[#0F1115] p-4 border border-white/10 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                    <span className="font-extrabold text-[#FF5E1E]">temir.az</span>
                    <span className="text-[10px] text-slate-400">Canlı Usta Xəritəsi</span>
                  </div>

                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-800 relative">
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=500&q=80"
                      alt="Usta Profili"
                      className="w-full h-full object-cover filter brightness-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md p-2 rounded-lg text-white text-[11px] flex justify-between items-center">
                      <div>
                        <div className="font-bold">Rəşad Ə. (Elektrik)</div>
                        <div className="text-[9px] text-emerald-400">Ünvana çatma: 18 dəq</div>
                      </div>
                      <span className="bg-[#FF5E1E] text-white px-2 py-0.5 rounded text-[10px] font-bold">Zəng et</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] space-y-1">
                    <div className="font-bold text-white flex justify-between">
                      <span>Sifariş №40822</span>
                      <span className="text-emerald-400">Yoldadır</span>
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Ağdağ Suvaq (10 kisə) + Sika Yapışdırıcı
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
