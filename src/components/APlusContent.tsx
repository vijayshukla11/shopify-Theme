import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  Feather,
  CheckCircle2,
  HelpCircle,
  Compass
} from 'lucide-react';
import {
  APlusContentData,
  APlusSection,
  APlusHeroStorySection,
  APlusImageTextSection,
  APlusFeatureGridSection,
  APlusDetailStorySection,
  APlusStyleGuideSection,
  APlusFullBannerSection,
  APlusSpecTableSection,
  APlusFaqSection
} from '../types/product';

interface APlusContentProps {
  aPlusContent?: APlusContentData;
  productName?: string;
}

/* ------------------------------------------------------------------------- */
/* 01. HERO STORY MODULE                                                     */
/* ------------------------------------------------------------------------- */
const HeroStoryModule: React.FC<{ section: APlusHeroStorySection; productName?: string }> = ({
  section,
  productName
}) => {
  const isDark = section.theme === 'dark';
  const overlayPos = section.overlayPosition || 'center';

  const positionClasses = {
    left: 'items-center justify-start text-left',
    right: 'items-center justify-end text-left',
    center: 'items-center justify-center text-center',
    bottom: 'items-end justify-center text-center pb-12 sm:pb-16'
  }[overlayPos];

  return (
    <section className="relative w-full overflow-hidden bg-stone-900 rounded-2xl md:rounded-3xl my-8 md:my-14 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
      <img
        src={section.imageUrl}
        alt={section.headline || productName || 'Editorial Campaign'}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82] transition-transform duration-1000 ease-out hover:scale-105"
      />

      {/* Atmospheric Subtle Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

      {/* Content Container */}
      <div className={`relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex ${positionClasses}`}>
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          {(section.tagline || section.subheadline) && (
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-stone-300">
              {section.tagline || section.subheadline}
            </p>
          )}

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white uppercase leading-[1.12]">
            {section.headline}
          </h2>

          {section.description && (
            <p className="text-xs sm:text-sm text-stone-200/90 font-normal leading-relaxed max-w-lg">
              {section.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------- */
/* 02. IMAGE + TEXT SPLIT MODULE                                             */
/* ------------------------------------------------------------------------- */
const ImageTextModule: React.FC<{ section: APlusImageTextSection }> = ({ section }) => {
  const isImageRight = section.imagePosition === 'right';

  return (
    <section className="my-8 md:my-16 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Image Column */}
        <div
          className={`lg:col-span-6 ${
            isImageRight ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="relative aspect-[4/5] sm:aspect-[1/1] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-xs group">
            <img
              src={section.imageUrl}
              alt={section.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            {section.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-semibold tracking-wider uppercase rounded-full shadow-xs">
                {section.badge}
              </span>
            )}
          </div>
        </div>

        {/* Text Column */}
        <div
          className={`lg:col-span-6 space-y-4 sm:space-y-6 ${
            isImageRight ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
          }`}
        >
          {section.subtitle && (
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-stone-500 block">
              {section.subtitle}
            </span>
          )}

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-stone-900 tracking-tight leading-tight">
            {section.title}
          </h3>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
            {section.body}
          </p>

          {section.features && section.features.length > 0 && (
            <div className="pt-2 space-y-2.5">
              {section.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-900 mt-2 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------- */
/* 03. FEATURE GRID MODULE                                                   */
/* ------------------------------------------------------------------------- */
const FeatureGridModule: React.FC<{ section: APlusFeatureGridSection }> = ({ section }) => {
  const colCount = section.columns || 4;

  const gridClass =
    colCount === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="my-8 md:my-16 py-8 border-y border-stone-200/80">
      {(section.title || section.subtitle) && (
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10 sm:mb-12">
          {section.subtitle && (
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-stone-500 block">
              {section.subtitle}
            </span>
          )}
          {section.title && (
            <h3 className="text-xl sm:text-2xl font-light text-stone-900 uppercase tracking-tight">
              {section.title}
            </h3>
          )}
        </div>
      )}

      <div className={`grid ${gridClass} gap-8 sm:gap-10`}>
        {section.items.map((item, idx) => {
          const numberLabel = item.number || `0${idx + 1}`;
          return (
            <div key={idx} className="space-y-3 group">
              <span className="text-2xl sm:text-3xl font-light text-stone-300 group-hover:text-stone-900 transition-colors duration-300 font-mono block">
                {numberLabel}
              </span>
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-900">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------- */
/* 04. DETAIL STORY (CRAFTSMANSHIP) MODULE                                  */
/* ------------------------------------------------------------------------- */
const DetailStoryModule: React.FC<{ section: APlusDetailStorySection }> = ({ section }) => {
  return (
    <section className="my-8 md:my-16 py-4">
      <div className="space-y-8">
        <div className="max-w-xl space-y-2">
          {section.subtitle && (
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-stone-500 block">
              {section.subtitle}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-tight">
            {section.title}
          </h3>
          {section.description && (
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {section.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {section.cards.map((card, idx) => (
            <div key={idx} className="space-y-3.5 group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-xs">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-900">
                  {card.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {card.description}
                </p>
                {card.caption && (
                  <span className="text-[11px] text-stone-400 italic block pt-1">
                    {card.caption}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------- */
/* 05. STYLE GUIDE (HOW TO STYLE) MODULE                                     */
/* ------------------------------------------------------------------------- */
const StyleGuideModule: React.FC<{ section: APlusStyleGuideSection }> = ({ section }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="my-8 md:my-16 py-8 bg-stone-50/70 rounded-2xl md:rounded-3xl p-6 sm:p-10 border border-stone-200/60">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-stone-500 block mb-1">
            {section.subtitle || 'CURATED LOOKS'}
          </span>
          <h3 className="text-xl sm:text-3xl font-light text-stone-900 tracking-tight uppercase">
            {section.title || 'HOW TO STYLE'}
          </h3>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex sm:hidden items-center gap-2 self-end">
          <button
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            disabled={activeSlide === 0}
            className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              setActiveSlide((prev) => Math.min(section.looks.length - 1, prev + 1))
            }
            disabled={activeSlide === section.looks.length - 1}
            className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Grid / Mobile Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {section.looks.map((look, idx) => (
          <div
            key={idx}
            className={`space-y-4 group transition-all duration-300 ${
              idx === activeSlide ? 'block' : 'hidden sm:block'
            }`}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-200/60 border border-stone-200/80 shadow-xs">
              <img
                src={look.imageUrl}
                alt={look.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-stone-900/90 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-widest rounded-md">
                {look.lookNumber || `LOOK 0${idx + 1}`}
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-900">
                {look.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {look.pairingDescription}
              </p>
              {look.tags && look.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {look.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium text-stone-500 bg-stone-200/70 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------- */
/* 06. FULL WIDTH BANNER MODULE                                              */
/* ------------------------------------------------------------------------- */
const FullBannerModule: React.FC<{ section: APlusFullBannerSection }> = ({ section }) => {
  return (
    <section className="relative w-full overflow-hidden bg-stone-950 rounded-2xl md:rounded-3xl my-8 md:my-16 aspect-[16/9] sm:aspect-[21/9]">
      <img
        src={section.imageUrl}
        alt={section.headline}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover filter brightness-75 transition-transform duration-1000 ease-out hover:scale-103"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center">
        <div className="max-w-xl space-y-3 sm:space-y-4">
          {section.tagline && (
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-stone-300 block">
              {section.tagline}
            </span>
          )}
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-white leading-tight">
            {section.headline}
          </h3>
          {section.description && (
            <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-normal max-w-md">
              {section.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------- */
/* 07. SPECIFICATION TABLE MODULE                                            */
/* ------------------------------------------------------------------------- */
const SpecTableModule: React.FC<{ section: APlusSpecTableSection }> = ({ section }) => {
  const validRows = section.rows?.filter((r) => r.label && r.value) || [];
  if (validRows.length === 0) return null;

  return (
    <section className="my-8 md:my-14 max-w-3xl mx-auto">
      {section.title && (
        <h3 className="text-base sm:text-lg font-medium text-stone-900 uppercase tracking-wider mb-6 text-center sm:text-left">
          {section.title}
        </h3>
      )}

      <div className="border-t border-stone-200 divide-y divide-stone-100">
        {validRows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-12 py-3 sm:py-3.5 text-xs sm:text-sm">
            <span className="col-span-5 sm:col-span-4 font-medium text-stone-500">
              {row.label}
            </span>
            <span className="col-span-7 sm:col-span-8 font-normal text-stone-900">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------- */
/* 08. FAQ MODULE                                                            */
/* ------------------------------------------------------------------------- */
const FaqModule: React.FC<{ section: APlusFaqSection }> = ({ section }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items = section.items?.filter((i) => i.question && i.answer) || [];
  if (items.length === 0) return null;

  return (
    <section className="my-8 md:my-16 max-w-3xl mx-auto py-6">
      <div className="space-y-2 mb-6 text-center sm:text-left">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-stone-500 block">
          HELP & INQUIRIES
        </span>
        <h3 className="text-xl sm:text-2xl font-light text-stone-900 tracking-tight uppercase">
          {section.title || 'FREQUENTLY ASKED QUESTIONS'}
        </h3>
      </div>

      <div className="border-t border-stone-200 divide-y divide-stone-200/80">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 text-left group"
              >
                <span className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed pr-6 font-normal">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ========================================================================= */
/* MAIN A+ CONTENT CONTAINER COMPONENT                                       */
/* Strict Conditional Rendering: ZERO visual footprint if disabled or empty */
/* ========================================================================= */
export const APlusContent: React.FC<APlusContentProps> = ({
  aPlusContent,
  productName
}) => {
  // If A+ is disabled or has no sections, render ZERO visual footprint
  if (
    !aPlusContent ||
    aPlusContent.enabled === false ||
    !Array.isArray(aPlusContent.sections) ||
    aPlusContent.sections.length === 0
  ) {
    return null;
  }

  return (
    <div className="w-full mt-12 sm:mt-16 pt-8 border-t border-stone-200/80 space-y-8 sm:space-y-12">
      {aPlusContent.sections.map((section, idx) => {
        switch (section.type) {
          case 'hero_story':
            return (
              <HeroStoryModule
                key={section.id || idx}
                section={section as APlusHeroStorySection}
                productName={productName}
              />
            );
          case 'image_text':
            return (
              <ImageTextModule
                key={section.id || idx}
                section={section as APlusImageTextSection}
              />
            );
          case 'feature_grid':
            return (
              <FeatureGridModule
                key={section.id || idx}
                section={section as APlusFeatureGridSection}
              />
            );
          case 'detail_story':
            return (
              <DetailStoryModule
                key={section.id || idx}
                section={section as APlusDetailStorySection}
              />
            );
          case 'style_guide':
            return (
              <StyleGuideModule
                key={section.id || idx}
                section={section as APlusStyleGuideSection}
              />
            );
          case 'full_banner':
            return (
              <FullBannerModule
                key={section.id || idx}
                section={section as APlusFullBannerSection}
              />
            );
          case 'spec_table':
            return (
              <SpecTableModule
                key={section.id || idx}
                section={section as APlusSpecTableSection}
              />
            );
          case 'faq':
            return (
              <FaqModule
                key={section.id || idx}
                section={section as APlusFaqSection}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
