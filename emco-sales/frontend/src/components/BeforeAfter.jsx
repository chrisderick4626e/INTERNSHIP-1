import React, { useRef, useEffect, useState } from "react";
import "./BeforeAfter.css";

/**
 * Simple canvas-based "Before vs After" tool.
 * Draws the original image on the left, then overlays
 * the selected palette colors as color-washed strips on the right.
 */
export default function BeforeAfter({ imageDataUrl, palette }) {
  const canvasRef = useRef(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!imageDataUrl || !palette || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const W = 360;
      const H = Math.round((img.naturalHeight / img.naturalWidth) * W);
      canvas.width = W * 2;
      canvas.height = H;

      // Left: original
      ctx.drawImage(img, 0, 0, W, H);

      // Divider line
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(W - 1, 0, 2, H);

      // Right: greyscale base
      ctx.drawImage(img, W, 0, W, H);
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = "#cccccc";
      ctx.fillRect(W, 0, W, H);
      ctx.globalAlpha = 1;

      // Apply palette colors as horizontal bands
      const colors = Object.values(palette.colors);
      const bandH = H / colors.length;
      colors.forEach((c, i) => {
        const hex = c.hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(W, i * bandH, W, bandH);
      });
      ctx.globalAlpha = 1;

      // Labels
      ctx.font = "bold 12px system-ui";
      ctx.textAlign = "center";

      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, H - 24, W, 24);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("BEFORE", W / 2, H - 8);

      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(W, H - 24, W, 24);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("AFTER — " + palette.name, W + W / 2, H - 8);

      setRendered(true);
    };
    img.onerror = () => setRendered(false);
    img.src = imageDataUrl;
  }, [imageDataUrl, palette]);

  if (!imageDataUrl || !palette) return null;

  return (
    <section className="before-after card" id="color-preview">
      <div className="section-header">
        <span className="section-icon">🖼️</span>
        <div>
          <h2 className="section-title">Before &amp; After Preview</h2>
          <p className="section-desc">See your room with the "{palette.name}" palette applied</p>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="preview-canvas" id="preview-canvas" />
        {!rendered && (
          <div className="canvas-loading">Rendering preview…</div>
        )}
      </div>

      <div className="palette-strip">
        {Object.values(palette.colors).map((c, i) => (
          <div key={i} className="strip-item">
            <div className="strip-dot" style={{ background: c.hex }} title={c.hex} />
            <span className="strip-label">{c.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
