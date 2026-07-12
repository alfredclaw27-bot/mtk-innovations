"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

type FormState = {
  name: string;
  email: string;
  description: string;
  material: string;
  dimensions: string;
  urgency: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  description: "",
  material: "",
  dimensions: "",
  urgency: "",
};

const EXPECTATION_POINTS = [
  "We review every request before quoting.",
  "Most replies go out within a few hours.",
  "Photos and measurements usually speed up approval.",
];

const SAMPLE_QUOTES = [
  {
    title: "Replacement part",
    range: "Usually $10-$25",
    detail: "Best when you can send a photo and rough measurements.",
  },
  {
    title: "Personalized gift or favor",
    range: "Usually $15-$60",
    detail: "Final price depends on quantity, colors, and print time.",
  },
  {
    title: "Bulk event order",
    range: "Quoted case by case",
    detail: "Message volume and deadline up front for the fastest estimate.",
  },
];

function ChecklistItem({
  done,
  label,
  hint,
}: {
  done: boolean;
  label: string;
  hint: string;
}) {
  return (
    <li
      className="flex items-start gap-3 rounded-xl px-4 py-3"
      style={{
        background: done ? "var(--accent-subtle)" : "var(--bg)",
        border: `1px solid ${done ? "var(--accent-border)" : "var(--border)"}`,
      }}
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold"
        style={{
          background: done ? "var(--accent)" : "var(--bg-card-hover)",
          color: done ? "var(--accent-ink)" : "var(--text-dim)",
        }}
      >
        {done ? "OK" : "?"}
      </span>
      <span>
        <span className="block text-sm font-semibold" style={{ color: "var(--text)" }}>
          {label}
        </span>
        <span className="block text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {hint}
        </span>
      </span>
    </li>
  );
}

