import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-60 border-r border-gray-200 bg-white px-4 py-6 flex flex-col">
        {/* Logo */}
        <div className="mb-8 px-2">
          <Image
            src="/images/logo-landaetastudio.svg"
            alt="Landaeta Studio"
            width={140}
            height={32}
            priority
          />
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span>📊</span> Overview
          </Link>
          <Link
            href="/dashboard/meta"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span>📘</span> Meta Ads
          </Link>
          <Link
            href="/dashboard/google"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span>🔍</span> Google Ads
          </Link>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-4">
          <div className="mb-3 px-3">
            <p className="text-xs font-medium text-gray-900">{session.user?.name ?? "Luis"}</p>
            <p className="text-xs text-gray-500">{session.user?.email}</p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}