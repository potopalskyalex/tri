# Tryzub Catalog

Static Ukrainian trident catalog. The public site is made of plain HTML, CSS, JS, and JSON data, so it can be hosted on a simple FTP server.

## Structure

- `index.html` - full catalog page.
- `categories/` - generated category pages.
- `tridents/` - generated detail pages for each trident.
- `data/` - canonical catalog and category data.
- `css/` - shared visual styles.
- `js/` - shared page behavior.
- `scripts/` - local quality checks and future build tooling.

## Checks

Run before deploying or editing generated pages:

```bash
npm test
```

The validator checks local links, expected page counts, category references, and basic page structure.

## Notes

The current HTML pages are static output. For larger content changes, keep `data/tridents.json` and `data/categories.json` in sync with the generated pages. The next structural step would be a small build script that regenerates `index.html`, `categories/`, and `tridents/` from the JSON data.
