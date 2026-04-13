// ============================================================
// EMCO SALES — Smart Color Engine v2
// Generates structured palettes with series/finish awareness
// ============================================================

import { PRICE_CAT } from "../data/paintDatabase.js";

// ─── HSL Utilities ──────────────────────────────────────────
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  const toHex = n => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

// ─── Color Classification ────────────────────────────────────
export function classifyColor(hex) {
  const { h, s, l } = hexToHsl(hex);
  const rgb = hexToRgb(hex);

  const isLight  = l > 70;
  const isDark   = l < 30;
  const isNeutral= s < 15;
  const isWarm   = h < 60 || h > 300;
  const isCool   = h >= 160 && h <= 270;

  let label = "";
  if (isNeutral && isLight)   label = "Neutral Light";
  else if (isNeutral)         label = "Neutral Tone";
  else if (isWarm && isLight) label = "Warm Light";
  else if (isWarm)            label = "Warm Deep";
  else if (isCool && isLight) label = "Cool Light";
  else if (isCool)            label = "Cool Deep";
  else if (isDark)            label = "Accent Deep";
  else                        label = "Vivid Tone";

  return { isLight, isDark, isNeutral, isWarm, isCool, label, h, s, l, ...rgb };
}

// ─── Palette Role assignments ────────────────────────────────
function lighten(hex, amount = 15) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, Math.max(s - 5, 5), Math.min(l + amount, 95));
}

function darken(hex, amount = 15) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, Math.max(l - amount, 5));
}

function desaturate(hex, amount = 30) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, Math.max(s - amount, 0), l);
}

function complementary(hex) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex((h + 180) % 360, s * 0.8, Math.min(l + 10, 90));
}

function analogous(hex, offset = 30) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex((h + offset) % 360, s, l);
}

// ─── Generate color name from HSL ───────────────────────────
function generateColorName(hex) {
  const { h, s, l } = hexToHsl(hex);

  const lightness = l > 80 ? "Light " : l < 40 ? "Deep " : "";
  const sat       = s < 20 ? "" : s > 70 ? "Vivid " : "";

  if (s < 15) {
    if (l > 90) return "Pure White";
    if (l > 75) return "Soft Grey";
    if (l > 50) return "Warm Grey";
    return "Charcoal Grey";
  }

  if      (h < 20)  return `${lightness}${sat}Terracotta`;
  else if (h < 45)  return `${lightness}${sat}Amber`;
  else if (h < 70)  return `${lightness}${sat}Sand Yellow`;
  else if (h < 100) return `${lightness}${sat}Olive Green`;
  else if (h < 150) return `${lightness}${sat}Sage Green`;
  else if (h < 180) return `${lightness}${sat}Teal`;
  else if (h < 220) return `${lightness}${sat}Sky Blue`;
  else if (h < 260) return `${lightness}${sat}Indigo`;
  else if (h < 290) return `${lightness}${sat}Lavender`;
  else if (h < 330) return `${lightness}${sat}Rose`;
  else              return `${lightness}${sat}Blush`;
}

// ─── Structured Palette Generator ───────────────────────────
// Returns: { primaryWall, accentWall, ceiling, trim, complementary }
function buildStructuredPalette(dominantColors, budgetStyle) {
  if (!dominantColors || dominantColors.length === 0) return null;

  // Pick the most interesting color as base
  const sorted = [...dominantColors].sort((a, b) => {
    const ha = hexToHsl(a.hex);
    const hb = hexToHsl(b.hex);
    // Prefer mid-lightness, higher saturation
    return (Math.abs(hb.s - 50) - Math.abs(ha.s - 50));
  });

  const base = sorted[0];
  const { h, s, l } = hexToHsl(base.hex);

  let primaryWall, accentWall, ceiling, trim, complementaryColor;

  if (budgetStyle === "luxury") {
    primaryWall       = hslToHex(h, Math.max(s * 0.6, 10), Math.min(l + 20, 88));
    accentWall        = darken(base.hex, 12);
    ceiling           = hslToHex(h, Math.max(s * 0.15, 5), 96);
    trim              = hslToHex(h, Math.max(s * 0.4, 8), 85);
    complementaryColor= complementary(base.hex);
  } else if (budgetStyle === "minimal") {
    primaryWall       = hslToHex(h, Math.max(s * 0.4, 8), Math.min(l + 25, 92));
    accentWall        = hslToHex(h, Math.min(s, 60), Math.max(l - 15, 30));
    ceiling           = hslToHex(0, 0, 97);
    trim              = hslToHex(h, Math.max(s * 0.2, 5), 90);
    complementaryColor= analogous(base.hex, 30);
  } else {
    // budget
    primaryWall       = hslToHex(h, Math.max(s * 0.3, 8), Math.min(l + 30, 93));
    accentWall        = hslToHex(h, Math.min(s * 0.8, 70), Math.max(l - 5, 45));
    ceiling           = "#FFFFFF";
    trim              = hslToHex(0, 0, 92);
    complementaryColor= analogous(base.hex, -30);
  }

  return {
    primaryWall:     { hex: primaryWall,  name: generateColorName(primaryWall),  role: "Primary Wall" },
    accentWall:      { hex: accentWall,   name: generateColorName(accentWall),   role: "Accent / Feature Wall" },
    ceiling:         { hex: ceiling,      name: generateColorName(ceiling),       role: "Ceiling" },
    trim:            { hex: trim,         name: generateColorName(trim),           role: "Trim / Border" },
    complementary:   { hex: complementaryColor, name: generateColorName(complementaryColor), role: "Complementary" },
  };
}

// ─── Main: Generate all palette styles ──────────────────────
export function generateAllPalettes(dominantColors) {
  if (!dominantColors || dominantColors.length === 0) return null;

  return {
    luxury: {
      id: "luxury",
      name: "Luxury Premium",
      emoji: "👑",
      desc: "Elegant, premium colors — smooth luxury matte finish",
      priceCategory: PRICE_CAT.PREMIUM,
      accentColor: "#f8c948",
      colors: buildStructuredPalette(dominantColors, "luxury"),
    },
    minimal: {
      id: "minimal",
      name: "Modern Minimal",
      emoji: "🎨",
      desc: "Clean, contemporary palette — satin & matte finish",
      priceCategory: PRICE_CAT.MIDRANGE,
      accentColor: "#8b5cf6",
      colors: buildStructuredPalette(dominantColors, "minimal"),
    },
    budget: {
      id: "budget",
      name: "Budget Friendly",
      emoji: "💰",
      desc: "Smart color choices at an affordable price point",
      priceCategory: PRICE_CAT.BUDGET,
      accentColor: "#22c55e",
      colors: buildStructuredPalette(dominantColors, "budget"),
    },
  };
}

// ─── Extract hex list from palette for display ─────────────
export function getPaletteHexList(palette) {
  if (!palette?.colors) return [];
  return Object.values(palette.colors).map(c => c.hex);
}

export { hexToHsl, hslToHex, hexToRgb, generateColorName, complementary, analogous, lighten, darken, desaturate };
