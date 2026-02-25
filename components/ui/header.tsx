"use client";

import Link from "next/link";
import Logo from "./logo";
import { track } from "@/lib/gtag";
import CalButton from "@/components/cal-button";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white border border-gray-200 px-3 shadow-lg shadow-black/[0.03]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              href="/servicios"
              className="text-sm text-gray-700 transition hover:text-gray-900"
            >
              Servicios
            </Link>

            <Link
              href="/blog"
              className="text-sm text-gray-700 transition hover:text-gray-900"
            >
              Blog
            </Link>

            <Link
              href="/#process"
              className="text-sm text-gray-700 transition hover:text-gray-900"
            >
              Proceso
            </Link>

            <Link
              href="#cases"
              className="text-sm text-gray-700 transition hover:text-gray-900"
            >
              Casos
            </Link>

            <Link
              href="#contact"
              className="text-sm text-gray-700 transition hover:text-gray-900"
            >
              Contacto
            </Link>

            <CalButton
              onClick={() =>
                track("cta_click", {
                  location: "header",
                  label: "agendar_llamada",
                })
              }
              className="ml-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
            >
              Agendar llamada
            </CalButton>
          </nav>
        </div>
      </div>
    </header>
  );
}