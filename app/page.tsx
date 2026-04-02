const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

const printers = [
  { name: "Prusa MK2.5S", material: "PETG & PLA", icon: "🖨️" },
  { name: "Bambu Lab P2S + AMS", material: "Multi-color PETG & PLA", icon: "🎨" },
];

const products = [
  {
    id: "physical-prints",
    name: "Custom 3D Prints",
    tagline: "Your design. Printed. Shipped.",
    desc: "From a sketch, photo, or idea — we turn it into a real part. Personalized models, replacement pieces, decorative prints, party favors, and more. Every print is checked before it ships.",
    emoji: "🖨️",
    startingPrice: "From $10",
    tag: "Physical Print",
    features: [
      "Send a photo, sketch, or description",
      "Most jobs ship within 48 hours",
      "Wide range of materials & colors",
      "Replacements for broken parts",
      "Perfect for parties & events",
    ],
    cta: "Request a Custom Print",
  },
  {
    id: "digital-designs",
    name: "3D Model Files",
    tagline: "Instant download. Print anytime.",
    desc: "Custom 3D design files delivered instantly. STL, OBJ, and more — ready to print on your own 3D printer. Personalized with your text, names, or specifications.",
    emoji: "📁",
    startingPrice: "From $5",
    tag: "Digital Download",
    features: [
      "Instant delivery after purchase",
      " STL, OBJ, and common formats",
      "Personalized with your text/names",
      "Print unlimited copies",
      "Commercial use available",
    ],
    cta: "Browse Digital Designs",
  },
  {
    id: "pool-parts",
    name: "Pool & Spa Parts",
    tagline: "Hard-to-find replacements, printed to fit.",
    desc: "Functional replacement parts for pool and spa equipment. The Pool Valve Knob — easier to turn, built to last. Send measurements for other custom pool part needs.",
    emoji: "🏊",
    startingPrice: "From $12",
    tag: "Functional Part",
    features: [
      "Pool valve knobs & handles",
      "Custom measurements accepted",
      "Durable, pool-safe materials",
      "Designed to fit common fittings",
      "Replacements for discontinued parts",
    ],
    cta: "Shop Pool Parts",
  },
  {
    id: "bulk-orders",
    name: "Bulk & Commercial",
    tagline: "Events, resale, and bulk orders.",
    desc: "Need 50 custom party favors? Running a retail shop? We handle commercial and bulk orders with volume pricing. Custom packaging available.",
    emoji: "📦",
    startingPrice: "Custom quote",
    tag: "Commercial",
    features: [
      "Volume discounts",
      "Custom packaging & branding",
      "Event favors & giveaway items",
      "Retail & resale orders",
      "Consistent quality, every batch",
    ],
    cta: "Request Bulk Pricing",
  },
];

const trustSignals = [
  { metric: "112+", label: "Happy Customers" },
  { metric: "4.8★", label: "Etsy Rating" },
  { metric: "⭐", label: "Star Seller" },
  { metric: "48h", label: "Avg. Turnaround" },
];

const process = [
  {
    step: "1",
    title: "Send Your Idea",
    desc: "A photo, sketch, or description — whatever you have. The more detail, the better the result.",
  },
  {
    step: "2",
    title: "We Design It",
    desc: "We create or adapt a 3D model to match your specs. You'll get a preview before printing.",
  },
  {
    step: "3",
    title: "We Print It",
    desc: "Your design is printed with quality materials. Every piece is inspected before shipping.",
  },
  {
    step: "4",
    title: "It Ships Fast",
    desc: "Packed carefully and shipped to your door. Most orders go out within 48 hours.",
  },
];

