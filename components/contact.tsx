"use client";

import { useState } from "react";
import { track } from "@/lib/gtag";


type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setError(data?.error || "No se pudo enviar. Probá de nuevo.");
        return;
      }

      setStatus("success");
      track("generate_lead", { method: "contact_form" });
      form.reset();

    } catch {
      setStatus("error");
      setError("No se pudo enviar. Revisá tu conexión e intentá de nuevo.");
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border bg-white p-8 shadow-sm md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Hablemos</h2>
            <p className="mt-4 text-lg text-gray-600">
              Contame sobre tu tienda y te propongo un plan de mejora (sin vueltas).
            </p>
          </div>

          <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-2xl">
            {/* Honeypot anti-spam (debe quedar oculto) */}
            <div className="hidden">
              <label>
                Website
                <input name="website" type="text" autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Nombre</label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Luis"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Empresa (opcional)</label>
                <input
                  name="company"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Nombre de la empresa"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Mensaje</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Contame qué vendés, qué canales usás y qué objetivo tenés."
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-md bg-black px-5 py-2.5 text-white hover:bg-gray-900 disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Enviando..." : "Enviar"}
              </button>

              <a
                className="w-full rounded-md border px-5 py-2.5 text-center text-gray-800 hover:bg-gray-50 sm:w-auto"
                href="mailto:CONTACTO@TU-DOMINIO.COM?subject=Consulta%20Landaeta%20Studio"
              >
                Prefiero email
              </a>
            </div>

            {status === "success" && (
              <p className="mt-4 text-center text-sm text-green-700">
                ¡Listo! Te respondemos a la brevedad.
              </p>
            )}

            {status === "error" && (
              <p className="mt-4 text-center text-sm text-red-700">
                {error}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-gray-500">
              Respondo en menos de 24 horas hábiles.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
