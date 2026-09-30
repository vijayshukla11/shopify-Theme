import { IndustryItem } from '../types/phase8';

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'ind-electronics',
    name: 'Electronics & Hardware',
    status: 'REAL',
    iconName: 'Laptop',
    summary: 'High-tech electronics require detailed technical specification matrices, compatibility guides, warranty registrations, and high-conversion product comparisons.',
    typicalChallenges: [
      'Customers struggle to compare technical specifications across complex product lineups.',
      'Frequent returns due to compatibility or driver installation confusion.',
      'High shipping costs for heavy hardware items requiring strict carrier insurance.'
    ],
    relevantServices: [
      'Shopify Theme Development',
      'Product Listing & Catalog Management',
      'Analytics & Dashboard Development'
    ],
    exampleSolutions: [
      'Interactive spec comparison tables powered by custom Shopify Metafields.',
      'Automated serial number and warranty registration via Shopify Flow.',
      'Sub-second mobile product page load speeds with responsive WebP image sets.'
    ],
    relatedCaseStudyIds: ['cs-shopify-migration', 'cs-speed-optimization']
  },
  {
    id: 'ind-fashion',
    name: 'Fashion & Apparel',
    status: 'DEMONSTRATION',
    iconName: 'Shirt',
    summary: 'Apparel brands depend heavily on visual storytelling, color swatch navigation, dynamic size charts, stock matrix accuracy, and seamless return portals.',
    typicalChallenges: [
      'High return rates driven by inaccurate sizing expectations or color mismatch.',
      'Complex variant matrices (Size × Color × Material) causing inventory sync errors.',
      'Slow mobile experience due to heavy high-resolution lookbook image galleries.'
    ],
    relevantServices: [
      'Product Listing & Catalog Management',
      'Ecommerce Operations',
      'Shopify Theme Development'
    ],
    exampleSolutions: [
      'Custom Metaobject size guide modals with interactive measurement converters.',
      'Color swatch swiping directly on collection product cards.',
      'Automated self-service return portal integration with ShipStation.'
    ],
    relatedCaseStudyIds: ['cs-catalog-refactor']
  },
  {
    id: 'ind-beauty',
    name: 'Beauty & Personal Care',
    status: 'DEMONSTRATION',
    iconName: 'Sparkles',
    summary: 'Beauty and skincare stores excel with subscription reorder flows, ingredient transparency filters, routine builder quizzes, and high-frequency VIP retention.',
    typicalChallenges: [
      'Educating consumers on complex active ingredients and skin compatibility.',
      'Low initial cart size without effective bundle or subscription upsells.',
      'Maintaining compliance with cosmetics labeling and claims disclosure standards.'
    ],
    relevantServices: [
      'Shopify Theme Development',
      'Business Process Automation',
      'Analytics & Dashboard Development'
    ],
    exampleSolutions: [
      'Ingredient lookup drawer with filter tags on product pages.',
      'Automated replenishment subscription reminders via Shopify Flow and email.',
      'Bundle-and-save tier widget with real-time cart subtotal discounts.'
    ],
    relatedCaseStudyIds: ['cs-analytics-dashboard']
  },
  {
    id: 'ind-food',
    name: 'Food & Beverage',
    status: 'TEMPLATE',
    iconName: 'Utensils',
    summary: 'Perishable goods e-commerce requires strict lot tracking, expiration management, temperature-controlled shipping rules, and recurring subscription boxes.',
    typicalChallenges: [
      'Short shelf-life requiring precise FIFO inventory allocation.',
      'Complex shipping carrier rules based on zip-code transit days.',
      'High customer acquisition cost requiring strong subscription retention.'
    ],
    relevantServices: [
      'Inventory & Purchase Operations',
      'Ecommerce Operations',
      'Business Process Automation'
    ],
    exampleSolutions: [
      'Geofenced shipping restriction validation at checkout.',
      'Lot number and batch tracking integrated into fulfillment workflows.',
      'Custom recurring subscription delivery box schedule builder.'
    ],
    relatedCaseStudyIds: ['cs-catalog-refactor']
  },
  {
    id: 'ind-healthcare',
    name: 'Healthcare & Wellness',
    status: 'TEMPLATE',
    iconName: 'Activity',
    summary: 'Wellness and medical supplies demand high security, accessible design, regulatory compliance disclosure, and reliable reordering systems.',
    typicalChallenges: [
      'Strict accessibility compliance rules (WCAG 2.2 AA) required by law.',
      'Complex regulatory disclaimers and age-verification checkout gates.',
      'Customer distrust regarding product authenticity and expiration dates.'
    ],
    relevantServices: [
      'Shopify Theme Development',
      'Website Maintenance',
      'Technical Documentation'
    ],
    exampleSolutions: [
      '100% WCAG 2.2 AA screen-reader accessible storefront theme.',
      'Integrated age and identity verification modal before checkout.',
      'Authenticity verification badge system on product detail pages.'
    ],
    relatedCaseStudyIds: ['cs-shopify-migration']
  },
  {
    id: 'ind-b2b',
    name: 'B2B & Wholesale',
    status: 'REAL',
    iconName: 'Building2',
    summary: 'Wholesale businesses require custom tiered pricing, quick order matrix forms, net payment terms, customer group permissions, and minimum order quantities.',
    typicalChallenges: [
      'Managing different price lists for wholesale tier groups vs retail.',
      'Manual PDF purchase order entry taking hours of sales team time.',
      'Lack of self-service reorder tools for corporate buyers.'
    ],
    relevantServices: [
      'Shopify Store Management',
      'Product Listing & Catalog Management',
      'Business Process Automation'
    ],
    exampleSolutions: [
      'Shopify Plus B2B wholesale company profile & price list setup.',
      'Quick Bulk Order Matrix form enabling single-click 50+ item add-to-cart.',
      'Automated PDF invoice generation and payment term tracking.'
    ],
    relatedCaseStudyIds: ['cs-catalog-refactor']
  },
  {
    id: 'ind-manufacturing',
    name: 'Manufacturing & Industrial',
    status: 'TEMPLATE',
    iconName: 'Factory',
    summary: 'Industrial suppliers rely on CAD drawing downloads, custom quote requests, raw material SKU tracking, and direct ERP synchronization.',
    typicalChallenges: [
      'Products require custom engineering quotes rather than fixed prices.',
      'Managing thousands of replacement part SKUs with minimal images.',
      'Disconnect between factory floor ERP and online catalog status.'
    ],
    relevantServices: [
      'Product Listing & Catalog Management',
      'Technical Documentation',
      'Business Process Automation'
    ],
    exampleSolutions: [
      'Interactive Request for Quote (RFQ) builder with file upload support.',
      'Deep part lookup taxonomy with schematic diagram hot-spots.',
      'Technical documentation knowledge base for installation engineers.'
    ],
    relatedCaseStudyIds: ['cs-catalog-refactor']
  },
  {
    id: 'ind-retail',
    name: 'Omnichannel Retail',
    status: 'REAL',
    iconName: 'Store',
    summary: 'Physical retail stores expanding online require unified POS stock sync, local pickup / BOPIS fulfillment, store locator maps, and consolidated gift card ledgers.',
    typicalChallenges: [
      'Inventory discrepancies between physical retail POS registers and online cart.',
      'Managing buy-online-pickup-in-store (BOPIS) fulfillment SLAs.',
      'Inconsistent customer loyalty points across online and in-store purchases.'
    ],
    relevantServices: [
      'Shopify Store Management',
      'Ecommerce Operations',
      'Inventory & Purchase Operations'
    ],
    exampleSolutions: [
      'Shopify POS multi-location inventory synchronization setup.',
      'Real-time local inventory checker on product pages with Google Maps routing.',
      'Automated BOPIS order notification pipeline for store associates.'
    ],
    relatedCaseStudyIds: ['cs-catalog-refactor']
  }
];
