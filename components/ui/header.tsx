"use client";

import Link from "next/link";
import Logo from "./logo";
import { track } from "@/lib/gtag";
import CalButton from "@/components/cal-button";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              href="/servicios"
              className="text-sm transition hover:text-gray-600"
            >
              Servicios
            </Link>
            <Link
              href="/blog"
              className="text-sm transition hover:text-gray-600"
            >
              Blog
            </Link>
            <a
              href="#process"
              className="text-sm transition hover:text-gray-600"
            >
              Proceso
            </a>
            <a href="#cases" className="text-sm transition hover:text-gray-600">
              Casos
            </a>
            <a
              href="#contact"
              className="text-sm transition hover:text-gray-600"
            >
              Contacto
            </a>
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
