import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Bookmark,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  Check,
  Truck,
  Gift,
  ArrowLeft,
  Sparkles,
  Lock,
  RotateCcw,
  CheckCircle2,
  Heart,
  CreditCard,
  Percent
} from 'lucide-react';
import { CartItem, AppliedCoupon, SaveForLaterItem } from '../types/cart';
import { Product } from '../types/product';
import { CLINZA_BUSINESS_RULES, OrderFinancialSnapshot } from '../constants/businessRules';

export interface CartViewProps {
  cartItems: CartItem[];
  savedForLaterItems?: SaveForLaterItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onSetQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onSaveForLater?: (item: CartItem) => void;
  onMoveToCartFromSaved?: (item: SaveForLaterItem) => void;
  onRemoveFromSaved?: (id: string) => void;
  onNavigateHome: () => void;
  onQuickAddUpsell?: (item: { productId: string; name: string; price: number; image: string; category: string }) => void;
  freeShippingThreshold?: number;
  allProducts?: Product[];
  onSelectProduct?: (product: Product | { id: string }) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  savedForLaterItems = [],
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  onSaveForLater,
  onMoveToCartFromSaved,
  onRemoveFromSaved,
  onNavigateHome,
  onQuickAddUpsell,
  freeShippingThreshold = CLINZA_BUSINESS_RULES.FREE_SHIPPING_THRESHOLD,
  allProducts = [],
  onSelectProduct,
  wishlistIds = [],
  onToggleWishlist
}) => {
  // Promo / Coupon State - DEFAULT IS NULL (No auto-applied discount)
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Financial Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const catalogSavings = Math.max(0, totalOriginalPrice - rawSubtotal);

  // Calculate dynamic coupon savings (CLINZA10 only)
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = Math.round((rawSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      couponDiscount = Math.min(rawSubtotal, appliedCoupon.discountValue);
    }
  }

  // Shipping logic: Free if subtotal >= threshold
  const standardShippingFee = CLINZA_BUSINESS_RULES.STANDARD_SHIPPING_FEE;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const shippingFee = cartItems.length > 0 ? (isFreeShipping ? 0 : standardShippingFee) : 0;

  // Final Total calculation: rawSubtotal - couponDiscount + shippingFee = grandTotal
  const grandTotal = Math.max(0, rawSubtotal - couponDiscount + shippingFee);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping progress calculation
  const shippingRemaining = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shippingProgressPct = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  // Handle Coupon Application - Strictly CLINZA10 only
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a promotional code.');
      return;
    }

    if (cleanCode === 'CLINZA10') {
      const discount = Math.round(rawSubtotal * 0.10);
      setAppliedCoupon({
        code: 'CLINZA10',
        discountType: 'percentage',
        discountValue: 10,
        amountSaved: discount
      });
      setCouponSuccess('10% Welcome Privilege discount applied to your bag.');
      setCouponCode('');
    } else {
      setCouponError('Invalid promo code. Enter code "CLINZA10" for 10% off.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  const handleProductClick = (item: CartItem) => {
    if (onSelectProduct) {
      const matched = allProducts.find((p) => p.id === item.productId);
      if (matched) {
        onSelectProduct(matched);
      } else {
        onSelectProduct({ id: item.productId } as any);
      }
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Construct exact Order Financial Snapshot
    const orderSnapshot: OrderFinancialSnapshot = {
      subtotal: rawSubtotal,
      discount: couponDiscount,
      shippingFee,
      tax: Math.round(((rawSubtotal - couponDiscount) * CLINZA_BUSINESS_RULES.GST_RATE_PERCENT) / (100 + CLINZA_BUSINESS_RULES.GST_RATE_PERCENT)),
      couponCode: appliedCoupon?.code ?? null,
      total: grandTotal,
      currency: 'INR',
      itemsCount: totalCount
    };

    setTimeout(() => {
      // Direct production redirect to Shopify native /checkout
      window.location.href = '/checkout';
    }, 300);
  };

  // Helper to extract clean Color & Size from variantTitle
  const parseVariantDetails = (variantTitle: string) => {
    let color = '';
    let size = '';
    if (variantTitle.includes('/')) {
      const parts = variantTitle.split('/');
      color = parts[0]?.trim() || '';
      const sizePart = parts[1]?.trim() || '';
      size = sizePart.replace(/Size:\s*/i, '').trim();
    } else {
      color = variantTitle;
    }
    return { color, size };
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 selection:bg-[#6B1D2F]/10 selection:text-[#6B1D2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Understated Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-serif text-stone-500">
          <button
            onClick={onNavigateHome}
            className="hover:text-stone-900 transition-colors uppercase tracking-widest text-[11px]"
          >
            Home
          </button>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-medium uppercase tracking-widest text-[11px]">
            Shopping Bag
          </span>
        </nav>

        {/* Page Intro Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#EAE6DF] pb-5 gap-3">
          <div className="flex items-baseline gap-4">
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 tracking-tight">
              SHOPPING BAG
            </h1>
            <span className="text-xs uppercase tracking-widest font-sans font-medium px-2.5 py-0.5 bg-[#F5F2EB] text-stone-700 rounded-xs border border-[#EAE6DF]">
              {totalCount} {totalCount === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>

          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-stone-600 hover:text-[#6B1D2F] transition-colors self-start sm:self-auto py-1 min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* EMPTY BAG STATE                                                   */}
        {/* ================================================================= */}
        {cartItems.length === 0 ? (
          <div className="py-20 text-center space-y-6 bg-white border border-[#EAE6DF] rounded-xs p-8 sm:p-14 max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#EAE6DF] text-[#6B1D2F] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7 stroke-1" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 tracking-tight">
                YOUR BAG IS EMPTY
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                Discover refined everyday essentials crafted from 100% pure European flax linen and tailored Italian silhouettes.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#6B1D2F] hover:bg-[#531422] text-white text-xs uppercase tracking-widest font-medium rounded-xs transition-colors shadow-xs min-h-[44px]"
              >
                <span>SHOP NEW ARRIVALS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Explore Categories */}
            <div className="pt-8 border-t border-[#EAE6DF] space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-stone-400 font-medium block">
                Explore Signature Collections
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Linen Shirts',
                  'Tailored Chinos',
                  'Curated Combos',
                  'Summer Blazers',
                  'Bespoke Kurta Sets'
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={onNavigateHome}
                    className="px-3.5 py-1.5 bg-[#FAF9F6] hover:bg-[#F5F2EB] border border-[#EAE6DF] text-stone-700 text-xs font-sans rounded-xs transition-colors min-h-[44px] flex items-center"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* MAIN ACTIVE CART LAYOUT (65% Left / 35% Right)                    */
          /* ================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT COLUMN (approx 65% / 8 cols): Items, Progress, Gift Note */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free Express Shipping Progress Banner */}
              <div className="bg-white border border-[#EAE6DF] rounded-xs p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs text-stone-800">
                  <div className="flex items-center gap-2 font-medium">
                    {isFreeShipping ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Truck className="w-4 h-4 text-[#6B1D2F] shrink-0" />
                    )}
                    <span>
                      {isFreeShipping ? (
                        <span className="text-emerald-700 font-medium">
                          You have unlocked <strong>FREE Express Shipping</strong> across India!
                        </span>
                      ) : (
                        <span>
                          Add <strong className="text-stone-900 font-serif font-bold">₹{shippingRemaining.toLocaleString('en-IN')}</strong> more to unlock <strong className="uppercase">Free Shipping</strong>
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="font-sans text-[11px] text-stone-400 font-medium">
                    {shippingProgressPct}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#F5F2EB] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? 'bg-emerald-600' : 'bg-[#6B1D2F]'
                    }`}
                    style={{ width: `${shippingProgressPct}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="bg-white border border-[#EAE6DF] rounded-xs overflow-hidden shadow-xs divide-y divide-[#EAE6DF]">
                <div className="hidden sm:flex justify-between px-6 py-3 bg-[#FAF9F6] text-[11px] uppercase tracking-widest text-stone-500 font-medium border-b border-[#EAE6DF]">
                  <span>Product Details</span>
                  <span className="text-right">Total Price</span>
                </div>

                {cartItems.map((item) => {
                  const itemLineTotal = item.price * item.quantity;
                  const itemOriginalTotal = (item.originalPrice || item.price) * item.quantity;
                  const hasDiscount = itemOriginalTotal > itemLineTotal;
                  const discountPct = item.originalPrice
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : 0;

                  const { color, size } = parseVariantDetails(item.variantTitle);
                  const isItemWishlisted = wishlistIds.includes(item.productId);

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:bg-[#FAF9F6]/40 transition-colors"
                    >
                      {/* Product Thumbnail & Editorial Info */}
                      <div className="flex gap-4 sm:gap-5 min-w-0 flex-1">
                        <div
                          onClick={() => handleProductClick(item)}
                          className="w-22 sm:w-26 h-28 sm:h-34 aspect-[3/4] bg-[#FAF9F6] border border-[#EAE6DF] rounded-xs overflow-hidden shrink-0 cursor-pointer group"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        <div className="space-y-1.5 min-w-0 flex-1">
                          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block">
                            {item.vendor || 'CLINZA Menswear'}
                          </span>

                          <h3
                            onClick={() => handleProductClick(item)}
                            className="font-serif text-sm sm:text-base font-normal text-stone-900 hover:text-[#6B1D2F] cursor-pointer transition-colors leading-snug line-clamp-2"
                          >
                            {item.name}
                          </h3>

                          {/* Color & Size Variant Strip */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 font-sans">
                            {color && (
                              <span>
                                <span className="text-stone-400">Colour:</span> {color}
                              </span>
                            )}
                            {color && size && <span className="text-stone-300">•</span>}
                            {size && (
                              <span>
                                <span className="text-stone-400">Size:</span> {size}
                              </span>
                            )}
                          </div>

                          {/* Unit Pricing & Badge */}
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="text-sm font-serif font-medium text-stone-900">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <>
                                <span className="text-xs text-stone-400 line-through font-serif">
                                  MRP ₹{item.originalPrice.toLocaleString('en-IN')}
                                </span>
                                {discountPct > 0 && (
                                  <span className="text-[10px] uppercase tracking-wider text-[#6B1D2F] font-semibold bg-[#6B1D2F]/5 px-1.5 py-0.5 rounded-xs">
                                    {discountPct}% OFF
                                  </span>
                                )}
                              </>
                            )}
                          </div>

                          {/* Wishlist & In-stock Indicators */}
                          <div className="flex items-center gap-3 pt-2 text-[11px]">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                              <Check className="w-3 h-3" /> In Stock
                            </span>

                            {onToggleWishlist && (
                              <>
                                <span className="text-stone-200">|</span>
                                <button
                                  onClick={() => onToggleWishlist(item.productId)}
                                  className={`inline-flex items-center gap-1 text-xs font-sans transition-colors ${
                                    isItemWishlisted
                                      ? 'text-[#6B1D2F] font-medium'
                                      : 'text-stone-500 hover:text-stone-900'
                                  }`}
                                >
                                  <Heart
                                    className={`w-3.5 h-3.5 ${
                                      isItemWishlisted ? 'fill-[#6B1D2F] text-[#6B1D2F]' : ''
                                    }`}
                                  />
                                  <span>{isItemWishlisted ? 'Wishlisted' : 'Save to Wishlist'}</span>
                                </button>
                              </>
                            )}

                            {onSaveForLater && (
                              <>
                                <span className="text-stone-200">|</span>
                                <button
                                  onClick={() => onSaveForLater(item)}
                                  className="text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1"
                                >
                                  <Bookmark className="w-3 h-3" />
                                  <span>Save for Later</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EAE6DF]">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#EAE6DF] rounded-xs bg-[#FAF9F6]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-9 text-center text-xs font-sans font-medium text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-2 text-stone-500 hover:text-stone-900 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right min-w-[90px]">
                          <span className="font-serif text-base font-medium text-stone-900 block">
                            ₹{itemLineTotal.toLocaleString('en-IN')}
                          </span>
                          {hasDiscount && (
                            <span className="text-[11px] text-stone-400 line-through font-serif block">
                              ₹{itemOriginalTotal.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-stone-400 hover:text-[#6B1D2F] transition-colors rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center"
                          aria-label={`Remove ${item.name} from bag`}
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bespoke Gift Note / Luxury Packaging Accordion */}
              <div className="bg-white border border-[#EAE6DF] rounded-xs p-5 space-y-3 shadow-xs">
                <button
                  onClick={() => setShowGiftInput(!showGiftInput)}
                  className="w-full flex items-center justify-between text-xs font-sans font-medium uppercase tracking-widest text-stone-800 hover:text-[#6B1D2F] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#6B1D2F]" />
                    <span>Add Complimentary Gift Packaging & Personal Note</span>
                  </div>
                  <span className="text-stone-400 text-sm">
                    {showGiftInput ? '−' : '+'}
                  </span>
                </button>

                {showGiftInput && (
                  <div className="pt-2 space-y-2.5">
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your personal message to be handwritten on CLINZA luxury cotton cardstock..."
                      className="w-full bg-[#FAF9F6] border border-[#EAE6DF] rounded-xs p-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#6B1D2F] h-20 resize-none transition-colors"
                    />
                    <p className="text-[11px] text-stone-400 font-sans">
                      All gifts include our signature tissue wrap, wax seal monogram, and pricing-hidden invoices.
                    </p>
                  </div>
                )}
              </div>

              {/* Saved For Later Items (if available) */}
              {savedForLaterItems.length > 0 && onMoveToCartFromSaved && onRemoveFromSaved && (
                <div className="bg-white border border-[#EAE6DF] rounded-xs p-5 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE6DF]">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#6B1D2F]" />
                      <h4 className="font-serif text-sm font-medium text-stone-900">
                        Saved For Later ({savedForLaterItems.length})
                      </h4>
                    </div>
                    <span className="text-[11px] font-sans text-stone-400">
                      Preserved in your session
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedForLaterItems.map((sItem) => (
                      <div
                        key={sItem.id}
                        className="p-3 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xs flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={sItem.image}
                            alt={sItem.name}
                            className="w-14 h-18 object-cover rounded-xs bg-white shrink-0 border border-[#EAE6DF]"
                          />
                          <div className="min-w-0">
                            <span className="text-[9px] uppercase tracking-widest text-stone-400 block truncate">
                              {sItem.vendor || 'CLINZA'}
                            </span>
                            <h5 className="font-serif text-xs text-stone-900 truncate">
                              {sItem.name}
                            </h5>
                            <span className="font-serif font-medium text-xs text-stone-900 block mt-0.5">
                              ₹{sItem.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => onMoveToCartFromSaved(sItem)}
                            className="px-3 py-1.5 bg-[#6B1D2F] hover:bg-[#531422] text-white text-[11px] uppercase tracking-wider rounded-xs transition-colors min-h-[44px] flex items-center gap-1 font-medium"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move</span>
                          </button>
                          <button
                            onClick={() => onRemoveFromSaved(sItem.id)}
                            className="p-2 text-stone-400 hover:text-stone-900 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label={`Remove ${sItem.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT COLUMN (approx 35% / 4 cols): Order Summary & Trust Box */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Order Summary Card */}
              <div className="bg-[#F5F2EB]/60 border border-[#EAE6DF] rounded-xs p-6 space-y-6 shadow-xs">
                <div className="border-b border-[#EAE6DF] pb-3 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-normal text-stone-900 tracking-tight">
                    ORDER SUMMARY
                  </h2>
                  <span className="text-[11px] uppercase tracking-widest text-stone-400 font-sans">
                    {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                {/* Promo Code Form */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-stone-500 font-medium block">
                    PROMO CODE
                  </span>

                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Enter promo code"
                        className="flex-1 bg-white border border-[#EAE6DF] rounded-xs px-3 py-2.5 text-xs uppercase tracking-wider text-stone-900 placeholder:normal-case placeholder:tracking-normal placeholder:text-stone-400 focus:outline-none focus:border-[#6B1D2F] min-h-[44px]"
                      />
                      <button
                        type="submit"
                        className="px-5 bg-stone-900 hover:bg-[#6B1D2F] text-white text-xs uppercase tracking-widest font-medium rounded-xs transition-colors min-h-[44px]"
                      >
                        APPLY
                      </button>
                    </form>
                  ) : (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-xs font-sans text-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          Code <strong>'{appliedCoupon.code}'</strong> applied
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-stone-500 hover:text-[#6B1D2F] text-[11px] uppercase tracking-wider font-semibold underline ml-2 min-h-[30px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium pt-1">
                      {couponError}
                    </p>
                  )}

                  {couponSuccess && !couponError && appliedCoupon && (
                    <p className="text-[11px] text-emerald-700 font-medium pt-1">
                      {couponSuccess}
                    </p>
                  )}
                </div>

                {/* Mathematical Calculation Breakdown */}
                <div className="space-y-3 text-xs font-sans border-t border-[#EAE6DF] pt-4">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-serif text-sm font-medium text-stone-900">
                      ₹{rawSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {appliedCoupon && couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promotional Discount ({appliedCoupon.code})</span>
                      <span className="font-serif text-sm">
                        -₹{couponDiscount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {catalogSavings > 0 && (
                    <div className="flex justify-between text-[#6B1D2F] font-medium">
                      <span>Catalog MRP Savings</span>
                      <span className="font-serif text-sm">
                        -₹{catalogSavings.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-600 items-center">
                    <span>Estimated Shipping</span>
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-medium uppercase tracking-wider text-[11px]">
                        FREE
                      </span>
                    ) : (
                      <span className="font-serif text-sm text-stone-900">
                        ₹{shippingFee.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between text-stone-500 text-[11px]">
                    <span>Estimated Taxes</span>
                    <span>Included in MRP (12% GST)</span>
                  </div>

                  {/* Grand Total */}
                  <div className="border-t border-[#EAE6DF] pt-4 flex justify-between items-baseline">
                    <div>
                      <span className="font-serif text-base font-normal text-stone-900 block">
                        TOTAL
                      </span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        All Indian taxes included
                      </span>
                    </div>
                    <span className="text-2xl font-serif font-medium text-[#6B1D2F]">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Primary Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cartItems.length === 0}
                  className="w-full py-4 bg-[#6B1D2F] hover:bg-[#531422] disabled:opacity-50 disabled:cursor-not-allowed text-white font-sans uppercase tracking-widest text-xs font-medium rounded-xs shadow-md transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isCheckingOut ? 'PROCESSING...' : 'PROCEED TO CHECKOUT →'}</span>
                </button>

                {/* Trust Information */}
                <div className="pt-2 border-t border-[#EAE6DF] space-y-2.5">
                  <div className="flex items-center gap-2 text-stone-600 text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-[#6B1D2F] shrink-0" />
                    <span><strong>SECURE CHECKOUT</strong> • 256-Bit SSL Encryption</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-600 text-[11px]">
                    <CreditCard className="w-4 h-4 text-[#6B1D2F] shrink-0" />
                    <span><strong>CASH ON DELIVERY</strong> • Available across all pincodes</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-600 text-[11px]">
                    <RotateCcw className="w-4 h-4 text-[#6B1D2F] shrink-0" />
                    <span><strong>EASY 7-DAY RETURNS</strong> • Complimentary doorstep pickup</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ===================================================================== */}
      {/* MOBILE STICKY CHECKOUT BAR                                            */}
      {/* ===================================================================== */}
      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-[#EAE6DF] p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 block font-medium">
              Bag Total
            </span>
            <span className="text-lg font-serif font-medium text-[#6B1D2F]">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="flex-1 py-3 px-6 bg-[#6B1D2F] hover:bg-[#531422] text-white font-sans uppercase tracking-widest text-xs font-medium rounded-xs shadow-md transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
