import Sidebar from "@/components/sidebar";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Sidebar currentPath="/dashboard" /> */}
      <main className="ml-64 p-8">
        {/* header */}
        <div>
          <div>
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here is an overview of your inventory.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
