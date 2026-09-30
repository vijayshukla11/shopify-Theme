# Nova Commerce Framework (NCF) Developer SDK & Extension Guide

## Overview
Nova Commerce Framework (NCF) v1.0 RC1 includes a production-ready Developer SDK and Extension Framework. Third-party developers can extend NCF safely without modifying any core framework files.

---

## Key Architecture & Features

### 1. Global SDK Singleton Access
The NCF Developer SDK attaches to `window.NCFSDK` at runtime for browser console diagnostics and programmatically through module import:

```typescript
import { sdk, NCFHookLocation } from 'nova-commerce-sdk';

// Subscribe to events
sdk.events.on('ProductAddedToCart', (payload) => {
  console.log('Product added:', payload.title, payload.price);
});
```

### 2. Storefront Hook System
NCF provides non-destructive template injection hooks throughout storefront sections:
- `beforeHeader` / `afterHeader`
- `beforeHero` / `afterHero`
- `beforeCollectionGrid` / `afterCollectionGrid`
- `beforeProductInfo` / `afterProductInfo`
- `beforeCart` / `afterCart`
- `beforeFooter` / `afterFooter`

#### Registering an Extension Hook
```typescript
sdk.hooks.register({
  id: 'my-custom-announcement',
  pluginId: 'my-third-party-plugin',
  location: 'afterHeader',
  priority: 10,
  render: (context) => (
    <div className="bg-sky-500 text-slate-950 p-2 text-xs font-bold text-center">
      🎉 Flash Sale! Save 20% on all Studio Audio Products!
    </div>
  )
});
```

---

### 3. Pub/Sub Event Bus System
NCF emits strongly-typed events whenever core customer actions occur:
- `ProductAddedToCart`
- `CartUpdated`
- `SearchOpened`
- `SearchClosed`
- `WishlistUpdated`
- `VariantChanged`
- `CollectionFiltered`
- `ThemePresetChanged`
- `CustomerLoggedIn`
- `CustomerLoggedOut`

#### Subscribing to Events
```typescript
const unsubscribe = sdk.events.on('CartUpdated', ({ itemCount, totalAmount }) => {
  console.log(`Cart now contains ${itemCount} items totaling $${totalAmount}`);
});
```

---

### 4. Component & Token Registries
Developers can register custom re-usable cards, buttons, section blocks, badges, or inputs:

```typescript
sdk.components.register({
  id: 'custom-promo-badge',
  type: 'badge',
  name: 'Custom VIP Badge',
  component: MyVipBadgeComponent
});
```

---

### 5. Plugin Architecture
Plugins bundle metadata, lifecycle hooks, dependencies, permissions, and extension points:

```typescript
sdk.plugins.registerPlugin({
  id: 'ncf-loyalty-points',
  name: 'NCF Loyalty Rewards',
  version: '1.2.0',
  author: 'Ecosystem Dev',
  description: 'Calculates dynamic rewards and displays VIP status.',
  permissions: ['read_cart', 'render_hooks'],
  enabled: true,
  init: (sdk) => {
    // Initialization logic
  },
  destroy: () => {
    // Cleanup logic
  }
}, sdk);
```

---

## Live Extension Inspector
Launch the built-in Developer SDK Inspector directly from the storefront header toolbar by clicking **"Developer SDK"**.
Features:
- **Hook Inspector**: View all active template injection hooks and priorities
- **Event Bus Stream**: View real-time event logs and emit test events
- **Plugin Manager**: Enable/disable plugins and verify permissions
- **Component Registry**: Inspect registered components
- **Diagnostics & Health**: Verify WCAG 2.2 AA compliance and version compatibility
