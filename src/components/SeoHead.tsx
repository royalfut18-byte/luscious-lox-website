import { useEffect } from 'react';

type SeoHeadProps = {
  title: string;
  description: string;
  canonical: string;
  schema?: Record<string, unknown>;
  robots?: string;
};

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertLink = (selector: string, rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  element.setAttribute('rel', rel);
  element.setAttribute('href', href);
};

export default function SeoHead({ title, description, canonical, schema, robots = 'index,follow' }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertLink('link[rel="canonical"]', 'canonical', canonical);

    const schemaElement = document.head.querySelector<HTMLScriptElement>('script[data-schema="hair-salon"]');

    if (!schema) {
      schemaElement?.remove();
      return;
    }

    const nextSchemaElement = schemaElement ?? document.createElement('script');
    nextSchemaElement.type = 'application/ld+json';
    nextSchemaElement.dataset.schema = 'hair-salon';
    nextSchemaElement.textContent = JSON.stringify(schema);

    if (!schemaElement) {
      document.head.appendChild(nextSchemaElement);
    }
  }, [canonical, description, robots, schema, title]);

  return null;
}
