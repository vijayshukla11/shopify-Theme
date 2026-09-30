import { CaseStudy } from '../types/phase8';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'cs-shopify-migration',
    title: 'Enterprise Online Store 2.0 Theme Refactoring & Accessible Component Architecture',
    slug: 'shopify-theme-refactoring-case-study',
    status: 'DEMONSTRATION',
    clientType: 'Consumer Tech Brand Template (Demonstration Project)',
    industry: 'Electronics & Audio',
    overview: 'Demonstrates a full-scale refactoring of an enterprise Shopify theme. Transitions legacy Liquid templates into high-performance Online Store 2.0 JSON sections with WCAG 2.2 AA accessibility compliance.',
    businessProblem: 'Legacy theme suffered from slow page loads, non-compliant contrast ratios, broken mobile drawer navigation, and rigid hardcoded sections that required developer intervention for every promo campaign.',
    constraints: [
      'Zero downtime allowed for active storefront demo.',
      'Must preserve existing URL structure and handle product metafields seamlessly.',
      'Strict adherence to vanilla JavaScript without heavy external framework dependencies.'
    ],
    myRole: 'Lead Shopify Architect & Frontend Engineer',
    solution: 'Engineered a modular theme architecture utilizing custom Web Components, Tailwind CSS token integration, native Shopify OS 2.0 JSON section schemas, and accessible focus management traps.',
    processSteps: [
      { title: 'Architectural Audit', desc: 'Analyzed legacy Liquid files, identified render-blocking JavaScript scripts, and mapped custom page layouts.' },
      { title: 'Component Schema Design', desc: 'Created flexible JSON schemas enabling merchants to toggle banner styles, filter accordions, and product grid layouts.' },
      { title: 'Accessible UI Development', desc: 'Built ARIA-compliant filter drawers, keyboard-navigable slide carousels, and screen-reader-friendly product cards.' },
      { title: 'QA & Speed Benchmark', desc: 'Validated performance on Lighthouse (95+ rating) and verified WCAG 2.2 AA compliance using axe-core tools.' }
    ],
    deliverables: [
      'Complete Online Store 2.0 Shopify Theme Repository',
      'Accessible Mobile Filter Drawer Web Component (`/assets/plp-filters.js`)',
      'Modular JSON Templates for Collection & Product Detail Pages',
      'Merchant Theme Customization Handbook'
    ],
    technologies: ['Shopify Liquid', 'Tailwind CSS', 'Shopify CLI 3.x', 'Vanilla JS', 'WCAG 2.2 AA Guidelines'],
    documentationLinks: [
      { title: 'Sprint 4.1 Filter Sidebar Technical Specification', url: '#doc-sprint4' },
      { title: 'NCF Architectural Blueprint Document', url: '#doc-ncf' }
    ],
    screenshots: [
      { caption: 'Sticky Accordion Desktop Filter Sidebar with Active Facet Counters', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
      { caption: 'Off-Canvas Mobile Filter Drawer with Focus Lock', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80' }
    ],
    reports: [
      { name: 'Lighthouse Speed Performance Audit', type: 'PDF', summary: 'Verified 95+ score on Desktop and 90+ on Mobile.' },
      { name: 'WCAG 2.2 AA Accessibility Audit Log', type: 'Markdown', summary: 'Zero contrast or keyboard trap errors detected.' }
    ],
    lessonsLearned: [
      'Native CSS Container Queries provide significantly smoother responsive filter layouts than media query breakpoints.',
      'Consolidating theme JavaScript into small, focused Web Components prevents global namespace collisions.'
    ],
    serviceIds: ['shopify-theme-dev', 'perf-optimization', 'tech-documentation']
  },
  {
    id: 'cs-catalog-refactor',
    title: 'High-Volume Product Catalog Taxonomy & Metafield Standardization Model',
    slug: 'catalog-taxonomy-metafield-standardization',
    status: 'REAL',
    clientType: 'Multi-Category Retail Catalog Standard',
    industry: 'Retail & Multi-Category',
    overview: 'Structured catalog management model engineered to resolve duplicate SKU entries, normalize product attributes, and deploy clean filter facets across 5,000+ SKU collections.',
    businessProblem: 'Unstructured CSV product uploads caused inconsistent color/size naming (e.g. "S", "Small", "Sm"), missing metafields, broken collection filters, and frequent warehouse shipping errors.',
    constraints: [
      'Must normalize incoming vendor CSV feeds automatically.',
      'Required support for multi-language variant attributes.',
      'Zero loss of existing SEO ranking signals or product handles.'
    ],
    myRole: 'Data Architect & Catalog Operations Specialist',
    solution: 'Designed a standardized taxonomy schema, built automated Python catalog cleaning scripts, and deployed a custom Shopify Metafield dictionary.',
    processSteps: [
      { title: 'Data Audit & Clustering', desc: 'Grouped 5,000+ raw product entries to identify attribute discrepancies and duplicate SKU patterns.' },
      { title: 'Taxonomy Definition', desc: 'Established standardized color swatches, technical specs, and size mapping arrays.' },
      { title: 'Batch Transformation', desc: 'Executed automated transformation scripts to populate Shopify Metafields and clean product handles.' },
      { title: 'Filter Facet Indexing', desc: 'Mapped Metafields to Shopify Search & Discovery app for instant in-facet filtering.' }
    ],
    deliverables: [
      'Product Data Taxonomy Dictionary (.XLSX & JSON)',
      'Automated Python CSV Cleaning & Ingestion Pipeline',
      'Shopify Metafields & Metaobjects Definition Schema',
      'Warehouse Catalog SOP Manual'
    ],
    technologies: ['Shopify Metafields', 'Python Pandas', 'Matrixify', 'Shopify Search & Discovery API'],
    documentationLinks: [
      { title: 'Catalog SOP & Metafield Guide', url: '#sop-catalog' }
    ],
    screenshots: [
      { caption: 'Cleaned Product Taxonomy Mapping Matrix', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' }
    ],
    reports: [
      { name: 'Catalog Cleanliness Verification Report', type: 'JSON', summary: '100% SKU attribute normalization achieved.' }
    ],
    lessonsLearned: [
      'Standardizing product attributes at the source database level prevents endless liquid workarounds on the frontend.',
      'Using native Shopify Metaobjects simplifies merchant maintenance for size charts and color swatches.'
    ],
    serviceIds: ['catalog-mgmt', 'inventory-purchase-ops', 'ecommerce-operations']
  },
  {
    id: 'cs-analytics-dashboard',
    title: 'Executive E-commerce Intelligence Dashboard & GA4 Tracking Specification',
    slug: 'ecommerce-analytics-executive-dashboard',
    status: 'DEMONSTRATION',
    clientType: 'E-commerce Business Analytics Demonstration',
    industry: 'Multi-Industry Analytics',
    overview: 'Custom analytics framework and interactive dashboard connecting real-time sales performance, inventory turnover, customer acquisition costs, and conversion rate telemetry.',
    businessProblem: 'Executive leadership lacked visibility into true product profitability due to fragmented data scattered across Shopify, Google Analytics 4, Meta Ads, and warehouse spreadsheets.',
    constraints: [
      'Must maintain strict privacy compliance (GDPR / CCPA).',
      'Data must refresh automatically without manual CSV uploads.',
      'Dashboard layout must be clear for non-technical leadership.'
    ],
    myRole: 'Analytics Architect & BI Dashboard Engineer',
    solution: 'Designed a unified GA4 data layer event specification and engineered an interactive Looker Studio & Recharts dashboard with automated metric reconciliation.',
    processSteps: [
      { title: 'KPI Requirements Mapping', desc: 'Identified essential metrics: Contribution Margin, CAC:LTV ratio, Net AOV, and Stock Turn Rate.' },
      { title: 'GA4 Datalayer Deployment', desc: 'Implemented enhanced e-commerce event tracking (`view_item`, `add_to_cart`, `purchase`) on Shopify.' },
      { title: 'Data Warehouse Integration', desc: 'Connected Shopify Analytics API to BigQuery and built Looker Studio visualization pipelines.' },
      { title: 'Reconciliation Audit', desc: 'Verified data accuracy by cross-referencing dashboard numbers against bank and warehouse ledgers.' }
    ],
    deliverables: [
      'Interactive Executive E-commerce KPI Dashboard',
      'Google Analytics 4 Enhanced E-commerce Data Layer Specification',
      'Automated Weekly Executive Performance Report',
      'Analytics Setup & Maintenance SOP'
    ],
    technologies: ['Google Analytics 4', 'Looker Studio', 'BigQuery', 'React / Recharts', 'Shopify Admin API'],
    documentationLinks: [
      { title: 'GA4 Implementation SOP', url: '#sop-ga4' }
    ],
    screenshots: [
      { caption: 'Real-time Executive E-commerce Performance Dashboard', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80' }
    ],
    reports: [
      { name: 'Analytics Accuracy Audit Log', type: 'PDF', summary: '99.8% tracking match rate with raw transaction logs.' }
    ],
    lessonsLearned: [
      'Server-side GTM event tracking eliminates browser ad-blocker discrepancies for accurate revenue reporting.',
      'Focusing dashboards on actionable metrics prevents executive information overload.'
    ],
    serviceIds: ['analytics-dashboards', 'process-automation']
  },
  {
    id: 'cs-speed-optimization',
    title: 'Core Web Vitals Remediation & Sub-Second Mobile PageSpeed Engineering',
    slug: 'core-web-vitals-speed-optimization',
    status: 'TEMPLATE',
    clientType: 'Reusable Speed Engineering Framework (Template)',
    industry: 'General Ecommerce',
    overview: 'A step-by-step performance optimization framework designed to achieve 90+ Mobile PageSpeed Insights scores and pass all Google Core Web Vitals assessments.',
    businessProblem: 'Heavy third-party tracking apps and unoptimized 4K hero images caused 4.2s First Contentful Paint (FCP) and significant Cumulative Layout Shift (CLS) on mobile devices.',
    constraints: [
      'Cannot remove necessary marketing apps (Klaviyo, Gorgias, Google Tag Manager).',
      'Must maintain high-resolution product photography.',
      'No disruption to live tracking or checkout flows.'
    ],
    myRole: 'Performance Optimization Engineer',
    solution: 'Implemented critical CSS inline rendering, deferred non-essential app scripts, introduced native responsive webp/avif image sets, and refactored font loading strategies.',
    processSteps: [
      { title: 'Performance Profiling', desc: 'Used Chrome DevTools Performance panel and WebPageTest to isolate main-thread blocking scripts.' },
      { title: 'Asset Optimization', desc: 'Converted images to modern WebP/AVIF formats with exact width-constrained `srcset` arrays.' },
      { title: 'Script Management', desc: 'Engineered an asynchronous script loader that defers third-party apps until after initial user interaction.' },
      { title: 'Layout Stabilization', desc: 'Set explicit aspect-ratio constraints on media containers to eradicate CLS.' }
    ],
    deliverables: [
      'Speed Audit & Remediation Codebase Updates',
      'Third-Party Script Management Web Component',
      'Core Web Vitals Monitoring SOP',
      'Before / After Benchmark Verification Matrix'
    ],
    technologies: ['Chrome DevTools', 'Lighthouse', 'WebPageTest', 'Shopify CDN', 'Native WebP/AVIF'],
    documentationLinks: [
      { title: 'Speed Optimization SOP', url: '#sop-speed' }
    ],
    screenshots: [
      { caption: 'Lighthouse Performance Score Benchmark Audit', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80' }
    ],
    reports: [
      { name: 'Core Web Vitals Pass Certificate', type: 'PDF', summary: 'Achieved LCP < 1.8s, CLS < 0.02, and INP < 100ms.' }
    ],
    lessonsLearned: [
      'Deferring non-critical chat and analytics widgets by 2 seconds dramatically improves main-thread responsiveness on mid-tier mobile phones.'
    ],
    serviceIds: ['perf-optimization', 'website-maintenance', 'shopify-theme-dev']
  }
];
