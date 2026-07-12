import type { Review } from "@/lib/types";
import StarRating from "./StarRating";

export default function ReviewQuote({ review, productName }: { review: Review; productName?: string }) {
  return (
    <div className="card p-6 flex flex-col h-full" style={{ background: "var(--bg-card)" }}>
      {typeof review.rating === "number" && (
        <div className="mb-3">
          <StarRating rating={review.rating} />
        </div>
      )}
      <p className="text-sm leading-relaxed flex-1 font-medium" style={{ color: "var(--text)" }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-4 pt-4 flex items-center justify-between gap-2" style={{ borderTop: "2px dashed var(--border-strong)" }}>
        <span className="text-xs font-bold" style={{ color: "var(--text)" }}>
          {review.author || "Verified Buyer"}
        </span>
        {productName && (
          <span className="text-xs font-semibold text-right" style={{ color: "var(--accent-dark)" }}>
            {productName}
          </span>
        )}
      </div>
    </div>
  );
}
