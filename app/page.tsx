"use client";

import { useState } from "react";

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";
const HIVE_BOARD_URL = "https://www.etsy.com/listing/1614563050";
const MAILBOX_FLAG_URL = "https://www.etsy.com/listing/1230849913";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = "All" | "Game Accessories" | "Home & Mail" | "Pool Parts" | "Custom Work" | "Digital Files";

const CATEGORIES: Category[] = ["All", "Game Accessories", "Home & Mail", "Pool Parts", "Custom Work", "Digital Files"];

const otherProducts = [
  {
    id: "mailbox-flag",
    name: "Outgoing Mail Flag",
    category: "Home & Mail" as Category,
    emoji: "📬",
    tag: "Top Seller",
    tagline: "The mail flag that actually stays put.",
    desc: "Magnetic townhouse mailbox flag — no screws, no adhesives. Clips onto your mailbox and stays put through wind, rain, and everyday use. 3D printed in durable PETG.",
    price: "$6.99",
    priceSub: "+ shipping",
    reviews: "141+ favorites",
    rating: "4.8★",
    cta: "Buy on Etsy →",
    url: MAILBOX_FLAG_URL,
  },
  {
    id: "pool-valve-knob",
    name: "Pool Valve Knob Replacement",
    category: "Pool Parts" as Category,
    emoji: "🏊",
    tag: "Functional Part",
    tagline: "The discontinued part you can't find anywhere else.",
    desc: "3D printed pool valve handle that fits most standard pool/spa valves. PETG construction stands up to chemicals and sun. Send us your old knob or measurements and we'll confirm fit.",
    price: "From $12",
    priceSub: "+ shipping",
    cta: "Request on Etsy →",
    url: ETSY_URL,
  },
  {
    id: "custom-print",
    name: "Custom 3D Print",
    category: "Custom Work" as Category,
    emoji: "🖨️",
    tag: "Custom Work",
    tagline: "You describe it. We print it.",
    desc: "Send a photo, sketch, or description. We design it, print it, and ship it. Replacement parts, personalized gifts, custom favors — if you can describe it, we can probably make it.",
    price: "From $10",
    priceSub: "based on complexity",
    features: ["Send a photo, sketch, or description", "Most jobs ship within 48 hours", "PETG, PLA, or multi-color options"],
    cta: "Request Custom Print →",
    url: "/custom-print",
  },
  {
    id: "digital-files",
    name: "3D Model Files (STL)",
    category: "Digital Files" as Category,
    emoji: "📁",
    tag: "Digital Download",
    tagline: "Instant download. Print it yourself.",
    desc: "STL files delivered instantly after purchase. Print unlimited copies on your own 3D printer. Files are personalized with your requested text or names.",
    price: "From $5",
    priceSub: "instant download",
    features: ["Instant delivery", "STL + OBJ formats", "Personalized text/names", "Unlimited prints"],
    cta: "Browse Files →",
    url: ETSY_URL,
  },
];

const process = [
  { step: "1", title: "Pick a product", desc: "Choose from our best sellers or describe what you need." },
  { step: "2", title: "We print it", desc: "Made on a Prusa MK2.5S or Bambu Lab P2S with AMS for multi-color." },
  { step: "3", title: "Inspected", desc: "Every piece checked before it ships." },
  { step: "4", title: "At your door", desc: "Packed carefully and shipped from Blackwood, NJ." },
];

const printers = [
  { name: "Prusa MK2.5S", material: "PETG & PLA", icon: "🖨️" },
  { name: "Bambu Lab P2S + AMS", material: "Multi-color PETG & PLA", icon: "🎨" },
];

const faq = [
  { q: "Will the Hive Game Board fit my tiles?", a: "The board is sized for standard Hive tokens (approximately 50mm hex tiles). It works with all standard Hive sets. If you have an unusual variant, message us before ordering and we'll confirm." },
  { q: "What mailbox models does the flag fit?", a: "The magnetic flag is designed for most standard townhouse/jumbo mailboxes. It clips onto the side panel magnetically. If you're unsure whether it'll fit your mailbox, send us a photo and we'll tell you." },
  { q: "Can you make a custom part for my mailbox / pool / appliance?", a: "Yes. Send us a photo of the part you need, plus any measurements you can take. We'll tell you if it's feasible and give you a quote before printing anything." },
  { q: "What material do you print in?", a: "Primary material is PETG for durability (outdoor-friendly, chemical-resistant). PLA is used for some color jobs. The Bambu Lab P2S with AMS allows multi-color printing on most items." },
  { q: "Do you ship internationally?", a: "Yes. Etsy handles shipping at checkout. US orders typically arrive in 3–7 business days. International varies by country." },
  { q: "Do you offer bulk / event pricing?", a: "Yes. For events, party favors, or resale orders of 20+, contact us before purchasing and we'll work out a volume discount." },
];

