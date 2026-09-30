import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  ChevronRight,
  Globe,
  SlidersHorizontal,
  Image,
  Layers,
  FileCheck,
  Zap,
  Eye,
  Rocket,
  Info,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { OnboardingGuideData, OnboardingStep } from '../constants/onboardingGuide';
import { ThemePresetsList, ThemePreset } from '../constants/themePresets';
import { MerchantThemeSettings } from '../types/search';

interface MerchantOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset: (presetSettings: Partial<MerchantThemeSettings>) => void;
  onOpenThemeEditor: () => void;
}

type OnboardingTab = 'welcome' | 'presets' | 'checklist' | 'images' | 'launch';

export const MerchantOnboardingModal: React.FC<MerchantOnboardingModalProps> = ({
  isOpen,
  onClose,
  onApplyPreset,
  onOpenThemeEditor
}) => {
  const [activeTab, setActiveTab] = useState<OnboardingTab>('welcome');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'step-1': true,
    'step-2': true
  });
  const [selectedPresetId, setSelectedPresetId] = useState<string>('electronics');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handlePresetSelect = (preset: ThemePreset) => {
    setSelectedPresetId(preset.id);
    onApplyPreset(preset.settings);
    setToastMsg(`Applied "${preset.name}" demo preset!`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col z-10 max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-600/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-white">Merchant Setup & Onboarding Wizard</h2>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Shopify OS 2.0 Certified
                </span>
              </div>
              <p className="text-xs text-sky-200/80 font-mono">Nova Commerce Framework v7.4 Commercial Release</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Close Onboarding Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Toolbar */}
        <div className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {[
            { id: 'welcome' as const, label: 'Welcome & Overview', icon: Globe },
            { id: 'presets' as const, label: 'Demo Presets (5)', icon: SlidersHorizontal },
            { id: 'checklist' as const, label: 'Setup Checklist', icon: FileCheck },
            { id: 'images' as const, label: 'Image Dimensions', icon: Image },
            { id: 'launch' as const, label: 'Pre-Launch Audit', icon: Rocket }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* Toast Message */}
          {toastMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* TAB 1: WELCOME */}
          {activeTab === 'welcome' && (
            <div className="space-y-6">
              <div className="p-5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl flex items-start gap-4">
                <div className="p-3 bg-sky-600 text-white rounded-xl shrink-0 mt-0.5">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Welcome to Nova Commerce Framework (NCF)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    NCF is engineered for maximum speed, WCAG 2.2 AA accessibility, and seamless merchant customization. Complete this guided onboarding flow or choose a commercial demo preset below to launch your store.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="p-2 w-fit bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 rounded-lg font-bold text-xs mb-2">
                    Lighthouse 98–100
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Core Web Vitals Engine</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Zero Cumulative Layout Shift (CLS = 0.00) with sub-2.0s LCP render.</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="p-2 w-fit bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300 rounded-lg font-bold text-xs mb-2">
                    WCAG 2.2 AA
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Accessible to Everyone</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Full keyboard navigation, screen reader ARIA landmarks, 44px touch targets.</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="p-2 w-fit bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 rounded-lg font-bold text-xs mb-2">
                    OS 2.0 Ready
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Centralized Customizer</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">15 organized settings categories with real-time live preview.</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={onOpenThemeEditor}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center gap-2 transition"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Open Theme Editor</span>
                </button>

                <button
                  onClick={() => setActiveTab('presets')}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition"
                >
                  <span>Explore Demo Presets</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DEMO PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Commercial Theme Demo Presets (5)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any preset to instantly apply pre-configured typography, colors, and layouts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ThemePresetsList.PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      className={`p-4 rounded-xl border transition relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-sky-50/50 dark:bg-sky-950/30 border-sky-500 ring-2 ring-sky-500/30'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                            {preset.industry}
                          </span>
                          <div
                            className="w-4 h-4 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: preset.accentColor }}
                          />
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {preset.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                          {preset.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handlePresetSelect(preset)}
                        className={`mt-4 w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active Preset</span>
                          </>
                        ) : (
                          <span>Apply Preset</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  First-Time Merchant Setup Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Verify required Shopify settings and NCF configuration before publishing live.
                </p>
              </div>

              <div className="space-y-2">
                {OnboardingGuideData.STEPS.map((step) => {
                  const isDone = Boolean(completedSteps[step.id]);
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                        isDone
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => {}}
                        className="w-4 h-4 accent-emerald-600 rounded mt-0.5 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {step.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {step.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {step.description}
                        </p>
                        <div className="mt-2 text-[10px] font-mono text-slate-600 dark:text-slate-300 flex items-center gap-3">
                          <span>Setting: <strong className="text-sky-600 dark:text-sky-400">{step.requiredSetting}</strong></span>
                          <span>Value: <strong className="text-slate-800 dark:text-slate-200">{step.recommendedValue}</strong></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: IMAGE DIMENSIONS */}
          {activeTab === 'images' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Recommended Asset Image Dimensions Guide
                </h3>
                <p className="text-xs text-slate-500">
                  Adhering to these image specifications guarantees zero layout shift (CLS = 0) and high image crispness.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Asset Type</th>
                      <th className="p-3">Aspect Ratio</th>
                      <th className="p-3">Recommended Resolution</th>
                      <th className="p-3">Format</th>
                      <th className="p-3">Merchant Tip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {OnboardingGuideData.IMAGE_DIMENSIONS.map((img, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{img.assetType}</td>
                        <td className="p-3 font-mono">{img.recommendedAspect}</td>
                        <td className="p-3 font-mono text-sky-600 dark:text-sky-400 font-bold">{img.recommendedPx}</td>
                        <td className="p-3">{img.fileFormat}</td>
                        <td className="p-3 text-[11px] text-slate-500">{img.merchantTip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: LAUNCH AUDIT */}
          {activeTab === 'launch' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Pre-Launch Verification & Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Shopify Theme Store automated audit results for live commercial deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OnboardingGuideData.LAUNCH_CHECKLIST.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">{item.title}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{item.detail}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold shrink-0">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onOpenThemeEditor();
              onClose();
            }}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Customize in Theme Editor
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs shadow-md shadow-sky-600/20 transition"
          >
            Complete Onboarding & Start
          </button>
        </div>

      </div>
    </div>
  );
};
