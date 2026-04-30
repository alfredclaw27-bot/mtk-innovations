"use client";

import { useState } from "react";

const galleryItems = [
  {
    id: 1,
    title: "Hive Game Board",
    category: "Game Accessories",
    emoji: "🎲",
    desc: "Precision-printed grid frame for Hive players. Ships assembled, ready to play.",
    stats: "225+ favorites · 4.8★",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
  },
  {
    id: 2,
    title: "Magnetic Mailbox Flag",
    category: "Home & Mail",
    emoji: "📬",
    desc: "No-screw, no-adhesive mailbox flag that actually stays put through wind and rain.",
    stats: "141+ favorites · Best Seller",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    id: 3,
    title: "Pool Valve Knob",
    category: "Pool Parts",
    emoji: "🏊",
    desc: "Reverse-engineered replacement for discontinued pool valve handles. PETG for chemical resistance.",
    stats: "Custom order · Made to fit",
    color: "from-teal-500/20 to-green-500/20",
    border: "border-teal-500/30",
  },
  {
    id: 4,
    title: "Custom Coasters Set",
    category: "Personalized",
    emoji: "🍺",
    desc: "Monogrammed coasters for a wedding favors batch. Multi-color AMS printing with custom text.",
    stats: "Custom work",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    id: 5,
    title: "Replacement Chess Piece",
    category: "Game Accessories",
    emoji: "♟️",
    desc: "Single queen replacement for a beloved chess set. Color-matched to original. $7 fix vs $40 replacement.",
    stats: "Quick turnaround · 24h",
    color: "from-zinc-500/20 to-zinc-600/20",
    border: "border-zinc-500/30",
  },
  {
    id: 6,
    title: "Townhouse Mailbox Door",
    category: "Home & Mail",
    emoji: "📮",
    desc: "Custom replacement door for a non-standard mailbox. Exact measurements from photo.",
    stats: "Made to order",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
  },
  {
    id: 7,
    title: "Custom Keychains (x50)",
    category: "Personalized",
    emoji: "🔑",
    desc: "Event giveaways — personalized keychains with names and dates. AMS multi-color, bulk priced.",
    stats: "Bulk order · 50 units",
    color: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/30",
  },
  {
    id: 8,
    title: "Tent Pole Connector",
    category: "Outdoor Gear",
    emoji: "⛺",
    desc: "Lost your tent pole connector? 3D printed replacement in outdoor-grade PETG. Wind-proof.",
    stats: "Outdoor PETG",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
  },
  {
    id: 9,
    title: "Appliance Button Replica",
    category: "Replacement Parts",
    emoji: "🔌",
    desc: "Reverse-engineered button for a discontinued coffee maker.客户只需发来照片。",
    stats: "Reverse-engineered",
    color: "from-gray-500/20 to-slate-500/20",
    border: "border-gray-500/30",
  },
  {
    id: 10,
    title: "Jenga Block Replacement",
    category: "Game Accessories",
    emoji: "🧱",
    desc: "Lost a Jenga block? We can print a replacement. Slightly custom coloring to blend in.",
    stats: "$7 fix vs new game",
    color: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/30",
  },
  {
    id: 11,
    title: "Kitchen Label Holders",
    category: "Home Organization",
    emoji: "🏷️",
    desc: "Label holders for pantry bins. Sold in packs of 12. Wipe-clean, snap-fit design.",
    stats: "Pack of 12",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
  },
  {
    id: 12,
    title: "Custom Cabinet Hinge",
    category: "Replacement Parts",
    emoji: "🚪",
    desc: "Odd-size cabinet hinge that mainstream hardware stores stopped stocking. Exact fit from photo.",
    stats: "Made to order",
    color: "from-stone-500/20 to-amber-500/20",
    border: "border-stone-500/30",
  },
];

const categories = ["All", "Game Accessories", "Home & Mail", "Pool Parts", "Personalized", "Outdoor Gear", "Replacement Parts", "Home Organization"];

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <main className="flex flex-col min-h-screen">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-2xl">⚙️</span>
            <span>MTK<span className="text-orange-400">Innovations</span></span>
          </a>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/gallery" className="hover:text-white transition-colors text-white">Gallery</a>
            <a href="/custom-print" className="hover:text-white transition-colors">Request Custom Print</a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">
              Etsy Store
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
            📸 Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Gallery of Past Work</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            A sample of what we&apos;ve made. From game board upgrades to reverse-engineered replacement parts — if you can describe it, we can probably print it.
          </p>
        </div>
      </section>

      {/* ─── CATEGORY FILTER ─── */}
      <section className="px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
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
        </div>
      </section>

      {/* ─── GALLERY GRID ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`card border ${item.border} overflow-hidden group`}
              >
                {/* Gradient placeholder image */}
                <div
                  className={`h-40 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 relative`}
                >
                  <span className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">
                    {item.emoji}
                  </span>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white/80 text-sm">#{item.id.toString().padStart(3, "0")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium tracking-wider uppercase text-zinc-500">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="pt-3 border-t border-zinc-800">
                  <span className="text-xs text-zinc-500">{item.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-20 bg-zinc-950/50 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Want Something Like This?</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Describe your idea or send a photo — we&apos;ll tell you if it&apos;s printable and give you a quote before we start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/custom-print" className="btn-primary text-lg px-8 py-4">
              Request Custom Print
            </a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-8 py-4">
              View Etsy Store →
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
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Etsy ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
