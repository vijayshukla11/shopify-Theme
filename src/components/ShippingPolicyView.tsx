import React, { useState } from 'react';
import {
  Truck,
  Globe,
  Clock,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Box,
  HelpCircle
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface ShippingMethod {
  id: string;
  name: string;
  deliveryTime: string;
  cost: string;
  description: string;
  freeThreshold?: string;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Ground Delivery',
    deliveryTime: '3 - 5 Business Days',
    cost: '$9.95',
    freeThreshold: 'FREE on orders over $150',
    description: 'Fully tracked eco-friendly courier shipping via FedEx or UPS Ground across continental US and Canada.'
  },
  {
    id: 'express',
    name: 'Express 2-Day Priority Air',
    deliveryTime: '2 Business Days',
    cost: '$19.95',
    description: 'Guaranteed 2-day delivery with signature confirmation for high-value acoustic equipment and displays.'
  },
  {
    id: 'overnight',
    name: 'Next-Day Priority Overnight',
    deliveryTime: '1 Business Day (Order by 2 PM PST)',
    cost: '$34.95',
    description: 'Overnight morning delivery for urgent studio setups, replacement decks, or critical audio events.'
  },
  {
    id: 'freight',
    name: 'White-Glove Heavy Freight',
    deliveryTime: '5 - 7 Business Days',
    cost: '$89.90',
    description: 'Required for studio mastering displays and multi-unit audio rack bundles. Includes scheduled room-of-choice placement.'
  }
];

interface ShippingPolicyViewProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

export const ShippingPolicyView: React.FC<ShippingPolicyViewProps> = ({
  onNavigateHome,
  onNavigateContact
}) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<{
    found: boolean;
    status?: string;
    carrier?: string;
    origin?: string;
    destination?: string;
    estDelivery?: string;
  } | null>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    // Simulate order tracking lookup
    setTrackingResult({
      found: true,
      status: 'In Transit - Out for Regional Delivery',
      carrier: 'FedEx Express Air (AWB #849201948)',
      origin: 'CLINZA Logistics Hub, Bengaluru, Karnataka',
      destination: 'Mumbai, Maharashtra',
      estDelivery: 'Tomorrow by 4:00 PM IST'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SeoMeta
        title="Shipping Policy & Express Delivery - CLINZA Electronics"
        description="Detailed shipping methods, delivery timelines, pan-India express couriers, free delivery threshold, and live tracking procedures."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Store', onClick: onNavigateHome },
          { label: 'Shipping Policy', active: true }
        ]}
        badge="Fulfillment & Logistics"
        title="Shipping Methods, Rates & Pan-India Delivery"
        description="Fast, reliable delivery across 19,000+ Indian pincodes. Complimentary shipping on orders over ₹999 with live tracking."
      />

      {/* Track Order Quick Widget */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="badge badge--sky font-mono text-[10px] uppercase">Real-Time Dispatch</span>
            <h3 className="text-xl font-bold">Track Your CLINZA Order</h3>
            <p className="text-xs text-slate-300">Enter your order ID or tracking number (e.g., NCF-948201) to check live status.</p>
          </div>
          <form onSubmit={handleTrackOrder} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="e.g. NCF-948201..."
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-64"
            />
            <button type="submit" className="btn btn-primary text-xs font-bold py-2.5 px-5 shrink-0">
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {trackingResult && (
          <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-sky-500/30 text-xs space-y-2 animate-fadeIn font-mono">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{trackingResult.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 text-[11px] pt-2 border-t border-slate-700">
              <div><strong className="text-slate-400">Carrier:</strong> {trackingResult.carrier}</div>
              <div><strong className="text-slate-400">Dispatch Origin:</strong> {trackingResult.origin}</div>
              <div><strong className="text-slate-400">Est. Delivery:</strong> {trackingResult.estDelivery}</div>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Methods Table / Cards */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="badge uppercase font-mono text-xs">Options</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Available Domestic Shipping Methods
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHIPPING_METHODS.map((method) => (
            <div
              key={method.id}
              className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">{method.name}</h4>
                  <div className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{method.deliveryTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black font-mono text-slate-900 dark:text-white">{method.cost}</div>
                  {method.freeThreshold && (
                    <span className="badge badge--success text-[10px] font-mono">{method.freeThreshold}</span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* International Shipping */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">International Shipping & Customs</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
            We ship to over 84 countries worldwide. International shipments are processed with <strong>DDP (Delivered Duty Paid)</strong> option at checkout, allowing you to prepay import duties and VAT upfront so your order passes through customs without unexpected fees.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>EU & UK: 3 - 5 business days via DHL Express</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Japan & APAC: 4 - 6 business days via FedEx International</span>
            </li>
          </ul>
        </div>

        {/* Restrictions & P.O. Box Rules */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Address Restrictions & Lithium Batteries</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Due to UN3481 lithium-ion battery air transportation regulations, certain high-capacity battery packs or active DAC amplifiers must ship via certified ground freight to P.O. Boxes and APO/FPO addresses.
          </p>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 font-mono">
            <strong>APO / FPO / DPO Military Addresses:</strong> Standard Ground USPS Priority shipping only. Allow an additional 7 - 14 days for military postal processing.
          </div>
        </div>
      </div>
    </div>
  );
};
