from PIL import Image
from pathlib import Path

FULL_PATHS = [
    Path("src/assets/logo-sully.png"),
    Path("public/logo-sully.png"),
    Path("public/logo-sully-hero.png"),
]

MARK_PATHS = [
    Path("src/assets/logo-sully-mark.png"),
    Path("public/logo-sully-mark.png"),
]


def is_bg(px, thresh=42):
    r, g, b, a = px
    if a == 0:
        return True
    # keep terminal green glow
    if g > r + 12 and g > b + 8:
        return False
    # keep beige frame / white SULLY wordmark
    if max(r, g, b) >= 70:
        return False
    return r <= thresh and g <= thresh and b <= thresh


def remove_bg(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    pixels = img.load()
    visited = [[False] * w for _ in range(h)]
    stack: list[tuple[int, int]] = []
    for x in range(0, w, max(1, w // 60)):
        stack.extend([(x, 0), (x, h - 1)])
    for y in range(0, h, max(1, h // 60)):
        stack.extend([(0, y), (w - 1, y)])
    stack.extend([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])

    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        if not is_bg(pixels[x, y]):
            continue
        pixels[x, y] = (0, 0, 0, 0)
        stack.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    bbox = img.getbbox()
    cropped = img.crop(bbox) if bbox else img
    pad = 16
    cw, ch = cropped.size
    canvas = Image.new("RGBA", (cw + pad * 2, ch + pad * 2), (0, 0, 0, 0))
    canvas.paste(cropped, (pad, pad), cropped)
    return canvas


if __name__ == "__main__":
    base = Image.open(FULL_PATHS[0])
    out = remove_bg(base)
    # Full logo only — do NOT crop the SULLY wordmark under the CRT
    for p in FULL_PATHS + MARK_PATHS:
        out.save(p)
        print("saved", p, out.size)
