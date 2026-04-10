import React from "react";
import "./PaletteSelector.css";

const STYLE_META = {
  minimal: { gradient: "linear-gradient(135deg,#f8fafc,#e2e8f0)", border: "#cbd5e1" },
  luxury:  { gradient: "linear-gradient(135deg,#1c1c2e,#2a1a3e)", border: "#7c3aed" },
  budget:  { gradient: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "#16a34a" },
};

function PaletteCard({ palette, isSelected, onClick }) {
  const meta = STYLE_META[palette.style] || STYLE_META.minimal;
  const colorEntries = Object.values(palette.colors);

  return (
    <button
      className={`palette-card ${isSelected ? "selected" : ""}`}
      style={{ "--card-border": meta.border }}
      onClick={onClick}
      id={`palette-${palette.style}`}
    >
      <div className="palette-card-header">
        <span className="palette-emoji">{palette.emoji}</span>
        <div>
          <div className="palette-name">{palette.name}</div>
          <div className="palette-desc">{palette.description}</div>
        </div>
        {isSelected && <span className="selected-badge">✓ Selected</span>}
      </div>

      {/* Color row preview */}
      <div className="palette-color-row" aria-label={`${palette.name} color preview`}>
        {colorEntries.map((c, i) => (
          <div
            key={i}
            className="palette-color-dot"
            style={{ background: c.hex }}
            title={`${c.label}: ${c.hex}`}
          />
        ))}
      </div>

      {/* Color labels */}
      <div className="palette-labels">
        {colorEntries.map((c, i) => (
          <div key={i} className="palette-label-item">
            <div className="palette-label-dot" style={{ background: c.hex }} />
            <div>
              <div className="palette-label-name">{c.label}</div>
              <div className="palette-label-hex">{c.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}

export default function PaletteSelector({ palettes, selectedPalette, onSelect }) {
  if (!palettes || palettes.length === 0) return null;

  return (
    <section className="palette-selector card" id="palette-suggestions">
      <div className="section-header">
        <span className="section-icon">🖌️</span>
        <div>
          <h2 className="section-title">Suggested Palettes</h2>
          <p className="section-desc">Choose a style that matches your home vision</p>
        </div>
      </div>

      <div className="palette-cards-list">
        {palettes.map((palette) => (
          <PaletteCard
            key={palette.style}
            palette={palette}
            isSelected={selectedPalette?.style === palette.style}
            onClick={() => onSelect(palette)}
          />
        ))}
      </div>
    </section>
  );
}
