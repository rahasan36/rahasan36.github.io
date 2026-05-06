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

## Deploying

This is a vanilla static site. Drop these files in any GitHub Pages
repo (or any host: Netlify, Vercel, Cloudflare Pages) and the site
works.

## License / credits

Fonts: Fraunces, Source Serif 4, JetBrains Mono — all open licenses
via Google Fonts.
