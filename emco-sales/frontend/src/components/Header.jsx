import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-area">
          <div className="logo-icon">🎨</div>
          <div className="logo-text">
            <span className="logo-brand">EMCO SALES</span>
            <span className="logo-sub">Color Recommendation System</span>
          </div>
        </div>
        <p className="tagline">Your Trusted Paint &amp; Color Expert</p>
      </div>
    </header>
  );
}
