# Product import guide

One-time migration of the catalogue from shop.ayasainstruments.com (scraped 2026-07-26).

## 0. First: three products already exist in the store

The store already contains **Ayasa D Kurd 10 – Ember Steel** (€2.500),
**Ayasa D Kurd 12 – Ember Steel** (€3.000) and an **Evatek 2.0 HCT Black**
placeholder (€0, sold out) — presumably earlier manual tests.

- The €0 Evatek Black **must be deleted or fixed before importing** — its handle
  clashes with the imported one, and with default import settings the broken €0
  version would win and appear in the case picker.
- The two D Kurds would end up **duplicated** next to the imported
  `d-kurd-12-ember-steel` (the old shop has no D Kurd 10 at all — if it's a real
  new product, keep it and add the tags from the "What the tags mean" section).

Cleanest path if they were just tests: delete all three, then import.

## 1. Import the products (2 minutes)

1. Shopify admin → **Products** → **Import**.
2. Choose `products.csv` from this folder.
3. Leave both checkboxes off, click **Import** and confirm the preview.

Shopify downloads all product photos from the current shop's public URLs during
import — this can take a few minutes after the import finishes.

## 2. Create three automated collections (3 minutes)

Admin → **Products → Collections → Create collection**, then for each:

| Title | Handle (in "Edit website SEO") | Condition (automated) |
|---|---|---|
| Instruments | `instruments` | Product tag equals `instrument` |
| Accessories | `accessories` | Product tag equals `accessory` |
| Cases | `cases` | Product tag equals `case-option` |

The **Cases** collection feeds the case picker on instrument pages — don't add
it to any menu. Set it to "hidden" from search if you like (Search & Discovery).

## 3. Check inventory numbers

The CSV uses safe placeholder stock levels — please correct them in the admin:

- Instruments "directly available": imported as **1 in stock**.
- Accessories: imported as **10 in stock** (guess).
- Made-to-order instruments (tag `ships:YYYY-MM-DD`): imported as **0 in stock,
  overselling allowed** so they're purchasable as pre-orders. The theme shows
  "Ships on …" from the tag — update the tag when a date changes.
- HCT Cargo Hardcase: 0 in stock, oversell allowed (ships 10-10-2026).

## What the tags mean

- `instrument` / `accessory` — drives the two collections.
- `case-option` — product appears in the case picker on instrument pages.
- `ships:YYYY-MM-DD` — shown as the "Ships on" availability date; product is
  treated as a pre-order.
- `free-tshirt` — instrument page shows the free t-shirt size/color choice.

## Not imported (by design)

- The free t-shirt is not a product — the choice is stored on the order as
  line-item properties.
- The A.J.P. Signature Evatek had no page of its own on the old shop, so it has
  **no photo** — add one in the admin (it's in the CSV as
  `evatek-2-0-hct-a-j-p-signature`, tagged `case-option` only).
- Wishlists (needs an app, if wanted later) and customer accounts (native
  Shopify — enable in Settings → Customer accounts).
