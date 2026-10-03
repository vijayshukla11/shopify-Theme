import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Tag,
  SlidersHorizontal,
  ChevronRight,
  User,
  X
} from 'lucide-react';
import { BlogPost, BlogMerchantSettings } from '../types/blog';
import { SAMPLE_BLOG_POSTS } from '../data/blogData';
import { BlogArticleDetail } from './BlogArticleDetail';
import { BlogNewsletter } from './BlogNewsletter';
import { BlogSeoSchemas } from './BlogSeoSchemas';
import { SeoMeta } from './SeoMeta';
import { PageHeader } from './PageHeader';

interface BlogViewProps {
  onNavigateHome?: () => void;
  onRequestContact?: () => void;
  onAddToCart?: (product: any) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigateHome,
  onRequestContact,
  onAddToCart
}) => {
  // Navigation & Article state
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Search, Categories, Tags, Layout & Sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'readingTime'>('latest');
  const [layoutStyle, setLayoutStyle] = useState<'grid' | 'editorial' | 'magazine' | 'compact'>('grid');

  // Merchant Settings (Theme Editor Controls)
  const [merchantSettings, setMerchantSettings] = useState<BlogMerchantSettings>({
    heroTitle: 'Engineering Insights & Technical Journal',
    heroDescription: 'Deep dives into Shopify Liquid theme optimization, WCAG 2.2 AA accessibility, Core Web Vitals, and audiophile hardware engineering.',
    showFeaturedArticle: true,
    layoutStyle: 'grid',
    gridColumns: 2,
    showSidebar: true,
    showTableOfContents: true,
    showAuthorBox: true,
    showNewsletter: true,
    showRelatedPosts: true,
    showSocialSharing: true,
    showReadingProgress: true
  });

  const categories = ['All', 'Architecture', 'Accessibility', 'Performance', 'Buying Guides'];
  const allTags = ['All', 'Shopify Liquid', 'Core Web Vitals', 'Accessibility', 'WCAG 2.2', 'Audio Gear', 'Performance'];

  // Filtered & Sorted articles logic
  const filteredPosts = useMemo(() => {
    return SAMPLE_BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTag && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      if (sortBy === 'oldest') return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
      if (sortBy === 'readingTime') return parseInt(a.readingTime) - parseInt(b.readingTime);
      return 0;
    });
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  const featuredPost = SAMPLE_BLOG_POSTS.find((p) => p.isFeatured) || SAMPLE_BLOG_POSTS[0];

  // If user opened an article detail
  if (selectedPost) {
    return (
      <BlogArticleDetail
        post={selectedPost}
        allPosts={SAMPLE_BLOG_POSTS}
        onSelectPost={(post) => setSelectedPost(post)}
        onBackToBlog={() => setSelectedPost(null)}
        onAddToCart={onAddToCart}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Engineering Insights & Shopify Technical Journal | NCF"
        description="Architectural deep-dives into Shopify Liquid theme optimization, WCAG 2.2 AA compliance standards, and audiophile hardware benchmarks."
      />
      <BlogSeoSchemas />

      {/* Hero Header */}
      <PageHeader
        breadcrumbs={[
          { label: 'Store Front', onClick: onNavigateHome },
          { label: 'Blog & Content Hub', active: true }
        ]}
        badge="Enterprise Content Engine"
        title={merchantSettings.heroTitle}
        description={merchantSettings.heroDescription}
        cta={{
          label: 'Subscribe to Journal',
          onClick: () => onRequestContact?.(),
          icon: <BookOpen className="w-4 h-4" />,
          variant: 'outline'
        }}
      />

      {/* FEATURE 2: FEATURED ARTICLE HERO CARD */}
      {merchantSettings.showFeaturedArticle && featuredPost && !searchQuery && selectedCategory === 'All' && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
          <div className="lg:col-span-7 aspect-video lg:aspect-auto rounded-2xl overflow-hidden bg-slate-800 relative">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              width="800"
              height="450"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover aspect-video group-hover:scale-105 transition duration-500"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Featured Article
            </span>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-bold uppercase">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" /> {featuredPost.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> {featuredPost.readingTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black leading-tight hover:text-sky-400 transition">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 rounded-full object-cover bg-slate-800 border border-slate-700 aspect-square"
                />
                <div>
                  <span className="font-bold text-xs text-white block">{featuredPost.author.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 block">{featuredPost.author.role}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(featuredPost)}
                className="btn btn-primary btn-md font-bold text-xs uppercase tracking-wider shrink-0 gap-2 min-h-[44px]"
              >
                <span>Continue Reading</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FEATURE 1: CONTROLS, SEARCH & FILTER BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, keyword, author, or tag..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Layout Toggle & Sort */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Sort options */}
            <div className="flex items-center gap-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
              >
                <option value="latest">Sort: Latest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="readingTime">Sort: Shortest Read</option>
              </select>
            </div>

            {/* Layout Style Toggles */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLayoutStyle('grid')}
                className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1 min-h-[36px] ${
                  layoutStyle === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Grid View"
                title="Grid Layout"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLayoutStyle('compact')}
                className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1 min-h-[36px] ${
                  layoutStyle === 'compact'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Compact List View"
                title="Compact List Layout"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 font-bold uppercase mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition min-h-[36px] ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURE 10: EMPTY STATE */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-xl mx-auto">
          <Search className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">
              No Articles Found
            </h3>
            <p className="text-xs text-slate-500">
              No technical guides matched your search criteria "{searchQuery}". Try clearing filters or searching for terms like "Liquid", "WCAG", or "DAC".
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedTag('All');
            }}
            className="btn btn-secondary btn-md font-bold text-xs mx-auto min-h-[44px]"
          >
            Reset Search Filters
          </button>
        </div>
      ) : (
        /* FEATURE 3: ARTICLE CARDS GRID */
        <div
          className={`grid gap-6 ${
            layoutStyle === 'compact'
              ? 'grid-cols-1'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredPosts.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedPost(article)}
              className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-sky-500 hover:shadow-lg transition cursor-pointer flex ${
                layoutStyle === 'compact'
                  ? 'flex-col sm:flex-row items-center p-4 gap-4'
                  : 'flex-col justify-between p-5 space-y-4'
              }`}
            >
              <div
                className={`${
                  layoutStyle === 'compact'
                    ? 'w-full sm:w-44 h-32 rounded-xl shrink-0'
                    : 'aspect-video rounded-xl'
                } bg-slate-100 dark:bg-slate-800 overflow-hidden relative`}
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  width="600"
                  height="338"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover aspect-video group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-sky-600 text-white font-mono font-bold text-[10px] uppercase shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-500" /> {article.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" /> {article.readingTime}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug hover:text-sky-600 transition line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-500" /> {article.author.name}
                </span>
                <span className="text-sky-600 font-extrabold inline-flex items-center gap-1 group-hover:underline">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* FEATURE 8: INLINE NEWSLETTER */}
      <BlogNewsletter />
    </div>
  );
};
