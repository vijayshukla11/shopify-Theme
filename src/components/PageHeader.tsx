import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SeoMeta } from './SeoMeta';

export { SeoMeta };

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
}

export interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  cta?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  badge?: string;
  category?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  description,
  cta,
  badge,
  category,
  className = ''
}) => {
  return (
    <div className={`w-full bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden ${className}`}>
      {/* Subtle ambient accent glow */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center flex-wrap gap-1.5 text-xs text-slate-400 font-mono" aria-label="Breadcrumb">
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1 || item.active;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />}
                  {isLast ? (
                    <span className="text-sky-400 font-bold truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                      {item.label}
                    </span>
                  ) : item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="hover:text-white transition-colors underline-offset-2 hover:underline focus:outline-none"
                    >
                      {item.label}
                    </button>
                  ) : item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors hover:underline">
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Optional Badges */}
          {(badge || category) && (
            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              {badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-sky-500/30">
                  {badge}
                </span>
              )}
              {category && (
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  {category}
                </span>
              )}
            </div>
          )}

          {/* Page Title (H1) */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase leading-tight">
            {title}
          </h1>

          {/* Optional Short Description */}
          {description && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Optional CTA Button */}
        {cta && (
          <div className="shrink-0 pt-2 md:pt-0">
            <button
              onClick={cta.onClick}
              className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                cta.variant === 'secondary'
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : cta.variant === 'outline'
                  ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'
                  : 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-sky-500/20'
              }`}
            >
              {cta.icon}
              <span>{cta.label}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
