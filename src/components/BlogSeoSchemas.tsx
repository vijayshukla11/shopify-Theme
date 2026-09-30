import React from 'react';
import { BlogPost } from '../types/blog';

interface BlogSeoSchemasProps {
  post?: BlogPost;
}

export const BlogSeoSchemas: React.FC<BlogSeoSchemasProps> = ({ post }) => {
  if (!post) {
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Nova Commerce Engineering Journal',
      description: 'Technical insights into Liquid 2.0 storefront architecture, WCAG 2.2 AA accessibility, e-commerce performance engineering, and hardware reviews.',
      url: window.location.href,
      publisher: {
        '@type': 'Organization',
        name: 'Nova Commerce Framework',
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
        }
      }
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    );
  }

  // Article Schema JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: post.author.twitter || post.author.linkedin
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nova Commerce Framework'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.href
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Store Front',
        item: window.location.origin
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${window.location.origin}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: window.location.href
      }
    ]
  };

  // Extract FAQ items from post blocks if any
  const faqBlocks = post.content.filter((b) => b.type === 'faq' && b.faqItems);
  const allFaqs = faqBlocks.flatMap((b) => b.faqItems || []);

  const faqSchema = allFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};
