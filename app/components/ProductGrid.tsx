"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="text-sm px-4 py-2 rounded-full transition-all duration-200 cursor-pointer font-bold"
            style={
              active === cat
                ? { background: "var(--accent)", color: "var(--accent-ink)", border: "2px solid var(--ink)", boxShadow: "2px 2px 0 0 var(--ink)" }
                : { background: "var(--bg-card)", color: "var(--text)", border: "2px solid var(--border-strong)" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16" style={{ color: "var(--text-dim)" }}>
          No products in this category yet.
        </div>
      )}
    </div>
  );
}
