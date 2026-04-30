"use client";

import { useState } from "react";

const ETSY_URL = "https://www.etsy.com/shop/MTKInnovations";

export default function CustomPrintPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    material: "",
    dimensions: "",
    urgency: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      let photoBase64 = "";
      if (photoPreview) {
        photoBase64 = photoPreview;
      }

      const res = await fetch("/api/custom-print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photoBase64 }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Request received! We'll be in touch shortly.");
      setForm({ name: "", email: "", description: "", material: "", dimensions: "", urgency: "" });
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch {
      setStatus("error");
      setMessage("Failed to submit request. Please try again.");
    }
  };

  const inputClass =
    "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors";

  return (
    <main className="flex flex-col min-h-screen">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-2xl">⚙️</span>
            <span>MTK<span className="text-orange-400">Innovations</span></span>
          </a>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="/custom-print" className="hover:text-white transition-colors text-white">Request Custom Print</a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">
              Etsy Store
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
            🖨️ Custom Orders
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Request a Custom Print</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Describe what you need, upload a photo if you have one, and we&apos;ll tell you if it&apos;s printable — with a quote before we print anything.
          </p>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Info card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl mb-1">📸</p>
                <p className="text-sm text-zinc-400">Send a photo or sketch</p>
              </div>
              <div>
                <p className="text-2xl mb-1">💬</p>
                <p className="text-sm text-zinc-400">We confirm feasibility + price</p>
              </div>
              <div>
                <p className="text-2xl mb-1">📦</p>
                <p className="text-sm text-zinc-400">We print and ship fast</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo upload */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                📎 Upload a Photo (optional but helpful)
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  photoPreview ? "border-orange-500/50 bg-orange-500/5" : "border-zinc-700 hover:border-zinc-600"
                }`}
                onClick={() => document.getElementById("photo-input")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setPhotoFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setPhotoPreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                {photoPreview ? (
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="h-48 object-contain rounded-lg"
                    />
                    <p className="text-sm text-zinc-500">{photoFile?.name}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoFile(null);
                        setPhotoPreview(null);
                      }}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-4xl">🖼️</span>
                    <div>
                      <p className="text-zinc-300 text-sm font-medium">
                        Drop an image here, or click to select
                      </p>
                      <p className="text-zinc-600 text-xs mt-1">
                        PNG, JPG, WEBP up to 10MB · A photo of the part or a sketch works great
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Text fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mike Kapp"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="mike@example.com"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                What do you need printed? <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe what you're looking for. The more detail the better — what it's for, any specific requirements, how many you need, etc."
                className={`${inputClass} resize-none`}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Preferred Material
                </label>
                <select
                  className={inputClass}
                  value={form.material}
                  onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))}
                >
                  <option value="">No preference</option>
                  <option value="PETG">PETG (durable, outdoor)</option>
                  <option value="PLA">PLA (standard, multi-color)</option>
                  <option value="ASA">ASA (UV-resistant outdoor)</option>
                  <option value="TPU">TPU (flexible)</option>
                  <option value="Other">Other / Unsure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  placeholder="e.g., 50mm x 30mm x 10mm"
                  className={inputClass}
                  value={form.dimensions}
                  onChange={(e) => setForm((f) => ({ ...f, dimensions: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Urgency
                </label>
                <select
                  className={inputClass}
                  value={form.urgency}
                  onChange={(e) => setForm((f) => ({ ...f, urgency: e.target.value }))}
                >
                  <option value="">No rush</option>
                  <option value="Standard">Standard (3–5 days)</option>
                  <option value="Rush">Rush (1–2 days)</option>
                  <option value="ASAP">ASAP</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span> Submitting…
                </span>
              ) : (
                "Submit Custom Print Request"
              )}
            </button>
          </form>

          {/* Status messages */}
          {status === "success" && (
            <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-green-400 font-medium text-lg mb-1">✅ Request received!</p>
              <p className="text-green-300/80 text-sm">{message}</p>
              <p className="text-green-300/60 text-sm mt-2">
                We&apos;ll get back to you shortly. Check your email (and spam folder if needed).
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <p className="text-red-400 font-medium text-lg mb-1">❌ Error</p>
              <p className="text-red-300/80 text-sm">{message}</p>
            </div>
          )}

          {/* Note */}
          <p className="text-zinc-600 text-xs text-center mt-6">
            We typically respond within a few hours. For immediate help, message us directly on Etsy.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="mt-auto px-6 py-8 border-t border-zinc-800">
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
