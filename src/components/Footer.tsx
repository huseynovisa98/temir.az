import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCatalog: () => void;
  onSelectCategory: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCatalog,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-[#090A0E] text-slate-400 border-t border-white/5 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Contacts */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E1E] to-[#FF8C00] flex items-center justify-center shadow-lg shadow-[#FF5E1E]/20">
                <span className="font-extrabold text-white text-xl">T</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                temir<span className="text-[#FF5E1E]">.az</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Azərbaycanın ən böyük rəqəmsal tikinti materialları bazarı və peşəkar usta xidmətləri platforması. 15,000+ məhsul birbaşa istehsalçıdan və 3,500+ yoxlanılmış usta.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF5E1E]" />
                <a href="tel:*1818" className="hover:text-white transition-colors">
                  Qaynar xətt: <strong className="text-white">*1818</strong> və ya +994 (12) 500-18-18
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF5E1E]" />
                <span>info@temir.az / sales@temir.az</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF5E1E]" />
                <span>Bakı ş., Heydər Əliyev pr. 115, Təmir Mərkəzi</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF5E1E]" />
                <span>Hər gün: 08:00 - 21:00 (Sifarişlər 24/7 qəbul olunur)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Material Kataloqu */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Material Kataloqu
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('quru-qarisiglar')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Quru qarışıqlar (Ağdağ, suvaq)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kasi-keramika')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Kaşı və kermoqranit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('boyalar-laklar')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Boyalar və emulsiya
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('santexnika')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Santexnika və borular
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('elektrik')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Elektrik və naqillər
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('aletler')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  Alətlər və avadanlıqlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('izolasiya')}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  İstilik və hidroizolyasiya
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Usta Xidmətləri */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Usta Xidmətləri
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#masters" className="hover:text-white hover:underline transition-colors">
                  Elektrik ustası sifarişi
                </a>
              </li>
              <li>
                <a href="#masters" className="hover:text-white hover:underline transition-colors">
                  Santexnik və istipol ustası
                </a>
              </li>
              <li>
                <a href="#masters" className="hover:text-white hover:underline transition-colors">
                  Rəngsaz və aboy ustası
                </a>
              </li>
              <li>
                <a href="#masters" className="hover:text-white hover:underline transition-colors">
                  Kafel və kermoqranit ustası
                </a>
              </li>
              <li>
                <a href="#masters" className="hover:text-white hover:underline transition-colors">
                  Alçıpan və asma tavan ustası
                </a>
              </li>
              <li>
                <a href="#masters" className="hover:text-white hover:underline transition-colors">
                  Açar təhvili təmir briqadası
                </a>
              </li>
              <li>
                <a href="#masters" className="hover:text-white hover:underline transition-colors">
                  Usta kimi qeydiyyatdan keç
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Müştəri Dəstəyi & Sosial */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Müştəri Xidməti
            </h4>
            <ul className="space-y-2 text-xs mb-6">
              <li>
                <a href="#calculator" className="hover:text-white hover:underline transition-colors">
                  Təmir material kalkulyatoru
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-colors">
                  Çatdırılma və ödəniş şərtləri
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-colors">
                  Geri qaytarma siyasəti (14 gün)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-colors">
                  Topdan satış və korporativ əməkdaşlıq
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-colors">
                  Məxfilik siyasəti
                </a>
              </li>
            </ul>

            {/* Social Media Links */}
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Bizi İzləyin
            </h5>
            <div className="flex items-center gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF5E1E] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF5E1E] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.6a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.86-4.48v-6.9a8.28 8.28 0 0 0 4.91 1.63V6.69z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF5E1E] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF5E1E] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 temir.az — Azərbaycanın №1 Tikinti və Usta Platforması.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Təhlükəsiz 3D Secure Ödənişlər
            </span>
            <span>·</span>
            <span className="text-slate-400">Bakı, Azərbaycan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
