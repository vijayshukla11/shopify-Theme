import { CartItem, AppliedCoupon } from '../types/cart';

/**
 * CLINZA Centralized Business Rules & Financial Policy Constants
 * Single source of truth for free-shipping thresholds, tax rates, standard shipping fees, and active promotions.
 */
export const CLINZA_BUSINESS_RULES = {
  // Free Shipping Threshold in INR (Orders >= ₹1,499 receive complimentary delivery)
  FREE_SHIPPING_THRESHOLD: 1499,

  // Standard domestic shipping fee for orders below threshold
  STANDARD_SHIPPING_FEE: 99,

  // Statutorily embedded Indian GST rate for apparel & garments (Included in MRP)
  GST_RATE_PERCENT: 12,
  TAX_INCLUDED_IN_MRP: true,

  // Only authorized, active customer-facing promotions
  ACTIVE_PROMOTIONS: {
    CLINZA10: {
      code: 'CLINZA10',
      discountType: 'percentage' as const,
      discountValue: 10,
      description: '10% Welcome Privilege discount applied to your bag.',
      minCartValue: 0
    }
  }
} as const;

export type SupportedPromoCode = keyof typeof CLINZA_BUSINESS_RULES.ACTIVE_PROMOTIONS;

/**
 * Order Financial Snapshot representation
 * Ensures Cart -> Checkout -> Order Creation preserves exact matching primitives.
 */
export interface OrderFinancialSnapshot {
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number; // Embedded 12% GST breakdown
  couponCode: string | null;
  total: number;
  currency: string;
  itemsCount: number;
}

/**
 * Pure calculation helper ensuring mathematical parity across Cart, Drawer, and Checkout.
 */
export function calculateClinzaFinancials(
  items: CartItem[],
  coupon: AppliedCoupon | null,
  threshold: number = CLINZA_BUSINESS_RULES.FREE_SHIPPING_THRESHOLD,
  standardFee: number = CLINZA_BUSINESS_RULES.STANDARD_SHIPPING_FEE
) {
  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginalPrice = items.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const catalogSavings = Math.max(0, totalOriginalPrice - rawSubtotal);

  const couponDiscount = coupon ? Math.max(0, coupon.amountSaved) : 0;
  const netSubtotal = Math.max(0, rawSubtotal - couponDiscount);

  const isFreeShipping = items.length === 0 || rawSubtotal >= threshold;
  const shippingFee = items.length > 0 ? (isFreeShipping ? 0 : standardFee) : 0;

  const grandTotal = Math.max(0, rawSubtotal - couponDiscount + shippingFee);

  // Embedded GST calculation (12% GST already inside the MRP price)
  const embeddedGst = Math.round((netSubtotal * CLINZA_BUSINESS_RULES.GST_RATE_PERCENT) / (100 + CLINZA_BUSINESS_RULES.GST_RATE_PERCENT));

  const shippingRemaining = Math.max(0, threshold - rawSubtotal);
  const shippingProgressPct = Math.min(100, Math.round((rawSubtotal / threshold) * 100));

  const snapshot: OrderFinancialSnapshot = {
    subtotal: rawSubtotal,
    discount: couponDiscount,
    shippingFee,
    tax: embeddedGst,
    couponCode: coupon?.code ?? null,
    total: grandTotal,
    currency: 'INR',
    itemsCount: items.reduce((sum, item) => sum + item.quantity, 0)
  };

  return {
    rawSubtotal,
    totalOriginalPrice,
    catalogSavings,
    couponDiscount,
    netSubtotal,
    isFreeShipping,
    shippingFee,
    grandTotal,
    embeddedGst,
    shippingRemaining,
    shippingProgressPct,
    snapshot
  };
}
