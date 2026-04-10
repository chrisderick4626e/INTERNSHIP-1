// ============================================================
// Color Matcher — Maps palette colors → closest brand paints
// Uses Euclidean distance in RGB space
// ============================================================

import { ALL_PAINTS, USAGE } from "../data/paintDatabase";
import { hexToRgb } from "./colorEngine";

/** RGB Euclidean distance between two HEX strings */
function colorDistance(hex1, hex2) {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

/**
 * Find the N closest paints from a filtered list.
 */
function findClosest(targetHex, pool, n = 3) {
  return pool
    .map((paint) => ({ ...paint, distance: colorDistance(targetHex, paint.hex) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n);
}

/**
 * Map a single palette (with color roles) to brand paint recommendations.
 * Returns an object keyed by color role, each with top brand matches.
 */
export function mapPaletteToBrands(palette) {
  const { colors } = palette;
  const style = palette.style; // "minimal", "luxury", "budget"

  // Filter pools by preferred series per style
  const interiorPools = {
    minimal: ALL_PAINTS.filter(
      (p) =>
        p.usage === USAGE.INTERIOR &&
        ["Royale", "Satin Glo", "Everlast Premium"].includes(p.series)
    ),
    luxury: ALL_PAINTS.filter(
      (p) =>
        p.usage === USAGE.INTERIOR &&
        ["Royale", "Everlast Premium"].includes(p.series)
    ),
    budget: ALL_PAINTS.filter(
      (p) =>
        p.usage === USAGE.INTERIOR &&
        ["Tractor Emulsion", "Satin Glo", "Opus Trends"].includes(p.series)
    ),
  };

  const accentPools = ALL_PAINTS.filter(
    (p) => p.usage === USAGE.ACCENT || p.usage === USAGE.INTERIOR
  );

  const ceilingPool = ALL_PAINTS.filter((p) => p.usage === USAGE.CEILING);

  const trimPool = ALL_PAINTS.filter(
    (p) => p.usage === USAGE.TRIM || p.usage === USAGE.INTERIOR
  );

  const pool = interiorPools[style] || interiorPools.minimal;

  return {
    primaryWall: findClosest(colors.primaryWall.hex, pool, 3),
    accentWall:  findClosest(colors.accentWall.hex, accentPools, 3),
    ceiling:     findClosest(colors.ceiling.hex, ceilingPool, 2),
    trim:        findClosest(colors.trim.hex, trimPool, 2),
  };
}

/**
 * Given all 3 palettes, return brand mappings for each.
 */
export function mapAllPalettesToBrands(palettes) {
  return palettes.map((palette) => ({
    ...palette,
    brandRecommendations: mapPaletteToBrands(palette),
  }));
}

/**
 * For a given detected color HEX, find 5 closest paints overall.
 */
export function findClosestPaints(hex, usageFilter = null) {
  const pool = usageFilter
    ? ALL_PAINTS.filter((p) => p.usage === usageFilter)
    : ALL_PAINTS;
  return findClosest(hex, pool, 5);
}
