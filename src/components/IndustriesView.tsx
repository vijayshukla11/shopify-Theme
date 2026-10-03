import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  X,
  ExternalLink,
  Laptop,
  Shirt,
  Sparkles,
  Utensils,
  Activity,
  Factory,
  Store
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData';
import { IndustryItem } from '../types/phase8';
import { StatusBadge } from './StatusBadge';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface IndustriesViewProps {
  onNavigateHome?: () => void;
  onSelectCaseStudy?: (csId: string) => void;
  onRequestQuoteWithIndustry?: (industryName: string) => void;
}

export const IndustriesView: React.FC<IndustriesViewProps> = ({
  onNavigateHome,
  onSelectCaseStudy,
  onRequestQuoteWithIndustry
}) => {
  const [activeModalIndustry, setActiveModalIndustry] = useState<IndustryItem | null>(null);

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-sky-500" />;
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-purple-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-emerald-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-rose-500" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-indigo-500" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-slate-500" />;
      case 'Store':
        return <Store className="w-6 h-6 text-teal-500" />;
      default:
        return <Building2 className="w-6 h-6 text-sky-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="E-commerce Industry Solutions & Challenges Blueprint"
        description="Tailored e-commerce solutions and technical architectures for Electronics, Fashion, Beauty, Food, Healthcare, B2B, Manufacturing, and Omnichannel Retail."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Industries', active: true }
        ]}
        badge="Industry Domain Expertise"
        title="E-commerce Industry Solutions & Architecture"
        description="Different sectors face distinct technical and operational hurdles. Explore specialized architectures engineered for Electronics, Fashion, Beauty, B2B, and Omnichannel Retail."
        cta={{
          label: 'Inquire by Industry',
          onClick: () => onRequestQuoteWithIndustry?.('General'),
          icon: <ArrowRight className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      {/* Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INDUSTRIES_DATA.map((ind) => (
          <div
            key={ind.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-md transition-all space-y-4"
          >
            <div className="space-y-3">
              {/* Header Icon & Status */}
              <div className="flex items-center justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {getIndustryIcon(ind.iconName)}
                </div>
                <StatusBadge status={ind.status} />
              </div>

              {/* Title & Summary */}
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {ind.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {ind.summary}
              </p>

              {/* Top Challenge */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Primary Challenge:</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                  {ind.typicalChallenges[0]}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalIndustry(ind)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Explore Solutions
              </button>

              <button
                onClick={() => onRequestQuoteWithIndustry?.(ind.name)}
                className="btn btn-primary text-xs font-bold py-1.5 px-3 gap-1"
              >
                <span>Discuss {ind.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Industry Detail Modal */}
      {activeModalIndustry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative p-6 sm:p-8 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalIndustry(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Close Industry Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 pr-8">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                {getIndustryIcon(activeModalIndustry.iconName)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {activeModalIndustry.name} Industry Profile
                  </h2>
                  <StatusBadge status={activeModalIndustry.status} size="md" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tailored technical architecture & operational solutions
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeModalIndustry.summary}
            </div>

            {/* 2 Column: Challenges & Example Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenges */}
              <div className="space-y-3 bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                <h3 className="text-xs font-mono font-bold uppercase text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span>Typical Sector Challenges</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalIndustry.typicalChallenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example Solutions */}
              <div className="space-y-3 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                <h3 className="text-xs font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Proven Solution Patterns</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalIndustry.exampleSolutions.map((sol, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Relevant Services */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Recommended Services:</span>
              <div className="flex flex-wrap gap-2">
                {activeModalIndustry.relevantServices.map((srv) => (
                  <span
                    key={srv}
                    className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Case Studies */}
            {activeModalIndustry.relatedCaseStudyIds.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Related Case Study References:</span>
                {activeModalIndustry.relatedCaseStudyIds.map((csId) => {
                  const cs = CASE_STUDIES_DATA.find((c) => c.id === csId);
                  return (
                    <button
                      key={csId}
                      onClick={() => {
                        setActiveModalIndustry(null);
                        onSelectCaseStudy?.(csId);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-900/30 border border-slate-200 dark:border-slate-700 text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center justify-between"
                    >
                      <span>{cs?.title || csId}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveModalIndustry(null)}
                className="btn btn-secondary text-xs font-bold py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const indName = activeModalIndustry.name;
                  setActiveModalIndustry(null);
                  onRequestQuoteWithIndustry?.(indName);
                }}
                className="btn btn-primary text-xs font-bold py-2 px-5 gap-2"
              >
                <span>Request {activeModalIndustry.name} Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
