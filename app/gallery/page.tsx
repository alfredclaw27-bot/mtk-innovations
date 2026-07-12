import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GalleryGrid from "../components/GalleryGrid";
import { getProducts } from "@/lib/catalog";

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

export default function GalleryPage() {
  const products = getProducts();

  return (
    <>
      <Nav />

      <main>
        {/* ──────────────── HERO ──────────────── */}
        <section className="px-5 pt-32 pb-14 text-center dot-grid">
          <div className="max-w-xl mx-auto">
            <span className="badge mb-6 inline-flex">Real prints, real photos</span>
            <h1
              className="font-heading font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)", color: "var(--text)" }}
            >
              The Photo Wall
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Every image here is a real MTK Innovations print, pulled straight from our Etsy
              listings — not stock art. Tap any photo to see the full listing.
            </p>
          </div>
        </section>

        {/* ──────────────── PHOTO GRID ──────────────── */}
        <section className="px-5 pb-20">
          <div className="max-w-6xl mx-auto">
            <GalleryGrid products={products} />
          </div>
        </section>

        {/* ──────────────── BOTTOM CTA ──────────────── */}
        <section
          className="px-5 py-20 text-center"
          style={{ borderTop: "2px solid var(--ink)", background: "var(--bg-raised)" }}
        >
          <div className="max-w-xl mx-auto">
            <h2
              className="font-heading font-extrabold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text)" }}
            >
              Want something like this?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              Describe your idea or send a photo — we&apos;ll tell you if it&apos;s printable
              and give you a quote before we start.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/custom-print" className="btn-primary text-base" style={{ padding: "0.9rem 2.1rem" }}>
                Request Custom Print
              </a>
              <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base" style={{ padding: "0.9rem 1.85rem" }}>
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
