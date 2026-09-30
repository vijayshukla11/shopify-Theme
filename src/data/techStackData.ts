import { TechItem } from '../types/phase8';

export const TECH_STACK_DATA: TechItem[] = [
  // Shopify
  {
    id: 'tech-liquid',
    name: 'Shopify Liquid',
    category: 'Shopify',
    status: 'REAL',
    iconName: 'Code',
    description: 'Core template language for Shopify Online Store 2.0. Expert in writing efficient filters, dynamic tags, render snippets, section settings schemas, and product metafield loops.',
    experienceLevel: 'Expert',
    yearsExperience: '6+ Years',
    keyFeatures: ['Online Store 2.0 JSON Templates', 'Metafields & Metaobjects', 'Section Settings Schema', 'Performance Filter Loops'],
    relatedServices: ['Shopify Theme Development', 'Shopify Store Management', 'Website Maintenance'],
    relatedProjectNames: ['Nova Commerce Framework Theme', 'Consumer Tech Store Refactor']
  },
  {
    id: 'tech-shopify-cli',
    name: 'Shopify CLI 3.x',
    category: 'Shopify',
    status: 'REAL',
    iconName: 'Terminal',
    description: 'Modern command-line interface for local theme development, live hot-reloading theme previews, app block development, and automated theme check linting.',
    experienceLevel: 'Expert',
    yearsExperience: '4+ Years',
    keyFeatures: ['Theme Pull & Push Workflows', 'Theme Check Static Code Analysis', 'Local Staging Server', 'GitHub Action Deployment Integration'],
    relatedServices: ['Shopify Theme Development', 'Shopify Store Management'],
    relatedProjectNames: ['NCF Shopify Theme Architecture']
  },
  {
    id: 'tech-shopify-flow',
    name: 'Shopify Flow',
    category: 'Shopify',
    status: 'REAL',
    iconName: 'Zap',
    description: 'E-commerce workflow automation engine. Custom triggers and actions for high-risk order holds, customer VIP tagging, reorder notifications, and Slack alerts.',
    experienceLevel: 'Expert',
    yearsExperience: '4+ Years',
    keyFeatures: ['Fraud Risk Automation', 'VIP Customer Tagging', 'Inventory Out-of-Stock Holds', 'Slack Webhook Alerts'],
    relatedServices: ['Business Process Automation', 'Shopify Store Management'],
    relatedProjectNames: ['Automated Fraud Hold Pipeline']
  },

  // Frontend
  {
    id: 'tech-react',
    name: 'React 19 & TypeScript',
    category: 'Frontend',
    status: 'REAL',
    iconName: 'Code2',
    description: 'Building robust, interactive client single-page apps, administrative dashboards, and dynamic UI tools with strict type safety.',
    experienceLevel: 'Expert',
    yearsExperience: '5+ Years',
    keyFeatures: ['Functional Custom Hooks', 'Type-Safe Interfaces', 'State Management & Context API', 'Virtual DOM Optimization'],
    relatedServices: ['Analytics & Dashboard Development', 'Shopify Theme Development'],
    relatedProjectNames: ['Executive Analytics Dashboard', 'NCF Portfolio Web App']
  },
  {
    id: 'tech-tailwind',
    name: 'Tailwind CSS v4',
    category: 'Frontend',
    status: 'REAL',
    iconName: 'Palette',
    description: 'Utility-first CSS framework for rapid, highly customized visual styling without bloated stylesheet files. Native support for dark mode and mobile-first design.',
    experienceLevel: 'Expert',
    yearsExperience: '5+ Years',
    keyFeatures: ['Custom Token System', 'Mobile-First Responsive Grid', 'Container Queries', 'Zero-Runtime Build Output'],
    relatedServices: ['Shopify Theme Development', 'Performance Optimization'],
    relatedProjectNames: ['Nova Commerce Framework UI System']
  },
  {
    id: 'tech-vanilla-js',
    name: 'Vanilla JS & Web Components',
    category: 'Frontend',
    status: 'REAL',
    iconName: 'Cpu',
    description: 'Lightweight JavaScript Web Components (`customElements`) for accessible, high-speed Shopify theme interactions without heavy external dependencies.',
    experienceLevel: 'Expert',
    yearsExperience: '6+ Years',
    keyFeatures: ['Custom Elements API', 'Accessible Focus Lock', 'DOM Mutation Observer', 'Sub-10KB JS Footprint'],
    relatedServices: ['Shopify Theme Development', 'Performance Optimization'],
    relatedProjectNames: ['Mobile Filter Drawer Component', 'Interactive Image Carousel']
  },

  // Backend
  {
    id: 'tech-nodejs',
    name: 'Node.js & Express',
    category: 'Backend',
    status: 'REAL',
    iconName: 'Server',
    description: 'Server-side API proxying, webhook receiver endpoints, automated data transformation scripts, and lightweight microservices.',
    experienceLevel: 'Advanced',
    yearsExperience: '4+ Years',
    keyFeatures: ['REST & GraphQL Endpoints', 'Express Middleware Pipelines', 'Secure Secret Key Proxying', 'Async Batch Processing'],
    relatedServices: ['Business Process Automation', 'Analytics & Dashboard Development'],
    relatedProjectNames: ['Catalog Transformation Service', 'Webhook Relay API']
  },
  {
    id: 'tech-python',
    name: 'Python (Pandas / Data Pipeline)',
    category: 'Backend',
    status: 'DEMONSTRATION',
    iconName: 'FileSpreadsheet',
    description: 'Data transformation scripts, catalog normalization, automated CSV validation, and machine learning data prep.',
    experienceLevel: 'Proficient',
    yearsExperience: '3+ Years',
    keyFeatures: ['Pandas DataFrames', 'CSV Batch Cleaning', 'RegEx Pattern Extraction', 'Automated JSON Export'],
    relatedServices: ['Product Listing & Catalog Management', 'Inventory & Purchase Operations'],
    relatedProjectNames: ['5,000 SKU Catalog Standardization Script']
  },

  // CMS
  {
    id: 'tech-shopify-cms',
    name: 'Shopify OS 2.0 Sections & Blocks',
    category: 'CMS',
    status: 'REAL',
    iconName: 'Layout',
    description: 'Configurable merchant CMS architecture utilizing dynamic section settings, nested block types, rich-text inputs, and media pickers.',
    experienceLevel: 'Expert',
    yearsExperience: '5+ Years',
    keyFeatures: ['Merchant Theme Editor', 'Dynamic App Blocks', 'JSON Schema Settings', 'Preset Section Templates'],
    relatedServices: ['Shopify Theme Development', 'Technical Documentation'],
    relatedProjectNames: ['Collection Product Grid Section', 'Hero Banner Showcase']
  },

  // Analytics
  {
    id: 'tech-ga4',
    name: 'Google Analytics 4 & GTM',
    category: 'Analytics',
    status: 'REAL',
    iconName: 'BarChart3',
    description: 'E-commerce event measurement, Google Tag Manager data layer integration, custom dimensions, and user behavior funnel analysis.',
    experienceLevel: 'Expert',
    yearsExperience: '5+ Years',
    keyFeatures: ['Enhanced E-commerce Events', 'Custom Data Layers', 'GTM Trigger Conditions', 'Conversion Goal Mapping'],
    relatedServices: ['Analytics & Dashboard Development', 'Performance Optimization'],
    relatedProjectNames: ['GA4 E-commerce Event Specification']
  },
  {
    id: 'tech-looker',
    name: 'Google Looker Studio',
    category: 'Analytics',
    status: 'REAL',
    iconName: 'PieChart',
    description: 'Interactive business intelligence reporting. Connecting Shopify, Google Ads, GA4, and BigQuery data sources into executive views.',
    experienceLevel: 'Advanced',
    yearsExperience: '4+ Years',
    keyFeatures: ['Cross-Channel Blended Data', 'Interactive Filters & Date Pickers', 'Automated Email PDF Delivery', 'Custom Calculated Fields'],
    relatedServices: ['Analytics & Dashboard Development', 'Ecommerce Operations'],
    relatedProjectNames: ['Executive E-commerce KPI Dashboard']
  },

  // Databases
  {
    id: 'tech-sqlite-postgres',
    name: 'PostgreSQL / Cloud SQL / SQLite',
    category: 'Databases',
    status: 'DEMONSTRATION',
    iconName: 'Database',
    description: 'Relational data modeling, SQL queries, index optimization, and local persistence for web applications.',
    experienceLevel: 'Proficient',
    yearsExperience: '3+ Years',
    keyFeatures: ['Relational Schema Design', 'Complex SQL Queries', 'Index Performance Tuning', 'ORM Integration'],
    relatedServices: ['Analytics & Dashboard Development', 'Business Process Automation'],
    relatedProjectNames: ['Local Order Ledger Database']
  },

  // Automation
  {
    id: 'tech-make-zapier',
    name: 'Make (Integromat) & Zapier',
    category: 'Automation',
    status: 'REAL',
    iconName: 'Workflow',
    description: 'No-code integration platforms for stitching together Shopify, Google Sheets, Slack, AirTable, and email marketing providers.',
    experienceLevel: 'Expert',
    yearsExperience: '4+ Years',
    keyFeatures: ['Multi-Step Scenarios', 'JSON Parsing & Data Mapping', 'Error Handling & Retries', 'Webhook Triggers'],
    relatedServices: ['Business Process Automation', 'Ecommerce Operations'],
    relatedProjectNames: ['Multi-Channel Inventory Sync Workflow']
  },

  // Cloud & Infrastructure
  {
    id: 'tech-cloud-run',
    name: 'Google Cloud Run / GCP',
    category: 'Cloud',
    status: 'REAL',
    iconName: 'Cloud',
    description: 'Serverless container deployment for Node.js apps, reverse proxy routing, and scalable web application hosting.',
    experienceLevel: 'Advanced',
    yearsExperience: '3+ Years',
    keyFeatures: ['Docker Containerization', 'Serverless Auto-Scaling', 'HTTPS Edge Routing', 'Environment Variable Security'],
    relatedServices: ['Analytics & Dashboard Development', 'Website Maintenance'],
    relatedProjectNames: ['NCF Application Hosting Environment']
  },

  // Version Control
  {
    id: 'tech-git-github',
    name: 'Git & GitHub Actions',
    category: 'Version Control',
    status: 'REAL',
    iconName: 'GitBranch',
    description: 'Version control discipline, feature branch strategy, automated theme deployment CI/CD pipelines, and GPG signed commits.',
    experienceLevel: 'Expert',
    yearsExperience: '6+ Years',
    keyFeatures: ['Branch Protection Rules', 'Shopify Theme Sync Actions', 'Pull Request Review Workflows', 'Commit History Transparency'],
    relatedServices: ['Shopify Theme Development', 'Website Maintenance', 'Technical Documentation'],
    relatedProjectNames: ['NCF Theme GitHub Repository']
  },

  // AI Tools
  {
    id: 'tech-gemini-ai',
    name: 'Google Gemini 2.5 / 1.5 API',
    category: 'AI Tools',
    status: 'REAL',
    iconName: 'Sparkles',
    description: 'Integrating generative AI for automated product description generation, SEO metadata drafting, customer support classification, and code linting.',
    experienceLevel: 'Advanced',
    yearsExperience: '2+ Years',
    keyFeatures: ['Structured JSON Output', 'Prompt Engineering', 'Product Meta Description Drafting', 'Automated Code Review'],
    relatedServices: ['Business Process Automation', 'Product Listing & Catalog Management'],
    relatedProjectNames: ['AI Catalog Description Generator']
  }
];
