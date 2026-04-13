import React, { useState, useCallback, useRef } from "react";
import ImageUploader    from "../components/ImageUploader.jsx";
import ColorPalette     from "../components/ColorPalette.jsx";
import PaletteSelector  from "../components/PaletteSelector.jsx";
import BrandRecommendations from "../components/BrandRecommendations.jsx";
import BeforeAfter      from "../components/BeforeAfter.jsx";
import WhatsAppButton   from "../components/WhatsAppButton.jsx";
import SaveDownload     from "../components/SaveDownload.jsx";
import LoadingSpinner   from "../components/LoadingSpinner.jsx";
import FilterBar        from "../components/FilterBar.jsx";

import { classifyColor, generateAllPalettes } from "../utils/colorEngine.js";
import { matchPaletteToBrands }               from "../utils/colorMatcher.js";
import { BRANDS, PRICE_CAT }                  from "../data/paintDatabase.js";
import "./Home.css";

// ─── Client-side canvas color extractor (offline fallback) ──
async function extractColorsFromImage(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const SIZE   = 100;
      canvas.width = SIZE;
      canvas.height= SIZE;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, SIZE, SIZE);
      const data = ctx.getImageData(0, 0, SIZE, SIZE).data;

      // Sample every 4th pixel, bucket into grid
      const buckets = {};
      const step    = 32; // color quantization
      for (let i = 0; i < data.length; i += 16) {
        const r = Math.round(data[i]     / step) * step;
        const g = Math.round(data[i + 1] / step) * step;
        const b = Math.round(data[i + 2] / step) * step;
        const a = data[i + 3];
        if (a < 128) continue;
        const key = `${r},${g},${b}`;
        buckets[key] = (buckets[key] || 0) + 1;
      }

      const sorted = Object.entries(buckets)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([key]) => {
          const [r, g, b] = key.split(",").map(Number);
          const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
          return { hex, r, g, b };
        });

      resolve(sorted);
    };
    img.onerror = () => resolve([]);
    img.src = imageUrl;
  });
}

// ─── Map PRICE_CAT to palette style ID ──────────────────────
function budgetToPaletteStyle(budget) {
  if (budget === PRICE_CAT.PREMIUM) return "luxury";
  if (budget === PRICE_CAT.BUDGET)  return "budget";
  return "minimal";
}

