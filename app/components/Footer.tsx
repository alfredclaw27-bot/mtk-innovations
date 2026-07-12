// Static shop facts (not a live data read) — this component is rendered from both
// server pages and the client "use client" custom-print page, so it must not import
// lib/catalog.ts (server-only, reads fs) or the client bundle build will fail.
const SHOP = {
  location: "Blackwood, NJ",
  rating: 4.9,
  reviewCount: 357,
  sales: 1207,
  starSeller: true,
};

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

const FOOTER_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Custom Print", href: "/custom-print" },
  { label: "About", href: "/about" },
  { label: "Etsy Store ↗", href: ETSY_URL, external: true },
];

export default function Footer() {
  const shop = SHOP;

  return (
    <footer style={{ background: "var(--ink)", color: "var(--bg)", borderTop: "2px solid var(--ink)" }}>
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr_1fr] gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="inline-flex items-center justify-center shrink-0 font-heading font-extrabold"
                style={{
                  width: 30,
                  height: 30,
                  background: "var(--accent)",
                  color: "var(--ink)",
                  border: "2px solid var(--bg)",
                  borderRadius: "0.5rem",
                  transform: "rotate(-6deg)",
                  fontSize: 16,
                }}
                aria-hidden="true"
              >
                M
              </span>
              <span className="font-heading font-extrabold text-base">
                MTK<span style={{ color: "var(--accent-light)" }}>Innovations</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(252,247,238,0.65)" }}>
              3D printed products, designed and shipped from {shop.location}. Star Seller on Etsy —
              {shop.rating ? ` ${shop.rating}★` : ""}{shop.reviewCount ? ` across ${shop.reviewCount} reviews` : ""}.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent-light)" }}>
              Explore
            </p>
            <nav className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
                  style={{ color: "rgba(252,247,238,0.75)" }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent-light)" }}>
              The shop
            </p>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "rgba(252,247,238,0.75)" }}>
              <li>⭐ Star Seller · {shop.starSeller ? "all 3 badges" : "Etsy"}</li>
              {shop.rating && <li>{shop.rating}★ average rating</li>}
              {shop.sales && <li>{shop.sales.toLocaleString()}+ sales</li>}
              <li>📍 {shop.location}</li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs"
          style={{ borderTop: "1px solid rgba(252,247,238,0.15)", color: "rgba(252,247,238,0.45)" }}
        >
          <p>© {new Date().getFullYear()} MTK Innovations · Blackwood, NJ</p>
          <p>Every order ships from a real print shop, not a warehouse.</p>
        </div>
      </div>
    </footer>
  );
}
