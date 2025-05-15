import {
  Brain,
  Search,
  FileText,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Script from "next/script";
import Link from "next/link";
import { AuthAwareButton } from "@/components/auth-aware-button";

interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
}

interface Step {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    name: "Multi-Source Research",
    description:
      "Input any combination of documents, links, or topics. Our AI seamlessly integrates information from all your sources into a unified research space.",
    icon: Search,
  },
  {
    name: "AI-Powered Summaries",
    description:
      "Get instant, comprehensive summaries of your research materials. Our AI extracts key insights and presents them in clear, digestible formats.",
    icon: Brain,
  },
  {
    name: "Interactive Q&A",
    description:
      "Chat with your research materials in natural language. Ask questions and get instant answers based on all your input sources.",
    icon: MessageSquare,
  },
  {
    name: "Smart FAQ Generation",
    description:
      "Automatically generate relevant FAQs from your research. Perfect for creating documentation, study guides, or knowledge bases.",
    icon: HelpCircle,
  },
];

const steps: Step[] = [
  {
    step: "01",
    title: "Add Your Sources",
    description:
      "Input documents, links, or topics you want to research. Our AI accepts multiple formats and sources simultaneously.",
    icon: Search,
  },
  {
    step: "02",
    title: "Get AI Summaries",
    description:
      "Receive comprehensive summaries and key insights from all your research materials, automatically organized and structured.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Interact & Explore",
    description:
      "Chat with your research, ask questions, and generate FAQs. Get instant answers and insights from all your sources.",
    icon: MessageSquare,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Decipher Research Assistant",
  applicationCategory: "Research Tool",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "AI-powered research assistant that transforms how you explore information. Input any source, get instant summaries, chat with your research, and generate FAQs - all in one powerful platform.",
  featureList: features.map((f) => f.name).join(", "),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Script
        id="ld-json-seo"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-8">
            Powered by{" "}
            <Link
              href="https://brightdata.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline ml-1"
              aria-label="Brightdata website"
            >
              Brightdata
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Research Smarter with <span className="text-primary">Decipher</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered research assistant that transforms how you explore
            information. Input any source, get instant summaries, chat with your
            research, and generate FAQs - all in one powerful platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <AuthAwareButton />
            <Button variant="link" asChild>
              <Link href="#features" aria-label="Learn more about Decipher">
                Learn more →
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="py-24 sm:py-32"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              id="features-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Everything you need for research
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <Card key={feature.name}>
                  <CardHeader>
                    <div className="flex items-center gap-x-3">
                      <feature.icon
                        className="h-5 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      <CardTitle>{feature.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section
        id="how-it-works"
        className="py-24 sm:py-32 bg-muted"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              id="how-it-works-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              How Decipher Works
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <Card key={step.step}>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary mb-4">
                      <step.icon
                        className="h-6 w-6 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-24 sm:py-32" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ready to start researching smarter?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join our open-source community and help shape the future of
              AI-powered research. Star the project, contribute, or use it for
              your research needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link
                  href="https://github.com/mtwn105/decipher-research-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Star on GitHub"
                >
                  Star on GitHub
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link
                  href="https://github.com/mtwn105/decipher-research-agent/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Report Issues"
                >
                  Report Issues →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
