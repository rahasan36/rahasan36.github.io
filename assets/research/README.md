# Research figures

Drop figure images here, one per file. Naming convention:
`themeNN-figureNN.jpg` — e.g., `urban-01.jpg`, `roads-01.jpg`.

Image guidelines:
- PNG for diagrams and charts (preserves text crispness)
- JPG/WebP for maps and photo-like figures (smaller files)
- 1200–1600px on the long edge; <500 KB per file
- Use squoosh.app to compress before upload

When swapping placeholders in research.html:

  <figure class="theme-figure">
    <img src="assets/research/urban-01.jpg"
         alt="Brief alt text describing the figure"
         loading="lazy" />
    <figcaption>Figure 1 — Short caption</figcaption>
  </figure>

The <figcaption> is optional but useful for context.
