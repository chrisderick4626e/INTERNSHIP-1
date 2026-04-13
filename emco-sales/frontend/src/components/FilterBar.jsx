import React from "react";
import { BRANDS, PRICE_CAT } from "../data/paintDatabase.js";
import "./FilterBar.css";

const BUDGETS = [
  { key: PRICE_CAT.BUDGET,   label: "Budget",    emoji: "💚", desc: "Affordable picks" },
  { key: PRICE_CAT.MIDRANGE, label: "Mid-Range", emoji: "💛", desc: "Best value" },
  { key: PRICE_CAT.PREMIUM,  label: "Premium",   emoji: "👑", desc: "Luxury finish" },
];

const BRAND_FILTERS = [
  { key: "all",             label: "Both Brands",    emoji: "🎨" },
  { key: BRANDS.ASIAN_PAINTS, label: "Asian Paints", emoji: "🏆" },
  { key: BRANDS.BIRLA_OPUS,   label: "Birla Opus",   emoji: "💎" },
];

const USAGE_FILTERS = [
  { key: "interior", label: "Interior", emoji: "🏠" },
  { key: "exterior", label: "Exterior", emoji: "🏗️" },
];

export default function FilterBar({ budget, brand, usage, onBudget, onBrand, onUsage }) {
  return (
    <div className="filter-bar card">
      <div className="section-header">
        <span className="section-icon">🔍</span>
        <div>
          <p className="section-title">Smart Filters</p>
          <p className="section-desc">Personalize your paint recommendations</p>
        </div>
      </div>

      {/* Budget Filter */}
      <div className="filter-group">
        <p className="filter-label">Budget Range</p>
        <div className="filter-chips">
          {BUDGETS.map(b => (
            <button
              key={b.key}
              className={`filter-chip budget-chip ${budget === b.key ? "active" : ""}`}
              data-tier={b.key}
              onClick={() => onBudget(b.key)}
              title={b.desc}
            >
              <span className="chip-emoji">{b.emoji}</span>
              <span className="chip-label">{b.label}</span>
              {budget === b.key && <span className="chip-check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="filter-group">
        <p className="filter-label">Brand Preference</p>
        <div className="filter-chips">
          {BRAND_FILTERS.map(bf => (
            <button
              key={bf.key}
              className={`filter-chip brand-chip ${brand === bf.key ? "active" : ""}`}
              onClick={() => onBrand(bf.key)}
            >
              <span className="chip-emoji">{bf.emoji}</span>
              <span className="chip-label">{bf.label}</span>
              {brand === bf.key && <span className="chip-check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Usage Filter */}
      <div className="filter-group">
        <p className="filter-label">Usage Type</p>
        <div className="filter-chips">
          {USAGE_FILTERS.map(uf => (
            <button
              key={uf.key}
              className={`filter-chip usage-chip ${usage === uf.key ? "active" : ""}`}
              onClick={() => onUsage(uf.key)}
            >
              <span className="chip-emoji">{uf.emoji}</span>
              <span className="chip-label">{uf.label}</span>
              {usage === uf.key && <span className="chip-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
