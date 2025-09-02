#!/usr/bin/env python3
"""Simple local upscaler using Pillow.

Usage:
    python tools/upscale.py --input images/marianela-daniel-logo.png --scale 4

This will create PNG and WebP upscaled versions in the images folder.
"""
import argparse
import os
from PIL import Image, ImageFilter


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--input', '-i', required=True, help='Path to input image (PNG/JPG)')
    p.add_argument('--scale', '-s', type=int, default=4, help='Integer upscale factor (e.g. 2, 3, 4)')
    p.add_argument('--outdir', '-o', default='images', help='Output directory (default: images)')
    args = p.parse_args()

    inp = args.input
    scale = max(1, args.scale)
    outdir = args.outdir

    if not os.path.isfile(inp):
        print(f'Error: input file not found: {inp}')
        return

    os.makedirs(outdir, exist_ok=True)

    img = Image.open(inp)
    # Convert to RGBA if image has transparency, else RGB
    mode = 'RGBA' if img.mode in ('RGBA', 'LA') or ('transparency' in img.info) else 'RGB'
    if img.mode != mode:
        img = img.convert(mode)

    w, h = img.size
    new_size = (w * scale, h * scale)
    print(f'Upscaling {inp} {w}x{h} -> {new_size} using LANCZOS...')

    up = img.resize(new_size, resample=Image.LANCZOS)

    # Apply a light unsharp mask to restore perceived sharpness
    up = up.filter(ImageFilter.UnsharpMask(radius=1, percent=150, threshold=3))

    base = os.path.splitext(os.path.basename(inp))[0]
    out_png = os.path.join(outdir, f'{base}@{scale}x.png')
    out_webp = os.path.join(outdir, f'{base}@{scale}x.webp')

    # Save PNG (lossless) and WebP (smaller, good quality)
    up.save(out_png, format='PNG', optimize=True)
    try:
        up.save(out_webp, format='WEBP', quality=90, method=6)
    except Exception:
        print('Could not save WebP (Pillow may not support WebP in this environment). PNG saved.')

    print('Saved:')
    print(' -', out_png)
    if os.path.isfile(out_webp):
        print(' -', out_webp)


if __name__ == '__main__':
    main()
