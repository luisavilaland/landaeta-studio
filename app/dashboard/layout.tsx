import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import DashboardSidebar from "@/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar
        userName={session.user?.name ?? "Luis"}
        userEmail={session.user?.email ?? ""}
      />
      <main className="ml-60 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}