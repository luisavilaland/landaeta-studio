"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/logout-button";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/meta", label: "Meta Ads", icon: "📘" },
  { href: "/dashboard/google", label: "Google Ads", icon: "🔍" },
];

interface Props {
  userName: string;
  userEmail: string;
}

export default function DashboardSidebar({ userName, userEmail }: Props) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
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
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isActive("/dashboard/settings")
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span>⚙️</span> Configuración
        </Link>
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-gray-900">{userName}</p>
          <p className="text-xs text-gray-500">{userEmail}</p>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}