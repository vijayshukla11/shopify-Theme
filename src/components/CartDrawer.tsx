import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Bookmark,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Truck
} from 'lucide-react';
import { CartItem, AppliedCoupon, SaveForLaterItem } from '../types/cart';
import { FreeShippingBar } from './FreeShippingBar';
import { CartUpsells } from './CartUpsells';
import { ncfAnalytics } from '../utils/ncfAnalytics';
import { NCFHookLocation } from '../sdk';
import { CLINZA_BUSINESS_RULES } from '../constants/businessRules';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onSetQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onSaveForLater: (item: CartItem) => void;
  onNavigateToCartPage: () => void;
  onQuickAddUpsell: (item: { productId: string; name: string; price: number; image: string; category: string }) => void;
  freeShippingThreshold?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  onSaveForLater,
  onNavigateToCartPage,
  onQuickAddUpsell,
  freeShippingThreshold = CLINZA_BUSINESS_RULES.FREE_SHIPPING_THRESHOLD
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Subtotal & Savings calculation
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const itemSavings = Math.max(0, totalOriginalPrice - rawSubtotal);
  const couponDiscount = appliedCoupon ? appliedCoupon.amountSaved : 0;
  const finalSubtotal = Math.max(0, rawSubtotal - couponDiscount);
  const isFreeShipping = cartItems.length === 0 || finalSubtotal >= freeShippingThreshold;
  const shippingFee = cartItems.length > 0 ? (isFreeShipping ? 0 : CLINZA_BUSINESS_RULES.STANDARD_SHIPPING_FEE) : 0;
  const grandTotal = Math.max(0, finalSubtotal + shippingFee);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    setCouponError('');

    setTimeout(() => {
      const codeUpper = couponCode.trim().toUpperCase();
      if (codeUpper === 'CLINZA10') {
        const disc = Math.round(rawSubtotal * 0.10);
        setAppliedCoupon({
          code: 'CLINZA10',
          discountType: 'percentage',
          discountValue: 10,
          amountSaved: disc
        });
        setCouponCode('');
        ncfAnalytics.trackFilterApplied('coupon_code', codeUpper);
      } else {
        setCouponError('Invalid promo code. Enter "CLINZA10" for 10% off.');
      }
      setIsApplyingCoupon(false);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Overlay Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Container */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-800"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
      >
        {/* 1. Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base leading-none">
                Shopping Cart
              </h2>
              <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} ready for checkout
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Close Cart Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Free Shipping Progress Bar */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <FreeShippingBar subtotal={finalSubtotal} threshold={freeShippingThreshold} />
        </div>

        {/* 3. Main Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <NCFHookLocation name="beforeCart" />
          {cartItems.length === 0 ? (
            /* Empty State in Drawer */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Looks like you haven't added any high-performance audio or computing gear to your cart yet.
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn btn-primary btn-md font-bold min-h-[44px] gap-2 mx-auto"
              >
                <span>Explore Flagship Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const itemTotal = item.price * item.quantity;
                const itemOriginalTotal = (item.originalPrice || item.price) * item.quantity;
                const hasItemDiscount = itemOriginalTotal > itemTotal;

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 relative group transition hover:border-sky-500"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl bg-white shrink-0 border border-slate-200 dark:border-slate-700"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">{item.vendor}</span>
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate block">
                              {item.name}
                            </h4>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-1 rounded transition min-h-[36px] min-w-[36px] flex items-center justify-center"
                            aria-label={`Remove ${item.name}`}
                            title="Remove Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] font-mono text-slate-500">{item.variantTitle}</p>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 font-mono text-xs overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2 py-1 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[32px] min-w-[32px]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => onSetQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-9 text-center font-bold bg-transparent text-slate-900 dark:text-white focus:outline-none"
                            />
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2 py-1 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[32px] min-w-[32px]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line Price & Savings */}
                          <div className="text-right">
                            <span className="font-mono font-extrabold text-xs text-slate-900 dark:text-white block">
                              ₹{itemTotal.toLocaleString('en-IN')}
                            </span>
                            {hasItemDiscount && (
                              <s className="font-mono text-[10px] text-slate-400 block">
                                ₹{itemOriginalTotal.toLocaleString('en-IN')}
                              </s>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lower Item Bar: Save for later button & stock tag */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <Check className="w-3 h-3" /> In Stock & Ready to Ship
                      </span>

                      <button
                        onClick={() => onSaveForLater(item)}
                        className="text-purple-600 dark:text-purple-400 hover:underline font-bold flex items-center gap-1 text-[11px]"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save for Later</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Cart Quick Add Upsells inside Drawer */}
          {cartItems.length > 0 && (
            <div className="pt-2">
              <CartUpsells
                onQuickAdd={onQuickAddUpsell}
                addedItemIds={cartItems.map((i) => i.productId)}
                location="drawer"
              />
            </div>
          )}

          <NCFHookLocation name="afterCart" />
        </div>

        {/* 4. Footer Order Summary & Checkout Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
            
            {/* Promo Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo Code (CLINZA10)"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B1D2F] uppercase"
                />
                <Tag className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>
              <button
                type="submit"
                disabled={isApplyingCoupon}
                className="btn btn-secondary btn-sm px-3 text-xs font-bold min-h-[38px]"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl text-emerald-700 dark:text-emerald-400 font-mono">
                <span>Code '{appliedCoupon.code}' Applied</span>
                <span className="font-bold">-₹{appliedCoupon.amountSaved.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs font-mono border-t border-slate-200/80 dark:border-slate-800 pt-2">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {itemSavings > 0 && (
                <div className="flex justify-between text-amber-600 font-bold">
                  <span>Total Item Savings</span>
                  <span>-₹{itemSavings.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Shipping</span>
                <span className="text-emerald-600 font-bold">
                  {finalSubtotal >= freeShippingThreshold ? 'FREE' : '₹99'}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Estimated Total</span>
                <span className="text-lg font-mono text-[#6B1D2F]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onNavigateToCartPage();
              }}
              className="w-full py-3.5 bg-[#6B1D2F] hover:bg-[#531422] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>View Cart & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Express Checkout Fast Buttons */}
            <div className="grid grid-cols-3 gap-2 text-[10px] font-bold">
              <button className="py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-mono transition">
                Shop Pay
              </button>
              <button className="py-2 rounded-lg bg-black hover:bg-slate-900 text-white font-mono border border-slate-800 transition">
                Apple Pay
              </button>
              <button className="py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono transition">
                GPay
              </button>
            </div>

            {/* Security Guarantee note */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit Encrypted Express Checkout</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
