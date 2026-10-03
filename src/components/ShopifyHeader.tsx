import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Headphones,
  Laptop,
  Watch,
  Gamepad2,
  Tag,
  Repeat,
  HelpCircle,
  Flame,
  ShieldCheck,
  Check,
  Sliders,
  History,
  Trash2,
  FileText,
  Package,
  Star,
  Plus
} from 'lucide-react';
import { MerchantThemeSettings } from '../types/search';
import { DEFAULT_MERCHANT_THEME_SETTINGS } from '../constants/defaultThemeSettings';
import { ncfAnalytics } from '../utils/ncfAnalytics';
import { ThemeEditorDrawer } from './ThemeEditorDrawer';
import { MerchantOnboardingModal } from './MerchantOnboardingModal';
import { DesignSystemEngine } from '../utils/designSystemEngine';
import { NCFHookLocation, NCFExtensionInspectorModal } from '../sdk';
import { Terminal } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'smartwatches' | 'analog-watches' | 'smart-bands' | 'tws-earbuds' | 'neckbands' | 'headphones' | 'speakers' | 'chargers' | 'power-banks' | 'cables' | string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: {
    text: string;
    type: 'sale' | 'new' | 'out-of-stock' | 'success' | 'info';
  };
  image: string;
  specs: string[];
  inStock: boolean;
  description: string;
}

interface ShopifyHeaderProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  activePage: string;
  setActivePage: (page: any) => void;
  totalCartCount: number;
  setIsCartOpen: (open: boolean) => void;
  onSelectProduct?: (product: Product) => void;
}

const DEFAULT_SETTINGS: MerchantThemeSettings = DEFAULT_MERCHANT_THEME_SETTINGS;

const SAMPLE_ARTICLES = [
  { id: 'art-1', title: 'Smartwatch Sensor Technology & Battery Longevity Masterclass', category: 'Tech Guide', readTime: '4 min' },
  { id: 'art-2', title: 'ANC vs ENC: How Active Noise Cancellation Truly Works', category: 'Audio Guide', readTime: '5 min' },
  { id: 'art-3', title: 'GaN Fast Chargers vs Traditional Silicon Power Adapters', category: 'Hardware Guide', readTime: '6 min' }
];

const SAMPLE_COLLECTIONS = [
  { id: 'col-1', name: 'Smartwatches & Fitness Bands', category: 'smartwatches', count: 34 },
  { id: 'col-2', name: 'TWS Earbuds & Neckbands', category: 'tws-earbuds', count: 22 },
  { id: 'col-3', name: 'Over-Ear ANC Headphones', category: 'headphones', count: 18 },
  { id: 'col-4', name: 'Fast Chargers & Power Banks', category: 'chargers', count: 36 }
];

