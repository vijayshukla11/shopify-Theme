# Nova Commerce Framework (NCF)
## Master Merchant Documentation & Store Setup Manual

Welcome to **Nova Commerce Framework (NCF)** — an enterprise-grade Shopify Online Store 2.0 theme built for high-volume merchants, extreme speed, and zero-code customization.

---

## 📚 Table of Contents

1. [Installation & Requirements](#1-installation--requirements)
2. [Centralized Theme Editor Overview](#2-centralized-theme-editor-overview)
3. [Global Design System Settings](#3-global-design-system-settings)
4. [Header & Mega Menu Configuration](#4-header--mega-menu-configuration)
5. [Footer & Trust Elements](#5-footer--trust-elements)
6. [Product Detail Page (PDP) & Cards](#6-product-detail-page-pdp--cards)
7. [Collection Page (PLP) & Sidebar Filters](#7-collection-page-plp--sidebar-filters)
8. [Blog Engine & Reading Width](#8-blog-engine--reading-width)
9. [Customer Account Dashboard](#9-customer-account-dashboard)
10. [Predictive Search Engine](#10-predictive-search-engine)
11. [Commercial Demo Presets](#11-commercial-demo-presets)
12. [Performance & Core Web Vitals Best Practices](#12-performance--core-web-vitals-best-practices)
13. [Accessibility (WCAG 2.2 AA) Features](#13-accessibility-wcag-22-aa-features)
14. [Troubleshooting & FAQ](#14-troubleshooting--faq)

---

## 1. Installation & Requirements

### System Requirements
- **Shopify Plan**: Compatible with all Shopify plans (Basic, Shopify, Advanced, Shopify Plus).
- **Online Store Architecture**: Full support for Shopify Online Store 2.0 JSON templates, app blocks, and section rendering API.

### Installation Steps
1. Download the `nova-commerce-framework-v7.4.zip` theme file.
2. In your Shopify Admin, navigate to **Online Store -> Themes**.
3. Under *Theme library*, click **Add theme -> Upload zip file**.
4. Once uploaded, click **Customize** to enter the Theme Editor.

---

## 2. Centralized Theme Editor Overview

NCF eliminates scattered settings by organizing all controls into a single slide-out drawer accessible directly from the header via **"Theme Editor (OS 2.0)"**.

### Category Structure:
- **General & Brand**: Store name, tagline, primary logo URL.
- **Typography**: Font family stacks (Sans, System, Serif, Mono), heading scales, body sizes, line heights.
- **Color System**: Primary CTA, secondary neutrals, accents, background, card surfaces, borders, status badges.
- **Buttons & Cards**: Border radius (square, sm, md, lg, pill), button heights, shadows, hover lift/zoom effects.
- **Layout & Spacing**: Container maximum widths (1280px, 1440px, 1600px, Full), section padding scales.
- **Header Navigation**: Sticky header, top announcement banner text, mega menu toggles.
- **Footer & Trust**: Newsletter subscription box, payment method icons, copyright text.
- **Products & Cards**: Quick view drawer, quick add to cart, rating stars, vendor names.
- **Collections**: Grid column layouts, sidebar position, filter and sorting controls.
- **Blog Engine**: Reading width (600px–800px), author bio cards, table of contents.
- **Customer Account**: Dashboard widgets, order history, wishlist, address manager.
- **Predictive Search**: Instant AJAX autocomplete, debounce timing, result limits.
- **Performance & Accessibility**: High contrast focus rings, lazy media loading.
- **Advanced**: Custom CSS editor and liquid schema overrides.

---

## 3. Global Design System Settings

### Typography Stacks
- **Sans-Serif**: `Plus Jakarta Sans`, system-ui, sans-serif (Modern, ultra-readable).
- **Serif**: `Playfair Display`, Georgia, serif (Luxury, high fashion).
- **Monospace**: `JetBrains Mono`, Courier, monospace (Technical hardware).

### Color Token Architecture
NCF uses custom CSS custom properties (`--color-primary`, `--color-surface`, `--color-accent`) that apply dynamically across all sections without requiring full page refreshes.

---

## 4. Header & Mega Menu Configuration

### Announcement Bar
- **Toggle**: Enable/disable top promo banner.
- **Content**: Supports inline code coupons (e.g., `Code: NOVATECH`) and flash sale alerts.

### Sticky Navigation
- Automatically keeps the primary navigation bar pinned to the top on scroll with smooth hardware-accelerated transforms.

---

## 5. Footer & Trust Elements

### Included Blocks:
- **Newsletter Opt-in**: Instant AJAX email subscription form.
- **Trust Badges**: Worldwide shipping, 30-day money-back guarantee, 24/7 technical support, secure 256-bit SSL checkout.
- **Payment Method Badges**: Visa, Mastercard, AMEX, Apple Pay, Google Pay, Shop Pay.

---

## 6. Product Detail Page (PDP) & Cards

### Features:
- **Interactive Media Gallery**: High-res thumbnail navigation with instant aspect-ratio preserved display.
- **Quick Add & Variant Selection**: Real-time stock status, SKU, and sticky add-to-cart button.
- **Frequently Bought Together**: Interactive checkbox bundle module with AJAX "Add All to Cart" and automatic bundle discount badges.

---

## 7. Collection Page (PLP) & Sidebar Filters

### Controls:
- **Grid Density**: Toggle between 2, 3, or 4 columns on desktop.
- **Filter Drawer**: Multi-select tags for Price, Category, Availability, and Ratings.

---

## 8. Blog Engine & Reading Width

### Optimal Readability:
- Choose between **600px**, **700px**, or **800px** constrained reading widths.
- Built-in estimated reading time, author card, and social sharing links.

---

## 9. Customer Account Dashboard

### Modules:
- **Recent Orders**: Order tracking, fulfillment status, and items summary.
- **Saved Addresses**: Default shipping/billing address manager.
- **Wishlist & Saved Items**: LocalStorage synchronized persistent wishlist.

---

## 10. Predictive Search Engine

### Performance Specs:
- **Debounce**: 100ms default delay prevents unnecessary network calls.
- **Result Types**: Products, collections, articles, and trending query tags.

---

## 11. Commercial Demo Presets

1. **Nova Tech Pro (Electronics)**: Slate dark/cyan theme for consumer hardware.
2. **Maison Nova (Fashion)**: Serif luxury theme with 3:4 portrait galleries.
3. **Habitat Nova (Furniture)**: Warm amber & Scandinavian oak design.
4. **Nova Botanicals (Beauty)**: Organic botanical green palette with clean outline buttons.
5. **Nova Velocity (Sports)**: High-energy athletic theme with compact high-density grids.

---

## 12. Performance & Core Web Vitals Best Practices

- **CLS Preservation**: All images specify explicit `width`, `height`, and `aspect-ratio` CSS rules.
- **Lazy Loading**: Offscreen images use `loading="lazy"` and `decoding="async"`.
- **Preconnect**: CDN preconnect hints eliminate connection latency.

---

## 13. Accessibility (WCAG 2.2 AA) Features

- Minimum touch target height of 44px for all controls.
- Distinct focus rings on keyboard `Tab` navigation.
- Full ARIA roles (`role="dialog"`, `role="combobox"`, `aria-label`).

---

## 14. Troubleshooting & FAQ

### Q: How do I change the primary theme color?
A: Open **Theme Editor (OS 2.0) -> Color System -> Primary CTA**, pick a color, and click **Save Live Settings**.

### Q: Why are my product images stretched?
A: Ensure your product images are uploaded in a consistent aspect ratio (e.g., 1:1 square or 3:4 portrait) as specified in our Onboarding Asset Guide.

---

© 2026 Nova Commerce Framework.
