export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to your Dashboard
          </h2>
          <p className="text-muted-foreground">
            This is a placeholder dashboard page. Add your dashboard content
            here.
          </p>
        </div>
      </div>
    </div>
  );
}
