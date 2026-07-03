"use client";

import { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";
const HIVE_BOARD_URL = "https://www.etsy.com/listing/1614563050";
const MAILBOX_FLAG_URL = "https://www.etsy.com/listing/1230849913";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Category = "All" | "Game Accessories" | "Home & Mail" | "Pool Parts" | "Custom Work" | "Digital Files";
const CATEGORIES: Category[] = ["All", "Game Accessories", "Home & Mail", "Pool Parts", "Custom Work", "Digital Files"];

// ─── Product data ──────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "mailbox-flag",
    name: "Outgoing Mail Flag",
    category: "Home & Mail" as Category,
    tag: "Top Seller",
    tagline: "The mail flag that actually stays put.",
    desc: "Magnetic townhouse mailbox flag — no screws, no adhesives. Clips on and survives wind, rain, and everyday use. Printed in durable PETG.",
    price: "$6.99",
    priceSub: "+ shipping",
    reviews: "141+ favorites",
    rating: "4.8★",
    cta: "Buy on Etsy →",
    url: MAILBOX_FLAG_URL,
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
        <rect x="6" y="8" width="4" height="32" rx="2" fill="var(--border-strong)" />
        <path d="M10 10 L38 18 L10 26 Z" fill="var(--gold)" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: "pool-valve-knob",
    name: "Pool Valve Knob",
    category: "Pool Parts" as Category,
    tag: "Replacement Part",
    tagline: "The discontinued part you can't find anywhere else.",
    desc: "3D printed replacement for standard pool/spa valve handles. PETG stands up to chemicals and sun. Send a photo or measurements and we'll confirm fit.",
    price: "From $12",
    priceSub: "+ shipping",
    cta: "Request on Etsy →",
    url: ETSY_URL,
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
        <circle cx="24" cy="24" r="14" stroke="var(--gold)" strokeWidth="2.5" fill="var(--gold-subtle)" />
        <circle cx="24" cy="24" r="5" fill="var(--gold)" opacity="0.7" />
        <line x1="24" y1="10" x2="24" y2="38" stroke="var(--gold)" strokeWidth="2" opacity="0.4" />
        <line x1="10" y1="24" x2="38" y2="24" stroke="var(--gold)" strokeWidth="2" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "custom-print",
    name: "Custom 3D Print",
    category: "Custom Work" as Category,
    tag: "Custom Work",
    tagline: "You describe it. We print it.",
    desc: "Send a photo, sketch, or description. We design it, print it, and ship it. Replacement parts, personalized gifts, custom favors.",
    price: "From $10",
    priceSub: "based on complexity",
    features: ["Photo, sketch, or description", "Most jobs ship within 48 hrs", "PETG, PLA, or multi-color AMS"],
    cta: "Request Custom Print →",
    url: "/custom-print",
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
        <rect x="10" y="28" width="28" height="12" rx="2" fill="var(--bg-card-hover)" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M14 28 L14 18 L24 12 L34 18 L34 28" stroke="var(--gold)" strokeWidth="1.5" fill="var(--gold-subtle)" />
        <circle cx="24" cy="34" r="2" fill="var(--gold)" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: "digital-files",
    name: "3D Model Files (STL)",
    category: "Digital Files" as Category,
    tag: "Digital Download",
    tagline: "Instant download. Print it yourself.",
    desc: "STL files delivered instantly after purchase. Print unlimited copies on your own printer. Files personalized with your text or names.",
    price: "From $5",
    priceSub: "instant download",
    features: ["Instant delivery", "STL + OBJ formats", "Personalized text/names", "Unlimited prints"],
    cta: "Browse Files →",
    url: ETSY_URL,
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
        <rect x="12" y="8" width="24" height="30" rx="2" fill="var(--bg-card-hover)" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M18 22 L24 28 L30 18" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="17" y1="34" x2="31" y2="34" stroke="var(--gold)" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const HOW_IT_WORKS = [
  { n: "01", title: "Pick or describe", desc: "Choose from our catalog or tell us exactly what you need." },
  { n: "02", title: "We print it", desc: "Prusa MK2.5S or Bambu Lab P2S with AMS for multi-color." },
  { n: "03", title: "Quality check", desc: "Every piece inspected before it goes in the box." },
  { n: "04", title: "At your door", desc: "Shipped from Blackwood, NJ. Fast, packed carefully." },
];

