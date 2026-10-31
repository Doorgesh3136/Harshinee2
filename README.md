# Harshinee Fashion website

Static site: no server code and no build step needed to publish. It works on GitHub Pages as it is.

## Publish on GitHub Pages
1. Upload everything in this folder to the root of the `HarshineeFashion` repository, replacing the old files. Keep the folder structure and the `.nojekyll` file.
2. In the repository, open **Settings → Pages**, set **Source** to *Deploy from a branch* and choose `main`, folder `/ (root)`.
3. The site appears at `https://<username>.github.io/HarshineeFashion/` within a minute or two.

## Pages
The site uses hash links, so every page is `index.html` and links keep working on GitHub Pages:
- `#/` Home
- `#/collection` Collection. Add `?cat=bridal`, `lehenga`, `saree`, `gown`, `groom` or `men` to open it filtered.
- `#/bride-groom` Bride & Groom
- `#/visit` Visit us. Add `?for=bridal` or `?for=groom` to preselect the form.

## Editing products
Open `assets/js/main.js`. The product list (`RAW`) and categories are at the top.
Each product is `[name, category, price, main photo, second photo, tag]`. The photos are Unsplash photo IDs.
To use the shop's own photos, put them in an `assets/img/` folder and change the `IMG` helper to point at them.

## Files
| File | What it does |
|---|---|
| `index.html` | All four pages, the loader and the page transitions |
| `assets/css/style.css` | Custom styles, transitions and mobile layout |
| `assets/css/tailwind.css` | Pre-built Tailwind utilities |
| `assets/js/main.js` | Products, page switching, animations, bag, WhatsApp ordering |
| `assets/js/silk.js` | The 3D silk cloth (Three.js) |
| `assets/vendor/` | Local copies of GSAP, ScrollTrigger, Lenis and Three.js, so the site doesn't depend on outside CDNs |
| `404.html` | Sends broken links back to the home page |

## If you add new Tailwind classes
`tailwind.css` only contains the classes already used. After adding new ones, rebuild it (needs Node.js):

```
npx tailwindcss@3.4.17 -c tailwind.config.js -i assets/css/tailwind.src.css -o assets/css/tailwind.css --minify
```
