"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

const NAV_LINKS = [
  { label: "Products", href: "/#products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Custom Print", href: "/custom-print" },
];

// ─── Hex logo mark ────────────────────────────────────────────────────────────
function HexMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon
        points="12,2 21.4,7 21.4,17 12,22 2.6,17 2.6,7"
        fill="rgba(217,140,46,0.18)"
        stroke="var(--gold)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points="12,6.5 17.5,9.75 17.5,16.25 12,19.5 6.5,16.25 6.5,9.75"
        fill="var(--gold)"
        opacity="0.25"
      />
    </svg>
  );
}

// ─── Animated hamburger → X icon ─────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-[14px]" aria-hidden="true">
      <span
        className="absolute left-0 w-5 rounded-full transition-all duration-300 ease-in-out"
        style={{
          height: "1.5px",
          background: "var(--text)",
          top: open ? "6px" : "0px",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
      />
      <span
        className="absolute left-0 w-5 rounded-full transition-all duration-300 ease-in-out"
        style={{
          height: "1.5px",
          background: "var(--text)",
          top: "6px",
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0)" : "scaleX(1)",
        }}
      />
      <span
        className="absolute left-0 w-5 rounded-full transition-all duration-300 ease-in-out"
        style={{
          height: "1.5px",
          background: "var(--text)",
          top: open ? "6px" : "12px",
          transform: open ? "rotate(-45deg)" : "rotate(0deg)",
        }}
      />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/gallery") return pathname === "/gallery";
    if (href === "/custom-print") return pathname === "/custom-print";
    return false;
  };

  return (
    <>
      {/* ─── Top bar ─── */}
      <nav
        role="navigation"
        aria-label="Main"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(13, 10, 8, 0.96)"
            : "rgba(13, 10, 8, 0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-heading font-bold text-[1.05rem] tracking-tight"
            style={{ color: "var(--text)" }}
          >
            <HexMark />
            <span>
              MTK<span style={{ color: "var(--gold)" }}>Innovations</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive(l.href) ? "var(--text)" : "var(--text-muted)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={ETSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ minHeight: "36px", padding: "0.45rem 1.1rem", fontSize: "0.85rem" }}
            >
              Etsy Store
            </a>
          </div>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200"
            style={{ background: open ? "var(--bg-card)" : "transparent" }}
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
          background: "rgba(13, 10, 8, 0.72)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ─── Mobile drawer (slides in from right) ─── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
        style={{
          background: "var(--bg-card)",
          borderLeft: "1px solid var(--border)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Drawer header */}
        <div
          className="h-16 flex items-center justify-between px-5 shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-heading font-bold text-[1rem]"
            style={{ color: "var(--text)" }}
          >
            MTK<span style={{ color: "var(--gold)" }}>Innovations</span>
          </Link>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg text-lg transition-colors duration-200"
            style={{ color: "var(--text-muted)", background: "var(--bg)" }}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center h-12 px-3 rounded-xl text-[0.95rem] font-medium transition-all duration-200"
              style={{
                color: isActive(l.href) ? "var(--gold)" : "var(--text-muted)",
                background: isActive(l.href) ? "var(--gold-subtle)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="p-5 shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href={ETSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
            onClick={() => setOpen(false)}
          >
            Visit Etsy Store →
          </a>
          <p className="text-center mt-3 text-xs" style={{ color: "var(--text-dim)" }}>
            Star Seller · 4.8★ · Blackwood, NJ
          </p>
        </div>
      </div>
    </>
  );
}