const FAQ = [
  { q: "Will the Hive Game Board fit my tiles?", a: "Sized for standard Hive tokens (~50mm hex tiles). Works with all standard Hive sets. Unsure? Message us with your variant before ordering." },
  { q: "What mailbox models does the flag fit?", a: "Designed for most standard townhouse / jumbo mailboxes. Clips on magnetically. Send us a photo if you want confirmation before ordering." },
  { q: "Can you make a custom part from a photo?", a: "Yes. Send a photo of the part plus any measurements you can take. We'll tell you if it's feasible and quote you before printing anything." },
  { q: "What materials do you print in?", a: "PETG is our primary material (outdoor-friendly, chemical-resistant). PLA is used for some color jobs. The Bambu P2S with AMS allows multi-color printing." },
  { q: "Do you ship internationally?", a: "Yes. Etsy handles shipping at checkout. US orders typically arrive in 3–7 business days. International varies by destination." },
  { q: "Do you offer bulk / event pricing?", a: "Yes. For events, party favors, or resale orders of 20+, message us before purchasing and we'll work out a volume discount." },
];

// ─── Small components ──────────────────────────────────────────────────────────

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center px-4 py-2.5 rounded-xl"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <span className="text-lg font-bold font-heading" style={{ color: "var(--text)" }}>
        {value}
      </span>
      <span className="text-[0.68rem] mt-0.5 tracking-wide" style={{ color: "var(--text-dim)" }}>
        {label}
      </span>
    </div>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" fill="var(--gold-subtle)" />
      <polyline points="5,8.5 7,10.5 11,6" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Hex board visual for hero ─────────────────────────────────────────────────
