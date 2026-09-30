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
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { Product } from '../../types/product';

// High-Fidelity Editorial Fashion Assets
import heroLinenImg from '../../assets/images/hero_fashion_linen_campaign_1790526653470.jpg';
import catShirtsImg from '../../assets/images/category_fashion_shirts_1790526668270.jpg';
import catTrousersImg from '../../assets/images/category_fashion_trousers_1790526684261.jpg';
import catTshirtsImg from '../../assets/images/category_fashion_tshirts_1790526698324.jpg';
import catJeansImg from '../../assets/images/category_fashion_jeans_1790526713474.jpg';
import catCargosImg from '../../assets/images/category_fashion_cargos_1790526724254.jpg';
import promoModelImg from '../../assets/images/promo_fashion_model_editorial_1790526742239.jpg';
import campPremiumShirtsImg from '../../assets/images/campaign_card_premium_shirts_1790526757878.jpg';
import campEverydayEssentialsImg from '../../assets/images/campaign_card_everyday_essentials_1790526770630.jpg';
import campCheckedShirtsImg from '../../assets/images/campaign_card_checked_shirts_1790526785442.jpg';
import campCollectionTailoredImg from '../../assets/images/campaign_collection_tailored_1790527290618.jpg';

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
/* 01. TOP ANNOUNCEMENT BAR                                                  */
/* ========================================================================= */

