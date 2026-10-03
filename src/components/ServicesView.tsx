import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  CheckCircle2,
  ArrowRight,
  Code,
  Layers,
  Clock,
  DollarSign,
  X,
  ExternalLink,
  FileText,
  ShieldAlert,
  ChevronRight,
  Info
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData';
import { ServiceItem } from '../types/phase8';
import { StatusBadge } from './StatusBadge';
import { PageHeader, SeoMeta } from './PageHeader';

interface ServicesViewProps {
  onSelectCaseStudy?: (caseStudyId: string) => void;
  onRequestQuote?: (serviceId: string) => void;
  onNavigateHome?: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onSelectCaseStudy,
  onRequestQuote,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Shopify Engineering', 'Operations & Catalog', 'Analytics & Automation', 'Optimization & Maintenance'];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((s) => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        s.title.toLowerCase().includes(q) ||
        s.overview.toLowerCase().includes(q) ||
        s.problemsSolved.some((p) => p.toLowerCase().includes(q)) ||
        s.deliverables.some((d) => d.toLowerCase().includes(q)) ||
        s.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org Service catalog
  const schemaOrgServices = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'E-commerce & Shopify Professional Engineering Services',
    itemListElement: SERVICES_DATA.map((srv, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: srv.title,
        description: srv.shortDesc,
        category: srv.category,
        provider: {
          '@type': 'Person',
          name: 'Senior E-commerce & Shopify Specialist'
        }
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Professional E-commerce & Shopify Engineering Services"
        description="Explore 11 specialized services covering Shopify Plus store management, theme development, catalog taxonomy, e-commerce analytics, and performance speed optimization."
        schemaData={schemaOrgServices}
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Services', active: true }
        ]}
        badge="Services Catalog"
        title="E-commerce Services & Architectural Solutions"
        description="Delivering concrete business value for Shopify Plus merchants through clean theme engineering, robust catalog architecture, automated operations, and data-driven analytics."
        cta={{
          label: 'Initiate Scope Request',
          onClick: () => onRequestQuote?.('general'),
          icon: <ArrowRight className="w-4 h-4" />,
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
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-sky-600 dark:text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems or deliverables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <article
            key={service.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-sky-500/50 hover:shadow-lg transition-all group relative"
          >
            <div className="space-y-4">
              {/* TOP: Service Icon, Category, Status Badge */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase text-sky-700 dark:text-sky-400 tracking-wider">
                    {service.category}
                  </span>
                </div>
                <StatusBadge status={service.status} size="sm" />
              </div>

              {/* MIDDLE: Title, Short Description, Problems Solved, Tech Chips */}
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                  {service.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {service.shortDesc}
                </p>
              </div>

              {/* Problems Solved */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-wider block">
                  Target Problems Solved:
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {service.problemsSolved.slice(0, 2).map((prob, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
                  Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-semibold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 4 && (
                    <span className="text-[10px] font-mono font-medium px-1.5 py-1 text-slate-400">
                      +{service.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* BOTTOM: Deliverables Summary, Evidence Count, Primary Button & Secondary Link */}
            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{service.deliverables.length} Deliverables</span>
                </span>
                <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{service.relatedCaseStudyIds.length} Case Studies</span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1 min-h-[44px]"
                >
                  <span>Scope Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onRequestQuote?.(service.id)}
                  className="btn btn-primary min-h-[44px] text-xs font-bold py-2 px-4 rounded-xl gap-1.5"
                >
                  <span>Request Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Services Match Search Query</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or switching to "All" categories to view all 11 service offerings.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn btn-secondary text-xs font-bold py-2 px-4"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative p-6 sm:p-8 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Close Service Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 pr-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-sky-400">
                  {activeModalService.category}
                </span>
                <StatusBadge status={activeModalService.status} size="md" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                {activeModalService.title}
              </h2>
            </div>

            {/* Overview */}
            <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">Service Overview</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeModalService.overview}
              </p>
            </div>

            {/* 2-Column Section: Problems Solved & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problems Solved */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Problems Solved</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalService.problemsSolved.map((prob, i) => (
                    <li key={i} className="flex items-start gap-2 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Key Deliverables</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalService.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Process */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-500" />
                <span>Execution Process</span>
              </h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {activeModalService.processSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-sky-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-purple-500" />
                <span>Technologies & Tools Used</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeModalService.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Case Studies & Evidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              {/* Case Studies */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Related Case Studies:</span>
                {activeModalService.relatedCaseStudyIds.map((csId) => {
                  const cs = CASE_STUDIES_DATA.find((c) => c.id === csId);
                  return (
                    <button
                      key={csId}
                      onClick={() => {
                        setActiveModalService(null);
                        onSelectCaseStudy?.(csId);
                      }}
                      className="w-full text-left p-2 rounded bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-900/30 border border-slate-200 dark:border-slate-700 text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center justify-between"
                    >
                      <span className="truncate">{cs?.title || csId}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Timeline & Pricing */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Timeline: <strong>{activeModalService.estimatedTimeline}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Pricing: <strong>{activeModalService.pricingModel}</strong></span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveModalService(null)}
                className="btn btn-secondary text-xs font-bold py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const srvId = activeModalService.id;
                  setActiveModalService(null);
                  onRequestQuote?.(srvId);
                }}
                className="btn btn-primary text-xs font-bold py-2 px-5 gap-2"
              >
                <span>Request Project Scope Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
