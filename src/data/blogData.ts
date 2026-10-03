import { BlogPost, BlogAuthor } from '../types/blog';

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  alex: {
    id: 'alex',
    name: 'Alex Rivera',
    role: 'Lead Shopify Theme Architect & Performance Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: '10+ years optimizing high-volume e-commerce storefronts. Author of Liquid 2.0 optimization standards and Core Web Vitals tooling for enterprise Shopify Plus merchants.',
    twitter: 'https://twitter.com/ncf_alex',
    linkedin: 'https://linkedin.com/in/alex-rivera-ncf',
    github: 'https://github.com/alexrivera-dev'
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Principal UX Designer & WCAG Accessibility Lead',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'Specializes in accessible component design, contrast systems, keyboard navigation frameworks, and screen reader UX for commercial themes.',
    twitter: 'https://twitter.com/sarahchen_ux',
    linkedin: 'https://linkedin.com/in/sarahchen-ux'
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Acoustics & Hardware Systems Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Former audio hardware engineer turned technical writer. Evaluates audiophile DACs, beryllium drivers, and wireless protocol performance.',
    twitter: 'https://twitter.com/marcus_audio'
  }
};

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: 'liquid-2-render-loops',
    slug: 'optimizing-liquid-2-render-loops',
    title: 'Optimizing Liquid 2.0 Render Loops for Enterprise Shopify Storefronts',
    category: 'Architecture',
    tags: ['Shopify Liquid', 'Core Web Vitals', 'Performance', 'Shopify Plus'],
    excerpt: 'Learn how to eliminate Liquid DOM bottlenecks when iterating over multi-variant product collections, custom metafields, and AJAX cart drawers.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    author: BLOG_AUTHORS.alex,
    publishedDate: 'Aug 04, 2026',
    updatedDate: 'Aug 06, 2026',
    readingTime: '6 min read',
    isFeatured: true,
    metaTitle: 'Optimizing Liquid 2.0 Render Loops | NCF Engineering Journal',
    metaDescription: 'Step-by-step guide to removing Liquid iteration overhead and optimizing LCP for large Shopify Plus catalogs.',
    content: [
      {
        id: 'b1',
        type: 'paragraph',
        content: 'When scaling a Shopify storefront to thousands of SKUs with complex variant structures and rich metafield specs, unoptimized Liquid loops become the single primary bottleneck degrading server response time (TTFB) and Largest Contentful Paint (LCP).'
      },
      {
        id: 'b2',
        type: 'heading',
        level: 2,
        content: '1. The Overhead of Nested Liquid Iteration'
      },
      {
        id: 'b3',
        type: 'paragraph',
        content: 'Standard Liquid code frequently iterates over `collection.products`, nested `product.variants`, and metafield objects inside section renders. When 50 products are evaluated with 10 variants each, Liquid executes over 500 loop passes per request.'
      },
      {
        id: 'b4',
        type: 'callout',
        calloutType: 'warning',
        content: 'Caution: Never execute `{% for option in product.options_with_values %}` inside an outer variant check loop. Always hoist option arrays into assigned JSON structures at the top of the section snippet.'
      },
      {
        id: 'b5',
        type: 'heading',
        level: 2,
        content: '2. Hoisting & Assigning JSON State'
      },
      {
        id: 'b6',
        type: 'code',
        language: 'liquid',
        content: `{%- comment -%}
  NCF High-Performance Variant Assignment Pattern
{%- endcomment -%}
{%- capture variant_json -%}
[
  {%- for variant in product.variants -%}
    {
      "id": {{ variant.id | json }},
      "title": {{ variant.title | json }},
      "price": {{ variant.price | json }},
      "available": {{ variant.available | json }}
    }{%- unless forloop.last -%},{%- endunless -%}
  {%- endfor -%}
]
{%- endcapture -%}

<script type="application/json" id="ProductJson-{{ product.id }}">
  {{ variant_json }}
</script>`
      },
      {
        id: 'b7',
        type: 'quote',
        content: 'By replacing inline Liquid loops with client-side JSON parsing during user interaction, we reduced Liquid render processing time from 380ms down to 18ms on a catalog with 45,000 SKUs.',
        authorQuote: 'Alex Rivera, Theme Architect'
      },
      {
        id: 'b8',
        type: 'heading',
        level: 2,
        content: '3. Performance Benchmark Comparison'
      },
      {
        id: 'b9',
        type: 'table',
        tableHeaders: ['Implementation Method', 'TTFB (Server)', 'LCP (Desktop)', 'LCP (Mobile)'],
        tableRows: [
          ['Standard Nested Loops', '420ms', '2.8s', '4.2s'],
          ['Liquid Tag Caching', '190ms', '1.4s', '2.1s'],
          ['NCF Hoisted JSON + AJAX', '65ms', '0.7s', '0.9s']
        ]
      },
      {
        id: 'b10',
        type: 'product_callout',
        product: {
          productId: 'prod-1',
          name: 'NovaSound ANC Master Studio Headphones',
          price: 349.00,
          originalPrice: 420.00,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
          category: 'audio',
          reason: 'Tested live in our bench testing using Liquid 2.0 hoisted variant schemas.'
        }
      },
      {
        id: 'b11',
        type: 'faq',
        faqItems: [
          {
            question: 'Does JSON hoisting affect SEO indexing?',
            answer: 'No. Search engine crawlers index the rendered HTML text and JSON-LD Schema simultaneously. Client-side hydration improves Core Web Vitals, which directly boosts SEO ranking factors.'
          },
          {
            question: 'Can this pattern be used with Shopify Online Store 2.0 sections?',
            answer: 'Yes, NCF Liquid snippets natively support OS 2.0 block renders and custom theme app extensions.'
          }
        ]
      }
    ]
  },
  {
    id: 'wcag-22-aa-audit',
    slug: 'wcag-22-aa-accessibility-guide',
    title: 'Complete WCAG 2.2 AA Compliance Audit Checklist for High-Converting Storefronts',
    category: 'Accessibility',
    tags: ['Accessibility', 'WCAG 2.2', 'ARIA', 'UX Design'],
    excerpt: 'An actionable blueprint to ensure screen reader navigation, focus indicators, color contrast ratios, and touch targets satisfy European Accessibility Act requirements.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    author: BLOG_AUTHORS.sarah,
    publishedDate: 'Jul 28, 2026',
    updatedDate: 'Aug 02, 2026',
    readingTime: '8 min read',
    isFeatured: false,
    metaTitle: 'WCAG 2.2 AA Accessibility Audit Checklist | NCF Engineering',
    metaDescription: 'Step-by-step WCAG 2.2 AA audit for e-commerce themes including focus trap, ARIA dialogs, and minimum 44px touch targets.',
    content: [
      {
        id: 'a1',
        type: 'paragraph',
        content: 'With the enforcement of the European Accessibility Act (EAA) and strict ADA compliance rulings, e-commerce storefronts must deliver non-discriminatory shopping experiences for customers using screen readers, braille displays, or switch devices.'
      },
      {
        id: 'a2',
        type: 'heading',
        level: 2,
        content: 'Key Requirements for Modern E-Commerce Themes'
      },
      {
        id: 'a3',
        type: 'callout',
        calloutType: 'tip',
        content: 'Pro Tip: Ensure all interactive controls (buttons, variant selectors, slider controls) maintain a minimum touch target size of 44x44 CSS pixels without relying on negative margins.'
      },
      {
        id: 'a4',
        type: 'quote',
        content: 'Accessibility is not an addon feature; it is the fundamental baseline of high-conversion user experience.',
        authorQuote: 'Sarah Chen, WCAG Lead'
      }
    ]
  },
  {
    id: 'audiophile-dac-buying-guide',
    slug: 'ultimate-audiophile-dac-amplifier-buying-guide-2026',
    title: 'The Ultimate Audiophile DAC & Amplifier Buying Guide for Desktop Reference Audio',
    category: 'Buying Guides',
    tags: ['Buying Guide', 'Audio Gear', 'Hardware', 'DAC Amplifiers'],
    excerpt: 'Demystifying ESS Sabre chips, THD+N measurements, balanced XLR outputs, and MQA decoding for studio monitoring setups.',
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    author: BLOG_AUTHORS.marcus,
    publishedDate: 'Jul 18, 2026',
    readingTime: '10 min read',
    isFeatured: false,
    metaTitle: 'Audiophile DAC & Amplifier Buying Guide 2026 | NCF Reviews',
    metaDescription: 'Complete technical buying guide comparing desktop DACs, balanced amplifiers, impedance matching, and signal-to-noise ratios.',
    content: [
      {
        id: 'd1',
        type: 'paragraph',
        content: 'Navigating the technical landscape of digital-to-analog converters requires understanding signal-to-noise ratio (SNR), total harmonic distortion + noise (THD+N), output impedance, and balanced topology.'
      },
      {
        id: 'd2',
        type: 'heading',
        level: 2,
        content: 'Understanding Output Impedance & Damping Factor'
      },
      {
        id: 'd3',
        type: 'paragraph',
        content: 'To prevent frequency response coloration in low-impedance planar magnetic headphones, an amplifier output impedance must remain under 1/8th of the headphone nominal load.'
      }
    ]
  }
];
