import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-brand">
        <span className="footer-icon">🎨</span>
        <div>
          <div className="footer-name">EMCO SALES</div>
          <div className="footer-tagline">Your Trusted Paint &amp; Color Expert</div>
        </div>
      </div>
      <div className="footer-brands">
        <span className="brand-pill asian">Asian Paints</span>
        <span className="brand-pill birla">Birla Opus</span>
        <span className="brand-pill nippon">Nippon Paint</span>
      </div>
      <a
        href="https://wa.me/919035151620"
        className="footer-wa"
        target="_blank"
        rel="noopener noreferrer"
        id="footer-whatsapp-link"
      >
        📱 +91 90351 51620
      </a>
      <p className="footer-copy">© {new Date().getFullYear()} EMCO SALES Color Recommendation System</p>
    </footer>
  );
}
