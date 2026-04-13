import React from "react";
import "./WhatsAppButton.css";

const WA_NUMBER = "919035151620";

export default function WhatsAppButton({ waMessage, palette }) {
  const message = waMessage ||
    "Hello EMCO SALES! 👋 I would like help choosing paint colors for my home using Asian Paints or Birla Opus. Can you guide me?";

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleCallback = () => {
    const cbMessage = "Hello EMCO SALES! I'd like to request a callback for paint color consultation. Please contact me. Thank you!";
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(cbMessage)}`, "_blank");
  };

  return (
    <div className="whatsapp-section card" id="whatsapp-contact">
      {/* Soft glow bg */}
      <div className="wa-glow-bg" />

      <div className="section-header">
        <span className="section-icon">💬</span>
        <div>
          <p className="section-title">Consult Our Expert</p>
          <p className="section-desc">
            Get personalized advice from EMCO SALES — India's trusted paint experts
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="wa-features">
        <span className="wa-feature">🎁 Get a price quote</span>
        <span className="wa-feature">🎨 Shade samples available</span>
        <span className="wa-feature">🚚 Home delivery option</span>
      </div>

      {/* Buttons */}
      <div className="wa-btns-row">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          id="wa-consult-btn"
        >
          <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.832L0 24l6.362-1.498A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.27 16.832c-.263.739-1.539 1.415-2.113 1.46-.574.044-1.108.196-3.744-.891-3.155-1.296-5.148-4.538-5.303-4.749-.154-.212-1.264-1.685-1.264-3.213s.801-2.285 1.086-2.593c.285-.308.621-.384.828-.384.206 0 .412.002.593.01.19.009.445-.073.696.531.263.627.892 2.17.971 2.328.079.158.126.342.026.55-.1.208-.149.337-.296.52-.148.183-.31.41-.443.551-.149.154-.304.321-.131.63.173.308.77 1.27 1.653 2.058 1.135 1.012 2.09 1.325 2.398 1.472.308.148.487.126.667-.074.18-.2.77-.9.975-1.208.205-.308.41-.257.694-.154.285.103 1.812.854 2.122 1.01.308.154.514.231.59.359.077.128.077.74-.185 1.478z" />
          </svg>
          Chat on WhatsApp — EMCO SALES
        </a>

        <button
          className="wa-btn-secondary"
          onClick={handleCallback}
          id="wa-callback-btn"
        >
          📞 Request a Callback
        </button>
      </div>

      {/* Palette summary if selected */}
      {palette?.colors && (
        <div className="wa-palette-summary">
          <p className="wa-summary-title">Your selected palette — {palette.name}</p>
          <div className="wa-summary-dots">
            {Object.values(palette.colors).slice(0, 5).map((c, i) => (
              <div
                key={i}
                className="wa-dot"
                style={{ background: c.hex }}
                title={`${c.role}: ${c.name} (${c.hex})`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
