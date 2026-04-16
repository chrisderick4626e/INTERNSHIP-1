import React, { useState } from "react";
import { BRANDS, SERIES_INFO } from "../data/paintDatabase.js";
import "./DualBrandOutput.css";

const ROLE_ORDER = ["primaryWall", "accentWall", "ceiling", "trim", "complementary"];
const ROLE_META  = {
  primaryWall:   { label: "Primary Wall",        emoji: "🏠", desc: "Main wall color" },
  accentWall:    { label: "Accent Wall",          emoji: "✨", desc: "Feature / statement wall" },
  ceiling:       { label: "Ceiling",              emoji: "⬆️",  desc: "Upper ceiling surface" },
  trim:          { label: "Trim / Border",        emoji: "🔲", desc: "Edges, frames, skirting" },
  complementary: { label: "Complementary",        emoji: "🎨", desc: "Harmonizing accent" },
};

const BRAND_STYLES = {
  [BRANDS.ASIAN_PAINTS]: {
    key: "ap",
    color: "#e84142",
    gradient: "linear-gradient(135deg, rgba(232,65,66,0.10), rgba(232,65,66,0.03))",
    border: "rgba(232,65,66,0.25)",
    emoji: "🏆",
    label: "Asian Paints",
  },
  [BRANDS.BIRLA_OPUS]: {
    key: "bo",
    color: "#4a9af0",
    gradient: "linear-gradient(135deg, rgba(74,154,240,0.10), rgba(74,154,240,0.03))",
    border: "rgba(74,154,240,0.25)",
    emoji: "💎",
    label: "Birla Opus",
  },
};

