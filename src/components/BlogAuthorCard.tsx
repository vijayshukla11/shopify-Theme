import React from 'react';
import { Twitter, Linkedin, Github, Award, BookOpen } from 'lucide-react';
import { BlogAuthor } from '../types/blog';

interface BlogAuthorCardProps {
  author: BlogAuthor;
  articleCount?: number;
}

export const BlogAuthorCard: React.FC<BlogAuthorCardProps> = ({ author, articleCount }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xs">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-20 h-20 rounded-2xl object-cover bg-white shadow-md border-2 border-sky-500/30 shrink-0"
      />

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-sky-600 dark:text-sky-400 tracking-wider block">
              Article Author
            </span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
              {author.name}
            </h4>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 text-slate-400">
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:text-sky-500 hover:border-sky-500 border border-slate-200 dark:border-slate-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`${author.name} on Twitter`}
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:text-sky-600 hover:border-sky-600 border border-slate-200 dark:border-slate-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`${author.name} on LinkedIn`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:text-black dark:hover:text-white hover:border-slate-400 border border-slate-200 dark:border-slate-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`${author.name} on GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs font-mono text-sky-700 dark:text-sky-300 font-semibold">{author.role}</p>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{author.bio}</p>

        {articleCount !== undefined && (
          <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Published {articleCount} technical articles in Nova Journal</span>
          </div>
        )}
      </div>
    </div>
  );
};
