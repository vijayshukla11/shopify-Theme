import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface DashboardsViewProps {
  onNavigateHome?: () => void;
  onRequestContact?: () => void;
}

export const DashboardsView: React.FC<DashboardsViewProps> = ({
  onNavigateHome,
  onRequestContact
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="E-Commerce Analytics & Executive Telemetry Dashboards"
        description="Real-time merchant performance dashboards rendering sales volume, conversion rates, catalog velocity, and average order value metrics."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Executive Dashboards', active: true }
        ]}
        badge="Analytics Telemetry"
        title="Executive Performance Dashboards"
        description="Live telemetry monitoring revenue velocity, conversion funnels, catalog unit performance, and real-time checkout metrics."
        cta={{
          label: 'Request Dashboard Build',
          onClick: () => onRequestContact?.(),
          icon: <BarChart3 className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-mono font-bold uppercase">Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">$148,920.00</div>
          <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs previous month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-mono font-bold uppercase">Conversion Rate</span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">3.42%</div>
          <div className="text-[11px] text-sky-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.8% post-theme refactor</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-mono font-bold uppercase">Average Order Value</span>
            <ShoppingCart className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">$312.50</div>
          <div className="text-[11px] text-amber-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+$24.00 via product upsell engine</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-mono font-bold uppercase">Active Sessions</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">1,420</div>
          <div className="text-[11px] text-slate-400 font-semibold">Live active shoppers right now</div>
        </div>
      </div>
    </div>
  );
};
