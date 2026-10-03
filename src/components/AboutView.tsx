import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Zap,
  Globe,
  HeartHandshake,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Cpu,
  Feather
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  location: string;
  socials: { twitter?: string; linkedin?: string; github?: string };
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  description: string;
  verified: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Elena Vance',
    role: 'Founder & Chief Architect',
    bio: 'Former Senior Hardware Architect at Apple Audio Labs. Pioneer in beryllium transducer acoustics and modular storefront theme frameworks.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA',
    socials: { twitter: '#', linkedin: '#', github: '#' }
  },
  {
    id: 'team-2',
    name: 'Marcus Chen',
    role: 'VP of Acoustic Engineering',
    bio: '15+ years in high-density DAC signal processing, planar magnetic drivers, and ultra-low THD amplification circuitry.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    location: 'Tokyo, Japan',
    socials: { twitter: '#', linkedin: '#' }
  },
  {
    id: 'team-3',
    name: 'Sarah Jenkins',
    role: 'Lead UX & Accessibility Engineer',
    bio: 'WCAG 2.2 AA champion. Specializes in building accessible, high-performance web components for global e-commerce enterprise applications.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    location: 'London, UK',
    socials: { twitter: '#', github: '#' }
  },
  {
    id: 'team-4',
    name: 'David Kalu',
    role: 'Director of Sustainable Supply Chains',
    bio: 'Leads CLINZA’s sustainable packaging initiative, verified component sourcing, and energy-efficient logistics.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    location: 'Berlin, Germany',
    socials: { linkedin: '#', github: '#' }
  }
];

const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'WCAG 2.2 AA Certified',
    issuer: 'W3C Accessibility Standards Council',
    badge: '100% Compliant',
    description: 'Audited and verified accessible touch targets, color contrast, keyboard navigation, and screen reader compatibility.',
    verified: true
  },
  {
    id: 'cert-2',
    title: 'Certified B Corporation',
    issuer: 'B Lab Global Network',
    badge: 'Impact Score 94.2',
    description: 'Meets the highest verified standards of social and environmental performance, public transparency, and legal accountability.',
    verified: true
  },
  {
    id: 'cert-3',
    title: 'ISO 9001:2026 Quality Management',
    issuer: 'International Organization for Standardization',
    badge: 'Zero Defect Policy',
    description: 'Strict acoustic calibration and hardware component tolerance testing down to ±0.1dB variance across batch productions.',
    verified: true
  },
  {
    id: 'cert-4',
    title: 'Shopify Liquid 2.0 Gold Partner',
    issuer: 'Shopify Engineering Guild',
    badge: '95+ Lighthouse',
    description: 'Engineered on Nova Commerce Framework (NCF) with 100% clean Theme Check status and zero cumulative layout shift.',
    verified: true
  }
];

const TIMELINE_EVENTS = [
  {
    year: '2020',
    title: 'Founded in San Francisco',
    description: 'Started as an acoustic research lab building custom open-back headphones for studio mastering engineers.'
  },
  {
    year: '2022',
    title: 'Beryllium Transducer Breakthrough',
    description: 'Patented ultra-light weight vapor-deposited beryllium diaphragms reducing total harmonic distortion under 0.05%.'
  },
  {
    year: '2024',
    title: 'NCF Open Architecture Launch',
    description: 'Expanded from hardware to building the Nova Commerce Framework — an open-source storefront engine for modern e-commerce.'
  },
  {
    year: '2026',
    title: '500,000 Global Audiophiles & B-Corp',
    description: 'Surpassed 500k active hardware devices deployed across 84 countries while achieving full B-Corp carbon-neutral status.'
  }
];

