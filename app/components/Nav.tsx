"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Custom Print", href: "/custom-print" },
  { label: "About", href: "/about" },
];

// ─── Logo mark: rotated square with "M" ─────────────────────────────────────
function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 font-heading font-extrabold"
      style={{
        width: size,
        height: size,
        background: "var(--accent)",
        color: "var(--ink)",
        border: "2px solid var(--ink)",
        borderRadius: "0.5rem",
        transform: "rotate(-6deg)",
        fontSize: size * 0.52,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      M
    </span>
  );
}

// ─── Animated hamburger → X icon ─────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-[14px]" aria-hidden="true">
      <span
        className="absolute left-0 w-5 rounded-full transition-all duration-300 ease-in-out"
        style={{ height: "2px", background: "var(--ink)", top: open ? "6px" : "0px", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
      />
      <span
        className="absolute left-0 w-5 rounded-full transition-all duration-300 ease-in-out"
        style={{ height: "2px", background: "var(--ink)", top: "6px", opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)" }}
      />
      <span
        className="absolute left-0 w-5 rounded-full transition-all duration-300 ease-in-out"
        style={{ height: "2px", background: "var(--ink)", top: open ? "6px" : "12px", transform: open ? "rotate(-45deg)" : "rotate(0deg)" }}
      />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer on route change. Adjusted during render (not in an
  // effect) per React's "you might not need an effect" guidance for state that
  // depends on a changing prop, avoiding an extra cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <>
      {/* ─── Top bar ─── */}
      <nav
        role="navigation"
        aria-label="Main"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(252, 247, 238, 0.94)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "2px solid var(--ink)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-heading font-extrabold text-[1.05rem] tracking-tight" style={{ color: "var(--text)" }}>
            <LogoMark />
            <span>
              MTK<span style={{ color: "var(--accent)" }}>Innovations</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-bold transition-colors duration-200"
                style={{ color: isActive(l.href) ? "var(--accent)" : "var(--text)" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={ETSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ minHeight: "38px", padding: "0.5rem 1.15rem", fontSize: "0.85rem", boxShadow: "2px 2px 0 0 var(--ink)" }}
            >
              Etsy Store
            </a>
          </div>

          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200"
            style={{ background: open ? "var(--bg-raised)" : "transparent" }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </nav>

      {/* ─── Backdrop ─── */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          background: "rgba(26, 19, 13, 0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ─── Mobile drawer ─── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
        style={{
          background: "var(--bg-card)",
          borderLeft: "2px solid var(--ink)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="h-16 flex items-center justify-between px-5 shrink-0" style={{ borderBottom: "2px solid var(--ink)" }}>
          <Link href="/" onClick={() => setOpen(false)} className="font-heading font-extrabold text-[1rem]" style={{ color: "var(--text)" }}>
            MTK<span style={{ color: "var(--accent)" }}>Innovations</span>
          </Link>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg text-lg transition-colors duration-200"
            style={{ color: "var(--text)", background: "var(--bg-raised)" }}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center h-12 px-3 rounded-xl text-[0.95rem] font-bold transition-all duration-200"
              style={{
                color: isActive(l.href) ? "var(--accent-dark)" : "var(--text)",
                background: isActive(l.href) ? "var(--accent-subtle)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="p-5 shrink-0" style={{ borderTop: "2px solid var(--ink)" }}>
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full" onClick={() => setOpen(false)}>
            Visit Etsy Store →
          </a>
          <p className="text-center mt-3 text-xs font-semibold" style={{ color: "var(--text-dim)" }}>
            Star Seller · 4.9★ · Blackwood, NJ
          </p>
        </div>
      </div>
    </>
  );
}
