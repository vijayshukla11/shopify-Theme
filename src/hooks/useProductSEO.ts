import { useEffect } from 'react';
import { Product } from '../types/product';

/**
 * Custom hook to dynamically manage document title, meta description,
 * and Open Graph / Twitter tags for SEO on Product Detail Pages.
 */
export const useProductSEO = (product?: Product | null) => {
  useEffect(() => {
    if (!product) return;

    // Save previous title
    const prevTitle = document.title;

    // Set page title
    const titleText = `${product.name} | TechNova Official`;
    document.title = titleText;

    // Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const description = product.shortDescription || product.description || `Buy ${product.name} with 24-month warranty and fast shipping on TechNova.`;
    const productUrl = window.location.href;
    const imageUrl = product.image || '';

    // Standard SEO Meta Description
    setMetaTag('name', 'description', description);

    // Open Graph Tags
    setMetaTag('property', 'og:title', titleText);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:url', productUrl);
    setMetaTag('property', 'og:type', 'product');

    // Open Graph Product Specs (Price & Currency)
    if (product.price) {
      setMetaTag('property', 'product:price:amount', product.price.toString());
      setMetaTag('property', 'product:price:currency', 'INR');
    }

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', titleText);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);

    // Structured Data (JSON-LD) injection
    let jsonLdScript = document.getElementById('product-jsonld-schema') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'product-jsonld-schema';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    const schemaData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: [imageUrl],
      description: description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'TechNova'
      },
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'INR',
        price: product.price,
        availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'TechNova'
        }
      },
      aggregateRating: product.rating
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewsCount || 120
          }
        : undefined
    };

    jsonLdScript.textContent = JSON.stringify(schemaData);

    return () => {
      document.title = prevTitle;
      const schemaElem = document.getElementById('product-jsonld-schema');
      if (schemaElem) {
        schemaElem.remove();
      }
    };
  }, [product]);
};
