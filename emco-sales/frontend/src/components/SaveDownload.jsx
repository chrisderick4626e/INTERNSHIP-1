import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./SaveDownload.css";

export default function SaveDownload({ palette, detectedColors }) {
  const paletteRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const captureCanvas = async () => {
    if (!paletteRef.current) return null;
    return await html2canvas(paletteRef.current, {
      backgroundColor: "#1a1a2e",
      scale: 2,
      useCORS: true,
      logging: false,
    });
  };

  const downloadPNG = async () => {
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = `EMCO-SALES-palette-${palette?.style || "custom"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const downloadPDF = async () => {
    setPdfLoading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height / canvas.width) * pdfW;

      // Header
      pdf.setFillColor(26, 26, 46);
      pdf.rect(0, 0, pdfW, 28, "F");
      pdf.setTextColor(248, 201, 72);
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("EMCO SALES", pdfW / 2, 12, { align: "center" });
      pdf.setFontSize(9);
      pdf.setTextColor(180, 180, 200);
      pdf.text("Color Recommendation System — Your Trusted Paint & Color Expert", pdfW / 2, 19, { align: "center" });

      // Palette image
      pdf.addImage(imgData, "PNG", 10, 32, pdfW - 20, pdfH - 20);

      // Footer
      const footerY = 32 + pdfH - 20 + 6;
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 140);
      pdf.text(`Generated on ${new Date().toLocaleDateString("en-IN")} | wa.me/919035151620`, pdfW / 2, footerY, { align: "center" });

      pdf.save(`EMCO-SALES-palette-${palette?.style || "custom"}.pdf`);
    } finally {
      setPdfLoading(false);
    }
  };

  if (!palette) return null;

  return (
    <section className="save-section card" id="save-download">
      <div className="section-header">
        <span className="section-icon">💾</span>
        <div>
          <h2 className="section-title">Save Your Palette</h2>
          <p className="section-desc">Download as PNG or PDF to share with family or our experts</p>
        </div>
      </div>

      {/* Preview card that gets captured */}
      <div className="palette-export-card" ref={paletteRef} id="palette-export-card">
        <div className="export-header">
          <div className="export-logo">🎨 EMCO SALES</div>
          <div className="export-palette-name">{palette.emoji} {palette.name}</div>
          <div className="export-tagline">Your Trusted Paint &amp; Color Expert</div>
        </div>
        <div className="export-swatches">
          {Object.entries(palette.colors).map(([, c], i) => (
            <div key={i} className="export-swatch">
              <div className="export-swatch-color" style={{ background: c.hex }} />
              <div className="export-swatch-label">{c.label}</div>
              <div className="export-swatch-hex">{c.hex}</div>
            </div>
          ))}
        </div>
        {detectedColors && (
          <div className="export-detected">
            <div className="export-section-title">Detected from your image:</div>
            <div className="export-detected-row">
              {detectedColors.slice(0, 6).map((c, i) => (
                <div key={i} className="export-detected-dot" style={{ background: c.hex }} title={c.hex} />
              ))}
            </div>
          </div>
        )}
        <div className="export-footer">
          Visit: EMCO SALES | WhatsApp: +91 90351 51620
        </div>
      </div>

      <div className="download-btns">
        <button
          className="download-btn png"
          onClick={downloadPNG}
          disabled={downloading}
          id="download-png-btn"
        >
          {downloading ? "⏳ Saving…" : "🖼️ Download PNG"}
        </button>
        <button
          className="download-btn pdf"
          onClick={downloadPDF}
          disabled={pdfLoading}
          id="download-pdf-btn"
        >
          {pdfLoading ? "⏳ Generating…" : "📄 Download PDF"}
        </button>
      </div>
    </section>
  );
}
