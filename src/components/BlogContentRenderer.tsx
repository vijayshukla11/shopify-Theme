import React, { useState } from 'react';
import {
  Copy,
  Check,
  AlertTriangle,
  Info,
  Lightbulb,
  CheckCircle2,
  Plus,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Quote
} from 'lucide-react';
import { ContentBlock } from '../types/blog';

interface BlogContentRendererProps {
  blocks: ContentBlock[];
  onAddToCart?: (product: any) => void;
}

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({
  blocks,
  onAddToCart
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyCode = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
      {blocks.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id} className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {block.content}
              </p>
            );

          case 'heading': {
            const idTag = block.content ? block.content.toLowerCase().replace(/[^a-z0-0]+/g, '-') : block.id;
            if (block.level === 3) {
              return (
                <h3
                  key={block.id}
                  id={idTag}
                  className="text-lg font-bold text-slate-900 dark:text-white pt-4 pb-1 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                  {block.content}
                </h3>
              );
            }
            return (
              <h2
                key={block.id}
                id={idTag}
                className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight pt-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
              >
                {block.content}
              </h2>
            );
          }

          case 'quote':
            return (
              <blockquote
                key={block.id}
                className="my-6 p-5 bg-sky-500/5 dark:bg-sky-500/10 border-l-4 border-sky-500 rounded-r-2xl space-y-2 relative"
              >
                <Quote className="w-8 h-8 text-sky-500/20 absolute right-4 top-4" />
                <p className="text-sm sm:text-base font-medium italic text-slate-900 dark:text-slate-100">
                  "{block.content}"
                </p>
                {block.authorQuote && (
                  <cite className="block text-xs font-mono font-bold text-sky-600 dark:text-sky-400 not-italic">
                    — {block.authorQuote}
                  </cite>
                )}
              </blockquote>
            );

          case 'callout': {
            const typeConfig = {
              warning: {
                bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
                icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              },
              tip: {
                bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
                icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />
              },
              info: {
                bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200',
                icon: <Info className="w-5 h-5 text-sky-600 shrink-0" />
              },
              success: {
                bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 text-teal-900 dark:text-teal-200',
                icon: <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              }
            }[block.calloutType || 'info'];

            return (
              <div
                key={block.id}
                className={`my-6 p-4 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm ${typeConfig.bg}`}
              >
                {typeConfig.icon}
                <div className="flex-1 min-w-0 font-medium leading-relaxed">{block.content}</div>
              </div>
            );
          }

          case 'code':
            return (
              <div
                key={block.id}
                className="my-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg text-xs font-mono"
              >
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-slate-400">
                  <span className="text-[11px] font-bold uppercase text-sky-400">
                    {block.language || 'code'} snippet
                  </span>
                  <button
                    onClick={() => handleCopyCode(block.id, block.content || '')}
                    className="flex items-center gap-1 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition min-h-[32px]"
                  >
                    {copiedCodeId === block.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-sky-300 leading-relaxed custom-scrollbar">
                  <code>{block.content}</code>
                </pre>
              </div>
            );

          case 'table':
            return (
              <div
                key={block.id}
                className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs bg-white dark:bg-slate-900"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white uppercase">
                      <tr>
                        {block.tableHeaders?.map((header, i) => (
                          <th key={i} className="p-3 font-extrabold border-b border-slate-200 dark:border-slate-700">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {block.tableRows?.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-3 text-slate-700 dark:text-slate-300">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case 'product_callout':
            if (!block.product) return null;
            return (
              <div
                key={block.id}
                className="my-6 p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={block.product.image}
                    alt={block.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-800 border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      Featured Equipment Recommendation
                    </span>
                    <h4 className="font-extrabold text-sm text-white truncate">{block.product.name}</h4>
                    <p className="text-xs text-slate-300 italic">{block.product.reason}</p>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-extrabold text-sky-400">${block.product.price.toFixed(2)}</span>
                      {block.product.originalPrice && (
                        <s className="text-[10px] text-slate-500">${block.product.originalPrice.toFixed(2)}</s>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onAddToCart?.({
                      id: block.product?.productId,
                      name: block.product?.name,
                      price: block.product?.price,
                      image: block.product?.image,
                      category: block.product?.category,
                      inStock: true
                    })
                  }
                  className="btn btn-primary btn-md w-full sm:w-auto font-extrabold text-xs uppercase tracking-wider shrink-0 gap-2 min-h-[44px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Quick Add to Cart</span>
                </button>
              </div>
            );

          case 'faq':
            return (
              <div key={block.id} className="my-6 space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Frequently Asked Technical Questions
                </h3>
                <div className="space-y-2">
                  {block.faqItems?.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="w-full p-4 text-left flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 min-h-[44px]"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-sky-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
