import React from 'react';
import { Bookmark, ArrowUpRight, Trash2, ShoppingBag } from 'lucide-react';
import { SaveForLaterItem } from '../types/cart';

interface SaveForLaterProps {
  items: SaveForLaterItem[];
  onMoveToCart: (item: SaveForLaterItem) => void;
  onRemoveItem: (id: string) => void;
}

export const SaveForLater: React.FC<SaveForLaterProps> = ({
  items,
  onMoveToCart,
  onRemoveItem
}) => {
  if (items.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Bookmark className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
            Saved For Later ({items.length})
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Items stored in browser session</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg bg-white shrink-0 border border-slate-200 dark:border-slate-700"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase">{item.vendor}</span>
                <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">{item.name}</h5>
                <span className="font-mono font-extrabold text-xs text-sky-600 dark:text-sky-400">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onMoveToCart(item)}
                className="btn btn-primary btn-sm px-3 text-xs min-h-[44px] font-bold gap-1"
                title="Move back to Active Cart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Remove ${item.name} from saved items`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
