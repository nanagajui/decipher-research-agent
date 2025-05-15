import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Extract id from params at the beginning
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const notebook = await prisma.notebook.findUnique({
      where: { id, userId: session.user.id },
    });
    if (!notebook) {
      return NextResponse.json({ error: "Notebook not found" }, { status: 404 });
    }
    await prisma.notebook.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete notebook" }, { status: 500 });
  }
}