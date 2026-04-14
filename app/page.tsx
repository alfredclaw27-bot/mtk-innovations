const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

const printers = [
  { name: "Prusa MK2.5S", material: "PETG & PLA", icon: "🖨️" },
  { name: "Bambu Lab P2S + AMS", material: "Multi-color PETG & PLA", icon: "🎨" },
];

// ─── Best Sellers — pulled from live Etsy store ───────────────────────────
const bestSellers = [
  {
    id: "hive-board",
    name: "Hive Game Board",
    emoji: "🎲",
    tag: "Best Seller",
    tagline: "The board game upgrade your Hive game deserves.",
    desc: "A precision-printed grid frame that holds your Hive pieces perfectly in place during play. No more scattered bugs, no more sliding tiles. Fits all standard Hive tiles. Ships assembled, ready to roll.",
    price: "$9.95",
    priceSub: "+ shipping",
    reviews: "225+ favorites",
    rating: "4.8★",
    why: "Hive players spend more on the game itself than on the setup. Most play on improvised surfaces. This fixes that — and makes the game genuinely better.",
    badge: "🏆 #1 Best Seller",
    cta: "Buy on Etsy →",
    url: "https://www.etsy.com/listing/1614563050",
  },
  {
    id: "mailbox-flag",
    name: "Outgoing Mail Flag",
    emoji: "📬",
    tag: "Best Seller",
    tagline: "The mail flag that actually stays put.",
    desc: "Magnetic townhouse mailbox flag — no screws, no adhesives, no hassle. Clips right onto your mailbox and stays put through wind, rain, and everyday use. Fits most standard townhouse mailboxes. 3D printed in durable PETG.",
    price: "$6.99",
    priceSub: "+ shipping",
    reviews: "141+ favorites",
    rating: "4.8★",
    why: "Every townhouse mailbox owner knows: the flag never stays up. This is a $7 fix that actually works.",
    badge: "🏆 Top Seller",
    cta: "Buy on Etsy →",
    url: "https://www.etsy.com/listing/1230849913",
  },
];

const otherProducts = [
  {
    id: "pool-valve-knob",
    name: "Pool Valve Knob Replacement",
    emoji: "🏊",
    tag: "Functional Part",
    tagline: "The discontinued part you can't find anywhere else.",
    desc: "3D printed pool valve handle that fits most standard pool/spa valves. If you've been searching for a replacement and coming up empty — this is why. PETG construction stands up to chemicals and sun. Send us your old knob or measurements and we'll confirm fit.",
    price: "From $12",
    priceSub: "+ shipping",
    why: "Pool equipment manufacturers discontinue parts constantly. If you need a replacement, you're probably stuck. We can reverse-engineer from a photo.",
    cta: "Request on Etsy →",
    url: "https://www.etsy.com/shop/MTKInnovations",
  },
  {
    id: "custom-print",
    name: "Custom 3D Print",
    emoji: "🖨️",
    tag: "Custom Work",
    tagline: "You describe it. We print it. Ship it.",
    desc: "Send a photo, sketch, or even just a description. We design it, print it, and ship it. Personalized gifts, replacement parts, custom favors, architectural models — if you can describe it, we can probably make it.",
    price: "From $10",
    priceSub: "based on complexity",
    features: ["Send a photo, sketch, or description", "Most jobs ship within 48 hours", "PETG, PLA, or multi-color options", "Custom sizing and measurements"],
    cta: "Request Custom Print →",
    url: "https://www.etsy.com/shop/MTKInnovations",
  },
  {
    id: "digital-files",
    name: "3D Model Files (STL)",
    emoji: "📁",
    tag: "Digital Download",
    tagline: "Instant download. Print it yourself.",
    desc: "STL files delivered instantly after purchase. Print unlimited copies on your own 3D printer. Files are personalized with your requested text/names. Perfect for resale, events, or personal use.",
    price: "From $5",
    priceSub: "instant download",
    features: ["Instant delivery", "STL + OBJ formats", "Personalized text/names", "Unlimited prints"],
    cta: "Browse Files →",
    url: "https://www.etsy.com/shop/MTKInnovations",
  },
];

