# MTK Innovations — Mission

**Last updated: 2026-07-09**

## Mission Statement

MTK Innovations turns 3D printing into a self-growing product business. The Etsy shop
(etsy.com/shop/MTKInnovations) stays the checkout counter; **mtk-innovations (this site) is the
storefront we fully control** — richer photos, videos, deeper product detail, custom-print intake,
and a destination for our own advertising. Every product on Etsy is mirrored here; every visitor
here can still buy on Etsy.

On top of the storefront, we run a **trend-hunting engine**: on demand, it scans the 3D-model
ecosystem (MakerWorld, Printables, Thingiverse, …) for what's trending, filters to free models
whose licenses allow selling prints, picks the ten most likely to sell, prices them profitably,
and produces near-complete draft Etsy listings (title, description, tags, images, price) for
Mike to approve. The shop's catalog grows with the market instead of waiting on ideas.

## Pillars

1. **Parallel storefront** — modern, conversion-focused site that mirrors and enriches every Etsy
   listing. Etsy handles payment/fulfillment for now; direct checkout is a future option.
2. **Trend-hunter** — repeatable "collect me the next top ten" function producing draft Etsy
   listings from trending, commercially-licensed free models.
3. **Listing quality** — ongoing audits of existing listings (SEO, photos, pricing, gaps) with
   metrics tracked over time in `data/`.

## Ground rules

- Only sell prints of models whose license **explicitly allows commercial use** (CC-BY, CC0, or
  creator-granted). CC-BY requires attribution in the listing. Never NC-licensed models.
- Trend-hunter output is always a **draft** — Mike approves before anything goes live.
- Site changes are visually verified (clicked through) before being shown to Mike.
- Pricing rule of thumb: material + printer time + Etsy fees (~9.5% + $0.20) + shipping, then
  margin ≥ 50% of cost; round to a .95/.99 price near comparable listings.

## Key facts

- Shop: MTKInnovations, Blackwood NJ, Star Seller, ~4.8★.
- Printers: Prusa MK2.5S; Bambu Lab P2S + AMS (multi-color). PETG primary, PLA available.
- Site: Next.js 16 + Tailwind 4, deploys to Vercel, dev on port 3001.
- Product catalog source of truth: `data/etsy-catalog.json` (scraped from Etsy, drives the site).
- Cross-agent coordination: `.agents/BOARD.md`.
