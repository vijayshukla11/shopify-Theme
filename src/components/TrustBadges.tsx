import React from 'react';
import { ShieldCheck, Lock, RefreshCw, Truck, Award } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
      <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Buyer Protection & Guarantee</span>
      </h4>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Lock className="w-4 h-4 text-sky-500 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block leading-tight">256-Bit SSL</span>
            <span className="text-slate-500 text-[10px] block">Encrypted Checkout</span>
          </div>
        </div>

        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block leading-tight">30-Day Guarantee</span>
            <span className="text-slate-500 text-[10px] block">100% Refund Policy</span>
          </div>
        </div>

        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block leading-tight">Fast Global Air</span>
            <span className="text-slate-500 text-[10px] block">Insured Delivery</span>
          </div>
        </div>

        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-purple-500 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block leading-tight">2-Year Warranty</span>
            <span className="text-slate-500 text-[10px] block">Official Hardware Cover</span>
          </div>
        </div>
      </div>
    </div>
  );
};
