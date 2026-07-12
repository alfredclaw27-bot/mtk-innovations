"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryIcon from "./CategoryIcon";
import type { Product } from "@/lib/types";

type GalleryPhoto = {
  key: string;
  slug: string;
  name: string;
  category: string;
  src?: string;
  favorites?: number;
  rating?: number;
};

export default function GalleryGrid({ products }: { products: Product[] }) {
  const photos: GalleryPhoto[] = useMemo(
    () =>
      products.map((p) => ({
        key: p.slug,
        slug: p.slug,
        name: p.name,
        category: p.category,
        src: p.images[0],
        favorites: p.favorites,
        rating: p.rating,
      })),
    [products]
  );

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="text-sm px-4 py-2 rounded-full transition-all duration-200 font-bold cursor-pointer"
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

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
        {filtered.map((photo) => (
          <Link
            key={photo.key}
            href={`/products/${photo.slug}`}
            className="group block mb-4 break-inside-avoid rounded-2xl overflow-hidden relative"
            style={{ border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
          >
            <div className="relative w-full placeholder-art" style={{ aspectRatio: "1 / 1" }}>
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <CategoryIcon category={photo.category} size={48} />
                </div>
              )}
              <div
                className="absolute inset-x-0 bottom-0 px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "linear-gradient(0deg, rgba(26,19,13,0.88) 0%, transparent 100%)" }}
              >
                <p className="text-xs font-extrabold" style={{ color: "var(--bg)" }}>{photo.name}</p>
                <p className="text-[0.65rem] font-semibold" style={{ color: "rgba(252,247,238,0.75)" }}>
                  {photo.rating ? `★ ${photo.rating}` : photo.category}
                  {photo.favorites ? ` · ${photo.favorites}+ favs` : ""}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20" style={{ color: "var(--text-dim)" }}>
          No items in this category yet.
        </div>
      )}
    </div>
  );
}
