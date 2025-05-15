import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const notebooks = await prisma.notebook.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        processingStatus: true,
      },
    });

    return NextResponse.json(notebooks);
  } catch (error) {
    console.error("Error fetching notebooks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { topic } = await request.json();

    const notebookCount = await prisma.notebook.count({
      where: {
        userId: session.user.id,
      },
    });

    const result = await prisma.$transaction(async (tx) => {
      const notebook = await tx.notebook.create({
        data: {
          userId: session.user.id,
          title: `New Notebook ${notebookCount + 1}`,
          topic: topic || null,
        },
      });

      const processingStatus = await tx.notebookProcessingStatus.create({
        data: {
          notebookId: notebook.id,
          status: "IN_QUEUE",
          message: "Notebook created and queued for processing",
        },
      });

      return { notebook, processingStatus };
    });

    return NextResponse.json(result.notebook);
  } catch (error) {
    console.error("Error creating notebook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}