// ── Single shade card ────────────────────────────────────────
function ShadeCard({ paint, brandColor }) {
  const [copied, setCopied] = useState(false);

  if (!paint) return <div className="dbo-shade-empty">No match found</div>;

  const seriesInfo = SERIES_INFO[paint.series] || {};

  const copyHex = () => {
    navigator.clipboard.writeText(paint.hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="dbo-shade-card">
      {/* Swatch */}
      <div
        className="dbo-swatch"
        style={{ background: paint.hex }}
        onClick={copyHex}
        title="Click to copy"
        role="button"
      >
        <span className="dbo-swatch-hex">{paint.hex.toUpperCase()}</span>
        {copied && <span className="dbo-swatch-copied">Copied!</span>}
      </div>

      {/* Details */}
      <div className="dbo-shade-details">
        <p className="dbo-shade-name">{paint.shadeName}</p>
        <p className="dbo-shade-rgb">RGB({paint.r}, {paint.g}, {paint.b})</p>

        <div className="dbo-badge-row">
          <span className="dbo-series-badge" style={{ borderColor: brandColor + "55", color: brandColor }}>
            {paint.series}
          </span>
          <span className="dbo-price-badge">{seriesInfo.priceRange || "₹₹"}</span>
        </div>

        <div className="dbo-meta-row">
          <span className="dbo-meta"><b>Finish:</b> {paint.finish || "—"}</span>
          <span className="dbo-meta"><b>Usage:</b> {paint.usage || "—"}</span>
        </div>
      </div>
    </div>
  );
}

// ── Alternative shades strip ─────────────────────────────────
function AlternativesStrip({ alternatives = [], brandColor }) {
  if (alternatives.length === 0) return null;

  return (
    <div className="dbo-alts">
      <p className="dbo-alts-title">Alternatives</p>
      <div className="dbo-alts-row">
        {alternatives.map(alt => (
          <div key={alt.id} className="dbo-alt-chip">
            <span className="dbo-alt-dot" style={{ background: alt.hex }} />
            <span className="dbo-alt-name">{alt.shadeName}</span>
            <span className="dbo-alt-hex">{alt.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Brand Column ─────────────────────────────────────────────
function BrandColumn({ brandKey, matchedPalette }) {
  const style = BRAND_STYLES[brandKey];
  if (!style) return null;

  const roles = ROLE_ORDER.filter(r => matchedPalette[r]);

  return (
    <div className="dbo-brand-col" style={{ borderColor: style.border }}>
      {/* Brand Header */}
      <div className="dbo-brand-header" style={{ background: style.gradient }}>
        <span className="dbo-brand-emoji">{style.emoji}</span>
        <span className="dbo-brand-name" style={{ color: style.color }}>{style.label}</span>
      </div>

      {/* Role cards */}
      <div className="dbo-roles-list">
        {roles.map(roleKey => {
          const roleData = matchedPalette[roleKey];
          const brandData = roleData?.brands?.[brandKey];
          const meta = ROLE_META[roleKey] || { label: roleKey, emoji: "🎨" };

          return (
            <div key={roleKey} className="dbo-role-block">
              <div className="dbo-role-header">
                <span className="dbo-role-dot" style={{ background: roleData.hex }} />
                <div>
                  <p className="dbo-role-label">{meta.emoji} {meta.label}</p>
                  <p className="dbo-role-target">{roleData.name} · <span className="dbo-hex-mono">{roleData.hex}</span></p>
                </div>
              </div>

              {brandData?.primary ? (
                <>
                  <ShadeCard paint={brandData.primary} brandColor={style.color} />
                  <AlternativesStrip alternatives={brandData.alternatives} brandColor={style.color} />
                </>
              ) : (
                <div className="dbo-shade-empty">No shade in this series</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function DualBrandOutput({ matchedPalette, activeBrand = "all", onViewInRoom }) {
  const [mobileTab, setMobileTab] = useState(BRANDS.ASIAN_PAINTS);

  if (!matchedPalette) return null;

  const brandKeys = activeBrand === "all"
    ? [BRANDS.ASIAN_PAINTS, BRANDS.BIRLA_OPUS]
    : [activeBrand];

  return (
    <div className="dual-brand-output card" id="dual-brand-output">
      <div className="section-header">
        <span className="section-icon">🏪</span>
        <div>
          <p className="section-title">Brand Comparison</p>
          <p className="section-desc">Side-by-side paint recommendations from Asian Paints & Birla Opus</p>
        </div>
      </div>

      {/* Mobile tab selector (only if showing both brands) */}
      {brandKeys.length > 1 && (
        <div className="dbo-mobile-tabs">
          {brandKeys.map(bk => {
            const s = BRAND_STYLES[bk];
            return (
              <button
                key={bk}
                className={`dbo-mobile-tab ${mobileTab === bk ? "active" : ""}`}
                style={mobileTab === bk ? { borderColor: s.color, color: s.color } : {}}
                onClick={() => setMobileTab(bk)}
              >
                {s.emoji} {s.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile: single brand at a time */}
      <div className="dbo-mobile-view">
        <BrandColumn
          brandKey={brandKeys.length === 1 ? brandKeys[0] : mobileTab}
          matchedPalette={matchedPalette}
        />
      </div>

      {/* Desktop: side-by-side columns */}
      {brandKeys.length > 1 && (
        <div className="dbo-desktop-view">
          {brandKeys.map(bk => (
            <BrandColumn key={bk} brandKey={bk} matchedPalette={matchedPalette} />
          ))}
        </div>
      )}

      {/* View in Room CTA */}
      {onViewInRoom && (
        <button className="dbo-room-cta" onClick={onViewInRoom}>
          🖼️ View Colors in Your Room
        </button>
      )}

      {/* Series Legend */}
      <div className="dbo-legend">
        <p className="dbo-legend-title">Series Guide</p>
        <div className="dbo-legend-grid">
          {["Royale Aspira", "Premium Emulsion", "Tractor Emulsion", "Opus Calista", "Opus Prestige", "Opus Elegance"].map(series => {
            const info = SERIES_INFO[series];
            if (!info) return null;
            return (
              <div key={series} className="dbo-legend-item">
                <span className="dbo-legend-name">{series}</span>
                <span className="dbo-legend-price">{info.priceRange}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