const trustSignals = [
  { metric: "225+", label: "Favorites (Hive Board)" },
  { metric: "141+", label: "Favorites (Mailbox Flag)" },
  { metric: "4.8★", label: "Etsy Rating" },
  { metric: "⭐", label: "Star Seller" },
  { metric: "48h", label: "Avg. Turnaround" },
];

const process = [
  {
    step: "1",
    title: "Pick a product",
    desc: "Choose from our best sellers or describe what you need.",
  },
  {
    step: "2",
    title: "We print it",
    desc: "Made on a Prusa MK2.5S or Bambu Lab P2S with AMS for multi-color.",
  },
  {
    step: "3",
    title: "Inspected",
    desc: "Every piece checked before it ships.",
  },
  {
    step: "4",
    title: "At your door",
    desc: "Packed carefully and shipped from Blackwood, NJ.",
  },
];

const faq = [
  {
    q: "Will the Hive Game Board fit my tiles?",
    a: "The board is sized for standard Hive tokens (approximately 50mm hex tiles). It works with all standard Hive sets. If you have an unusual variant, message us before ordering and we'll confirm.",
  },
  {
    q: "What mailbox models does the flag fit?",
    a: "The magnetic flag is designed for most standard townhouse/jumbo mailboxes. It clips onto the side panel magnetically. If you're unsure whether it'll fit your mailbox, send us a photo and we'll tell you.",
  },
  {
    q: "Can you make a custom part for my mailbox / pool / appliance?",
    a: "Yes. Send us a photo of the part you need, plus any measurements you can take. We'll tell you if it's feasible and give you a quote before printing anything.",
  },
  {
    q: "What material do you print in?",
    a: "Primary material is PETG for durability (outdoor-friendly, chemical-resistant). PLA is used for some color jobs. The Bambu Lab P2S with AMS allows multi-color printing on most items.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. Etsy handles shipping at checkout. US orders typically arrive in 3–7 business days. International varies by country.",
  },
  {
    q: "Do you offer bulk / event pricing?",
    a: "Yes. For events, party favors, or resale orders of 20+, contact us before purchasing and we'll work out a volume discount.",
  },
];

