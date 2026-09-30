import React, { useState, useMemo } from 'react';
import {
  Search as SearchIcon,
  ArrowRight,
  Package,
  FileText,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  Check,
  ShoppingBag,
  Eye,
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Flame,
  Filter
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';
import { SearchFilterState } from '../types/search';
import { ncfAnalytics } from '../utils/ncfAnalytics';
import { Product } from '../types/product';

interface SearchViewProps {
  products: Product[];
  initialQuery?: string;
  onNavigateHome: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const DEFAULT_FILTERS: SearchFilterState = {
  inStockOnly: false,
  priceRange: [0, 5000],
  selectedVendors: [],
  selectedCategories: [],
  minRating: 0
};

export const SearchView: React.FC<SearchViewProps> = ({
  products,
  initialQuery = '',
  onNavigateHome,
  onAddToCart,
  onQuickView
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);

  const itemsPerPage = 8;

  // Filter products based on search term and active filters
  const filteredProducts = useMemo(() => {
    let result = products;

    // Search query string filter
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Filter: In Stock Only
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Filter: Price Range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter: Selected Categories
    if (filters.selectedCategories.length > 0) {
      result = result.filter(
        (p) =>
          filters.selectedCategories.includes(p.category) ||
          (filters.selectedCategories.includes('bottomwear') && p.category === 'trousers')
      );
    }

    // Filter: Min Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sorting Logic (Feature 7)
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'alphabetical-az':
          return a.name.localeCompare(b.name);
        case 'alphabetical-za':
          return b.name.localeCompare(a.name);
        case 'best-selling':
          return b.reviewsCount - a.reviewsCount;
        case 'featured':
        default:
          return 0;
      }
    });
  }, [products, query, filters, sortBy]);

  // Track zero-result searches via analytics
  React.useEffect(() => {
    if (filteredProducts.length === 0 && query.trim()) {
      ncfAnalytics.trackZeroResultSearch(query);
    }
  }, [filteredProducts.length, query]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategoryToggle = (cat: string) => {
    setFilters((prev) => {
      const exists = prev.selectedCategories.includes(cat);
      const updated = exists
        ? prev.selectedCategories.filter((c) => c !== cat)
        : [...prev.selectedCategories, cat];
      return { ...prev, selectedCategories: updated };
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title={`Search Results for "${query}" - Nova Commerce`}
        description={`Browse catalog products, audio hardware, computing gear, and technical specs matching "${query}".`}
      />

      {/* Breadcrumb Header */}
      <PageHeader
        breadcrumbs={[
          { label: 'Storefront', onClick: onNavigateHome },
          { label: 'Search Results', active: true }
        ]}
        badge="Enterprise Search"
        title={query ? `Results for "${query}"` : 'Store Catalog Search'}
        description="Instant debounced predictive search with facet filters, sorting, and responsive layout grids."
      />

      {/* Search Input Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full flex items-center">
          <SearchIcon className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search headphones, laptops, watches, displays..."
            className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden w-full sm:w-auto px-4 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Filter className="w-4 h-4 text-sky-400" />
          <span>Filters ({filters.selectedCategories.length + (filters.inStockOnly ? 1 : 0)})</span>
        </button>
      </div>

      {/* Main Content Layout (Sidebar Filters + Results Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Search Filters Sidebar (Feature 6) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-6 sticky top-24 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-sky-500" />
              <span>Search Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-mono text-slate-500 hover:text-sky-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Availability Filter */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-mono block">Availability</span>
            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                className="accent-sky-600 rounded"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>

          {/* Category Facets */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-mono block">Product Categories</span>
            {[
              { id: 'shirts', label: 'Shirts' },
              { id: 'bottomwear', label: 'Trousers' },
              { id: 'tshirts', label: 'T-Shirts' },
              { id: 'jeans', label: 'Jeans' },
              { id: 'cargos', label: 'Cargos' },
              { id: 'combos', label: 'Curated Combos' }
            ].map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={filters.selectedCategories.includes(cat.id)}
                  onChange={() => handleCategoryToggle(cat.id)}
                  className="accent-neutral-900 rounded"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase font-mono">Max Price</span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white">₹{filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={50}
              max={3000}
              step={50}
              value={filters.priceRange[1]}
              onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-mono block">Minimum Rating</span>
            {[4.5, 4.0, 3.5, 0].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilters((prev) => ({ ...prev, minRating: rating }))}
                className={`w-full text-left text-xs p-2 rounded-lg flex items-center justify-between transition ${
                  filters.minRating === rating
                    ? 'bg-sky-50 dark:bg-sky-950/60 font-bold text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{rating === 0 ? 'All Ratings' : `${rating}+ Stars`}</span>
                {rating > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                  </span>
                )}
              </button>
            ))}
          </div>

        </aside>

        {/* Results Main Column */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Results Bar (Count, Sort, Grid/List view) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</strong> matching products
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="alphabetical-az">Alphabetical: A-Z</option>
                  <option value="alphabetical-za">Alphabetical: Z-A</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Empty Search State (Feature 10) */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-xs">
              <div className="w-16 h-16 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto">
                <SearchIcon className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  No products found for "{query}"
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We couldn't find any products matching your exact query or selected filters. Try broadening your keywords or clearing filters.
                </p>
              </div>

              {/* Suggestions Chips */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">Try Searching For:</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {['headphones', 'laptops', 'wearables', 'audio', 'monitors'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        resetFilters();
                      }}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 text-slate-800 dark:text-slate-200 hover:text-sky-600 rounded-xl text-xs font-semibold transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Catalog Products Grid */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider text-left">
                  Popular Flagship Products
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  {products.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onQuickView(p)}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-sky-500 transition space-y-2"
                    >
                      <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-xl bg-white" />
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{p.name}</h5>
                      <span className="font-mono font-bold text-sky-600 text-xs">${p.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setQuery('');
                    resetFilters();
                    onNavigateHome();
                  }}
                  className="btn btn-primary btn-md font-bold mx-auto gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Return to Homepage Storefront</span>
                </button>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View (4 cols) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 badge badge--${product.badge.type}`}>
                        {product.badge.text}
                      </span>
                    )}

                    <button
                      onClick={() => onQuickView(product)}
                      className="absolute bottom-3 right-3 btn btn-secondary btn-sm rounded-full shadow-md opacity-90 hover:opacity-100 min-h-[44px]"
                      title="Quick View Specs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Quick View</span>
                    </button>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
                        <span className="uppercase">{product.category}</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-current" /> {product.rating}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-emerald-600 block">
                          {product.inStock ? 'In Stock' : 'Backorder'}
                        </span>
                      </div>

                      <button
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                        className="btn btn-primary btn-sm min-h-[44px]"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{product.category}</span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-lg">{product.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col justify-between sm:items-end w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 gap-3">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={!product.inStock}
                      className="btn btn-primary btn-sm font-bold min-h-[44px]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="btn btn-outline btn-sm min-h-[44px]"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`min-h-[44px] min-w-[44px] rounded-xl text-xs font-bold transition ${
                    currentPage === idx + 1
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="btn btn-outline btn-sm min-h-[44px]"
              >
                Next
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Search Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Items */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="accent-sky-600 rounded"
                  />
                  <span>In Stock Only</span>
                </label>

                <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase text-slate-400 block font-mono">Categories</span>
                  {[
                    { id: 'shirts', label: 'Shirts' },
                    { id: 'bottomwear', label: 'Trousers' },
                    { id: 'tshirts', label: 'T-Shirts' },
                    { id: 'jeans', label: 'Jeans' },
                    { id: 'cargos', label: 'Cargos' },
                    { id: 'combos', label: 'Curated Combos' }
                  ].map((c) => (
                    <label key={c.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={filters.selectedCategories.includes(c.id)}
                        onChange={() => handleCategoryToggle(c.id)}
                        className="accent-neutral-900 rounded"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="btn btn-primary btn-block font-bold min-h-[44px] mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
