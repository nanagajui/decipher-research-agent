-- CreateEnum
CREATE TYPE "NotebookDocumentSourceType" AS ENUM ('UPLOAD', 'URL', 'MANUAL');

-- CreateTable
CREATE TABLE "notebook" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "topic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notebook_document" (
    "id" TEXT NOT NULL,
    "notebookId" TEXT NOT NULL,
    "sourceType" "NotebookDocumentSourceType" NOT NULL,
    "sourceUrl" TEXT,
    "filePath" TEXT,
    "filename" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notebook_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notebook_output" (
    "id" TEXT NOT NULL,
    "notebookId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notebook_output_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notebook_userId_idx" ON "notebook"("userId");

-- CreateIndex
CREATE INDEX "notebook_document_notebookId_idx" ON "notebook_document"("notebookId");

-- CreateIndex
CREATE UNIQUE INDEX "notebook_output_notebookId_key" ON "notebook_output"("notebookId");

-- AddForeignKey
ALTER TABLE "notebook" ADD CONSTRAINT "notebook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook_document" ADD CONSTRAINT "notebook_document_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "notebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook_output" ADD CONSTRAINT "notebook_output_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "notebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
