"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Loader2 } from "lucide-react";
import { NotebookPageDeleteMenu } from "@/components/notebook/notebook-page-delete-menu";
import { SourcesWrapper } from "@/components/notebook/sources-wrapper";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownComponents } from "@/components/ui/markdown-components";
import { toast } from "sonner";
import { statusConfig, NotebookWithDetails } from "@/lib/notebook-types";

export function NotebookPolling({
  initialNotebook,
}: {
  initialNotebook: NotebookWithDetails;
}) {
  const [notebook, setNotebook] = useState<NotebookWithDetails>(
    initialNotebook!
  );
  const [previousStatus, setPreviousStatus] = useState<string | undefined>(
    notebook?.processingStatus?.status
  );
  const [loadingDots, setLoadingDots] = useState("");

  const status = notebook?.processingStatus?.status || "IN_QUEUE";
  const statusInfo = statusConfig[status as keyof typeof statusConfig];
  const StatusIcon = statusInfo.icon;
  const isProcessing = status === "IN_QUEUE" || status === "IN_PROGRESS";

  // Add loading dots animation
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isProcessing]);

  useEffect(() => {
    // Check if status has changed from processing to completed
    if (
      previousStatus &&
      (previousStatus === "IN_QUEUE" || previousStatus === "IN_PROGRESS") &&
      (status === "PROCESSED" || status === "ERROR")
    ) {
      // Show toast based on the new status
      if (status === "PROCESSED") {
        toast.success(
          `Notebook "${notebook?.title || "Untitled"}" processing complete!`,
          {
            description: "Your research has been successfully processed.",
            duration: 5000,
          }
        );
      } else if (status === "ERROR") {
        toast.error(
          `Error processing notebook "${notebook?.title || "Untitled"}"`,
          {
            description:
              notebook?.processingStatus?.message ||
              "An error occurred during processing.",
            duration: 8000,
          }
        );
      }
    }

    // Update previous status
    setPreviousStatus(status);
  }, [
    status,
    previousStatus,
    notebook?.title,
    notebook?.processingStatus?.message,
  ]);

  useEffect(() => {
    // Only poll if processing
    if (!isProcessing || !notebook) return;

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`/api/notebooks/${notebook.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notebook");
        }

        const updatedNotebook = await response.json();
        setNotebook(updatedNotebook);
      } catch (error) {
        console.error("Error fetching notebook:", error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [notebook?.id, isProcessing]);

  if (!notebook) {
    return <div>Loading...</div>;
  }

  // Deciphering animation component
  const DecipheringAnimation = () => (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Deciphering{loadingDots}
          </h2>
        </div>
        <p className="text-muted-foreground text-center max-w-md">
          Our AI is analyzing your research sources and generating insights.
          This may take a few minutes.
        </p>
      </CardContent>
    </Card>
  );

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
              disabled={isProcessing}
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
                  disabled={isProcessing}
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

          {isProcessing ? (
            <DecipheringAnimation />
          ) : notebook.output?.summary ? (
            <Card className="w-full">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
                  Deciphered Summary
                </h2>
                <div className="markdown-container">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={MarkdownComponents}
                  >
                    {notebook.output.summary}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
