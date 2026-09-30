import { DocSection } from './documentationData';

export const SPRINT_01_SECTIONS: DocSection[] = [
  {
    id: "core-architecture",
    number: 1,
    title: "1. NCF Core Architecture",
    shortDesc: "Overall framework philosophy, layered architecture, dependency rules, component hierarchy, and separation of concerns.",
    content: `The Nova Commerce Framework (NCF) Core Architecture is designed as a layered, modular software framework engineered specifically for the Shopify Online Store 2.0 theme runtime environment. NCF separates presentation schema, styling tokens, structural markup, and client-side behavior into decoupled layers.

1. Framework Philosophy
• Zero Heavy Dependencies: NCF prohibits monolithic client-side libraries (jQuery, React, Vue, Alpine.js, Tailwind runtime engines). All behavior is driven by native browser APIs (Vanilla ES6 Custom Elements) and native Liquid rendering.
• Shopify-Native Primacy: Standard Liquid filters, JSON templates, and Theme Editor schema primitives serve as the structural backbone. No custom build tools or transpilers are required for theme operation.
• High Density & Predictability: Clean, predictable component structures with strictly defined APIs and explicit data flow boundaries.

2. Layered Architecture
• Layer 1: Configuration & Token Layer (/config/settings_schema.json, /config/settings_data.json)
  Exposes merchant customization controls. Maps visual choices directly to CSS custom properties in <head>.
• Layer 2: Layout & Template Shell (/layout/theme.liquid, /templates/*.json)
  Establishes page HTML boundaries, metadata, accessibility skip links, and section group mount points.
• Layer 3: Dynamic Section Layer (/sections/*.liquid)
  Houses modular Liquid markup and section schemas. Receives settings from theme configuration and outputs clean semantic HTML.
• Layer 4: Reusable Snippet Layer (/snippets/*.liquid)
  Houses atomic UI elements (buttons, badges, prices, icons) and logic blocks (json-ld, pagination).
• Layer 5: Web Component Behavioral Layer (/assets/component-*.js)
  Encapsulates interactive logic using Native Custom Elements. Listens to DOM events and manages local UI state without polluting global window scope.

3. Dependency Rules & Hierarchy
• Upward Isolation: Lower layers (Snippets) must never depend on higher-layer assumptions (Sections or Page Templates). Snippets receive data explicitly via Liquid 'render' parameters.
• Unidirectional Data Flow: Data flows strictly downward from Theme Settings -> JSON Templates -> Sections -> Snippets -> HTML Attributes -> Web Components.
• Web Components consume HTML attributes (data-* attributes or aria-* attributes) rendered by Liquid as their initial state.`,
    analysis: {
      whatItIs: "The master architectural blueprint defining the structural layers, data flow, and dependency constraints of NCF.",
      whyShopifyRecommendsIt: "Layered architectures prevent circular Liquid dependencies, keep asset sizes minimal, and guarantee compatibility with Shopify Theme Editor updates.",
      howNcfShouldImplementIt: "Enforce strict layer boundaries where Liquid sections handle schema rendering and Web Components encapsulate client interactivity.",
      commonMistakes: "Bypassing snippets to duplicate complex markup in multiple sections, or injecting global JS variables into theme.liquid instead of scoped Web Components.",
      bestPractices: "Pass all data parameters explicitly into Liquid snippets via the 'render' tag and initialize Web Components via standard HTML attributes.",
      futureConsiderations: "Compatibility with upcoming Shopify Horizon schema primitives and multi-storefront headless sync."
    }
  },
  {
    id: "design-system",
    number: 2,
    title: "2. NCF Design System",
    shortDesc: "Color token strategy, typography scale, spacing system, grid, radius, shadow, elevation, icon strategy, motion, and responsive breakpoints.",
    content: `The NCF Design System provides a mathematical, token-based visual foundation that scales seamlessly across device sizes while enabling deep merchant customization.

1. Color Token Strategy
• Primitive Tokens: Raw hex/hsl values defined in settings_schema.json (e.g. Brand Primary, Neutral 900, Accent).
• Semantic Tokens: Mapped to CSS Custom Properties in theme.liquid (e.g. var(--color-text-main), var(--color-bg-surface), var(--color-border-subtle), var(--color-[role])).
• Contrast Guarantee: All semantic color combinations are validated in settings_schema.json to ensure WCAG 2.1 AA compliance (4.5:1 ratio minimum).

2. Typography Scale & Fluid Typography
• Font Scale Ratio: Major Third (1.25) for compact UI density, scaling up smoothly to Perfect Fourth (1.333) for marketing headings.
• Scale Tokens: var(--font-size-3xs: 10px), var(--font-size-2xs: 11px), var(--font-size-xs: 12px), var(--font-size-sm: 14px), var(--font-size-[step]).
• Fluid Clamp Implementation: Heading sizes utilize CSS clamp() functions calculated between mobile (320px) and desktop (1440px) viewports without JavaScript resize listeners.

3. Spacing & Grid System
• Base Grid Unit: 4px / 8px scale (var(--space-1: 4px), var(--space-2: 8px), var(--space-3: 12px), var(--space-4: 16px), var(--space-6: 24px), var(--space-8: 32px), var(--space-12: 48px)).
• Outer vs Inner Padding Math: Outer container padding must always equal or exceed inner item gap spacing (Outer Padding >= Inner Gap).
• Layout Grid: 12-column dynamic flexbox/CSS grid with merchant-configurable gap sizes and desktop/mobile column span overrides.

4. Border Radius, Shadow & Elevation
• Radius Tokens: var(--radius-none: 0px), var(--radius-sm: 2px), var(--radius-md: 4px), var(--radius-lg: 8px), var(--radius-[token]).
• Nested Radius Rule: Inner Element Radius = Outer Container Radius - Padding distance.
• Elevation System: z-index scale: var(--z-dropdown: 100), var(--z-sticky: 200), var(--z-drawer: 300), var(--z-modal: 400), var(--z-[role]).

5. Icon Strategy, Motion & Breakpoints
• Inline SVG Snippets: All icons are rendered as inline SVG snippets (e.g. {% render 'icon-cart' %}). Icon fonts and external SVG sprites are strictly forbidden due to HTTP overhead and render-blocking delays.
• Motion Principles: All animations use hardware-accelerated CSS properties (transform, opacity). Respect prefers-reduced-motion media query by disabling non-essential transitions automatically.
• Mobile-First Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).`,
    analysis: {
      whatItIs: "A complete tokenized visual system covering color semantics, typography, spacing, depth, icons, and motion.",
      whyShopifyRecommendsIt: "Tokenized design systems allow merchants to drastically alter visual branding without risking broken layouts or accessibility failures.",
      howNcfShouldImplementIt: "Expose design tokens in settings_schema.json and output them as CSS Custom Properties directly in the document head.",
      commonMistakes: "Using arbitrary pixel values in component CSS stylesheets instead of referencing design system variables.",
      bestPractices: "Maintain consistent token names across all component stylesheets and enforce fluid font scaling with CSS clamp().",
      futureConsiderations: "Automated token synchronization between Figma design kits and Shopify settings_schema.json."
    }
  },
  {
    id: "component-library",
    number: 3,
    title: "3. NCF Component Library",
    shortDesc: "Comprehensive architectural specification for 17 core e-commerce framework components.",
    content: `The NCF Component Library establishes strict functional and accessibility specifications for 17 core reusable theme components. Every component is defined with explicit variants, accessibility behaviors, and Theme Editor schema guidelines.

1. Buttons (<button class="btn btn--[variant]">)
• Purpose: Primary, secondary, outline, and tertiary action triggers.
• Variants: Primary, Secondary, Outline, Ghost, Danger, Loading State, Icon Only.
• Accessibility: Visible focus-visible outline, min 44x44px touch target on mobile, aria-busy during async cart operations.
• Theme Editor: Color, size, border radius, hover effect, and text case configurable globally in settings.

2. Cards (Product, Collection, Blog, Brand Cards)
• Purpose: Structured content containers for catalog items, editorial content, and brand collections.
• Variants: Vertical Standard, Horizontal Compact, Minimal Overlay, Bordered, Shadowed.
• Accessibility: Whole-card click target managed via pseudo-element over product title link to prevent nested anchor tags.
• Theme Editor: Show/hide badges, vendor, rating, price, secondary hover image toggle, and image aspect ratio controls.

3. Form Elements & Inputs (Text Input, Select, Checkbox, Radio, Swatches)
• Purpose: Data collection for search, customer login, product variant picking, and contact forms.
• Variants: Standard Outlined, Filled, Compact High-Density, Error State, Disabled State.
• Accessibility: Associated <label> tags via 'for' attribute, aria-invalid on error, aria-describedby for error messaging.
• Theme Editor: Form style presets (round vs sharp), label placement (floating vs top-stacked).

4. Overlays & Interactive Components (Drawers, Modals, Accordions, Tabs)
• Purpose: Slide-out cart, quick view modals, product details accordion, and tabbed content sections.
• Variants: Cart Drawer, Filter Drawer, Quick View Modal, Product Info Accordion, Horizontal Tab Bar.
• Accessibility: Built using Custom Elements (<ncf-drawer>, <ncf-accordion>). Focus trapping inside active modals, Escape key listener to close, aria-expanded state sync, scroll-lock on document body.
• Theme Editor: Drawer side anchor (left/right), backdrop blur opacity, animation speed.

5. Micro Utilities (Badges, Chips, Rating Stars, Price Display, Pagination)
• Purpose: Status highlights, product tags, review summaries, multi-currency price formatting, and pagination navigation.
• Variants: Sale Badge, Sold Out Badge, Custom Tag Chip, Star Rating Block, Compare-At Price Block.
• Accessibility: Screen reader hidden text for price comparisons ("Regular price $50, Sale price $40"), aria-label on rating ("4.8 out of 5 stars").
• Theme Editor: Badge placement positioning, price currency formatting rules, badge background tokens.`,
    analysis: {
      whatItIs: "The master catalog of 17 foundational e-commerce UI components specifying markup rules, variants, and interactive behaviors.",
      whyShopifyRecommendsIt: "Standardized components eliminate repetitive markup, ensure uniform accessibility across the entire store, and streamline merchant styling.",
      howNcfShouldImplementIt: "Package each component into a dedicated Liquid snippet in /snippets/ and pair interactive components with custom elements in /assets/.",
      commonMistakes: "Creating multiple inline variations of product cards across different sections instead of referencing a single snippet.",
      bestPractices: "Keep Liquid component snippets stateless where possible and pass variables explicitly via the 'render' tag.",
      futureConsiderations: "Metaobject-driven component variants for dynamic store page builds."
    }
  },
  {
    id: "css-architecture",
    number: 4,
    title: "4. NCF CSS Architecture",
    shortDesc: "Comparative analysis of BEM, CUBE CSS, ITCSS, and Component-First CSS, with objective recommendations for NCF.",
    content: `Selecting the right CSS architecture is critical for a high-density, performance-first Shopify theme. Below is an objective comparative evaluation of the four primary CSS methodologies in the Shopify theme ecosystem.

1. Architectural Evaluation & Comparison

• BEM (Block Element Modifier):
  - Why: Strict naming convention (.block__element--modifier) providing predictable scoping.
  - Advantages: Zero selector specificity wars; highly readable for both human developers and AI coding agents; isolated component styles.
  - Disadvantages: Can result in verbose HTML class strings; does not inherently define global layout or utility layers.
  - Shopify Alignment: Excellent. Official Shopify Dawn theme and developer guidelines heavily favor BEM.

• CUBE CSS (Composition Utility Block Exception):
  - Why: Combines macro layout compositions, utility classes, and scoped block styles with exception states.
  - Advantages: Reduces duplicate CSS by leveraging utility classes; highly adaptable to fluid design tokens; embraces the cascade.
  - Disadvantages: Requires developer discipline to distinguish between Utilities and Blocks; less familiar to traditional Liquid developers.
  - Shopify Alignment: High. Works exceptionally well with OS 2.0 dynamic layout presets.

• ITCSS (Inverted Triangle CSS):
  - Why: Categorizes CSS into inverted specificity layers (Settings, Tools, Generic, Elements, Objects, Components, Utilities).
  - Advantages: Solves specificity conflicts globally; provides a logical file structure for large codebases.
  - Disadvantages: Monolithic compilation requirement if bundled into a single file, which violates NCF's modular per-section asset strategy.
  - Shopify Alignment: Moderate. Harder to align with section-scoped CSS asset loading.

• Component-First CSS (Pure Isolated CSS per Component):
  - Why: Every Liquid section loads a single standalone CSS file (e.g. section-main-product.css).
  - Advantages: Total asset isolation; zero unused CSS loaded on pages where the section is absent; optimal page speed.
  - Disadvantages: Potential code duplication across similar components if shared utilities are not abstracted.
  - Shopify Alignment: Very High. Matches Shopify's {{ 'section-name.css' | asset_url | stylesheet_tag }} pattern.

2. NCF Recommended Hybrid CSS Architecture: "Scoped BEM + CUBE Utility Tokens"
• Core Recommendation: NCF adopts BEM for all component and section class naming (.card-product__title, .cart-drawer__item--active), combined with CUBE CSS principles for global composition utilities (.grid-layout, .container, .flex-stack) and design tokens defined as CSS Custom Properties.
• Section Asset Isolation: Global CSS is capped at < 15KB (containing tokens, reset, and base typography). Each section conditionally requests its own lightweight CSS file, preventing global CSS bloat.`,
    analysis: {
      whatItIs: "An objective comparative analysis evaluating BEM, CUBE CSS, ITCSS, and Component-First CSS to determine the optimal CSS architecture for NCF.",
      whyShopifyRecommendsIt: "A structured CSS architecture prevents specificity conflicts, keeps global bundle sizes microscopic, and ensures sub-second render speeds.",
      howNcfShouldImplementIt: "Combine BEM naming conventions for component isolation with CUBE CSS utility classes for layout compositions and custom property tokens.",
      commonMistakes: "Loading a single massive 300KB global stylesheet on every page or using deeply nested CSS selectors that increase specificity.",
      bestPractices: "Scope section-specific CSS files and load them conditionally using Liquid stylesheet_tag filters.",
      futureConsiderations: "Native CSS Nesting adoption as browser support reaches 100% baseline."
    }
  },
  {
    id: "javascript-architecture",
    number: 5,
    title: "5. NCF JavaScript Architecture",
    shortDesc: "Vanilla ES6 Custom Elements, module organization, event delegation, scope isolation, and progressive enhancement.",
    content: `The NCF JavaScript Architecture provides snappy, reliable client-side interactivity while guaranteeing zero impact on initial page load performance or Core Web Vitals.

1. Native JavaScript vs Framework Libraries
• Strategic Decision: 100% Vanilla ES6 Native Web Components (Custom Elements API). Heavy client frameworks (React, Vue, Alpine.js, jQuery) are strictly prohibited.
• Justification: Custom elements are built into modern browser engines, require zero runtime parsing or download overhead, automatically bind to DOM nodes, and natively support Shopify Theme Editor lifecycle re-initialization.

2. Module Organization & Encapsulation
• File Structure: One Web Component per JavaScript file in /assets/ (e.g., /assets/component-cart-drawer.js, /assets/component-variant-selects.js).
• Scope Isolation: Code is encapsulated inside Custom Element class definitions extending HTMLElement. Zero global window scope pollution allowed.
• Lazy Loading Strategy: Non-critical scripts use 'defer' or are loaded dynamically on demand when the component enters the viewport (via IntersectionObserver) or upon user hover/click.

3. Event Delegation & Inter-Component Communication
• Event Delegation: Attach event listeners to component root nodes rather than binding listeners to individual child elements inside lists or grids.
• Custom Event Bus: Components communicate via standard DOM CustomEvents (e.g. this.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: { item } }))).
• Theme Editor Events: All Custom Elements listen to Shopify Theme Editor lifecycle events ('shopify:section:load', 'shopify:section:select', 'shopify:section:deselect') to re-bind listeners and update state instantaneously when merchants edit store settings.

4. Progressive Enhancement Guarantee
• Core Commerce Functionality: All forms, product variant selections, cart updates, and navigation drawers must function gracefully via native HTML form POST actions if JavaScript fails to load or is disabled.
• Enhancements: Web Components intercept native form submits to provide smooth AJAX drawer updates and instant visual feedback without breaking fallback paths.`,
    analysis: {
      whatItIs: "The client-side behavioral engine based on Vanilla ES6 Web Components, event delegation, and progressive enhancement.",
      whyShopifyRecommendsIt: "Native Web Components provide instant browser execution with zero library overhead and seamless compatibility with the Shopify Admin preview.",
      howNcfShouldImplementIt: "Extend HTMLElement for all interactive components and load JS modules using defer attributes in Liquid.",
      commonMistakes: "Attaching global event listeners to 'window' or 'document' without cleaning them up, causing memory leaks during theme editor live reloads.",
      bestPractices: "Intercept native HTML form submissions with Web Components while keeping native HTTP POST fallbacks fully operational.",
      futureConsiderations: "Adoption of Native Shadow DOM for custom elements where style isolation is advantageous."
    }
  },
  {
    id: "liquid-standards",
    number: 6,
    title: "6. NCF Liquid Standards",
    shortDesc: "File organization, snippet hygiene, render strategy, internationalization rules, and liquid execution performance guidelines.",
    content: `Liquid is the server-side rendering engine of Shopify. NCF enforces strict Liquid coding hygiene to guarantee minimal server response times (TTFB) and error-free execution.

1. File Organization & Naming Rules
• Sections: Lowercase kebab-case prefixed by functional role (e.g. main-product.liquid, header-group.json, hero-banner.liquid).
• Snippets: Lowercase kebab-case prefixed by component type (e.g. card-product.liquid, icon-cart.liquid, snippet-json-ld.liquid).
• Templates: Strictly .json templates for pages (index.json, product.json, collection.json, cart.json). Legacy .liquid templates in /templates/ are forbidden.

2. Render Strategy & Scope Isolation
• Strict 'render' Tag Usage: Use {% render 'snippet-name', param: value %} exclusively. The legacy {% include %} tag is banned as it pollutes local variable scope and incurs performance penalties.
• Explicit Parameter Passing: Snippets must explicitly receive all required variables through render parameters. Snippets must never assume variables exist in the parent scope.
• Guard Checking: Always verify object existence prior to rendering attributes (e.g. {% if product.featured_media != blank %}).

3. Localization & String Hygiene (i18n)
• Zero Hardcoded Text: 100% of merchant and customer-facing text strings must utilize the Liquid translation filter {{ 'general.cart.title' | t }}.
• Structured Keys in /locales/en.default.json: Organize translation keys hierarchically by component and section (e.g. products.product.add_to_cart, sections.header.search).

4. Liquid Execution Performance Guidelines
• Avoid Deeply Nested Loops: Limit Liquid for-loops to a maximum depth of 2. Never run nested loops over collections or product arrays inside snippets.
• Pre-Calculate Variables: Assign complex conditions or array filters to a Liquid variable once before rendering loops rather than evaluating filters repeatedly.
• Limit Liquid Render Depth: Max 3 levels of snippet render nesting to prevent Liquid parser stack overhead.`,
    analysis: {
      whatItIs: "The rigorous code structure and execution guidelines governing all Liquid templates, sections, and snippets in NCF.",
      whyShopifyRecommendsIt: "High-performance Liquid code drastically reduces server rendering time (TTFB), improves TTFB Web Vitals, and prevents theme check errors.",
      howNcfShouldImplementIt: "Enforce 'render' tag usage, guard-check all object properties, and maintain structured locale key hierarchies.",
      commonMistakes: "Using legacy 'include' tags, hardcoding English strings in section markup, and executing heavy for-loop filters inside card snippets.",
      bestPractices: "Pass variables explicitly to snippets using render parameters and audit Liquid code with Theme Check prior to committing.",
      futureConsiderations: "Leveraging upcoming Shopify Liquid caching mechanisms and metaobject dynamic sources."
    }
  },
  {
    id: "theme-editor-philosophy",
    number: 7,
    title: "7. NCF Theme Editor Philosophy",
    shortDesc: "Guidelines defining what must remain merchant configurable versus structurally fixed, and merchant experience (MX) principles.",
    content: `The NCF Theme Editor Philosophy establishes a clear boundary between merchant customization flexibility and architectural layout integrity.

1. What Should Always Be Configurable (Merchant Controls)
• Visual Branding: Color palette selections, typography pairings, border radius scale, button style variants.
• Content & Messaging: Headings, subtext, CTA button labels, links, image media, video uploads, promotional banners.
• Layout Controls: Section padding (top/bottom spacing), grid column count on desktop/mobile, text alignment, content container width.
• Section Visibility & Ordering: Reordering sections on any page via OS 2.0 JSON templates.

2. What Should Remain Fixed (Framework Safeguards)
• Core Structural Grid Math: Outer container max-widths, responsive breakpoint logic, fluid typography clamp curves.
• Accessibility Standards: Contrast ratio enforcement, semantic heading structure (H1/H2/H3 enforcement based on page hierarchy), ARIA attribute wiring.
• Critical Performance Rules: Image fetchpriority tags, Web Vitals script loading orders, critical inline CSS injection logic.

3. Merchant Experience (MX) Guidelines
• Clear Schema Grouping: Organize section settings into logical fieldsets using Shopify schema headers and paragraphs (e.g. "Header", "Content", "Colors", "Spacing").
• Helpful Schema Guidance: Provide concise inline 'info' tooltips explaining recommended image dimensions (e.g. "Recommended size: 1200 x 800px .jpg").
• Predictable Defaults: Every section schema must provide beautiful, production-ready preset defaults so newly added sections look stunning instantly without configuration.
• Instant Theme Editor Feedback: Web Components listen to 'shopify:section:load' to re-initialize UI controls (sliders, drawers) immediately when settings change in the admin preview.`,
    analysis: {
      whatItIs: "The governing philosophy balancing merchant customization freedom against theme performance and structural stability.",
      whyShopifyRecommendsIt: "Intuitive Theme Editor setups empower non-technical merchants to manage their stores while preventing layout breaks or performance degradation.",
      howNcfShouldImplementIt: "Expose granular settings for content and branding while locking structural grid math and accessibility rules behind framework safeguards.",
      commonMistakes: "Exposing raw CSS input fields to merchants or failing to provide schema defaults, resulting in blank broken sections.",
      bestPractices: "Group schema settings logically with clear section headers and listen to Shopify Theme Editor JavaScript events for instant preview updates.",
      futureConsiderations: "Integration with Shopify Admin visual preset selectors and AI-assisted schema copy generation."
    }
  },
  {
    id: "folder-standards",
    number: 8,
    title: "8. NCF Folder Standards",
    shortDesc: "Naming conventions, standardized directory organization, asset naming rules, and internal documentation placement.",
    content: `NCF strictly enforces canonical Shopify directory structures and lower-case kebab-case naming conventions across all framework files.

1. Canonical Directory Blueprint
/assets/          -> Compiled minified JavaScript Web Components, section-scoped CSS files, SVG icons, static media.
/config/          -> settings_schema.json (theme controls & tokens), settings_data.json (theme style presets).
/layout/          -> theme.liquid (master layout shell), password.liquid, gift_card.liquid.
/locales/         -> en.default.json (master translation key schema), fr.json, es.json.
/sections/        -> Dynamic section components (.liquid) and section groups (.json).
/snippets/        -> Atomic, reusable Liquid components (card-product.liquid, icon-search.liquid, snippet-json-ld.liquid).
/templates/       -> JSON template definitions for pages (index.json, product.json, collection.json, cart.json, etc.).
/templates/metaobject/ -> Native metaobject display templates.
/docs/            -> Framework architecture documentation, Architecture Decision Records (ADRs), developer guides.

2. File Naming Rules
• Sections: kebab-case with functional prefix (e.g. main-product.liquid, header-group.json, hero-banner.liquid, featured-collection.liquid).
• Snippets: kebab-case with component prefix (e.g. card-product.liquid, card-article.liquid, icon-cart.liquid, price-display.liquid).
• Assets: Lowercase kebab-case matching paired component name (e.g. component-cart-drawer.js, component-cart-drawer.css, section-hero-banner.css).
• Locales: Two-letter ISO language codes (en.default.json, de.json, ja.json).

3. Strict Rules & Prohibitions
• No Custom Root Folders: Creating unauthorized root folders (e.g. /src/, /components/, /styles/) is strictly prohibited as it breaks Shopify CLI deployment.
• No Unused Files: Orphaned CSS, JS, or Liquid files must be deleted immediately.
• Capitalization Policy: Strictly lower-case kebab-case for all files. CamelCase, PascalCase, or snake_case filenames are forbidden.`,
    analysis: {
      whatItIs: "The mandatory directory blueprint and file naming rules for the entire NCF codebase.",
      whyShopifyRecommendsIt: "Canonical file organization ensures total compatibility with Shopify CLI, GitHub integrations, and third-party theme auditing tools.",
      howNcfShouldImplementIt: "Enforce lower-case kebab-case file naming across all theme directories and keep internal framework docs inside /docs/.",
      commonMistakes: "Adding custom subdirectories inside /sections/ or using inconsistent uppercase file names that fail on Linux server environments.",
      bestPractices: "Keep asset filenames 1-to-1 matched with their corresponding section or snippet component names for effortless developer navigation.",
      futureConsiderations: "Automated theme structure validation via custom Theme Check rules."
    }
  },
  {
    id: "documentation-standards",
    number: 9,
    title: "9. NCF Documentation Standards",
    shortDesc: "Architecture Decision Record (ADR) format, README structure, component docs, changelog strategy, and semantic versioning.",
    content: `NCF maintains clear, professional documentation to support multi-developer collaboration, automated AI coding agent integration, and long-term framework maintainability.

1. Architecture Decision Record (ADR) Standard
Every major architectural decision (e.g. choosing Vanilla Web Components over Alpine.js, adopting BEM+CUBE CSS) must be recorded in /docs/adr/ using the standard format:
• ADR Number & Title: (e.g. ADR-001: Native ES6 Web Component Interactivity)
• Status: [PROPOSED | ACCEPTED | REJECTED | DEPRECATED]
• Context: Problem statement and constraints driving the decision.
• Decision: The selected architectural solution and technical reasoning.
• Consequences: Positive trade-offs, potential risks, and long-term operational impact.

2. Component Documentation Standard
Every Liquid snippet and Web Component JS file must include a standardized header block comment detailing:
• Component Purpose: Brief description of what the component renders.
• Parameters / Props: Explicit list of required and optional Liquid variables passed via render.
• Example Usage: {% render 'card-product', product_ref: product, show_vendor: true %}
• Associated Assets: Dependencies on CSS or JS files in /assets/.

3. Versioning & Changelog Strategy
• Semantic Versioning (SemVer 2.0.0): MAJOR.MINOR.PATCH (e.g. v1.2.0).
  - MAJOR: Breaking schema changes or structuralLiquid refactors.
  - MINOR: New sections, snippets, or theme editor settings added backwards-compatibly.
  - PATCH: Bug fixes, accessibility patches, or performance optimizations.
• CHANGELOG.md: Maintained in root according to Keep a Changelog specifications with sections: Added, Changed, Deprecated, Removed, Fixed, Security.`,
    analysis: {
      whatItIs: "The formal documentation framework governing ADRs, inline component comments, README files, and semantic versioning.",
      whyShopifyRecommendsIt: "Comprehensive documentation speeds up onboarding, records technical trade-offs, and prevents accidental regressions.",
      howNcfShouldImplementIt: "Store ADRs in /docs/adr/, enforce standard comment headers on Liquid snippets, and maintain a strict CHANGELOG.md.",
      commonMistakes: "Making significant architectural changes without writing an ADR or failing to document required parameters in component snippets.",
      bestPractices: "Update CHANGELOG.md on every pull request and adhere strictly to Semantic Versioning rules.",
      futureConsiderations: "Automated generation of component documentation from Liquid comment blocks."
    }
  },
  {
    id: "ai-coding-standards",
    number: 10,
    title: "10. NCF AI Coding Standards",
    shortDesc: "Rules for Google AI Studio and AI Coding Agents: minimal changes, no file rewrites, human-readable code, and architecture preservation.",
    content: `NCF is built and maintained in collaboration with AI Coding Agents (such as Google AI Studio and Gemini models). To guarantee codebase safety, predictable outputs, and zero regression, AI agents must adhere to these non-negotiable coding rules:

1. Minimal Scope Discipline
• Smallest Possible Changes: Make surgical, targeted code edits. Never overwrite or re-generate an entire 1,000-line file when modifying a 5-line logic block.
• Modify Only Affected Files: Do not edit, format, or 'touch' unrelated files during feature implementation.
• Zero Unsolicited Features: Build strictly what is requested in the user prompt. Never add unrequested visual tabs, secondary sidebars, or playground UI.

2. Structural & Folder Integrity
• Never Rename Unrelated Files: Preserve existing file names and handle handles exactly as defined.
• Never Move Folders: Respect canonical Shopify directory locations (/sections, /snippets, /assets, /config). Do not invent custom folder paths.
• Preserve Architecture: Adhere strictly to the established BEM CSS conventions, Web Component patterns, and Liquid hygiene guidelines.

3. Code Readability & AI Explanations
• Human-Readable Output: Produce clean, well-indented, self-documenting code with clear variable naming and concise comments.
• Transparent Explanations: Before making changes, state the intended edit in one clear sentence. Explain the root cause of any bug fixes objectively.
• Explicit Guard Rail Compliance: Always verify that generated code passes Shopify Theme Check guidelines without lint warnings or syntax errors.`,
    analysis: {
      whatItIs: "The operational governance rules directing AI coding agents (Google AI Studio) to maintain codebase integrity and prevent AI slop.",
      whyShopifyRecommendsIt: "Enforcing strict AI rules prevents code bloat, eliminates accidental breaking changes, and keeps theme files human-readable.",
      howNcfShouldImplementIt: "Embed these AI coding standards into project constitution files (AGENTS.md / GEMINI.md) and developer guidelines.",
      commonMistakes: "AI agents completely re-writing entire files to change a single style, or introducing unrequested third-party dependencies.",
      bestPractices: "Use targeted surgical edit tools, inspect file contents before editing, and verify builds with Theme Check after every AI turn.",
      futureConsiderations: "Automated AI pull request auditing against NCF constitution rules."
    }
  },
  {
    id: "engineering-principles",
    number: 11,
    title: "11. NCF Engineering Principles",
    shortDesc: "Principles governing Merchant Experience (MX), Customer Experience (CX), Developer Experience (DX), AI Experience (AX), and Business Experience (BX).",
    content: `NCF evaluates all software design decisions across five core stakeholder experience dimensions:

1. Merchant Experience (MX)
• Effortless Setup: Merchants must be able to launch a beautiful store using theme presets in under 15 minutes without touching code.
• Intuitive Theme Editor: Predictable schema labels, logical setting headers, clear inline help text, and real-time live preview hydration.
• Defensive Layouts: Theme layouts must gracefully accommodate long product titles, uncropped images, and missing data without breaking visual alignment.

2. Customer Experience (CX)
• Instant Response Speed: Sub-second page loads, instant cart drawer feedback, smooth 60fps animations, and zero layout shifts.
• Uncompromising Accessibility: WCAG 2.1 AA compliance ensuring all customers can navigate, select variants, and purchase seamlessly regardless of ability.
• Mobile-First Delight: Native touch targets, thumb-friendly navigation, and smooth mobile gallery scrolling via CSS scroll snap.

3. Developer Experience (DX)
• Clean Modular Code: Standardized BEM CSS, ES6 Web Components, and explicit Liquid snippet parameter passing.
• Predictable Tooling: 100% Theme Check compliance, fast local development with Shopify CLI, and clear directory organization.
• Comprehensive Docs: In-code documentation, ADR records, and clear component prop specifications.

4. AI Experience (AX)
• High Context Density: Self-documenting code structures easily parsed and understood by AI coding models.
• Predictable Abstractions: Uniform component templates allowing AI agents to generate new sections reliably without hallucinations.

5. Business Experience (BX)
• Conversion-Engineered Architecture: Built-in sticky add-to-cart bars, quick view drawers, cart upsells, and trust badge integrations.
• Low Total Cost of Ownership: Zero reliance on paid third-party page builders or heavy apps that incur monthly subscription fees and slow down stores.`,
    analysis: {
      whatItIs: "The 5-dimensional engineering philosophy balancing Merchant, Customer, Developer, AI, and Business outcomes.",
      whyShopifyRecommendsIt: "Holistic frameworks succeed commercially because they delight shoppers while remaining easy for merchants and developers to operate.",
      howNcfShouldImplementIt: "Evaluate every feature pull request against MX, CX, DX, AX, and BX criteria before merging.",
      commonMistakes: "Optimizing exclusively for developer preference while creating an overly complex Theme Editor interface for non-technical merchants.",
      bestPractices: "Conduct merchant testing in the Shopify Admin to verify that section settings are clear and easy to configure.",
      futureConsiderations: "Continuous alignment with emerging e-commerce conversion benchmarks and AI-assisted shopping experiences."
    }
  },
  {
    id: "performance-budget",
    number: 12,
    title: "12. NCF Performance Budget",
    shortDesc: "Measurable performance budget limits for CSS, JavaScript, DOM complexity, image loading, web fonts, and HTTP requests.",
    content: `NCF enforces hard performance budget thresholds. Any pull request or feature that exceeds these budgets is automatically blocked until optimized.

1. CSS Size Budget
• Critical Global CSS: Max 15KB gzipped (loaded inline in <head>).
• Per-Section CSS: Max 5KB gzipped per section asset. Total CSS on any single page must not exceed 35KB gzipped.
• Zero Unused CSS: CSS files are loaded conditionally only when their corresponding section exists on the page.

2. JavaScript Size Budget
• Core Theme Shell JS: Max 10KB gzipped (defer loaded).
• Per-Component Web Component JS: Max 4KB gzipped per custom element asset.
• Total Execution Time: JavaScript main-thread execution time must remain under 150ms on mobile throttled hardware.

3. DOM Complexity Budget
• Total DOM Nodes: Max 1,500 nodes per page layout.
• Maximum DOM Depth: Max 32 nested elements.
• Maximum Child Elements: Max 60 child nodes per parent container.

4. Image Loading & Asset Budget
• LCP Image Strategy: Eager load primary hero/product image with fetchpriority="high" and explicit width/height dimensions.
• Off-Screen Images: 100% lazy loading via native loading="lazy" and responsive srcset/sizes attributes generated via Shopify image filters.
• Image Formatting: Always request WebP or AVIF formats via Shopify CDN image_url filters.

5. Web Fonts & Network Requests
• Web Font Limit: Max 2 font families (Heading + Body). Mandatory font-display: swap to prevent FOIT (Flash of Unstyled Text).
• Initial HTTP Requests: Max 25 total initial page requests on index and product pages (including CSS, JS, fonts, and critical images).`,
    analysis: {
      whatItIs: "The quantifiable, strict performance limits governing asset file sizes, execution times, DOM nodes, and HTTP requests.",
      whyShopifyRecommendsIt: "Strict performance budgets ensure store speed remains fast over time even as merchants add content, products, and apps.",
      howNcfShouldImplementIt: "Automate performance budget checks in GitHub CI/CD using Lighthouse CI and bundlesize auditors.",
      commonMistakes: "Allowing global CSS to grow unchecked or failing to specify fetchpriority on LCP hero images.",
      bestPractices: "Audit DOM node count on collection pages with 50+ products and enforce responsive image 'sizes' attributes everywhere.",
      futureConsiderations: "Integration with native browser Speculative Loading APIs for near-instant page navigation."
    }
  },
  {
    id: "security-standards",
    number: 13,
    title: "13. NCF Security Standards",
    shortDesc: "Security best practices for Shopify themes: XSS prevention, Liquid output escaping, content security, and script isolation.",
    content: `While Shopify manages core server infrastructure, theme frontend code must adhere to strict security practices to prevent Cross-Site Scripting (XSS), data leaks, and third-party script vulnerabilities.

1. XSS Prevention & Liquid Output Escaping
• HTML Escaping: All user-generated content, merchant text inputs, or search query parameters rendered in Liquid must be escaped using Liquid filters: {{ search.terms | escape }} or {{ product.title | escape }}.
• JSON Serialization: When passing Liquid objects into inline JavaScript or Web Component attributes, always serialize through the 'json' filter: <variant-selects data-variants="{{ product.variants | json | escape }}">. Never concatenate raw strings inside JavaScript script blocks.

2. Content Security & App Block Isolation
• App Block Containers: Third-party Shopify App Blocks must be mounted inside designated app containers ({{ content_for_header }} and app section blocks) to prevent unauthenticated DOM manipulation.
• External Asset Loading: External script inclusions from unauthorized third-party CDNs are strictly banned. All assets must be served through Shopify's trusted CDN (cdn.shopify.com).

3. Sensitive Data Protection
• Customer Privacy & Consent: Respect Shopify Privacy Banner consent states before initializing analytics or secondary tracking scripts.
• Zero Hardcoded Credentials: API keys, access tokens, or private endpoints must never be hardcoded into theme Liquid, JS, or JSON templates. Use dynamic Shopify environment variables exclusively.`,
    analysis: {
      whatItIs: "The frontend security protocol protecting storefronts from XSS vulnerabilities, script injection, and third-party data breaches.",
      whyShopifyRecommendsIt: "Secure themes safeguard customer data, protect merchant reputation, and pass Shopify Theme Store security audits.",
      howNcfShouldImplementIt: "Mandate Liquid escape filters for all dynamic strings and pass JSON data to Web Components via escaped HTML attributes.",
      commonMistakes: "Injecting raw Liquid string variables directly inside inline <script> tags without using the 'json' filter, creating XSS entry points.",
      bestPractices: "Audit all dynamic Liquid outputs with Theme Check security rules and sanitize HTML input in custom forms.",
      futureConsiderations: "Continuous alignment with Shopify's evolving Content Security Policy (CSP) guidelines."
    }
  },
  {
    id: "review-checklist",
    number: 14,
    title: "14. NCF Gatekeeper Review Checklist",
    shortDesc: "Comprehensive gatekeeper review checklist that every future sprint code submission must pass prior to approval.",
    content: `To maintain enterprise software quality across all development sprints, every code submission (Pull Request) must pass this 20-point Gatekeeper Review Checklist before being approved for release.

1. Code Quality & Linting Checklist:
[ ] 01. 100% Theme Check Pass: Zero errors and zero warnings on 'shopify theme check'.
[ ] 02. No Legacy Tags: Zero instances of legacy {% include %} tags; 100% render tag compliance.
[ ] 03. No Hardcoded Strings: 100% of user-facing text uses Liquid translation filters (i18n).
[ ] 04. BEM CSS Hygiene: All CSS classes follow BEM naming (.block__element--modifier).
[ ] 05. Scope Isolation: Zero global JavaScript variables created on 'window' or 'document'.

2. Performance & Web Vitals Checklist:
[ ] 06. Lighthouse Performance: Mobile score >= 90, Desktop score >= 95.
[ ] 07. LCP Optimization: Primary hero/product image uses fetchpriority="high" and loading="eager".
[ ] 08. CLS Guarantee: All images include explicit aspect-ratio or width/height attributes.
[ ] 09. CSS Asset Budget: Global CSS < 15KB gzipped; section CSS < 5KB gzipped.
[ ] 10. JS Execution Budget: Web Component modules < 4KB gzipped each; main-thread JS < 150ms.

3. Accessibility & UX Checklist:
[ ] 11. WCAG 2.1 AA Compliance: All interactive controls keyboard navigable with visible focus outlines.
[ ] 12. Focus Management: Modal and drawer overlays trap focus when open and restore focus upon closing.
[ ] 13. Screen Reader ARIA: Correct aria-expanded, aria-controls, and aria-live regions on dynamic UI.
[ ] 14. Touch Target Sizes: Minimum 44x44px touch targets on mobile viewports.

4. Theme Editor & Security Checklist:
[ ] 15. Theme Editor Lifecycle Hooks: Web Components listen to 'shopify:section:load' for instant re-hydration.
[ ] 16. Schema Defaults: Every section schema includes complete, beautiful preset defaults.
[ ] 17. Defensive Layouts: Verified layouts with ultra-long titles and tall uncropped images.
[ ] 18. XSS Security: All dynamic Liquid outputs inside HTML and JS attributes are escaped or JSON-serialized.
[ ] 19. Documentation: Component comment header present with parameter specs and example usage.
[ ] 20. SemVer & Changelog: Updated CHANGELOG.md following Semantic Versioning rules.`,
    analysis: {
      whatItIs: "The master 20-point quality assurance gatekeeper protocol required for approving future development sprints.",
      whyShopifyRecommendsIt: "Formal review checklists enforce software discipline, prevent quality decay, and guarantee consistent Theme Store acceptance.",
      howNcfShouldImplementIt: "Automate technical checks in GitHub Actions CI and mandate manual verification for UX/Theme Editor items.",
      commonMistakes: "Merging pull requests without running Theme Check or bypassing accessibility focus testing.",
      bestPractices: "Require sign-off from both the Lead Theme Engineer and Accessibility QA before merging to main.",
      futureConsiderations: "Automating 100% of checklist verification items via automated Playwright E2E tests."
    }
  }
];
