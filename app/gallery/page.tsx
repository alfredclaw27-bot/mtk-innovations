"use client";

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  desc: string;
  stats: string;
  accentColor: string; // rgba for glow
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Hive Game Board",
    category: "Game Accessories",
    desc: "Precision-printed grid frame for Hive players. Ships assembled, ready to play.",
    stats: "225+ favorites · 4.8★",
    accentColor: "rgba(217,140,46,0.15)",
  },
  {
    id: 2,
    title: "Magnetic Mailbox Flag",
    category: "Home & Mail",
    desc: "No-screw, no-adhesive mailbox flag that stays put through wind and rain.",
    stats: "141+ favorites · Best Seller",
    accentColor: "rgba(99,179,237,0.12)",
  },
  {
    id: 3,
    title: "Pool Valve Knob",
    category: "Pool Parts",
    desc: "Reverse-engineered replacement for discontinued pool valve handles. PETG for chemical resistance.",
    stats: "Custom order · Made to fit",
    accentColor: "rgba(72,187,120,0.12)",
  },
  {
    id: 4,
    title: "Custom Coasters Set",
    category: "Personalized",
    desc: "Monogrammed coasters for a wedding favors batch. Multi-color AMS printing with custom text.",
    stats: "Custom work",
    accentColor: "rgba(159,122,234,0.12)",
  },
  {
    id: 5,
    title: "Replacement Chess Piece",
    category: "Game Accessories",
    desc: "Single queen replacement for a beloved chess set. Color-matched to original. $7 fix vs $40 new.",
    stats: "Quick turnaround · 24h",
    accentColor: "rgba(160,160,160,0.10)",
  },
  {
    id: 6,
    title: "Townhouse Mailbox Door",
    category: "Home & Mail",
    desc: "Custom replacement door for a non-standard mailbox. Exact measurements from customer photo.",
    stats: "Made to order",
    accentColor: "rgba(99,179,237,0.10)",
  },
  {
    id: 7,
    title: "Custom Keychains (×50)",
    category: "Personalized",
    desc: "Event giveaways — personalized keychains with names and dates. AMS multi-color, bulk priced.",
    stats: "Bulk order · 50 units",
    accentColor: "rgba(246,173,85,0.12)",
  },
  {
    id: 8,
    title: "Tent Pole Connector",
    category: "Outdoor Gear",
    desc: "Lost your tent pole connector? 3D printed replacement in outdoor-grade PETG. Wind-proof.",
    stats: "Outdoor PETG",
    accentColor: "rgba(72,187,120,0.10)",
  },
  {
    id: 9,
    title: "Appliance Button Replica",
    category: "Replacement Parts",
    desc: "Reverse-engineered button for a discontinued coffee maker. Customer only needed to send a photo.",
    stats: "Reverse-engineered",
    accentColor: "rgba(160,160,160,0.08)",
  },
  {
    id: 10,
    title: "Jenga Block Replacement",
    category: "Game Accessories",
    desc: "Lost a Jenga block? We print a replacement. Slightly custom coloring to blend with the original.",
    stats: "$7 fix vs buying new game",
    accentColor: "rgba(246,173,85,0.10)",
  },
  {
    id: 11,
    title: "Kitchen Label Holders",
    category: "Home Organization",
    desc: "Label holders for pantry bins. Sold in packs of 12. Wipe-clean, snap-fit design.",
    stats: "Pack of 12",
    accentColor: "rgba(246,135,135,0.10)",
  },
  {
    id: 12,
    title: "Custom Cabinet Hinge",
    category: "Replacement Parts",
    desc: "Odd-size cabinet hinge that hardware stores stopped stocking. Exact fit from customer photo.",
    stats: "Made to order",
    accentColor: "rgba(180,140,100,0.10)",
  },
];

const CATEGORIES = [
  "All",
  "Game Accessories",
  "Home & Mail",
  "Pool Parts",
  "Personalized",
  "Outdoor Gear",
  "Replacement Parts",
  "Home Organization",
];