// ─── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-5 py-3 bg-zinc-800/60 rounded-xl border border-zinc-700/50">
      <span className="text-xl font-bold text-white">{value}</span>
      <span className="text-xs text-zinc-500 mt-0.5">{label}</span>
    </div>
  );
}

// ─── Check icon ────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProducts = activeCategory === "All"
    ? otherProducts
    : otherProducts.filter((p) => p.category === activeCategory);

  return (
    <main className="flex flex-col">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-2xl">⚙️</span>
            <span>MTK<span className="text-orange-400">Innovations</span></span>
          </a>
          <div className="flex items-center gap-5 text-sm text-zinc-400">
            <a href="#products" className="hover:text-white transition-colors hidden sm:block">Products</a>
            <a href="/gallery" className="hover:text-white transition-colors hidden sm:block">Gallery</a>
            <a href="/custom-print" className="hover:text-white transition-colors hidden sm:block">Custom Print</a>
            <a
              href={ETSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-4"
            >
              Etsy Store
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO — HIVE BOARD FEATURED ─── */}
      <section className="relative px-6 pt-28 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, #f97316 0%, transparent 55%), radial-gradient(circle at 85% 30%, #fb923c 0%, transparent 45%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
              ⭐ Star Seller · Etsy · Blackwood, NJ
            </span>
          </div>

          {/* Two-column layout: copy + product card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: headline + stats + CTAs */}
            <div>
              <p className="text-sm font-medium text-orange-400 tracking-wide uppercase mb-3">
                🏆 #1 Best Seller
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
                The Hive Game Board<br />
                <span className="text-zinc-400">Your Game Deserves</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                A precision-printed grid frame that holds your Hive pieces perfectly in place
                during play. No more scattered bugs, no more sliding tiles. Fits all standard
                Hive sets. Ships assembled — ready to roll.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-8">
                <StatPill value="225+" label="Favorites" />
                <StatPill value="4.8★" label="Etsy Rating" />
                <StatPill value="$9.95" label="+ shipping" />
                <StatPill value="48h" label="Avg. turnaround" />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={HIVE_BOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base px-7 py-3.5"
                >
                  Buy on Etsy — $9.95 →
                </a>
                <a href="/custom-print" className="btn-secondary text-base px-7 py-3.5">
                  Request Custom Print
                </a>
              </div>
            </div>

            {/* Right: visual product card */}
            <div className="card p-8 relative overflow-hidden">
              {/* Corner badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-1 rounded-full">
                  🏆 Best Seller
                </span>
              </div>

              {/* Hex grid illustration */}
              <div className="flex items-center justify-center h-40 mb-6 rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/40">
                <div className="text-7xl select-none" style={{ filter: "drop-shadow(0 0 20px rgba(249,115,22,0.3))" }}>
                  🎲
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1">Hive Game Board</h3>
              <p className="text-orange-400 text-sm font-medium mb-4">
                Precision-printed · Ships assembled
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "Holds all standard Hive tiles securely",
                  "No more sliding or scattered pieces",
                  "Printed in durable PETG",
                  "Fits all standard Hive sets",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between pt-5 border-t border-zinc-800">
                <div>
                  <p className="text-3xl font-bold text-white">$9.95</p>
                  <p className="text-zinc-500 text-xs mt-0.5">+ shipping</p>
                </div>
                <a
                  href={HIVE_BOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-5 text-sm"
                >
                  Buy on Etsy →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="border-y border-zinc-800/60 bg-zinc-950/40 px-6 py-5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400">
          <span className="flex items-center gap-2">⭐ <strong className="text-white">Star Seller</strong> on Etsy</span>
          <span className="hidden sm:block text-zinc-700">|</span>
          <span className="flex items-center gap-2">🎲 <strong className="text-white">225+</strong> favorites on the Hive Board</span>
          <span className="hidden sm:block text-zinc-700">|</span>
          <span className="flex items-center gap-2">📬 <strong className="text-white">141+</strong> favorites on the Mailbox Flag</span>
          <span className="hidden sm:block text-zinc-700">|</span>
          <span className="flex items-center gap-2"><strong className="text-white">4.8★</strong> average rating</span>
        </div>
      </section>

      {/* ─── MORE PRODUCTS ─── */}
      <section id="products" className="px-6 py-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">More Products</h2>
          <p className="text-zinc-400">Browse by category or see everything at once.</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-2 rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProducts.map((p) => (
            <div key={p.id} className="card flex flex-col p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{p.emoji}</span>
                <span className="text-xs font-medium tracking-wider uppercase text-zinc-600">{p.tag}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <p className="text-orange-400 font-medium text-sm mb-3">{p.tagline}</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
              {p.features && (
                <ul className="space-y-1.5 mb-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {"reviews" in p && (
                <div className="flex items-center gap-3 mb-4 text-xs text-zinc-500">
                  <span>{p.reviews}</span>
                  <span className="text-zinc-700">·</span>
                  <span>{p.rating}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-auto">
                <div>
                  <span className="text-base font-bold text-white">{p.price}</span>
                  <span className="text-zinc-600 text-xs ml-1.5">{p.priceSub}</span>
                </div>
                <a
                  href={p.url}
                  target={"url" in p && p.url.startsWith("http") ? "_blank" : undefined}
                  rel={"url" in p && p.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="btn-secondary text-xs py-2 px-3"
                >
                  {p.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CUSTOM PRINT CTA ─── */}
      <section className="px-6 py-16 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl mb-4 block">🖨️</span>
          <h2 className="text-3xl font-bold mb-4">Don&apos;t See What You Need?</h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            If it can be described, we can probably print it. Send a photo or sketch,
            tell us the details, and we&apos;ll quote you before we print anything.
          </p>
          <a href="/custom-print" className="btn-primary text-lg px-8 py-4">
            Request a Custom Print →
          </a>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-zinc-400">Simple, fast, no nonsense.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINTERS ─── */}
      <section className="px-6 py-16 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Made With Serious Hardware</h2>
          <p className="text-zinc-400 mb-8">
            Every print is made in-house on equipment that produces reliable, clean results —
            not a budget printer held together with hope.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {printers.map((p) => (
              <div key={p.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4">
                <span className="text-4xl">{p.icon}</span>
                <div className="text-left">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-zinc-500 text-sm">{p.material}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-zinc-500 text-sm mt-4">
            PETG primary · PLA available · AMS multi-color · Open to resin and specialty materials
          </p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316" strokeWidth="1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <blockquote className="text-xl font-medium mb-4 leading-snug">
            &ldquo;Exactly what I needed. My pool valve knob was discontinued everywhere — Mike printed a replacement that fits perfectly.&rdquo;
          </blockquote>
          <p className="text-zinc-500 text-sm">— Verified Etsy Buyer</p>
        </div>
      </section>

      {/* ─── GALLERY CTA ─── */}
      <section className="px-6 py-14 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-4xl mb-4 block">📸</span>
          <h2 className="text-2xl font-bold mb-3">See Our Past Work</h2>
          <p className="text-zinc-400 mb-6">
            From custom keychains to pool valve replacements — browse examples of what we&apos;ve made for real customers.
          </p>
          <a href="/gallery" className="btn-secondary text-base px-7 py-3.5">
            View Gallery →
          </a>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="px-6 py-20 max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Common Questions</h2>
          <p className="text-zinc-400">Can&apos;t find the answer? Message us on Etsy.</p>
        </div>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold text-base mb-2">{item.q}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="px-6 py-24 text-center border-t border-zinc-800">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Check Out the Full Etsy Store</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            All products ship from Blackwood, NJ. Star Seller, 4.8★ rating, 100+ happy customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4">
              Visit Etsy Store
            </a>
            <a href="/gallery" className="btn-secondary text-lg px-8 py-4">
              Browse Gallery →
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <span>MTK<span className="text-zinc-400">Innovations</span></span>
          </div>
          <p>© {new Date().getFullYear()} MTK Innovations · Blackwood, NJ</p>
          <div className="flex gap-4">
            <a href="/" className="hover:text-zinc-300 transition-colors">Home</a>
            <a href="/gallery" className="hover:text-zinc-300 transition-colors">Gallery</a>
            <a href="/custom-print" className="hover:text-zinc-300 transition-colors">Custom Print</a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Etsy ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