const nicheIdeas = [
  {
    title: "📐 Coasters / Drink Holders",
    desc: "Custom coasters with monograms, logos, or bar themes. Easy print, high perceived value.",
    profit: "~$3–5 cost → $12–18 selling",
    effort: "Low",
  },
  {
    title: "🎁 Personalized Keychains",
    desc: "Names, dates, logos. Use AMS for multi-color. Sold in pairs or sets.",
    profit: "~$1 cost → $8–12 selling",
    effort: "Low",
  },
  {
    title: "🏠 Home Organization Labels",
    desc: "Label holders for kitchen/garage/basement bins. Sell in packs of 10–20.",
    profit: "~$2 material → $10–15 pack",
    effort: "Low",
  },
  {
    title: "🧩 Replacement Board Game Parts",
    desc: "Missing a Jenga block? Lost a chess piece? People pay $5–15 for single replacements.",
    profit: "~$0.50 cost → $8–12 each",
    effort: "Very Low",
  },
  {
    title: "🏕️ Outdoor Gear Parts",
    desc: "Tent pole connectors, utility clips, gear hooks. PETG handles outdoor use perfectly.",
    profit: "Varies — $8–25 range",
    effort: "Medium",
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
            <a href="#bestsellers" className="hover:text-white transition-colors">Best Sellers</a>
            <a href="#more" className="hover:text-white transition-colors">More Products</a>
            <a href="#new" className="hover:text-white transition-colors">New Ideas</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">
              Etsy Store
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
            ⭐ Star Seller · 4.8★ · Made in Blackwood, NJ
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            3D Printed Products
            <br />
            <span className="text-zinc-400">That Actually Work</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Game board upgrades, mailbox fixes, pool replacements, and custom prints — made with care on a Prusa MK2.5S and Bambu Lab P2S.
          </p>

          {/* Mini stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-zinc-400">
            <span className="bg-zinc-800/60 px-3 py-1.5 rounded-lg">🎲 Hive Board — 225+ favorites</span>
            <span className="bg-zinc-800/60 px-3 py-1.5 rounded-lg">📬 Mailbox Flag — 141+ favorites</span>
            <span className="bg-zinc-800/60 px-3 py-1.5 rounded-lg">⭐ 4.8★ rating</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#bestsellers" className="btn-primary text-lg px-8 py-4">
              See Best Sellers
            </a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-8 py-4">
              Etsy Store →
            </a>
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─── */}
      <section id="bestsellers" className="px-6 py-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-orange-500/10 text-orange-400 rounded-full">
            🏆 Best Sellers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Everyone&apos;s Buying</h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            These are the products that moved MTK Innovations to Star Seller status. Real tools, real fixes, real satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {bestSellers.map((p) => (
            <div key={p.id} className="card flex flex-col p-8 relative overflow-hidden">
              {/* badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  {p.badge}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{p.emoji}</span>
              </div>

              <div className="mb-4">
                <span className="text-xs font-medium tracking-wider uppercase text-zinc-500">{p.tag}</span>
              </div>

              <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
              <p className="text-orange-400 font-medium text-sm mb-4">{p.tagline}</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>

              {/* why it's great */}
              <div className="bg-zinc-800/40 rounded-lg p-3 mb-6">
                <p className="text-xs text-zinc-500 mb-1">Why people buy it</p>
                <p className="text-sm text-zinc-300">{p.why}</p>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-zinc-400">
                <span className="font-bold text-2xl text-white">{p.price}</span>
                <span className="text-zinc-500">{p.priceSub}</span>
              </div>

              <div className="flex gap-3 items-center mb-6">
                <span className="text-sm text-zinc-500">{p.reviews}</span>
                <span className="text-zinc-700">·</span>
                <span className="text-sm text-zinc-500">{p.rating}</span>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-800">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center block py-3">
                  {p.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MORE PRODUCTS ─── */}
      <section id="more" className="px-6 py-20 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">More Products</h2>
            <p className="text-zinc-400">Replacement parts, custom work, and digital files.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <div key={p.id} className="card flex flex-col p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className="text-xs font-medium tracking-wider uppercase text-zinc-600">{p.tag}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-orange-400 font-medium text-sm mb-3">{p.tagline}</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                {p.features && (
                  <ul className="space-y-1 mb-4">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-auto">
                  <span className="text-sm font-bold text-zinc-300">{p.price}</span>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 px-3">
                    {p.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW PRODUCT IDEAS ─── */}
      <section id="new" className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-blue-500/10 text-blue-400 rounded-full">
            💡 Expand Your Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Easy New Products to Add</h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Low-cost, high-margin ideas that complement your existing setup. All print-ready, minimal design work needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {nicheIdeas.map((n) => (
            <div key={n.title} className="card p-5">
              <h3 className="font-semibold text-base mb-2">{n.title}</h3>
              <p className="text-zinc-400 text-sm mb-3 leading-relaxed">{n.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-orange-400 font-medium">{n.profit}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  n.effort === "Very Low" ? "bg-green-500/10 text-green-400" :
                  n.effort === "Low" ? "bg-blue-500/10 text-blue-400" :
                  "bg-yellow-500/10 text-yellow-400"
                }`}>
                  {n.effort} effort
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <p className="text-zinc-400 text-sm mb-3">Want help designing or listing any of these?</p>
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            Message us on Etsy →
          </a>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="px-6 py-20 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-zinc-400">Simple, fast, no nonsense.</p>
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

      {/* ─── PRINTERS ─── */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Made With Serious Hardware</h2>
          <p className="text-zinc-400 mb-8">
            Every print is made in-house on equipment that actually produces reliable, clean results — not a budget printer held together with hope.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {printers.map((p) => (
              <div key={p.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4">
                <span className="text-4xl">{p.icon}</span>
                <div className="text-left">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-zinc-500 text-sm">{p.material}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-zinc-500 text-sm mt-4">
            PETG primary · PLA available · AMS multi-color · Open to resin and specialty materials
          </p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
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
      <section id="faq" className="px-6 py-20 max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Common Questions</h2>
          <p className="text-zinc-400">Can&apos;t find the answer? Message us on Etsy.</p>
        </div>
        <div className="space-y-5">
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Check Out the Full Etsy Store</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            All products ship from Blackwood, NJ. Star Seller, 4.8★ rating, 100+ happy customers.
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
          <p>© {new Date().getFullYear()} MTK Innovations · Blackwood, NJ</p>
          <div className="flex gap-4">
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Etsy ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}