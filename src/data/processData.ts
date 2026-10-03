import { ProcessPhase } from '../types/phase8';

export const PROCESS_DATA: ProcessPhase[] = [
  {
    id: 'phase-1-discovery',
    stepNumber: 1,
    title: 'Discovery & Alignment',
    subtitle: 'Understanding Business Goals & Technical Requirements',
    description: 'We begin by analyzing your business model, catalog structure, target audience, and operational pain points to establish project objectives, scope boundaries, and key metrics.',
    status: 'REAL',
    keyActivities: [
      'Stakeholder interviews and business goal setting.',
      'Audit of existing store configuration, apps, and theme code.',
      'Review of operational workflows (fulfillment, catalog, support).',
      'Definition of project scope, timelines, and communication channels.'
    ],
    deliverables: [
      'Project Discovery & Scope Specification Document',
      'Current State Technical Architecture Audit Report',
      'Key Success Metrics & SLA Agreement'
    ],
    clientInputs: [
      'Access to Shopify Admin / Staging environment.',
      'Overview of current operational pain points and priorities.',
      'Brand guidelines, design assets, or product catalog spreadsheets.'
    ],
    qualityGate: 'Signed Project Discovery Specification & Approved Milestone Roadmap'
  },
  {
    id: 'phase-2-research',
    stepNumber: 2,
    title: 'Research & Technical Audit',
    subtitle: 'Benchmarking & Architectural Gap Analysis',
    description: 'Deep-dive investigation into competitor storefronts, industry standards, accessibility guidelines, speed performance bottlenecks, and catalog data health.',
    status: 'REAL',
    keyActivities: [
      'Lighthouse & WebPageTest speed profiling.',
      'WCAG 2.2 AA accessibility audit on key page templates.',
      'Catalog data inspection for duplicate SKUs and missing attributes.',
      'Third-party app ecosystem evaluation for cost and speed efficiency.'
    ],
    deliverables: [
      'Core Web Vitals & Speed Audit Report',
      'Accessibility Gap Analysis Matrix',
      'Product Catalog Data Cleanliness Assessment'
    ],
    clientInputs: [
      'Third-party software subscription list & API credentials.',
      'Historical customer feedback or support ticket insights.'
    ],
    qualityGate: 'Audit Report Review Sign-off & Gap Priority Matrix Approval'
  },
  {
    id: 'phase-3-planning',
    stepNumber: 3,
    title: 'Planning & Information Architecture',
    subtitle: 'Designing the Solution Blueprint',
    description: 'Mapping out data schemas, Liquid component hierarchies, API integration routes, navigation taxonomy, and step-by-step sprint milestones.',
    status: 'REAL',
    keyActivities: [
      'Design of Shopify OS 2.0 JSON section schemas.',
      'Product catalog taxonomy & Metafield dictionary definition.',
      'User journey mapping & mobile navigation UX planning.',
      'Establishment of GitHub repository & dev environment branching rules.'
    ],
    deliverables: [
      'Information Architecture & Navigation Schema',
      'Shopify Metafield & Metaobject Specification Sheet',
      'Sprint Roadmap & Component Breakdown Plan'
    ],
    clientInputs: [
      'Review & approval of collection structure and filter facets.',
      'Selection of primary technology preferences.'
    ],
    qualityGate: 'Approved Technical Blueprint & Sprint Backlog Lock'
  },
  {
    id: 'phase-4-execution',
    stepNumber: 4,
    title: 'Execution & Development',
    subtitle: 'Clean, Standards-Compliant Engineering',
    description: 'Writing high-performance, accessible Liquid, HTML5, Tailwind CSS, and vanilla JavaScript code in version-controlled staging environments.',
    status: 'REAL',
    keyActivities: [
      'Custom Online Store 2.0 theme section & block development.',
      'Integration of Tailwind CSS & responsive styling components.',
      'Deployment of Web Components for interactive filter drawers and carousels.',
      'Automated batch data cleaning and catalog transformation execution.'
    ],
    deliverables: [
      'Version-Controlled Shopify Theme Code (GitHub Branch)',
      'Custom Web Component JS Files (`/assets/*.js`)',
      'Populated Shopify Metafields & Normalized Catalog Data'
    ],
    clientInputs: [
      'Feedback during weekly demo milestones.',
      'Review of content placeholders and merchant schema controls.'
    ],
    qualityGate: 'Code Review Completion & Zero Linting / Build Errors'
  },
  {
    id: 'phase-5-testing',
    stepNumber: 5,
    title: 'Testing & Quality Assurance',
    subtitle: 'Rigorous Multi-Device & Accessibility Verification',
    description: 'Verifying every feature across screen sizes, mobile browsers, assistive screen readers, and simulated low-speed mobile networks.',
    status: 'REAL',
    keyActivities: [
      'Cross-browser and cross-device testing (iOS, Android, macOS, Windows).',
      'Automated accessibility testing using axe-core and screen reader walk-throughs.',
      'Cart, checkout, and payment gateway end-to-end test transactions.',
      'Form validation, error state checking, and boundary stress testing.'
    ],
    deliverables: [
      'Quality Assurance Test Matrix & Sign-off Log',
      'Accessibility WCAG 2.2 AA Compliance Report',
      'End-to-End Test Order Receipt Verification'
    ],
    clientInputs: [
      'User Acceptance Testing (UAT) sign-off by client stakeholders.'
    ],
    qualityGate: '100% Pass Rate on UAT Test Matrix & Zero Critical/High Bugs'
  },
  {
    id: 'phase-6-documentation',
    stepNumber: 6,
    title: 'Documentation & Training',
    subtitle: 'Empowering Your Internal Team',
    description: 'Authoring comprehensive merchant user guides, technical handbooks, and operational SOPs so your team can manage the store independently.',
    status: 'REAL',
    keyActivities: [
      'Creating step-by-step guides for Theme Editor customization.',
      'Documenting custom code architecture and liquid schemas.',
      'Writing operational SOPs for product catalog uploads and order workflows.',
      'Conducting live screen-recorded training sessions with team members.'
    ],
    deliverables: [
      'Merchant Theme Customization Handbook',
      'Technical Code Architecture & Schema Guide',
      'Operational Standard Operating Procedure (SOP) Library',
      'Recorded Video Training Sessions'
    ],
    clientInputs: [
      'Attendance in walk-through training session.',
      'Confirmation of team documentation receipt.'
    ],
    qualityGate: 'Client Team Training Completion Sign-off'
  },
  {
    id: 'phase-7-launch',
    stepNumber: 7,
    title: 'Launch & Deployment',
    subtitle: 'Seamless, Zero-Downtime Go-Live',
    description: 'Executing a controlled launch checklist, publishing live theme code, configuring DNS records, verifying domain SSL, and monitoring live user traffic.',
    status: 'REAL',
    keyActivities: [
      'Final code freeze and production environment backup.',
      'Publishing Online Store 2.0 theme to live Shopify slot.',
      'Domain SSL verification and 301 redirect mapping audit.',
      'Real-time transaction monitoring and analytics tracking verification.'
    ],
    deliverables: [
      'Live Store Deployment Sign-off',
      'Post-Launch Site Telemetry Log',
      '301 Redirect Mapping Audit Report'
    ],
    clientInputs: [
      'Final authorization to publish theme code live.'
    ],
    qualityGate: 'Successful Live Purchase Transaction & Zero Console Errors'
  },
  {
    id: 'phase-8-maintenance',
    stepNumber: 8,
    title: 'Maintenance & Growth Optimization',
    subtitle: 'Long-term Health, Speed & Feature Iteration',
    description: 'Ongoing technical stewardship, monthly security/speed audits, emergency SLA support, and continuous conversion rate optimization.',
    status: 'REAL',
    keyActivities: [
      'Sub-2 hour emergency incident response SLA.',
      'Monthly theme code, app compatibility, and speed audits.',
      'Continuous iteration on high-converting landing pages.',
      'Quarterly strategic technology reviews and upgrade planning.'
    ],
    deliverables: [
      'Monthly Store Health & Performance Audit Reports',
      'Dedicated Task Tracker & Priority Queue Management',
      'Quarterly Technology Roadmap Updates'
    ],
    clientInputs: [
      'Regular priority alignment during monthly check-in calls.'
    ],
    qualityGate: 'SLA Performance Review & Continuous Store Health Scorecard'
  }
];