export const ShopifyHeader: React.FC<ShopifyHeaderProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activePage,
  setActivePage,
  totalCartCount,
  setIsCartOpen,
  onSelectProduct
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'categories' | 'collections' | 'brands' | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [wishlistCount] = useState(3);
  const [compareCount] = useState(2);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSdkInspectorOpen, setIsSdkInspectorOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  // Merchant theme settings
  const [merchantSettings, setMerchantSettings] = useState<MerchantThemeSettings>(DEFAULT_SETTINGS);

  // Apply design tokens to document root
  useEffect(() => {
    DesignSystemEngine.applyTokensToDOM(merchantSettings);
  }, [merchantSettings]);

  // Recent Searches state initialized from LocalStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ncf_recent_searches');
      return saved ? JSON.parse(saved) : ['ANC Headphones', 'OLED Laptop', 'Smart Watch'];
    } catch {
      return ['ANC Headphones', 'OLED Laptop', 'Smart Watch'];
    }
  });

  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll handler for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search focus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save recent searches helper
  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    const updated = [cleanTerm, ...recentSearches.filter((t) => t.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 10);
    setRecentSearches(updated);
    try {
      localStorage.setItem('ncf_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save recent searches', e);
    }
  };

  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((t) => t !== termToRemove);
    setRecentSearches(updated);
    try {
      localStorage.setItem('ncf_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update recent searches', e);
    }
  };

  const clearAllRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem('ncf_recent_searches');
    } catch (e) {
      console.warn('Could not clear recent searches', e);
    }
  };

  // Predictive search query filtering
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || !merchantSettings.enablePredictiveSearch) return [];
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.specs.some((s) => s.toLowerCase().includes(query))
    ).slice(0, merchantSettings.maxPredictiveResults);
  }, [products, searchQuery, merchantSettings]);

  // Matching collections for search popover
  const matchingCollections = React.useMemo(() => {
    if (!searchQuery.trim() || !merchantSettings.showCollections) return [];
    const query = searchQuery.toLowerCase();
    return SAMPLE_COLLECTIONS.filter((c) => c.name.toLowerCase().includes(query));
  }, [searchQuery, merchantSettings.showCollections]);

  // Matching articles for search popover
  const matchingArticles = React.useMemo(() => {
    if (!searchQuery.trim() || !merchantSettings.showArticles) return [];
    const query = searchQuery.toLowerCase();
    return SAMPLE_ARTICLES.filter((a) => a.title.toLowerCase().includes(query) || a.category.toLowerCase().includes(query));
  }, [searchQuery, merchantSettings.showArticles]);

  // Handle Search Submission (Navigates to Search View)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      ncfAnalytics.trackSearchQuery(searchQuery, searchResults.length);
      setIsSearchFocused(false);
      setActivePage('search');
    }
  };

  const handleSelectSearchTerm = (term: string) => {
    setSearchQuery(term);
    saveRecentSearch(term);
    ncfAnalytics.trackSearchQuery(term, products.filter(p => p.name.toLowerCase().includes(term.toLowerCase())).length);
    setIsSearchFocused(false);
    setActivePage('search');
  };

  const handleMouseEnterMega = (menu: 'categories' | 'collections' | 'brands') => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeaveMega = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  return (
    <>
      <NCFHookLocation name="beforeHeader" />
      {/* --------------------------------------------------------------------- */}
      {/* 1. TOP ANNOUNCEMENT BAR (Merchant Configurable)                        */}
      {/* --------------------------------------------------------------------- */}
      {isAnnouncementVisible && (
        <div
          className={`bg-slate-950 text-slate-200 text-xs transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 py-0 opacity-0 border-none' : 'max-h-12 py-2 px-4 border-b border-slate-800 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left text-[11px] font-mono">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Flame className="w-3 h-3 text-amber-400" /> CLINZA LUXURY
              </span>
              <span className="text-slate-300">
                🇮🇳 Free Express Delivery Across India on Orders Over ₹1,999 — Use Code{' '}
                <strong className="text-amber-400 font-bold">{merchantSettings.megaMenuPromoCode}</strong> for {merchantSettings.megaMenuPromoDiscount}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Cash on Delivery Available
              </span>

              <button
                onClick={() => setIsAnnouncementVisible(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition focus:outline-none focus:ring-1 focus:ring-sky-500"
                aria-label="Dismiss Announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 2. MAIN SINGLE STICKY HEADER                                          */}
      {/* --------------------------------------------------------------------- */}
      <header
        className={`sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-all duration-300 ${
          isScrolled ? 'shadow-md py-2.5' : 'shadow-xs py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Open Mobile Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('store');
              }}
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
                C
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white block leading-none">
                  CLIN<span className="text-amber-600 dark:text-amber-400">ZA</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mt-0.5">
                  Men's Apparel
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links (Merchant Configurable Mega Menus) */}
          <nav className="hidden lg:flex items-center gap-1 font-semibold text-xs text-slate-700 dark:text-slate-200">
            <button
              onClick={() => setActivePage('store')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                activePage === 'store'
                  ? 'bg-slate-900 text-white dark:bg-slate-800 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setActivePage('collection');
                setSelectedCategory('all');
              }}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                activePage === 'collection' && selectedCategory === 'all'
                  ? 'bg-slate-900 text-white font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              Shop All
            </button>

            {/* Mega Menu: Collections */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMega('collections')}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button
                onClick={() => setActivePage('collection')}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  activeMegaMenu === 'collections'
                    ? 'bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
                aria-expanded={activeMegaMenu === 'collections'}
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Collections Mega Menu Dropdown */}
              {activeMegaMenu === 'collections' && (
                <div className="absolute top-full left-0 w-80 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block px-2 pt-1">
                    Featured Collections
                  </span>

                  <button
                    onClick={() => {
                      setSelectedCategory('smartwatches');
                      setActivePage('collection');
                      setActiveMegaMenu(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs block group-hover:text-sky-600">
                        Smartwatches & Wearables
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        AMOLED, Bluetooth Calling & GPS
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('tws-earbuds');
                      setActivePage('collection');
                      setActiveMegaMenu(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs block group-hover:text-emerald-600">
                        TWS Earbuds & Audio
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        ANC, Low-Latency Gaming & Spatial Sound
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('headphones');
                      setActivePage('collection');
                      setActiveMegaMenu(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs block group-hover:text-indigo-600">
                        Over-Ear ANC Headphones
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        Hi-Res Audio Certified & 60H Playtime
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('chargers');
                      setActivePage('collection');
                      setActiveMegaMenu(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs block group-hover:text-amber-600">
                        Fast Chargers & Cables
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        65W GaN, Braided Type-C & Power Banks
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mega Menu: Categories */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMega('categories')}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button
                onClick={() => setActivePage('collection')}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  activeMegaMenu === 'categories'
                    ? 'bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
                aria-expanded={activeMegaMenu === 'categories'}
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {activeMegaMenu === 'categories' && (
                <div className="absolute top-full left-0 w-[500px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                      Electronics Categories
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCategory('smartwatches');
                        setActivePage('collection');
                        setActiveMegaMenu(null);
                      }}
                      className="w-full text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-sky-600 py-1.5 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span>Smartwatches & Bands</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory('tws-earbuds');
                        setActivePage('collection');
                        setActiveMegaMenu(null);
                      }}
                      className="w-full text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 py-1.5 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span>TWS Earbuds & Audio</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory('headphones');
                        setActivePage('collection');
                        setActiveMegaMenu(null);
                      }}
                      className="w-full text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 py-1.5 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span>Headphones & Speakers</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory('chargers');
                        setActivePage('collection');
                        setActiveMegaMenu(null);
                      }}
                      className="w-full text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-amber-600 py-1.5 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span>GaN Chargers & Cables</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>

                  {merchantSettings.megaMenuPromoEnabled && (
                    <div className="bg-slate-950 text-white rounded-xl p-3.5 border border-slate-800 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="badge badge--new mb-1.5">CLINZA FESTIVE PROMO</span>
                        <h4 className="font-extrabold text-white text-xs">{merchantSettings.megaMenuPromoDiscount} STOREWIDE</h4>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                          Use code <strong className="text-amber-400 font-mono">{merchantSettings.megaMenuPromoCode}</strong> at checkout.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const prod = products[0];
                          if (prod) onSelectProduct?.(prod);
                          setActiveMegaMenu(null);
                        }}
                        className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Shop Trending Electronics</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Brands */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterMega('brands')}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button
                className={`min-h-[44px] px-3.5 py-2 rounded-xl transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  activeMegaMenu === 'brands'
                    ? 'bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
                aria-expanded={activeMegaMenu === 'brands'}
              >
                <span>Brands</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {activeMegaMenu === 'brands' && (
                <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  {['SONY', 'SENNHEISER', 'BOSE', 'APPLE', 'LOGITECH', 'AUDIO-TECHNICA'].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setActivePage('collection');
                        setActiveMegaMenu(null);
                      }}
                      className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 rounded-lg text-center border border-slate-200 dark:border-slate-700 transition"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Deals */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActivePage('collection');
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Deals</span>
              <span className="badge badge--sale text-[10px] px-1.5 py-0.2">HOT</span>
            </button>

            {/* Support */}
            <button
              onClick={() => setActivePage('faq')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                activePage === 'faq'
                  ? 'bg-slate-900 text-white dark:bg-slate-800 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Support</span>
            </button>
          </nav>

          {/* Center: Large Predictive Search Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-md mx-2 sm:mx-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <input
                ref={searchInputRef}
                type="search"
                placeholder={merchantSettings.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full min-h-[44px] pl-11 pr-10 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100/80 focus:bg-white dark:focus:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200/80 dark:border-slate-700 focus:border-sky-500 rounded-xl transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                aria-label="Predictive Store Search"
              />
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full focus:outline-none"
                  aria-label="Clear Search Input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Predictive Search Dropdown Popover (Feature 1, 2, 3, 4) */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[500px] overflow-y-auto custom-scrollbar">
                
                {/* 1. Recent Searches Block (Feature 4) */}
                {!searchQuery && recentSearches.length > 0 && merchantSettings.showRecentSearches && (
                  <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <History className="w-3 h-3 text-sky-500" /> Recent Searches
                      </span>
                      <button
                        onClick={clearAllRecentSearches}
                        className="text-[10px] font-mono text-slate-400 hover:text-rose-500 flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3 h-3" /> Clear All
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map((term) => (
                        <span
                          key={term}
                          onClick={() => handleSelectSearchTerm(term)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 text-slate-700 dark:text-slate-300 hover:text-sky-600 rounded-lg text-xs font-medium cursor-pointer transition group"
                        >
                          <span>{term}</span>
                          <button
                            onClick={(e) => removeRecentSearch(e, term)}
                            className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                            aria-label={`Remove search ${term}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Trending Searches (Feature 3) */}
                {!searchQuery && merchantSettings.showTrendingSearches && (
                  <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Popular Trending Keywords
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['ANC Headphones', '3.2K OLED Laptop', 'SmartWatch GPS', 'Studio DAC', 'Mechanical Decks'].map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSelectSearchTerm(term)}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Matching Catalog Products (Feature 2) */}
                {searchQuery && searchResults.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block px-1">
                        Catalog Products ({searchResults.length})
                      </span>
                      <button
                        onClick={handleSearchSubmit}
                        className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        View All Results →
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {searchResults.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            ncfAnalytics.trackSearchProductClick(p);
                            onSelectProduct?.(p);
                            setIsSearchFocused(false);
                          }}
                          className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between gap-3 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {merchantSettings.showImages && (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-11 h-11 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-sky-600">
                                {p.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px]">
                                {merchantSettings.showVendors && (
                                  <span className="text-slate-500 uppercase font-mono">{p.category}</span>
                                )}
                                {merchantSettings.showPrices && (
                                  <span className="font-mono font-extrabold text-sky-600 dark:text-sky-400">
                                    ${p.price.toFixed(2)}
                                  </span>
                                )}
                                {merchantSettings.showRatings && (
                                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                    <Star className="w-3 h-3 fill-current" /> {p.rating}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Matching Collections */}
                {searchQuery && matchingCollections.length > 0 && (
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block px-1">
                      Matching Collections
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {matchingCollections.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => {
                            setSelectedCategory(col.category);
                            setActivePage('collection');
                            setIsSearchFocused(false);
                          }}
                          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950 text-left flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 transition"
                        >
                          <span className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-sky-500" />
                            <span>{col.name}</span>
                          </span>
                          <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300">
                            {col.count} Items
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Matching Articles / Technical Documentation */}
                {searchQuery && matchingArticles.length > 0 && (
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block px-1">
                      Technical Articles & Guides
                    </span>
                    <div className="space-y-1">
                      {matchingArticles.map((art) => (
                        <div
                          key={art.id}
                          onClick={() => {
                            setActivePage('faq');
                            setIsSearchFocused(false);
                          }}
                          className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left flex items-center justify-between text-xs cursor-pointer transition"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="font-semibold text-slate-900 dark:text-white truncate">{art.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">{art.readTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Empty State in Predictive Search */}
                {searchQuery && searchResults.length === 0 && matchingCollections.length === 0 && (
                  <div className="text-center py-6 space-y-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">
                      No matching products for "{searchQuery}"
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Try adjusting your keyword or search for "headphones", "laptop", or "watch".
                    </p>
                    <button
                      onClick={handleSearchSubmit}
                      className="btn btn-outline btn-sm font-bold min-h-[44px] mt-2"
                    >
                      Search Entire Store →
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Right Side Controls: Account, Wishlist, Compare, Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Account Icon */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-500"
              title="Customer Account & Orders"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActivePage('collection');
              }}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-500"
              title="Saved Wishlist"
              aria-label="Wishlist Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-sky-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Compare Icon */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="hidden sm:flex min-h-[44px] min-w-[44px] p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition relative items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-500"
              title="Compare Products"
              aria-label="Compare Products"
            >
              <Repeat className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-emerald-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Cart Action Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="min-h-[44px] px-3 sm:px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label={`Cart with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Cart</span>
              <span className="bg-sky-950 text-sky-200 font-mono font-bold text-xs px-2 py-0.5 rounded-full">
                {totalCartCount}
              </span>
            </button>

          </div>
        </div>
      </header>

      <NCFHookLocation name="afterHeader" />

      {/* --------------------------------------------------------------------- */}
      {/* 3. MOBILE DRAWER NAVIGATION (Feature 9)                               */}
      {/* --------------------------------------------------------------------- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative w-full max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-sky-400 font-mono font-black text-lg flex items-center justify-center">
                    N
                  </div>
                  <span className="font-black text-slate-900 dark:text-white text-lg">NOVACOMMERCE</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 font-bold text-sm text-slate-800 dark:text-slate-200">
                <button
                  onClick={() => {
                    setActivePage('store');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-xl transition flex items-center justify-between ${
                    activePage === 'store' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </button>

                <button
                  onClick={() => {
                    setActivePage('collection');
                    setSelectedCategory('all');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-xl transition flex items-center justify-between ${
                    activePage === 'collection' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Shop All Products</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </button>

                <div className="pt-2 pb-1 text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 px-4">
                  Categories
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('audio');
                    setActivePage('collection');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[44px] text-left px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 text-xs"
                >
                  <Headphones className="w-4 h-4 text-sky-500" />
                  <span>Audio & Soundstage</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('computing');
                    setActivePage('collection');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[44px] text-left px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 text-xs"
                >
                  <Laptop className="w-4 h-4 text-emerald-500" />
                  <span>Computing & Displays</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('wearables');
                    setActivePage('collection');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[44px] text-left px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 text-xs"
                >
                  <Watch className="w-4 h-4 text-purple-500" />
                  <span>Wearables & ECG</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('accessories');
                    setActivePage('collection');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[44px] text-left px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 text-xs"
                >
                  <Gamepad2 className="w-4 h-4 text-amber-500" />
                  <span>Gear & Peripherals</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('faq');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[44px] text-left px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs"
                >
                  <span>Customer Support & FAQ</span>
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                </button>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <button
                onClick={() => {
                  setIsAccountModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] py-2.5 px-4 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Customer Portal</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 font-mono">
                INR ₹ | India • English
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Account Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-w-sm w-full space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Customer Account</h3>
              <p className="text-xs text-slate-500">Sign in to track orders, manage warranties, and save wishlists.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsAccountModalOpen(false); }} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="customer@example.com"
                  className="w-full min-h-[44px] px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              <button type="submit" className="w-full min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition">
                Continue with Email
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Product Comparison</h3>
              <p className="text-xs text-slate-500">Comparing active hardware specs across catalog items.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 2).map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-xl bg-slate-200 dark:bg-slate-700" />
                  <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.name}</h4>
                  <p className="font-mono font-bold text-sky-600 dark:text-sky-400">${p.price.toFixed(2)}</p>
                  <ul className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-200 dark:border-slate-700">
                    {p.specs.map((s, i) => (
                      <li key={i} className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Theme Editor Drawer (Merchant Settings) */}
      <ThemeEditorDrawer
        isOpen={isThemeEditorOpen}
        onClose={() => setIsThemeEditorOpen(false)}
        settings={merchantSettings}
        onUpdateSettings={(newSettings) => setMerchantSettings(newSettings)}
      />

      {/* Merchant Onboarding & Presets Wizard Modal */}
      <MerchantOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onApplyPreset={(presetSettings) => {
          setMerchantSettings((prev) => ({
            ...prev,
            ...presetSettings
          }));
        }}
        onOpenThemeEditor={() => {
          setIsOnboardingOpen(false);
          setIsThemeEditorOpen(true);
        }}
      />

      {/* Developer SDK & Extension Framework Inspector */}
      <NCFExtensionInspectorModal
        isOpen={isSdkInspectorOpen}
        onClose={() => setIsSdkInspectorOpen(false)}
      />
    </>
  );
};
