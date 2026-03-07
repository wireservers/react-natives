import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* SEO: Primary Meta Tags */}
        <title>React-Natives | Production-Ready React Native UI Components</title>
        <meta
          name="description"
          content="A comprehensive library of 70+ production-ready React Native components. TypeScript-first, accessible, customizable, and performant. Build mobile apps faster with React-Natives."
        />
        <meta name="keywords" content="React Native, UI components, mobile development, TypeScript, NativeWind, Tailwind CSS, cross-platform, iOS, Android, component library, react-natives" />
        <meta name="author" content="Wireservers" />
        <meta name="robots" content="index, follow" />

        {/* SEO: Theme & App */}
        <meta name="theme-color" content="#7C3AED" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1F2937" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* SEO: Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="React-Natives | Production-Ready React Native UI Components" />
        <meta property="og:description" content="70+ production-ready React Native components. TypeScript-first, accessible, customizable, and performant." />
        <meta property="og:url" content="https://reactnatives.dev" />
        <meta property="og:image" content="https://reactnatives.dev/og-image.png" />
        <meta property="og:site_name" content="React-Natives" />
        <meta property="og:locale" content="en_US" />
        <link rel="canonical" href="https://reactnatives.dev" />

        {/* SEO: Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="React-Natives | Production-Ready React Native UI Components" />
        <meta name="twitter:description" content="70+ production-ready React Native components. TypeScript-first, accessible, customizable, and performant." />
        <meta name="twitter:image" content="https://reactnatives.dev/og-image.png" />

        {/* SEO: Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareSourceCode',
              name: 'React-Natives',
              description:
                'A comprehensive library of 70+ production-ready React Native components. TypeScript-first, accessible, customizable, and performant.',
              programmingLanguage: ['TypeScript', 'React Native'],
              runtimePlatform: 'React Native',
              codeRepository: 'https://github.com/wireservers/wireservers-ui',
              license: 'https://opensource.org/licenses/MIT',
              author: {
                '@type': 'Organization',
                name: 'Wireservers',
                url: 'https://reactnatives.dev',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />

        {/* Fonts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'MaterialIcons';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(/fonts/MaterialIcons.ttf) format('truetype');
              }
              @font-face {
                font-family: 'MaterialCommunityIcons';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(/fonts/MaterialCommunityIcons.ttf) format('truetype');
              }
            `,
          }}
        />
        <ScrollViewStyleReset />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J8J88W24VR" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J8J88W24VR');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
