const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Custom Print", href: "/custom-print" },
  { label: "Etsy Store ↗", href: ETSY_URL, external: true },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div
        className="max-w-5xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polygon
              points="12,2 21.4,7 21.4,17 12,22 2.6,17 2.6,7"
              fill="rgba(217,140,46,0.18)"
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="font-heading font-bold text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            MTK<span style={{ color: "var(--text)" }}>Innovations</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs order-last sm:order-none" style={{ color: "var(--text-dim)" }}>
          © {new Date().getFullYear()} MTK Innovations · Blackwood, NJ
        </p>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-5">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-xs transition-colors duration-200"
              style={{ color: "var(--text-dim)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
