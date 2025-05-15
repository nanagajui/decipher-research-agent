"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Notebook = {
  id: string;
  title: string | null;
  topic: string | null;
  createdAt: Date;
  updatedAt: Date;
  processingStatus?: {
    status: "IN_QUEUE" | "IN_PROGRESS" | "PROCESSED" | "ERROR";
    message: string | null;
  } | null;
};

type NotebookCardProps = {
  notebook: Notebook;
};

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

export function NotebookCard({ notebook }: NotebookCardProps) {
  const status = notebook.processingStatus?.status || "IN_QUEUE";
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;

  return (
    <Link href={`/notebook/${notebook.id}`}>
      <Card className="h-full hover:bg-muted/50 transition-colors">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="line-clamp-2">
              {notebook.title || "Untitled Notebook"}
            </CardTitle>
            <Badge
              variant={statusInfo.variant}
              className="flex items-center gap-1"
            >
              <StatusIcon className="h-3 w-3" />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {notebook.topic ? (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {notebook.topic}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No topic provided
            </p>
          )}
          {notebook.processingStatus?.message && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {notebook.processingStatus.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Created on {new Date(notebook.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
