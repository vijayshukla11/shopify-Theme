import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2
} from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import { FAQCategory } from '../types/phase8';
import { StatusBadge } from './StatusBadge';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface FaqViewProps {
  onNavigateHome?: () => void;
  onRequestContact?: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({
  onNavigateHome,
  onRequestContact
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>([FAQ_DATA[0].id, FAQ_DATA[3].id]);

  const categories: (FAQCategory | 'All')[] = [
    'All',
    'Services',
    'Process',
    'Communication',
    'Maintenance',
    'Technology',
    'Project Delivery'
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((f) => {
      const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.keyTakeaway.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Schema.org FAQPage structured data
  const schemaOrgFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Frequently Asked Questions (FAQ) - Services & Delivery"
        description="Clear, transparent answers regarding Shopify store management services, engineering methodology, retainer SLAs, speed optimization, and project deliverables."
        schemaData={schemaOrgFaq}
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'FAQ', active: true }
        ]}
        badge="Knowledge Base & SLAs"
        title="Frequently Asked Questions & SLAs"
        description="Everything you need to know about working together, project delivery SLAs, store retainers, code quality guarantees, and communication protocols."
        cta={{
          label: 'Contact Support',
          onClick: () => onRequestContact?.(),
          icon: <HelpCircle className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-teal-600 dark:text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* FAQ Accordions List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`bg-white dark:bg-slate-900 rounded-xl border transition-all ${
                isOpen
                  ? 'border-teal-500/80 shadow-md dark:border-teal-500/80'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl"
                aria-expanded={isOpen}
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-teal-600 dark:text-teal-400">
                      {faq.category}
                    </span>
                    <StatusBadge status={faq.status} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {faq.question}
                  </h2>
                </div>

                <div className="text-slate-400 p-1 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Answer Content */}
              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-4 animate-fadeIn">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>

                  <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Key Takeaway:</strong> {faq.keyTakeaway}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Matching Questions Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for another keyword or ask your question directly using the contact intake form.
          </p>
          <button
            onClick={onRequestContact}
            className="btn btn-primary text-xs font-bold py-2 px-4"
          >
            Ask a Custom Question
          </button>
        </div>
      )}
    </div>
  );
};
