// Loads the product catalog for the storefront.
//
// Source of truth is data/etsy-catalog.json, produced by a separate scraping
// agent. That file may not exist yet (or may be empty) — in that case we fall
// back to the known-good seed data in lib/seed-catalog.ts so the site always
// renders something real. This module is server-only (reads from disk) and
// must not be imported from a "use client" file.

import fs from "node:fs";
import path from "node:path";
import type { Catalog, Product, Review, Shop } from "./types";
import { seedProducts, seedShop } from "./seed-catalog";

const CATALOG_PATH = path.join(process.cwd(), "data", "etsy-catalog.json");

type RawReview = { author?: string; date?: string; rating?: number; text?: string; [key: string]: unknown };

type RawListing = {
  listing_id?: string | number;
  url?: string;
  title?: string;
  price_usd?: number | string;
  price_range_usd?: [number, number];
  shipping_usd?: number | string;
  shipping?: string;
  materials?: string[];
  description?: string;
  tags?: string[];
  images?: string[];
  videos?: string[];
  has_video?: boolean;
  favorites?: number;
  reviews_count?: number;
  reviews_rating?: number | null;
  reviews?: RawReview[];
  stats?: { rating?: number; review_count?: number; [key: string]: unknown };
  stats_30d?: { views?: number; orders?: number; revenue_usd?: number; favorites_30d?: number };
  state?: string;
};

type RawCatalog = {
  scraped_at?: string;
  shop?: {
    name?: string;
    url?: string;
    location?: string;
    sales?: number;
    rating?: number;
    review_count?: number;
    star_seller?: boolean;
  };
  listings?: RawListing[];
};

const CATEGORY_RULES: { category: string; keywords: string[] }[] = [
  { category: "Game Accessories", keywords: ["hive", "board game", "chess", "game", "tabletop", "jenga", "token", "tile"] },
  { category: "Home & Mail", keywords: ["mailbox", "mail flag", "flag", "home organization", "label", "cabinet", "hinge"] },
  { category: "Pool Parts", keywords: ["pool", "spa", "valve"] },
  { category: "Digital Files", keywords: ["stl", "digital download", "digital file", "obj file", "3mf"] },
  { category: "Custom Work", keywords: ["custom", "personalized", "bespoke", "made to order", "commission"] },
];

// Hand-curated categories for the live Etsy catalog. Keyword matching against real
// Etsy titles/tags misfires too often ("spa" inside "spacer" → Pool Parts), so known
// listings are pinned by slug and the heuristic only handles listings added later.
const CATEGORY_OVERRIDES: Record<string, string> = {
  "connect-hive-game-board": "Games & Coins",
  "aggravation-rummy-card-game": "Games & Coins",
  "sports-team-challenge-coins": "Games & Coins",
  "outgoing-mail-flag-for-mailbox": "Mail & Porch",
  "minimalist-outgoing-mail-magnetic-mailbox-triangle-flag": "Mail & Porch",
  "outgoing-package-sign-magnet": "Mail & Porch",
  "thank-you-mail-carrier-magnet": "Mail & Porch",
  "personalized-mailbox-name-plate": "Mail & Porch",
  "soda-can-lid": "Home & Organization",
  "dog-bone-poop-bag-holder": "Home & Organization",
  "custom-cable-charger-name-plate": "Home & Organization",
  "light-switch-lock-pack": "Home & Organization",
  "ultra-usb-holder": "Home & Organization",
  "photo-booth-picture-holder": "Home & Organization",
  "floating-picture-frame-magnet": "Home & Organization",
  "sewing-fabric-tape-measure-holder": "Home & Organization",
  "craftsman-hole-saw-kit-holder": "Home & Organization",
  "firefly-coin-cell-battery-led-flashlight": "Home & Organization",
  "pool-valve-knob-replacement": "Replacement Parts",
  "custom-trampoline-pole-spacer-4-pack": "Replacement Parts",
  "galileo-telescope-lens-caps": "Replacement Parts",
  "wide-vacuum-nozzle-adapter-with-agitator": "Replacement Parts",
  "cyborgs-halloween-sign": "Seasonal",
  "halloween-door-corner-decoration": "Seasonal",
  "3d-custom-digital-designs": "Digital & Custom",
  "3d-custom-designs": "Digital & Custom",
  "insanity-max-30-fitness-tracker-excel-spreadsheet": "Digital & Custom",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "product";
}

