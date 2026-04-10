// ============================================================
// Color Engine — Rule-Based Recommendation System
// Generates 3 palette types based on detected colors
// ============================================================

/** Parse "#RRGGBB" → {r, g, b} */
export function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

/** {r,g,b} → "#RRGGBB" */
export function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}

/** {r,g,b} → {h:0-360, s:0-100, l:0-100} */
export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

/** {h, s, l} (0-360, 0-100, 0-100) → "#RRGGBB" */
export function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return rgbToHex(r * 255, g * 255, b * 255);
}

/** Returns the complementary hue (opposite on the wheel) */
function complementaryHue(h) { return (h + 180) % 360; }

/** Returns analogous hues (±30°) */
function analogousHues(h) { return [(h + 30) % 360, (h - 30 + 360) % 360]; }

/** Detect overall palette mood from array of color objects {hex, h, s, l} */
export function detectPaletteMood(colors) {
  const warm = colors.filter((c) => (c.h < 60 || c.h > 300) && c.s > 15).length;
  const cool = colors.filter((c) => c.h >= 180 && c.h <= 270 && c.s > 15).length;
  if (warm > cool + 1) return "warm";
  if (cool > warm + 1) return "cool";
  return "neutral";
}

// ─── PALETTE GENERATORS ──────────────────────────────────────

/**
 * Given a base color, generate a "Modern Minimal" palette.
 * Focused on clean whites, muted colors, one accent.
 */
export function generateModernMinimal(baseColor) {
  const { h, s, l } = typeof baseColor === "string" ? rgbToHsl(...Object.values(hexToRgb(baseColor))) : baseColor;
  return {
    name: "Modern Minimal",
    style: "minimal",
    emoji: "🤍",
    description: "Clean, airy spaces with muted tones and one bold accent",
    colors: {
      primaryWall:  { hex: hslToHex(h, Math.min(s * 0.3, 12), 94), label: "Primary Wall" },
      accentWall:   { hex: hslToHex(h, Math.min(s * 0.5, 25), 75), label: "Accent Wall" },
      ceiling:      { hex: "#FAFAF8", label: "Ceiling" },
      trim:         { hex: hslToHex(h, 5, 88), label: "Trim / Border" },
      accent:       { hex: hslToHex(complementaryHue(h), Math.min(s * 0.6, 40), 55), label: "Decorative Accent" },
    },
  };
}

/**
 * Luxury Premium palette — rich, deep, sumptuous tones.
 */
export function generateLuxuryPremium(baseColor) {
  const { h, s, l } = typeof baseColor === "string" ? rgbToHsl(...Object.values(hexToRgb(baseColor))) : baseColor;
  return {
    name: "Luxury Premium",
    style: "luxury",
    emoji: "✨",
    description: "Rich, deep tones with golden accents for opulent interiors",
    colors: {
      primaryWall:  { hex: hslToHex(h, Math.min(s * 0.6, 35), 78), label: "Primary Wall" },
      accentWall:   { hex: hslToHex(h, Math.min(s * 0.8, 55), 40), label: "Accent Wall" },
      ceiling:      { hex: hslToHex(h, 5, 96), label: "Ceiling" },
      trim:         { hex: hslToHex(40, 60, 55), label: "Gold Trim" },
      accent:       { hex: hslToHex(complementaryHue(h), 45, 35), label: "Contrast Accent" },
    },
  };
}

/**
 * Budget Friendly palette — bright, cheerful, practical.
 */
export function generateBudgetFriendly(baseColor) {
  const { h, s } = typeof baseColor === "string" ? rgbToHsl(...Object.values(hexToRgb(baseColor))) : baseColor;
  const [a1] = analogousHues(h);
  return {
    name: "Budget Friendly",
    style: "budget",
    emoji: "💚",
    description: "Bright, cheerful tones that maximize impact at low cost",
    colors: {
      primaryWall:  { hex: hslToHex(h, Math.min(s * 0.4, 30), 90), label: "Primary Wall" },
      accentWall:   { hex: hslToHex(a1, Math.min(s * 0.5, 40), 82), label: "Accent Wall" },
      ceiling:      { hex: "#FFFFFF", label: "Ceiling White" },
      trim:         { hex: "#F5F5F0", label: "Off-White Trim" },
      accent:       { hex: hslToHex(h, Math.min(s * 0.7, 50), 65), label: "Bright Accent" },
    },
  };
}

/**
 * Main entry point: given array of detected color objects,
 * return all 3 palette recommendations.
 */
export function generateAllPalettes(detectedColors) {
  if (!detectedColors || detectedColors.length === 0) return [];

  // Use the most saturated non-neutral color as base
  const sorted = [...detectedColors].sort((a, b) => b.s - a.s);
  const base = sorted.find((c) => c.s > 10) || sorted[0];

  return [
    generateModernMinimal(base),
    generateLuxuryPremium(base),
    generateBudgetFriendly(base),
  ];
}
