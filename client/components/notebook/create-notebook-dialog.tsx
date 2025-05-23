"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const notebookSchema = z.object({
  topic: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export function CreateNotebookDialog() {
  const router = useRouter();
  const [sources, setSources] = useState<
    { type: "URL" | "TEXT"; value: string }[]
  >([]);
  const [currentSource, setCurrentSource] = useState<"URL" | "TEXT">("URL");
  const [sourceValue, setSourceValue] = useState("");
  const [sourceError, setSourceError] = useState("");
  const [formError, setFormError] = useState("");
  const [activeTab, setActiveTab] = useState<"TOPIC" | "SOURCES">("TOPIC");

  const form = useForm<z.infer<typeof notebookSchema>>({
    resolver: zodResolver(notebookSchema),
    defaultValues: {
      topic: "",
    },
  });

  const addSource = () => {
    if (!sourceValue.trim()) {
      setSourceError("Source cannot be empty");
      return;
    }

    if (currentSource === "URL" && !isValidUrl(sourceValue)) {
      setSourceError("Please enter a valid URL");
      return;
    }

    setSources([...sources, { type: currentSource, value: sourceValue }]);
    setSourceValue("");
    setSourceError("");
    setFormError("");
  };

  const removeSource = (index: number) => {
    const newSources = [...sources];
    newSources.splice(index, 1);
    setSources(newSources);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  async function onSubmit(values: z.infer<typeof notebookSchema>) {
    try {
      // Validation: only require the active input
      if (activeTab === "TOPIC") {
        if (!values.topic || values.topic.trim() === "") {
          setFormError("Please provide a topic");
          return;
        }
        if (values.topic.trim().length < 3) {
          form.setError("topic", {
            type: "manual",
            message: "Topic must be at least 3 characters",
          });
          return;
        }
        if (values.topic.trim().length > 200) {
          form.setError("topic", {
            type: "manual",
            message: "Topic must be less than 200 characters",
          });
          return;
        }
      } else if (activeTab === "SOURCES") {
        if (sources.length === 0) {
          setFormError("Please add at least one source");
          return;
        }
      }

      const sourcesToSave = sources.map((source) => {
        if (source.type === "URL") {
          return {
            sourceType: "URL",
            sourceUrl: source.value,
          };
        } else {
          return {
            sourceType: "MANUAL",
            content: source.value,
          };
        }
      });

      const response = await fetch("/api/notebooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic:
            activeTab === "TOPIC" && values.topic && values.topic.trim()
              ? values.topic.trim()
              : null,
          sources: activeTab === "SOURCES" ? sourcesToSave : [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create notebook");
      }

      form.reset();
      setSources([]);
      setSourceValue("");
      toast.success("Notebook created successfully");
      router.push(`/notebook/${await response.json().then((data) => data.id)}`);
      router.refresh();
    } catch (error) {
      console.error("Error creating notebook:", error);
      toast.error("Failed to create notebook");
    }
  }

  useEffect(() => {
    // Clear errors when form values change
    const subscription = form.watch(() => {
      setFormError("");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Notebook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Notebook</DialogTitle>
          <DialogDescription>
            Enter a topic or add sources for your new notebook.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "TOPIC" | "SOURCES")}
          className="w-full"
        >
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="TOPIC" className="flex-1">
              Topic
            </TabsTrigger>
            <TabsTrigger value="SOURCES" className="flex-1">
              Sources
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="TOPIC">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter notebook topic"
                          {...field}
                          className="w-full"
                          onChange={(e) => {
                            field.onChange(e);
                            setFormError("");
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a topic for your notebook
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {formError && (
                  <p className="text-destructive text-sm">{formError}</p>
                )}
              </TabsContent>
              <TabsContent value="SOURCES">
                <div className="space-y-4">
                  <FormLabel>Sources (Up to 20)</FormLabel>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      {currentSource === "URL" ? (
                        <Input
                          placeholder="Enter URL"
                          value={sourceValue}
                          onChange={(e) => setSourceValue(e.target.value)}
                          disabled={sources.length >= 20}
                        />
                      ) : (
                        <Textarea
                          placeholder="Enter text source"
                          value={sourceValue}
                          onChange={(e) => setSourceValue(e.target.value)}
                          disabled={sources.length >= 20}
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
                      <Button
                        type="button"
                        onClick={addSource}
                        disabled={sources.length >= 20}
                        className="flex-1"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  {sourceError && (
                    <p className="text-destructive text-sm">{sourceError}</p>
                  )}
                  {formError && (
                    <p className="text-destructive text-sm">{formError}</p>
                  )}
                  {sources.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h3 className="text-sm font-medium">Added Sources:</h3>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                        {sources.map((source, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 border rounded-md bg-secondary/10"
                          >
                            <div className="flex items-center overflow-hidden">
                              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded mr-2 uppercase">
                                {source.type}
                              </span>
                              <span className="text-sm truncate max-w-[350px]">
                                {source.value}
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSource(index)}
                              className="ml-2 flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 pt-2">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full sm:w-auto mr-2"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full sm:w-auto">
                  Decipher It
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
