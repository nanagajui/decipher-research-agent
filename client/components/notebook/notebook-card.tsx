"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

type Notebook = {
  id: string;
  title: string | null;
  topic: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type NotebookCardProps = {
  notebook: Notebook;
};

export function NotebookCard({ notebook }: NotebookCardProps) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => router.push(`/notebook/${notebook.id}`)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <CardTitle className="text-lg">
            {notebook.title || "Untitled Notebook"}
          </CardTitle>
        </div>
        {notebook.topic && <CardDescription>{notebook.topic}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Created on {notebook.createdAt.toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
