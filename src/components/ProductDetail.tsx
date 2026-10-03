import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Maximize2,
  ZoomIn,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Sparkles,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Info,
  ArrowRight,
  Share2,
  Lock,
  BatteryCharging,
  Bluetooth,
  Volume2,
  Cpu,
  SlidersHorizontal,
  ThumbsUp,
  MessageSquare,
  HelpCircle,
  Radio,
  Clock,
  Package
} from 'lucide-react';
import {
  Product,
  ProductVariantColor,
  ProductVariantSize,
  ProductReviewItem,
  ProductMediaItem
} from '../types/product';
import { TechNovaProductCard } from './homepage/HomepageSections';

export interface ProductDetailProps {
  product: Product;
  allProducts?: Product[];
  onAddToCart: (
    product: Product,
    quantity: number,
    variantInfo?: { color?: string; size?: string }
  ) => void;
  onBuyNow?: (
    product: Product,
    quantity: number,
    variantInfo?: { color?: string; size?: string }
  ) => void;
  onBackToStore?: () => void;
  onNavigateShop?: () => void;
  onNavigateCategory?: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  allProducts = [],
  onAddToCart,
  onBuyNow,
  onBackToStore,
  onNavigateShop,
  onNavigateCategory,
  onSelectProduct,
  isWishlisted: propIsWishlisted,
  onToggleWishlist
}) => {
  // Normalize Media List (Main image, gallery, media objects, hoverImage)
  const mediaList = useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach((url) => {
        if (url && !list.includes(url)) list.push(url);
      });
    }
    if (product.media && Array.isArray(product.media)) {
      product.media.forEach((item) => {
        const url = typeof item === 'string' ? item : item.url;
        if (url && !list.includes(url)) list.push(url);
      });
    }
    if (product.hoverImage && !list.includes(product.hoverImage)) {
      list.push(product.hoverImage);
    }
    return list.length > 0 ? list : [product.image];
  }, [product]);

  // Gallery & Zoom State
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Reset active media when product changes
  useEffect(() => {
    setActiveMediaIndex(0);
  }, [product.id]);

  // Variants State
  const availableColors: ProductVariantColor[] = useMemo(() => {
    if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
      return product.colors;
    }
    return [];
  }, [product.colors]);

  const [selectedColor, setSelectedColor] = useState<string>(
    availableColors[0]?.name || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [localWishlist, setLocalWishlist] = useState(false);
  const isWishlisted =
    propIsWishlisted !== undefined ? propIsWishlisted : localWishlist;

  // Review Filter & Modal State
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Delivery & Pincode Checker State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid?: boolean;
    estimate?: string;
    cod?: boolean;
  } | null>(null);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    specs: false,
    shipping: false,
    returns: false,
    warranty: false
  });

  // Mobile Sticky Bottom Bar visibility tracker
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (buyBoxRef.current) {
        const rect = buyBoxRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(product, quantity, selectedColor ? { color: selectedColor } : undefined);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product, quantity, selectedColor ? { color: selectedColor } : undefined);
    } else {
      handleAddToCart();
    }
  };

  const handlePincodeCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pincode || pincode.trim().length < 6) return;

    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3);
    const dateFormatted = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    setPincodeStatus({
      checked: true,
      valid: true,
      estimate: `Estimated Express Delivery by ${dateFormatted}`,
      cod: true
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out ${product.name} on CLINZA`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Pricing calculations
  const price = product.price;
  const originalPrice = product.originalPrice || product.mrp || Math.round(price * 1.35);
  const discountPercent =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  // Active badge
  const activeBadge = typeof product.badge === 'string'
    ? { text: product.badge, type: 'info' }
    : product.badge;

  // Reviews data fallback
  const [reviewsList, setReviewsList] = useState<ProductReviewItem[]>(() => {
    if (product.reviews && product.reviews.length > 0) {
      return product.reviews;
    }
    return [
      {
        id: 'rev-tn-1',
        author: 'Vikramaditya Sharma',
        rating: 5,
        date: '18 Aug 2026',
        verified: true,
        title: 'Incredible acoustic depth and instant ANC isolation',
        comment:
          'The audio separation is pristine. Low frequencies are tight without bleeding into mid-tones, and the active noise cancellation instantly silenced the ambient hum of my office. Battery endurance easily surpassed 35 hours.',
        helpfulCount: 34
      },
      {
        id: 'rev-tn-2',
        author: 'Ananya Deshmukh',
        rating: 5,
        date: '11 Aug 2026',
        verified: true,
        title: 'Premium build quality & seamless multi-device pairing',
        comment:
          'Switching between my laptop and smartphone happens with zero stutter. The memory cushions are comfortable for 6+ hour listening sessions. Delivered in Bangalore within 2 days.',
        helpfulCount: 22
      },
      {
        id: 'rev-tn-3',
        author: 'Rahul Sen',
        rating: 4,
        date: '02 Aug 2026',
        verified: true,
        title: 'Fast charging is a game-changer for daily commute',
        comment:
          'A quick 10-minute top-up gives me ample power for my entire metro commute. Mic pickup on voice calls is crisp even in windy conditions. Solid product from TechNova.',
        helpfulCount: 15
      }
    ];
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      verified: true,
      title: newReviewTitle.trim() || 'Verified Customer Review',
      comment: newReviewComment.trim(),
      helpfulCount: 0
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsWriteReviewOpen(false);
      setReviewSubmitted(false);
      setNewReviewAuthor('');
      setNewReviewTitle('');
      setNewReviewComment('');
      setNewReviewRating(5);
    }, 1500);
  };

  // Related products filtered from allProducts (excluding current product)
  const relatedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    // Prioritize products from same category, then other electronics
    const sameCategory = allProducts.filter(
      (p) => p.id !== product.id && p.category === product.category
    );
    const others = allProducts.filter(
      (p) => p.id !== product.id && p.category !== product.category
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [allProducts, product.id, product.category]);

  // Specifications table construction from master product data
  const specItems = useMemo(() => {
    const items: Array<{ label: string; value: string }> = [
      { label: 'Brand', value: 'TechNova' },
      { label: 'Model Name', value: product.name },
      { label: 'Category', value: product.category.toUpperCase() }
    ];

    if (product.specs && Array.isArray(product.specs)) {
      product.specs.forEach((spec, idx) => {
        items.push({ label: `Key Feature ${idx + 1}`, value: spec });
      });
    }

    items.push({ label: 'Connectivity', value: 'Bluetooth 5.3 / USB-C Fast Interface' });
    items.push({ label: 'In the Box', value: `1x ${product.name}, 1x USB-C Cable, 1x User Manual, 1x Warranty Card` });
    items.push({ label: 'Manufacturer Warranty', value: '24 Months Official TechNova Warranty' });
    items.push({ label: 'Country of Origin', value: 'India' });

    return items;
  }, [product]);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans pb-24 md:pb-20 selection:bg-[#2563EB]/20 selection:text-[#0F172A]">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. BREADCRUMB NAVIGATION                                            */}
      {/* ------------------------------------------------------------------- */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap py-1">
          <button
            onClick={onBackToStore}
            className="hover:text-[#2563EB] transition-colors focus:outline-none focus:text-[#2563EB] cursor-pointer"
          >
            Home
          </button>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <button
            onClick={() => {
              if (onNavigateShop) onNavigateShop();
              else onBackToStore?.();
            }}
            className="hover:text-[#2563EB] transition-colors focus:outline-none focus:text-[#2563EB] cursor-pointer"
          >
            Shop
          </button>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <button
            onClick={() => {
              if (onNavigateCategory) onNavigateCategory(product.category);
              else if (onNavigateShop) onNavigateShop();
              else onBackToStore?.();
            }}
            className="capitalize hover:text-[#2563EB] transition-colors focus:outline-none focus:text-[#2563EB] cursor-pointer"
          >
            {product.category}
          </button>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-[#0F172A] font-semibold truncate max-w-[200px] sm:max-w-md" aria-current="page">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. PRODUCT HERO / PURCHASE AREA                                     */}
      {/* Desktop: ~55% Gallery (Left) + ~45% Product Information (Right)     */}
      {/* ------------------------------------------------------------------- */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =============================================================== */}
          {/* LEFT COLUMN: PRODUCT MEDIA GALLERY (~55% / 7 COLS)              */}
          {/* =============================================================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Product Image Box */}
            <div
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl bg-[#F8FAFC] overflow-hidden border border-[#E5E7EB] group select-none shadow-xs flex items-center justify-center p-6 sm:p-10 cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setIsFullscreenModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsFullscreenModalOpen(true);
              }}
              aria-label="Click to open full-screen product image"
            >
              {/* Eager Loaded Main Product Image */}
              <img
                src={mediaList[activeMediaIndex]}
                alt={`${product.name} view ${activeMediaIndex + 1}`}
                loading="eager"
                decoding="async"
                className={`max-h-full max-w-full object-contain filter drop-shadow-md transition-all duration-300 ${
                  isZoomed ? 'opacity-0' : 'opacity-100 group-hover:scale-[1.03]'
                }`}
              />

              {/* Hover Zoom Preview (Desktop Only) */}
              {isZoomed && (
                <div
                  className="hidden md:block absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
                  style={{
                    backgroundImage: `url(${mediaList[activeMediaIndex]})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: '220%',
                    backgroundRepeat: 'no-repeat'
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {activeBadge && (
                  <span
                    className={`px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md shadow-2xs ${
                      activeBadge.type === 'success' || activeBadge.text === 'BEST SELLER'
                        ? 'bg-emerald-600 text-white'
                        : activeBadge.type === 'sale'
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#0F172A] text-white'
                    }`}
                  >
                    {activeBadge.text}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 bg-[#2563EB] text-white text-[11px] font-bold tracking-wider uppercase rounded-md shadow-2xs">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Floating Action Buttons: Wishlist, Share, Fullscreen */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleWishlist) {
                      onToggleWishlist(product.id);
                    } else {
                      setLocalWishlist(!localWishlist);
                    }
                  }}
                  className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200'
                  }`}
                  aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform duration-150 ${
                      isWishlisted ? 'fill-rose-600 text-rose-600 scale-105' : 'text-slate-700'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white flex items-center justify-center border border-slate-200 shadow-xs transition-all cursor-pointer"
                  aria-label="Share product"
                  title="Share"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreenModalOpen(true);
                  }}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white flex items-center justify-center border border-slate-200 shadow-xs transition-all cursor-pointer hidden sm:flex"
                  aria-label="Fullscreen Gallery"
                  title="Expand image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Prev / Next Carousel Controls (if multiple images) */}
              {mediaList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMediaIndex((prev) =>
                        prev === 0 ? mediaList.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMediaIndex((prev) =>
                        prev === mediaList.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Subtle hover zoom hint */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] tracking-wider uppercase rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center gap-1.5 shadow-sm">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Hover to zoom • Click to expand</span>
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            {mediaList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar">
                {mediaList.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#F8FAFC] border-2 transition-all shrink-0 p-2 flex items-center justify-center cursor-pointer ${
                      activeMediaIndex === idx
                        ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 opacity-100 shadow-xs'
                        : 'border-[#E5E7EB] opacity-70 hover:opacity-100 hover:border-slate-300'
                    }`}
                    aria-label={`View product image ${idx + 1}`}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Tech Highlights Badge Strip */}
            <div className="hidden lg:grid grid-cols-3 gap-3 pt-6 border-t border-[#E5E7EB]">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">2-Year Warranty</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Comprehensive pan-India coverage</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Fast Dispatch</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Dispatched within 24 business hours</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">7-Day Replacement</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instant doorstep replacement</p>
                </div>
              </div>
            </div>

          </div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN: PRODUCT INFORMATION & PURCHASE (~45% / 5 COLS)   */}
          {/* =============================================================== */}
          <div ref={buyBoxRef} className="lg:col-span-5 lg:sticky lg:top-6 space-y-6">
            
            {/* 1. Category Eyebrow, Title & Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-widest uppercase text-[#2563EB]">
                  TECHNOVA • {product.category}
                </span>
                {product.inStock && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating & Review Count */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 4.8)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 text-xs font-bold text-[#0F172A] font-mono">
                    {product.rating || '4.8'}
                  </span>
                </div>
                <span className="text-slate-300 text-xs">•</span>
                <a
                  href="#customer-reviews"
                  className="text-xs font-medium text-slate-500 hover:text-[#2563EB] underline underline-offset-4 transition-colors"
                >
                  {product.reviewsCount || 128} Customer Reviews
                </a>
              </div>
            </div>

            {/* 2. Price Presentation Box in INR ₹ */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1.5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-mono">
                  ₹{price.toLocaleString('en-IN')}
                </span>
                {originalPrice > price && (
                  <span className="text-base sm:text-lg line-through text-slate-400 font-medium font-mono">
                    MRP ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold tracking-wider uppercase bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-tight pt-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Inclusive of all taxes • Free Express Shipping on this order</span>
              </p>
            </div>

            {/* 3. Short Product Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* 4. Product Highlights (From actual product dataset) */}
            {product.specs && product.specs.length > 0 && (
              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {product.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span className="font-medium">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. Variant Swatches (Rendered ONLY if product has variants) */}
            {availableColors.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Colour: <span className="font-semibold normal-case text-[#2563EB]">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {availableColors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`relative w-9 h-9 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                          isSelected
                            ? 'border-[#2563EB] ring-2 ring-[#2563EB]/25 scale-110'
                            : 'border-slate-300 hover:border-slate-500'
                        }`}
                        title={color.name}
                        aria-label={`Select color ${color.name}`}
                      >
                        <span
                          className={`block w-full h-full rounded-full ${
                            color.bgClass || 'bg-slate-800'
                          }`}
                          style={color.hex ? { backgroundColor: color.hex } : undefined}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. Quantity + Add to Cart & Buy Now */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center rounded-xl border border-[#E5E7EB] bg-white px-2 py-1 h-12 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 text-lg font-bold transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#0F172A] font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 text-lg font-bold transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary CTA: ADD TO CART (#0F172A -> #2563EB on hover, 48-52px height) */}
                <button
                  id="pdp-add-to-cart-btn"
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 sm:h-13 px-6 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2.5 text-white shadow-sm cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-[#0F172A] hover:bg-[#2563EB] active:scale-[0.99]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 text-white" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-white" />
                      <span>Add to Cart • ₹{(price * quantity).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary CTA: BUY NOW */}
              <button
                id="pdp-buy-now-btn"
                type="button"
                onClick={handleBuyNow}
                className="w-full h-12 px-6 rounded-xl border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>

            {/* 7. Trust Points (Compact 4-Item Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2563EB]" />
                <span className="font-bold text-[#0F172A] text-[11px]">Free Shipping</span>
                <span className="text-[10px] text-slate-500">Above ₹999</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span className="font-bold text-[#0F172A] text-[11px]">24M Warranty</span>
                <span className="text-[10px] text-slate-500">Official Brand</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#2563EB]" />
                <span className="font-bold text-[#0F172A] text-[11px]">7D Replacement</span>
                <span className="text-[10px] text-slate-500">Doorstep pickup</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#2563EB]" />
                <span className="font-bold text-[#0F172A] text-[11px]">100% Secure</span>
                <span className="text-[10px] text-slate-500">COD & UPI</span>
              </div>
            </div>

            {/* 8. Delivery & COD Pincode Checker */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#2563EB]" />
                  <span>Check Delivery & COD Availability</span>
                </span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-[#F8FAFC] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] placeholder:text-slate-400 font-mono"
                />
                <button
                  type="submit"
                  disabled={pincode.length < 6}
                  className="px-4 py-2 bg-[#0F172A] hover:bg-[#2563EB] disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && pincodeStatus.checked && (
                <div className="pt-2 border-t border-[#E5E7EB] space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{pincodeStatus.estimate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-slate-400" />
                    <span>Cash on Delivery (COD) Available</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-slate-400" />
                    <span>Free Shipping Applied (TechNova Express)</span>
                  </div>
                </div>
              )}
            </div>

            {/* 9. Policy & Details Expandable Accordions */}
            <div className="border-t border-[#E5E7EB] divide-y divide-[#E5E7EB] pt-2">
              
              {/* Accordion 1: Product Details */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#0F172A] group cursor-pointer"
                  aria-expanded={openAccordions.details}
                >
                  <span>Product Overview & Description</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.details ? 'rotate-180 text-[#0F172A]' : ''
                    }`}
                  />
                </button>
                {openAccordions.details && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 font-normal">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Technical Specifications */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('specs')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#0F172A] group cursor-pointer"
                  aria-expanded={openAccordions.specs}
                >
                  <span>Technical Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.specs ? 'rotate-180 text-[#0F172A]' : ''
                    }`}
                  />
                </button>
                {openAccordions.specs && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#E5E7EB] text-xs">
                    <div className="divide-y divide-slate-100">
                      {specItems.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className={`grid grid-cols-2 p-2.5 ${
                            sIdx % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'
                          }`}
                        >
                          <span className="font-semibold text-slate-500">{spec.label}</span>
                          <span className="text-[#0F172A] font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Delivery */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#0F172A] group cursor-pointer"
                  aria-expanded={openAccordions.shipping}
                >
                  <span>Shipping & Delivery Policy</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.shipping ? 'rotate-180 text-[#0F172A]' : ''
                    }`}
                  />
                </button>
                {openAccordions.shipping && (
                  <div className="mt-3 text-xs text-slate-600 space-y-2 leading-relaxed">
                    <p className="font-semibold text-[#0F172A]">
                      Fast & Insured Delivery Across India
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Orders placed before 2:00 PM are dispatched the very same day.</li>
                      <li>Free express shipping for all orders above ₹999.</li>
                      <li>Standard delivery timeline: 2 to 4 business days via BlueDart, Delhivery, or Xpressbees.</li>
                      <li>Live SMS & WhatsApp order tracking provided upon dispatch.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 4: Returns & Replacement */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('returns')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#0F172A] group cursor-pointer"
                  aria-expanded={openAccordions.returns}
                >
                  <span>7-Day Replacement Policy</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.returns ? 'rotate-180 text-[#0F172A]' : ''
                    }`}
                  />
                </button>
                {openAccordions.returns && (
                  <div className="mt-3 text-xs text-slate-600 space-y-2 leading-relaxed">
                    <p>
                      We offer a 7-day doorstep replacement guarantee in case of any manufacturing defects, physical transit damage, or missing accessories.
                    </p>
                    <p>
                      Simply initiate a request with your order ID, and our courier executive will deliver a fresh replacement unit right to your doorstep.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 5: Warranty Coverage */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('warranty')}
                  className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#0F172A] group cursor-pointer"
                  aria-expanded={openAccordions.warranty}
                >
                  <span>24 Months Official Warranty</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openAccordions.warranty ? 'rotate-180 text-[#0F172A]' : ''
                    }`}
                  />
                </button>
                {openAccordions.warranty && (
                  <div className="mt-3 text-xs text-slate-600 space-y-2 leading-relaxed">
                    <p>
                      Every TechNova product is backed by a 24-month comprehensive manufacturer warranty covering internal hardware, audio drivers, and power management circuits.
                    </p>
                    <p>
                      For warranty assistance, reach out to our dedicated support team at <span className="font-semibold text-[#0F172A]">support@technova.in</span> or call <span className="font-semibold text-[#0F172A]">1800-TECH-NOVA</span>.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 3. CUSTOMER REVIEWS & RATINGS SECTION                               */}
      {/* ------------------------------------------------------------------- */}
      <section id="customer-reviews" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="border-t border-[#E5E7EB] pt-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight uppercase">
                Customer Reviews
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Verified feedback from real customers across India.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsWriteReviewOpen(true)}
              className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Reviews Score Card + Distribution Bars */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] mb-10">
            
            {/* Overall Score */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-[#E5E7EB]">
              <span className="text-5xl sm:text-6xl font-extrabold text-[#0F172A] font-mono">
                {product.rating || '4.8'}
              </span>
              <div className="flex items-center text-amber-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 4.8)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Based on {product.reviewsCount || 128} verified ratings
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mt-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                98% Would Recommend
              </span>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="md:col-span-8 flex flex-col justify-center space-y-2.5">
              {[
                { stars: 5, pct: 78, count: Math.round((product.reviewsCount || 128) * 0.78) },
                { stars: 4, pct: 16, count: Math.round((product.reviewsCount || 128) * 0.16) },
                { stars: 3, pct: 4, count: Math.round((product.reviewsCount || 128) * 0.04) },
                { stars: 2, pct: 1, count: Math.round((product.reviewsCount || 128) * 0.01) },
                { stars: 1, pct: 1, count: Math.round((product.reviewsCount || 128) * 0.01) }
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-12 text-slate-700 font-semibold shrink-0">
                    <span>{row.stars}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-500 font-mono text-[11px]">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Individual Reviews Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">
                    {rev.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-bold flex items-center justify-center text-xs">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-[#0F172A] block">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>

                  {rev.helpfulCount !== undefined && (
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{rev.helpfulCount}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. RELATED PRODUCTS ("YOU MAY ALSO LIKE")                           */}
      {/* ------------------------------------------------------------------- */}
      {relatedProducts.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="border-t border-[#E5E7EB] pt-12">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight uppercase">
                  YOU MAY ALSO LIKE
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Explore complementary TechNova products and accessories.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onNavigateShop) onNavigateShop();
                  else onBackToStore?.();
                }}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2563EB] hover:text-blue-700 transition-colors cursor-pointer group"
              >
                <span>View All Shop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Grid of 4 Products using identical TechNovaProductCard */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="h-full">
                  <TechNovaProductCard
                    product={relProduct}
                    onAddToCart={(p, qty) => onAddToCart(p, qty || 1)}
                    onQuickView={() => {
                      if (onSelectProduct) onSelectProduct(relProduct);
                    }}
                    onSelectProduct={(p) => {
                      if (onSelectProduct) onSelectProduct(p);
                    }}
                    isWishlisted={propIsWishlisted !== undefined ? false : localWishlist}
                    onToggleWishlist={onToggleWishlist}
                  />
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 5. STICKY MOBILE ADD-TO-CART BOTTOM BAR                             */}
      {/* ------------------------------------------------------------------- */}
      {showStickyBar && (
        <aside aria-label="Quick purchase bar" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] p-3 shadow-xl transition-transform duration-300">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            
            {/* Thumbnail + Details */}
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-11 h-11 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] object-contain p-1 shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-[#0F172A] truncate">
                  {product.name}
                </h3>
                <span className="text-xs font-extrabold text-[#2563EB] font-mono">
                  ₹{price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`h-11 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-white shrink-0 shadow-sm cursor-pointer ${
                isAdded ? 'bg-emerald-600' : 'bg-[#0F172A] active:bg-[#2563EB]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

          </div>
        </aside>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 6. FULLSCREEN IMAGE MODAL                                           */}
      {/* ------------------------------------------------------------------- */}
      {isFullscreenModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution image gallery"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={() => setIsFullscreenModalOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsFullscreenModalOpen(false)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors z-10 cursor-pointer"
            aria-label="Close fullscreen modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main expanded image */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={mediaList[activeMediaIndex]}
              alt={`${product.name} fullscreen view`}
              className="max-h-[75vh] max-w-full object-contain filter drop-shadow-2xl"
            />

            {/* Prev / Next Modal Arrows */}
            {mediaList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveMediaIndex((prev) =>
                      prev === 0 ? mediaList.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveMediaIndex((prev) =>
                      prev === mediaList.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom thumbnail strip */}
          {mediaList.length > 1 && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-md p-2 rounded-2xl border border-white/10 overflow-x-auto max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {mediaList.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden bg-white/10 border-2 transition-all p-1 flex items-center justify-center shrink-0 cursor-pointer ${
                    activeMediaIndex === idx
                      ? 'border-[#2563EB] ring-2 ring-[#2563EB]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Select photo ${idx + 1}`}
                >
                  <img src={url} alt={`Thumbnail ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 7. WRITE A REVIEW MODAL                                             */}
      {/* ------------------------------------------------------------------- */}
      {isWriteReviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsWriteReviewOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5E7EB] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsWriteReviewOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close review modal"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 id="write-review-title" className="text-xl font-bold text-[#0F172A]">
              Write a Review
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Share your thoughts on {product.name}
            </p>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-[#0F172A]">Thank you for your review!</h4>
                <p className="text-xs text-slate-500">Your feedback has been verified and published.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`${star} Star Rating`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#0F172A]">
                      {newReviewRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-[#F8FAFC] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Outstanding sound quality and battery life"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-[#F8FAFC] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Detailed Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Tell us about the audio fidelity, comfort, battery life, and overall experience..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-[#F8FAFC] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
