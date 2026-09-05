#!/usr/bin/env python3
"""Composite geometric stamp + exact editorial type onto vintage paper."""
from __future__ import annotations

from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter, ImageChops

PAPER = "/workspace/artifacts/imagine_images/8b968bc9-d17f-4119-bf16-6acbcd4b4331.jpg"
OUT = "/workspace/.grok/og-raw.jpg"

INK = (28, 25, 21)  # #1C1915
BLUE = (26, 111, 168)  # #1A6FA8

SERIF_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"


def draw_text_centered(draw, xy, text, font, fill, tracking=0):
    x, y = xy
    if tracking == 0:
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        draw.text((x - w / 2, y), text, font=font, fill=fill)
        return w, bbox[3] - bbox[1]
    widths = []
    for ch in text:
        bbox = draw.textbbox((0, 0), ch, font=font)
        widths.append(bbox[2] - bbox[0])
    total = sum(widths) + tracking * (len(text) - 1)
    cx = x - total / 2
    for ch, w in zip(text, widths):
        draw.text((cx, y), ch, font=font, fill=fill)
        cx += w + tracking
    bbox = draw.textbbox((0, 0), text[0], font=font)
    return total, bbox[3] - bbox[1]


def inked_blue(base: Image.Image) -> Image.Image:
    """Pure brand blue with a whisper of paper grain so it reads as print, not vector."""
    color = Image.new("RGB", base.size, BLUE)
    grain = ImageEnhance.Contrast(base.convert("L")).enhance(1.25)
    mul = ImageChops.multiply(color, Image.merge("RGB", (grain, grain, grain)))
    return Image.blend(color, mul, 0.18)


def stamp_circle(base: Image.Image, ink: Image.Image, cx: int, cy: int, r: int) -> None:
    stamp = Image.new("L", base.size, 0)
    d = ImageDraw.Draw(stamp)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=255)
    stamp = stamp.filter(ImageFilter.GaussianBlur(0.55))
    base.paste(ink, mask=stamp)


def stamp_ring(base: Image.Image, ink: Image.Image, cx: int, cy: int, r: int, thickness: int) -> None:
    mask = Image.new("L", base.size, 0)
    d = ImageDraw.Draw(mask)
    inner = max(1, r - thickness)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=255)
    d.ellipse((cx - inner, cy - inner, cx + inner, cy + inner), fill=0)
    mask = mask.filter(ImageFilter.GaussianBlur(0.4))
    base.paste(ink, mask=mask)


def side_rules(draw, cx, y, text_half, gap=28, rule_len=72, fill=INK, width=2):
    """Short letterpress rules flanking a centered volume line."""
    left_end = cx - text_half - gap
    right_start = cx + text_half + gap
    draw.line((left_end - rule_len, y, left_end, y), fill=fill, width=width)
    draw.line((right_start, y, right_start + rule_len, y), fill=fill, width=width)


def main():
    base = Image.open(PAPER).convert("RGB")
    W, H = base.size
    cx = W // 2
    ink = inked_blue(base)

    head_r = 160
    head_cy = int(H * 0.355)
    stamp_circle(base, ink, cx, head_cy, head_r)

    ring_r = 24
    ring_t = 8
    ring_cy = head_cy + head_r + 20
    stamp_ring(base, ink, cx, ring_cy, ring_r, ring_t)

    draw = ImageDraw.Draw(base)
    title_font = ImageFont.truetype(SERIF_BOLD, 96)
    vol_font = ImageFont.truetype(SERIF_BOLD, 46)
    sub_font = ImageFont.truetype(SERIF, 27)

    title_y = ring_cy + ring_r + 42
    draw_text_centered(draw, (cx, title_y), "Doraemon", title_font, INK, tracking=3)

    vol_y = title_y + 112
    vol_w, vol_h = draw_text_centered(draw, (cx, vol_y), "Vol. 1", vol_font, INK, tracking=8)
    side_rules(draw, cx, vol_y + vol_h * 0.42, vol_w / 2, gap=26, rule_len=78, width=2)

    sub_y = vol_y + 70
    draw_text_centered(
        draw, (cx, sub_y), "Corrected English Script", sub_font, INK, tracking=8
    )

    base.save(OUT, "JPEG", quality=95)
    print(f"wrote {OUT} {base.size}")


if __name__ == "__main__":
    main()
