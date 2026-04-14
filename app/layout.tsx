import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    description: "Best-selling Hive Game Board and magnetic mailbox flags. Star Seller on Etsy, 4.8★. Ships from Blackwood, NJ.",
    url: "https://www.etsy.com/shop/MTKInnovations",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.85em' font-size='85'>⚙️</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* ─── GOOGLE ADSENSE ───
             To enable ads: replace YOUR_ADSENSE_ID below with your actual
             publisher ID from https://www.google.com/adsense
             The format is: ca-pub-XXXXXXXXXXXXXXXXX
             Keep this comment so Mike knows where to fill in.
        ─── */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_ADSENSE_PUB_ID`}
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0a] text-white font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}