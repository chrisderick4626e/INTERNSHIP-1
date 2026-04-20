// ============================================================
// Custom Color Panel — Choose Your Own Colors
// 3-mode segmented control + 4 color pickers + preset palettes
// ============================================================

import React, { useState, useCallback, useEffect, useRef } from "react";
import { PRESETS, HARMONY_TYPES, generateHarmonyColors } from "../utils/colorHarmony.js";
import "./CustomColorPanel.css";

const MODES = [
  { key: "ai",     label: "AI Mode",     emoji: "🤖", desc: "Colors from AI analysis" },
  { key: "custom", label: "Custom",      emoji: "🎨", desc: "Choose your own colors" },
  { key: "hybrid", label: "Hybrid",      emoji: "⚡", desc: "You pick primary, AI fills rest" },
];

const ROLES = [
  { key: "primaryWall", label: "Primary Wall",         emoji: "🏠" },
  { key: "accentWall",  label: "Accent / Feature Wall", emoji: "🎯" },
  { key: "ceiling",     label: "Ceiling",               emoji: "☁️" },
  { key: "trim",        label: "Trim / Border",         emoji: "📐" },
];

const DEFAULT_COLORS = {
  primaryWall: "#F5F0E8",
  accentWall:  "#FFFFFF",
  ceiling:     "#D6D6D6",
  trim:        "#FAF7F2",
};

export default function CustomColorPanel({
  mode,
  onModeChange,
  colors,
  onColorsChange,
  onMatchBrand,
  disabled = false,
}) {
  const [harmonyType, setHarmonyType] = useState("analogous");
  const debounceRef = useRef(null);

  // Current colors (fallback to defaults)
  const currentColors = colors || DEFAULT_COLORS;

  // Debounced color change to avoid excessive re-renders during picker drag
  const handleColorChange = useCallback((roleKey, hex) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const updated = { ...currentColors, [roleKey]: hex };

    // In hybrid mode: user only sets primary, rest auto-generated
    if (mode === "hybrid" && roleKey === "primaryWall") {
      const harmony = generateHarmonyColors(hex, harmonyType);
      updated.accentWall = harmony.accentWall;
      updated.ceiling    = harmony.ceiling;
      updated.trim       = harmony.trim;
    }

    debounceRef.current = setTimeout(() => {
      onColorsChange(updated);
    }, 50);
  }, [currentColors, mode, harmonyType, onColorsChange]);

  // When harmony type changes in hybrid mode, regenerate
  useEffect(() => {
    if (mode !== "hybrid") return;
    const harmony = generateHarmonyColors(currentColors.primaryWall, harmonyType);
    onColorsChange({
      ...currentColors,
      accentWall: harmony.accentWall,
      ceiling:    harmony.ceiling,
      trim:       harmony.trim,
    });
  // Only run when harmonyType changes, not on every color change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [harmonyType]);

  // Apply a preset
  const applyPreset = useCallback((presetKey) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    if (mode === "hybrid") {
      // In hybrid, only set primary and generate rest
      const harmony = generateHarmonyColors(preset.colors.primaryWall, harmonyType);
      onColorsChange({
        primaryWall: preset.colors.primaryWall,
        accentWall:  harmony.accentWall,
        ceiling:     harmony.ceiling,
        trim:        harmony.trim,
      });
    } else {
      onColorsChange({ ...preset.colors });
    }
  }, [mode, harmonyType, onColorsChange]);

  // HEX text input handler
  const handleHexInput = useCallback((roleKey, value) => {
    const cleaned = value.replace(/[^#0-9a-fA-F]/g, "");
    if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
      handleColorChange(roleKey, cleaned);
    }
  }, [handleColorChange]);

  const isAiMode = mode === "ai";
  const isHybrid = mode === "hybrid";

  return (
    <div className={`custom-color-panel card ${isAiMode ? "ai-disabled" : ""}`}>
      <div className="section-header">
        <span className="section-icon">🎨</span>
        <div>
          <p className="section-title">Choose Your Own Colors</p>
          <p className="section-desc">Pick custom colors or use presets</p>
        </div>
      </div>

      {/* ── Mode Toggle (3-option segmented control) ── */}
      <div className="ccp-mode-toggle">
        {MODES.map(m => (
          <button
            key={m.key}
            className={`ccp-mode-btn ${mode === m.key ? "active" : ""}`}
            onClick={() => onModeChange(m.key)}
            title={m.desc}
          >
            <span className="ccp-mode-emoji">{m.emoji}</span>
            <span className="ccp-mode-label">{m.label}</span>
          </button>
        ))}
      </div>

      {/* AI mode notice */}
      {isAiMode && (
        <div className="ccp-ai-notice">
          🤖 AI is controlling colors from image analysis. Switch to <strong>Custom</strong> or <strong>Hybrid</strong> to pick your own.
        </div>
      )}

      {/* ── Preset Palette Pills ── */}
      {!isAiMode && (
        <div className="ccp-presets">
          <p className="ccp-presets-label">QUICK PRESETS</p>
          <div className="ccp-preset-row">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                className="ccp-preset-pill"
                onClick={() => applyPreset(key)}
                title={preset.label}
              >
                <div className="ccp-preset-dots">
                  {Object.values(preset.colors).map((hex, i) => (
                    <span key={i} className="ccp-preset-dot" style={{ background: hex }} />
                  ))}
                </div>
                <span className="ccp-preset-name">{preset.emoji} {preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Harmony Type (Hybrid mode only) ── */}
      {isHybrid && (
        <div className="ccp-harmony-row">
          <p className="ccp-harmony-label">HARMONY TYPE</p>
          <div className="ccp-harmony-btns">
            {Object.entries(HARMONY_TYPES).map(([key, ht]) => (
              <button
                key={key}
                className={`ccp-harmony-btn ${harmonyType === key ? "active" : ""}`}
                onClick={() => setHarmonyType(key)}
              >
                {ht.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 4 Color Pickers ── */}
      <div className="ccp-pickers">
        {ROLES.map(role => {
          const hex = currentColors[role.key] || "#FFFFFF";
          const isLocked = isAiMode || (isHybrid && role.key !== "primaryWall");

          return (
            <div key={role.key} className={`ccp-picker ${isLocked ? "locked" : ""}`}>
              <div className="ccp-picker-header">
                <span className="ccp-picker-emoji">{role.emoji}</span>
                <span className="ccp-picker-label">{role.label}</span>
                {isHybrid && role.key !== "primaryWall" && (
                  <span className="ccp-auto-badge">AUTO</span>
                )}
              </div>
              <div className="ccp-picker-body">
                <div className="ccp-swatch-wrap">
                  <input
                    type="color"
                    value={hex}
                    onChange={e => handleColorChange(role.key, e.target.value)}
                    disabled={isLocked}
                    className="ccp-color-input"
                  />
                  <div className="ccp-swatch" style={{ background: hex }} />
                </div>
                <input
                  type="text"
                  value={hex}
                  onChange={e => handleHexInput(role.key, e.target.value)}
                  disabled={isLocked}
                  className="ccp-hex-text"
                  maxLength={7}
                  spellCheck={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Match to Brand Button ── */}
      {!isAiMode && (
        <button className="ccp-match-btn" onClick={onMatchBrand}>
          🎯 Match My Colors to Paint Brands
        </button>
      )}
    </div>
  );
}
