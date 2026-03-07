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
