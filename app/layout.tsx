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
  title: "Debredamo Hotel | Luxury Accommodation in Addis Ababa",
  description: "Experience luxury and comfort in the heart of Addis Ababa. Debredamo Hotel offers premium accommodation, exceptional service, and authentic Ethiopian hospitality.",
  keywords: ["hotel", "Addis Ababa", "Ethiopia", "luxury accommodation", "business hotel", "city center"],
  authors: [{ name: "Debredamo Hotel" }],
  openGraph: {
    title: "Debredamo Hotel | Luxury Accommodation in Addis Ababa",
    description: "Experience luxury and comfort in the heart of Addis Ababa. Premium accommodation with exceptional service.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Debredamo Hotel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debredamo Hotel | Luxury Accommodation in Addis Ababa",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${notoEthiopic.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
