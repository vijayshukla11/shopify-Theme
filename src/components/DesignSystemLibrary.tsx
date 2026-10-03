import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Layers,
  Type,
  Palette,
  Layout,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Sliders,
  ChevronRight,
  ShoppingBag,
  Star,
  Heart,
  Eye,
  SlidersHorizontal,
  Search,
  ChevronDown
} from 'lucide-react';
import { MerchantThemeSettings } from '../types/search';

interface DesignSystemLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  settings: MerchantThemeSettings;
}

export const DesignSystemLibrary: React.FC<DesignSystemLibraryProps> = ({
  isOpen,
  onClose,
  settings
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'buttons' | 'typography' | 'forms' | 'cards' | 'badges'>('all');
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [activeTabDemo, setActiveTabDemo] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col z-10 max-h-[92vh]">

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-600/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-white">Design Token & Component Library v2</h2>
                <span className="text-[10px] font-mono uppercase bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded-full border border-sky-500/30">
                  Live Token Inheritance
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Inspect how active merchant theme tokens apply across all storefront components.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Close Design Library"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Token Bar */}
        <div className="bg-slate-100 dark:bg-slate-950 px-6 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs overflow-x-auto shrink-0 font-mono text-slate-600 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" /> Active Tokens:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span>Primary:</span>
            <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: settings.primaryColor }} />
            <strong className="text-slate-900 dark:text-white">{settings.primaryColor}</strong>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span>Btn Radius:</span>
            <strong className="text-slate-900 dark:text-white">{settings.buttonRadius}</strong>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span>Card Radius:</span>
            <strong className="text-slate-900 dark:text-white">{settings.cardRadius}</strong>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span>Font:</span>
            <strong className="text-slate-900 dark:text-white uppercase">{settings.fontFamily}</strong>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'all' as const, label: 'All Components' },
            { id: 'buttons' as const, label: 'Buttons & Actions' },
            { id: 'typography' as const, label: 'Typography' },
            { id: 'forms' as const, label: 'Forms & Controls' },
            { id: 'cards' as const, label: 'Cards & Elevation' },
            { id: 'badges' as const, label: 'Badges & Alerts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Showcase Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">

          {/* 1. BUTTONS & ACTIONS */}
          {(activeTab === 'all' || activeTab === 'buttons') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Sliders className="w-4 h-4 text-sky-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Button Design Tokens & Actions
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Primary Button */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Primary CTA</span>
                  <button
                    className="w-full py-2.5 px-4 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                    style={{
                      backgroundColor: settings.primaryColor,
                      borderRadius: settings.buttonRadius === 'full' ? '9999px' : settings.buttonRadius === 'lg' ? '12px' : settings.buttonRadius === 'md' ? '8px' : settings.buttonRadius === 'sm' ? '4px' : '0px'
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart - $299.99</span>
                  </button>
                </div>

                {/* Secondary Button */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Secondary Neutral</span>
                  <button
                    className="w-full py-2.5 px-4 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                    style={{
                      backgroundColor: settings.secondaryColor,
                      borderRadius: settings.buttonRadius === 'full' ? '9999px' : settings.buttonRadius === 'lg' ? '12px' : settings.buttonRadius === 'md' ? '8px' : settings.buttonRadius === 'sm' ? '4px' : '0px'
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View Details</span>
                  </button>
                </div>

                {/* Accent Button */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Accent High Impact</span>
                  <button
                    className="w-full py-2.5 px-4 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                    style={{
                      backgroundColor: settings.accentColor,
                      borderRadius: settings.buttonRadius === 'full' ? '9999px' : settings.buttonRadius === 'lg' ? '12px' : settings.buttonRadius === 'md' ? '8px' : settings.buttonRadius === 'sm' ? '4px' : '0px'
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Instant Express Checkout</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* 2. TYPOGRAPHY */}
          {(activeTab === 'all' || activeTab === 'typography') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Type className="w-4 h-4 text-sky-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Typography Scale & Font Family Stack
                </h3>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold uppercase">
                    H1 Headline Display ({settings.fontFamily})
                  </span>
                  <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                    Next-Generation Audio Technology
                  </h1>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold uppercase">
                    H2 Section Header
                  </span>
                  <h2 className="font-extrabold text-xl text-slate-900 dark:text-white">
                    Engineered for Precision & Spatial Audio Clarity
                  </h2>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold uppercase">
                    Body Copy Paragraph
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    Experience studio-grade acoustic performance with custom 45mm beryllium drivers, active hybrid noise cancellation, and up to 40 hours of continuous wireless playback.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 3. FORMS & INPUTS */}
          {(activeTab === 'all' || activeTab === 'forms') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Form Controls, Inputs & Selectors
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Predictive Search Field
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      readOnly
                      value="Nova Pro ANC Headphones"
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Dropdown Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Variant Selector
                  </label>
                  <div className="relative">
                    <select
                      readOnly
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white appearance-none pr-8"
                    >
                      <option>Space Black (Beryllium Driver)</option>
                      <option>Arctic White (Studio Edition)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 4. CARDS & ELEVATION */}
          {(activeTab === 'all' || activeTab === 'cards') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Layout className="w-4 h-4 text-sky-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Product Card Component & Radius Token
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex gap-4 items-center"
                  style={{
                    borderRadius: settings.cardRadius === 'xl' ? '24px' : settings.cardRadius === 'lg' ? '16px' : settings.cardRadius === 'md' ? '12px' : settings.cardRadius === 'sm' ? '6px' : '0px'
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
                    alt="Sample"
                    className="w-20 h-20 object-cover rounded-lg shrink-0 aspect-square"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-sky-600 font-bold">Audio & Sound</span>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Nova Pro ANC Headphones</h4>
                    <p className="font-mono font-bold text-xs text-slate-900 dark:text-white mt-1">$299.99</p>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">In Stock • Free Shipping</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 5. BADGES & ALERTS */}
          {(activeTab === 'all' || activeTab === 'badges') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Status Badges & Feedback Banners
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-emerald-500 text-white font-mono font-bold text-[10px] uppercase rounded-full">
                  20% OFF SALE
                </span>
                <span className="px-3 py-1 bg-sky-600 text-white font-mono font-bold text-[10px] uppercase rounded-full">
                  NEW RELEASE
                </span>
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-mono font-bold text-[10px] uppercase rounded-full">
                  LIMITED STOCK
                </span>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Success Banner: Item successfully added to cart drawer!</span>
              </div>
            </section>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-mono">
            All design tokens are actively synchronized with the Theme Editor.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs transition shadow-md shadow-sky-600/20"
          >
            Return to Theme Editor
          </button>
        </div>

      </div>
    </div>
  );
};
