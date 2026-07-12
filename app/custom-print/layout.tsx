import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Print Request",
  description:
    "Request a custom 3D print from MTK Innovations. Send a photo, sketch, or description — we'll quote you before anything gets printed. Most jobs ship within 48 hours.",
  alternates: { canonical: "/custom-print" },
};

export default function CustomPrintLayout({ children }: { children: React.ReactNode }) {
  return children;
}
