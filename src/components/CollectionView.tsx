import React, { useState, useMemo, useEffect } from 'react';
import {
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Search,
  Star,
  RotateCcw,
  Sparkles,
  Package,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { SeoMeta } from './SeoMeta';
import { Product } from '../types/product';
import { TechNovaProductCard } from './homepage/HomepageSections';

interface CollectionViewProps {
  products: Product[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  onNavigateHome?: () => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView?: (product: Product) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}

type SortOption =
  | 'featured'
  | 'best-selling'
  | 'newest'
  | 'price-low-to-high'
  | 'price-high-to-low'
  | 'rating';

interface FilterState {
  category: string;
  priceRange: string;
  inStockOnly: boolean;
  minRating: number;
}

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'smartwatches', label: 'Smartwatches' },
  { id: 'analog-watches', label: 'Analog Watches' },
  { id: 'smart-bands', label: 'Smart Bands' },
  { id: 'tws-earbuds', label: 'TWS Earbuds' },
  { id: 'neckbands', label: 'Neckbands' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'chargers', label: 'Fast Chargers' },
  { id: 'power-banks', label: 'Power Banks' },
  { id: 'cables', label: 'Braided Cables' },
  { id: 'mobile-accessories', label: 'Mobile Accessories' },
  { id: 'computer-accessories', label: 'Computer Accessories' },
  { id: 'combos', label: 'Curated Combos' },
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-1000', label: 'Under ₹1,000', min: 0, max: 999 },
  { id: '1000-2000', label: '₹1,000–₹2,000', min: 1000, max: 2000 },
  { id: '2000-3000', label: '₹2,000–₹3,000', min: 2000, max: 3000 },
  { id: 'above-3000', label: 'Above ₹3,000', min: 3000, max: Infinity },
];

const RATING_OPTIONS = [
  { value: 0, label: 'All Ratings' },
  { value: 4, label: '4★ & above' },
  { value: 3, label: '3★ & above' },
];

