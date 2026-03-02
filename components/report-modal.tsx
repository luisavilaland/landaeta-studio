"use client";

import { useState } from "react";

interface ReportModalProps {
  accountId: string;
  clientName: string;
  onClose: () => void;
}

export default function ReportModal({ accountId, clientName, onClose }: ReportModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!email) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId, clientName, recipientEmail: email }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">

        {success ? (
          <div className="text-center">
            <p className="text-4xl mb-4">✅</p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">¡Reporte enviado!</h2>
            <p className="text-sm text-gray-500 mb-6">
              El reporte de <strong>{clientName}</strong> fue enviado a <strong>{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Enviar reporte por email</h2>
              <p className="mt-1 text-sm text-gray-500">
                Se enviará el reporte de los últimos 30 días de <strong>{clientName}</strong>.
              </p>
            </div>

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email destinatario
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cliente@email.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSend}
                disabled={loading || !email}
                className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar reporte"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}