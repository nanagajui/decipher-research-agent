"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function HeaderClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out. Please try again.");
        return;
      }

      toast.success("Successfully signed out!");
      router.push("/auth");
    } catch (error: unknown) {
      console.error("Error signing out:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to sign out. Please try again.";
      toast.error(errorMessage);
    }
  };

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
            href="/#features"
            className="text-sm font-semibold leading-6 hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
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
        <div className="flex flex-1 justify-end items-center gap-4">
          {isPending ? (
            <div className="h-8 w-20 animate-pulse bg-muted rounded" />
          ) : session?.user ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span>{session.user.name || session.user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
