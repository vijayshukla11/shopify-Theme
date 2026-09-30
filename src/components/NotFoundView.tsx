import React, { useState } from 'react';
import {
  Search,
  ArrowLeft,
  Home,
  ShoppingBag,
  Sparkles,
  HelpCircle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { SeoMeta } from './SeoMeta';

interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  rating: number;
  reviewsCount: number;
  badge?: { text: string; type: 'new' | 'sale' | 'hot' | 'success' };
  image: string;
  specs: string[];
  inStock: boolean;
  description: string;
}

interface NotFoundViewProps {
  products: Product[];
  onNavigateHome?: () => void;
  onNavigateCategory?: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  products,
  onNavigateHome,
  onNavigateCategory,
  onSelectProduct,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = products.slice(0, 3);

  const categories = [
    { key: 'audio', label: 'Audio & Sound', count: '18 Items' },
    { key: 'computing', label: 'Laptops & Displays', count: '12 Items' },
    { key: 'wearables', label: 'Smart Wearables', count: '9 Items' },
    { key: 'accessories', label: 'Mechanical Decks', count: '24 Items' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-center">
      <SeoMeta
        title="404 Page Not Found - Nova Tech Storefront"
        description="The requested page could not be located. Search our catalog, browse popular categories, or explore featured flagship electronics."
      />

      {/* Hero 404 Illustration & Message */}
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-black font-mono text-slate-200 dark:text-slate-800 tracking-widest select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="badge badge--sky font-mono font-bold text-xs uppercase shadow-lg">
              Page Signal Interrupted
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Oops! That Page Has Shifted Frequency.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The link you followed may be expired, or the product URL has been updated in our catalog. Let’s get you back on track.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search headphones, laptops, watches, DACs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery) {
                onNavigateHome?.();
              }
            }}
            className="w-full pl-10 pr-24 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl text-xs font-mono text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={() => onNavigateHome?.()}
            className="absolute right-2 top-2 btn btn-primary text-xs font-bold py-1.5 px-3"
          >
            Search
          </button>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={onNavigateHome}
            className="btn btn-primary text-xs font-bold py-3 px-6 gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>
        </div>
      </div>

      {/* Popular Categories Shortcut Cards */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-left">
        <h3 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
          Popular Hardware Categories:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onNavigateCategory?.(cat.key)}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 text-left space-y-1 transition-all hover:shadow-md group"
            >
              <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center justify-between">
                <span>{cat.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-sky-500" />
              </div>
              <div className="text-[10px] font-mono text-slate-400">{cat.count}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products Spotlight Grid */}
      <div className="space-y-6 text-left">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Or Explore Our Featured Flagships
          </h3>
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
          >
            View All Products →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct?.(product)}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 uppercase font-bold">
                  {product.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {product.name}
                </h4>
                <div className="text-sm font-mono font-black text-slate-900 dark:text-white">
                  ${product.price}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
                className="w-full btn btn-secondary text-xs font-bold py-2"
              >
                Quick Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
