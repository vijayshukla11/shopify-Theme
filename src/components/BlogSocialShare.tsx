import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';

interface BlogSocialShareProps {
  title: string;
  url?: string;
}

export const BlogSocialShare: React.FC<BlogSocialShareProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const pageUrl = url || window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`;
  const shareLinkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="font-mono text-slate-400 font-bold uppercase flex items-center gap-1 mr-1">
        <Share2 className="w-3.5 h-3.5 text-sky-500" /> Share:
      </span>

      <a
        href={shareTwitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Share on Twitter / X"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <a
        href={shareLinkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <a
        href={shareFacebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>

      <button
        onClick={handleCopy}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 transition min-h-[44px] min-w-[44px] flex items-center justify-center gap-1 font-mono text-[11px]"
        aria-label="Copy Article URL"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};
