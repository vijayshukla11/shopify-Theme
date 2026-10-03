import { useState, useMemo } from 'react';
import {
  FileCode2,
  Search,
  CheckCircle2,
  ArrowRight,
  Code,
  Layers,
  X,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  Info,
  BookOpen,
  Image as ImageIcon,
  FileSpreadsheet,
  Lightbulb,
  Building
} from 'lucide-react';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData';
import { CaseStudy } from '../types/phase8';
import { StatusBadge } from './StatusBadge';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface CaseStudiesViewProps {
  initialCaseStudyId?: string | null;
  onRequestQuote?: (caseStudyId: string) => void;
  onSelectCaseStudy?: (caseStudyId: string) => void;
  onNavigateHome?: () => void;
}

export const CaseStudiesView = ({
  initialCaseStudyId,
  onRequestQuote,
  onSelectCaseStudy,
  onNavigateHome
}: CaseStudiesViewProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCaseStudy, setActiveModalCaseStudy] = useState<CaseStudy | null>(
    initialCaseStudyId
      ? CASE_STUDIES_DATA.find((cs) => cs.id === initialCaseStudyId) || null
      : null
  );

  const industries = ['All', 'Electronics & Audio', 'Retail & Multi-Category', 'Multi-Industry Analytics', 'General Ecommerce'];

  const filteredCaseStudies = useMemo(() => {
    return CASE_STUDIES_DATA.filter((cs) => {
      const matchesIndustry = selectedIndustry === 'All' || cs.industry === selectedIndustry;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        cs.title.toLowerCase().includes(q) ||
        cs.overview.toLowerCase().includes(q) ||
        cs.businessProblem.toLowerCase().includes(q) ||
        cs.solution.toLowerCase().includes(q) ||
        cs.deliverables.some((d) => d.toLowerCase().includes(q)) ||
        cs.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesIndustry && matchesSearch;
    });
  }, [selectedIndustry, searchQuery]);

  // Schema.org CaseStudy metadata
  const schemaOrgCaseStudies = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'E-commerce Technical Case Studies & Architecture Templates',
    itemListElement: CASE_STUDIES_DATA.map((cs, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Article',
        headline: cs.title,
        description: cs.overview,
        articleSection: cs.industry
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="E-commerce Engineering Case Studies & Architecture Templates"
        description="Detailed technical case studies showcasing Liquid theme refactoring, catalog taxonomy standardization, executive analytics dashboards, and speed optimization."
        schemaData={schemaOrgCaseStudies}
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Case Studies', active: true }
        ]}
        badge="Case Studies & Architecture"
        title="E-commerce Case Studies & Architecture Blueprints"
        description="In-depth architectural breakdowns detailing business problems, technical constraints, execution roles, liquid code solutions, deliverables, and verifiable metrics."
        cta={{
          label: 'Request Consultation',
          onClick: () => onRequestQuote?.('general'),
          icon: <ArrowRight className="w-4 h-4" />,
          variant: 'secondary'
        }}
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Industry Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                selectedIndustry === ind
                  ? 'bg-slate-900 text-white dark:bg-sky-600 dark:text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems, role, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCaseStudies.map((cs) => (
          <article
            key={cs.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all group relative space-y-4"
          >
            <div className="space-y-3">
              {/* Status & Industry */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  {cs.industry}
                </span>
                <StatusBadge status={cs.status} />
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {cs.title}
              </h2>

              {/* Client / Model Type */}
              <div className="text-xs font-mono text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 inline-block">
                Target Context: <strong>{cs.clientType}</strong>
              </div>

              {/* Overview */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {cs.overview}
              </p>

              {/* My Role */}
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <span className="font-mono font-bold uppercase text-slate-500 text-[10px] block">Role Executed:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{cs.myRole}</span>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {cs.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalCaseStudy(cs)}
                className="btn btn-primary text-xs font-bold py-2 px-4 gap-1.5"
              >
                <span>Read Full Case Study</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onRequestQuote?.(cs.id)}
                className="btn btn-secondary text-xs font-bold py-2 px-3 gap-1"
              >
                <span>Discuss Similar Need</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Case Studies Match Query</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or selecting "All" industries.
          </p>
          <button
            onClick={() => {
              setSelectedIndustry('All');
              setSearchQuery('');
            }}
            className="btn btn-secondary text-xs font-bold py-2 px-4"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Case Study Detail Modal */}
      {activeModalCaseStudy && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative p-6 sm:p-10 space-y-8">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCaseStudy(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Close Case Study Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 pr-8 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  {activeModalCaseStudy.industry}
                </span>
                <StatusBadge status={activeModalCaseStudy.status} size="md" />
                <span className="text-xs font-mono text-slate-500">
                  Context: {activeModalCaseStudy.clientType}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                {activeModalCaseStudy.title}
              </h2>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <span>Role Executed:</span>
                <span className="bg-sky-500/10 text-sky-700 dark:text-sky-300 px-2.5 py-0.5 rounded font-mono font-bold">
                  {activeModalCaseStudy.myRole}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">Executive Overview</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeModalCaseStudy.overview}
              </p>
            </div>

            {/* 2-Column: Business Problem & Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Problem */}
              <div className="space-y-3 bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                <h3 className="text-xs font-mono font-bold uppercase text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span>Business Problem</span>
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeModalCaseStudy.businessProblem}
                </p>
              </div>

              {/* Constraints */}
              <div className="space-y-3 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                <h3 className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span>Technical Constraints</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalCaseStudy.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The Solution */}
            <div className="space-y-3 bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/10">
              <h3 className="text-xs font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>The Solution Architecture</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeModalCaseStudy.solution}
              </p>
            </div>

            {/* Execution Process Steps */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-500" />
                <span>Execution Phases & Process</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModalCaseStudy.processSteps.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 block uppercase">
                      Step {idx + 1}: {p.title}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deliverables */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Key Deliverables</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalCaseStudy.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-purple-500" />
                  <span>Technologies Utilized</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalCaseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Documentation & Reports Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              {/* Documentation Links */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  Documentation References:
                </span>
                {activeModalCaseStudy.documentationLinks.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>{doc.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>

              {/* Reports */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Verification Reports:
                </span>
                {activeModalCaseStudy.reports.map((rep, i) => (
                  <div key={i} className="text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">{rep.name} ({rep.type}):</strong> {rep.summary}
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots Showcase */}
            {activeModalCaseStudy.screenshots.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-sky-500" />
                  <span>Screenshots & Interface Previews</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeModalCaseStudy.screenshots.map((shot, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img
                          src={shot.url}
                          alt={shot.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                        {shot.caption}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Learned */}
            <div className="space-y-2 bg-purple-500/5 p-4 rounded-xl border border-purple-500/10">
              <h3 className="text-xs font-mono font-bold uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Lessons Learned & Architectural Takeaways</span>
              </h3>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {activeModalCaseStudy.lessonsLearned.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveModalCaseStudy(null)}
                className="btn btn-secondary text-xs font-bold py-2 px-4"
              >
                Close Case Study
              </button>
              <button
                onClick={() => {
                  const csId = activeModalCaseStudy.id;
                  setActiveModalCaseStudy(null);
                  (onSelectCaseStudy || onRequestQuote)?.(csId);
                }}
                className="btn btn-primary text-xs font-bold py-2 px-5 gap-2"
              >
                <span>Inquire About Similar Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
