export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variantTitle: string;
  vendor: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  sku: string;
  category: string;
}

export interface SaveForLaterItem {
  id: string;
  productId: string;
  name: string;
  variantTitle: string;
  vendor: string;
  price: number;
  image: string;
  addedAt: number;
}

export interface AppliedCoupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 15 for 15% or 50 for $50
  amountSaved: number;
}

export interface ShippingEstimate {
  country: string;
  state: string;
  zip: string;
  method: string;
  cost: number;
  estimatedDays: string;
}

export interface CartMerchantSettings {
  enableDrawer: boolean;
  enableCartPage: boolean;
  enableFreeShipping: boolean;
  freeShippingThreshold: number; // e.g. 150
  enableUpsells: boolean;
  enableSaveForLater: boolean;
  enableCoupons: boolean;
  enableShippingCalculator: boolean;
  enableGiftNotes: boolean;
  enableTrustBadges: boolean;
  enableStickyMobileCheckout: boolean;
  primaryButtonColor: string;
}