const faq = [
  {
    q: "What file formats do you support?",
    a: "For digital files, we deliver STL, OBJ, and STEP formats — compatible with most 3D printers and design software. For custom prints, describe what you need and we'll figure out the right approach.",
  },
  {
    q: "Can you match a broken or discontinued part?",
    a: "Often yes. If you can send us the original part (or good photos with measurements), we can usually reverse-engineer a replacement. Best for pool/spa parts, appliance components, and custom knobs.",
  },
  {
    q: "What's the typical turnaround?",
    a: "Most custom print jobs ship within 48 hours of design approval. Digital files are delivered instantly after purchase. Complex or large prints may take an extra day or two.",
  },
  {
    q: "Do you offer refunds or revisions?",
    a: "We want you happy with the result. If a print doesn't match the agreed design or arrives damaged, we'll reprint it. For digital files, all sales are final due to the nature of downloadable products.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-2xl">⚙️</span>
            <span>MTK<span className="text-orange-400">Innovations</span></span>
          </a>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#process" className="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">
              Etsy Store
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)",
          }}
        />

        {/* Trust bar */}
        <div className="relative z-10 flex flex-wrap justify-center gap-6 mb-10">
          {trustSignals.map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="font-bold text-white text-base">{t.metric}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-2xl">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
            Star Seller · 4.8★ · 112+ Reviews
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Custom 3D Prints,
            <br />
            <span className="text-zinc-400">Done Right</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
            Send us your idea — a photo, a sketch, or just a description. We design it, print it, and ship it. Custom parts, personalized gifts, and hard-to-find replacements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4">
              Shop on Etsy
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </a>
            <a href="#products" className="btn-secondary text-lg px-8 py-4">
              See All Products
            </a>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="products" className="px-6 py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">What We Make</h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Custom 3D prints for every need — personalized gifts, functional replacements, and digital design files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.id} className="card flex flex-col p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{p.emoji}</span>
                <div>
                  <span className="text-xs font-medium tracking-wider uppercase text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                    {p.tag}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
              <p className="text-orange-400 font-medium text-sm mb-4">{p.tagline}</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>

              <ul className="space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                <span className="text-sm text-zinc-500">Starting {p.startingPrice}</span>
                <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 px-4">
                  {p.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-zinc-500 mb-4">Don&apos;t see what you need? We do custom requests.</p>
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Request a Custom Order
          </a>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="px-6 py-24 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-zinc-400">From idea to doorstep — simple, fast, reliable.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / OUR SETUP ─── */}
      <section className="px-6 py-20 bg-zinc-950/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Who&apos;s Behind This</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            MTK Innovations is Mike — a software engineer by trade, a maker by necessity. After years wrestling with broken third-party tools and 3D prints that didn&apos;t fit anything, he started building his own. Every print is made with care in Blackwood, NJ.
          </p>
          <p className="text-lg font-medium text-zinc-200 mb-8">
            Made by an engineer, for everyone.
          </p>

          {/* Printers */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-orange-400 mb-4 text-center">
              ⚙️ Our Printers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {printers.map((p) => (
                <div key={p.name} className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-zinc-500 text-xs">{p.material}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-xs text-center mt-4">
              PETG primary · PLA available · AMS multi-color capable · Open to specialty materials
            </p>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316" strokeWidth="1" className="text-orange-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <blockquote className="text-xl font-medium mb-4 leading-snug">
            &ldquo;Exactly what I needed. My pool valve knob was discontinued everywhere — Mike printed a replacement that fits perfectly.&rdquo;
          </blockquote>
          <p className="text-zinc-500 text-sm">— Verified Etsy Buyer</p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="px-6 py-24 max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Common Questions</h2>
          <p className="text-zinc-400">Quick answers. Reach out anytime for more.</p>
        </div>

        <div className="space-y-6">
          {faq.map((item) => (
            <div key={item.q} className="border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">{item.q}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="px-6 py-24 text-center border-t border-zinc-800">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Browse the Etsy store or request a custom order. New items listed regularly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4">
              Visit Etsy Store
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <span>MTK<span className="text-zinc-400">Innovations</span></span>
          </div>
          <p>© {new Date().getFullYear()} MTK Innovations. All rights reserved. · Blackwood, NJ</p>
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
            Etsy Shop ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
