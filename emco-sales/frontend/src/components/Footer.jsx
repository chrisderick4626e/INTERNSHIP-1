import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="footer-icon">🎨</span>
        <div>
          <p className="footer-name">EMCO SALES</p>
          <p className="footer-tagline">Your Trusted Paint &amp; Color Expert</p>
        </div>
      </div>

      <div className="footer-brands">
        <span className="brand-pill asian">🏆 Asian Paints</span>
        <span className="brand-pill birla">💎 Birla Opus</span>
      </div>

      <a
        href="https://wa.me/919035151620"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-wa"
      >
        📱 +91 90351 51620
      </a>

      <p className="footer-copy">
        © {year} EMCO SALES Color Recommendation System
      </p>
    </footer>
  );
}
