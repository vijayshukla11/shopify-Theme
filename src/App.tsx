import React, { useState, useMemo, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  SlidersHorizontal,
  Star,
  Check,
  Plus,
  Minus,
  X,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Laptop,
  Watch,
  Smartphone,
  Gamepad2,
  Tv,
  ArrowRight,
  Sparkles,
  Eye,
  CheckCircle2,
  Lock,
  Menu,
  Volume2,
  Zap,
  Briefcase,
  FileText,
  Layers,
  Cpu,
  Building2,
  HelpCircle,
  Mail,
  Store
} from 'lucide-react';

import { ServicesView } from './components/ServicesView';
import { CaseStudiesView } from './components/CaseStudiesView';
import { ProcessView } from './components/ProcessView';
import { TechStackView } from './components/TechStackView';
import { IndustriesView } from './components/IndustriesView';
import { FaqView } from './components/FaqView';
import { ContactView } from './components/ContactView';
import { PdpView } from './components/PdpView';
import { CollectionView } from './components/CollectionView';
import { ResumeView } from './components/ResumeView';
import { NCFHookLocation } from './sdk';
import { PortfolioView } from './components/PortfolioView';
import { DashboardsView } from './components/DashboardsView';
import { BlogView } from './components/BlogView';
import { SearchView } from './components/SearchView';
import { AboutView } from './components/AboutView';
import { ShippingPolicyView } from './components/ShippingPolicyView';
import { ReturnsPolicyView } from './components/ReturnsPolicyView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsView } from './components/TermsView';
import { WarrantyView } from './components/WarrantyView';
import { StoreLocatorView } from './components/StoreLocatorView';
import { NotFoundView } from './components/NotFoundView';
import { CartDrawer } from './components/CartDrawer';
import { CartView } from './components/CartView';
import { CartItem, SaveForLaterItem } from './types/cart';
import { CLINZA_BUSINESS_RULES } from './constants/businessRules';
import {
  CategorySliderSection,
  ProductTabsSection,
  PromoBannerSection,
  FeaturedCollectionsSection,
  BrandShowcaseSection,
  TestimonialsSection,
  AppleBentoGridSection,
  AppleFabricExplorerSection,
  AppleSmartFitFinderSection,
  AppleLookbookSliderSection,
  AppleCraftsmanshipAnatomySection,
  FeastablesShopifyStorefrontSection,
  TechNovaHeroSection,
  NCFRedesignedHomepageSequence,
  TechNovaHeader,
  ClinzaHeader,
  ClinzaFooter
} from './components/homepage/HomepageSections';

import { Product } from './types/product';
import { CLINZA_ELECTRONICS_PRODUCTS } from './data/electronicsCatalog';

const PRODUCTS: Product[] = CLINZA_ELECTRONICS_PRODUCTS;

