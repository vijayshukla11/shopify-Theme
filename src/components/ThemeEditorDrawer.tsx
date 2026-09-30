import React, { useState, useEffect } from 'react';
import {
  Sliders,
  X,
  Check,
  Search,
  Type,
  Palette,
  Layout,
  PanelTop,
  PanelBottom,
  ShoppingBag,
  Grid,
  FileText,
  User,
  Sparkles,
  Zap,
  Eye,
  Code,
  RotateCcw,
  Globe,
  SlidersHorizontal,
  Layers,
  CheckCircle2,
  Info,
  Download,
  Upload,
  Save,
  Copy
} from 'lucide-react';
import { MerchantThemeSettings } from '../types/search';
import { DEFAULT_MERCHANT_THEME_SETTINGS } from '../constants/defaultThemeSettings';
import { ThemePresetsList } from '../constants/themePresets';
import { DesignSystemEngine, CustomPreset } from '../utils/designSystemEngine';
import { DesignSystemLibrary } from './DesignSystemLibrary';

interface ThemeEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: MerchantThemeSettings;
  onUpdateSettings: (newSettings: MerchantThemeSettings) => void;
}

type TabCategory =
  | 'general'
  | 'typography'
  | 'colors'
  | 'buttons_cards'
  | 'layout'
  | 'header'
  | 'footer'
  | 'products'
  | 'collections'
  | 'blog'
  | 'account'
  | 'search'
  | 'performance'
  | 'accessibility'
  | 'advanced';

