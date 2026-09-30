import React from 'react';
import { Briefcase, GraduationCap, Award, FileText, CheckCircle2, Download } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface ResumeViewProps {
  onNavigateHome?: () => void;
  onRequestContact?: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  onNavigateHome,
  onRequestContact
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Technical Resume & Engineering Credentials - Shopify Theme Architect"
        description="Comprehensive engineering CV detailing Liquid theme architecture expertise, Shopify Plus migrations, performance optimization, and WCAG AA compliance."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Resume & Curriculum Vitae', active: true }
        ]}
        badge="Engineering CV"
        title="Technical Resume & Credentials"
        description="Over 6+ years of senior Shopify Plus theme architecture, Liquid engineering, custom storefront development, and WCAG 2.2 AA accessibility leadership."
        cta={{
          label: 'Contact Architect',
          onClick: () => onRequestContact?.(),
          icon: <FileText className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Professional Experience</h2>
                <p className="text-xs text-slate-500">Senior roles in Shopify Theme Architecture & E-commerce Engineering</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-sky-500 pl-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Lead Shopify Theme Architect</h3>
                  <span className="text-xs font-mono text-sky-500 font-bold">2021 — Present</span>
                </div>
                <p className="text-xs font-medium text-slate-500">Nova Commerce Framework & Advisory</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                  Architected scalable Liquid 2.0 theme components, standardized catalog metafield schemas, and achieved sub-second Lighthouse LCP performance scores for high-volume enterprise merchants.
                </p>
              </div>

              <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Senior Frontend & Liquid Developer</h3>
                  <span className="text-xs font-mono text-slate-500">2018 — 2021</span>
                </div>
                <p className="text-xs font-medium text-slate-500">E-Commerce Consultancy</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                  Engineered custom checkout UI extensions, built interactive product recommendation engines, and conducted WCAG 2.2 AA accessibility audits for international brands.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
              Core Competencies
            </h3>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 font-mono">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Liquid 2.0 Theme Engineering</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Shopify Metafields & Metaobjects</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> WCAG 2.2 AA Accessibility</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> React 18, Vite, Tailwind CSS</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> GA4 / GTM E-commerce Telemetry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
