export const BRAND_COLOR = '#61DBFB';
export const BRAND_COLOR_LIGHT = '#E8F9FE';
export const BRAND_COLOR_DARK = '#2BA8CC';
export const BRAND_GRADIENT = ['#0E7490', '#2BA8CC', '#61DBFB'] as const;

// Pro checkout hits a license API that isn't wired to Stripe yet — keep entry
// points (nav, footer, hero CTA) hidden on the live site until that ships.
export const PRO_ENABLED = false;
