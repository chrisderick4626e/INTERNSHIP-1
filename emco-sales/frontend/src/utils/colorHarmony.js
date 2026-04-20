// ============================================================
// EMCO SALES — Color Harmony & Brand Matching Utility
// HSL-based harmony generation + brand paint matching wrapper
// ============================================================

import { hexToHsl, hslToHex, generateColorName } from "./colorEngine.js";
import { matchHexToBrands } from "./colorMatcher.js";
import { BRANDS, PRICE_CAT } from "../data/paintDatabase.js";

// ─── Preset Palettes ─────────────────────────────────────────
export const PRESETS = {
  neutral: {
    label: "Neutral",
    emoji: "🤍",
    colors: { primaryWall: "#F5F0E8", accentWall: "#FFFFFF", ceiling: "#D6D6D6", trim: "#FAF7F2" },
  },
  warm: {
    label: "Warm",
    emoji: "🔥",
    colors: { primaryWall: "#FFCBA4", accentWall: "#FFF8DC", ceiling: "#C87941", trim: "#E8D5B0" },
  },
  cool: {
    label: "Cool",
    emoji: "❄️",
    colors: { primaryWall: "#B0D4E8", accentWall: "#A8C5A0", ceiling: "#DCE8EC", trim: "#BFC9CA" },
  },
  bold: {
    label: "Bold",
    emoji: "🎯",
    colors: { primaryWall: "#A83232", accentWall: "#1B2A4A", ceiling: "#36454F", trim: "#4A5568" },
  },
};

// ─── Harmony Types ───────────────────────────────────────────
export const HARMONY_TYPES = {
  analogous:     { label: "Analogous (30°)",      offset: 30 },
  complementary: { label: "Complementary (180°)",  offset: 180 },
  triadic:       { label: "Triadic (120°)",        offset: 120 },
};

// ─── Generate harmony colors from a primary wall hex ────────
// Returns { accentWall, ceiling, trim } hex values
export function generateHarmonyColors(primaryHex, harmonyType = "analogous") {
  const { h, s, l } = hexToHsl(primaryHex);
  const offset = HARMONY_TYPES[harmonyType]?.offset || 30;

  // Accent wall: hue-rotated version of primary
  const accentH = (h + offset) % 360;
  const accentWall = hslToHex(accentH, Math.min(s * 1.1, 80), Math.max(l - 5, 30));

  // Ceiling: very light, low-saturation version of primary hue
  const ceiling = hslToHex(h, Math.max(s * 0.1, 3), Math.min(l + 35, 97));

  // Trim: muted, light neutral derived from primary
  const trim = hslToHex(h, Math.max(s * 0.15, 5), Math.min(l + 25, 92));

  return { accentWall, ceiling, trim };
}

// ─── Build a full palette object from 4 hex values ──────────
// Compatible with RoomPreview/paintRoom palette format
export function buildCustomPalette(colors) {
  const { primaryWall, accentWall, ceiling, trim } = colors;
  return {
    primaryWall: { hex: primaryWall, name: generateColorName(primaryWall), role: "Primary Wall" },
    accentWall:  { hex: accentWall,  name: generateColorName(accentWall),  role: "Accent / Feature Wall" },
    ceiling:     { hex: ceiling,     name: generateColorName(ceiling),     role: "Ceiling" },
    trim:        { hex: trim,        name: generateColorName(trim),        role: "Trim / Border" },
  };
}

// ─── Match all 4 colors to brand paints ─────────────────────
// Returns array of { role, hex, ap: {match}, bo: {match}, similarity }
export function matchAllFourColors(colors, budget = PRICE_CAT.MIDRANGE, usage = "interior") {
  const roles = [
    { key: "primaryWall", label: "Primary Wall" },
    { key: "accentWall",  label: "Accent Wall" },
    { key: "ceiling",     label: "Ceiling" },
    { key: "trim",        label: "Trim / Border" },
  ];

  return roles.map(({ key, label }) => {
    const hex = colors[key];
    if (!hex) return null;

    const brands = matchHexToBrands(hex, budget, usage);
    const apMatch = brands[BRANDS.ASIAN_PAINTS]?.primary;
    const boMatch = brands[BRANDS.BIRLA_OPUS]?.primary;

    // Similarity score: 100 - normalized distance (max distance ~441 for RGB)
    const apSimilarity = apMatch ? Math.max(0, Math.round(100 - (apMatch.distance / 4.41))) : 0;
    const boSimilarity = boMatch ? Math.max(0, Math.round(100 - (boMatch.distance / 4.41))) : 0;

    return {
      role: label,
      hex,
      ap: apMatch ? { ...apMatch, similarity: apSimilarity } : null,
      bo: boMatch ? { ...boMatch, similarity: boSimilarity } : null,
    };
  }).filter(Boolean);
}
