import React, { useState, useMemo } from 'react';
import {
  Code2,
  Search,
  CheckCircle2,
  Terminal,
  Zap,
  Palette,
  Cpu,
  Server,
  FileSpreadsheet,
  Layout,
  BarChart3,
  PieChart,
  Database,
  Workflow,
  Cloud,
  GitBranch,
  Sparkles,
  Info
} from 'lucide-react';
import { TECH_STACK_DATA } from '../data/techStackData';
import { TechCategory, TechItem } from '../types/phase8';
import { StatusBadge } from './StatusBadge';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface TechStackViewProps {
  onNavigateHome?: () => void;
  onRequestQuoteWithTech?: (techName: string) => void;
}

export const TechStackView: React.FC<TechStackViewProps> = ({
  onNavigateHome,
  onRequestQuoteWithTech
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: (TechCategory | 'All')[] = [
    'All',
    'Shopify',
    'Frontend',
    'Backend',
    'CMS',
    'Analytics',
    'Databases',
    'Automation',
    'Cloud',
    'Version Control',
    'AI Tools'
  ];

  const filteredTech = useMemo(() => {
    return TECH_STACK_DATA.filter((t) => {
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keyFeatures.some((f) => f.toLowerCase().includes(q)) ||
        t.relatedServices.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
      case 'Code2':
        return <Code2 className="w-5 h-5 text-sky-500" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-indigo-500" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-amber-600" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-rose-500" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-sky-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-teal-500" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-indigo-600" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Categorized Technology Stack & Tooling Matrix"
        description="Comprehensive technology stack covering Liquid, React, Tailwind CSS, Node.js, GA4, Shopify Flow, BigQuery, and Gemini AI APIs."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Technology Stack', active: true }
        ]}
        badge="Tooling & Frameworks"
        title="Technology Stack & Technical Frameworks"
        description="A transparent matrix of software frameworks, languages, analytics platforms, and automation tools utilized across client projects."
        cta={{
          label: 'Inquire by Tech Stack',
          onClick: () => onRequestQuoteWithTech?.('Shopify Liquid'),
          icon: <Code2 className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-purple-600 dark:text-white shadow-xs font-bold'
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
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTech.map((tech) => (
          <div
            key={tech.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all space-y-4"
          >
            <div className="space-y-3">
              {/* Icon, Category & Status */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {getTechIcon(tech.iconName)}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {tech.name}
                    </h2>
                    <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                      {tech.category}
                    </span>
                  </div>
                </div>

                <StatusBadge status={tech.status} />
              </div>

              {/* Experience Level & Years */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-bold border border-sky-500/20">
                  Level: {tech.experienceLevel}
                </span>
                <span className="text-slate-500">({tech.yearsExperience})</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {tech.description}
              </p>

              {/* Key Features */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Key Features:</span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {tech.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Services & Project Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="space-y-1 text-[11px] font-mono text-slate-500">
                <span>Related Projects: </span>
                <strong className="text-slate-800 dark:text-slate-200">
                  {tech.relatedProjectNames.join(', ')}
                </strong>
              </div>

              <button
                onClick={() => onRequestQuoteWithTech?.(tech.name)}
                className="btn btn-secondary w-full text-xs font-bold py-2 gap-1.5"
              >
                <span>Request Scope with {tech.name}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTech.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Technologies Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or selecting "All" categories.
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
    </div>
  );
};
