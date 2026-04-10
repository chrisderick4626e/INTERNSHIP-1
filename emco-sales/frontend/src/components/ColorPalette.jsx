import React, { useState } from "react";
import { findClosestPaints } from "../utils/colorMatcher";
import "./ColorPalette.css";

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function ColorSwatch({ color, index }) {
  const [copied, setCopied] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  const matches = findClosestPaints(color.hex);

  const handleCopy = () => {
    copyToClipboard(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="swatch-card">
      <div
        className="swatch-color"
        style={{ background: color.hex }}
        onClick={handleCopy}
        title="Click to copy HEX"
        id={`swatch-${index}`}
      >
        {copied && <span className="copied-badge">Copied!</span>}
      </div>
      <div className="swatch-info">
        <div className="swatch-hex" onClick={handleCopy}>{color.hex}</div>
        <div className="swatch-label">{color.label || "Detected Tone"}</div>
        <div className="swatch-tags">
          {color.isWarm && <span className="tag warm">🔥 Warm</span>}
          {color.isCool && <span className="tag cool">❄️ Cool</span>}
          {color.isNeutral && <span className="tag neutral">⚪ Neutral</span>}
        </div>
        <button
          className="match-toggle"
          onClick={() => setShowMatches((v) => !v)}
          id={`match-toggle-${index}`}
        >
          {showMatches ? "Hide" : "Nearest"} Brand Paints ▾
        </button>
        {showMatches && (
          <div className="brand-matches">
            {matches.slice(0, 3).map((m) => (
              <div className="brand-match-row" key={m.id}>
                <div className="brand-match-dot" style={{ background: m.hex }} />
                <div className="brand-match-info">
                  <span className="brand-match-name">{m.shadeName}</span>
                  <span className="brand-match-series">{m.brand} — {m.series}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ColorPalette({ colors }) {
  if (!colors || colors.length === 0) return null;

  return (
    <section className="palette-section card" id="detected-colors">
      <div className="section-header">
        <span className="section-icon">🎨</span>
        <div>
          <h2 className="section-title">Detected Colors</h2>
          <p className="section-desc">{colors.length} dominant colors extracted from your image</p>
        </div>
      </div>

      {/* Wide color bar */}
      <div className="color-bar" aria-label="Color palette bar">
        {colors.map((c, i) => (
          <div
            key={i}
            className="color-bar-segment"
            style={{ background: c.hex, flex: 1 }}
            title={c.hex}
          />
        ))}
      </div>

      <div className="swatches-grid">
        {colors.map((c, i) => (
          <ColorSwatch key={i} color={c} index={i} />
        ))}
      </div>
    </section>
  );
}
