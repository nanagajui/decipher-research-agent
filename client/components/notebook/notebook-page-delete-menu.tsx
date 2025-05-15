"use client";

import { DeleteNotebookMenu } from "@/components/notebook/delete-notebook-menu";

interface NotebookPageDeleteMenuProps {
  notebookId: string;
  className?: string;
}

export function NotebookPageDeleteMenu({
  notebookId,
  className,
}: NotebookPageDeleteMenuProps) {
  return <DeleteNotebookMenu notebookId={notebookId} className={className} />;
}
