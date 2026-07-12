import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import ProductCard from "./components/ProductCard";
import TrustMarquee from "./components/TrustMarquee";
import ReviewQuote from "./components/ReviewQuote";
import StarRating from "./components/StarRating";
import Faq from "./components/Faq";
import CategoryIcon from "./components/CategoryIcon";
import { getBestSellers, getFeaturedProduct, getProducts, getReviewQuotes, getShop } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "3D Printed Game Boards, Home Products & Custom Parts",
  description:
    "MTK Innovations — Star Seller Etsy shop based in Blackwood, NJ. 4.9★ across 357 reviews, 1,207 sales. Connect Hive Game Board, magnetic mailbox flags, pool valve replacements, and custom 3D print requests.",
  alternates: { canonical: "/" },
};

const HOW_IT_WORKS = [
  { n: "01", title: "Pick or describe", desc: "Choose from our catalog or tell us exactly what you need." },
  { n: "02", title: "We print it", desc: "Prusa MK2.5S or Bambu Lab P2S with AMS for multi-color." },
  { n: "03", title: "Quality check", desc: "Every piece inspected before it goes in the box." },
  { n: "04", title: "At your door", desc: "Shipped from Blackwood, NJ. Fast, packed carefully." },
];

const FAQ = [
  { q: "Will the Connect Hive Game Board fit my tiles?", a: "Sized for both Hive Pocket (25mm) and Original/Carbon (38mm) tiles, plus Survive: Escape from Atlantis. Unsure? Message us with your variant before ordering." },
  { q: "What mailbox models does the flag fit?", a: "Designed for most standard townhouse / jumbo mailboxes. Clips on magnetically. Send us a photo if you want confirmation before ordering." },
  { q: "Can you make a custom part from a photo?", a: "Yes. Send a photo of the part plus any measurements you can take. We'll tell you if it's feasible and quote you before printing anything." },
  { q: "What materials do you print in?", a: "PETG is our primary material (outdoor-friendly, chemical-resistant). PLA is used for some color jobs. The Bambu P2S with AMS allows multi-color printing." },
  { q: "Do you ship internationally?", a: "Yes. Etsy handles shipping at checkout. US orders typically arrive in 3–7 business days. International varies by destination." },
  { q: "Do you offer bulk / event pricing?", a: "Yes. For events, party favors, or resale orders of 20+, message us before purchasing and we'll work out a volume discount." },
];

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7.2" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.2" />
      <polyline points="5,8.5 7,10.5 11,6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center px-4 py-2.5 rounded-xl"
      style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "2px 2px 0 0 var(--ink)" }}
    >
      <span className="text-lg font-heading font-extrabold" style={{ color: "var(--text)", fontFamily: "var(--font-jetbrains)" }}>{value}</span>
      <span className="text-[0.65rem] mt-0.5 tracking-wide font-semibold" style={{ color: "var(--text-dim)" }}>{label}</span>
    </div>
  );
}