export const CollectionView: React.FC<CollectionViewProps> = ({
  products = [],
  selectedCategory = 'all',
  onSelectCategory,
  onNavigateHome,
  onSelectProduct,
  onAddToCart,
  onQuickView,
  wishlistIds = [],
  onToggleWishlist,
}) => {
  // Local Filter & Sort State
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
  const [activePriceRange, setActivePriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Sync external selectedCategory prop if it changes
  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Lock body scroll when filter drawer is open
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterDrawerOpen]);

  // Category change handler
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    onSelectCategory?.(catId);
    setVisibleCount(12);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('all');
    setActivePriceRange('all');
    setInStockOnly(false);
    setMinRating(0);
    onSelectCategory?.('all');
    setVisibleCount(12);
  };

  // Active filter count (excluding default 'all')
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'all') count++;
    if (activePriceRange !== 'all') count++;
    if (inStockOnly) count++;
    if (minRating > 0) count++;
    return count;
  }, [activeCategory, activePriceRange, inStockOnly, minRating]);

  // Compute category counts for drawer
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = products.filter((p) => {
          if (cat.id === 'chargers') {
            return p.category === 'chargers' || p.category === 'cables';
          }
          return p.category === cat.id;
        }).length;
      }
    });
    return counts;
  }, [products]);

  // Filter and Sort Pipeline
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => {
        if (activeCategory === 'chargers') {
          return p.category === 'chargers' || p.category === 'cables';
        }
        return p.category === activeCategory;
      });
    }

    // 2. Price Range Filter
    if (activePriceRange !== 'all') {
      const selectedRange = PRICE_RANGES.find((r) => r.id === activePriceRange);
      if (selectedRange) {
        list = list.filter(
          (p) => p.price >= selectedRange.min && p.price <= selectedRange.max
        );
      }
    }

    // 3. Availability Filter
    if (inStockOnly) {
      list = list.filter((p) => p.inStock === true);
    }

    // 4. Rating Filter
    if (minRating > 0) {
      list = list.filter((p) => (p.rating || 0) >= minRating);
    }

    // 5. Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case 'price-low-to-high':
          return a.price - b.price;
        case 'price-high-to-low':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'best-selling':
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        case 'newest': {
          const aIsNew =
            typeof a.badge === 'object' &&
            (a.badge?.text === 'NEW' || a.badge?.text === 'FLAGSHIP');
          const bIsNew =
            typeof b.badge === 'object' &&
            (b.badge?.text === 'NEW' || b.badge?.text === 'FLAGSHIP');
          if (aIsNew && !bIsNew) return -1;
          if (!aIsNew && bIsNew) return 1;
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        }
        case 'featured':
        default:
          return 0;
      }
    });

    return list;
  }, [products, activeCategory, activePriceRange, inStockOnly, minRating, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, visibleCount]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const activePriceObj = PRICE_RANGES.find((p) => p.id === activePriceRange);

  return (
    <div className="w-full min-h-screen bg-white text-[#0F172A] font-sans pb-16">
      <SeoMeta
        title={`${
          activeCategory !== 'all' ? activeCategoryObj?.label + ' | ' : ''
        }Shop TechNova Electronics`}
        description="Discover smart consumer technology designed for everyday life. Premium headphones, earbuds, speakers, smart watches and charging accessories."
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* ----------------------------------------------------------------- */}
        {/* 1. BREADCRUMB                                                     */}
        {/* ----------------------------------------------------------------- */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <li>
              <button
                onClick={onNavigateHome}
                className="hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li className="text-slate-400 select-none" aria-hidden="true">
              /
            </li>
            <li>
              <button
                onClick={() => handleCategoryChange('all')}
                className={`transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'text-[#0F172A] font-bold'
                    : 'hover:text-[#2563EB]'
                }`}
                aria-current={activeCategory === 'all' ? 'page' : undefined}
              >
                Shop
              </button>
            </li>
            {activeCategory !== 'all' && (
              <>
                <li className="text-slate-400 select-none" aria-hidden="true">
                  /
                </li>
                <li
                  className="text-[#0F172A] font-bold"
                  aria-current="page"
                >
                  {activeCategoryObj?.label}
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* ----------------------------------------------------------------- */}
        {/* 2. COLLECTION HEADER                                              */}
        {/* ----------------------------------------------------------------- */}
        <header className="mb-6 sm:mb-8 text-left space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-bold tracking-widest text-[#2563EB] uppercase block">
            {activeCategory === 'all'
              ? 'OFFICIAL STORE'
              : `${activeCategoryObj?.label.toUpperCase()} COLLECTION`}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {activeCategory === 'all'
              ? 'Shop TechNova'
              : activeCategoryObj?.label}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
            Discover smart technology designed for everyday life. Explore high-performance
            audio, sleek wearables, and next-gen essentials.
          </p>
        </header>

        {/* ----------------------------------------------------------------- */}
        {/* 3. CATEGORY / COLLECTION NAVIGATION (Horizontal Strip)            */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-6 sm:mb-8">
          <nav
            aria-label="Categories"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-nav-${cat.id}`}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-[#F8FAFC] text-slate-700 hover:bg-slate-200/70 border border-[#E5E7EB]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {categoryCounts[cat.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 4. FILTER + SORT TOOLBAR                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          {/* LEFT: Product count + Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              id="open-filters-btn"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] hover:text-[#2563EB] text-[#0F172A] text-sm font-semibold rounded-xl shadow-2xs transition-all duration-200 cursor-pointer min-h-[44px] group"
              aria-expanded={isFilterDrawerOpen}
              aria-controls="filter-drawer"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-500 group-hover:text-[#2563EB] transition-colors" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <span className="text-xs sm:text-sm font-medium text-slate-600">
              Showing{' '}
              <strong className="text-[#0F172A] font-bold font-mono">
                {filteredAndSortedProducts.length}
              </strong>{' '}
              {filteredAndSortedProducts.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>

          {/* RIGHT: Sort by dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
            <label
              htmlFor="collection-sort-select"
              className="text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap"
            >
              Sort by:
            </label>
            <div className="relative min-w-[170px] sm:min-w-[190px]">
              <select
                id="collection-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] hover:border-slate-400 focus:border-[#2563EB] text-[#0F172A] text-xs sm:text-sm font-semibold py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 shadow-2xs transition-all cursor-pointer min-h-[44px]"
              >
                <option value="featured">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="newest">Newest</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* ACTIVE FILTER CHIPS (If any filter applied)                       */}
        {/* ----------------------------------------------------------------- */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-6 animate-in fade-in duration-200">
            <span className="text-xs font-semibold text-slate-400 mr-1">
              Active Filters:
            </span>

            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold rounded-lg">
                Category: {activeCategoryObj?.label}
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="hover:text-blue-900 cursor-pointer p-0.5"
                  aria-label={`Remove category filter ${activeCategoryObj?.label}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {activePriceRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold rounded-lg">
                Price: {activePriceObj?.label}
                <button
                  onClick={() => setActivePriceRange('all')}
                  className="hover:text-blue-900 cursor-pointer p-0.5"
                  aria-label="Remove price filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold rounded-lg">
                In Stock Only
                <button
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-blue-900 cursor-pointer p-0.5"
                  aria-label="Remove in stock filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold rounded-lg">
                Rating: {minRating}★ & above
                <button
                  onClick={() => setMinRating(0)}
                  className="hover:text-blue-900 cursor-pointer p-0.5"
                  aria-label="Remove rating filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-2 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 5. PRODUCT GRID / EMPTY STATE                                     */}
        {/* ----------------------------------------------------------------- */}
        {filteredAndSortedProducts.length === 0 ? (
          /* Empty State */
          <div className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-8 sm:p-14 text-center my-8 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-500 mb-2">
              <Package className="w-8 h-8 stroke-[1.7]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              No products found
            </h2>
            <p className="text-sm text-slate-500 max-w-md">
              Try adjusting your filters or browse all products to discover our full collection.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 h-12 bg-[#2563EB] hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        ) : (
          /* Standard Responsive Vertical Product Grid */
          <section aria-label="Product list">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
              {displayedProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <TechNovaProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    onSelectProduct={onSelectProduct}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                </div>
              ))}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 6. PAGINATION / LOAD MORE                                     */}
            {/* ------------------------------------------------------------- */}
            {filteredAndSortedProducts.length > displayedProducts.length && (
              <div className="mt-12 sm:mt-16 text-center flex flex-col items-center space-y-3">
                <span className="text-xs sm:text-sm font-medium text-slate-500">
                  Showing{' '}
                  <strong className="text-[#0F172A] font-bold font-mono">
                    {displayedProducts.length}
                  </strong>{' '}
                  of{' '}
                  <strong className="text-[#0F172A] font-bold font-mono">
                    {filteredAndSortedProducts.length}
                  </strong>{' '}
                  products
                </span>

                {/* Progress bar */}
                <div className="w-48 sm:w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
                    style={{
                      width: `${(displayedProducts.length / filteredAndSortedProducts.length) * 100}%`,
                    }}
                  />
                </div>

                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="mt-3 px-8 h-12 bg-white border border-[#E5E7EB] hover:border-[#2563EB] hover:text-[#2563EB] active:scale-98 text-[#0F172A] font-semibold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Load More Products
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 7. ACCESSIBLE FILTER DRAWER (SLIDE-OVER)                            */}
      {/* ------------------------------------------------------------------- */}
      {isFilterDrawerOpen && (
        <div
          id="filter-drawer-container"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-drawer-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsFilterDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#2563EB]" />
                <h2 id="filter-drawer-title" className="text-lg font-bold text-[#0F172A]">
                  Filter Products
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] font-bold">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer px-2 py-1"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close filters drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-7 flex-1 divide-y divide-slate-100">
              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category
                </h3>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = activeCategory === cat.id;
                    const count = categoryCounts[cat.id] ?? 0;
                    return (
                      <label
                        key={cat.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50/80 text-[#2563EB] font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="drawer-category"
                            checked={isSelected}
                            onChange={() => handleCategoryChange(cat.id)}
                            className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] border-slate-300"
                          />
                          <span className="text-sm">{cat.label}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="pt-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Price Range
                </h3>
                <div className="space-y-1.5">
                  {PRICE_RANGES.map((range) => {
                    const isSelected = activePriceRange === range.id;
                    return (
                      <label
                        key={range.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50/80 text-[#2563EB] font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="drawer-price"
                            checked={isSelected}
                            onChange={() => setActivePriceRange(range.id)}
                            className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] border-slate-300"
                          />
                          <span className="text-sm">{range.label}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Availability
                </h3>
                <label className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-slate-50 text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-[#2563EB] rounded-sm focus:ring-[#2563EB] border-slate-300"
                  />
                  <span className="text-sm font-medium">In Stock Only</span>
                </label>
              </div>

              {/* Rating Filter */}
              <div className="pt-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer Rating
                </h3>
                <div className="space-y-1.5">
                  {RATING_OPTIONS.map((opt) => {
                    const isSelected = minRating === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50/80 text-[#2563EB] font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="drawer-rating"
                            checked={isSelected}
                            onChange={() => setMinRating(opt.value)}
                            className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] border-slate-300"
                          />
                          <span className="text-sm flex items-center gap-1">
                            {opt.value > 0 ? (
                              <>
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                                <span>{opt.label}</span>
                              </>
                            ) : (
                              <span>{opt.label}</span>
                            )}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] p-4 sm:p-6 grid grid-cols-2 gap-3 z-10 shadow-lg">
              <button
                onClick={handleResetFilters}
                className="h-12 border border-[#E5E7EB] hover:bg-slate-100 text-[#0F172A] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="h-12 bg-[#2563EB] hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Show ({filteredAndSortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
