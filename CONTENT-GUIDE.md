# Editing this site

Notes that used to live as HTML comments inside the pages. They were moved here
because scripted edits (regex passes over the markup) kept matching the example
tags inside those comments and treating them as real entries.

**Keep this file in sync when the markup conventions change.**

---

## publications.html — status tagging

Each `<article class="pub-item">` needs:

- `data-tags="theme1 theme2 ..."` — the themes it belongs to
- `data-status="published" | "review" | "prep" | "wishful"`

| status | meaning | pill |
| --- | --- | --- |
| `published` | appeared in a journal | none |
| `review` | with a journal | `In Revision` / `Under Review` |
| `prep` | being written | `In Prep` |
| `wishful` | an idea worth doing someday | `Wishful` |

Unpublished entries carry **no journal name** and **no target venue** — status and
year only. In-prep entries list the first author plus `et al.` so the author list
stays open.

---

## travel.html — how it is organised

```
Year   ->  <section class="travel-year">, newest year first
Trip   ->  <article class="trip"> inside it, newest first
Album  ->  <div class="trip-gallery">, 6 photos = a 3 x 2 grid
```

### To add a trip

1. Copy one `<article class="trip">` block into the right year.
2. Update `trip-date`, `trip-coord` (decimal degrees converted to DMS),
   `trip-where`, `trip-title`, and `trip-note`.
3. Put the photos in `assets/travel/`, then point each `<figure>` at them.
4. Keep 6 per album so the grid stays 3 x 2. Add another row of 3 if a trip
   deserves more.

### To add a year

Copy the `<section class="travel-year">` wrapper, change the year number and trip
count, and place it above the previous year.

### Trips with no photos yet

They stay in the file, commented out, with a note saying why. Do **not** nest an
HTML comment inside another one — commenting out a whole year that already
contains commented-out trips terminates the outer comment early and dumps the
markup back onto the page.

---

## Photos

Processed copies live in `assets/travel/`; the full-resolution originals in
`assets/photos/` are git-ignored and never published. Published copies carry no
EXIF. Long edge 1600px, under ~560KB.

---

## Cache busting

`styles.css`, `orb.js`, `section-nav.js`, `lightbox.js`, `form.js`, `pub-filter.js`
and `whats-new.js` are linked with a `?v=YYYYMMDDx` token. **Bump it whenever one
of those files changes**, or returning visitors keep the cached copy.
