import React from 'react';
import { Layers, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface PortfolioViewProps {
  onNavigateHome?: () => void;
  onRequestContact?: () => void;
}

const PORTFOLIO_ITEMS = [
  {
    title: 'High-Volume Commercial Theme Suite',
    category: 'Shopify Plus Theme',
    description: 'Custom liquid framework designed for high-density hardware catalog browsing, instant variant switching, and sticky sub-header navigation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Liquid 2.0', 'Tailwind', 'Performance']
  },
  {
    title: 'Executive Storefront Analytics & Telemetry',
    category: 'Dashboard & Reporting',
    description: 'Custom GA4 / BigQuery automated analytics integration rendering live conversion metrics, checkout funnel drop-offs, and AOV metrics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['GA4', 'BigQuery', 'TypeScript']
  },
  {
    title: 'Product Recommendation & Upsell Engine',
    category: 'Merchandising Module',
    description: 'Rules-based and AI-driven cross-sell drawer component boosting cart attachments by 22% across multi-category electronics catalogs.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Cart API', 'Algorithms']
  }
];

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onNavigateHome,
  onRequestContact
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Engineering Portfolio & Project Showcase - Nova Commerce"
        description="Explore production storefront implementations, custom theme components, merchandising engines, and analytics dashboards."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Portfolio', active: true }
        ]}
        badge="Showcase Gallery"
        title="Engineering Portfolio & Project Showcase"
        description="A curated gallery of production theme builds, custom e-commerce engines, design systems, and data analytics architectures."
        cta={{
          label: 'Request Consultation',
          onClick: () => onRequestContact?.(),
          icon: <ArrowRight className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all space-y-4 p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="aspect-video rounded-xl bg-slate-100 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-sky-500">{item.category}</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {item.tags.map((t, tIdx) => (
                <span key={tIdx} className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
