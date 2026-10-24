import React, { useState } from 'react';
import {
  CATEGORIES,
  PRODUCTS,
  MASTERS
} from './data/mockData';
import { Product, Master, CartItem, ToastMessage } from './types';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductSection } from './components/ProductSection';
import { MastersSection } from './components/MastersSection';
import { CalculatorSection } from './components/CalculatorSection';
import { AppDownloadSection } from './components/AppDownloadSection';
import { Footer } from './components/Footer';
import { CatalogModal } from './components/CatalogModal';
import { ProductModal } from './components/ProductModal';
import { MasterBookingModal } from './components/MasterBookingModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { LayoutGrid, User, ShoppingCart, Calculator, Users } from 'lucide-react';

export default function App() {
  // State
  const [cart, setCart] = useState<CartItem[]>([
    // Pre-populate with 2 popular items so the cart demo is immediately rich and interactive
    { product: PRODUCTS[0], quantity: 4 }, // Ağdağ Direk
    { product: PRODUCTS[1], quantity: 2 }, // SikaCeram
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast(
      'Səbətə əlavə olundu',
      `${product.name} (${quantity} ${product.unit}) uğurla səbətinizə əlavə edildi.`,
      'success'
    );
  };

  const handleAddMultipleToCart = (itemsToAdd: { product: Product; quantity: number }[]) => {
    setCart((prev) => {
      let updated = [...prev];
      itemsToAdd.forEach(({ product, quantity }) => {
        const idx = updated.findIndex((i) => i.product.id === product.id);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        } else {
          updated.push({ product, quantity });
        }
      });
      return updated;
    });

    addToast(
      'Materiallar səbətə əlavə olundu',
      `${itemsToAdd.length} adda hesablanmış material səbətinizə köçürüldü.`,
      'success'
    );
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    addToast('Məhsul silindi', 'Məhsul səbətdən xaric edildi.', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderSuccess = (orderId: string) => {
    addToast(
      'Sifarişiniz təsdiqləndi!',
      `Sifariş № ${orderId}. Əməliyyatçımız 10 dəqiqə ərzində sizinlə əlaqə saxlayacaq.`,
      'success'
    );
  };

  const handleSubmitBooking = (bookingData: {
    masterName: string;
    clientName: string;
    clientPhone: string;
    serviceType: string;
    date: string;
  }) => {
    addToast(
      'Usta sorğusu qəbul edildi',
      `${bookingData.masterName} üçün müraciətiniz qeydə alındı. Usta sizinlə əlaqə saxlayacaq.`,
      'success'
    );
  };

  const handleLoginSuccess = (userName: string) => {
    setUser(userName);
    addToast(
      'Xoş gəlmisiniz!',
      `${userName} olaraq sistemə uğurla daxil oldunuz.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1115] text-slate-100 selection:bg-[#FF5E1E] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(p) => setSelectedProduct(p)}
        products={PRODUCTS}
      />

      <main className="flex-1">
        {/* Hero Slider & Promotions */}
        <HeroSlider
          onOpenCatalog={() => setIsCatalogOpen(true)}
          onExploreMasters={() => {
            const el = document.getElementById('masters');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Categories Visual Grid */}
        <CategoryGrid
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={(slug) => {
            setActiveCategory(slug);
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Discounted Products & Catalog Grid */}
        <ProductSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* Masters Marketplace */}
        <MastersSection
          masters={MASTERS}
          onSelectMaster={(m) => setSelectedMaster(m)}
        />

        {/* Interactive Material Calculator */}
        <CalculatorSection
          products={PRODUCTS}
          onAddMultipleToCart={handleAddMultipleToCart}
        />

        {/* App Download Showcase */}
        <AppDownloadSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Mobile Sticky Quick Navigation Bar (Complies with 15% Mobile Sticky Cap) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F1115]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2 flex items-center justify-around text-[10px] text-slate-400">
        <button
          onClick={() => setIsCatalogOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-[#FF5E1E] transition-colors"
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Kataloq</span>
        </button>

        <a
          href="#masters"
          className="flex flex-col items-center gap-1 hover:text-[#FF5E1E] transition-colors"
        >
          <Users className="w-5 h-5 text-[#FF5E1E]" />
          <span>Ustalar</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 hover:text-[#FF5E1E] transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#FF5E1E] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          )}
          <span>Səbət</span>
        </button>

        <a
          href="#calculator"
          className="flex flex-col items-center gap-1 hover:text-[#FF5E1E] transition-colors"
        >
          <Calculator className="w-5 h-5" />
          <span>Hesabla</span>
        </a>

        <button
          onClick={() => setIsAuthOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-[#FF5E1E] transition-colors"
        >
          <User className="w-5 h-5" />
          <span>{user ? 'Kabinet' : 'Profil'}</span>
        </button>
      </nav>

      {/* Modals & Drawers */}
      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        categories={CATEGORIES}
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <MasterBookingModal
        master={selectedMaster}
        onClose={() => setSelectedMaster(null)}
        onSubmitBooking={handleSubmitBooking}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Global Toast Stack */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}
