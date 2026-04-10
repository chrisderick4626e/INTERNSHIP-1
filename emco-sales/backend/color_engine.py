from colorthief import ColorThief
from PIL import Image
from io import BytesIO
import colorsys
import math


def hex_from_rgb(r, g, b):
    return "#{:02X}{:02X}{:02X}".format(r, g, b)


def rgb_to_hsl(r, g, b):
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    return h * 360, s * 100, l * 100


def classify_color(r, g, b):
    """Return a human-readable tone label for a color."""
    h, s, l = rgb_to_hsl(r, g, b)

    # Neutral / Grey / White / Black
    if s < 12:
        if l > 85:
            return "Light Neutral / Ceiling"
        elif l < 25:
            return "Dark Neutral / Shadow"
        else:
            return "Neutral Grey"

    # Warm tones (reds, oranges, yellows)
    if h < 45 or h > 330:
        if l > 70:
            return "Warm Light / Wall Base"
        elif l < 40:
            return "Deep Warm / Accent"
        else:
            return "Warm Mid / Feature Wall"

    # Cool tones (blues, greens)
    if 180 <= h <= 270:
        if l > 70:
            return "Cool Light / Ceiling"
        else:
            return "Cool Accent / Trim"

    # Earthy / grounded
    if 45 <= h < 90:
        return "Earthy Green / Natural"

    if 90 <= h < 180:
        return "Soft Teal / Accent"

    return "Decorative Tone"


def extract_colors(pil_image: Image.Image, num_colors: int = 7):
    """Extract dominant colors from a PIL image using ColorThief."""
    buffer = BytesIO()
    pil_image.save(buffer, format="JPEG", quality=85)
    buffer.seek(0)

    ct = ColorThief(buffer)
    palette = ct.get_palette(color_count=num_colors, quality=1)

    results = []
    for rgb in palette:
        r, g, b = rgb
        h, s, l = rgb_to_hsl(r, g, b)
        results.append({
            "hex": hex_from_rgb(r, g, b),
            "r": r,
            "g": g,
            "b": b,
            "h": round(h, 1),
            "s": round(s, 1),
            "l": round(l, 1),
            "label": classify_color(r, g, b),
            "isWarm": (h < 60 or h > 300) and s > 15,
            "isCool": (180 <= h <= 270) and s > 15,
            "isNeutral": s < 15 or (l > 80),
        })

    return results
