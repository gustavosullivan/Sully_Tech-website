from PIL import Image
from pathlib import Path

paths = [
    Path("src/assets/logo-sully.png"),
    Path("public/logo-sully.png"),
    Path("public/logo-sully-hero.png"),
]


def near_black(px, thresh=28):
    r, g, b = px[:3]
    return r <= thresh and g <= thresh and b <= thresh


def remove_bg(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    pixels = img.load()
    visited = [[False] * w for _ in range(h)]
    stack = [
        (0, 0),
        (w - 1, 0),
        (0, h - 1),
        (w - 1, h - 1),
        (w // 2, 0),
        (w // 2, h - 1),
        (0, h // 2),
        (w - 1, h // 2),
    ]

    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        px = pixels[x, y]
        if not near_black(px):
            continue
        pixels[x, y] = (0, 0, 0, 0)
        stack.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    return img


base = Image.open(paths[0])
out = remove_bg(base)
for p in paths:
    out.save(p)
    print("saved", p, out.size)
