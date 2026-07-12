import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A gallery of past custom 3D printing work from MTK Innovations — replacement parts, personalized gifts, and event favors made in Blackwood, NJ.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
