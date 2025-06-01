import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const oxanium = Oxanium({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"
  ),
  title: {
    default:
      "ResearchForge - Advanced AI Research Assistant | Smarter Research, Faster Insights",
    template: "%s | ResearchForge",
  },
  description:
    "ResearchForge supercharges your research with AI-powered analysis, multi-source integration, and automated reporting. Generate comprehensive reports, extract insights from documents, and access web content without restrictions.",
  keywords: [
    "AI research",
    "research automation",
    "document analysis",
    "web data extraction",
    "AI-powered summaries",
    "interactive research",
    "automated reporting",
    "knowledge management",
    "data visualization",
    "Firecrawl AI",
    "multi-source research",
    "academic research",
    "business intelligence",
    "market research",
    "competitive analysis",
    "data-driven insights",
    "automated documentation",
    "research collaboration"
  ],
  authors: [
    { name: "Your Name", url: "" },
    { name: "Amit Wani (Original Creator)", url: "" }
  ],
  creator: "Your Name",
  publisher: "ResearchForge",
  category: "AI Research Tools",
  classification: "AI Research Assistant",
  openGraph: {
    title:
      "ResearchForge - Advanced AI Research Assistant | Smarter Research, Faster Insights",
    description:
      "Supercharge your research with AI-powered analysis, multi-source integration, and automated reporting. Generate comprehensive reports and extract insights effortlessly.",
    url: "https://yourdomain.com",
    siteName: "ResearchForge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ResearchForge - Advanced AI Research Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResearchForge - AI-Powered Research Assistant",
    description:
      "Transform your research with advanced AI analysis, automated reporting, and multi-source integration.",
    creator: "@yourtwitter",
    images: ["/og-image.jpg"],
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
  alternates: {
    canonical: "https://researchforge.ai",
  },
  other: {
    "application-name": "ResearchForge",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "ResearchForge",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oxanium.className} antialiased`}>
        <Script
          defer
          src="https://analytics.amitwani.dev/script.js"
          data-website-id="d09597b1-692e-4f54-a378-97e224b7630b"
          strategy="afterInteractive"
        />
        <Header />
        <main className="min-h-screen pt-4">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
