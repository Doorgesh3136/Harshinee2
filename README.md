# Harshinee: Saree House

A multi-page saree shop built from the **Maison Vell** runway lookbook and re-themed for Indian sarees.
It is a static site with no build step, and it works on GitHub Pages as it is.

## Pages
| Page | What it is |
|---|---|
| `index.html` | **Runway.** The original Maison Vell runway: six saree looks stand in arches that go back into the distance. Drag, scroll, use the arrow keys or tap the arrows to bring the next look forward. The rail shows the saree and jewellery in each look. |
| `lookbook.html` | Wedding Season 2027. Each look has its story, its pieces and an "Add the look" button. |
| `shop.html` | Every saree and jewellery piece, with filters (Banarasi, Kanjeevaram, organza, handloom, bridal…), search and sort. Links like `shop.html?f=bridal` or `shop.html?q=red` open it already filtered. |
| `product.html?id=…` | One saree: photos, blouse choice, quantity, add to bag, ask on WhatsApp, and pieces to wear with it. |
| `house.html` | The House: the shop's story, three weaving traditions, four ways to drape and how to care for a saree. |
| `visit.html` | The two boutiques and an appointment form that opens WhatsApp with the message ready to send. |
| `bag.html` | Bag and saved pieces. "Order on WhatsApp" sends the full order to the shop. Nothing is charged online. |
| `404.html` | Shown for broken links. |

The bag and saved pieces are kept in each visitor's browser.

## Editing
Everything about the products is in **`assets/js/data.js`**:
- `HS.SHOP` holds the WhatsApp number, phone numbers, boutiques and social links.
- `HS.PRODUCTS` lists every saree and jewellery piece: id, name, kind, fabric, occasion, price (Rs), photo, second photo, tag and description.
- `HS.LOOKS` lists the six runway looks, each with its photo and the two pieces worn in it.

Photos are Unsplash photo IDs. To use the shop's own photos, put them in `assets/img/` and change `HS.IMG` in `data.js` to return `'assets/img/' + id`.

## Files
| File | What it does |
|---|---|
| `assets/css/site.css` | Shared styles: header, menu, product cards and every content page |
| `assets/js/site.js` | Bag, saved pieces, search, mobile menu and the logic for each page |
| `assets/js/runway.js` | The runway on the home page |

The header, menu and footer are written into each page. If you change one, change the others to match.

## Publish on GitHub Pages
This version is on the `saree-house` branch. In the repository, open **Settings → Pages**, set **Source** to *Deploy from a branch*, and choose `saree-house`, folder `/ (root)`.
