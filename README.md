# rakibulahasan.com

Personal website for Rakibul Ahasan, PhD. Static HTML, no build step, hosted on GitHub Pages.

## Files

```
index.html         Home page
about.html         About / bio
research.html      Research themes
publications.html  Publications list with topic filter
tools.html         Esri tools and open-source code
writing.html       Blog / essay index
contact.html       Contact page
styles.css         Shared stylesheet — every page links here
CNAME              (auto-created by GitHub) tells Pages which domain to serve
```

## Editing pages

Each HTML file is independent. To change the navigation, the header block
near the top of every page needs updating in each file. (This is the
trade-off for not using a framework. The upside is that nothing can ever
break the build.)

To change the look of *all* pages at once, edit `styles.css`. Color
tokens, fonts, spacing, and component styles all live there.

## Adding a new page

1. Copy any existing page, e.g. `about.html`, and rename it.
2. Update the `<title>`, the page-header block, and the body content.
3. Add a `<a href="newpage.html">New page</a>` link to the nav block on
   every other page (or just the ones you want it linked from).

## Adding a publication

In `publications.html`, copy any existing `<article class="pub-item">`
block and change the year, title, journal, authors, and link.

The `data-tags` attribute controls which filter buttons show the item.
Available tags: `urban`, `biodiv`, `roads`, `planning`. Add more tags
or filter buttons as needed.

## Adding a research figure

1. Drop figure images in `assets/research/` using the naming convention
   `theme-NN.jpg` (e.g., `urban-01.jpg`, `roads-01.jpg`).
2. In `research.html`, find the `<aside class="theme-figures">` block
   for the relevant theme and replace one of the `<figure class="theme-figure placeholder">`
   blocks with a real figure:

   ```html
   <figure class="theme-figure">
     <img src="assets/research/urban-01.jpg"
          alt="Brief description of the figure"
          loading="lazy" />
     <figcaption>Fig. 1 — Short caption explaining the figure</figcaption>
   </figure>
   ```

3. Compress images first with squoosh.app (target <500 KB per file).
   PNG is best for charts and diagrams; JPG/WebP for maps and photos.

## Adding a travel diary entry

1. Drop trip photos in `assets/travel/` using the naming convention
   `tripname-NN.jpg` (e.g., `tokyo-01.jpg`, `tokyo-02.jpg`).
2. In `travel.html`, copy any existing `<article class="trip">` block.
3. Update the trip metadata (date, coordinates, location, title, note).
4. Replace each `<figure class="placeholder">Photo NN</figure>` with a
   real figure pointing at your image:

   ```html
   <figure>
     <img src="assets/travel/tokyo-01.jpg"
          alt="Description of the photo"
          loading="lazy" />
     <figcaption>Optional hover caption.</figcaption>
   </figure>
   ```

5. Compress images first — try squoosh.app to keep each photo under
   ~400 KB. The page lazy-loads images, but small files still beat
   big ones on mobile.

## Deploying

This is a vanilla static site. Drop these files in any GitHub Pages
repo (or any host: Netlify, Vercel, Cloudflare Pages) and the site
works.

## License / credits

Fonts: Fraunces, Source Serif 4, JetBrains Mono — all open licenses
via Google Fonts.
