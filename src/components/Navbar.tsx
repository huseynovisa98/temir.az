import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  LayoutGrid,
  Percent,
  Calculator,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenCatalog: () => void;
  onOpenAuth: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenCatalog,
  onOpenAuth,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  products,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products for instant search dropdown preview
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[#0F1115]/90 backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-[#0F1115] border-b border-white/5'
    }`}>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#161920] border-b border-white/5 text-xs text-slate-400 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF5E1E]"></span>
              <span>Bakı və Abşeron üzrə 2 saatda operativ çatdırılma</span>
            </span>
            <span className="hidden md:inline text-slate-600">/</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF5E1E]" />
              <span>3,500+ Yoxlanılmış sertifikatlı usta</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:*1818"
              className="flex items-center gap-1.5 text-[#FF5E1E] font-semibold hover:underline"
            >
              <Phone className="w-3 h-3" />
              <span>Qaynar xətt: *1818</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">AZN ₼</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E1E] to-[#FF8C00] flex items-center justify-center shadow-lg shadow-[#FF5E1E]/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-white text-xl tracking-tighter">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
                temir<span className="text-[#FF5E1E]">.az</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-1 hidden sm:block">
                Tikinti & Ustalar
              </span>
            </div>
          </a>

          {/* Catalog Button */}
          <button
            onClick={onOpenCatalog}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#FF5E1E] hover:bg-[#FF6B00] text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#FF5E1E]/25 hover:shadow-[#FF5E1E]/40 active:scale-95 shrink-0"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Kataloq</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* Search Bar with live autocomplete */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xl hidden md:block">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="15,000+ material, brend və ya usta axtar (məs: Ağdağ, Knauf, sement)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-[#161920] border border-white/10 hover:border-white/20 focus:border-[#FF5E1E] text-sm text-slate-100 rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-white text-xs p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Dropdown Suggestions */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 glass-dropdown rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                      Tapılan Məhsullar ({searchResults.length})
                    </div>
                    <div className="divide-y divide-white/5">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            onSelectProduct(item);
                            setSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-lg bg-slate-800 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-200 group-hover:text-[#FF5E1E] truncate transition-colors">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <span>{item.brand}</span>
                              <span>·</span>
                              <span>{item.category}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-sm font-bold text-white tabular-nums">
                              {item.price.toFixed(2)} ₼
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/5 px-2 flex justify-between items-center text-xs text-slate-400">
                      <span>Bütün nəticələri görmək üçün Enter basın</span>
                      <a
                        href="#products"
                        onClick={() => setSearchFocused(false)}
                        className="text-[#FF5E1E] hover:underline font-medium flex items-center gap-1"
                      >
                        Bütün kataloq <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : searchQuery.trim().length > 1 ? (
                  <div className="p-4 text-center text-slate-400 text-sm">
                    "{searchQuery}" üzrə məhsul tapılmadı. Zəhmət olmasa başqa açar söz yoxlayın.
                  </div>
                ) : (
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF5E1E]" />
                      <span>Tez-tez axtarılanlar</span>
                    </div>
                    <div className="flex flex-wrap gap-2 p-2">
                      {['Ağdağ Direk', 'Sika kafel yapışdırıcısı', 'Holcim sement', 'Knauf alçıpan', 'DYO boya', 'Santexnik Bakı', 'Perforator Bosch'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSearchQuery(tag);
                          }}
                          className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Links & Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Masters Direct Link */}
            <a
              href="#masters"
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-[#FF5E1E] transition-colors px-2 py-1.5"
            >
              <span>Bütün ustalar</span>
            </a>

            {/* Discounts Link */}
            <a
              href="#products"
              className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-[#FF5E1E] transition-colors px-2 py-1.5"
            >
              <Percent className="w-3.5 h-3.5 text-[#FF5E1E]" />
              <span>Endirimlər</span>
            </a>

            {/* Material Calculator Link */}
            <a
              href="#calculator"
              className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-[#FF5E1E] transition-colors px-2 py-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-slate-400" />
              <span>Kalkulyator</span>
            </a>

            {/* Profile / Login */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-slate-300 hover:text-white bg-[#161920] hover:bg-[#1C212B] border border-white/10 transition-colors text-sm font-medium"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Daxil ol</span>
            </button>

            {/* Cart Button with Counter */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#1C212B] hover:bg-[#252B38] border border-white/10 text-white transition-all group"
              aria-label="Səbət"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#FF5E1E] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-[#FF5E1E] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0F1115] tabular-nums animate-in zoom-in-50 duration-200">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-[11px] text-slate-400">Səbət</span>
                <span className="text-xs font-bold text-white tabular-nums">
                  {cartTotal.toFixed(2)} ₼
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-300 hover:text-white rounded-lg bg-white/5"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Material, brend və ya usta axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161920] border border-white/10 text-sm text-slate-100 rounded-xl pl-10 pr-4 py-2 outline-none"
            />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 glass-dropdown rounded-2xl border border-white/10 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCatalog();
              }}
              className="flex items-center justify-between p-2.5 bg-[#FF5E1E] text-white rounded-xl font-semibold text-sm"
            >
              <span className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" /> Bütün Məhsul Kataloqu
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#masters"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 text-slate-200 hover:bg-white/5 rounded-xl font-medium text-sm"
            >
              <User className="w-4 h-4 text-[#FF5E1E]" />
              <span>Bütün Peşəkar Ustalar</span>
            </a>

            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 text-slate-200 hover:bg-white/5 rounded-xl font-medium text-sm"
            >
              <Percent className="w-4 h-4 text-[#FF5E1E]" />
              <span>Endirimli Məhsullar</span>
            </a>

            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 text-slate-200 hover:bg-white/5 rounded-xl font-medium text-sm"
            >
              <Calculator className="w-4 h-4 text-[#FF5E1E]" />
              <span>Təmir və Material Kalkulyatoru</span>
            </a>

            <a
              href="#app-download"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 text-slate-200 hover:bg-white/5 rounded-xl font-medium text-sm"
            >
              <Sparkles className="w-4 h-4 text-[#FF5E1E]" />
              <span>Mobil Tətbiqi Yüklə</span>
            </a>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <a href="tel:*1818" className="text-[#FF5E1E] font-bold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Qaynar xətt: *1818
              </a>
              <span>Bakı, Azərbaycan</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
