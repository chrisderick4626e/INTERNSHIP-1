import React, { useState } from "react";
import "./ColorPalette.css";
import { matchHexToBrands } from "../utils/colorMatcher.js";
import { BRANDS, PRICE_CAT } from "../data/paintDatabase.js";

function ColorSwatch({ color, index }) {
  const [copied, setCopied] = useState(false);
  const [showMatch, setShowMatch] = useState(false);

  const copyHex = () => {
    navigator.clipboard.writeText(color.hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const matches = showMatch
    ? matchHexToBrands(color.hex, PRICE_CAT.MIDRANGE, "interior")
    : null;

  return (
    <div className="swatch-card">
      <div
        className="swatch-color"
        style={{ background: color.hex }}
        onClick={copyHex}
        role="button"
        title="Click to copy HEX"
      >
        {copied && <span className="copied-badge">Copied!</span>}
      </div>

      <div className="swatch-info">
        <p className="swatch-hex" onClick={copyHex}>{color.hex}</p>
        <p className="swatch-label">{color.label || "Extracted Color"}</p>

        <div className="swatch-tags">
          {color.isWarm    && <span className="tag warm">Warm</span>}
          {color.isCool    && <span className="tag cool">Cool</span>}
          {color.isNeutral && <span className="tag neutral">Neutral</span>}
          {color.isLight   && <span className="tag light">Light</span>}
          {color.isDark    && <span className="tag dark">Deep</span>}
        </div>

        {/* RGB value */}
        {color.r != null && (
          <p className="swatch-rgb">RGB({color.r}, {color.g}, {color.b})</p>
        )}

        <button className="match-toggle" onClick={() => setShowMatch(v => !v)}>
          {showMatch ? "▲ Hide" : "▼ Show"} brand matches
        </button>

        {showMatch && matches && (
          <div className="brand-matches">
            {[BRANDS.ASIAN_PAINTS, BRANDS.BIRLA_OPUS].map(brand => {
              const m = matches[brand]?.primary;
              if (!m) return null;
              return (
                <div key={brand} className="brand-match-row">
                  <div className="brand-match-dot" style={{ background: m.hex }} />
                  <div className="brand-match-info">
                    <p className="brand-match-name">{m.shadeName}</p>
                    <p className="brand-match-series">{m.brand} · {m.series}</p>
                    <p className="brand-match-hex">{m.hex}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ColorPalette({ colors }) {
  if (!colors || colors.length === 0) return null;

  // Build gradient bar
  const gradientColors = colors.slice(0, 6).map(c => c.hex).join(", ");

  return (
    <div className="color-palette-section card" id="detected-colors">
      <div className="section-header">
        <span className="section-icon">🔬</span>
        <div>
          <p className="section-title">Detected Colors</p>
          <p className="section-desc">{colors.length} dominant colors extracted from your photo</p>
        </div>
      </div>

      {/* Color bar */}
      <div className="color-bar" style={{ background: `linear-gradient(90deg, ${gradientColors})` }} />

      {/* Swatches */}
      <div className="swatches-grid">
        {colors.map((color, i) => (
          <ColorSwatch key={color.hex + i} color={color} index={i} />
        ))}
      </div>
    </div>
  );
}
