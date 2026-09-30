import { FAQItem } from '../types/phase8';

export const FAQ_DATA: FAQItem[] = [
  // Services
  {
    id: 'faq-srv-1',
    category: 'Services',
    status: 'REAL',
    question: 'What types of Shopify projects do you specialize in?',
    answer: 'I specialize in high-volume Shopify and Shopify Plus store management, custom Online Store 2.0 theme engineering, product catalog taxonomy refactoring, e-commerce analytics dashboards, and process automation. Whether you need a full theme build or ongoing technical store management, every project is delivered with enterprise quality.',
    keyTakeaway: 'Specialized in Shopify Plus theme engineering, catalog architecture, analytics, and store management.'
  },
  {
    id: 'faq-srv-2',
    category: 'Services',
    status: 'REAL',
    question: 'Do you offer ongoing store management and maintenance retainers?',
    answer: 'Yes. I offer monthly retainers covering emergency technical incident SLAs (sub-2 hour response), speed optimization maintenance, app compatibility updates, catalog adjustments, and theme feature additions.',
    keyTakeaway: 'Flexible retainer tiers available with guaranteed sub-2 hour SLA response times.'
  },
  {
    id: 'faq-srv-3',
    category: 'Services',
    status: 'REAL',
    question: 'Can you help clean up messy product catalogs and broken collection filters?',
    answer: 'Absolutely. Catalog standardization is a core specialty. I audit raw vendor CSV files, normalize attribute names (sizes, colors, specs), create custom Shopify Metafield schemas, and configure in-facet search filters.',
    keyTakeaway: 'Complete product attribute normalization and Metafield filter indexing for large catalogs.'
  },

  // Process
  {
    id: 'faq-prc-1',
    category: 'Process',
    status: 'REAL',
    question: 'What does your standard development process look like?',
    answer: 'My process follows an 8-stage methodology: 1. Discovery → 2. Research → 3. Planning → 4. Execution → 5. Testing → 6. Documentation → 7. Launch → 8. Maintenance. Every phase requires explicit quality gate approvals before advancing.',
    keyTakeaway: 'Structured 8-stage engineering process with strict quality gates at every milestone.'
  },
  {
    id: 'faq-prc-2',
    category: 'Process',
    status: 'REAL',
    question: 'How do you ensure zero downtime during theme launches or site refactoring?',
    answer: 'All development occurs in isolated staging environments and GitHub feature branches. Live stores are never touched until full User Acceptance Testing (UAT) is complete. Go-live transitions occur via theme slot publishing with instant rollback capabilities.',
    keyTakeaway: 'GitHub version control and staging theme slots guarantee zero disruption to live shoppers.'
  },

  // Communication
  {
    id: 'faq-com-1',
    category: 'Communication',
    status: 'REAL',
    question: 'How do we communicate during an active project?',
    answer: 'We establish dedicated communication channels through Slack or Microsoft Teams for async updates, combined with weekly video milestone syncs. Technical tasks and bug tickets are tracked transparently in Notion or Jira.',
    keyTakeaway: 'Transparent async communication via Slack/Teams paired with structured weekly video syncs.'
  },
  {
    id: 'faq-com-2',
    category: 'Communication',
    status: 'REAL',
    question: 'What time zones do you support for team meetings and support?',
    answer: 'I work with global clients across US (EST/PST), European (GMT/CET), and Asia-Pacific time zones. Emergency support retainers include defined response SLAs regardless of geographic location.',
    keyTakeaway: 'Flexible timezone availability supporting US, European, and APAC business hours.'
  },

  // Maintenance
  {
    id: 'faq-mtn-1',
    category: 'Maintenance',
    status: 'REAL',
    question: 'How do you handle page speed optimization and Core Web Vitals?',
    answer: 'I perform deep audits using Chrome DevTools and WebPageTest. Speed optimization includes converting media to modern WebP/AVIF formats, deferring non-critical third-party app scripts, eliminating layout shifts (CLS), and tuning critical CSS.',
    keyTakeaway: 'Targeting 90+ Mobile Lighthouse scores and passing Core Web Vitals without removing necessary apps.'
  },
  {
    id: 'faq-mtn-2',
    category: 'Maintenance',
    status: 'REAL',
    question: 'What happens if a third-party Shopify app update breaks my theme layout?',
    answer: 'Under a maintenance retainer, automated error monitoring alerts me immediately. I isolate the app conflict in staging, patch the Liquid or CSS layout rules, and deploy a hotfix.',
    keyTakeaway: 'Proactive monitoring and rapid hotfixes for third-party app conflicts.'
  },

  // Technology
  {
    id: 'faq-tch-1',
    category: 'Technology',
    status: 'REAL',
    question: 'Why do you prefer native Web Components over heavy JavaScript frameworks for Shopify themes?',
    answer: 'Shopify themes perform best when they minimize JavaScript payload size. Native Web Components (`customElements`) provide modern encapsulation, full accessibility control, and zero framework overhead (sub-10KB JS footprint).',
    keyTakeaway: 'Ultra-lean Web Components deliver sub-second page loads and superior mobile conversion.'
  },
  {
    id: 'faq-tch-2',
    category: 'Technology',
    status: 'REAL',
    question: 'Which analytics and dashboard tools do you integrate?',
    answer: 'I build custom tracking layers using Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Looker Studio, BigQuery, and React Recharts. This provides a unified view of Net Sales, AOV, LTV, CAC, and Return Rates.',
    keyTakeaway: 'Unified data integration across GA4, Looker Studio, and Shopify Analytics.'
  },

  // Project Delivery
  {
    id: 'faq-del-1',
    category: 'Project Delivery',
    status: 'REAL',
    question: 'What deliverables do I receive upon project completion?',
    answer: 'You receive full ownership of clean version-controlled code in GitHub, custom theme section settings, a comprehensive Merchant Theme User Guide, operational SOPs, and screen-recorded training sessions.',
    keyTakeaway: 'Complete IP ownership, version-controlled GitHub repo, written SOPs, and video training.'
  },
  {
    id: 'faq-del-2',
    category: 'Project Delivery',
    status: 'REAL',
    question: 'Are there any hidden costs or surprise fees?',
    answer: 'No. Every fixed-scope project includes a detailed scope breakdown document, milestone schedule, and fixed price quote. Retainers have clear monthly hour allocations with no unexpected overages.',
    keyTakeaway: 'Transparent fixed pricing or retainer structures with zero hidden fees.'
  }
];