export const ThemeEditorDrawer: React.FC<ThemeEditorDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState<TabCategory>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDesignLibraryOpen, setIsDesignLibraryOpen] = useState(false);
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [jsonInput, setJsonInput] = useState('');

  // Sync design tokens live to document root CSS custom variables
  useEffect(() => {
    DesignSystemEngine.applyTokensToDOM(settings);
  }, [settings]);

  // Load custom presets on load
  useEffect(() => {
    setCustomPresets(DesignSystemEngine.getCustomPresets());
  }, []);

  if (!isOpen) return null;

  const handleChange = <K extends keyof MerchantThemeSettings>(key: K, value: MerchantThemeSettings[K]) => {
    const updated = {
      ...settings,
      [key]: value
    };
    onUpdateSettings(updated);
    DesignSystemEngine.applyTokensToDOM(updated);
  };

  const handleReset = () => {
    if (window.confirm('Reset all theme settings to default Shopify OS 2.0 theme defaults?')) {
      onUpdateSettings(DEFAULT_MERCHANT_THEME_SETTINGS);
      DesignSystemEngine.applyTokensToDOM(DEFAULT_MERCHANT_THEME_SETTINGS);
      triggerToast('Theme settings reset to default');
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveCustomPreset = () => {
    if (!newPresetName.trim()) {
      alert('Please enter a preset name');
      return;
    }
    const created = DesignSystemEngine.saveCustomPreset(newPresetName, 'User saved custom preset', settings);
    setCustomPresets(DesignSystemEngine.getCustomPresets());
    setNewPresetName('');
    triggerToast(`Preset "${created.name}" saved!`);
  };

  const handleExportJSON = () => {
    DesignSystemEngine.exportSettingsToJSON(settings);
    triggerToast('Theme preset exported as JSON file!');
  };

  const handleImportJSON = () => {
    if (!jsonInput.trim()) {
      alert('Please paste valid JSON settings first.');
      return;
    }
    const parsed = DesignSystemEngine.parseImportedJSON(jsonInput);
    if (parsed) {
      const merged = { ...settings, ...parsed };
      onUpdateSettings(merged);
      DesignSystemEngine.applyTokensToDOM(merged);
      setJsonInput('');
      triggerToast('Theme settings imported successfully!');
    } else {
      alert('Invalid JSON structure. Please check syntax.');
    }
  };

  const CATEGORIES: { id: TabCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'general', label: 'General & Brand', icon: Globe },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'colors', label: 'Color System', icon: Palette },
    { id: 'buttons_cards', label: 'Buttons & Cards', icon: Layers },
    { id: 'layout', label: 'Layout & Spacing', icon: Layout },
    { id: 'header', label: 'Header Navigation', icon: PanelTop },
    { id: 'footer', label: 'Footer & Trust', icon: PanelBottom },
    { id: 'products', label: 'Products & Cards', icon: ShoppingBag },
    { id: 'collections', label: 'Collections Grid', icon: Grid },
    { id: 'blog', label: 'Blog Engine', icon: FileText },
    { id: 'account', label: 'Customer Account', icon: User },
    { id: 'search', label: 'Predictive Search', icon: Sparkles },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'accessibility', label: 'Accessibility', icon: Eye },
    { id: 'advanced', label: 'Advanced & Presets', icon: Code }
  ];

  return (
    <>
      <DesignSystemLibrary
        isOpen={isDesignLibraryOpen}
        onClose={() => setIsDesignLibraryOpen(false)}
        settings={settings}
      />

      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        />

        {/* Drawer Container */}
        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-600 text-white shadow-md shadow-sky-600/20">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Shopify Theme Editor</h3>
                  <span className="text-[10px] font-mono uppercase bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-bold px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                    OS 2.0 Ready
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">Global Merchant Schema Controls & Design System</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDesignLibraryOpen(true)}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition"
                title="Open Component Library Showcase"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Design System</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Close Theme Editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter theme settings by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Horizontal Category Pill Tabs */}
          {!searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                      isActive
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* 1. GENERAL & BRAND */}
          {(activeTab === 'general' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-600" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    General Store Identity & Brand
                  </h4>
                </div>
              </div>

              {/* Commercial Demo Presets Quick Selector */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  Load Commercial Demo Preset:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {ThemePresetsList.PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onUpdateSettings({
                          ...settings,
                          ...preset.settings
                        });
                        triggerToast(`Loaded "${preset.name}" preset!`);
                      }}
                      className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-sky-950 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                      <span>{preset.name.split(' ')[0]} {preset.name.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => handleChange('storeName', e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Primary title used in header logo and meta titles.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.brandTagline}
                    onChange={(e) => handleChange('brandTagline', e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. TYPOGRAPHY */}
          {(activeTab === 'typography' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Type className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Typography System
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Font Family Stack
                  </label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => handleChange('fontFamily', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="sans">Sans-Serif (Plus Jakarta Sans)</option>
                    <option value="system">System Default</option>
                    <option value="serif">Serif (Playfair / Luxury)</option>
                    <option value="mono">Monospace (Technical)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Heading Scale Ratio
                  </label>
                  <select
                    value={settings.headingScale}
                    onChange={(e) => handleChange('headingScale', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="sm">Small (Compact UI)</option>
                    <option value="md">Medium (Balanced)</option>
                    <option value="lg">Large (Commercial Standard)</option>
                    <option value="xl">Extra Large (High Impact)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Body Text Size
                  </label>
                  <select
                    value={settings.bodyScale}
                    onChange={(e) => handleChange('bodyScale', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="sm">Small (14px)</option>
                    <option value="md">Standard (16px)</option>
                    <option value="lg">Large (18px)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Line Height Ratio
                  </label>
                  <select
                    value={settings.lineHeight}
                    onChange={(e) => handleChange('lineHeight', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="tight">Tight (1.25)</option>
                    <option value="normal">Normal (1.5)</option>
                    <option value="relaxed">Relaxed (1.75)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 3. COLOR SYSTEM */}
          {(activeTab === 'colors' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Palette className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Global Color Palette & Tokens
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Primary CTA', key: 'primaryColor' as const },
                  { label: 'Secondary Neutral', key: 'secondaryColor' as const },
                  { label: 'Accent Highlight', key: 'accentColor' as const },
                  { label: 'Background', key: 'backgroundColor' as const },
                  { label: 'Card Surface', key: 'surfaceColor' as const },
                  { label: 'Border Color', key: 'borderColor' as const },
                  { label: 'Success Badge', key: 'successColor' as const },
                  { label: 'Warning Badge', key: 'warningColor' as const },
                  { label: 'Error / Danger', key: 'errorColor' as const }
                ].map((colorItem) => (
                  <div key={colorItem.key} className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {colorItem.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings[colorItem.key]}
                        onChange={(e) => handleChange(colorItem.key, e.target.value)}
                        className="w-8 h-8 rounded border border-slate-200 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={settings[colorItem.key]}
                        onChange={(e) => handleChange(colorItem.key, e.target.value)}
                        className="w-full text-[11px] font-mono p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. BUTTONS & CARDS */}
          {(activeTab === 'buttons_cards' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Layers className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Buttons & Card System Architecture
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Button Border Radius
                  </label>
                  <select
                    value={settings.buttonRadius}
                    onChange={(e) => handleChange('buttonRadius', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="none">Square (0px)</option>
                    <option value="sm">Small (4px)</option>
                    <option value="md">Medium (8px)</option>
                    <option value="lg">Large (12px)</option>
                    <option value="full">Pill / Full Round</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Button Height Variant
                  </label>
                  <select
                    value={settings.buttonHeight}
                    onChange={(e) => handleChange('buttonHeight', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="compact">Compact (36px)</option>
                    <option value="standard">Standard (44px)</option>
                    <option value="spacious">Spacious (52px)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Card Corner Radius
                  </label>
                  <select
                    value={settings.cardRadius}
                    onChange={(e) => handleChange('cardRadius', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="none">Square (0px)</option>
                    <option value="sm">Small (6px)</option>
                    <option value="md">Medium (12px)</option>
                    <option value="lg">Large (16px)</option>
                    <option value="xl">Rounded (24px)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Card Hover Elevation
                  </label>
                  <select
                    value={settings.cardHoverElevation}
                    onChange={(e) => handleChange('cardHoverElevation', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="none">None (Static)</option>
                    <option value="lift">Subtle Lift (-4px)</option>
                    <option value="zoom">Scale Zoom (+2%)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 5. LAYOUT & SPACING */}
          {(activeTab === 'layout' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Layout className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Layout Grid & Container Boundaries
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Container Max Width
                  </label>
                  <select
                    value={settings.containerMaxWidth}
                    onChange={(e) => handleChange('containerMaxWidth', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="1280px">1280px (Standard)</option>
                    <option value="1440px">1440px (Commercial Theme Standard)</option>
                    <option value="1600px">1600px (Ultra-wide)</option>
                    <option value="full">Full Screen Edge-to-Edge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Section Spacing Scale
                  </label>
                  <select
                    value={settings.sectionSpacing}
                    onChange={(e) => handleChange('sectionSpacing', e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="compact">Compact (32px)</option>
                    <option value="comfortable">Comfortable (64px)</option>
                    <option value="spacious">Spacious (96px)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 6. HEADER NAVIGATION */}
          {(activeTab === 'header' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <PanelTop className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Header & Mega Menu Navigation
                </h4>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">Sticky Header Bar</span>
                    <span className="text-[11px] text-slate-500 block">Keep header fixed to top when scrolling down</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.stickyHeader}
                    onChange={(e) => handleChange('stickyHeader', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">Top Announcement Bar</span>
                    <span className="text-[11px] text-slate-500 block">Show promotional bar above main navigation</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showAnnouncementBar}
                    onChange={(e) => handleChange('showAnnouncementBar', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => handleChange('announcementText', e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 7. FOOTER */}
          {(activeTab === 'footer' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <PanelBottom className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Footer Layout & Trust Elements
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Newsletter Subscription</span>
                  <input
                    type="checkbox"
                    checked={settings.footerShowNewsletter}
                    onChange={(e) => handleChange('footerShowNewsletter', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Payment Method Icons</span>
                  <input
                    type="checkbox"
                    checked={settings.footerShowPaymentIcons}
                    onChange={(e) => handleChange('footerShowPaymentIcons', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {/* 8. PRODUCTS & CARDS */}
          {(activeTab === 'products' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <ShoppingBag className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Product Card Display & PDP Controls
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Quick View Drawer</span>
                  <input
                    type="checkbox"
                    checked={settings.enableQuickView}
                    onChange={(e) => handleChange('enableQuickView', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Quick Add to Cart</span>
                  <input
                    type="checkbox"
                    checked={settings.enableQuickAdd}
                    onChange={(e) => handleChange('enableQuickAdd', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Display Vendor Name</span>
                  <input
                    type="checkbox"
                    checked={settings.showVendors}
                    onChange={(e) => handleChange('showVendors', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Display Rating Stars</span>
                  <input
                    type="checkbox"
                    checked={settings.showRatings}
                    onChange={(e) => handleChange('showRatings', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {/* 9. PREDICTIVE SEARCH */}
          {(activeTab === 'search' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Predictive Search Engine Controls
                </h4>
              </div>

              <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Enable Predictive Search Dropdown</span>
                  <span className="text-[11px] text-slate-500 block">Instant search popover while typing</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enablePredictiveSearch}
                  onChange={(e) => handleChange('enablePredictiveSearch', e.target.checked)}
                  className="w-4 h-4 accent-sky-600 rounded"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Max Results Limit</label>
                  <select
                    value={settings.maxPredictiveResults}
                    onChange={(e) => handleChange('maxPredictiveResults', Number(e.target.value))}
                    className="w-full text-xs p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  >
                    <option value={4}>4 Products</option>
                    <option value={6}>6 Products</option>
                    <option value={8}>8 Products</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Debounce Delay</label>
                  <select
                    value={settings.searchDebounceMs}
                    onChange={(e) => handleChange('searchDebounceMs', Number(e.target.value))}
                    className="w-full text-xs p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  >
                    <option value={100}>100ms (Instant)</option>
                    <option value={300}>300ms (Balanced)</option>
                    <option value={500}>500ms (Low CPU)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 10. ACCESSIBILITY & PERFORMANCE */}
          {(activeTab === 'accessibility' || activeTab === 'performance' || searchQuery) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Eye className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Accessibility & Performance Mode
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">High Contrast Mode</span>
                    <span className="text-[11px] text-slate-500 block">Increase focus ring contrast</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.highContrastMode}
                    onChange={(e) => handleChange('highContrastMode', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">Lazy Load Media</span>
                    <span className="text-[11px] text-slate-500 block">Defer offscreen images</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.lazyLoadImages}
                    onChange={(e) => handleChange('lazyLoadImages', e.target.checked)}
                    className="w-4 h-4 accent-sky-600 rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {/* 11. ADVANCED & PRESETS */}
          {(activeTab === 'advanced' || searchQuery) && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Code className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Preset Library & Theme Import/Export
                </h4>
              </div>

              {/* Save Preset Box */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Save className="w-4 h-4 text-sky-500" />
                  Save Active Settings as Custom Preset
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Preset name (e.g., Summer Black Friday Theme)..."
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    className="flex-1 text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={handleSaveCustomPreset}
                    className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg transition shrink-0"
                  >
                    Save Preset
                  </button>
                </div>
              </div>

              {/* Saved Custom Presets List */}
              {customPresets.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Saved Custom Presets ({customPresets.length})
                  </span>
                  <div className="space-y-2">
                    {customPresets.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                      >
                        <div>
                          <h5 className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</h5>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onUpdateSettings(p.settings);
                              DesignSystemEngine.applyTokensToDOM(p.settings);
                              triggerToast(`Loaded preset "${p.name}"`);
                            }}
                            className="px-2.5 py-1 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-[11px] rounded-lg hover:bg-sky-200 transition"
                          >
                            Apply
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete preset "${p.name}"?`)) {
                                setCustomPresets(DesignSystemEngine.deleteCustomPreset(p.id));
                                triggerToast('Preset deleted');
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Export / Import Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleExportJSON}
                  className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition"
                >
                  <Download className="w-4 h-4 text-sky-500" />
                  <span>Export Theme JSON</span>
                </button>

                <div className="space-y-1">
                  <button
                    onClick={handleImportJSON}
                    className="w-full p-3 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 text-sky-700 dark:text-sky-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-sky-200 dark:border-sky-800 transition"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import JSON Payload</span>
                  </button>
                </div>
              </div>

              {/* Import JSON Payload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Import Preset JSON Text
                </label>
                <textarea
                  rows={2}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste merchant theme JSON settings here to import..."
                  className="w-full text-xs font-mono p-2.5 bg-slate-900 text-sky-300 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Custom Merchant CSS Overrides
                </label>
                <textarea
                  rows={4}
                  value={settings.customCss}
                  onChange={(e) => handleChange('customCss', e.target.value)}
                  placeholder="/* Add merchant custom CSS overrides here */"
                  className="w-full text-xs font-mono p-3 bg-slate-900 text-sky-300 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs flex items-center gap-2 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Schema</span>
          </button>

          <button
            onClick={() => {
              triggerToast('Live Theme Settings Saved!');
              setTimeout(() => onClose(), 600);
            }}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition"
          >
            <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>Save Live Settings</span>
          </button>
        </div>

      </div>
    </div>
  </>
  );
};
