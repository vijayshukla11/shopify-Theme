import { MerchantThemeSettings } from '../types/search';
import { DEFAULT_MERCHANT_THEME_SETTINGS } from './defaultThemeSettings';

export interface ThemePreset {
  id: string;
  name: string;
  industry: string;
  description: string;
  accentColor: string;
  previewBg: string;
  settings: Partial<MerchantThemeSettings>;
}

export class ThemePresetsList {
  static PRESETS: ThemePreset[] = [
    {
      id: 'electronics',
      name: 'CLINZA Tech Pro (Electronics)',
      industry: 'Consumer Electronics & Smart Hardware',
      description: 'High-contrast clean aesthetic with precision grid cards, technical specs, and fast predictive search.',
      accentColor: '#0284c7',
      previewBg: 'bg-slate-900',
      settings: {
        ...DEFAULT_MERCHANT_THEME_SETTINGS,
        storeName: 'CLINZA Electronics & Audio',
        brandTagline: 'Trending Electronics & Smart Accessories',
        fontFamily: 'sans',
        primaryColor: '#0284c7',
        secondaryColor: '#334155',
        accentColor: '#06b6d4',
        cardRadius: 'md',
        buttonRadius: 'md',
        containerMaxWidth: '1440px',
        productCardStyle: 'standard'
      }
    },
    {
      id: 'minimal',
      name: 'CLINZA Minimalist (Modern Tech)',
      industry: 'Smart Audio, Wearables & Gadgets',
      description: 'Clean modern typography, controlled whitespace, compact badges, and 1:1 aspect ratio galleries.',
      accentColor: '#0ea5e9',
      previewBg: 'bg-slate-950',
      settings: {
        ...DEFAULT_MERCHANT_THEME_SETTINGS,
        storeName: 'CLINZA Electronics',
        brandTagline: 'Precision Engineered Consumer Tech',
        fontFamily: 'sans',
        headingScale: 'lg',
        bodyScale: 'md',
        primaryColor: '#0f172a',
        secondaryColor: '#64748b',
        accentColor: '#0ea5e9',
        backgroundColor: '#f8fafc',
        surfaceColor: '#ffffff',
        buttonRadius: 'lg',
        cardRadius: 'lg',
        productImageRatio: '1:1',
        badgeStyle: 'rounded',
        announcementText: '⚡ Complimentary Express Delivery Across India on Orders Over ₹999'
      }
    },
    {
      id: 'furniture',
      name: 'Habitat Nova (Furniture & Living)',
      industry: 'Nordic Interior Design, Home Decor & Architecture',
      description: 'Warm earth tones, spacious margins, comfortable padding, and soft rounded elevation.',
      accentColor: '#d97706',
      previewBg: 'bg-amber-50',
      settings: {
        ...DEFAULT_MERCHANT_THEME_SETTINGS,
        storeName: 'Habitat Nova Living',
        brandTagline: 'Scandinavian Interior Craftsmanship & Sustainable Oak',
        fontFamily: 'sans',
        lineHeight: 'relaxed',
        primaryColor: '#78350f',
        secondaryColor: '#92400e',
        accentColor: '#d97706',
        backgroundColor: '#fef3c7',
        surfaceColor: '#ffffff',
        buttonRadius: 'lg',
        cardRadius: 'xl',
        cardHoverElevation: 'lift',
        sectionSpacing: 'spacious',
        productImageRatio: '4:3'
      }
    },
    {
      id: 'beauty',
      name: 'Nova Botanicals (Beauty & Skincare)',
      industry: 'Organic Cosmetics, Wellness & Clean Skincare',
      description: 'Soft rose gold and botanical green tones, clean outline buttons, and quick-add ingredient tags.',
      accentColor: '#059669',
      previewBg: 'bg-emerald-50',
      settings: {
        ...DEFAULT_MERCHANT_THEME_SETTINGS,
        storeName: 'Nova Botanicals Clean Care',
        brandTagline: '100% Organic Dermatologist-Approved Botanical Actives',
        fontFamily: 'sans',
        primaryColor: '#047857',
        secondaryColor: '#065f46',
        accentColor: '#10b981',
        backgroundColor: '#f0fdf4',
        surfaceColor: '#ffffff',
        buttonRadius: 'full',
        buttonHoverStyle: 'glow',
        badgeStyle: 'pill',
        productCardStyle: 'bordered',
        announcementText: '🌿 Pure Botanical Harvest: Free Organic Serum Sample with Orders Over $90'
      }
    },
    {
      id: 'sports',
      name: 'Nova Velocity (Sports & Activewear)',
      industry: 'Performance Athletic Gear & Outdoor Trail Tech',
      description: 'High-energy neon accents, compact high-density grids, bold typography, and sticky filters.',
      accentColor: '#ea580c',
      previewBg: 'bg-zinc-900',
      settings: {
        ...DEFAULT_MERCHANT_THEME_SETTINGS,
        storeName: 'Nova Velocity Athletic',
        brandTagline: 'Pro-Grade Carbon Trail Gear & Kinetic Apparel',
        fontFamily: 'sans',
        headingScale: 'xl',
        primaryColor: '#ea580c',
        secondaryColor: '#3f3f46',
        accentColor: '#f97316',
        backgroundColor: '#18181b',
        surfaceColor: '#27272a',
        borderColor: '#3f3f46',
        buttonRadius: 'sm',
        buttonHeight: 'spacious',
        cardRadius: 'md',
        productImageRatio: '1:1',
        collectionDesktopColumns: 4
      }
    }
  ];
}
