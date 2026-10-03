import React from 'react';
import { Plus, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/cart';

interface CartUpsellsProps {
  onQuickAdd: (item: {
    productId: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }) => void;
  addedItemIds?: string[];
  location?: 'drawer' | 'page';
}

const RECOMMENDED_UPSELLS = [
  {
    productId: 'clinza-cable-type-c-100w-braided',
    name: '100W PD Type-C Braided Cable (1.8m)',
    category: 'cables',
    price: 499,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=300&q=80',
    tag: 'FBT'
  },
  {
    productId: 'clinza-charger-65w-gan-triple-port',
    name: '65W GaN Triple-Port Fast Adapter',
    category: 'chargers',
    price: 1499,
    originalPrice: 2799,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80',
    tag: 'Popular'
  },
  {
    productId: 'clinza-wireless-magsafe-car-mount',
    name: '15W MagSafe Magnetic Car Mount',
    category: 'mobile-accessories',
    price: 1299,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=300&q=80',
    tag: 'Essential'
  }
];

export const CartUpsells: React.FC<CartUpsellsProps> = ({
  onQuickAdd,
  addedItemIds = [],
  location = 'drawer'
}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Frequently Bought Together</span>
        </div>
        <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full">
          Save Bundle
        </span>
      </div>

      <div className={`grid ${location === 'page' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'} gap-2.5`}>
        {RECOMMENDED_UPSELLS.map((item) => {
          const isAdded = addedItemIds.includes(item.productId);

          return (
            <div
              key={item.productId}
              className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs hover:border-sky-500 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
                />
                <div className="min-w-0">
                  <span className="text-[9px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400 block">
                    {item.tag}
                  </span>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h5>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">₹{item.price.toLocaleString('en-IN')}</span>
                    {item.originalPrice && (
                      <s className="text-[10px] text-slate-400">₹{item.originalPrice.toLocaleString('en-IN')}</s>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onQuickAdd(item)}
                disabled={isAdded}
                className={`min-h-[44px] px-3 rounded-xl font-bold text-xs flex items-center gap-1 shrink-0 transition ${
                  isAdded
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-slate-900 hover:bg-sky-600 text-white'
                }`}
                aria-label={`Quick Add ${item.name} to Cart`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
