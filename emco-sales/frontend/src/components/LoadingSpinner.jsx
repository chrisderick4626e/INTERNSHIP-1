import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner({ message = "Analyzing your image…" }) {
  return (
    <div className="spinner-overlay" id="loading-spinner">
      <div className="spinner-card">
        <div className="spinner-rings">
          <div className="ring r1" />
          <div className="ring r2" />
          <div className="ring r3" />
          <div className="ring-center">🎨</div>
        </div>
        <p className="spinner-msg">{message}</p>
        <div className="spinner-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
