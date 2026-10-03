import React, { useEffect } from 'react';

export interface SeoMetaProps {
  title: string;
  description: string;
  schemaData?: object;
}

export const SeoMeta: React.FC<SeoMetaProps> = ({ title, description, schemaData }) => {
  useEffect(() => {
    document.title = `${title} | CLINZA`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return schemaData ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  ) : null;
};
