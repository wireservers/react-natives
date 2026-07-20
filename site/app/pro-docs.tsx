import React, { useState } from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Footer } from "@/components/footer";
import { SeoHead } from "@/components/seo/seo-head";
import { usePageColors } from "@/context/custom-theme-context";
import { SITE_URL } from "@/lib/seo";
import { MarkdownRenderer } from "@/components/docs/markdown-renderer";
import proReadmeContent from "@/lib/pro-readme-content";

/**
 * Pro documentation, rendered from the package's own README.
 *
 * Generated from the shipped README rather than written separately: the order email, the
 * package README, and this page all describe the same setup, and three hand-maintained copies
 * would drift. The email links here, so a buyer who has just paid lands on setup instructions
 * instead of the pricing page.
 */
export default function ProDocsScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isSmall = screenWidth < 640;
  const isMedium = screenWidth < 768;
  const px = isSmall ? 12 : isMedium ? 16 : 24;
  const c = usePageColors();
  const [footerH, setFooterH] = useState(180);

  return (
    <View style={{ flex: 1, backgroundColor: c.docBg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: footerH }}>
        <SeoHead
          title="react-natives Pro — documentation"
          description="Install, activate and use react-natives Pro: DataGridPro, charts, Scheduler, rich text, form builder, command palette, file upload, kanban and product tour."
          path="/pro-docs"
          keywords="react natives pro docs, react native data grid, react native scheduler, react native kanban"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${SITE_URL}/pro-docs#article`,
            headline: "react-natives Pro documentation",
            description:
              "Setup and API reference for the react-natives Pro component library.",
            url: `${SITE_URL}/pro-docs`,
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: `${SITE_URL}/pro-docs`,
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <Pressable
              // Typed routes are generated and omit this top-level route; the same cast is used
              // for /pro in app/(tabs)/index.tsx.
              onPress={() => router.navigate("/pro" as never)}
              accessibilityRole="link"
              accessibilityLabel="Back to pricing"
              style={{
                borderWidth: 1,
                borderColor: c.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text style={{ fontSize: 13, color: c.text }}>← Pricing</Text>
            </Pressable>
            <Text style={{ fontSize: 13, color: c.textSecondary }}>
              Already bought? Everything below is in your order email too.
            </Text>
          </View>

          <MarkdownRenderer content={proReadmeContent} c={c} isSmall={isSmall} />
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
