import React, { useState } from "react";
import { BRANDS, PAINT_SERIES_INFO } from "../data/paintDatabase";
import "./BrandRecommendations.css";

const BRAND_LOGO = {
  [BRANDS.ASIAN_PAINTS]: { emoji: "🏆", color: "#e84142" },
  [BRANDS.BIRLA_OPUS]:   { emoji: "💎", color: "#1a73e8" },
  [BRANDS.NIPPON]:       { emoji: "🌿", color: "#00875a" },
};

const ROLE_LABELS = {
  primaryWall: "Primary Wall",
  accentWall:  "Accent Wall",
  ceiling:     "Ceiling",
  trim:        "Trim / Border",
};

function PaintCard({ paint }) {
  const seriesInfo = PAINT_SERIES_INFO[paint.series] || {};
  return (
    <div className="paint-card" id={`paint-${paint.id}`}>
      <div className="paint-swatch" style={{ background: paint.hex }}>
        <div className="paint-hex-badge">{paint.hex}</div>
      </div>
      <div className="paint-info">
        <div className="paint-shade">{paint.shadeName}</div>
        <div className="paint-series">{paint.series}</div>
        <div className="paint-usage">{paint.usage}</div>
        {seriesInfo.priceRange && (
          <div className="paint-price">{seriesInfo.priceRange}</div>
        )}
      </div>
    </div>
  );
}

function RoleSection({ role, paints }) {
  const label = ROLE_LABELS[role] || role;
  return (
    <div className="role-section">
      <div className="role-label">
        <span className="role-icon">
          {role === "primaryWall" ? "🏠" : role === "accentWall" ? "✨" : role === "ceiling" ? "☁️" : "🖼️"}
        </span>
        {label}
      </div>
      <div className="paint-cards-row">
        {paints.map((p) => (
          <PaintCard key={p.id} paint={p} />
        ))}
      </div>
    </div>
  );
}

function BrandTab({ brandName, recs }) {
  const logo = BRAND_LOGO[brandName] || {};
  const roles = Object.keys(recs || {});

  return (
    <div className="brand-tab">
      <div className="brand-tab-header" style={{ "--brand-color": logo.color }}>
        <span className="brand-emoji">{logo.emoji}</span>
        <span className="brand-tab-name">{brandName}</span>
      </div>
      <div className="roles-list">
        {roles.map((role) => (
          recs[role]?.length > 0 && (
            <RoleSection key={role} role={role} paints={recs[role]} />
          )
        ))}
      </div>
    </div>
  );
}

export default function BrandRecommendations({ palette }) {
  const [activeTab, setActiveTab] = useState(BRANDS.ASIAN_PAINTS);

  if (!palette?.brandRecommendations) return null;
  const recs = palette.brandRecommendations;

  // Group recommendations by brand
  const byBrand = {};
  Object.keys(recs).forEach((role) => {
    recs[role].forEach((paint) => {
      if (!byBrand[paint.brand]) byBrand[paint.brand] = {};
      if (!byBrand[paint.brand][role]) byBrand[paint.brand][role] = [];
      if (!byBrand[paint.brand][role].find((p) => p.id === paint.id)) {
        byBrand[paint.brand][role].push(paint);
      }
    });
  });

  const brands = Object.keys(byBrand);

  return (
    <section className="brand-recs card" id="brand-recommendations">
      <div className="section-header">
        <span className="section-icon">🏪</span>
        <div>
          <h2 className="section-title">Brand Paint Recommendations</h2>
          <p className="section-desc">Real shades from top Indian paint brands for the "{palette.name}" palette</p>
        </div>
      </div>

      {/* Brand Tabs */}
      <div className="brand-tabs" role="tablist">
        {brands.map((brand) => (
          <button
            key={brand}
            role="tab"
            aria-selected={activeTab === brand}
            className={`brand-tab-btn ${activeTab === brand ? "active" : ""}`}
            style={{ "--brand-color": BRAND_LOGO[brand]?.color }}
            onClick={() => setActiveTab(brand)}
            id={`tab-${brand.replace(/\s/g, "-").toLowerCase()}`}
          >
            <span>{BRAND_LOGO[brand]?.emoji}</span>
            <span className="tab-btn-name">{brand.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {byBrand[activeTab] && (
        <BrandTab brandName={activeTab} recs={byBrand[activeTab]} />
      )}
    </section>
  );
}
