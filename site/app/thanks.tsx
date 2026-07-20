import React from "react";
import { ActivityIndicator, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Footer } from "@/components/footer";
import { SeoHead } from "@/components/seo/seo-head";

/**
 * Post-purchase page.
 *
 * Stripe redirects here with the checkout session id. The key is fetched and shown inline —
 * the order email is the durable copy, but this covers the common case where mail is slow or
 * lands in spam, so a buyer is never left with nothing after paying.
 */

const LICENSE_API =
  process.env.EXPO_PUBLIC_LICENSE_API_URL ?? "https://wsui-license.azurewebsites.net";

function CodeBlock({ children }: { children: string }) {
  return (
    <View
      style={{
        backgroundColor: "#0f172a",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <Text
        selectable
        style={{ color: "#e2e8f0", fontSize: 12, fontFamily: Platform.OS === "web" ? "monospace" : undefined }}
      >
        {children}
      </Text>
    </View>
  );
}

export default function ThanksScreen() {
  const params = useLocalSearchParams<{ session_id?: string }>();
  const sessionId = params.session_id;

  const [state, setState] = React.useState<
    { status: "loading" } | { status: "ready"; licenseKey: string; email: string } | { status: "error"; message: string }
  >({ status: "loading" });
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!sessionId) {
      setState({ status: "error", message: "No checkout session was provided." });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${LICENSE_API}/license?session_id=${encodeURIComponent(sessionId)}`);
        if (!response.ok) throw new Error(`lookup failed (${response.status})`);
        const data = (await response.json()) as { licenseKey?: string; email?: string };
        if (cancelled) return;
        if (!data.licenseKey) throw new Error("no key returned");
        setState({ status: "ready", licenseKey: data.licenseKey, email: data.email ?? "" });
      } catch {
        if (cancelled) return;
        setState({
          status: "error",
          // Payment already succeeded at this point, so never imply the purchase failed.
          message:
            "We could not display your key here, but your purchase went through and the key is on its way by email. If it does not arrive, email todd@wireservers.com and we'll resend it.",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const copyKey = React.useCallback(async () => {
    if (state.status !== "ready") return;
    try {
      if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(state.licenseKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard permission can be denied; the key is selectable as a fallback.
    }
  }, [state]);

  return (
    <>
      <SeoHead
        title="Thanks for buying react-natives Pro"
        description="Your license key and setup instructions."
        path="/thanks"
        robots="noindex"
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={{ width: "100%", maxWidth: 760, alignSelf: "center", padding: 24 }}>
          <Text style={{ fontSize: 28, fontWeight: "800", color: "#0f172a", marginBottom: 6 }}>
            Thanks — you're all set
          </Text>
          <Text style={{ fontSize: 15, color: "#475569", marginBottom: 24 }}>
            Your license key is below and a copy is on its way to your inbox.
          </Text>

          {state.status === "loading" ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <ActivityIndicator size="small" />
              <Text style={{ color: "#64748b", fontSize: 14 }}>Retrieving your license key…</Text>
            </View>
          ) : null}

          {state.status === "error" ? (
            <View
              style={{
                borderLeftWidth: 3,
                borderLeftColor: "#f59e0b",
                backgroundColor: "#fffbeb",
                padding: 12,
                borderRadius: 6,
                marginBottom: 24,
              }}
            >
              <Text style={{ color: "#92400e", fontSize: 14 }}>{state.message}</Text>
            </View>
          ) : null}

          {state.status === "ready" ? (
            <>
              <Text style={{ fontSize: 13, fontWeight: "700", color: "#64748b", marginBottom: 6 }}>
                YOUR LICENSE KEY
              </Text>
              <View
                style={{
                  backgroundColor: "#f1f5f9",
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <Text selectable style={{ fontSize: 11, color: "#0f172a" }}>
                  {state.licenseKey}
                </Text>
              </View>
              {Platform.OS === "web" ? (
                <Pressable
                  onPress={copyKey}
                  accessibilityRole="button"
                  style={{
                    alignSelf: "flex-start",
                    borderWidth: 1,
                    borderColor: "#cbd5e1",
                    borderRadius: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    marginBottom: 24,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#0f172a" }}>
                    {copied ? "Copied" : "Copy key"}
                  </Text>
                </Pressable>
              ) : null}
            </>
          ) : null}

          <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>
            1. Install
          </Text>
          <CodeBlock>npm i @wireservers-ui/react-natives @wireservers-ui/react-natives-pro</CodeBlock>

          <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>
            2. Activate
          </Text>
          <Text style={{ fontSize: 14, color: "#475569", marginBottom: 8 }}>
            Call this once at startup, before rendering any Pro component:
          </Text>
          <CodeBlock>
            {`import { setLicenseKey } from '@wireservers-ui/react-natives-pro';\n\nsetLicenseKey('${
              state.status === "ready" ? state.licenseKey.slice(0, 24) + "…" : "YOUR_KEY"
            }');`}
          </CodeBlock>

          <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>
            3. Tailwind — easy to miss
          </Text>
          <View
            style={{
              borderLeftWidth: 3,
              borderLeftColor: "#f59e0b",
              backgroundColor: "#fffbeb",
              padding: 12,
              borderRadius: 6,
              marginBottom: 24,
            }}
          >
            <Text style={{ fontSize: 14, color: "#92400e", marginBottom: 8 }}>
              Add the Pro package to your Tailwind content globs, or its components render
              unstyled with no error:
            </Text>
            <CodeBlock>
              {`content: [\n  './node_modules/@wireservers-ui/react-natives/src/**/*.{js,jsx,ts,tsx}',\n  './node_modules/@wireservers-ui/react-natives-pro/src/**/*.{js,jsx,ts,tsx}',\n],`}
            </CodeBlock>
          </View>

          <Text style={{ fontSize: 14, color: "#475569" }}>
            Questions, or need the key resent? Email todd@wireservers.com
          </Text>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
}
