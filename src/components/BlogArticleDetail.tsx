import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Share2,
  Tag,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { BlogPost } from '../types/blog';
import { Breadcrumbs } from './Breadcrumbs';
import { BlogTableOfContents } from './BlogTableOfContents';
import { BlogSocialShare } from './BlogSocialShare';
import { BlogContentRenderer } from './BlogContentRenderer';
import { BlogAuthorCard } from './BlogAuthorCard';
import { BlogNewsletter } from './BlogNewsletter';
import { BlogSeoSchemas } from './BlogSeoSchemas';
import { SeoMeta } from './SeoMeta';

interface BlogArticleDetailProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onBackToBlog: () => void;
  onAddToCart?: (product: any) => void;
}

export const BlogArticleDetail: React.FC<BlogArticleDetailProps> = ({
  post,
  allPosts,
  onSelectPost,
  onBackToBlog,
  onAddToCart
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track Reading Progress bar percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Previous & Next articles logic
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Related posts (same category or tags)
  const relatedPosts = allPosts.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-16">
      <SeoMeta
        title={post.metaTitle || `${post.title} | NCF Journal`}
        description={post.metaDescription || post.excerpt}
      />
      <BlogSeoSchemas post={post} />

      {/* FEATURE 4: STICKY READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-sky-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Engineering Journal', action: onBackToBlog },
            { label: post.category, action: onBackToBlog },
            { label: post.title, active: true }
          ]}
        />

        {/* Back Button */}
        <button
          onClick={onBackToBlog}
          className="btn btn-secondary btn-sm font-bold text-xs gap-2 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        {/* Header Block */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs uppercase tracking-wider">
              {post.category}
            </span>
            {post.isFeatured && (
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Featured Article
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Author Meta Bar */}
          <div className="pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover bg-white border-2 border-sky-500/40 shrink-0"
              />
              <div>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                  {post.author.name}
                </span>
                <span className="text-[11px] font-mono text-slate-500 block">{post.author.role}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-500" /> Published {post.publishedDate}
              </span>
              {post.updatedDate && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <UserCheck className="w-3.5 h-3.5" /> Updated {post.updatedDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> {post.readingTime}
              </span>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="flex items-center justify-between">
            <BlogSocialShare title={post.title} />
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Main Article Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <BlogContentRenderer blocks={post.content} onAddToCart={onAddToCart} />

            {/* Tags Footer */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5" /> Topic Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs rounded-lg font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Card Profile (Feature 5) */}
            <BlogAuthorCard author={post.author} articleCount={2} />

            {/* Inline Newsletter Signup (Feature 8) */}
            <BlogNewsletter />
          </div>

          {/* Sticky Sidebar Table of Contents (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <BlogTableOfContents blocks={post.content} />

            {/* Related Articles Widget */}
            {relatedPosts.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span>Related Articles</span>
                </h4>
                <div className="space-y-3">
                  {relatedPosts.slice(0, 3).map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectPost(rel)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:border-sky-500 border border-slate-100 dark:border-slate-700 transition flex gap-3 group min-h-[44px]"
                    >
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-14 h-14 object-cover rounded-lg shrink-0 bg-slate-200"
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono text-sky-600 font-bold uppercase block">
                          {rel.category}
                        </span>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-sky-500 line-clamp-2">
                          {rel.title}
                        </h5>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Previous & Next Article Navigation */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              onClick={() => onSelectPost(prevPost)}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-sky-500 transition group space-y-1 min-h-[44px]"
            >
              <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <ChevronLeft className="w-3.5 h-3.5" /> Previous Article
              </span>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-sky-500 truncate">
                {prevPost.title}
              </h4>
            </button>
          ) : (
            <div />
          )}

          {nextPost && (
            <button
              onClick={() => onSelectPost(nextPost)}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-right hover:border-sky-500 transition group space-y-1 min-h-[44px]"
            >
              <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center justify-end gap-1">
                Next Article <ChevronRight className="w-3.5 h-3.5" />
              </span>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-sky-500 truncate">
                {nextPost.title}
              </h4>
            </button>
          )}
        </div>
      </article>
    </div>
  );
};
