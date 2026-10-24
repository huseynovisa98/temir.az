import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, Clock, Wrench } from 'lucide-react';
import { PROMO_SLIDES, TRUST_STATS } from '../data/mockData';

interface HeroSliderProps {
  onOpenCatalog: () => void;
  onExploreMasters: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenCatalog,
  onExploreMasters,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = PROMO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden pt-4 pb-8 lg:pt-6 lg:pb-12">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#FF5E1E]/15 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Hero Slider Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#141720]">
          
          {/* Background Image with dark overlay */}
          <div className="relative h-[480px] sm:h-[420px] lg:h-[460px] w-full">
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.38] contrast-125 transition-all duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Industrial Diagonal Pattern Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/85 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent z-10" />

            {/* Content Overlay */}
            <div className="relative z-20 h-full flex flex-col justify-center max-w-2xl px-6 sm:px-12 py-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF5E1E]/20 text-[#FF5E1E] border border-[#FF5E1E]/40">
                  {slide.badge}
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {slide.highlight}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 line-clamp-3 mb-6 font-normal leading-relaxed max-w-xl">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white font-bold text-sm shadow-lg shadow-[#FF5E1E]/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={currentSlide === 1 ? onExploreMasters : onOpenCatalog}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-md border border-white/10 transition-colors"
                >
                  {slide.secondaryCta}
                </button>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute right-6 bottom-6 z-20 flex items-center gap-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length)}
                className="w-10 h-10 rounded-xl bg-black/50 hover:bg-[#FF5E1E] text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Əvvəlki slayd"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % PROMO_SLIDES.length)}
                className="w-10 h-10 rounded-xl bg-black/50 hover:bg-[#FF5E1E] text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Növbəti slayd"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute left-6 sm:left-12 bottom-6 z-20 flex items-center gap-2">
              {PROMO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'w-8 bg-[#FF5E1E]' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Slayd ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Trust & KPI Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {TRUST_STATS.map((stat, i) => {
            const icons = [
              <Truck className="w-5 h-5 text-[#FF5E1E]" key="t" />,
              <Wrench className="w-5 h-5 text-[#FF5E1E]" key="w" />,
              <Clock className="w-5 h-5 text-[#FF5E1E]" key="c" />,
              <ShieldCheck className="w-5 h-5 text-[#FF5E1E]" key="s" />,
            ];

            return (
              <div
                key={i}
                className="glass-panel rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 transition-all hover:border-white/20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1C212B] border border-white/10 flex items-center justify-center shrink-0">
                  {icons[i % icons.length]}
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {stat.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
