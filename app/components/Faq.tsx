"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={item.q} className="rounded-xl overflow-hidden" style={{ border: "2px solid var(--ink)", background: "var(--bg-card)" }}>
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 cursor-pointer"
            style={{ background: open === i ? "var(--accent-subtle)" : "transparent", color: "var(--text)" }}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-bold text-sm">{item.q}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", color: "var(--text-dim)" }}
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
              <div className="pt-3">{item.a}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
