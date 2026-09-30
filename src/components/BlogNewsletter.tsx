import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const BlogNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-slate-800 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-mono font-bold">
          <Mail className="w-3.5 h-3.5" />
          <span>Nova Developer Journal</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
          Subscribe to Engineering & Audio Architecture Insights
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Join 18,000+ theme architects and audio hardware engineers receiving bi-weekly deep dives on Liquid optimization, WCAG compliance, and acoustic engineering.
        </p>
      </div>

      {subscribed ? (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Thank you! Your subscription is confirmed. Check your inbox for our latest benchmarks.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter.your.email@company.com"
            required
            className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
          />
          <button
            type="submit"
            className="btn btn-primary btn-md font-extrabold text-xs uppercase tracking-wider shrink-0 gap-2 min-h-[44px]"
          >
            <span>Subscribe Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="relative z-10 flex items-center gap-2 text-[10px] font-mono text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>No spam. One-click unsubscribe anytime. Zero tracking pixel cookies.</span>
      </div>
    </div>
  );
};
