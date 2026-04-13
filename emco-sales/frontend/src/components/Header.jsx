import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-area">
          <span className="logo-icon">🎨</span>
          <div className="logo-text">
            <span className="logo-brand">EMCO SALES</span>
            <span className="logo-sub">Color Recommendation System</span>
          </div>
        </div>

        <div className="header-right">
          <div className="header-brands">
            <span className="header-brand-pill ap">🏆 Asian Paints</span>
            <span className="header-brand-pill bo">💎 Birla Opus</span>
          </div>
          <p className="tagline">Your Trusted Paint &amp; Color Expert</p>
        </div>
      </div>
    </header>
  );
}
