# Harshinee: Saree House

A multi-page saree shop built from the **Maison Vell** runway lookbook and re-themed for Indian sarees.
It is a static site with no build step, and it works on GitHub Pages as it is.

## Pages
| Page | What it is |
|---|---|
| `index.html` | **Runway.** The original Maison Vell runway: six saree looks (photos from the main-branch site) stand in arches that go back into the distance. Drag, scroll, use the arrow keys or tap the arrows to bring the next look forward. The rail shows two pieces for each look. |
| `lookbook.html` | Wedding Season 2027. Each look has its story, its pieces and an "Add the look" button. |
| `shop.html` | All 40 pieces from the main-branch site (sarees first, then bridal and party lehengas, anarkalis, sherwanis and kurtas), with filters, search and sort. Links like `shop.html?f=saree` or `shop.html?q=banarasi` open it already filtered. |
| `product.html?id=…` | One saree: photos, blouse choice, quantity, add to bag, ask on WhatsApp, and pieces to wear with it. |
| `house.html` | The House: the shop's story, three weaving traditions, four ways to drape and how to care for a saree. |
| `visit.html` | The two boutiques and an appointment form that opens WhatsApp with the message ready to send. |
| `bag.html` | Bag and saved pieces. "Order on WhatsApp" sends the full order to the shop. Nothing is charged online. |
| `404.html` | Shown for broken links. |

The bag and saved pieces are kept in each visitor's browser.

## Editing
Everything about the products is in **`assets/js/data.js`**:
- `HS.SHOP` holds the shop name and WhatsApp number.
- `HS.PRODUCTS` lists every piece: id, name, kind, category, occasion, price (Rs), photo, second photo, tag and description. The names, prices and photos are the ones from the main-branch site.
- `HS.LOOKS` lists the six runway looks, each with its photo and the two pieces worn in it.

Photos are Unsplash photo IDs, the same ones the main-branch site uses. To use the shop's own photos, put them in `assets/img/` and change `HS.IMG` in `data.js` to return `'assets/img/' + id`.

## Cut-out photos
The models on the runway, and most product photos, have their backgrounds removed so they stand on the page like the Maison Vell originals.
These cut-outs live in `assets/img/cut/` and are made by a GitHub Action (`.github/workflows/cutouts.yml`):
1. Add the Unsplash photo ID to `tools/cutouts/photos.txt` and push to the `saree-house` branch.
2. The action downloads the photo, removes the background and commits `assets/img/cut/<id>.webp`, with contact sheets in `tools/cutouts/out/` to check the result.
3. Add the ID to `assets/js/cut.js` (copy its `w` and `h` from `tools/cutouts/manifest.json`) to use the cut-out on the site.

## Files
| File | What it does |
|---|---|
| `assets/css/site.css` | Shared styles: header, menu, product cards and every content page |
| `assets/js/site.js` | Bag, saved pieces, search, mobile menu and the logic for each page |
| `assets/js/runway.js` | The runway on the home page |
| `assets/js/cut.js` | The list of approved cut-outs |

The header, menu and footer are written into each page. If you change one, change the others to match.

## Publish on GitHub Pages
This version is on the `saree-house` branch. In the repository, open **Settings → Pages**, set **Source** to *Deploy from a branch*, and choose `saree-house`, folder `/ (root)`.