export default function CustomPrintPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const readinessChecks = [
    {
      done: form.description.trim().length >= 30,
      label: "Clear description",
      hint: "A sentence or two about what the part does helps us quote faster.",
    },
    {
      done: Boolean(photoPreview),
      label: "Reference photo or sketch",
      hint: "Optional, but it often removes a round of back-and-forth.",
    },
    {
      done: form.dimensions.trim().length > 0,
      label: "Measurements",
      hint: "Even approximate sizes are useful when replacing a broken part.",
    },
    {
      done: form.material.trim().length > 0 || form.urgency.trim().length > 0,
      label: "Practical constraints",
      hint: "Material preference or deadline helps us recommend the right setup.",
    },
  ];

  const completedChecks = readinessChecks.filter((item) => item.done).length;
  const readinessPercent = Math.round((completedChecks / readinessChecks.length) * 100);

  const handlePhotoChange = (file?: File | null) => {
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }

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
      const res = await fetch("/api/custom-print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photoBase64: photoPreview ?? "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Request received! We will be in touch shortly.");
      setForm(INITIAL_FORM);
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch {
      setStatus("error");
      setMessage("Failed to submit request. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

  return (
    <>
      <Nav />

      <main>
        <section className="px-5 pt-32 pb-12 dot-grid" style={{ background: "var(--bg)" }}>
          <div className="mx-auto max-w-5xl">
            <span className="badge mb-5 inline-flex">Custom orders and replacement parts</span>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h1
                  className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl"
                  style={{ color: "var(--text)" }}
                >
                  Get a real custom-print quote before anything gets printed.
                </h1>
                <p
                  className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
                  style={{ color: "var(--text-muted)" }}
                >
                  Send the part photo, sketch, or idea. MTK reviews it manually, confirms whether it
                  is printable, and replies with pricing before production starts.
                </p>
              </div>

              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
                  What happens next
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    { step: "01", text: "You send the part details and any photo you have." },
                    { step: "02", text: "We confirm fit, material, and feasibility." },
                    { step: "03", text: "You get a quote and timeline before printing." },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-4 rounded-2xl px-4 py-4"
                      style={{ background: "var(--bg)", border: "2px solid var(--border-strong)" }}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold"
                        style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                      >
                        {item.step}
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className="rounded-3xl p-6 sm:p-7"
                style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-bold" style={{ color: "var(--text)" }}>
                      Project details
                    </h2>
                    <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                      The more context you share, the faster the quote.
                    </p>
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3 text-right"
                    style={{ background: "var(--bg)", border: "2px solid var(--border-strong)" }}
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: "var(--text-dim)" }}>
                      Quote readiness
                    </p>
                    <p className="font-heading text-2xl font-extrabold" style={{ color: "var(--text)" }}>
                      {readinessPercent}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text)" }}>
                      Your name <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mike Kapp"
                      className={inputClass}
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--ink)",
                        borderWidth: "2px",
                        color: "var(--text)",
                        boxShadow: "none",
                      }}
                      value={form.name}
                      onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text)" }}>
                      Email address <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="mike@example.com"
                      className={inputClass}
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--ink)",
                        borderWidth: "2px",
                        color: "var(--text)",
                        boxShadow: "none",
                      }}
                      value={form.email}
                      onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text)" }}>
                    What do you need printed? <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Example: I need a replacement knob for a pool valve. The original cracked at the center and I can send a photo plus rough measurements."
                    className={`${inputClass} resize-none`}
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--border-strong)",
                      color: "var(--text)",
                      boxShadow: "none",
                    }}
                    value={form.description}
                    onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text)" }}>
                      Preferred material
                    </label>
                    <select
                      className={inputClass}
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--ink)",
                        borderWidth: "2px",
                        color: "var(--text)",
                        boxShadow: "none",
                      }}
                      value={form.material}
                      onChange={(e) => setForm((current) => ({ ...current, material: e.target.value }))}
                    >
                      <option value="">No preference</option>
                      <option value="PETG">PETG (durable, outdoor-safe)</option>
                      <option value="PLA">PLA (standard, easy to color-match)</option>
                      <option value="ASA">ASA (UV-resistant outdoor use)</option>
                      <option value="TPU">TPU (flexible)</option>
                      <option value="Other">Other or unsure</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text)" }}>
                      Dimensions
                    </label>
                    <input
                      type="text"
                      placeholder="50mm x 30mm x 10mm"
                      className={inputClass}
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--ink)",
                        borderWidth: "2px",
                        color: "var(--text)",
                        boxShadow: "none",
                      }}
                      value={form.dimensions}
                      onChange={(e) => setForm((current) => ({ ...current, dimensions: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text)" }}>
                      Urgency
                    </label>
                    <select
                      className={inputClass}
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--ink)",
                        borderWidth: "2px",
                        color: "var(--text)",
                        boxShadow: "none",
                      }}
                      value={form.urgency}
                      onChange={(e) => setForm((current) => ({ ...current, urgency: e.target.value }))}
                    >
                      <option value="">No rush</option>
                      <option value="Standard">Standard (3-5 days)</option>
                      <option value="Rush">Rush (1-2 days)</option>
                      <option value="ASAP">ASAP</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                className="rounded-3xl p-6 sm:p-7"
                style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
              >
                <div className="mb-4">
                  <h2 className="font-heading text-2xl font-bold" style={{ color: "var(--text)" }}>
                    Photo or sketch
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                    Optional, but very helpful for replacement parts and fit checks.
                  </p>
                </div>

                <div
                  className="rounded-2xl border-2 border-dashed p-6 text-center transition-colors"
                  style={{
                    borderColor: photoPreview ? "var(--accent)" : "var(--border-strong)",
                    background: photoPreview ? "var(--accent-subtle)" : "var(--bg)",
                  }}
                  onClick={() => document.getElementById("photo-input")?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith("image/")) {
                      handlePhotoChange(file);
                    }
                  }}
                >
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
                  />

                  {photoPreview ? (
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={photoPreview}
                        alt="Uploaded reference preview"
                        className="max-h-56 rounded-2xl object-contain"
                      />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                          {photoFile?.name}
                        </p>
                        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                          Click the card to replace the image.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhotoChange(null);
                        }}
                        className="btn-secondary text-sm"
                        style={{ minHeight: "38px", padding: "0.55rem 1rem" }}
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 16V8M8 12h8"
                            stroke="var(--accent)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <rect
                            x="3.75"
                            y="3.75"
                            width="16.5"
                            height="16.5"
                            rx="3"
                            stroke="var(--accent-border)"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                          Drop an image here or click to select one
                        </p>
                        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                          PNG, JPG, or WEBP. A phone photo of the part is usually enough.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full text-base">
                  {status === "loading" ? "Submitting request..." : "Submit custom print request"}
                </button>
              </div>

              {status === "success" && (
                <div
                  className="rounded-3xl px-6 py-5"
                  style={{
                    background: "var(--success-bg)",
                    border: "1px solid var(--success-border)",
                  }}
                >
                  <p className="text-lg font-semibold" style={{ color: "var(--success-text)" }}>
                    Request received
                  </p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--success-text)" }}>
                    {message}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  className="rounded-3xl px-6 py-5"
                  style={{
                    background: "var(--error-bg)",
                    border: "1px solid var(--error-border)",
                  }}
                >
                  <p className="text-lg font-semibold" style={{ color: "var(--error-text)" }}>
                    Submission error
                  </p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--error-text)" }}>
                    {message}
                  </p>
                </div>
              )}
            </form>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
                      Readiness check
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-bold" style={{ color: "var(--text)" }}>
                      Help us quote on the first reply
                    </h2>
                  </div>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold"
                    style={{ background: "var(--bg)", border: "2px solid var(--border-strong)", color: "var(--text)" }}
                  >
                    {completedChecks}/{readinessChecks.length}
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {readinessChecks.map((item) => (
                    <ChecklistItem key={item.label} done={item.done} label={item.label} hint={item.hint} />
                  ))}
                </ul>
              </div>

              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
              >
                <h2 className="font-heading text-2xl font-bold" style={{ color: "var(--text)" }}>
                  What to expect
                </h2>
                <ul className="mt-4 space-y-3">
                  {EXPECTATION_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      <span
                        className="mt-1 block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--bg-card)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }}
              >
                <h2 className="font-heading text-2xl font-bold" style={{ color: "var(--text)" }}>
                  Typical project ranges
                </h2>
                <div className="mt-4 space-y-4">
                  {SAMPLE_QUOTES.map((quote) => (
                    <div
                      key={quote.title}
                      className="rounded-2xl px-4 py-4"
                      style={{ background: "var(--bg)", border: "2px solid var(--border-strong)" }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                          {quote.title}
                        </p>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                          {quote.range}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {quote.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
