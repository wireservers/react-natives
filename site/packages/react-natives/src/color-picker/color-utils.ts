/**
 * Pure color conversion utilities for the ColorPicker.
 * All functions are dependency-free and work on all platforms.
 */

/** Convert a hex string (#RRGGBB or #RGB) to { r, g, b } (0-255 each). */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const num = parseInt(h, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/** Convert { r, g, b } (0-255) to a 6-digit hex string with # prefix. */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/** Convert { r, g, b } (0-255) to { h, s, l } where h is 0-360, s and l are 0-100. */
export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;

  if (max === rn) {
    h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
  } else if (max === gn) {
    h = ((bn - rn) / d + 2) * 60;
  } else {
    h = ((rn - gn) / d + 4) * 60;
  }

  return {
    h: Math.round(h) % 360,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** Convert { h, s, l } (h: 0-360, s: 0-100, l: 0-100) to { r, g, b } (0-255). */
export function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  const sn = s / 100;
  const ln = l / 100;

  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hn = h / 360;

  return {
    r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  };
}

/** Convert { r, g, b } (0-255) to { h, s, v } where h is 0-360, s and v are 0-100. */
export function rgbToHsv(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; v: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const v = max;

  if (max === 0) {
    return { h: 0, s: 0, v: 0 };
  }

  const s = d / max;
  let h: number;

  if (d === 0) {
    h = 0;
  } else if (max === rn) {
    h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
  } else if (max === gn) {
    h = ((bn - rn) / d + 2) * 60;
  } else {
    h = ((rn - gn) / d + 4) * 60;
  }

  return {
    h: Math.round(h) % 360,
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

/** Convert { h, s, v } (h: 0-360, s: 0-100, v: 0-100) to { r, g, b } (0-255). */
export function hsvToRgb(
  h: number,
  s: number,
  v: number,
): { r: number; g: number; b: number } {
  const sn = s / 100;
  const vn = v / 100;
  const c = vn * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vn - c;

  let r1: number, g1: number, b1: number;

  if (h < 60) {
    [r1, g1, b1] = [c, x, 0];
  } else if (h < 120) {
    [r1, g1, b1] = [x, c, 0];
  } else if (h < 180) {
    [r1, g1, b1] = [0, c, x];
  } else if (h < 240) {
    [r1, g1, b1] = [0, x, c];
  } else if (h < 300) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

/** Extract HSV from a hex color string. */
export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsv(r, g, b);
}

/** Convert HSV to a hex color string. */
export function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

/** Extract hue (0-360) from a hex color string. */
export function hexToHue(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b).h;
}

/** Given a hue (0-360) and an existing hex color, return a new hex with the new hue
 *  but preserving the original saturation and lightness. If the color is achromatic
 *  (gray), defaults to full saturation at 50% lightness. */
export function replaceHue(hex: string, newHue: number): string {
  const { r, g, b } = hexToRgb(hex);
  let { s, l } = rgbToHsl(r, g, b);
  // If achromatic, use vivid defaults so the wheel produces a visible color
  if (s === 0) {
    s = 100;
    l = 50;
  }
  const rgb = hslToRgb(newHue, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/** Convert a hue (0-360) to a fully-saturated hex color (hsl(hue, 100%, 50%)). */
export function hueToHex(hue: number): string {
  const { r, g, b } = hslToRgb(hue, 100, 50);
  return rgbToHex(r, g, b);
}

/** Clamp a value between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
