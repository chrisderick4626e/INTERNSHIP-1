import React, { useState, useEffect, useRef, useCallback } from "react";
import { paintRoom } from "../utils/roomPainter.js";
import { BRANDS } from "../data/paintDatabase.js";
import "./RoomPreview.css";

const TABS = [
  { key: "original", label: "Original",      emoji: "📷" },
  { key: "ap",       label: "Asian Paints",  emoji: "🏆" },
  { key: "bo",       label: "Birla Opus",    emoji: "💎" },
];

// Palette strip at the bottom of each preview pane
function PaletteStrip({ palette, brand }) {
  if (!palette) return null;
  const roles = ["primaryWall", "accentWall", "ceiling", "trim"];
  return (
    <div className="rp-strip">
      {roles.map(role => {
        const item = palette[role];
        if (!item) return null;
        return (
          <div key={role} className="rp-strip-item">
            <div className="rp-strip-dot" style={{ background: item.hex }} title={item.hex} />
            <div className="rp-strip-info">
              <p className="rp-strip-role">{item.role || role}</p>
              <p className="rp-strip-name">{item.name}</p>
              <p className="rp-strip-hex">{item.hex}</p>
              {item.series && item.series !== "—" && (
                <p className="rp-strip-series">{brand} · {item.series}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Single preview pane (original or painted)
function PreviewPane({ imageUrl, label, badge, isLoading, palette, brand }) {
  return (
    <div className={`rp-pane ${isLoading ? "loading" : ""}`}>
      <div className="rp-pane-badge">{badge} {label}</div>
      {isLoading ? (
        <div className="rp-pane-loading">
          <div className="rp-spinner" />
          <p>Applying {label} colors…</p>
        </div>
      ) : imageUrl ? (
        <img src={imageUrl} alt={label} className="rp-pane-img" />
      ) : (
        <div className="rp-pane-empty">No preview available</div>
      )}
      {palette && !isLoading && (
        <PaletteStrip palette={palette} brand={brand} />
      )}
    </div>
  );
}

// Before/After comparison slider
function ComparisonSlider({ before, after, label }) {
  const sliderRef = useRef(null);
  const [pos, setPos] = useState(50); // percentage
  const dragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (dragging.current) handleMove(e.clientX);
  }, [handleMove]);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);
  const onTouchMove = useCallback((e) => {
    if (dragging.current) handleMove(e.touches[0].clientX);
  }, [handleMove]);

  useEffect(() => {
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend",  onMouseUp);
    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onMouseUp);
    };
  }, [onMouseMove, onMouseUp, onTouchMove]);

  if (!before || !after) return null;

  return (
    <div className="rp-slider-wrap" ref={sliderRef}>
      {/* Before image (full width) */}
      <img src={before} alt="Before" className="rp-slider-img rp-slider-before" />

      {/* After image clipped */}
      <div className="rp-slider-after-wrap" style={{ width: `${pos}%` }}>
        <img src={after} alt={label} className="rp-slider-img rp-slider-after" />
      </div>

      {/* Divider handle */}
      <div
        className="rp-slider-handle"
        style={{ left: `${pos}%` }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
      >
        <div className="rp-handle-line" />
        <div className="rp-handle-knob">⟺</div>
      </div>

      {/* Labels */}
      <span className="rp-slider-label left">BEFORE</span>
      <span className="rp-slider-label right">{label}</span>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function RoomPreview({ imageUrl, apPalette, boPalette }) {
  const [activeTab, setActiveTab] = useState("original");
  const [viewMode, setViewMode] = useState("tabs"); // "tabs" | "slider"
  const [apImage,  setApImage]  = useState(null);
  const [boImage,  setBoImage]  = useState(null);
  const [apLoading, setApLoading] = useState(false);
  const [boLoading, setBoLoading] = useState(false);
  const [sliderBrand, setSliderBrand] = useState("ap");

  // Paint when palette or image changes
  useEffect(() => {
    if (!imageUrl || !apPalette) return;
    setApLoading(true);
    setApImage(null);
    paintRoom(imageUrl, apPalette)
      .then(url => { setApImage(url);  setApLoading(false); })
      .catch(() => setApLoading(false));
  }, [imageUrl, apPalette]);

  useEffect(() => {
    if (!imageUrl || !boPalette) return;
    setBoLoading(true);
    setBoImage(null);
    paintRoom(imageUrl, boPalette)
      .then(url => { setBoImage(url); setBoLoading(false); })
      .catch(() => setBoLoading(false));
  }, [imageUrl, boPalette]);

  if (!imageUrl) return null;

  const sliderAfter = sliderBrand === "ap" ? apImage : boImage;
  const sliderLabel = sliderBrand === "ap" ? "Asian Paints" : "Birla Opus";

  return (
    <div className="room-preview card" id="room-preview">
      <div className="section-header">
        <span className="section-icon">🖼️</span>
        <div>
          <p className="section-title">Visual Room Preview</p>
          <p className="section-desc">See your room painted with each brand's recommended colors</p>
        </div>
      </div>

      {/* View mode toggle */}
      <div className="rp-mode-row">
        <button
          className={`rp-mode-btn ${viewMode === "tabs" ? "active" : ""}`}
          onClick={() => setViewMode("tabs")}
        >📊 Compare Tabs</button>
        <button
          className={`rp-mode-btn ${viewMode === "slider" ? "active" : ""}`}
          onClick={() => setViewMode("slider")}
        >🔀 Slider</button>
      </div>

      {/* ── Tab Mode ─────────── */}
      {viewMode === "tabs" && (
        <div className="rp-tabs-view">
          {/* Tab buttons */}
          <div className="rp-tab-btns">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`rp-tab-btn ${activeTab === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "original" && (
            <PreviewPane
              imageUrl={imageUrl}
              label="Original Room"
              badge="📷"
            />
          )}
          {activeTab === "ap" && (
            <PreviewPane
              imageUrl={apImage}
              label="Asian Paints"
              badge="🏆"
              isLoading={apLoading}
              palette={apPalette}
              brand="Asian Paints"
            />
          )}
          {activeTab === "bo" && (
            <PreviewPane
              imageUrl={boImage}
              label="Birla Opus"
              badge="💎"
              isLoading={boLoading}
              palette={boPalette}
              brand="Birla Opus"
            />
          )}
        </div>
      )}

      {/* ── Slider Mode ─────── */}
      {viewMode === "slider" && (
        <div className="rp-slider-mode">
          <div className="rp-slider-brand-row">
            <span className="rp-slider-mode-label">Compare with:</span>
            <button
              className={`rp-mode-btn ${sliderBrand === "ap" ? "active" : ""}`}
              onClick={() => setSliderBrand("ap")}
            >🏆 Asian Paints</button>
            <button
              className={`rp-mode-btn ${sliderBrand === "bo" ? "active" : ""}`}
              onClick={() => setSliderBrand("bo")}
            >💎 Birla Opus</button>
          </div>
          {sliderAfter ? (
            <ComparisonSlider
              before={imageUrl}
              after={sliderAfter}
              label={sliderLabel}
            />
          ) : (
            <div className="rp-pane-loading">
              <div className="rp-spinner" />
              <p>Painting room…</p>
            </div>
          )}
        </div>
      )}

      {/* Desktop side-by-side (both brands at once) */}
      <div className="rp-desktop-split">
        <div className="rp-split-pane">
          <PreviewPane
            imageUrl={apImage}
            label="Asian Paints"
            badge="🏆"
            isLoading={apLoading}
            palette={apPalette}
            brand="Asian Paints"
          />
        </div>
        <div className="rp-split-pane">
          <PreviewPane
            imageUrl={boImage}
            label="Birla Opus"
            badge="💎"
            isLoading={boLoading}
            palette={boPalette}
            brand="Birla Opus"
          />
        </div>
      </div>
    </div>
  );
}