// ─── Main Page ───────────────────────────────────────────────
export default function Home() {
  const BACKEND = "http://localhost:5000";

  // Image state
  const [imageUrl,    setImageUrl]    = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [backendMode, setBackendMode] = useState(null); // null | "online" | "offline"

  // Color analysis state
  const [detectedColors, setDetectedColors] = useState(null); // raw extracted colors
  const [allPalettes,    setAllPalettes]    = useState(null); // { luxury, minimal, budget }
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [matchedPalette,  setMatchedPalette]  = useState(null);

  // Filter state
  const [budget, setBudget] = useState(PRICE_CAT.MIDRANGE);
  const [brand,  setBrand]  = useState("all");
  const [usage,  setUsage]  = useState("interior");

  const paletteRef = useRef(null);

  // ── Run full analysis pipeline ─────────────────────────────
  const analyzeImage = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    setDetectedColors(null);
    setAllPalettes(null);
    setSelectedPalette(null);
    setMatchedPalette(null);

    try {
      let colors = [];

      // Try backend first
      try {
        const res = await fetch(`${BACKEND}/api/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: url }),
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.colors?.length) {
            colors = json.colors;
            setBackendMode("online");
          }
        }
      } catch {
        // Backend unavailable — fall through
      }

      // Client-side fallback
      if (colors.length === 0) {
        colors = await extractColorsFromImage(url);
        setBackendMode("offline");
      }

      if (colors.length === 0) {
        setError("Could not extract colors from this image. Please try another photo.");
        return;
      }

      // Classify colors
      const classified = colors.map(c => ({ ...c, ...classifyColor(c.hex) }));
      setDetectedColors(classified);

      // Generate all 3 palette styles
      const palettes = generateAllPalettes(classified);
      setAllPalettes(palettes);

      // Auto-select based on current budget filter
      const autoStyle = budgetToPaletteStyle(budget);
      const autoPalette = palettes[autoStyle] || palettes.minimal;
      setSelectedPalette(autoPalette);

      // Match to brand paints
      const matched = matchPaletteToBrands(autoPalette.colors, budget, usage);
      setMatchedPalette(matched);

      // Scroll to results
      setTimeout(() => paletteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);

    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [budget, usage]);

  // ── Handle image selection ─────────────────────────────────
  const handleImage = useCallback((url) => {
    setImageUrl(url);
    analyzeImage(url);
  }, [analyzeImage]);

  // ── Handle palette selection ───────────────────────────────
  const handlePaletteSelect = useCallback((palette) => {
    setSelectedPalette(palette);
    const matched = matchPaletteToBrands(palette.colors, budget, usage);
    setMatchedPalette(matched);
  }, [budget, usage]);

  // ── Re-run on filter changes (if image already loaded) ────
  const handleBudgetChange = useCallback((newBudget) => {
    setBudget(newBudget);
    if (!allPalettes) return;
    const style   = budgetToPaletteStyle(newBudget);
    const palette = allPalettes[style] || allPalettes.minimal;
    setSelectedPalette(palette);
    setMatchedPalette(matchPaletteToBrands(palette.colors, newBudget, usage));
  }, [allPalettes, usage]);

  const handleUsageChange = useCallback((newUsage) => {
    setUsage(newUsage);
    if (!selectedPalette) return;
    setMatchedPalette(matchPaletteToBrands(selectedPalette.colors, budget, newUsage));
  }, [selectedPalette, budget]);

  const handleBrandChange = useCallback((newBrand) => {
    setBrand(newBrand);
    // Brand filter is passed down and handled in BrandRecommendations display
  }, []);

  // ── WhatsApp message builder ────────────────────────────────
  const buildWaMessage = () => {
    if (!selectedPalette) return "Hello! I need help choosing paint colors for my home.";
    const colors  = selectedPalette.colors || {};
    const lines   = Object.values(colors)
      .map(c => `• ${c.role}: ${c.name} (${c.hex})`)
      .join("\n");
    return `Hello EMCO SALES! 👋\n\nI used your Color Recommendation System and selected the *${selectedPalette.name}* palette:\n\n${lines}\n\nBudget: ${budget} | Usage: ${usage}\n\nCould you suggest the best Asian Paints / Birla Opus products for these shades? Thank you!`;
  };

  return (
    <main className="home-main">
      {/* Hero strip */}
      <div className="hero-strip">
        <div className="hero-badges">
          <span className="hero-badge">🏆 Asian Paints</span>
          <span className="hero-badge">💎 Birla Opus</span>
        </div>
        <p className="hero-subtext">
          Upload a room photo → AI detects colors → get smart paint recommendations → consult on WhatsApp
        </p>
      </div>

      {/* Backend notice */}
      {backendMode === "offline" && (
        <div className="backend-notice">
          ⚡ Running in offline mode — using smart client-side color analysis
        </div>
      )}
      {error && <div className="error-banner">⚠️ {error}</div>}

      {loading && <LoadingSpinner />}

      <div className="sections-wrapper">

        {/* ── Section 1: Upload ──────────────────────────── */}
        <div id="upload-section">
          <ImageUploader onImage={handleImage} currentImage={imageUrl} />
        </div>

        {/* ── Section 2: Smart Filters (always visible) ─── */}
        <div id="filter-section">
          <FilterBar
            budget={budget}
            brand={brand}
            usage={usage}
            onBudget={handleBudgetChange}
            onBrand={handleBrandChange}
            onUsage={handleUsageChange}
          />
        </div>

        {/* ── Section 3: Detected Colors ───────────────── */}
        {detectedColors && (
          <div id="detected-colors" ref={paletteRef}>
            <ColorPalette colors={detectedColors} />
          </div>
        )}

        {/* ── Section 4: Palette Suggestions ───────────── */}
        {allPalettes && (
          <div id="palette-suggestions">
            <PaletteSelector
              palettes={allPalettes}
              selected={selectedPalette}
              onSelect={handlePaletteSelect}
            />
          </div>
        )}

        {/* ── Section 5: Brand Recommendations ─────────── */}
        {matchedPalette && (
          <div id="brand-recommendations">
            <BrandRecommendations
              matchedPalette={matchedPalette}
              activeBrand={brand}
            />
          </div>
        )}

        {/* ── Section 6: Before / After Preview ─────────── */}
        {imageUrl && selectedPalette?.colors && (
          <div id="color-preview">
            <BeforeAfter
              imageUrl={imageUrl}
              palette={Object.values(selectedPalette.colors).map(c => c.hex)}
            />
          </div>
        )}

        {/* ── Section 7: Save / Download ────────────────── */}
        {selectedPalette?.colors && (
          <div id="save-download">
            <SaveDownload
              palette={selectedPalette}
              detectedColors={detectedColors}
            />
          </div>
        )}

        {/* ── Section 8: WhatsApp ────────────────────────── */}
        <div id="whatsapp-contact">
          <WhatsAppButton
            waMessage={buildWaMessage()}
            palette={selectedPalette}
          />
        </div>

      </div>
    </main>
  );
}
