export interface MerchantThemeSettings {
  // Brand & General
  storeName: string;
  brandTagline: string;
  primaryLogoUrl?: string;

  // Typography Settings
  fontFamily: 'system' | 'sans' | 'serif' | 'mono';
  headingScale: 'sm' | 'md' | 'lg' | 'xl';
  bodyScale: 'sm' | 'md' | 'lg';
  buttonFont: 'heading' | 'body' | 'mono';
  lineHeight: 'tight' | 'normal' | 'relaxed';

  // Colors Settings
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  borderColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;

  // Button Settings
  buttonRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  buttonHeight: 'compact' | 'standard' | 'spacious';
  buttonShadow: 'none' | 'subtle' | 'medium';
  buttonHoverStyle: 'lift' | 'fade' | 'glow';
  buttonOutlineStyle: 'thin' | 'thick';

  // Card Settings
  cardRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  cardBorder: 'none' | 'subtle' | 'solid';
  cardShadow: 'none' | 'subtle' | 'medium';
  cardHoverElevation: 'none' | 'lift' | 'zoom';

  // Layout & Spacing
  containerMaxWidth: '1280px' | '1440px' | '1600px' | 'full';
  contentWidth: 'narrow' | 'standard' | 'wide';
  sectionSpacing: 'compact' | 'comfortable' | 'spacious';
  gridGap: 'sm' | 'md' | 'lg';
  cardGap: 'sm' | 'md' | 'lg';

  // Animation Settings
  enableAnimations: boolean;
  animationSpeed: 'fast' | 'normal' | 'slow';
  hoverEffects: boolean;
  reducedMotion: boolean;

  // Header Settings
  headerHeight: 'compact' | 'standard' | 'tall';
  stickyHeader: boolean;
  showAnnouncementBar: boolean;
  announcementText: string;
  megaMenuEnabled: boolean;
  searchPlaceholder: string;
  logoSize: 'small' | 'medium' | 'large';
  navigationAlignment: 'left' | 'center' | 'right';
  transparentHeader: boolean;
  mobileHeaderLayout: 'standard' | 'compact';

  // Footer Settings
  footerShowNewsletter: boolean;
  footerColumns: number;
  footerShowSocial: boolean;
  footerShowPaymentIcons: boolean;
  footerShowTrustBadges: boolean;
  footerShowPolicies: boolean;
  footerCopyrightText: string;

  // Product Card & PDP Settings
  productCardStyle: 'standard' | 'minimal' | 'bordered';
  productImageRatio: '1:1' | '4:3' | '3:4';
  enableQuickView: boolean;
  enableQuickAdd: boolean;
  badgeStyle: 'pill' | 'square' | 'minimal';
  showPrices: boolean;
  showVendors: boolean;
  showRatings: boolean;
  showSKU: boolean;
  showStockBadge: boolean;
  enableWishlist: boolean;
  enableCompare: boolean;
  showRecentlyViewed: boolean;

  // Collection Settings
  collectionDesktopColumns: number;
  collectionTabletColumns: number;
  collectionMobileColumns: number;
  sidebarPosition: 'left' | 'right' | 'hidden';
  showCollectionToolbar: boolean;
  paginationStyle: 'numbered' | 'load-more' | 'infinite';
  enableFilters: boolean;
  enableSorting: boolean;

  // Blog Settings
  blogReadingWidth: '600px' | '700px' | '800px';
  blogTypographyScale: 'standard' | 'large';
  showAuthorCard: boolean;
  showRelatedArticles: boolean;
  showBlogNewsletter: boolean;
  showSocialShare: boolean;
  showTableOfContents: boolean;

  // Customer Account Settings
  accountDashboardWidgets: boolean;
  accountShowWishlist: boolean;
  accountShowSavedItems: boolean;
  accountShowReturns: boolean;
  accountShowRecommendations: boolean;
  accountShowOrderHistory: boolean;
  accountShowAddresses: boolean;

  // Predictive Search & Navigation
  enablePredictiveSearch: boolean;
  maxPredictiveResults: number;
  searchDebounceMs: number;
  showCollections: boolean;
  showArticles: boolean;
  showImages: boolean;
  showRecentSearches: boolean;
  showTrendingSearches: boolean;
  megaMenuPromoEnabled: boolean;
  megaMenuPromoCode: string;
  megaMenuPromoDiscount: string;

  // Accessibility & Performance
  highContrastMode: boolean;
  focusRingStyle: 'standard' | 'bold' | 'glow';
  lazyLoadImages: boolean;
  customCss: string;
}

export interface SearchFilterState {
  inStockOnly: boolean;
  priceRange: [number, number];
  selectedVendors: string[];
  selectedCategories: string[];
  minRating: number;
}

export interface ArticleResult {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
}

export interface CollectionResult {
  id: string;
  title: string;
  itemCount: number;
  image: string;
}