/**
 * Etsy titles are SEO-stuffed ("Connect Hive Game Board - 3D Printed Grid for … | Sturdy, …").
 * For on-site display, keep only the first segment before a " - ", " | ", " – " or "," separator,
 * so headings read like product names. The full title is preserved separately for meta tags.
 */
function displayName(title: string): string {
  const cut = title.split(/\s+[|–—]\s+|\s+-\s+|,\s/)[0].trim();
  return cut.length >= 8 ? cut : title;
}

function categorize(title: string, tags: string[]): string {
  const haystack = `${title} ${tags.join(" ")}`.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) return rule.category;
  }
  return "Shop";
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2).replace(/\.00$/, "")}`;
}

function formatShipping(shippingUsd: number | string | undefined): string | undefined {
  if (shippingUsd === undefined || shippingUsd === null) return undefined;
  const n = typeof shippingUsd === "number" ? shippingUsd : parseFloat(String(shippingUsd));
  if (!Number.isFinite(n)) return undefined;
  if (n <= 0) return "Free shipping";
  return `+ ${formatPrice(n)} shipping`;
}

function firstSentence(text: string, maxLen = 140): string {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  const match = cleaned.match(/^[^.!?]*[.!?]/);
  const sentence = match ? match[0] : cleaned;
  return sentence.length > maxLen ? `${sentence.slice(0, maxLen - 1).trim()}…` : sentence;
}

function extractFeatures(description: string): string[] {
  if (!description) return [];
  return description
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-•*]\s+/.test(line))
    .map((line) => line.replace(/^[-•*]\s+/, ""))
    .slice(0, 6);
}

function averageRating(reviews: RawReview[] | undefined): number | undefined {
  if (!reviews || reviews.length === 0) return undefined;
  const rated = reviews.filter((r) => typeof r.rating === "number") as { rating: number }[];
  if (rated.length === 0) return undefined;
  const sum = rated.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / rated.length) * 10) / 10;
}

function normalizeListing(listing: RawListing, index: number, usedSlugs: Set<string>): Product | null {
  const title = listing.title?.trim();
  if (!title) return null;

  const price =
    typeof listing.price_usd === "number"
      ? listing.price_usd
      : parseFloat(String(listing.price_usd ?? "0")) || 0;

  const range = listing.price_range_usd;
  const hasPriceRange = Array.isArray(range) && range.length === 2 && range[1] > range[0];

  const tags = listing.tags ?? [];
  const description = listing.description ?? "";

  let slug = slugify(displayName(title));
  if (usedSlugs.has(slug)) {
    slug = `${slug}-${listing.listing_id ?? index}`;
  }
  usedSlugs.add(slug);

  const rating = listing.stats?.rating ?? listing.reviews_rating ?? averageRating(listing.reviews) ?? undefined;
  const reviewCount = listing.stats?.review_count ?? listing.reviews_count ?? listing.reviews?.length;
  const favorites = listing.favorites;

  const revenue30 = listing.stats_30d?.revenue_usd;
  const orders30 = listing.stats_30d?.orders;
  const views30 = listing.stats_30d?.views;
  const favorites30 = listing.stats_30d?.favorites_30d;

  const reviews: Review[] = (listing.reviews ?? [])
    .filter((r) => typeof r.text === "string" && r.text.trim().length > 0)
    .map((r) => ({ author: r.author, date: r.date, rating: r.rating, text: r.text!.trim() }));

  const badges: string[] = [];
  if (typeof favorites === "number" && favorites >= 100) badges.push("Best Seller");
  if (typeof orders30 === "number" && orders30 >= 5) badges.push("Trending");
  if (listing.state && listing.state !== "active") badges.push(listing.state);

  return {
    slug,
    listingId: listing.listing_id !== undefined ? String(listing.listing_id) : undefined,
    name: displayName(title),
    fullTitle: title,
    price: hasPriceRange && range ? range[0] : price,
    priceDisplay: hasPriceRange && range ? `From ${formatPrice(range[0])}` : formatPrice(price),
    hasPriceRange,
    shipping: formatShipping(listing.shipping_usd) ?? listing.shipping,
    tagline: firstSentence(description) || title,
    description: description || title,
    features: extractFeatures(description),
    images: listing.images ?? [],
    videos: listing.videos ?? [],
    tags,
    materials: listing.materials,
    etsyUrl: listing.url ?? "https://www.etsy.com/shop/MTKInnovations",
    category: CATEGORY_OVERRIDES[slug] ?? categorize(title, tags),
    badges,
    favorites,
    reviewCount,
    rating,
    reviews,
    state: listing.state,
    views30,
    orders30,
    revenue30,
    favorites30,
  };
}

function loadRawCatalog(): RawCatalog | null {
  try {
    if (!fs.existsSync(CATALOG_PATH)) return null;
    const raw = fs.readFileSync(CATALOG_PATH, "utf-8");
    if (!raw.trim()) return null;
    return JSON.parse(raw) as RawCatalog;
  } catch (error) {
    console.warn("[lib/catalog] Failed to read data/etsy-catalog.json, using seed data:", error);
    return null;
  }
}

let cached: Catalog | null = null;

export function getCatalog(): Catalog {
  if (cached) return cached;

  const raw = loadRawCatalog();
  if (raw?.listings && raw.listings.length > 0) {
    const usedSlugs = new Set<string>();
    const products = raw.listings
      .map((listing, i) => normalizeListing(listing, i, usedSlugs))
      .filter((p): p is Product => p !== null)
      .filter((p) => !p.state || p.state === "active");

    if (products.length > 0) {
      const shop: Shop = {
        name: raw.shop?.name ?? seedShop.name,
        url: raw.shop?.url ?? seedShop.url,
        location: raw.shop?.location ?? seedShop.location,
        sales: raw.shop?.sales,
        rating: raw.shop?.rating ?? seedShop.rating,
        reviewCount: raw.shop?.review_count,
        starSeller: raw.shop?.star_seller ?? seedShop.starSeller,
      };
      cached = { shop, products, source: "live" };
      return cached;
    }
  }

  cached = { shop: seedShop, products: seedProducts, source: "seed" };
  return cached;
}

export function getShop(): Shop {
  return getCatalog().shop;
}

export function getProducts(): Product[] {
  return getCatalog().products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const set = new Set(getProducts().map((p) => p.category));
  return ["All", ...Array.from(set)];
}

/** Best seller / hero product: highest favorites, else first badged "Best Seller", else first product. */
export function getFeaturedProduct(): Product {
  const products = getProducts();
  const byFavorites = [...products].sort((a, b) => (b.favorites ?? 0) - (a.favorites ?? 0));
  return byFavorites[0] ?? products[0];
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  const products = getProducts().filter((p) => p.slug !== slug);
  if (!current) return products.slice(0, limit);
  const sameCategory = products.filter((p) => p.category === current.category);
  const rest = products.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/**
 * Money-makers first: ranked by trailing-30-day revenue, then favorites as a tiebreaker
 * (and for products too new to have 30-day revenue yet). This is the real "Best Sellers"
 * ranking — not just whatever has the most favorites.
 */
export function getBestSellers(limit = 6): Product[] {
  const products = getProducts();
  return [...products]
    .sort((a, b) => {
      const revDiff = (b.revenue30 ?? 0) - (a.revenue30 ?? 0);
      if (revDiff !== 0) return revDiff;
      return (b.favorites ?? 0) - (a.favorites ?? 0);
    })
    .slice(0, limit);
}

/** Real customer review quotes pulled from the catalog, favoring higher ratings and longer text. */
export function getReviewQuotes(limit = 6): { product: Product; review: Review }[] {
  const products = getProducts();
  const all: { product: Product; review: Review }[] = [];
  for (const product of products) {
    for (const review of product.reviews ?? []) {
      if (!review.text || review.text.length < 20) continue;
      all.push({ product, review });
    }
  }
  all.sort((a, b) => {
    const ratingDiff = (b.review.rating ?? 0) - (a.review.rating ?? 0);
    if (ratingDiff !== 0) return ratingDiff;
    return (b.review.text?.length ?? 0) - (a.review.text?.length ?? 0);
  });
  return all.slice(0, limit);
}
