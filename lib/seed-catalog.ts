// Fallback catalog used when data/etsy-catalog.json is missing or empty.
// Mirrors the real MTK Innovations Etsy shop as of the last manual check.
// lib/catalog.ts prefers the live scraped JSON over this file whenever it exists.

import type { Product, Shop } from "./types";

export const seedShop: Shop = {
  name: "MTKInnovations",
  url: "https://www.etsy.com/shop/MTKInnovations",
  location: "Blackwood, NJ",
  rating: 4.8,
  starSeller: true,
};

export const seedProducts: Product[] = [
  {
    slug: "hive-game-board",
    listingId: "1614563050",
    name: "Hive Game Board",
    price: 9.95,
    priceDisplay: "$9.95",
    shipping: "+ shipping",
    tagline: "The grid frame that keeps every Hive tile locked in place.",
    description:
      "A precision-printed grid frame sized for standard Hive tokens (~50mm hex tiles). " +
      "Drop your pieces in and they stay put through the whole match — no more scattered bugs " +
      "sliding across the table or getting knocked out of position. Ships fully assembled and " +
      "ready to play out of the box. Printed in durable PETG so it holds its shape game after game.",
    features: [
      "Holds all standard Hive tiles securely",
      "No more sliding or scattered pieces",
      "Printed in durable PETG",
      "Ships assembled, ready to play",
    ],
    images: [],
    videos: [],
    tags: ["hive", "board game", "game accessory", "tabletop", "grid frame"],
    etsyUrl: "https://www.etsy.com/listing/1614563050",
    category: "Game Accessories",
    badges: ["Best Seller"],
    favorites: 225,
    rating: 4.8,
    specs: [
      { label: "Material", value: "PETG" },
      { label: "Fit", value: "Standard Hive tiles (~50mm hex)" },
      { label: "Assembly", value: "Ships fully assembled" },
      { label: "Turnaround", value: "~48 hours" },
    ],
  },
  {
    slug: "magnetic-mailbox-flag",
    listingId: "1230849913",
    name: "Magnetic Mailbox Outgoing Mail Flag",
    price: 6.99,
    priceDisplay: "$6.99",
    shipping: "+ shipping",
    tagline: "The mail flag that actually stays put.",
    description:
      "A magnetic outgoing-mail flag for townhouse and jumbo mailboxes — no screws, no adhesives, " +
      "no drilling into your mailbox. It clips on magnetically and survives wind, rain, and daily " +
      "use without sliding off. Printed in durable, outdoor-friendly PETG so it holds up through " +
      "every season.",
    features: [
      "No screws or adhesives — clips on magnetically",
      "Stands up to wind, rain, and daily use",
      "Fits most standard townhouse / jumbo mailboxes",
      "Printed in weather-resistant PETG",
    ],
    images: [],
    videos: [],
    tags: ["mailbox flag", "magnetic", "outgoing mail", "townhouse mailbox", "home"],
    etsyUrl: "https://www.etsy.com/listing/1230849913",
    category: "Home & Mail",
    badges: ["Top Seller"],
    favorites: 141,
    rating: 4.8,
    specs: [
      { label: "Material", value: "PETG (weatherproof)" },
      { label: "Mount", value: "Magnetic, no hardware" },
      { label: "Fits", value: "Most standard townhouse / jumbo mailboxes" },
    ],
  },
  {
    slug: "pool-valve-knob",
    name: "Pool Valve Replacement Knob",
    price: 12,
    priceDisplay: "From $12",
    shipping: "+ shipping",
    tagline: "The discontinued part you can't find anywhere else.",
    description:
      "A 3D printed replacement for standard pool and spa valve handles — built for the exact " +
      "moment you discover the original part was discontinued years ago. Printed in PETG so it " +
      "stands up to pool chemicals and sun exposure. Send a photo or measurements of your existing " +
      "valve and we'll confirm fit before anything gets printed.",
    features: [
      "Fits standard pool/spa valve stems",
      "PETG construction resists chemicals and UV",
      "Fit confirmed from your photo or measurements before printing",
      "Replaces knobs that hardware stores no longer stock",
    ],
    images: [],
    videos: [],
    tags: ["pool valve", "spa valve", "replacement part", "pool parts", "knob"],
    etsyUrl: "https://www.etsy.com/shop/MTKInnovations",
    category: "Pool Parts",
    badges: ["Replacement Part"],
    specs: [
      { label: "Material", value: "PETG (chemical + UV resistant)" },
      { label: "Fit", value: "Confirmed from your photo/measurements" },
    ],
  },
  {
    slug: "custom-3d-print",
    name: "Custom 3D Print Service",
    price: 10,
    priceDisplay: "From $10",
    shipping: "based on complexity",
    tagline: "You describe it. We print it.",
    description:
      "Send a photo, sketch, or plain-text description of what you need and we'll tell you if " +
      "it's printable, quote you, and get it made. Great for replacement parts, personalized " +
      "gifts, event favors, or one-off ideas that don't exist anywhere else. Most jobs ship " +
      "within 48 hours of approval, and every request is reviewed by hand before we start printing.",
    features: [
      "Works from a photo, sketch, or description",
      "Most jobs ship within 48 hours",
      "PETG, PLA, or multi-color AMS printing",
      "Quoted before anything is printed",
    ],
    images: [],
    videos: [],
    tags: ["custom print", "replacement part", "personalized gift", "3d printing service"],
    etsyUrl: "https://www.etsy.com/shop/MTKInnovations",
    category: "Custom Work",
    badges: ["Custom Work"],
    specs: [
      { label: "Materials", value: "PETG, PLA, multi-color AMS" },
      { label: "Turnaround", value: "Most jobs ship in ~48 hours" },
    ],
  },
  {
    slug: "personalized-stl-files",
    name: "Personalized 3D Model Files (STL)",
    price: 5,
    priceDisplay: "From $5",
    shipping: "instant download",
    tagline: "Instant download. Print it yourself.",
    description:
      "Digital STL/OBJ files delivered instantly after purchase, personalized with your text or " +
      "names. Print unlimited copies on your own printer — no waiting on shipping. A good fit for " +
      "makers who already own a printer and want a ready-to-slice file instead of a physical part.",
    features: [
      "Instant delivery after purchase",
      "STL + OBJ formats included",
      "Personalized with your text or names",
      "Print unlimited copies yourself",
    ],
    images: [],
    videos: [],
    tags: ["stl file", "digital download", "3d model", "personalized"],
    etsyUrl: "https://www.etsy.com/shop/MTKInnovations",
    category: "Digital Files",
    badges: ["Digital Download"],
    specs: [
      { label: "Formats", value: "STL, OBJ" },
      { label: "Delivery", value: "Instant digital download" },
    ],
  },
];
