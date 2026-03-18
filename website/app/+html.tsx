import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

import { SITE_NAME, SITE_URL } from "@/lib/seo";

const GTM_ID = "GTM-PTXVFC3R";
const GA_ID = "G-J8J88W24VR";
const SITE_DESCRIPTION =
  "A comprehensive library of 70+ production-ready React Native components. TypeScript-first, accessible, customizable, and performant.";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager (official snippet: load immediately in <head>) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Theme & App */}
        <meta
          name="theme-color"
          content="#7C3AED"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1F2937"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* SEO: Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Wireservers",
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/logo-512.png`,
                  },
                  sameAs: ["https://github.com/wireservers/wireservers-ui"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: SITE_NAME,
                  description: SITE_DESCRIPTION,
                  publisher: {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "SoftwareSourceCode",
                  "@id": `${SITE_URL}/#software`,
                  name: SITE_NAME,
                  description: SITE_DESCRIPTION,
                  programmingLanguage: ["TypeScript", "React Native"],
                  runtimePlatform: "React Native",
                  codeRepository:
                    "https://github.com/wireservers/wireservers-ui",
                  license: "https://opensource.org/licenses/MIT",
                  author: {
                    "@id": `${SITE_URL}/#organization`,
                  },
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                },
              ],
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

        {/* NOTE: GA4 is loaded directly as a fallback and may duplicate events
            if also configured inside GTM for the same Measurement ID. */}

        {/* Defer Clarity until idle to protect critical rendering path */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                function load(){
                  if (c.__clarityLoaded) return;
                  c.__clarityLoaded = true;
                  var t=l.createElement(r);
                  var y=l.getElementsByTagName(r)[0];
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                  y.parentNode.insertBefore(t,y);
                }
                if ('requestIdleCallback' in c) {
                  c.requestIdleCallback(load, { timeout: 4000 });
                } else {
                  c.addEventListener('load', function(){ setTimeout(load, 1800); }, { once: true });
                }
              })(window, document, "clarity", "script", "vtvmzxw2aa");
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            title="Google Tag Manager"
            height={0}
            width={0}
            style={{ display: "none" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
