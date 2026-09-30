import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Search,
  CheckCircle2,
  FileText,
  AlertCircle,
  Wrench,
  Cpu,
  HelpCircle,
  Send,
  Sparkles
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface WarrantyViewProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

export const WarrantyView: React.FC<WarrantyViewProps> = ({
  onNavigateHome,
  onNavigateContact
}) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [serialCheckResult, setSerialCheckResult] = useState<{
    valid: boolean;
    productName?: string;
    warrantyStatus?: string;
    expDate?: string;
    coverageType?: string;
  } | null>(null);

  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [claimSerial, setClaimSerial] = useState('');
  const [claimIssue, setClaimIssue] = useState('');
  const [claimEmail, setClaimEmail] = useState('');

  const handleCheckSerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;

    setSerialCheckResult({
      valid: true,
      productName: 'Nova Sound Pro Wireless Headphones',
      warrantyStatus: 'Active - 2-Year NovaCare Coverage',
      expDate: 'October 24, 2027',
      coverageType: 'Full Replacement + Lifetime Acoustic Assembly'
    });
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimSerial || !claimEmail) return;
    setClaimSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SeoMeta
        title="NovaCare 2-Year Hardware Warranty & Serial Check - Nova Tech"
        description="Verify hardware serial numbers, register 2-year NovaCare coverage, submit acoustic RMA replacement claims, and inspect lifetime driver guarantees."
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Store', onClick: onNavigateHome },
          { label: 'Warranty & Guarantee', active: true }
        ]}
        badge="Zero Defect Commitment"
        title="NovaCare 2-Year Limited Hardware Warranty"
        description="Every Nova Tech hardware device comes backed by our standard 2-Year NovaCare warranty and lifetime acoustic driver calibration guarantee."
      />

      {/* Serial Number Checker Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="badge badge--sky font-mono text-[10px] uppercase">Instant Lookup</span>
            <h3 className="text-xl font-bold">Check Hardware Warranty Status</h3>
            <p className="text-xs text-slate-300">Enter the 12-digit serial number found on your product box or hardware headband.</p>
          </div>
          <form onSubmit={handleCheckSerial} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="e.g. NV-9482-1049..."
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-64"
            />
            <button type="submit" className="btn btn-primary text-xs font-bold py-2.5 px-5 shrink-0">
              <Search className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </form>
        </div>

        {serialCheckResult && (
          <div className="p-4 rounded-xl bg-slate-800/80 border border-emerald-500/30 text-xs space-y-2 animate-fadeIn font-mono">
            <div className="flex items-center justify-between gap-2 text-emerald-400 font-bold">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{serialCheckResult.productName}</span>
              </span>
              <span className="badge badge--success text-[10px]">{serialCheckResult.warrantyStatus}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px] pt-2 border-t border-slate-700">
              <div><strong className="text-slate-400">Coverage Valid Until:</strong> {serialCheckResult.expDate}</div>
              <div><strong className="text-slate-400">Tier:</strong> {serialCheckResult.coverageType}</div>
            </div>
          </div>
        )}
      </div>

      {/* Warranty Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">2-Year Full Coverage</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Covers all internal acoustic drivers, DAC circuitry, Bluetooth radios, battery cells, and physical headband assemblies.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Lifetime Driver Guarantee</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            If your beryllium transducer diaphragm fails or develops acoustic rattle at any point during its lifecycle, we replace the driver core free of charge.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Advance Replacement RMA</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Don't wait for repairs. We ship a replacement unit first with a prepaid box so your listening experience is never interrupted.
          </p>
        </div>
      </div>

      {/* Submit Claim Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
        <div className="space-y-1">
          <span className="badge uppercase font-mono text-xs">Support Ticket</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            File a NovaCare Warranty Claim
          </h3>
          <p className="text-xs text-slate-500">
            Submit your hardware issue details. Our engineering support team responds within 12 hours.
          </p>
        </div>

        {claimSubmitted ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Claim RMA Created Successfully!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              RMA Ticket #RMA-84920 has been assigned to your serial <strong>{claimSerial}</strong>. Follow instructions sent to <strong>{claimEmail}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleClaimSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                  Hardware Serial Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="NV-xxxx-xxxx"
                  value={claimSerial}
                  onChange={(e) => setClaimSerial(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={claimEmail}
                  onChange={(e) => setClaimEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                Description of Acoustic / Physical Defect
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe frequency distortion, power connectivity issue, or physical headband defect..."
                value={claimIssue}
                onChange={(e) => setClaimIssue(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button type="submit" className="btn btn-primary text-xs font-bold py-3 px-8 gap-2">
              <Send className="w-4 h-4" />
              <span>Submit Warranty Claim</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
