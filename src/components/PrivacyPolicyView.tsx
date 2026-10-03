import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  Cookie,
  FileText,
  CheckCircle2,
  List,
  Mail,
  SlidersHorizontal
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface PrivacyPolicyViewProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({
  onNavigateHome,
  onNavigateContact
}) => {
  const [activeSection, setActiveSection] = useState('section-1');
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const sections = [
    { id: 'section-1', title: '1. Information We Collect' },
    { id: 'section-2', title: '2. How We Use Your Data' },
    { id: 'section-3', title: '3. Cookies & Tracking Technologies' },
    { id: 'section-4', title: '4. Third-Party Service Providers' },
    { id: 'section-5', title: '5. Your Rights (GDPR & CCPA)' },
    { id: 'section-6', title: '6. Data Security & Retention' },
    { id: 'section-7', title: '7. Contact Data Protection Officer' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Privacy Policy & Indian IT Act Compliance - CLINZA"
        description="Transparent details on how CLINZA collects, uses, protects, and respects your personal data and cookie preferences."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Store', onClick: onNavigateHome },
          { label: 'Privacy Policy', active: true }
        ]}
        badge="Data Protection & Privacy"
        title="Privacy Policy & Data Security"
        description="Last updated: January 15, 2026. Complete disclosure regarding personal information handling, cookies, and privacy rights."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
              <List className="w-4 h-4 text-sky-500" />
              <span>Table of Contents</span>
            </div>
            <nav className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
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

          {/* Interactive Cookie Preferences Controls */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-sm">Cookie Preferences</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Customize your privacy settings for this browser session.
            </p>

            <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Strictly Necessary</div>
                  <div className="text-[10px] text-slate-400">Cart, checkout, security</div>
                </div>
                <input type="checkbox" checked disabled className="form-checkbox opacity-60" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Performance & Analytics</div>
                  <div className="text-[10px] text-slate-400">Page load & error logs</div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="form-checkbox text-sky-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Marketing & Personalization</div>
                  <div className="text-[10px] text-slate-400">Tailored product offers</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketingCookies}
                  onChange={(e) => setMarketingCookies(e.target.checked)}
                  className="form-checkbox text-sky-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setPreferencesSaved(true);
                setTimeout(() => setPreferencesSaved(false), 2500);
              }}
              className="w-full btn btn-primary text-xs font-bold py-2 px-4"
            >
              {preferencesSaved ? 'Preferences Saved!' : 'Save Cookie Settings'}
            </button>
          </div>
        </aside>

        {/* Main Content Body */}
        <main className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-10 shadow-xs text-slate-800 dark:text-slate-200">
          <section id="section-1" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              1. Information We Collect
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              CLINZA Electronics collects information to process orders, provide customer and technical support, and optimize storefront performance.
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600 dark:text-slate-300">
              <td><strong>Identity Data:</strong> Full name, shipping address, billing address, email address, and phone number.</td>
              <td><strong>Payment Data:</strong> Tokenized credit card details handled securely via PCI-DSS Level 1 payment gateways (Stripe / Shopify Payments). We never store raw card numbers.</td>
              <td><strong>Technical Telemetry:</strong> Anonymized IP address, browser user-agent, screen resolution, and error metrics.</td>
            </ul>
          </section>

          <section id="section-2" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              2. How We Use Your Data
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              We process personal data strictly under lawful bases specified by GDPR Article 6 and CCPA regulations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-slate-900 dark:text-white font-bold block">Fulfillment & Delivery</strong>
                <span className="text-slate-500">Dispatching hardware orders, sending tracking SMS/email updates.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-slate-900 dark:text-white font-bold block">Warranty & Support</strong>
                <span className="text-slate-500">Validating 2-year NovaCare warranty claims and technical intake.</span>
              </div>
            </div>
          </section>

          <section id="section-3" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              3. Cookies & Tracking Technologies
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Cookies are small data files placed on your device. We use session cookies for cart state preservation and persistent preference cookies for theme dark/light mode toggles.
            </p>
          </section>

          <section id="section-4" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              4. Third-Party Service Providers
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              We never sell or rent personal data. Data is shared exclusively with audited sub-processors required to fulfill orders:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600 dark:text-slate-300">
              <li>Logistics Partners: FedEx Express, UPS, DHL International</li>
              <li>Payment Gateways: Stripe, Apple Pay, Google Pay, Shopify Payments</li>
              <li>Hosting Infrastructure: Google Cloud Platform & Cloud Run (ISO 27001 Certified)</li>
            </ul>
          </section>

          <section id="section-5" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              5. Your Rights (GDPR & CCPA)
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Under global privacy frameworks, you retain the right to request access, rectification, portability, or complete erasure ("Right to be Forgotten") of your personal data at any time.
            </p>
          </section>

          <section id="section-6" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              6. Data Security & Retention
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              All browser communications are encrypted in transit via TLS 1.3 with 256-bit AES encryption. Order data is retained for 7 years to comply with statutory accounting standards.
            </p>
          </section>

          <section id="section-7" className="space-y-4 scroll-mt-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
              7. Contact Data Protection Officer
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              For privacy inquiries, GDPR access requests, or CCPA opt-out requests, contact our Data Protection Officer:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
              <div><strong>Email:</strong> privacy@clinza.com</div>
              <div><strong>Mail:</strong> Attn: Grievance Officer, CLINZA Electronics Pvt Ltd, 12th Main Indiranagar, Bengaluru, Karnataka 560038, India</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
