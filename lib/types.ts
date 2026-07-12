// Shared catalog types used by lib/catalog.ts (real Etsy data) and
// lib/seed-catalog.ts (fallback data), and consumed across app/ pages.

export type Review = {
  author?: string;
  date?: string;
  rating?: number;
  text?: string;
};

export type Product = {
  /** URL-safe identifier, used for /products/[slug] */
  slug: string;
  /** Original Etsy listing id, if known */
  listingId?: string;
  name: string;
  /** Full original Etsy title (SEO-stuffed); use for <title>/OG meta, never for headings */
  fullTitle?: string;
  /** Numeric price in USD, for sorting/formatting */
  price: number;
  /** Pre-formatted display string, e.g. "$9.95" or "From $10" */
  priceDisplay: string;
  /** True when the listing has multiple priced variations (priceDisplay reads "From $x") */
  hasPriceRange?: boolean;
  shipping?: string;
  /** Short one-line hook shown on cards */
  tagline: string;
  /** Longer description shown on the product detail page */
  description: string;
  /** Bullet-point feature list */
  features: string[];
  images: string[];
  videos: string[];
  tags: string[];
  materials?: string[];
  etsyUrl: string;
  category: string;
  badges: string[];
  favorites?: number;
  reviewCount?: number;
  rating?: number;
  /** Individual reviews with quoted text, newest first, used for real social-proof quotes */
  reviews?: Review[];
  state?: string;
  specs?: { label: string; value: string }[];
  /** Trailing 30-day performance, used to rank Best Sellers by real money-earned */
  views30?: number;
  orders30?: number;
  revenue30?: number;
  favorites30?: number;
};

export type Shop = {
  name: string;
  url: string;
  location: string;
  sales?: number;
  rating?: number;
  reviewCount?: number;
  starSeller?: boolean;
};

export type Catalog = {
  shop: Shop;
  products: Product[];
  source: "live" | "seed";
};