// Small SVG icon unique per card (based on category)
function CardIcon({ category }: { category: string }) {
  const icons: Record<string, React.ReactNode> = {
    "Game Accessories": (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
        <polygon points="16,4 27,10 27,22 16,28 5,22 5,10" stroke="var(--gold)" strokeWidth="1.5" fill="rgba(217,140,46,0.08)" />
        <circle cx="16" cy="16" r="3" fill="var(--gold)" opacity="0.5" />
      </svg>
    ),
    "Home & Mail": (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
        <rect x="4" y="6" width="3" height="22" rx="1.5" fill="var(--text-dim)" />
        <path d="M7 8 L26 14 L7 20 Z" fill="rgba(99,179,237,0.4)" stroke="rgba(99,179,237,0.7)" strokeWidth="1" />
      </svg>
    ),
    "Pool Parts": (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="rgba(72,187,120,0.6)" strokeWidth="1.5" fill="rgba(72,187,120,0.08)" />
        <circle cx="16" cy="16" r="4" fill="rgba(72,187,120,0.4)" />
      </svg>
    ),
    "Personalized": (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
        <rect x="6" y="8" width="20" height="16" rx="2" stroke="rgba(159,122,234,0.6)" strokeWidth="1.5" fill="rgba(159,122,234,0.08)" />
        <path d="M10 14 L16 18 L22 14" stroke="rgba(159,122,234,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "Outdoor Gear": (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
        <path d="M16 4 L28 26 H4 Z" stroke="rgba(72,187,120,0.6)" strokeWidth="1.5" fill="rgba(72,187,120,0.08)" />
      </svg>
    ),
    "Replacement Parts": (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="rgba(160,160,160,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
        <circle cx="16" cy="16" r="4" fill="rgba(160,160,160,0.2)" />
        <line x1="16" y1="6" x2="16" y2="26" stroke="rgba(160,160,160,0.4)" strokeWidth="1" />
        <line x1="6" y1="16" x2="26" y2="16" stroke="rgba(160,160,160,0.4)" strokeWidth="1" />
      </svg>
    ),
    "Home Organization": (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
        <rect x="5" y="8" width="22" height="6" rx="1.5" stroke="rgba(246,135,135,0.6)" strokeWidth="1.5" fill="rgba(246,135,135,0.08)" />
        <rect x="5" y="18" width="22" height="6" rx="1.5" stroke="rgba(246,135,135,0.6)" strokeWidth="1.5" fill="rgba(246,135,135,0.08)" />
      </svg>
    ),
  };
  return (icons[category] ?? icons["Replacement Parts"]) as React.ReactElement;
}

export default function GalleryPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === active);

  return (
    <>
      <Nav />

      <main>
        {/* ──────────────── HERO ──────────────── */}
        <section className="px-5 pt-32 pb-14 text-center">
          <div className="max-w-xl mx-auto">
            <span className="badge mb-6 inline-flex">Portfolio</span>
            <h1
              className="font-heading font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)" }}
            >
              Gallery of Past Work
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              From game board upgrades to reverse-engineered replacement parts — a sample of what
              we&apos;ve made for real customers.
            </p>
          </div>
        </section>

        {/* ──────────────── FILTER TABS ──────────────── */}
        <section className="px-5 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="text-sm px-4 py-2 rounded-full transition-all duration-200"
                  style={
                    active === cat
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
          </div>
        </section>

        {/* ──────────────── GALLERY GRID ──────────────── */}
        <section className="px-5 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="card flex flex-col overflow-hidden group"
                  style={{ padding: 0 }}
                >
                  {/* Gradient image area */}
                  <div
                    className="h-36 flex items-center justify-center relative overflow-hidden"
                    style={{ background: item.accentColor }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(circle at 50% 50%, ${item.accentColor} 0%, transparent 70%)`,
                      }}
                    />
                    <div className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-200 scale-125">
                      <CardIcon category={item.category} />
                    </div>
                    <span
                      className="absolute top-3 right-3 text-[0.6rem] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(13,10,8,0.6)",
                        color: "var(--text-dim)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      #{String(item.id).padStart(3, "0")}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col flex-1 p-5">
                    <p
                      className="text-[0.65rem] font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {item.category}
                    </p>
                    <h3
                      className="font-heading font-bold text-base mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed flex-1 mb-4"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.desc}
                    </p>
                    <p
                      className="text-xs pt-3"
                      style={{
                        color: "var(--text-dim)",
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      {item.stats}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20" style={{ color: "var(--text-dim)" }}>
                No items in this category yet.
              </div>
            )}
          </div>
        </section>

        {/* ──────────────── BOTTOM CTA ──────────────── */}
        <section
          className="px-5 py-20 text-center"
          style={{ borderTop: "1px solid var(--border)", background: "var(--bg-raised)" }}
        >
          <div className="max-w-xl mx-auto">
            <h2
              className="font-heading font-bold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text)" }}
            >
              Want something like this?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              Describe your idea or send a photo — we&apos;ll tell you if it&apos;s printable
              and give you a quote before we start.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/custom-print"
                className="btn-primary text-base"
                style={{ padding: "0.875rem 2rem" }}
              >
                Request Custom Print
              </a>
              <a
                href={ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base"
                style={{ padding: "0.875rem 1.75rem" }}
              >
                View Etsy Store →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
