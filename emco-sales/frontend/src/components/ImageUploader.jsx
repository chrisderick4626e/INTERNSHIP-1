import React, { useRef, useState, useCallback } from "react";
import "./ImageUploader.css";

const SAMPLE_ROOMS = [
  { id: "living",   label: "Living Room",     emoji: "🛋️",  src: "/rooms/living.png" },
  { id: "bedroom",  label: "Bedroom",         emoji: "🛏️",  src: "/rooms/bedroom.png" },
  { id: "kitchen",  label: "Kitchen",         emoji: "🍳",  src: "/rooms/kitchen.png" },
  { id: "exterior", label: "House Exterior",  emoji: "🏠",  src: "/rooms/exterior.png" },
  { id: "budget",   label: "Budget Home",     emoji: "💰",  src: "/rooms/budget.png" },
];

export default function ImageUploader({ onImage, onImageReady, currentImage }) {
  const handleReady = onImage || onImageReady; // support both prop names
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(
    (file) => {
      if (!file) return;
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        alert("Please upload a JPG or PNG image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setPreview(dataUrl);
        setSelectedSample(null);
        handleReady(dataUrl); // pass plain URL string
      };
      reader.readAsDataURL(file);
    },
    [handleReady]
  );

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleSampleSelect = async (room) => {
    setSelectedSample(room.id);
    setPreview(room.src);
    try {
      const res  = await fetch(room.src);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = (e) => handleReady(e.target.result); // plain URL string
      reader.readAsDataURL(blob);
    } catch {
      handleReady(room.src); // fallback: use path directly
    }
  };

  const handleClear = () => {
    setPreview(null);
    setSelectedSample(null);
    // don't call handleReady(null) — let parent manage state separately
  };

  return (
    <section className="uploader-section card" id="upload-section">
      <div className="section-header">
        <span className="section-icon">📸</span>
        <div>
          <h2 className="section-title">Upload Your Room</h2>
          <p className="section-desc">Upload a photo or choose from our Indian home styles</p>
        </div>
      </div>

      {/* Sample Room Picker */}
      <div className="sample-label">Choose a Sample Style:</div>
      <div className="sample-grid">
        {SAMPLE_ROOMS.map((room) => (
          <button
            key={room.id}
            className={`sample-btn ${selectedSample === room.id ? "active" : ""}`}
            onClick={() => handleSampleSelect(room)}
            id={`sample-${room.id}`}
          >
            <img src={room.src} alt={room.label} className="sample-thumb" />
            <span className="sample-btn-emoji">{room.emoji}</span>
            <span className="sample-btn-label">{room.label}</span>
          </button>
        ))}
      </div>

      <div className="or-divider"><span>OR</span></div>

      {/* Drop Zone */}
      {!preview ? (
        <div
          className={`drop-zone ${isDragging ? "dragging" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          id="drop-zone"
        >
          <div className="drop-icon">🖼️</div>
          <p className="drop-text">Tap to upload or drag &amp; drop</p>
          <p className="drop-sub">JPG, JPEG, PNG supported</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            className="hidden-input"
            onChange={handleFileChange}
            id="file-upload-input"
          />
        </div>
      ) : (
        <div className="preview-area">
          <img src={preview} alt="Room preview" className="preview-img" />
          <button className="clear-btn" onClick={handleClear} id="clear-image-btn">
            ✕ Change Image
          </button>
        </div>
      )}

      {/* Camera Button */}
      <button
        className="camera-btn"
        onClick={() => cameraInputRef.current.click()}
        id="camera-capture-btn"
      >
        <span>📷</span> Capture with Camera
      </button>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden-input"
        onChange={handleFileChange}
        id="camera-input"
      />
    </section>
  );
}
