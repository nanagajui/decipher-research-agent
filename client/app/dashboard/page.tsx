"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

type UserProfile = {
  id: string;
  email: string;
  name?: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: session, error } = await authClient.getSession();

        if (error || !session) {
          console.error("Session error:", error);
          router.push("/auth");
          return;
        }

        setUser({
          id: session.user?.id || "",
          email: session.user?.email || "",
          name: session.user?.name,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Decipher</CardTitle>
          <CardDescription>Your personal research assistant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="font-semibold">Your Profile</h2>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Name: </span>
                  <span>{user?.name || "Not provided"}</span>
                </div>
                <div>
                  <span className="font-medium">Email: </span>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">
              This is your personal dashboard. You can start exploring the
              Decipher research assistant or update your profile settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
