import React, { useState } from 'react';
import {
  Scale,
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  List
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface TermsViewProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({
  onNavigateHome,
  onNavigateContact
}) => {
  const [activeSection, setActiveSection] = useState('sec-1');

  const termsSections = [
    { id: 'sec-1', title: '1. Acceptance of Terms' },
    { id: 'sec-2', title: '2. Purchases & Currency Pricing' },
    { id: 'sec-3', title: '3. User Accounts & Security' },
    { id: 'sec-4', title: '4. Intellectual Property & Code' },
    { id: 'sec-5', title: '5. Limitation of Liability' },
    { id: 'sec-6', title: '6. Governing Law & Arbitration' }
  ];

  const scrollToSec = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Terms & Conditions - Nova Tech Storefront"
        description="Official commercial terms of service, payment processing policies, user account rules, intellectual property rights, and dispute resolution guidelines."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Store', onClick: onNavigateHome },
          { label: 'Terms & Conditions', active: true }
        ]}
        badge="Legal & Governance"
        title="Terms & Conditions of Commercial Service"
        description="Effective Date: January 1, 2026. Governing rules and legal agreements for purchasing hardware products and utilizing Nova Tech storefront software."
        cta={{
          label: 'Print Terms',
          onClick: () => window.print(),
          icon: <Printer className="w-4 h-4" />,
          variant: 'outline'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
              <List className="w-4 h-4 text-sky-500" />
              <span>Agreement Sections</span>
            </div>
            <nav className="space-y-1">
              {termsSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSec(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                    activeSection === sec.id
                      ? 'bg-sky-500/10 text-sky-800 dark:text-sky-300 font-bold border-l-2 border-sky-500'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-10 shadow-xs text-slate-800 dark:text-slate-200">
          <section id="sec-1" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              1. Acceptance of Terms
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              By accessing, browsing, or placing orders on Nova Tech or using storefront features powered by the Nova Commerce Framework (NCF), you agree to be bound by these Terms & Conditions.
            </p>
          </section>

          <section id="sec-2" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              2. Purchases & Currency Pricing
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              All product prices are displayed in USD unless localized via storefront currency switcher controls. We reserve the right to modify pricing prior to order confirmation. Orders are subject to verification and acceptance.
            </p>
          </section>

          <section id="sec-3" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              3. User Accounts & Security
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              You are responsible for maintaining the confidentiality of your account credentials and password. Nova Tech cannot be held liable for unauthorized account activities resulting from compromised local passwords.
            </p>
          </section>

          <section id="sec-4" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              4. Intellectual Property & Code
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              All hardware designs, acoustic patents, Liquid theme section schemas, NCF engine code, and branding trademarks are the exclusive property of Nova Tech Inc.
            </p>
          </section>

          <section id="sec-5" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              5. Limitation of Liability
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              To the maximum extent permitted by applicable law, Nova Tech’s total liability for any claim arising out of your purchase shall not exceed the actual purchase price paid for the hardware unit.
            </p>
          </section>

          <section id="sec-6" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              6. Governing Law & Arbitration
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved through binding individual arbitration in San Francisco, CA.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};
