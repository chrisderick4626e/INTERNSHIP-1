// ============================================================
// EMCO SALES Paint Database v2
// Asian Paints + Birla Opus — Full series mapping
// Each shade: hex, RGB, series, finish, priceCategory, usage
// ============================================================

export const BRANDS = {
  ASIAN_PAINTS: "Asian Paints",
  BIRLA_OPUS:   "Birla Opus",
};

export const USAGE = {
  INTERIOR: "Interior Wall",
  EXTERIOR: "Exterior Wall",
  CEILING:  "Ceiling",
  ACCENT:   "Accent / Feature Wall",
  TRIM:     "Trim / Border",
};

export const FINISH = {
  LUXURY_MATTE:  "Luxury Matte",
  SMOOTH_MATTE:  "Smooth Matte",
  MATTE:         "Matte",
  SATIN:         "Satin",
  GLOSS:         "Gloss",
  SHYNE:         "Shyne (Gloss-Matte)",
  WEATHER_GUARD: "Weather Guard",
};

export const PRICE_CAT = {
  BUDGET:    "Budget",
  MIDRANGE:  "Mid-Range",
  PREMIUM:   "Premium",
};

// ─── Helper ─────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function paint(id, brand, series, shadeName, hex, usage, finish, priceCategory, alternatives = []) {
  const { r, g, b } = hexToRgb(hex);
  return { id, brand, series, shadeName, hex, r, g, b, usage, finish, priceCategory, alternatives };
}

// ════════════════════════════════════════════════════════════
// ASIAN PAINTS — INTERIOR SERIES
// ════════════════════════════════════════════════════════════

