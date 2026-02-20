import Link from "next/link";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* 1st block — Marca */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div>
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              Ads + Analítica para eCommerce en LATAM.
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Landaeta Studio. Todos los derechos reservados.
            </div>
          </div>

          {/* 2nd block — Servicios */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#services">
                  Meta Ads
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#services">
                  Google Ads
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#services">
                  Analytics Avanzado
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#services">
                  Dashboards & BI
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block — Agencia */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Agencia</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#process">
                  Cómo trabajamos
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#cases">
                  Casos de éxito
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="#contact">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block — Legal */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="/privacidad">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 transition hover:text-gray-900" href="/terminos">
                  Términos de uso
                </Link>
              </li>
            </ul>
          </div>

          {/* 5th block — Social */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Social</h3>
            <ul className="flex gap-1">
              <li>
                <Link
                  className="flex items-center justify-center text-blue-500 transition hover:text-blue-600"
                  href="https://instagram.com/landaetastudio"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 9.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm6.8-11a1.52 1.52 0 1 0 0 3.04 1.52 1.52 0 0 0 0-3.04Zm4.3-1.6C26.4 6 24 6 16 6s-10.4 0-11.1.6C4.2 7.3 4 9.6 4 16s.2 8.7.9 9.4c.7.7 3 .6 11.1.6s10.4 0 11.1-.6c.7-.7.9-3 .9-9.4s-.2-8.7-.9-9.4Zm-2.5 19.4c-.5.5-2.3.9-8.6.9s-8.1-.4-8.6-.9c-.5-.5-.9-2.3-.9-8.6s.4-8.1.9-8.6c.5-.5 2.3-.9 8.6-.9s8.1.4 8.6.9c.5.5.9 2.3.9 8.6s-.4 8.1-.9 8.6Z"/>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center text-blue-500 transition hover:text-blue-600"
                  href="https://linkedin.com/company/landaetastudio"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.3 8H8.7C8.3 8 8 8.3 8 8.7v14.7c0 .3.3.6.7.6h14.6c.4 0 .7-.3.7-.6V8.7c0-.4-.3-.7-.7-.7ZM12.7 21.3h-2.4V14h2.4v7.3Zm-1.2-8.3a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm10.1 8.3h-2.4v-3.6c0-.8 0-1.9-1.2-1.9s-1.3.9-1.3 1.8v3.7h-2.4V14h2.3v1h.1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v3.9Z"/>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big text — ahora con tu marca */}
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[228px] font-bold leading-none before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Landaeta'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Landaeta'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3" aria-hidden="true">
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700 blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}