Guía rápida: mejorar una imagen de logo (Windows PowerShell)

Resumen:
- Para logos y texto planos la mejor solución es vectorizar (SVG) — usar Inkscape o Illustrator (trazado) o un servicio online.
- Si quieres una mejora rápida local, puedes reescalar con buena remuestreo y aplicar un ligero sharpen (script con Pillow incluido).

Pasos rápidos (PowerShell)

1) Crear un entorno virtual e instalar Pillow

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip pillow
```

2) Ejecutar el script de ejemplo

```powershell
python .\tools\upscale.py --input .\images\marianela-daniel-logo.png --scale 4
```

Esto generará `images\marianela-daniel-logo@4x.png` y (si WebP es soportado en Pillow) `images\marianela-daniel-logo@4x.webp`.

Alternativas y recomendaciones:
- Vectorizar (mejor resultado para logos):
  - Abre la PNG en Inkscape > Path > Trace Bitmap > experimente con Umbral/Detect edges. Guardar como SVG.
  - Online: vectorizer.io, autotracer.org, or Adobe Illustrator Image Trace.

- Upscaling AI (mejor para fotografías):
  - Real-ESRGAN, Gigapixel AI, Topaz Labs, or online waifu2x. Requieren instalación o pago.

- ImageMagick (rápido, no-AI):
  - `magick convert input.png -filter Lanczos -resize 400% -quality 95 output.png`

CSS/HTML tips (evita pixelación en la web):
- Usa la imagen a su tamaño nativo o menor. Evita estirarla en CSS más allá del tamaño real.
- Usa `srcset` con versiones 1x/2x/4x y `width/height` apropiados.

Ejemplo de `img` con `srcset`:

```html
<img src="/images/marianela-daniel-logo@1x.png"
     srcset="/images/marianela-daniel-logo@1x.png 1x, /images/marianela-daniel-logo@2x.png 2x, /images/marianela-daniel-logo@4x.png 4x"
     alt="Marianela & Daniel" style="max-width:100%;height:auto;" />
```

Notas finales:
- Si quieres, puedo:
  1) Ejecutar el script aquí y subir la versión mejorada si subes el archivo original al repo (o me confirmas permiso para leer la imagen en `images/`).
  2) Intentar vectorizar automáticamente (pero requiere intervención manual para mejores resultados).

Elige la opción que prefieras y continúo.
