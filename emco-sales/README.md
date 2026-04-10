# EMCO SALES Color Recommendation System 🎨

> **Your Trusted Paint & Color Expert**  
> A production-ready, mobile-first web app that helps Indian customers choose paint colors using AI-powered color detection and brand-specific recommendations.

---

## 🏗️ Project Structure

```
emco-sales/
├── frontend/                  ← React.js (Vite) SPA
│   ├── public/
│   │   └── rooms/             ← 5 pre-loaded Indian room images
│   │       ├── living.png
│   │       ├── bedroom.png
│   │       ├── kitchen.png
│   │       ├── exterior.png
│   │       └── budget.png
│   └── src/
│       ├── components/        ← UI components (11 components)
│       ├── pages/Home.jsx     ← Main app page
│       ├── data/paintDatabase.js  ← 100+ paint shades
│       ├── utils/
│       │   ├── colorEngine.js     ← Color theory palette generator
│       │   └── colorMatcher.js    ← Brand paint matching (RGB distance)
│       └── index.css          ← Global dark theme design system
└── backend/                   ← Python Flask API
    ├── app.py                 ← REST API (image analysis endpoint)
    ├── color_engine.py        ← ColorThief + colorsys extraction
    └── requirements.txt
```

---

## 🚀 Quick Start

### Option A: Frontend Only (Works Without Python)

The app works fully without the backend using **smart client-side color extraction**. Just run the frontend:

```bash
cd emco-sales/frontend
npm install
npm run dev
```

Open: **http://localhost:5173**

---

### Option B: Full Stack (Best Color Accuracy)

#### Step 1 — Start the Python Backend

> **Requires Python 3.8+**

```bash
cd emco-sales/backend

# Create a virtual environment (recommended)
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

Backend runs at: `http://localhost:5000`

#### Step 2 — Start the Frontend

```bash
cd emco-sales/frontend
npm install      # (skip if already done)
npm run dev
```

Open: **http://localhost:5173**

---

## ✨ Features

| Feature | Description |
|---|---|
| 📸 Image Upload | Upload JPG/PNG or capture with mobile camera |
| 🎨 AI Color Detection | Extracts 5–8 dominant colors from your room photo |
| 🖌️ 3 Palette Styles | Modern Minimal, Luxury Premium, Budget Friendly |
| 🏪 Brand Paint Mapping | Real shades from Asian Paints, Birla Opus, Nippon Paint |
| 🏠 Indian Room Samples | 5 pre-loaded Indian home style images |
| 🖼️ Before/After Preview | Canvas-based color overlay comparison |
| 💬 WhatsApp Integration | One-tap expert consultation with pre-filled message |
| 💾 Save & Download | Export palette as PNG or branded PDF |
| 📱 Mobile-First | Designed for mobile, responsive on all screens |

---

## 🏪 Paint Brands Covered

### Asian Paints
- **Royale Series** — Luxury smooth interior finishes (₹₹₹)
- **Tractor Emulsion** — Budget-friendly interior paint (₹)
- **Apex Exterior** — Weather-resistant exterior paint (₹₹)

### Birla Opus
- **Everlast Premium** — Modern premium designer shades (₹₹₹)
- **Opus Trends** — Trendy contemporary palettes (₹₹)

### Nippon Paint
- **Satin Glo** — Smooth, odour-less interior finish (₹₹)
- **Weatherbond Exterior** — Superior weather protection (₹₹)

---

## 📱 WhatsApp Contact

**EMCO SALES**: [+91 90351 51620](https://wa.me/919035151620)

The "Consult Expert" button auto-fills a WhatsApp message with your selected palette colors.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Vanilla CSS, Google Fonts (Inter) |
| Color Extraction | Python ColorThief / JS canvas fallback |
| Color Matching | RGB Euclidean distance algorithm |
| PDF Export | jsPDF + html2canvas |
| Backend | Python Flask + CORS |

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/analyze` | Analyze image, return colors |

**Request body** (`/api/analyze`):
```json
{ "imageData": "data:image/jpeg;base64,..." }
```

**Response**:
```json
{
  "success": true,
  "colors": [
    { "hex": "#F5E6C8", "label": "Warm Light / Wall Base", "isWarm": true, ... }
  ]
}
```

---

## 🚀 Build for Production

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

---

## 📞 Support

For business queries, contact EMCO SALES:  
📱 WhatsApp: **+91 90351 51620**
