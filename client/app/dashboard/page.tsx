import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NotebookList } from "@/components/notebook/notebook-list";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const notebooks = await prisma.notebook.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <NotebookList notebooks={notebooks} />
    </div>
  );
}
