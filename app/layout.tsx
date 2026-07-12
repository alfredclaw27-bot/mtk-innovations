import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://mtkinnovations.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MTK Innovations — 3D Printed Game Boards, Home Products & Custom Parts",
    template: "%s | MTK Innovations",
  },
  description:
    "MTK Innovations — Star Seller Etsy shop in Blackwood, NJ. 4.9★, 357 reviews, 1,207 sales. Connect Hive Game Board, magnetic mailbox flags, pool valve replacements, and custom 3D print requests.",
  keywords: [
    "Hive game board 3D printed",
    "mailbox flag magnetic townhouse",
    "pool valve knob replacement",
    "3D printed game accessories",
    "MTK Innovations",
    "custom 3D prints",
    "mailbox flag",
    "Connect Hive game board",
  ],
  openGraph: {
    title: "MTK Innovations — 3D Printed Game Boards & Home Products",
    description:
      "Best-selling Connect Hive Game Board and magnetic mailbox flags. Star Seller on Etsy, 4.9★ across 357 reviews. Ships from Blackwood, NJ.",
    url: SITE_URL,
    siteName: "MTK Innovations",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23FF4405'/><text x='50' y='68' font-size='58' font-weight='900' text-anchor='middle' fill='%231A130D' font-family='sans-serif'>M</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
