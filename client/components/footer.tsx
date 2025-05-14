import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col items-center gap-4 md:order-2">
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/mtwn105/decipher-research-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              Open Source on GitHub
            </Link>
          </div>
          <Link
            href="https://twitter.com/mtwn105"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            Made with ❤️ by Amit Wani
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} Decipher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
