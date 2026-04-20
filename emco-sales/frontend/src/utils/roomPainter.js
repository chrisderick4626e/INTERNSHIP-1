// ============================================================
// EMCO SALES — Room Painter Engine v3
// HSL-space color transfer for accurate, realistic wall painting
// Preserves texture/shadows while clearly changing wall color
// ============================================================

// ─── Color utilities ─────────────────────────────────────────
function hexToRgb(hex) {
  const n = hex.replace("#", "");
  return {
    r: parseInt(n.slice(0, 2), 16),
    g: parseInt(n.slice(2, 4), 16),
    b: parseInt(n.slice(4, 6), 16),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
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

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255),
  };
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function lerpVal(a, b, t) { return a + (b - a) * t; }

// ─── Region classifier ────────────────────────────────────────
// Smart hue-based filtering: skips sky, vegetation, and saturated objects
function classifyPixel(x, y, W, H, r, g, b) {
  const { h, s, l } = rgbToHsl(r, g, b);
  const fy = y / H;
  const fx = x / W;

  // ── SKIP: definite non-wall pixels ──

  // Very dark → furniture, deep shadows
  if (l < 15) return null;

  // Pure white glare / light sources
  if (l > 97) return null;

  // Sky: blue-cyan hue with noticeable saturation
  if (h >= 170 && h <= 270 && s > 12) return null;

  // Vegetation: green hue with noticeable saturation
  if (h >= 65 && h <= 165 && s > 15) return null;

  // Very saturated objects — flowers, bright decor, colored furniture
  if (s > 55) return null;

  // ── CLASSIFY remaining neutral/low-sat pixels as wall regions ──

  // Floor region (bottom 10%) — typically floor, skip
  if (fy > 0.90) return null;

  // Ceiling: top 10%, light neutral pixels
  if (fy < 0.10 && l > 40) return "ceiling";

  // Edge trim: narrow side borders
  if (fx < 0.03 || fx > 0.97) return "trim";

  // Accent wall: right 28% of image
  if (fx > 0.72 && fy > 0.10 && fy < 0.90) return "accent";

  // Primary wall: all remaining neutral-ish pixels
  if (l > 18) return "primary";

  return null;
}

// ─── HSL Color Transfer ───────────────────────────────────────
// Instead of crude RGB lerp, this:
// 1. Adopts the TARGET hue fully → wall clearly shows new color
// 2. Blends saturation toward target → new color's richness applies
// 3. Mostly preserves original luminance → texture/shadows stay intact
function transferColor(origR, origG, origB, targetR, targetG, targetB, strength) {
  const orig   = rgbToHsl(origR, origG, origB);
  const target = rgbToHsl(targetR, targetG, targetB);

  // Fully adopt target hue (this is what makes the wall look "painted")
  const newH = target.h;

  // Blend saturation: mostly target, but keep some original for texture
  const newS = clamp(lerpVal(orig.s, target.s, strength * 0.85), 0, 100);

  // Luminance: mostly keep original (preserves shadows, highlights, texture)
  // Only shift 30-40% toward target luminance
  const newL = clamp(lerpVal(orig.l, target.l, strength * 0.35), 0, 100);

  return hslToRgb(newH, newS, newL);
}

// ─── Core painter function ────────────────────────────────────
// palette: { primaryWall: {hex}, accentWall: {hex}, ceiling: {hex}, trim: {hex} }
// options.strength: 0.0–1.0 (default 0.80) — color transfer strength
export async function paintRoom(imageUrl, palette, options = {}) {
  const { strength = 0.80 } = options;

  // Guard: need all 4 palette roles
  if (!palette?.primaryWall?.hex || !palette?.accentWall?.hex ||
      !palette?.ceiling?.hex     || !palette?.trim?.hex) {
    console.warn("[RoomPainter] Missing palette roles:", palette);
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const MAX_W = 800;
      const scale = img.width > MAX_W ? MAX_W / img.width : 1;
      const W = Math.round(img.width  * scale);
      const H = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, W, H);

      const imgData = ctx.getImageData(0, 0, W, H);
      const px      = imgData.data;

      const colors = {
        primary: hexToRgb(palette.primaryWall.hex),
        accent:  hexToRgb(palette.accentWall.hex),
        ceiling: hexToRgb(palette.ceiling.hex),
        trim:    hexToRgb(palette.trim.hex),
      };

      // Debug: track region counts
      const regionCounts = { primary: 0, accent: 0, ceiling: 0, trim: 0, skipped: 0 };

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const r = px[i], g = px[i + 1], b = px[i + 2];

          const region = classifyPixel(x, y, W, H, r, g, b);
          if (!region) {
            regionCounts.skipped++;
            continue;
          }

          regionCounts[region]++;
          const target = colors[region];

          // HSL color transfer — accurate color, preserved texture
          const result = transferColor(r, g, b, target.r, target.g, target.b, strength);

          px[i]     = result.r;
          px[i + 1] = result.g;
          px[i + 2] = result.b;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Debug logging
      const totalPixels = W * H;
      const painted = regionCounts.primary + regionCounts.accent + regionCounts.ceiling + regionCounts.trim;
      console.log("[RoomPainter v3] ─── Debug ───");
      console.log("[RoomPainter v3] Canvas:", W, "×", H, "=", totalPixels, "px");
      console.log("[RoomPainter v3] Strength:", strength);
      console.log("[RoomPainter v3] Colors:", {
        primary: palette.primaryWall.hex,
        accent:  palette.accentWall.hex,
        ceiling: palette.ceiling.hex,
        trim:    palette.trim.hex,
      });
      console.log("[RoomPainter v3] Regions:", regionCounts);
      console.log("[RoomPainter v3] Painted:", painted, "/", totalPixels,
                  `(${Math.round(painted / totalPixels * 100)}%)`);

      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };

    img.onerror = () => {
      console.error("[RoomPainter] Failed to load image:", imageUrl?.slice(0, 80));
      resolve(null);
    };
    img.src = imageUrl;
  });
}

// ─── Extract per-brand hex palette from matched data ─────────
// matchedPalette: output of matchPaletteToBrands()
// brand: "Asian Paints" | "Birla Opus"
export function extractBrandPalette(matchedPalette, brand) {
  if (!matchedPalette) return null;
  const roles  = ["primaryWall", "accentWall", "ceiling", "trim", "complementary"];
  const result = {};

  for (const role of roles) {
    const roleData = matchedPalette[role];
    if (!roleData) continue;

    const brandData = roleData.brands?.[brand];
    const paint     = brandData?.primary;

    result[role] = {
      hex:  paint?.hex  || roleData.hex,
      name: paint?.shadeName || roleData.name,
      series: paint?.series || "—",
      finish: paint?.finish || "—",
      role:  roleData.role || role,
    };
  }
  return result;
}
