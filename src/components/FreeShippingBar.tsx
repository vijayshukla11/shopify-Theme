import React from 'react';
import { Truck, CheckCircle2, Sparkles } from 'lucide-react';
import { CLINZA_BUSINESS_RULES } from '../constants/businessRules';

interface FreeShippingBarProps {
  subtotal: number;
  threshold?: number;
}

export const FreeShippingBar: React.FC<FreeShippingBarProps> = ({
  subtotal,
  threshold = CLINZA_BUSINESS_RULES.FREE_SHIPPING_THRESHOLD
}) => {
  const remaining = Math.max(0, threshold - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
  const isUnlocked = subtotal >= threshold;

  return (
    <div className="bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 rounded-2xl p-3.5 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <Truck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 animate-bounce" />
          )}
          <span>
            {isUnlocked ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                <span>🎉 You unlocked FREE Express Shipping!</span>
              </span>
            ) : (
              <span>
                Add <strong className="text-sky-600 dark:text-sky-400 font-mono">₹{remaining.toLocaleString('en-IN')}</strong> more for <strong className="uppercase">Free Express Shipping</strong>
              </span>
            )}
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">{percentage}%</span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isUnlocked
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : 'bg-gradient-to-r from-sky-500 to-blue-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

