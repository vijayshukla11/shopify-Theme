import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  // Schema.org BreadcrumbList JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://nova-commerce.dev/${item.label.toLowerCase().replace(/\s+/g, '-')}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="py-2.5 px-4 bg-slate-100/70 dark:bg-slate-900/50 rounded-lg border border-slate-200/80 dark:border-slate-800 text-xs my-4">
        <ol className="flex items-center flex-wrap gap-1.5 text-slate-600 dark:text-slate-400 font-mono">
          <li className="inline-flex items-center">
            <button
              onClick={items[0]?.onClick}
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          </li>

          {items.map((item, idx) => (
            <li key={idx} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {item.active ? (
                <span className="font-bold text-slate-900 dark:text-slate-100 px-1" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
