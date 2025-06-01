import {
  Brain,
  Search,
  FileText,
  MessageSquare,
  HelpCircle,
  Headphones,
  Network,
  Globe,
  Zap,
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
    name: "AI-Powered Research",
    description:
      "Leverage advanced AI to conduct comprehensive research with automated analysis and synthesis. Our intelligent systems plan and execute research strategies across diverse data sources.",
    icon: Search,
  },
  {
    name: "Unified Research Platform",
    description:
      "Integrate multiple document formats, web content, and custom inputs into a single research workspace. Our platform processes and connects information from all your sources.",
    icon: FileText,
  },

  {
    name: "Interactive Q&A",
    description:
      "Chat with your research materials using vector embeddings and semantic search through Qdrant database. Get contextual answers by retrieving relevant information from all processed sources.",
    icon: MessageSquare,
  },
  {
    name: "Audio Overviews",
    description:
      "Transform research into engaging podcast-style audio content. AI agents create conversational scripts, converted to high-quality audio using LemonFox TTS with multiple AI voices.",
    icon: Headphones,
  },
  {
    name: "Visual Mindmaps",
    description:
      "Generate interactive, hierarchical mindmaps with up to 5 levels of depth. The Mindmap Creator agent analyzes research structure to create visual representations of complex topics.",
    icon: Network,
  },
  {
    name: "Smart FAQ Generation",
    description:
      "AI agents automatically analyze research content to generate relevant, insightful questions and comprehensive answers. Perfect for creating documentation and study guides.",
    icon: HelpCircle,
  },
];

const steps: Step[] = [
  {
    step: "01",
    title: "Input Your Research Sources",
    description:
      "Enter any topic, upload documents, add custom URLs, or input manual text. Our AI accepts multiple formats and sources simultaneously for comprehensive research.",
    icon: Search,
  },
  {
    step: "02",
    title: "AI Planning & Web Discovery",
    description:
      "The system creates a strategic research plan using AI agents. Bright Data's search engine finds relevant sources globally, bypassing geo-restrictions.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Intelligent Scraping & Analysis",
    description:
      "Bright Data extracts content and converts it to clean markdown format. Multiple AI agents analyze, synthesize, and create comprehensive summaries from all sources.",
    icon: Brain,
  },
  {
    step: "04",
    title: "Multi-Format Output",
    description:
      "Get research summaries, interactive Q&A, auto-generated FAQs, visual mindmaps, and podcast-style audio overviews - all powered by advanced AI processing.",
    icon: FileText,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ResearchForge - Advanced AI Research Assistant",
  description:
    "The most advanced AI research assistant that helps you discover, analyze, and present information with Firecrawl AI and advanced analytics. Generate comprehensive reports, interactive visualizations, and intelligent summaries.",
  applicationCategory: "Research Application",
  operatingSystem: "Web, Windows, macOS, Linux",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: features.map((f) => f.name).join(", "),
  creator: {
    "@type": "Organization",
    name: "ResearchForge",
    url: "https://yourdomain.com",
  },
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
      <section className="relative px-4 pt-24 pb-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-8">
            Next-Generation Research Platform
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Transform Your Research with{" "}
            <span className="text-primary">ResearchForge</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            The most advanced AI research assistant that helps you discover, analyze, and present
            information like never before. Powered by Firecrawl AI and advanced analytics,
            ResearchForge turns complex data into actionable insights with beautiful reports,
            interactive visualizations, and intelligent summaries.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <AuthAwareButton />
            <Button variant="outline" asChild>
              <Link
                href="#features"
                aria-label="Explore features"
                className="border-primary/20 hover:bg-primary/5"
              >
                Explore Features
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 sm:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              The Problem ResearchForge Solves
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              Traditional research is time-consuming, fragmented, and often
              limited by technical barriers. Researchers, students, and
              professionals face numerous challenges when trying to gather and
              synthesize information effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Information Overload
                    </h3>
                    <p className="text-muted-foreground">
                      Researchers spend hours manually sifting through countless
                      sources, struggling to identify relevant information and
                      extract key insights from overwhelming amounts of data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Geo-restrictions & Access Barriers
                    </h3>
                    <p className="text-muted-foreground">
                      Many valuable research sources are blocked by geographic
                      restrictions, preventing access to diverse perspectives
                      and comprehensive global information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Bot Detection & Scraping Limitations
                    </h3>
                    <p className="text-muted-foreground">
                      Advanced bot detection systems block automated data
                      collection, making it difficult to gather information
                      efficiently from multiple web sources.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Synthesis & Connection Challenges
                    </h3>
                    <p className="text-muted-foreground">
                      Connecting insights across multiple sources and formats is
                      mentally taxing and time-consuming, often resulting in
                      incomplete or biased analysis.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Format & Accessibility Issues
                    </h3>
                    <p className="text-muted-foreground">
                      Research often remains trapped in text format, making it
                      difficult to share insights through different mediums like
                      audio or visual representations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Knowledge Organization
                    </h3>
                    <p className="text-muted-foreground">
                      Without proper tools, research findings become scattered
                      and difficult to navigate, reducing their long-term value
                      and reusability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-lg font-medium text-foreground mb-2">
                ResearchForge&apos;s Solution
              </p>
              <p className="text-muted-foreground">
                Our AI-powered platform addresses these challenges by leveraging
                Bright Data&apos;s MCP Server for unrestricted web access,
                CrewAI agents for intelligent synthesis, and multiple output
                formats to make research accessible, comprehensive, and
                actionable.
              </p>
            </div>
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
              Everything you need for comprehensive research
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Powered by CrewAI agents and Bright Data&apos;s MCP Server for
              unrestricted, intelligent web access
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.name} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-x-3">
                      <feature.icon
                        className="h-5 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
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
              How ResearchForge Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Advanced AI agents work together to transform your research
              process
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <Card key={step.step} className="relative">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary mb-4">
                      <step.icon
                        className="h-6 w-6 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powered by Cutting-Edge Technology
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built with modern AI frameworks and advanced web technologies
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    CrewAI Agents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Multi-agent AI framework with specialized crews for
                    research, analysis, content creation, and visualistion
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Bright Data MCP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Official Model Context Protocol server for real-time web
                    access, bypassing geo-restrictions and bot detection
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 sm:py-32 bg-muted/50 border-y">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Support ResearchForge&apos;s Development
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Help us continue building and improving this open-source AI
              research platform. Your support enables us to maintain servers,
              add new features, and keep ResearchForge free for everyone.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground max-w-md">
                Every contribution helps us maintain and improve ResearchForge for
                researchers worldwide
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">🚀</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Server Costs
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">⚡</div>
                <p className="text-sm text-muted-foreground mt-2">
                  New Features
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">🌍</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Free Access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-24 sm:py-32 bg-muted"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ready to start researching smarter?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Start your AI-powered research journey today. Explore new insights
              and enhance your research with our powerful tools.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/login">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
