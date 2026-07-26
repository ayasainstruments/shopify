# Ayasa Instruments — Shopify theme

Custom Shopify theme for [ayasainstruments.myshopify.com](https://ayasainstruments.myshopify.com), ported from the original static site at [ayasainstruments/website](https://github.com/ayasainstruments/website).

Built on Shopify's [Skeleton theme](https://github.com/Shopify/skeleton-theme) (MIT, see [LICENSE.md](LICENSE.md)).

## Development

Requires [Node.js](https://nodejs.org) and the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) (`npm install -g @shopify/cli`).

```
shopify theme dev --store ayasainstruments.myshopify.com
```

This serves the theme locally at http://127.0.0.1:9292 with hot reload.

## Structure

Standard Shopify theme layout: `layout/`, `templates/`, `sections/`, `blocks/`, `snippets/`, `assets/`, `config/`, `locales/`.

Notable custom pieces (ported from the static site):

- 3D instrument viewer (`assets/pan3d.js`) used on product pages
- Makers page (shell shop for handpan builders)
