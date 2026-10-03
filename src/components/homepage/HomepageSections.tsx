import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Search,
  User,
  Heart,
  ShoppingBag,
  ArrowRight,
  Star,
  X,
  Menu,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Product } from '../../types/product';

export interface SectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  onSelectCategory?: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  cartCount?: number;
}

/* ========================================================================= */
/* 01. TOP ANNOUNCEMENT STRIP                                                */
/* ========================================================================= */

export const TechNovaAnnouncementBar: React.FC = () => {
  return (
    <div
      id="clinza-announcement-bar"
      className="bg-[#111827] text-white h-[36px] px-4 flex items-center justify-center text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase select-none border-b border-slate-800"
    >
      <div className="flex items-center gap-2">
        <span className="text-blue-400 font-bold">FREE DELIVERY:</span>
        <span>Orders Over ₹999</span>
        <span className="text-slate-500 hidden sm:inline" aria-hidden="true">•</span>
        <span className="hidden sm:inline">1-Year Warranty on All Electronics</span>
        <span className="text-slate-500 hidden md:inline" aria-hidden="true">•</span>
        <span className="hidden md:inline">COD Available Across India</span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 02. COMPACT PRODUCTION ECOMMERCE HEADER                                  */
/* Row 1: CLINZA Logo | Search Bar | Account | Wishlist | Cart               */
/* Row 2: Category Navigation Strip                                         */
/* ========================================================================= */

export const TechNovaHeader: React.FC<{
  cartCount?: number;
  wishlistCount?: number;
  activePage?: string;
  setActivePage?: (page: any) => void;
  onSelectCategory?: (category: string) => void;
  setIsCartOpen?: (open: boolean) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}> = ({
  cartCount = 0,
  wishlistCount = 0,
  setActivePage,
  onSelectCategory,
  setIsCartOpen,
  searchQuery = '',
  setSearchQuery,
}) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const mainCategories = [
    { label: 'Smartwatches', category: 'smartwatches' },
    { label: 'Earbuds', category: 'tws-earbuds' },
    { label: 'Headphones', category: 'headphones' },
    { label: 'Watches', category: 'analog-watches' },
    { label: 'Speakers', category: 'speakers' },
    { label: 'Chargers & Power', category: 'chargers' },
    { label: 'Accessories', category: 'mobile-accessories' },
    { label: 'Combos & Deals', category: 'combos', isSpecial: true },
  ];

  const handleCategoryClick = (cat: string) => {
    setActivePage?.('collection');
    onSelectCategory?.(cat);
    setIsNavDrawerOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage?.('search');
    }
  };

  return (
    <>
      <header
        id="clinza-global-header"
        className="w-full sticky top-0 z-40 bg-white border-b border-gray-200 font-sans shadow-xs"
      >
        {/* TOP ANNOUNCEMENT BAR */}
        <TechNovaAnnouncementBar />

        {/* ROW 1: Logo | Search | Actions */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNavDrawerOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActivePage?.('store');
                onSelectCategory?.('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer text-left py-1"
              aria-label="CLINZA Homepage"
            >
              <span className="text-xl sm:text-2xl font-black tracking-widest text-gray-900 uppercase">
                CLINZA
              </span>
            </button>
          </div>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                placeholder="Search smartwatches, earbuds, headphones, chargers..."
                className="w-full h-10 pl-10 pr-20 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-md transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Action Icons: Account | Wishlist | Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActivePage?.('contact')}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline">Account</span>
            </button>

            <button
              onClick={() => {
                onSelectCategory?.('all');
                setActivePage?.('collection');
              }}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors relative flex items-center gap-1 text-xs font-semibold"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden xl:inline">Wishlist</span>
            </button>

            <button
              onClick={() => setIsCartOpen?.(true)}
              className="p-2 text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors relative flex items-center gap-1.5 text-xs font-bold"
              aria-label={`Cart with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Row */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery?.(e.target.value)}
              placeholder="Search electronics & accessories..."
              className="w-full h-9 pl-9 pr-16 bg-gray-50 border border-gray-300 rounded-md text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-gray-900 text-white text-[11px] font-semibold rounded"
            >
              Go
            </button>
          </form>
        </div>

        {/* ROW 2: Category Navigation Strip (Desktop) */}
        <nav className="hidden lg:block border-t border-gray-100 bg-gray-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-6">
              {mainCategories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat.category)}
                  className={`py-1.5 transition-colors cursor-pointer hover:text-blue-600 ${
                    cat.isSpecial ? 'text-blue-600 font-bold' : 'text-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-gray-500 text-[11px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Genuine Tech
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                Fast Dispatch Across India
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE DRAWER NAVIGATION */}
      {isNavDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsNavDrawerOpen(false)}
          />

          <aside className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-xl font-black tracking-widest text-gray-900 uppercase">
                  CLINZA
                </span>
                <button
                  onClick={() => setIsNavDrawerOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-900 rounded-md"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 px-2">
                  Electronics Categories
                </span>
                {mainCategories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => handleCategoryClick(cat.category)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-3 text-xs text-gray-600">
              <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                <span className="font-bold text-gray-900 block">Customer Helpline</span>
                <p>+91 800-CLINZA (Mon-Sat, 9AM-7PM)</p>
                <p className="text-[11px] text-gray-500">support@clinza.com</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export const ClinzaHeader = TechNovaHeader;

/* ========================================================================= */
/* 03. COMPACT COMMERCIAL HERO BANNER                                        */
/* ========================================================================= */

export const TechNovaHeroSection: React.FC<{
  onAddToCart?: (product: Product, quantity?: number) => void;
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  return (
    <section aria-label="Electronics Hero Banner" className="w-full bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/30 border border-blue-500/40 rounded-full text-blue-400 text-xs font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 fill-blue-400" />
              <span>TRENDING CONSUMER ELECTRONICS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              ELEVATE YOUR EVERYDAY TECH
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Discover AMOLED smartwatches with Bluetooth calling, 42dB hybrid active noise cancellation earbuds, 65W GaN ultra-fast charging adapters, and heavy-duty mobile gear.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectCategory?.('all')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2"
              >
                <span>SHOP BEST SELLERS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectCategory?.('smartwatches')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
              >
                EXPLORE SMARTWATCHES
              </button>
            </div>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                1-Year Replacement Warranty
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Truck className="w-4 h-4 text-blue-400" />
                Free Express Delivery Over ₹999
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                COD Available
              </span>
            </div>
          </div>

          {/* Right Product Spotlight Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-800 shadow-2xl p-6 text-center">
              <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-md uppercase">
                43% OFF
              </div>
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                alt="CLINZA Apex Ultra Smartwatch"
                className="w-full h-64 sm:h-72 object-contain mx-auto filter drop-shadow-xl"
              />
              <div className="mt-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  FLAGSHIP SMARTWATCH
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  CLINZA Apex Ultra AMOLED Watch
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-white">₹3,999</span>
                  <span className="text-sm text-slate-400 line-through">₹6,999</span>
                  <span className="text-xs text-emerald-400 font-bold">Save ₹3,000</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const ClinzaHeroSection = TechNovaHeroSection;

/* ========================================================================= */
/* 04. TRUST & VALUE STRIP                                                   */
/* ========================================================================= */

export const TechNovaTrustBar: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: '1-Year Warranty',
      subtitle: 'Guaranteed replacement support',
    },
    {
      icon: RotateCcw,
      title: '7-Day Replacement',
      subtitle: 'Hassle-free doorstep service',
    },
    {
      icon: Truck,
      title: 'Free Express Shipping',
      subtitle: 'Complimentary on orders > ₹999',
    },
    {
      icon: Zap,
      title: '100% Certified Tech',
      subtitle: 'Tested for peak performance',
    },
  ];

  return (
    <section aria-label="Trust Benefits" className="w-full bg-gray-50 border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    {b.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {b.subtitle}
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

export const ClinzaTrustStrip = TechNovaTrustBar;

/* ========================================================================= */
/* 05. POPULAR ELECTRONICS CATEGORIES STRIP                                  */
/* ========================================================================= */

export const TechNovaCategorySection: React.FC<{
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'smartwatches',
      name: 'Smartwatches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      tag: 'AMOLED & GPS',
    },
    {
      id: 'tws-earbuds',
      name: 'TWS Earbuds',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
      tag: '42dB ANC',
    },
    {
      id: 'headphones',
      name: 'Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      tag: 'Studio Sound',
    },
    {
      id: 'chargers',
      name: 'Fast Chargers',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80',
      tag: '65W GaN',
    },
    {
      id: 'speakers',
      name: 'Bluetooth Speakers',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80',
      tag: 'IPX7 Waterproof',
    },
    {
      id: 'combos',
      name: 'Tech Combos',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80',
      tag: 'Save up to 46%',
    },
  ];

  return (
    <section id="shop-by-category" aria-label="Shop By Category" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
            EXPLORE THE STORE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            POPULAR CATEGORIES
          </h2>
        </div>
        <button
          onClick={() => onSelectCategory?.('all')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory?.(cat.id)}
            className="group p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="aspect-square w-full rounded-lg bg-gray-50 overflow-hidden mb-3 relative flex items-center justify-center p-2">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-600 block">
                {cat.tag}
              </span>
              <h3 className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {cat.name}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

/* ========================================================================= */
/* 06. PRODUCT CARD COMPONENT                                                */
/* ========================================================================= */

export const TechNovaProductCard: React.FC<{
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  badgeOverride?: { text: string; type: any };
}> = ({
  product,
  onAddToCart,
  onSelectProduct,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all flex flex-col justify-between p-3.5 relative">
      {/* Top Badges & Wishlist Heart */}
      <div className="flex items-center justify-between w-full mb-2">
        {product.discount ? (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">
            {product.discount}
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isWishlisted
              ? 'text-red-500 bg-red-50'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div
        onClick={() => onSelectProduct?.(product)}
        className="aspect-square w-full rounded-lg bg-gray-50 overflow-hidden relative cursor-pointer flex items-center justify-center p-3 mb-3"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Meta: Category, Title, Rating */}
      <div className="text-left space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
          {product.category}
        </span>
        <h3
          onClick={() => onSelectProduct?.(product)}
          className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer leading-snug"
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-600 pt-0.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-gray-900">{product.rating}</span>
          <span className="text-gray-400">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Price & Add to Bag */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product, 1)}
          className="px-3 py-1.5 bg-gray-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 07. BEST SELLERS SECTION                                                  */
/* ========================================================================= */

export const TechNovaBestSellersSection: React.FC<SectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onSelectCategory,
  onSelectProduct,
  wishlistIds = [],
  onToggleWishlist,
}) => {
  const displayProducts = products.slice(0, 5);

  return (
    <section id="best-sellers" aria-label="Best Sellers" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
            TOP RATED
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            BEST SELLERS
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            India's most popular smartwatches, ANC earbuds, and charging stations.
          </p>
        </div>

        <button
          onClick={() => onSelectCategory?.('all')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          View All Products <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {displayProducts.map((p) => (
          <TechNovaProductCard
            key={p.id}
            product={p}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
            isWishlisted={wishlistIds.includes(p.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export const ClinzaFeaturedCombosSection = TechNovaBestSellersSection;

/* ========================================================================= */
/* 08. CURATED TECH PROMO SPLIT BANNER                                       */
/* ========================================================================= */

export const TechNovaFeaturedPromoSection: React.FC<{
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  return (
    <section aria-label="Tech Promotion" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Banner 1: Audio */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="px-2.5 py-1 bg-blue-500/30 text-blue-300 text-[10px] font-extrabold uppercase rounded-md tracking-wider">
              SAVE UP TO 54%
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Flagship Wireless Audio
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              42dB hybrid active noise cancellation with custom titanium bass drivers.
            </p>
          </div>
          <div className="pt-4 z-10">
            <button
              onClick={() => onSelectCategory?.('tws-earbuds')}
              className="px-4 py-2 bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              Shop Earbuds <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Banner 2: Fast Charging & Power */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-gray-900 text-white rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-300 text-[10px] font-extrabold uppercase rounded-md tracking-wider">
              FAST CHARGING ESSENTIALS
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              65W GaN III &amp; 20,000mAh
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              Pocket-sized power bricks capable of charging laptops and smartphones concurrently.
            </p>
          </div>
          <div className="pt-4 z-10">
            <button
              onClick={() => onSelectCategory?.('chargers')}
              className="px-4 py-2 bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              Shop Chargers <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export const ClinzaPromotionsSection = TechNovaFeaturedPromoSection;

/* ========================================================================= */
/* 09. NEW ARRIVALS SECTION                                                  */
/* ========================================================================= */

export const TechNovaNewArrivalsSection: React.FC<SectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onSelectCategory,
  onSelectProduct,
  wishlistIds = [],
  onToggleWishlist,
}) => {
  const displayProducts = products.slice(5, 10);

  return (
    <section id="new-arrivals" aria-label="New Arrivals" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
            JUST IN
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            NEW ARRIVALS
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            The latest gadgets, smart wearables, and mobile accessories.
          </p>
        </div>

        <button
          onClick={() => onSelectCategory?.('all')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {displayProducts.map((p) => (
          <TechNovaProductCard
            key={p.id}
            product={p}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
            isWishlisted={wishlistIds.includes(p.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export const ClinzaNewArrivalsSection = TechNovaNewArrivalsSection;

/* ========================================================================= */
/* 10. NEWSLETTER STRIP                                                      */
/* ========================================================================= */

export const TechNovaNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section aria-label="Newsletter" className="w-full bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-xl mx-auto px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
          SUBSCRIBE FOR DEALS
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900">
          Get VIP Offers &amp; Launch Alerts
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Receive exclusive discounts, coupon codes, and gadget announcements directly to your inbox.
        </p>

        <div className="mt-5">
          {subscribed ? (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Use promo code <strong>CLINZA10</strong> for 10% off your first order.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 h-10 px-3 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export const ClinzaFinalCtaSection = TechNovaNewsletterSection;

/* ========================================================================= */
/* 11. FOOTER                                                                */
/* ========================================================================= */

export const TechNovaFooter: React.FC<{
  setActivePage?: (page: any) => void;
  onSelectCategory?: (category: string) => void;
}> = ({ setActivePage, onSelectCategory }) => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 font-sans pt-12 pb-8 border-t border-gray-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          
          {/* Brand info */}
          <div className="space-y-3">
            <span className="text-xl font-black tracking-widest text-white uppercase block">
              CLINZA
            </span>
            <p className="text-gray-400 leading-relaxed">
              India's trending electronics destination for certified smartwatches, true wireless earbuds, high-power GaN chargers, and premium mobile accessories.
            </p>
            <div className="pt-2 text-gray-400">
              <p className="font-semibold text-white">Customer Support:</p>
              <p>support@clinza.com</p>
              <p>+91 800-CLINZA (Mon-Sat, 9AM-7PM)</p>
            </div>
          </div>

          {/* Electronics Categories */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase">
              POPULAR CATEGORIES
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('collection');
                    onSelectCategory?.('smartwatches');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Smartwatches
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('collection');
                    onSelectCategory?.('tws-earbuds');
                  }}
                  className="hover:text-white transition-colors"
                >
                  TWS Earbuds
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('collection');
                    onSelectCategory?.('headphones');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Headphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('collection');
                    onSelectCategory?.('chargers');
                  }}
                  className="hover:text-white transition-colors"
                >
                  65W GaN Chargers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('collection');
                    onSelectCategory?.('power-banks');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Power Banks
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => setActivePage?.('shipping')} className="hover:text-white transition-colors">
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage?.('returns')} className="hover:text-white transition-colors">
                  7-Day Replacement Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage?.('warranty')} className="hover:text-white transition-colors">
                  1-Year Warranty Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage?.('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage?.('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase">
              CLINZA ASSURANCE
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Every device is covered by our 1-Year Brand Replacement Warranty and tested for peak Indian electrical standards.
            </p>
            <div className="pt-2 text-gray-400 space-y-1">
              <p>✔ 100% Secure Checkout</p>
              <p>✔ Cash on Delivery Available</p>
              <p>✔ Pan-India Express Dispatch</p>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-[11px]">
          <div>
            &copy; 2026 CLINZA Electronics Pvt Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>UPI</span>
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>NET BANKING</span>
            <span>CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const ClinzaFooter = TechNovaFooter;

/* ========================================================================= */
/* 12. MASTER REDESIGNED HOMEPAGE SEQUENCE                                   */
/* ========================================================================= */

export const NCFRedesignedHomepageSequence: React.FC<{
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
  cartCount?: number;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}> = ({
  products,
  onAddToCart,
  onQuickView,
  onSelectCategory,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
}) => {
  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      <TechNovaHeroSection
        onAddToCart={(p) => onAddToCart(p, 1)}
        onSelectCategory={onSelectCategory}
      />
      <TechNovaTrustBar />
      <TechNovaCategorySection onSelectCategory={onSelectCategory} />
      <TechNovaBestSellersSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onSelectCategory={onSelectCategory}
        onSelectProduct={onSelectProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
      />
      <TechNovaFeaturedPromoSection onSelectCategory={onSelectCategory} />
      <TechNovaNewArrivalsSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onSelectCategory={onSelectCategory}
        onSelectProduct={onSelectProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
      />
      <TechNovaNewsletterSection />
    </div>
  );
};

/* Compatibility Aliases */
export const CategorySliderSection: React.FC<{ onSelectCategory?: (category: string) => void }> = ({ onSelectCategory }) => (
  <TechNovaCategorySection onSelectCategory={onSelectCategory} />
);
export const ProductTabsSection: React.FC<SectionProps> = (props) => (
  <TechNovaBestSellersSection {...props} />
);
export const PromoBannerSection: React.FC<any> = () => null;
export const FeaturedCollectionsSection: React.FC<{ onSelectCategory?: (category: string) => void }> = ({ onSelectCategory }) => (
  <TechNovaFeaturedPromoSection onSelectCategory={onSelectCategory} />
);
export const BrandShowcaseSection: React.FC<any> = () => null;
export const TestimonialsSection: React.FC<any> = () => null;
export const AppleBentoGridSection: React.FC<any> = () => null;
export const AppleFabricExplorerSection: React.FC<any> = () => null;
export const AppleSmartFitFinderSection: React.FC<any> = () => null;
export const AppleLookbookSliderSection: React.FC<any> = () => null;
export const AppleCraftsmanshipAnatomySection: React.FC<any> = () => null;
export const FeastablesShopifyStorefrontSection: React.FC<any> = () => null;
