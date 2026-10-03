import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import { ContentBlock } from '../types/blog';

interface BlogTableOfContentsProps {
  blocks: ContentBlock[];
}

export const BlogTableOfContents: React.FC<BlogTableOfContentsProps> = ({ blocks }) => {
  const [isOpen, setIsOpen] = useState(true);

  const headings = blocks.filter((b) => b.type === 'heading' && b.content);

  if (headings.length === 0) return null;

  const scrollToHeading = (text: string) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider min-h-[44px]"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-sky-500" />
          <span>Table of Contents ({headings.length})</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <nav aria-label="Table of contents" className="pt-2 border-t border-slate-200/60 dark:border-slate-700 space-y-1 text-xs">
          {headings.map((h, i) => (
            <button
              key={i}
              onClick={() => scrollToHeading(h.content || '')}
              className={`block w-full text-left py-1.5 px-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-sky-600 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition truncate font-mono ${
                h.level === 3 ? 'pl-6 text-[11px]' : 'font-bold'
              }`}
            >
              • {h.content}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};
