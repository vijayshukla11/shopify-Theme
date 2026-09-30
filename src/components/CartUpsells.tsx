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
    productId: 'upsell-dac-1',
    name: 'Pro Wireless Balanced DAC Amplifier',
    category: 'audio',
    price: 89.00,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80',
    tag: 'FBT'
  },
  {
    productId: 'upsell-dock-2',
    name: '120W GaN FastCharge USB-C Desktop Dock',
    category: 'computing',
    price: 69.00,
    originalPrice: 95.00,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=300&q=80',
    tag: 'Popular'
  },
  {
    productId: 'upsell-case-3',
    name: 'Custom Molded Hardcase Travel Shell',
    category: 'accessories',
    price: 34.00,
    originalPrice: 45.00,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
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
                    <span className="font-extrabold text-sky-600 dark:text-sky-400">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <s className="text-[10px] text-slate-400">${item.originalPrice.toFixed(2)}</s>
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
