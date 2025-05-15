import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Decipher. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <Link
              href="https://github.com/mtwn105/decipher-research-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              Open Source on GitHub
            </Link>
            <Link
              href="https://twitter.com/mtwn105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Made with ❤️ by Amit Wani
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
