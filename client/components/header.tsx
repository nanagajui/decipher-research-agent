import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-xl font-bold">
            Decipher
          </Link>
        </div>
        <div className="flex gap-x-6">
          <Link
            href="#features"
            className="text-sm font-semibold leading-6 hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-semibold leading-6 hover:text-primary"
          >
            How it Works
          </Link>
          <Link
            href="https://github.com/mtwn105/decipher-research-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 hover:text-primary flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <Button asChild>
            <Link
              href="https://github.com/mtwn105/decipher-research-agent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
