import { useId } from "react";

function Star({ fill }: { fill: number }) {
  const id = `star-clip-${useId()}`;
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={24 * fill} height="24" />
        </clipPath>
      </defs>
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <g clipPath={`url(#${id})`}>
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          fill="var(--accent)"
        />
      </g>
    </svg>
  );
}

export default function StarRating({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" style={{ transform: size !== 15 ? `scale(${size / 15})` : undefined, transformOrigin: "left center" }} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return <Star key={i} fill={fill} />;
      })}
    </span>
  );
}
