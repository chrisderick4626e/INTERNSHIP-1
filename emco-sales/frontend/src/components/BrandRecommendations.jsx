import React, { useState } from "react";
import { BRANDS, SERIES_INFO } from "../data/paintDatabase.js";
import "./BrandRecommendations.css";

const ROLE_ORDER = ["primaryWall", "accentWall", "ceiling", "trim", "complementary"];
const ROLE_LABELS = {
  primaryWall:  { label: "Primary Wall",        emoji: "🏠" },
  accentWall:   { label: "Accent / Feature Wall",emoji: "✨" },
  ceiling:      { label: "Ceiling",              emoji: "⬆️" },
  trim:         { label: "Trim / Border",        emoji: "🔲" },
  complementary:{ label: "Complementary Color",  emoji: "🎨" },
};

const BRAND_CONFIG = {
  [BRANDS.ASIAN_PAINTS]: { color: "#e84142", emoji: "🏆", bg: "rgba(232,65,66,0.08)" },
  [BRANDS.BIRLA_OPUS]:   { color: "#4a9af0", emoji: "💎", bg: "rgba(74,154,240,0.08)" },
};

// ── Single paint match card ──────────────────────────────────
function PaintMatchCard({ match, alternatives = [] }) {
  const [copied, setCopied] = useState(false);
  const [showAlts, setShowAlts] = useState(false);

  if (!match) return null;

  const seriesInfo = SERIES_INFO[match.series] || {};

  const copyHex = () => {
    navigator.clipboard.writeText(match.hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="paint-match-card">
      {/* Color Preview */}
      <div
        className="pmc-swatch"
        style={{ background: match.hex }}
        onClick={copyHex}
        title="Click to copy HEX"
        role="button"
      >
        <div className="pmc-hex-overlay">
          <span className="pmc-hex-val">{match.hex.toUpperCase()}</span>
          {copied && <span className="pmc-copied">Copied!</span>}
        </div>
      </div>

      {/* Info */}
      <div className="pmc-info">
        {/* Shade name + HEX */}
        <div className="pmc-name-row">
          <p className="pmc-shade-name">{match.shadeName}</p>
          <button className="pmc-hex-btn" onClick={copyHex}>{match.hex}</button>
        </div>

        {/* RGB */}
        <p className="pmc-rgb">RGB({match.r}, {match.g}, {match.b})</p>

        {/* Series row */}
        <div className="pmc-series-row">
          <span className="pmc-series-badge">{match.series}</span>
          <span className="pmc-price-range">{seriesInfo.priceRange || "₹₹"}</span>
        </div>

        {/* Meta grid */}
        <div className="pmc-meta-grid">
          <div className="pmc-meta-item">
            <span className="pmc-meta-label">Finish</span>
            <span className="pmc-meta-val">{match.finish}</span>
          </div>
          <div className="pmc-meta-item">
            <span className="pmc-meta-label">Usage</span>
            <span className="pmc-meta-val">{match.usage}</span>
          </div>
        </div>

        {/* Alternatives toggle */}
        {alternatives.length > 0 && (
          <div className="pmc-alts-section">
            <button className="pmc-alts-toggle" onClick={() => setShowAlts(v => !v)}>
              {showAlts ? "▲" : "▼"} {showAlts ? "Hide" : "Show"} {alternatives.length} alternatives
            </button>
            {showAlts && (
              <div className="pmc-alts-list">
                {alternatives.map(alt => (
                  <div key={alt.id} className="pmc-alt-item">
                    <div className="pmc-alt-dot" style={{ background: alt.hex }} title={alt.hex} />
                    <div>
                      <p className="pmc-alt-name">{alt.shadeName}</p>
                      <p className="pmc-alt-hex">{alt.hex} · {alt.series}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Role Section ─────────────────────────────────────────────
function RoleSection({ roleKey, roleData, activeBrand }) {
  if (!roleData) return null;

  const { emoji, label } = ROLE_LABELS[roleKey] || { emoji: "🎨", label: roleKey };
  const { hex, name, rgb, brands } = roleData;
  const displayBrands = activeBrand === "all"
    ? Object.entries(brands).filter(([, v]) => v)
    : Object.entries(brands).filter(([k, v]) => k === activeBrand && v);

  return (
    <div className="role-section">
      <div className="role-header">
        <span className="role-emoji">{emoji}</span>
        <div>
          <p className="role-label-text">{label}</p>
          <p className="role-color-name">{name} · <span className="role-hex">{hex}</span></p>
        </div>
        <div className="role-preview-dot" style={{ background: hex }} />
      </div>

      <div className="brand-matches-row">
        {displayBrands.map(([brandKey, brandData]) => {
          const config = BRAND_CONFIG[brandKey];
          if (!brandData?.primary) return null;
          return (
            <div
              key={brandKey}
              className="brand-match-block"
              style={{ borderColor: config.color + "44", background: config.bg }}
            >
              <div className="bmb-header" style={{ color: config.color }}>
                <span>{config.emoji}</span>
                <span className="bmb-brand-name">{brandKey}</span>
              </div>
              <PaintMatchCard
                match={brandData.primary}
                alternatives={brandData.alternatives}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function BrandRecommendations({ matchedPalette, activeBrand = "all" }) {
  const [activeTab, setActiveTab] = useState("all");

  if (!matchedPalette) {
    return (
      <div className="brand-recs card">
        <div className="section-header">
          <span className="section-icon">🏪</span>
          <div>
            <p className="section-title">Brand Recommendations</p>
            <p className="section-desc">Upload a room photo to get personalized paint suggestions</p>
          </div>
        </div>
        <div className="brand-recs-placeholder">
          <span className="placeholder-icon">🎨</span>
          <p>Waiting for your room photo…</p>
        </div>
      </div>
    );
  }

  const roles = ROLE_ORDER.filter(r => matchedPalette[r]);
  const tabs  = [
    { key: "all",     label: "All Roles",   count: roles.length },
    { key: "primaryWall",  label: "Walls",  count: 2 },
    { key: "ceiling",      label: "Ceiling",count: 1 },
    { key: "trim",         label: "Trim",   count: 1 },
  ];

  const displayRoles = activeTab === "all" ? roles : [activeTab, "complementary"].filter(r => matchedPalette[r]);

  return (
    <div className="brand-recs card" id="brand-recommendations">
      <div className="section-header">
        <span className="section-icon">🏪</span>
        <div>
          <p className="section-title">Expert Paint Recommendations</p>
          <p className="section-desc">Brand · Series · Shade · Finish — all in one place</p>
        </div>
      </div>

      {/* Role tabs */}
      <div className="recs-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`recs-tab ${activeTab === t.key ? "active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
            <span className="recs-tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Role sections */}
      <div className="roles-container">
        {displayRoles.map(roleKey =>
          matchedPalette[roleKey] ? (
            <RoleSection
              key={roleKey}
              roleKey={roleKey}
              roleData={matchedPalette[roleKey]}
              activeBrand={activeBrand}
            />
          ) : null
        )}
      </div>

      {/* Series Info footer */}
      <div className="series-legend">
        <p className="series-legend-title">Series Guide</p>
        <div className="series-legend-grid">
          {["Royale Aspira", "Premium Emulsion", "Tractor Emulsion", "Opus Calista", "Opus Prestige", "Opus Elegance"].map(series => {
            const info = SERIES_INFO[series];
            if (!info) return null;
            return (
              <div key={series} className="series-legend-item">
                <span className="slg-name">{series}</span>
                <span className="slg-price">{info.priceRange}</span>
                <span className="slg-finish">{info.finish}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
