import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ProductGallery from "../../components/ProductGallery";
import ProductCard from "../../components/ProductCard";
import StarRating from "../../components/StarRating";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.fullTitle ?? product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.fullTitle ?? product.name,
      description: product.tagline,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);
  const reviews = (product.reviews ?? []).slice(0, 6);

  return (
    <>
      <Nav />

      <main>
        <section className="px-5 pt-28 pb-6">
          <div className="max-w-5xl mx-auto text-xs font-semibold" style={{ color: "var(--text-dim)" }}>
            <Link href="/products" style={{ color: "var(--text-muted)" }}>Products</Link>
            {" / "}
            <span>{product.category}</span>
            {" / "}
            <span style={{ color: "var(--text)" }}>{product.name}</span>
          </div>
        </section>

        <section className="px-5 pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* ── Gallery ── */}
            <div>
              <ProductGallery product={product} />
            </div>

            {/* ── Details ── */}
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="badge-secondary">{product.category}</span>
                {product.badges.map((b) => (
                  <span key={b} className="badge-accent">{b}</span>
                ))}
              </div>
              <h1 className="font-heading font-extrabold leading-[1.05] mb-3" style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)", color: "var(--text)" }}>
                {product.name}
              </h1>

              {(product.rating || product.reviewCount || product.favorites) && (
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  {product.rating && (
                    <span className="flex items-center gap-1.5">
                      <StarRating rating={product.rating} size={18} />
                      <span className="text-sm font-extrabold ml-1" style={{ color: "var(--text)" }}>{product.rating}</span>
                    </span>
                  )}
                  {product.reviewCount ? (
                    <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{product.reviewCount} reviews</span>
                  ) : null}
                  {product.favorites ? (
                    <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>· {product.favorites}+ favorites</span>
                  ) : null}
                </div>
              )}

              <div className="flex items-end gap-3 mb-6">
                <span className="price-tag">
                  <span className="text-3xl font-extrabold" style={{ color: "var(--ink)" }}>{product.priceDisplay}</span>
                </span>
                {product.shipping && <span className="text-sm mb-1 font-semibold" style={{ color: "var(--text-dim)" }}>{product.shipping}</span>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href={product.etsyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-base flex-1 justify-center" style={{ padding: "1rem 1.5rem" }}>
                  Buy on Etsy →
                </a>
                <a href="/custom-print" className="btn-secondary text-base flex-1 justify-center" style={{ padding: "1rem 1.5rem" }}>
                  Request a custom variation
                </a>
              </div>

              {product.features.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                        <circle cx="8" cy="8" r="7.2" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.2" />
                        <polyline points="5,8.5 7,10.5 11,6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="rounded-2xl p-5 mb-6" style={{ background: "var(--bg-card)", border: "2px solid var(--ink)" }}>
                <h2 className="font-heading font-extrabold text-base mb-2" style={{ color: "var(--text)" }}>Description</h2>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--text-muted)" }}>{product.description}</p>
              </div>

              {((product.specs && product.specs.length > 0) || (product.materials && product.materials.length > 0)) && (
                <div className="rounded-2xl p-5 mb-6" style={{ background: "var(--bg-card)", border: "2px solid var(--ink)" }}>
                  <h2 className="font-heading font-extrabold text-base mb-3" style={{ color: "var(--text)" }}>Specs</h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.materials && product.materials.length > 0 && (
                      <div>
                        <dt className="text-xs uppercase tracking-wide font-bold" style={{ color: "var(--text-dim)" }}>Material</dt>
                        <dd className="text-sm font-semibold mt-0.5" style={{ color: "var(--text)" }}>{product.materials.join(" / ")}</dd>
                      </div>
                    )}
                    {product.specs?.map((s) => (
                      <div key={s.label}>
                        <dt className="text-xs uppercase tracking-wide font-bold" style={{ color: "var(--text-dim)" }}>{s.label}</dt>
                        <dd className="text-sm font-semibold mt-0.5" style={{ color: "var(--text)" }}>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.slice(0, 8).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "var(--bg-raised)", color: "var(--text-muted)", border: "1.5px solid var(--border-strong)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Real reviews ── */}
        {reviews.length > 0 && (
          <section className="px-5 pb-20" style={{ borderTop: "2px solid var(--ink)" }}>
            <div className="max-w-5xl mx-auto pt-14">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                <h2 className="font-heading font-extrabold" style={{ fontSize: "clamp(1.4rem, 3vw, 1.875rem)", color: "var(--text)" }}>
                  What buyers say
                </h2>
                {product.rating && (
                  <span className="flex items-center gap-2">
                    <StarRating rating={product.rating} size={18} />
                    <span className="text-sm font-extrabold" style={{ color: "var(--text)" }}>{product.rating} · {product.reviewCount} reviews</span>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((r, i) => (
                  <div key={i} className="card p-5" style={{ background: "var(--bg-card)" }}>
                    {typeof r.rating === "number" && <div className="mb-2.5"><StarRating rating={r.rating} /></div>}
                    <p className="text-sm leading-relaxed font-medium mb-3" style={{ color: "var(--text)" }}>&ldquo;{r.text}&rdquo;</p>
                    <p className="text-xs font-bold" style={{ color: "var(--text-dim)" }}>
                      {r.author || "Verified Buyer"}{r.date ? ` · ${r.date}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="px-5 pb-20" style={{ borderTop: reviews.length > 0 ? undefined : "2px solid var(--ink)" }}>
            <div className="max-w-5xl mx-auto pt-4">
              <h2 className="font-heading font-extrabold mb-8 text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 1.875rem)", color: "var(--text)" }}>
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