// ── Royale (Premium, Luxury Matte) ──────────────────────────
export const ROYALE = [
  paint("ap-rl-001", BRANDS.ASIAN_PAINTS, "Royale", "Ivory Bliss",        "#FAF3E0", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#F5EDD5","#F0E8CC"]),
  paint("ap-rl-002", BRANDS.ASIAN_PAINTS, "Royale", "Cashmere Cream",     "#F5E6C8", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#EFE0C0","#EAD9B5"]),
  paint("ap-rl-003", BRANDS.ASIAN_PAINTS, "Royale", "Antique White",      "#FAEBD7", USAGE.CEILING,  FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#F5E6D0","#F0DFCA"]),
  paint("ap-rl-004", BRANDS.ASIAN_PAINTS, "Royale", "Warm Linen",         "#E8D5B0", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#E2CFA8","#DEC9A0"]),
  paint("ap-rl-005", BRANDS.ASIAN_PAINTS, "Royale", "Dusty Rose",         "#D4A5A5", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#CE9C9C","#C89393"]),
  paint("ap-rl-006", BRANDS.ASIAN_PAINTS, "Royale", "Sage Whisper",       "#BCB8A4", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#B6B29E","#B0AA98"]),
  paint("ap-rl-007", BRANDS.ASIAN_PAINTS, "Royale", "Powder Blue",        "#B0C4DE", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#A9BED8","#A4B8D2"]),
  paint("ap-rl-008", BRANDS.ASIAN_PAINTS, "Royale", "Misty Lavender",     "#C8B8D8", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#C2B2D2","#BCAACC"]),
  paint("ap-rl-009", BRANDS.ASIAN_PAINTS, "Royale", "Almond Silk",        "#E8C9A0", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#E2C398","#DCC090"]),
  paint("ap-rl-010", BRANDS.ASIAN_PAINTS, "Royale", "Pearl White",        "#F5F5F0", USAGE.CEILING,  FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#F0F0EB","#EBEBEA"]),
  paint("ap-rl-011", BRANDS.ASIAN_PAINTS, "Royale", "Sandstone",          "#C2A882", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#BAA07A","#B49872"]),
  paint("ap-rl-012", BRANDS.ASIAN_PAINTS, "Royale", "Terracotta Blush",   "#CB8B7A", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#C58272","#BF796A"]),
  paint("ap-rl-013", BRANDS.ASIAN_PAINTS, "Royale", "Sage Green",         "#9CAF88", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#96A982","#90A37C"]),
  paint("ap-rl-014", BRANDS.ASIAN_PAINTS, "Royale", "Deep Teal",          "#4A8F8C", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#448884","#3E817E"]),
  paint("ap-rl-015", BRANDS.ASIAN_PAINTS, "Royale", "Champagne",          "#F7E7CE", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#F2E1C6","#EDDBC0"]),
  paint("ap-rl-016", BRANDS.ASIAN_PAINTS, "Royale", "Warm Grey",          "#B0A899", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#AAA293","#A49C8D"]),
  paint("ap-rl-017", BRANDS.ASIAN_PAINTS, "Royale", "Midnight Blue",      "#1C3A5E", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#183458","#142E52"]),
  paint("ap-rl-018", BRANDS.ASIAN_PAINTS, "Royale", "Burnished Gold",     "#C8A85A", USAGE.TRIM,     FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#C2A252","#BCA04C"]),
];

// ── Royale Aspira (Premium, Smooth Matte) ───────────────────
export const ROYALE_ASPIRA = [
  paint("ap-ra-001", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Warm Ivory",       "#F8F1E5", USAGE.INTERIOR, FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#F3EADE","#EEE3D6"]),
  paint("ap-ra-002", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Soft Beige",       "#F5E6D3", USAGE.INTERIOR, FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#F0DFCB","#EBD8C3"]),
  paint("ap-ra-003", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Peach Whisper",    "#F8D9C8", USAGE.ACCENT,   FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#F3D2C0","#EECBB8"]),
  paint("ap-ra-004", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Mist Blue",        "#D0E4F0", USAGE.INTERIOR, FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#C8DCE8","#C0D4E0"]),
  paint("ap-ra-005", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Lilac Haze",       "#D8CCE8", USAGE.ACCENT,   FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#D0C4E0","#C8BCD8"]),
  paint("ap-ra-006", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Sage Bliss",       "#C8D8C0", USAGE.INTERIOR, FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#C0D0B8","#B8C8B0"]),
  paint("ap-ra-007", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Cloud White",      "#F8F8F5", USAGE.CEILING,  FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#F4F4F1","#F0F0ED"]),
  paint("ap-ra-008", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Suede",            "#C8B4A0", USAGE.INTERIOR, FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#C0AC98","#B8A490"]),
  paint("ap-ra-009", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Rose Dust",        "#E8C0B8", USAGE.ACCENT,   FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#E0B8B0","#D8B0A8"]),
  paint("ap-ra-010", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Steel Mist",       "#A8B8C8", USAGE.ACCENT,   FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#A0B0C0","#98A8B8"]),
  paint("ap-ra-011", BRANDS.ASIAN_PAINTS, "Royale Aspira", "Golden Dew",       "#E8D490", USAGE.ACCENT,   FINISH.SMOOTH_MATTE, PRICE_CAT.PREMIUM, ["#E0CC88","#D8C480"]),
];

// ── Royale Shyne (Premium, Satin Gloss) ────────────────────
export const ROYALE_SHYNE = [
  paint("ap-rs-001", BRANDS.ASIAN_PAINTS, "Royale Shyne", "Mystic White",    "#F9F9F7", USAGE.INTERIOR, FINISH.SHYNE, PRICE_CAT.PREMIUM, ["#F5F5F3","#F1F1EF"]),
  paint("ap-rs-002", BRANDS.ASIAN_PAINTS, "Royale Shyne", "Silken Cream",    "#F4ECD8", USAGE.INTERIOR, FINISH.SHYNE, PRICE_CAT.PREMIUM, ["#EEE6D2","#E8E0CC"]),
  paint("ap-rs-003", BRANDS.ASIAN_PAINTS, "Royale Shyne", "Aqua Gloss",      "#90CAD8", USAGE.ACCENT,   FINISH.SHYNE, PRICE_CAT.PREMIUM, ["#88C2D0","#80BAC8"]),
  paint("ap-rs-004", BRANDS.ASIAN_PAINTS, "Royale Shyne", "Coral Gleam",     "#E89080", USAGE.ACCENT,   FINISH.SHYNE, PRICE_CAT.PREMIUM, ["#E28878","#DC8070"]),
  paint("ap-rs-005", BRANDS.ASIAN_PAINTS, "Royale Shyne", "Lemon Glow",      "#F5F0A0", USAGE.INTERIOR, FINISH.SHYNE, PRICE_CAT.PREMIUM, ["#EFE898","#E9E090"]),
  paint("ap-rs-006", BRANDS.ASIAN_PAINTS, "Royale Shyne", "Blush Satin",     "#F0C8C0", USAGE.INTERIOR, FINISH.SHYNE, PRICE_CAT.PREMIUM, ["#E8C0B8","#E0B8B0"]),
  paint("ap-rs-007", BRANDS.ASIAN_PAINTS, "Royale Shyne", "Iris Sheen",      "#B0A0D0", USAGE.ACCENT,   FINISH.SHYNE, PRICE_CAT.PREMIUM, ["#A898C8","#A090C0"]),
];

// ── Royale Health Shield (Premium, Matte, Anti-Bacterial) ──
export const ROYALE_HEALTH = [
  paint("ap-rh-001", BRANDS.ASIAN_PAINTS, "Royale Health Shield", "Pure White",     "#FFFFFF", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.PREMIUM, ["#FAFAF8","#F5F5F0"]),
  paint("ap-rh-002", BRANDS.ASIAN_PAINTS, "Royale Health Shield", "Calm Cream",     "#F8F2E4", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.PREMIUM, ["#F3EDDE","#EEE8D8"]),
  paint("ap-rh-003", BRANDS.ASIAN_PAINTS, "Royale Health Shield", "Healing Green",  "#C8DCC0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.PREMIUM, ["#C0D4B8","#B8CCB0"]),
  paint("ap-rh-004", BRANDS.ASIAN_PAINTS, "Royale Health Shield", "Sky Comfort",    "#C8D8E8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.PREMIUM, ["#C0D0E0","#B8C8D8"]),
  paint("ap-rh-005", BRANDS.ASIAN_PAINTS, "Royale Health Shield", "Soft Lavender",  "#D8D0E8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.PREMIUM, ["#D0C8E0","#C8C0D8"]),
  paint("ap-rh-006", BRANDS.ASIAN_PAINTS, "Royale Health Shield", "Morning Mist",   "#E8EEF4", USAGE.CEILING,  FINISH.MATTE, PRICE_CAT.PREMIUM, ["#E0E6EC","#D8DEE4"]),
];

// ── Premium Emulsion (Mid-Range, Matte) ─────────────────────
export const PREMIUM_EMULSION = [
  paint("ap-pe-001", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Cream Delight",     "#FFF0D0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#FAE8C8","#F5E0C0"]),
  paint("ap-pe-002", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Pista Green",       "#D4E6C3", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#CCDEBB","#C4D6B3"]),
  paint("ap-pe-003", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Sky Blue",          "#C8E0F0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#C0D8E8","#B8D0E0"]),
  paint("ap-pe-004", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Peach Puff",        "#FFD5C8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#F8CDC0","#F0C5B8"]),
  paint("ap-pe-005", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Butter Yellow",     "#FFF0A0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#F8E898","#F0E090"]),
  paint("ap-pe-006", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Mint Fresh",        "#C8F0D8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#C0E8D0","#B8E0C8"]),
  paint("ap-pe-007", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Pastel Lilac",      "#E0D0EE", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#D8C8E6","#D0C0DE"]),
  paint("ap-pe-008", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Sandstone Beige",   "#E8D8B8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#E0D0B0","#D8C8A8"]),
  paint("ap-pe-009", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Cotton White",      "#F8F8F2", USAGE.CEILING,  FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#F4F4EE","#F0F0EA"]),
  paint("ap-pe-010", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Warm Coral",        "#F0B090", USAGE.ACCENT,   FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#E8A888","#E0A080"]),
  paint("ap-pe-011", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Teal Mist",         "#90C0C0", USAGE.ACCENT,   FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#88B8B8","#80B0B0"]),
  paint("ap-pe-012", BRANDS.ASIAN_PAINTS, "Premium Emulsion", "Warm Ivory",        "#F5F0E0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.MIDRANGE, ["#F0EBD8","#EBE6D0"]),
];

// ── Tractor Emulsion (Budget, Matte) ─────────────────────────
export const TRACTOR_EMULSION = [
  paint("ap-te-001", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Pure White",       "#FFFFFF", USAGE.CEILING,  FINISH.MATTE, PRICE_CAT.BUDGET, ["#FAFAFA","#F5F5F5"]),
  paint("ap-te-002", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Off White",        "#FAF8F5", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F5F3F0","#F0EEED"]),
  paint("ap-te-003", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Cream Yellow",     "#FFF8DC", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F8F0D4","#F0E8CC"]),
  paint("ap-te-004", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Light Green",      "#D8EEC8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#D0E6C0","#C8DEB8"]),
  paint("ap-te-005", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Light Blue",       "#C8DCF0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#C0D4E8","#B8CCE0"]),
  paint("ap-te-006", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Peach Pink",       "#FFD5C8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F8CCC0","#F0C3B8"]),
  paint("ap-te-007", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Lemon Yellow",     "#FFF4A0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F8EC98","#F0E490"]),
  paint("ap-te-008", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Mint Cream",       "#D0F0E0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#C8E8D8","#C0E0D0"]),
  paint("ap-te-009", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Pastel Lilac",     "#E8D8F8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#E0D0F0","#D8C8E8"]),
  paint("ap-te-010", BRANDS.ASIAN_PAINTS, "Tractor Emulsion", "Sandy Beige",      "#ECD8B8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#E4D0B0","#DCC8A8"]),
];

// ════════════════════════════════════════════════════════════
// ASIAN PAINTS — EXTERIOR SERIES
// ════════════════════════════════════════════════════════════

// ── Apex Ultima (Premium Exterior) ─────────────────────────
export const APEX_ULTIMA = [
  paint("ap-au-001", BRANDS.ASIAN_PAINTS, "Apex Ultima", "Terracotta Classic", "#C87050", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM, ["#C26848","#BC6040"]),
  paint("ap-au-002", BRANDS.ASIAN_PAINTS, "Apex Ultima", "Desert Dune",        "#D8C09A", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM, ["#D0B892","#C8B08A"]),
  paint("ap-au-003", BRANDS.ASIAN_PAINTS, "Apex Ultima", "Monsoon Blue",       "#6890A8", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM, ["#6088A0","#588098"]),
  paint("ap-au-004", BRANDS.ASIAN_PAINTS, "Apex Ultima", "Heritage Ochre",     "#C8A040", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM, ["#C29838","#BC9030"]),
  paint("ap-au-005", BRANDS.ASIAN_PAINTS, "Apex Ultima", "Chalk White",        "#F5F0E8", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM, ["#F0EBE2","#EBE6DC"]),
  paint("ap-au-006", BRANDS.ASIAN_PAINTS, "Apex Ultima", "Forest Deep",        "#4A7A60", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM, ["#447258","#3E6A50"]),
  paint("ap-au-007", BRANDS.ASIAN_PAINTS, "Apex Ultima", "Warm Cocoa",         "#8A6050", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM, ["#845848","#7E5040"]),
];

// ── Apex Advanced (Mid-Range Exterior) ─────────────────────
export const APEX_ADVANCED = [
  paint("ap-aa-001", BRANDS.ASIAN_PAINTS, "Apex Advanced", "Stone Grey",      "#9A9A8C", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#929284","#8A8A7C"]),
  paint("ap-aa-002", BRANDS.ASIAN_PAINTS, "Apex Advanced", "Earthy Brown",    "#A0785A", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#987050","#907B65"]),
  paint("ap-aa-003", BRANDS.ASIAN_PAINTS, "Apex Advanced", "Rust Orange",     "#B85820", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#B05018","#A84810"]),
  paint("ap-aa-004", BRANDS.ASIAN_PAINTS, "Apex Advanced", "Olive Drab",      "#7A8860", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#728058","#6A7850"]),
  paint("ap-aa-005", BRANDS.ASIAN_PAINTS, "Apex Advanced", "Warm Beige",      "#D8C8A8", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#D0C0A0","#C8B898"]),
  paint("ap-aa-006", BRANDS.ASIAN_PAINTS, "Apex Advanced", "Denim Blue",      "#5870A0", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#506898","#486090"]),
];

// ── Apex (Budget Exterior) ──────────────────────────────────
export const APEX = [
  paint("ap-ap-001", BRANDS.ASIAN_PAINTS, "Apex", "Classic Cream",   "#EDE0C8", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.BUDGET, ["#E5D8C0","#DDD0B8"]),
  paint("ap-ap-002", BRANDS.ASIAN_PAINTS, "Apex", "Terracotta Lite", "#D0806A", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.BUDGET, ["#C87862","#C0705A"]),
  paint("ap-ap-003", BRANDS.ASIAN_PAINTS, "Apex", "Grey Stone",      "#AEAAA0", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.BUDGET, ["#A6A298","#9E9A90"]),
  paint("ap-ap-004", BRANDS.ASIAN_PAINTS, "Apex", "Ivory Coast",     "#F0E8D8", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.BUDGET, ["#E8E0D0","#E0D8C8"]),
];

// ════════════════════════════════════════════════════════════
// BIRLA OPUS — INTERIOR SERIES
// ════════════════════════════════════════════════════════════

// ── Opus Calista (Premium Interior) ────────────────────────
export const OPUS_CALISTA = [
  paint("bo-oc-001", BRANDS.BIRLA_OPUS, "Opus Calista", "Velvet Moon",      "#6B7BA4", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#63739C","#5B6B94"]),
  paint("bo-oc-002", BRANDS.BIRLA_OPUS, "Opus Calista", "Rose Quartz",      "#F7CAC9", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#F0C2C1","#E9BAB9"]),
  paint("bo-oc-003", BRANDS.BIRLA_OPUS, "Opus Calista", "Forest Canopy",    "#5C7A68", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#547260","#4C6A58"]),
  paint("bo-oc-004", BRANDS.BIRLA_OPUS, "Opus Calista", "Urban Clay",       "#C4A882", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#BCA07A","#B49872"]),
  paint("bo-oc-005", BRANDS.BIRLA_OPUS, "Opus Calista", "Nordic White",     "#F8F6F2", USAGE.CEILING,  FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#F2F0EC","#ECEAE6"]),
  paint("bo-oc-006", BRANDS.BIRLA_OPUS, "Opus Calista", "Slate Blue",       "#708090", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#687888","#607080"]),
  paint("bo-oc-007", BRANDS.BIRLA_OPUS, "Opus Calista", "Blush Beige",      "#F2D9D0", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#ECD1C8","#E6C9C0"]),
  paint("bo-oc-008", BRANDS.BIRLA_OPUS, "Opus Calista", "Jungle Mist",      "#8FAF9A", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#87A792","#7F9F8A"]),
  paint("bo-oc-009", BRANDS.BIRLA_OPUS, "Opus Calista", "Copper Blush",     "#D4896A", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#CC8162","#C4795A"]),
  paint("bo-oc-010", BRANDS.BIRLA_OPUS, "Opus Calista", "Storm Cloud",      "#8C9BAA", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#8493A2","#7C8B9A"]),
  paint("bo-oc-011", BRANDS.BIRLA_OPUS, "Opus Calista", "Warm Charcoal",    "#4A4848", USAGE.ACCENT,   FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#424040","#3A3838"]),
  paint("bo-oc-012", BRANDS.BIRLA_OPUS, "Opus Calista", "Pearl Silk",       "#F4EEE8", USAGE.INTERIOR, FINISH.LUXURY_MATTE, PRICE_CAT.PREMIUM, ["#EEE8E2","#E8E2DC"]),
];

// ── Opus Prestige (Mid-Range, Satin) ────────────────────────
export const OPUS_PRESTIGE = [
  paint("bo-op-001", BRANDS.BIRLA_OPUS, "Opus Prestige", "Celestial Blue",  "#4A86C8", USAGE.ACCENT,   FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#4280C0","#3A78B8"]),
  paint("bo-op-002", BRANDS.BIRLA_OPUS, "Opus Prestige", "Herbal Green",    "#6BAA6A", USAGE.ACCENT,   FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#63A262","#5B9A5A"]),
  paint("bo-op-003", BRANDS.BIRLA_OPUS, "Opus Prestige", "Peach Fuzz",      "#FFBE98", USAGE.INTERIOR, FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#F8B690","#F0AE88"]),
  paint("bo-op-004", BRANDS.BIRLA_OPUS, "Opus Prestige", "Sand Dune",       "#DCC8A0", USAGE.INTERIOR, FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#D4C098","#CCB890"]),
  paint("bo-op-005", BRANDS.BIRLA_OPUS, "Opus Prestige", "Lilac Dream",     "#C8B0D8", USAGE.INTERIOR, FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#C0A8D0","#B8A0C8"]),
  paint("bo-op-006", BRANDS.BIRLA_OPUS, "Opus Prestige", "Terracotta Glow", "#D4785A", USAGE.ACCENT,   FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#CC7052","#C4684A"]),
  paint("bo-op-007", BRANDS.BIRLA_OPUS, "Opus Prestige", "Aqua Splash",     "#78D4D0", USAGE.ACCENT,   FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#70CCC8","#68C4C0"]),
  paint("bo-op-008", BRANDS.BIRLA_OPUS, "Opus Prestige", "Warm White",      "#FFF8F0", USAGE.CEILING,  FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#F8F0E8","#F0E8E0"]),
  paint("bo-op-009", BRANDS.BIRLA_OPUS, "Opus Prestige", "Clay Rose",       "#D4A898", USAGE.INTERIOR, FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#CCA090","#C49888"]),
  paint("bo-op-010", BRANDS.BIRLA_OPUS, "Opus Prestige", "Olive Whisper",   "#9AAA72", USAGE.INTERIOR, FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#92A26A","#8A9A62"]),
  paint("bo-op-011", BRANDS.BIRLA_OPUS, "Opus Prestige", "Marigold",        "#F0A818", USAGE.ACCENT,   FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#E8A010","#E09808"]),
  paint("bo-op-012", BRANDS.BIRLA_OPUS, "Opus Prestige", "Dove Grey",       "#C0C0B8", USAGE.INTERIOR, FINISH.SATIN, PRICE_CAT.MIDRANGE, ["#B8B8B0","#B0B0A8"]),
];

// ── Opus Elegance (Budget Interior, Matte) ──────────────────
export const OPUS_ELEGANCE = [
  paint("bo-oe-001", BRANDS.BIRLA_OPUS, "Opus Elegance", "Classic White",   "#FAFAF8", USAGE.CEILING,  FINISH.MATTE, PRICE_CAT.BUDGET, ["#F5F5F3","#F0F0EE"]),
  paint("bo-oe-002", BRANDS.BIRLA_OPUS, "Opus Elegance", "Cream Pearl",     "#F8F0E0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F2E8D8","#ECE0D0"]),
  paint("bo-oe-003", BRANDS.BIRLA_OPUS, "Opus Elegance", "Pastel Blue",     "#D0E8F8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#C8E0F0","#C0D8E8"]),
  paint("bo-oe-004", BRANDS.BIRLA_OPUS, "Opus Elegance", "Mint Fresh",      "#C8EED8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#C0E6D0","#B8DEC8"]),
  paint("bo-oe-005", BRANDS.BIRLA_OPUS, "Opus Elegance", "Peach Blush",     "#F8D8C8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F0D0C0","#E8C8B8"]),
  paint("bo-oe-006", BRANDS.BIRLA_OPUS, "Opus Elegance", "Butter Cream",    "#FFF4D0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F8ECC8","#F0E4C0"]),
  paint("bo-oe-007", BRANDS.BIRLA_OPUS, "Opus Elegance", "Rose Petal",      "#F4C8CC", USAGE.ACCENT,   FINISH.MATTE, PRICE_CAT.BUDGET, ["#ECC0C4","#E4B8BC"]),
  paint("bo-oe-008", BRANDS.BIRLA_OPUS, "Opus Elegance", "Pistachio",       "#D8EEC8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#D0E6C0","#C8DEB8"]),
];

// ════════════════════════════════════════════════════════════
// BIRLA OPUS — EXTERIOR SERIES
// ════════════════════════════════════════════════════════════

export const OPUS_EXTERIOR = [
  paint("bo-ex-001", BRANDS.BIRLA_OPUS, "Opus Exterior", "Heritage Brown",   "#8A6048", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#825840","#7A5038"]),
  paint("bo-ex-002", BRANDS.BIRLA_OPUS, "Opus Exterior", "Terrace Cream",    "#E8D8B8", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#E0D0B0","#D8C8A8"]),
  paint("bo-ex-003", BRANDS.BIRLA_OPUS, "Opus Exterior", "Sky Wash",         "#A8C8E0", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#A0C0D8","#98B8D0"]),
  paint("bo-ex-004", BRANDS.BIRLA_OPUS, "Opus Exterior", "Rust Earth",       "#B86848", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.MIDRANGE, ["#B06040","#A85838"]),
  paint("bo-ex-005", BRANDS.BIRLA_OPUS, "Opus Exterior", "Jungle Grove",     "#587848", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.PREMIUM,  ["#507040","#486838"]),
  paint("bo-ex-006", BRANDS.BIRLA_OPUS, "Opus Exterior", "Sand Castle",      "#D8C4A0", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.BUDGET,   ["#D0BC98","#C8B490"]),
  paint("bo-ex-007", BRANDS.BIRLA_OPUS, "Opus Exterior", "Stone White",      "#F0ECE4", USAGE.EXTERIOR, FINISH.WEATHER_GUARD, PRICE_CAT.BUDGET,   ["#E8E4DC","#E0DCD4"]),
];

// ── Birla Opus Interior Series (Budget) ─────────────────────
export const OPUS_INTERIOR = [
  paint("bo-in-001", BRANDS.BIRLA_OPUS, "Opus Interior", "Fresh White",     "#F8F8F5", USAGE.CEILING,  FINISH.MATTE, PRICE_CAT.BUDGET, ["#F4F4F1","#F0F0ED"]),
  paint("bo-in-002", BRANDS.BIRLA_OPUS, "Opus Interior", "Vanilla Sky",     "#FFF0D8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F8E8D0","#F0E0C8"]),
  paint("bo-in-003", BRANDS.BIRLA_OPUS, "Opus Interior", "Cool Mint",       "#D0F0E8", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#C8E8E0","#C0E0D8"]),
  paint("bo-in-004", BRANDS.BIRLA_OPUS, "Opus Interior", "Sunflower Pale",  "#FFF4C0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F8ECB8","#F0E4B0"]),
  paint("bo-in-005", BRANDS.BIRLA_OPUS, "Opus Interior", "Lilac Soft",      "#E8D8F8", USAGE.ACCENT,   FINISH.MATTE, PRICE_CAT.BUDGET, ["#E0D0F0","#D8C8E8"]),
  paint("bo-in-006", BRANDS.BIRLA_OPUS, "Opus Interior", "Rose Blush",      "#F8D8E0", USAGE.INTERIOR, FINISH.MATTE, PRICE_CAT.BUDGET, ["#F0D0D8","#E8C8D0"]),
];

// ════════════════════════════════════════════════════════════
// AGGREGATED EXPORTS
// ════════════════════════════════════════════════════════════

export const ALL_PAINTS = [
  ...ROYALE, ...ROYALE_ASPIRA, ...ROYALE_SHYNE, ...ROYALE_HEALTH,
  ...PREMIUM_EMULSION, ...TRACTOR_EMULSION,
  ...APEX_ULTIMA, ...APEX_ADVANCED, ...APEX,
  ...OPUS_CALISTA, ...OPUS_PRESTIGE, ...OPUS_ELEGANCE,
  ...OPUS_EXTERIOR, ...OPUS_INTERIOR,
];

export const PAINT_BY_BRAND = {
  [BRANDS.ASIAN_PAINTS]: [
    ...ROYALE, ...ROYALE_ASPIRA, ...ROYALE_SHYNE, ...ROYALE_HEALTH,
    ...PREMIUM_EMULSION, ...TRACTOR_EMULSION,
    ...APEX_ULTIMA, ...APEX_ADVANCED, ...APEX,
  ],
  [BRANDS.BIRLA_OPUS]: [
    ...OPUS_CALISTA, ...OPUS_PRESTIGE, ...OPUS_ELEGANCE,
    ...OPUS_EXTERIOR, ...OPUS_INTERIOR,
  ],
};

export const SERIES_INFO = {
  "Royale":               { priceRange: "₹₹₹₹", finish: FINISH.LUXURY_MATTE, category: PRICE_CAT.PREMIUM,  usage: "Interior", desc: "Luxury smooth finish — India's finest premium emulsion" },
  "Royale Aspira":        { priceRange: "₹₹₹₹", finish: FINISH.SMOOTH_MATTE, category: PRICE_CAT.PREMIUM,  usage: "Interior", desc: "Silky smooth texture with superior coverage" },
  "Royale Shyne":         { priceRange: "₹₹₹₹", finish: FINISH.SHYNE,        category: PRICE_CAT.PREMIUM,  usage: "Interior", desc: "High-sheen satin finish for a glamorous look" },
  "Royale Health Shield": { priceRange: "₹₹₹",  finish: FINISH.MATTE,        category: PRICE_CAT.PREMIUM,  usage: "Interior", desc: "Anti-bacterial protection with premium finish" },
  "Premium Emulsion":     { priceRange: "₹₹₹",  finish: FINISH.MATTE,        category: PRICE_CAT.MIDRANGE, usage: "Interior", desc: "Smooth mid-range emulsion, excellent value" },
  "Tractor Emulsion":     { priceRange: "₹₹",   finish: FINISH.MATTE,        category: PRICE_CAT.BUDGET,   usage: "Interior", desc: "Reliable budget paint with good coverage" },
  "Apex Ultima":          { priceRange: "₹₹₹₹", finish: FINISH.WEATHER_GUARD, category: PRICE_CAT.PREMIUM, usage: "Exterior", desc: "Premium exterior — 10-year weather protection" },
  "Apex Advanced":        { priceRange: "₹₹₹",  finish: FINISH.WEATHER_GUARD, category: PRICE_CAT.MIDRANGE, usage: "Exterior", desc: "Advanced exterior protection, excellent durability" },
  "Apex":                 { priceRange: "₹₹",   finish: FINISH.WEATHER_GUARD, category: PRICE_CAT.BUDGET,   usage: "Exterior", desc: "Trusted exterior paint at an affordable price" },
  "Opus Calista":         { priceRange: "₹₹₹₹", finish: FINISH.LUXURY_MATTE, category: PRICE_CAT.PREMIUM,  usage: "Interior", desc: "Birla Opus flagship — artisan luxury matte finish" },
  "Opus Prestige":        { priceRange: "₹₹₹",  finish: FINISH.SATIN,        category: PRICE_CAT.MIDRANGE, usage: "Interior", desc: "Contemporary satin finish with vibrant colors" },
  "Opus Elegance":        { priceRange: "₹₹",   finish: FINISH.MATTE,        category: PRICE_CAT.BUDGET,   usage: "Interior", desc: "Budget-friendly with an elegant finish" },
  "Opus Exterior":        { priceRange: "₹₹₹",  finish: FINISH.WEATHER_GUARD, category: PRICE_CAT.MIDRANGE, usage: "Exterior", desc: "Birla Opus exterior protection range" },
  "Opus Interior":        { priceRange: "₹₹",   finish: FINISH.MATTE,        category: PRICE_CAT.BUDGET,   usage: "Interior", desc: "Simple, reliable interior solution" },
};

// Series by budget for smart selection
export const SERIES_BY_BUDGET = {
  [PRICE_CAT.BUDGET]: {
    [BRANDS.ASIAN_PAINTS]: { interior: "Tractor Emulsion", exterior: "Apex" },
    [BRANDS.BIRLA_OPUS]:   { interior: "Opus Elegance",    exterior: "Opus Exterior" },
  },
  [PRICE_CAT.MIDRANGE]: {
    [BRANDS.ASIAN_PAINTS]: { interior: "Premium Emulsion", exterior: "Apex Advanced" },
    [BRANDS.BIRLA_OPUS]:   { interior: "Opus Prestige",    exterior: "Opus Exterior" },
  },
  [PRICE_CAT.PREMIUM]: {
    [BRANDS.ASIAN_PAINTS]: { interior: "Royale Aspira", exterior: "Apex Ultima" },
    [BRANDS.BIRLA_OPUS]:   { interior: "Opus Calista",  exterior: "Opus Exterior" },
  },
};
