import Head from 'expo-router/head';
import { Platform } from 'react-native';

import { DEFAULT_OG_IMAGE_URL, SITE_NAME, toAbsoluteUrl } from '@/lib/seo';

type JsonLd = Record<string, unknown>;

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  imageUrl?: string;
  imageAlt?: string;
  robots?: string;
  keywords?: string;
  jsonLd?: JsonLd | JsonLd[];
}

function resolveImageUrl(imageUrl?: string): string {
  if (!imageUrl) return DEFAULT_OG_IMAGE_URL;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  return toAbsoluteUrl(imageUrl);
}

export function SeoHead({
  title,
  description,
  path,
  type = 'website',
  imageUrl,
  imageAlt = `${SITE_NAME} preview image`,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  keywords,
  jsonLd,
}: SeoHeadProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  const canonicalUrl = toAbsoluteUrl(path);
  const resolvedImageUrl = resolveImageUrl(imageUrl);
  const jsonLdItems = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-US" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedImageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {jsonLdItems.map((item, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Head>
  );
}
