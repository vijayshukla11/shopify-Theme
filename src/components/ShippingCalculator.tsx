import React, { useState } from 'react';
import { Calculator, MapPin, Truck, Check, Loader2 } from 'lucide-react';
import { ShippingEstimate } from '../types/cart';

export const ShippingCalculator: React.FC = () => {
  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('California');
  const [zip, setZip] = useState('90210');
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimate, setEstimate] = useState<ShippingEstimate | null>(null);

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zip.trim()) return;

    setIsCalculating(true);
    setTimeout(() => {
      setEstimate({
        country,
        state,
        zip,
        method: 'Standard Insured Express Air',
        cost: 0,
        estimatedDays: '2 - 3 Business Days'
      });
      setIsCalculating(false);
    }, 600);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
        <Calculator className="w-4 h-4 text-sky-500" />
        <span>Estimate Shipping & Tax</span>
      </div>

      <form onSubmit={handleEstimate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="text-[11px] font-mono text-slate-500 block mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="Japan">Japan</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-500 block mb-1">State / Province</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="e.g. California"
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
          />
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-500 block mb-1">ZIP / Postal Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="e.g. 90210"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
            />
            <button
              type="submit"
              disabled={isCalculating}
              className="btn btn-primary btn-sm px-4 shrink-0 min-h-[44px] font-bold"
            >
              {isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Calculate'}
            </button>
          </div>
        </div>
      </form>

      {estimate && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs flex items-center justify-between text-emerald-900 dark:text-emerald-200 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">{estimate.method}</span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block">
                Estimated Delivery: {estimate.estimatedDays} to {zip}, {country}
              </span>
            </div>
          </div>
          <span className="font-mono font-extrabold text-sm text-emerald-600 dark:text-emerald-400 uppercase">
            {estimate.cost === 0 ? 'FREE' : `$${estimate.cost.toFixed(2)}`}
          </span>
        </div>
      )}
    </div>
  );
};