export default function Home() {
  const products = getProducts();
  const featured = getFeaturedProduct();
  const shop = getShop();
  const featuredImage = featured.images[0];
  const bestSellers = getBestSellers(6);
  const reviewQuotes = getReviewQuotes(3);

  return (
    <>
      <Nav />

      <main>
        {/* ──────────────── HERO ──────────────── */}
        <section className="relative px-5 pt-32 pb-16 overflow-hidden dot-grid" style={{ background: "var(--bg)" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="badge-accent mb-5">
                #1 Best Seller · {featured.favorites}+ favorites
              </span>

              <h1
                className="font-heading font-extrabold leading-[1.03] tracking-tight mb-5"
                style={{ fontSize: "clamp(2.5rem, 5.2vw, 3.75rem)", color: "var(--text)" }}
              >
                {featured.name}.{" "}
                <span style={{ color: "var(--accent)" }}>Built to hold up.</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-md" style={{ color: "var(--text-muted)" }}>
                {featured.tagline} Printed in-house in Blackwood, NJ and shipped fast.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-9">
                {featured.favorites && <StatPill value={`${featured.favorites}+`} label="Favorites" />}
                {shop.rating && <StatPill value={`${shop.rating}★`} label={`${shop.reviewCount ?? ""} reviews`} />}
                <StatPill value={featured.priceDisplay} label="Start at" />
                <StatPill value="1,207+" label="Total sales" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                <a href={featured.etsyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-base" style={{ padding: "1rem 2.1rem" }}>
                  Buy on Etsy — {featured.priceDisplay} →
                </a>
                <a href="/custom-print" className="btn-secondary text-base" style={{ padding: "1rem 1.85rem" }}>
                  Request Custom Print
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className="card p-5 sm:p-6 relative overflow-hidden"
                style={{ transform: "rotate(2deg)" }}
              >
                <div className="absolute top-4 right-4 z-10">
                  <span className="badge-secondary">Top Earner</span>
                </div>

                <div className="mb-5 relative w-full rounded-xl overflow-hidden placeholder-art" style={{ height: "260px" }}>
                  {featuredImage ? (
                    <Image src={featuredImage} alt={featured.name} fill sizes="480px" className="object-cover" priority />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <CategoryIcon category={featured.category} size={72} />
                    </div>
                  )}
                </div>

                <h3 className="font-heading font-extrabold text-xl mb-1" style={{ color: "var(--text)" }}>{featured.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  {featured.rating && <StarRating rating={featured.rating} />}
                  {featured.rating && <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{featured.rating}</span>}
                  {featured.reviewCount && <span className="text-xs" style={{ color: "var(--text-dim)" }}>({featured.reviewCount} reviews)</span>}
                </div>

                <ul className="space-y-2.5 mb-6">
                  {featured.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between pt-5" style={{ borderTop: "2px dashed var(--border-strong)" }}>
                  <div>
                    <p className="text-3xl font-heading font-extrabold" style={{ color: "var(--text)", fontFamily: "var(--font-jetbrains)" }}>{featured.priceDisplay}</p>
                    {featured.shipping && <p className="text-xs mt-0.5 font-semibold" style={{ color: "var(--text-dim)" }}>{featured.shipping}</p>}
                  </div>
                  <a
                    href={featured.etsyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                    style={{ padding: "0.65rem 1.25rem", minHeight: "40px", boxShadow: "2px 2px 0 0 var(--ink)" }}
                  >
                    Buy on Etsy →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── TRUST MARQUEE ──────────────── */}
        <TrustMarquee shop={shop} topFavorites={featured.favorites} />

        {/* ──────────────── BEST SELLERS (ranked by real 30-day revenue) ──────────────── */}
        <section id="best-sellers" className="px-5 py-20" style={{ background: "var(--bg-raised)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-4">
              <span className="badge mb-4 inline-flex">Ranked by real sales</span>
              <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", color: "var(--text)" }}>
                Best Sellers
              </h2>
              <p style={{ color: "var(--text-muted)" }}>
                The prints buyers keep coming back for — proven by real orders and reviews.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {bestSellers.map((p, i) => (
                <ProductCard key={p.slug} product={p} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── FULL CATALOG ──────────────── */}
        <section id="products" className="px-5 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", color: "var(--text)" }}>
                Shop the Full Catalog
              </h2>
              <p style={{ color: "var(--text-muted)" }}>Browse by category or see everything at once.</p>
            </div>

            <ProductGrid products={products} />

            <div className="text-center mt-10">
              <Link href="/products" className="btn-secondary text-sm">See full product catalog →</Link>
            </div>
          </div>
        </section>

        {/* ──────────────── CUSTOM PRINT CTA ──────────────── */}
        <section className="px-5 py-16 mx-4 sm:mx-6 lg:mx-auto rounded-3xl mb-4" style={{ maxWidth: "calc(80rem - 2rem)" }}>
          <div
            className="rounded-3xl px-6 sm:px-10 py-14 text-center"
            style={{ background: "var(--ink)", border: "2px solid var(--ink)" }}
          >
            <div className="max-w-2xl mx-auto">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "var(--accent)", border: "2px solid var(--bg)" }}
              >
                <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                  <rect x="8" y="24" width="24" height="10" rx="2" stroke="var(--ink)" strokeWidth="2" />
                  <path d="M12 24 V14 L20 8 L28 14 V24" stroke="var(--ink)" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="29" r="2" fill="var(--ink)" />
                </svg>
              </div>
              <h2 className="font-heading font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4.4vw, 2.5rem)", color: "var(--bg)" }}>
                Don&apos;t see what you need?
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(252,247,238,0.72)" }}>
                If it can be described, we can probably print it. Send a photo or sketch, and we&apos;ll quote you before we start printing.
              </p>
              <a href="/custom-print" className="btn-primary text-base" style={{ padding: "0.95rem 2.35rem" }}>
                Request a Custom Print →
              </a>
            </div>
          </div>
        </section>

        {/* ──────────────── HOW IT WORKS ──────────────── */}
        <section className="px-5 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", color: "var(--text)" }}>
                How It Works
              </h2>
              <p style={{ color: "var(--text-muted)" }}>Simple process, no nonsense.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.n} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0"
                    style={{ background: "var(--accent)", border: "2px solid var(--ink)", boxShadow: "2px 2px 0 0 var(--ink)" }}
                  >
                    <span className="font-heading font-extrabold text-sm" style={{ color: "var(--ink)" }}>{step.n}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base mb-2" style={{ color: "var(--text)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── HARDWARE ──────────────── */}
        <section className="px-5 py-16" style={{ background: "var(--bg-raised)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 1.875rem)", color: "var(--text)" }}>
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
                <div key={p.name} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "2px solid var(--ink)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--accent)", border: "2px solid var(--ink)" }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                      <rect x="4" y="14" width="16" height="7" rx="1.5" stroke="var(--ink)" strokeWidth="1.5" />
                      <path d="M7 14 V8 L12 4 L17 8 V14" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "var(--text)" }}>{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{p.material}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-5 font-semibold" style={{ color: "var(--text-dim)" }}>
              PETG primary · PLA available · AMS multi-color · Open to specialty materials
            </p>
          </div>
        </section>

        {/* ──────────────── REAL REVIEWS ──────────────── */}
        {reviewQuotes.length > 0 && (
          <section className="px-5 py-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", color: "var(--text)" }}>
                  What buyers are saying
                </h2>
                <p style={{ color: "var(--text-muted)" }}>Real reviews from real Etsy orders — not staged testimonials.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {reviewQuotes.map(({ product, review }, i) => (
                  <ReviewQuote key={`${product.slug}-${i}`} review={review} productName={product.name} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ──────────────── GALLERY CTA ──────────────── */}
        <section className="px-5 py-14 text-center" style={{ borderTop: "2px solid var(--ink)" }}>
          <div className="max-w-lg mx-auto">
            <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 1.875rem)", color: "var(--text)" }}>
              See our real product photos
            </h2>
            <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-muted)" }}>
              Every photo in our gallery is a real print, straight from the shop floor in Blackwood, NJ.
            </p>
            <a href="/gallery" className="btn-secondary text-sm">Browse Gallery →</a>
          </div>
        </section>

        {/* ──────────────── FAQ ──────────────── */}
        <section id="faq" className="px-5 py-20" style={{ borderTop: "2px solid var(--ink)" }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-extrabold mb-3" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", color: "var(--text)" }}>
                Common questions
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Can&apos;t find the answer? Message us on Etsy.</p>
            </div>

            <Faq items={FAQ} />
          </div>
        </section>

        {/* ──────────────── FINAL CTA ──────────────── */}
        <section className="px-5 py-24 text-center" style={{ borderTop: "2px solid var(--ink)" }}>
          <div className="max-w-lg mx-auto">
            <h2 className="font-heading font-extrabold mb-4" style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", color: "var(--text)" }}>
              Check out the full store
            </h2>
            <p className="leading-relaxed mb-8 text-base" style={{ color: "var(--text-muted)" }}>
              All products ship from {shop.location}. Star Seller, {shop.rating}★ rating, {shop.sales ? `${shop.sales.toLocaleString()}+ sales` : "hundreds of happy customers"}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={shop.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-base" style={{ padding: "0.95rem 2.35rem" }}>
                Visit Etsy Store
              </a>
              <a href="/gallery" className="btn-secondary text-base" style={{ padding: "0.95rem 2.1rem" }}>
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
