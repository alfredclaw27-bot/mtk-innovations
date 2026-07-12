"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import CategoryIcon from "./CategoryIcon";

type Slide = { type: "image"; src: string } | { type: "video"; src: string };

export default function ProductGallery({ product }: { product: Product }) {
  const slides: Slide[] = [
    ...product.images.map((src): Slide => ({ type: "image", src })),
    ...product.videos.map((src): Slide => ({ type: "video", src })),
  ];

  const [active, setActive] = useState(0);
  const current = slides[active];

  return (
    <div>
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden placeholder-art mb-3 sticker-shadow">
        {!current && (
          <div className="flex h-full items-center justify-center">
            <CategoryIcon category={product.category} size={96} />
          </div>
        )}
        {current?.type === "image" && (
          <Image
            src={current.src}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
            priority
          />
        )}
        {current?.type === "video" && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={current.src}
            src={current.src}
            controls
            className="h-full w-full object-cover"
            aria-label={`${product.name} video`}
          />
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {slides.map((slide, i) => (
            <button
              key={`${slide.type}-${slide.src}`}
              onClick={() => setActive(i)}
              className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all cursor-pointer"
              style={{
                border: `2px solid var(--ink)`,
                boxShadow: i === active ? "2px 2px 0 0 var(--accent)" : "none",
                opacity: i === active ? 1 : 0.6,
              }}
              aria-label={`Show ${slide.type} ${i + 1}`}
            >
              {slide.type === "image" ? (
                <Image src={slide.src} alt="" fill sizes="64px" className="object-cover" />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ background: "var(--bg-raised)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <polygon points="6,4 20,12 6,20" fill="var(--accent)" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
