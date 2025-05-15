import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotebookPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotebookPage({ params }: NotebookPageProps) {
  const { id: notebookId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // Or a more user-friendly unauthorized page/component
    return (
      <div className="container mx-auto py-10 text-center">
        Not authorized. Please log in.
      </div>
    );
  }

  const notebook = await prisma.notebook.findUnique({
    where: {
      id: notebookId,
      userId: session.user.id, // Ensure the user owns this notebook
    },
  });

  if (!notebook) {
    notFound(); // Triggers the not-found page
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {notebook.title || "Untitled Notebook"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notebook.topic ? (
            <p className="text-lg text-muted-foreground">{notebook.topic}</p>
          ) : (
            <p className="text-lg text-muted-foreground italic">
              No topic provided.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
