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
  title: {
    default: "Socialsyn - Digital Marketing Agency in Athens, Greece",
    template: "%s | Socialsyn"
  },
  description: "Professional digital marketing agency in Athens, Greece. We specialize in social media management, content creation, photography, and strategic brand marketing solutions that drive measurable results.",
  keywords: ["digital marketing", "social media management", "content creation", "photography", "brand strategy", "digital agency", "Greece", "Athens", "marketing agency Athens", "social media agency Greece"],
  authors: [{ name: "Socialsyn", url: "https://www.socialsyn.gr" }],
  creator: "Socialsyn",
  publisher: "Socialsyn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images-used/Socialsyn_Logo-05.png", type: "image/png" }
    ],
    shortcut: ["/images-used/Socialsyn_Logo-05.png"],
    apple: [
      { url: "/images-used/Socialsyn_Logo-05.png", type: "image/png", sizes: "180x180" }
    ]
  },
  openGraph: {
    title: "Socialsyn - Digital Marketing Agency in Athens",
    description: "Professional digital marketing agency specializing in social media management, content creation, photography, and brand strategy.",
    url: "https://www.socialsyn.gr",
    siteName: "Socialsyn",
    locale: "en_US",
    alternateLocale: "el_GR",
    type: "website",
    images: [
      {
        url: "/images-used/hero-video-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Socialsyn Digital Marketing Agency",
        type: "image/jpeg",
      },
      {
        url: "/images-used/Brand-section.jpeg",
        width: 1200,
        height: 630,
        alt: "Socialsyn Brand Partners",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Socialsyn - Digital Marketing Agency",
    description: "Professional digital marketing services to grow your business online.",
    images: ["/images-used/hero-video-poster.jpg"],
    creator: "@socialsyn_",
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
  },
  category: "Digital Marketing",
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Socialsyn",
  "description": "Professional digital marketing agency specializing in social media management, content creation, photography, and brand strategy.",
  "url": "https://www.socialsyn.gr",
  "logo": "https://www.socialsyn.gr/images-used/Socialsyn_Logo-05.png",
  "image": "https://www.socialsyn.gr/images-used/hero-video-poster.jpg",
  "telephone": "+30 6942491993",
  "email": "info.socialsyn@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ag. Trifonos 9",
    "addressLocality": "Kifisia",
    "addressRegion": "Athens",
    "postalCode": "14562",
    "addressCountry": "GR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "38.0766",
    "longitude": "23.8103"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Greece"
    },
    {
      "@type": "City",
      "name": "Athens"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/socialsyn_/",
    "https://www.facebook.com/socialsyn"
  ],
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Marketing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Management",
          "description": "Complete social media presence management including content creation, scheduling, and community engagement."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Brand Strategy & Digital Marketing",
          "description": "Strategic marketing campaigns that drive visibility and measurable growth."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Photography",
          "description": "Professional photography services for brands, products, and lifestyle content."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Content & Design Studio",
          "description": "Visual content creation including graphics, newsletters, and digital assets."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}