import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  BRAND_COLOR,
  BRAND_COLOR_DARK,
  BRAND_COLOR_LIGHT,
  BRAND_GRADIENT,
} from "@/constants/brand";
import { Footer } from "@/components/footer";
import { SeoHead } from "@/components/seo/seo-head";
import { useTheme } from "@/context/theme-context";
import { usePageColors } from "@/context/custom-theme-context";
import type { PageColorSet } from "@/constants/theme";
import { SITE_URL } from "@/lib/seo";

function Container({
  children,
  style,
  maxWidth = 1504,
}: {
  children: React.ReactNode;
  style?: any;
  maxWidth?: number;
}) {
  return (
    <View style={[{ width: "100%", maxWidth, alignSelf: "center" }, style]}>
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const isWide = width >= 1024;
  const isXWide = width >= 1920;
  const { colorScheme } = useTheme();
  const c = usePageColors();

  return (
    <ScrollView
      className="flex-1 bg-background-0"
      contentContainerStyle={{ paddingBottom: 0 }}
    >
      <SeoHead
        title="React-Natives | Build Production-Ready Mobile Apps Faster"
        description="A comprehensive collection of 70+ production-ready React Native components. Customizable, accessible, and performant. TypeScript-first with NativeWind styling."
        path="/"
        keywords="react native components, react native ui library, typescript ui components, nativewind components, mobile ui kit"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/#home`,
          url: SITE_URL,
          name: "React-Natives Home",
          description:
            "A comprehensive collection of 70+ production-ready React Native components. Customizable, accessible, and performant.",
          isPartOf: {
            "@id": `${SITE_URL}/#website`,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}/og-image.png`,
          },
        }}
      />
      {/* Hero Section — Purple-to-Pink gradient */}
      <LinearGradient
        colors={[...BRAND_GRADIENT]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 0.7 }}
      >
        <Container
          maxWidth={1680}
          style={{
            paddingTop: isXWide ? 120 : isWide ? 80 : 48,
            paddingBottom: isXWide ? 108 : isWide ? 72 : 44,
            paddingHorizontal: isMobile ? 20 : isWide ? 48 : 32,
            flexDirection: isWide ? "row" : "column",
            alignItems: isWide ? "center" : "flex-start",
            gap: isWide ? 48 : 0,
          }}
        >
          {/* Left — text */}
          <View style={{ flex: isWide ? 1 : undefined }}>
            {/* Badge */}
            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: "rgba(255,255,255,0.25)",
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 20,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                React Native UI Library
              </Text>
            </View>

            {/* Main heading */}
            <Text
              style={{
                fontSize: isXWide ? 80 : isWide ? 52 : isMobile ? 30 : 40,
                fontWeight: "800",
                color: "#fff",
                lineHeight: isXWide ? 92 : isWide ? 60 : isMobile ? 36 : 48,
                marginBottom: 16,
              }}
            >
              Build Production-Ready{"\n"}Mobile Apps Faster
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontSize: isXWide ? 22 : isMobile ? 15 : 16,
                color: "rgba(255,255,255,0.75)",
                lineHeight: isXWide ? 34 : 24,
                marginBottom: 28,
                maxWidth: 520,
              }}
            >
              A comprehensive collection of production-ready React Native
              components. Customizable, accessible, and performant.
            </Text>

            {/* CTA Buttons */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => router.navigate("/components" as any)}
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Text
                  style={{
                    color: BRAND_COLOR_DARK,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Browse Components
                </Text>
                <Text style={{ color: BRAND_COLOR_DARK, fontSize: 14 }}>→</Text>
              </Pressable>
              <Pressable
                onPress={() => router.navigate("/components/docs" as any)}
                style={{
                  backgroundColor: "rgba(0,0,0,0.25)",
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}
                >
                  Learn More
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Right — code preview card (wide screens only) */}
          {isWide && (
            <View
              style={{
                flex: 1,
                backgroundColor: "#1F2937",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  gap: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#374151",
                }}
              >
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#EF4444",
                  }}
                />
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#F59E0B",
                  }}
                />
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#10B981",
                  }}
                />
                <Text style={{ color: "#9CA3AF", fontSize: 13, marginLeft: 8 }}>
                  App.tsx
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "monospace",
                  fontSize: isXWide ? 16 : 13,
                  color: "#D1D5DB",
                  padding: 24,
                  lineHeight: isXWide ? 26 : 22,
                }}
              >{`import {
  Button, Card, CardHeader,
  CardBody, CardFooter, Text,
} from '@wireservers-ui/react-natives';

export default function App() {
  return (
    <Card>
      <CardHeader>
        <Text variant="h2">Welcome</Text>
      </CardHeader>
      <CardBody>
        <Text>
          Start building amazing apps!
        </Text>
      </CardBody>
      <CardFooter>
        <Button
          action="primary"
          onPress={() => navigate('/home')}
        >
          <ButtonText>Get Started</ButtonText>
        </Button>
      </CardFooter>
    </Card>
  );
}`}</Text>
            </View>
          )}
        </Container>
      </LinearGradient>

      {/* Why Choose Section */}
      <View style={{ backgroundColor: c.pageBg }}>
        <Container
          style={{
            paddingHorizontal: isWide ? 48 : 24,
            paddingTop: isXWide ? 80 : 48,
            paddingBottom: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: isXWide ? 48 : isWide ? 32 : 24,
              fontWeight: "800",
              color: c.heading,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Why Choose React-Natives?
          </Text>
          <Text
            style={{
              fontSize: isXWide ? 20 : 15,
              color: c.text,
              textAlign: "center",
            }}
          >
            Everything you need to build modern mobile applications
          </Text>
        </Container>

        {/* Feature Cards — 3 col grid */}
        <Container
          style={{
            paddingHorizontal: isWide ? 48 : 20,
            paddingTop: 20,
            paddingBottom: isXWide ? 80 : 40,
          }}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <FeatureCard
              icon="</>"
              iconBg={colorScheme === "dark" ? "#1a3a4a" : BRAND_COLOR_LIGHT}
              iconColor={BRAND_COLOR}
              title="TypeScript First"
              description="Fully typed components with excellent IDE support and autocomplete for better developer experience."
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              slug="typescript-first"
              colors={c}
            />
            <FeatureCard
              icon="🎨"
              iconBg={colorScheme === "dark" ? "#1a3a4a" : BRAND_COLOR_LIGHT}
              iconColor={BRAND_COLOR_DARK}
              title="Customizable Theme"
              description="Easy to customize with a powerful theming system. Match your brand identity effortlessly."
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              slug="customizable-theme"
              colors={c}
            />
            <FeatureCard
              icon="⚡"
              iconBg={colorScheme === "dark" ? "#1a2e1a" : "#ECFDF5"}
              iconColor="#059669"
              title="High Performance"
              description="Optimized for performance with lazy loading, virtualization, and minimal re-renders."
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              slug="high-performance"
              colors={c}
            />
            <FeatureCard
              icon="🛡"
              iconBg={colorScheme === "dark" ? "#2e1f1a" : "#FFF7ED"}
              iconColor="#EA580C"
              title="Accessible"
              description="Built with accessibility in mind. WCAG compliant components that work for everyone."
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              slug="accessible"
              colors={c}
            />
            <FeatureCard
              icon="🧩"
              iconBg={colorScheme === "dark" ? "#2e1a2e" : "#FDF2F8"}
              iconColor="#DB2777"
              title="70+ Components"
              description="Comprehensive library covering all your UI needs from buttons to complex data tables."
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              slug="seventy-plus-components"
              colors={c}
            />
            <FeatureCard
              icon="📱"
              iconBg={colorScheme === "dark" ? "#1a2a3e" : "#F0F9FF"}
              iconColor="#0284C7"
              title="Cross Platform"
              description="Works seamlessly on iOS and Android with consistent look and feel across platforms."
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              slug="cross-platform"
              colors={c}
            />
          </View>
        </Container>

        {/* Thin separator line */}
        <Container>
          <View
            style={{
              height: 1,
              backgroundColor: c.separator,
              marginHorizontal: 20,
            }}
          />
        </Container>

        {/* Featured Components */}
        <Container
          style={{
            paddingHorizontal: isWide ? 48 : 24,
            paddingTop: isXWide ? 80 : 48,
            paddingBottom: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: isXWide ? 48 : isWide ? 32 : 24,
              fontWeight: "800",
              color: c.heading,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Featured Components
          </Text>
          <Text
            style={{
              fontSize: isXWide ? 20 : 15,
              color: c.text,
              textAlign: "center",
            }}
          >
            Start with these essential components
          </Text>
        </Container>

        <Container
          style={{
            paddingHorizontal: isWide ? 48 : 20,
            paddingTop: 20,
            paddingBottom: 16,
          }}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <FeaturedComponentCard
              slug="date-picker"
              title="Date Picker"
              description="Full-featured date and time picker with calendar, month, and year selection"
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              colors={c}
            />
            <FeaturedComponentCard
              slug="modal"
              title="Modal"
              description="Accessible overlay dialog with backdrop, animations, and focus trapping"
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              colors={c}
            />
            <FeaturedComponentCard
              slug="select"
              title="Select"
              description="Dropdown select with searchable options, groups, and custom rendering"
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              colors={c}
            />
            <FeaturedComponentCard
              slug="table"
              title="Table"
              description="Data table with sorting, pagination, and flexible column configuration"
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              colors={c}
            />
            <FeaturedComponentCard
              slug="toast"
              title="Toast"
              description="Non-intrusive notification toasts with positioning and auto-dismiss"
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              colors={c}
            />
            <FeaturedComponentCard
              slug="skeleton"
              title="Skeleton"
              description="Loading placeholder that mimics content shape during data fetching"
              cardMinWidth={
                isMobile ? "100%" : isXWide ? "14%" : isWide ? "30%" : "45%"
              }
              colors={c}
            />
          </View>
        </Container>

        {/* View All Button */}
        <View style={{ alignItems: "center", paddingBottom: 40 }}>
          <Pressable
            onPress={() => router.navigate("/components" as any)}
            style={{
              backgroundColor: BRAND_COLOR,
              paddingHorizontal: 28,
              paddingVertical: 14,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
              View All Components
            </Text>
            <Text style={{ color: "#fff", fontSize: 15 }}>→</Text>
          </Pressable>
        </View>
      </View>
      {/* end themed section */}

      {/* Code Showcase — Dark section */}
      <View style={{ backgroundColor: "#111827" }}>
        <Container
          style={{
            paddingVertical: isXWide ? 100 : 56,
            paddingHorizontal: isWide ? 48 : 24,
            flexDirection: isWide ? "row" : "column",
            gap: isXWide ? 80 : isWide ? 48 : 32,
          }}
        >
          {/* Left — text + checklist */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: isXWide ? 52 : 30,
                fontWeight: "800",
                color: "#fff",
                lineHeight: isXWide ? 62 : 36,
                marginBottom: 14,
              }}
            >
              Simple. Powerful.{"\n"}Elegant.
            </Text>
            <Text
              style={{
                fontSize: isXWide ? 20 : 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: isXWide ? 32 : 22,
                marginBottom: 28,
                maxWidth: isXWide ? "45%" : 380,
              }}
            >
              Clean API design that feels natural to use. Get started in minutes
              with our intuitive component library.
            </Text>

            <View style={{ gap: 16 }}>
              <ChecklistItem
                title="Easy Installation"
                subtitle="npx create-expo-app@latest my-app && npm install @wireservers-ui/react-natives"
              />
              <ChecklistItem
                title="Zero Configuration"
                subtitle="Works out of the box"
              />
              <ChecklistItem
                title="Great Documentation"
                subtitle="Comprehensive guides and examples"
              />
            </View>
          </View>

          {/* Right — Code Preview Card */}
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: "#1F2937",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  gap: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#374151",
                }}
              >
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#EF4444",
                  }}
                />
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#F59E0B",
                  }}
                />
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#10B981",
                  }}
                />
                <Text style={{ color: "#9CA3AF", fontSize: 13, marginLeft: 8 }}>
                  App.tsx
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    color: "#D1D5DB",
                    padding: 16,
                    lineHeight: 22,
                  }}
                >{`import { Button, Card } from '@wireservers-ui/react-natives';

export default function App() {
  return (
    <Card>
      <CardHeader>
        <Text variant="h2">Welcome</Text>
      </CardHeader>
      <CardBody>
        <Text>Start building amazing apps!</Text>
      </CardBody>
      <CardFooter>
        <Button
          action="primary"
          onPress={() => navigate('/home')}
        >
          <ButtonText>Get Started</ButtonText>
        </Button>
      </CardFooter>
    </Card>
  );
}`}</Text>
              </ScrollView>
            </View>
          </View>
        </Container>
      </View>

      {/* CTA Footer — Gradient */}
      <LinearGradient
        colors={[...BRAND_GRADIENT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Container
          maxWidth={1680}
          style={{
            paddingVertical: isXWide ? 100 : 56,
            paddingHorizontal: isWide ? 48 : 24,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: isXWide ? 60 : isWide ? 36 : 28,
              fontWeight: "800",
              color: "#fff",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Ready to Get Started?
          </Text>
          <Text
            style={{
              fontSize: isXWide ? 22 : 15,
              color: "rgba(255,255,255,0.75)",
              textAlign: "center",
              marginBottom: 28,
              maxWidth: isXWide ? "50%" : 400,
            }}
          >
            Join thousands of developers building amazing mobile apps with
            React-Natives
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={() => router.navigate("/components" as any)}
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text
                style={{
                  color: BRAND_COLOR_DARK,
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                Explore Components
              </Text>
              <Text style={{ color: BRAND_COLOR_DARK, fontSize: 14 }}>→</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL("https://github.com/wireservers/wireservers-ui")
              }
              style={{
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.35)",
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>
                View on GitHub
              </Text>
            </Pressable>
          </View>
        </Container>
      </LinearGradient>

      <Footer />
    </ScrollView>
  );
}

type ThemeColors = PageColorSet;

function FeatureCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  cardMinWidth,
  slug,
  colors: c,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  cardMinWidth: string;
  slug: string;
  colors: ThemeColors;
}) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate(`/features/${slug}` as any)}
      style={{
        flex: 1,
        minWidth: cardMinWidth as any,
        borderWidth: 1,
        borderColor: c.border,
        borderRadius: 16,
        padding: 20,
        backgroundColor: c.cardBg,
      }}
    >
      <View
        style={{
          backgroundColor: iconBg,
          width: 40,
          height: 40,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Text style={{ fontSize: 16, color: iconColor }}>{icon}</Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: c.heading,
          marginBottom: 6,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: c.text, lineHeight: 20 }}>
        {description}
      </Text>
    </Pressable>
  );
}

function FeaturedComponentCard({
  slug,
  title,
  description,
  cardMinWidth,
  colors: c,
}: {
  slug: string;
  title: string;
  description: string;
  cardMinWidth: string;
  colors: ThemeColors;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.navigate(`/components/docs/${slug}` as any)}
      style={{
        flex: 1,
        minWidth: cardMinWidth as any,
        borderWidth: 1,
        borderColor: c.border,
        borderRadius: 16,
        padding: 20,
        backgroundColor: c.cardBg,
      }}
    >
      <View
        style={{
          backgroundColor: c.iconSubtle,
          width: 40,
          height: 40,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Text style={{ fontSize: 18 }}>📦</Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: c.heading,
          marginBottom: 6,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: c.text,
          lineHeight: 20,
          marginBottom: 12,
        }}
      >
        {description}
      </Text>
      <Text
        style={{ color: BRAND_COLOR_DARK, fontSize: 14, fontWeight: "600" }}
      >
        View Component →
      </Text>
    </Pressable>
  );
}

function ChecklistItem({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: "#10B981",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 13, fontWeight: "700" }}>
          ✓
        </Text>
      </View>
      <View>
        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>
          {title}
        </Text>
        <Text
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 14,
            marginTop: 2,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
