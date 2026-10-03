export interface ProductVariantColor {
  name: string;
  hex?: string;
  bgClass?: string;
  image?: string;
  inStock?: boolean;
}

export interface ProductVariantSize {
  size: string;
  inStock: boolean;
  label?: string;
  remainingCount?: number;
}

export interface ProductMediaItem {
  type?: 'image' | 'video' | '360';
  url: string;
  alt?: string;
  thumbnail?: string;
}

export interface ProductReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  fitRating?: 'Runs Small' | 'True to Size' | 'Runs Large';
  helpfulCount?: number;
  avatar?: string;
  userImages?: string[];
}

export interface ProductHighlightItem {
  title: string;
  desc: string;
  iconName?: 'fabric' | 'style' | 'silhouette' | 'care' | 'shield' | 'truck' | 'leaf' | 'sparkles';
}

/* ========================================================================= */
/* A+ CONTENT ENGINE TYPES & MODULES                                         */
/* ========================================================================= */

export type APlusModuleType =
  | 'hero_story'
  | 'image_text'
  | 'feature_grid'
  | 'detail_story'
  | 'style_guide'
  | 'full_banner'
  | 'spec_table'
  | 'faq';

export interface APlusHeroStorySection {
  id: string;
  type: 'hero_story';
  headline: string;
  subheadline?: string;
  tagline?: string;
  description?: string;
  imageUrl: string;
  overlayPosition?: 'left' | 'right' | 'center' | 'bottom';
  theme?: 'light' | 'dark';
}

export interface APlusImageTextSection {
  id: string;
  type: 'image_text';
  title: string;
  subtitle?: string;
  body: string;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  badge?: string;
  features?: string[];
}

export interface APlusFeatureGridItem {
  number?: string; // e.g. "01", "02"
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

export interface APlusFeatureGridSection {
  id: string;
  type: 'feature_grid';
  title?: string;
  subtitle?: string;
  columns?: 3 | 4 | number;
  items: APlusFeatureGridItem[];
}

export interface APlusDetailStoryCard {
  title: string;
  description: string;
  imageUrl: string;
  caption?: string;
}

export interface APlusDetailStorySection {
  id: string;
  type: 'detail_story';
  title: string;
  subtitle?: string;
  description?: string;
  cards: APlusDetailStoryCard[];
}

export interface APlusStyleLook {
  lookNumber: string; // e.g. "LOOK 01", "LOOK 02", "LOOK 03"
  title: string;
  pairingDescription: string;
  imageUrl: string;
  tags?: string[];
}

export interface APlusStyleGuideSection {
  id: string;
  type: 'style_guide';
  title?: string;
  subtitle?: string;
  looks: APlusStyleLook[];
}

export interface APlusFullBannerSection {
  id: string;
  type: 'full_banner';
  headline: string;
  tagline?: string;
  description?: string;
  imageUrl: string;
  ctaText?: string;
}

export interface APlusSpecTableRow {
  label: string;
  value: string;
}

export interface APlusSpecTableSection {
  id: string;
  type: 'spec_table';
  title?: string;
  rows: APlusSpecTableRow[];
}

export interface APlusFaqItem {
  question: string;
  answer: string;
}

export interface APlusFaqSection {
  id: string;
  type: 'faq';
  title?: string;
  items: APlusFaqItem[];
}

export type APlusSection =
  | APlusHeroStorySection
  | APlusImageTextSection
  | APlusFeatureGridSection
  | APlusDetailStorySection
  | APlusStyleGuideSection
  | APlusFullBannerSection
  | APlusSpecTableSection
  | APlusFaqSection
  | {
      id: string;
      type: string;
      [key: string]: any;
    };

export interface APlusContentData {
  enabled?: boolean;
  brandName?: string;
  sections?: APlusSection[];
}

/* ========================================================================= */
/* MAIN PRODUCT INTERFACE                                                    */
/* ========================================================================= */

export interface Product {
  id: string;
  name: string;
  title?: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  mrp?: number;
  discount?: string | number;
  rating: number;
  reviewsCount: number;
  badge?: {
    text: string;
    type: 'sale' | 'new' | 'out-of-stock' | 'success' | 'info';
  } | string;
  image: string;
  hoverImage?: string;
  gallery?: string[];
  media?: (ProductMediaItem | string)[];
  specs?: string[];
  specifications?: Record<string, string> | Array<{ label: string; value: string }>;
  inStock: boolean;
  stockCount?: number;
  description: string;
  shortDescription?: string;
  colors?: ProductVariantColor[];
  sizes?: (ProductVariantSize | string)[];
  fabricCare?: {
    composition?: string;
    weave?: string;
    careInstructions?: string[];
  };
  sizeFit?: {
    modelStats?: string;
    fitType?: string;
    length?: string;
  };
  highlights?: ProductHighlightItem[];
  reviews?: ProductReviewItem[];
  aPlusContent?: APlusContentData;
}
