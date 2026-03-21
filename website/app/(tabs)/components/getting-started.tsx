import React, { useState } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import { Footer } from "@/components/footer";
import { SeoHead } from "@/components/seo/seo-head";
import { usePageColors } from "@/context/custom-theme-context";
import { SITE_URL } from "@/lib/seo";
import { MarkdownRenderer } from "@/components/docs/markdown-renderer";
import readmeContent from "@/packages/react-natives/README.md";

export default function GettingStartedScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isSmall = screenWidth < 640;
  const isMedium = screenWidth < 768;
  const px = isSmall ? 12 : isMedium ? 16 : 24;
  const c = usePageColors();
  const [footerH, setFooterH] = useState(180);

  return (
    <View style={{ flex: 1, backgroundColor: c.docBg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: footerH }}
      >
        <SeoHead
          title="Getting Started | React-Natives"
          description="Get started with React-Natives: install dependencies, run the dev server, and integrate the component library into your Expo or React Native app."
          path="/components/getting-started"
          keywords="react natives getting started, react native ui setup, expo component library install, nativewind setup"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${SITE_URL}/components/getting-started#article`,
            headline: "Getting Started with React-Natives",
            description:
              "Install dependencies, configure NativeWind, and set up providers to use React-Natives in Expo and React Native.",
            url: `${SITE_URL}/components/getting-started`,
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: `${SITE_URL}/components/getting-started`,
          }}
        />

        <View
          style={{
            width: "100%",
            maxWidth: 900,
            alignSelf: "center",
            paddingHorizontal: px,
            paddingTop: isSmall ? 16 : 32,
            paddingBottom: 60,
          }}
        >
          <MarkdownRenderer content={readmeContent} c={c} isSmall={isSmall} />
        </View>
      </ScrollView>

      <View
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        onLayout={(e) => setFooterH(e.nativeEvent.layout.height)}
      >
        <Footer />
      </View>
    </View>
  );
}
