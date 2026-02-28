"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
    >
      Cerrar sesión
    </button>
  );
}