export const TechNovaAnnouncementBar: React.FC = () => {
  return (
    <div
      id="technova-announcement-bar"
      className="bg-[#111111] text-white h-[36px] px-4 flex items-center justify-center text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase border-b border-neutral-800 select-none"
    >
      <div className="flex items-center gap-2">
        <span>COMPLIMENTARY SHIPPING ON ORDERS OVER ₹999</span>
        <span className="text-neutral-500 hidden sm:inline" aria-hidden="true">·</span>
        <span className="hidden sm:inline">EASY 7-DAY DOORSTEP EXCHANGES</span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 02. MINIMALIST STICKY HEADER & NAVIGATION                                 */
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
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  // Exact SNITCH Navigation Taxonomy
  const drawerCategories = [
    { label: 'New Arrivals', category: 'all', target: 'new-arrivals' },
    { label: 'Shirts', category: 'shirts', target: 'shop-by-category' },
    { label: 'T-Shirts', category: 'tshirts', target: 'shop-by-category' },
    { label: 'Trousers', category: 'bottomwear', target: 'shop-by-category' },
    { label: 'Jeans', category: 'jeans', target: 'shop-by-category' },
    { label: 'Cargos', category: 'cargos', target: 'shop-by-category' },
    { label: 'Collections', category: 'combos', target: 'collection-promo' },
    { label: 'Sale', category: 'all', target: 'promo-campaign', isSale: true },
  ];

  const handleCategoryClick = (cat: string, target?: string) => {
    setActivePage?.('store');
    onSelectCategory?.(cat);
    setIsNavDrawerOpen(false);
    if (target) {
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <>
      <header
        id="technova-global-header"
        className="w-full sticky top-0 z-40 bg-white border-b border-[#EAEAEA] font-sans transition-all duration-200"
      >
        {/* 1. TOP ANNOUNCEMENT BAR */}
        <TechNovaAnnouncementBar />

        {/* 2. MAIN HEADER BAR (76–90px Desktop Height, Pure White, Centered Logo) */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 h-[76px] sm:h-[84px] relative flex items-center justify-between">
          
          {/* LEFT ZONE: Minimalist Hamburger Menu & Quick Nav */}
          <div className="flex items-center gap-4 lg:gap-8 z-10">
            <button
              id="technova-hamburger-btn"
              onClick={() => setIsNavDrawerOpen(true)}
              className="p-2 -ml-2 text-[#111111] hover:text-[#555555] transition-colors cursor-pointer flex items-center gap-2 group"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.6]" />
              <span className="hidden xl:inline text-xs font-semibold uppercase tracking-[0.15em] text-[#111111] group-hover:text-[#555555] transition-colors">
                Menu
              </span>
            </button>

            {/* Optional Subtle Desktop Category Links */}
            <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold tracking-[0.15em] uppercase text-[#111111]">
              <button
                onClick={() => handleCategoryClick('shirts', 'shop-by-category')}
                className="hover:text-[#555555] transition-colors cursor-pointer py-1"
              >
                Shirts
              </button>
              <button
                onClick={() => handleCategoryClick('bottomwear', 'shop-by-category')}
                className="hover:text-[#555555] transition-colors cursor-pointer py-1"
              >
                Trousers
              </button>
              <button
                onClick={() => handleCategoryClick('tshirts', 'shop-by-category')}
                className="hover:text-[#555555] transition-colors cursor-pointer py-1"
              >
                T-Shirts
              </button>
              <button
                onClick={() => handleCategoryClick('combos', 'home')}
                className="hover:text-[#555555] transition-colors cursor-pointer py-1 text-[#B3262D]"
              >
                Linen Edit
              </button>
            </nav>
          </div>

          {/* CENTER ZONE: Bold, Uppercase Brand Logo (Mathematically Centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
            <button
              id="technova-brand-logo"
              onClick={() => {
                setActivePage?.('store');
                onSelectCategory?.('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer select-none text-center group py-2"
              aria-label="Home - CLINZA"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-[#111111] uppercase block transition-opacity group-hover:opacity-85">
                CLINZA
              </span>
            </button>
          </div>

          {/* RIGHT ZONE: Search, Account, Wishlist, Shopping Bag */}
          <div className="flex items-center gap-1.5 sm:gap-4 text-[#111111] z-10">
            {/* Search Box / Trigger */}
            {showSearchInput ? (
              <div className="relative flex items-center animate-in fade-in duration-200">
                <input
                  id="technova-search-input"
                  type="text"
                  placeholder="Search shirts, trousers, linen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActivePage?.('search');
                      setShowSearchInput(false);
                    }
                  }}
                  autoFocus
                  className="w-44 sm:w-60 text-xs px-3 py-2 pr-7 border-b border-[#111111] bg-transparent text-[#111111] placeholder-neutral-400 focus:outline-none tracking-wide"
                />
                <button
                  onClick={() => setShowSearchInput(false)}
                  className="absolute right-1 text-neutral-400 hover:text-[#111111] cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="technova-search-btn"
                onClick={() => setShowSearchInput(true)}
                className="p-2 hover:text-[#555555] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.6]" />
              </button>
            )}

            {/* Account Icon (Desktop & Tablet) */}
            <button
              id="technova-account-btn"
              onClick={() => setActivePage?.('contact')}
              className="p-2 hover:text-[#555555] transition-colors cursor-pointer hidden sm:flex"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* Wishlist Heart Icon (Desktop & Tablet) */}
            <button
              id="technova-wishlist-btn"
              onClick={() => {
                setActivePage?.('store');
                const el = document.getElementById('best-sellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 hover:text-[#555555] transition-colors cursor-pointer relative hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.6]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B3262D]" />
              )}
            </button>

            {/* Shopping Bag Icon with Live Cart Count */}
            <button
              id="technova-cart-btn"
              onClick={() => setIsCartOpen?.(true)}
              className="p-2 hover:text-[#555555] transition-colors cursor-pointer relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#111111] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* EXPANDABLE NAVIGATION DRAWER (Slide in from Left) */}
      {isNavDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setIsNavDrawerOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <aside className="absolute inset-y-0 left-0 max-w-sm w-full bg-white shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EAEAEA]">
                <span className="text-xl font-black tracking-[0.25em] text-[#111111] uppercase">
                  CLINZA
                </span>
                <button
                  onClick={() => setIsNavDrawerOpen(false)}
                  className="p-2 text-neutral-400 hover:text-[#111111] transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5 stroke-[1.6]" />
                </button>
              </div>

              {/* Exact Categories Ordered according to SNITCH Spec */}
              <div className="py-6 space-y-1">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">
                  SHOP BY CATEGORY
                </span>
                {drawerCategories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => handleCategoryClick(cat.category, cat.target)}
                    className={`w-full text-left py-2.5 text-base sm:text-lg font-bold tracking-[0.1em] uppercase transition-all cursor-pointer flex items-center justify-between ${
                      cat.isSale
                        ? 'text-[#B3262D] hover:translate-x-1'
                        : 'text-[#111111] hover:text-[#555555] hover:translate-x-1'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Bottom Quick Links & Mobile Wishlist/Account */}
            <div className="pt-6 border-t border-[#EAEAEA] space-y-3 text-xs tracking-wider uppercase text-neutral-500">
              <div className="grid grid-cols-2 gap-2 pb-2">
                <button
                  onClick={() => {
                    setActivePage?.('store');
                    setIsNavDrawerOpen(false);
                    const el = document.getElementById('best-sellers');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 border border-[#EAEAEA] text-[#111111] font-semibold text-center hover:border-[#111111] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage?.('contact');
                    setIsNavDrawerOpen(false);
                  }}
                  className="py-2.5 px-3 border border-[#EAEAEA] text-[#111111] font-semibold text-center hover:border-[#111111] transition-colors flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Account</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span>CONCIERGE HOTLINE</span>
                <span className="text-[#111111] font-bold">+91 800-CLINZA</span>
              </div>
              <button
                onClick={() => {
                  setActivePage?.('faq');
                  setIsNavDrawerOpen(false);
                }}
                className="block text-left hover:text-[#111111] transition-colors cursor-pointer"
              >
                Help &amp; Shipping FAQ
              </button>
              <button
                onClick={() => {
                  setActivePage?.('returns');
                  setIsNavDrawerOpen(false);
                }}
                className="block text-left hover:text-[#111111] transition-colors cursor-pointer"
              >
                7-Day Complimentary Exchange
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export const ClinzaHeader = TechNovaHeader;

/* ========================================================================= */
/* 03. HERO BANNER — EDITORIAL FASHION CAMPAIGN (SNITCH Reference)          */
/* ========================================================================= */

export const TechNovaHeroSection: React.FC<{
  onAddToCart?: (product: Product, quantity?: number) => void;
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  const handleShopNow = () => {
    onSelectCategory?.('combos');
    const el = document.getElementById('shop-by-category');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Editorial Campaign Hero"
      className="w-full relative overflow-hidden bg-white"
    >
      {/* Edge-to-Edge Hero Container: 70–85% Initial Desktop Viewport */}
      <div className="w-full h-[72vh] sm:h-[78vh] lg:h-[84vh] min-h-[520px] max-h-[880px] relative overflow-hidden bg-neutral-900">
        
        {/* Full-Width High-Resolution Editorial Lifestyle Photograph */}
        <img
          src={heroLinenImg}
          alt="The Linen Edit - Editorial Fashion Campaign"
          className="w-full h-full object-cover object-[center_28%] sm:object-[center_25%] select-none brightness-95 filter transition-transform duration-1000 scale-[1.01]"
          loading="eager"
        />

        {/* Minimal Contrast Scrim to Guarantee WCAG AA Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none" />

        {/* Minimal Editorial Text Overlay */}
        <div className="absolute inset-0 max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20 text-center items-center">
          
          {/* Eyebrow Kicker */}
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-neutral-300 mb-2 sm:mb-3 drop-shadow-xs">
            SUMMER 2026 ATELIER CAPSULE
          </span>

          {/* Oversized Editorial Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-[0.2em] text-white uppercase leading-none drop-shadow-sm">
            THE LINEN EDIT
          </h1>

          {/* Short Supporting Campaign Text */}
          <p className="text-xs sm:text-sm lg:text-base font-medium tracking-[0.25em] text-neutral-200 uppercase mt-3 sm:mt-4 max-w-xl drop-shadow-xs">
            PERFECTION EXISTS IN EVERY THREAD
          </p>

          {/* ONE Primary CTA Button */}
          <div className="mt-6 sm:mt-8">
            <button
              id="hero-shop-now-btn"
              onClick={handleShopNow}
              className="px-8 sm:px-12 py-3.5 sm:py-4 bg-white text-[#111111] hover:bg-neutral-100 active:scale-98 text-xs font-bold tracking-[0.25em] uppercase transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform motion-reduce:transform-none" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ClinzaHeroSection = TechNovaHeroSection;

/* ========================================================================= */
/* 04. BRAND BENEFITS / TRUST STRIP                                          */
/* ========================================================================= */

export const TechNovaTrustBar: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENTS',
      subtitle: '100% Encrypted Transactions',
    },
    {
      icon: RotateCcw,
      title: 'EASY RETURNS',
      subtitle: '7-Day Doorstep Exchange',
    },
    {
      icon: Truck,
      title: 'RELIABLE DELIVERY',
      subtitle: 'Complimentary on Orders > ₹999',
    },
    {
      icon: Headphones,
      title: 'CUSTOMER SUPPORT',
      subtitle: 'Mon–Sat Dedicated Concierge',
    },
  ];

  return (
    <section
      id="brand-benefits"
      aria-label="Brand Benefits"
      className="w-full bg-white border-y border-[#EAEAEA] py-6 sm:py-8"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#EAEAEA]">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className={`flex items-center gap-3.5 sm:gap-4 ${
                  i > 0 ? 'pt-4 sm:pt-0 lg:pl-8' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full border border-[#EAEAEA] flex items-center justify-center shrink-0 text-[#111111]">
                  <Icon className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold tracking-[0.15em] text-[#111111] uppercase">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-[#555555] mt-0.5 tracking-wide">
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
/* 05. SHOP BY CATEGORY (SNITCH Reference — Exactly 5 in 1 Desktop Row)      */
/* ========================================================================= */

export const TechNovaCategorySection: React.FC<{
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'shirts',
      name: 'SHIRTS',
      image: catShirtsImg,
      alt: 'Luxury Linen and Oxford Shirts',
    },
    {
      id: 'bottomwear',
      name: 'TROUSERS',
      image: catTrousersImg,
      alt: 'Italian Tailored Linen-Cotton Trousers',
    },
    {
      id: 'tshirts',
      name: 'T-SHIRTS',
      image: catTshirtsImg,
      alt: 'Supima Cotton Polos and T-Shirts',
    },
    {
      id: 'jeans',
      name: 'JEANS',
      image: catJeansImg,
      alt: 'Selvedge Relaxed Modern Denim',
    },
    {
      id: 'cargos',
      name: 'CARGOS',
      image: catCargosImg,
      alt: 'Utilitarian Tailored Linen Cargos',
    },
  ];

  return (
    <section
      id="shop-by-category"
      aria-label="Shop By Category"
      className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white"
    >
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase block mb-2">
          EXPLORE THE CATALOGUE
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-[0.2em] uppercase">
          SHOP BY CATEGORY
        </h2>
      </div>

      {/* Five-Column Row of Category Cards: Desktop (5 Cols in 1 Row), Mobile (Horizontal Scrolling Snap-Carousel) */}
      <div className="flex lg:grid lg:grid-cols-5 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-4 lg:pb-0 gap-4 sm:gap-6 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`category-card-${cat.id}`}
            onClick={() => {
              onSelectCategory?.(cat.id);
              const el = document.getElementById('best-sellers');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] shrink-0 w-[64vw] sm:w-[40vw] md:w-[30vw] lg:w-auto snap-start"
          >
            {/* Image Card: Consistent 3:4 Aspect Ratio on Neutral Surface */}
            <div className="relative aspect-[3/4] w-full bg-[#F7F7F7] overflow-hidden rounded-xs border border-[#EAEAEA] group-hover:border-[#111111] transition-colors duration-300">
              <img
                src={cat.image}
                alt={cat.alt}
                className="w-full h-full object-cover object-top filter brightness-98 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* Category Heading Below Card */}
            <div className="mt-3.5 text-center">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#111111] uppercase group-hover:text-[#555555] transition-colors">
                {cat.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Simple SHOP ALL Link Below the Category Row */}
      <div className="text-center mt-10 sm:mt-12">
        <button
          onClick={() => {
            onSelectCategory?.('all');
            const el = document.getElementById('best-sellers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-block text-xs font-bold tracking-[0.25em] text-[#111111] hover:text-[#555555] uppercase border-b border-[#111111] pb-1 transition-colors cursor-pointer"
        >
          [ SHOP ALL ]
        </button>
      </div>
    </section>
  );
};

export const ClinzaCategorySection = TechNovaCategorySection;

/* ========================================================================= */
/* 06. EDITORIAL PRODUCT CARD COMPONENT                                      */
/* ========================================================================= */

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  badgeOverride?: { text: string; type?: string };
}

export const TechNovaProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onSelectProduct,
  isWishlisted = false,
  onToggleWishlist,
  badgeOverride,
}) => {
  const activeBadge = badgeOverride || product.badge;
  const badgeText = typeof activeBadge === 'string' ? activeBadge : activeBadge?.text;

  return (
    <div className="h-full flex flex-col justify-between bg-white group select-none">
      {/* Media Container: 3:4 Aspect Ratio on Soft Neutral */}
      <div>
        <div className="relative aspect-[3/4] w-full bg-[#F7F7F7] overflow-hidden rounded-xs border border-[#EAEAEA] group-hover:border-[#111111] transition-colors duration-300">
          
          {/* Subtle Tag / Discount Badge */}
          {badgeText && (
            <span className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-[0.15em] uppercase text-[#111111] bg-white/95 px-2.5 py-1 border border-[#EAEAEA] shadow-2xs">
              {badgeText}
            </span>
          )}

          {/* Wishlist Heart Button with Accessible Contrast */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product.id);
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#111111] hover:text-[#B3262D] transition-colors cursor-pointer shadow-2xs"
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart
              className={`w-4 h-4 stroke-[1.6] ${
                isWishlisted ? 'fill-[#B3262D] text-[#B3262D]' : ''
              }`}
            />
          </button>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            onClick={() => onSelectProduct?.(product)}
            className="w-full h-full object-cover object-top filter brightness-98 group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
            loading="lazy"
          />

          {/* Hover Action Overlay: Quick View & Add to Bag Buttons */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 py-2 bg-white/95 text-[#111111] hover:bg-white text-[11px] font-bold tracking-[0.15em] uppercase border border-[#EAEAEA] transition-colors cursor-pointer shadow-sm"
            >
              Quick View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, 1);
              }}
              className="flex-1 py-2 bg-[#111111] text-white hover:bg-neutral-800 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer shadow-sm"
            >
              + Bag
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="mt-3.5 text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 block">
            {product.category}
          </span>
          <h3
            onClick={() => onSelectProduct?.(product)}
            className="text-xs sm:text-[13px] font-medium text-[#111111] tracking-wide leading-snug line-clamp-1 cursor-pointer hover:text-[#555555] transition-colors"
          >
            {product.name}
          </h3>

          {/* Available Color Swatches if supported by product data */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colors.slice(0, 4).map((c, idx) => (
                <span
                  key={idx}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-neutral-400 font-mono">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 pt-0.5">
            <Star className="w-3 h-3 fill-neutral-800 text-neutral-800" />
            <span className="font-semibold text-neutral-800">{product.rating}</span>
            <span className="text-neutral-400">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Pricing & Mobile Quick Add */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-[#111111] tabular-nums">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product, 1)}
          className="sm:hidden p-1.5 text-[#111111] hover:text-[#555555] cursor-pointer"
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 07. CAMPAIGN 2: COLLECTION PROMOTION (The Sartorial Suiting Edit)          */
/* ========================================================================= */

export const TechNovaCollectionPromoSection: React.FC<{
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  const handleExplore = () => {
    onSelectCategory?.('combos');
    const el = document.getElementById('best-sellers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="collection-promo"
      aria-label="Collection Promotion"
      className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 bg-white"
    >
      <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] overflow-hidden rounded-xs bg-neutral-900 flex items-center justify-start group">
        {/* Full-Width Background Editorial Image */}
        <img
          src={campCollectionTailoredImg}
          alt="The Sartorial Atelier Collection"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] filter brightness-90 group-hover:scale-[1.02] transition-transform duration-1000"
          loading="lazy"
        />

        {/* Subtle Gradient Scrim on Left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />

        {/* Campaign Typography & CTA */}
        <div className="relative z-10 p-8 sm:p-14 lg:p-20 text-left max-w-xl text-white space-y-3 sm:space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-neutral-300 uppercase block">
            THE SARTORIAL EDIT
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-[0.15em] text-white uppercase leading-[1.1]">
            UNSTRUCTURED ITALIAN TAILORING
          </h2>
          <p className="text-xs sm:text-sm text-neutral-200 tracking-wide leading-relaxed max-w-md drop-shadow-xs">
            Engineered in lightweight European flax and Italian cotton. Designed for seamless poise from daytime meetings to balmy sunset dinners.
          </p>
          <div className="pt-3">
            <button
              onClick={handleExplore}
              className="px-8 sm:px-10 py-3.5 bg-white text-[#111111] hover:bg-neutral-100 text-xs font-bold tracking-[0.25em] uppercase transition-colors cursor-pointer inline-flex items-center gap-2 group/btn shadow-md"
            >
              <span>[ SHOP COLLECTION ]</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform motion-reduce:transform-none" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ========================================================================= */
/* 08. CAMPAIGN 1 & 3: SEASONAL PROMO + EDITORIAL IMAGE GALLERY              */
/* ========================================================================= */

export const TechNovaFeaturedPromoSection: React.FC<{
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  const handleExploreNow = () => {
    onSelectCategory?.('all');
    const el = document.getElementById('new-arrivals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const campaignCards = [
    {
      id: 'premium-shirts',
      title: 'PREMIUM SHIRTS',
      subtitle: 'Pure European Flax Weaves',
      image: campPremiumShirtsImg,
      category: 'shirts',
    },
    {
      id: 'everyday-essentials',
      title: 'EVERYDAY ESSENTIALS',
      subtitle: 'Modern Minimalist Staples',
      image: campEverydayEssentialsImg,
      category: 'all',
    },
    {
      id: 'checked-shirts',
      title: 'CHECKED SHIRTS',
      subtitle: 'Artisanal Textured Tailoring',
      image: campCheckedShirtsImg,
      category: 'shirts',
    },
  ];

  return (
    <section
      id="promo-campaign"
      aria-label="Promotional Campaign"
      className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white"
    >
      {/* CAMPAIGN 1: WIDE EDITORIAL PROMOTIONAL BANNER */}
      <div className="w-full bg-[#F8F8F8] border border-[#EAEAEA] rounded-xs overflow-hidden flex flex-col lg:flex-row items-center justify-between">
        
        {/* Promotional Typography */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 lg:p-20 text-left space-y-4 sm:space-y-6">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#B3262D] uppercase block">
            UPTO 30% OFF
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[0.15em] text-[#111111] uppercase leading-[1.1]">
            THE NEW SEASON COLLECTION
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] tracking-wide leading-relaxed max-w-md">
            Understated elegance meets effortless Mediterranean ease. Crafted from 100% pure flax and ultra-fine Supima cotton.
          </p>

          <div className="pt-2 sm:pt-4">
            <button
              id="promo-explore-btn"
              onClick={handleExploreNow}
              className="px-8 sm:px-10 py-3.5 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-bold tracking-[0.25em] uppercase transition-colors cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>[ EXPLORE NOW ]</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform motion-reduce:transform-none" />
            </button>
          </div>
        </div>

        {/* Fashion Model Image */}
        <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-[480px] bg-neutral-200 overflow-hidden">
          <img
            src={promoModelImg}
            alt="The New Season Campaign Collection"
            className="w-full h-full object-cover object-center filter brightness-98 hover:scale-102 transition-transform duration-700"
            loading="lazy"
          />
        </div>
      </div>

      {/* CAMPAIGN 3: 3 EDITORIAL CAMPAIGN CARDS GALLERY BELOW BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 sm:mt-12">
        {campaignCards.map((card) => (
          <div
            key={card.id}
            id={`campaign-card-${card.id}`}
            onClick={() => {
              onSelectCategory?.(card.category);
              const el = document.getElementById('best-sellers');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer flex flex-col"
          >
            {/* Large Lifestyle Photography (3:4 ratio) */}
            <div className="relative aspect-[3/4] w-full bg-[#F7F7F7] overflow-hidden rounded-xs border border-[#EAEAEA] group-hover:border-[#111111] transition-colors duration-300">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-top filter brightness-98 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* Minimal Uppercase Title & Subtitle */}
            <div className="mt-4 text-center space-y-1">
              <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#111111] group-hover:text-[#555555] transition-colors">
                {card.title}
              </h3>
              <p className="text-[11px] text-[#555555] tracking-wider uppercase">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ClinzaPromotionsSection = TechNovaFeaturedPromoSection;

/* ========================================================================= */
/* 09. BEST SELLERS SECTION                                                  */
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
  // Focus on top curated apparel items from existing dataset
  const bestSellers = products.filter((p) =>
    ['clinza-combo-summer-set', 'clinza-pink-linen', 'clinza-sand-trousers', 'clinza-white-oxford', 'clinza-navy-polo'].includes(p.id)
  );

  const displayList = bestSellers.length >= 4 ? bestSellers : products.slice(0, 5);

  return (
    <section
      id="best-sellers"
      aria-label="Best Sellers"
      className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white border-t border-[#EAEAEA]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div className="text-left space-y-1">
          <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase block">
            CURATED FAVORITES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-[0.2em] uppercase">
            BEST SELLERS
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] tracking-wide max-w-lg">
            The most coveted silhouettes and timeless essentials from our atelier.
          </p>
        </div>

        <button
          onClick={() => {
            onSelectCategory?.('all');
            const el = document.getElementById('shop-by-category');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs font-bold tracking-[0.2em] text-[#111111] hover:text-[#555555] uppercase border-b border-[#111111] pb-1 transition-colors self-start sm:self-auto cursor-pointer"
        >
          VIEW ALL PRODUCTS →
        </button>
      </div>

      {/* 5 Products Grid in 1 Row on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {displayList.map((product) => (
          <TechNovaProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export const ClinzaFeaturedCombosSection = TechNovaBestSellersSection;

/* ========================================================================= */
/* 10. NEW ARRIVALS SECTION                                                  */
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
  // Select genuine menswear items for new arrivals
  const newArrivals = products.filter((p) =>
    ['clinza-selvedge-denim', 'clinza-linen-cargos', 'clinza-checked-shirt', 'clinza-white-oxford', 'clinza-navy-polo'].includes(p.id)
  );

  const displayList = newArrivals.length >= 4 ? newArrivals : products.slice(0, 5);

  return (
    <section
      id="new-arrivals"
      aria-label="New Arrivals"
      className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white border-t border-[#EAEAEA]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div className="text-left space-y-1">
          <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase block">
            JUST IN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-[0.2em] uppercase">
            NEW ARRIVALS
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] tracking-wide max-w-lg">
            Fresh cuts, refined textures, and the latest seasonal color palette.
          </p>
        </div>

        <button
          onClick={() => {
            onSelectCategory?.('all');
            const el = document.getElementById('shop-by-category');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs font-bold tracking-[0.2em] text-[#111111] hover:text-[#555555] uppercase border-b border-[#111111] pb-1 transition-colors self-start sm:self-auto cursor-pointer"
        >
          EXPLORE CATALOGUE →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {displayList.map((product) => (
          <TechNovaProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            badgeOverride={{ text: 'NEW', type: 'new' }}
          />
        ))}
      </div>
    </section>
  );
};

export const ClinzaNewArrivalsSection = TechNovaNewArrivalsSection;

/* ========================================================================= */
/* 11. COLLECTIONS COMPATIBILITY SECTION                                     */
/* ========================================================================= */

export const TechNovaCollectionsSection: React.FC<{
  onSelectCategory?: (category: string) => void;
}> = ({ onSelectCategory }) => {
  return null;
};

export const ClinzaStyleGuideSection = TechNovaCollectionsSection;

/* ========================================================================= */
/* 12. NEWSLETTER (Join The Atelier)                                         */
/* ========================================================================= */

export const TechNovaNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter"
      className="w-full bg-[#F8F8F8] border-t border-[#EAEAEA] py-14 sm:py-20"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase block mb-2">
          THE CLINZA ATELIER
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-[0.2em] uppercase">
          JOIN THE SARTORIAL CIRCLE
        </h2>
        <p className="text-xs sm:text-sm text-[#555555] tracking-wide mt-3 max-w-md mx-auto leading-relaxed">
          Receive private invitations to capsule launches, styling previews, and curated members-only editions.
        </p>

        <div className="mt-8 max-w-md mx-auto" aria-live="polite">
          {subscribed ? (
            <div className="p-4 bg-white border border-[#EAEAEA] text-[#111111] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Welcome to the Atelier. Your invite has been sent.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  className="flex-1 h-[48px] px-4 bg-white border border-[#EAEAEA] text-xs text-[#111111] placeholder-neutral-400 focus:outline-none focus:border-[#111111] tracking-wider uppercase"
                />
                <button
                  type="submit"
                  className="h-[48px] px-8 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-bold tracking-[0.25em] uppercase transition-colors cursor-pointer shrink-0"
                >
                  SUBSCRIBE
                </button>
              </div>
              {error && (
                <p className="text-xs text-[#B3262D] font-medium text-left mt-2">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export const ClinzaFinalCtaSection = TechNovaNewsletterSection;

/* ========================================================================= */
/* 13. STOREFRONT FOOTER                                                     */
/* ========================================================================= */

export const TechNovaFooter: React.FC<{
  setActivePage?: (page: any) => void;
  onSelectCategory?: (category: string) => void;
}> = ({ setActivePage, onSelectCategory }) => {
  return (
    <footer
      id="technova-footer"
      className="w-full bg-[#111111] text-neutral-300 font-sans pt-16 pb-12 border-t border-neutral-800"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-neutral-800 text-left text-xs">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <span className="text-2xl font-black tracking-[0.25em] text-white uppercase block">
              CLINZA
            </span>
            <p className="text-xs text-neutral-400 tracking-wide leading-relaxed max-w-xs">
              Modern Indian luxury menswear crafted with exceptional raw European flax, meticulous single-needle tailoring, and effortless sartorial poise.
            </p>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase">
              CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-neutral-400 tracking-wider uppercase">
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('store');
                    onSelectCategory?.('shirts');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pure Linen Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('store');
                    onSelectCategory?.('bottomwear');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tailored Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('store');
                    onSelectCategory?.('tshirts');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Resort Polos &amp; Knits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('store');
                    onSelectCategory?.('jeans');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Selvedge Denim
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage?.('store');
                    onSelectCategory?.('cargos');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tailored Linen Cargos
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase">
              CLIENT SERVICES
            </h4>
            <ul className="space-y-2.5 text-neutral-400 tracking-wider uppercase">
              <li>
                <button
                  onClick={() => setActivePage?.('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bespoke Concierge Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage?.('shipping')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage?.('returns')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Complimentary 7-Day Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage?.('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Column */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase">
              THE ATELIER
            </h4>
            <ul className="space-y-2.5 text-neutral-400 tracking-wider uppercase">
              <li>
                <button
                  onClick={() => setActivePage?.('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sartorial Craftsmanship
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage?.('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage?.('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 tracking-wider uppercase">
          <div>
            &copy; 2026 CLINZA SARTORIAL ATELIER. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 mr-2">SECURE TRANSACTIONS:</span>
            <span className="px-2 py-0.5 bg-neutral-900 text-neutral-300 rounded-2xs border border-neutral-800">VISA</span>
            <span className="px-2 py-0.5 bg-neutral-900 text-neutral-300 rounded-2xs border border-neutral-800">MASTERCARD</span>
            <span className="px-2 py-0.5 bg-neutral-900 text-neutral-300 rounded-2xs border border-neutral-800">UPI</span>
            <span className="px-2 py-0.5 bg-neutral-900 text-neutral-300 rounded-2xs border border-neutral-800">RUPAY</span>
            <span className="px-2 py-0.5 bg-neutral-900 text-neutral-300 rounded-2xs border border-neutral-800">256-BIT SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const ClinzaFooter = TechNovaFooter;

/* ========================================================================= */
/* 14. MASTER NCF REDESIGNED HOMEPAGE SEQUENCE                               */
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
    <div className="w-full bg-white text-[#111111] font-sans selection:bg-neutral-900 selection:text-white">
      {/* 1. HERO BANNER — EDITORIAL FASHION CAMPAIGN */}
      <TechNovaHeroSection
        onAddToCart={(p) => onAddToCart(p, 1)}
        onSelectCategory={onSelectCategory}
      />

      {/* 2. BRAND BENEFITS / TRUST STRIP */}
      <TechNovaTrustBar />

      {/* 3. SHOP BY CATEGORY (Exactly 5 Categories in 1 Row) */}
      <TechNovaCategorySection onSelectCategory={onSelectCategory} />

      {/* 4. BEST SELLERS */}
      <TechNovaBestSellersSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onSelectCategory={onSelectCategory}
        onSelectProduct={onSelectProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 5. CAMPAIGN 2: COLLECTION PROMOTION (The Sartorial Edit) */}
      <TechNovaCollectionPromoSection onSelectCategory={onSelectCategory} />

      {/* 6. CAMPAIGN 1 & 3: PROMOTIONAL CAMPAIGN & EDITORIAL GALLERY */}
      <TechNovaFeaturedPromoSection onSelectCategory={onSelectCategory} />

      {/* 7. NEW ARRIVALS */}
      <TechNovaNewArrivalsSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onSelectCategory={onSelectCategory}
        onSelectProduct={onSelectProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 8. NEWSLETTER */}
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
