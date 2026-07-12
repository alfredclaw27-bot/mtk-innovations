import type { Shop } from "@/lib/types";

export default function TrustMarquee({ shop, topFavorites }: { shop: Shop; topFavorites?: number }) {
  const items = [
    shop.rating ? `★ ${shop.rating} average rating` : null,
    shop.reviewCount ? `${shop.reviewCount} reviews` : null,
    shop.sales ? `${shop.sales.toLocaleString()}+ sales` : null,
    shop.starSeller ? "Star Seller — all 3 badges" : null,
    `Ships from ${shop.location}`,
    topFavorites ? `${topFavorites}+ favorites on our #1 seller` : null,
    "4 years on Etsy",
    "PETG & multi-color AMS printing",
  ].filter((x): x is string => Boolean(x));

  const loop = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-3.5"
      style={{ background: "var(--ink)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}
    >
      <div className="marquee-track">
        {loop.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-sm font-bold whitespace-nowrap"
            style={{ color: "var(--bg)" }}
          >
            <span style={{ color: "var(--accent-light)" }}>●</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
