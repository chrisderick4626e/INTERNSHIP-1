import React from "react";
import "./PaletteSelector.css";

const ROLE_ORDER = ["primaryWall", "accentWall", "ceiling", "trim"];

export default function PaletteSelector({ palettes, selected, onSelect }) {
  if (!palettes) return null;

  return (
    <div className="palette-section card" id="palette-suggestions">
      <div className="section-header">
        <span className="section-icon">🎨</span>
        <div>
          <p className="section-title">Palette Suggestions</p>
          <p className="section-desc">Choose your style — recommendations update automatically</p>
        </div>
      </div>

      <div className="palette-cards-list">
        {Object.values(palettes).map(palette => {
          const isSelected = selected?.id === palette.id;
          const colorList  = palette.colors ? Object.values(palette.colors).slice(0, 4) : [];

          return (
            <button
              key={palette.id}
              className={`palette-card ${isSelected ? "selected" : ""}`}
              style={{ "--card-border": palette.accentColor }}
              onClick={() => onSelect(palette)}
            >
              <div className="palette-card-header">
                <span className="palette-emoji">{palette.emoji}</span>
                <div>
                  <p className="palette-name">{palette.name}</p>
                  <p className="palette-desc">{palette.desc}</p>
                </div>
                {isSelected && <span className="selected-badge">✓ Active</span>}
              </div>

              {/* Color Swatches Row */}
              {colorList.length > 0 && (
                <div className="palette-swatch-row">
                  {colorList.map((colorObj, i) => (
                    <div
                      key={i}
                      className="palette-swatch-dot"
                      style={{ background: colorObj.hex }}
                      title={`${colorObj.role}: ${colorObj.name} (${colorObj.hex})`}
                    />
                  ))}
                </div>
              )}

              {/* Role labels */}
              {colorList.length > 0 && (
                <div className="palette-role-labels">
                  {colorList.map((colorObj, i) => (
                    <div key={i} className="palette-label-item">
                      <div className="palette-label-dot" style={{ background: colorObj.hex }} />
                      <div>
                        <p className="palette-label-role">{colorObj.role}</p>
                        <p className="palette-label-hex">{colorObj.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price badge */}
              <div className="palette-price-badge" style={{ color: palette.accentColor, borderColor: palette.accentColor + "55", background: palette.accentColor + "11" }}>
                {palette.priceCategory}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
