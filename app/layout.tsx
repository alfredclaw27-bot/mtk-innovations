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
  title: "MTK Innovations — Custom 3D Prints & Parts | Etsy Star Seller",
  description:
    "MTK Innovations — Star Seller Etsy shop. Custom 3D prints, personalized models, pool valve knob replacements, and 3D design files. 4.8★ rated, 112+ reviews. Fast turnaround from Blackwood, NJ.",
  keywords: [
    "3D printing custom",
    "custom 3D prints",
    "pool valve knob replacement",
    "3D model files",
    "personalized 3D prints",
    "MTK Innovations",
    "custom parts 3D printed",
  ],
  openGraph: {
    title: "MTK Innovations — Custom 3D Prints & Parts",
    description: "Custom 3D prints, personalized models, and pool parts. Star Seller on Etsy, 4.8★ rated. Fast turnaround.",
    url: "https://www.etsy.com/shop/MTKInnovations",
    type: "website",
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
        <meta name="google-adsense-account" content="ca-pub-YOUR_ADSENSE_ID" />
        <meta name="monetization" content="YOUR_MONTIZATION_ID" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0a] text-white font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
