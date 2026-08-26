# rakibulahasan.com

Personal site for **Rakibul Ahasan, PhD** — geographer, GIS professional, Product
Engineer at Esri.

Static HTML. No build step, no dependencies, no framework. Edit a file, push, done.

**Live:** <https://www.rakibulahasan.com> · **Host:** GitHub Pages · **Registrar:** Squarespace (DNS only)

> Editing content — adding a publication, a trip, a research figure — is covered in
> **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)**. This file is the technical overview.

---

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: announcements, professional summary, about, research themes, selected work, press, contact form |
| `about.html` | Long-form biography, organised by chapter |
| `research.html` | Seven research themes, each with figures |
| `publications.html` | Full publication list, filterable by theme and status |
| `cv.html` | Curriculum vitae, fourteen sections |
| `travel.html` | Travel diaries by year, with photo albums |
| `contact.html` | Contact details, research interests, contact form |
| `404.html` | Not-found page (served automatically by GitHub Pages) |

## Supporting files

| File | Purpose |
| --- | --- |
| `styles.css` | The entire stylesheet. Design tokens, components, responsive rules |
| `orb.js` | Cursor-following background gradient |
| `section-nav.js` | Right-hand section rail (scrollspy) and the mobile burger menu |
| `lightbox.js` | Click-to-enlarge for research figures and travel photos |
| `form.js` | Contact form: background submit plus confirmation toast |
| `pub-filter.js` | Theme × status filtering on the publications page |
| `whats-new.js` | Announcement carousel on the home page |
| `sitemap.xml`, `robots.txt` | Search engine discovery |
| `CNAME` | Tells GitHub Pages which domain to serve |
| `favicon.svg` | Site icon |

## Assets

```
assets/
  hooding.jpg          Hero and page-header background
  share-card.jpg       1200x630 social preview image
  research/            Figures on the research page (29 files)
  travel/              Processed trip photos (59 files)
  photos/              Full-resolution originals — GIT-IGNORED, never published
```

---

## Things worth knowing before editing

**Every page is standalone.** There is no templating. Changing the navigation,
the header, or the footer means editing all eight HTML files. That is the price of
having no build step; the payoff is that nothing can break the build.

**Bump the cache token when you touch CSS or JS.** Every stylesheet and script is
linked with `?v=YYYYMMDDx`. Returning visitors keep the cached copy until that token
changes, so a CSS edit without a bump is invisible to anyone who has already visited.

```
styles.css?v=20260825g
```

**The Content Security Policy is strict.** Each page carries a `<meta http-equiv="Content-Security-Policy">`
allowing scripts and styles only from this origin, plus Google Fonts, Formspree,
and Umami. There are **no inline scripts and no inline `style=` attributes** anywhere,
deliberately — adding one will be silently blocked by the browser. Use a class in
`styles.css` instead, and add any new third-party origin to the policy on all pages.

**Do not use regular expressions across these files without stripping HTML comments
first.** Several pages contain commented-out content (hidden travel trips, hidden CV
entries) whose markup looks real to a pattern match. This has caused actual damage.

**Unpublished work names no journal.** Manuscripts in preparation, in revision, or
under review show status and year only — no venue, no target. In-prep entries list
the first author plus `et al.` so authorship can change without edits.

---

## Design system

Defined as CSS custom properties at the top of `styles.css`.

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` / `--bg-2` / `--bg-3` | `#1F2A22` → `#2C3D32` | Backgrounds, raised surfaces |
| `--cream` / `--cream-soft` / `--cream-mute` | `#F2EBDA` → `#9C9684` | Text, in descending emphasis |
| `--accent` | `#E89B5C` | Links, highlights, active states |
| `--moss` / `--coral` | `#6B8E6F` / `#F26B47` | Success and alert states |
| `--display` | Instrument Serif | Headings, the hero name, italic accents |
| `--body` | Bricolage Grotesque | All body text |
| `--mono` | JetBrains Mono | Labels, buttons, captions, metadata |

Fonts load from Google Fonts. Breakpoints: `980px` (layout collapses, burger menu
appears) and `620px` (single column).

---

## Third-party services

| Service | Purpose | Configuration |
| --- | --- | --- |
| **Formspree** | Contact form delivery | Endpoint in the `action` of both forms |
| **Umami Cloud** | Analytics — cookieless, no consent banner needed | Beacon in every `<head>` |
| **Google Search Console** | Indexing and search performance | Verified by DNS TXT record |
| **Google Fonts** | Typefaces | Linked in every `<head>` |

The contact form works without JavaScript: `form.js` intercepts the submit for a
smoother experience, but the plain `POST` fallback is intact.

---

## Deploying

Push to `main`. GitHub Pages rebuilds automatically, usually within a minute.

DNS lives at Squarespace but points here — **four apex `A` records to GitHub Pages
(`185.199.108–111.153`) and a `www` `CNAME` to `rahasan36.github.io`.** Squarespace
periodically warns that the domain "has a problem" and offers to apply its own DNS
preset. **Ignore it.** Accepting would repoint the domain at Squarespace and take the
site offline.

---

## Credits

Type: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif),
[Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque),
[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — all open licences
via Google Fonts.

Site content © Rakibul Ahasan. Figures reproduced from published papers remain under
their original licences.
