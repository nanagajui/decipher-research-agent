/*
  Warnings:

  - You are about to drop the `notebook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notebook_document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notebook_output` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NotebookProcessingStatusValue" AS ENUM ('IN_QUEUE', 'IN_PROGRESS', 'PROCESSED', 'ERROR');

-- DropForeignKey
ALTER TABLE "notebook" DROP CONSTRAINT "notebook_userId_fkey";

-- DropForeignKey
ALTER TABLE "notebook_document" DROP CONSTRAINT "notebook_document_notebookId_fkey";

-- DropForeignKey
ALTER TABLE "notebook_output" DROP CONSTRAINT "notebook_output_notebookId_fkey";

-- DropTable
DROP TABLE "notebook";

-- DropTable
DROP TABLE "notebook_document";

-- DropTable
DROP TABLE "notebook_output";

-- CreateTable
CREATE TABLE "notebooks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "topic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notebooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notebook_sources" (
    "id" TEXT NOT NULL,
    "notebookId" TEXT NOT NULL,
    "sourceType" "NotebookDocumentSourceType" NOT NULL,
    "sourceUrl" TEXT,
    "filePath" TEXT,
    "filename" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notebook_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notebook_outputs" (
    "id" TEXT NOT NULL,
    "notebookId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notebook_outputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notebook_processing_status" (
    "id" TEXT NOT NULL,
    "status" "NotebookProcessingStatusValue" NOT NULL DEFAULT 'IN_QUEUE',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notebookId" TEXT NOT NULL,

    CONSTRAINT "notebook_processing_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notebooks_userId_idx" ON "notebooks"("userId");

-- CreateIndex
CREATE INDEX "notebook_sources_notebookId_idx" ON "notebook_sources"("notebookId");

-- CreateIndex
CREATE UNIQUE INDEX "notebook_outputs_notebookId_key" ON "notebook_outputs"("notebookId");

-- CreateIndex
CREATE UNIQUE INDEX "notebook_processing_status_notebookId_key" ON "notebook_processing_status"("notebookId");

-- AddForeignKey
ALTER TABLE "notebooks" ADD CONSTRAINT "notebooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook_sources" ADD CONSTRAINT "notebook_sources_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "notebooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook_outputs" ADD CONSTRAINT "notebook_outputs_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "notebooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebook_processing_status" ADD CONSTRAINT "notebook_processing_status_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "notebooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
