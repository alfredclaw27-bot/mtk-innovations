import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "MTK Innovations — 3D Printed Hive Board, Mailbox Flag & Custom Parts | Etsy Star Seller",
  description:
    "MTK Innovations — Star Seller Etsy shop. Best sellers: Hive Game Board ($9.95), Magnetic Mailbox Flag ($6.99), Pool Valve Knob. 4.8★ rated, printed in Blackwood, NJ. Fast shipping.",
  keywords: [
    "Hive game board 3D printed",
    "mailbox flag magnetic townhouse",
    "pool valve knob replacement",
    "3D printed game accessories",
    "MTK Innovations",
    "custom 3D prints",
    "mailbox flag",
    "Hive board",
  ],
  openGraph: {
    title: "MTK Innovations — 3D Printed Game Boards & Home Products",
    description:
      "Best-selling Hive Game Board and magnetic mailbox flags. Star Seller on Etsy, 4.8★. Ships from Blackwood, NJ.",
    url: "https://www.etsy.com/shop/MTKInnovations",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='85'>⬡</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        {/* ─── GOOGLE ADSENSE ───
             Replace YOUR_ADSENSE_PUB_ID with your actual publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
        ─── */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_ADSENSE_PUB_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
