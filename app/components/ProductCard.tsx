import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import CategoryIcon from "./CategoryIcon";
import StarRating from "./StarRating";

export default function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card group flex flex-col overflow-hidden relative"
      style={{ padding: 0 }}
    >
      {typeof rank === "number" && (
        <span
          className="absolute -top-3 -left-3 z-20 flex items-center justify-center font-heading font-extrabold"
          style={{
            width: 40,
            height: 40,
            background: "var(--ink)",
            color: "var(--accent)",
            border: "2px solid var(--ink)",
            borderRadius: "0.65rem",
            fontSize: "1.05rem",
            transform: "rotate(-5deg)",
            boxShadow: "2px 2px 0 0 var(--accent)",
          }}
        >
          {rank}
        </span>
      )}

      <div className="relative h-48 sm:h-56 overflow-hidden placeholder-art">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <CategoryIcon category={product.category} size={56} />
          </div>
        )}
        {product.badges[0] && (
          <span
            className="absolute top-3 right-3 badge-accent"
          >
            {product.badges[0]}
          </span>
        )}
        <span className="absolute -bottom-0 left-3 translate-y-1/2 price-tag">
          <span className="font-extrabold text-sm" style={{ color: "var(--ink)" }}>{product.priceDisplay}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-6">
        <p className="text-[0.65rem] font-bold tracking-widest uppercase mb-1.5" style={{ color: "var(--text-dim)" }}>
          {product.category}
        </p>
        <h3 className="font-heading font-extrabold text-lg mb-1.5 leading-snug" style={{ color: "var(--text)" }}>
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <StarRating rating={product.rating} />
            <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{product.rating}</span>
            {product.reviewCount ? (
              <span className="text-xs" style={{ color: "var(--text-dim)" }}>({product.reviewCount})</span>
            ) : null}
          </div>
        )}

        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>
          {product.tagline}
        </p>

        <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: "2px dashed var(--border-strong)" }}>
          <span className="text-xs font-semibold" style={{ color: "var(--text-dim)" }}>
            {product.shipping ?? "Ships from NJ"}
          </span>
          <span className="text-xs font-extrabold" style={{ color: "var(--accent-dark)" }}>
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
