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

const PRODUCTS: Product[] = [
  {
    id: 'clinza-combo-summer-set',
    name: 'The Mediterranean Linen & Chino Combo',
    category: 'combos',
    subcategory: 'Curated Combos',
    price: 1499,
    originalPrice: 2899,
    mrp: 2899,
    discount: '48% OFF',
    rating: 4.9,
    reviewsCount: 46,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://vdtbquxxpikniarmjpai.supabase.co/storage/v1/object/public/products/slider/clinza%20combo%20slider%20image.png',
    gallery: [
      'https://vdtbquxxpikniarmjpai.supabase.co/storage/v1/object/public/products/slider/clinza%20combo%20slider%20image.png',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
    specs: [
      '100% Pure European Flax Linen Shirt Included',
      'Italian-Tailored Linen-Cotton Chinos Included',
      'Curated Sartorial Color Palette',
      'Special Bundle Savings of ₹1,400'
    ],
    inStock: true,
    stockCount: 18,
    description: 'Our iconic summer pairing. Includes our signature pure linen shirt in relaxed mandarin collar alongside tailored linen-cotton chinos. Engineered to keep you impeccably dressed from daytime business meetings to balmy sunset dinners.',
    shortDescription: 'Signature pure linen shirt paired with tailored chinos for an effortless, coordinated look.',
    colors: [
      { name: 'Pink & Sand', hex: '#F9D5D3', bgClass: 'bg-rose-200' },
      { name: 'Sky & Navy', hex: '#C2D9ED', bgClass: 'bg-sky-200' },
      { name: 'Ecru & Olive', hex: '#EBE6DE', bgClass: 'bg-stone-200' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    fabricCare: {
      composition: 'Shirt: 100% Flax Linen | Trousers: 55% Linen, 45% Cotton',
      weave: 'Tailored Slub Weave',
      careInstructions: [
        'Machine wash cold on delicate cycle',
        'Line dry in shade',
        'Warm iron while damp for crisp finish'
      ]
    }
  },
  {
    id: 'clinza-pink-linen',
    name: 'Premium Pink Linen Mandarin Collar Shirt',
    category: 'shirts',
    subcategory: 'Premium Linen Shirts',
    price: 699,
    originalPrice: 1199,
    mrp: 1199,
    discount: '42% OFF',
    rating: 4.8,
    reviewsCount: 24,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15c429fcc71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
    specs: [
      '100% Pure European Flax Linen',
      'Refined Mandarin / Banded Collar',
      'Tailored Modern Fit for all-day drape',
      'Garment-washed for instant softness'
    ],
    inStock: true,
    stockCount: 14,
    description: 'Elevate your everyday wardrobe with our signature pink linen shirt. Tailored from premium European flax fibres and garment-washed for a naturally breathable, ultra-soft hand feel. Features a clean mandarin collar, Mother-of-Pearl finish buttons, and seamless single-needle tailoring.',
    shortDescription: 'Tailored from 100% pure European flax with a modern mandarin collar and relaxed drape. Pre-washed for cloud-like softness from day one.',
    colors: [
      { name: 'Soft Pink', hex: '#F9D5D3', bgClass: 'bg-rose-200' },
      { name: 'Natural Ecru', hex: '#EBE6DE', bgClass: 'bg-stone-200' },
      { name: 'Sky Blue', hex: '#C2D9ED', bgClass: 'bg-sky-200' },
      { name: 'Midnight Navy', hex: '#1E293B', bgClass: 'bg-slate-900' }
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true, remainingCount: 2 },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true }
    ],
    fabricCare: {
      composition: '100% Pure European Flax Linen',
      weave: 'Fine Slub Weave',
      careInstructions: [
        'Machine wash cold on delicate cycle',
        'Line dry in shade; do not tumble dry',
        'Warm iron while damp for crisp finish, or leave unpressed for relaxed charm'
      ]
    },
    aPlusContent: {
      enabled: true,
      brandName: 'CLINZA',
      sections: [
        {
          id: 'aplus-hero-1',
          type: 'hero_story',
          headline: 'SOFT COLOUR. REFINED CHARACTER.',
          tagline: 'THE CLINZA SUMMER LINEN CAPSULE',
          description: 'A contemporary take on timeless sartorial ease. Woven from sustainably sourced European flax and tailored for an effortless modern silhouette.',
          imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
          overlayPosition: 'center',
          theme: 'dark'
        },
        {
          id: 'aplus-split-1',
          type: 'image_text',
          title: 'Breathe Natural Ease in Every Climate',
          subtitle: 'ARTISANAL WEAVING',
          body: 'Linen is nature’s ultimate performance fabric. Our long-staple flax fibres create hollow micro-channels that allow heat and moisture to escape effortlessly, keeping you up to 4°C cooler than standard cotton.',
          imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80',
          imagePosition: 'left',
          badge: '100% PURE FLAX',
          features: [
            'Garment-washed for exceptional first-wear softness',
            'Pre-shrunk to retain crisp tailoring through wash cycles',
            'Naturally hypoallergenic and anti-static'
          ]
        },
        {
          id: 'aplus-grid-1',
          type: 'feature_grid',
          title: 'CRAFTED WITH PRECISION',
          subtitle: 'TAILORING SPECIFICATIONS',
          columns: 4,
          items: [
            {
              number: '01',
              title: 'MANDARIN COLLAR',
              description: 'Crisp standing band designed to maintain structure without buttoning tension.'
            },
            {
              number: '02',
              title: 'NATURAL TEXTURE',
              description: 'Subtle slub character that grows softer and richer with every laundering.'
            },
            {
              number: '03',
              title: 'TAILORED MODERN FIT',
              description: 'Engineered with ease across chest and a gentle taper down the torso.'
            },
            {
              number: '04',
              title: 'MOTHER-OF-PEARL BUTTONS',
              description: 'Cross-stitched for enduring strength with an iridescent pearl finish.'
            }
          ]
        },
        {
          id: 'aplus-style-1',
          type: 'style_guide',
          title: 'HOW TO STYLE',
          subtitle: '3 LOOKS FOR THE MODERN GENTLEMAN',
          looks: [
            {
              lookNumber: 'LOOK 01',
              title: 'Riviera Casual',
              pairingDescription: 'Unbutton the top two buttons, roll the sleeves to mid-forearm, and pair with tailored off-white linen shorts and leather espadrilles.',
              imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
              tags: ['Weekend', 'Resort', 'Daytime']
            },
            {
              lookNumber: 'LOOK 02',
              title: 'Smart Friday',
              pairingDescription: 'Tucked cleanly into sand-toned chinos with a woven braided belt and suede penny loafers for effortless office refinement.',
              imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
              tags: ['Smart Casual', 'Desk to Dinner']
            },
            {
              lookNumber: 'LOOK 03',
              title: 'Sunset Soirée',
              pairingDescription: 'Layered unbuttoned over a clean white supima crewneck with dark navy trousers and minimalist white sneakers.',
              imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
              tags: ['Evening', 'Cocktail', 'Layered']
            }
          ]
        },
        {
          id: 'aplus-detail-1',
          type: 'detail_story',
          title: 'The Anatomy of Craft',
          subtitle: 'HERITAGE FINISHES',
          description: 'Every seam, hem, and buttonhole is inspected across four quality checkpoints before dispatch.',
          cards: [
            {
              title: 'French Seams',
              description: 'Enclosed interior stitching prevents chafing and guarantees longevity.',
              imageUrl: 'https://images.unsplash.com/photo-1620012253295-c15c429fcc71?auto=format&fit=crop&w=800&q=80',
              caption: 'Double-turned clean interior'
            },
            {
              title: 'Reinforced Gusset',
              description: 'Side hem triangles reinforced to prevent stress tears during active movement.',
              imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
              caption: 'Curved shirt-tail hem'
            },
            {
              title: 'Thermal Soft-Wash',
              description: 'Finished with organic enzymes for supple hand-feel without synthetic chemicals.',
              imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
              caption: 'Pre-shrunk & colorfast'
            }
          ]
        },
        {
          id: 'aplus-banner-1',
          type: 'full_banner',
          headline: 'TIMELESS LUXURY. DESIGNED IN INDIA.',
          tagline: 'CLINZA SARTORIAL ATELIER',
          description: 'We believe genuine luxury lies in exceptional raw fibres, meticulous tailoring, and understated elegance that outlives fleeting seasonal trends.',
          imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80'
        },
        {
          id: 'aplus-specs-1',
          type: 'spec_table',
          title: 'GARMENT SPECIFICATIONS',
          rows: [
            { label: 'Primary Fabric', value: '100% Pure European Flax Linen' },
            { label: 'Weave Type', value: 'High-Density Slub Plain Weave' },
            { label: 'Collar Style', value: 'Mandarin / Banded Collar' },
            { label: 'Sleeve Length', value: 'Full Sleeves with Rounded Cuffs' },
            { label: 'Closure', value: 'Full Front Button Placket' },
            { label: 'Hemline', value: 'Curved Shirt-Tail' },
            { label: 'Transparency', value: 'Opaque' },
            { label: 'Occasion', value: 'Casual, Resort & Smart Casual' },
            { label: 'Country of Origin', value: 'India' }
          ]
        },
        {
          id: 'aplus-faq-1',
          type: 'faq',
          title: 'FREQUENTLY ASKED QUESTIONS',
          items: [
            {
              question: 'Will this shirt shrink after washing?',
              answer: 'No. Every CLINZA linen shirt undergoes an extensive pre-wash and enzyme treatment during manufacturing to ensure dimensional stability. As long as you wash in cold water and line dry, there is virtually zero shrinkage.'
            },
            {
              question: 'Is linen difficult to maintain?',
              answer: 'Not at all! You can wear linen naturally creased for an authentic relaxed Mediterranean aesthetic, or give it a quick steam/warm iron while damp for a sharp, tailored office look.'
            },
            {
              question: 'How does the sizing compare to regular shirts?',
              answer: 'Our linen shirts follow standard Indian sizing with a modern tailored cut (neither boxy nor ultra-skinny). If you typically wear a size 40 / M shirt, order size M.'
            },
            {
              question: 'What is your exchange policy if the size does not fit?',
              answer: 'We offer a 7-day complimentary doorstep size exchange. Our courier partner will deliver the new size and collect the old shirt in a single visit.'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'clinza-white-oxford',
    name: 'Classic White Royal Oxford Button-Down Shirt',
    category: 'shirts',
    subcategory: 'Oxford Shirts',
    price: 799,
    originalPrice: 1399,
    mrp: 1399,
    discount: '43% OFF',
    rating: 4.9,
    reviewsCount: 38,
    badge: { text: 'POPULAR', type: 'new' },
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['100% Egyptian Cotton', 'Subtle Pinpoint Basketweave', 'Button-Down Collar', 'Non-Iron Treatment'],
    inStock: true,
    description: 'The definitive white shirt crafted from two-ply 80s Egyptian cotton. Features a timeless button-down collar with a natural roll and crisp barrel cuffs.'
  },
  {
    id: 'clinza-navy-polo',
    name: 'Supima Cotton Knit Resort Polo',
    category: 'tshirts',
    subcategory: 'Polos',
    price: 599,
    originalPrice: 999,
    mrp: 999,
    discount: '40% OFF',
    rating: 4.7,
    reviewsCount: 19,
    badge: { text: 'NEW', type: 'new' },
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['100% Extra-Long Staple Supima', 'Mercerised Finish', 'Ribbed Johnny Collar', 'Anti-Pilling Knit'],
    inStock: true,
    description: 'Luxuriously soft knit polo with a modern buttonless open collar. Silky sheen that retains its luster through countless washes.'
  },
  {
    id: 'clinza-sand-trousers',
    name: 'Italian Tailored Linen-Cotton Chinos',
    category: 'bottomwear',
    subcategory: 'Trousers',
    price: 999,
    originalPrice: 1699,
    mrp: 1699,
    discount: '41% OFF',
    rating: 4.8,
    reviewsCount: 22,
    badge: { text: 'ESSENTIAL', type: 'info' },
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['55% Linen, 45% Cotton', 'Concealed Stretch Waistband', 'Single Pleat Front', 'Tapered Ankle'],
    inStock: true,
    description: 'The perfect summer trousers blending the crisp structure of cotton with the cool lightness of linen. Features single pleats and tailored ankle cuffs.'
  },
  {
    id: 'clinza-selvedge-denim',
    name: 'Modern Straight-Leg Selvedge Denim',
    category: 'jeans',
    subcategory: 'Denim',
    price: 1799,
    originalPrice: 2999,
    mrp: 2999,
    discount: '40% OFF',
    rating: 4.8,
    reviewsCount: 31,
    badge: { text: 'NEW', type: 'new' },
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['13.5oz Raw Indigo Selvedge', 'Authentic Redline ID', 'Modern Straight Leg', 'Custom Copper Rivets'],
    inStock: true,
    stockCount: 16,
    description: 'Woven on shuttle looms for authentic texture and long-lasting durability. Develops an organic, one-of-a-kind fade with wear.'
  },
  {
    id: 'clinza-linen-cargos',
    name: 'Tailored Linen-Cotton Utilitarian Cargos',
    category: 'cargos',
    subcategory: 'Cargos',
    price: 1299,
    originalPrice: 2199,
    mrp: 2199,
    discount: '41% OFF',
    rating: 4.9,
    reviewsCount: 27,
    badge: { text: 'POPULAR', type: 'new' },
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['60% Linen, 40% Long-Staple Cotton', 'Streamlined Bellows Pockets', 'Drawstring Waist', 'Articulated Knee Pleats'],
    inStock: true,
    stockCount: 12,
    description: 'A sartorial reinterpretation of military utility. Tailored in breathable linen-cotton with sleek, non-bulky cargo pockets and an easy drape.'
  },
  {
    id: 'clinza-checked-shirt',
    name: 'Artisanal Micro-Checked Linen Shirt',
    category: 'shirts',
    subcategory: 'Checked Shirts',
    price: 899,
    originalPrice: 1499,
    mrp: 1499,
    discount: '40% OFF',
    rating: 4.8,
    reviewsCount: 29,
    badge: { text: 'SALE', type: 'sale' },
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['100% European Flax', 'Yarn-Dyed Micro-Check Pattern', 'Casual Spread Collar', 'Mother-of-Pearl Buttons'],
    inStock: true,
    stockCount: 15,
    description: 'Subtle yarn-dyed checks crafted with heritage weaving techniques for an elevated casual aesthetic.'
  },
  {
    id: 'tn-audio-studio',
    name: 'TechNova ANC Pro',
    category: 'headphones',
    price: 4999,
    originalPrice: 6999,
    rating: 4.9,
    reviewsCount: 248,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://bapnbhoftmjltagztokc.supabase.co/storage/v1/object/public/images/AirPods_Max_Mockup_-_PSD_-_87408___Yellow_Images-removebg-preview.png',
    specs: ['Active Noise Cancellation', '40-Hour Battery Life', 'Spatial Audio', 'Bluetooth 5.3'],
    inStock: true,
    description: 'Flagship wireless over-ear headphones featuring hybrid active noise cancellation, custom acoustic drivers, and all-day ergonomic memory foam cushions.'
  },
  {
    id: 'tn-airpods-pro',
    name: 'TechNova AirPods 3',
    category: 'earbuds',
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 194,
    badge: { text: 'NEW', type: 'new' },
    image: 'https://bapnbhoftmjltagztokc.supabase.co/storage/v1/object/public/images/Apple_AirPods_Pro_3D_model_3D_print_model_-_linda_LI-removebg-preview.png',
    specs: ['Adaptive EQ', 'Transparency Mode', 'IPX4 Water Resistant', '30H Battery with Case'],
    inStock: true,
    description: 'True wireless earbuds with adaptive spatial audio, force sensor touch controls, and ultra-compact MagSafe charging case.'
  },
  {
    id: 'tn-neckband-flex',
    name: 'TechNova Flex 2',
    category: 'neckbands',
    price: 1899,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 156,
    badge: { text: '24% OFF', type: 'sale' },
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    specs: ['Magnetic Earbuds', 'Fast Charge 10min = 10hrs', 'Dual Pairing', 'IPX5 Sweatproof'],
    inStock: true,
    description: 'Lightweight ergonomic wireless neckband designed for workout endurance, crystal call clarity, and zero-tangle magnetic snap.'
  },
  {
    id: 'tn-speaker-boom',
    name: 'TechNova Boom 5',
    category: 'speakers',
    price: 3299,
    originalPrice: 4299,
    rating: 4.9,
    reviewsCount: 182,
    badge: { text: 'HOT', type: 'sale' },
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    specs: ['360° Room Sound', 'IPX7 Waterproof', '20-Hour Playtime', 'PartySync Stereo Pair'],
    inStock: true,
    description: 'Rugged yet refined portable Bluetooth speaker with deep bass radiators and room-filling 360-degree acoustic performance.'
  },
  {
    id: 'tn-smartwatch-s2',
    name: 'TechNova Watch S2',
    category: 'smartwatches',
    price: 5999,
    originalPrice: 7999,
    rating: 4.8,
    reviewsCount: 215,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    specs: ['1.9" AMOLED Display', 'SpO2 & Heart Rate', 'Dual-Band GPS', '50m Water Resistance'],
    inStock: true,
    description: 'Sleek aerospace-grade aluminum smartwatch with precision biometric sensors, always-on Retina display, and 7-day battery life.'
  },
  {
    id: 'tn-charger-hub',
    name: 'TechNova 3-in-1 Fast Charger',
    category: 'accessories',
    price: 1499,
    originalPrice: 1999,
    rating: 4.7,
    reviewsCount: 168,
    badge: { text: 'ESSENTIAL', type: 'info' },
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    specs: ['15W MagSafe Fast Charge', 'Foldable Travel Design', 'Phone + Watch + Buds', 'Over-Temp Protection'],
    inStock: true,
    description: 'Foldable 3-in-1 magnetic wireless charging station for charging your smartphone, smartwatch, and earbuds concurrently.'
  },
  {
    id: 'tn-smartphone-ultra',
    name: 'TechNova Ultra Smartphone',
    category: 'smartphones',
    price: 24999,
    originalPrice: 29999,
    rating: 4.9,
    reviewsCount: 310,
    badge: { text: 'FLAGSHIP', type: 'new' },
    image: 'https://bapnbhoftmjltagztokc.supabase.co/storage/v1/object/public/images/Apple_Announces_IPhone_14_And_More_-_WordlessTech-removebg-preview.png',
    specs: ['6.7" 120Hz ProMotion OLED', '108MP Pro Camera', '5000mAh Battery', '5G Ultra Wideband'],
    inStock: true,
    description: 'Pro flagship smartphone with an ultra-bright 120Hz display, cinematic 8K recording, and next-gen silicon efficiency.'
  },
  {
    id: 'tn-laptop-pro',
    name: 'TechNova Book Pro 15',
    category: 'laptops',
    price: 49999,
    originalPrice: 59999,
    rating: 4.9,
    reviewsCount: 94,
    badge: { text: 'NEW', type: 'new' },
    image: 'https://bapnbhoftmjltagztokc.supabase.co/storage/v1/object/public/images/Soft_Blue_MacBook_Skin_+_Case_-_MacBook_Air_13__M2_M3_M4_M5____Top___Skin-removebg-preview.png',
    specs: ['16GB Unified RAM', '512GB NVMe SSD', 'Liquid Retina Display', '18H Battery Life'],
    inStock: true,
    description: 'Ultra-thin unibody laptop engineered for intensive creative workstations, all-day battery life, and silent fanless operation.'
  },
  {
    id: 'tn-combo-pack',
    name: 'TechNova Ultimate Executive Tech Pack',
    category: 'combos',
    price: 29999,
    originalPrice: 38999,
    rating: 5.0,
    reviewsCount: 78,
    badge: { text: 'SAVE ₹9,000', type: 'sale' },
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    specs: ['TechNova ANC Pro Included', 'Watch S2 Included', '3-in-1 Charger Included', 'Hard Travel Case'],
    inStock: true,
    description: 'The complete executive productivity trio bundled together at exclusive savings with complimentary VIP warranty coverage.'
  }
];

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
        (selectedCategory === 'bottomwear' && (p.category === 'bottomwear' || p.category === 'trousers'));
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
