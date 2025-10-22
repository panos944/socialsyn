import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import InitialLoader from "@/components/common/InitialLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Socialsyn - Digital Marketing Agency",
  description: "Professional digital marketing services to grow your business online. Social media management, content creation, and strategic marketing solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {/* SSR fallback overlay to avoid flashing underlying content before client loader mounts */}
        <div id="ssr-initial-loader" className="fixed inset-0 z-[2000] bg-neutral-950"></div>
        <Providers>
          {/* Force during development so it doesn't disappear instantly due to session flag */}
          <InitialLoader force />
          {children}
        </Providers>
      </body>
    </html>
  );
}