import { MerchantThemeSettings } from '../types/search';

export const DEFAULT_MERCHANT_THEME_SETTINGS: MerchantThemeSettings = {
  // Brand & General
  storeName: "CLINZA Electronics",
  brandTagline: "Trending Electronics, Smart Wearables & Audio Accessories",
  primaryLogoUrl: '',

  // Typography Settings
  fontFamily: 'sans',
  headingScale: 'lg',
  bodyScale: 'md',
  buttonFont: 'heading',
  lineHeight: 'normal',

  // Color Settings
  primaryColor: '#0284c7', // sky-600
  secondaryColor: '#475569', // slate-600
  accentColor: '#06b6d4', // cyan-500
  backgroundColor: '#f8fafc', // slate-50
  surfaceColor: '#ffffff',
  borderColor: '#e2e8f0', // slate-200
  successColor: '#10b981', // emerald-500
  warningColor: '#f59e0b', // amber-500
  errorColor: '#ef4444', // red-500

  // Button Settings
  buttonRadius: 'md',
  buttonHeight: 'standard',
  buttonShadow: 'subtle',
  buttonHoverStyle: 'lift',
  buttonOutlineStyle: 'thin',

  // Card Settings
  cardRadius: 'lg',
  cardBorder: 'subtle',
  cardShadow: 'subtle',
  cardHoverElevation: 'lift',

  // Layout & Spacing
  containerMaxWidth: '1440px',
  contentWidth: 'standard',
  sectionSpacing: 'comfortable',
  gridGap: 'md',
  cardGap: 'md',

  // Animation Settings
  enableAnimations: true,
  animationSpeed: 'normal',
  hoverEffects: true,
  reducedMotion: false,

  // Header Settings
  headerHeight: 'standard',
  stickyHeader: true,
  showAnnouncementBar: true,
  announcementText: '🇮🇳 Free Express Delivery Across India on Orders Over ₹999 | 1-Year Brand Warranty & COD Available',
  megaMenuEnabled: true,
  searchPlaceholder: 'Search smartwatches, TWS earbuds, headphones, speakers, chargers...',
  logoSize: 'medium',
  navigationAlignment: 'left',
  transparentHeader: false,
  mobileHeaderLayout: 'standard',

  // Footer Settings
  footerShowNewsletter: true,
  footerColumns: 4,
  footerShowSocial: true,
  footerShowPaymentIcons: true,
  footerShowTrustBadges: true,
  footerShowPolicies: true,
  footerCopyrightText: '© 2026 CLINZA Men\'s Apparel. Premium Indian Luxury Fashion.',

  // Product Card & PDP Settings
  productCardStyle: 'standard',
  productImageRatio: '1:1',
  enableQuickView: true,
  enableQuickAdd: true,
  badgeStyle: 'pill',
  showPrices: true,
  showVendors: true,
  showRatings: true,
  showSKU: true,
  showStockBadge: true,
  enableWishlist: true,
  enableCompare: true,
  showRecentlyViewed: true,

  // Collection Settings
  collectionDesktopColumns: 4,
  collectionTabletColumns: 2,
  collectionMobileColumns: 1,
  sidebarPosition: 'left',
  showCollectionToolbar: true,
  paginationStyle: 'numbered',
  enableFilters: true,
  enableSorting: true,

  // Blog Settings
  blogReadingWidth: '700px',
  blogTypographyScale: 'standard',
  showAuthorCard: true,
  showRelatedArticles: true,
  showBlogNewsletter: true,
  showSocialShare: true,
  showTableOfContents: true,

  // Customer Account Settings
  accountDashboardWidgets: true,
  accountShowWishlist: true,
  accountShowSavedItems: true,
  accountShowReturns: true,
  accountShowRecommendations: true,
  accountShowOrderHistory: true,
  accountShowAddresses: true,

  // Predictive Search & Navigation
  enablePredictiveSearch: true,
  maxPredictiveResults: 4,
  searchDebounceMs: 100,
  showCollections: true,
  showArticles: true,
  showImages: true,
  showRecentSearches: true,
  showTrendingSearches: true,
  megaMenuPromoEnabled: true,
  megaMenuPromoCode: 'CLINZA20',
  megaMenuPromoDiscount: '20% OFF',

  // Accessibility & Performance
  highContrastMode: false,
  focusRingStyle: 'bold',
  lazyLoadImages: true,
  customCss: ''
};
