import React, { useState, useCallback, useEffect, useRef } from "react";
import ImageUploader from "../components/ImageUploader";
import ColorPalette from "../components/ColorPalette";
import PaletteSelector from "../components/PaletteSelector";
import BrandRecommendations from "../components/BrandRecommendations";
import BeforeAfter from "../components/BeforeAfter";
import WhatsAppButton from "../components/WhatsAppButton";
import SaveDownload from "../components/SaveDownload";
import LoadingSpinner from "../components/LoadingSpinner";
import { generateAllPalettes } from "../utils/colorEngine";
import { mapAllPalettesToBrands } from "../utils/colorMatcher";
import "./Home.css";

const BACKEND_URL = "http://localhost:5000";

/**
 * Fallback: extract dominant colors client-side using canvas sampling.
 * Used when the backend is not running.
 */
async function extractColorsClientSide(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 80;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      // Sample pixels at intervals and bucket by rough hue
      const buckets = {};
      const step = 4 * 8; // every 8th pixel
      for (let i = 0; i < data.length; i += step) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // Bucket key — rounded to nearest 32
        const key = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
        buckets[key] = (buckets[key] || 0) + 1;
      }

      const top = Object.entries(buckets)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7)
        .map(([key]) => {
          const [r, g, b] = key.split(",").map(Number);
          const hex = "#" + [r, g, b].map((v) => Math.min(255, v).toString(16).padStart(2, "0")).join("").toUpperCase();
          // Simple HSL for classification
          const rn = r / 255, gn = g / 255, bn = b / 255;
          const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
          let h = 0, s = 0;
          const l = (max + min) / 2;
          if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
              case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
              case gn: h = ((bn - rn) / d + 2) / 6; break;
              default: h = ((rn - gn) / d + 4) / 6;
            }
          }
          const hDeg = h * 360, sPct = s * 100, lPct = l * 100;
          const isWarm = (hDeg < 60 || hDeg > 300) && sPct > 12;
          const isCool = hDeg >= 180 && hDeg <= 270 && sPct > 12;
          const isNeutral = sPct < 12 || lPct > 82;
          let label = "Detected Tone";
          if (isNeutral) label = lPct > 85 ? "Light Neutral" : "Neutral Grey";
          else if (isWarm) label = lPct > 70 ? "Warm Light" : "Warm Deep";
          else if (isCool) label = "Cool Accent";
          return { hex, r, g, b, h: hDeg, s: sPct, l: lPct, label, isWarm, isCool, isNeutral };
        });

      resolve(top);
    };
    img.onerror = () => resolve([]);
    img.src = dataUrl;
  });
}

export default function Home() {
  const [imageData, setImageData] = useState(null);
  const [detectedColors, setDetectedColors] = useState(null);
  const [palettes, setPalettes] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendAvail, setBackendAvail] = useState(null);
  const [error, setError] = useState(null);

  const resultRef = useRef(null);

  // Check if backend is available on mount
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/health`, { signal: AbortSignal.timeout(3000) })
      .then(() => setBackendAvail(true))
      .catch(() => setBackendAvail(false));
  }, []);

  const analyzeImage = useCallback(
    async (imgData) => {
      if (!imgData) {
        setDetectedColors(null);
        setPalettes(null);
        setSelectedPalette(null);
        return;
      }

      setImageData(imgData);
      setLoading(true);
      setError(null);

      try {
        let colors;

        if (backendAvail) {
          // Call Python backend
          const resp = await fetch(`${BACKEND_URL}/api/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageData: imgData.dataUrl }),
          });
          const json = await resp.json();
          if (!json.success) throw new Error(json.error || "Analysis failed");
          colors = json.colors;
        } else {
          // Fallback: client-side canvas sampling
          colors = await extractColorsClientSide(imgData.dataUrl);
        }

        setDetectedColors(colors);

        // Generate palettes
        const rawPalettes = generateAllPalettes(colors);
        // Map to brand paints
        const mappedPalettes = mapAllPalettesToBrands(rawPalettes);

        setPalettes(mappedPalettes);
        setSelectedPalette(mappedPalettes[0]);

        // Scroll to results
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
      } catch (err) {
        console.error(err);
        setError("Could not analyze image. Trying client-side fallback…");
        // Always try fallback
        try {
          const colors = await extractColorsClientSide(imgData.dataUrl);
          setDetectedColors(colors);
          const rawPalettes = generateAllPalettes(colors);
          const mappedPalettes = mapAllPalettesToBrands(rawPalettes);
          setPalettes(mappedPalettes);
          setSelectedPalette(mappedPalettes[0]);
          setError(null);
        } catch {
          setError("Image analysis failed. Please try a different image.");
        }
      } finally {
        setLoading(false);
      }
    },
    [backendAvail]
  );

  return (
    <main className="home-main">
      {loading && <LoadingSpinner message="Extracting colors from your image…" />}

      {/* Hero / intro strip */}
      <div className="hero-strip">
        <div className="hero-badges">
          <span className="hero-badge">🏆 Asian Paints</span>
          <span className="hero-badge">💎 Birla Opus</span>
          <span className="hero-badge">🌿 Nippon Paint</span>
        </div>
        <p className="hero-subtext">
          Upload a photo of your room → get AI-powered color recommendations → consult our expert on WhatsApp
        </p>
      </div>

      {/* Backend status */}
      {backendAvail === false && (
        <div className="backend-notice">
          ⚡ Running in offline mode — using smart client-side color analysis
        </div>
      )}

      {error && <div className="error-banner">⚠️ {error}</div>}

      <div className="sections-wrapper">
        {/* 1. Image Upload */}
        <ImageUploader onImageReady={analyzeImage} />

        {/* 2. Detected Colors */}
        {detectedColors && <ColorPalette colors={detectedColors} />}

        {/* 3. Palette Suggestions */}
        {palettes && (
          <>
            <div ref={resultRef} />
            <PaletteSelector
              palettes={palettes}
              selectedPalette={selectedPalette}
              onSelect={setSelectedPalette}
            />
          </>
        )}

        {/* 4. Brand Recommendations */}
        {selectedPalette && (
          <BrandRecommendations palette={selectedPalette} />
        )}

        {/* 5. Before / After Preview */}
        {selectedPalette && imageData && (
          <BeforeAfter
            imageDataUrl={imageData.dataUrl}
            palette={selectedPalette}
          />
        )}

        {/* 6. Save & Download */}
        {selectedPalette && (
          <SaveDownload
            palette={selectedPalette}
            detectedColors={detectedColors}
          />
        )}

        {/* 7. WhatsApp CTA */}
        <WhatsAppButton palette={selectedPalette} />
      </div>
    </main>
  );
}