interface AboutViewProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
  onNavigateStore?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateHome,
  onNavigateContact,
  onNavigateStore
}) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'values' | 'certifications'>('mission');

  // Schema.org Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CLINZA Electronics',
    url: 'https://clinza.com',
    logo: 'https://clinza.com/logo.png',
    description: 'Trending consumer electronics, smartwatches, true wireless audio, and fast charging gear designed for modern digital lifestyles in India.',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'CLINZA Electronics Pvt Ltd, 12th Main Indiranagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560038',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-800-CLINZA',
      contactType: 'customer support',
      email: 'support@clinza.com'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SeoMeta
        title="About Us - CLINZA Electronics"
        description="Learn about CLINZA's mission to deliver certified trending electronics, AMOLED smartwatches, 42dB hybrid ANC earbuds, and 65W GaN fast chargers across India."
        schemaData={organizationSchema}
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Store', onClick: onNavigateHome },
          { label: 'About Us', active: true }
        ]}
        badge="Engineered For Everyday Life"
        title="Certified Electronics. Uncompromised Reliability."
        description="CLINZA designs and delivers trending consumer electronics across India — prioritizing battery endurance, premium sound clarity, durable materials, and dedicated customer service."
        cta={{
          label: 'Explore Catalog',
          onClick: () => onNavigateStore?.(),
          icon: <ArrowRight className="w-4 h-4" />,
          variant: 'primary'
        }}
      />

      {/* Hero Banner Grid */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-2xl p-8 sm:p-12 lg:p-16">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>San Francisco Acoustic Research Lab</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Uncompromising Fidelity for Audiophiles & Developers
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Founded by electronics specialists and direct-to-consumer architects, CLINZA was built on a single premise: premium personal electronics, audio, and wearables should never compromise on speed, precision, or affordability.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={onNavigateContact}
                className="btn btn-primary text-xs font-bold py-3 px-6 gap-2"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className="btn btn-outline border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-bold py-3 px-6"
              >
                View Certifications
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur space-y-2">
              <div className="text-3xl font-mono font-black text-sky-400">0.05%</div>
              <div className="text-xs font-semibold text-slate-300 uppercase font-mono">Total Harmonic Distortion</div>
              <p className="text-[11px] text-slate-400 leading-snug">Precision driver calibration across all acoustic ranges.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur space-y-2">
              <div className="text-3xl font-mono font-black text-emerald-400">95+</div>
              <div className="text-xs font-semibold text-slate-300 uppercase font-mono">Lighthouse Score</div>
              <p className="text-[11px] text-slate-400 leading-snug">Zero CLS, zero liquid bloat, instant page responses.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur space-y-2">
              <div className="text-3xl font-mono font-black text-amber-400">500k+</div>
              <div className="text-xs font-semibold text-slate-300 uppercase font-mono">Global Hardware Users</div>
              <p className="text-[11px] text-slate-400 leading-snug">Deployed across studios, homes, and offices worldwide.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur space-y-2">
              <div className="text-3xl font-mono font-black text-purple-400">100%</div>
              <div className="text-xs font-semibold text-slate-300 uppercase font-mono">WCAG 2.2 AA Audited</div>
              <p className="text-[11px] text-slate-400 leading-snug">Universal accessibility designed into every control.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mission, Vision & Values Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
          <button
            onClick={() => setActiveTab('mission')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'mission'
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Mission & Vision
          </button>
          <button
            onClick={() => setActiveTab('values')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'values'
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Core Values
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'certifications'
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Certifications & Audits
          </button>
        </div>

        {activeTab === 'mission' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Democratizing high-performance acoustic hardware and open-source e-commerce engineering. We manufacture precision equipment that respects audio fidelity, environmental resources, and accessibility standards.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Setting the gold standard for global consumer electronics and modular Shopify themes. We aim for a world where every hardware component is repairable, transparently sourced, and built to perform for decades.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Cpu className="w-8 h-8 text-sky-500" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Precision Engineering</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No cheap plastics or artificially boosted bass. Pure physical materials and flat acoustic responses.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <HeartHandshake className="w-8 h-8 text-emerald-500" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Radical Transparency</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Full component bill of materials, harmonic frequency response charts, and open Liquid theme code.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Feather className="w-8 h-8 text-purple-500" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">WCAG Accessibility</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every software interface and hardware control is designed for universal usability and tactile clarity.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-amber-500" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Lifetime Support</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                2-year NovaCare warranty standard, modular spare parts availability, and zero planned obsolescence.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{cert.title}</h4>
                    <span className="badge badge--sky font-mono text-[10px]">{cert.badge}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">{cert.issuer}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Company History & Milestones */}
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="space-y-2 max-w-xl">
          <span className="badge uppercase font-mono text-xs">Journey</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Milestones & Company Timeline
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            From a garage research lab in San Francisco to a globally recognized hardware & theme framework organization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {TIMELINE_EVENTS.map((evt, idx) => (
            <div key={idx} className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
              <div className="text-2xl font-black font-mono text-sky-600 dark:text-sky-400">
                {evt.year}
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{evt.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {evt.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="badge uppercase font-mono text-xs">Leadership</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Meet the Engineering & Product Team
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden space-y-4 hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>{member.location}</span>
                </div>
              </div>
              <div className="p-5 pt-0 space-y-2">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">{member.name}</h4>
                  <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                    {member.role}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
