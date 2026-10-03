import React, { useState } from 'react';
import {
  Mail,
  Send,
  Upload,
  CheckCircle2,
  Paperclip,
  X,
  Clock,
  DollarSign,
  Briefcase,
  AlertCircle,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { StatusBadge } from './StatusBadge';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface ContactViewProps {
  initialServiceId?: string;
  initialIndustryName?: string;
  initialTechName?: string;
  initialCaseStudyId?: string;
  onNavigateHome?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  initialServiceId,
  initialIndustryName,
  initialTechName,
  initialCaseStudyId,
  onNavigateHome
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (initialServiceId) {
      const match = SERVICES_DATA.find((s) => s.id === initialServiceId);
      return match ? [match.title] : [];
    }
    return [];
  });

  const [projectType, setProjectType] = useState<string>('Shopify Store Project');
  const [budgetRange, setBudgetRange] = useState<string>('$5,000 - $10,000');
  const [timeline, setTimeline] = useState<string>('2 - 4 Weeks');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [message, setMessage] = useState<string>(() => {
    let msg = '';
    if (initialIndustryName) {
      msg += `Interested in e-commerce solutions for the ${initialIndustryName} industry.\n`;
    }
    if (initialTechName) {
      msg += `Inquiring about project execution leveraging ${initialTechName}.\n`;
    }
    if (initialCaseStudyId) {
      msg += `Referencing case study [${initialCaseStudyId}] architecture.\n`;
    }
    return msg;
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const availableServices = SERVICES_DATA.map((s) => s.title);

  const projectTypeOptions = [
    'Shopify Store Project',
    'Monthly Store Retainer & Support',
    'Catalog & Metafield Refactor',
    'Analytics & Dashboard Build',
    'Performance & Speed Audit',
    'Custom Theme Engineering',
    'Strategic Advisory'
  ];

  const budgetOptions = [
    '< $2,500 (Audit / Quick Advisory)',
    '$2,500 - $5,000 (Focused Feature / SOP)',
    '$5,000 - $10,000 (Theme Refactor / Catalog)',
    '$10,000 - $25,000 (Full Store Build / Plus)',
    '$25,000+ (Enterprise Multi-Store)',
    'Monthly Retainer ($2,000 - $5,000/mo)'
  ];

  const timelineOptions = [
    'Immediate (Urgent Hotfix / SLA)',
    '1 - 2 Weeks',
    '2 - 4 Weeks',
    '1 - 2 Months',
    'Flexible / Ongoing'
  ];

  const toggleServiceSelection = (srvTitle: string) => {
    setSelectedServices((prev) =>
      prev.includes(srvTitle) ? prev.filter((t) => t !== srvTitle) : [...prev, srvTitle]
    );
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate intake processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Project Scope Inquiry & Contact Intake"
        description="Initiate a detailed Shopify or e-commerce engineering project inquiry specifying services of interest, budget range, timeline, and RFP documentation."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Platform', onClick: onNavigateHome },
          { label: 'Contact & Scope Intake', active: true }
        ]}
        badge="Direct Technical Intake"
        title="Initiate Project Scope Inquiry"
        description="Provide details about your store goals, required services, target budget, and timeline. Receive a tailored scope response within 24 hours."
        cta={{
          label: 'Direct Email',
          onClick: () => window.location.href = 'mailto:support@clinza.com',
          icon: <Mail className="w-4 h-4" />,
          variant: 'outline'
        }}
      />

      {/* Main Intake Card */}
      {isSubmitted ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/50 p-8 sm:p-12 text-center space-y-6 shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Project Scope Request Received!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Thank you, <strong>{fullName}</strong>. Your project specification has been logged. You will receive a structured scope review and meeting link at <strong>{email}</strong> within 24 hours.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-left max-w-md mx-auto space-y-1">
            <div><strong className="text-slate-500">Project Type:</strong> {projectType}</div>
            <div><strong className="text-slate-500">Selected Services:</strong> {selectedServices.join(', ') || 'General Consultation'}</div>
            <div><strong className="text-slate-500">Budget Range:</strong> {budgetRange}</div>
            <div><strong className="text-slate-500">Target Timeline:</strong> {timeline}</div>
            {attachedFiles.length > 0 && (
              <div><strong className="text-slate-500">Files Attached:</strong> {attachedFiles.length} file(s)</div>
            )}
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setMessage('');
              setSelectedServices([]);
              setAttachedFiles([]);
            }}
            className="btn btn-secondary text-xs font-bold py-2.5 px-6"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-xs">
          {/* Section 1: Services of Interest */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-sky-500" />
              <span>1. Services of Interest (Multi-Select)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {availableServices.map((srv) => {
                const isSelected = selectedServices.includes(srv);
                return (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => toggleServiceSelection(srv)}
                    className={`p-3 rounded-lg text-xs font-semibold text-left border transition-all flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      isSelected
                        ? 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500 font-bold shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate">{srv}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Project Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            {/* Project Type */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 block">
                Project Category
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {projectTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Budget Allocation</span>
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Timeline */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>Target Timeline</span>
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 block">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 block">
                Business Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 block">
                Company / Brand Name
              </label>
              <input
                type="text"
                placeholder="Acme Commerce Ltd."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 block">
                Current Store URL / Domain
              </label>
              <input
                type="url"
                placeholder="https://myshopifystore.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Section 4: Message & Requirements */}
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 block">
              Project Description & Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              placeholder="Describe your current store setup, key friction points, target deliverables, or custom requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Section 5: Optional File Upload */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-purple-500" />
              <span>Attach Specification / RFP / Wireframe Files (Optional)</span>
            </label>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleFileUpload(e.dataTransfer.files);
              }}
              className={`p-6 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer ${
                isDragOver
                  ? 'border-sky-500 bg-sky-500/10'
                  : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 bg-slate-50 dark:bg-slate-950'
              }`}
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Drag and drop specification PDFs, Figma exports, or CSV catalog samples here
              </p>
              <p className="text-[10px] font-mono text-slate-400 mt-1">
                Supports PDF, DOCX, CSV, PNG, ZIP (Max 25MB per file)
              </p>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-input-contact"
              />
              <label
                htmlFor="file-input-contact"
                className="mt-3 inline-block btn btn-secondary text-xs font-bold py-1.5 px-4 cursor-pointer"
              >
                Browse Local Files
              </label>
            </div>

            {/* Uploaded File List */}
            {attachedFiles.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                  Attached Files ({attachedFiles.length}):
                </span>
                <div className="space-y-1">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-400">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-slate-400 hover:text-rose-500 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Action Bar */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Strict Confidentiality Guarantee (NDA Ready)</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary text-xs font-bold py-3 px-8 gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting Scope...' : 'Send Scope Request'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
