// ============================================================
// Brand Match Card — Shows paint brand matches for custom colors
// ============================================================

import React from "react";
import "./BrandMatchCard.css";

function SimilarityBadge({ score }) {
  const cls = score >= 90 ? "excellent" : score >= 70 ? "good" : "fair";
  return <span className={`bmc-sim ${cls}`}>{score}%</span>;
}

function BrandMatch({ match, brandLabel, brandEmoji }) {
  if (!match) return <span className="bmc-no-match">—</span>;
  return (
    <div className="bmc-brand-match">
      <div className="bmc-brand-header">
        <span className="bmc-brand-emoji">{brandEmoji}</span>
        <span className="bmc-brand-label">{brandLabel}</span>
        <SimilarityBadge score={match.similarity} />
      </div>
      <div className="bmc-brand-swatch" style={{ background: match.hex }} />
      <p className="bmc-shade-name">{match.shadeName}</p>
      <p className="bmc-shade-series">{match.series}</p>
      <p className="bmc-shade-hex">{match.hex}</p>
    </div>
  );
}

export default function BrandMatchCard({ matches, onClose }) {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="brand-match-card card">
      <div className="section-header">
        <span className="section-icon">🎯</span>
        <div>
          <p className="section-title">Paint Brand Matches</p>
          <p className="section-desc">Your custom colors matched to the closest brand shades</p>
        </div>
        {onClose && (
          <button className="bmc-close" onClick={onClose} title="Close">✕</button>
        )}
      </div>

      <div className="bmc-grid">
        {matches.map((m, i) => (
          <div key={i} className="bmc-row">
            <div className="bmc-role-col">
              <div className="bmc-role-swatch" style={{ background: m.hex }} />
              <div className="bmc-role-info">
                <p className="bmc-role-label">{m.role}</p>
                <p className="bmc-role-hex">{m.hex}</p>
              </div>
            </div>
            <BrandMatch match={m.ap} brandLabel="Asian Paints" brandEmoji="🏆" />
            <BrandMatch match={m.bo} brandLabel="Birla Opus" brandEmoji="💎" />
          </div>
        ))}
      </div>
    </div>
  );
}
