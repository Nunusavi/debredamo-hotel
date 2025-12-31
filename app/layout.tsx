import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Ethiopic } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "DEBREDAMO HOTEL | Luxury Accommodation in Addis Ababa",
  description:
    "Experience luxury and comfort in the heart of Addis Ababa. DEBREDAMO HOTEL offers premium accommodation, exceptional service, and authentic Ethiopian hospitality.",
  keywords: [
    "hotel",
    "Addis Ababa",
    "Ethiopia",
    "luxury accommodation",
    "business hotel",
    "city center",
  ],
  authors: [{ name: "DEBREDAMO HOTEL" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "DEBREDAMO HOTEL | Luxury Accommodation in Addis Ababa",
    description:
      "Experience luxury and comfort in the heart of Addis Ababa. Premium accommodation with exceptional service.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "DEBREDAMO HOTEL",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/Debredamo.webp",
        width: 1200,
        height: 630,
        alt: "DEBREDAMO HOTEL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEBREDAMO HOTEL | Luxury Accommodation in Addis Ababa",
    description: "Experience luxury and comfort in the heart of Addis Ababa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${notoEthiopic.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
