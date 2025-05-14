import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const oxanium = Oxanium();

export const metadata: Metadata = {
  title: "Decipher - AI-Powered Research Assistant",
  description:
    "Transform your research process with Decipher. Input any source, get instant summaries, chat with your research, and generate FAQs - all in one powerful platform.",
  keywords:
    "AI research, research assistant, document analysis, AI summaries, research tools, knowledge management",
  authors: [{ name: "Decipher Team" }],
  openGraph: {
    title: "Decipher - AI-Powered Research Assistant",
    description:
      "Transform your research process with Decipher. Input any source, get instant summaries, chat with your research, and generate FAQs - all in one powerful platform.",
    type: "website",
    url: "https://decipher-research.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Decipher Research Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decipher - AI-Powered Research Assistant",
    description:
      "Transform your research process with Decipher. Input any source, get instant summaries, chat with your research, and generate FAQs - all in one powerful platform.",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
