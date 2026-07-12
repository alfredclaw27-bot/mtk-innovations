// Small line-art icon shown as a placeholder when a product has no real photo yet,
// keyed loosely off its category so the storefront never shows an empty box.

export default function CategoryIcon({
  category,
  size = 40,
}: {
  category: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none" as const,
  };

  switch (category) {
    case "Game Accessories":
      return (
        <svg {...common} aria-hidden="true">
          <polygon points="16,4 27,10 27,22 16,28 5,22 5,10" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-subtle)" />
          <circle cx="16" cy="16" r="3" fill="var(--accent)" opacity="0.55" />
        </svg>
      );
    case "Home & Mail":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="4" y="6" width="3" height="22" rx="1.5" fill="var(--text-dim)" />
          <path d="M7 8 L26 14 L7 20 Z" fill="var(--accent-subtle)" stroke="var(--accent)" strokeWidth="1" />
        </svg>
      );
    case "Pool Parts":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="16" cy="16" r="10" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-subtle)" />
          <circle cx="16" cy="16" r="4" fill="var(--accent)" opacity="0.4" />
        </svg>
      );
    case "Custom Work":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="6" y="14" width="20" height="10" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-subtle)" />
          <path d="M9 14 V8 L16 4 L23 8 V14" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "Digital Files":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="7" y="4" width="18" height="24" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-subtle)" />
          <path d="M12 15 L16 19 L20 12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="16" cy="16" r="10" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <circle cx="16" cy="16" r="4" fill="var(--accent-subtle)" />
        </svg>
      );
  }
}
