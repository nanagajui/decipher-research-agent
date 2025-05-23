import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const oxanium = Oxanium({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DecipherIt - AI-Powered Research Assistant",
  description:
    "Transform your research process with DecipherIt. Input any source, get instant summaries, chat with your research, and generate FAQs - all in one powerful platform.",
  keywords:
    "AI research, research assistant, document analysis, AI summaries, research tools, knowledge management",
  authors: [{ name: "DecipherIt Team" }],
  openGraph: {
    title: "DecipherIt - AI-Powered Research Assistant",
    description:
      "Transform your research process with DecipherIt. Input any source, get instant summaries, chat with your research, and generate FAQs - all in one powerful platform.",
    type: "website",
    url: "https://decipher-research.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DecipherIt Research Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DecipherIt - AI-Powered Research Assistant",
    description:
      "Transform your research process with DecipherIt. Input any source, get instant summaries, chat with your research, and generate FAQs - all in one powerful platform.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        <Header />
        <main className="min-h-screen pt-4">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