function HiveBoardVisual() {
  return (
    <div
      className="w-full flex items-center justify-center rounded-2xl overflow-hidden"
      style={{
        height: "180px",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(217,140,46,0.10) 0%, transparent 65%)",
        }}
      />
      <svg
        viewBox="0 0 240 160"
        width="240"
        height="160"
        fill="none"
        style={{ position: "relative" }}
      >
        {/* Outer ring hex */}
        <polygon
          points="120,8 179,42 179,110 120,144 61,110 61,42"
          fill="rgba(217,140,46,0.04)"
          stroke="rgba(217,140,46,0.18)"
          strokeWidth="1"
        />
        {/* Middle hex */}
        <polygon
          points="120,28 166,54 166,106 120,132 74,106 74,54"
          fill="rgba(217,140,46,0.07)"
          stroke="rgba(217,140,46,0.28)"
          strokeWidth="1.2"
        />
        {/* Inner hex */}
        <polygon
          points="120,50 152,68 152,104 120,122 88,104 88,68"
          fill="rgba(217,140,46,0.12)"
          stroke="rgba(217,140,46,0.45)"
          strokeWidth="1.5"
        />
        {/* Center filled hex */}
        <polygon
          points="120,68 136,77 136,95 120,104 104,95 104,77"
          fill="rgba(217,140,46,0.25)"
          stroke="rgba(217,140,46,0.65)"
          strokeWidth="1.5"
        />
        {/* Center dot */}
        <circle cx="120" cy="86" r="4" fill="var(--gold)" opacity="0.8" />
        {/* Corner accent hexes */}
        <polygon
          points="34,50 50,59 50,77 34,86 18,77 18,59"
          fill="rgba(217,140,46,0.05)"
          stroke="rgba(217,140,46,0.15)"
          strokeWidth="0.8"
        />
        <polygon
          points="206,50 222,59 222,77 206,86 190,77 190,59"
          fill="rgba(217,140,46,0.05)"
          stroke="rgba(217,140,46,0.15)"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Nav />

      <main>
        {/* ──────────────── HERO ──────────────── */}
        <section
          className="relative px-5 pt-32 pb-20 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 70% 0%, rgba(217,140,46,0.06) 0%, transparent 55%), var(--bg)",
          }}
        >
          {/* Badge */}
          <div className="flex justify-center mb-10">
            <span className="badge">⭐ Star Seller · Etsy · Blackwood, NJ</span>
          </div>

          {/* Two-column grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: copy ── */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "var(--gold)" }}
              >
                #1 Best Seller
              </p>

              <h1
                className="font-heading font-extrabold leading-[1.08] tracking-tight mb-5"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
                  color: "var(--text)",
                  fontWeight: 800,
                }}
              >
                The Hive Game Board.{" "}
                <span style={{ color: "var(--text-muted)" }}>
                  Your Game Deserves.
                </span>
              </h1>

              <p
                className="text-base leading-relaxed mb-8 max-w-md"
                style={{ color: "var(--text-muted)" }}
              >
                A precision-printed grid frame that keeps your Hive pieces locked in place
                through every game. No scattered bugs. No sliding tiles. Ships assembled.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <StatPill value="225+" label="Favorites" />
                <StatPill value="4.8★" label="Rated" />
                <StatPill value="$9.95" label="+ shipping" />
                <StatPill value="48h" label="Turnaround" />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={HIVE_BOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base"
                  style={{ padding: "0.875rem 2rem" }}
                >
                  Buy on Etsy — $9.95 →
                </a>
                <a
                  href="/custom-print"
                  className="btn-secondary text-base"
                  style={{ padding: "0.875rem 1.75rem" }}
                >
                  Request Custom Print
                </a>
              </div>
            </div>

            {/* ── Right: product card ── */}
            <div className="card p-6 sm:p-8 relative overflow-hidden">
              {/* Best Seller badge */}
              <div className="absolute top-4 right-4">
                <span
                  className="text-[0.68rem] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--gold-subtle)",
                    color: "var(--gold)",
                    border: "1px solid var(--gold-border)",
                  }}
                >
                  Best Seller
                </span>
              </div>

              {/* Hex visual */}
              <div className="mb-6">
                <HiveBoardVisual />
              </div>

              <h3
                className="font-heading font-bold text-xl mb-1"
                style={{ color: "var(--text)" }}
              >
                Hive Game Board
              </h3>
              <p className="text-sm font-medium mb-5" style={{ color: "var(--gold)" }}>
                Precision-printed · Ships assembled · All Hive sets
              </p>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Holds all standard Hive tiles securely",
                  "No more sliding or scattered pieces",
                  "Printed in durable PETG",
                  "Ready to play out of the box",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="flex items-end justify-between pt-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div>
                  <p className="text-3xl font-heading font-extrabold" style={{ color: "var(--text)" }}>
                    $9.95
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
                    + shipping
                  </p>
                </div>
                <a
                  href={HIVE_BOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                  style={{ padding: "0.625rem 1.25rem", minHeight: "40px" }}
                >
                  Buy on Etsy →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── TRUST STRIP ──────────────── */}
        <div
          className="px-5 py-4"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-raised)" }}
        >
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { icon: "⭐", text: <>Star Seller on <strong style={{ color: "var(--text)" }}>Etsy</strong></> },
              { icon: "🎲", text: <><strong style={{ color: "var(--text)" }}>225+</strong> favorites on the Hive Board</> },
              { icon: "📬", text: <><strong style={{ color: "var(--text)" }}>141+</strong> favorites on the Mailbox Flag</> },
              { icon: "🏅", text: <><strong style={{ color: "var(--text)" }}>4.8★</strong> average rating</> },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                {item.icon} {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* ──────────────── MORE PRODUCTS ──────────────── */}
        <section id="products" className="px-5 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-heading font-bold mb-3"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)" }}
              >
                More Products
              </h2>
              <p style={{ color: "var(--text-muted)" }}>Browse by category or see everything at once.</p>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-sm px-4 py-2 rounded-full transition-all duration-200"
                  style={
                    activeCategory === cat
                      ? { background: "var(--gold)", color: "#0D0A08", fontWeight: 600 }
                      : {
                          background: "var(--bg-card)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product grid — 1 col mobile, 2 col tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredProducts.map((p) => (
                <div key={p.id} className="card flex flex-col p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className="text-[0.65rem] font-semibold tracking-widest uppercase px-2 py-1 rounded-full mt-1"
                      style={{ background: "var(--bg)", color: "var(--text-dim)", border: "1px solid var(--border)" }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <h3
                    className="font-heading font-bold text-lg mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: "var(--gold)" }}>
                    {p.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>
                    {p.desc}
                  </p>

                  {"features" in p && p.features && (
                    <ul className="space-y-1.5 mb-4">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                          <Check />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {"reviews" in p && (
                    <p className="text-xs mb-3" style={{ color: "var(--text-dim)" }}>
                      {p.reviews} · {p.rating}
                    </p>
                  )}

                  <div
                    className="flex items-center justify-between pt-4 mt-auto"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <div>
                      <span className="font-bold text-base" style={{ color: "var(--text)" }}>
                        {p.price}
                      </span>
                      <span className="text-xs ml-1.5" style={{ color: "var(--text-dim)" }}>
                        {p.priceSub}
                      </span>
                    </div>
                    <a
                      href={p.url}
                      {...(p.url.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="btn-secondary text-xs"
                      style={{ padding: "0.5rem 1rem", minHeight: "38px" }}
                    >
                      {p.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── CUSTOM PRINT CTA ──────────────── */}
        <section
          className="px-5 py-16 mx-4 sm:mx-6 lg:mx-auto rounded-3xl mb-12"
          style={{
            maxWidth: "calc(80rem - 2rem)",
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(217,140,46,0.08) 0%, transparent 60%), var(--bg-card)",
            border: "1px solid var(--border-strong)",
          }}
        >
          <div className="max-w-2xl mx-auto text-center px-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--gold-subtle)", border: "1px solid var(--gold-border)" }}
            >
              <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                <rect x="8" y="24" width="24" height="10" rx="2" stroke="var(--gold)" strokeWidth="2" />
                <path d="M12 24 V14 L20 8 L28 14 V24" stroke="var(--gold)" strokeWidth="2" fill="var(--gold-subtle)" />
                <circle cx="20" cy="29" r="2" fill="var(--gold)" />
              </svg>
            </div>
            <h2
              className="font-heading font-bold mb-4"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", color: "var(--text)" }}
            >
              Don&apos;t see what you need?
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              If it can be described, we can probably print it. Send a photo or sketch,
              and we&apos;ll quote you before we start printing.
            </p>
            <a
              href="/custom-print"
              className="btn-primary text-base"
              style={{ padding: "0.9rem 2.25rem" }}
            >
              Request a Custom Print →
            </a>
          </div>
        </section>

        {/* ──────────────── HOW IT WORKS ──────────────── */}
        <section className="px-5 py-20" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2
                className="font-heading font-bold mb-3"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)" }}
              >
                How It Works
              </h2>
              <p style={{ color: "var(--text-muted)" }}>Simple process, no nonsense.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0"
                    style={{ background: "var(--gold-subtle)", border: "1px solid var(--gold-border)" }}
                  >
                    <span
                      className="font-heading font-bold text-sm"
                      style={{ color: "var(--gold)" }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <h3
                    className="font-heading font-semibold text-base mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── HARDWARE ──────────────── */}
        <section
          className="px-5 py-16"
          style={{
            background: "var(--bg-raised)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-heading font-bold mb-3"
              style={{ fontSize: "clamp(1.4rem, 3vw, 1.875rem)", color: "var(--text)" }}
            >
              Made with serious hardware
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              In-house printers. Reliable, clean results — not a budget printer held together with hope.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                { name: "Prusa MK2.5S", material: "PETG & PLA · Precision workhorse" },
                { name: "Bambu Lab P2S + AMS", material: "Multi-color PETG & PLA · Speed + color" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--gold-subtle)", border: "1px solid var(--gold-border)" }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                      <rect x="4" y="14" width="16" height="7" rx="1.5" stroke="var(--gold)" strokeWidth="1.5" />
                      <path d="M7 14 V8 L12 4 L17 8 V14" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{p.material}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-5" style={{ color: "var(--text-dim)" }}>
              PETG primary · PLA available · AMS multi-color · Open to specialty materials
            </p>
          </div>
        </section>

        {/* ──────────────── TESTIMONIAL ──────────────── */}
        <section className="px-5 py-20">
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl p-8 sm:p-10 text-center"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--gold)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <blockquote
                className="font-heading font-semibold leading-snug mb-5"
                style={{ fontSize: "clamp(1.1rem, 3vw, 1.375rem)", color: "var(--text)" }}
              >
                &ldquo;Exactly what I needed. My pool valve knob was discontinued everywhere
                — Mike printed a replacement that fits perfectly.&rdquo;
              </blockquote>
              <p className="text-sm" style={{ color: "var(--text-dim)" }}>
                — Verified Etsy Buyer
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────── GALLERY CTA ──────────────── */}
        <section
          className="px-5 py-14 text-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="max-w-lg mx-auto">
            <h2
              className="font-heading font-bold mb-3"
              style={{ fontSize: "clamp(1.4rem, 3vw, 1.875rem)", color: "var(--text)" }}
            >
              See our past work
            </h2>
            <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-muted)" }}>
              From custom keychains to pool valve replacements — browse examples of what we&apos;ve made.
            </p>
            <a href="/gallery" className="btn-secondary text-sm">
              Browse Gallery →
            </a>
          </div>
        </section>

        {/* ──────────────── FAQ ──────────────── */}
        <section
          id="faq"
          className="px-5 py-20"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="font-heading font-bold mb-3"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)" }}
              >
                Common questions
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Can&apos;t find the answer? Message us on Etsy.
              </p>
            </div>

            <div className="space-y-2">
              {FAQ.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200"
                    style={{
                      background: openFaq === i ? "var(--bg-card)" : "transparent",
                      color: "var(--text)",
                    }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-sm">{item.q}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="shrink-0 transition-transform duration-200"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", color: "var(--text-dim)" }}
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-5 pb-4 text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}
                    >
                      <div className="pt-3">{item.a}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── FINAL CTA ──────────────── */}
        <section
          className="px-5 py-24 text-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="max-w-lg mx-auto">
            <h2
              className="font-heading font-bold mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)" }}
            >
              Check out the full store
            </h2>
            <p className="leading-relaxed mb-8 text-base" style={{ color: "var(--text-muted)" }}>
              All products ship from Blackwood, NJ. Star Seller, 4.8★ rating, 100+ happy customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base"
                style={{ padding: "0.9rem 2.25rem" }}
              >
                Visit Etsy Store
              </a>
              <a
                href="/gallery"
                className="btn-secondary text-base"
                style={{ padding: "0.9rem 2rem" }}
              >
                Browse Gallery →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
