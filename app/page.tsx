const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

const products = [
  {
    name: "Precision Print Bundle",
    desc: "Assorted 3D printed organizers, mounts, and brackets. Designed for real use — not decoration.",
    price: "From $15",
    tag: "3D Print",
  },
  {
    name: "Excel Invoice Kit",
    desc: "Stop wrestling with broken spreadsheet templates. This one just works, every time.",
    price: "$12",
    tag: "Excel",
  },
  {
    name: "Custom Part Printing",
    desc: "Send Mike your specs. He'll print it, check it, and ship it. Most jobs done in 48 hrs.",
    price: "Starting at $10",
    tag: "3D Print",
  },
  {
    name: "Template Pack Vol. 1",
    desc: "The most useful Excel templates — time tracking, budgeting, invoicing — bundled at a discount.",
    price: "$25",
    tag: "Excel",
  },
];

const whyUs = [
  {
    title: "Every print is tested",
    desc: "Before it ships. If it doesn't fit or work, Mike reprints it. No exceptions.",
  },
  {
    title: "Works where you work",
    desc: "Excel templates are compatible with Google Sheets, LibreOffice, and Excel 2016+.",
  },
  {
    title: "Fast turnaround",
    desc: "Most custom print jobs ship within 48 hours. Digital templates delivered instantly.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
            3D Prints &amp; Excel Tools
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            MTK Innovations
            <br />
            <span className="text-zinc-400">Tools That Actually Work</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
            3D printed goods and Excel utilities, built by a software engineer
            who got tired of things being broken. Designed for real use, not
            decoration.
          </p>
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Shop on Etsy
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" /><path d="M7 17 17 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section className="px-6 py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">What We Make</h2>
          <p className="text-zinc-400">
            No fluff. No frills. Just things that solve problems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products.map((p) => (
            <div key={p.name} className="card flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium tracking-wider uppercase text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                  {p.tag}
                </span>
                <span className="text-sm font-semibold text-zinc-300">{p.price}</span>
              </div>
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed flex-1">{p.desc}</p>
              <a
                href={ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-2 text-sm"
              >
                Shop on Etsy
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="px-6 py-20 bg-zinc-950/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Who&apos;s Behind This</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            MTK Innovations is Mike — a software engineer by trade, a maker by
            necessity. After years of wrestling with broken third-party tools,
            inadequate spreadsheet templates, and 3D prints that didn&apos;t fit
            anything, he started building his own.
          </p>
          <p className="text-lg font-medium text-zinc-200">
            Made by an engineer, for everyone.
          </p>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="px-6 py-24 max-w-4xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">Why MTK</h2>
          <p className="text-zinc-400">Simple promises. Actually kept.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {whyUs.map((item) => (
            <div key={item.title} className="text-center p-6">
              <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section className="px-6 py-24 text-center border-t border-zinc-800">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to see what MTK has?</h2>
          <p className="text-zinc-400 mb-8">
            Head over to the Etsy store. New items added regularly.
          </p>
          <a
            href={ETSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            Visit the Etsy Store
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" /><path d="M7 17 17 7" />
            </svg>
          </a>
          <p className="text-zinc-600 text-sm mt-6">
            Questions? Reach out anytime via Etsy messages.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
        &copy; {new Date().getFullYear()} MTK Innovations. All rights reserved.
      </footer>
    </main>
  );
}
