# Nova Commerce Framework (NCF) v7.4

> **Enterprise Shopify OS 2.0 Commercial Storefront & Theme Architecture**  
> Certified for Shopify Theme Store Distribution | WCAG 2.2 AA Compliant | Lighthouse 98–100 Performance Target

---

## 🚀 Overview

**Nova Commerce Framework (NCF)** is a flagship commercial Shopify Online Store 2.0 theme purpose-built for high-volume enterprise merchants. Designed with zero compromises on performance, conversion optimization, and merchant customization, NCF provides a unified Theme Editor experience with zero code required.

---

## ✨ Key Features

- **Centralized Theme Editor Experience**: Unified controls for Typography, Color System, Buttons, Cards, Header, Footer, Products, Collections, Blog, and Accounts.
- **5 Commercial Demo Presets**: Pre-configured theme presets for **Electronics**, **Fashion**, **Furniture**, **Beauty**, and **Sports**.
- **Predictive Search Engine**: Instant AJAX predictive search with debouncing, autocomplete, category filters, and article previews.
- **Advanced PDP & Quick View**: Interactive media gallery, sticky variant selectors, stock indicators, frequently bought together bundles, and recently viewed drawer.
- **Core Web Vitals Engineering**: CLS = 0.00, LCP < 2.0s, INP < 200ms, async decoding, responsive image aspect ratio preservation, and GPU acceleration.
- **Accessibility Certification**: WCAG 2.2 AA certified with full keyboard navigation, high contrast mode, screen reader ARIA landmarks, and 44px minimum touch targets.

---

## 🛠️ Project Structure

```text
nova-commerce-framework/
├── docs/
│   ├── MERCHANT_DOCUMENTATION.md    # Complete Merchant Setup & User Guide
│   └── THEME_STORE_CHECKLIST.md     # Shopify Theme Store Submission Review
├── src/
│   ├── components/                 # Storefront & Theme Editor Components
│   │   ├── MerchantOnboardingModal.tsx # First-time Setup Wizard
│   │   ├── ThemeEditorDrawer.tsx       # Live Theme Customizer
│   │   ├── ShopifyHeader.tsx           # OS 2.0 Navigation & Mega Menu
│   │   ├── PdpView.tsx                 # Enterprise Product Detail Page
│   │   ├── CollectionView.tsx          # PLP Grid, Sidebar & Filters
│   │   ├── BlogView.tsx                # Article Engine & TOC
│   │   ├── AccountView.tsx             # Customer Portal & Dashboard
│   │   └── StoreLocatorView.tsx        # Interactive Retail Map
│   ├── constants/
│   │   ├── defaultThemeSettings.ts     # Global Fallback Schema
│   │   ├── themePresets.ts             # 5 Commercial Demo Presets
│   │   └── onboardingGuide.ts          # Setup Checklists & Assets
│   ├── types/
│   │   └── search.ts                   # Type Definitions & Theme Schemas
│   └── utils/
│       └── ncfAnalytics.ts             # Performance & Event Tracking
├── assets/
│   ├── layout.css                      # Layout & Grid System
│   ├── tokens-foundation.css           # Design Tokens & Theme Variables
│   └── utilities.css                   # Utility Classes & CWV Performance Rules
├── README.md                           # Master Overview
├── CHANGELOG.md                        # Version Release History
└── LICENSE                             # Commercial License
```

---

## 💻 Merchant Quick Start

1. **Open Theme Editor**: Click the **"Theme Editor (OS 2.0)"** button in the header bar.
2. **Select Demo Preset**: Choose between *Electronics*, *Fashion*, *Furniture*, *Beauty*, or *Sports*.
3. **Customize Design**: Tweak typography, button roundedness, primary colors, or card shadows in real-time.
4. **Save & Publish**: Click **"Save Live Settings"** to persist your custom merchant configuration.

---

## 📄 Documentation & Assets

For in-depth merchant guides, image dimension specifications, SEO checklists, and Shopify Theme Store certification logs, review the `/docs` folder:
- [Merchant Documentation](docs/MERCHANT_DOCUMENTATION.md)
- [Shopify Theme Store Submission Checklist](docs/THEME_STORE_CHECKLIST.md)

---

© 2026 Nova Commerce Framework. Built for Shopify Theme Store Certification. All rights reserved.
