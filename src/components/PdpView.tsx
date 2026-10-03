import React from 'react';
import { Product } from '../types/product';
import { ProductDetail } from './ProductDetail';
import { useProductSEO } from '../hooks/useProductSEO';

export interface PdpViewProps {
  product: Product;
  allProducts?: Product[];
  onAddToCart: (product: Product, qty: number, variantInfo?: { color?: string; size?: string }) => void;
  onBuyNow?: (product: Product, qty: number, variantInfo?: { color?: string; size?: string }) => void;
  onBackToStore: () => void;
  onNavigateShop?: () => void;
  onNavigateCategory?: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const PdpView: React.FC<PdpViewProps> = ({
  product,
  allProducts = [],
  onAddToCart,
  onBuyNow,
  onBackToStore,
  onNavigateShop,
  onNavigateCategory,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist
}) => {
  // Dynamically update document title, meta description, and Open Graph / JSON-LD tags
  useProductSEO(product);

  return (
    <ProductDetail
      product={product}
      allProducts={allProducts}
      onAddToCart={onAddToCart}
      onBuyNow={onBuyNow}
      onBackToStore={onBackToStore}
      onNavigateShop={onNavigateShop}
      onNavigateCategory={onNavigateCategory}
      onSelectProduct={onSelectProduct}
      isWishlisted={isWishlisted}
      onToggleWishlist={onToggleWishlist}
    />
  );
};

