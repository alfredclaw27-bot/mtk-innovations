import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getShop } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who's behind MTK Innovations — a Blackwood, NJ 3D printing shop running a Prusa MK2.5S and Bambu Lab P2S with AMS. Star Seller on Etsy, direct storefront here.",
  alternates: { canonical: "/about" },
};

const PRINTERS = [
  {
    name: "Prusa MK2.5S",
    role: "Precision workhorse",
    detail: "The original — dialed-in, reliable, and still the go-to for single-color PETG and PLA parts that need to be exactly right.",
  },
  {
    name: "Bambu Lab P2S + AMS",
    role: "Speed + multi-color",
    detail: "Handles the multi-color and bulk jobs — keychains, personalized gifts, and anything that needs more than one filament without babysitting.",
  },
];

const WHY_DIRECT = [
  {
    title: "Richer detail than Etsy allows",
    desc: "Etsy listings are limited to a fixed photo grid and a wall of text. Here we can show full galleries, specs, and the story behind each product.",
  },
  {
    title: "Etsy still handles checkout",
    desc: "Buyer protection, secure payment, and shipping tracking all run through Etsy — this site is the showroom, Etsy is the register.",
  },
  {
    title: "Straight from the maker",
    desc: "Every order is reviewed, printed, and packed by hand in Blackwood, NJ. No dropshipping, no middleman.",
  },
];

export default function AboutPage() {
  const shop = getShop();

  return (
    <>
      <Nav />

      <main>
        <section className="px-5 pt-32 pb-16 text-center dot-grid">
          <div className="max-w-2xl mx-auto">
            <span className="badge mb-6 inline-flex">Our story</span>
            <h1 className="font-heading font-extrabold leading-tight mb-5" style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)", color: "var(--text)" }}>
              A small print shop in Blackwood, NJ
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              MTK Innovations started with a simple idea: if something&apos;s broken, discontinued, or
              just doesn&apos;t exist yet, it can probably be 3D printed. What began as fixing our own
              stuff — a cracked pool valve knob, a mailbox flag that wouldn&apos;t stay put — turned into
              a Star Seller Etsy shop with {shop.rating ? `a ${shop.rating}★ rating` : "hundreds of happy customers"}.
            </p>
          </div>
        </section>

        <section className="px-5 pb-16">
          <div className="max-w-3xl mx-auto rounded-3xl p-8 sm:p-10 text-center" style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "5px 5px 0 0 var(--ink)" }}>
            <h2 className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", color: "var(--text)" }}>
              Star Seller, {shop.rating}★ on Etsy
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Every order ships from {shop.location}. We review custom requests by hand, quote before
              printing anything, and pack every order carefully — no automated fulfillment.
            </p>
          </div>
        </section>

        {/* ── Printers ── */}
        <section className="px-5 pb-16" style={{ borderTop: "2px solid var(--ink)" }}>
          <div className="max-w-4xl mx-auto pt-16">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", color: "var(--text)" }}>
                The hardware
              </h2>
              <p style={{ color: "var(--text-muted)" }}>Two printers, chosen for different jobs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PRINTERS.map((p) => (
                <div key={p.name} className="card p-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "var(--accent)", border: "2px solid var(--ink)" }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                      <rect x="4" y="14" width="16" height="7" rx="1.5" stroke="var(--ink)" strokeWidth="1.5" />
                      <path d="M7 14 V8 L12 4 L17 8 V14" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg mb-1" style={{ color: "var(--text)" }}>{p.name}</h3>
                  <p className="text-sm font-bold mb-3" style={{ color: "var(--accent-dark)" }}>{p.role}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.detail}</p>
                </div>
              ))}
            </div>

            <p className="text-xs mt-6 text-center" style={{ color: "var(--text-dim)" }}>
              PETG primary · PLA available · AMS multi-color · Open to specialty materials on request
            </p>
          </div>
        </section>

        {/* ── Why buy direct / Etsy ── */}
        <section className="px-5 py-16" style={{ background: "var(--bg-raised)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", color: "var(--text)" }}>
                Why this site, why Etsy
              </h2>
              <p style={{ color: "var(--text-muted)" }}>Two storefronts, one shop.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {WHY_DIRECT.map((item) => (
                <div key={item.title} className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "3px 3px 0 0 var(--ink)" }}>
                  <h3 className="font-heading font-semibold text-base mb-2" style={{ color: "var(--text)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-5 py-20 text-center">
          <div className="max-w-lg mx-auto">
            <h2 className="font-heading font-bold mb-4" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", color: "var(--text)" }}>
              Have something to print?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              Browse the catalog, or send us a photo and we&apos;ll tell you if it&apos;s printable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="btn-primary text-base" style={{ padding: "0.875rem 2rem" }}>
                Browse Products
              </Link>
              <a href="/custom-print" className="btn-secondary text-base" style={{ padding: "0.875rem 1.75rem" }}>
                Request Custom Print
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
