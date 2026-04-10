from flask import Flask, request, jsonify
from flask_cors import CORS
from color_engine import extract_colors
import os
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:4173", "*"])

MAX_IMAGE_SIZE = (800, 800)  # Resize for fast processing


def resize_image(img: Image.Image) -> Image.Image:
    img.thumbnail(MAX_IMAGE_SIZE, Image.LANCZOS)
    return img


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "EMCO SALES Color Engine"})


@app.route("/api/analyze", methods=["POST"])
def analyze():
    try:
        img = None

        # Handle multipart file upload
        if "image" in request.files:
            file = request.files["image"]
            if file.filename == "":
                return jsonify({"error": "No file selected"}), 400
            img = Image.open(file.stream).convert("RGB")

        # Handle base64 JSON payload
        elif request.is_json and "imageData" in request.json:
            data_url = request.json["imageData"]
            # Strip the data:image/...;base64, prefix
            if "," in data_url:
                data_url = data_url.split(",", 1)[1]
            img_bytes = base64.b64decode(data_url)
            img = Image.open(BytesIO(img_bytes)).convert("RGB")

        else:
            return jsonify({"error": "No image provided"}), 400

        img = resize_image(img)

        colors = extract_colors(img)

        return jsonify({
            "success": True,
            "colors": colors,
            "colorCount": len(colors)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🎨 EMCO SALES Color Engine running on http://localhost:{port}")
    app.run(debug=True, host="0.0.0.0", port=port)
