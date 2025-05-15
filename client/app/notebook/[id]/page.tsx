import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const statusConfig = {
  IN_QUEUE: {
    icon: Clock,
    label: "In Queue",
    variant: "secondary" as const,
  },
  IN_PROGRESS: {
    icon: Loader2,
    label: "Processing",
    variant: "default" as const,
  },
  PROCESSED: {
    icon: CheckCircle2,
    label: "Processed",
    variant: "secondary" as const,
  },
  ERROR: {
    icon: AlertCircle,
    label: "Error",
    variant: "destructive" as const,
  },
};

export default async function NotebookPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const notebook = await prisma.notebook.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      processingStatus: true,
    },
  });

  if (!notebook) {
    redirect("/dashboard");
  }

  const status = notebook.processingStatus?.status || "IN_QUEUE";
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl">
              {notebook.title || "Untitled Notebook"}
            </CardTitle>
            <Badge
              variant={statusInfo.variant}
              className="flex items-center gap-1"
            >
              <StatusIcon className="h-4 w-4" />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notebook.topic && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Topic
                </h3>
                <p className="text-lg">{notebook.topic}</p>
              </div>
            )}
            {notebook.processingStatus?.message && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Status Message
                </h3>
                <p className="text-muted-foreground">
                  {notebook.processingStatus.message}
                </p>
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              Created on {new Date(notebook.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
