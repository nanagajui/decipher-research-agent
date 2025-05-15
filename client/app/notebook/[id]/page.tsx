import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { NotebookPageDeleteMenu } from "@/components/notebook/notebook-page-delete-menu";
import { SourcesWrapper } from "@/components/notebook/sources-wrapper";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

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
  // Extract id from params at the beginning
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const notebook = await prisma.notebook.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      processingStatus: true,
      sources: true,
    },
  });

  if (!notebook) {
    redirect("/dashboard");
  }

  const status = notebook.processingStatus?.status || "IN_QUEUE";
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="container mx-auto px-4 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:opacity-70">
              <ChevronLeft size={24} />
            </Link>
            <div className="flex flex-grow justify-between items-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {notebook.title || "Untitled Notebook"}
              </h1>
              <Badge
                variant={statusInfo.variant}
                className="flex items-center w-fit px-4 py-2 text-base font-semibold text-md"
              >
                <StatusIcon className="h-6 w-6 mr-1" />
                {statusInfo.label}
              </Badge>
            </div>
          </div>
          <Card className="w-full relative group">
            <NotebookPageDeleteMenu
              notebookId={notebook.id}
              className="absolute bottom-4 right-4 z-10"
            />

            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-6">
                {notebook.topic && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Topic
                    </h3>
                    <p className="text-base sm:text-lg">{notebook.topic}</p>
                  </div>
                )}

                {notebook.processingStatus?.message && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Status Message
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {notebook.processingStatus.message}
                    </p>
                  </div>
                )}

                <SourcesWrapper
                  notebookId={notebook.id}
                  initialSources={notebook.sources}
                />

                <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                  <div>
                    Created{" "}
                    {formatDistanceToNow(new Date(notebook.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                  {notebook.updatedAt &&
                    notebook.updatedAt !== notebook.createdAt && (
                      <div>
                        Updated{" "}
                        {formatDistanceToNow(new Date(notebook.updatedAt), {
                          addSuffix: true,
                        })}
                      </div>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
