"use client";

import { useState } from "react";
import { X, Link as LinkIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Match the Prisma enum
export type NotebookDocumentSourceType = "UPLOAD" | "URL" | "MANUAL";

export type NotebookSource = {
  id: string;
  sourceType: NotebookDocumentSourceType;
  sourceUrl?: string | null;
  content?: string | null;
  sourceUrlText?: string | null;
  filePath?: string | null;
  filename?: string | null;
  createdAt?: Date;
  notebookId?: string;
};

type EditNotebookSourcesProps = {
  notebookId: string;
  initialSources: NotebookSource[];
  disabled?: boolean;
};

export function EditNotebookSources({
  notebookId,
  initialSources,
  disabled = false,
}: EditNotebookSourcesProps) {
  const router = useRouter();
  const [sources, setSources] = useState<NotebookSource[]>(initialSources);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentSource, setCurrentSource] = useState<"URL" | "TEXT">("URL");
  const [sourceValue, setSourceValue] = useState("");
  const [sourceError, setSourceError] = useState("");

  // Function to convert UI text/url to database sourceType
  const getSourceType = (type: "URL" | "TEXT"): NotebookDocumentSourceType => {
    return type === "URL" ? "URL" : "MANUAL";
  };

  const addSource = () => {
    if (!sourceValue.trim()) {
      setSourceError("Source cannot be empty");
      return;
    }

    if (currentSource === "URL" && !isValidUrl(sourceValue)) {
      setSourceError("Please enter a valid URL");
      return;
    }

    // Create a temporary ID for the new source
    const newSource: NotebookSource = {
      id: `temp-${Date.now()}`,
      sourceType: getSourceType(currentSource),
      sourceUrl: currentSource === "URL" ? sourceValue : null,
      content: currentSource === "TEXT" ? sourceValue : null,
    };

    setSources([...sources, newSource]);
    setSourceValue("");
    setSourceError("");
  };

  const removeSource = (id: string) => {
    setSources(sources.filter((source) => source.id !== id));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const saveSources = async () => {
    try {
      setIsSaving(true);

      const response = await fetch(`/api/notebooks/${notebookId}/sources`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sources: sources.map((source) => ({
            id: source.id.startsWith("temp-") ? undefined : source.id,
            sourceType: source.sourceType,
            sourceUrl: source.sourceUrl || null,
            content: source.content || null,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update sources");
      }

      toast.success("Sources updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating sources:", error);
      toast.error("Failed to update sources");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEditing = () => {
    setSources(initialSources);
    setIsEditing(false);
    setSourceValue("");
    setSourceError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Sources</h3>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            disabled={disabled}
          >
            Edit Sources
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button size="sm" onClick={saveSources} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="space-y-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              {currentSource === "URL" ? (
                <Input
                  placeholder="Enter URL"
                  value={sourceValue}
                  onChange={(e) => setSourceValue(e.target.value)}
                />
              ) : (
                <Textarea
                  placeholder="Enter text source"
                  value={sourceValue}
                  onChange={(e) => setSourceValue(e.target.value)}
                  className="min-h-[120px] resize-y"
                />
              )}
            </div>
            <div className="flex flex-row sm:flex-col gap-2">
              <Select
                value={currentSource}
                onValueChange={(value: string) =>
                  setCurrentSource(value as "URL" | "TEXT")
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="URL">URL</SelectItem>
                  <SelectItem value="TEXT">Text</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addSource} className="flex-1">
                Add
              </Button>
            </div>
          </div>
          {sourceError && (
            <p className="text-destructive text-sm">{sourceError}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-1">
        {sources.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No sources added yet
          </p>
        ) : (
          sources.map((source) => (
            <div
              key={source.id}
              className="flex items-start justify-between border rounded-lg p-3 bg-secondary/10"
            >
              <div className="flex items-start flex-1 overflow-hidden">
                {source.sourceType === "URL" ? (
                  <>
                    <LinkIcon className="h-4 w-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                    <div className="overflow-hidden flex-1">
                      <a
                        href={source.sourceUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline break-all"
                      >
                        {source.sourceUrl}
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="overflow-hidden flex-1">
                      <p className="text-sm">{source.content}</p>
                    </div>
                  </>
                )}
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSource(source.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Add default export for dynamic import
export default EditNotebookSources;
