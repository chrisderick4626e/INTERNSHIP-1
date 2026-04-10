// ============================================================
// EMCO SALES Paint Database
// Real-world-inspired shade data for Asian Paints, Birla Opus,
// and Nippon Paint. Each shade includes HEX, series, usage type.
// ============================================================

export const BRANDS = {
  ASIAN_PAINTS: "Asian Paints",
  BIRLA_OPUS: "Birla Opus",
  NIPPON: "Nippon Paint",
};

export const USAGE = {
  INTERIOR: "Interior Wall",
  EXTERIOR: "Exterior Wall",
  CEILING: "Ceiling",
  ACCENT: "Accent / Feature Wall",
  TRIM: "Trim / Border",
};

// ─── ASIAN PAINTS ────────────────────────────────────────────

const asianPaintsRoyale = [
  { id: "ap-r-001", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Ivory Bliss", hex: "#FAF3E0", usage: USAGE.INTERIOR },
  { id: "ap-r-002", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Cashmere Cream", hex: "#F5E6C8", usage: USAGE.INTERIOR },
  { id: "ap-r-003", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Antique White", hex: "#FAEBD7", usage: USAGE.INTERIOR },
  { id: "ap-r-004", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Warm Linen", hex: "#E8D5B0", usage: USAGE.INTERIOR },
  { id: "ap-r-005", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Dusty Rose", hex: "#D4A5A5", usage: USAGE.ACCENT },
  { id: "ap-r-006", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Sage Whisper", hex: "#BCB8A4", usage: USAGE.INTERIOR },
  { id: "ap-r-007", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Powder Blue", hex: "#B0C4DE", usage: USAGE.ACCENT },
  { id: "ap-r-008", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Misty Lavender", hex: "#C8B8D8", usage: USAGE.ACCENT },
  { id: "ap-r-009", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Almond Silk", hex: "#E8C9A0", usage: USAGE.INTERIOR },
  { id: "ap-r-010", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Pearl White", hex: "#F5F5F0", usage: USAGE.CEILING },
  { id: "ap-r-011", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Sandstone", hex: "#C2A882", usage: USAGE.INTERIOR },
  { id: "ap-r-012", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Terracotta Blush", hex: "#CB8B7A", usage: USAGE.ACCENT },
  { id: "ap-r-013", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Sage Green", hex: "#9CAF88", usage: USAGE.INTERIOR },
  { id: "ap-r-014", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Ocean Mist", hex: "#7EB8C8", usage: USAGE.ACCENT },
  { id: "ap-r-015", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Champagne", hex: "#F7E7CE", usage: USAGE.INTERIOR },
  { id: "ap-r-016", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Warm Grey", hex: "#B0A899", usage: USAGE.INTERIOR },
  { id: "ap-r-017", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Mauve Mist", hex: "#CEB4C0", usage: USAGE.ACCENT },
  { id: "ap-r-018", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Deep Teal", hex: "#4A8F8C", usage: USAGE.ACCENT },
  { id: "ap-r-019", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Midnight Blue", hex: "#1C3A5E", usage: USAGE.ACCENT },
  { id: "ap-r-020", brand: BRANDS.ASIAN_PAINTS, series: "Royale", shadeName: "Burnished Gold", hex: "#C8A85A", usage: USAGE.TRIM },
];

const asianPaintsTractor = [
  { id: "ap-t-001", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Pure White", hex: "#FFFFFF", usage: USAGE.CEILING },
  { id: "ap-t-002", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Off White", hex: "#FAF8F5", usage: USAGE.CEILING },
  { id: "ap-t-003", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Cream Yellow", hex: "#FFF8DC", usage: USAGE.INTERIOR },
  { id: "ap-t-004", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Pista Green", hex: "#D4E6C3", usage: USAGE.INTERIOR },
  { id: "ap-t-005", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Sky Blue", hex: "#C8E0F0", usage: USAGE.INTERIOR },
  { id: "ap-t-006", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Peach Pink", hex: "#FFD5C8", usage: USAGE.INTERIOR },
  { id: "ap-t-007", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Butter Yellow", hex: "#FFF0A0", usage: USAGE.INTERIOR },
  { id: "ap-t-008", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Mint Fresh", hex: "#C8F0D8", usage: USAGE.INTERIOR },
  { id: "ap-t-009", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Pastel Lilac", hex: "#E0D0EE", usage: USAGE.INTERIOR },
  { id: "ap-t-010", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Sandstone Beige", hex: "#E8D8B8", usage: USAGE.INTERIOR },
  { id: "ap-t-011", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Light Coral", hex: "#FFB5A0", usage: USAGE.ACCENT },
  { id: "ap-t-012", brand: BRANDS.ASIAN_PAINTS, series: "Tractor Emulsion", shadeName: "Warm Ivory", hex: "#F5F0E0", usage: USAGE.INTERIOR },
];

const asianPaintsApex = [
  { id: "ap-a-001", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Desert Sand", hex: "#D8C09A", usage: USAGE.EXTERIOR },
  { id: "ap-a-002", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Terracotta", hex: "#C87050", usage: USAGE.EXTERIOR },
  { id: "ap-a-003", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Stone Grey", hex: "#9A9A8C", usage: USAGE.EXTERIOR },
  { id: "ap-a-004", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Earthy Brown", hex: "#A0785A", usage: USAGE.EXTERIOR },
  { id: "ap-a-005", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Heritage Ochre", hex: "#C8A040", usage: USAGE.EXTERIOR },
  { id: "ap-a-006", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Monsoon Blue", hex: "#6890A8", usage: USAGE.EXTERIOR },
  { id: "ap-a-007", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Rust Orange", hex: "#B85820", usage: USAGE.EXTERIOR },
  { id: "ap-a-008", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Olive Drab", hex: "#7A8860", usage: USAGE.EXTERIOR },
  { id: "ap-a-009", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Chalk White", hex: "#F5F0E8", usage: USAGE.EXTERIOR },
  { id: "ap-a-010", brand: BRANDS.ASIAN_PAINTS, series: "Apex Exterior", shadeName: "Warm Beige", hex: "#D8C8A8", usage: USAGE.EXTERIOR },
];

// ─── BIRLA OPUS ──────────────────────────────────────────────

const birlaOpusPremium = [
  { id: "bo-p-001", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Velvet Moon", hex: "#6B7BA4", usage: USAGE.ACCENT },
  { id: "bo-p-002", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Rose Quartz", hex: "#F7CAC9", usage: USAGE.INTERIOR },
  { id: "bo-p-003", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Forest Canopy", hex: "#5C7A68", usage: USAGE.ACCENT },
  { id: "bo-p-004", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Urban Clay", hex: "#C4A882", usage: USAGE.INTERIOR },
  { id: "bo-p-005", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Nordic White", hex: "#F8F6F2", usage: USAGE.CEILING },
  { id: "bo-p-006", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Slate Blue", hex: "#708090", usage: USAGE.ACCENT },
  { id: "bo-p-007", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Blush Beige", hex: "#F2D9D0", usage: USAGE.INTERIOR },
  { id: "bo-p-008", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Jungle Mist", hex: "#8FAF9A", usage: USAGE.INTERIOR },
  { id: "bo-p-009", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Copper Blush", hex: "#D4896A", usage: USAGE.ACCENT },
  { id: "bo-p-010", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Storm Cloud", hex: "#8C9BAA", usage: USAGE.ACCENT },
  { id: "bo-p-011", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Warm Charcoal", hex: "#4A4848", usage: USAGE.ACCENT },
  { id: "bo-p-012", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Lemon Zest", hex: "#F5E88A", usage: USAGE.ACCENT },
  { id: "bo-p-013", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Dusty Pink", hex: "#E8B4B8", usage: USAGE.INTERIOR },
  { id: "bo-p-014", brand: BRANDS.BIRLA_OPUS, series: "Everlast Premium", shadeName: "Thunder Grey", hex: "#6A6A72", usage: USAGE.INTERIOR },
];

const birlaOpusTrend = [
  { id: "bo-t-001", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Celestial Blue", hex: "#4A86C8", usage: USAGE.ACCENT },
  { id: "bo-t-002", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Herbal Green", hex: "#6BAA6A", usage: USAGE.ACCENT },
  { id: "bo-t-003", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Peach Fuzz", hex: "#FFBE98", usage: USAGE.INTERIOR },
  { id: "bo-t-004", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Midnight Ink", hex: "#1A2A4A", usage: USAGE.ACCENT },
  { id: "bo-t-005", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Sand Dune", hex: "#DCC8A0", usage: USAGE.INTERIOR },
  { id: "bo-t-006", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Lilac Dream", hex: "#C8B0D8", usage: USAGE.INTERIOR },
  { id: "bo-t-007", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Terracotta Glow", hex: "#D4785A", usage: USAGE.ACCENT },
  { id: "bo-t-008", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Aqua Splash", hex: "#78D4D0", usage: USAGE.ACCENT },
  { id: "bo-t-009", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Warm White", hex: "#FFF8F0", usage: USAGE.CEILING },
  { id: "bo-t-010", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Clay Rose", hex: "#D4A898", usage: USAGE.INTERIOR },
  { id: "bo-t-011", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Olive Whisper", hex: "#9AAA72", usage: USAGE.INTERIOR },
  { id: "bo-t-012", brand: BRANDS.BIRLA_OPUS, series: "Opus Trends", shadeName: "Marigold", hex: "#F0A818", usage: USAGE.ACCENT },
];

// ─── NIPPON PAINT ────────────────────────────────────────────

const nipponSatinGlo = [
  { id: "np-s-001", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Moonlight White", hex: "#F8F8F5", usage: USAGE.CEILING },
  { id: "np-s-002", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Vanilla Cream", hex: "#F5EAD5", usage: USAGE.INTERIOR },
  { id: "np-s-003", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Sea Salt", hex: "#E8F0F5", usage: USAGE.INTERIOR },
  { id: "np-s-004", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Bamboo Shoot", hex: "#D0E0C0", usage: USAGE.INTERIOR },
  { id: "np-s-005", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Soft Petal", hex: "#FFCCD5", usage: USAGE.ACCENT },
  { id: "np-s-006", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Morning Mist", hex: "#E0E8F0", usage: USAGE.INTERIOR },
  { id: "np-s-007", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Warm Flush", hex: "#F0D8C8", usage: USAGE.INTERIOR },
  { id: "np-s-008", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Azure Haze", hex: "#9DB8D2", usage: USAGE.ACCENT },
  { id: "np-s-009", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Pistachio", hex: "#A8C8A0", usage: USAGE.INTERIOR },
  { id: "np-s-010", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Pampas", hex: "#E8DDD0", usage: USAGE.INTERIOR },
  { id: "np-s-011", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Lavender Breeze", hex: "#C8B8E0", usage: USAGE.ACCENT },
  { id: "np-s-012", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Calamine", hex: "#F0C8BC", usage: USAGE.INTERIOR },
  { id: "np-s-013", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Pure Linen", hex: "#EEE8DC", usage: USAGE.INTERIOR },
  { id: "np-s-014", brand: BRANDS.NIPPON, series: "Satin Glo", shadeName: "Ocean Breeze", hex: "#6AAABB", usage: USAGE.ACCENT },
];

const nipponWeatherbond = [
  { id: "np-w-001", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Sandstone White", hex: "#F0E8D8", usage: USAGE.EXTERIOR },
  { id: "np-w-002", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Brick Red", hex: "#C05030", usage: USAGE.EXTERIOR },
  { id: "np-w-003", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Forest Dew", hex: "#6A9070", usage: USAGE.EXTERIOR },
  { id: "np-w-004", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Pebble Grey", hex: "#A8A0A0", usage: USAGE.EXTERIOR },
  { id: "np-w-005", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Golden Wheat", hex: "#D8B870", usage: USAGE.EXTERIOR },
  { id: "np-w-006", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Teal Coast", hex: "#5A8A90", usage: USAGE.EXTERIOR },
  { id: "np-w-007", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Cocoa Brown", hex: "#7A5840", usage: USAGE.EXTERIOR },
  { id: "np-w-008", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Denim Blue", hex: "#5870A0", usage: USAGE.EXTERIOR },
  { id: "np-w-009", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Ivory Coast", hex: "#EDE0C8", usage: USAGE.EXTERIOR },
  { id: "np-w-010", brand: BRANDS.NIPPON, series: "Weatherbond Exterior", shadeName: "Burnt Umber", hex: "#9A5830", usage: USAGE.EXTERIOR },
];

// ─── FULL DATABASE EXPORT ────────────────────────────────────

export const ALL_PAINTS = [
  ...asianPaintsRoyale,
  ...asianPaintsTractor,
  ...asianPaintsApex,
  ...birlaOpusPremium,
  ...birlaOpusTrend,
  ...nipponSatinGlo,
  ...nipponWeatherbond,
];

export const PAINT_BY_BRAND = {
  [BRANDS.ASIAN_PAINTS]: [...asianPaintsRoyale, ...asianPaintsTractor, ...asianPaintsApex],
  [BRANDS.BIRLA_OPUS]: [...birlaOpusPremium, ...birlaOpusTrend],
  [BRANDS.NIPPON]: [...nipponSatinGlo, ...nipponWeatherbond],
};

export const PAINT_SERIES_INFO = {
  "Royale": { priceRange: "₹₹₹", description: "Luxury smooth finish for premium interiors" },
  "Tractor Emulsion": { priceRange: "₹", description: "Affordable & durable for everyday interiors" },
  "Apex Exterior": { priceRange: "₹₹", description: "Weather-resistant for exterior walls" },
  "Everlast Premium": { priceRange: "₹₹₹", description: "Modern premium finishes by Birla Opus" },
  "Opus Trends": { priceRange: "₹₹", description: "Trendy designer shades for contemporary homes" },
  "Satin Glo": { priceRange: "₹₹", description: "Smooth odour-less finish, eco-friendly interior" },
  "Weatherbond Exterior": { priceRange: "₹₹", description: "Superior weathering protection for exteriors" },
};
