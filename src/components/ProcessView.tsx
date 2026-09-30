import React, { useState } from 'react';
import {
  Workflow,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  FileCheck,
  UserCheck,
  Award
} from 'lucide-react';
import { PROCESS_DATA } from '../data/processData';
import { ProcessPhase } from '../types/phase8';
import { StatusBadge } from './StatusBadge';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface ProcessViewProps {
  onRequestProject?: () => void;
  onNavigateHome?: () => void;
}

export const ProcessView: React.FC<ProcessViewProps> = ({
  onRequestProject,
  onNavigateHome
}) => {
  const [expandedStepId, setExpandedStepId] = useState<string>('phase-1-discovery');

  const toggleStep = (id: string) => {
    setExpandedStepId((prev) => (prev === id ? '' : id));
  };

  // Schema.org HowTo structured data
  const schemaOrgProcess = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How I Work - 8-Stage E-commerce Engineering Methodology',
    description: 'Structured 8-stage engineering process for Shopify store development, theme refactoring, and catalog optimization.',
    step: PROCESS_DATA.map((p) => ({
      '@type': 'HowToStep',
      position: p.stepNumber,
      name: p.title,
      itemListElement: p.keyActivities.map((act) => ({
        '@type': 'HowToDirection',
        text: act
      }))
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="How I Work - 8-Stage E-commerce Engineering Methodology"
        description="Discover the structured 8-stage methodology from Discovery and Research to Planning, Execution, QA Testing, Documentation, Launch, and Maintenance."
        schemaData={schemaOrgProcess}
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'SOPs & Process', active: true }
        ]}
        badge="Methodology & SOPs"
        title="8-Stage Standard Operating Procedures (SOPs)"
        description="Every project follows a predictable, transparent workflow designed to minimize risk, eliminate scope creep, guarantee WCAG 2.2 AA accessibility, and empower your team."
        cta={{
          label: 'Initiate Project',
          onClick: () => onRequestProject?.(),
          icon: <ArrowRight className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      {/* Visual Timeline Flow */}
      <div className="space-y-4">
        {PROCESS_DATA.map((phase) => {
          const isExpanded = expandedStepId === phase.id;
          return (
            <div
              key={phase.id}
              className={`bg-white dark:bg-slate-900 rounded-xl border transition-all ${
                isExpanded
                  ? 'border-sky-500 shadow-md dark:border-sky-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleStep(phase.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-sky-600 text-white font-mono font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                    {phase.stepNumber}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        {phase.title}
                      </h2>
                      <StatusBadge status={phase.status} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-6 animate-fadeIn">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    {phase.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Key Activities */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Workflow className="w-4 h-4 text-sky-500" />
                        <span>Key Activities</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {phase.keyActivities.map((act, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Deliverables */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-500" />
                        <span>Deliverables Produced</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {phase.deliverables.map((del, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Client Inputs Needed */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-purple-500" />
                        <span>Client Inputs Required</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {phase.clientInputs.map((inp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                            <span>{inp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quality Gate Box */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-xs flex items-center gap-3">
                    <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300 block text-[10px]">
                        Phase Quality Gate Approval Criterion:
                      </span>
                      <span className="text-slate-700 dark:text-slate-200 font-medium">
                        {phase.qualityGate}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Ready to Begin Phase 1 (Discovery & Alignment)?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Let's discuss your store goals, timeline, and technical constraints to construct a tailored roadmap.
          </p>
        </div>
        <button
          onClick={onRequestProject}
          className="btn btn-primary text-xs font-bold py-3 px-6 gap-2 shrink-0"
        >
          <span>Initiate Project Scope Inquiry</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
