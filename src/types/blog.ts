export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface ArticleProductCallout {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  reason: string;
}

export interface ContentBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'quote' | 'callout' | 'code' | 'image' | 'table' | 'product_callout' | 'faq';
  content?: string;
  level?: 2 | 3 | 4;
  authorQuote?: string;
  calloutType?: 'info' | 'tip' | 'warning' | 'success';
  language?: string;
  imageUrl?: string;
  imageCaption?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  product?: ArticleProductCallout;
  faqItems?: { question: string; answer: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Architecture' | 'Accessibility' | 'Performance' | 'Hardware' | 'E-Commerce' | 'Buying Guides';
  tags: string[];
  excerpt: string;
  coverImage: string;
  author: BlogAuthor;
  publishedDate: string;
  updatedDate?: string;
  readingTime: string;
  isFeatured?: boolean;
  content: ContentBlock[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogMerchantSettings {
  heroTitle: string;
  heroDescription: string;
  showFeaturedArticle: boolean;
  layoutStyle: 'grid' | 'editorial' | 'magazine' | 'compact';
  gridColumns: 2 | 3 | 4;
  showSidebar: boolean;
  showTableOfContents: boolean;
  showAuthorBox: boolean;
  showNewsletter: boolean;
  showRelatedPosts: boolean;
  showSocialSharing: boolean;
  showReadingProgress: boolean;
}
