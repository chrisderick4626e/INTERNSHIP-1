// ============================================================
// EMCO SALES — Room Painter Engine v1
// Canvas-based pixel-level wall color simulation
// No ML required — pure HSL-based wall detection
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

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

// ─── Region classifier ────────────────────────────────────────
// Returns which color to blend this pixel with, or null to skip
function classifyPixel(x, y, W, H, r, g, b) {
  const { l, s } = rgbToHsl(r, g, b);
  const fy = y / H; // 0 = top, 1 = bottom
  const fx = x / W; // 0 = left, 1 = right

  // Skip very dark pixels — furniture, shadows, objects
  if (l < 28) return null;

  // Ceiling zone — top 20%, light pixels
  if (fy < 0.20 && l > 40) return "ceiling";

  // Wall-like pixels: reasonably light & not too saturated
  // This catches most painted wall surfaces
  if (s < 55 && l > 35) {
    // Narrow side trim (very edges)
    if (fx < 0.045 || fx > 0.955) return "trim";

    // Right accent wall (rightmost 28%, but not edge trim)
    if (fx > 0.72 && fy > 0.18 && fy < 0.90) return "accent";

    // Everything else — primary wall
    return "primary";
  }

  return null;
}

// ─── Core painter function ────────────────────────────────────
// palette: { primaryWall: {hex}, accentWall: {hex}, ceiling: {hex}, trim: {hex} }
// options.blendBase: 0.0–1.0 (default 0.50) — how strongly to blend
// Returns: Promise<string>  (data URL)  or  null on error
export async function paintRoom(imageUrl, palette, options = {}) {
  const { blendBase = 0.50 } = options;

  // Guard: need all 4 palette roles
  if (!palette?.primaryWall?.hex || !palette?.accentWall?.hex ||
      !palette?.ceiling?.hex     || !palette?.trim?.hex) {
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Downscale for performance (max 800px wide)
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

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i   = (y * W + x) * 4;
          const r   = px[i], g = px[i + 1], b = px[i + 2];
          const { l } = rgbToHsl(r, g, b);

          const region = classifyPixel(x, y, W, H, r, g, b);
          if (!region) continue;

          const target = colors[region];
          // Blend more strongly on brighter pixels (wall highlights blend well)
          // Blend less on mid-tones to preserve texture
          const blend = blendBase * Math.pow(l / 100, 0.4);

          px[i]     = lerp(r, target.r, blend);
          px[i + 1] = lerp(g, target.g, blend);
          px[i + 2] = lerp(b, target.b, blend);
          // alpha unchanged
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };

    img.onerror = () => resolve(null);
    img.src    = imageUrl;
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
      hex:  paint?.hex  || roleData.hex,  // fallback to palette color
      name: paint?.shadeName || roleData.name,
      series: paint?.series || "—",
      finish: paint?.finish || "—",
      role:  roleData.role || role,
    };
  }
  return result;
}
