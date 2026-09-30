import { ServiceItem } from '../types/phase8';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'shopify-store-mgmt',
    title: 'Shopify Store Management',
    category: 'Shopify Engineering',
    shortDesc: 'End-to-end operational, technical, and catalog management for high-volume Shopify & Shopify Plus stores.',
    overview: 'Complete day-to-day administrative and technical stewardship of your Shopify store. Handles settings, navigation schema, domain configuration, staff roles, app ecosystem auditing, and payment gateway health.',
    status: 'REAL',
    problemsSolved: [
      'Eliminates store operational bottlenecks and administrative errors.',
      'Prevents app conflicts and theme crashes during peak promotion periods.',
      'Ensures compliance with Shopify Plus standards and security protocols.'
    ],
    deliverables: [
      'Monthly Store Health & App Audit Report',
      'Staff Role & Permission Governance Matrix',
      'Checkout & Payment Gateway Maintenance Log',
      'Custom Navigation & Menu Architecture Blueprints'
    ],
    processSteps: [
      'Audit existing Shopify store settings, apps, and theme configurations.',
      'Establish staging environment and version-controlled GitHub workflows.',
      'Implement structured operational SOPs for store updates and deployments.',
      'Monitor store status, error logs, and speed metrics continuously.'
    ],
    technologies: ['Shopify Plus Admin', 'Shopify Flow', 'Shopify CLI 3.x', 'Liquid', 'JSON Templates'],
    relatedCaseStudyIds: ['cs-shopify-migration', 'cs-catalog-refactor'],
    evidenceLinks: [
      { label: 'Shopify Admin SOP Blueprint', url: '#sop-admin', type: 'sop' },
      { label: 'Store Maintenance Audit Checklist', url: '#doc-audit', type: 'doc' }
    ],
    estimatedTimeline: 'Ongoing Monthly Retainer or 2-4 Week Setup',
    pricingModel: 'Monthly Retainer / Hourly Project Rate'
  },
  {
    id: 'shopify-theme-dev',
    title: 'Shopify Theme Development',
    category: 'Shopify Engineering',
    shortDesc: 'Bespoke, Liquid-native, Online Store 2.0 theme engineering built for WCAG 2.2 AA accessibility and ultra-fast page speed.',
    overview: 'Custom Shopify Online Store 2.0 theme architecture using Liquid, Tailwind CSS, JavaScript Web Components, and modular JSON schemas. Engineered for high conversion and effortless merchant customizability.',
    status: 'REAL',
    problemsSolved: [
      'Replaces slow, bloated off-the-shelf themes with lean custom code.',
      'Solves mobile layout bugs and accessibility compliance failures.',
      'Enables non-technical marketing teams to build dynamic pages via Theme Editor.'
    ],
    deliverables: [
      'Custom Online Store 2.0 Shopify Theme Repository',
      'Configurable JSON Sections & Dynamic Blocks',
      'Tailwind CSS & Mobile-First Component Library',
      'Lighthouse 90+ Speed Optimization Guarantee'
    ],
    processSteps: [
      'Requirement gathering & Liquid component architecture design.',
      'Development of accessible HTML5/Liquid markup & Tailwind styling.',
      'Integration of native Shopify App blocks & JSON schema settings.',
      'Cross-browser, multi-device, and screen-reader accessibility QA.'
    ],
    technologies: ['Liquid', 'Shopify CLI 3.x', 'Tailwind CSS', 'Vanilla JS Web Components', 'Git'],
    relatedCaseStudyIds: ['cs-shopify-migration', 'cs-speed-optimization'],
    evidenceLinks: [
      { label: 'Nova Commerce Framework Repository', url: '#code-ncf', type: 'code' },
      { label: 'Liquid Section Schema Standard', url: '#doc-liquid', type: 'doc' }
    ],
    estimatedTimeline: '4 to 8 Weeks per Full Theme Build',
    pricingModel: 'Fixed Project Scope'
  },
  {
    id: 'ecommerce-operations',
    title: 'Ecommerce Operations',
    category: 'Operations & Catalog',
    shortDesc: 'Streamlining end-to-end fulfillment workflows, order processing, customer support ticketing, and operational SLAs.',
    overview: 'Comprehensive operational architecture for modern ecommerce businesses. Standardizes order fulfillment pipelines, return workflows, customer service escalation rules, and logistics team communication.',
    status: 'DEMONSTRATION',
    problemsSolved: [
      'Reduces order fulfillment turnaround times and shipping errors.',
      'Eliminates manual customer service tracking and duplicate ticket handling.',
      'Establishes clear operational SLAs for warehouse and customer care teams.'
    ],
    deliverables: [
      'End-to-End Fulfillment & Return Workflow Diagram',
      'Warehouse Standard Operating Procedures (SOPs)',
      'Customer Support Escalation & Response Matrix',
      'Order SLA Monitoring Dashboard Template'
    ],
    processSteps: [
      'Map current order-to-delivery lifecycle and identify friction points.',
      'Standardize warehouse picking, packing, and carrier integration rules.',
      'Implement automated customer status updates and self-service return portals.',
      'Establish KPI tracking for Order Cycle Time and On-Time Delivery.'
    ],
    technologies: ['Shopify Order API', 'ShipStation', 'Gorgias / Zendesk', 'Excel / Sheets Automation'],
    relatedCaseStudyIds: ['cs-catalog-refactor'],
    evidenceLinks: [
      { label: 'Fulfillment SOP Template', url: '#sop-fulfillment', type: 'sop' },
      { label: 'Operations SLA Dashboard', url: '#dash-ops', type: 'dashboard' }
    ],
    estimatedTimeline: '2 to 6 Weeks',
    pricingModel: 'Project Scope or Advisory Retainer'
  },
  {
    id: 'catalog-mgmt',
    title: 'Product Listing & Catalog Management',
    category: 'Operations & Catalog',
    shortDesc: 'Structured product data taxonomy, variant architecture, metafield customization, and bulk catalog migrations.',
    overview: 'Enterprise-grade catalog architecture. Standardizes variant structures, product tags, custom metafields/metaobjects, SEO descriptions, inventory SKUs, and multi-channel synchronization.',
    status: 'REAL',
    problemsSolved: [
      'Fixes messy product categorization and inconsistent search filters.',
      'Eliminates stockout errors caused by duplicate SKU entries.',
      'Enables rich product specification tables via native Metafields.'
    ],
    deliverables: [
      'Normalized Product Data Taxonomy & Attribute Schema',
      'Custom Shopify Metafield & Metaobject Definition Library',
      'CSV / Matrix Ingestion & Validation Script',
      'Collection Hierarchy & Search Filter Configuration'
    ],
    processSteps: [
      'Audit existing catalog data for missing attributes and SKU duplicates.',
      'Design structured taxonomy schema and Shopify Metafields.',
      'Execute bulk transformation & cleaning scripts on raw product datasets.',
      'Import, validate, and index products across collections and search.'
    ],
    technologies: ['Shopify Metafields', 'Metaobjects', 'Matrixify / CSV', 'Python / Node.js Data Cleaning'],
    relatedCaseStudyIds: ['cs-catalog-refactor'],
    evidenceLinks: [
      { label: 'Catalog Metafield Specification Sheet', url: '#doc-metafields', type: 'doc' },
      { label: 'Bulk Import Validation SOP', url: '#sop-import', type: 'sop' }
    ],
    estimatedTimeline: '1 to 4 Weeks',
    pricingModel: 'Fixed Price per Catalog Size'
  },
  {
    id: 'inventory-purchase-ops',
    title: 'Inventory & Purchase Operations',
    category: 'Operations & Catalog',
    shortDesc: 'Reorder point modeling, stock ledger auditing, vendor purchase orders, and multi-location inventory sync.',
    overview: 'Data-driven inventory management and procurement framework. Prevents stockouts and overstock costs by establishing automated safety stock thresholds, purchase order workflows, and supplier lead-time tracking.',
    status: 'TEMPLATE',
    problemsSolved: [
      'Prevents loss of revenue from unpredicted product stockouts.',
      'Eliminates capital tied up in slow-moving inventory items.',
      'Replaces manual spreadsheet PO generation with structured automation.'
    ],
    deliverables: [
      'Dynamic Safety Stock & Reorder Calculation Model',
      'Multi-Location Inventory Allocation Matrix',
      'Supplier Lead-Time & PO Tracking Template',
      'Stock Valuation & Turn Rate Report'
    ],
    processSteps: [
      'Analyze historical sales velocity and supplier lead times.',
      'Define minimum reorder points and economic order quantities (EOQ).',
      'Configure multi-location stock synchronization rules in Shopify.',
      'Train team on PO creation, receiving audits, and inventory adjustments.'
    ],
    technologies: ['Shopify Stock API', 'Inventory Planner', 'Google Sheets / Excel VBA', 'Python Data Models'],
    relatedCaseStudyIds: ['cs-catalog-refactor'],
    evidenceLinks: [
      { label: 'Reorder Point Calculation Template', url: '#doc-inventory', type: 'doc' }
    ],
    estimatedTimeline: '2 to 4 Weeks',
    pricingModel: 'Fixed Project Scope'
  },
  {
    id: 'marketplace-mgmt',
    title: 'Marketplace Management',
    category: 'Operations & Catalog',
    shortDesc: 'Multi-channel product syndication, listing synchronization, and inventory mapping across Amazon, eBay, and Google Shopping.',
    overview: 'Multi-channel commerce expansion framework. Connects your primary Shopify store catalog to third-party marketplaces, keeping pricing, stock levels, order routing, and feed compliance perfectly synced.',
    status: 'PLACEHOLDER',
    problemsSolved: [
      'Eliminates overselling across multiple marketplace sales channels.',
      'Resolves Google Shopping feed policy warnings and product disapprovals.',
      'Automates marketplace order ingestion directly into Shopify fulfillment pipelines.'
    ],
    deliverables: [
      'Multi-Channel Product Feed Channel Architecture',
      'Google Merchant Center Feed Compliance Audit',
      'Marketplace Inventory Allocation Ruleset',
      'Order Sync & Error Alerting System'
    ],
    processSteps: [
      'Audit existing marketplace listings and feed diagnostic errors.',
      'Configure Shopify Channel integrations or feed management apps.',
      'Map channel categories, product attributes, and tax rules.',
      'Perform test order cycle from marketplace through fulfillment to tracking delivery.'
    ],
    technologies: ['Google Merchant Center', 'Amazon Seller Central', 'Feedonomics', 'Shopify Channels API'],
    relatedCaseStudyIds: [],
    evidenceLinks: [],
    estimatedTimeline: '2 to 5 Weeks',
    pricingModel: 'Project Scope or Retainer'
  },
  {
    id: 'analytics-dashboards',
    title: 'Analytics & Dashboard Development',
    category: 'Analytics & Automation',
    shortDesc: 'Custom business intelligence dashboards, real-time KPI tracking, cohort analysis, and executive reports.',
    overview: 'Transform raw e-commerce metrics into actionable executive decision-making tools. Builds tailored dashboards covering Net Profit, LTV, CAC, AOV, Conversion Rate, Inventory Turnover, and Return Rates.',
    status: 'REAL',
    problemsSolved: [
      'Consolidates fragmented data from Shopify, Ads, GA4, and ERPs into one view.',
      'Eliminates weekly manual report compiling for executive teams.',
      'Provides immediate visual alerts for drop-offs in conversion rate or sales.'
    ],
    deliverables: [
      'Interactive Executive E-commerce KPI Dashboard',
      'GA4 E-commerce Event Tracking Specification',
      'Product Profitability & Contribution Margin Matrix',
      'Weekly / Monthly Automated Email Performance Summary'
    ],
    processSteps: [
      'Identify core business KPIs and executive reporting requirements.',
      'Configure GA4 custom events, datalayers, and UTM tracking parameters.',
      'Build connected dashboards using Google Looker Studio, Recharts, or PowerBI.',
      'Validate metrics against raw database ledgers to ensure 100% accuracy.'
    ],
    technologies: ['Google Analytics 4', 'Looker Studio', 'Recharts / React', 'Google BigQuery', 'Shopify Analytics API'],
    relatedCaseStudyIds: ['cs-analytics-dashboard'],
    evidenceLinks: [
      { label: 'E-commerce Analytics Report Model', url: '#dash-analytics', type: 'dashboard' },
      { label: 'GA4 Data Layer Implementation SOP', url: '#sop-ga4', type: 'sop' }
    ],
    estimatedTimeline: '2 to 4 Weeks',
    pricingModel: 'Fixed Project Scope'
  },
  {
    id: 'process-automation',
    title: 'Business Process Automation',
    category: 'Analytics & Automation',
    shortDesc: 'Automating repetitive operational workflows, tag assignments, order fraud checks, and webhook integrations.',
    overview: 'No-code and custom API automation for e-commerce workflows. Connects Shopify with ERPs, CRMs, email tools, and Slack to handle high-risk order holds, automated reorders, and customer tier tagging.',
    status: 'DEMONSTRATION',
    problemsSolved: [
      'Saves dozens of hours per week of manual data copy-pasting.',
      'Prevents fulfillment of fraudulent or address-error orders.',
      'Instantly alerts internal teams via Slack when high-value VIP orders arrive.'
    ],
    deliverables: [
      'Shopify Flow & Make/Zapier Workflow Blueprints',
      'Automated Order Fraud & Address Verification Matrix',
      'Customer VIP & Risk Tagging Rule Engine',
      'Custom Webhook Middleware Service'
    ],
    processSteps: [
      'Map repetitive manual business processes and data movement.',
      'Design trigger-condition-action workflow diagrams.',
      'Build and test automations in Shopify Flow or custom Node.js webhooks.',
      'Deploy error monitoring and fallback notification channels.'
    ],
    technologies: ['Shopify Flow', 'Make (Integromat)', 'Zapier', 'Node.js Express Webhooks', 'Slack Webhooks'],
    relatedCaseStudyIds: ['cs-process-automation'],
    evidenceLinks: [
      { label: 'Shopify Flow Automation SOP', url: '#sop-flow', type: 'sop' }
    ],
    estimatedTimeline: '1 to 3 Weeks',
    pricingModel: 'Fixed Scope per Automation Set'
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance & Technical Care',
    category: 'Optimization & Maintenance',
    shortDesc: 'Proactive theme updates, security patches, app compatibility checks, and emergency troubleshooting.',
    overview: 'Ongoing technical peace of mind for your e-commerce storefront. Guarantees rapid response time for site outages, broken checkout flows, third-party app updates, and Liquid code bug fixes.',
    status: 'REAL',
    problemsSolved: [
      'Prevents unexpected store downtime or checkout failures.',
      'Ensures third-party app updates don\'t break theme formatting.',
      'Provides dedicated technical support whenever issues arise.'
    ],
    deliverables: [
      '24/7 Technical Incident Response SLA (Sub-2 Hour SLA)',
      'Monthly Theme Code Security & Speed Optimization Audit',
      'Staging Environment Sync & Compatibility Testing',
      'Dedicated Task Tracker & Weekly Update Meetings'
    ],
    processSteps: [
      'Perform initial code, security, and app health baseline audit.',
      'Set up GitHub theme repository sync and automated backup routines.',
      'Provide dedicated ticketing portal for client requests and urgent bugs.',
      'Deliver monthly technical report highlighting resolved items and store health.'
    ],
    technologies: ['Git Version Control', 'Shopify Theme Inspector', 'Uptime Monitoring', 'Theme Check'],
    relatedCaseStudyIds: ['cs-speed-optimization'],
    evidenceLinks: [
      { label: 'SLA Support Agreement Template', url: '#doc-sla', type: 'doc' }
    ],
    estimatedTimeline: 'Ongoing Monthly Support SLA',
    pricingModel: 'Monthly Retainer Tier'
  },
  {
    id: 'perf-optimization',
    title: 'Performance & Speed Optimization',
    category: 'Optimization & Maintenance',
    shortDesc: 'Mobile PageSpeed optimization, Core Web Vitals remediation, image compression, and JavaScript pruning.',
    overview: 'Data-backed speed engineering to maximize Lighthouse scores and conversion rate. Eliminates unneeded JavaScript bundles, defers non-critical apps, optimizes image assets, and tunes critical CSS rendering path.',
    status: 'REAL',
    problemsSolved: [
      'Fixes slow mobile load times that lower conversion rates and ad ROI.',
      'Eliminates cumulative layout shifts (CLS) and blocking render bottlenecks.',
      'Achieves 90+ Lighthouse Mobile Performance scores on Shopify.'
    ],
    deliverables: [
      'Core Web Vitals Remediation Action Report',
      'Lazy-Loading & Responsive Image Engine Implementation',
      'Third-Party Script Manager & Deferral Architecture',
      'Before/After Lighthouse Speed Benchmark Verification'
    ],
    processSteps: [
      'Audit page speed performance using Chrome DevTools & WebPageTest.',
      'Identify heavy app scripts, uncompressed images, and render-blocking CSS.',
      'Refactor image tags with native srcset and loading="lazy" attributes.',
      'Defer non-essential app scripts and optimize critical inline stylesheets.'
    ],
    technologies: ['Chrome DevTools', 'Lighthouse', 'WebPageTest', 'Preload/Prefetch APIs', 'Shopify CDN'],
    relatedCaseStudyIds: ['cs-speed-optimization'],
    evidenceLinks: [
      { label: 'Speed Audit Benchmark Report', url: '#report-speed', type: 'report' },
      { label: 'Core Web Vitals SOP', url: '#sop-speed', type: 'sop' }
    ],
    estimatedTimeline: '1 to 2 Weeks',
    pricingModel: 'Fixed Speed Guarantee'
  },
  {
    id: 'tech-documentation',
    title: 'Technical Documentation & SOP Creation',
    category: 'Optimization & Maintenance',
    shortDesc: 'Authoring developer handbooks, merchant user guides, API specifications, and operational SOP libraries.',
    overview: 'Comprehensive technical writing and knowledge base construction. Converts complex store setups into clear, step-by-step operating manuals, team onboarding guides, and architecture documentation.',
    status: 'REAL',
    problemsSolved: [
      'Eliminates single-point-of-failure reliance on external developers.',
      'Drastically reduces onboarding time for new store managers and staff.',
      'Provides permanent architectural records for custom Liquid code and apps.'
    ],
    deliverables: [
      'Custom Store Developer Architecture Handbook',
      'Merchant Theme Customization & Editor Guide',
      'Operational SOP Library (Fulfillment, Inventory, Catalog)',
      'Interactive Searchable Knowledge Base Platform'
    ],
    processSteps: [
      'Interview store stakeholders and review codebase architecture.',
      'Draft step-by-step technical documentation with screenshots and diagrams.',
      'Organize documentation into structured markdown or web knowledge base.',
      'Review with client team and conduct walk-through training session.'
    ],
    technologies: ['Markdown / MDX', 'VitePress', 'Figma Diagrams', 'GitBook / Notion'],
    relatedCaseStudyIds: ['cs-shopify-migration'],
    evidenceLinks: [
      { label: 'NCF Technical Documentation Platform', url: '#doc-platform', type: 'doc' },
      { label: 'Merchant Theme User Guide Sample', url: '#doc-guide', type: 'doc' }
    ],
    estimatedTimeline: '1 to 3 Weeks',
    pricingModel: 'Fixed Documentation Scope'
  }
];
