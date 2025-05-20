"use client";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Loader2,
  MessageSquare,
  BookOpen,
  Send,
} from "lucide-react";
import { NotebookPageDeleteMenu } from "@/components/notebook/notebook-page-delete-menu";
import { SourcesWrapper } from "@/components/notebook/sources-wrapper";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownComponents } from "@/components/ui/markdown-components";
import { toast } from "sonner";
import { statusConfig, NotebookWithDetails } from "@/lib/notebook-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Chat message type
type Message = {
  role: "user" | "assistant";
  content: string;
};

// API response type
type ChatApiResponse = {
  status: "success" | "error";
  response: string;
};

// Memoized message component to prevent re-renders
const ChatMessage = memo(({ message }: { message: Message }) => (
  <div
    className={`flex ${
      message.role === "user" ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`max-w-[80%] px-4 py-2 rounded-lg ${
        message.role === "user"
          ? "bg-primary text-primary-foreground"
          : "bg-muted"
      }`}
    >
      {message.role === "assistant" ? (
        <div className="markdown-container prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      ) : (
        message.content
      )}
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";

// Memoized ChatInterface component to prevent unnecessary re-renders
const ChatInterface = memo(
  ({
    messages,
    isLoading,
    onSendMessage,
  }: {
    messages: Message[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
  }) => {
    // Local state for input to avoid parent component re-renders when typing
    const [localInput, setLocalInput] = useState("");

    // Use callback ref for textarea to ensure focus
    const textareaRef = useCallback((textareaElement: HTMLTextAreaElement) => {
      if (textareaElement) {
        // Focus the textarea on mount
        textareaElement.focus();
      }
    }, []);

    // Ref for the messages container to control scrolling
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, [messages, isLoading]);

    const handleSubmit = () => {
      if (!localInput.trim()) return;
      onSendMessage(localInput);
      setLocalInput("");
    };

    return (
      <div className="w-full">
        <div
          ref={messagesContainerRef}
          className="flex flex-col space-y-4 mb-4 h-[400px] overflow-y-auto p-4 border rounded-md"
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Start a conversation with your notebook
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-muted flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Textarea
            ref={textareaRef}
            rows={1}
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder={`Decipher anything about this notebook...`}
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !localInput.trim()}
            className="px-4"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    );
  }
);

ChatInterface.displayName = "ChatInterface";

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
  const [activeTab, setActiveTab] = useState("summary");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [notebook, isProcessing, setNotebook]);

  const handleSendMessage = async (inputMessage: string) => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: inputMessage,
    };

    // Update messages state with user message
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare all messages for the API call
      const allMessages = [...messages, userMessage];

      // Make API call with all messages and notebook ID
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: allMessages,
          notebook_id: notebook.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chat API");
      }

      const data: ChatApiResponse = await response.json();

      if (data.status === "success") {
        // Add assistant response to messages
        const assistantMessage: Message = {
          role: "assistant",
          content: data.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Handle error response
        toast.error("Error from chat API", {
          description: data.response || "Unknown error occurred",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                  // notebookId={notebook.id}
                  initialSources={notebook.sources}
                  // disabled={isProcessing}
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
                <Tabs
                  defaultValue="summary"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="summary" className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Deciphered Summary
                    </TabsTrigger>
                    <TabsTrigger
                      value="chat"
                      className="flex items-center"
                      disabled={status === "ERROR"}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Decipher with Chat
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary">
                    <div className="markdown-container">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={MarkdownComponents}
                      >
                        {notebook.output.summary}
                      </ReactMarkdown>
                    </div>
                  </TabsContent>

                  <TabsContent value="chat">
                    <ChatInterface
                      messages={messages}
                      isLoading={isLoading}
                      onSendMessage={handleSendMessage}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
