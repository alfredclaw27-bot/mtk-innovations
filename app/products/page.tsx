import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse the full MTK Innovations catalog — game accessories, home & mail products, pool parts, custom prints, and digital STL files. Star Seller on Etsy.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <>
      <Nav />

      <main>
        <section className="px-5 pt-32 pb-14 text-center dot-grid">
          <div className="max-w-xl mx-auto">
            <span className="badge mb-6 inline-flex">Full Catalog · {products.length} products</span>
            <h1 className="font-heading font-extrabold leading-tight mb-4" style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)", color: "var(--text)" }}>
              All Products
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Every item MTK Innovations makes, mirrored from Etsy with richer photos and detail.
              Filter by category or browse everything at once.
            </p>
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="max-w-5xl mx-auto">
            <ProductGrid products={products} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
