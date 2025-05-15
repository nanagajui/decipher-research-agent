import { NotebookCard } from "@/components/notebook/notebook-card";
import { CreateNotebookDialog } from "@/components/notebook/create-notebook-dialog";
import { BookOpen } from "lucide-react";

type Notebook = {
  id: string;
  title: string | null;
  topic: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type NotebookListProps = {
  notebooks: Notebook[];
};

export function NotebookList({ notebooks }: NotebookListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Notebooks</h2>
        <CreateNotebookDialog />
      </div>

      {notebooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No notebooks yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first notebook to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notebooks.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
        </div>
      )}
    </div>
  );
}
