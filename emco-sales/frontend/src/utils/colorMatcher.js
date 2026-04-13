// ============================================================
// EMCO SALES — Smart Color Matcher v2
// Maps palette colors → brand paint shades
// Budget/series-aware with alternative shade generation
// ============================================================

import {
  ALL_PAINTS, PAINT_BY_BRAND, BRANDS, PRICE_CAT, USAGE,
  SERIES_BY_BUDGET, ROYALE, ROYALE_ASPIRA, ROYALE_HEALTH,
  ROYALE_SHYNE, PREMIUM_EMULSION, TRACTOR_EMULSION,
  APEX_ULTIMA, APEX_ADVANCED, APEX,
  OPUS_CALISTA, OPUS_PRESTIGE, OPUS_ELEGANCE,
  OPUS_EXTERIOR, OPUS_INTERIOR,
} from "../data/paintDatabase.js";

// ─── Euclidean RGB distance ──────────────────────────────────
function colorDistance(hex, paint) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return Math.sqrt(
    Math.pow(r - paint.r, 2) +
    Math.pow(g - paint.g, 2) +
    Math.pow(b - paint.b, 2)
  );
}

// ─── Get the series pool based on budget + usage + brand ────
function getSeriesPool(priceCategory, usageType, brand) {
  const isExterior = usageType === "exterior";

  const seriesMap = {
    [BRANDS.ASIAN_PAINTS]: {
      [PRICE_CAT.PREMIUM]:  isExterior ? [...APEX_ULTIMA]        : [...ROYALE, ...ROYALE_ASPIRA, ...ROYALE_SHYNE, ...ROYALE_HEALTH],
      [PRICE_CAT.MIDRANGE]: isExterior ? [...APEX_ADVANCED]      : [...PREMIUM_EMULSION],
      [PRICE_CAT.BUDGET]:   isExterior ? [...APEX]               : [...TRACTOR_EMULSION],
    },
    [BRANDS.BIRLA_OPUS]: {
      [PRICE_CAT.PREMIUM]:  isExterior ? [...OPUS_EXTERIOR]      : [...OPUS_CALISTA],
      [PRICE_CAT.MIDRANGE]: isExterior ? [...OPUS_EXTERIOR]      : [...OPUS_PRESTIGE],
      [PRICE_CAT.BUDGET]:   isExterior ? [...OPUS_EXTERIOR]      : [...OPUS_ELEGANCE, ...OPUS_INTERIOR],
    },
  };

  return (seriesMap[brand]?.[priceCategory]) || ALL_PAINTS.filter(p => p.brand === brand);
}

// ─── Find best matching paint from a pool ───────────────────
function findBestMatch(hex, pool) {
  if (!pool || pool.length === 0) return null;
  let best = null, bestDist = Infinity;
  for (const paint of pool) {
    const dist = colorDistance(hex, paint);
    if (dist < bestDist) {
      bestDist = dist;
      best = paint;
    }
  }
  return best ? { ...best, distance: Math.round(bestDist) } : null;
}

// ─── Find top-N closest paints from pool ────────────────────
function findTopMatches(hex, pool, n = 3) {
  return pool
    .map(p => ({ ...p, distance: Math.round(colorDistance(hex, p)) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n);
}

// ─── Map a single role color to brands ──────────────────────
function matchRoleColor({ hex, name, role }, priceCategory, usageType) {
  const apPool  = getSeriesPool(priceCategory, usageType, BRANDS.ASIAN_PAINTS);
  const boPool  = getSeriesPool(priceCategory, usageType, BRANDS.BIRLA_OPUS);

  const apMatch  = findBestMatch(hex, apPool);
  const boMatch  = findBestMatch(hex, boPool);

  const apAlts   = findTopMatches(hex, apPool, 3).filter(p => p.id !== apMatch?.id).slice(0, 2);
  const boAlts   = findTopMatches(hex, boPool, 3).filter(p => p.id !== boMatch?.id).slice(0, 2);

  return {
    hex,
    name,
    role,
    rgb: {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    },
    brands: {
      [BRANDS.ASIAN_PAINTS]: apMatch ? { primary: apMatch, alternatives: apAlts } : null,
      [BRANDS.BIRLA_OPUS]:   boMatch ? { primary: boMatch, alternatives: boAlts } : null,
    },
  };
}

// ─── Full Palette → Brand Mapping ────────────────────────────
// paletteColors: { primaryWall, accentWall, ceiling, trim, complementary }
// priceCategory: PRICE_CAT.BUDGET | MIDRANGE | PREMIUM
// usageType: "interior" | "exterior"
export function matchPaletteToBrands(paletteColors, priceCategory = PRICE_CAT.MIDRANGE, usageType = "interior") {
  if (!paletteColors) return null;

  const result = {};
  for (const [key, colorObj] of Object.entries(paletteColors)) {
    result[key] = matchRoleColor(colorObj, priceCategory, usageType);
  }
  return result;
}

// ─── Simple: match any single hex to nearest paint ──────────
export function matchHexToBrands(hex, priceCategory = PRICE_CAT.MIDRANGE, usageType = "interior") {
  const apPool = getSeriesPool(priceCategory, usageType, BRANDS.ASIAN_PAINTS);
  const boPool = getSeriesPool(priceCategory, usageType, BRANDS.BIRLA_OPUS);

  return {
    [BRANDS.ASIAN_PAINTS]: {
      primary:      findBestMatch(hex, apPool),
      alternatives: findTopMatches(hex, apPool, 3),
    },
    [BRANDS.BIRLA_OPUS]: {
      primary:      findBestMatch(hex, boPool),
      alternatives: findTopMatches(hex, boPool, 3),
    },
  };
}

// ─── Filter paints by brand ──────────────────────────────────
export function filterByBrand(matchedPalette, brandFilter) {
  // brandFilter: "all" | BRANDS.ASIAN_PAINTS | BRANDS.BIRLA_OPUS
  if (!matchedPalette || brandFilter === "all") return matchedPalette;
  const filtered = {};
  for (const [key, val] of Object.entries(matchedPalette)) {
    filtered[key] = {
      ...val,
      brands: {
        [brandFilter]: val.brands[brandFilter],
      },
    };
  }
  return filtered;
}

// ─── Get series name for a priceCategory + brand + usage ────
export function getRecommendedSeries(priceCategory, brand, usageType = "interior") {
  return SERIES_BY_BUDGET[priceCategory]?.[brand]?.[usageType] || "—";
}
