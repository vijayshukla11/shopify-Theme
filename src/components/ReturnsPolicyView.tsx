import React, { useState } from 'react';
import {
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  Printer,
  PackageCheck,
  RotateCcw,
  Clock,
  HelpCircle
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface ReturnsPolicyViewProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

export const ReturnsPolicyView: React.FC<ReturnsPolicyViewProps> = ({
  onNavigateHome,
  onNavigateContact
}) => {
  const [returnOrderId, setReturnOrderId] = useState('');
  const [returnEmail, setReturnEmail] = useState('');
  const [returnStep, setReturnStep] = useState<number>(1);
  const [returnReason, setReturnReason] = useState<string>('Acoustic Fit / Sound Preference');
  const [isPortalSuccess, setIsPortalSuccess] = useState<boolean>(false);

  const handlePortalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrderId || !returnEmail) return;
    setIsPortalSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SeoMeta
        title="30-Day Risk-Free Returns & Exchange Policy - Nova Tech"
        description="Comprehensive returns, refunds, instant exchanges, 30-day risk-free trial, prepaid labels, and step-by-step return portal initiation."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Store', onClick: onNavigateHome },
          { label: 'Returns & Refunds', active: true }
        ]}
        badge="30-Day Risk-Free Guarantee"
        title="Returns, Exchanges & Refund Policy"
        description="Test our acoustic hardware in your own studio or listening environment for 30 days. If you're not completely satisfied, return it risk-free."
      />

      {/* 4-Step Interactive Return Portal Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <span className="badge badge--emerald uppercase font-mono text-[10px]">Self-Service Portal</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Initiate a Return or Exchange</h3>
            <p className="text-xs text-slate-500">Generate a prepaid FedEx/UPS label instantly with your order number.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>Average refund processing: 3 business days</span>
          </div>
        </div>

        {isPortalSuccess ? (
          <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Prepaid Return Label Generated!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              We have dispatched your return authorization label for order <strong>{returnOrderId}</strong> to <strong>{returnEmail}</strong>. Print the label and drop off the package at any authorized FedEx location.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => alert('Printing prepaid shipping label PDF...')}
                className="btn btn-primary text-xs font-bold py-2.5 px-6 gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Return Label</span>
              </button>
              <button
                onClick={() => setIsPortalSuccess(false)}
                className="btn btn-secondary text-xs font-bold py-2.5 px-6"
              >
                Start Another Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePortalSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                  1. Order Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NCF-948201"
                  value={returnOrderId}
                  onChange={(e) => setReturnOrderId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                  2. Account Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={returnEmail}
                  onChange={(e) => setReturnEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                  3. Reason for Return
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Acoustic Fit / Sound Preference">Acoustic Fit / Sound Preference</option>
                  <option value="Ordered Wrong Model / Size">Ordered Wrong Model / Size</option>
                  <option value="Want Free Instant Exchange">Want Free Instant Exchange</option>
                  <option value="Defective / Technical Issue">Defective / Technical Issue</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Prepaid label costs are waived for all US returns & exchanges.</span>
              </span>

              <button type="submit" className="btn btn-primary text-xs font-bold py-3 px-8 gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Generate Prepaid Return Label</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 4 Step Process Cards */}
      <div className="space-y-6">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          How the Return Process Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold flex items-center justify-center text-xs">
              01
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Initiate Portal Request</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter your order ID and email above to select items for return or instant exchange.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold flex items-center justify-center text-xs">
              02
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Print Prepaid Label</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Download and print the pre-addressed FedEx return label sent to your email.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold flex items-center justify-center text-xs">
              03
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Package Hardware</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Place items back in original packaging along with all cables, adapters, and ear tips.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold flex items-center justify-center text-xs">
              04
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Receive Refund</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upon warehouse inspection, your original payment method is credited within 3 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Conditions & Exceptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Eligible Items & Criteria</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Returned within 30 days of initial package delivery date</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Includes original box, serial number label, cables & accessories</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Item in clean, like-new cosmetic condition</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Exceptions & Non-Returnable Items</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Custom engraved IEM shell plates or custom cable lengths</span>
            </li>
            <li className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Opened silicone/foam ear tip packs (hygiene policy unless defective)</span>
            </li>
            <li className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Digital software licenses or redeemed gift cards</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
