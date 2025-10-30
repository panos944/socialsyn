import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.socialsyn.gr'),
  title: "Socialsyn - Digital Marketing Agency",
  description: "Professional digital marketing services to grow your business online. Social media management, content creation, and strategic marketing solutions.",
  keywords: ["digital marketing", "social media management", "content creation", "photography", "brand strategy", "digital agency", "Greece", "Athens"],
  authors: [{ name: "Socialsyn" }],
  icons: {
    icon: [
      { url: "/images-used/Socialsyn_Logo-05.png", type: "image/png" }
    ],
    shortcut: ["/images-used/Socialsyn_Logo-05.png"],
    apple: [
      { url: "/images-used/Socialsyn_Logo-05.png", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Socialsyn - Digital Marketing Agency",
    description: "Professional digital marketing services to grow your business online.",
    url: "https://www.socialsyn.gr",
    siteName: "Socialsyn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Socialsyn - Digital Marketing Agency",
    description: "Professional digital marketing services to grow your business online.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}