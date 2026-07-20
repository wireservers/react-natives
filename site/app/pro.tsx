import React from "react";
import { ActivityIndicator, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { BRAND_COLOR_DARK } from "@/constants/brand";
import { Footer } from "@/components/footer";
import { SeoHead } from "@/components/seo/seo-head";

/**
 * Pricing / checkout page for react-natives Pro.
 *
 * Posts a plan id to the license service, which creates the Stripe Checkout session server-side.
 * Prices and entitlements are never sent from here — the client can't be trusted to state what
 * it is buying.
 */

const LICENSE_API =
  process.env.EXPO_PUBLIC_LICENSE_API_URL ?? "https://wsui-license.azurewebsites.net";

type Plan = {
  id: string;
  name: string;
  seats: number;
  price: string;
  blurb: string;
  featured?: boolean;
};

// Display copy only. The authoritative price lives in Stripe and is charged server-side.
const PLANS: Plan[] = [
  {
    id: "pro",
    name: "Pro",
    seats: 1,
    price: "$49",
    blurb: "One developer. Perpetual license, one year of updates.",
  },
  {
    id: "team",
    name: "Team",
    seats: 5,
    price: "$199",
    blurb: "Up to five developers. Perpetual license, one year of updates.",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    seats: 25,
    price: "$799",
    blurb: "Up to 25 developers, priority support.",
  },
];

const INCLUDED = [
  "DataGridPro — CSV + Excel export, column pinning, server-side data",
  "Scheduler — week/day grid with drag to create, move and resize",
  "DateRangePicker — dual-month range selection with presets",
  "Works on iOS, Android and web from one codebase",
  "Perpetual license — your build keeps working forever",
  "Removes the unlicensed watermark",
];

function PlanCard({
  plan,
  onBuy,
  busy,
}: {
  plan: Plan;
  onBuy: (planId: string) => void;
  busy: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 260,
        borderWidth: plan.featured ? 2 : 1,
        borderColor: plan.featured ? BRAND_COLOR_DARK : "#e2e8f0",
        borderRadius: 12,
        padding: 20,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Rendered on every card (empty when not featured) so the tier names align across
          cards rather than the featured one sitting a row lower. */}
      <Text
        style={{
          color: BRAND_COLOR_DARK,
          fontSize: 11,
          fontWeight: "700",
          marginBottom: 4,
          height: 14,
        }}
      >
        {plan.featured ? "MOST POPULAR" : " "}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>{plan.name}</Text>
      <Text style={{ fontSize: 32, fontWeight: "800", color: "#0f172a", marginTop: 8 }}>
        {plan.price}
      </Text>
      <Text style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
        one-time · {plan.seats} {plan.seats === 1 ? "seat" : "seats"}
      </Text>
      {/* flexGrow pushes the button to the bottom, so buttons align even when blurbs differ
          in length. */}
      <Text style={{ fontSize: 13, color: "#475569", marginBottom: 16, flexGrow: 1 }}>
        {plan.blurb}
      </Text>
      <Pressable
        onPress={() => onBuy(plan.id)}
        disabled={busy}
        accessibilityRole="button"
        accessibilityLabel={`Buy the ${plan.name} plan`}
        style={{
          backgroundColor: busy ? "#94a3b8" : plan.featured ? BRAND_COLOR_DARK : "#0f172a",
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: "center",
        }}
      >
        {busy ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: 14 }}>Buy {plan.name}</Text>
        )}
      </Pressable>
    </View>
  );
}

export default function ProPricingScreen() {
  const [busyPlan, setBusyPlan] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleBuy = React.useCallback(async (planId: string) => {
    setBusyPlan(planId);
    setError(null);
    try {
      const response = await fetch(`${LICENSE_API}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      if (!response.ok) throw new Error(`checkout failed (${response.status})`);
      const data = (await response.json()) as { url?: string };
      if (!data.url) throw new Error("no checkout url returned");
      await Linking.openURL(data.url);
    } catch (e) {
      setError(
        "Could not start checkout. Please try again, or email todd@wireservers.com and we'll sort it out.",
      );
    } finally {
      setBusyPlan(null);
    }
  }, []);

  return (
    <>
      <SeoHead
        title="react-natives Pro — premium React Native components"
        description="Premium React Native components: DataGridPro with Excel export, a drag-and-drop Scheduler, and a date-range picker. One codebase for iOS, Android and web. Perpetual license."
        path="/pro"
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={{ width: "100%", maxWidth: 1100, alignSelf: "center", padding: 24 }}>
          <Text style={{ fontSize: 32, fontWeight: "800", color: "#0f172a", marginBottom: 8 }}>
            react-natives Pro
          </Text>
          <Text style={{ fontSize: 16, color: "#475569", marginBottom: 4, maxWidth: 640 }}>
            The premium components — a real data grid, a drag-and-drop scheduler, and a proper
            range picker — that work natively on iOS and Android as well as the web, from a
            single codebase.
          </Text>
          <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 24, maxWidth: 640 }}>
            The core library stays free and MIT licensed.
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onBuy={handleBuy} busy={busyPlan === plan.id} />
            ))}
          </View>

          {error ? (
            <View
              style={{
                borderLeftWidth: 3,
                borderLeftColor: "#dc2626",
                backgroundColor: "#fef2f2",
                padding: 12,
                borderRadius: 6,
                marginBottom: 24,
              }}
            >
              <Text style={{ color: "#991b1b", fontSize: 13 }}>{error}</Text>
            </View>
          ) : null}

          <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 12 }}>
            Every plan includes
          </Text>
          {INCLUDED.map((item) => (
            <Text key={item} style={{ fontSize: 14, color: "#334155", marginBottom: 6 }}>
              ·  {item}
            </Text>
          ))}

          <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginTop: 28, marginBottom: 12 }}>
            Try before you buy
          </Text>
          <Text style={{ fontSize: 14, color: "#334155", maxWidth: 640 }}>
            Install the Pro package and evaluate it with no key at all. Everything is fully
            functional — components simply render an “unlicensed” watermark until you activate a
            license. Nothing is time-limited or disabled.
          </Text>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
}