export default function App() {
  // Navigation & Page State - Default to 'store' (Home Page)
  const [activePage, setActivePage] = useState<
    | 'store'
    | 'pdp'
    | 'collection'
    | 'services'
    | 'case-studies'
    | 'resume'
    | 'portfolio'
    | 'dashboards'
    | 'process'
    | 'tech-stack'
    | 'industries'
    | 'faq'
    | 'blog'
    | 'search'
    | 'contact'
    | 'cart'
    | 'about'
    | 'shipping'
    | 'returns'
    | 'privacy'
    | 'terms'
    | 'warranty'
    | 'store-locator'
    | '404'
  >('store');
  const [selectedPdpProduct, setSelectedPdpProduct] = useState<Product>(
    () => PRODUCTS.find((p) => p.id === 'clinza-combo-summer-set') || PRODUCTS[0]
  );

  const [contactContext, setContactContext] = useState<{
    serviceId?: string;
    industryName?: string;
    techName?: string;
    caseStudyId?: string;
  }>({});

  const handleNavigateToContact = (ctx?: {
    serviceId?: string;
    industryName?: string;
    techName?: string;
    caseStudyId?: string;
  }) => {
    if (ctx) setContactContext(ctx);
    setActivePage('contact');
  };

  // Storefront State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Enterprise Cart Items State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('clinza_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load cart from localStorage', e);
    }
    return [
      {
        id: 'cart-item-1',
        productId: PRODUCTS[0].id,
        name: PRODUCTS[0].name,
        variantTitle: 'Pink & Sand / Size: M',
        vendor: 'CLINZA Menswear',
        price: PRODUCTS[0].price,
        originalPrice: PRODUCTS[0].originalPrice,
        quantity: 1,
        image: PRODUCTS[0].image,
        inStock: true,
        sku: 'CLINZA-COMBO-M',
        category: PRODUCTS[0].category
      }
    ];
  });

  // Keep cart synced with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('clinza_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  // Saved For Later Items State with LocalStorage Persistence
  const [savedForLaterItems, setSavedForLaterItems] = useState<SaveForLaterItem[]>(() => {
    try {
      const saved = localStorage.getItem('ncf_saved_for_later');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage Persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clinza_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('clinza_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save wishlist', e);
      }
      const matchedProduct = PRODUCTS.find((p) => p.id === productId);
      const prodName = matchedProduct?.name || 'Item';
      showToast(exists ? `Removed "${prodName}" from wishlist` : `Added "${prodName}" to wishlist`);
      return updated;
    });
  };

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  // Newsletter Form State
  const [emailInput, setEmailInput] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Sticky Header Scroll State
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast Trigger Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Enterprise Cart Operations
  const addToCart = (product: Product, qty: number = 1, variantInfo?: { color?: string; size?: string }) => {
    setLoadingProductId(product.id);
    setTimeout(() => {
      setLoadingProductId(null);
      setCartItems((prev) => {
        const variantKey = variantInfo ? `${variantInfo.color || 'Standard'} / Size: ${variantInfo.size || 'M'}` : 'Standard Spec / Size: M';
        const existing = prev.find((item) => item.productId === product.id && item.variantTitle === variantKey);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id && item.variantTitle === variantKey
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        }
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${product.id}`,
            productId: product.id,
            name: product.name,
            variantTitle: variantKey,
            vendor: 'CLINZA Menswear',
            price: product.price,
            originalPrice: product.originalPrice || product.mrp,
            quantity: qty,
            image: product.image,
            inStock: product.inStock,
            sku: `CLINZA-${product.id.toUpperCase()}`,
            category: product.category
          }
        ];
      });
      showToast(`Added "${product.name}" to bag!`);
      setIsCartOpen(true);
    }, 300);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setCartQuantity = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, qty) } : item))
        .filter(Boolean) as CartItem[]
    );
  };

  const removeCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const saveItemForLater = (item: CartItem) => {
    removeCartItem(item.id);
    const savedItem: SaveForLaterItem = {
      id: `saved-${Date.now()}-${item.productId}`,
      productId: item.productId,
      name: item.name,
      variantTitle: item.variantTitle,
      vendor: item.vendor,
      price: item.price,
      image: item.image,
      addedAt: Date.now()
    };
    const updatedSaved = [savedItem, ...savedForLaterItems];
    setSavedForLaterItems(updatedSaved);
    try {
      localStorage.setItem('ncf_saved_for_later', JSON.stringify(updatedSaved));
    } catch (e) {
      console.warn('Could not save for later', e);
    }
    showToast(`Saved "${item.name}" for later`);
  };

  const moveSavedToCart = (item: SaveForLaterItem) => {
    const updatedSaved = savedForLaterItems.filter((i) => i.id !== item.id);
    setSavedForLaterItems(updatedSaved);
    try {
      localStorage.setItem('ncf_saved_for_later', JSON.stringify(updatedSaved));
    } catch (e) {
      console.warn('Could not update saved items', e);
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${item.productId}`,
          productId: item.productId,
          name: item.name,
          variantTitle: item.variantTitle,
          vendor: item.vendor,
          price: item.price,
          quantity: 1,
          image: item.image,
          inStock: true,
          sku: `NCF-${item.productId.toUpperCase()}`,
          category: 'hardware'
        }
      ];
    });
    showToast(`Moved "${item.name}" back to cart!`);
  };

  const removeSavedItem = (id: string) => {
    const updatedSaved = savedForLaterItems.filter((i) => i.id !== id);
    setSavedForLaterItems(updatedSaved);
    try {
      localStorage.setItem('ncf_saved_for_later', JSON.stringify(updatedSaved));
    } catch (e) {
      console.warn('Could not update saved items', e);
    }
    showToast('Removed item from saved list');
  };

  const quickAddUpsell = (upsell: { productId: string; name: string; price: number; image: string; category: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === upsell.productId);
      if (existing) {
        return prev.map((i) => (i.productId === upsell.productId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: `cart-upsell-${Date.now()}`,
          productId: upsell.productId,
          name: upsell.name,
          variantTitle: 'Recommended Accessory',
          vendor: 'Nova Accessories',
          price: upsell.price,
          quantity: 1,
          image: upsell.image,
          inStock: true,
          sku: `ACC-${upsell.productId.toUpperCase()}`,
          category: upsell.category
        }
      ];
    });
    showToast(`Added "${upsell.name}" to cart!`);
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        p.category === selectedCategory ||
        (selectedCategory === 'chargers' && (p.category === 'chargers' || p.category === 'power-banks' || p.category === 'cables')) ||
        (selectedCategory === 'accessories' && (p.category === 'mobile-accessories' || p.category === 'computer-accessories' || p.category === 'cables'));
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* CLEAN TECHNOVA ECOMMERCE HEADER */}
      <TechNovaHeader
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        activePage={activePage}
        setActivePage={setActivePage}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActivePage('store');
        }}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* PAGE VIEW ROUTING CONTENT                                             */}
      {/* --------------------------------------------------------------------- */}
      {activePage === 'search' && (
        <main className="py-8">
          <SearchView
            products={PRODUCTS}
            initialQuery={searchQuery}
            onNavigateHome={() => setActivePage('store')}
            onAddToCart={(prod) => addToCart(prod, 1)}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        </main>
      )}

      {activePage === 'pdp' && (
        <main className="py-2">
          <PdpView
            product={selectedPdpProduct}
            allProducts={PRODUCTS}
            onAddToCart={(prod, qty) => addToCart(prod, qty)}
            onBuyNow={(prod, qty) => {
              addToCart(prod, qty);
              setIsCartOpen(true);
            }}
            onBackToStore={() => {
              setActivePage('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateShop={() => {
              setSelectedCategory('all');
              setActivePage('collection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateCategory={(cat) => {
              setSelectedCategory(cat);
              setActivePage('collection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(p) => {
              setSelectedPdpProduct(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isWishlisted={wishlistIds.includes(selectedPdpProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        </main>
      )}

      {activePage === 'services' && (
        <main className="py-8">
          <ServicesView
            onSelectService={(id) => handleNavigateToContact({ serviceId: id })}
            onNavigateHome={() => setActivePage('store')}
          />
        </main>
      )}

      {activePage === 'case-studies' && (
        <main className="py-8">
          <CaseStudiesView
            onSelectCaseStudy={(id) => handleNavigateToContact({ caseStudyId: id })}
            onNavigateHome={() => setActivePage('store')}
          />
        </main>
      )}

      {activePage === 'process' && (
        <main className="py-8">
          <ProcessView onNavigateHome={() => setActivePage('store')} />
        </main>
      )}

      {activePage === 'tech-stack' && (
        <main className="py-8">
          <TechStackView
            onSelectTech={(tech) => handleNavigateToContact({ techName: tech })}
            onNavigateHome={() => setActivePage('store')}
          />
        </main>
      )}

      {activePage === 'industries' && (
        <main className="py-8">
          <IndustriesView
            onSelectIndustry={(ind) => handleNavigateToContact({ industryName: ind })}
            onNavigateHome={() => setActivePage('store')}
          />
        </main>
      )}

      {activePage === 'faq' && (
        <main className="py-8">
          <FaqView
            onNavigateToContact={() => handleNavigateToContact()}
            onNavigateHome={() => setActivePage('store')}
          />
        </main>
      )}

      {activePage === 'contact' && (
        <main className="py-8">
          <ContactView
            initialServiceId={contactContext.serviceId}
            initialIndustryName={contactContext.industryName}
            initialTechName={contactContext.techName}
            initialCaseStudyId={contactContext.caseStudyId}
            onNavigateHome={() => setActivePage('store')}
          />
        </main>
      )}

      {activePage === 'cart' && (
        <main className="py-2">
          <CartView
            cartItems={cartItems}
            savedForLaterItems={savedForLaterItems}
            onUpdateQuantity={updateCartQuantity}
            onSetQuantity={setCartQuantity}
            onRemoveItem={removeCartItem}
            onSaveForLater={saveItemForLater}
            onMoveToCartFromSaved={moveSavedToCart}
            onRemoveFromSaved={removeSavedItem}
            onNavigateHome={() => setActivePage('store')}
            onQuickAddUpsell={quickAddUpsell}
            freeShippingThreshold={CLINZA_BUSINESS_RULES.FREE_SHIPPING_THRESHOLD}
            allProducts={PRODUCTS}
            onSelectProduct={(p) => {
              const targetId = typeof p === 'string' ? p : 'id' in p ? p.id : (p as any).productId;
              const matched = PRODUCTS.find((prod) => prod.id === targetId);
              if (matched) {
                setSelectedPdpProduct(matched);
                setActivePage('pdp');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
          />
        </main>
      )}

      {activePage === 'about' && (
        <main className="py-8">
          <AboutView
            onNavigateHome={() => setActivePage('store')}
            onNavigateContact={() => setActivePage('contact')}
          />
        </main>
      )}

      {activePage === 'shipping' && (
        <main className="py-8">
          <ShippingPolicyView
            onNavigateHome={() => setActivePage('store')}
            onNavigateContact={() => setActivePage('contact')}
          />
        </main>
      )}

      {activePage === 'returns' && (
        <main className="py-8">
          <ReturnsPolicyView
            onNavigateHome={() => setActivePage('store')}
            onNavigateContact={() => setActivePage('contact')}
          />
        </main>
      )}

      {activePage === 'privacy' && (
        <main className="py-8">
          <PrivacyPolicyView
            onNavigateHome={() => setActivePage('store')}
            onNavigateContact={() => setActivePage('contact')}
          />
        </main>
      )}

      {activePage === 'terms' && (
        <main className="py-8">
          <TermsView
            onNavigateHome={() => setActivePage('store')}
            onNavigateContact={() => setActivePage('contact')}
          />
        </main>
      )}

      {activePage === 'warranty' && (
        <main className="py-8">
          <WarrantyView
            onNavigateHome={() => setActivePage('store')}
            onNavigateContact={() => setActivePage('contact')}
          />
        </main>
      )}

      {activePage === 'store-locator' && (
        <main className="py-8">
          <StoreLocatorView
            onNavigateHome={() => setActivePage('store')}
            onNavigateContact={() => setActivePage('contact')}
          />
        </main>
      )}

      {activePage === '404' && (
        <main className="py-8">
          <NotFoundView
            products={PRODUCTS}
            onNavigateHome={() => setActivePage('store')}
            onNavigateCategory={(cat) => {
              setSelectedCategory(cat);
              setActivePage('collection');
            }}
            onSelectProduct={(p) => {
              setSelectedPdpProduct(p);
              setActivePage('pdp');
            }}
            onAddToCart={(p) => addToCart(p)}
          />
        </main>
      )}

      {activePage === 'collection' && (
        <main className="py-2">
          <CollectionView
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onNavigateHome={() => {
              setActivePage('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(product) => {
              setSelectedPdpProduct(product);
              setActivePage('pdp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(product, qty) => addToCart(product, qty)}
            onQuickView={(product) => setQuickViewProduct(product)}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
          />
        </main>
      )}

      {activePage === 'store' && (
        <NCFRedesignedHomepageSequence
          products={PRODUCTS}
          onAddToCart={(p) => addToCart(p)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActivePage('store');
          }}
          onSelectProduct={(p) => {
            setSelectedPdpProduct(p);
            setActivePage('pdp');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={totalCartCount}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 7. STOREFRONT FOOTER                                                  */}
      {/* --------------------------------------------------------------------- */}
      <NCFHookLocation name="beforeFooter" />
      <ClinzaFooter
        setActivePage={setActivePage}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActivePage('store');
        }}
      />
      <NCFHookLocation name="afterFooter" />

      {/* --------------------------------------------------------------------- */}
      {/* 8. ENTERPRISE AJAX CART DRAWER                                        */}
      {/* --------------------------------------------------------------------- */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onSetQuantity={setCartQuantity}
        onRemoveItem={removeCartItem}
        onSaveForLater={saveItemForLater}
        onNavigateToCartPage={() => {
          setIsCartOpen(false);
          setActivePage('cart');
        }}
        onQuickAddUpsell={quickAddUpsell}
        freeShippingThreshold={CLINZA_BUSINESS_RULES.FREE_SHIPPING_THRESHOLD}
      />

      {/* --------------------------------------------------------------------- */}
      {/* 9. PRODUCT QUICK VIEW MODAL                                           */}
      {/* --------------------------------------------------------------------- */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 overflow-hidden shadow-2xl z-10 space-y-4">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 btn btn-ghost btn-icon"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                {quickViewProduct.badge && (
                  <span className={`absolute top-3 left-3 badge badge--${quickViewProduct.badge.type}`}>
                    {quickViewProduct.badge.text}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-slate-500">{quickViewProduct.category}</span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current" /> {quickViewProduct.rating}
                  </div>
                  <span className="text-slate-400">({quickViewProduct.reviewsCount} verified reviews)</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    ${quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      ${quickViewProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-slate-800 uppercase block font-mono">Key Specifications:</span>
                  <ul className="text-xs text-slate-600 space-y-1 font-mono">
                    {quickViewProduct.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-600" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    disabled={!quickViewProduct.inStock}
                    className="btn btn-primary btn-block btn-md font-bold gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
