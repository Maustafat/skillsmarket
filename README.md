# Skills Marketplace — Split Files

## File Structure

| File | Size | Purpose |
|------|------|---------|
| `index.html` | ~350B | Shell — links CSS, data, and app together |
| `styles.css` | ~67KB | All Tailwind CSS + custom styles |
| `data.js` | ~30KB | **Skills content, users, app state** (human-readable JSON) |
| `app.js` | ~433KB | React runtime + all components (minified) |

## How to Edit with Claude

**To change skill content** (names, descriptions, prices, tags, etc.):
→ Upload only `data.js` — it's 30KB and fully formatted/readable

**To change styles** (colors, spacing, fonts):
→ Upload only `styles.css`

**To change the page structure or shell**:
→ Upload only `index.html`

**For component/behavior changes**:
→ Describe what you want — Claude can work on `app.js` using tools without uploading it

## How to Run Locally

These files must be served from a web server (not opened as local files) because `app.js` uses `type="module"`.

```bash
# Option 1: Python
cd skillmarket-split
python3 -m http.server 8000
# Open http://localhost:8000

# Option 2: Node
npx serve .

# Option 3: VS Code Live Server extension
```

## Deploying to Netlify

Upload the entire `skillmarket-split` folder to Netlify (drag & drop or CLI).
All four files must be in the same directory.
