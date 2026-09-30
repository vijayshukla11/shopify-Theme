export interface OnboardingStep {
  id: string;
  category: 'General' | 'Products' | 'Design' | 'Navigation' | 'Launch';
  title: string;
  description: string;
  requiredSetting: string;
  recommendedValue: string;
  isCompleted?: boolean;
}

export interface ImageDimensionGuide {
  assetType: string;
  recommendedAspect: string;
  recommendedPx: string;
  fileFormat: string;
  merchantTip: string;
}

export class OnboardingGuideData {
  static STEPS: OnboardingStep[] = [
    {
      id: 'step-1',
      category: 'General',
      title: 'Configure Store Identity & Meta Title',
      description: 'Set your primary store name and brand tagline in Nova Theme Editor -> General & Brand tab.',
      requiredSetting: 'Theme Editor -> Store Name',
      recommendedValue: 'Your Brand Name | High-Performance Hardware'
    },
    {
      id: 'step-2',
      category: 'Design',
      title: 'Select a Commercial Demo Preset',
      description: 'Choose a starting theme preset (Electronics, Fashion, Furniture, Beauty, or Sports) to load optimized typography and color tokens.',
      requiredSetting: 'Theme Editor -> Demo Presets',
      recommendedValue: 'Nova Tech Pro (Electronics)'
    },
    {
      id: 'step-3',
      category: 'Navigation',
      title: 'Build OS 2.0 Mega Menu Navigation',
      description: 'Assign a nested menu with top-level categories (Audio, Laptops, Displays) and associate collection promo banners.',
      requiredSetting: 'Shopify Admin -> Navigation -> Main Menu',
      recommendedValue: '3-level nested menu tree'
    },
    {
      id: 'step-4',
      category: 'Products',
      title: 'Configure Product Media & Aspect Ratios',
      description: 'Upload high-resolution square (1:1) or portrait (3:4) product images with consistent white/light backgrounds.',
      requiredSetting: 'Shopify Admin -> Products -> Media',
      recommendedValue: '2000 x 2000 px, WebP or JPEG'
    },
    {
      id: 'step-5',
      category: 'Products',
      title: 'Enable Predictive Search & Quick Add',
      description: 'Toggle predictive search autocomplete and quick add drawer in Theme Editor for high conversion.',
      requiredSetting: 'Theme Editor -> Predictive Search',
      recommendedValue: 'Debounce: 100ms, Max Results: 6'
    },
    {
      id: 'step-6',
      category: 'Launch',
      title: 'Verify Core Web Vitals & Accessibility',
      description: 'Run final browser audit to ensure LCP < 2.0s, CLS = 0.00, and WCAG 2.2 AA focus indicators are visible.',
      requiredSetting: 'Theme Editor -> Accessibility & Performance',
      recommendedValue: 'High Contrast: On, Lazy Load: Enabled'
    }
  ];

  static IMAGE_DIMENSIONS: ImageDimensionGuide[] = [
    {
      assetType: 'Header Brand Logo',
      recommendedAspect: 'Flexible (Max 4:1)',
      recommendedPx: '400 x 100 px',
      fileFormat: 'PNG (Transparent) or SVG',
      merchantTip: 'Upload high-density 2x logo for Retina displays.'
    },
    {
      assetType: 'Hero Banner Slide',
      recommendedAspect: '16:9 or 21:9',
      recommendedPx: '2400 x 1350 px',
      fileFormat: 'WebP or JPEG (85% Quality)',
      merchantTip: 'Keep focal subject centered to prevent mobile crop.'
    },
    {
      assetType: 'Product Cards & Gallery',
      recommendedAspect: '1:1 Square or 3:4 Portrait',
      recommendedPx: '2000 x 2000 px',
      fileFormat: 'WebP or JPEG',
      merchantTip: 'Consistent aspect ratio prevents layout shift (CLS = 0).'
    },
    {
      assetType: 'Collection Header Grid',
      recommendedAspect: '16:9 Landscape',
      recommendedPx: '1600 x 900 px',
      fileFormat: 'WebP or JPEG',
      merchantTip: 'Subtle dark overlays improve text readability.'
    },
    {
      assetType: 'Blog Article Cover',
      recommendedAspect: '16:9 Widescreen',
      recommendedPx: '1200 x 675 px',
      fileFormat: 'WebP or JPEG',
      merchantTip: 'Compress under 300KB for fast article loading.'
    }
  ];

  static LAUNCH_CHECKLIST = [
    { title: 'Tax & Payment Gateway Verification', status: 'Passed', detail: 'Shopify Payments / Stripe connected' },
    { title: 'Domain SSL & DNS Record Binding', status: 'Passed', detail: 'HTTPS primary domain active' },
    { title: 'Predictive Search Autocomplete Test', status: 'Passed', detail: 'Instant AJAX search verified' },
    { title: 'Cart Drawer & Checkout Flow', status: 'Passed', detail: 'Free shipping bar & AJAX add-to-cart verified' },
    { title: 'Mobile Touch Target Calibration (44px)', status: 'Passed', detail: 'WCAG 2.2 AA touch targets verified' },
    { title: 'Lighthouse Performance Score (98-100)', status: 'Passed', detail: 'Core Web Vitals green verified' }
  ];
}
